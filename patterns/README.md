# Patterns Playground

Паттерны проектирования и архитектурные подходы — от SOLID-принципов и GoF-каталога до выбора архитектуры для реальных проектов.

## 🎯 Чему учит

- **SOLID и базовые принципы**: SRP, OCP, LSP, ISP, DIP на живых примерах
- **DRY / KISS / YAGNI**: когда следовать, когда нарушать
- **Анти-паттерны**: God Object, Premature Abstraction, Sunk Cost
- **Архитектурные стили**: MVC/MVP/MVVM, Clean Architecture, Hexagonal, FSD, CQRS
- **Порождающие паттерны**: Singleton, Factory Method, Abstract Factory, Builder, Prototype
- **Структурные паттерны**: Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy
- **Поведенческие паттерны**: Chain of Responsibility, Command, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor
- **Выбор паттерна**: матрица сравнения, пары-путаницы, сценарные рекомендации

## 📋 Пререквизиты

- Уверенное владение JavaScript или TypeScript
- Базовое ООП (классы, интерфейсы, наследование)
- Понимание компонентной модели (React или Vue) — для архитектурных разделов

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | SOLID | `/principles/solid` | 🟢 Базовый |
| 2  | DRY / KISS / YAGNI | `/principles/dry-kiss-yagni` | 🟢 Базовый |
| 3  | Анти-паттерны | `/principles/anti-patterns` | 🟡 Средний |
| 4  | MVC / MVP / MVVM | `/architecture/mvc-mvp-mvvm` | 🟡 Средний |
| 5  | Clean Architecture | `/architecture/clean` | 🟡 Средний |
| 6  | Hexagonal / Ports | `/architecture/hexagonal` | 🔴 Продвинутый |
| 7  | FSD | `/architecture/fsd` | 🟡 Средний |
| 8  | Layered / CQRS / MFE | `/architecture/more` | 🔴 Продвинутый |
| 9  | Singleton | `/creational/singleton` | 🟢 Базовый |
| 10 | Factory Method | `/creational/factory-method` | 🟢 Базовый |
| 11 | Abstract Factory | `/creational/abstract-factory` | 🟡 Средний |
| 12 | Builder | `/creational/builder` | 🟡 Средний |
| 13 | Prototype | `/creational/prototype` | 🟡 Средний |
| 14 | Adapter | `/structural/adapter` | 🟢 Базовый |
| 15 | Bridge | `/structural/bridge` | 🟡 Средний |
| 16 | Composite | `/structural/composite` | 🟡 Средний |
| 17 | Decorator | `/structural/decorator` | 🟢 Базовый |
| 18 | Facade | `/structural/facade` | 🟢 Базовый |
| 19 | Flyweight | `/structural/flyweight` | 🔴 Продвинутый |
| 20 | Proxy | `/structural/proxy` | 🟡 Средний |
| 21 | Chain of Responsibility | `/behavioral/chain-of-responsibility` | 🟡 Средний |
| 22 | Command | `/behavioral/command` | 🟡 Средний |
| 23 | Iterator | `/behavioral/iterator` | 🟢 Базовый |
| 24 | Mediator | `/behavioral/mediator` | 🟡 Средний |
| 25 | Memento | `/behavioral/memento` | 🟡 Средний |
| 26 | Observer | `/behavioral/observer` | 🟢 Базовый |
| 27 | State | `/behavioral/state` | 🟡 Средний |
| 28 | Strategy | `/behavioral/strategy` | 🟢 Базовый |
| 29 | Template Method | `/behavioral/template-method` | 🟡 Средний |
| 30 | Visitor | `/behavioral/visitor` | 🔴 Продвинутый |
| 31 | Выбор паттерна | `/comparison/selection` | 🔴 Продвинутый |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции, подходит для начинающих
- 🟡 **Средний** — требует понимания основ, часто встречается на практике
- 🔴 **Продвинутый** — глубокие темы, edge cases, архитектурные решения

## 📚 Основные темы

### Принципы
- **SOLID** — пять принципов проектирования классов и модулей
- **DRY / KISS / YAGNI** — баланс между переиспользованием и простотой
- **Анти-паттерны** — типичные ошибки проектирования и как их избегать

### Архитектура
- **MVC / MVP / MVVM** — UI-архитектуры и их области применения
- **Clean Architecture** — слоёная изоляция с Dependency Rule
- **Hexagonal / Ports & Adapters** — инверсия зависимостей на уровне системы
- **FSD** — Feature-Sliced Design для фронтенда
- **Layered / CQRS / MFE** — серверные и микрофронтенд-архитектуры

### Порождающие (Creational)
- **Singleton, Factory Method, Abstract Factory** — контроль создания объектов
- **Builder, Prototype** — пошаговая сборка и клонирование

### Структурные (Structural)
- **Adapter, Facade** — упрощение интерфейсов
- **Decorator, Proxy** — расширение поведения без наследования
- **Bridge, Composite, Flyweight** — организация сложных структур

### Поведенческие (Behavioral)
- **Observer, Strategy, Command** — самые частые на практике
- **State, Mediator, Chain of Responsibility** — управление сложным поведением
- **Iterator, Template Method, Visitor, Memento** — специализированные сценарии

### Сравнение и выбор
- **Матрица паттернов** — 22 GoF-паттерна по назначению, сложности, частоте
- **Пары-путаницы** — чем отличаются похожие паттерны
- **Сценарный подход** — от проблемы к паттерну

## 🎤 Подготовка к собеседованию

- Назовите 5 принципов SOLID и приведите пример нарушения каждого
- Чем отличается Strategy от State? Adapter от Facade? Observer от Mediator?
- Когда Singleton — анти-паттерн?
- Назовите архитектуру вашего текущего проекта, объясните trade-offs
- Как выбрать между MVC, MVVM и Clean Architecture?

## ➡️ Что дальше

- [React Playground](../react/) — паттерны в контексте React-компонентов
- [Vue Playground](../vue/) — паттерны в Composition API и реактивности
- [JS Playground](../js/) — основы языка, на которых строятся паттерны
- [Algo Playground](../algo/) — алгоритмические паттерны решения задач

## 🛠 Запуск

```bash
cd playgrounds/patterns
npm install
npm run dev
# → http://localhost:3242
```

## 📁 Структура

```
src/
  pages/
    principles/     — SOLID, DRY/KISS/YAGNI, анти-паттерны
    architecture/   — MVC, Clean, Hexagonal, FSD, CQRS
    creational/     — порождающие паттерны
    structural/     — структурные паттерны
    behavioral/     — поведенческие паттерны
    comparison/     — матрица сравнения и выбор
  components/       — переиспользуемые компоненты
  App.tsx           — роутинг и навигация
```
