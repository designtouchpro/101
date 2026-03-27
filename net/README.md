# Net & Fullstack Playground

Самый комплексный проект в наборе. Демонстрирует взаимодействие Frontend и Backend, работу с сетью и протоколами.

## Архитектура

Проект состоит из двух независимых процессов, которые запускаются параллельно через `concurrently`.

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (клиент)                                           │
│  http://localhost:3201                                      │
└──────────────┬──────────────────────────────────────────────┘
               │  Все запросы уходят на :3201
               ▼
┌─────────────────────────────────────────────────────────────┐
│  Vite Dev Server (:3201)                                    │
│                                                             │
│  • Отдаёт SPA (React)                                      │
│  • HMR для фронтенда                                       │
│  • Proxy: /api/* /graphql /rpc /ws → :3202                  │
└──────────────┬──────────────────────────────────────────────┘
               │  proxy (changeOrigin: true)
               ▼
┌─────────────────────────────────────────────────────────────┐
│  Express + Apollo + WS Server (:3202)                       │
│                                                             │
│  REST      /api/users, /api/posts, /api/cache-demo,        │
│            /api/status/:code, /api/demo/no-cors             │
│  GraphQL   /graphql  (query, mutation)                      │
│  GraphQL WS /graphql-ws  (subscriptions)                    │
│  JSON-RPC  /rpc  (POST)                                     │
│  WebSocket /ws  (chat, join, typing, ping)                  │
└─────────────────────────────────────────────────────────────┘
```

### Порты

| Процесс        | Порт | Назначение                            |
|-----------------|------|---------------------------------------|
| Vite (клиент)   | 3201 | SPA + dev proxy                       |
| Express (сервер) | 3202 | REST, GraphQL, JSON-RPC, WebSocket   |

### Роли Frontend и Backend

**Frontend** (`src/`) — React SPA. Не хранит данных. Все данные запрашивает у бэкенда через fetch / Apollo Client / WebSocket. Отвечает за визуализацию запросов и ответов.

**Backend** (`server/index.ts`) — единственный файл. Держит данные в памяти (массивы `users`, `posts`). При перезапуске данные сбрасываются. Обслуживает четыре протокола одновременно.

## Стек

- **Server**: Node.js, Express, Apollo Server (GraphQL), `ws` (WebSockets), `graphql-ws`.
- **Client**: React 19, React Router DOM 7, Apollo Client, Vite 6.

## Запуск

```bash
# Из корня playgrounds/
npm run dev --workspace=net-playground

# Или из папки net/
npm run dev            # запускает и клиент, и сервер
npm run dev:client     # только Vite (порт 3201)
npm run dev:server     # только Express (порт 3202, tsx watch)
```

## Путь запроса (Request Flow)

Ниже — пошаговый путь типичного REST-запроса при локальной разработке.

### 1. Пользователь открывает `http://localhost:3201`

Vite Dev Server отдаёт `index.html` → React монтирует SPA → React Router отрисовывает `<Home />`.

### 2. SPA выполняет `fetch('/api/users')`

Запрос попадает на **Vite Dev Server** (порт 3201). Vite видит правило proxy в `vite.config.ts`:

```ts
proxy: {
  '/api': { target: 'http://localhost:3202', changeOrigin: true }
}
```

Vite перенаправляет запрос на Express-сервер (**порт 3202**), подменяя заголовок `Host`.

### 3. Express обрабатывает запрос

```
[REST middleware] логирование → setTimeout 300ms → handler
→ res.json({ success: true, data: users, meta: { total: 3 } })
```

### 4. Ответ возвращается обратно

Express → Vite proxy → Browser. Для браузера запрос «не покидал» порт 3201 — нет проблем с CORS.

### 5. Почему proxy нужен

Без proxy браузер увидит запрос на другой origin (`localhost:3201` → `localhost:3202`). Сработает Same-Origin Policy, и запрос без CORS-заголовков будет заблокирован. Маршрут `/api/demo/no-cors` специально определён _до_ middleware `cors()`, чтобы продемонстрировать эту ошибку.

### Потоки по протоколам

| Протокол   | Транспорт       | Направление      | Сериализация | Демо-маршрут |
|------------|-----------------|------------------|--------------|--------------|
| REST       | HTTP/1.1        | Запрос → Ответ   | JSON         | `/rest`      |
| GraphQL    | HTTP POST       | Запрос → Ответ   | JSON         | `/graphql`   |
| GraphQL WS | WebSocket       | Дуплекс (sub)    | JSON         | `/graphql`   |
| JSON-RPC   | HTTP POST       | Запрос → Ответ   | JSON-RPC 2.0 | `/rpc`       |
| WebSocket  | WebSocket       | Дуплекс          | JSON         | `/websocket` |

## Маршруты приложения

### Протоколы API
| Маршрут      | Компонент       | Описание                                        |
|--------------|-----------------|------------------------------------------------|
| `/rest`      | RestDemo        | CRUD операции, HTTP-методы, статус-коды         |
| `/graphql`   | GraphQLDemo     | Query, Mutation, Subscription                   |
| `/websocket` | WebSocketDemo   | Чат, жизненный цикл соединения                 |
| `/rpc`       | RpcDemo         | JSON-RPC 2.0: вызов методов, ошибки            |

### HTTP Концепции
| Маршрут      | Компонент       | Описание                                        |
|--------------|-----------------|------------------------------------------------|
| `/security`  | SecurityDemo    | CORS, proxy-демо                                |
| `/status`    | StatusDemo      | HTTP статус-коды (1xx–5xx)                      |
| `/headers`   | HeadersDemo     | Заголовки запросов и ответов                    |
| `/caching`   | CachingDemo     | Cache-Control, ETag, conditional requests       |
| `/auth`      | AuthDemo        | Аутентификация и безопасность                   |
| `/cors`      | CorsDemo        | CORS: preflight, simple/complex requests        |
| `/patterns`  | PatternsDemo    | API Patterns: pagination, filtering, versioning |

### Безопасность & Браузер
| Маршрут         | Компонент       | Описание                                     |
|-----------------|-----------------|---------------------------------------------|
| `/cookies`      | CookiesDemo     | Cookie: SameSite, HttpOnly, Secure          |
| `/web-security` | WebSecurityDemo | CSRF, XSS, CSP                              |
| `/web-vitals`   | WebVitalsDemo   | Core Web Vitals и производительность         |

### Обучение
| Маршрут       | Компонент       | Описание                                      |
|---------------|-----------------|----------------------------------------------|
| `/comparison` | ComparisonDemo  | Сравнительная таблица всех протоколов         |

## Структура файлов

```
net/
├── server/
│   └── index.ts          # Express + Apollo + WS — единый backend
├── src/
│   ├── App.tsx            # Роутинг, навигация
│   ├── main.tsx           # Entry point
│   ├── pages/             # Демо-страницы (по одной на маршрут)
│   ├── components/        # CodeBlock, ThemeToggle, ScrollToTop
│   ├── hooks/             # Переиспользуемые хуки
│   └── styles/            # CSS стили
├── public/                # Статические файлы (logo.svg)
├── vite.config.ts         # Proxy rules, alias '@'
├── package.json           # Scripts: dev, dev:client, dev:server
└── README.md
```
