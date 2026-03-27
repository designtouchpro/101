# Frontend Learning Playgrounds

Коллекция интерактивных песочниц для изучения современных концепций фронтенд-разработки. Всё собрано на **Vite**.

## 🚀 Запуск

### Установка зависимостей (один раз)
Используется **npm workspaces** — один общий `node_modules` вместо 16 отдельных копий.

```bash
cd playgrounds/
npm install
```

### Запуск всех проектов
```bash
./start.sh
```
Это запустит все проекты параллельно на разных портах.

### Запуск одного проекта
```bash
./start.sh html        # через скрипт
npm run dev:html       # через npm workspace
```

## GitHub Pages

Монорепо готово к публикации на GitHub Pages из одного репозитория.

### Как это работает

- Корневой индекс публикуется в корень Pages-сайта.
- Каждый playground собирается в собственную подпапку: `html/`, `react/`, `vue/` и т.д.
- Для GitHub Pages используется отдельный build-режим с корректным `base` для каждого workspace.
- SPA-маршруты на Pages работают через hash routing, чтобы не упираться в отсутствие server-side rewrites.

### Локальная сборка для GitHub Pages

```bash
cd playgrounds
npm install
npm run build:pages
```

Готовый артефакт появится в `playgrounds/dist/`:

- `playgrounds/dist/index.html` — корневой каталог курсов
- `playgrounds/dist/html/` — HTML playground
- `playgrounds/dist/react/` — React playground
- и так далее по workspace-папкам

По умолчанию имя репозитория берётся из GitHub Actions. Для локальной проверки можно передать его вручную:

```bash
cd playgrounds
PAGES_REPO_NAME=my-repo npm run build:pages
```

### GitHub Actions

Если `playgrounds` лежит в корне репозитория, используй `playgrounds/.github/workflows/deploy.yml`.

Если репозиторий корневой шире, чем одна папка `playgrounds`, используй root-workflow: `.github/workflows/deploy-playgrounds-pages.yml`.

Что остаётся сделать в GitHub:

1. Запушить репозиторий на GitHub.
2. Открыть Settings → Pages.
3. Выбрать Source: GitHub Actions.
4. Запушить изменения в `main` или запустить workflow вручную.

### Ограничение по Net playground

`net` публикуется на GitHub Pages только как статический frontend-клиент. REST, GraphQL, WebSocket и RPC-демо требуют отдельного backend-хоста. Если нужен полностью рабочий `net`, вынеси сервер на отдельный origin и прокинь клиенту адрес API через env/config.

## 📦 Проекты

| Папка | Порт | Стек | Описание |
|-------|------|------|----------|
| **[html](./html)** | `3211` | React + TS | **HTML 101**. Современный HTML5+: input types, dialog, popover, meta tags, script loading, web components. |
| **[js](./js)** | `3212` | React + TS | **JS 101**. Визуализатор Event Loop. Интерактивный учебник по асинхронности (Call Stack, Web API, Queues). |
| **[css](./css)** | `3213` | React + TS | **CSS 101**. Современный CSS для разработчика из 2012. Flexbox, Grid, :has(), Container Queries, oklch(). |
| **[react](./react)** | `3231` | React + TS | **React 101**. Примеры хуков, рендеринга и роутинга. |
| **[vue](./vue)** | `3232` | Vue 3 + TS | **Vue 101**. Pinia, Vue Router, Composition API. |
| **[net](./net)** | `3201` | Node, React | **Net 101**. Express, GraphQL, WebSockets, CORS, HTTP concepts. |
| **[algo](./algo)** | `3241` | React + TS | **Algo 101**. Алгоритмы и структуры данных. |
| **[patterns](./patterns)** | `3242` | React + TS | **Patterns 101**. Design patterns и архитектурные паттерны. |
| **[swift](./swift)** | `3215` | Swift | **Swift 101**. Основы языка Swift. |
| **[swiftui](./swiftui)** | `3235` | SwiftUI | **SwiftUI 101**. Декларативный UI framework для Apple. |
| **[teamlead](./teamlead)** | `3251` | React + TS | **TeamLead 101**. Best practices для управления командой. |
| **[product](./product)** | `3252` | React + TS | **Product 101**. Основы product management. |
| **[project](./project)** | `3253` | React + TS | **Project 101**. Project management tools и методологии. |
| **[marketing](./marketing)** | `3254` | React + TS | **Marketing 101**. Digital marketing и growth. |
| **[qa](./qa)** | `3255` | React + TS | **QA 101**. Testing, test automation, quality assurance. |

## 🛠 Общие особенности
- **npm workspaces**: Один `node_modules` на все проекты (экономия ~400 МБ).
- **TypeScript**: Везде строгий режим.
- **Vite**: Быстрая сборка.
- **Alias `@`**: Настроен во всех проектах для удобного импорта из `src/`.
