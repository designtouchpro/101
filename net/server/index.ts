import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { WebSocketServer, WebSocket } from 'ws'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { useServer } from 'graphql-ws/lib/use/ws'
import { PubSub } from 'graphql-subscriptions'
import bodyParser from 'body-parser'

const app = express()
const httpServer = createServer(app)
const PORT = 3202

// PubSub для GraphQL subscriptions
const pubsub = new PubSub()

// ============= MOCK DATA =============
interface User {
  id: number
  name: string
  email: string
  role: string
}

interface Post {
  id: number
  title: string
  content: string
  authorId: number
  createdAt: string
}

let users: User[] = [
  { id: 1, name: 'Алексей Иванов', email: 'alex@example.com', role: 'admin' },
  { id: 2, name: 'Мария Петрова', email: 'maria@example.com', role: 'user' },
  { id: 3, name: 'Дмитрий Сидоров', email: 'dmitry@example.com', role: 'moderator' },
]

let posts: Post[] = [
  { id: 1, title: 'Введение в REST API', content: 'REST - архитектурный стиль...', authorId: 1, createdAt: '2024-01-15' },
  { id: 2, title: 'GraphQL vs REST', content: 'Сравнение двух подходов...', authorId: 2, createdAt: '2024-01-16' },
  { id: 3, title: 'WebSocket для начинающих', content: 'Реальное время в веб-приложениях...', authorId: 1, createdAt: '2024-01-17' },
]

let nextUserId = 4
let nextPostId = 4

// ============= SPECIAL ROUTES FOR DEMO (NO CORS) =============
// Определяем этот маршрут ДО middleware cors(), чтобы заголовки не добавлялись.
// Это нужно для демонстрации CORS ошибки на клиенте.
app.get('/api/demo/no-cors', (_req, res) => {
  res.json({ message: 'Этот ответ не имеет CORS заголовков! Если вы видите это в браузере с другого порта - магия Proxy сработала.' })
})

// ============= REST API =============
app.use(cors())
app.use(bodyParser.json())

// Middleware для логирования и задержки (для демонстрации)
app.use('/api', (req, _res, next) => {
  console.log(`[REST] ${req.method} ${req.path}`)
  // Искусственная задержка для визуализации
  setTimeout(() => next(), 300)
})

// GET all users
app.get('/api/users', (_req, res) => {
  res.json({
    success: true,
    data: users,
    meta: { total: users.length }
  })
})

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ success: false, error: 'User not found' })
  }
  res.json({ success: true, data: user })
})

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email, role = 'user' } = req.body
  if (!name || !email) {
    return res.status(400).json({ success: false, error: 'Name and email required' })
  }
  const newUser: User = { id: nextUserId++, name, email, role }
  users.push(newUser)
  res.status(201).json({ success: true, data: newUser })
})

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id))
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'User not found' })
  }
  users[idx] = { ...users[idx], ...req.body }
  res.json({ success: true, data: users[idx] })
})

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id))
  if (idx === -1) {
    return res.status(404).json({ success: false, error: 'User not found' })
  }
  const deleted = users.splice(idx, 1)[0]
  res.json({ success: true, data: deleted })
})

// Posts endpoints
app.get('/api/posts', (_req, res) => {
  res.json({ success: true, data: posts, meta: { total: posts.length } })
})

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id))
  if (!post) {
    return res.status(404).json({ success: false, error: 'Post not found' })
  }
  const author = users.find(u => u.id === post.authorId)
  res.json({ success: true, data: { ...post, author } })
})

app.post('/api/posts', (req, res) => {
  const { title, content, authorId } = req.body
  if (!title || !content || !authorId) {
    return res.status(400).json({ success: false, error: 'Title, content and authorId required' })
  }
  const newPost: Post = {
    id: nextPostId++,
    title,
    content,
    authorId,
    createdAt: new Date().toISOString().split('T')[0]
  }
  posts.push(newPost)
  res.status(201).json({ success: true, data: newPost })
})

// ============= CACHING DEMO =============
// Endpoint для демонстрации HTTP кеширования
const cacheData: Record<string, { data: any, etag: string, timestamp: number }> = {}

