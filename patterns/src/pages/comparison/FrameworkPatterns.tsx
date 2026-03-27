import CodeBlock from '../../components/CodeBlock'

/* ─── React patterns ─── */
const reactObserver = `// Observer → React: useState + useEffect
// State change notifies all subscribers (components)

function PriceTracker() {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // SSE = Observer: server pushes, client listens
    const source = new EventSource('/api/prices');
    source.addEventListener('update', (e) => {
      setPrice(JSON.parse(e.data).price); // setState = notify
    });
    return () => source.close(); // unsubscribe
  }, []);

  return <span>{price}</span>; // React re-renders = observer callback
}`

const reactStrategy = `// Strategy → React: рендер-пропсы и компоненты как стратегии

type SortStrategy<T> = (a: T, b: T) => number;

interface SortableListProps<T> {
  items: T[];
  strategy: SortStrategy<T>;  // стратегия передаётся как проп
  renderItem: (item: T) => ReactNode;
}

function SortableList<T>({ items, strategy, renderItem }: SortableListProps<T>) {
  const sorted = [...items].sort(strategy);
  return <ul>{sorted.map(renderItem)}</ul>;
}

// Использование — подмена стратегии
const byName: SortStrategy<User> = (a, b) => a.name.localeCompare(b.name);
const byDate: SortStrategy<User> = (a, b) => b.createdAt - a.createdAt;

<SortableList items={users} strategy={byName} renderItem={u => <li>{u.name}</li>} />
<SortableList items={users} strategy={byDate} renderItem={u => <li>{u.name}</li>} />`

const reactDecorator = `// Decorator → React: HOC (Higher-Order Component)

function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, loading } = useAuth();
    if (loading) return <Spinner />;
    if (!user) return <Navigate to="/login" />;
    return <Component {...props} />;  // оборачиваем, добавляя поведение
  };
}

// HOC = Decorator: оборачивает компонент, добавляя функциональность
const ProtectedDashboard = withAuth(Dashboard);

// Современная альтернатива — хуки (тоже паттерн Decorator)
function Dashboard() {
  useRequireAuth();  // hook = inline decorator
  return <div>...</div>;
}`

const reactComposite = `// Composite → React: компоненты = дерево

// Каждый компонент может содержать другие компоненты
// Uniform interface: render() / props / children

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="layout">
      <Header />               {/* leaf */}
      <Sidebar>                {/* composite */}
        <NavItem to="/" />     {/* leaf */}
        <NavGroup title="Docs"> {/* composite */}
          <NavItem to="/api" />
          <NavItem to="/guide" />
        </NavGroup>
      </Sidebar>
      <main>{children}</main>  {/* composite: произвольная вложенность */}
    </div>
  );
}

// React.Children API — работа с деревом как с коллекцией (Iterator!)
React.Children.map(children, child => 
  React.cloneElement(child, { className: 'enhanced' })
);`

const reactCommand = `// Command → React: actions в Redux / useReducer

type Action =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } };

// Каждый action = Command object
// Reducer = Invoker (выполняет команду)
// State = Receiver

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, createTodo(action.payload.text)] };
    case 'TOGGLE_TODO':
      return { ...state, todos: state.todos.map(t =>
        t.id === action.payload.id ? { ...t, done: !t.done } : t
      )};
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload.id) };
  }
}

// Undo/Redo — сохраняем историю команд (Memento + Command)
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'ADD_TODO', payload: { text: 'Learn patterns' } });`

/* ─── Vue patterns ─── */
const vueObserver = `// Observer → Vue: reactivity system (Proxy-based)

// ref() / reactive() = Observable subject
// watch() / watchEffect() = Observer subscription
// Template binding = automatic subscription

import { ref, watch, computed } from 'vue';

const price = ref(0);          // Observable
const formatted = computed(() => // Derived observer
  \`\${price.value.toFixed(2)} ₽\`
);

watch(price, (newVal, oldVal) => {  // Explicit observer
  console.log(\`Price: \${oldVal} → \${newVal}\`);
});

// Pinia store = Observer + Mediator
const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const total = computed(() => items.value.reduce((s, i) => s + i.price, 0));
  
  function addItem(item: CartItem) {
    items.value.push(item); // Все подписчики автоматически обновятся
  }
  
  return { items, total, addItem };
});`

