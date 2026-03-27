import CodeBlock from '../../components/CodeBlock'

export default function RoutingSSRGuide() {
  return (
    <div className="page-container">
      <h1>🛣️ Routing, Data Loading и SSR</h1>
      <p className="page-description">
        Маршрутизация, границы данных, code splitting, гидратация и серверный рендеринг.
      </p>

      <RoutingConcepts />
      <DataLoading />
      <CodeSplitting />
      <SSRSection />
      <HydrationSection />
      <FailureModes />
    </div>
  )
}

/* ─── Routing concepts ────────────────────────────────── */

function RoutingConcepts() {
  const code = `// === React Router v6/v7 — два стиля API ===

// 1. Declarative (классический) — <Routes> + <Route>
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// 2. Data Router (v6.4+) — createBrowserRouter + loaders
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'users/:id',
        element: <UserProfile />,
        loader: async ({ params }) => {
          // Данные загружаются ДО рендеринга компонента
          return fetch(\`/api/users/\${params.id}\`)
        },
        errorElement: <UserError />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

// Получение данных в компоненте
import { useLoaderData, useParams, useNavigate } from 'react-router-dom'

function UserProfile() {
  const user = useLoaderData()     // данные из loader
  const { id } = useParams()       // параметры URL
  const navigate = useNavigate()   // программная навигация

  return <div>{user.name}</div>
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🗺️ Концепции маршрутизации</span>
      </div>

      <CodeBlock language="tsx" title="Два стиля React Router" code={code} />

      <div className="info-box info" style={{ marginTop: '12px' }}>
        <strong>💡 Data Router vs Declarative:</strong> Data Router привязывает загрузку данных
        к маршруту (как в Remix/Next.js). Данные готовы к моменту рендеринга компонента.
        Declarative — проще, но данные грузятся внутри компонента (waterfall-эффект).
      </div>
    </div>
  )
}

/* ─── Data loading ────────────────────────────────────── */

function DataLoading() {
  const code = `// === Паттерны загрузки данных ===

// 1. Fetch-on-render (наивный) — waterfall!
function UserProfile({ id }) {
  const [user, setUser] = useState(null)
  useEffect(() => {
    fetch(\`/api/users/\${id}\`).then(r => r.json()).then(setUser)
  }, [id])
  // ❌ Проблема: компонент рендерится → начинает загрузку →
  //    дочерние компоненты тоже fetch-on-render → ВОДОПАД

  if (!user) return <Spinner />
  return <UserPosts userId={user.id} />  // ещё один fetch внутри
}

// 2. Fetch-then-render — загрузить ВСЁ, потом рендерить
function UserPage({ id }) {
  const [data, setData] = useState(null)
  useEffect(() => {
    Promise.all([
      fetch(\`/api/users/\${id}\`),
      fetch(\`/api/users/\${id}/posts\`),
    ]).then(/* ... */)
  }, [id])
  // ✅ Нет водопада, но пользователь ждёт ВСЕ запросы
}

// 3. Render-as-you-fetch (рекомендуемый) — Suspense
// Начинаем загрузку ДО рендеринга, показываем по мере готовности

// С React Router loader:
{
  path: 'users/:id',
  loader: ({ params }) => ({
    user: fetch(\`/api/users/\${params.id}\`),
    posts: fetch(\`/api/users/\${params.id}/posts\`),
  }),
  element: <UserPage />,
}

// С TanStack Query + Suspense:
function UserPage() {
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
  })  // Suspense автоматически покажет fallback
  return <div>{user.name}</div>
}

// === Defer — стриминг от роутера ===
import { defer, Await, useLoaderData } from 'react-router-dom'

// loader
export function loader({ params }) {
  return defer({
    user: fetchUser(params.id),          // ждём
    posts: fetchUserPosts(params.id),    // стримим (Promise)
  })
}

// компонент
function UserPage() {
  const { user, posts } = useLoaderData()
  return (
    <div>
      <h1>{user.name}</h1>
      <Suspense fallback={<PostsSkeleton />}>
        <Await resolve={posts}>
          {(data) => <PostList posts={data} />}
        </Await>
      </Suspense>
    </div>
  )
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📡 Data Loading — паттерны загрузки</span>
      </div>

      <CodeBlock language="tsx" title="Три паттерна загрузки данных" code={code} />

      <table className="comparison-table" style={{ width: '100%', marginTop: '16px' }}>
        <thead>
          <tr>
            <th>Паттерн</th>
            <th>Waterfall</th>
            <th>UX</th>
            <th>Сложность</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Fetch-on-render</td><td>❌ Да</td><td>Много спиннеров</td><td>Простой</td></tr>
          <tr><td>Fetch-then-render</td><td>✅ Нет</td><td>Один долгий спиннер</td><td>Средний</td></tr>
          <tr><td>Render-as-you-fetch</td><td>✅ Нет</td><td>Прогрессивный</td><td>Выше</td></tr>
        </tbody>
      </table>
    </div>
  )
}

/* ─── Code splitting ──────────────────────────────────── */

function CodeSplitting() {
  const code = `// === Route-based code splitting ===

import { lazy, Suspense } from 'react'

// Каждый lazy() → отдельный JS-чанк
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
const Admin = lazy(() => import('./pages/Admin'))

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />          {/* в основном бандле */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* lazy чанк */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Suspense>
  )
}

// === Prefetch — предзагрузка чанков ===

// Вариант 1: Prefetch при hover на ссылку
function NavLink({ to, children }) {
  const prefetch = () => {
    // Бандлер создаст чанк, fetch начнётся при hover
    if (to === '/dashboard') import('./pages/Dashboard')
    if (to === '/settings') import('./pages/Settings')
  }
  return (
    <Link to={to} onMouseEnter={prefetch}>
      {children}
    </Link>
  )
}

// Вариант 2: Prefetch через <link rel="modulepreload">
// Vite автоматически добавляет modulepreload для entrypoints

// === Granular splitting — разбиение внутри страницы ===
const HeavyChart = lazy(() => import('./components/HeavyChart'))

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <HeavyChart />  {/* грузится отдельно */}
      </Suspense>
    </div>
  )
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">✂️ Code Splitting</span>
      </div>
      <p>
        Разбиение бандла по маршрутам — пользователь не грузит код страниц, которые не посещает.
        <code>React.lazy()</code> + <code>Suspense</code> — стандартный механизм.
      </p>

      <CodeBlock language="tsx" title="Route-based и granular splitting" code={code} />
    </div>
  )
}

/* ─── SSR ──────────────────────────────────────────────── */

function SSRSection() {
  const code = `// === Server-Side Rendering (SSR) ===

// Зачем: SEO, быстрый First Contentful Paint, контент без JS

// === Как работает SSR ===
// 1. Браузер запрашивает страницу
// 2. Сервер выполняет React-компоненты → генерирует HTML
// 3. Браузер получает готовый HTML (видно сразу)
// 4. Браузер загружает JS
// 5. React "гидратирует" HTML — привязывает обработчики (hydration)
// До гидратации: HTML видно, но кнопки не работают!

// === API сервера ===

// Старый (React 17): renderToString
import { renderToString } from 'react-dom/server'
const html = renderToString(<App />)
// ❌ Синхронный, блокирующий, без стриминга

// Новый (React 18+): renderToPipeableStream
import { renderToPipeableStream } from 'react-dom/server'

app.get('*', (req, res) => {
  const { pipe } = renderToPipeableStream(<App />, {
    bootstrapScripts: ['/static/client.js'],
    onShellReady() {
      // Основной контент готов → начинаем стримить
      res.setHeader('content-type', 'text/html')
      pipe(res)
    },
    onShellError(error) {
      // Ошибка в критической части → fallback
      res.status(500).send('<h1>Error</h1>')
    },
    onAllReady() {
      // Весь контент (включая Suspense) готов
      // Полезно для краулеров (ботов)
    },
  })
})

// === Фреймворки с SSR из коробки ===
// Next.js — App Router (RSC + SSR + streaming)
// Remix — loader/action + streaming
// Astro — islands architecture
// Vite SSR — manual setup`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🖥️ Server-Side Rendering</span>
      </div>

      <CodeBlock language="tsx" title="SSR pipeline и API" code={code} />

      <table className="comparison-table" style={{ width: '100%', marginTop: '16px' }}>
        <thead>
          <tr>
            <th>Режим</th>
            <th>HTML с сервера</th>
            <th>JS нужен</th>
            <th>SEO</th>
            <th>FCP</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>SPA (CSR)</td><td>❌ Пустой</td><td>Да, для всего</td><td>❌</td><td>Медленный</td></tr>
          <tr><td>SSR</td><td>✅ Полный</td><td>Да, для интерактивности</td><td>✅</td><td>Быстрый</td></tr>
          <tr><td>SSG</td><td>✅ Статический</td><td>Опционально</td><td>✅</td><td>Самый быстрый</td></tr>
          <tr><td>Streaming SSR</td><td>✅ Частями</td><td>Да, Suspense-границы</td><td>✅</td><td>Очень быстрый</td></tr>
        </tbody>
      </table>
    </div>
  )
}

