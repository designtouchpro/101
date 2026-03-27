import CodeBlock from '../../components/CodeBlock'

const portsCode = `// ПОРТЫ — интерфейсы, определённые ядром
// Бывают двух типов:

// ═══════════════════════════════════════
// DRIVING PORTS (входные, Primary)
// Определяют ЧТО может делать приложение
// Вызываются снаружи → внутрь
// ═══════════════════════════════════════

interface OrderService {           // Driving Port
  createOrder(items: CartItem[]): Promise<Order>
  cancelOrder(orderId: string): Promise<void>
  getOrder(orderId: string): Promise<Order>
  listOrders(userId: string): Promise<Order[]>
}

// ═══════════════════════════════════════
// DRIVEN PORTS (выходные, Secondary)
// Определяют ЧТО нужно ядру от внешнего мира
// Вызываются изнутри → наружу
// ═══════════════════════════════════════

interface OrderRepository {        // Driven Port
  save(order: Order): Promise<void>
  findById(id: string): Promise<Order | null>
  findByUserId(userId: string): Promise<Order[]>
}

interface PaymentGateway {         // Driven Port
  charge(amount: number, card: CardInfo): Promise<PaymentResult>
  refund(paymentId: string): Promise<void>
}

interface NotificationSender {     // Driven Port
  sendOrderConfirmation(order: Order): Promise<void>
  sendCancellation(order: Order): Promise<void>
}

// Мнемоника:
// Driving = "кто меня вызывает" (UI, тесты, CLI)
// Driven  = "кого я вызываю" (БД, API, email)`

const domainCode = `// DOMAIN (ядро) — реализует Driving Ports
// Зависит ТОЛЬКО от Driven Ports (интерфейсов)

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'paid' | 'cancelled'
  createdAt: Date
}

// Реализация Driving Port
class OrderServiceImpl implements OrderService {
  constructor(
    private orderRepo: OrderRepository,      // Driven port
    private payment: PaymentGateway,          // Driven port
    private notifications: NotificationSender // Driven port
  ) {}

  async createOrder(items: CartItem[]): Promise<Order> {
    // Бизнес-правило: минимум 1 товар
    if (items.length === 0) {
      throw new Error('Cart is empty')
    }

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

    // Бизнес-правило: минимальная сумма заказа
    if (total < 100) {
      throw new Error('Minimum order is 100₽')
    }

    const order: Order = {
      id: crypto.randomUUID(),
      userId: 'current-user',
      items,
      total,
      status: 'pending',
      createdAt: new Date()
    }

    // Используем Driven Ports (интерфейсы, не реализации!)
    await this.orderRepo.save(order)
    await this.notifications.sendOrderConfirmation(order)

    return order
  }

  async cancelOrder(orderId: string): Promise<void> {
    const order = await this.orderRepo.findById(orderId)
    if (!order) throw new Error('Order not found')

    // Бизнес-правило: нельзя отменить оплаченный заказ
    if (order.status === 'paid') {
      throw new Error('Cannot cancel paid order')
    }

    order.status = 'cancelled'
    await this.orderRepo.save(order)
    await this.notifications.sendCancellation(order)
  }

  async getOrder(orderId: string): Promise<Order> {
    const order = await this.orderRepo.findById(orderId)
    if (!order) throw new Error('Order not found')
    return order
  }

  async listOrders(userId: string): Promise<Order[]> {
    return this.orderRepo.findByUserId(userId)
  }
}`

