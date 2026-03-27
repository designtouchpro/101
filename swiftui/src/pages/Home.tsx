import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'

/* ───────────────────────── data ───────────────────────── */

const sections = [
  { path: '/views',        icon: '🎨', title: 'Views и Modifiers',  desc: 'Text, Image, Button, TextField — базовые элементы интерфейса. Modifiers — chainable стили и поведение. Каждый View — лёгкий struct, а не класс. Аналог JSX-элементов + CSS.' },
  { path: '/layout',       icon: '📐', title: 'Layout System',      desc: 'VStack, HStack, ZStack — как Flexbox, но декларативнее. GeometryReader, Spacer, frame, padding, alignment. Как SwiftUI вычисляет размеры элементов.' },
  { path: '/components',   icon: '🧩', title: 'Компоненты',          desc: 'Переиспользуемые Views, @ViewBuilder, кастомные Property Wrappers. Декомпозиция UI аналогична React-компонентам. Composition over inheritance.' },
  { path: '/state',        icon: '📦', title: '@State',              desc: 'Аналог useState(). Локальное состояние View, автоматический ре-рендер при мутации. Хранится вне struct — SwiftUI управляет storage.' },
  { path: '/binding',      icon: '🔗', title: '@Binding',            desc: 'Двусторонняя связь parent ↔ child. Вместо «передать callback + state» — один $ синтаксис. Проекция состояния, а не копия.' },
  { path: '/observable',   icon: '👁️', title: '@Observable',         desc: 'Macro из Swift 5.9. Автотрекинг зависимостей — View рендерится только при чтении изменённых свойств. Замена ObservableObject + @Published.' },
  { path: '/environment',  icon: '🌍', title: 'Environment',         desc: '@Environment и @EnvironmentObject — React Context на стероидах. Системные значения (colorScheme, locale) и кастомные данные через дерево View.' },
  { path: '/data-flow',    icon: '🔄', title: 'Data Flow',           desc: 'Source of Truth, однонаправленный поток, @State → @Binding → @Observable → @Environment. Полная картина реактивности SwiftUI.' },
  { path: '/navigation',   icon: '🧭', title: 'Navigation',          desc: 'NavigationStack, NavigationLink, NavigationPath. Программная навигация, deep links, навигация по типам. Аналог React Router.' },
  { path: '/lists',        icon: '📋', title: 'Lists & Forms',       desc: 'List, Form, ForEach, Section. Swipe actions, searchable, pull-to-refresh, selection — всё из коробки без дополнительных библиотек.' },
  { path: '/animations',   icon: '✨', title: 'Animations',          desc: 'Implicit (.animation) и explicit (withAnimation) анимации, transitions, matchedGeometryEffect, keyframes. Не нужен Framer Motion.' },
  { path: '/gestures',     icon: '👆', title: 'Gestures',            desc: 'Tap, LongPress, Drag, Magnification, Rotation. Комбинирование жестов, GestureState, simultaneously / sequenced / exclusively.' },
  { path: '/lifecycle',    icon: '♻️', title: 'Lifecycle',           desc: '.onAppear, .onDisappear, .task, .onChange — аналоги useEffect. Жизненный цикл View: identity, lifetime, dependencies.' },
  { path: '/architecture', icon: '🏛️', title: 'MVVM',               desc: 'Model-View-ViewModel — рекомендованный Apple паттерн. @Observable модели, разделение бизнес-логики и UI, тестируемость.' },
]

const comparisonRows: [string, string, string][] = [
  ['Компонент',            'function Component()',        'struct MyView: View'],
  ['Рендер',               'return <JSX />',             'var body: some View'],
  ['Локальный state',      'useState()',                 '@State'],
  ['Props',                'props / destructuring',       'init parameters'],
  ['Двусторонний binding', 'value + onChange callback',   '@Binding + $syntax'],
  ['Глобальный store',     'Zustand / Redux / MobX',     '@Observable model'],
  ['Контекст',             'useContext()',                '@Environment'],
  ['Side effects',         'useEffect()',                '.onAppear / .task'],
  ['Async tasks',          'useEffect + AbortController', '.task { await ... }'],
  ['Memo / cache',         'useMemo(), React.memo()',     'Equatable, @State кеш'],
  ['Ref / imperative',     'useRef()',                   '@FocusState, imperative API'],
  ['Списки',               '<ul>{items.map(...)}</ul>',  'List { ForEach(...) }'],
  ['Условный рендер',      '{show && <X/>}',             'if show { X() }'],
  ['Стили',                'CSS / Tailwind / SC',        '.modifier() chains'],
  ['Роутинг',              'React Router',               'NavigationStack'],
  ['Анимации',             'Framer Motion / CSS',        'withAnimation { }'],
  ['Жесты',                'onPointerDown / библиотеки', '.gesture(DragGesture())'],
  ['Темы',                 'CSS variables / ThemeProvider', '@Environment(\\.colorScheme)'],
  ['Формы',                'React Hook Form / Formik',   'Form { Section { } }'],
  ['Доступность',          'aria-* атрибуты',            '.accessibilityLabel()'],
]

