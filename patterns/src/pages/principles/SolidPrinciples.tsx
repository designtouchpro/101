import CodeBlock from '../../components/CodeBlock'

const sCode = `// S — Single Responsibility Principle
// Каждый класс/модуль отвечает только за одну вещь

// ❌ Плохо: компонент делает всё
class UserProfile {
  fetchUser(id: string) { /* HTTP запрос */ }
  renderHTML() { /* генерация HTML */ }
  validateEmail(email: string) { /* валидация */ }
  saveToLocalStorage() { /* сохранение */ }
}

// ✅ Хорошо: разделение ответственности
class UserAPI {
  fetch(id: string) { return fetch(\`/api/users/\${id}\`) }
}

class UserValidator {
  validateEmail(email: string) { return /@/.test(email) }
}

class UserStorage {
  save(user: User) { localStorage.setItem('user', JSON.stringify(user)) }
}

// Фронтенд пример: React хуки
// useAuth() — только авторизация
// useFetch() — только запросы
// useForm() — только форма`

const oCode = `// O — Open/Closed Principle
// Открыт для расширения, закрыт для модификации

// ❌ Плохо: добавление нового типа требует изменения функции
function getIcon(type: string) {
  if (type === 'success') return '✅'
  if (type === 'error') return '❌'
  if (type === 'warning') return '⚠️'
  // Каждый новый тип — изменение этой функции
}

// ✅ Хорошо: расширение через конфигурацию
const iconMap: Record<string, string> = {
  success: '✅',
  error: '❌',
  warning: '⚠️',
}
// Добавление нового типа — без изменения кода
iconMap.info = 'ℹ️'

function getIcon(type: string) {
  return iconMap[type] ?? '❓'
}

// Фронтенд пример: плагины, middleware, стратегии рендеринга
// Новый функционал через расширение, а не модификацию`

const lCode = `// L — Liskov Substitution Principle
// Подкласс должен быть заменим на базовый класс

// ❌ Нарушение: квадрат «ломает» контракт прямоугольника
class Rectangle {
  constructor(public width: number, public height: number) {}
  area() { return this.width * this.height }
}

class Square extends Rectangle {
  set width(v: number) { this.width = this.height = v } // 💥 Сюрприз!
}

// ✅ Хорошо: общий интерфейс без нарушений
interface Shape {
  area(): number
}

class Rectangle implements Shape {
  constructor(public width: number, public height: number) {}
  area() { return this.width * this.height }
}

class Square implements Shape {
  constructor(public side: number) {}
  area() { return this.side * this.side }
}

// Фронтенд: компонент <Button> можно заменить на <IconButton>
// без поломки родительского компонента`

const iCode = `// I — Interface Segregation Principle
// Не заставляй реализовывать то, что не нужно

// ❌ Плохо: «толстый» интерфейс
interface Widget {
  render(): void
  serialize(): string
  deserialize(data: string): void
  animate(): void
  handleDrag(): void
}

// ✅ Хорошо: маленькие, фокусированные интерфейсы
interface Renderable {
  render(): void
}

interface Serializable {
  serialize(): string
  deserialize(data: string): void
}

interface Draggable {
  handleDrag(): void
}

// Используем только нужные интерфейсы
class StaticCard implements Renderable {
  render() { /* ... */ }
  // Не нужны animate/handleDrag!
}

class DraggableCard implements Renderable, Draggable {
  render() { /* ... */ }
  handleDrag() { /* ... */ }
}`

const dCode = `// D — Dependency Inversion Principle
// Зависимость от абстракций, а не от реализаций

// ❌ Плохо: жёсткая привязка к конкретной реализации
class AuthService {
  private api = new AxiosHttpClient() // привязка к Axios

  login(email: string, password: string) {
    return this.api.post('/login', { email, password })
  }
}

// ✅ Хорошо: зависимость от абстракции
interface HttpClient {
  post<T>(url: string, data: unknown): Promise<T>
  get<T>(url: string): Promise<T>
}

class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('/login', { email, password })
  }
}

// Легко подменить реализацию:
const auth = new AuthService(new FetchHttpClient())
const authTest = new AuthService(new MockHttpClient()) // для тестов

// Фронтенд: DI в Angular, provide/inject в Vue,
// Context в React — все это DIP в действии`

export default function SolidPrinciples() {
  const principles = [
    { letter: 'S', name: 'Single Responsibility', ru: 'Единственная ответственность', color: '#22c55e', code: sCode },
    { letter: 'O', name: 'Open/Closed', ru: 'Открытость/Закрытость', color: '#3b82f6', code: oCode },
    { letter: 'L', name: 'Liskov Substitution', ru: 'Подстановка Лисков', color: '#f59e0b', code: lCode },
    { letter: 'I', name: 'Interface Segregation', ru: 'Разделение интерфейсов', color: '#a855f7', code: iCode },
    { letter: 'D', name: 'Dependency Inversion', ru: 'Инверсия зависимостей', color: '#ef4444', code: dCode },
  ]

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏛 SOLID Принципы</h1>
        <p>5 принципов объектно-ориентированного дизайна Роберта Мартина (Uncle Bob)</p>
        <span className="pattern-category cat-principle">Принципы проектирования</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужен SOLID?</div>
          <p>SOLID помогает писать код, который легко поддерживать, расширять и тестировать. Это не жёсткие правила, а руководства — применяйте с умом</p>
        </div>
      </div>

      {principles.map(p => (
        <div key={p.letter} className="card">
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="principle-letter" style={{ background: p.color }}>{p.letter}</div>
              <div>
                <h3 className="card-title">{p.name}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.ru}</div>
              </div>
            </div>
          </div>
          <CodeBlock code={p.code} language="typescript" title={`${p.letter} — ${p.name}`} />
        </div>
      ))}

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Частые вопросы на собесе</h3>
        </div>
        <div className="interview-item"><div className="q">Расскажите про SOLID простыми словами</div><div className="a">S — одна задача на модуль. O — новый функционал через расширение. L — подкласс не ломает контракт. I — маленькие интерфейсы. D — зависимость от абстракций</div></div>
        <div className="interview-item"><div className="q">Приведите пример нарушения OCP на фронтенде</div><div className="a">Огромный switch/case для рендеринга разных типов UI — каждый новый тип требует изменения существующего кода. Решение: map стратегий или фабрика компонентов</div></div>
        <div className="interview-item"><div className="q">Как DIP применяется в React/Vue?</div><div className="a">React Context / Vue provide-inject — компонент зависит от интерфейса (контекста), а не от конкретной реализации. Это позволяет подменять сервисы в тестах</div></div>
      </div>
    </div>
  )
}
