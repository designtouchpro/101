# TeamLead Playground

Управление техническими командами — от стилей лидерства и делегирования до найма, конфликтов и масштабирования.

## 🎯 Чему учит

- **Лидерство**: стили лидерства (ситуационное, servant), делегирование, зрелость команды
- **1-on-1 и фидбек**: проведение встреч, SBI/BOFF/AID модели обратной связи
- **Конфликты**: стили поведения (Thomas-Kilmann), алгоритм разрешения
- **Декомпозиция**: разбиение задач, техники оценки (SP, T-shirt, ideal days)
- **Процессы**: гильдии и CoP, Team Topologies, Tech Radar
- **Люди**: найм (pipeline, scorecards, интервью), performance reviews (OKR, IDP, 360)
- **Здоровье команды**: psychological safety, burnout, onboarding, retention, scaling

## 📋 Пререквизиты

- Опыт работы в команде разработки
- Понимание Scrum/Kanban процессов
- [Project Playground](../project/) — управление проектами (смежная область)

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Стили лидерства | `/leadership/styles` | 🟢 Базовый |
| 2  | Делегирование | `/leadership/delegation` | 🟢 Базовый |
| 3  | Зрелость команды | `/leadership/maturity` | 🟡 Средний |
| 4  | 1-on-1 встречи | `/one-on-one/guide` | 🟢 Базовый |
| 5  | Модели фидбека | `/one-on-one/feedback` | 🟡 Средний |
| 6  | Стили поведения в конфликтах | `/conflicts/styles` | 🟡 Средний |
| 7  | Разрешение конфликтов | `/conflicts/resolution` | 🟡 Средний |
| 8  | Декомпозиция задач | `/decomposition/tasks` | 🟢 Базовый |
| 9  | Оценка задач | `/decomposition/estimation` | 🟡 Средний |
| 10 | Гильдии и CoP | `/processes/guilds` | 🟡 Средний |
| 11 | Team Topologies | `/processes/topologies` | 🔴 Продвинутый |
| 12 | Tech Radar | `/processes/tech-radar` | 🟡 Средний |
| 13 | Найм и оценка | `/people/hiring-performance` | 🔴 Продвинутый |
| 14 | Здоровье команды | `/people/org-health` | 🔴 Продвинутый |

### Условные обозначения уровней
- 🟢 **Базовый** — первые шаги тимлида (лидерство, 1-on-1, задачи)
- 🟡 **Средний** — углублённые навыки (фидбек, конфликты, процессы)
- 🔴 **Продвинутый** — масштабирование, найм, организационное здоровье

### Лестница развития тимлида

| Этап | Фокус | Маршруты |
|------|-------|----------|
| Новый тимлид | Лидерство, 1-on-1, делегирование | №1-2, 4, 8 |
| Уверенный тимлид | Фидбек, конфликты, оценка, процессы | №3, 5-7, 9-10, 12 |
| Зрелый менеджер | Найм, Team Topologies, org health | №11, 13-14 |

## 📚 Основные темы

### Лидерство
- **Стили** — ситуационное лидерство (Hersey-Blanchard), servant leadership, coaching
- **Делегирование** — матрица делегирования, 7 уровней, типичные ошибки
- **Зрелость** — модель Tuckman, диагностика стадии, интервенции

### 1-on-1 и фидбек
- **1-on-1** — структура встречи, вопросы, частота, follow-up
- **Фидбек** — SBI, BOFF, AID, SKS, правило 24 часов, positive vs corrective

### Конфликты
- **Стили** — Thomas-Kilmann (конкуренция, сотрудничество, компромисс, избегание, уступчивость)
- **Разрешение** — NVC (ненасильственное общение), медиация, эскалация

### Декомпозиция
- **Задачи** — INVEST, spike, разбиение по слоям, вертикальные слайсы
- **Оценка** — Story Points, Planning Poker, T-shirt sizing, estimation accuracy

### Процессы
- **Гильдии и CoP** — Communities of Practice, chapter, guild, когда что использовать
- **Team Topologies** — stream-aligned, platform, enabling, complicated-subsystem
- **Tech Radar** — adopt/trial/assess/hold, процесс обновления, Thoughtworks Tech Radar

### Люди
- **Найм** — hiring pipeline, scorecard, культурный fit, onboarding buddy
- **Performance** — OKR, IDP (Individual Development Plan), 360 feedback, grade matrix
- **Underperformance** — PIP, 6-step timeline, документирование
- **Org Health** — psychological safety, burnout (4 стадии), retention drivers, scaling pain points

## 🎤 Подготовка к собеседованию

- Как вы проводите 1-on-1? Какие вопросы задаёте?
- Расскажите о конфликте в команде и как вы его решили
- Какой стиль лидерства применяете? Зависит ли от ситуации?
- Как оцениваете производительность инженеров?
- Что делать, если сотрудник систематически не выполняет задачи?
- Как масштабировать команду с 5 до 15 человек?

## ➡️ Что дальше

- [Project Playground](../project/) — управление проектами и delivery
- [Product Playground](../product/) — продуктовое мышление для тимлида
- [Patterns Playground](../patterns/) — архитектурные решения

## 🛠 Запуск

```bash
cd playgrounds/teamlead
npm install
npm run dev
# → http://localhost:3251
```

## 📁 Структура

```
src/
  pages/
    leadership/     — стили лидерства, делегирование, зрелость
    one-on-one/     — 1-on-1 встречи, модели фидбека
    conflicts/      — стили поведения, разрешение конфликтов
    decomposition/  — декомпозиция и оценка задач
    processes/      — гильдии, Team Topologies, Tech Radar
    people/         — найм, оценка, здоровье команды
  components/       — переиспользуемые компоненты
  App.tsx           — роутинг и навигация
```
