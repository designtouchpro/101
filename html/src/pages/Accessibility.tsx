import CodeBlock from '../components/CodeBlock'

export default function Accessibility() {
  return (
    <div className="page-container">
      <h1>♿ Доступность (a11y)</h1>
      <p className="page-description">
        Landmarks, порядок фокуса, лейблы, live-регионы, навигация с клавиатуры и тестирование доступности.
      </p>

      <LandmarksSection />
      <LabelsSection />
      <FocusOrderSection />
      <KeyboardSection />
      <LiveRegionsSection />
      <CommonFailures />
      <TestingSection />
    </div>
  )
}

/* ─── Landmarks ───────────────────────────────────────── */

function LandmarksSection() {
  const code = `<!-- Правильная структура landmarks -->
<body>
  <header>                           <!-- banner -->
    <nav aria-label="Главная">       <!-- navigation -->
      <ul>...</ul>
    </nav>
  </header>

  <main>                             <!-- main (один на странице) -->
    <h1>Заголовок страницы</h1>

    <section aria-labelledby="news-heading">  <!-- region -->
      <h2 id="news-heading">Новости</h2>
      <article>...</article>          <!-- нет implicit-роли landmark -->
    </section>

    <form aria-label="Поиск">         <!-- form (когда есть label) -->
      <input type="search" />
    </form>
  </main>

  <aside aria-label="Связанные статьи"> <!-- complementary -->
    ...
  </aside>

  <footer>                            <!-- contentinfo -->
    <nav aria-label="Подвал">          <!-- вторая navigation -->
      <ul>...</ul>
    </nav>
  </footer>
</body>`

  return (
    <div className="card">
      <h2>🏗️ Landmarks — ориентиры страницы</h2>

      <p>
        Скринридеры строят карту страницы по landmark-ролям. Если ролей нет —
        пользователь слышит сплошной поток текста без структуры.
      </p>

      <table className="comparison-table" style={{ width: '100%', marginTop: '12px' }}>
        <thead>
          <tr>
            <th>Элемент</th>
            <th>ARIA-роль</th>
            <th>Когда становится landmark</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>&lt;header&gt;</code></td><td>banner</td><td>Если не вложен в article/section</td></tr>
          <tr><td><code>&lt;nav&gt;</code></td><td>navigation</td><td>Всегда. При нескольких — добавьте <code>aria-label</code></td></tr>
          <tr><td><code>&lt;main&gt;</code></td><td>main</td><td>Всегда. Один на страницу</td></tr>
          <tr><td><code>&lt;aside&gt;</code></td><td>complementary</td><td>Если не вложен в article/section</td></tr>
          <tr><td><code>&lt;footer&gt;</code></td><td>contentinfo</td><td>Если не вложен в article/section</td></tr>
          <tr><td><code>&lt;section&gt;</code></td><td>region</td><td>Только если есть <code>aria-labelledby</code> или <code>aria-label</code></td></tr>
          <tr><td><code>&lt;form&gt;</code></td><td>form</td><td>Только если есть accessible name</td></tr>
          <tr><td><code>&lt;search&gt;</code></td><td>search</td><td>Всегда (HTML Living Standard)</td></tr>
        </tbody>
      </table>

      <CodeBlock code={code} language="html" title="Правильная структура landmarks" />

      <div className="info-box" style={{ marginTop: '12px' }}>
        <strong>⚠️ Частая ошибка</strong>
        <p><code>&lt;div role="navigation"&gt;</code> — не нужно, если можно просто использовать <code>&lt;nav&gt;</code>. 
           Нативный семантический элемент всегда предпочтительнее ARIA-роли.</p>
      </div>
    </div>
  )
}

/* ─── Labels ──────────────────────────────────────────── */