const adaptersCode = `// АДАПТЕРЫ — реализации портов

// ═══════════════════════════════════════════
// DRIVING ADAPTERS (входные) — как вызывают ядро
// ═══════════════════════════════════════════

// Driving Adapter: React UI
function OrderPage() {
  // orderService — реализация Driving Port
  const orderService: OrderService = useOrderService()

  const handleCreate = async () => {
    const order = await orderService.createOrder(cartItems)
    navigate(\`/orders/\${order.id}\`)
  }

  return <button onClick={handleCreate}>Оформить</button>
}

// Driving Adapter: REST API (Express/Fastify)
app.post('/api/orders', async (req, res) => {
  const orderService: OrderService = container.get('OrderService')
  const order = await orderService.createOrder(req.body.items)
  res.json(order)
})

// Driving Adapter: CLI
program.command('create-order').action(async () => {
  const orderService: OrderService = container.get('OrderService')
  const order = await orderService.createOrder(readItemsFromStdin())
  console.log('Created:', order.id)
})

// ═══════════════════════════════════════════
// DRIVEN ADAPTERS (выходные) — кого вызывает ядро
// ═══════════════════════════════════════════

// Driven Adapter: PostgreSQL
class PgOrderRepository implements OrderRepository {
  constructor(private db: Pool) {}

  async save(order: Order): Promise<void> {
    await this.db.query(
      'INSERT INTO orders (id, data) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET data = $2',
      [order.id, JSON.stringify(order)]
    )
  }

  async findById(id: string): Promise<Order | null> {
    const { rows } = await this.db.query('SELECT data FROM orders WHERE id = $1', [id])
    return rows[0]?.data ?? null
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const { rows } = await this.db.query('SELECT data FROM orders WHERE data->>\'userId\' = $1', [userId])
    return rows.map(r => r.data)
  }
}

// Driven Adapter: localStorage (для MVP/прототипа)
class LocalStorageOrderRepository implements OrderRepository {
  private key = 'orders'

  async save(order: Order): Promise<void> {
    const all = this.getAll()
    const idx = all.findIndex(o => o.id === order.id)
    if (idx >= 0) all[idx] = order
    else all.push(order)
    localStorage.setItem(this.key, JSON.stringify(all))
  }

  async findById(id: string): Promise<Order | null> {
    return this.getAll().find(o => o.id === id) ?? null
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.getAll().filter(o => o.userId === userId)
  }

  private getAll(): Order[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]')
  }
}

// Driven Adapter: In-Memory (для тестов)
class InMemoryOrderRepository implements OrderRepository {
  private orders = new Map<string, Order>()
  async save(order: Order) { this.orders.set(order.id, { ...order }) }
  async findById(id: string) { return this.orders.get(id) ?? null }
  async findByUserId(userId: string) {
    return [...this.orders.values()].filter(o => o.userId === userId)
  }
}`

const compositionCode = `// COMPOSITION ROOT — сборка всех зависимостей
// Единственное место, которое знает обо ВСЕХ реализациях

// === Production ===
function createProductionContainer() {
  const db = new Pool({ connectionString: process.env.DATABASE_URL })
  const orderRepo = new PgOrderRepository(db)
  const payment = new StripePaymentGateway(process.env.STRIPE_KEY!)
  const notifications = new EmailNotificationSender(process.env.SMTP_URL!)

  return {
    orderService: new OrderServiceImpl(orderRepo, payment, notifications)
  }
}

// === Development ===
function createDevContainer() {
  const orderRepo = new LocalStorageOrderRepository()
  const payment = new FakePaymentGateway()     // всегда success
  const notifications = new ConsoleNotifier()  // console.log вместо email

  return {
    orderService: new OrderServiceImpl(orderRepo, payment, notifications)
  }
}

// === Testing ===
function createTestContainer() {
  const orderRepo = new InMemoryOrderRepository()
  const payment = new MockPaymentGateway()
  const notifications = new SpyNotificationSender()

  return {
    orderService: new OrderServiceImpl(orderRepo, payment, notifications),
    // Expose для проверок в тестах
    orderRepo,
    payment,
    notifications
  }
}

// React DI через Context
const DIContext = createContext<ReturnType<typeof createProductionContainer>>(null!)

function App() {
  const container = useMemo(
    () => import.meta.env.DEV
      ? createDevContainer()
      : createProductionContainer(),
    []
  )

  return (
    <DIContext.Provider value={container}>
      <Router>...</Router>
    </DIContext.Provider>
  )
}

function useOrderService(): OrderService {
  return useContext(DIContext).orderService
}`

