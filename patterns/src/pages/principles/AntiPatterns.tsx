import CodeBlock from '../../components/CodeBlock'

const godObjectCode = `// God Object / God Component
// Один объект/компонент знает и делает слишком много

// ❌ God Component — 800 строк, 15 useState, 3 формы, модалка, таблица
function AdminDashboard() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({})
  const [filters, setFilters] = useState({})
  const [sortBy, setSortBy] = useState('name')
  const [page, setPage] = useState(1)
  const [stats, setStats] = useState(null)
  // ... ещё 10 useState

  useEffect(() => { fetchUsers() }, [])
  useEffect(() => { fetchProducts() }, [])
  useEffect(() => { fetchOrders() }, [])
  useEffect(() => { fetchStats() }, [])

  // 500 строк JSX: таблицы, формы, графики, модалки...
}

// ✅ Разделение ответственности
function AdminDashboard() {
  return (
    <div>
      <StatsOverview />        {/* свой fetch, свой стейт */}
      <UsersTable />           {/* фильтры, сортировка, пагинация */}
      <OrdersPanel />          {/* своя логика, свои данные */}
    </div>
  )
}

// Каждый компонент — 100-150 строк, одна зона ответственности`

const prematureAbstractionCode = `// Premature Abstraction
// Абстракция до появления реальных паттернов

// ❌ «Универсальный» компонент после первого использования
interface UniversalCardProps<T> {
  data: T
  renderHeader: (data: T) => ReactNode
  renderBody: (data: T) => ReactNode
  renderFooter?: (data: T) => ReactNode
  renderActions?: (data: T) => ReactNode
  layout?: 'horizontal' | 'vertical' | 'grid'
  variant?: 'default' | 'outlined' | 'elevated' | 'compact'
  onAction?: (action: string, data: T) => void
  headerSlot?: ReactNode
  bodySlot?: ReactNode
  footerSlot?: ReactNode
  className?: string
  style?: CSSProperties
  animated?: boolean
  collapsible?: boolean
  draggable?: boolean
  // ... 20 пропсов для «гибкости»
}

// Результат: использутся в 2 местах, и в обоих
// передаётся половина пропсов как undefined

// ✅ Правило трёх (Rule of Three)
// Напиши конкретный код. Когда появится 3-й похожий случай —
// тогда выдели общее

function UserCard({ user }: { user: User }) {
  return (
    <div className="card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card">
      <h3>{product.title}</h3>
      <p>{product.price} ₽</p>
    </div>
  )
}

// Два простых компонента лучше одного «универсального»`

const propsDrillingCode = `// Props Drilling
// Пробрасывание пропсов через 5+ уровней

// ❌ Каждый уровень знает о theme, хотя не использует
<App theme={theme}>
  <Layout theme={theme}>
    <Sidebar theme={theme}>
      <NavMenu theme={theme}>
        <NavItem theme={theme}>    {/* наконец-то используем */}

// ✅ Context для cross-cutting concerns
const ThemeContext = createContext<Theme>('light')

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  return (
    <ThemeContext.Provider value={theme}>
      <Layout>
        <Sidebar>
          <NavMenu>
            <NavItem />             {/* useContext(ThemeContext) */}

// ⚠️ Но! Context — не замена props для всего.
// Если данные нужны в 1-2 уровнях ниже — props нормально.
// Context для: тема, auth, locale, feature flags`

const overengineeringCode = `// Overengineering: Когда абстракция вредит

// ❌ Enterprise FizzBuzz
interface NumberClassifier {
  classify(n: number): string
}
class FizzClassifier implements NumberClassifier { /*...*/ }
class BuzzClassifier implements NumberClassifier { /*...*/ }
class FizzBuzzClassifier implements NumberClassifier { /*...*/ }
class ClassifierFactory {
  static create(n: number): NumberClassifier { /*...*/ }
}
class FizzBuzzService {
  private classifier: ClassifierFactory
  execute(range: NumberRange): ClassificationResult[] { /*...*/ }
}

// ✅ Просто функция
function fizzBuzz(n: number): string {
  if (n % 15 === 0) return 'FizzBuzz'
  if (n % 3 === 0) return 'Fizz'
  if (n % 5 === 0) return 'Buzz'
  return String(n)
}

// Признаки overengineering:
// • Абстракция используется в 1 месте
// • Больше кода инфраструктуры, чем бизнес-логики
// • Нужно прочитать 5 файлов, чтобы понять один flow
// • «А вдруг понадобится» — единственный аргумент`

const wrongAbstractionCode = `// Sunk Cost Abstraction
// Неудачная абстракция, которую «жалко выбросить»

// ❌ Абстракция, которая не подходит, но мы продолжаем
// «Мы уже столько в неё вложили!»
class BaseForm<TFields, TValidation, TSubmit> {
  // 300 строк Generic Magic
}

// На 5-й форме понимаем: каждая форма уникальна,
// и базовый класс покрывает 20% потребностей.
// Остальные 80% — хаки и workaround'ы.

// ✅ Дублирование лучше неудачной абстракции
// (Sandi Metz: «prefer duplication over the wrong abstraction»)

// Удали неудачную абстракцию и напиши конкретный код.
// Если потом увидишь паттерн — создай новую.

// Как понять, что абстракция «не та»:
// 1. Большинство вызовов передают флаги/опции для «особых случаев»
// 2. Новый use-case требует модификации абстракции
// 3. Тесты абстракции сложнее, чем инлайн-код
// 4. Новичок не может понять её за 5 минут`