const vueStrategy = `// Strategy → Vue: динамические компоненты и provide/inject

// 1. Dynamic components — подмена стратегии рендеринга
<component :is="currentView" v-bind="props" />

// 2. Provide / Inject — стратегия через DI
// Parent (определяет стратегию)
const formatter: Formatter = {
  date: (d: Date) => d.toLocaleDateString('ru-RU'),
  currency: (n: number) => \`\${n.toFixed(2)} ₽\`,
};
provide('formatter', formatter);

// Child (использует стратегию, не зная реализации)
const formatter = inject<Formatter>('formatter')!;
const display = formatter.currency(product.price);

// 3. Composables — стратегия как функция
function useSorting<T>(items: Ref<T[]>, strategy: Ref<SortFn<T>>) {
  return computed(() => [...items.value].sort(strategy.value));
}`

const vueDecorator = `// Decorator → Vue: директивы и composables

// Custom directive = Decorator для DOM-элемента
const vTooltip: Directive<HTMLElement, string> = {
  mounted(el, binding) {
    // Добавляем поведение (tooltip) к любому элементу
    const tip = document.createElement('span');
    tip.className = 'tooltip';
    tip.textContent = binding.value;
    el.style.position = 'relative';
    el.appendChild(tip);
    el.addEventListener('mouseenter', () => tip.style.display = 'block');
    el.addEventListener('mouseleave', () => tip.style.display = 'none');
  },
  updated(el, binding) {
    el.querySelector('.tooltip')!.textContent = binding.value;
  }
};

// Использование: декорируем элемент директивой
<button v-tooltip="'Удалить элемент'">🗑</button>

// Composable = функциональный Decorator
function useDebounce<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(value.value) as Ref<T>;
  let timer: ReturnType<typeof setTimeout>;
  watch(value, (v) => {
    clearTimeout(timer);
    timer = setTimeout(() => debounced.value = v, delay);
  });
  return debounced;
}`

/* ─── Backend patterns ─── */
const backendChain = `// Chain of Responsibility → Express/Koa middleware

// Express middleware = chain of handlers
// Каждый handler решает: обработать или передать дальше (next)

import express from 'express';
const app = express();

// 1. Logging middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // передаём следующему в цепочке
});

// 2. Auth middleware (может прервать цепочку)
app.use((req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    req.user = verifyToken(token);
    next(); // передаём дальше
  } catch {
    res.status(403).json({ error: 'Invalid token' });
    // НЕ вызываем next() — цепочка прерывается
  }
});

// 3. Route handler (конечный обработчик)
app.get('/api/profile', (req, res) => {
  res.json(req.user);
});`

const backendStrategy = `// Strategy → Backend: DI и policy-based design

// Стратегия оплаты — разные провайдеры
interface PaymentStrategy {
  charge(amount: number, currency: string): Promise<PaymentResult>;
  refund(txId: string): Promise<void>;
}

class StripePayment implements PaymentStrategy {
  async charge(amount: number, currency: string) {
    return stripe.paymentIntents.create({ amount, currency });
  }
  async refund(txId: string) {
    await stripe.refunds.create({ payment_intent: txId });
  }
}

class PayPalPayment implements PaymentStrategy { /* ... */ }

// Service использует стратегию через DI
class OrderService {
  constructor(private payment: PaymentStrategy) {} // инъекция стратегии

  async checkout(cart: Cart) {
    const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
    const result = await this.payment.charge(total, 'RUB');
    return this.saveOrder(cart, result);
  }
}

// Конфигурация через DI-контейнер (NestJS, InversifyJS)
@Injectable()
class OrderModule {
  // Подмена стратегии без изменения OrderService
  providers: [{ provide: 'PaymentStrategy', useClass: StripePayment }]
}`

