import CodeBlock from '../../components/CodeBlock'

const code = `// Adapter — совмещает несовместимые интерфейсы

// Старая библиотека аналитики (XML-based)
class LegacyAnalytics {
  trackXML(xml: string) {
    console.log('Legacy tracking:', xml)
  }
}

// Наш новый интерфейс (JSON-based)
interface Analytics {
  track(event: string, data: Record<string, unknown>): void
}

// Адаптер — мост между старым и новым
class AnalyticsAdapter implements Analytics {
  constructor(private legacy: LegacyAnalytics) {}

  track(event: string, data: Record<string, unknown>) {
    // Преобразуем JSON → XML для старой библиотеки
    const xml = \`<event name="\${event}">\${
      Object.entries(data)
        .map(([k, v]) => \`<\${k}>\${v}</\${k}>\`)
        .join('')
    }</event>\`
    this.legacy.trackXML(xml)
  }
}

// Используем новый интерфейс, старая библиотека работает под капотом
const analytics: Analytics = new AnalyticsAdapter(new LegacyAnalytics())
analytics.track('pageview', { url: '/home', title: 'Главная' })`

const frontendCode = `// Фронтенд: адаптеры API-ответов

// API возвращает snake_case
interface ApiUser {
  user_id: number
  first_name: string
  last_name: string
  created_at: string
}

// Приложение ожидает camelCase
interface User {
  userId: number
  firstName: string
  lastName: string
  createdAt: Date
}

// Адаптер — преобразует формат данных
function adaptUser(api: ApiUser): User {
  return {
    userId: api.user_id,
    firstName: api.first_name,
    lastName: api.last_name,
    createdAt: new Date(api.created_at),
  }
}

// Использование
const apiResponse = await fetch('/api/user/1')
const raw: ApiUser = await apiResponse.json()
const user: User = adaptUser(raw) // чистые данные для UI

// Это САМЫЙ частый паттерн на фронтенде!
// Каждый маппинг API → UI модель — это Adapter`

export default function Adapter() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔌 Adapter (Адаптер)</h1>
        <p>Позволяет объектам с несовместимыми интерфейсами работать вместе</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Переходник для розетки.</strong> Европейская вилка не подходит к американской розетке. Адаптер позволяет подключить устройство без изменения ни вилки, ни розетки</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Adapter — legacy API" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Адаптер API → UI модель" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>snake_case → camelCase (маппинг API ответов)</li>
          <li>Интеграция с legacy-кодом или сторонними библиотеками</li>
          <li>Замена одной библиотеки другой без изменения кода</li>
          <li>Нормализация данных из разных источников</li>
        </ul>
      </div>
    </div>
  )
}
