import { useState, useOptimistic, useActionState, use, Suspense, useRef, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'
import { RenderLog, LogEntry } from '../../components/RenderTracker'

export default function React19Features() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚛️ React 19 — Новые возможности</h1>
        <p>Обзор ключевых нововведений в React 19</p>
        <a 
          href="https://react.dev/blog/2024/12/05/react-19" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React 19 Release Notes
        </a>
      </div>

      <OverviewCard />
      <UseOptimisticDemo />
      <UseActionStateDemo />
      <UseDemo />
    </div>
  )
}

function OverviewCard() {
  const overviewCode = `// ═══════════════════════════════════════════════════════════════
// ⚛️ REACT 19 — ГЛАВНЫЕ НОВОВВЕДЕНИЯ
// ═══════════════════════════════════════════════════════════════

// 1️⃣ useOptimistic — оптимистичные обновления UI
const [optimisticMessages, addOptimistic] = useOptimistic(messages);

// 2️⃣ useActionState — состояние серверных действий
const [state, action, isPending] = useActionState(serverAction, initialState);

// 3️⃣ use() — чтение промисов и контекста в рендере
const data = use(dataPromise);  // Suspense + читаем промис
const theme = use(ThemeContext); // Читаем контекст условно

// 4️⃣ Директивы 'use client' и 'use server'
'use client';  // Компонент выполняется на клиенте
'use server'; // Функция выполняется на сервере

// 5️⃣ ref как пропс (больше не нужен forwardRef!)
function Input({ ref }) {  // ref просто как пропс
  return <input ref={ref} />;
}

// 6️⃣ Мета-теги в компонентах
function Page() {
  return (
    <>
      <title>My Page</title>
      <meta name="description" content="..." />
      <link rel="stylesheet" href="..." />
    </>
  );
}

// 7️⃣ Улучшенная работа с CSS
// - Автоматическая дедупликация стилей
// - Приоритет загрузки через precedence`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Обзор React 19</h3>
        <span className="card-badge badge-success">New!</span>
      </div>

      <div className="info-box success">
        <span className="info-box-icon">🚀</span>
        <div className="info-box-content">
          <div className="info-box-title">Релиз: Декабрь 2024</div>
          <p>React 19 приносит много нововведений для работы с данными, формами и серверными компонентами.</p>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <span className="feature-icon">🔄</span>
          <h4>useOptimistic</h4>
          <p>Мгновенный отклик UI до завершения запроса</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📋</span>
          <h4>useActionState</h4>
          <p>Состояние форм и серверных действий</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">⚡</span>
          <h4>use()</h4>
          <p>Чтение промисов и контекста</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔗</span>
          <h4>ref как пропс</h4>
          <p>Больше не нужен forwardRef</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">📄</span>
          <h4>Мета-теги</h4>
          <p>title, meta, link прямо в компонентах</p>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🎨</span>
          <h4>Улучшенный CSS</h4>
          <p>Дедупликация и приоритеты стилей</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={overviewCode} language="tsx" />
      </div>
    </div>
  )
}

