import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function TanStackQueryGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔄 TanStack Query (React Query)</h1>
        <p>Мощная библиотека для работы с серверным состоянием</p>
        <a 
          href="https://tanstack.com/query/latest" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 TanStack Query Docs
        </a>
      </div>

      <WhyTanStackQuery />
      <BasicUsage />
      <MutationsGuide />
      <CachingStrategies />
      <AdvancedPatterns />
      <InterviewQuestions />
    </div>
  )
}

function WhyTanStackQuery() {
  const badCode = `// ═══════════════════════════════════════════════════════════════
// ❌ БЕЗ TanStack Query — много бойлерплейта и проблем
// ═══════════════════════════════════════════════════════════════

function UserList() {
  // Приходится вручную управлять всеми состояниями
  const [data, setData] = useState(null)        // Данные
  const [loading, setLoading] = useState(true)  // Загрузка
  const [error, setError] = useState(null)      // Ошибка

  useEffect(() => {
    // Флаг для предотвращения обновления размонтированного компонента
    let cancelled = false
    
    setLoading(true)    // Начинаем загрузку
    
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        // Проверяем — компонент ещё существует?
        if (!cancelled) setData(data)
      })
      .catch(err => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    
    // Cleanup при размонтировании
    return () => { cancelled = true }
  }, [])

  // 😢 Проблемы этого подхода:
  // ❌ Нет кэширования — каждый раз запрос с нуля
  // ❌ Нет дедупликации — 10 компонентов = 10 запросов
  // ❌ Нет фоновых обновлений
  // ❌ Нет retry при ошибках  
  // ❌ Нет синхронизации между вкладками
  // ❌ Много boilerplate кода
}`

  const goodCode = `// ═══════════════════════════════════════════════════════════════
// ✅ С TanStack Query — всё работает из коробки!
// ═══════════════════════════════════════════════════════════════

function UserList() {
  // Один хук заменяет весь бойлерплейт выше!
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],                              // Ключ для кэша
    queryFn: () => fetch('/api/users').then(r => r.json()),
  })

  // 🎉 Что получаем бесплатно:
  // ✅ Автоматическое кэширование
  // ✅ Дедупликация параллельных запросов (1 запрос на всех)
  // ✅ Фоновые обновления (stale-while-revalidate)
  // ✅ Retry при ошибках (по умолчанию 3 раза)
  // ✅ Window focus refetching
  // ✅ Пагинация и infinite scroll
  // ✅ Оптимистичные обновления
  // ✅ DevTools для отладки
  // ✅ Синхронизация между вкладками
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Зачем TanStack Query?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Server State ≠ Client State</div>
          <p>TanStack Query решает проблемы <strong>серверного состояния</strong>: кэширование, 
          синхронизация, фоновые обновления, пагинация, оптимистичные обновления.</p>
        </div>
      </div>

      <div className="comparison-grid" style={{ marginTop: '20px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-red)' }}>
          <div className="comparison-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
            ❌ Без TanStack Query
          </div>
          <div className="comparison-body">
            <CodeBlock code={badCode} language="tsx" />
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ С TanStack Query
          </div>
          <div className="comparison-body">
            <CodeBlock code={goodCode} language="tsx" />
          </div>
        </div>
      </div>
    </div>
  )
}

function BasicUsage() {
  const [tab, setTab] = useState<'setup' | 'query' | 'options'>('setup')

  const setupCode = `// ═══════════════════════════════════════════════════════════════
// 📁 main.tsx — Настройка TanStack Query
// ═══════════════════════════════════════════════════════════════

// Импортируем необходимые компоненты
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ─────────────────────────────────────────────────────────────
// СОЗДАНИЕ QUERY CLIENT
// QueryClient — "мозг" TanStack Query, управляет всем кэшем
// ─────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  // defaultOptions — настройки по умолчанию для всех запросов
  defaultOptions: {
    queries: {
      // ═══════════════════════════════════════════════════════
      // staleTime — сколько данные считаются "свежими"
      // Пока данные fresh — НЕ рефетчим при mount/focus/reconnect
      // По умолчанию: 0 (сразу stale = устаревшие)
      // ═══════════════════════════════════════════════════════
      staleTime: 1000 * 60 * 5,           // 5 минут
      
      // ═══════════════════════════════════════════════════════
      // gcTime (раньше cacheTime) — сколько НЕАКТИВНЫЕ данные
      // хранятся в памяти перед удалением
      // "Неактивные" = нет компонентов, использующих этот query
      // ═══════════════════════════════════════════════════════
      gcTime: 1000 * 60 * 30,             // 30 минут
      
      // Сколько раз повторять при ошибке
      retry: 3,
      
      // Рефетчить когда окно получает фокус?
      refetchOnWindowFocus: true,
    },
  },
})

