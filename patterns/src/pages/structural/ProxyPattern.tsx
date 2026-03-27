import CodeBlock from '../../components/CodeBlock'

const code = `// Proxy — контролирует доступ к объекту

// 1. Кэширующий Proxy
interface API {
  getUser(id: string): Promise<User>
}

class RealAPI implements API {
  async getUser(id: string): Promise<User> {
    console.log(\`🌐 HTTP GET /users/\${id}\`) 
    const res = await fetch(\`/api/users/\${id}\`)
    return res.json()
  }
}

class CachingProxy implements API {
  private cache = new Map<string, { data: User; expires: number }>()

  constructor(
    private api: API,
    private ttl = 60000  // TTL в мс
  ) {}

  async getUser(id: string): Promise<User> {
    const cached = this.cache.get(id)
    if (cached && cached.expires > Date.now()) {
      console.log(\`📦 Cache hit: \${id}\`)
      return cached.data
    }

    console.log(\`🔄 Cache miss: \${id}\`)
    const data = await this.api.getUser(id)
    this.cache.set(id, { data, expires: Date.now() + this.ttl })
    return data
  }
}

const api: API = new CachingProxy(new RealAPI(), 30000)
await api.getUser('1') // 🌐 HTTP GET /users/1
await api.getUser('1') // 📦 Cache hit: 1`

const frontendCode = `// Фронтенд: JS Proxy — встроенный в язык!

// 1. Reactive Proxy (как работает Vue 3 реактивность)
function reactive<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      track(obj, prop) // отслеживаем чтение
      return Reflect.get(obj, prop, receiver)
    },
    set(obj, prop, value, receiver) {
      const result = Reflect.set(obj, prop, value, receiver)
      trigger(obj, prop) // уведомляем об изменении
      return result
    }
  })
}

const state = reactive({ count: 0 })
state.count++ // автоматически обновит UI!

// 2. Валидирующий Proxy
const user = new Proxy({ name: '', age: 0 }, {
  set(obj, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('age must be a positive number')
    }
    if (prop === 'name' && typeof value !== 'string') {
      throw new Error('name must be a string')
    }
    return Reflect.set(obj, prop, value)
  }
})

user.age = -5 // ❌ Error: age must be a positive number

// 3. Ленивая загрузка (Lazy Proxy)
function lazyImage(src: string) {
  let loaded = false
  return new Proxy({} as HTMLImageElement, {
    get(_, prop) {
      if (!loaded) {
        console.log(\`Loading image: \${src}\`)
        loaded = true
      }
      // загрузка происходит только при первом доступе
    }
  })
}`

export default function ProxyPattern() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🛡 Proxy (Заместитель)</h1>
        <p>Предоставляет суррогатный объект, контролирующий доступ к другому объекту</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Банковская карта.</strong> Карта — прокси для банковского счёта. Она контролирует доступ (PIN, лимиты), логирует операции и может блокировать доступ, не меняя сам счёт</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Proxy — кэширующий API-клиент" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="JS Proxy — реактивность, валидация, lazy loading" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">🔥</span>
          <div className="info-box-content">
            <div className="info-box-title">Vue 3 = Proxy</div>
            <p>Вся реактивность Vue 3 построена на JS Proxy. Когда вы пишете <code>reactive(obj)</code>, Vue оборачивает объект в Proxy для отслеживания изменений</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Кэширование API-запросов</li>
          <li>Реактивность (Vue 3, MobX)</li>
          <li>Валидация данных при записи</li>
          <li>Ленивая загрузка (lazy loading)</li>
          <li>Логирование, rate limiting, access control</li>
        </ul>
      </div>
    </div>
  )
}
