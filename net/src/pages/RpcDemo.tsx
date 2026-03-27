import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import CodeBlock from '../components/CodeBlock'

interface RpcPreset {
  name: string
  method: string
  params: object
}

export default function RpcDemo() {
  const { data, error, loading, time, fetchApi } = useApi()
  const [method, setMethod] = useState('user.getAll')
  const [params, setParams] = useState('{}')
  const [requestId, setRequestId] = useState(1)
  const [history, setHistory] = useState<Array<{
    id: number
    method: string
    success: boolean
    time: number
  }>>([])

  const presets: RpcPreset[] = [
    { name: 'Все пользователи', method: 'user.getAll', params: {} },
    { name: 'Пользователь по ID', method: 'user.getById', params: { id: 1 } },
    { name: 'Создать пользователя', method: 'user.create', params: { name: 'Новый', email: 'new@test.com' } },
    { name: 'Обновить пользователя', method: 'user.update', params: { id: 1, name: 'Обновлённый' } },
    { name: 'Удалить пользователя', method: 'user.delete', params: { id: 3 } },
    { name: 'Сложение', method: 'math.add', params: { a: 10, b: 5 } },
    { name: 'Умножение', method: 'math.multiply', params: { a: 7, b: 8 } },
    { name: 'Список методов', method: 'system.listMethods', params: {} },
    { name: 'Echo', method: 'system.echo', params: { message: 'Hello, RPC!' } },
  ]

  const executeRpc = async () => {
    const id = requestId
    setRequestId(prev => prev + 1)
    
    let parsedParams
    try {
      parsedParams = JSON.parse(params)
    } catch {
      parsedParams = {}
    }

    const result = await fetchApi('/rpc', {
      method: 'POST',
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params: parsedParams,
        id
      })
    })

    setHistory(prev => [
      { 
        id, 
        method, 
        success: !result.error && !(result.data as { error?: unknown })?.error,
        time: result.time || 0 
      },
      ...prev.slice(0, 9)
    ])
  }

  const loadPreset = (preset: RpcPreset) => {
    setMethod(preset.method)
    setParams(JSON.stringify(preset.params, null, 2))
  }

  const getRequestJson = () => {
    let parsedParams
    try {
      parsedParams = JSON.parse(params)
    } catch {
      parsedParams = {}
    }
    return JSON.stringify({
      jsonrpc: '2.0',
      method,
      params: parsedParams,
      id: requestId
    }, null, 2)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔧 JSON-RPC</h1>
        <p>
          JSON-RPC — простой протокол удалённого вызова процедур, использующий JSON для 
          кодирования вызовов. Вы вызываете методы на сервере как обычные функции.
        </p>
      </div>

      {/* Теория */}
      <section className="card theory-card">
        <h2>📚 Основные концепции</h2>
        
        <div className="concept-grid">
          <div className="concept-item">
            <h4>🔹 Структура запроса</h4>
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "method": "user.getById",
  "params": { "id": 1 },
  "id": 1
}`}
            />
            <ul className="concept-list">
              <li><code>jsonrpc</code> — версия протокола</li>
              <li><code>method</code> — имя метода</li>
              <li><code>params</code> — параметры (объект или массив)</li>
              <li><code>id</code> — идентификатор запроса</li>
            </ul>
          </div>
          
          <div className="concept-item">
            <h4>🔹 Успешный ответ</h4>
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "result": {
    "id": 1,
    "name": "Алексей",
    "email": "alex@example.com"
  },
  "id": 1
}`}
            />
          </div>
          
          <div className="concept-item">
            <h4>🔹 Ответ с ошибкой</h4>
            <CodeBlock
              language="json"
              code={`{
  "jsonrpc": "2.0",
  "error": {
    "code": -32601,
    "message": "Method not found"
  },
  "id": 1
}`}
            />
            <ul className="concept-list">
              <li><code>-32700</code> — Parse error</li>
              <li><code>-32600</code> — Invalid Request</li>
              <li><code>-32601</code> — Method not found</li>
              <li><code>-32602</code> — Invalid params</li>
              <li><code>-32603</code> — Internal error</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Интерактивный редактор */}
      <section className="card">
        <h2>🧪 RPC Playground</h2>
        
        {/* Пресеты */}
        <div className="preset-buttons">
          {presets.map((preset, i) => (
            <button
              key={i}
              className="preset-btn preset-btn-rpc"
              onClick={() => loadPreset(preset)}
            >
              {preset.name}
            </button>
          ))}
        </div>

        <div className="rpc-editor">
          <div className="rpc-input-section">
            <div className="rpc-field">
              <label>Метод:</label>
              <input
                type="text"
                value={method}
                onChange={e => setMethod(e.target.value)}
                className="rpc-method-input"
                placeholder="namespace.method"
              />
            </div>
            
            <div className="rpc-field">
              <label>Параметры (JSON):</label>
              <textarea
                value={params}
                onChange={e => setParams(e.target.value)}
                className="rpc-params-textarea"
                rows={4}
                spellCheck={false}
              />
            </div>

            <button 
              onClick={executeRpc}
              disabled={loading}
              className="rpc-execute-btn"
            >
              {loading ? '⏳ Выполнение...' : '🚀 Вызвать метод'}
            </button>
          </div>

          <div className="rpc-preview-section">
            <h4>Запрос (JSON-RPC 2.0):</h4>
            <CodeBlock code={getRequestJson()} language="json" />
          </div>
        </div>

        {/* Визуализация вызова */}
        <div className="rpc-visualization">
          <div className="rpc-flow">
            <div className="rpc-flow-item rpc-flow-client">
              <div className="rpc-flow-icon">💻</div>
              <div className="rpc-flow-label">Client</div>
              <div className="rpc-flow-detail">
                Вызов: <code>{method}()</code>
              </div>
            </div>
            
            <div className={`rpc-flow-arrow ${loading ? 'rpc-flow-arrow-active' : ''}`}>
              <span>→ JSON-RPC →</span>
            </div>
            
            <div className="rpc-flow-item rpc-flow-server">
              <div className="rpc-flow-icon">🖥️</div>
              <div className="rpc-flow-label">Server</div>
              <div className="rpc-flow-detail">
                {loading ? 'Обработка...' : 'Готов'}
              </div>
            </div>
          </div>
        </div>

        {/* Результат */}
        {(data || error) && (
          <div className="rpc-result">
            <div className="rpc-result-header">
              <h3>Ответ</h3>
              {time && <span className="time-badge">⏱️ {time}ms</span>}
              {data && !(data as { error?: unknown }).error && <span className="success-badge">✓ Успех</span>}
              {((data as { error?: unknown })?.error || error) && <span className="error-badge">✕ Ошибка</span>}
            </div>
            <CodeBlock 
              code={String(JSON.stringify(data || { error }, null, 2))} 
              language="json"
            />
          </div>
        )}
      </section>

      {/* История вызовов */}
      {history.length > 0 && (
        <section className="card">
          <h2>📜 История вызовов</h2>
          <div className="rpc-history">
            {history.map((item, i) => (
              <div key={i} className={`rpc-history-item ${item.success ? 'rpc-history-success' : 'rpc-history-error'}`}>
                <span className="rpc-history-id">#{item.id}</span>
                <span className="rpc-history-method">{item.method}</span>
                <span className={`rpc-history-status ${item.success ? 'success' : 'error'}`}>
                  {item.success ? '✓' : '✕'}
                </span>
                <span className="rpc-history-time">{item.time}ms</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Доступные методы */}
      <section className="card">
        <h2>📋 Доступные методы</h2>
        
        <div className="rpc-methods-table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Метод</th>
                <th>Параметры</th>
                <th>Описание</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>user.getAll</code></td>
                <td>—</td>
                <td>Получить всех пользователей</td>
              </tr>
              <tr>
                <td><code>user.getById</code></td>
                <td><code>{`{ id: number }`}</code></td>
                <td>Получить пользователя по ID</td>
              </tr>
              <tr>
                <td><code>user.create</code></td>
                <td><code>{`{ name, email, role? }`}</code></td>
                <td>Создать пользователя</td>
              </tr>
              <tr>
                <td><code>user.update</code></td>
                <td><code>{`{ id, name?, email?, role? }`}</code></td>
                <td>Обновить пользователя</td>
              </tr>
              <tr>
                <td><code>user.delete</code></td>
                <td><code>{`{ id: number }`}</code></td>
                <td>Удалить пользователя</td>
              </tr>
              <tr>
                <td><code>math.add</code></td>
                <td><code>{`{ a: number, b: number }`}</code></td>
                <td>Сложить два числа</td>
              </tr>
              <tr>
                <td><code>math.multiply</code></td>
                <td><code>{`{ a: number, b: number }`}</code></td>
                <td>Умножить два числа</td>
              </tr>
              <tr>
                <td><code>system.listMethods</code></td>
                <td>—</td>
                <td>Список всех доступных методов</td>
              </tr>
              <tr>
                <td><code>system.echo</code></td>
                <td><code>any</code></td>
                <td>Вернуть переданные параметры</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Примеры кода */}
      <section className="card">
        <h2>💻 Примеры кода</h2>
        
        <div className="code-examples">
          <div className="code-example">
            <h4>Базовый вызов</h4>
            <CodeBlock
              language="javascript"
              code={`async function rpcCall(method, params) {
  const response = await fetch('/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now()
    })
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data.result;
}

// Использование
const users = await rpcCall('user.getAll');
const user = await rpcCall('user.getById', { id: 1 });
const sum = await rpcCall('math.add', { a: 5, b: 3 });`}
            />
          </div>

          <div className="code-example">
            <h4>Batch запросы</h4>
            <CodeBlock
              language="javascript"
              code={`// JSON-RPC поддерживает batch запросы
const batchRequest = [
  { jsonrpc: '2.0', method: 'user.getById', params: { id: 1 }, id: 1 },
  { jsonrpc: '2.0', method: 'user.getById', params: { id: 2 }, id: 2 },
  { jsonrpc: '2.0', method: 'math.add', params: { a: 1, b: 2 }, id: 3 }
];

const response = await fetch('/rpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(batchRequest)
});

const results = await response.json();
// results - массив ответов в том же порядке`}
            />
          </div>

          <div className="code-example">
            <h4>TypeScript клиент</h4>
            <CodeBlock
              language="typescript"
              code={`interface RpcClient {
  user: {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(data: CreateUserDto): Promise<User>;
  };
  math: {
    add(a: number, b: number): Promise<number>;
  };
}

function createRpcClient(baseUrl: string): RpcClient {
  const call = async (method: string, params?: unknown) => {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
    });
    const { result, error } = await res.json();
    if (error) throw new Error(error.message);
    return result;
  };

  return {
    user: {
      getAll: () => call('user.getAll'),
      getById: (id) => call('user.getById', { id }),
      create: (data) => call('user.create', data),
    },
    math: {
      add: (a, b) => call('math.add', { a, b }),
    }
  };
}

// Использование
const client = createRpcClient('/rpc');
const users = await client.user.getAll();
const sum = await client.math.add(5, 3);`}
            />
          </div>
        </div>
      </section>

      {/* Сравнение с REST */}
      <section className="card">
        <h2>⚖️ JSON-RPC vs REST</h2>
        
        <div className="comparison-table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Аспект</th>
                <th>JSON-RPC</th>
                <th>REST</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Фокус</td>
                <td>Действия (методы)</td>
                <td>Ресурсы (существительные)</td>
              </tr>
              <tr>
                <td>Endpoint</td>
                <td>Один (<code>/rpc</code>)</td>
                <td>Много (<code>/users</code>, <code>/posts</code>)</td>
              </tr>
              <tr>
                <td>HTTP методы</td>
                <td>Только POST</td>
                <td>GET, POST, PUT, DELETE</td>
              </tr>
              <tr>
                <td>Batch запросы</td>
                <td>Встроены в протокол</td>
                <td>Не стандартизированы</td>
              </tr>
              <tr>
                <td>Кеширование</td>
                <td>Сложнее (только POST)</td>
                <td>Легко (GET кешируется)</td>
              </tr>
              <tr>
                <td>Инструменты</td>
                <td>Меньше</td>
                <td>Богатая экосистема</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
