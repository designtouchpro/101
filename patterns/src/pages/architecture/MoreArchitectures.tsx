import CodeBlock from '../../components/CodeBlock'

const layeredCode = `// LAYERED ARCHITECTURE (N-tier / Многослойная)
// Самая классическая архитектура, основа всех остальных
//
// ┌──────────────────────────┐
// │  Presentation Layer      │  ← UI, шаблоны, контроллеры
// ├──────────────────────────┤
// │  Business Logic Layer    │  ← Сервисы, правила, валидация
// ├──────────────────────────┤
// │  Data Access Layer       │  ← Репозитории, ORM, запросы
// ├──────────────────────────┤
// │  Database                │  ← PostgreSQL, MongoDB...
// └──────────────────────────┘
//
// Правило: каждый слой обращается ТОЛЬКО к нижестоящему
// Presentation → Business → Data → DB

// Пример: Express API
// routes/userRoutes.ts        ← Presentation
// services/userService.ts     ← Business Logic
// repositories/userRepo.ts    ← Data Access
// models/user.ts              ← Database schema

// === Presentation Layer ===
router.post('/users', async (req, res) => {
  const result = await userService.register(req.body)
  res.json(result)
})

// === Business Logic Layer ===
class UserService {
  constructor(private repo: UserRepository) {}

  async register(data: RegisterDTO) {
    if (!isValidEmail(data.email)) throw new AppError('Invalid email')
    const existing = await this.repo.findByEmail(data.email)
    if (existing) throw new AppError('Email taken')
    const hash = await bcrypt.hash(data.password, 10)
    return this.repo.create({ ...data, password: hash })
  }
}

// === Data Access Layer ===
class UserRepository {
  async findByEmail(email: string) {
    return db.query('SELECT * FROM users WHERE email = $1', [email])
  }
  async create(data: CreateUserData) {
    return db.query('INSERT INTO users ...', [...])
  }
}

// ✅ Просто, понятно, подходит для 90% проектов
// ❌ При росте Business Layer становится "God Service"`

const microfrontendsCode = `// MICRO FRONTENDS
// Расширение идеи микросервисов на фронтенд
//
// Монолит:
// ┌─────────────────────────────────────┐
// │          ONE BIG SPA                │
// │   (React app / Vue app / Angular)   │
// └─────────────────────────────────────┘
//
// Микрофронтенды:
// ┌─────────┐ ┌─────────┐ ┌─────────┐
// │ Каталог │ │ Корзина │ │ Профиль │
// │ (React) │ │  (Vue)  │ │(Angular)│
// └─────────┘ └─────────┘ └─────────┘
//       ↓          ↓          ↓
// ┌─────────────────────────────────────┐
// │      Container / Shell App          │
// └─────────────────────────────────────┘

// === Способы реализации ===

// 1. Module Federation (Webpack 5 / Vite)
// vite.config.ts (remote)
export default defineConfig({
  plugins: [
    federation({
      name: 'catalog',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductList': './src/ProductList.tsx',
      },
    })
  ]
})

// host app — загружает удалённый компонент
const ProductList = React.lazy(
  () => import('catalog/ProductList')
)

// 2. Web Components
class CartWidget extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    // Рендерим Vue-приложение в Shadow DOM
    createApp(CartApp).mount(shadow)
  }
}
customElements.define('cart-widget', CartWidget)

// В основном приложении:
// <cart-widget></cart-widget>

// 3. iframes (изоляция 100%)
// <iframe src="https://cart.myapp.com" />

// 4. Роутинг по поддоменам
// catalog.myapp.com → React SPA
// cart.myapp.com    → Vue SPA
// profile.myapp.com → Angular SPA

// ✅ Независимые деплои, разные технологии, маленькие команды
// ❌ Сложность, дублирование, общее состояние — боль`

