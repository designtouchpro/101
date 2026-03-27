import CodeBlock from '../../components/CodeBlock'

const entitiesCode = `// 1. ENTITIES — бизнес-правила предприятия
// Чистые объекты без зависимостей от фреймворков

interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'guest'
}

class UserEntity {
  constructor(private data: User) {}

  get id() { return this.data.id }
  get email() { return this.data.email }
  get name() { return this.data.name }
  get isAdmin() { return this.data.role === 'admin' }

  // Бизнес-правило: валидация email
  static isValidEmail(email: string): boolean {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
  }

  // Бизнес-правило: может ли удалять других
  canDelete(target: UserEntity): boolean {
    return this.isAdmin && target.id !== this.id
  }
}

// Entity НЕ знает о базе данных, API, React и т.д.
// Это чистая бизнес-логика`

const useCasesCode = `// 2. USE CASES — бизнес-правила приложения
// Оркестрируют entities, определяют что делать

// Порт (интерфейс) — определяется USE CASE, реализуется снаружи
interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  save(user: User): Promise<void>
  delete(id: string): Promise<void>
}

interface EmailService {
  sendWelcome(email: string, name: string): Promise<void>
}

// Use Case: Регистрация пользователя
class RegisterUserUseCase {
  constructor(
    private userRepo: UserRepository,    // порт
    private emailService: EmailService   // порт
  ) {}

  async execute(input: { email: string; name: string }): Promise<User> {
    // 1. Валидация (используем Entity)
    if (!UserEntity.isValidEmail(input.email)) {
      throw new Error('Invalid email')
    }

    // 2. Проверка уникальности
    const existing = await this.userRepo.findByEmail(input.email)
    if (existing) {
      throw new Error('Email already taken')
    }

    // 3. Создание
    const user: User = {
      id: crypto.randomUUID(),
      email: input.email,
      name: input.name,
      role: 'user'
    }

    // 4. Сохранение
    await this.userRepo.save(user)

    // 5. Уведомление
    await this.emailService.sendWelcome(user.email, user.name)

    return user
  }
}

// Use Case: Удаление пользователя
class DeleteUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(actorId: string, targetId: string): Promise<void> {
    const actor = await this.userRepo.findById(actorId)
    const target = await this.userRepo.findById(targetId)

    if (!actor || !target) throw new Error('User not found')

    const actorEntity = new UserEntity(actor)
    const targetEntity = new UserEntity(target)

    // Бизнес-правило делегируется Entity
    if (!actorEntity.canDelete(targetEntity)) {
      throw new Error('Permission denied')
    }

    await this.userRepo.delete(targetId)
  }
}`

const adaptersCode = `// 3. INTERFACE ADAPTERS — преобразование данных
// Controllers, Presenters, Gateways

// Gateway (реализация порта UserRepository)
class ApiUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const res = await fetch(\`/api/users/\${id}\`)
    if (!res.ok) return null
    return res.json()
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await fetch(\`/api/users?email=\${email}\`)
    const users = await res.json()
    return users[0] ?? null
  }

  async save(user: User): Promise<void> {
    await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  async delete(id: string): Promise<void> {
    await fetch(\`/api/users/\${id}\`, { method: 'DELETE' })
  }
}

// Presenter — трансформирует данные для UI
class UserPresenter {
  static toViewModel(user: User) {
    return {
      id: user.id,
      displayName: user.name,
      email: user.email,
      badge: user.role === 'admin' ? '👑 Админ' : '👤 Пользователь',
      initials: user.name.split(' ').map(w => w[0]).join('').toUpperCase()
    }
  }
}

// Controller — обрабатывает input из UI
class UserController {
  constructor(
    private registerUseCase: RegisterUserUseCase,
    private deleteUseCase: DeleteUserUseCase
  ) {}

  async handleRegister(formData: FormData) {
    const email = formData.get('email') as string
    const name = formData.get('name') as string

    try {
      const user = await this.registerUseCase.execute({ email, name })
      return { success: true, data: UserPresenter.toViewModel(user) }
    } catch (e) {
      return { success: false, error: (e as Error).message }
    }
  }
}`

const frameworksCode = `// 4. FRAMEWORKS & DRIVERS — внешний слой
// React, Express, PostgreSQL, localStorage...

// React-компонент (Frameworks layer)
function RegisterForm() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Композиция зависимостей (обычно через DI-контейнер)
  const userRepo = new ApiUserRepository()
  const emailService = new SendGridEmailService()
  const registerUseCase = new RegisterUserUseCase(userRepo, emailService)
  const controller = new UserController(registerUseCase, /* ... */)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await controller.handleRegister(new FormData(e.target))
    if (result.success) {
      setSuccess(true)
    } else {
      setError(result.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <input name="name" />
      <button type="submit">Регистрация</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

// Другая реализация того же порта (для тестов)
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map()

  async findById(id: string) {
    return this.users.get(id) ?? null
  }
  async findByEmail(email: string) {
    return [...this.users.values()].find(u => u.email === email) ?? null
  }
  async save(user: User) {
    this.users.set(user.id, user)
  }
  async delete(id: string) {
    this.users.delete(id)
  }
}

// В тестах подменяем реализации — Use Case НЕ меняется!
const testRepo = new InMemoryUserRepository()
const testEmail = { sendWelcome: async () => {} }
const useCase = new RegisterUserUseCase(testRepo, testEmail)`