const magicNumbersCode = `// Magic Numbers / Strings
// Литералы без объяснения смысла

// ❌ Что значит 86400? Почему 3? Что за 'active'?
if (Date.now() - lastLogin > 86400000) { /* ... */ }
if (retries < 3) { /* ... */ }
if (user.status === 'active') { /* ... */ }
setTimeout(callback, 300)

// ✅ Именованные константы
const ONE_DAY_MS = 24 * 60 * 60 * 1000
const MAX_RETRIES = 3
const UserStatus = { Active: 'active', Banned: 'banned' } as const
const ANIMATION_DURATION_MS = 300

if (Date.now() - lastLogin > ONE_DAY_MS) { /* ... */ }
if (retries < MAX_RETRIES) { /* ... */ }
if (user.status === UserStatus.Active) { /* ... */ }
setTimeout(callback, ANIMATION_DURATION_MS)

// Исключения: 0, 1, -1, 100 — в очевидном контексте
// array.length - 1, percentage / 100 — читаемо и так`

const callbackHellCode = `// Callback Hell / Pyramid of Doom
// Вложенные callbacks создают «ёлочку»

// ❌ Callback hell
getUser(userId, (user) => {
  getOrders(user.id, (orders) => {
    getProducts(orders[0].productIds, (products) => {
      calculateDiscount(user, products, (discount) => {
        applyDiscount(orders[0], discount, (result) => {
          sendNotification(user.email, result, (status) => {
            console.log('Done:', status)
          })
        })
      })
    })
  })
})

// ✅ async/await — плоский и читаемый
async function processOrder(userId: string) {
  const user = await getUser(userId)
  const orders = await getOrders(user.id)
  const products = await getProducts(orders[0].productIds)
  const discount = await calculateDiscount(user, products)
  const result = await applyDiscount(orders[0], discount)
  await sendNotification(user.email, result)
}

// ✅ Promise.all для параллельных запросов
async function loadDashboard(userId: string) {
  const [user, orders, stats] = await Promise.all([
    getUser(userId),
    getOrders(userId),
    getStats(userId),
  ])
  return { user, orders, stats }
}`

const copyPasteCode = `// Copy-Paste Programming
// Копирование кода вместо абстракции (после 3+ повторений)

// ❌ Один и тот же fetch-паттерн в каждом компоненте
function UsersPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    fetch('/api/users')
      .then(r => r.json()).then(setData)
      .catch(setError).finally(() => setLoading(false))
  }, [])
  if (loading) return <Spinner />
  if (error) return <Error message={error} />
  return <UserList users={data} />
}
// То же самое в OrdersPage, ProductsPage, StatsPage...

// ✅ Кастомный хук после 3-го повторения
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch(url)
      .then(r => r.json()).then(setData)
      .catch(setError).finally(() => setLoading(false))
  }, [url])

  return { data, loading, error }
}

function UsersPage() {
  const { data, loading, error } = useFetch<User[]>('/api/users')
  if (loading) return <Spinner />
  if (error) return <Error message={error.message} />
  return <UserList users={data!} />
}`

