import CodeBlock from '../../components/CodeBlock'

const dryCode = `// DRY — Don't Repeat Yourself
// Каждая единица знания имеет одно авторитетное представление

// ❌ Копипаста
function validateLoginForm(email: string, password: string) {
  if (!email.includes('@')) return 'Invalid email'
  if (password.length < 8) return 'Password too short'
}

function validateRegisterForm(email: string, password: string) {
  if (!email.includes('@')) return 'Invalid email' // дубликат!
  if (password.length < 8) return 'Password too short' // дубликат!
}

// ✅ Переиспользуемые валидаторы
const validators = {
  email: (v: string) => v.includes('@') || 'Invalid email',
  minLength: (min: number) => (v: string) =>
    v.length >= min || \`Минимум \${min} символов\`,
}

function validate(value: string, ...rules: ((v: string) => true | string)[]) {
  for (const rule of rules) {
    const result = rule(value)
    if (result !== true) return result
  }
  return true
}

// Используем везде
validate(email, validators.email)
validate(password, validators.minLength(8))`

const kissCode = `// KISS — Keep It Simple, Stupid
// Простое решение лучше сложного

// ❌ Overengineering: абстрактная фабрика для одной кнопки
class ButtonFactoryProvider {
  private static instance: ButtonFactoryProvider
  private factories = new Map<string, ButtonFactory>()

  static getInstance() { /* ... */ }
  registerFactory(type: string, factory: ButtonFactory) { /* ... */ }
  createButton(type: string, props: ButtonProps) {
    return this.factories.get(type)?.create(props)
  }
}

// ✅ KISS: просто функция
function Button({ variant = 'primary', children, onClick }) {
  const styles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
    danger: 'bg-red-500 text-white',
  }
  return <button className={styles[variant]} onClick={onClick}>{children}</button>
}

// ❌ Сложный стейт-менеджмент для простого тогла
// ✅ useState(false) — KISS`

const yagniCode = `// YAGNI — You Aren't Gonna Need It
// Не реализуй то, что не нужно прямо сейчас

// ❌ «А вдруг понадобится!»
interface User {
  id: string
  name: string
  email: string
  phone?: string         // нет в дизайне
  avatar?: string        // нет в дизайне
  theme?: string         // нет в дизайне
  language?: string      // нет в дизайне
  notifications?: {      // нет в дизайне
    email: boolean
    push: boolean
    sms: boolean
  }
}

// ✅ Только то, что реально нужно сейчас
interface User {
  id: string
  name: string
  email: string
}
// Остальное добавим, когда появится задача в спринте

// Фронтенд YAGNI:
// • Не делай «универсальный» компонент заранее
// • Не добавляй i18n пока нет задачи на мультиязычность
// • Не пиши абстракцию пока нет 2-3 похожих мест
// • Не оптимизируй пока нет проблем с перформансом`

const otherPrinciples = `// Другие важные принципы

// 📏 Separation of Concerns (SoC)
// Разделение ответственности по слоям
// UI | Business Logic | Data Access | Infrastructure

// 🎯 Composition over Inheritance
// Предпочитай композицию наследованию
const withLogging = (fn) => (...args) => {
  console.log('Call:', fn.name, args)
  return fn(...args)
}

// 📐 Law of Demeter (Принцип наименьшего знания)
// ❌ user.getAddress().getCity().getName()
// ✅ user.getCityName()

// 🔄 Tell, Don't Ask
// ❌ if (order.getStatus() === 'paid') order.setStatus('shipped')
// ✅ order.ship() // объект сам знает как изменить состояние

// 📦 Encapsulation
// Скрывай внутреннюю реализацию
class Counter {
  #count = 0  // приватное поле
  increment() { this.#count++ }
  get value() { return this.#count }
}

// 🔌 Principle of Least Astonishment
// Код должен вести себя так, как ожидает читатель
// ❌ function saveUser() { deleteAllUsers(); createUser(); }
// ✅ function replaceAllUsersWithNew() { ... }`

export default function DryKissYagni() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>✨ DRY / KISS / YAGNI</h1>
        <p>Фундаментальные принципы написания чистого и поддерживаемого кода</p>
        <span className="pattern-category cat-principle">Принципы проектирования</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔁 DRY — Don't Repeat Yourself</h3>
          <span className="card-badge badge-green">Устранение дублирования</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Если у вас 10 копий одного документа и нужно внести правку — придётся менять все 10. DRY говорит: храните один оригинал, а все ссылки пусть указывают на него
        </div>
        <CodeBlock code={dryCode} language="typescript" title="DRY — переиспользуй, не копируй" />
        <div className="info-box warning" style={{ marginTop: 16 }}>
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">DRY ≠ «никогда не дублируй»</div>
            <p>Иногда дублирование лучше неудачной абстракции. Если два куска кода похожи, но меняются по разным причинам — это не дублирование (WET: Write Everything Twice, пока не появится паттерн)</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💋 KISS — Keep It Simple, Stupid</h3>
          <span className="card-badge badge-blue">Простота</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Не строй ракету, чтобы перейти дорогу. Самое простое решение, которое работает — обычно лучшее
        </div>
        <CodeBlock code={kissCode} language="typescript" title="KISS — не усложняй" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚫 YAGNI — You Aren't Gonna Need It</h3>
          <span className="card-badge badge-orange">Прагматизм</span>
        </div>
        <div className="analogy">
          <strong>Аналогия:</strong> Не покупай 12-местный автобус для поездки за хлебом «а вдруг друзья захотят поехать». Покупай то, что нужно сейчас
        </div>
        <CodeBlock code={yagniCode} language="typescript" title="YAGNI — делай только нужное" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📚 Другие принципы</h3>
          <span className="card-badge">Бонус</span>
        </div>
        <CodeBlock code={otherPrinciples} language="typescript" title="SoC, Composition over Inheritance и другие" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">❓ Вопросы на собесе</h3>
        </div>
        <div className="interview-item"><div className="q">Что такое DRY и когда его нарушение оправдано?</div><div className="a">DRY — «не повторяй себя». Нарушение оправдано, когда два куска кода похожи случайно и меняются по разным причинам. Преждевременная абстракция хуже дублирования</div></div>
        <div className="interview-item"><div className="q">Приведите пример нарушения KISS на фронтенде</div><div className="a">Redux + saga + reselect + normalizr для страницы с одной формой. useState + fetch хватит. Или: написание «универсального» компонента вместо двух простых</div></div>
        <div className="interview-item"><div className="q">Как YAGNI соотносится с архитектурным планированием?</div><div className="a">YAGNI не запрещает думать вперёд, но запрещает реализовывать вперёд. Можно спроектировать расширяемый интерфейс (OCP), но не писать код для фич из будущего</div></div>
      </div>
    </div>
  )
}