function LabelsSection() {
  const labelCode = `<!-- 1. Явная связь через for/id (рекомендуется) -->
<label for="email">Email</label>
<input id="email" type="email" />

<!-- 2. Неявная связь (оборачивание) -->
<label>
  Имя
  <input type="text" />
</label>

<!-- 3. aria-label — когда визуальный лейбл не нужен -->
<button aria-label="Закрыть диалог">✕</button>

<!-- 4. aria-labelledby — связь с существующим элементом -->
<h2 id="billing">Оплата</h2>
<form aria-labelledby="billing">...</form>

<!-- 5. aria-describedby — дополнительное описание -->
<label for="pw">Пароль</label>
<input id="pw" type="password"
       aria-describedby="pw-hint" aria-invalid="false" />
<p id="pw-hint">Минимум 8 символов, одна цифра</p>

<!-- ❌ Плохо: placeholder вместо label -->
<input type="email" placeholder="Email" />
<!-- Placeholder исчезает при вводе, скринридер может игнорировать -->`

  return (
    <div className="card">
      <h2>🏷️ Лейблы и описания</h2>

      <p>
        Каждый интерактивный элемент (input, button, link) обязан иметь accessible name.
        Без него скринридер озвучит «кнопка» или «текстовое поле» без контекста.
      </p>

      <CodeBlock code={labelCode} language="html" title="Способы задать accessible name" />

      <h3 style={{ marginTop: '16px' }}>Приоритет вычисления имени (Accessible Name Computation)</h3>
      <ol className="info-list">
        <li><code>aria-labelledby</code> — самый высокий приоритет</li>
        <li><code>aria-label</code></li>
        <li><code>&lt;label&gt;</code> связанный через <code>for</code></li>
        <li><code>title</code> атрибут (ненадёжный, лучше не полагаться)</li>
        <li><code>placeholder</code> — последнее средство, не замена label</li>
      </ol>
    </div>
  )
}

/* ─── Focus order ─────────────────────────────────────── */

function FocusOrderSection() {
  const focusCode = `<!-- Порядок фокуса следует порядку DOM -->
<nav>
  <a href="/home">Главная</a>      <!-- Tab 1 -->
  <a href="/about">О нас</a>        <!-- Tab 2 -->
</nav>

<main>
  <input type="text" />              <!-- Tab 3 -->
  <button>Отправить</button>         <!-- Tab 4 -->
</main>

<!-- tabindex="0" — включает элемент в порядок фокуса -->
<div tabindex="0" role="button" onclick="handleClick()">
  Кастомная кнопка
</div>

<!-- tabindex="-1" — фокус программно, но НЕ через Tab -->
<div id="modal" tabindex="-1" role="dialog">
  <!-- Фокус переведён сюда через JS: element.focus() -->
</div>

<!-- ❌ tabindex > 0 — НИКОГДА не используйте -->
<!-- Ломает естественный порядок навигации -->
<input tabindex="5" />  <!-- антипаттерн -->`

  const skipLinkCode = `<!-- Skip link — первый элемент в <body> -->
<body>
  <a href="#main-content" class="skip-link">
    Перейти к основному содержимому
  </a>
  <header>...</header>
  <nav>...</nav>
  <main id="main-content" tabindex="-1">
    <!-- tabindex="-1" позволяет принять программный фокус -->
    ...
  </main>
</body>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: 8px 16px;
  background: #000;
  color: #fff;
  z-index: 100;
}
.skip-link:focus {
  top: 0;  /* Появляется при Tab */
}
</style>`

  return (
    <div className="card">
      <h2>🔢 Порядок фокуса</h2>

      <p>
        Tab moves focus through interactive elements in DOM order.
        Правильный порядок фокуса = правильный порядок элементов в разметке.
      </p>

      <CodeBlock code={focusCode} language="html" title="tabindex и порядок фокуса" />
      <CodeBlock code={skipLinkCode} language="html" title="Skip-ссылка" />

      <div className="info-box" style={{ marginTop: '12px' }}>
        <strong>💡 Правило</strong>
        <p>Если визуальный порядок не совпадает с порядком DOM — это баг доступности.
           CSS flexbox <code>order</code> и grid <code>order</code> меняют визуальный порядок, но не фокусный.</p>
      </div>
    </div>
  )
}

/* ─── Keyboard navigation ─────────────────────────────── */