const learningPath = [
  { step: 1, icon: '🎨', label: 'Views & Modifiers',  path: '/views',        color: '#1D9BF0' },
  { step: 2, icon: '📐', label: 'Layout System',       path: '/layout',       color: '#1D9BF0' },
  { step: 3, icon: '🧩', label: 'Компоненты',          path: '/components',   color: '#1D9BF0' },
  { step: 4, icon: '📦', label: '@State',              path: '/state',        color: '#7B61FF' },
  { step: 5, icon: '🔗', label: '@Binding',            path: '/binding',      color: '#7B61FF' },
  { step: 6, icon: '👁️', label: '@Observable',         path: '/observable',   color: '#7B61FF' },
  { step: 7, icon: '🌍', label: 'Environment',         path: '/environment',  color: '#7B61FF' },
  { step: 8, icon: '🔄', label: 'Data Flow',           path: '/data-flow',    color: '#7B61FF' },
  { step: 9, icon: '🧭', label: 'Navigation',          path: '/navigation',   color: '#22c55e' },
  { step: 10, icon: '📋', label: 'Lists & Forms',      path: '/lists',        color: '#22c55e' },
  { step: 11, icon: '✨', label: 'Animations',          path: '/animations',   color: '#f59e0b' },
  { step: 12, icon: '👆', label: 'Gestures',            path: '/gestures',     color: '#f59e0b' },
  { step: 13, icon: '♻️', label: 'Lifecycle',           path: '/lifecycle',    color: '#ef4444' },
  { step: 14, icon: '🏛️', label: 'MVVM',               path: '/architecture', color: '#ef4444' },
]

const exampleApps = [
  { title: 'Todo-лист',          icon: '✅', desc: 'List, @State, @Binding, swipe-to-delete, Form для ввода',           color: '#22c55e' },
  { title: 'Погодное приложение', icon: '🌤️', desc: '@Observable модель, async .task, NavigationStack, анимации',        color: '#1D9BF0' },
  { title: 'Фитнес-трекер',      icon: '💪', desc: 'TabView, Charts, @Environment, MVVM архитектура, жесты',            color: '#f59e0b' },
  { title: 'Чат-мессенджер',     icon: '💬', desc: 'List + ScrollViewReader, @Observable, NavigationPath, matchedGeometry', color: '#7B61FF' },
  { title: 'Галерея фото',       icon: '🖼️', desc: 'LazyVGrid, async image loading, fullscreen zoom, DragGesture',      color: '#ef4444' },
  { title: 'Настройки',          icon: '⚙️', desc: 'Form, Toggle, Picker, @AppStorage, @Environment(\\.colorScheme)',     color: '#6b7280' },
]

/* ───────────────────────── styles helpers ───────────────────────── */

const thS: React.CSSProperties = {
  padding: '12px 16px', textAlign: 'left',
  borderBottom: '2px solid var(--border-color)',
  background: 'var(--bg-secondary)', fontWeight: 700, fontSize: '0.85rem',
  textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)',
}
const tdBase: React.CSSProperties = {
  padding: '10px 16px', borderBottom: '1px solid var(--border-color)',
  fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
}

/* ───────────────────────── component ───────────────────────── */

