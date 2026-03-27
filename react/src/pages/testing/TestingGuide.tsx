import CodeBlock from '../../components/CodeBlock'

export default function TestingGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧪 Тестирование React-компонентов</h1>
        <p>Vitest + React Testing Library: компоненты, асинхронность, моки, доступность</p>
        <a
          href="https://testing-library.com/docs/react-testing-library/intro"
          target="_blank"
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React Testing Library docs
        </a>
      </div>

      <StackOverview />
      <ComponentTesting />
      <AsyncTesting />
      <MockingSection />
      <AccessibilityTesting />
      <Patterns />
    </div>
  )
}

/* ─── Stack overview ──────────────────────────────────── */

function StackOverview() {
  const setupCode = `// vite.config.ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})`

  const setupFileCode = `// src/test/setup.ts
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// Автоматическая очистка DOM после каждого теста
afterEach(() => {
  cleanup()
})`

  const depsCode = `# Основные зависимости для тестирования
npm i -D vitest @testing-library/react @testing-library/jest-dom
npm i -D @testing-library/user-event jsdom`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Стек тестирования</h3>
        <span className="card-badge">Конфигурация</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <strong>Почему Vitest + RTL?</strong>
          <ul className="info-list">
            <li><strong>Vitest</strong> — test runner, совместим с Vite, быстрый HMR для тестов, ESM из коробки</li>
            <li><strong>React Testing Library</strong> — рендерит компоненты и находит элементы так, как это делает пользователь</li>
            <li><strong>jest-dom</strong> — матчеры вроде <code>toBeVisible()</code>, <code>toHaveTextContent()</code></li>
            <li><strong>user-event</strong> — реалистичная симуляция ввода (click, type, tab) вместо <code>fireEvent</code></li>
          </ul>
        </div>
      </div>

      <CodeBlock code={depsCode} language="bash" title="Установка" />
      <CodeBlock code={setupCode} language="tsx" title="vite.config.ts" />
      <CodeBlock code={setupFileCode} language="tsx" title="src/test/setup.ts" />

      <div className="info-box">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <strong>Альтернативы</strong><br />
          Jest всё ещё популярен, но требует трансформеров для ESM/TS.
          Если проект уже на Vite — Vitest быстрее и проще.
          Для E2E-тестов смотрите Playwright или Cypress — они вне скоупа этого модуля.
        </div>
      </div>
    </div>
  )
}

/* ─── Component testing ───────────────────────────────── */