/* ─── Hydration ───────────────────────────────────────── */

function HydrationSection() {
  const code = `// === Гидратация — привязка JS к серверному HTML ===

// Клиент
import { hydrateRoot } from 'react-dom/client'
hydrateRoot(document.getElementById('root'), <App />)

// React сравнивает серверный HTML с клиентским деревом
// и ПРИВЯЗЫВАЕТ обработчики, не пересоздавая DOM

// === Mismatch — несовпадение сервера и клиента ===

// ❌ Эти конструкции вызовут hydration mismatch:
function BadComponent() {
  return (
    <div>
      {/* Разное на сервере и клиенте */}
      <p>{new Date().toLocaleTimeString()}</p>
      <p>{Math.random()}</p>
      <p>{typeof window !== 'undefined' ? 'client' : 'server'}</p>
    </div>
  )
}

// ✅ Правильно: useEffect для клиентского контента
function GoodComponent() {
  const [time, setTime] = useState('')

  useEffect(() => {
    // useEffect выполняется ТОЛЬКО на клиенте, ПОСЛЕ гидратации
    setTime(new Date().toLocaleTimeString())
  }, [])

  return <p>{time || 'Загрузка...'}</p>
}

// === Selective Hydration (React 18) ===
// Suspense-границы гидратируются НЕЗАВИСИМО
<Suspense fallback={<Skeleton />}>
  <HeavyWidget />
  {/* Гидратируется позже — пользователь может кликать на уже
      гидратированные части, пока HeavyWidget ещё грузится */}
</Suspense>

// Приоритет: React гидратирует первым то, с чем
// пользователь пытается взаимодействовать (event replay)`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">💧 Гидратация</span>
      </div>
      <p>
        Гидратация — процесс привязки JavaScript к уже существующему серверному HTML.
        React не пересоздаёт DOM, а «оживляет» его. Мисматчи — главная проблема.
      </p>

      <CodeBlock language="tsx" title="Гидратация, мисматчи и selective hydration" code={code} />
    </div>
  )
}