app.get('/api/cache-demo', (req, res) => {
  const control = req.query.control as string || 'max-age=10'
  const ifNoneMatch = req.headers['if-none-match']
  
  // Генерируем или получаем данные
  const key = 'cache-demo'
  if (!cacheData[key]) {
    cacheData[key] = {
      data: { message: 'Cached data', timestamp: Date.now() },
      etag: `"${Math.random().toString(36).slice(2)}"`,
      timestamp: Date.now()
    }
  }
  
  // Обновляем данные каждые 30 секунд для демонстрации
  if (Date.now() - cacheData[key].timestamp > 30000) {
    cacheData[key] = {
      data: { message: 'Updated data', timestamp: Date.now() },
      etag: `"${Math.random().toString(36).slice(2)}"`,
      timestamp: Date.now()
    }
  }
  
  const currentEtag = cacheData[key].etag
  
  // Проверяем conditional request
  if (ifNoneMatch && ifNoneMatch === currentEtag) {
    res.status(304).set({
      'Cache-Control': control,
      'ETag': currentEtag
    }).end()
    return
  }
  
  res.set({
    'Cache-Control': control,
    'ETag': currentEtag,
    'Last-Modified': new Date(cacheData[key].timestamp).toUTCString()
  }).json({
    success: true,
    data: cacheData[key].data,
    cacheControl: control,
    etag: currentEtag
  })
})

// ============= GRAPHQL =============
const typeDefs = `
  type User {
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

  type Message {
    id: ID!
    text: String!
    from: String!
    timestamp: String!
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
    sendMessage(text: String!, from: String!): Message!
  }

  type Subscription {
    messageSent: Message!
    userCreated: User!
  }
`

let messageId = 1

const resolvers = {
  Query: {
    users: () => users,
    user: (_: unknown, { id }: { id: string }) => users.find(u => u.id === parseInt(id)),
    posts: () => posts,
    post: (_: unknown, { id }: { id: string }) => posts.find(p => p.id === parseInt(id)),
  },
  Mutation: {
    createUser: (_: unknown, { name, email, role = 'user' }: { name: string; email: string; role?: string }) => {
      const newUser: User = { id: nextUserId++, name, email, role }
      users.push(newUser)
      pubsub.publish('USER_CREATED', { userCreated: newUser })
      return newUser
    },
    updateUser: (_: unknown, { id, ...updates }: { id: string; name?: string; email?: string; role?: string }) => {
      const idx = users.findIndex(u => u.id === parseInt(id))
      if (idx === -1) return null
      users[idx] = { ...users[idx], ...updates }
      return users[idx]
    },
    deleteUser: (_: unknown, { id }: { id: string }) => {
      const idx = users.findIndex(u => u.id === parseInt(id))
      if (idx === -1) return null
      return users.splice(idx, 1)[0]
    },
    createPost: (_: unknown, { title, content, authorId }: { title: string; content: string; authorId: string }) => {
      const newPost: Post = {
        id: nextPostId++,
        title,
        content,
        authorId: parseInt(authorId),
        createdAt: new Date().toISOString().split('T')[0]
      }
      posts.push(newPost)
      return newPost
    },
    sendMessage: (_: unknown, { text, from }: { text: string; from: string }) => {
      const message = {
        id: String(messageId++),
        text,
        from,
        timestamp: new Date().toISOString()
      }
      pubsub.publish('MESSAGE_SENT', { messageSent: message })
      return message
    }
  },
  Subscription: {
    messageSent: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_SENT'])
    },
    userCreated: {
      subscribe: () => pubsub.asyncIterator(['USER_CREATED'])
    }
  },
  User: {
    posts: (parent: User) => posts.filter(p => p.authorId === parent.id)
  },
  Post: {
    author: (parent: Post) => users.find(u => u.id === parent.authorId)
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })

// ============= JSON-RPC =============
interface JsonRpcRequest {
  jsonrpc: string
  method: string
  params?: unknown
  id: number | string
}

interface JsonRpcResponse {
  jsonrpc: string
  result?: unknown
  error?: { code: number; message: string; data?: unknown }
  id: number | string | null
}

const rpcMethods: Record<string, (params: unknown) => unknown> = {
  'user.getAll': () => users,
  'user.getById': (params: unknown) => {
    const { id } = params as { id: number }
    return users.find(u => u.id === id) || null
  },
  'user.create': (params: unknown) => {
    const { name, email, role = 'user' } = params as { name: string; email: string; role?: string }
    const newUser: User = { id: nextUserId++, name, email, role }
    users.push(newUser)
    return newUser
  },
  'user.update': (params: unknown) => {
    const { id, ...updates } = params as { id: number; name?: string; email?: string; role?: string }
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) throw { code: -32001, message: 'User not found' }
    users[idx] = { ...users[idx], ...updates }
    return users[idx]
  },
  'user.delete': (params: unknown) => {
    const { id } = params as { id: number }
    const idx = users.findIndex(u => u.id === id)
    if (idx === -1) throw { code: -32001, message: 'User not found' }
    return users.splice(idx, 1)[0]
  },
  'math.add': (params: unknown) => {
    const { a, b } = params as { a: number; b: number }
    return a + b
  },
  'math.multiply': (params: unknown) => {
    const { a, b } = params as { a: number; b: number }
    return a * b
  },
  'system.listMethods': () => Object.keys(rpcMethods),
  'system.echo': (params: unknown) => params,
}

