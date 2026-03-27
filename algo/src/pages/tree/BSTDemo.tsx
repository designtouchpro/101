import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

function insertBST(root: TreeNode | null, val: number): TreeNode {
  if (!root) return { val, left: null, right: null }
  if (val < root.val) return { ...root, left: insertBST(root.left, val) }
  if (val > root.val) return { ...root, right: insertBST(root.right, val) }
  return root
}

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root || root.val === val) return root
  return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val)
}

function findMin(node: TreeNode): TreeNode {
  while (node.left) node = node.left
  return node
}

function deleteBST(root: TreeNode | null, val: number): TreeNode | null {
  if (!root) return null
  if (val < root.val) return { ...root, left: deleteBST(root.left, val) }
  if (val > root.val) return { ...root, right: deleteBST(root.right, val) }
  // Найден
  if (!root.left) return root.right
  if (!root.right) return root.left
  const successor = findMin(root.right)
  return { ...root, val: successor.val, right: deleteBST(root.right, successor.val) }
}

function getLevels(root: TreeNode | null): number[][] {
  if (!root) return []
  const result: number[][] = []
  const queue: TreeNode[] = [root]
  while (queue.length > 0) {
    const size = queue.length
    const level: number[] = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}

function inorder(node: TreeNode | null): number[] {
  if (!node) return []
  return [...inorder(node.left), node.val, ...inorder(node.right)]
}

export default function BSTDemo() {
  const initialValues = [8, 4, 12, 2, 6, 10, 14]
  const buildFromValues = (vals: number[]): TreeNode | null => {
    let root: TreeNode | null = null
    for (const v of vals) root = insertBST(root, v)
    return root
  }

  const [tree, setTree] = useState<TreeNode | null>(() => buildFromValues(initialValues))
  const [inputVal, setInputVal] = useState('')
  const [searchVal, setSearchVal] = useState('')
  const [searchResult, setSearchResult] = useState<string | null>(null)
  const [highlightNode, setHighlightNode] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<'search' | 'validate' | 'lca'>('search')

  const levels = getLevels(tree)
  const sorted = inorder(tree)

  const handleInsert = () => {
    const val = Number(inputVal)
    if (isNaN(val)) return
    setTree(prev => insertBST(prev, val))
    setInputVal('')
    setHighlightNode(val)
    setTimeout(() => setHighlightNode(null), 1500)
  }

  const handleDelete = () => {
    const val = Number(inputVal)
    if (isNaN(val)) return
    setTree(prev => deleteBST(prev, val))
    setInputVal('')
  }

  const handleSearch = () => {
    const val = Number(searchVal)
    if (isNaN(val)) return
    const found = searchBST(tree, val)
    setSearchResult(found ? `✅ Найдено: ${val}` : `❌ Не найдено: ${val}`)
    setHighlightNode(val)
    setTimeout(() => { setHighlightNode(null); setSearchResult(null) }, 2000)
  }

  const resetTree = () => {
    setTree(buildFromValues(initialValues))
    setHighlightNode(null)
    setSearchResult(null)
  }

  return (
    <div className="page-container">
      <h1>🔎 BST — Бинарное дерево поиска</h1>
      <p className="page-description">
        BST — бинарное дерево, где для каждого узла: все значения в левом поддереве меньше,
        в правом — больше. Это позволяет искать за O(log n) в среднем случае.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Интерактивный BST</span>
          <span className="card-badge">Интерактив</span>
        </div>

        <div className="controls">
          <input
            className="input"
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Значение..."
            style={{ width: '120px' }}
            onKeyDown={e => e.key === 'Enter' && handleInsert()}
          />
          <button className="btn btn-primary" onClick={handleInsert}>Вставить</button>
          <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <input
            className="input"
            type="number"
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            placeholder="Найти..."
            style={{ width: '120px' }}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-secondary" onClick={handleSearch}>Поиск</button>
          <button className="btn btn-secondary" onClick={resetTree}>Сброс</button>
        </div>

        {searchResult && (
          <div style={{ textAlign: 'center', padding: '8px', color: searchResult.startsWith('✅') ? 'var(--accent-green)' : 'var(--accent-red)', fontWeight: 600 }}>
            {searchResult}
          </div>
        )}

        <div className="tree-visual">
          {levels.map((level, li) => (
            <div key={li} className="tree-level">
              {level.map((val, vi) => (
                <div
                  key={vi}
                  className={`tree-node${highlightNode === val ? ' found' : ''}`}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px' }}>
          In-order: [{sorted.join(', ')}] — всегда отсортирован!
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📝 Задачи на BST</span>
          <span className="card-badge">Собес</span>
        </div>

        <div className="tabs">
          <button className={`tab ${activeTab === 'search' ? 'active' : ''}`} onClick={() => setActiveTab('search')}>
            Поиск k-го элемента
          </button>
          <button className={`tab ${activeTab === 'validate' ? 'active' : ''}`} onClick={() => setActiveTab('validate')}>
            Валидация BST
          </button>
          <button className={`tab ${activeTab === 'lca' ? 'active' : ''}`} onClick={() => setActiveTab('lca')}>
            LCA (общий предок)
          </button>
        </div>

        {activeTab === 'search' && (
          <>
            <div className="interview-question">
              <strong>Kth Smallest Element in BST (LeetCode #230)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                In-order обход BST даёт отсортированный массив → k-й элемент = result[k-1].
              </p>
            </div>
            <CodeBlock language="typescript" title="kth-smallest.ts" code={`
function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let result = 0;

  function inorder(node: TreeNode | null): void {
    if (!node || count >= k) return;
    
    inorder(node.left);
    
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    
    inorder(node.right);
  }

  inorder(root);
  return result;
}
// Сложность: O(H + k), где H — высота дерева
`} />
          </>
        )}

        {activeTab === 'validate' && (
          <>
            <div className="interview-question">
              <strong>Validate BST (LeetCode #98)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Проверить, что дерево является валидным BST. Ловушка: недостаточно сравнивать
                только с родителем — нужно проверять диапазон (min, max).
              </p>
            </div>
            <CodeBlock language="typescript" title="validate-bst.ts" code={`
function isValidBST(
  root: TreeNode | null,
  min = -Infinity,
  max = Infinity
): boolean {
  if (!root) return true;

  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&
    isValidBST(root.right, root.val, max)
  );
}

// Альтернатива: in-order обход должен быть строго возрастающим
function isValidBST_Inorder(root: TreeNode | null): boolean {
  let prev = -Infinity;

  function inorder(node: TreeNode | null): boolean {
    if (!node) return true;
    if (!inorder(node.left)) return false;
    if (node.val <= prev) return false;
    prev = node.val;
    return inorder(node.right);
  }

  return inorder(root);
}
`} />
          </>
        )}

        {activeTab === 'lca' && (
          <>
            <div className="interview-question">
              <strong>LCA of BST (LeetCode #235)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Найти наименьшего общего предка двух узлов. В BST это проще, чем в обычном дереве —
                используем свойство упорядоченности.
              </p>
            </div>
            <CodeBlock language="typescript" title="lca-bst.ts" code={`
// LCA в BST — O(log n)
function lowestCommonAncestor(
  root: TreeNode | null,
  p: number,
  q: number
): TreeNode | null {
  if (!root) return null;

  // Оба в левом поддереве
  if (p < root.val && q < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }
  // Оба в правом поддереве
  if (p > root.val && q > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }
  // Разошлись — root является LCA
  return root;
}

// LCA в обычном бинарном дереве — O(n)
function lcaBinaryTree(
  root: TreeNode | null,
  p: number,
  q: number
): TreeNode | null {
  if (!root || root.val === p || root.val === q) return root;

  const left = lcaBinaryTree(root.left, p, q);
  const right = lcaBinaryTree(root.right, p, q);

  if (left && right) return root; // Найден в обоих поддеревьях
  return left ?? right;
}
`} />
          </>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Удаление из BST</span>
          <span className="card-badge">Сложная операция</span>
        </div>

        <div className="info-box info" style={{ marginBottom: '16px' }}>
          <strong>Три случая при удалении:</strong>
          <ol className="info-list">
            <li>Лист — просто удаляем</li>
            <li>Один ребёнок — заменяем узел ребёнком</li>
            <li>Два ребёнка — заменяем значением inorder-преемника (мин. в правом поддереве), удаляем преемника</li>
          </ol>
        </div>

        <CodeBlock language="typescript" title="delete-bst.ts" code={`
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
  if (!root) return null;

  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Случай 1: Лист
    if (!root.left && !root.right) return null;

    // Случай 2: Один ребёнок
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Случай 3: Два ребёнка
    // Находим inorder-преемника (мин. в правом поддереве)
    let successor = root.right;
    while (successor.left) {
      successor = successor.left;
    }
    root.val = successor.val;
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}
`} />
      </div>
    </div>
  )
}
