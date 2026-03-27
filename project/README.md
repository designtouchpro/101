# Project Management Playground

Управление IT-проектами — от методологий и планирования до оценки, метрик, рисков и исполнения.

## 🎯 Чему учит

- **Методологии**: Scrum vs Kanban, Waterfall, гибридные подходы
- **Планирование**: Project Charter, управление scope, бюджетирование
- **Оценка**: Story Points, Planning Poker, T-shirt sizing, Velocity & Capacity
- **Метрики**: Burndown/Burnup charts, Lead & Cycle Time
- **Риски**: матрица рисков, зависимости, CPM, управление изменениями
- **Коммуникация**: Stakeholder Map, типы встреч (daily, retro, review)
- **Артефакты**: WBS-декомпозиция, DoR & DoD
- **Исполнение**: RACI, RAID, escalation, status reporting

## 📋 Пререквизиты

- Знакомство с Agile-подходом (Scrum или Kanban)
- Понимание ролей в команде (PO, SM, dev, QA)
- [Product Playground](../product/) — смежная область

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Scrum vs Kanban | `/methodologies/scrum-kanban` | 🟢 Базовый |
| 2  | Waterfall & Hybrid | `/methodologies/waterfall` | 🟢 Базовый |
| 3  | Project Charter | `/planning/charter` | 🟢 Базовый |
| 4  | Управление Scope | `/planning/scope` | 🟡 Средний |
| 5  | Бюджетирование | `/planning/budget` | 🟡 Средний |
| 6  | Техники оценки | `/estimation/techniques` | 🟢 Базовый |
| 7  | Velocity & Capacity | `/estimation/velocity` | 🟡 Средний |
| 8  | Burndown & Burnup | `/metrics/burndown` | 🟡 Средний |
| 9  | Lead & Cycle Time | `/metrics/lead-cycle` | 🟡 Средний |
| 10 | Матрица рисков | `/risks/matrix` | 🟡 Средний |
| 11 | Зависимости и изменения | `/risks/change-management` | 🔴 Продвинутый |
| 12 | Stakeholder Map | `/communication/stakeholders` | 🟡 Средний |
| 13 | Типы встреч | `/communication/meetings` | 🟢 Базовый |
| 14 | WBS-декомпозиция | `/artifacts/wbs` | 🟡 Средний |
| 15 | DoR & DoD | `/artifacts/dor-dod` | 🟢 Базовый |
| 16 | Исполнение и контроль | `/execution/control` | 🔴 Продвинутый |
| 17 | Вопросы и ответы | `/interview/questions` | 🟡 Средний |

### Условные обозначения уровней
- 🟢 **Базовый** — методологии, артефакты, базовое планирование
- 🟡 **Средний** — метрики, оценка, стейкхолдеры
- 🔴 **Продвинутый** — управление рисками, исполнение, контроль

### Выбор методологии

| Контекст | Рекомендация |
|----------|-------------|
| Стабильные требования, фиксированный scope | Waterfall |
| Быстрая итерация, R&D | Scrum |
| Поток задач, поддержка, ops | Kanban |
| Крупный enterprise + итерации | Hybrid (Scrumban, SAFe) |

## 📚 Основные темы

### Методологии
- **Scrum vs Kanban** — церемонии, роли, WIP-лимиты, отличия и сходства
- **Waterfall & Hybrid** — когда каскадный подход уместен, гибридные модели

### Планирование
- **Project Charter** — цель, scope, milestones, стейкхолдеры
- **Scope** — scope creep, change requests, MoSCoW
- **Бюджет** — методы оценки, EVM (Earned Value)

### Оценка
- **Техники** — Story Points, Planning Poker, T-shirt sizing, аналоговая оценка
- **Velocity & Capacity** — прогнозирование, факт vs план

### Метрики
- **Burndown/Burnup** — визуализация прогресса спринта и релиза
- **Lead & Cycle Time** — метрики потока (flow metrics), bottleneck analysis

### Риски
- **Матрица рисков** — вероятность × воздействие, стратегии ответа
- **Зависимости и изменения** — CPM, EMV, PERT, fast tracking vs crashing

### Коммуникация
- **Stakeholder Map** — Power/Interest matrix, стратегии взаимодействия
- **Встречи** — daily standup, sprint review, retro, planning, refinement

### Артефакты
- **WBS** — декомпозиция работ, deliverable-ориентированный подход
- **DoR & DoD** — Definition of Ready / Definition of Done

### Исполнение
- **RACI, RAID, escalation** — контроль исполнения, статус-отчёты, эскалация

## 🎤 Подготовка к собеседованию

- Раздел «Вопросы и ответы» (`/interview/questions`) — типовые вопросы PM
- Как выбрать между Scrum и Kanban?
- Что делать, если scope растёт, а дедлайн фиксирован?
- Как управлять рисками в Agile?
- Что такое Earned Value Management?
- Как провести эффективную ретроспективу?

## ➡️ Что дальше

- [Product Playground](../product/) — продуктовая стратегия и метрики
- [TeamLead Playground](../teamlead/) — управление людьми и командой
- [Marketing Playground](../marketing/) — если проект связан с GTM

## 🛠 Запуск

```bash
cd playgrounds/project
npm install
npm run dev
# → http://localhost:3253
```

## 📁 Структура

```
src/
  pages/
    methodologies/   — Scrum, Kanban, Waterfall
    planning/        — Charter, Scope, Budget
    estimation/      — техники оценки, Velocity
    metrics/         — Burndown, Lead/Cycle Time
    risks/           — матрица рисков, зависимости
    communication/   — стейкхолдеры, встречи
    artifacts/       — WBS, DoR/DoD
    execution/       — RACI, RAID, контроль
    interview/       — подготовка к собеседованиям
  components/        — переиспользуемые компоненты
  App.tsx            — роутинг и навигация
```