function KeyboardSection() {
  const keyboardCode = `<!-- Нативные элементы уже поддерживают клавиатуру -->
<button>Кнопка</button>           <!-- Enter, Space -->
<a href="/page">Ссылка</a>        <!-- Enter -->
<input type="checkbox" />          <!-- Space -->
<select>...</select>               <!-- Arrow keys, Enter -->
<details><summary>FAQ</summary>    <!-- Enter, Space -->
  Ответ
</details>

<!-- Кастомный элемент — нужно добавить поддержку вручную -->
<div role="button" tabindex="0"
     onkeydown="handleKeyDown(event)"
     onclick="handleClick()">
  Кастомная кнопка
</div>

<script>
function handleKeyDown(e) {
  // Enter и Space должны активировать кнопку
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick()
  }
}
</script>`

  const trapCode = `<!-- Фокусная ловушка для модалки -->
<dialog id="modal">
  <h2>Подтверждение</h2>
  <p>Вы уверены?</p>
  <button id="cancel">Отмена</button>     <!-- первый фокусный -->
  <button id="confirm">Подтвердить</button> <!-- последний фокусный -->
</dialog>

<script>
// <dialog>.showModal() автоматически:
// 1. Создаёт фокусную ловушку (Tab не уходит за dialog)
// 2. Закрывается по Escape
// 3. Возвращает фокус после закрытия

// Для кастомных модалок без <dialog>:
// - Запомните элемент-триггер
// - При открытии: фокус на первый элемент внутри
// - Tab на последнем → фокус на первый (ловушка)
// - Shift+Tab на первом → фокус на последний
// - Escape → закрыть и вернуть фокус на триггер
</script>`

  return (
    <div className="card">
      <h2>⌨️ Навигация с клавиатуры</h2>

      <table className="comparison-table" style={{ width: '100%', marginBottom: '12px' }}>
        <thead>
          <tr><th>Клавиша</th><th>Действие</th></tr>
        </thead>
        <tbody>
          <tr><td><kbd>Tab</kbd></td><td>Следующий интерактивный элемент</td></tr>
          <tr><td><kbd>Shift + Tab</kbd></td><td>Предыдущий интерактивный элемент</td></tr>
          <tr><td><kbd>Enter</kbd></td><td>Активация ссылки, кнопки</td></tr>
          <tr><td><kbd>Space</kbd></td><td>Активация кнопки, чекбокса, toggle</td></tr>
          <tr><td><kbd>Escape</kbd></td><td>Закрытие диалога, попапа</td></tr>
          <tr><td><kbd>Arrow keys</kbd></td><td>Навигация внутри select, radio group, tabs, menu</td></tr>
        </tbody>
      </table>

      <CodeBlock code={keyboardCode} language="html" title="Нативная vs кастомная клавиатурная поддержка" />
      <CodeBlock code={trapCode} language="html" title="Фокусная ловушка в модалках" />
    </div>
  )
}

/* ─── Live regions ────────────────────────────────────── */

function LiveRegionsSection() {
  const liveCode = `<!-- aria-live анонсирует изменения содержимого -->

<!-- polite — ждёт паузы в речи -->
<div aria-live="polite" aria-atomic="true">
  Товаров в корзине: <span id="count">3</span>
</div>

<!-- assertive — прерывает текущую речь (для ошибок) -->
<div role="alert">
  <!-- role="alert" = aria-live="assertive" + aria-atomic="true" -->
  Не удалось сохранить. Проверьте подключение.
</div>

<!-- status — для успешных уведомлений -->
<div role="status">
  <!-- role="status" = aria-live="polite" + aria-atomic="true" -->
  Файл сохранён
</div>

<!-- ❌ Частая ошибка: добавлять aria-live динамически -->
<!-- Регион должен СУЩЕСТВОВАТЬ в DOM до изменения содержимого -->

<!-- Правильно: пустой контейнер в разметке, текст добавляется позже -->
<div id="notification" role="status"></div>
<script>
  // Через JS меняем текст — скринридер озвучит
  document.getElementById('notification').textContent = 'Готово!'
</script>

<!-- ❌ Неправильно: вставить весь элемент вместе с aria-live -->
<!-- container.innerHTML = '<div role="status">Готово!</div>' -->`

  return (
    <div className="card">
      <h2>📢 Live-регионы</h2>

      <p>
        Live-регионы позволяют скринридеру озвучивать динамические обновления
        без перемещения фокуса — уведомления, счётчики, ошибки валидации.
      </p>

      <CodeBlock code={liveCode} language="html" title="aria-live, role=alert, role=status" />

      <h3 style={{ marginTop: '16px' }}>Ключевые атрибуты</h3>
      <table className="comparison-table" style={{ width: '100%', marginTop: '8px' }}>
        <thead>
          <tr><th>Атрибут</th><th>Значения</th><th>Когда</th></tr>
        </thead>
        <tbody>
          <tr><td><code>aria-live</code></td><td>polite, assertive, off</td><td>Уровень срочности</td></tr>
          <tr><td><code>aria-atomic</code></td><td>true, false</td><td>true — озвучить всё содержимое, false — только изменение</td></tr>
          <tr><td><code>aria-relevant</code></td><td>additions, removals, text, all</td><td>Какие изменения озвучивать</td></tr>
        </tbody>
      </table>
    </div>
  )
}

/* ─── Common failures ─────────────────────────────────── */