function ComponentTesting() {
  const basicCode = `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('отображает начальное значение', () => {
    render(<Counter initial={5} />)

    // screen.getByRole ищет по ARIA-роли — самый устойчивый селектор
    expect(screen.getByRole('heading')).toHaveTextContent('5')
  })

  it('увеличивает счётчик по клику', async () => {
    const user = userEvent.setup()
    render(<Counter initial={0} />)

    await user.click(screen.getByRole('button', { name: /increment/i }))

    expect(screen.getByRole('heading')).toHaveTextContent('1')
  })
})`

  const queriesCode = `// Приоритет запросов (от лучшего к худшему):
//
// 1. getByRole      — доступность: кнопки, ссылки, заголовки
// 2. getByLabelText — input'ы по связанному <label>
// 3. getByPlaceholderText — когда нет label (не рекомендуется)
// 4. getByText      — статический текст
// 5. getByDisplayValue — текущее значение input
// 6. getByAltText   — картинки
// 7. getByTitle     — title-атрибут
// 8. getByTestId    — последний способ, data-testid="..."

// Варианты:
// getBy...    → бросает ошибку, если не найден (синхронный)
// queryBy...  → возвращает null, если не найден
// findBy...   → возвращает Promise, ждёт появления элемента

// Пример: убеждаемся, что элемента НЕТ в DOM
expect(screen.queryByRole('alert')).not.toBeInTheDocument()

// Пример: ждём появления элемента (async)
const alert = await screen.findByRole('alert')
expect(alert).toHaveTextContent('Ошибка')`

  const userEventCode = `import userEvent from '@testing-library/user-event'

it('form submission flow', async () => {
  const user = userEvent.setup()
  render(<LoginForm onSubmit={vi.fn()} />)

  // Ввод текста — реалистично, посимвольно
  await user.type(screen.getByLabelText(/email/i), 'test@example.com')
  await user.type(screen.getByLabelText(/пароль/i), 'secret123')

  // Tab — перемещает фокус, как настоящий пользователь
  await user.tab()
  expect(screen.getByRole('button', { name: /войти/i })).toHaveFocus()

  // Click
  await user.click(screen.getByRole('button', { name: /войти/i }))

  // Clear + retype
  await user.clear(screen.getByLabelText(/email/i))
  await user.type(screen.getByLabelText(/email/i), 'new@example.com')

  // Select option
  await user.selectOptions(screen.getByRole('combobox'), 'admin')

  // Keyboard shortcut
  await user.keyboard('{Enter}')
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Тестирование компонентов</h3>
        <span className="card-badge">Основы</span>
      </div>

      <CodeBlock code={basicCode} language="tsx" title="Базовый тест компонента" />

      <h4 style={{ margin: '16px 0 8px' }}>Запросы к DOM</h4>
      <CodeBlock code={queriesCode} language="tsx" title="Приоритет запросов RTL" />

      <h4 style={{ margin: '16px 0 8px' }}>user-event вместо fireEvent</h4>
      <CodeBlock code={userEventCode} language="tsx" title="Реалистичный ввод" />

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <strong>Ключевой принцип RTL</strong><br />
          Тестируйте поведение, а не реализацию. Не проверяйте внутренний state
          или количество рендеров — проверяйте, что видит пользователь.
        </div>
      </div>
    </div>
  )
}

/* ─── Async testing ───────────────────────────────────── */

function AsyncTesting() {
  const asyncComponentCode = `// UserProfile.tsx
import { useState, useEffect } from 'react'

export default function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('Не удалось загрузить')
        return res.json()
      })
      .then(data => { if (!cancelled) setUser(data) })
      .catch(err => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [userId])

  if (loading) return <p role="status">Загрузка...</p>
  if (error) return <p role="alert">{error}</p>
  return <h2>{user?.name}</h2>
}`

  const asyncTestCode = `import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserProfile from './UserProfile'

describe('UserProfile', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('показывает загрузку, затем имя пользователя', async () => {
    // Мок fetch — резолвится с данными
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ name: 'Алиса' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    )

    render(<UserProfile userId="1" />)

    // Сначала — индикатор загрузки
    expect(screen.getByRole('status')).toHaveTextContent('Загрузка')

    // findBy ждёт появления элемента (по умолчанию до 1000 мс)
    const heading = await screen.findByRole('heading')
    expect(heading).toHaveTextContent('Алиса')

    // Загрузка пропала
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('показывает ошибку при неудачном запросе', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(
      new Response(null, { status: 500 })
    )

    render(<UserProfile userId="1" />)

    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Не удалось загрузить')
  })
})`

  const waitForCode = `import { render, screen, waitFor, waitForElementToBeRemoved }
  from '@testing-library/react'

// waitFor — повторяет assertion до успеха или таймаута
await waitFor(() => {
  expect(screen.getByText('Готово')).toBeInTheDocument()
}, { timeout: 3000 })

// waitForElementToBeRemoved — ждёт пока элемент исчезнет
await waitForElementToBeRemoved(
  () => screen.queryByText('Загрузка...')
)

// act() — обычно НЕ нужен с RTL (render и userEvent оборачивают сами)
// Используйте act() только если получаете warning в консоли`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Асинхронные сценарии</h3>
        <span className="card-badge">Async</span>
      </div>

      <CodeBlock code={asyncComponentCode} language="tsx" title="Компонент с fetch" />
      <CodeBlock code={asyncTestCode} language="tsx" title="Тест асинхронного компонента" />

      <h4 style={{ margin: '16px 0 8px' }}>waitFor и waitForElementToBeRemoved</h4>
      <CodeBlock code={waitForCode} language="tsx" title="Утилиты ожидания" />

      <div className="info-box">
        <span className="info-box-icon">⚠️</span>
        <div className="info-box-content">
          <strong>Типичные ошибки</strong>
          <ul className="info-list">
            <li>Забыть <code>await</code> перед <code>findBy</code> — тест проходит, но не ждёт обновления</li>
            <li>Использовать <code>getBy</code> для элемента, который появляется асинхронно — нужен <code>findBy</code></li>
            <li>Оборачивать всё в <code>act()</code> вручную — RTL делает это за вас</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── Mocking ─────────────────────────────────────────── */

