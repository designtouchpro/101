import CodeBlock from '../../components/CodeBlock'

const code = `// Iterator — последовательный доступ к элементам коллекции

// Пользовательский итератор для пагинации API
class PaginatedIterator<T> {
  private page = 0
  private buffer: T[] = []
  private done = false

  constructor(
    private fetchPage: (page: number) => Promise<{ data: T[]; hasMore: boolean }>,
    private pageSize = 20
  ) {}

  async *[Symbol.asyncIterator]() {
    while (!this.done) {
      if (this.buffer.length === 0) {
        const result = await this.fetchPage(this.page++)
        this.buffer = result.data
        this.done = !result.hasMore
      }
      while (this.buffer.length > 0) {
        yield this.buffer.shift()!
      }
    }
  }
}

// Использование — простой for-of
const users = new PaginatedIterator(async (page) => {
  const res = await fetch(\`/api/users?page=\${page}&limit=20\`)
  const data = await res.json()
  return { data: data.items, hasMore: data.hasMore }
})

for await (const user of users) {
  console.log(user) // Автоматически подгружает следующую страницу!
}`

const frontendCode = `// JS встроенные итераторы — используете каждый день!

// 1. Symbol.iterator — for...of работает с любым объектом
class DateRange {
  constructor(
    private start: Date,
    private end: Date
  ) {}

  *[Symbol.iterator]() {
    const current = new Date(this.start)
    while (current <= this.end) {
      yield new Date(current)
      current.setDate(current.getDate() + 1)
    }
  }
}

const week = new DateRange(
  new Date('2025-01-01'),
  new Date('2025-01-07')
)

for (const day of week) {
  console.log(day.toLocaleDateString()) // 7 дней
}

// Деструктуризация тоже работает!
const [first, second, third] = week

// 2. Генераторы — ленивые итераторы
function* fibonacci() {
  let [a, b] = [0, 1]
  while (true) {
    yield a;
    [a, b] = [b, a + b]
  }
}

// Берём только первые 10
const first10 = [...take(fibonacci(), 10)]

function* take<T>(iterable: Iterable<T>, n: number) {
  let i = 0
  for (const item of iterable) {
    if (i++ >= n) return
    yield item
  }
}

// 3. Map, Set, NodeList — все итерируемые
const map = new Map([['a', 1], ['b', 2]])
for (const [key, value] of map) { /* ... */ }

document.querySelectorAll('div').forEach(div => { /* ... */ })`

export default function Iterator() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 Iterator (Итератор)</h1>
        <p>Последовательный доступ к элементам коллекции без раскрытия её внутренней структуры</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Плейлист.</strong> Кнопки «вперёд» и «назад» позволяют перебирать треки, не зная, как они хранятся (массив, БД, стрим). У плейлиста есть «текущий трек» и «следующий» — это и есть итератор</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="AsyncIterator — пагинация API" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Symbol.iterator, генераторы, for...of" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Итератор встроен в JS</div>
            <p>for...of, spread (...), деструктуризация, Array.from() — всё работает через Symbol.iterator. Вы используете Iterator каждый день!</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Пагинация API (async iterator)</li>
          <li>Ленивое вычисление (генераторы)</li>
          <li>Обход произвольных структур (деревья, графы)</li>
          <li>Symbol.iterator для кастомных коллекций</li>
        </ul>
      </div>
    </div>
  )
}