const structureCode = `// Структура проекта Hexagonal Architecture
//
// src/
// ├── domain/                    ← ЯДРО (0 зависимостей)
// │   ├── model/
// │   │   ├── Order.ts
// │   │   └── Product.ts
// │   ├── ports/
// │   │   ├── driving/           ← Входные порты
// │   │   │   ├── OrderService.ts
// │   │   │   └── ProductService.ts
// │   │   └── driven/            ← Выходные порты
// │   │       ├── OrderRepository.ts
// │   │       ├── PaymentGateway.ts
// │   │       └── NotificationSender.ts
// │   └── services/              ← Реализация Driving Ports
// │       └── OrderServiceImpl.ts
// │
// ├── adapters/                  ← АДАПТЕРЫ
// │   ├── driving/               ← Входные адаптеры
// │   │   ├── web/               ← React/Vue UI
// │   │   │   ├── OrderPage.tsx
// │   │   │   └── hooks/
// │   │   ├── api/               ← REST controllers
// │   │   │   └── OrderController.ts
// │   │   └── cli/               ← CLI commands
// │   │       └── CreateOrderCmd.ts
// │   └── driven/                ← Выходные адаптеры
// │       ├── persistence/
// │       │   ├── PgOrderRepo.ts
// │       │   └── InMemoryOrderRepo.ts
// │       ├── payment/
// │       │   └── StripeGateway.ts
// │       └── notification/
// │           └── EmailSender.ts
// │
// └── config/                    ← Composition Root
//     ├── container.ts
//     └── env.ts

// ESLint правило: запретить импорты из adapters/ в domain/
// "import/no-restricted-paths": [{
//   "zones": [{
//     "target": "./src/domain",
//     "from": "./src/adapters"
//   }]
// }]`