const eventDrivenCode = `// EVENT-DRIVEN ARCHITECTURE
// Компоненты общаются через события, а не прямые вызовы
//
// ┌─────────┐  publish   ┌──────────────┐  subscribe  ┌─────────┐
// │ Service │ ─────────→ │  Event Bus   │ ──────────→ │ Service │
// │    A    │           │ (Broker)     │            │    B    │
// └─────────┘            └──────────────┘            └─────────┘
//                              ↓ subscribe
//                        ┌─────────┐
//                        │ Service │
//                        │    C    │
//                        └─────────┘

// === На фронтенде ===

// 1. Custom Events (браузерный API)
class EventBus {
  private bus = new EventTarget()

  emit<T>(event: string, data: T) {
    this.bus.dispatchEvent(new CustomEvent(event, { detail: data }))
  }

  on<T>(event: string, handler: (data: T) => void) {
    const listener = (e: Event) => handler((e as CustomEvent).detail)
    this.bus.addEventListener(event, listener)
    return () => this.bus.removeEventListener(event, listener)
  }
}

const bus = new EventBus()

// Модуль корзины публикует
bus.emit('cart:item-added', { productId: '123', quantity: 1 })

// Модуль аналитики подписан
bus.on('cart:item-added', (data) => {
  analytics.track('AddToCart', data)
})

// Модуль уведомлений подписан
bus.on('cart:item-added', (data) => {
  showToast('Товар добавлен в корзину!')
})

// 2. RxJS / Observables
import { Subject, filter, debounceTime } from 'rxjs'

const events$ = new Subject<AppEvent>()

// Публикация
events$.next({ type: 'search:query', payload: 'react' })

// Подписка с фильтрацией и debounce
events$.pipe(
  filter(e => e.type === 'search:query'),
  debounceTime(300)
).subscribe(e => {
  fetchSearchResults(e.payload)
})

// 3. Redux / Zustand — тоже event-driven!
// dispatch({ type: 'cart/addItem' }) — это событие
// reducers — обработчики событий
// middleware — перехватчики событий

// ✅ Слабая связанность, масштабируемость, расширяемость
// ❌ Сложность отладки, "event storm", неявный flow`

const cqrsCode = `// CQRS — Command Query Responsibility Segregation
// Разделение модели ЧТЕНИЯ и ЗАПИСИ
//
//  ┌──────────────┐         ┌──────────────┐
//  │   Command    │         │    Query     │
//  │   (Write)    │         │    (Read)    │
//  │              │         │              │
//  │ addToCart()   │         │ getCart()    │
//  │ checkout()   │         │ getOrders() │
//  │ updateUser() │         │ getUser()   │
//  └──────┬───────┘         └──────┬───────┘
//         │                        │
//    Write Model              Read Model
//    (normalized)             (denormalized)
//         │                        │
//    ┌────┴────┐             ┌────┴────┐
//    │  Write  │   sync →    │  Read   │
//    │   DB    │             │   DB    │
//    └─────────┘             └─────────┘

// На фронтенде: React Query / TanStack Query — это CQRS!

// Commands (Mutations)
const addToCart = useMutation({
  mutationFn: (item: CartItem) => api.post('/cart', item),
  onSuccess: () => {
    // Инвалидируем Read Model
    queryClient.invalidateQueries({ queryKey: ['cart'] })
  }
})

// Queries (Read Model)
const { data: cart } = useQuery({
  queryKey: ['cart'],
  queryFn: () => api.get('/cart')
})

// Более явный CQRS через хуки:
function useCartCommands() {
  return {
    addItem: useMutation({ /* ... */ }),
    removeItem: useMutation({ /* ... */ }),
    checkout: useMutation({ /* ... */ })
  }
}

function useCartQueries() {
  return {
    cart: useQuery({ queryKey: ['cart'], /* ... */ }),
    total: useQuery({ queryKey: ['cart', 'total'], /* ... */ })
  }
}

// ✅ Оптимизация чтения и записи отдельно
// ✅ React Query / Apollo — уже CQRS из коробки
// ❌ Eventual consistency — данные могут быть "не свежими"`

const comparisonCode = `// ═══ СРАВНИТЕЛЬНАЯ ТАБЛИЦА АРХИТЕКТУР ═══
//
// Архитектура     | Сложность | Масштаб  | Фронтенд?
// ────────────────┼───────────┼──────────┼──────────
// Layered         | Низкая    | Малый    | ✅ Да
// MVC/MVP/MVVM    | Низкая    | Малый    | ✅ Да
// FSD             | Средняя   | Средний  | ✅ Да
// Clean           | Высокая   | Крупный  | ⚠️ Оверхед
// Hexagonal       | Высокая   | Крупный  | ⚠️ Оверхед
// Event-Driven    | Средняя   | Любой    | ✅ Да
// CQRS            | Средняя   | Средний  | ✅ React Query
// Micro Frontends | Высокая   | Крупный  | ✅ Да
// Microservices   | Высокая   | Крупный  | ❌ Бэкенд
//
// Рекомендации по размеру проекта:
//
// 🟢 Pet-project / MVP:      Layered или просто папки по типу
// 🟡 Средний проект (3-5):   FSD или модульная архитектура
// 🔴 Enterprise (10+ devs):  FSD + Clean/Hexagonal внутри слоёв
// 🟣 Мультикоманда:          Micro Frontends
//
// Золотое правило:
// Начинай просто → усложняй по мере роста
// Layered → FSD → Clean → Micro Frontends`

