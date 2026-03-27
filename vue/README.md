# Vue Playground

Интерактивная площадка для изучения Vue 3.5+ (Composition API) — от основ реактивности до тестирования, роутинга и продвинутых паттернов.

## 🎯 Чему учит

- **Основы**: Template Syntax, стилизация (scoped/module), v-model
- **Реактивность**: ref, reactive, computed, watch/watchEffect, shallowRef, обзор системы
- **Жизненный цикл**: onMounted, onUnmounted, onUpdated и др.
- **Компоненты**: Props & Emits, Slots, Provide/Inject
- **Composables**: создание и использование переиспользуемой логики
- **State Management**: Pinia (defineStore, storeToRefs, devtools)
- **Паттерны**: компонентные паттерны во Vue
- **Vue 3.5+**: новые фичи (defineModel, Suspense improvements и др.)
- **Продвинутое**: кастомные директивы, nextTick, KeepAlive, обработка ошибок, подводные камни реактивности
- **Тестирование**: Vitest + Vue Test Utils
- **Роутинг**: Vue Router (guards, lazy loading, architecture)

## 📋 Пререквизиты

- [JS Playground](../js/) — замыкания, this, async/await, ES6+
- [HTML Playground](../html/) — семантика, формы
- Базовое понимание npm/node

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень |
|---|--------|---------|---------|
| 1 | Главная | `/` | 🟢 Базовый |
| 2 | Template Syntax | `/basics/template-syntax` | 🟢 Базовый |
| 3 | Стилизация | `/basics/styling` | 🟢 Базовый |
| 4 | v-model | `/basics/v-model` | 🟢 Базовый |
| 5 | ref() | `/reactivity/ref` | 🟢 Базовый |
| 6 | reactive() | `/reactivity/reactive` | 🟢 Базовый |
| 7 | computed() | `/reactivity/computed` | 🟢 Базовый |
| 8 | watch / watchEffect | `/reactivity/watch` | 🟡 Средний |
| 9 | ref vs shallowRef | `/reactivity/comparison` | 🟡 Средний |
| 10 | Обзор реактивности | `/reactivity/overview` | 🟡 Средний |
| 11 | Lifecycle Hooks | `/lifecycle/hooks` | 🟡 Средний |
| 12 | Props & Emits | `/components/props-emits` | 🟡 Средний |
| 13 | Slots | `/components/slots` | 🟡 Средний |
| 14 | Provide / Inject | `/components/provide-inject` | 🟡 Средний |
| 15 | Composables | `/composables/intro` | 🟡 Средний |
| 16 | Pinia | `/state/pinia` | 🟡 Средний |
| 17 | Component Patterns | `/patterns/components` | 🟡 Средний |
| 18 | Vue 3.5+ | `/versions/vue35` | 🟡 Средний |
| 19 | Интерактивные демо | `/demos/interactive` | 🟡 Практика |
| 20 | Teleport | `/demos/teleport` | 🟡 Практика |
| 21 | Кастомные директивы | `/advanced/custom-directives` | 🔴 Продвинутый |
| 22 | nextTick | `/advanced/next-tick` | 🔴 Продвинутый |
| 23 | KeepAlive | `/advanced/keep-alive` | 🔴 Продвинутый |
| 24 | Обработка ошибок | `/advanced/error-handling` | 🔴 Продвинутый |
| 25 | Подводные камни | `/advanced/reactivity-caveats` | 🔴 Продвинутый |
| 26 | Vitest + VTU | `/testing/guide` | 🔴 Продвинутый |
| 27 | Router и Архитектура | `/routing/architecture` | 🔴 Продвинутый |

### Условные обозначения уровней
- 🟢 **Базовый** — основы Vue, подходит для начинающих
- 🟡 **Средний** — ключевые паттерны, Composition API, Pinia
- 🔴 **Продвинутый** — edge cases, тестирование, архитектура

## 📚 Основные темы

### Основы
- **Template Syntax** — директивы v-if, v-for, v-bind, v-on, выражения
- **Стилизация** — scoped styles, CSS Modules, :deep(), v-bind in CSS
- **v-model** — двустороннее связывание, кастомный v-model на компоненте

### Реактивность
- **ref()** — примитивы и объекты, .value, template auto-unwrap
- **reactive()** — объекты, nested reactivity, ограничения
- **computed()** — кеширование, writable computed
- **watch / watchEffect** — deep watch, immediate, flush, cleanup
- **ref vs shallowRef** — гранулярность отслеживания
- **Обзор** — внутреннее устройство реактивности (Proxy, effect, track/trigger)

### Жизненный цикл
- **Lifecycle Hooks** — порядок вызова, setup vs onMounted, parent/child timing

### Компоненты
- **Props & Emits** — defineProps, defineEmits, TypeScript, validation
- **Slots** — named, scoped, conditional slots
- **Provide / Inject** — dependency injection, типизация, alternatives

### Composables
- **Введение** — структура, naming conventions, возврат ref vs reactive

### State Management
- **Pinia** — defineStore (Options/Setup), storeToRefs, plugins, devtools

### Паттерны
- **Component Patterns** — renderless, compound, wrapper, adapter

### Vue 3.5+
- **Новые фичи** — defineModel, useTemplateRef, Suspense, Deferred Teleport

### Демонстрации
- **Interactive demos** — живые примеры работы реактивности
- **Teleport** — рендеринг в другое место DOM

### Продвинутое
- **Custom Directives** — создание, хуки, аргументы, модификаторы
- **nextTick** — микротаск, когда нужен, batch update
- **KeepAlive** — кеширование компонентов, include/exclude, onActivated
- **Error Handling** — onErrorCaptured, errorHandler, Error Boundary
- **Reactivity Caveats** — потеря реактивности, деструктуризация, массивы

### Тестирование
- **Vitest + VTU** — mount, trigger, async, Pinia mocking, composable тесты

### Роутинг и Архитектура
- **Router** — params, query, guards, lazy loading, feature folders

## 🎤 Подготовка к собеседованию

Ключевые темы для интервью по Vue:
- ref vs reactive: когда что
- Composition API vs Options API
- Lifecycle порядок: parent vs child
- Pinia vs Vuex
- Vue реактивность: как работает Proxy
- Slots vs props: выбор подхода

## ➡️ Что дальше

- [React Playground](../react/) — альтернативный фреймворк
- [JS Playground](../js/) — углублённый JavaScript
- [Patterns Playground](../patterns/) — GoF-паттерны, архитектура

## 🛠 Запуск

```bash
cd playgrounds/vue
npm install
npm run dev
# → http://localhost:3232
```

## 📁 Структура

```
src/
  pages/       — страницы по темам (basics, reactivity, lifecycle, components, composables, state, patterns, versions, demos, advanced, testing, routing)
  components/  — переиспользуемые компоненты
  App.vue      — роутинг и навигация
  router/      — Vue Router конфигурация
```

## Для экспериментов
Идеально подходит для сравнения реализации фич с React-версией (лежат в соседней папке `../react`).
