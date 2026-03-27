# CSS Playground

Интерактивная площадка для изучения современного CSS — от синтаксических новинок до архитектуры и оптимизации рендеринга.

## 🎯 Чему учит

- **Новый синтаксис**: Nesting, @layer, @property, @scope, новые селекторы и медиа-запросы
- **Layout**: Flexbox, Grid, Subgrid, Container Queries
- **Селекторы**: :has(), :is(), :where() — мощные паттерны без JS
- **Стилизация**: CSS Variables, Color Functions (oklch, color-mix), Logical Properties
- **Возможности**: Scroll Snap, aspect-ratio, clamp()/min()/max(), accessibility
- **Примеры**: карточки, кнопки, формы, навигация, анимации, реальные паттерны
- **Продвинутое**: Performance (rendering pipeline, containment), Architecture (BEM, Modules, Tokens)

## 📋 Пререквизиты

- Базовый CSS: селекторы, box model, позиционирование
- HTML-семантика (см. [HTML Playground](../html/))
- Браузер: Chrome 120+ / Firefox 121+ / Safari 17.2+ (для полной поддержки новинок)

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень |
|---|--------|---------|---------|
| 1 | Home | `/` | 🟢 Базовый |
| 2 | CSS Timeline | `/timeline` | 🟢 Базовый |
| 3 | Syntax Overview | `/syntax/overview` | 🟢 Базовый |
| 4 | CSS Variables | `/styling/variables` | 🟢 Базовый |
| 5 | Flexbox | `/layout/flexbox` | 🟢 Базовый |
| 6 | CSS Grid | `/layout/grid` | 🟢 Базовый |
| 7 | Color Functions | `/styling/colors` | 🟡 Средний |
| 8 | Logical Properties | `/styling/logical` | 🟡 Средний |
| 9 | CSS Nesting | `/syntax/nesting` | 🟡 Средний |
| 10 | @layer | `/syntax/layers` | 🟡 Средний |
| 11 | Media Queries | `/syntax/media` | 🟡 Средний |
| 12 | New Selectors | `/syntax/selectors` | 🟡 Средний |
| 13 | New Properties | `/syntax/properties` | 🟡 Средний |
| 14 | Color Syntax | `/syntax/colors` | 🟡 Средний |
| 15 | :has() Selector | `/selectors/has` | 🟡 Средний |
| 16 | :is() & :where() | `/selectors/is-where` | 🟡 Средний |
| 17 | Scroll Snap | `/features/scroll-snap` | 🟡 Средний |
| 18 | aspect-ratio | `/features/aspect-ratio` | 🟡 Средний |
| 19 | clamp() & min/max | `/features/clamp` | 🟡 Средний |
| 20 | Container Queries | `/layout/container-queries` | 🔴 Продвинутый |
| 21 | Subgrid | `/layout/subgrid` | 🔴 Продвинутый |
| 22 | @property | `/syntax/property` | 🔴 Продвинутый |
| 23 | @scope | `/syntax/scope` | 🔴 Продвинутый |
| 24 | A11y в CSS | `/features/accessibility` | 🔴 Продвинутый |
| 25 | Card Patterns | `/examples/cards` | 🟡 Практика |
| 26 | Button Styles | `/examples/buttons` | 🟡 Практика |
| 27 | Form Patterns | `/examples/forms` | 🟡 Практика |
| 28 | Navigation | `/examples/navigation` | 🟡 Практика |
| 29 | Layout Recipes | `/examples/layouts` | 🟡 Практика |
| 30 | Animations | `/examples/animations` | 🟡 Практика |
| 31 | Real World | `/examples/real-world` | 🔴 Практика |
| 32 | CSS Performance | `/performance` | 🔴 Продвинутый |
| 33 | CSS Architecture | `/architecture` | 🔴 Продвинутый |
| 34 | Вопросы | `/interview` | 🎤 Собеседование |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции, подходит для начинающих
- 🟡 **Средний** — требует понимания основ, практические паттерны
- 🔴 **Продвинутый** — глубокие темы, edge cases, новейшие спецификации
- 🎤 **Собеседование** — подготовка к интервью

## 📚 Основные темы

### Синтаксис (Syntax Changes)
- **Overview** — обзор всех новинок CSS
- **Nesting** — нативная вложенность без препроцессоров
- **@layer** — каскадные слои, управление приоритетом
- **@property** — типизированные CSS-переменные с анимацией
- **@scope** — скопированные стили без Shadow DOM
- **Color Syntax** — oklch, lab, lch, color-mix()
- **New Selectors** — :has(), :is(), :where(), :not() Level 4
- **New Properties** — accent-color, text-wrap, inert, и др.
- **Media Queries** — prefers-color-scheme, prefers-reduced-motion, range syntax

### Layout
- **Flexbox** — оси, выравнивание, order, grow/shrink
- **Grid** — линии, области, auto-fill/fit, именованные треки
- **Container Queries** — адаптивность от контейнера, а не viewport
- **Subgrid** — наследование сетки родителя

### Селекторы
- **:has()** — родительский селектор, паттерны без JS
- **:is() & :where()** — группировка, разница в специфичности

### Стилизация
- **CSS Variables** — каскадные переменные, dark mode, fallback
- **Color Functions** — oklch, color-mix(), relative color syntax
- **Logical Properties** — направление-независимые свойства для i18n

### Возможности
- **Scroll Snap** — плавная прокрутка к якорям
- **aspect-ratio** — фиксированные пропорции без padding-hack
- **clamp() & min/max** — fluid typography и spacing
- **A11y в CSS** — prefers-reduced-motion, focus-visible, forced-colors

### Примеры
- 7 практических разделов: карточки, кнопки, формы, навигация, лейауты, анимации, реальные UI

### Продвинутое
- **Performance** — rendering pipeline, property cost, containment, profiling
- **Architecture** — BEM vs Utility-first vs CSS Modules vs Design Tokens

## 🎤 Подготовка к собеседованию

Раздел `/interview`. Ключевые темы:
- Каскад, специфичность, наследование
- Flexbox vs Grid: когда что
- @layer и управление приоритетами
- Responsive: Container Queries vs Media Queries
- Performance: will-change, contain, content-visibility

## ➡️ Что дальше

- [HTML Playground](../html/) — семантика и доступность
- [JS Playground](../js/) — DOM-манипуляции, события, анимации из JS
- [React Playground](../react/) — CSS-in-JS, Styled Components, CSS Modules в React

## 🛠 Запуск

```bash
cd playgrounds/css
npm install
npm run dev
# → http://localhost:3213
```

## 📁 Структура

```
src/
  pages/       — страницы по темам (syntax, layout, selectors, styling, features, examples, performance, architecture)
  components/  — переиспользуемые компоненты
  App.tsx      — роутинг и навигация (data-driven navSections)
```
