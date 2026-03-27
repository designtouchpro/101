# React Playground

Интерактивная площадка для изучения React 19 — от основ JSX и хуков до Server Components, тестирования и продвинутых паттернов.

## 🎯 Чему учит

- **Основы**: JSX, компоненты, стилизация
- **Хуки**: useState, useEffect, useCallback, useMemo, useRef, useContext + обзор всех хуков
- **State Management**: Zustand, Redux Toolkit — когда что
- **Data Fetching**: TanStack Query (кеш, stale time, mutations)
- **Формы**: controlled/uncontrolled, React Hook Form, Zod
- **Паттерны**: Compound Components, Render Props, HOC
- **Performance**: Code Splitting, React.lazy, Suspense
- **Концепции**: рендеринг, жизненный цикл, batching, Server Components
- **React 19**: новые хуки (use, useActionState, useOptimistic), React Compiler
- **Продвинутое**: useReducer, useImperativeHandle, useSyncExternalStore, Portals, FocusTrap

## 📋 Пререквизиты

- [JS Playground](../js/) — замыкания, this, async/await, ES6+
- [HTML Playground](../html/) — семантика, формы, доступность
- Базовое понимание npm/node

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень | Статус API |
|---|--------|---------|---------|------------|
| 1 | Главная | `/` | 🟢 Базовый | Stable |
| 2 | JSX | `/basics/jsx` | 🟢 Базовый | Stable |
| 3 | Стилизация | `/basics/styling` | 🟢 Базовый | Stable |
| 4 | useState | `/hooks/usestate` | 🟢 Базовый | Stable |
| 5 | useEffect | `/hooks/useeffect` | 🟢 Базовый | Stable |
| 6 | useRef | `/hooks/useref` | 🟢 Базовый | Stable |
| 7 | useCallback | `/hooks/usecallback` | 🟡 Средний | Stable |
| 8 | useMemo | `/hooks/usememo` | 🟡 Средний | Stable |
| 9 | useContext | `/hooks/usecontext` | 🟡 Средний | Stable |
| 10 | Обзор хуков | `/hooks/overview` | 🟡 Средний | Stable |
| 11 | Формы | `/forms/react-forms` | 🟡 Средний | Stable |
| 12 | Паттерны компонентов | `/patterns/components` | 🟡 Средний | Stable |
| 13 | Рендеринг | `/concepts/rendering` | 🟡 Средний | Stable |
| 14 | Жизненный цикл | `/concepts/lifecycle` | 🟡 Средний | Stable |
| 15 | Batching | `/concepts/batching` | 🟡 Средний | Stable |
| 16 | Zustand | `/state/zustand` | 🟡 Средний | Stable (3rd party) |
| 17 | Redux Toolkit | `/state/redux` | 🟡 Средний | Stable (3rd party) |
| 18 | TanStack Query | `/data/tanstack-query` | 🟡 Средний | Stable (3rd party) |
| 19 | Code Splitting | `/performance/code-splitting` | 🔴 Продвинутый | Stable |
| 20 | Server Components | `/concepts/server-components` | 🔴 Продвинутый | 🧪 Experimental |
| 21 | React 19 | `/versions/react19` | 🔴 Продвинутый | Stable (New) |
| 22 | React Compiler | `/versions/react-compiler` | 🔴 Продвинутый | 🧪 Experimental |
| 23 | Тестирование | `/testing/guide` | 🔴 Продвинутый | Stable |
| 24 | Routing & SSR | `/routing/ssr` | 🔴 Продвинутый | Stable |
| 25 | Git Flow | `/devops/git-flow` | 🟡 Средний | — |
| 26 | Advanced Hooks & Portals | `/advanced/hooks-portals` | 🔴 Продвинутый | Stable |
| 27 | Вопросы | `/interview` | 🎤 Собеседование | — |

### Условные обозначения
- 🟢 **Базовый** — фундамент React, подходит для начинающих
- 🟡 **Средний** — паттерны, state management, продвинутые хуки
- 🔴 **Продвинутый** — SSR, Server Components, Compiler, advanced API
- 🧪 **Experimental** — API может измениться в будущих версиях

## 📚 Основные темы

### Основы
- **JSX** — синтаксис, выражения, условный рендер, списки
- **Стилизация** — CSS Modules, inline styles, CSS-in-JS

### Хуки
- **useState** — state, updater function, lazy initialization
- **useEffect** — side effects, cleanup, dependencies
- **useCallback / useMemo** — мемоизация, когда НЕ нужно
- **useRef** — DOM refs, mutable values, forwarding refs
- **useContext** — Provider pattern, performance implications
- **Overview** — таблица всех хуков с правилами

### State Management
- **Zustand** — минималистичный store, slices, devtools
- **Redux Toolkit** — createSlice, RTK Query, middleware

### Data Fetching
- **TanStack Query** — useQuery, useMutation, cache, optimistic updates

### Формы
- **React Forms** — controlled/uncontrolled, React Hook Form, validation с Zod

### Паттерны
- **Component Patterns** — Compound, Render Props, HOC, Container/Presentational

### Performance
- **Code Splitting** — React.lazy, Suspense, dynamic imports, route-based splitting

### Концепции
- **Rendering** — Virtual DOM, reconciliation, keys, commit phase
- **Lifecycle** — mount/update/unmount, useEffect timing, strictMode double-render
- **Batching** — automatic batching (React 18+), flushSync
- **Server Components** — RSC architecture, client/server boundary 🧪

### React 19
- **New Features** — use(), useActionState, useOptimistic, Actions, ref as prop
- **React Compiler** — auto-memoization, compiler vs manual memo 🧪

### Тестирование
- **Testing Guide** — Vitest + RTL, component/async/mock/a11y testing

### Routing & SSR
- **Routing & SSR** — React Router, data loading, code splitting, hydration

### DevOps
- **Git Flow** — branching strategies, CI/CD, deployment

### Advanced
- **useReducer, useImperativeHandle, useSyncExternalStore** — продвинутые хуки
- **Portals & Overlays** — модалки, FocusTrap, overlay positioning

## 🎤 Подготовка к собеседованию

Раздел `/interview`. Ключевые темы:
- Virtual DOM и reconciliation
- useEffect vs useLayoutEffect
- Когда использовать useMemo / useCallback
- Context vs внешний state manager
- Server Components vs SSR
- React 19: что нового и зачем

## ➡️ Что дальше

- [Vue Playground](../vue/) — альтернативный фреймворк, Composition API
- [JS Playground](../js/) — углублённый JavaScript
- [Patterns Playground](../patterns/) — GoF-паттерны, SOLID, архитектура

## 🛠 Запуск

```bash
cd playgrounds/react
npm install
npm run dev
# → http://localhost:3231
```

## 📁 Структура

```
src/
  pages/       — страницы по темам (basics, hooks, state, data, forms, patterns, performance, concepts, versions, testing, routing, devops, advanced, interview)
  components/  — переиспользуемые компоненты (RenderTracker и др.)
  App.tsx      — роутинг и навигация
```