export default function AntiPatterns() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🚫 Анти-паттерны и Overengineering</h1>
        <p>Типичные ошибки проектирования: как распознать и чем заменить</p>
        <span className="pattern-category cat-principle">Принципы проектирования</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔴 Когда абстракция вредит</h3>
        </div>
        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Главная идея</div>
            <p>Паттерны — инструмент, не цель. Применение паттерна ради паттерна (<em>cargo culting</em>) создаёт код сложнее, чем решаемая проблема. Каждая абстракция имеет цену: дополнительный уровень косвенности усложняет отладку, увеличивает когнитивную нагрузку и замедляет новичков.</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table className="concept-table">
            <thead>
              <tr>
                <th>Сигнал</th>
                <th>Что происходит</th>
                <th>Что делать</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Абстракция в 1 месте</td>
                <td>Нет переиспользования → нет выгоды</td>
                <td>Inline код, удали абстракцию</td>
              </tr>
              <tr>
                <td>Флаги в интерфейсе</td>
                <td>if-else внутри «универсального» компонента</td>
                <td>Два отдельных компонента</td>
              </tr>
              <tr>
                <td>5+ файлов на один flow</td>
                <td>Indirection без информации</td>
                <td>Объедини, пока не появится реальная причина разделять</td>
              </tr>
              <tr>
                <td>Тесты сложнее кода</td>
                <td>Абстракция создаёт лишние зависимости</td>
                <td>Тест должен быть проще — иначе абстракция «не та»</td>
              </tr>
              <tr>
                <td>«А вдруг понадобится»</td>
                <td>YAGNI-нарушение</td>
                <td>Реализуй когда понадобится, не раньше</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">👑 God Object / God Component</h3>
          <span className="card-badge badge-red">Опасный</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Один сотрудник, который и бухгалтер, и курьер, и директор. Если он заболеет — встанет всё. Если нужно изменить бухгалтерию — рискуешь сломать доставку.
        </div>
        <CodeBlock code={godObjectCode} language="typescript" title="God Component → композиция" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔮 Premature Abstraction</h3>
          <span className="card-badge badge-red">Частый</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Купить автобус после первой поездки за хлебом «а вдруг буду возить людей». Когда реально понадобится — окажется, что нужен грузовик.
        </div>
        <CodeBlock code={prematureAbstractionCode} language="typescript" title="Преждевременная абстракция → Rule of Three" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Rule of Three</div>
            <p>Первый раз — напиши конкретно. Второй раз — скопируй. Третий раз — выдели абстракцию. К третьему разу ты видишь реальный паттерн, а не воображаемый.</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🏗 Overengineering</h3>
          <span className="card-badge badge-red">Разрушительный</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Строить атомную электростанцию, чтобы зарядить телефон. Работает? Технически да. Оправдано? Нет.
        </div>
        <CodeBlock code={overengineeringCode} language="typescript" title="Enterprise FizzBuzz → простая функция" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💀 Sunk Cost Abstraction</h3>
          <span className="card-badge badge-orange">Коварный</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> «Мы уже 3 месяца строим этот фреймворк — не выбрасывать же!». Выбросить. Потраченное время не вернётся, а код станет проще.
        </div>
        <CodeBlock code={wrongAbstractionCode} language="typescript" title='Sandi Metz: «duplication over wrong abstraction»' />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔗 Props Drilling</h3>
          <span className="card-badge badge-orange">React-специфичный</span>
        </div>
        <CodeBlock code={propsDrillingCode} language="typescript" title="Props Drilling → Context (для cross-cutting)" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔢 Magic Numbers / Strings</h3>
          <span className="card-badge badge-orange">Читаемость</span>
        </div>
        <CodeBlock code={magicNumbersCode} language="typescript" title="Magic numbers → именованные константы" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎄 Callback Hell</h3>
          <span className="card-badge badge-orange">Устаревший</span>
        </div>
        <CodeBlock code={callbackHellCode} language="typescript" title="Callback Hell → async/await" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📋 Copy-Paste Programming</h3>
          <span className="card-badge badge-orange">После 3-го раза</span>
        </div>
        <CodeBlock code={copyPasteCode} language="typescript" title="Копипаста → кастомный хук (после Rule of Three)" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Шкала абстракции</h3>
        </div>
        <div className="info-box" style={{ marginBottom: 16 }}>
          <span className="info-box-icon">📐</span>
          <div className="info-box-content">
            <div className="info-box-title">Найди баланс</div>
            <p>Слишком мало абстракций — копипаста. Слишком много — overengineering. Истина посередине.</p>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="concept-table">
            <thead>
              <tr>
                <th>Уровень</th>
                <th>Описание</th>
                <th>Пример</th>
                <th>Риск</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>0 — Копипаста</strong></td>
                <td>Нет абстракций</td>
                <td>10 одинаковых fetch-блоков</td>
                <td>Баги при изменении</td>
              </tr>
              <tr>
                <td><strong>1 — Утилиты</strong></td>
                <td>Вспомогательные функции</td>
                <td>useFetch, formatDate</td>
                <td>Минимальный</td>
              </tr>
              <tr>
                <td><strong>2 — Паттерны</strong></td>
                <td>Устоявшиеся решения</td>
                <td>Observer, Strategy, Facade</td>
                <td>Нужен контекст</td>
              </tr>
              <tr>
                <td><strong>3 — Фреймворки</strong></td>
                <td>Много слоёв, conventions</td>
                <td>Clean Arch, FSD, DDD</td>
                <td>Overhead для малых проектов</td>
              </tr>
              <tr>
                <td><strong>4 — Enterprise</strong></td>
                <td>Factory of Factory, DI containers</td>
                <td>AbstractSingletonProxyFactory</td>
                <td>Невозможно понять</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собесе</h3>
        </div>
        <div className="interview-item"><div className="q">Назовите 3 анти-паттерна и как их исправить</div><div className="a">God Object → декомпозиция по зонам ответственности. Premature Abstraction → Rule of Three (абстракция после 3-го повторения). Props Drilling → Context / composition / component inversion</div></div>
        <div className="interview-item"><div className="q">Когда абстракция вредит?</div><div className="a">Когда используется в 1 месте, когда занимает больше кода чем inline-решение, когда требует «особых случаев» (флаги, if-else), когда новичок не может понять за 5 минут. Sandi Metz: duplication is far cheaper than the wrong abstraction</div></div>
        <div className="interview-item"><div className="q">Как отличить overengineering от хорошей архитектуры?</div><div className="a">Хорошая архитектура упрощает изменения. Overengineering усложняет даже простые изменения. Тест: если для добавления поля в форму нужно менять 5 файлов — это overengineering. Если один — хорошая архитектура</div></div>
      </div>
    </div>
  )
}
