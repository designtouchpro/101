import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function GitFlowGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌿 Git Flow & Branching</h1>
        <p>Стратегии ветвления и командная работа с Git в React-проектах</p>
        <div className="card" style={{ marginTop: '12px', padding: '12px 16px', background: 'rgba(59, 130, 246, 0.08)' }}>
          <strong>Зачем это в React-курсе?</strong> Компонентная архитектура React (feature-based структура,
          lazy imports, code splitting) напрямую влияет на стратегию ветвления. Мержи конфликтуют реже,
          когда каждая фича — изолированный модуль. Понимание Git Flow помогает организовать
          PR-процесс вокруг компонентов и страниц.
        </div>
        <a 
          href="https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Git Flow Guide
        </a>
      </div>

      <GitFlowOverview />
      <BranchingStrategy />
      <CommonCommands />
      <PRBestPractices />
      <InterviewQuestions />
    </div>
  )
}

function GitFlowOverview() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Git Flow vs GitHub Flow</h3>
        <span className="card-badge">Стратегии</span>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="comparison-header" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
            🌳 Git Flow (классический)
          </div>
          <div className="comparison-body">
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p><strong>Ветки:</strong></p>
              <ul>
                <li><code>main</code> — production</li>
                <li><code>develop</code> — integration</li>
                <li><code>feature/*</code> — новые фичи</li>
                <li><code>release/*</code> — подготовка релиза</li>
                <li><code>hotfix/*</code> — срочные фиксы</li>
              </ul>
              <p><strong>Когда:</strong> Релизы по расписанию, версионирование</p>
            </div>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            🚀 GitHub Flow (упрощённый)
          </div>
          <div className="comparison-body">
            <div style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
              <p><strong>Ветки:</strong></p>
              <ul>
                <li><code>main</code> — всегда deployable</li>
                <li><code>feature/*</code> — любые изменения</li>
              </ul>
              <p><strong>Процесс:</strong></p>
              <ol>
                <li>Ветка от main</li>
                <li>Коммиты + Push</li>
                <li>Pull Request</li>
                <li>Review + Merge</li>
                <li>Deploy из main</li>
              </ol>
              <p><strong>Когда:</strong> CI/CD, частые деплои</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BranchingStrategy() {
  const branchingCode = `# ═══════════════════════════════════════════════════════════════
# 🌿 ИМЕНОВАНИЕ ВЕТОК
# ═══════════════════════════════════════════════════════════════

# Паттерн: <type>/<ticket>-<short-description>

# ─────────────────────────────────────────────────────────────
# ТИПЫ ВЕТОК
# ─────────────────────────────────────────────────────────────

feature/JIRA-123-user-authentication    # Новая функциональность
bugfix/JIRA-456-fix-login-redirect      # Исправление бага
hotfix/JIRA-789-security-patch          # Срочный фикс в production
refactor/JIRA-321-extract-auth-service  # Рефакторинг без изменения поведения
chore/JIRA-654-update-dependencies      # Технические задачи
docs/JIRA-987-api-documentation         # Документация


# ═══════════════════════════════════════════════════════════════
# 📝 CONVENTIONAL COMMITS
# Стандарт сообщений коммитов для автоматизации
# ═══════════════════════════════════════════════════════════════

# Формат: <type>(<scope>): <description>

# ─────────────────────────────────────────────────────────────
# ТИПЫ КОММИТОВ
# ─────────────────────────────────────────────────────────────

feat(auth): add OAuth2 login           # Новая функциональность
fix(api): handle null response         # Исправление бага
docs(readme): update installation      # Документация
style(css): fix button alignment       # Форматирование (не влияет на код)
refactor(utils): extract date helpers  # Рефакторинг
perf(query): optimize user search      # Улучшение производительности
test(auth): add login unit tests       # Тесты
chore(deps): update react to v19       # Обслуживание
ci(github): add deploy workflow        # CI/CD настройки

# С BREAKING CHANGE (мажорное изменение)
feat(api)!: change response format     # ! означает breaking change

# Подробное тело коммита
feat(auth): implement JWT refresh

BREAKING CHANGE: API now requires refresh token
- Add refresh token endpoint
- Update auth middleware
- Migration script included

Closes #123`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Именование веток и коммитов</h3>
        <span className="card-badge">Conventions</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем Conventional Commits?</div>
          <p>Автоматическая генерация CHANGELOG, семантическое версионирование (semver), 
          понятная история, триггеры CI/CD по типу коммита.</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={branchingCode} language="bash" />
      </div>
    </div>
  )
}

function CommonCommands() {
  const [tab, setTab] = useState<'basic' | 'branch' | 'advanced'>('basic')

  const basicCode = `# ═══════════════════════════════════════════════════════════════
# 📋 БАЗОВЫЕ КОМАНДЫ
# ═══════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────
# СОСТОЯНИЕ РЕПОЗИТОРИЯ
# ─────────────────────────────────────────────────────────────
git status                    # Что изменилось?
git diff                      # Показать изменения
git diff --staged             # Показать что в staging
git log --oneline -10         # Последние 10 коммитов
git log --graph --oneline     # Визуализация веток

# ─────────────────────────────────────────────────────────────
# ДОБАВЛЕНИЕ И КОММИТ
# ─────────────────────────────────────────────────────────────
git add .                     # Добавить все изменения
git add -p                    # Интерактивно выбрать изменения
git commit -m "message"       # Создать коммит
git commit --amend            # Изменить последний коммит
git commit --amend --no-edit  # Добавить файлы к последнему коммиту

# ─────────────────────────────────────────────────────────────
# СИНХРОНИЗАЦИЯ
# ─────────────────────────────────────────────────────────────
git fetch                     # Скачать изменения (не применять)
git pull                      # fetch + merge
git pull --rebase             # fetch + rebase (чище история)
git push                      # Отправить коммиты
git push -u origin branch     # Push новой ветки`

  const branchCode = `# ═══════════════════════════════════════════════════════════════
# 🌿 РАБОТА С ВЕТКАМИ
# ═══════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────
# СОЗДАНИЕ И ПЕРЕКЛЮЧЕНИЕ
# ─────────────────────────────────────────────────────────────
git branch                     # Список локальных веток
git branch -a                  # Все ветки (+ remote)
git branch feature/new-ui      # Создать ветку
git checkout feature/new-ui    # Переключиться
git checkout -b feature/new-ui # Создать и переключиться
git switch -c feature/new-ui   # Новый синтаксис (рекомендуется)

# ─────────────────────────────────────────────────────────────
# ОБНОВЛЕНИЕ ВЕТКИ
# ─────────────────────────────────────────────────────────────

# Способ 1: Merge (создаёт merge commit)
git checkout feature/my-branch
git merge main                 # Вливаем main в текущую ветку

# Способ 2: Rebase (переносит коммиты, чище история)
git checkout feature/my-branch
git rebase main                # Перебазируем на main
# После rebase нужен force push:
git push --force-with-lease    # Безопаснее чем --force

# ─────────────────────────────────────────────────────────────
# УДАЛЕНИЕ ВЕТОК
# ─────────────────────────────────────────────────────────────
git branch -d feature/old      # Удалить локальную (если merged)
git branch -D feature/old      # Удалить принудительно
git push origin --delete branch # Удалить remote ветку`

  const advancedCode = `# ═══════════════════════════════════════════════════════════════
# 🔧 ПРОДВИНУТЫЕ КОМАНДЫ
# ═══════════════════════════════════════════════════════════════

# ─────────────────────────────────────────────────────────────
# STASH — временное сохранение изменений
# ─────────────────────────────────────────────────────────────
git stash                      # Сохранить изменения
git stash push -m "WIP auth"   # С сообщением
git stash list                 # Список stash-ей
git stash pop                  # Применить и удалить последний
git stash apply stash@{2}      # Применить конкретный
git stash drop stash@{0}       # Удалить stash

# ─────────────────────────────────────────────────────────────
# ИНТЕРАКТИВНЫЙ REBASE — редактирование истории
# ─────────────────────────────────────────────────────────────
git rebase -i HEAD~5           # Редактировать последние 5 коммитов

# В редакторе:
# pick   — оставить коммит
# reword — изменить сообщение
# squash — объединить с предыдущим
# drop   — удалить коммит
# edit   — остановиться для правок

# ─────────────────────────────────────────────────────────────
# CHERRY-PICK — взять конкретный коммит
# ─────────────────────────────────────────────────────────────
git cherry-pick abc1234        # Применить коммит в текущую ветку
git cherry-pick abc1234 def5678 # Несколько коммитов

# ─────────────────────────────────────────────────────────────
# RESET — отмена коммитов
# ─────────────────────────────────────────────────────────────
git reset --soft HEAD~1        # Отменить коммит, сохранить изменения в staging
git reset --mixed HEAD~1       # Отменить коммит, сохранить изменения (не в staging)
git reset --hard HEAD~1        # УДАЛИТЬ коммит и изменения (ОПАСНО!)

# ─────────────────────────────────────────────────────────────
# REVERT — безопасная отмена (создаёт новый коммит)
# ─────────────────────────────────────────────────────────────
git revert abc1234             # Отменить коммит новым коммитом
git revert HEAD                # Отменить последний коммит`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Git команды</h3>
        <span className="card-badge">Шпаргалка</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button className={`btn ${tab === 'basic' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('basic')}>
          📋 Базовые
        </button>
        <button className={`btn ${tab === 'branch' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('branch')}>
          🌿 Ветки
        </button>
        <button className={`btn ${tab === 'advanced' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('advanced')}>
          🔧 Продвинутые
        </button>
      </div>

      {tab === 'basic' && <CodeBlock code={basicCode} language="bash" />}
      {tab === 'branch' && <CodeBlock code={branchCode} language="bash" />}
      {tab === 'advanced' && <CodeBlock code={advancedCode} language="bash" />}
    </div>
  )
}

function PRBestPractices() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Pull Request Best Practices</h3>
        <span className="card-badge">Team Work</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Размер PR */}
        <div>
          <h4 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>📏 Размер PR</h4>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
            <span style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              ✅ Хорошо: 100–400 строк
            </span>
            <span style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              ❌ Плохо: 2000+ строк — сложно review
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Если задача большая — разбей на несколько PR: <em>1) API эндпоинт → 2) UI компоненты → 3) Интеграция и тесты</em>
          </p>
        </div>

        {/* Описание PR */}
        <div>
          <h4 style={{ margin: '0 0 12px', color: 'var(--text-primary)' }}>📝 Шаблон описания PR</h4>
          <div style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>## Что сделано</p>
            <ul className="info-list">
              <li>Добавлена авторизация через OAuth2</li>
              <li>Интегрированы провайдеры Google и GitHub</li>
            </ul>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>## Зачем</p>
            <p style={{ margin: '0 0 12px', color: 'var(--text-secondary)' }}>Closes #123 — Пользователи просили социальный логин</p>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>## Как тестировать</p>
            <ol className="info-list">
              <li>Перейти на /login</li>
              <li>Нажать «Войти через Google»</li>
              <li>Проверить редирект на dashboard</li>
            </ol>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>## Чеклист</p>
            <div style={{ color: 'var(--text-secondary)' }}>
              <div>☑️ Тесты проходят</div>
              <div>☑️ Нет ошибок линтера</div>
              <div>☐ Обновлена документация</div>
            </div>
          </div>
        </div>

        {/* Code Review */}
        <div>
          <h4 style={{ margin: '0 0 8px', color: 'var(--text-primary)' }}>🔍 Code Review — на что смотреть</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
            {[
              ['✅', 'Логика', 'Правильно ли решена задача?'],
              ['✅', 'Читаемость', 'Понятен ли код?'],
              ['✅', 'Тесты', 'Покрыты ли edge cases?'],
              ['✅', 'Производительность', 'Нет ли N+1 запросов?'],
              ['✅', 'Безопасность', 'Валидация, XSS, CSRF?'],
              ['✅', 'Совместимость', 'Нет ли breaking changes?'],
            ].map(([icon, title, desc], i) => (
              <div key={i} style={{ background: 'var(--bg-secondary)', padding: '10px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                <span>{icon} <strong>{title}</strong></span>
                <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Squash & Merge */}
        <div className="info-box">
          <span className="info-box-icon">🔀</span>
          <div className="info-box-content">
            <div className="info-box-title">Squash & Merge</div>
            <p>При merge в main — squash все коммиты в один. Вместо «fix typo → WIP → add tests → fix tests» получаем чистое <code>feat(auth): add OAuth2 login (#123)</code></p>
          </div>
        </div>
      </div>
    </div>
  )
}

function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Чем отличается merge от rebase?",
      a: "Merge создаёт merge commit, сохраняя полную историю. Rebase переносит коммиты, создавая линейную историю. Rebase — чище история, но переписывает коммиты (нужен force push)."
    },
    {
      q: "Когда использовать rebase, когда merge?",
      a: "Rebase: обновление feature ветки от main (перед PR). Merge: вливание feature в main. Правило: никогда не rebase публичные ветки!"
    },
    {
      q: "Как отменить последний коммит?",
      a: "reset --soft HEAD~1 — отмена с сохранением изменений в staging. reset --hard HEAD~1 — полное удаление (опасно). revert — безопасная отмена новым коммитом."
    },
    {
      q: "Что такое git stash?",
      a: "Временное сохранение незакоммиченных изменений. Полезно когда нужно срочно переключиться на другую ветку. stash push сохраняет, stash pop восстанавливает."
    }
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">❓ Вопросы на собеседовании</h3>
        <span className="card-badge">Interview</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((item, i) => (
          <div 
            key={i}
            style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ marginTop: '12px', color: 'var(--accent-green)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
