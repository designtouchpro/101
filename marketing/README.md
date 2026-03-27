# Marketing Playground

Интерактивный курс по маркетингу — от Marketing Mix и STP до атрибуции, lifecycle и CRM.

## 🎯 Чему учит

- **Marketing Mix (4P/7P)**: Product, Price, Place, Promotion + расширенная модель
- **STP-анализ**: сегментация, таргетирование, позиционирование
- **Digital-каналы**: платные, органические, owned-каналы, воронка
- **Аналитика**: метрики маркетинга, A/B тесты, UTM, атрибуция
- **Бренд**: бренд-платформа, контент-стратегия
- **Performance**: таргетинг, аудитории, unit-экономика
- **Lifecycle и CRM**: AARRR, retention, email-кампании, когортный анализ

## 📋 Пререквизиты

- Базовое понимание бизнес-процессов
- Знание метрик (конверсия, CAC, LTV) — на начальном уровне
- [Product Playground](../product/) — смежная область

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Marketing Mix (4P/7P) | `/fundamentals/marketing-mix` | 🟢 Базовый |
| 2  | STP-анализ | `/fundamentals/stp` | 🟢 Базовый |
| 3  | Каналы продвижения | `/digital/channels` | 🟢 Базовый |
| 4  | Маркетинговая воронка | `/digital/funnel` | 🟡 Средний |
| 5  | Метрики маркетинга | `/analytics/metrics` | 🟡 Средний |
| 6  | A/B тесты и UTM | `/analytics/ab-testing` | 🟡 Средний |
| 7  | Бренд-платформа | `/brand/platform` | 🟡 Средний |
| 8  | Контент-стратегия | `/brand/content` | 🟡 Средний |
| 9  | Таргетинг и аудитории | `/performance/targeting` | 🟡 Средний |
| 10 | Unit-экономика | `/performance/unit-economics` | 🔴 Продвинутый |
| 11 | Атрибуция и MarTech | `/analytics/attribution` | 🔴 Продвинутый |
| 12 | Lifecycle и CRM | `/lifecycle/crm` | 🔴 Продвинутый |
| 13 | Вопросы и ответы | `/interview/questions` | 🟡 Средний |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции маркетинга
- 🟡 **Средний** — инструменты и аналитика
- 🔴 **Продвинутый** — атрибуция, unit-экономика, lifecycle

## 📚 Основные темы

### Основы
- **Marketing Mix** — 4P/7P, позиционирование продукта на рынке
- **STP** — сегментация, таргетирование, позиционирование

### Digital
- **Каналы** — SEO, контекстная реклама, SMM, email, мессенджеры
- **Воронка** — awareness → interest → desire → action, конверсия между этапами

### Аналитика
- **Метрики** — CPA, CPL, ROAS, CTR, CR и их связь
- **A/B тесты** — гипотезы, статзначимость, UTM-разметка
- **Атрибуция** — модели атрибуции, incrementality, MarTech stack

### Бренд
- **Бренд-платформа** — миссия, ценности, позиционирование, tone of voice
- **Контент-стратегия** — контент-план, форматы, дистрибуция

### Performance
- **Таргетинг** — аудитории, look-alike, ретаргетинг
- **Unit-экономика** — CAC, LTV, Payback Period, когортный ROI

### Lifecycle
- **AARRR и CRM** — жизненный цикл пользователя, retention, email-кампании

## 🎤 Подготовка к собеседованию

- Раздел «Вопросы и ответы» (`/interview/questions`) с типовыми вопросами
- Как посчитать CAC и LTV? Что такое Payback Period?
- Какая модель атрибуции лучше и почему нет «лучшей»?
- Как выстроить воронку для нового продукта?
- Что такое Product-Market Fit с точки зрения маркетинга?

## ➡️ Что дальше

- [Product Playground](../product/) — метрики, стратегия, исследования
- [Project Playground](../project/) — управление проектами и запусками
- [TeamLead Playground](../teamlead/) — если переходите в управление

## 🛠 Запуск

```bash
cd playgrounds/marketing
npm install
npm run dev
# → http://localhost:3254
```

## 📁 Структура

```
src/
  pages/
    fundamentals/   — Marketing Mix, STP
    digital/        — каналы, воронка
    analytics/      — метрики, A/B тесты, атрибуция
    brand/          — бренд-платформа, контент
    performance/    — таргетинг, unit-экономика
    lifecycle/      — lifecycle и CRM
    interview/      — подготовка к собеседованиям
  components/       — переиспользуемые компоненты
  App.tsx           — роутинг и навигация
```
