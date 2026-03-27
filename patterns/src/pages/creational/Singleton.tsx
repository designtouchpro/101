import CodeBlock from '../../components/CodeBlock'

const code = `// Singleton — гарантирует один экземпляр класса

class AppConfig {
  private static instance: AppConfig

  private constructor(
    public readonly apiUrl: string,
    public readonly debug: boolean
  ) {}

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig(
        import.meta.env.VITE_API_URL || 'http://localhost:3000',
        import.meta.env.DEV
      )
    }
    return AppConfig.instance
  }
}

// Всегда один и тот же экземпляр
const config1 = AppConfig.getInstance()
const config2 = AppConfig.getInstance()
console.log(config1 === config2) // true`

const frontendCode = `// Фронтенд примеры Singleton

// 1. Глобальный EventBus
class EventBus {
  private static instance: EventBus
  private listeners = new Map<string, Set<Function>>()

  private constructor() {}

  static getInstance() {
    return this.instance ??= new EventBus()
  }

  on(event: string, handler: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(handler)
  }

  emit(event: string, ...args: any[]) {
    this.listeners.get(event)?.forEach(fn => fn(...args))
  }
}

// 2. Модульный синглтон (самый частый в JS)
// logger.ts — каждый import получает один и тот же объект
let logs: string[] = []

export const logger = {
  log(msg: string) { logs.push(msg); console.log(msg) },
  getLogs() { return [...logs] }
}

// 3. Zustand / Pinia store — по сути Singleton
// const useStore = create((set) => ({ count: 0 }))
// Один store на всё приложение`

export default function Singleton() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>1️⃣ Singleton (Одиночка)</h1>
        <p>Гарантирует существование только одного экземпляра класса и предоставляет глобальную точку доступа</p>
        <span className="pattern-category cat-creational">Порождающий</span>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Правительство страны.</strong> Может быть только одно правительство. Неважно кто к нему обращается — это всегда один и тот же орган. Создать второе правительство невозможно</div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-green">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Singleton — классическая реализация" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Singleton на фронтенде" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Глобальная конфигурация приложения</li>
          <li>Логгер, EventBus, кэш</li>
          <li>Store (Zustand, Pinia, Redux)</li>
          <li>Соединение с БД / WebSocket</li>
        </ul>
        <ul className="use-cases anti-cases" style={{ marginTop: 12 }}>
          <li>Не используй для подменяемых зависимостей (сложнее тестировать)</li>
          <li>В JS модули уже синглтоны — не городи классы ради классов</li>
        </ul>
      </div>
    </div>
  )
}