function MockingSection() {
  const mockModuleCode = `import { vi, describe, it, expect } from 'vitest'

// Мок целого модуля
vi.mock('./api/users', () => ({
  fetchUser: vi.fn(),
}))

import { fetchUser } from './api/users'

describe('с замоканным модулем', () => {
  it('использует мок функции', async () => {
    // TypeScript знает, что fetchUser — мок
    vi.mocked(fetchUser).mockResolvedValueOnce({ id: '1', name: 'Bob' })

    render(<UserProfile userId="1" />)

    await screen.findByText('Bob')
    expect(fetchUser).toHaveBeenCalledWith('1')
  })
})`

  const mockTimerCode = `import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('Debounced search', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('вызывает поиск после задержки', async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime, // ← важно для fake timers
    })

    render(<SearchInput onSearch={onSearch} debounce={300} />)

    await user.type(screen.getByRole('searchbox'), 'react')

    // Ещё не вызвано — debounce не истёк
    expect(onSearch).not.toHaveBeenCalled()

    // Перематываем таймеры
    vi.advanceTimersByTime(300)

    expect(onSearch).toHaveBeenCalledWith('react')
    expect(onSearch).toHaveBeenCalledTimes(1)
  })
})`

  const mockProviderCode = `// Обёртка для компонентов, зависящих от контекста или роутера
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'

function renderWithProviders(
  ui: React.ReactElement,
  { route = '/', ...options } = {}
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <MemoryRouter initialEntries={[route]}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </MemoryRouter>
    ),
    ...options,
  })
}

// Использование
it('renders dashboard at /dashboard', () => {
  renderWithProviders(<App />, { route: '/dashboard' })
  expect(screen.getByRole('heading')).toHaveTextContent('Dashboard')
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Моки и изоляция</h3>
        <span className="card-badge">Mocking</span>
      </div>

      <h4 style={{ margin: '0 0 8px' }}>Мок модулей</h4>
      <CodeBlock code={mockModuleCode} language="tsx" title="vi.mock() для модулей" />

      <h4 style={{ margin: '16px 0 8px' }}>Мок таймеров</h4>
      <CodeBlock code={mockTimerCode} language="tsx" title="Fake timers + debounce" />

      <h4 style={{ margin: '16px 0 8px' }}>Обёртки с провайдерами</h4>
      <CodeBlock code={mockProviderCode} language="tsx" title="Custom render с Router/Context" />

      <div className="info-box">
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <strong>Когда мокать, а когда нет</strong>
          <ul className="info-list">
            <li><strong>Мокайте</strong>: сетевые запросы, таймеры, внешние сервисы, тяжёлые зависимости</li>
            <li><strong>Не мокайте</strong>: дочерние компоненты (тестируйте интеграцию), стандартные хуки React</li>
            <li>Для HTTP рассмотрите <strong>MSW</strong> (Mock Service Worker) — перехватывает на уровне сети, ближе к реальности</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ─── Accessibility testing ───────────────────────────── */

function AccessibilityTesting() {
  const a11yCode = `import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Доступность формы', () => {
  it('все input связаны с label', () => {
    render(<RegistrationForm />)

    // getByLabelText гарантирует, что label правильно связан с input
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/пароль/i)).toBeInTheDocument()
  })

  it('ошибки связаны с полями через aria-describedby', async () => {
    const user = userEvent.setup()
    render(<RegistrationForm />)

    // Отправляем пустую форму
    await user.click(screen.getByRole('button', { name: /зарегистрироваться/i }))

    // Ошибка отображается
    const emailInput = screen.getByLabelText(/email/i)
    const errorId = emailInput.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()

    const error = document.getElementById(errorId!)
    expect(error).toHaveTextContent(/обязательное поле/i)

    // Поле помечено как невалидное
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('модальное окно управляется с клавиатуры', async () => {
    const user = userEvent.setup()
    render(<ConfirmDialog />)

    await user.click(screen.getByRole('button', { name: /удалить/i }))

    // Диалог появился, фокус внутри
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // Escape закрывает
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    // Фокус вернулся на кнопку-триггер
    expect(screen.getByRole('button', { name: /удалить/i })).toHaveFocus()
  })
})`

  const axeCode = `// Автоматическая проверка WCAG с vitest-axe / jest-axe
