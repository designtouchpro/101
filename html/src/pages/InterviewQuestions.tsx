import { useState } from 'react'

interface InterviewItem {
  q: string
  a: string
}

const categories: { title: string; icon: string; items: InterviewItem[] }[] = [
  {
    title: 'Основы и Семантика',
    icon: '🏗️',
    items: [
      {
        q: 'Зачем нужен DOCTYPE?',
        a: '<!DOCTYPE html> говорит браузеру использовать стандартный (standards) режим рендеринга. Без него браузер переключается в quirks mode — эмулирует баги старых браузеров (IE5). В quirks mode: другой box model, другие правила наследования, некоторые CSS-свойства работают иначе. DOCTYPE html (HTML5) — самый короткий, включает стандартный режим во всех браузерах. Не является HTML-тегом — это инструкция для парсера.'
      },
      {
        q: 'Семантический HTML — зачем? Какие элементы использовать?',
        a: 'Семантические элементы передают ЗНАЧЕНИЕ контента, а не просто внешний вид. Зачем: 1) Accessibility — скринридеры понимают структуру. 2) SEO — поисковики лучше индексируют. 3) Читаемость кода. Элементы: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>, <figure>/<figcaption>, <time>, <mark>, <details>/<summary>. Антипаттерн: <div class="header"> вместо <header>. <article> — самодостаточный контент. <section> — тематическая группировка.'
      },
      {
        q: 'Разница между <article>, <section> и <div>?',
        a: '<article> — самодостаточный контент, который можно извлечь и он будет иметь смысл отдельно (пост, комментарий, виджет). <section> — тематическая группировка контента, обычно с заголовком. <div> — нет семантики, чисто для стилизации/группировки. Правило: если контент имеет смысл сам по себе → article. Если это раздел страницы с заголовком → section. Если просто обёртка для CSS → div.'
      },
      {
        q: 'Что такое Critical Rendering Path (CRP)?',
        a: 'CRP — последовательность шагов браузера от получения HTML до отрисовки пикселей: 1) Парсинг HTML → DOM-дерево. 2) Парсинг CSS → CSSOM. 3) DOM + CSSOM → Render Tree. 4) Layout (Reflow) — вычисление позиций и размеров. 5) Paint — рисование пикселей. 6) Composite — слои объединяются. Оптимизация: минимизировать CSS/JS, использовать async/defer для скриптов, critical CSS inline, preload ключевых ресурсов.'
      },
    ]
  },
  {
    title: 'Формы и Валидация',
    icon: '📝',
    items: [
      {
        q: 'Типы input в HTML5. Какие самые полезные?',
        a: 'HTML5 добавил: email (валидация email), url, tel, number (min/max/step), range (слайдер), date/time/datetime-local, color, search. Полезные: email — клавиатура с @, автовалидация. number — стрелки, min/max. date — нативный пикер. tel — цифровая клавиатура на мобильных. Валидация: pattern="regex" для кастомных правил. inputmode — подсказка для мобильной клавиатуры (numeric, decimal, email).'
      },
      {
        q: 'HTML5 валидация форм — как работает?',
        a: 'Встроенные атрибуты: required, minlength/maxlength, min/max, pattern (regex), type (email/url). API: checkValidity() → boolean, reportValidity() → показывает tooltip, setCustomValidity("message") → кастомная ошибка. CSS-псевдоклассы: :valid, :invalid, :required, :optional, :in-range, :out-of-range. novalidate на <form> отключает встроенную валидацию (для кастомной). formnovalidate на кнопке — отключает для конкретной submit.'
      },
      {
        q: 'Что такое <dialog> и Popover API?',
        a: '<dialog> — нативный модальный/не-модальный диалог. dialog.show() — обычный, dialog.showModal() — модальный с ::backdrop. Закрытие: dialog.close(), Esc (для modal). Popover API: атрибут popover на любом элементе. popovertarget на кнопке-тригере. Типы: popover="auto" (закрывается по клику вне), popover="manual" (только программно). Преимущества: не нужен JS для toggle, правильный z-index (top layer), accessibility из коробки.'
      },
    ]
  },
  {
    title: 'Загрузка ресурсов',
    icon: '⚡',
    items: [
      {
        q: 'Разница между async и defer для <script>?',
        a: 'Без async/defer: парсинг HTML останавливается, скрипт загружается и выполняется, парсинг продолжается. defer: загрузка параллельно парсингу, выполнение ПОСЛЕ полного парсинга HTML, ДО DOMContentLoaded. Порядок скриптов сохраняется. async: загрузка параллельно, выполнение СРАЗУ после загрузки (может прервать парсинг). Порядок НЕ гарантирован. Правило: defer для скриптов, зависящих от DOM. async для независимых (аналитика). type="module" ведёт себя как defer по умолчанию.'
      },
      {
        q: 'Что такое preload, prefetch, preconnect?',
        a: '<link rel="preload"> — загрузить ресурс СЕЙЧАС (критический). must-as (font, style, script, image). Используется для шрифтов, critical CSS, LCP изображений. <link rel="prefetch"> — загрузить ресурс для СЛЕДУЮЩЕЙ навигации (низкий приоритет). <link rel="preconnect"> — установить соединение заранее (DNS + TCP + TLS). Для CDN, API серверов. <link rel="dns-prefetch"> — только DNS. modulepreload — preload для ES modules.'
      },
      {
        q: 'Responsive images: srcset, sizes, <picture>?',
        a: 'srcset — набор изображений разных размеров: <img srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w" sizes="(max-width: 600px) 100vw, 50vw">. Браузер выбирает оптимальное. sizes — подсказка какое место займёт изображение. <picture> — для art direction (разные кадрировки) и форматов: <source srcset="img.avif" type="image/avif"><source srcset="img.webp" type="image/webp"><img src="img.jpg">. loading="lazy" — ленивая загрузка. decoding="async" — не блокирует рендер.'
      },
    ]
  },
  {
    title: 'Доступность и SEO',
    icon: '♿',
    items: [
      {
        q: 'ARIA-атрибуты — когда и как использовать?',
        a: 'ARIA (Accessible Rich Internet Applications) — атрибуты для скринридеров. Главное правило: НЕ используйте ARIA если есть нативный HTML-элемент (button вместо div role="button"). Типы: 1) role — роль элемента (tab, dialog, alert). 2) aria-label — текстовая метка. 3) aria-hidden="true" — скрыть от скринридеров. 4) aria-live="polite" — объявить динамический контент. 5) aria-expanded — состояние меню/аккордеона. aria-describedby, aria-labelledby — ссылки на ID.'
      },
      {
        q: 'Мета-теги для SEO — какие обязательны?',
        a: 'Обязательные: <meta charset="UTF-8">, <meta name="viewport" content="width=device-width, initial-scale=1.0">, <title>. Важные для SEO: <meta name="description">, canonical URL: <link rel="canonical">. Open Graph (для соцсетей): og:title, og:description, og:image, og:url. Twitter Cards: twitter:card, twitter:title, twitter:image. Индексация: <meta name="robots" content="noindex,nofollow">. Favicon: <link rel="icon">.'
      },
      {
        q: 'Что такое Web Components?',
        a: 'Web Components — нативные переиспользуемые компоненты из 3 технологий: 1) Custom Elements — class MyEl extends HTMLElement. customElements.define(\'my-el\', MyEl). Lifecycle: connectedCallback, disconnectedCallback, attributeChangedCallback. 2) Shadow DOM — инкапсулированный DOM с изолированными стилями. this.attachShadow({mode: \'open\'}). 3) <template>/<slot> — шаблоны с именованными слотами. Плюсы: фреймворк-независимые, нативные. Минусы: вербозные, нет реактивности, SSR сложен.'
      },
    ]
  },
  {
    title: 'Хранение данных и API',
    icon: '💾',
    items: [
      {
        q: 'localStorage vs sessionStorage vs cookies?',
        a: 'localStorage: до 5-10MB, не отправляется на сервер, живёт пока не удалено вручную. sessionStorage: до 5MB, не отправляется, живёт до закрытия вкладки. Cookies: до 4KB, отправляются с каждым HTTP-запросом, управление сроком (Expires/Max-Age), HttpOnly (защита от XSS), SameSite. IndexedDB: десятки MB+, асинхронный, структурированные данные. Правило: cookies для auth-токенов (HttpOnly), localStorage для настроек, sessionStorage для временных данных, IndexedDB для больших данных.'
      },
      {
        q: 'Что такое data-атрибуты? Примеры.',
        a: 'data-* атрибуты хранят кастомные данные на HTML-элементах. Доступ: element.dataset.userId (data-user-id). CSS: [data-status="active"] { color: green }. Примеры: data-id, data-role, data-tooltip, data-action. Удобно для: JS-обработчиков (делегирование событий), CSS-стилизации по состоянию, хранения метаданных без лишних классов. Ограничения: всегда строка, доступны пользователю в DevTools (не хранить секреты).'
      },
      {
        q: 'Canvas vs SVG — когда что использовать?',
        a: 'Canvas: растровый (пиксели), JS API для рисования, нет DOM-элементов → быстрый для множества объектов. Идеален: игры, визуализация данных (тысячи точек), обработка изображений, анимации с множеством объектов. SVG: векторный (XML), каждый элемент — DOM-узел, стилизуется CSS, поддерживает события. Идеален: иконки, логотипы, графики (мало элементов), интерактивные диаграммы, адаптивная графика. Правило: мало интерактивных элементов → SVG, много объектов без взаимодействия → Canvas.'
      },
    ]
  },
]

export default function InterviewQuestions() {
  const [openCategories, setOpenCategories] = useState<Set<number>>(() => new Set([0]))

  const toggleCategory = (idx: number) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="page-container">
      <h1>🎯 Вопросы для собеседования — HTML</h1>
      <p className="page-description">
        Самые популярные вопросы по HTML на frontend-собеседованиях.
        Кликните на вопрос, чтобы увидеть ответ.
      </p>

      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="card" style={{ marginBottom: '16px' }}>
          <div 
            className="card-header" 
            style={{ cursor: 'pointer' }}
            onClick={() => toggleCategory(catIdx)}
          >
            <span className="card-title">{cat.icon} {cat.title}</span>
            <span className="card-badge">{cat.items.length} вопросов</span>
          </div>

          {openCategories.has(catIdx) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              {cat.items.map((item, i) => (
                <details key={i} className="interview-question">
                  <summary>{item.q}</summary>
                  <div style={{
                    padding: '14px 16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    borderLeft: '3px solid var(--accent)',
                    marginLeft: '16px',
                    marginTop: '8px'
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
