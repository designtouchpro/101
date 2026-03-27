import { cp, mkdir, readdir, readFile, rm, writeFile, access } from 'node:fs/promises'
import path from 'node:path'
import { spawn } from 'node:child_process'

const workspaces = [
  'index',
  'html',
  'js',
  'css',
  'react',
  'vue',
  'net',
  'algo',
  'patterns',
  'swift',
  'swiftui',
  'teamlead',
  'product',
  'project',
  'marketing',
  'qa',
]

const cwd = process.cwd()
const repoName = resolveRepoName()
const outputRoot = path.join(cwd, 'dist')

// Support incremental builds: BUILD_WORKSPACES env can be a comma-separated
// list of workspace names. When set, only those workspaces are rebuilt and
// their output is merged into the existing dist/ (which may come from cache).
// When not set, all workspaces are rebuilt from scratch.
const buildFilter = process.env.BUILD_WORKSPACES
  ? process.env.BUILD_WORKSPACES.split(',').map(s => s.trim()).filter(Boolean)
  : null

const toBuild = buildFilter
  ? workspaces.filter(w => buildFilter.includes(w))
  : workspaces

if (!buildFilter) {
  await rm(outputRoot, { recursive: true, force: true })
}
await mkdir(outputRoot, { recursive: true })

console.log(`Building ${toBuild.length}/${workspaces.length} workspaces: ${toBuild.join(', ')}`)

for (const workspace of toBuild) {
  const basePath = workspace === 'index' ? `/${repoName}/` : `/${repoName}/${workspace}/`

  await runCommand('npm', ['run', 'build', '-w', workspace], {
    ...process.env,
    VITE_DEPLOY_TARGET: 'github-pages',
    VITE_BASE_PATH: basePath,
  })

  const sourceDir = path.join(cwd, workspace, 'dist')
  const targetDir = workspace === 'index' ? outputRoot : path.join(outputRoot, workspace)
  await copyDirectoryContents(sourceDir, targetDir)
}

await writeFile(path.join(outputRoot, '.nojekyll'), '')

// Always refresh 404.html from index
const rootIndex = path.join(outputRoot, 'index.html')
try {
  await access(rootIndex)
  const rootIndexHtml = await readFile(rootIndex, 'utf8')
  await writeFile(path.join(outputRoot, '404.html'), rootIndexHtml)
} catch {
  // index.html not present (partial build without index workspace) — skip
}

function resolveRepoName() {
  if (process.env.PAGES_REPO_NAME) {
    return process.env.PAGES_REPO_NAME
  }

  if (process.env.GITHUB_REPOSITORY) {
    const [, name] = process.env.GITHUB_REPOSITORY.split('/')
    if (name) {
      return name
    }
  }

  return path.basename(path.resolve(cwd, '..'))
}

function runCommand(command, args, env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    child.on('close', code => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`))
    })

    child.on('error', reject)
  })
}

async function copyDirectoryContents(sourceDir, targetDir) {
  await rm(targetDir, { recursive: true, force: true })
  await mkdir(targetDir, { recursive: true })

  const entries = await readdir(sourceDir)
  await Promise.all(
    entries.map(entry => cp(path.join(sourceDir, entry), path.join(targetDir, entry), { recursive: true, force: true })),
  )
}