function UseOptimisticDemo() {
  interface Message { text: string; sending?: boolean }
  
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Привет!' },
    { text: 'Как дела?' }
  ])
  
  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], string>(
    messages,
    (currentMessages, newMessage) => [
      ...currentMessages,
      { text: newMessage, sending: true }
    ]
  )
  
  const [inputValue, setInputValue] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-8), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const sendMessage = async (text: string) => {
    addLog(`📤 Отправка: "${text}"`)
    addOptimisticMessage(text)
    addLog('⚡ Optimistic update')
    
    // Имитация сетевого запроса
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    addLog('✅ Сервер ответил')
    setMessages(prev => [...prev, { text }])
    addLog('📥 Реальное обновление')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim()) {
      sendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const useOptimisticCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 useOptimistic — Оптимистичные обновления
// ═══════════════════════════════════════════════════════════════

// Проблема: пользователь ждёт ответ сервера, UI "тормозит"
// Решение: показываем результат СРАЗУ, как будто всё уже успешно


import { useOptimistic } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  
  // useOptimistic создаёт "оптимистичную" версию состояния
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,  // Реальное состояние
    
    // Функция для создания оптимистичной версии
    (currentMessages, newMessage) => [
      ...currentMessages,
      { text: newMessage, sending: true }  // Пометка "отправляется"
    ]
  );

  async function sendMessage(text: string) {
    // 1️⃣ Сразу показываем сообщение (optimistic)
    addOptimistic(text);
    
    // 2️⃣ Отправляем на сервер
    await api.sendMessage(text);
    
    // 3️⃣ Обновляем реальное состояние
    setMessages(prev => [...prev, { text }]);
    // React автоматически уберёт "sending: true"
  }

  return (
    <ul>
      {/* Рендерим оптимистичную версию */}
      {optimisticMessages.map(msg => (
        <li style={{ opacity: msg.sending ? 0.5 : 1 }}>
          {msg.text}
          {msg.sending && ' ⏳'}
        </li>
      ))}
    </ul>
  );
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">useOptimistic</h3>
        <span className="card-badge badge-info">Хук</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🔄</span>
        <div className="info-box-content">
          <div className="info-box-title">Мгновенный отклик</div>
          <p>Показываем изменения сразу, не дожидаясь ответа сервера. 
          Если запрос провалится — откатимся к предыдущему состоянию.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="chat-container" style={{ background: 'var(--bg-code)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
            <div className="chat-messages" style={{ maxHeight: '200px', overflow: 'auto', marginBottom: '12px' }}>
              {optimisticMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className="chat-message"
                  style={{ 
                    padding: '8px 12px',
                    marginBottom: '8px',
                    background: msg.sending ? 'var(--bg-hover)' : 'var(--accent-blue)',
                    borderRadius: '8px',
                    opacity: msg.sending ? 0.7 : 1,
                    color: msg.sending ? 'var(--text-secondary)' : 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{msg.text}</span>
                  {msg.sending && <span style={{ fontSize: '0.8rem' }}>⏳ Отправка...</span>}
                </div>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
              <input
                className="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Введите сообщение..."
                style={{ flex: 1 }}
              />
              <button type="submit" className="btn btn-primary">
                Отправить
              </button>
            </form>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            💡 Сообщение появляется сразу, потом "подтверждается" через 2 секунды
          </p>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={useOptimisticCode} language="tsx" />
      </div>
    </div>
  )
}

function UseActionStateDemo() {
  interface FormState { message: string; error?: boolean }
  
  const submitAction = async (_prevState: FormState, formData: FormData): Promise<FormState> => {
    const name = formData.get('name') as string
    
    // Имитация запроса
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (name.length < 3) {
      return { message: 'Имя должно быть минимум 3 символа', error: true }
    }
    
    return { message: `Привет, ${name}! Форма отправлена.` }
  }
  
  const [state, formAction, isPending] = useActionState(submitAction, { message: '' })

  const useActionStateCode = `// ═══════════════════════════════════════════════════════════════
// 📋 useActionState — Состояние форм и действий
// ═══════════════════════════════════════════════════════════════

// Раньше назывался useFormState, переименован в React 19
// Идеален для работы с формами и Server Actions


import { useActionState } from 'react';

// Серверное действие (или обычная async функция)
async function submitForm(prevState, formData) {
  'use server';  // Выполняется на сервере!
  
  const name = formData.get('name');
  
  // Валидация
  if (name.length < 3) {
    return { error: 'Имя слишком короткое' };
  }
  
  // Сохранение в БД...
  await db.users.create({ name });
  
  return { success: true, message: \`Привет, \${name}!\` };
}

function Form() {
  // useActionState управляет состоянием действия
  const [state, formAction, isPending] = useActionState(
    submitForm,           // Действие (async функция)
    { message: '' }       // Начальное состояние
  );
  
  // state — результат последнего выполнения
  // formAction — функция для <form action={}>
  // isPending — флаг "в процессе"

  return (
    <form action={formAction}>
      <input name="name" />
      
      <button disabled={isPending}>
        {isPending ? 'Отправка...' : 'Отправить'}
      </button>
      
      {state.error && <p className="error">{state.error}</p>}
      {state.success && <p className="success">{state.message}</p>}
    </form>
  );
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">useActionState</h3>
        <span className="card-badge badge-info">Хук</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">📋</span>
        <div className="info-box-content">
          <div className="info-box-title">Управление формами</div>
          <p>Связывает форму с async действием, автоматически отслеживает isPending 
          и хранит результат последнего выполнения.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <form action={formAction} style={{ background: 'var(--bg-code)', padding: '20px', borderRadius: '12px' }}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                Введите имя (мин. 3 символа):
              </label>
              <input
                name="name"
                className="input"
                placeholder="Ваше имя..."
                style={{ width: '100%' }}
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isPending}
              style={{ width: '100%' }}
            >
              {isPending ? '⏳ Отправка...' : 'Отправить форму'}
            </button>
            
            {state.message && (
              <div 
                className={`info-box ${state.error ? 'warning' : 'success'}`} 
                style={{ marginTop: '16px' }}
              >
                <span className="info-box-icon">{state.error ? '⚠️' : '✅'}</span>
                <div className="info-box-content">
                  <p>{state.message}</p>
                </div>
              </div>
            )}
          </form>

          <div className="visual-diagram" style={{ marginTop: '16px' }}>
            <div className="diagram-row">
              <div className="diagram-box state">
                isPending: {isPending ? '⏳ true' : '✅ false'}
              </div>
              <div className="diagram-box effect">
                state.error: {state.error ? '❌' : '—'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={useActionStateCode} language="tsx" />
      </div>
    </div>
  )
}

function UseDemo() {
  const [shouldFetch, setShouldFetch] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-6), { type: 'update', message, timestamp: Date.now() - mountTime.current }])
  }, [])

  const fetchPromise = shouldFetch 
    ? new Promise<string>(resolve => {
        setTimeout(() => {
          resolve('Данные загружены с сервера! 🎉')
        }, 2000)
      })
    : null

  const useCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ use() — Новый способ работы с промисами и контекстом
// ═══════════════════════════════════════════════════════════════

import { use, Suspense } from 'react';


// ═══════════════════════════════════════════════════════════════
// 📥 ЧТЕНИЕ ПРОМИСОВ
// ═══════════════════════════════════════════════════════════════

// Раньше: useEffect + useState + isLoading + error...
// Теперь: просто use()!

function DataComponent({ dataPromise }) {
  // use() "разворачивает" промис
  // Компонент suspends пока промис не зарезолвится
  const data = use(dataPromise);
  
  return <div>{data}</div>;
}

// Оборачиваем в Suspense для показа fallback
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <DataComponent dataPromise={fetchData()} />
    </Suspense>
  );
}


// ═══════════════════════════════════════════════════════════════
// 🎯 УСЛОВНОЕ ЧТЕНИЕ КОНТЕКСТА
// ═══════════════════════════════════════════════════════════════

// useContext нельзя вызывать условно (правила хуков)
// use() — МОЖНО! 🎉

function Component({ showTheme }) {
  // ❌ Так нельзя с useContext
  // if (showTheme) { useContext(ThemeContext) }
  
  // ✅ С use() — можно!
  if (showTheme) {
    const theme = use(ThemeContext);
    return <div style={{ color: theme.color }}>Themed!</div>;
  }
  
  return <div>No theme</div>;
}


// ═══════════════════════════════════════════════════════════════
// ⚠️ ВАЖНЫЕ ОСОБЕННОСТИ use()
// ═══════════════════════════════════════════════════════════════
// • Можно вызывать в циклах и условиях (НЕ хук!)
// • Для промисов ОБЯЗАТЕЛЬНО Suspense выше по дереву
// • Промис должен быть "стабильным" (не создавать каждый рендер)`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">use()</h3>
        <span className="card-badge badge-warning">API</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">⚡</span>
        <div className="info-box-content">
          <div className="info-box-title">Не совсем хук!</div>
          <p>use() можно вызывать в циклах и условиях. Он "разворачивает" промисы 
          и позволяет читать контекст условно.</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <div style={{ flex: 1 }}>
          <div className="controls" style={{ marginBottom: '16px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => { setShouldFetch(true); addLog('▶️ Запуск загрузки') }}
              disabled={shouldFetch}
            >
              Загрузить данные
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={() => { setShouldFetch(false); setLogs([]) }}
            >
              Сбросить
            </button>
          </div>

          <div style={{ background: 'var(--bg-code)', borderRadius: '12px', padding: '20px', minHeight: '100px' }}>
            {shouldFetch ? (
              <Suspense fallback={
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--accent-blue)' }}>
                  <span className="loading-spinner">⏳</span>
                  <span>Загрузка данных... (use + Suspense)</span>
                </div>
              }>
                <DataDisplay promise={fetchPromise!} onLoad={() => addLog('✅ Данные получены')} />
              </Suspense>
            ) : (
              <div style={{ color: 'var(--text-muted)' }}>
                Нажмите кнопку чтобы загрузить данные с помощью use()
              </div>
            )}
          </div>

          <div className="comparison-grid" style={{ marginTop: '16px' }}>
            <div className="comparison-card">
              <div className="comparison-header">До use() (useEffect)</div>
              <div className="comparison-body" style={{ fontSize: '0.75rem' }}>
                <code>
                  const [data, setData] = useState(null);<br/>
                  const [loading, setLoading] = useState(false);<br/>
                  const [error, setError] = useState(null);<br/>
                  useEffect(...) // 🥱
                </code>
              </div>
            </div>
            <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
              <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
                С use() ✨
              </div>
              <div className="comparison-body" style={{ fontSize: '0.75rem' }}>
                <code>
                  const data = use(promise);<br/>
                  // Всё! 🎉
                </code>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '300px' }}>
          <RenderLog logs={logs} />
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <CodeBlock code={useCode} language="tsx" />
      </div>
    </div>
  )
}

function DataDisplay({ promise, onLoad }: { promise: Promise<string>; onLoad: () => void }) {
  const data = use(promise)
  onLoad()
  
  return (
    <div style={{ padding: '16px', background: 'var(--accent-green)', borderRadius: '8px', color: 'white' }}>
      <strong>✅ Результат:</strong> {data}
    </div>
  )
}
