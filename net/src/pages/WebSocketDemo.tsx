import { useState, useEffect, useRef, useCallback } from 'react'
import CodeBlock from '../components/CodeBlock'

interface Message {
  type: string
  text?: string
  from?: string
  fromId?: string
  timestamp?: string
  clientId?: string
  username?: string
  user?: { id: string; username: string }
  onlineUsers?: Array<{ id: string; username: string }>
  message?: string
}

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

export default function WebSocketDemo() {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected')
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [username, setUsername] = useState('')
  const [onlineUsers, setOnlineUsers] = useState<Array<{ id: string; username: string }>>([])
  const [myClientId, setMyClientId] = useState<string | null>(null)
  const [connectionEvents, setConnectionEvents] = useState<Array<{ type: string; time: string; detail?: string }>>([])
  
  const wsRef = useRef<WebSocket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const addConnectionEvent = useCallback((type: string, detail?: string) => {
    setConnectionEvents(prev => [
      { type, time: new Date().toLocaleTimeString(), detail },
      ...prev.slice(0, 19)
    ])
  }, [])

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return

    setStatus('connecting')
    addConnectionEvent('connecting', 'Установка соединения...')
    
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const wsUrl = `${protocol}//${window.location.hostname}:3206/ws`
    
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      setStatus('connected')
      addConnectionEvent('connected', 'WebSocket соединение установлено')
      
      // Присоединяемся с именем
      ws.send(JSON.stringify({
        type: 'join',
        username: username || `User-${Math.random().toString(36).substr(2, 5)}`
      }))
    }

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as Message
      addConnectionEvent('message', `Получено: ${message.type}`)
      
      switch (message.type) {
        case 'welcome':
          setMessages(prev => [...prev, { 
            type: 'system', 
            text: message.message,
            timestamp: message.timestamp
          }])
          break
          
        case 'joined':
          setMyClientId(message.clientId || null)
          setOnlineUsers(message.onlineUsers || [])
          setMessages(prev => [...prev, { 
            type: 'system', 
            text: `Вы подключились как ${message.username}`,
            timestamp: new Date().toISOString()
          }])
          break
          
        case 'user_joined':
          setOnlineUsers(prev => [...prev, message.user!])
          setMessages(prev => [...prev, { 
            type: 'system', 
            text: `${message.user?.username} присоединился`,
            timestamp: message.timestamp
          }])
          break
          
        case 'user_left':
          setOnlineUsers(prev => prev.filter(u => u.id !== message.user?.id))
          setMessages(prev => [...prev, { 
            type: 'system', 
            text: `${message.user?.username} вышел`,
            timestamp: message.timestamp
          }])
          break
          
        case 'chat':
          setMessages(prev => [...prev, message])
          break
          
        case 'pong':
          setMessages(prev => [...prev, { 
            type: 'system', 
            text: 'Pong received!',
            timestamp: message.timestamp
          }])
          break
          
        case 'typing':
          // Можно добавить индикатор набора
          break
      }
    }

    ws.onclose = () => {
      setStatus('disconnected')
      setMyClientId(null)
      setOnlineUsers([])
      addConnectionEvent('disconnected', 'Соединение закрыто')
    }

    ws.onerror = () => {
      setStatus('error')
      addConnectionEvent('error', 'Ошибка соединения')
    }
  }, [username, addConnectionEvent])

  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close()
      wsRef.current = null
    }
  }

  const sendMessage = () => {
    if (!inputMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    
    wsRef.current.send(JSON.stringify({
      type: 'chat',
      text: inputMessage
    }))
    
    addConnectionEvent('sent', `Отправлено: chat`)
    setInputMessage('')
  }

  const sendPing = () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ type: 'ping' }))
    addConnectionEvent('sent', 'Отправлено: ping')
  }

  // Auto-scroll messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚡ WebSocket</h1>
        <p>
          WebSocket — протокол для двунаправленной связи в реальном времени. 
          Постоянное соединение позволяет мгновенно обмениваться сообщениями 
          между клиентом и сервером.
        </p>
      </div>

      {/* Теория */}
      <section className="card theory-card">
        <h2>📚 Основные концепции</h2>
        
        <div className="concept-grid">
          <div className="concept-item">
            <h4>🔹 Handshake</h4>
            <p>Соединение начинается с HTTP Upgrade запроса, затем переходит на WebSocket протокол.</p>
            <CodeBlock
              language="http"
              code={`GET /ws HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13`}
            />
          </div>
          
          <div className="concept-item">
            <h4>🔹 Двунаправленность</h4>
            <p>И клиент, и сервер могут отправлять сообщения в любой момент, не дожидаясь запроса.</p>
          </div>
          
          <div className="concept-item">
            <h4>🔹 События</h4>
            <ul>
              <li><code>onopen</code> — соединение установлено</li>
              <li><code>onmessage</code> — получено сообщение</li>
              <li><code>onclose</code> — соединение закрыто</li>
              <li><code>onerror</code> — ошибка</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Визуализация соединения */}
      <section className="card">
        <h2>🔌 Статус соединения</h2>
        
        <div className="ws-connection-visual">
          <div className="ws-endpoint ws-client">
            <div className="ws-icon">💻</div>
            <div className="ws-label">Client</div>
          </div>
          
          <div className={`ws-line ws-line-${status}`}>
            <div className="ws-line-inner">
              {status === 'connecting' && <div className="ws-pulse"></div>}
              {status === 'connected' && (
                <>
                  <div className="ws-data-flow ws-data-flow-right">→</div>
                  <div className="ws-data-flow ws-data-flow-left">←</div>
                </>
              )}
            </div>
            <div className="ws-protocol">
              {status === 'connected' ? 'ws://' : status === 'connecting' ? 'HTTP Upgrade' : ''}
            </div>
          </div>
          
          <div className="ws-endpoint ws-server">
            <div className="ws-icon">🖥️</div>
            <div className="ws-label">Server</div>
          </div>
        </div>

        <div className="ws-status-info">
          <div className={`ws-status-badge ws-status-${status}`}>
            {status === 'disconnected' && '⚪ Отключено'}
            {status === 'connecting' && '🟡 Подключение...'}
            {status === 'connected' && '🟢 Подключено'}
            {status === 'error' && '🔴 Ошибка'}
          </div>
          {myClientId && <div className="ws-client-id">ID: {myClientId}</div>}
        </div>

        <div className="ws-controls">
          <input
            type="text"
            placeholder="Ваше имя (опционально)"
            value={username}
            onChange={e => setUsername(e.target.value)}
            disabled={status === 'connected'}
            className="ws-username-input"
          />
          
          {status !== 'connected' ? (
            <button onClick={connect} disabled={status === 'connecting'} className="ws-btn ws-btn-connect">
              {status === 'connecting' ? '⏳ Подключение...' : '🔌 Подключиться'}
            </button>
          ) : (
            <button onClick={disconnect} className="ws-btn ws-btn-disconnect">
              ❌ Отключиться
            </button>
          )}
          
          <button onClick={sendPing} disabled={status !== 'connected'} className="ws-btn ws-btn-ping">
            📡 Ping
          </button>
        </div>
      </section>

      {/* Чат */}
      <section className="card">
        <h2>💬 Чат в реальном времени</h2>
        
        <div className="ws-chat-layout">
          {/* Список пользователей */}
          <div className="ws-users-panel">
            <h4>👥 Онлайн ({onlineUsers.length})</h4>
            <ul className="ws-users-list">
              {onlineUsers.map(user => (
                <li key={user.id} className={user.id === myClientId ? 'ws-user-me' : ''}>
                  <span className="ws-user-indicator">●</span>
                  {user.username}
                  {user.id === myClientId && ' (вы)'}
                </li>
              ))}
              {onlineUsers.length === 0 && (
                <li className="ws-no-users">Никого нет</li>
              )}
            </ul>
          </div>
          
          {/* Область сообщений */}
          <div className="ws-messages-panel">
            <div className="ws-messages">
              {messages.length === 0 && (
                <div className="ws-empty-messages">
                  Подключитесь, чтобы начать общение
                </div>
              )}
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`ws-message ws-message-${msg.type} ${msg.fromId === myClientId ? 'ws-message-own' : ''}`}
                >
                  {msg.type === 'system' ? (
                    <div className="ws-message-system">
                      <span className="ws-message-icon">ℹ️</span>
                      {msg.text}
                    </div>
                  ) : (
                    <>
                      <div className="ws-message-header">
                        <span className="ws-message-from">{msg.from}</span>
                        <span className="ws-message-time">
                          {msg.timestamp && new Date(msg.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="ws-message-text">{msg.text}</div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="ws-input-area">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
                placeholder={status === 'connected' ? 'Введите сообщение...' : 'Сначала подключитесь'}
                disabled={status !== 'connected'}
                className="ws-message-input"
              />
              <button 
                onClick={sendMessage}
                disabled={status !== 'connected' || !inputMessage.trim()}
                className="ws-send-btn"
              >
                📤 Отправить
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Лог событий */}
      <section className="card">
        <h2>📋 Лог событий</h2>
        <div className="ws-events-log">
          {connectionEvents.length === 0 ? (
            <div className="ws-events-empty">События появятся после подключения</div>
          ) : (
            connectionEvents.map((event, i) => (
              <div key={i} className={`ws-event ws-event-${event.type}`}>
                <span className="ws-event-time">{event.time}</span>
                <span className={`ws-event-type ws-event-type-${event.type}`}>
                  {event.type === 'connecting' && '🟡'}
                  {event.type === 'connected' && '🟢'}
                  {event.type === 'disconnected' && '⚪'}
                  {event.type === 'error' && '🔴'}
                  {event.type === 'message' && '📥'}
                  {event.type === 'sent' && '📤'}
                  {' '}{event.type}
                </span>
                {event.detail && <span className="ws-event-detail">{event.detail}</span>}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Примеры кода */}
      <section className="card">
        <h2>💻 Примеры кода</h2>
        
        <div className="code-examples">
          <div className="code-example">
            <h4>Базовое подключение</h4>
            <CodeBlock
              language="javascript"
              code={`const ws = new WebSocket('ws://localhost:3206/ws');

ws.onopen = () => {
  console.log('Connected!');
  ws.send(JSON.stringify({ type: 'join', username: 'User1' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = () => {
  console.log('Disconnected');
};

ws.onerror = (error) => {
  console.error('Error:', error);
};`}
            />
          </div>

          <div className="code-example">
            <h4>Отправка сообщений</h4>
            <CodeBlock
              language="javascript"
              code={`// Отправка текстового сообщения
ws.send(JSON.stringify({
  type: 'chat',
  text: 'Hello, World!'
}));

// Ping для проверки соединения
ws.send(JSON.stringify({ type: 'ping' }));

// Закрытие соединения
ws.close();`}
            />
          </div>

          <div className="code-example">
            <h4>React Hook для WebSocket</h4>
            <CodeBlock
              language="typescript"
              code={`function useWebSocket(url: string) {
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('closed');
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => setStatus('open');
    ws.onclose = () => setStatus('closed');
    ws.onmessage = (e) => {
      setMessages(prev => [...prev, JSON.parse(e.data)]);
    };
  }, [url]);

  const send = useCallback((data: unknown) => {
    wsRef.current?.send(JSON.stringify(data));
  }, []);

  return { status, messages, connect, send };
}`}
            />
          </div>
        </div>
      </section>

      {/* Когда использовать */}
      <section className="card">
        <h2>🎯 Когда использовать WebSocket</h2>
        
        <div className="use-cases-grid">
          <div className="use-case use-case-good">
            <h4>✅ Подходит для</h4>
            <ul>
              <li>💬 Чаты и мессенджеры</li>
              <li>🎮 Онлайн-игры</li>
              <li>📊 Биржевые котировки</li>
              <li>🔔 Уведомления в реальном времени</li>
              <li>📍 Отслеживание геолокации</li>
              <li>👥 Коллаборативное редактирование</li>
            </ul>
          </div>
          
          <div className="use-case use-case-bad">
            <h4>❌ Не подходит для</h4>
            <ul>
              <li>📄 Обычные CRUD операции</li>
              <li>📁 Загрузка файлов</li>
              <li>🔍 Поисковые запросы</li>
              <li>📊 Редкие обновления данных</li>
              <li>🌐 SEO-критичный контент</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