// ─────────────────────────────────────────────────────────────
// ПОДКЛЮЧЕНИЕ К REACT
// ─────────────────────────────────────────────────────────────
function App() {
  return (
    // QueryClientProvider — делает queryClient доступным везде
    // Аналог Redux Provider
    <QueryClientProvider client={queryClient}>
      
      <YourApp />
      
      {/* DevTools — панель для отладки (только в dev) */}
      {/* Показывает все queries, их статус, данные в кэше */}
      <ReactQueryDevtools initialIsOpen={false} />
      
    </QueryClientProvider>
  )
}`

  const queryCode = `// ═══════════════════════════════════════════════════════════════
// 📁 components/UserProfile.tsx — Использование useQuery
// ═══════════════════════════════════════════════════════════════

import { useQuery } from '@tanstack/react-query'

function UserProfile({ userId }: { userId: string }) {
  // ─────────────────────────────────────────────────────────────
  // useQuery — хук для GET-запросов (чтение данных)
  // Возвращает объект со множеством полезных свойств
  // ─────────────────────────────────────────────────────────────
  const {
    // ═══════════════════════════════════════════════════════════
    // ДАННЫЕ
    // ═══════════════════════════════════════════════════════════
    data,              // Данные ответа (T | undefined)
                       // undefined пока нет данных в кэше
    
    // ═══════════════════════════════════════════════════════════
    // СОСТОЯНИЯ ЗАГРУЗКИ
    // ═══════════════════════════════════════════════════════════
    isLoading,         // true = ПЕРВАЯ загрузка (нет данных в кэше)
                       // Показываем скелетон/спиннер
                       
    isFetching,        // true = ЛЮБАЯ загрузка (включая фоновую)
                       // isLoading ⊂ isFetching
                       // Можно показать маленький индикатор
                       
    isPending,         // Аналог isLoading (новое API v5)
    
    // ═══════════════════════════════════════════════════════════
    // СОСТОЯНИЯ РЕЗУЛЬТАТА
    // ═══════════════════════════════════════════════════════════
    isSuccess,         // true = данные успешно загружены
    isError,           // true = произошла ошибка
    error,             // Объект ошибки (Error | null)
    
    // ═══════════════════════════════════════════════════════════
    // ДОПОЛНИТЕЛЬНЫЕ СВОЙСТВА
    // ═══════════════════════════════════════════════════════════
    isStale,           // true = данные устарели (прошло staleTime)
    refetch,           // Функция для ручного рефетча
    
  } = useQuery({
    // ═══════════════════════════════════════════════════════════
    // 🔑 queryKey — УНИКАЛЬНЫЙ идентификатор запроса
    // 
    // Используется для:
    // 1. Кэширования — разные ключи = разные записи в кэше
    // 2. Дедупликации — одинаковые ключи = один запрос
    // 3. Инвалидации — invalidateQueries({ queryKey: [...] })
    // 4. Автоматического рефетча при изменении параметров
    //
    // ВАЖНО: Если userId изменится — автоматически новый запрос!
    // ═══════════════════════════════════════════════════════════
    queryKey: ['user', userId],
    //         ↑ сущность  ↑ параметр
    
    // ═══════════════════════════════════════════════════════════
    // 📡 queryFn — функция выполняющая запрос
    // ДОЛЖНА возвращать Promise с данными или кидать ошибку
    // ═══════════════════════════════════════════════════════════
    queryFn: async () => {
      const response = await fetch(\`/api/users/\${userId}\`)
      
      // ВАЖНО: fetch НЕ кидает ошибку при 4xx/5xx!
      // Нужно проверять вручную
      if (!response.ok) {
        throw new Error(\`HTTP Error: \${response.status}\`)
      }
      
      return response.json()  // Возвращаем данные
    },
  })

  // ─────────────────────────────────────────────────────────────
  // УСЛОВНЫЙ РЕНДЕРИНГ по состоянию
  // ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return <div>Загрузка...</div>        // Первая загрузка
  }
  
  if (isError) {
    return <div>Ошибка: {error.message}</div>
  }
  
  // После isLoading/isError — data гарантированно существует
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
      
      {/* Показываем индикатор фонового обновления */}
      {isFetching && <span>🔄 Обновление...</span>}
      
      {/* Кнопка ручного рефетча */}
      <button onClick={() => refetch()}>Обновить</button>
    </div>
  )
}`

  const optionsCode = `// ═══════════════════════════════════════════════════════════════
// ⚙️ Все опции useQuery с пояснениями
// ═══════════════════════════════════════════════════════════════

useQuery({
  // Обязательные
  queryKey: ['todos', { status, page }],  // Массив = автоматический рефетч
  queryFn: fetchTodos,                    // Функция запроса
  
  // ═══════════════════════════════════════════════════════════
  // ⏱️ ВРЕМЯ ЖИЗНИ ДАННЫХ
  // ═══════════════════════════════════════════════════════════
  
  // Данные "свежие" 5 минут — НЕ рефетчим
  staleTime: 1000 * 60 * 5,
  
  // Неактивные данные хранятся 30 минут в кэше
  gcTime: 1000 * 60 * 30,
  
  // ═══════════════════════════════════════════════════════════
  // 🔄 КОГДА РЕФЕТЧИТЬ (автоматически)
  // ═══════════════════════════════════════════════════════════
  
  // При монтировании компонента (если stale)
  refetchOnMount: true,          // true | false | 'always'
  
  // При фокусе на окно браузера
  refetchOnWindowFocus: true,    // Удобно для синхронизации
  
  // При восстановлении интернет-соединения
  refetchOnReconnect: true,
  
  // Polling — автоматический рефетч каждые N мс
  refetchInterval: 30000,        // Каждые 30 секунд
  refetchIntervalInBackground: false,  // Не в фоновой вкладке
  
  // ═══════════════════════════════════════════════════════════
  // 🎯 УСЛОВНЫЙ ЗАПРОС
  // ═══════════════════════════════════════════════════════════
  
  // Запрос НЕ выполнится пока enabled = false
  // Используй для зависимых запросов или ленивой загрузки
  enabled: !!userId,             // Не запускать пока нет userId
  
  // ═══════════════════════════════════════════════════════════
  // 🔄 RETRY — повторы при ошибке
  // ═══════════════════════════════════════════════════════════
  
  retry: 3,                      // Число повторов (или false)
  
  // Задержка между повторами (экспоненциальный backoff)
  retryDelay: (attemptIndex) => Math.min(
    1000 * 2 ** attemptIndex,    // 1s, 2s, 4s, 8s...
    30000                        // Максимум 30 секунд
  ),
  
  // ═══════════════════════════════════════════════════════════
  // 📊 ТРАНСФОРМАЦИЯ ДАННЫХ
  // ═══════════════════════════════════════════════════════════
  
  // select — трансформирует данные ПОСЛЕ загрузки
  // Не влияет на кэш! Кэшируются оригинальные данные
  select: (data) => data.filter(todo => !todo.completed),
  
  // ═══════════════════════════════════════════════════════════
  // 🎣 CALLBACKS (deprecated в v5, но ещё работают)
  // ═══════════════════════════════════════════════════════════
  
  // Вызывается при успешном запросе
  // onSuccess: (data) => console.log('Loaded:', data),
  
  // Вызывается при ошибке
  // onError: (error) => toast.error(error.message),
  
  // ═══════════════════════════════════════════════════════════
  // 📦 PLACEHOLDER — данные пока грузится
  // ═══════════════════════════════════════════════════════════
  
  // Начальные данные (показываются сразу, но isLoading = true)
  placeholderData: [],
  
  // Или функция — использовать предыдущие данные
  // placeholderData: (previousData) => previousData,
  
  // Или данные из другого query в кэше
  // placeholderData: () => queryClient.getQueryData(['todos']),
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Базовое использование</h3>
        <span className="card-badge">useQuery</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button className={`btn ${tab === 'setup' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('setup')}>
          1. Setup
        </button>
        <button className={`btn ${tab === 'query' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('query')}>
          2. useQuery
        </button>
        <button className={`btn ${tab === 'options' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setTab('options')}>
          3. Опции
        </button>
      </div>

      {tab === 'setup' && <CodeBlock code={setupCode} language="tsx" />}
      {tab === 'query' && <CodeBlock code={queryCode} language="tsx" />}
      {tab === 'options' && <CodeBlock code={optionsCode} language="tsx" />}
    </div>
  )
}

function MutationsGuide() {
  const mutationCode = `// ═══════════════════════════════════════════════════════════════
// 📁 components/AddTodo.tsx — useMutation для POST/PUT/DELETE
// ═══════════════════════════════════════════════════════════════

import { useMutation, useQueryClient } from '@tanstack/react-query'

// Тип для новой задачи
interface Todo {
  id?: string
  title: string
  completed: boolean
}

function AddTodo() {
  // ─────────────────────────────────────────────────────────────
  // useQueryClient — доступ к QueryClient для управления кэшем
  // Нужен для инвалидации/обновления после мутации
  // ─────────────────────────────────────────────────────────────
  const queryClient = useQueryClient()
  
  // ─────────────────────────────────────────────────────────────
  // useMutation — хук для операций изменения (POST/PUT/DELETE)
  // В отличие от useQuery — НЕ выполняется автоматически
  // ─────────────────────────────────────────────────────────────
  const mutation = useMutation({
    // ═══════════════════════════════════════════════════════════
    // mutationFn — функция выполняющая мутацию
    // Принимает аргументы из mutation.mutate(args)
    // ═══════════════════════════════════════════════════════════
    mutationFn: async (newTodo: Todo) => {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      })
      
      if (!response.ok) throw new Error('Failed to create todo')
      
      return response.json()  // Возвращаем созданную задачу
    },
    
    // ═══════════════════════════════════════════════════════════
    // 🎉 onSuccess — после УСПЕШНОЙ мутации
    // Здесь обновляем кэш чтобы UI синхронизировался с сервером
    // ═══════════════════════════════════════════════════════════
    onSuccess: (data) => {
      // Способ 1: Инвалидировать = пометить stale + refetch
      // Самый простой и безопасный способ
      queryClient.invalidateQueries({ 
        queryKey: ['todos']              // Все todos перезапросятся
      })
      
      // Способ 2: Обновить кэш напрямую (без запроса)
      // queryClient.setQueryData(['todos'], (oldTodos) => [
      //   ...oldTodos,
      //   data  // Добавляем новый todo
      // ])
    },
    
    // ═══════════════════════════════════════════════════════════
    // ❌ onError — при ОШИБКЕ мутации
    // ═══════════════════════════════════════════════════════════
    onError: (error) => {
      console.error('Mutation failed:', error)
      // Можно показать toast с ошибкой
    },
  })

  // ─────────────────────────────────────────────────────────────
  // ИСПОЛЬЗОВАНИЕ МУТАЦИИ
  // ─────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    // mutate() запускает мутацию с переданными данными
    mutation.mutate({ 
      title: 'New Todo', 
      completed: false 
    })
  }

  return (
    <div>
      <button 
        onClick={handleSubmit}
        disabled={mutation.isPending}      // Блокируем пока грузится
      >
        {mutation.isPending 
          ? 'Добавление...' 
          : 'Добавить задачу'
        }
      </button>
      
      {/* Показываем ошибку если есть */}
      {mutation.isError && (
        <p style={{ color: 'red' }}>
          Ошибка: {mutation.error.message}
        </p>
      )}
      
      {/* Показываем успех */}
      {mutation.isSuccess && (
        <p style={{ color: 'green' }}>✅ Задача создана!</p>
      )}
    </div>
  )
}`

  const optimisticCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ ОПТИМИСТИЧНОЕ ОБНОВЛЕНИЕ
// Обновляем UI сразу, до ответа сервера — для лучшего UX
// ═══════════════════════════════════════════════════════════════

const mutation = useMutation({
  mutationFn: updateTodo,
  
  // ─────────────────────────────────────────────────────────────
  // onMutate — вызывается ДО mutationFn
  // Здесь делаем оптимистичное обновление
  // ─────────────────────────────────────────────────────────────
  onMutate: async (newTodo) => {
    // 1. Отменяем исходящие запросы чтобы они не перезаписали
    //    наше оптимистичное обновление
    await queryClient.cancelQueries({ queryKey: ['todos'] })
    
    // 2. Сохраняем текущие данные для возможного отката
    const previousTodos = queryClient.getQueryData(['todos'])
    
    // 3. ОПТИМИСТИЧНО обновляем кэш
    //    UI сразу покажет изменения!
    queryClient.setQueryData(['todos'], (old: Todo[]) => 
      old.map(todo => 
        todo.id === newTodo.id ? newTodo : todo
      )
    )
    
    // 4. Возвращаем "контекст" для onError
    //    Он содержит previousTodos для отката
    return { previousTodos }
  },
  
  // ─────────────────────────────────────────────────────────────
  // onError — откатываем при ошибке
  // ─────────────────────────────────────────────────────────────
  onError: (err, newTodo, context) => {
    // Восстанавливаем предыдущие данные из контекста
    queryClient.setQueryData(['todos'], context?.previousTodos)
    
    // Можно показать уведомление об ошибке
    toast.error('Не удалось обновить задачу')
  },
  
  // ─────────────────────────────────────────────────────────────
  // onSettled — вызывается ВСЕГДА (успех или ошибка)
  // ─────────────────────────────────────────────────────────────
  onSettled: () => {
    // Инвалидируем чтобы гарантированно синхронизировать с сервером
    // Это "страховка" — данные точно будут актуальны
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Мутации (useMutation)</h3>
        <span className="card-badge">POST/PUT/DELETE</span>
      </div>

      <CodeBlock code={mutationCode} language="tsx" />

      <div className="info-box" style={{ margin: '16px 0' }}>
        <span className="info-box-icon">⚡</span>
        <div className="info-box-content">
          <div className="info-box-title">Оптимистичное обновление</div>
          <p>Обновляем UI мгновенно, не дожидаясь ответа сервера. При ошибке — откатываем.</p>
        </div>
      </div>

      <CodeBlock code={optimisticCode} language="tsx" />
    </div>
  )
}

function CachingStrategies() {
  const cacheCode = `// ═══════════════════════════════════════════════════════════════
// 🗄️ УПРАВЛЕНИЕ КЭШЕМ вручную
// ═══════════════════════════════════════════════════════════════

import { useQueryClient } from '@tanstack/react-query'

function MyComponent() {
  const queryClient = useQueryClient()
  
  // ─────────────────────────────────────────────────────────────
  // ИНВАЛИДАЦИЯ — пометить данные как stale + refetch
  // ─────────────────────────────────────────────────────────────
  
  // Инвалидировать ВСЕ queries начинающиеся с 'todos'
  queryClient.invalidateQueries({ queryKey: ['todos'] })
  
  // Инвалидировать конкретный query
  queryClient.invalidateQueries({ queryKey: ['todos', { type: 'done' }] })
  
  // Точное совпадение ключа
  queryClient.invalidateQueries({ 
    queryKey: ['todos'],
    exact: true                          // Только ['todos'], не ['todos', 1]
  })
  
  // ─────────────────────────────────────────────────────────────
  // ЧТЕНИЕ из кэша (синхронно)
  // ─────────────────────────────────────────────────────────────
  
  // Получить данные query из кэша
  const todos = queryClient.getQueryData(['todos'])
  
  // ─────────────────────────────────────────────────────────────
  // ЗАПИСЬ в кэш (напрямую, без запроса)
  // ─────────────────────────────────────────────────────────────
  
  // Установить данные в кэш
  queryClient.setQueryData(['todos'], newTodos)
  
  // Обновить существующие данные
  queryClient.setQueryData(['todos'], (oldData) => {
    return [...oldData, newTodo]
  })
  
  // ─────────────────────────────────────────────────────────────
  // УДАЛЕНИЕ из кэша
  // ─────────────────────────────────────────────────────────────
  
  // Удалить query из кэша полностью
  queryClient.removeQueries({ queryKey: ['todos'] })
  
  // ─────────────────────────────────────────────────────────────
  // PREFETCH — загрузить данные заранее
  // Полезно при hover на ссылку или перед переходом
  // ─────────────────────────────────────────────────────────────
  
  // Prefetch (возвращает Promise)
  await queryClient.prefetchQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5000,                     // Считать свежими 5 сек
  })
  
  // После prefetch — useQuery вернёт данные мгновенно!
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Стратегии кэширования</h3>
        <span className="card-badge">Cache</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📊</span>
        <div className="info-box-content">
          <div className="info-box-title">Stale-While-Revalidate</div>
          <p>TanStack Query показывает устаревшие (stale) данные из кэша пока загружает свежие в фоне.</p>
        </div>
      </div>

      <div style={{ 
        background: 'var(--bg-secondary)', 
        padding: '16px', 
        borderRadius: '8px',
        marginTop: '16px'
      }}>
        <h4 style={{ marginBottom: '12px' }}>Жизненный цикл кэша:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '120px', padding: '8px', background: 'var(--accent-green)', borderRadius: '4px', textAlign: 'center', color: 'white' }}>FRESH</div>
            <span>Данные свежие, не рефетчим (0 — staleTime)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '120px', padding: '8px', background: 'var(--accent-orange)', borderRadius: '4px', textAlign: 'center', color: 'white' }}>STALE</div>
            <span>Устарели, показываем + рефетчим в фоне</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '120px', padding: '8px', background: 'var(--accent-red)', borderRadius: '4px', textAlign: 'center', color: 'white' }}>INACTIVE</div>
            <span>Нет подписчиков, ждём gcTime</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '120px', padding: '8px', background: 'var(--text-muted)', borderRadius: '4px', textAlign: 'center', color: 'white' }}>DELETED</div>
            <span>Удалено, следующий запрос — с нуля</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={cacheCode} language="tsx" />
      </div>
    </div>
  )
}

function AdvancedPatterns() {
  const [pattern, setPattern] = useState<'dependent' | 'parallel' | 'infinite'>('dependent')

  const dependentCode = `// ═══════════════════════════════════════════════════════════════
// 🔗 ЗАВИСИМЫЕ ЗАПРОСЫ
// Запрос B зависит от результата запроса A
// ═══════════════════════════════════════════════════════════════

function UserPosts({ userId }: { userId: string }) {
  // ─────────────────────────────────────────────────────────────
  // Первый запрос — загружаем пользователя
  // ─────────────────────────────────────────────────────────────
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  })

  // ─────────────────────────────────────────────────────────────
  // Второй запрос — загружаем посты пользователя
  // ВАЖНО: enabled = false пока нет user
  // ─────────────────────────────────────────────────────────────
  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    // Ключ включает user.id — изменится при смене пользователя
    queryKey: ['posts', user?.id],
    
    // Запрос использует данные из первого query
    queryFn: () => fetchPostsByUser(user!.id),
    
    // ⭐ КЛЮЧЕВОЙ МОМЕНТ: НЕ запускать пока нет user
    // Без этого будет ошибка — user.id is undefined
    enabled: !!user?.id,
  })

  // Показываем загрузку для каждого этапа
  if (isLoadingUser) return <div>Загрузка пользователя...</div>
  if (isLoadingPosts) return <div>Загрузка постов...</div>

  return (
    <div>
      <h1>{user.name}</h1>
      {posts.map(post => <Post key={post.id} {...post} />)}
    </div>
  )
}`

  const parallelCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ ПАРАЛЛЕЛЬНЫЕ ЗАПРОСЫ
// Несколько независимых запросов одновременно
// ═══════════════════════════════════════════════════════════════

import { useQueries } from '@tanstack/react-query'

function Dashboard() {
  // ─────────────────────────────────────────────────────────────
  // useQueries — выполняет массив queries параллельно
  // Возвращает массив результатов в том же порядке
  // ─────────────────────────────────────────────────────────────
  const results = useQueries({
    queries: [
      { 
        queryKey: ['users'], 
        queryFn: fetchUsers 
      },
      { 
        queryKey: ['posts'], 
        queryFn: fetchPosts 
      },
      { 
        queryKey: ['comments'], 
        queryFn: fetchComments 
      },
    ],
  })

  // Проверяем — хотя бы один ещё грузится?
  const isLoading = results.some(result => result.isLoading)
  
  // Проверяем — есть ли ошибки?
  const hasError = results.some(result => result.isError)

  // Деструктуризация данных
  const [usersResult, postsResult, commentsResult] = results
  const users = usersResult.data
  const posts = postsResult.data
  const comments = commentsResult.data

  if (isLoading) return <div>Загрузка...</div>
  if (hasError) return <div>Произошла ошибка</div>

  return (
    <div>
      <UserList users={users} />
      <PostList posts={posts} />
      <CommentList comments={comments} />
    </div>
  )
}


// ═══════════════════════════════════════════════════════════════
// 🔄 ДИНАМИЧЕСКИЕ ПАРАЛЛЕЛЬНЫЕ ЗАПРОСЫ
// Количество запросов зависит от данных
// ═══════════════════════════════════════════════════════════════

function UserProfiles({ userIds }: { userIds: string[] }) {
  // Создаём query для каждого userId
  const userQueries = useQueries({
    queries: userIds.map(id => ({
      queryKey: ['user', id],
      queryFn: () => fetchUser(id),
      // Каждый query независим
      staleTime: 5 * 60 * 1000,
    })),
  })

  // Все загружены?
  const allLoaded = userQueries.every(q => q.isSuccess)
  
  // Собираем данные
  const users = userQueries
    .map(q => q.data)
    .filter(Boolean)  // Убираем undefined
}`

  const infiniteCode = `// ═══════════════════════════════════════════════════════════════
// ♾️ INFINITE SCROLL / ПАГИНАЦИЯ
// Загрузка данных "бесконечным" списком
// ═══════════════════════════════════════════════════════════════

import { useInfiniteQuery } from '@tanstack/react-query'

// Тип ответа API
interface PostsResponse {
  posts: Post[]
  nextPage: number | null      // null = больше страниц нет
  totalPages: number
}

function InfinitePostList() {
  // ─────────────────────────────────────────────────────────────
  // useInfiniteQuery — специальный хук для пагинации
  // Хранит ВСЕ загруженные страницы в кэше
  // ─────────────────────────────────────────────────────────────
  const {
    data,                      // { pages: [], pageParams: [] }
    fetchNextPage,             // Функция загрузки следующей страницы
    hasNextPage,               // Есть ли ещё страницы?
    isFetchingNextPage,        // Грузится ли следующая страница?
    isLoading,                 // Первая загрузка
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['posts', 'infinite'],
    
    // ─────────────────────────────────────────────────────────
    // queryFn получает pageParam — номер текущей страницы
    // ─────────────────────────────────────────────────────────
    queryFn: async ({ pageParam }): Promise<PostsResponse> => {
      const response = await fetch(\`/api/posts?page=\${pageParam}\`)
      return response.json()
    },
    
    // ─────────────────────────────────────────────────────────
    // initialPageParam — начальное значение pageParam
    // ─────────────────────────────────────────────────────────
    initialPageParam: 1,
    
    // ─────────────────────────────────────────────────────────
    // getNextPageParam — определяет pageParam для СЛЕДУЮЩЕЙ страницы
    // Возвращает undefined если страниц больше нет
    // ─────────────────────────────────────────────────────────
    getNextPageParam: (lastPage, allPages) => {
      // lastPage — данные последней загруженной страницы
      // allPages — массив всех загруженных страниц
      
      // Если API вернул nextPage — используем его
      if (lastPage.nextPage) {
        return lastPage.nextPage
      }
      
      // Или вычисляем: если есть ещё страницы
      if (allPages.length < lastPage.totalPages) {
        return allPages.length + 1
      }
      
      // undefined = страниц больше нет
      return undefined
    },
    
    // Опционально: для загрузки ПРЕДЫДУЩИХ страниц
    // getPreviousPageParam: (firstPage) => firstPage.prevPage,
  })

  // ─────────────────────────────────────────────────────────────
  // РЕНДЕРИНГ
  // data.pages — массив всех загруженных страниц
  // ─────────────────────────────────────────────────────────────
  if (isLoading) return <div>Загрузка...</div>
  if (isError) return <div>Ошибка: {error.message}</div>

  return (
    <div>
      {/* Проходим по всем страницам */}
      {data.pages.map((page, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {/* Внутри каждой страницы — массив постов */}
          {page.posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </React.Fragment>
      ))}

      {/* Кнопка "Загрузить ещё" */}
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage 
          ? 'Загрузка...' 
          : hasNextPage 
            ? 'Загрузить ещё' 
            : 'Больше постов нет'
        }
      </button>
    </div>
  )
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Продвинутые паттерны</h3>
        <span className="card-badge">Pro</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button className={`btn ${pattern === 'dependent' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPattern('dependent')}>
          🔗 Зависимые
        </button>
        <button className={`btn ${pattern === 'parallel' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPattern('parallel')}>
          ⚡ Параллельные
        </button>
        <button className={`btn ${pattern === 'infinite' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPattern('infinite')}>
          ♾️ Infinite Scroll
        </button>
      </div>

      {pattern === 'dependent' && <CodeBlock code={dependentCode} language="tsx" />}
      {pattern === 'parallel' && <CodeBlock code={parallelCode} language="tsx" />}
      {pattern === 'infinite' && <CodeBlock code={infiniteCode} language="tsx" />}
    </div>
  )
}

function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Чем отличается staleTime от gcTime (cacheTime)?",
      a: "staleTime — сколько данные считаются свежими (не рефетчим). gcTime — сколько неактивные данные хранятся в кэше. По умолчанию: staleTime=0 (сразу stale), gcTime=5 минут."
    },
    {
      q: "Что такое queryKey и зачем он нужен?",
      a: "queryKey — уникальный идентификатор запроса для кэширования. Массив вида ['entity', params]. TanStack Query использует его для: кэширования, дедупликации, инвалидации, подписки."
    },
    {
      q: "Как сделать оптимистичное обновление?",
      a: "В useMutation: onMutate — оптимистично обновить кэш (setQueryData), вернуть previousData. onError — откатить к previousData. onSettled — invalidateQueries для синхронизации с сервером."
    },
    {
      q: "Когда использовать TanStack Query vs Redux?",
      a: "TanStack Query — для серверного состояния (API данные). Redux/Zustand — для клиентского состояния (UI state, формы). Часто используют вместе: TanStack Query для API, Zustand для UI."
    },
    {
      q: "Как предзагрузить данные (prefetch)?",
      a: "queryClient.prefetchQuery({ queryKey, queryFn }) — загрузит в кэш заранее (например, при hover на ссылку). Данные будут готовы когда компонент смонтируется."
    }
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">❓ Вопросы на собеседовании</h3>
        <span className="card-badge">Interview</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((item, i) => (
          <div 
            key={i}
            style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ marginTop: '12px', color: 'var(--accent-green)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
