# HTML Playground

Интерактивная площадка для изучения современного HTML5+ — от семантической разметки до продвинутых API платформы.

## 🎯 Чему учит

- **Семантика и структура**: правильные теги, landmark-ы, document outline
- **Формы**: все типы `<input>`, нативная валидация, продакшен-паттерны (autofill, mobile UX, recovery)
- **Интерактивность**: `<dialog>`, Popover API, `<template>`, `<slot>`, Web Components
- **Атрибуты и метаданные**: data-*, inert, loading, fetchpriority; meta-теги, SEO, JSON-LD
- **Медиа**: `<picture>`, `<video>`, `<audio>`, adaptive streaming
- **Доступность (a11y)**: landmarks, ARIA, фокус, клавиатурная навигация, live regions
- **Загрузка ресурсов**: `<script>` defer/async/module, `<link>` preload/prefetch/modulepreload

## 📋 Пререквизиты

- Базовое понимание структуры HTML-документа
- Браузер с DevTools

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень |
|---|--------|---------|---------|
| 1 | Главная (обзор) | `/` | 🟢 Базовый |
| 2 | Timeline HTML | `/timeline` | 🟢 Базовый |
| 3 | Семантика | `/semantic` | 🟢 Базовый |
| 4 | Media элементы | `/media` | 🟢 Базовый |
| 5 | Типы Input | `/input-types` | 🟢 Базовый |
| 6 | Валидация форм | `/forms-validation` | 🟡 Средний |
| 7 | Формы в продакшене | `/forms-production` | 🟡 Средний |
| 8 | Meta теги | `/meta-tags` | 🟡 Средний |
| 9 | Новые атрибуты | `/new-attributes` | 🟡 Средний |
| 10 | Script & Link | `/script-loading` | 🟡 Средний |
| 11 | Dialog & Popover | `/dialog-popover` | 🟡 Средний |
| 12 | Template & Slot | `/template-slot` | 🔴 Продвинутый |
| 13 | SEO и метаданные | `/seo-metadata` | 🔴 Продвинутый |
| 14 | A11y | `/accessibility` | 🔴 Продвинутый |
| 15 | Вопросы к собеседованию | `/interview` | 🎤 Собеседование |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные концепции, подходит для начинающих
- 🟡 **Средний** — требует понимания основ, практические паттерны
- 🔴 **Продвинутый** — глубокие темы, edge cases, платформенные API

## 📚 Основные темы

### Фундамент
- **Timeline HTML** — эволюция HTML от 1.0 до Living Standard
- **Семантика** — правильный выбор тегов, document outline, landmarks
- **Media** — picture/source, video/audio, responsive images

### Элементы форм
- **Типы Input** — все 22+ типа input с демонстрацией и поддержкой
- **Валидация форм** — Constraint Validation API, кастомные сообщения
- **Формы в продакшене** — mobile UX, autofill, accessible errors, recovery states

### Интерактивность
- **Dialog & Popover** — нативные модалки и поповеры без JS-библиотек
- **Template & Slot** — декларативный Shadow DOM, Web Components

### Атрибуты и метаданные
- **Новые атрибуты** — inert, loading, fetchpriority, blocking, data-*
- **Meta теги** — viewport, charset, http-equiv, theme-color
- **SEO и метаданные** — Open Graph, Twitter Cards, JSON-LD, hreflang
- **Script & Link** — defer/async/module, preload/prefetch, Critical CSS

### Доступность
- **A11y** — landmarks, ARIA, фокус, клавиатура, live regions, тестирование

## 🎤 Подготовка к собеседованию

Раздел `/interview` содержит типовые вопросы. Ключевые темы:
- Семантика vs `<div>`-вёрстка
- Доступность: landmarks, фокус, скринридеры
- Формы: нативная валидация vs кастомная
- Оптимизация загрузки: defer/async, preload, lazy loading

## ➡️ Что дальше

- [CSS Playground](../css/) — стилизация, анимации, Grid/Flexbox
- [JS Playground](../js/) — поведение, DOM-манипуляции, Event Loop

## 🛠 Запуск

```bash
cd playgrounds/html
npm install
npm run dev
# → http://localhost:3211
```

## 📁 Структура

```
src/
  pages/       — страницы по темам
  components/  — переиспользуемые компоненты
  App.tsx      — роутинг и навигация
```