const backendProxy = `// Proxy → Backend: кеширование, логирование, rate limiting

// 1. Caching Proxy
class CachedUserRepository implements UserRepository {
  private cache = new Map<string, { user: User; expiry: number }>();

  constructor(private real: UserRepository, private ttl = 60_000) {}

  async findById(id: string): Promise<User | null> {
    const cached = this.cache.get(id);
    if (cached && cached.expiry > Date.now()) return cached.user;

    const user = await this.real.findById(id); // делегируем реальному
    if (user) this.cache.set(id, { user, expiry: Date.now() + this.ttl });
    return user;
  }
}

// 2. JS Proxy (метапрограммирование)
function createLoggingProxy<T extends object>(target: T, label: string): T {
  return new Proxy(target, {
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);
      if (typeof value === 'function') {
        return (...args: unknown[]) => {
          console.log(\`[\${label}] \${String(prop)}(\${args.join(', ')})\`);
          return value.apply(obj, args);
        };
      }
      return value;
    }
  });
}

const db = createLoggingProxy(realDb, 'DB');
db.query('SELECT * FROM users'); // [DB] query(SELECT * FROM users)`

/* ─── Cross-cutting mapping table ─── */

export default function FrameworkPatterns() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🗺 Паттерны в React, Vue и Backend</h1>
        <p>Маппинг GoF-паттернов на реальные конструкции фреймворков</p>
        <span className="pattern-category cat-behavioral">Практика</span>
      </div>

      {/* Master mapping table */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">📊 Карта паттернов → фреймворки</h3></div>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table">
            <thead>
              <tr><th>Паттерн</th><th>React</th><th>Vue</th><th>Backend (Node)</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Observer</strong></td><td>useState, useEffect, event handlers</td><td>ref, watch, computed, Pinia</td><td>EventEmitter, Pub/Sub, WebSocket</td></tr>
              <tr><td><strong>Strategy</strong></td><td>Props-функции, render props</td><td>provide/inject, dynamic :is</td><td>DI, policy classes</td></tr>
              <tr><td><strong>Decorator</strong></td><td>HOC, custom hooks</td><td>Directives, composables</td><td>Express middleware, decorators</td></tr>
              <tr><td><strong>Composite</strong></td><td>Component tree, children</td><td>Slots, component tree</td><td>Nested routes, AST</td></tr>
              <tr><td><strong>Command</strong></td><td>useReducer, Redux actions</td><td>Pinia actions, Vuex mutations</td><td>CQRS, task queues</td></tr>
              <tr><td><strong>Chain of Resp.</strong></td><td>Error boundaries, middleware</td><td>Navigation guards</td><td>Express/Koa middleware</td></tr>
              <tr><td><strong>Proxy</strong></td><td>React.lazy, forwardRef</td><td>Vue reactivity (JS Proxy)</td><td>Caching proxy, API gateway</td></tr>
              <tr><td><strong>Facade</strong></td><td>Custom hooks (useAuth)</td><td>Composables (useAuth)</td><td>Service layer, API routes</td></tr>
              <tr><td><strong>Factory</strong></td><td>createElement, component maps</td><td>defineAsyncComponent, resolveComponent</td><td>DI container, createServer</td></tr>
              <tr><td><strong>Singleton</strong></td><td>Context, module-scope state</td><td>App-level provide, Pinia store</td><td>DB connection, config</td></tr>
              <tr><td><strong>Adapter</strong></td><td>API normalization hooks</td><td>Computed props for legacy data</td><td>ORM, driver adapters</td></tr>
              <tr><td><strong>State</strong></td><td>useReducer with state machines</td><td>XState + Vue, ref-based FSM</td><td>Order status, workflow engines</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* React section */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">⚛️ React: Observer</h3><span className="card-badge badge-blue">useState + useEffect</span></div>
        <CodeBlock code={reactObserver} language="typescript" title="Observer в React — state и подписки" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">⚛️ React: Strategy</h3><span className="card-badge badge-blue">Props & Render Props</span></div>
        <CodeBlock code={reactStrategy} language="typescript" title="Strategy в React — функции как пропсы" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">⚛️ React: Decorator</h3><span className="card-badge badge-blue">HOC & Hooks</span></div>
        <CodeBlock code={reactDecorator} language="typescript" title="Decorator в React — HOC и кастомные хуки" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">⚛️ React: Composite</h3><span className="card-badge badge-blue">Component Tree</span></div>
        <CodeBlock code={reactComposite} language="typescript" title="Composite в React — дерево компонентов" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">⚛️ React: Command</h3><span className="card-badge badge-blue">useReducer / Redux</span></div>
        <CodeBlock code={reactCommand} language="typescript" title="Command в React — actions и reducer" />
      </div>

      {/* Vue section */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">💚 Vue: Observer</h3><span className="card-badge badge-green">Reactivity System</span></div>
        <CodeBlock code={vueObserver} language="typescript" title="Observer во Vue — ref, watch, Pinia" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💚 Vue: Strategy</h3><span className="card-badge badge-green">provide/inject & :is</span></div>
        <CodeBlock code={vueStrategy} language="typescript" title="Strategy во Vue — DI и dynamic components" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💚 Vue: Decorator</h3><span className="card-badge badge-green">Directives & Composables</span></div>
        <CodeBlock code={vueDecorator} language="typescript" title="Decorator во Vue — директивы и composables" />
      </div>

      {/* Backend section */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">🖥 Backend: Chain of Responsibility</h3><span className="card-badge badge-purple">Express Middleware</span></div>
        <CodeBlock code={backendChain} language="typescript" title="Chain of Responsibility — Express middleware" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🖥 Backend: Strategy</h3><span className="card-badge badge-purple">DI & Policy</span></div>
        <CodeBlock code={backendStrategy} language="typescript" title="Strategy на бэкенде — DI и полиморфизм" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🖥 Backend: Proxy</h3><span className="card-badge badge-purple">Cache & Logging</span></div>
        <CodeBlock code={backendProxy} language="typescript" title="Proxy на бэкенде — кеш, логирование, JS Proxy" />
      </div>

      {/* Cross-links */}
      <div className="card">
        <div className="card-header"><h3 className="card-title">🔗 Перекрёстные связи</h3></div>
        <div className="info-box" style={{ marginBottom: 12 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Один паттерн — много обличий</div>
            <p>Большинство фреймворков используют одни и те же GoF-паттерны, только называют их по-разному. Понимание абстрактного паттерна даёт вам суперсилу: вы мгновенно узнаёте знакомую структуру в незнакомом фреймворке.</p>
          </div>
        </div>
        <ul className="use-cases">
          <li><strong>React hooks = Facade + Decorator</strong>: useAuth() скрывает complexity (Facade) и добавляет поведение к компонентам (Decorator)</li>
          <li><strong>Vue reactivity = Observer + Proxy</strong>: Proxy перехватывает доступ (Proxy pattern), ref/watch оповещают подписчиков (Observer)</li>
          <li><strong>Redux/Pinia = Command + Mediator + Observer</strong>: actions = команды, store = медиатор, подписки = observer</li>
          <li><strong>Express middleware = Chain of Resp. + Decorator</strong>: цепочка обработчиков, каждый добавляет поведение</li>
          <li><strong>React Router / Vue Router = Strategy + State</strong>: маршрутизация = выбор стратегии рендера по состоянию URL</li>
          <li><strong>React Context / Vue provide = Singleton + Facade</strong>: одна точка доступа к данным для всего поддерева</li>
        </ul>
      </div>
    </div>
  )
}