export default function MoreArchitectures() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌐 Архитектуры: от Layered до Micro Frontends</h1>
        <p>Layered, Event-Driven, CQRS, Micro Frontends и как они связаны</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Layered Architecture</h3>
          <span className="card-badge badge-success">Классика</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">📊</span>
          <div className="info-box-content">
            <div className="info-box-title">Многослойная архитектура</div>
            <p>Presentation → Business → Data Access → Database. Просто, понятно, подходит для 90% проектов.</p>
          </div>
        </div>
        <CodeBlock code={layeredCode} language="typescript" title="📊 Классическая N-tier" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Event-Driven Architecture</h3>
          <span className="card-badge badge-info">Паттерн</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">📡</span>
          <div className="info-box-content">
            <div className="info-box-title">Общение через события</div>
            <p>Компоненты не вызывают друг друга напрямую, а публикуют/подписываются на события. Redux, RxJS, Custom Events — всё это Event-Driven.</p>
          </div>
        </div>
        <CodeBlock code={eventDrivenCode} language="typescript" title="📡 Event Bus, RxJS, Redux" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">CQRS</h3>
          <span className="card-badge badge-warning">Продвинутое</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🔀</span>
          <div className="info-box-content">
            <div className="info-box-title">React Query — это CQRS!</div>
            <p>Разделение модели чтения (useQuery) и записи (useMutation). Каждая оптимизирована для своей задачи.</p>
          </div>
        </div>
        <CodeBlock code={cqrsCode} language="typescript" title="🔀 Command ≠ Query" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Micro Frontends</h3>
          <span className="card-badge badge-warning">Enterprise</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🧩</span>
          <div className="info-box-content">
            <div className="info-box-title">Микросервисы для фронтенда</div>
            <p>Каждая команда владеет своим мини-SPA. Независимые деплои, разные фреймворки. Module Federation, Web Components, iframes.</p>
          </div>
        </div>
        <CodeBlock code={microfrontendsCode} language="typescript" title="🧩 Module Federation, Web Components" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Сравнение всех архитектур</h3>
          <span className="card-badge">Шпаргалка</span>
        </div>
        <CodeBlock code={comparisonCode} language="typescript" title="📋 Какую выбрать?" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собеседовании</h3>
          <span className="card-badge badge-warning">Interview</span>
        </div>
        {[
          { q: 'Чем Layered Architecture отличается от Clean Architecture?', a: 'Layered — простая иерархия слоёв без инверсии зависимостей. Business Layer зависит от Data Layer напрямую. В Clean — зависимости инвертированы через интерфейсы (порты).' },
          { q: 'Что такое CQRS и где вы его видели на фронтенде?', a: 'CQRS разделяет модели чтения и записи. На фронтенде: React Query (useQuery = Read, useMutation = Write), Apollo Client (queries vs mutations). Каждая модель оптимизирована отдельно.' },
          { q: 'Когда оправданы Micro Frontends?', a: 'Когда несколько команд параллельно разрабатывают разные части приложения и нужны независимые деплои. Для одной команды — оверхед. Популярные подходы: Module Federation, Single-SPA.' },
          { q: 'Что такое Event-Driven на фронтенде?', a: 'Паттерн, где модули общаются через события а не прямые вызовы. Redux dispatch — это event. Custom Events, RxJS Subject, EventEmitter. Снижает связанность, но усложняет отладку.' },
          { q: 'Какую архитектуру выбрать для нового проекта?', a: 'Зависит от масштаба: MVP → простые папки по типу. Средний проект → FSD. Enterprise → FSD + Clean внутри слоёв. Мультикоманда → Micro Frontends. Начинай просто, усложняй по мере роста.' },
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