const frontendCleanCode = `// Clean Architecture на фронтенде (практический пример)
//
// src/
// ├── domain/              ← Entities + Use Case interfaces
// │   ├── entities/
// │   │   └── Product.ts
// │   ├── repositories/    ← Порты (интерфейсы)
// │   │   └── ProductRepository.ts
// │   └── usecases/
// │       ├── GetProducts.ts
// │       └── AddToCart.ts
// ├── data/                ← Interface Adapters (реализации портов)
// │   ├── api/
// │   │   └── ApiProductRepository.ts
// │   └── mappers/
// │       └── ProductMapper.ts
// ├── presentation/        ← UI (Frameworks)
// │   ├── hooks/
// │   │   └── useProducts.ts
// │   ├── components/
// │   │   └── ProductCard.tsx
// │   └── pages/
// │       └── CatalogPage.tsx
// └── di/                  ← Dependency Injection
//     └── container.ts

// === domain/entities/Product.ts ===
export class Product {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly price: number,
    public readonly stock: number
  ) {}

  get isAvailable(): boolean {
    return this.stock > 0
  }

  get formattedPrice(): string {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(this.price)
  }
}

// === domain/repositories/ProductRepository.ts ===
export interface ProductRepository {
  getAll(): Promise<Product[]>
  getById(id: string): Promise<Product>
}

// === domain/usecases/GetProducts.ts ===
export class GetProductsUseCase {
  constructor(private repo: ProductRepository) {}

  async execute(filter?: { minPrice?: number; available?: boolean }) {
    let products = await this.repo.getAll()
    if (filter?.minPrice) {
      products = products.filter(p => p.price >= filter.minPrice!)
    }
    if (filter?.available) {
      products = products.filter(p => p.isAvailable)
    }
    return products
  }
}

// === data/api/ApiProductRepository.ts ===
export class ApiProductRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const res = await fetch('/api/products')
    const data = await res.json()
    return data.map((d: any) => new Product(d.id, d.name, d.price, d.stock))
  }
  async getById(id: string): Promise<Product> {
    const res = await fetch(\`/api/products/\${id}\`)
    const d = await res.json()
    return new Product(d.id, d.name, d.price, d.stock)
  }
}

// === presentation/hooks/useProducts.ts ===
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const useCase = useMemo(
    () => new GetProductsUseCase(new ApiProductRepository()),
    []
  )

  useEffect(() => {
    useCase.execute({ available: true }).then(setProducts)
  }, [])

  return products
}`

