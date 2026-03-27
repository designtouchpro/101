import CodeBlock from '../../components/CodeBlock'

const code = `// Chain of Responsibility — цепочка обработчиков

interface Handler {
  setNext(handler: Handler): Handler
  handle(request: Request): Response | null
}

// Базовый класс с поддержкой цепочки
abstract class BaseHandler implements Handler {
  private next: Handler | null = null

  setNext(handler: Handler): Handler {
    this.next = handler
    return handler // для цепочки вызовов
  }

  handle(request: Request): Response | null {
    if (this.next) return this.next.handle(request)
    return null
  }
}

// Конкретные обработчики
class AuthHandler extends BaseHandler {
  handle(request: Request) {
    const token = request.headers.get('Authorization')
    if (!token) {
      return new Response('Unauthorized', { status: 401 })
    }
    console.log('✅ Auth OK')
    return super.handle(request) // передаём дальше
  }
}

class RateLimitHandler extends BaseHandler {
  private requests = new Map<string, number>()

  handle(request: Request) {
    const ip = request.headers.get('X-IP') ?? 'unknown'
    const count = (this.requests.get(ip) ?? 0) + 1
    this.requests.set(ip, count)

    if (count > 100) {
      return new Response('Too Many Requests', { status: 429 })
    }
    console.log(\`✅ Rate limit OK (\${count}/100)\`)
    return super.handle(request)
  }
}

class ValidationHandler extends BaseHandler {
  handle(request: Request) {
    if (request.method === 'POST' && !request.headers.get('Content-Type')) {
      return new Response('Content-Type required', { status: 400 })
    }
    console.log('✅ Validation OK')
    return super.handle(request)
  }
}

// Собираем цепочку
const auth = new AuthHandler()
const rateLimit = new RateLimitHandler()
const validation = new ValidationHandler()

auth.setNext(rateLimit).setNext(validation)

// Запрос проходит через: Auth → RateLimit → Validation
auth.handle(new Request('/api/data'))`

const frontendCode = `// Фронтенд: middleware — классический CoR

// Express middleware
app.use(cors())          // 1. CORS
app.use(helmet())        // 2. Security headers
app.use(rateLimit())     // 3. Rate limiting
app.use(auth())          // 4. Authentication
app.use(validate())      // 5. Validation
app.use(handler())       // 6. Business logic

// DOM Event Bubbling — встроенный CoR!
// Клик по <button> внутри <div> внутри <body>:
// button.onclick → div.onclick → body.onclick
// Каждый обработчик может:
//   - обработать событие
//   - передать дальше (по умолчанию)
//   - остановить цепочку (stopPropagation)

document.querySelector('.child')?.addEventListener('click', (e) => {
  console.log('Child handled')
  // e.stopPropagation() — остановить цепочку
})

document.querySelector('.parent')?.addEventListener('click', () => {
  console.log('Parent handled') // если child не остановил
})

// Redux middleware — тоже CoR
const logger = store => next => action => {
  console.log('Action:', action)
  return next(action) // передаём дальше по цепочке
}`

export default function ChainOfResponsibility() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⛓ Chain of Responsibility (Цепочка обязанностей)</h1>
        <p>Передаёт запрос по цепочке обработчиков, каждый из которых решает: обработать или передать дальше</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Техподдержка.</strong> Звонок идёт оператору → старшему специалисту → менеджеру → директору. Каждый уровень решает: «я могу помочь» или «передаю выше»</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="CoR — HTTP middleware pipeline" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Express middleware, DOM Events, Redux" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Middleware (Express, Koa, Redux)</li>
          <li>Event bubbling в DOM</li>
          <li>Валидация форм (последовательные проверки)</li>
          <li>Обработка ошибок (try/catch цепочки)</li>
        </ul>
      </div>
    </div>
  )
}