export default function HexagonalArchitecture() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⬡ Hexagonal Architecture</h1>
        <p>Ports & Adapters — изоляция ядра от внешнего мира</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Что такое Hexagonal?</h3>
          <span className="card-badge">Обзор</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">⬡</span>
          <div className="info-box-content">
            <div className="info-box-title">Порты и Адаптеры</div>
            <p>Приложение — гексагон. Слева — Driving (кто вызывает: UI, CLI, тесты). Справа — Driven (кого вызываем: БД, API, email). Порты определяет ядро, адаптеры реализуют порты снаружи.</p>
          </div>
        </div>

        {/* Styled Hexagonal diagram */}
        <div style={{ padding: '20px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
          {/* Driving Adapters */}
          <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(168,85,247,0.08)', border: '2px solid #a855f7', borderRadius: '12px 12px 0 0', padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#a855f7' }}>▼ Driving Adapters</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>UI, CLI, Tests, API</div>
          </div>
          {/* Arrow down */}
          <div style={{ width: '2px', height: '12px', background: '#a855f7' }} />
          {/* Driving Ports */}
          <div style={{ width: '90%', maxWidth: '360px', background: 'rgba(59,130,246,0.08)', border: '2px solid #3b82f6', borderRadius: '10px 10px 0 0', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6' }}>Driving Ports (Input)</div>
          </div>
          {/* Arrow down */}
          <div style={{ width: '2px', height: '8px', background: '#3b82f6' }} />
          {/* DOMAIN core */}
          <div style={{ width: '70%', maxWidth: '280px', background: 'rgba(34,197,94,0.1)', border: '3px solid #22c55e', borderRadius: '8px', padding: '20px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#22c55e' }}>DOMAIN</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Бизнес-логика (Core)</div>
          </div>
          {/* Arrow down */}
          <div style={{ width: '2px', height: '8px', background: '#f59e0b' }} />
          {/* Driven Ports */}
          <div style={{ width: '90%', maxWidth: '360px', background: 'rgba(245,158,11,0.08)', border: '2px solid #f59e0b', borderRadius: '0 0 10px 10px', padding: '10px 14px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#f59e0b' }}>Driven Ports (Output)</div>
          </div>
          {/* Arrow down */}
          <div style={{ width: '2px', height: '12px', background: '#ef4444' }} />
          {/* Driven Adapters */}
          <div style={{ width: '100%', maxWidth: '420px', background: 'rgba(239,68,68,0.08)', border: '2px solid #ef4444', borderRadius: '0 0 12px 12px', padding: '12px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ef4444' }}>▼ Driven Adapters</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>DB, Email, 3rd party</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '12px' }}>
            Порты определяются ядром, адаптеры реализуют порты <strong>снаружи</strong>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Порты</h3>
          <span className="card-badge badge-info">Интерфейсы</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🔌</span>
          <div className="info-box-content">
            <div className="info-box-title">Driving (входные) vs Driven (выходные)</div>
            <p>Driving Port = «что я могу делать» (OrderService). Driven Port = «что мне нужно извне» (OrderRepository). Оба определены в ядре.</p>
          </div>
        </div>
        <CodeBlock code={portsCode} language="typescript" title="🔌 Driving & Driven Ports" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Domain (ядро)</h3>
          <span className="card-badge badge-success">Бизнес-логика</span>
        </div>
        <CodeBlock code={domainCode} language="typescript" title="💎 Ядро: реализация Driving Port" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Адаптеры</h3>
          <span className="card-badge badge-warning">Внешний мир</span>
        </div>
        <div className="info-box">
          <span className="info-box-icon">🔄</span>
          <div className="info-box-content">
            <div className="info-box-title">Подменяемые реализации</div>
            <p>Один порт — много адаптеров. PostgreSQL в проде, localStorage в деве, InMemory в тестах. Ядро не меняется!</p>
          </div>
        </div>
        <CodeBlock code={adaptersCode} language="typescript" title="🔧 Driving & Driven Adapters" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Composition Root</h3>
          <span className="card-badge badge-info">DI</span>
        </div>
        <CodeBlock code={compositionCode} language="typescript" title="🧩 Сборка зависимостей" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Структура проекта</h3>
          <span className="card-badge">Практика</span>
        </div>
        <CodeBlock code={structureCode} language="typescript" title="📂 Папки и файлы" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Hexagonal vs Clean vs Onion</h3>
          <span className="card-badge badge-warning">Сравнение</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: 'rgba(59,130,246,0.08)', borderRadius: '8px', padding: '14px', borderTop: '3px solid #3b82f6' }}>
            <h4 style={{ margin: '0 0 8px', color: '#60a5fa', fontSize: '0.9rem' }}>🧅 Clean Architecture</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <div>4 концентрических слоя</div>
              <div>Entities → Use Cases → Adapters → Frameworks</div>
              <div style={{ marginTop: '6px', fontWeight: 600 }}>Акцент: слои и правило зависимостей</div>
            </div>
          </div>
          <div style={{ background: 'rgba(168,85,247,0.08)', borderRadius: '8px', padding: '14px', borderTop: '3px solid #a855f7' }}>
            <h4 style={{ margin: '0 0 8px', color: '#c084fc', fontSize: '0.9rem' }}>⬡ Hexagonal</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <div>2 зоны: Domain + Adapters</div>
              <div>Ports (интерфейсы) &amp; Adapters (реализации)</div>
              <div style={{ marginTop: '6px', fontWeight: 600 }}>Акцент: порты и симметрия вход/выход</div>
            </div>
          </div>
          <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: '8px', padding: '14px', borderTop: '3px solid #22c55e' }}>
            <h4 style={{ margin: '0 0 8px', color: '#4ade80', fontSize: '0.9rem' }}>🧿 Onion</h4>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <div>Domain Model → Domain Services → Application → Infrastructure</div>
              <div style={{ marginTop: '6px', fontWeight: 600 }}>Акцент: организация слоёв</div>
            </div>
          </div>
        </div>

        <div className="info-box">
          <span className="info-box-icon">🤝</span>
          <div className="info-box-content">
            <div className="info-box-title">На практике</div>
            <p>Все три подхода инвертируют зависимости и изолируют бизнес-логику.
            Они <strong>совместимы</strong> и часто комбинируются. Clean = ЧТО, Hexagonal = КАК соединять, Onion = КАК организовать.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собеседовании</h3>
          <span className="card-badge badge-warning">Interview</span>
        </div>
        {[
          { q: 'В чём разница между Driving и Driven портами?', a: 'Driving (входные) — определяют что приложение умеет (вызываются UI, CLI). Driven (выходные) — определяют что нужно от внешних систем (БД, email). Оба определены в домене.' },
          { q: 'Зачем нужен Composition Root?', a: 'Единственное место, которое знает все реализации. Собирает граф зависимостей, подставляя конкретные адаптеры в порты. Позволяет переключать prod/dev/test конфигурации.' },
          { q: 'Как Hexagonal помогает тестированию?', a: 'Подменяя Driven Adapters на моки/стабы. Ядро тестируется с InMemoryRepository вместо реальной БД. Driving Adapters тестируются отдельно с моком сервиса.' },
          { q: 'Чем Hexagonal отличается от Clean Architecture?', a: 'Hexagonal — акцент на симметрии Driving/Driven и портах. Clean — на 4 концентрических слоях. На практике очень похожи, часто комбинируются.' },
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