function CommonFailures() {
  const failuresCode = `<!-- ❌ 1. Картинка без alt -->
<img src="chart.png" />
<!-- ✅ -->
<img src="chart.png" alt="Рост выручки за 2024 год: с 1M до 3M" />
<!-- Декоративная картинка — пустой alt, НЕ отсутствие alt -->
<img src="ornament.svg" alt="" />

<!-- ❌ 2. Кликабельный div без роли и клавиатуры -->
<div onclick="open()">Открыть</div>
<!-- ✅ -->
<button onclick="open()">Открыть</button>

<!-- ❌ 3. Цвет как единственный индикатор -->
<span style="color: red">Обязательное поле</span>
<!-- ✅ -->
<span style="color: red">⚠ Обязательное поле</span>

<!-- ❌ 4. Автоплей видео -->
<video autoplay src="intro.mp4"></video>
<!-- ✅ -->
<video src="intro.mp4" controls>
  <track kind="captions" src="intro.vtt" srclang="ru" label="Русские субтитры" />
</video>

<!-- ❌ 5. Пустая ссылка -->
<a href="/profile"><img src="avatar.png" /></a>
<!-- ✅ -->
<a href="/profile">
  <img src="avatar.png" alt="Профиль пользователя" />
</a>

<!-- ❌ 6. Неправильная иерархия заголовков -->
<h1>Сайт</h1>
<h3>Секция</h3>   <!-- пропущен h2 -->
<!-- ✅ -->
<h1>Сайт</h1>
<h2>Секция</h2>`

  return (
    <div className="card">
      <h2>🚫 Типичные ошибки</h2>
      <p>WCAG-нарушения, которые встречаются чаще всего и легко исправляются.</p>
      <CodeBlock code={failuresCode} language="html" title="Частые нарушения и исправления" />
    </div>
  )
}

/* ─── Testing ─────────────────────────────────────────── */

function TestingSection() {
  const testingCode = `<!-- Инструменты проверки доступности -->

<!-- 1. Клавиатурный тест (ручной) -->
<!-- Пройдите весь сайт только Tab, Shift+Tab, Enter, Space, Escape. -->
<!-- Проверьте: виден ли фокус? Доступны ли все функции? -->

<!-- 2. Скринридер (ручной) -->
<!-- macOS: VoiceOver (Cmd+F5) -->
<!-- Windows: NVDA (бесплатный) или JAWS -->
<!-- Проверьте: озвучены ли все элементы? Понятна ли структура? -->

<!-- 3. axe DevTools (расширение Chrome/Firefox) -->
<!-- Находит: отсутствие alt, плохой контраст, пустые ссылки, -->
<!-- отсутствие label, нарушения ARIA -->

<!-- 4. Lighthouse Accessibility audit -->
<!-- Chrome DevTools → Lighthouse → Accessibility -->
<!-- Ловит базовые проблемы, но не заменяет ручной тест -->

<!-- 5. HTML validator -->
<!-- https://validator.w3.org — ловит невалидные ARIA-атрибуты, -->
<!-- вложенные интерактивные элементы, пропущенные обязательные атрибуты -->`

  const contrastCode = `<!-- WCAG 2.1 AA контрастность -->
<!-- Обычный текст: минимум 4.5:1 -->
<!-- Крупный текст (≥18pt или ≥14pt bold): минимум 3:1 -->
<!-- UI-компоненты и графика: минимум 3:1 -->

<!-- Проверить: -->
<!-- Chrome DevTools → Inspect → color picker → показывает contrast ratio -->
<!-- Или: whocanuse.com, webaim.org/resources/contrastchecker -->

<!-- CSS для принудительного высокого контраста -->
@media (forced-colors: active) {
  /* Стили для Windows High Contrast Mode */
  .custom-checkbox {
    border: 2px solid ButtonText;
  }
}`

  return (
    <div className="card">
      <h2>🧪 Тестирование доступности</h2>

      <p>
        Автоматические инструменты ловят ~30% проблем.
        Остальное — ручная проверка клавиатурой и скринридером.
      </p>

      <CodeBlock code={testingCode} language="html" title="Инструменты и чеклист" />

      <h3 style={{ marginTop: '16px' }}>Контрастность</h3>
      <CodeBlock code={contrastCode} language="css" title="Требования WCAG к контрасту" />

      <h3 style={{ marginTop: '16px' }}>Минимальный чеклист</h3>
      <ol className="info-list">
        <li>Все картинки имеют <code>alt</code> (или <code>alt=""</code> для декоративных)</li>
        <li>Все формы имеют <code>&lt;label&gt;</code></li>
        <li>Все интерактивные элементы доступны с клавиатуры</li>
        <li>Фокус всегда виден (outline не убран без замены)</li>
        <li>Заголовки идут по порядку (h1 → h2 → h3)</li>
        <li>Цвет не единственный способ передачи информации</li>
        <li><code>lang</code> указан на <code>&lt;html&gt;</code></li>
        <li>Страница понятна при 200% зуме</li>
      </ol>
    </div>
  )
}
