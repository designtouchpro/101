# Swift Playground

Основы языка Swift — от типов и переменных до concurrency и управления памятью. Фундамент для перехода к SwiftUI.

## 🎯 Чему учит

- **Типы и переменные**: value/reference types, let/var, type inference
- **Control Flow**: if/guard/switch, pattern matching, where-клозы
- **Функции и замыкания**: first-class functions, trailing closures, capture lists
- **Optionals**: Optional chaining, nil coalescing, forced unwrapping и его опасности
- **Enums и коллекции**: associated values, raw values, Array/Dictionary/Set
- **ООП и протоколы**: struct vs class, протоколы, extensions, generics
- **Concurrency**: async/await, structured concurrency, actors
- **Управление памятью**: ARC, strong/weak/unowned, retain cycles

## 📋 Пререквизиты

- Знакомство с любым C-подобным языком (JS, Java, C#, Kotlin)
- Xcode 15+ или Swift Playgrounds (для локальных экспериментов)
- Понимание базовых концепций ООП

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Типы и переменные | `/basics` | 🟢 Базовый |
| 2  | Control Flow | `/control-flow` | 🟢 Базовый |
| 3  | Функции | `/functions` | 🟢 Базовый |
| 4  | Замыкания | `/closures` | 🟡 Средний |
| 5  | Optionals | `/optionals` | 🟢 Базовый |
| 6  | Enums | `/enums` | 🟡 Средний |
| 7  | Коллекции | `/collections` | 🟢 Базовый |
| 8  | Struct vs Class | `/structs-classes` | 🟡 Средний |
| 9  | Протоколы | `/protocols` | 🟡 Средний |
| 10 | Extensions | `/extensions` | 🟡 Средний |
| 11 | Generics | `/generics` | 🔴 Продвинутый |
| 12 | Error Handling | `/error-handling` | 🟡 Средний |
| 13 | Concurrency | `/concurrency` | 🔴 Продвинутый |
| 14 | ARC и память | `/memory` | 🔴 Продвинутый |
| 15 | SPM, XCTest, Debug | `/tooling` | 🟡 Средний |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции, подходит для начинающих
- 🟡 **Средний** — требует понимания основ, повседневные паттерны
- 🔴 **Продвинутый** — глубокие темы, подготовка к собеседованиям

## 📚 Основные темы

### Основы языка
- **Типы и переменные** — Int, Double, String, Bool, type inference, let vs var
- **Control Flow** — if/else, guard, switch с pattern matching, for-in, while
- **Функции** — параметры, возвращаемые значения, argument labels, default values
- **Замыкания** — trailing closure syntax, capture lists, escaping vs non-escaping

### Типы данных
- **Optionals** — nil safety, optional binding, chaining, nil coalescing
- **Enums** — associated values, raw values, CaseIterable, recursive enums
- **Коллекции** — Array, Dictionary, Set, higher-order functions (map/filter/reduce)

### ООП и протоколы
- **Struct vs Class** — value vs reference semantics, когда что выбирать
- **Протоколы** — protocol-oriented programming, default implementations
- **Extensions** — добавление функциональности к существующим типам
- **Generics** — generic functions/types, constraints, associated types

### Продвинутое
- **Error Handling** — do-catch, throws, Result type, typed throws (Swift 6)
- **Concurrency** — async/await, Task, TaskGroup, actors, Sendable
- **ARC и память** — strong/weak/unowned references, retain cycles, autorelease

### Инструменты
- **SPM** — Package.swift, зависимости, build/run/test
- **XCTest** — unit-тесты, async tests, expectations, mocking через протоколы
- **Debugging** — print/dump, LLDB, breakpoints, Instruments

## 🎤 Подготовка к собеседованию

- В чём разница между struct и class? Когда использовать каждый?
- Что такое ARC? Как возникают retain cycles и как их решать?
- Объясните async/await и structured concurrency
- Чем Optional отличается от nullable в других языках?
- Что такое protocol-oriented programming?
- Как работает pattern matching в switch?

## ➡️ Что дальше

- [SwiftUI Playground](../swiftui/) — построение UI на Swift с декларативным подходом
- [Patterns Playground](../patterns/) — архитектурные паттерны (MVVM, Clean Architecture)

## 🛠 Запуск

```bash
cd playgrounds/swift
npm install
npm run dev
# → http://localhost:3215
```

## 📁 Структура

```
src/
  pages/          — страницы по темам (BasicsPage, ClosuresPage, и т.д.)
  components/     — переиспользуемые компоненты
  App.tsx         — роутинг и навигация
```