export default function Home() {
  return (
    <div className="demo-container">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <div className="home-hero" style={{ textAlign: 'center', padding: '48px 0 36px' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 16,
          background: 'linear-gradient(135deg, rgba(29,155,240,.12), rgba(123,97,255,.12))',
          borderRadius: 40, padding: '6px 20px', border: '1px solid rgba(29,155,240,.25)',
        }}>
          <span style={{ fontSize: '1.1rem' }}>⚛️</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>React Developer?</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>→</span>
          <span style={{ fontSize: '1.1rem' }}>📱</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1D9BF0' }}>SwiftUI!</span>
        </div>

        <h1 style={{ fontSize: '2.4rem', lineHeight: 1.15, marginBottom: 16 }}>
          SwiftUI 101<br />
          <span style={{ fontSize: '1.2rem', fontWeight: 400, color: 'var(--text-secondary)' }}>
            Декларативный UI от Apple — глазами React-разработчика
          </span>
        </h1>

        <p style={{ maxWidth: 620, margin: '0 auto 24px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
          Интерактивный курс из <strong style={{ color: 'var(--text-primary)' }}>14 модулей</strong>.
          Все концепции объясняются через параллели с React и TypeScript.
          Struct вместо function, @State вместо useState, .modifier() вместо CSS —
          но ментальная модель та же.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/views" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 10,
            background: 'linear-gradient(135deg, #1D9BF0, #1a8cd8)',
            color: '#fff', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
          }}>
            🚀 Начать обучение
          </Link>
          <a href="http://localhost:3215" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '10px 24px', borderRadius: 10,
            background: 'var(--bg-secondary)', color: 'var(--text-primary)',
            fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none',
            border: '1px solid var(--border-color)',
          }}>
            🐦 Сначала Swift 101
          </a>
        </div>
      </div>

      {/* ═══════════════════ QUICK STATS ═══════════════════ */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 12, marginBottom: 40,
      }}>
        {[
          { num: '14', label: 'модулей', color: '#1D9BF0' },
          { num: '60+', label: 'примеров кода', color: '#7B61FF' },
          { num: '100%', label: 'на русском', color: '#22c55e' },
          { num: '∞', label: 'параллелей с React', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', borderRadius: 12,
            border: '1px solid var(--border-color)', padding: '20px 16px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color }}>{s.num}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ═══════════════════ CODE COMPARISON ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>⚡ Один UI — два мира</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
        Одинаковый экран — карточка пользователя с аватаром и кнопкой. Слева React + TypeScript, справа SwiftUI + Swift.
        Обрати внимание: структура практически идентична.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {/* React version */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 12,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px', background: 'rgba(97,218,251,.1)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: '0.82rem', fontWeight: 700, color: '#61dafb',
          }}>
            <span>⚛️</span> React + TypeScript
          </div>
          <CodeBlock language="tsx" code={`interface Props {
  name: string
  avatar: string
}

function UserCard({ name, avatar }: Props) {
  const [followed, setFollowed] = useState(false)

  return (
    <div className="card">
      <img src={avatar} alt={name} />
      <h3>{name}</h3>
      <button onClick={() => setFollowed(!followed)}>
        {followed ? "Отписаться" : "Подписаться"}
      </button>
    </div>
  )
}`} />
        </div>

        {/* SwiftUI version */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 12,
          border: '1px solid var(--border-color)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '10px 16px', background: 'rgba(29,155,240,.1)',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: '0.82rem', fontWeight: 700, color: '#1D9BF0',
          }}>
            <span>📱</span> SwiftUI + Swift
          </div>
          <CodeBlock language="swift" code={`struct UserCard: View {
    let name: String        // props → init params
    let avatar: String

    @State private var followed = false

    var body: some View {   // render → body
        VStack {
            AsyncImage(url: URL(string: avatar))
            Text(name)
                .font(.title3)
            Button(followed ? "Отписаться" : "Подписаться") {
                followed.toggle()
            }
        }
        .padding()
    }
}`} />
        </div>
      </div>

      {/* ═══════════════════ LIFECYCLE DIAGRAM ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>🔄 Жизненный цикл: React vs SwiftUI</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
        Визуальное сравнение того, как компонент «живёт» в React и SwiftUI.
        Концепции похожи, но механизмы отличаются.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 20, marginBottom: 48,
      }}>
        {/* React lifecycle */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 14,
          border: '1px solid var(--border-color)', padding: 24, position: 'relative',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%', background: 'rgba(97,218,251,.15)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>⚛️</span>
            React Component
          </div>
          {[
            { label: 'Mount', sub: 'Первый рендер + DOM insert', color: '#22c55e' },
            { label: 'useEffect(() => {}, [])', sub: 'Side-effect после mount', color: '#22c55e' },
            { label: 'State update → Re-render', sub: 'Virtual DOM diff → patch', color: '#f59e0b' },
            { label: 'useEffect → cleanup → re-run', sub: 'При изменении deps', color: '#f59e0b' },
            { label: 'Unmount', sub: 'cleanup всех effects', color: '#ef4444' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12, marginBottom: i < arr.length - 1 ? 0 : 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', background: item.color,
                  border: '2px solid var(--bg-card)', flexShrink: 0, zIndex: 1,
                }} />
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'var(--border-color)', minHeight: 28 }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: item.color }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SwiftUI lifecycle */}
        <div style={{
          background: 'var(--bg-card)', borderRadius: 14,
          border: '1px solid var(--border-color)', padding: 24, position: 'relative',
        }}>
          <div style={{ fontWeight: 700, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%', background: 'rgba(29,155,240,.15)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
            }}>📱</span>
            SwiftUI View
          </div>
          {[
            { label: 'init → body вычисляется', sub: 'View struct создаётся, body evaluated', color: '#22c55e' },
            { label: '.onAppear { }', sub: 'View появился на экране', color: '#22c55e' },
            { label: '@State changed → body re-evaluated', sub: 'Нет Virtual DOM — diff на уровне View tree', color: '#f59e0b' },
            { label: '.onChange(of:) / .task', sub: 'Реакция на изменения, async работа', color: '#f59e0b' },
            { label: '.onDisappear { }', sub: 'View ушёл с экрана, .task отменяется', color: '#ef4444' },
          ].map((item, i, arr) => (
            <div key={i} style={{ display: 'flex', gap: 12 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 20 }}>
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', background: item.color,
                  border: '2px solid var(--bg-card)', flexShrink: 0, zIndex: 1,
                }} />
                {i < arr.length - 1 && (
                  <div style={{ width: 2, flex: 1, background: 'var(--border-color)', minHeight: 28 }} />
                )}
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 12 : 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', fontFamily: 'JetBrains Mono, monospace', color: item.color }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 2 }}>
                  {item.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════ COMPARISON TABLE ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>📊 Полное сравнение: SwiftUI vs React</h2>
      <div className="card" style={{ marginBottom: 48, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ ...thS, width: '22%' }}>Концепция</th>
                <th style={{ ...thS, width: '39%' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#61dafb' }}>⚛️</span> React
                  </span>
                </th>
                <th style={{ ...thS, width: '39%' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ color: '#1D9BF0' }}>📱</span> SwiftUI
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([concept, react, swift], i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'var(--bg-secondary)' }}>
                  <td style={{ ...tdBase, fontWeight: 600, fontFamily: 'inherit', color: 'var(--text-primary)' }}>{concept}</td>
                  <td style={{ ...tdBase, color: 'var(--text-secondary)' }}>{react}</td>
                  <td style={{ ...tdBase, color: '#1D9BF0' }}>{swift}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════ LEARNING PATH ═══════════════════ */}
      <h2 style={{ marginBottom: 8 }}>🗺️ Путь обучения</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
        Рекомендованный порядок изучения. Каждый модуль опирается на предыдущие.
        Цвета показывают тематические блоки.
      </p>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px 4px',
        alignItems: 'center', marginBottom: 48,
        padding: 24, background: 'var(--bg-card)', borderRadius: 14,
        border: '1px solid var(--border-color)',
      }}>
        {learningPath.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Link to={item.path} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 8,
              background: `${item.color}18`,
              border: `1px solid ${item.color}40`,
              textDecoration: 'none', color: 'var(--text-primary)',
              fontSize: '0.82rem', fontWeight: 600,
              transition: 'transform .15s, box-shadow .15s',
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: '50%',
                background: item.color, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 800, flexShrink: 0,
              }}>{item.step}</span>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
            {i < learningPath.length - 1 && (
              <span style={{
                color: 'var(--text-secondary)', fontSize: '1rem',
                margin: '0 2px', opacity: 0.4, userSelect: 'none',
              }}>→</span>
            )}
          </div>
        ))}
      </div>

      {/* ═══════════════════ MENTAL MODEL ═══════════════════ */}
      <div className="info-box" style={{ marginBottom: 40 }}>
        <span className="info-box-icon">🧠</span>
        <div className="info-box-content">
          <div className="info-box-title">Ментальная модель для React-разработчика</div>
          <p style={{ lineHeight: 1.7 }}>
            <strong>Компонент = struct</strong> (не функция). <strong>JSX = body</strong>. <strong>Props = init params</strong>.<br />
            <strong>useState = @State</strong>. <strong>useContext = @Environment</strong>. <strong>useEffect = .task / .onAppear</strong>.<br />
            Нет Virtual DOM — SwiftUI сам знает, какие View зависят от каких данных.<br />
            CSS не существует — вместо него цепочки <code style={{
              background: 'var(--bg-secondary)', padding: '2px 6px', borderRadius: 4,
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.82rem',
            }}>.modifier()</code>.
            Сначала изучи <a href="http://localhost:3215" style={{ color: 'var(--accent-blue)' }}>Swift 101</a> если не знаком с языком.
          </p>
        </div>
      </div>

      {/* ═══════════════════ ALL SECTIONS ═══════════════════ */}
      <h2 style={{ marginBottom: 24 }}>📚 Все 14 модулей</h2>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>🎨 Основы UI</h3>
      <div className="feature-grid" style={{ marginBottom: 32 }}>
        {sections.slice(0, 3).map(s => (
          <Link key={s.path} to={s.path} className="feature-card">
            <div className="feature-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>📦 Управление состоянием</h3>
      <div className="feature-grid" style={{ marginBottom: 32 }}>
        {sections.slice(3, 8).map(s => (
          <Link key={s.path} to={s.path} className="feature-card">
            <div className="feature-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>🧭 Навигация и списки</h3>
      <div className="feature-grid" style={{ marginBottom: 32 }}>
        {sections.slice(8, 10).map(s => (
          <Link key={s.path} to={s.path} className="feature-card">
            <div className="feature-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>✨ Анимации и жесты</h3>
      <div className="feature-grid" style={{ marginBottom: 32 }}>
        {sections.slice(10, 12).map(s => (
          <Link key={s.path} to={s.path} className="feature-card">
            <div className="feature-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      <h3 style={{ color: 'var(--text-secondary)', marginBottom: 16, fontSize: '0.95rem' }}>🏛️ Архитектура</h3>
      <div className="feature-grid" style={{ marginBottom: 48 }}>
        {sections.slice(12, 14).map(s => (
          <Link key={s.path} to={s.path} className="feature-card">
            <div className="feature-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Link>
        ))}
      </div>

      {/* ═══════════════════ DATA FLOW DIAGRAM ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>🔀 Как данные текут в SwiftUI</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
        Схема потока данных. В React ты передаёшь props вниз и callback'и наверх.
        В SwiftUI — @State владеет данными, @Binding проецирует, @Observable шарит.
      </p>

      <div style={{
        background: 'var(--bg-card)', borderRadius: 14,
        border: '1px solid var(--border-color)', padding: 28,
        marginBottom: 48, overflowX: 'auto',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, minWidth: 340 }}>
          {/* Source of Truth */}
          <div style={{
            padding: '12px 28px', borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(29,155,240,.15), rgba(123,97,255,.15))',
            border: '2px solid #1D9BF0', fontWeight: 700, textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Source of Truth</div>
            <div style={{ color: '#1D9BF0' }}>@State / @Observable</div>
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>↓</div>

          {/* Split into Binding and Environment */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                padding: '10px 22px', borderRadius: 10,
                background: 'rgba(123,97,255,.1)', border: '1.5px solid #7B61FF',
                fontWeight: 600, textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Проекция вниз</div>
                <div style={{ color: '#7B61FF', fontSize: '0.9rem' }}>@Binding</div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>↕️</div>
              <div style={{
                padding: '8px 18px', borderRadius: 8,
                background: 'rgba(123,97,255,.06)', border: '1px solid var(--border-color)',
                fontSize: '0.82rem', textAlign: 'center', color: 'var(--text-secondary)',
              }}>
                Child View<br />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#7B61FF' }}>$value</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                padding: '10px 22px', borderRadius: 10,
                background: 'rgba(34,197,94,.1)', border: '1.5px solid #22c55e',
                fontWeight: 600, textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Через дерево</div>
                <div style={{ color: '#22c55e', fontSize: '0.9rem' }}>@Environment</div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>↓</div>
              <div style={{
                padding: '8px 18px', borderRadius: 8,
                background: 'rgba(34,197,94,.06)', border: '1px solid var(--border-color)',
                fontSize: '0.82rem', textAlign: 'center', color: 'var(--text-secondary)',
              }}>
                Любой потомок<br />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#22c55e' }}>@Environment(\.key)</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{
                padding: '10px 22px', borderRadius: 10,
                background: 'rgba(245,158,11,.1)', border: '1.5px solid #f59e0b',
                fontWeight: 600, textAlign: 'center',
              }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginBottom: 2 }}>Shared model</div>
                <div style={{ color: '#f59e0b', fontSize: '0.9rem' }}>@Observable class</div>
              </div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>↓</div>
              <div style={{
                padding: '8px 18px', borderRadius: 8,
                background: 'rgba(245,158,11,.06)', border: '1px solid var(--border-color)',
                fontSize: '0.82rem', textAlign: 'center', color: 'var(--text-secondary)',
              }}>
                Auto-tracking<br />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#f59e0b' }}>model.property</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 12, padding: '8px 16px', borderRadius: 8,
            background: 'var(--bg-secondary)', fontSize: '0.78rem',
            color: 'var(--text-secondary)', textAlign: 'center', maxWidth: 440,
          }}>
            💡 В React: props ↓ + callbacks ↑. В SwiftUI: @Binding = двусторонняя проекция, @Observable = автотрекинг
          </div>
        </div>
      </div>

      {/* ═══════════════════ WHAT YOU'LL BUILD ═══════════════════ */}
      <h2 style={{ marginBottom: 8 }}>🛠️ Что можно строить после курса</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24, lineHeight: 1.6 }}>
        После прохождения всех 14 модулей ты сможешь создавать полноценные iOS-приложения.
        Вот примеры типичных проектов и какие концепции они используют.
      </p>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {exampleApps.map((app, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', borderRadius: 14,
            border: '1px solid var(--border-color)',
            overflow: 'hidden', transition: 'transform .15s',
          }}>
            <div style={{
              height: 6, background: `linear-gradient(90deg, ${app.color}, ${app.color}88)`,
            }} />
            <div style={{ padding: '20px 20px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: `${app.color}18`, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
                }}>{app.icon}</span>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>{app.title}</h3>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                {app.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════ ARCHITECTURE OVERVIEW ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>🏗️ Архитектура SwiftUI-приложения</h2>
      <div style={{
        background: 'var(--bg-card)', borderRadius: 14,
        border: '1px solid var(--border-color)', padding: 28,
        marginBottom: 48,
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
          {[
            { layer: 'View Layer', items: ['struct ContentView: View', 'var body: some View', '@State, @Binding'], color: '#1D9BF0', icon: '🖥️' },
            { layer: 'ViewModel', items: ['@Observable class VM', 'Business logic', 'Data transformation'], color: '#7B61FF', icon: '🧠' },
            { layer: 'Model Layer', items: ['struct User: Codable', 'SwiftData / CoreData', 'Networking (URLSession)'], color: '#22c55e', icon: '💾' },
          ].map((block, i, arr) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                padding: '18px 22px', borderRadius: 12, minWidth: 200,
                background: `${block.color}10`, border: `1.5px solid ${block.color}50`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
                  fontWeight: 700, color: block.color, fontSize: '0.9rem',
                }}>
                  <span>{block.icon}</span>{block.layer}
                </div>
                {block.items.map((item, j) => (
                  <div key={j} style={{
                    fontSize: '0.78rem', color: 'var(--text-secondary)',
                    fontFamily: 'JetBrains Mono, monospace', padding: '3px 0',
                  }}>{item}</div>
                ))}
              </div>
              {i < arr.length - 1 && (
                <span style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', opacity: 0.4 }}>⇄</span>
              )}
            </div>
          ))}
        </div>
        <div style={{
          marginTop: 16, padding: '10px 16px', borderRadius: 8,
          background: 'var(--bg-secondary)', fontSize: '0.8rem',
          color: 'var(--text-secondary)', textAlign: 'center',
        }}>
          В React: Component → Custom Hook → API Layer. В SwiftUI: View → @Observable ViewModel → Model + Service
        </div>
      </div>

      {/* ═══════════════════ KEY DIFFERENCES ═══════════════════ */}
      <h2 style={{ marginBottom: 20 }}>⚠️ Главные отличия от React</h2>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {[
          {
            icon: '🏗️', title: 'Struct, а не Function',
            desc: 'View — это struct с var body. Нет замыканий, нет хуков. Пересоздаётся при каждом обновлении, но @State живёт вне struct.',
            color: '#1D9BF0',
          },
          {
            icon: '🔄', title: 'Нет Virtual DOM',
            desc: 'SwiftUI не делает diff JSX-деревьев. Он знает граф зависимостей: какой View читает какой @State. Обновляет точечно.',
            color: '#7B61FF',
          },
          {
            icon: '🎨', title: 'Нет CSS — только Modifiers',
            desc: 'Вместо className или style — цепочки .font(), .foregroundColor(), .padding(). Порядок модификаторов важен!',
            color: '#22c55e',
          },
          {
            icon: '📱', title: 'Платформенные компоненты',
            desc: 'List → нативный UITableView. NavigationStack → UINavigationController. Выглядит как iOS автоматически.',
            color: '#f59e0b',
          },
          {
            icon: '🧵', title: 'Встроенный async/await',
            desc: '.task { await fetchData() } — автоматически отменяется при уходе View. Вместо useEffect + AbortController.',
            color: '#ef4444',
          },
          {
            icon: '🔐', title: 'Строгая типизация',
            desc: 'Swift строже TypeScript. Нет any, нет as. Generics, associated types, opaque types (some View). Ловит больше ошибок на этапе компиляции.',
            color: '#6b7280',
          },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--bg-card)', borderRadius: 14,
            border: '1px solid var(--border-color)', padding: '20px 22px',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 10,
                background: `${item.color}15`, color: item.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem',
              }}>{item.icon}</span>
              <h3 style={{ margin: 0, fontSize: '0.95rem' }}>{item.title}</h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════ RESOURCES ═══════════════════ */}
      <div className="info-section">
        <div className="card">
          <h3>🔗 Связанные ресурсы</h3>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🐦', label: 'Swift 101 — основы языка', href: 'http://localhost:3215', desc: 'Обязательно перед SwiftUI' },
              { icon: '📖', label: 'Apple SwiftUI Tutorials', href: 'https://developer.apple.com/tutorials/swiftui', desc: 'Официальный туториал' },
              { icon: '📚', label: 'SwiftUI Documentation', href: 'https://developer.apple.com/documentation/swiftui', desc: 'Полная документация API' },
              { icon: '🎬', label: 'WWDC Sessions', href: 'https://developer.apple.com/videos/swiftui', desc: 'Видео от Apple' },
            ].map((r, i) => (
              <a key={i} href={r.href} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10,
                background: 'var(--bg-secondary)', textDecoration: 'none',
                border: '1px solid transparent', transition: 'border-color .15s',
              }}>
                <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--accent-blue)' }}>{r.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{r.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>💡 Советы перед стартом</h3>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              'Установи Xcode 15+ (бесплатно из App Store)',
              'Используй Canvas Preview — мгновенный визуальный фидбек',
              'Создай пустой SwiftUI проект и экспериментируй',
              'Не пытайся писать React на Swift — прими новые паттерны',
              'struct + @State + body = всё что нужно для начала',
            ].map((tip, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                  background: 'rgba(34,197,94,.12)', color: '#22c55e',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.7rem', fontWeight: 800, marginTop: 1,
                }}>✓</span>
                {tip}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════ FOOTER CTA ═══════════════════ */}
      <div style={{
        marginTop: 40, padding: '32px 24px', borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(29,155,240,.08), rgba(123,97,255,.08))',
        border: '1px solid rgba(29,155,240,.2)',
        textAlign: 'center',
      }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '1.4rem' }}>Готов начать? 🚀</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20, maxWidth: 480, margin: '0 auto 20px' }}>
          Переходи к первому модулю — Views & Modifiers. Если ты знаешь React, SwiftUI покажется знакомым уже через 15 минут.
        </p>
        <Link to="/views" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 32px', borderRadius: 12,
          background: 'linear-gradient(135deg, #1D9BF0, #7B61FF)',
          color: '#fff', fontWeight: 700, fontSize: '1rem',
          textDecoration: 'none', boxShadow: '0 4px 15px rgba(29,155,240,.3)',
        }}>
          🎨 Начать с Views & Modifiers →
        </Link>
      </div>

    </div>
  )
}
