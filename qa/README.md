# QA Playground

Тестирование ПО — от теории и тест-дизайна до автоматизации, CI/CD и специализированных видов тестирования.

## 🎯 Чему учит

- **Теория тестирования**: уровни, виды, принципы тестирования
- **Тест-дизайн**: эквивалентные классы, граничные значения, pairwise, decision table
- **Процессы**: баг-репорты, тест-планы, чек-листы, приёмка
- **Практика**: тестирование Web (UI, кроссбраузерность) и API (REST, статусы, контракты)
- **Автоматизация**: основы, пирамида тестирования, архитектура фреймворка, PageObject
- **Метрики и CI/CD**: QA-метрики, интеграция тестов в pipeline
- **Специализация**: мобильное тестирование, безопасность, нагрузка

## 📋 Пререквизиты

- Базовое понимание веб-приложений (HTTP, HTML, API)
- Знакомство с DevTools (Network, Console, Elements)
- Для автоматизации: базовые навыки программирования (JS/Python/Java)

## 🗺️ Рекомендуемый порядок

| #  | Раздел | Маршрут | Уровень |
|----|--------|---------|---------|
| 1  | Теория тестирования | `/fundamentals/basics` | 🟢 Базовый |
| 2  | Тест-дизайн | `/fundamentals/test-design` | 🟢 Базовый |
| 3  | Баг-репорты | `/process/bug-reporting` | 🟢 Базовый |
| 4  | Тест-план и чек-листы | `/process/test-plan` | 🟢 Базовый |
| 5  | Тестирование Web | `/practice/web-testing` | 🟡 Средний |
| 6  | Тестирование API | `/practice/api-testing` | 🟡 Средний |
| 7  | Основы автоматизации | `/automation/basics` | 🟡 Средний |
| 8  | Пирамида тестирования | `/automation/pyramid` | 🟡 Средний |
| 9  | Архитектура и Flaky | `/automation/architecture` | 🔴 Продвинутый |
| 10 | QA-метрики | `/advanced/metrics` | 🟡 Средний |
| 11 | CI/CD и тесты | `/advanced/cicd` | 🔴 Продвинутый |
| 12 | Mobile, Security, Perf | `/specialized/testing` | 🔴 Продвинутый |

### Условные обозначения уровней
- 🟢 **Базовый** — теория, процессы, ручное тестирование
- 🟡 **Средний** — практика Web/API, основы автоматизации
- 🔴 **Продвинутый** — архитектура автотестов, CI/CD, специализация

### Карьерные треки

| Трек | Маршруты |
|------|----------|
| Manual QA | №1-6, 10 |
| Automation QA | №1-2, 5-9, 11 |
| QA Lead | все + метрики и CI/CD |

## 📚 Основные темы

### Основы
- **Теория** — уровни тестирования (unit/integration/system/acceptance), виды (smoke, regression, sanity), 7 принципов ISTQB
- **Тест-дизайн** — эквивалентные классы, граничные значения, pairwise, decision table, state transition

### Процессы
- **Баг-репорты** — структура, severity vs priority, шаблоны, жизненный цикл бага
- **Тест-план** — test strategy vs test plan, чек-листы, traceability matrix

### Практика
- **Web** — DevTools, кроссбраузерность, responsive, формы, навигация
- **API** — REST, статусы HTTP, Postman/Newman, контракты, mock-серверы

### Автоматизация
- **Основы** — зачем автоматизировать, ROI, выбор инструмента
- **Пирамида** — unit vs integration vs E2E, anti-patterns (ice cream cone)
- **Архитектура** — PageObject, селекторы, Flaky тесты, тестовые среды

### Продвинутое
- **QA-метрики** — defect density, test coverage, escape rate, MTTR
- **CI/CD** — интеграция тестов, gates, параллелизация, policy

### Специализация
- **Mobile** — эмуляторы, device farms, OS-специфика, чек-листы
- **Security** — OWASP Top 10, API security, приоритеты
- **Performance** — типы нагрузки, метрики (RPS, p99, Apdex), инструменты

## 🎤 Подготовка к собеседованию

- Чем отличается verification от validation?
- Назовите техники тест-дизайна и приведите пример для поля e-mail
- Пирамида тестирования — что на каждом уровне и почему?
- Что такое Flaky тест? Как с ним бороться?
- Как встроить тесты в CI/CD pipeline?
- OWASP Top 10 — назовите 3 уязвимости и как их тестировать

## ➡️ Что дальше

- [JS Playground](../js/) — для автоматизации на JavaScript
- [React Playground](../react/) — тестирование React-компонентов (Vitest + RTL)
- [Project Playground](../project/) — процессы и метрики проекта

## 🛠 Запуск

```bash
cd playgrounds/qa
npm install
npm run dev
# → http://localhost:3255
```

## 📁 Структура

```
src/
  pages/
    fundamentals/   — теория, тест-дизайн
    process/        — баг-репорты, тест-план
    practice/       — Web, API тестирование
    automation/     — основы, пирамида, архитектура
    advanced/       — метрики, CI/CD
    specialized/    — mobile, security, performance
  components/       — переиспользуемые компоненты
  App.tsx           — роутинг и навигация
```