export default function CleanArchitecture() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧅 Clean Architecture</h1>
        <p>Луковичная архитектура Роберта Мартина — зависимости направлены внутрь</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Концентрические слои</h3>
          <span className="card-badge">Обзор</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🧅</span>
          <div className="info-box-content">
            <div className="info-box-title">Главное правило: Dependency Rule</div>
            <p>Зависимости направлены только ВНУТРЬ. Внутренние слои ничего не знают о внешних. Entities — самый стабильный слой, Frameworks — самый изменчивый.</p>
          </div>
        </div>

        {/* Styled concentric layers diagram */}
        <div style={{ padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '100%', maxWidth: '520px', padding: '16px', border: '2px solid #ef4444', borderRadius: '16px', background: 'rgba(239,68,68,0.06)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', marginBottom: '4px' }}>Frameworks & Drivers</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>UI, DB, Web, Devices, External APIs</div>
            <div style={{ padding: '14px', border: '2px solid #f59e0b', borderRadius: '12px', background: 'rgba(245,158,11,0.06)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#f59e0b', marginBottom: '4px' }}>Interface Adapters</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Controllers, Presenters, Gateways</div>
              <div style={{ padding: '14px', border: '2px solid #3b82f6', borderRadius: '10px', background: 'rgba(59,130,246,0.06)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3b82f6', marginBottom: '4px' }}>Application Business Rules</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Use Cases</div>
                <div style={{ padding: '14px', border: '2px solid #22c55e', borderRadius: '8px', background: 'rgba(34,197,94,0.08)', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#22c55e' }}>Enterprise Business Rules</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Entities</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '8px' }}>
            ↑ Зависимости направлены внутрь — внешние слои знают о внутренних, <strong>никогда наоборот</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">1. Entities</h3>
          <span className="card-badge badge-success">Ядро</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">💎</span>
          <div className="info-box-content">
            <div className="info-box-title">Enterprise Business Rules</div>
            <p>Самый внутренний слой. Чистые бизнес-объекты без зависимостей. Если у вас холдинг с 10 продуктами — Entities общие для всех.</p>
          </div>
        </div>
        <CodeBlock code={entitiesCode} language="typescript" title="💎 Entities — ядро бизнеса" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">2. Use Cases</h3>
          <span className="card-badge badge-info">Логика приложения</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">⚙️</span>
          <div className="info-box-content">
            <div className="info-box-title">Application Business Rules + Порты</div>
            <p>Use Cases определяют ЧТО делать и объявляют ПОРТЫ (интерфейсы) для внешних зависимостей. Реализации портов находятся снаружи.</p>
          </div>
        </div>
        <CodeBlock code={useCasesCode} language="typescript" title="⚙️ Use Cases и порты" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">3. Interface Adapters</h3>
          <span className="card-badge badge-warning">Преобразование</span>
        </div>
        <CodeBlock code={adaptersCode} language="typescript" title="🔌 Adapters — реализации портов" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">4. Frameworks & Drivers</h3>
          <span className="card-badge">Внешний слой</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🔧</span>
          <div className="info-box-content">
            <div className="info-box-title">Самый нестабильный слой</div>
            <p>React, Express, PostgreSQL — всё это легко заменяемые детали. Бизнес-логика от них не зависит.</p>
          </div>
        </div>
        <CodeBlock code={frameworksCode} language="typescript" title="🔧 Frameworks — React, API, тесты" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Clean Architecture на фронтенде</h3>
          <span className="card-badge badge-success">Практика</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">📂</span>
          <div className="info-box-content">
            <div className="info-box-title">Структура проекта</div>
            <p>domain/ → data/ → presentation/ — от чистой логики к грязному фреймворку</p>
          </div>
        </div>
        <CodeBlock code={frontendCleanCode} language="typescript" title="🛒 Пример: каталог товаров" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Плюсы, минусы, когда использовать</h3>
          <span className="card-badge badge-warning">Решение</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #22c55e' }}>
            <h4 style={{ margin: '0 0 10px', color: '#4ade80' }}>✅ Плюсы</h4>
            <ul className="info-list">
              <li>Независимость от фреймворков — можно мигрировать React → Vue</li>
              <li>Тестируемость — Use Cases тестируются без UI и сети</li>
              <li>Чёткое разделение ответственности</li>
              <li>Бизнес-логика защищена от внешних изменений</li>
              <li>Легко подменять реализации (API → localStorage → mock)</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(239,68,68,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #ef4444' }}>
            <h4 style={{ margin: '0 0 10px', color: '#f87171' }}>❌ Минусы</h4>
            <ul className="info-list">
              <li>Много бойлерплейта для маленьких проектов</li>
              <li>Сложность: 4 слоя вместо «просто компонент»</li>
              <li>Оверинжиниринг для CRUD-приложений</li>
              <li>Необходимость маппинга данных между слоями</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #3b82f6' }}>
            <h4 style={{ margin: '0 0 10px', color: '#60a5fa' }}>🎯 Когда использовать</h4>
            <ul className="info-list">
              <li>Крупные проекты с долгим жизненным циклом</li>
              <li>Сложная бизнес-логика (не просто CRUD)</li>
              <li>Команда &gt; 5 человек</li>
              <li>Требуется высокая тестируемость</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.08)', borderRadius: '8px', padding: '16px', borderLeft: '3px solid #f59e0b' }}>
            <h4 style={{ margin: '0 0 10px', color: '#fbbf24' }}>⚠️ Когда НЕ использовать</h4>
            <ul className="info-list">
              <li>Маленькие проекты / MVP</li>
              <li>Простые CRUD-приложения</li>
              <li>Один разработчик на проекте</li>
              <li>Прототипирование</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собеседовании</h3>
          <span className="card-badge badge-warning">Interview</span>
        </div>
        {[
          { q: 'Что такое Dependency Rule в Clean Architecture?', a: 'Зависимости направлены только внутрь. Внутренние слои (Entities, Use Cases) не знают о внешних (UI, DB). Это позволяет подменять внешние слои без влияния на бизнес-логику.' },
          { q: 'Чем Entity отличается от Use Case?', a: 'Entity — бизнес-правила уровня предприятия (общие для всех приложений). Use Case — правила конкретного приложения: оркестрирует Entities и определяет порты для внешних зависимостей.' },
          { q: 'Что такое порт и адаптер в контексте Clean Architecture?', a: 'Порт — интерфейс, объявленный Use Case (например, UserRepository). Адаптер — конкретная реализация порта (ApiUserRepository, InMemoryUserRepository). Это позволяет инвертировать зависимости.' },
          { q: 'Как Clean Architecture связана с SOLID?', a: 'DIP (Dependency Inversion) — ядро: Use Cases зависят от абстракций (портов), а не от реализаций. SRP — каждый слой отвечает за своё. OCP — новые адаптеры добавляются без изменения Use Cases.' },
        ].map((item, i) => (
          <div key={i} style={{ padding: '12px 16px', marginBottom: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 8, borderLeft: '3px solid var(--accent-primary)' }}>
            <div style={{ fontWeight: 600, color: '#e0e0e0', marginBottom: 6 }}>{item.q}</div>
            <div style={{ color: '#999', fontSize: 14, lineHeight: 1.5 }}>{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
