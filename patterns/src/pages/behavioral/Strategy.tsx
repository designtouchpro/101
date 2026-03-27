import CodeBlock from '../../components/CodeBlock'

const code = `// Strategy — семейство взаимозаменяемых алгоритмов

// Стратегии сортировки
interface SortStrategy<T> {
  sort(data: T[]): T[]
  name: string
}

class QuickSort<T> implements SortStrategy<T> {
  name = 'QuickSort'
  sort(data: T[]) {
    if (data.length <= 1) return data
    const pivot = data[0]
    const left = data.slice(1).filter(x => x <= pivot)
    const right = data.slice(1).filter(x => x > pivot)
    return [...this.sort(left), pivot, ...this.sort(right)]
  }
}

class BubbleSort<T> implements SortStrategy<T> {
  name = 'BubbleSort'
  sort(data: T[]) {
    const arr = [...data]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    return arr
  }
}

// Context — использует стратегию
class DataProcessor<T> {
  constructor(private strategy: SortStrategy<T>) {}

  setStrategy(strategy: SortStrategy<T>) {
    this.strategy = strategy
  }

  process(data: T[]) {
    console.log(\`Sorting with \${this.strategy.name}...\`)
    return this.strategy.sort(data)
  }
}

// Меняем стратегию на лету
const processor = new DataProcessor(new QuickSort<number>())
processor.process([3, 1, 4, 1, 5])

// Маленький массив? Bubble sort быстрее
processor.setStrategy(new BubbleSort<number>())
processor.process([2, 1])`

const frontendCode = `// Фронтенд: Strategy = функции как параметры

// 1. Array.sort() — принимает стратегию сравнения
const users = [
  { name: 'Алиса', age: 25 },
  { name: 'Боб', age: 30 },
  { name: 'Ева', age: 22 },
]

// Стратегия 1: по имени
users.sort((a, b) => a.name.localeCompare(b.name))

// Стратегия 2: по возрасту
users.sort((a, b) => a.age - b.age)

// 2. Валидация — разные стратегии для разных полей
type Validator = (value: string) => string | null

const required: Validator = (v) => v ? null : 'Обязательное поле'
const minLength = (n: number): Validator => (v) =>
  v.length >= n ? null : \`Минимум \${n} символов\`
const email: Validator = (v) =>
  /^[^@]+@[^@]+$/.test(v) ? null : 'Невалидный email'

const fieldValidators: Record<string, Validator[]> = {
  email: [required, email],
  password: [required, minLength(8)],
  name: [required, minLength(2)],
}

function validate(field: string, value: string): string[] {
  return (fieldValidators[field] ?? [])
    .map(v => v(value))
    .filter(Boolean) as string[]
}

// 3. Rendering strategy
type RenderStrategy = (items: Item[]) => JSX.Element

const GridView: RenderStrategy = (items) => (
  <div className="grid">{items.map(i => <Card item={i} />)}</div>
)
const ListView: RenderStrategy = (items) => (
  <ul>{items.map(i => <ListItem item={i} />)}</ul>
)

// Переключаем отображение
function ProductCatalog({ view }: { view: 'grid' | 'list' }) {
  const strategy = view === 'grid' ? GridView : ListView
  return strategy(products)
}`

export default function Strategy() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧠 Strategy (Стратегия)</h1>
        <p>Определяет семейство алгоритмов, инкапсулирует каждый и делает их взаимозаменяемыми</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Навигатор.</strong> Стратегия прокладки маршрута: на машине, пешком, на велосипеде, на общественном транспорте. Конечная точка одна, но алгоритм маршрута разный. Можно переключить в любой момент</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Strategy — сортировка" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="sort(), валидация, рендеринг" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">В JS Strategy = просто функция</div>
            <p>Благодаря first-class functions, в JS/TS стратегия — это просто функция, переданная как аргумент. Классы не нужны!</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Разные алгоритмы сортировки/фильтрации</li>
          <li>Валидация (разные правила для разных полей)</li>
          <li>Grid/List переключение вида</li>
          <li>Замена условной логики (if/switch) на функции</li>
        </ul>
      </div>
    </div>
  )
}
