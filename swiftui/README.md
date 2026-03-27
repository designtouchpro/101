# SwiftUI Playground

Декларативный UI на Swift — от базовых Views и Modifiers до архитектуры приложения, навигации и взаимодействия с UIKit.

## 🎯 Чему учит

- **Views и Modifiers**: построение UI из композируемых вью
- **Layout System**: HStack/VStack/ZStack, GeometryReader, alignment
- **Состояние**: @State, @Binding, @Observable, Environment, Data Flow
- **Навигация**: NavigationStack, NavigationPath, программная навигация
- **Списки и формы**: List, Form, ForEach, динамический контент
- **Анимации и жесты**: withAnimation, matchedGeometryEffect, DragGesture
- **Архитектура**: Lifecycle, MVVM, App protocol, UIKit Interop
- **Данные и сеть**: URLSession + async/await, SwiftData/Core Data, UserDefaults
- **Тестирование**: Preview, Unit-тесты, Performance, Instruments

## 📋 Пререквизиты

- [Swift Playground](../swift/) — уверенное владение основами языка
- Xcode 15+ (SwiftUI живёт в Xcode)
- Базовое понимание реактивного программирования

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Views и Modifiers | `/views` | 🟢 Базовый |
| 2  | Layout System | `/layout` | 🟢 Базовый |
| 3  | Компоненты | `/components` | 🟢 Базовый |
| 4  | @State | `/state` | 🟢 Базовый |
| 5  | @Binding | `/binding` | 🟢 Базовый |
| 6  | @Observable | `/observable` | 🟡 Средний |
| 7  | Environment | `/environment` | 🟡 Средний |
| 8  | Data Flow | `/data-flow` | 🟡 Средний |
| 9  | Navigation | `/navigation` | 🟡 Средний |
| 10 | Lists & Forms | `/lists` | 🟢 Базовый |
| 11 | Animations | `/animations` | 🟡 Средний |
| 12 | Gestures | `/gestures` | 🟡 Средний |
| 13 | Lifecycle | `/lifecycle` | 🟡 Средний |
| 14 | MVVM | `/architecture` | 🔴 Продвинутый |
| 15 | App & UIKit Interop | `/app-lifecycle` | 🔴 Продвинутый |
| 16 | Networking | `/networking` | 🟡 Средний |
| 17 | Хранение данных | `/persistence` | 🟡 Средний |
| 18 | Тесты и Performance | `/testing-performance` | 🔴 Продвинутый |

### Условные обозначения уровней
- 🟢 **Базовый** — UI-основы, подходит для начинающих в SwiftUI
- 🟡 **Средний** — требует понимания Views и состояния
- 🔴 **Продвинутый** — архитектура, interop, оптимизация

## 📚 Основные темы

### Основы UI
- **Views и Modifiers** — ViewBuilder, modifier chaining, custom modifiers
- **Layout System** — стеки, GeometryReader, alignment guides, Spacer
- **Компоненты** — переиспользуемые вью, ViewBuilder в параметрах

### Состояние
- **@State** — локальное состояние вью, value semantics
- **@Binding** — двустороннее связывание, проброс состояния
- **@Observable** — Observation framework (Swift 5.9+), замена ObservableObject
- **Environment** — @Environment, @EnvironmentObject, dependency injection
- **Data Flow** — однонаправленный поток данных, Source of Truth

### Навигация и списки
- **Navigation** — NavigationStack, NavigationLink, программная навигация
- **Lists & Forms** — List, Form, Section, swipeActions, searchable

### Анимации и жесты
- **Animations** — implicit/explicit animations, transitions, matchedGeometryEffect
- **Gestures** — TapGesture, DragGesture, combined gestures, GestureState

### Архитектура
- **Lifecycle** — onAppear/onDisappear, task, onChange, scenePhase
- **MVVM** — ViewModel с @Observable, separation of concerns
- **App & UIKit Interop** — @main App, ScenePhase, UIViewRepresentable, UIHostingController

### Данные и сеть
- **Networking** — URLSession + async/await, Codable, error handling
- **Хранение данных** — SwiftData, Core Data, UserDefaults, FileManager

### Качество
- **Тесты и Performance** — Xcode Previews, ViewIdentity, Equatable, Instruments, _printChanges

## 🎤 Подготовка к собеседованию

- Чем @State отличается от @Binding? Когда использовать @Observable?
- Как работает View Identity и почему это важно для производительности?
- В чём разница между implicit и explicit animation?
- Как организовать навигацию в большом приложении?
- Как связать SwiftUI с существующим UIKit-кодом?
- Что такое Data Flow в SwiftUI и где Source of Truth?

## ➡️ Что дальше

- [Swift Playground](../swift/) — углублённые темы языка (если нужно вернуться)
- [Patterns Playground](../patterns/) — архитектурные паттерны (MVVM, Clean, и т.д.)

## 🛠 Запуск

```bash
cd playgrounds/swiftui
npm install
npm run dev
# → http://localhost:3235
```

## 📁 Структура

```
src/
  pages/          — страницы по темам (ViewsModifiersPage, StatePage, и т.д.)
  components/     — переиспользуемые компоненты
  App.tsx         — роутинг и навигация
```
