# JS Playground

Интерактивная площадка для углублённого изучения JavaScript — от Event Loop и замыканий до метапрограммирования и браузерных API.

## 🎯 Чему учит

- **Event Loop**: визуализатор, call stack, micro/macro tasks, песочница, квиз
- **Асинхронность**: Promises, async/await, Promise.all/race/allSettled/any
- **Замыкания и скоуп**: лексическая область, hoisting, IIFE, модульный паттерн
- **this и контекст**: правила определения this, bind/call/apply, arrow functions
- **Прототипы**: цепочка прототипов, __proto__, Object.create, классы
- **ES6+**: деструктуризация, spread/rest, Array methods (map, filter, reduce)
- **Модули**: ESM vs CJS, dynamic import, циклические зависимости, tree-shaking
- **Продвинутое**: коллекции (Map/Set/WeakMap/WeakRef), метапрограммирование (Proxy/Reflect, генераторы), память (GC, утечки)
- **Браузерные API**: Storage, Fetch, Workers, Scheduling, Observers

## 📋 Пререквизиты

- Базовый JavaScript: переменные, функции, массивы, объекты
- [HTML Playground](../html/) — структура документа, DOM
- Браузер с DevTools (вкладки Console, Sources, Performance)

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень |
|---|--------|---------|---------|
| 1 | Главная (обзор) | `/` | 🟢 Базовый |
| 2 | Замыкания | `/closures/closures` | 🟢 Базовый |
| 3 | Область видимости | `/closures/scope` | 🟢 Базовый |
| 4 | Hoisting | `/closures/hoisting` | 🟢 Базовый |
| 5 | Деструктуризация | `/es6/destructuring` | 🟢 Базовый |
| 6 | Spread & Rest | `/es6/spread-rest` | 🟢 Базовый |
| 7 | Array Methods | `/es6/array-methods` | 🟢 Базовый |
| 8 | this | `/context/this` | 🟡 Средний |
| 9 | bind/call/apply | `/context/bind-call-apply` | 🟡 Средний |
| 10 | Прототипы | `/prototypes/basics` | 🟡 Средний |
| 11 | Event Loop — визуализатор | `/eventloop/visualizer` | 🟡 Средний |
| 12 | Call Stack | `/eventloop/callstack` | 🟡 Средний |
| 13 | Micro vs Macro | `/eventloop/micromacro` | 🟡 Средний |
| 14 | Event Loop — песочница | `/eventloop/sandbox` | 🟡 Средний |
| 15 | Event Loop — квиз | `/eventloop/quiz` | 🟡 Средний |
| 16 | Promises | `/async/promises` | 🟡 Средний |
| 17 | async/await | `/async/async-await` | 🟡 Средний |
| 18 | Promise Methods | `/async/promise-methods` | 🟡 Средний |
| 19 | Модули | `/modules` | 🟡 Средний |
| 20 | Коллекции | `/collections` | 🟡 Средний |
| 21 | Proxy & Reflect | `/metaprogramming/proxy` | 🔴 Продвинутый |
| 22 | Генераторы | `/metaprogramming/generators` | 🔴 Продвинутый |
| 23 | Память и GC | `/memory` | 🔴 Продвинутый |
| 24 | Браузерные API | `/browser/apis` | 🔴 Продвинутый |
| 25 | Ошибки и отладка | `/debugging/errors` | 🔴 Продвинутый |
| 26 | Interview Challenges | `/interview/challenges` | 🎤 Собеседование |
| 27 | Deep Clone | `/interview/deep-clone` | 🎤 Собеседование |
| 28 | LeetCode-подобные | `/interview/leetcode` | 🎤 Собеседование |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции языка
- 🟡 **Средний** — ключевые механизмы, паттерны, подготовка к интервью
- 🔴 **Продвинутый** — глубокие темы, edge cases, внутренние механизмы

## 📚 Основные темы

### Замыкания и область видимости
- **Closures** — лексический скоуп, IIFE, module pattern, partial application
- **Scope** — var/let/const, block scope, temporal dead zone
- **Hoisting** — переменные, функции, классы, порядок инициализации

### this и контекст
- **this** — 4 правила определения, arrow functions, strict mode
- **bind/call/apply** — явное связывание, полифиллы, каррирование

### Прототипы
- **Basics** — цепочка прототипов, Object.create, классы vs прототипы

### ES6+ Features
- **Destructuring** — массивы, объекты, вложенные, значения по умолчанию
- **Spread & Rest** — shallow copy, merge, rest parameters
- **Array Methods** — map, filter, reduce, find, some, every, flat

### Event Loop
- **Visualizer** — пошаговая визуализация call stack + task queues
- **Call Stack** — stack frames, recursion, stack overflow
- **Micro vs Macro** — Promise vs setTimeout, queueMicrotask, порядок выполнения
- **Sandbox** — эксперименты с кастомным кодом
- **Quiz** — проверка понимания порядка выполнения

### Асинхронность
- **Promises** — создание, цепочки, обработка ошибок
- **async/await** — синтаксис, top-level await, error handling
- **Promise Methods** — all, race, allSettled, any

### Модули
- **ESM vs CJS** — import/export, dynamic import, циклические зависимости, tree-shaking

### Коллекции
- **Map, Set, WeakMap, WeakSet, WeakRef** — когда что использовать, паттерны

### Метапрограммирование
- **Proxy & Reflect** — traps, reactive patterns, validation
- **Generators** — function*, yield, async generators, итераторы

### Память
- **GC и утечки** — Mark & Sweep, утечки в замыканиях/DOM/таймерах, DevTools Memory

### Браузерные API
- **Storage, Fetch, Workers, Scheduling, Observers** — 35+ браузерных API

### Отладка
- **Errors** — типы ошибок, async errors, debugging стратегии, global handlers

## 🎤 Подготовка к собеседованию

3 раздела: `/interview/challenges`, `/interview/deep-clone`, `/interview/leetcode`. Ключевые темы:
- Event Loop: порядок выполнения Promise/setTimeout/queueMicrotask
- this: определение контекста в разных ситуациях
- Замыкания: что выведет код? IIFE-паттерны
- Реализация: debounce, throttle, deep clone, Promise.all
- Прототипы: instanceof, цепочка наследования

## ➡️ Что дальше

- [CSS Playground](../css/) — стилизация из JS, CSS Variables
- [React Playground](../react/) — фреймворк на базе JS
- [Algo Playground](../algo/) — алгоритмы на JavaScript

## 🛠 Запуск

```bash
cd playgrounds/js
npm install
npm run dev
# → http://localhost:3212
```

## 📁 Структура

```
src/
  pages/       — страницы по темам (eventloop, async, closures, context, prototypes, es6, modules, collections, metaprogramming, memory, browser, debugging, interview)
  components/  — переиспользуемые компоненты
  App.tsx      — роутинг и навигация
```
- `src/components/CodeBlock.tsx` - Компонент для отображения выполняемого кода.

## Как использовать
Запустите проект и переходите по разделам меню. Наблюдайте анимацию перемещения блоков кода.
