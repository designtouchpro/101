import CodeBlock from '../../components/CodeBlock'

const code = `// State — объект меняет поведение при изменении состояния

// Состояния
interface OrderState {
  name: string
  next(order: Order): void
  cancel(order: Order): void
  getActions(): string[]
}

class PendingState implements OrderState {
  name = 'pending'
  next(order: Order) {
    console.log('✅ Оплата получена → processing')
    order.setState(new ProcessingState())
  }
  cancel(order: Order) {
    console.log('❌ Заказ отменён')
    order.setState(new CancelledState())
  }
  getActions() { return ['Оплатить', 'Отменить'] }
}

class ProcessingState implements OrderState {
  name = 'processing'
  next(order: Order) {
    console.log('📦 Отправлен → shipped')
    order.setState(new ShippedState())
  }
  cancel(order: Order) {
    console.log('💰 Возврат средств → cancelled')
    order.setState(new CancelledState())
  }
  getActions() { return ['Отправить', 'Отменить с возвратом'] }
}

class ShippedState implements OrderState {
  name = 'shipped'
  next(order: Order) {
    console.log('🎉 Доставлен!')
    order.setState(new DeliveredState())
  }
  cancel() { console.log('⚠️ Нельзя отменить — уже в пути') }
  getActions() { return ['Подтвердить доставку'] }
}

class DeliveredState implements OrderState {
  name = 'delivered'
  next() { console.log('Заказ завершён') }
  cancel() { console.log('Оформите возврат') }
  getActions() { return ['Оформить возврат'] }
}

class CancelledState implements OrderState {
  name = 'cancelled'
  next() { console.log('Заказ отменён, действия невозможны') }
  cancel() { console.log('Уже отменён') }
  getActions() { return [] }
}

// Context
class Order {
  private state: OrderState = new PendingState()

  setState(state: OrderState) { this.state = state }
  next() { this.state.next(this) }
  cancel() { this.state.cancel(this) }
  getStatus() { return this.state.name }
  getActions() { return this.state.getActions() }
}

const order = new Order()
order.next()   // pending → processing
order.next()   // processing → shipped
order.cancel() // ⚠️ Нельзя отменить`

const frontendCode = `// Фронтенд: State для UI

// 1. Состояния загрузки данных
type FetchState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

function UserProfile({ userId }: { userId: string }) {
  const [state, setState] = useState<FetchState<User>>({ status: 'idle' })

  useEffect(() => {
    setState({ status: 'loading' })
    fetchUser(userId)
      .then(data => setState({ status: 'success', data }))
      .catch(err => setState({ status: 'error', error: err.message }))
  }, [userId])

  // Рендеринг зависит от состояния
  switch (state.status) {
    case 'idle':    return null
    case 'loading': return <Spinner />
    case 'error':   return <ErrorMessage error={state.error} />
    case 'success': return <Profile user={state.data} />
  }
}

// 2. Wizard / Multi-step form
type WizardStep = 'info' | 'address' | 'payment' | 'confirm'

const transitions: Record<WizardStep, WizardStep | null> = {
  info: 'address',
  address: 'payment',
  payment: 'confirm',
  confirm: null,
}

function nextStep(current: WizardStep): WizardStep | null {
  return transitions[current]
}

// 3. Анимации (idle → entering → visible → exiting → hidden)
// React Transition Group, Framer Motion — всё State паттерн`

export default function State() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🚦 State (Состояние)</h1>
        <p>Позволяет объекту менять поведение при изменении внутреннего состояния, выглядит как смена класса</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Светофор.</strong> Красный → зелёный → жёлтый → красный. На каждом состоянии разрешены разные действия. Светофор не использует if/else — он переключает объект-состояние</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="State — статусы заказа" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="FetchState, Wizard, Анимации" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Состояния загрузки (idle/loading/success/error)</li>
          <li>Wizard / multi-step формы</li>
          <li>Статус заказа, документа, задачи</li>
          <li>Анимации (enter/exit transitions)</li>
          <li>Заменяет длинные switch/if-else цепочки</li>
        </ul>
      </div>
    </div>
  )
}
