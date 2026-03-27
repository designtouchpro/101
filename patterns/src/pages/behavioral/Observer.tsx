import CodeBlock from '../../components/CodeBlock'

const code = `// Observer — один-ко-многим: при изменении объекта оповещаются все подписчики

// Типизированный EventEmitter
type EventMap = {
  'user:login': { userId: string; timestamp: number }
  'user:logout': { userId: string }
  'cart:update': { items: string[]; total: number }
  'theme:change': { theme: 'light' | 'dark' }
}

class TypedEventEmitter<T extends Record<string, unknown>> {
  private listeners = new Map<keyof T, Set<(data: any) => void>>()

  on<K extends keyof T>(event: K, handler: (data: T[K]) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler)
    
    // Возвращаем функцию отписки
    return () => this.listeners.get(event)?.delete(handler)
  }

  emit<K extends keyof T>(event: K, data: T[K]) {
    this.listeners.get(event)?.forEach(handler => handler(data))
  }
}

// Использование — полная типизация!
const emitter = new TypedEventEmitter<EventMap>()

const unsub = emitter.on('cart:update', ({ items, total }) => {
  console.log(\`Корзина: \${items.length} товаров, \${total}₽\`)
})

emitter.emit('cart:update', { items: ['iPhone'], total: 99990 })
unsub() // отписка`

const frontendCode = `// Фронтенд: Observer = реактивность

// 1. addEventListener — классический Observer
const button = document.querySelector('button')!
button.addEventListener('click', handleClick)     // подписка
button.removeEventListener('click', handleClick)   // отписка

// 2. RxJS Observable — Observer на стероидах
import { fromEvent, debounceTime, map } from 'rxjs'

fromEvent(input, 'input').pipe(
  debounceTime(300),
  map(e => (e.target as HTMLInputElement).value),
  filter(v => v.length > 2)
).subscribe(query => {
  searchAPI(query)
})

// 3. IntersectionObserver — наблюдение за видимостью
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lazyLoadImage(entry.target)
      observer.unobserve(entry.target) // одноразовая подписка
    }
  })
})

document.querySelectorAll('img[data-src]').forEach(img => {
  observer.observe(img)
})

// 4. MutationObserver — наблюдение за DOM
const mutObserver = new MutationObserver((mutations) => {
  mutations.forEach(m => console.log('DOM changed:', m.type))
})
mutObserver.observe(document.body, { childList: true, subtree: true })

// 5. React useState + useEffect = Observer
// При изменении state, все компоненты, использующие его, обновляются`

export default function Observer() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>👁 Observer (Наблюдатель)</h1>
        <p>Определяет механизм подписки для оповещения объектов об изменениях в наблюдаемом объекте</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>YouTube подписка.</strong> Вы подписываетесь на канал (subscribe). Когда выходит новое видео, все подписчики получают уведомление. Можно отписаться в любой момент. Канал не знает своих подписчиков лично</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Observer — типизированный EventEmitter" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Events, RxJS, IntersectionObserver, MutationObserver" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">🏆</span>
          <div className="info-box-content">
            <div className="info-box-title">Самый важный паттерн на фронтенде</div>
            <p>Observer делает возможной всю реактивность: DOM events, RxJS, React state, Vue reactivity, Angular signals, MobX. Если вы понимаете Observer, вы понимаете фронтенд</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>События DOM (addEventListener)</li>
          <li>Реактивность (Vue ref, React state)</li>
          <li>WebSocket / SSE подписки</li>
          <li>IntersectionObserver (lazy loading, infinite scroll)</li>
          <li>Pub/Sub системы</li>
        </ul>
      </div>
    </div>
  )
}
