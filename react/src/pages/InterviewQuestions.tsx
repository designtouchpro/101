import { useState } from 'react'

interface InterviewItem {
  q: string
  a: string
}

const categories: { title: string; icon: string; items: InterviewItem[] }[] = [
  {
    title: 'Virtual DOM и Рендеринг',
    icon: '🎨',
    items: [
      {
        q: 'Что такое Virtual DOM? Как работает Reconciliation?',
        a: 'Virtual DOM — легковесное JS-представление реального DOM в виде дерева объектов. При изменении состояния React создаёт новое VDOM-дерево, сравнивает его со старым (diffing) и применяет минимальный набор изменений к реальному DOM. Это reconciliation. Алгоритм O(n): 1) Разные типы элементов → полная пересоздание поддерева. 2) Одинаковый тип → обновление изменённых атрибутов. 3) key помогает определить перемещённые элементы в списках.'
      },
      {
        q: 'Что такое React Fiber? Зачем был создан?',
        a: 'Fiber — новая архитектура движка React (с v16). Главная идея: рендеринг можно прерывать и возобновлять. Старый стековый reconciler блокировал main thread. Fiber unit of work — каждый узел дерева. Преимущества: 1) Приоритизация обновлений (анимации > data fetching). 2) Concurrent rendering. 3) Suspense, Transitions. 4) Возможность «сбрасывать» незавершённый рендер. Fiber node хранит ссылки: child, sibling, return (parent).'
      },
      {
        q: 'Зачем нужен key в списках? Почему index — плохой key?',
        a: 'key помогает React идентифицировать какие элементы изменились, добавились или удалились. Без key React перерисовывает все элементы списка. С key React может переиспользовать и перемещать DOM-узлы. index как key — плохо когда: 1) Список сортируется/фильтруется. 2) Элементы вставляются/удаляются не с конца. Проблемы: потеря состояния инпутов, анимации сбиваются, лишние ререндеры. Хороший key: id из данных.'
      },
      {
        q: 'Как работает batching в React 18?',
        a: 'React 18 автоматически группирует (batch) несколько setState в ОДНО обновление/ререндер. До React 18: batching работал только в event handlers. React 18: batching работает ВЕЗДЕ — в setTimeout, fetch.then(), addEventListener, promises. Это automatic batching. Для принудительного ререндера: flushSync(() => setState(...)). Пример: три setState подряд = один ререндер, а не три.'
      },
    ]
  },
  {
    title: 'Хуки',
    icon: '🪝',
    items: [
      {
        q: 'Правила хуков. Почему нельзя вызывать условно?',
        a: 'Два правила: 1) Вызывать только на верхнем уровне (не в условиях, циклах, вложенных функциях). 2) Вызывать только в React-компонентах или custom hooks. Причина: React хранит состояние хуков как связный список. Порядок вызовов должен совпадать между рендерами. Условный вызов сдвигает порядок — React не понимает, какой useState какому хуку соответствует. ESLint-плагин react-hooks/rules-of-hooks ловит нарушения.'
      },
      {
        q: 'useEffect cleanup — когда и зачем?',
        a: 'Cleanup-функция (return из useEffect) вызывается: 1) Перед каждым повторным вызовом эффекта (если зависимости изменились). 2) При размонтировании компонента. Зачем: отписка от событий (removeEventListener), очистка таймеров (clearTimeout, clearInterval), отмена запросов (AbortController), отписка от WebSocket/подписок. Без cleanup = утечки памяти и баги с устаревшими обработчиками.'
      },
      {
        q: 'useMemo vs useCallback — разница?',
        a: 'useMemo(fn, deps) — мемоизирует РЕЗУЛЬТАТ вычисления. useCallback(fn, deps) — мемоизирует САМУ ФУНКЦИЮ. useCallback(fn, deps) ≡ useMemo(() => fn, deps). Когда useMemo: тяжёлые вычисления (filter, sort, map по большому массиву). Когда useCallback: передача коллбэка в React.memo-компонент, зависимость в useEffect. Антипаттерн: оборачивать всё в useMemo/useCallback — overhead мемоизации может быть дороже пересоздания.'
      },
      {
        q: 'useState vs useReducer — когда что?',
        a: 'useState — для простого, независимого состояния (boolean, string, number). useReducer — для сложного состояния с множеством связанных обновлений. Преимущества useReducer: 1) Централизованная логика обновлений. 2) Легче тестировать (чистая функция). 3) dispatch стабилен (не меняется между рендерами = не нужен useCallback). 4) Хорошо для состояний с множеством полей (формы). Правило: если setState зависит от предыдущего state + другого state → useReducer.'
      },
      {
        q: 'Как работает useRef? Когда использовать?',
        a: 'useRef возвращает мутабельный объект {current: value}, который сохраняется между рендерами. Изменение .current НЕ вызывает ререндер. Использование: 1) Доступ к DOM-элементу (ref={inputRef}). 2) Хранение предыдущего значения (prevValue). 3) Хранение timer ID, abort controller. 4) Мутабельные переменные без ререндера. Антипаттерн: использовать ref вместо state для UI-данных — изменения не отобразятся.'
      },
    ]
  },
  {
    title: 'Паттерны и Производительность',
    icon: '⚡',
    items: [
      {
        q: 'Controlled vs Uncontrolled компоненты?',
        a: 'Controlled: значение контролируется React-state (value + onChange). Каждое изменение проходит через setState. Uncontrolled: DOM хранит значение, доступ через ref. <input ref={ref} defaultValue="...">. Controlled: полный контроль, валидация на лету, условная логика. Uncontrolled: проще для простых форм, необходим для файлов (<input type="file">). Практика: React Hook Form использует uncontrolled + ref для производительности.'
      },
      {
        q: 'Как работает React.memo? Когда использовать?',
        a: 'React.memo(Component) — HOC, который пропускает ререндер если props не изменились (shallow comparison). Когда использовать: 1) Компонент рендерится часто с теми же props. 2) Тяжёлый рендер (большие списки). 3) Компонент далеко от state (дочерний). Когда НЕ нужен: 1) Props всегда разные. 2) Компонент и так лёгкий. 3) Компонент принимает children (объект, always new). Можно передать свою функцию сравнения: React.memo(Comp, areEqual).'
      },
      {
        q: 'Context API — подводные камни производительности?',
        a: 'Проблема: любое изменение value в Provider вызывает ререндер ВСЕХ consumers, даже если конкретный consumer использует только часть данных. Решения: 1) Разделить на несколько контекстов (UserContext, ThemeContext). 2) Мемоизировать value с useMemo. 3) Разделить state и dispatch контексты. 4) Использовать state manager для частых обновлений (Zustand). Антипаттерн: один гигантский контекст на всё приложение.'
      },
      {
        q: 'Что такое Error Boundaries?',
        a: 'Error Boundary — компонент-класс, который ловит JS-ошибки в дереве потомков и показывает fallback UI. Методы: static getDerivedStateFromError(error) → обновляет state, componentDidCatch(error, info) → логирование. НЕ ловит: ошибки в обработчиках событий (нужен try/catch), async код, SSR, ошибки в самом boundary. В React 19: нет хука для error boundary, но есть react-error-boundary библиотека. Стратегия: оборачивать роуты, виджеты, опасные секции.'
      },
      {
        q: 'Higher-Order Components vs Render Props vs Hooks?',
        a: 'HOC: функция, принимает компонент → возвращает обёрнутый. withAuth(Component). Проблемы: wrapper hell, props collision, непрозрачная отладка. Render Props: компонент принимает функцию для рендера. <Mouse render={({x,y}) => ...}>. Проблемы: callback hell, лишняя вложенность. Hooks: кастомная логика в функции (useAuth, useMouse). Преимущества: нет вложенности, композиция, типизация. Вывод: Hooks — стандарт с React 16.8. HOC и Render Props — legacy-паттерны.'
      },
    ]
  },
  {
    title: 'Продвинутые концепции',
    icon: '🧠',
    items: [
      {
        q: 'Что такое Server Components? Отличие от SSR?',
        a: 'Server Components (RSC) рендерятся ТОЛЬКО на сервере, их JS не отправляется клиенту. SSR: рендерит HTML на сервере, но весь JS отправляется клиенту для гидрации. RSC: компонент остаётся серверным, 0 JS бандл. Могут читать файлы, БД, но не могут использовать state, effects, browser API. Client Components помечаются \'use client\'. RSC уменьшают bundle size и улучшают TTI.'
      },
      {
        q: 'Как работает Suspense?',
        a: 'Suspense позволяет «приостановить» рендер компонента, пока загружаются данные/код. <Suspense fallback={<Loading />}>. Работает с: React.lazy (code splitting), data fetching через RSC/use(), React 19 use(promise). Вложенные Suspense: ближайший parent Suspense показывает fallback. SuspenseList (экспериментальный): координирует порядок появления. Suspense разделяет shell (загруженный UI) и hole (ожидающий UI).'
      },
      {
        q: 'Жизненный цикл React-компонента?',
        a: 'Mounting: constructor → render → DOM update → componentDidMount (в хуках: useEffect(fn, [])). Updating: shouldComponentUpdate → render → DOM update → componentDidUpdate (в хуках: useEffect(fn, [deps])). Unmounting: componentDidMount (cleanup в useEffect). React 18 Strict Mode: монтирует → размонтирует → монтирует (для проверки cleanup). Хуки заменяют ВСЕ lifecycle-методы, кроме getDerivedStateFromError.'
      },
      {
        q: 'Что нового в React 19?',
        a: 'Основные фичи: 1) use() — новый хук для чтения промисов и контекстов (можно условно). 2) Actions — async transitions с useTransition для form submissions. 3) useActionState — управление состоянием формы. 4) useOptimistic — оптимистичные обновления. 5) ref как prop (без forwardRef). 6) Улучшенная гидрация ошибок. 7) Поддержка <title>, <meta>, <link> прямо в компонентах. 8) React Compiler — автоматическая мемоизация.'
      },
    ]
  },
]

export default function InterviewQuestions() {
  const [openCategories, setOpenCategories] = useState<Set<number>>(() => new Set([0]))

  const toggleCategory = (idx: number) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="page-container">
      <h1>🎯 Вопросы для собеседования — React</h1>
      <p className="page-description">
        Самые популярные вопросы по React на frontend-собеседованиях.
        Кликните на вопрос, чтобы увидеть ответ.
      </p>

      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="card" style={{ marginBottom: '16px' }}>
          <div 
            className="card-header" 
            style={{ cursor: 'pointer' }}
            onClick={() => toggleCategory(catIdx)}
          >
            <span className="card-title">{cat.icon} {cat.title}</span>
            <span className="card-badge">{cat.items.length} вопросов</span>
          </div>

          {openCategories.has(catIdx) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              {cat.items.map((item, i) => (
                <details key={i} className="interview-question">
                  <summary>{item.q}</summary>
                  <div style={{
                    padding: '14px 16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    borderLeft: '3px solid var(--accent-react)',
                    marginLeft: '16px',
                    marginTop: '8px'
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
