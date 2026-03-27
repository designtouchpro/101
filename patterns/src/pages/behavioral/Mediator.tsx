import CodeBlock from '../../components/CodeBlock'

const code = `// Mediator — центральный координатор взаимодействий

// Без Mediator: каждый компонент знает о каждом (N×N связей)
// С Mediator: компоненты знают только о медиаторе (N связей)

interface UIMediator {
  notify(sender: UIWidget, event: string, data?: unknown): void
}

// Компоненты знают только о медиаторе
class UIWidget {
  constructor(protected mediator: UIMediator) {}
}

class SearchInput extends UIWidget {
  value = ''
  
  onChange(value: string) {
    this.value = value
    this.mediator.notify(this, 'search:change', value)
  }
}

class FilterPanel extends UIWidget {
  filters: string[] = []
  
  onFilter(filter: string) {
    this.filters.push(filter)
    this.mediator.notify(this, 'filter:change', this.filters)
  }

  reset() {
    this.filters = []
    this.mediator.notify(this, 'filter:reset')
  }
}

class ProductList extends UIWidget {
  update(query: string, filters: string[]) {
    console.log(\`Загрузка: query="\${query}", filters=[\${filters}]\`)
  }
}

class ResultCounter extends UIWidget {
  setCount(count: number) {
    console.log(\`Найдено: \${count}\`)
  }
}

// Медиатор — координирует все взаимодействия
class ShopMediator implements UIMediator {
  constructor(
    private search: SearchInput,
    private filters: FilterPanel,
    private products: ProductList,
    private counter: ResultCounter
  ) {}

  notify(sender: UIWidget, event: string, data?: unknown) {
    switch (event) {
      case 'search:change':
        this.products.update(data as string, this.filters.filters)
        break
      case 'filter:change':
        this.products.update(this.search.value, data as string[])
        break
      case 'filter:reset':
        this.products.update(this.search.value, [])
        this.counter.setCount(0)
        break
    }
  }
}`

const frontendCode = `// Фронтенд: Mediator на каждом шагу

// 1. Vuex / Redux / Pinia — глобальные хранилища = Mediator
// Компоненты не общаются напрямую, а через store
// Component A → dispatch(action) → Store → Component B обновляется

// 2. EventBus — простейший медиатор
class EventBus {
  private listeners = new Map<string, Set<Function>>()

  on(event: string, fn: Function) {
    if (!this.listeners.has(event)) this.listeners.set(event, new Set())
    this.listeners.get(event)!.add(fn)
  }

  off(event: string, fn: Function) {
    this.listeners.get(event)?.delete(fn)
  }

  emit(event: string, ...args: unknown[]) {
    this.listeners.get(event)?.forEach(fn => fn(...args))
  }
}

const bus = new EventBus()

// Header не знает о Cart
bus.on('cart:update', (count: number) => {
  document.querySelector('.badge')!.textContent = String(count)
})

// Cart не знает о Header
bus.emit('cart:update', 5)

// 3. React Context + useReducer = Mediator
// Контекст предоставляет dispatch, компоненты отправляют
// действия, reducer координирует обновления состояния`

export default function Mediator() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🗼 Mediator (Посредник)</h1>
        <p>Определяет объект, инкапсулирующий взаимодействие между объектами, уменьшая их связанность</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Диспетчер аэропорта.</strong> Самолёты не переговариваются между собой (хаос!). Все общаются через диспетчерскую вышку (медиатор), которая координирует взлёты, посадки и очереди</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Mediator — интернет-магазин" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Store, EventBus, Context" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Глобальный state management (Redux, Vuex, Pinia)</li>
          <li>Координация UI-компонентов (поиск + фильтры + список)</li>
          <li>Event bus / message broker</li>
          <li>Чат-комнаты, уведомления</li>
        </ul>
      </div>
    </div>
  )
}