app.post('/rpc', (req, res) => {
  const request = req.body as JsonRpcRequest
  console.log(`[RPC] ${request.method}`)

  // Искусственная задержка
  setTimeout(() => {
    const response: JsonRpcResponse = {
      jsonrpc: '2.0',
      id: request.id
    }

    if (request.jsonrpc !== '2.0') {
      response.error = { code: -32600, message: 'Invalid Request' }
      return res.json(response)
    }

    const method = rpcMethods[request.method]
    if (!method) {
      response.error = { code: -32601, message: 'Method not found' }
      return res.json(response)
    }

    try {
      response.result = method(request.params)
    } catch (e: unknown) {
      const error = e as { code?: number; message?: string }
      response.error = {
        code: error.code || -32603,
        message: error.message || 'Internal error'
      }
    }

    res.json(response)
  }, 300)
})

// ============= WEBSOCKET =============
const wss = new WebSocketServer({ server: httpServer, path: '/ws' })

interface WSClient {
  ws: WebSocket
  id: string
  username: string
}

const wsClients: Map<string, WSClient> = new Map()

wss.on('connection', (ws) => {
  const clientId = Math.random().toString(36).substring(7)
  console.log(`[WS] Client connected: ${clientId}`)

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString())
      console.log(`[WS] Message from ${clientId}:`, message)

      switch (message.type) {
        case 'join': {
          const client: WSClient = { ws, id: clientId, username: message.username || `User-${clientId}` }
          wsClients.set(clientId, client)
          
          // Отправляем подтверждение
          ws.send(JSON.stringify({
            type: 'joined',
            clientId,
            username: client.username,
            onlineUsers: Array.from(wsClients.values()).map(c => ({ id: c.id, username: c.username }))
          }))

          // Оповещаем всех о новом пользователе
          broadcast({
            type: 'user_joined',
            user: { id: clientId, username: client.username },
            timestamp: new Date().toISOString()
          }, clientId)
          break
        }

        case 'chat': {
          const client = wsClients.get(clientId)
          broadcast({
            type: 'chat',
            from: client?.username || clientId,
            fromId: clientId,
            text: message.text,
            timestamp: new Date().toISOString()
          })
          break
        }

        case 'ping': {
          ws.send(JSON.stringify({ type: 'pong', timestamp: new Date().toISOString() }))
          break
        }

        case 'typing': {
          const client = wsClients.get(clientId)
          broadcast({
            type: 'typing',
            from: client?.username || clientId,
            fromId: clientId
          }, clientId)
          break
        }

        default:
          ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }))
      }
    } catch {
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }))
    }
  })

  ws.on('close', () => {
    const client = wsClients.get(clientId)
    wsClients.delete(clientId)
    console.log(`[WS] Client disconnected: ${clientId}`)
    
    broadcast({
      type: 'user_left',
      user: { id: clientId, username: client?.username || clientId },
      timestamp: new Date().toISOString()
    })
  })

  // Отправляем приветствие
  ws.send(JSON.stringify({
    type: 'welcome',
    message: 'Connected to WebSocket server',
    clientId,
    timestamp: new Date().toISOString()
  }))
})

function broadcast(message: object, excludeId?: string) {
  const data = JSON.stringify(message)
  wsClients.forEach((client, id) => {
    if (id !== excludeId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(data)
    }
  })
}

// GraphQL WebSocket для subscriptions
const wsServerGql = new WebSocketServer({ server: httpServer, path: '/graphql-ws' })
useServer({ schema }, wsServerGql)

// ============= STATUS CODES DEMO =============
app.get('/api/status/:code', (req, res) => {
  const code = parseInt(req.params.code)
  
  if (code === 204) {
    return res.status(204).send() // No content
  }

  res.status(code).json({
    code,
    message: `Server responded with status ${code}`,
    timestamp: new Date().toISOString()
  })
})

// ============= START SERVER =============
async function startServer() {
  const apolloServer = new ApolloServer({ schema })
  await apolloServer.start()

  app.use('/graphql', expressMiddleware(apolloServer))

  httpServer.listen(PORT, () => {
    console.log(`\n🚀 Net Playground Server running on port ${PORT}`)
    console.log(`   REST API:    http://localhost:${PORT}/api`)
    console.log(`   GraphQL:     http://localhost:${PORT}/graphql`)
    console.log(`   JSON-RPC:    http://localhost:${PORT}/rpc`)
    console.log(`   WebSocket:   ws://localhost:${PORT}/ws`)
    console.log(`   GraphQL WS:  ws://localhost:${PORT}/graphql-ws\n`)
  })
}

startServer().catch(console.error)
