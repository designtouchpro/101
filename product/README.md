# Product Playground

Продуктовый менеджмент — от метрик и discovery до стратегии, ценообразования и исследований.

## 🎯 Чему учит

- **Метрики**: AARRR-воронка, unit-экономика, North Star Metric
- **Терминология**: словарь продакта, роли в продуктовой команде
- **Discovery**: Product Discovery, Roadmapping, User Story Mapping
- **Аналитика**: A/B тестирование, когортный анализ
- **Исследования**: методы исследований, эксперименты, размер выборки
- **Стратегия**: приоритизация, Go-to-Market, финансовая модель, Pricing
- **Собеседование**: типовые вопросы и кейсы

## 📋 Пререквизиты

- Знакомство с базовыми метриками (конверсия, retention)
- Понимание user-centered design подхода
- [Marketing Playground](../marketing/) — смежная область

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Словарь продакта | `/terminology/terms` | 🟢 Базовый |
| 2  | Роли в продукте | `/terminology/roles` | 🟢 Базовый |
| 3  | AARRR-воронка | `/metrics/aarrr` | 🟢 Базовый |
| 4  | Unit-экономика | `/metrics/unit-economics` | 🟡 Средний |
| 5  | North Star Metric | `/metrics/north-star` | 🟡 Средний |
| 6  | Product Discovery | `/processes/discovery` | 🟡 Средний |
| 7  | Roadmapping | `/processes/roadmap` | 🟡 Средний |
| 8  | User Story Mapping | `/processes/story-mapping` | 🟡 Средний |
| 9  | A/B тестирование | `/analytics/ab-testing` | 🟡 Средний |
| 10 | Когортный анализ | `/analytics/cohorts` | 🔴 Продвинутый |
| 11 | Исследования и эксперименты | `/research/experiments` | 🟡 Средний |
| 12 | Приоритизация | `/strategy/prioritization` | 🟡 Средний |
| 13 | Go-to-Market | `/strategy/go-to-market` | 🔴 Продвинутый |
| 14 | Финансовая модель | `/strategy/financial-model` | 🔴 Продвинутый |
| 15 | Pricing и Packaging | `/strategy/pricing` | 🔴 Продвинутый |
| 16 | Вопросы и ответы | `/interview/questions` | 🟡 Средний |

### Условные обозначения уровней
- 🟢 **Базовый** — терминология и ключевые фреймворки
- 🟡 **Средний** — рабочие процессы и инструменты продакта
- 🔴 **Продвинутый** — стратегия, финансы, ценообразование

## 📚 Основные темы

### Метрики
- **AARRR** — воронка Acquisition → Revenue, метрики каждого этапа
- **Unit-экономика** — CAC, LTV, Payback Period, когортный ROI
- **North Star Metric** — как выбрать и декомпозировать ключевую метрику

### Терминология
- **Словарь** — MVP, PMF, DAU/MAU, Churn, NPS и десятки других терминов
- **Роли** — Product Manager, Product Owner, Product Analyst, UX Researcher

### Процессы
- **Discovery** — Opportunity Solution Tree, Jobs-to-be-Done, Assumption Mapping
- **Roadmapping** — Now-Next-Later, RICE scoring, quarterly planning
- **User Story Mapping** — backbone, walking skeleton, release slicing

### Аналитика
- **A/B тестирование** — гипотеза, MDE, significance, guardrail-метрики
- **Когортный анализ** — retention curves, cohort heatmap, сезонность

### Исследования
- **Методы** — интервью, опросы, usability tests, card sorting
- **Эксперименты** — гипотезы, типы экспериментов, размер выборки

### Стратегия
- **Приоритизация** — RICE, ICE, Kano, MoSCoW, weighted scoring
- **Go-to-Market** — launch playbook, segments, messaging, channels
- **Финансовая модель** — revenue model, unit economics, P&L
- **Pricing** — модели ценообразования, packaging, stage-based стратегия

## 🎤 Подготовка к собеседованию

- Раздел «Вопросы и ответы» (`/interview/questions`) — типовые кейсы
- Как приоритизировать фичи? Расскажите про RICE
- Как вы выбираете North Star Metric?
- Спроектируйте Go-to-Market для нового продукта
- Как понять, что продукт достиг Product-Market Fit?
- Когортный анализ: что он показывает и как действовать по результатам?

## ➡️ Что дальше

- [Marketing Playground](../marketing/) — каналы, воронка, атрибуция
- [Project Playground](../project/) — управление проектами и delivery
- [TeamLead Playground](../teamlead/) — если переходите в менеджмент

## 🛠 Запуск

```bash
cd playgrounds/product
npm install
npm run dev
# → http://localhost:3252
```

## 📁 Структура

```
src/
  pages/
    metrics/        — AARRR, Unit-экономика, North Star
    terminology/    — словарь, роли
    processes/      — Discovery, Roadmap, Story Mapping
    analytics/      — A/B тесты, когорты
    research/       — исследования и эксперименты
    strategy/       — приоритизация, GTM, финмодель, pricing
    interview/      — подготовка к собеседованиям
  components/       — переиспользуемые компоненты
  App.tsx           — роутинг и навигация
```
