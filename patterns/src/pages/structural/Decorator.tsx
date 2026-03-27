import CodeBlock from '../../components/CodeBlock'

const code = `// Decorator — динамическое добавление поведения

// Базовый интерфейс
interface Logger {
  log(message: string): void
}

// Базовая реализация
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(message)
  }
}

// Декораторы — оборачивают и расширяют
class TimestampLogger implements Logger {
  constructor(private wrapped: Logger) {}

  log(message: string) {
    const time = new Date().toISOString()
    this.wrapped.log(\`[\${time}] \${message}\`)
  }
}

class ColorLogger implements Logger {
  constructor(private wrapped: Logger, private color: string) {}

  log(message: string) {
    this.wrapped.log(\`%c\${message}\`, \`color: \${this.color}\`)
  }
}

class PrefixLogger implements Logger {
  constructor(private wrapped: Logger, private prefix: string) {}

  log(message: string) {
    this.wrapped.log(\`[\${this.prefix}] \${message}\`)
  }
}

// Композиция декораторов — как матрёшка
const logger = new TimestampLogger(
  new PrefixLogger(
    new ConsoleLogger(),
    'APP'
  )
)

logger.log('Сервер запущен')
// [2025-01-15T12:00:00Z] [APP] Сервер запущен`

const frontendCode = `// Фронтенд: декораторы-функции (HOF)

// 1. Декоратор для fetch — добавляет авторизацию
function withAuth(fetchFn: typeof fetch): typeof fetch {
  return (url, options = {}) => {
    const token = localStorage.getItem('token')
    return fetchFn(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: \`Bearer \${token}\`,
      }
    })
  }
}

// 2. Декоратор — добавляет retry
function withRetry(fetchFn: typeof fetch, retries = 3): typeof fetch {
  return async (url, options) => {
    for (let i = 0; i < retries; i++) {
      try { return await fetchFn(url, options) }
      catch (e) { if (i === retries - 1) throw e }
    }
    throw new Error('unreachable')
  }
}

// 3. Декоратор — добавляет логирование
function withLogging(fetchFn: typeof fetch): typeof fetch {
  return async (url, options) => {
    console.log(\`→ \${options?.method ?? 'GET'} \${url}\`)
    const res = await fetchFn(url, options)
    console.log(\`← \${res.status}\`)
    return res
  }
}

// Композиция: auth → retry → logging → fetch
const apiFetch = withLogging(withRetry(withAuth(fetch), 3))

// React HOC — это тоже декоратор!
// const EnhancedComponent = withAuth(withLoading(MyComponent))`

export default function Decorator() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎀 Decorator (Декоратор)</h1>
        <p>Динамически добавляет объекту новое поведение, оборачивая его в специальный объект-обёртку</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Одежда.</strong> Человек (базовый объект) надевает футболку, потом свитер, потом куртку. Каждый слой добавляет функциональность (тепло), не меняя самого человека. Слои можно снимать и комбинировать</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Decorator — расширяемый логгер" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Декораторы функций (HOF/HOC)" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">React HOC → hooks</div>
            <p>В React HOC (withAuth, withLoading) — классические декораторы. Сейчас хуки заменили HOC, но паттерн тот же: добавление поведения без изменения компонента</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Обогащение fetch/API-клиента (auth, retry, cache, logging)</li>
          <li>Middleware (Express, Redux, Koa)</li>
          <li>React HOC / Vue mixins</li>
          <li>Когда наследование создало бы взрыв подклассов</li>
        </ul>
      </div>
    </div>
  )
}
