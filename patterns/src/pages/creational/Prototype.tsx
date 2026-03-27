import CodeBlock from '../../components/CodeBlock'

const code = `// Prototype — клонирование объектов

interface Cloneable<T> {
  clone(): T
}

class ComponentConfig implements Cloneable<ComponentConfig> {
  constructor(
    public styles: Record<string, string>,
    public events: string[],
    public children: ComponentConfig[]
  ) {}

  clone(): ComponentConfig {
    return new ComponentConfig(
      { ...this.styles },                     // shallow copy объекта
      [...this.events],                       // shallow copy массива
      this.children.map(c => c.clone())       // deep clone рекурсивно
    )
  }
}

// Создаём прототип
const cardPrototype = new ComponentConfig(
  { padding: '16px', borderRadius: '8px', background: '#1a1a1a' },
  ['click', 'hover'],
  []
)

// Клонируем и модифицируем — не трогаем оригинал
const heroCard = cardPrototype.clone()
heroCard.styles.background = '#2a2a4a'
heroCard.styles.padding = '32px'

const miniCard = cardPrototype.clone()
miniCard.styles.padding = '8px'
miniCard.events = ['click']

console.log(cardPrototype.styles.padding) // '16px' — оригинал не изменился!`

const frontendCode = `// Фронтенд: Prototype в JS

// 1. structuredClone (встроено в браузер!)
const original = {
  name: 'Task',
  date: new Date(),
  nested: { tags: ['bug', 'fix'] }
}

const copy = structuredClone(original)
copy.nested.tags.push('urgent')
console.log(original.nested.tags) // ['bug', 'fix'] — не изменился

// 2. Прототипирование состояний
interface FormState {
  fields: Record<string, string>
  errors: Record<string, string>
  touched: Set<string>
}

const defaultState: FormState = {
  fields: { name: '', email: '' },
  errors: {},
  touched: new Set()
}

function createFormState(): FormState {
  return structuredClone(defaultState)
}

// Каждая форма получает свою копию
const loginForm = createFormState()
const registerForm = createFormState()

// 3. Object.create — прототипное наследование JS
const baseConfig = {
  theme: 'dark',
  lang: 'ru',
  getTheme() { return this.theme }
}

// Создаёт объект с baseConfig в прототипе
const userConfig = Object.create(baseConfig)
userConfig.theme = 'light' // переопределяем
console.log(userConfig.lang) // 'ru' — из прототипа
console.log(userConfig.getTheme()) // 'light'`

export default function Prototype() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧬 Prototype (Прототип)</h1>
        <p>Создаёт новые объекты путём клонирования существующих, избегая затрат на повторную инициализацию</p>
        <span className="pattern-category cat-creational">Порождающий</span>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Копирование документа.</strong> Вместо того чтобы заполнять новый договор с нуля, вы берёте шаблон (прототип), делаете копию и меняете только нужные поля — ФИО, дату, сумму</div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-green">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Prototype — клонирование конфигурации" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Prototype в JavaScript" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">JS — язык прототипов!</div>
            <p>Весь JavaScript построен на прототипном наследовании. Object.create(), __proto__, prototype chain — это и есть паттерн Prototype, встроенный в язык</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Дефолтное состояние форм / компонентов</li>
          <li>Шаблоны конфигураций</li>
          <li>Undo/Redo (снимки состояния)</li>
          <li>Когда создание объекта дорогое (расчёты, запросы)</li>
        </ul>
      </div>
    </div>
  )
}
