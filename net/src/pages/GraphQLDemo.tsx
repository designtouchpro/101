import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import CodeBlock from '../components/CodeBlock'

type QueryType = 'query' | 'mutation'

interface QueryPreset {
  name: string
  type: QueryType
  query: string
  variables?: string
}

export default function GraphQLDemo() {
  const { data, error, loading, time, fetchApi } = useApi()
  const [query, setQuery] = useState(`query GetUsers {
  users {
    id
    name
    email
    role
    posts {
      id
      title
    }
  }
}`)
  const [variables, setVariables] = useState('')
  const [activeTab, setActiveTab] = useState<'query' | 'variables'>('query')

  const presets: QueryPreset[] = [
    {
      name: 'Все пользователи',
      type: 'query',
      query: `query GetUsers {
  users {
    id
    name
    email
    role
    posts {
      id
      title
    }
  }
}`
    },
    {
      name: 'Пользователь по ID',
      type: 'query',
      query: `query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    role
    posts {
      id
      title
      content
      createdAt
    }
  }
}`,
      variables: '{\n  "id": "1"\n}'
    },
    {
      name: 'Все посты',
      type: 'query',
      query: `query GetPosts {
  posts {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
  }
}`
    },
    {
      name: 'Создать пользователя',
      type: 'mutation',
      query: `mutation CreateUser($name: String!, $email: String!, $role: String) {
  createUser(name: $name, email: $email, role: $role) {
    id
    name
    email
    role
  }
}`,
      variables: '{\n  "name": "Новый пользователь",\n  "email": "new@example.com",\n  "role": "user"\n}'
    },
    {
      name: 'Обновить пользователя',
      type: 'mutation',
      query: `mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
  }
}`,
      variables: '{\n  "id": "1",\n  "name": "Обновлённое имя"\n}'
    },
    {
      name: 'Удалить пользователя',
      type: 'mutation',
      query: `mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
  }
}`,
      variables: '{\n  "id": "3"\n}'
    }
  ]

  const executeQuery = async () => {
    const parsedVariables = variables ? JSON.parse(variables) : undefined
    
    await fetchApi('/graphql', {
      method: 'POST',
      body: JSON.stringify({
        query,
        variables: parsedVariables
      })
    })
  }

  const loadPreset = (preset: QueryPreset) => {
    setQuery(preset.query)
    setVariables(preset.variables || '')
  }

  const getQueryType = (): QueryType => {
    if (query.trim().startsWith('mutation')) return 'mutation'
    return 'query'
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>◈ GraphQL</h1>
        <p>
          GraphQL — язык запросов для API, который позволяет клиенту запрашивать 
          именно те данные, которые ему нужны. Строго типизированная схема и 
          самодокументирующийся API.
        </p>
      </div>

      {/* Теория */}
      <section className="card theory-card">
        <h2>📚 Основные концепции</h2>
        
        <div className="concept-grid">
          <div className="concept-item">
            <h4>🔹 Query</h4>
            <p>Запросы на чтение данных. Можно выбирать нужные поля и вложенные объекты.</p>
            <CodeBlock
              language="graphql"
              code={`query {
  user(id: "1") {
    name
    posts { title }
  }
}`}
            />
          </div>
          
          <div className="concept-item">
            <h4>🔹 Mutation</h4>
            <p>Операции изменения данных: создание, обновление, удаление.</p>
            <CodeBlock
              language="graphql"
              code={`mutation {
  createUser(name: "John") {
    id
    name
  }
}`}
            />
          </div>
          
          <div className="concept-item">
            <h4>🔹 Subscription</h4>
            <p>Подписки на обновления в реальном времени через WebSocket.</p>
            <CodeBlock
              language="graphql"
              code={`subscription {
  messageSent {
    text
    from
    timestamp
  }
}`}
            />
          </div>
        </div>

        <div className="graphql-benefits">
          <h3>Преимущества GraphQL</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <span className="benefit-icon">🎯</span>
              <div>
                <strong>Точные данные</strong>
                <p>Запрашиваете только нужные поля, никакого over-fetching</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔗</span>
              <div>
                <strong>Один запрос</strong>
                <p>Получаете связанные данные за один запрос вместо множества REST вызовов</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">📋</span>
              <div>
                <strong>Типизированная схема</strong>
                <p>Строгие типы, автодокументация, валидация запросов</p>
              </div>
            </div>
            <div className="benefit-item">
              <span className="benefit-icon">🔄</span>
              <div>
                <strong>Эволюция API</strong>
                <p>Добавляйте поля без версионирования, deprecation вместо удаления</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Интерактивный редактор */}
      <section className="card">
        <h2>🧪 GraphQL Playground</h2>
        
        {/* Пресеты */}
        <div className="preset-buttons">
          {presets.map((preset, i) => (
            <button
              key={i}
              className={`preset-btn preset-btn-${preset.type}`}
              onClick={() => loadPreset(preset)}
            >
              <span className={`type-badge type-${preset.type}`}>
                {preset.type === 'query' ? 'Q' : 'M'}
              </span>
              {preset.name}
            </button>
          ))}
        </div>

        <div className="graphql-editor">
          {/* Редактор запроса */}
          <div className="editor-panel">
            <div className="editor-tabs">
              <button 
                className={`editor-tab ${activeTab === 'query' ? 'active' : ''}`}
                onClick={() => setActiveTab('query')}
              >
                {getQueryType() === 'mutation' ? '✏️ Mutation' : '🔍 Query'}
              </button>
              <button 
                className={`editor-tab ${activeTab === 'variables' ? 'active' : ''}`}
                onClick={() => setActiveTab('variables')}
              >
                📦 Variables
              </button>
            </div>
            
            {activeTab === 'query' ? (
              <textarea
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="graphql-textarea"
                spellCheck={false}
              />
            ) : (
              <textarea
                value={variables}
                onChange={e => setVariables(e.target.value)}
                className="graphql-textarea"
                placeholder='{\n  "key": "value"\n}'
                spellCheck={false}
              />
            )}
            
            <button 
              onClick={executeQuery}
              disabled={loading}
              className="execute-btn"
            >
              {loading ? '⏳ Выполнение...' : '▶️ Выполнить'}
            </button>
          </div>

          {/* Результат */}
          <div className="result-panel">
            <div className="result-header">
              <span>Результат</span>
              {time && <span className="time-badge">⏱️ {time}ms</span>}
            </div>
            <div className="result-content">
              {loading && (
                <div className="loading-state">
                  <div className="spinner"></div>
                  <span>Выполнение запроса...</span>
                </div>
              )}
              {error && (
                <div className="error-state">
                  <span className="error-icon">❌</span>
                  <span>{error}</span>
                </div>
              )}
              {data && (
                <CodeBlock 
                  code={String(JSON.stringify(data, null, 2))} 
                  language="json"
                />
              )}
              {!loading && !error && !data && (
                <div className="empty-state">
                  <span>👆</span>
                  <span>Выберите пресет или напишите запрос и нажмите "Выполнить"</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Визуализация запроса */}
      <section className="card">
        <h2>📊 Как работает GraphQL</h2>
        
        <div className="graphql-flow">
          <div className="flow-diagram">
            <div className="flow-step-visual">
              <div className="flow-box flow-box-client">
                <span className="flow-box-icon">💻</span>
                <span className="flow-box-label">Client</span>
                <div className="flow-box-detail">
                  Формирует GraphQL запрос
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-box flow-box-server">
                <span className="flow-box-icon">🖥️</span>
                <span className="flow-box-label">GraphQL Server</span>
                <div className="flow-box-detail">
                  Парсинг → Валидация → Выполнение
                </div>
              </div>
              <div className="flow-arrow">→</div>
              <div className="flow-box flow-box-resolvers">
                <span className="flow-box-icon">⚙️</span>
                <span className="flow-box-label">Resolvers</span>
                <div className="flow-box-detail">
                  Получение данных из источников
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Сравнение с REST */}
      <section className="card">
        <h2>⚖️ GraphQL vs REST</h2>
        
        <div className="comparison-example">
          <div className="comparison-item">
            <h4>REST: Множественные запросы</h4>
            <CodeBlock
              language="javascript"
              code={`// Получить пользователя с его постами

// Запрос 1: Получить пользователя
GET /api/users/1
// Ответ: { id, name, email }

// Запрос 2: Получить посты пользователя  
GET /api/users/1/posts
// Ответ: [{ id, title, content }, ...]

// Запрос 3: Для каждого поста - комментарии
GET /api/posts/1/comments
GET /api/posts/2/comments
// ...

// Итого: N+2 запросов (N+1 problem)`}
            />
          </div>
          
          <div className="comparison-item comparison-item-highlight">
            <h4>GraphQL: Один запрос</h4>
            <CodeBlock
              language="graphql"
              code={`# Получить всё за один запрос

query {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
      content
      comments {
        id
        text
        author { name }
      }
    }
  }
}

# Итого: 1 запрос, точные данные`}
            />
          </div>
        </div>
      </section>

      {/* Схема */}
      <section className="card">
        <h2>📋 Схема API</h2>
        <CodeBlock
          language="graphql"
          code={`type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!, role: String): User!
  updateUser(id: ID!, name: String, email: String, role: String): User
  deleteUser(id: ID!): User
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

type Subscription {
  messageSent: Message!
  userCreated: User!
}`}
        />
      </section>
    </div>
  )
}