// npm i -D vitest-axe
import { axe, toHaveNoViolations } from 'vitest-axe'

expect.extend(toHaveNoViolations)

it('не содержит нарушений WCAG', async () => {
  const { container } = render(<Navigation />)

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Если нужно игнорировать известные проблемы:
it('проверяет a11y с исключениями', async () => {
  const { container } = render(<LegacyWidget />)

  const results = await axe(container, {
    rules: {
      'color-contrast': { enabled: false }, // временно отключить
    },
  })
  expect(results).toHaveNoViolations()
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Тесты доступности (a11y)</h3>
        <span className="card-badge">Accessibility</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">♿</span>
        <div className="info-box-content">
          <strong>Зачем тестировать доступность?</strong><br />
          RTL уже поощряет a11y через приоритет ролевых запросов.
          Если <code>getByRole</code> не находит элемент — значит он недоступен для скринридера.
          Дополнительно axe ловит проблемы контраста, отсутствие alt-текстов, неправильную структуру заголовков.
        </div>
      </div>

      <h4 style={{ margin: '0 0 8px' }}>Ручные a11y-проверки</h4>
      <CodeBlock code={a11yCode} language="tsx" title="Тесты через роли и ARIA" />

      <h4 style={{ margin: '16px 0 8px' }}>Автоматическая проверка axe</h4>
      <CodeBlock code={axeCode} language="tsx" title="vitest-axe — WCAG-аудит в тестах" />
    </div>
  )
}

/* ─── Patterns ────────────────────────────────────────── */

function Patterns() {
  const structureCode = `# Рекомендуемая структура
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx      ← рядом с компонентом
│   │   └── Button.module.css
│   └── UserProfile/
│       ├── UserProfile.tsx
│       └── UserProfile.test.tsx
├── hooks/
│   ├── useAuth.ts
│   └── useAuth.test.ts
├── test/
│   ├── setup.ts                 ← глобальный setup
│   └── utils.tsx                ← renderWithProviders и хелперы
└── ...`

  const hookTestCode = `import { renderHook, act } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import useCounter from './useCounter'

describe('useCounter', () => {
  it('инкрементирует', () => {
    const { result } = renderHook(() => useCounter(0))

    expect(result.current.count).toBe(0)

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('реагирует на смену initialValue', () => {
    const { result, rerender } = renderHook(
      ({ init }) => useCounter(init),
      { initialProps: { init: 5 } }
    )

    expect(result.current.count).toBe(5)

    rerender({ init: 10 })
    // Зависит от реализации: сбрасывает ли хук значение при смене пропса
  })
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Организация и паттерны</h3>
        <span className="card-badge">Best practices</span>
      </div>

      <CodeBlock code={structureCode} language="bash" title="Структура файлов" />

      <h4 style={{ margin: '16px 0 8px' }}>Тестирование хуков</h4>
      <CodeBlock code={hookTestCode} language="tsx" title="renderHook для кастомных хуков" />

      <div className="info-box">
        <span className="info-box-icon">✅</span>
        <div className="info-box-content">
          <strong>Чеклист хорошего теста</strong>
          <ul className="info-list">
            <li>Название описывает <em>поведение</em>, а не реализацию</li>
            <li>Не зависит от порядка запуска</li>
            <li>Использует <code>getByRole</code> / <code>getByLabelText</code> вместо CSS-селекторов</li>
            <li>Один assertion-блок на один сценарий</li>
            <li>Моки очищаются в <code>afterEach</code></li>
            <li>Тест падает при реальном баге и не падает при рефакторинге</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