/* ─── Failure modes ───────────────────────────────────── */

function FailureModes() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🚫 Типичные ошибки</span>
      </div>

      <div className="interview-question">
        <strong>1. Waterfall загрузки</strong>
        <p>Каждый компонент делает свой fetch в useEffect → последовательная загрузка вместо параллельной.
        <strong> Решение:</strong> Поднять данные на уровень маршрута (loader) или Promise.all.</p>
      </div>

      <div className="interview-question">
        <strong>2. Hydration mismatch</strong>
        <p>Сервер и клиент рендерят разный HTML (Date, Math.random, window).
        <strong> Решение:</strong> Клиентский контент — через useEffect с useState.</p>
      </div>

      <div className="interview-question">
        <strong>3. Нет Error Boundary на маршрутах</strong>
        <p>Ошибка в одном маршруте ломает всё приложение.
        <strong> Решение:</strong> errorElement на каждом маршруте (data router) или ErrorBoundary-компонент.</p>
      </div>

      <div className="interview-question">
        <strong>4. Весь бандл в одном чанке</strong>
        <p>Без lazy() пользователь грузит код всех страниц при первом визите.
        <strong> Решение:</strong> React.lazy() + Suspense на уровне маршрутов.</p>
      </div>

      <div className="interview-question">
        <strong>5. Несоответствие серверных/клиентских зависимостей</strong>
        <p>Серверные модули попадают в клиентский бандл ('use server' / 'use client' границы не настроены).
        <strong> Решение:</strong> Чёткое разделение через фреймворк (Next.js App Router, Remix).</p>
      </div>

      <div className="interview-question">
        <strong>6. Flash of unstyled/empty content</strong>
        <p>SPA показывает пустую страницу пока грузится JS. SSR без стилей — FOUC.
        <strong> Решение:</strong> SSR/SSG + critical CSS inline + modulepreload.</p>
      </div>
    </div>
  )
}
