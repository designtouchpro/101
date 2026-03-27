import { useState } from 'react'

type Tab = 'validation' | 'mobile' | 'errors' | 'autofill' | 'recovery'

export default function FormsProductionUX() {
  const [tab, setTab] = useState<Tab>('validation')

  return (
    <div className="demo-container">
      <h1>🏭 Формы в продакшене</h1>
      <p className="section-desc">
        Нативная валидация, кастомная валидация, мобильный UX, автозаполнение,
        обработка ошибок и восстановление состояния — всё, что нужно для production-ready форм.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['validation', '✅ Валидация'],
          ['mobile', '📱 Мобильный UX'],
          ['errors', '❌ Ошибки (a11y)'],
          ['autofill', '🔑 Autofill'],
          ['recovery', '💾 Восстановление'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'validation' && (
        <>
          <section className="card">
            <h2>🔀 Три уровня валидации</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Уровень</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Как</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Ограничения</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Нативная HTML</strong></td>
                  <td style={{ padding: 8 }}><code>required</code>, <code>pattern</code>, <code>type="email"</code>, <code>minlength</code></td>
                  <td style={{ padding: 8 }}>Простые формы, быстрый фидбек</td>
                  <td style={{ padding: 8 }}>Некастомизируемые тултипы, разный вид в браузерах</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong>Кастомная JS</strong></td>
                  <td style={{ padding: 8 }}>Constraint Validation API + <code>setCustomValidity()</code></td>
                  <td style={{ padding: 8 }}>Сложная логика, единый дизайн ошибок</td>
                  <td style={{ padding: 8 }}>Больше кода, нужно поддерживать a11y</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><strong>Серверная</strong></td>
                  <td style={{ padding: 8 }}>Всегда. Клиент можно обойти</td>
                  <td style={{ padding: 8 }}>Уникальность email, бизнес-правила</td>
                  <td style={{ padding: 8 }}>Задержка (round trip)</td>
                </tr>
              </tbody>
            </table>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>⚠️ Правило:</strong> Серверная валидация обязательна ВСЕГДА. Клиентская — для UX, не для безопасности.
            </div>
          </section>

          <section className="card">
            <h2>📋 Нативные атрибуты валидации</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Атрибут</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что делает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Пример</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { attr: 'required', what: 'Поле обязательно', example: '<input required>' },
                  { attr: 'pattern', what: 'Regex-паттерн', example: '<input pattern="[A-Za-z]{3,}">' },
                  { attr: 'minlength / maxlength', what: 'Длина текста', example: '<input minlength="2" maxlength="50">' },
                  { attr: 'min / max', what: 'Числовой диапазон', example: '<input type="number" min="1" max="100">' },
                  { attr: 'step', what: 'Шаг для числа/даты', example: '<input type="number" step="0.01">' },
                  { attr: 'type="email"', what: 'Проверка формата email', example: '<input type="email">' },
                  { attr: 'type="url"', what: 'Проверка формата URL', example: '<input type="url">' },
                ].map(r => (
                  <tr key={r.attr} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><code>{r.attr}</code></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🛠 Constraint Validation API</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Кастомная валидация
const form = document.querySelector('form')
const email = form.querySelector('[name="email"]')

email.addEventListener('input', () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity('Введите корректный email')
  } else if (email.validity.valueMissing) {
    email.setCustomValidity('Email обязателен')
  } else {
    email.setCustomValidity('') // Сброс ошибки
  }
})

// Полностью кастомные ошибки — novalidate + JS
form.setAttribute('novalidate', '')
form.addEventListener('submit', (e) => {
  if (!form.checkValidity()) {
    e.preventDefault()
    // Показать свои ошибки через aria-describedby
    showCustomErrors(form)
  }
})

// Полезные свойства validity:
// .valueMissing  — required не заполнен
// .typeMismatch  — неправильный тип (email, url)
// .patternMismatch — не совпал pattern
// .tooShort / .tooLong — длина
// .rangeUnderflow / .rangeOverflow — min/max
// .stepMismatch — step
// .valid — всё ОК`}
            </pre>
          </section>
        </>
      )}

      {tab === 'mobile' && (
        <>
          <section className="card">
            <h2>📱 inputmode — правильная клавиатура</h2>
            <p>
              <code>inputmode</code> определяет, какую виртуальную клавиатуру показать на мобильном
              устройстве. Не заменяет <code>type</code>, а дополняет его.
            </p>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>inputmode</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Клавиатура</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Пример</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { mode: 'text', kb: 'Обычная текстовая', when: 'По умолчанию', example: 'Имя, адрес' },
                  { mode: 'numeric', kb: 'Только цифры', when: 'Числа без десятичных', example: 'Пин-код, возраст' },
                  { mode: 'decimal', kb: 'Цифры + точка/запятая', when: 'Дробные числа', example: 'Цена, вес' },
                  { mode: 'tel', kb: 'Телефонная', when: 'Номер телефона', example: '+7 (999) 123-45-67' },
                  { mode: 'email', kb: 'Текст + @ + .com', when: 'Email-поле', example: 'user@mail.com' },
                  { mode: 'url', kb: 'Текст + / + .com', when: 'URL-поле', example: 'https://example.com' },
                  { mode: 'search', kb: 'Текст + кнопка поиска', when: 'Поле поиска', example: 'Поиск товаров' },
                  { mode: 'none', kb: 'Не показывать', when: 'Кастомная клавиатура', example: 'Калькулятор-приложение' },
                ].map(r => (
                  <tr key={r.mode} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><code>{r.mode}</code></td>
                    <td style={{ padding: 8 }}>{r.kb}</td>
                    <td style={{ padding: 8 }}>{r.when}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem', marginTop: 12 }}>
{`<!-- Пин-код: цифровая клавиатура, 4 символа -->
<input type="text" inputmode="numeric"
       pattern="[0-9]{4}" maxlength="4"
       autocomplete="one-time-code">

<!-- Цена: десятичная клавиатура -->
<input type="text" inputmode="decimal"
       placeholder="0.00">

<!-- Телефон: телефонная клавиатура -->
<input type="tel" inputmode="tel"
       autocomplete="tel">`}
            </pre>
          </section>

          <section className="card">
            <h2>📏 Мобильные UX-паттерны</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Паттерн</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Как</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Зачем</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { pattern: 'Touch target ≥ 48px', how: 'min-height: 48px на input/button', why: 'WCAG → минимум для нажатия пальцем' },
                  { pattern: 'Sticky submit', how: 'position: sticky; bottom: 0', why: 'Кнопка всегда видна при скролле' },
                  { pattern: 'Одна колонка', how: 'Никогда 2 поля в ряд на mobile', why: 'Проще заполнять, меньше ошибок' },
                  { pattern: 'Label сверху', how: 'display: block на label', why: 'Не скрывается при фокусе на mobile' },
                  { pattern: 'enterkeyhint', how: 'enterkeyhint="next|done|send"', why: 'Кнопка Enter показывает действие' },
                  { pattern: 'Авто-переход', how: 'focus() на следующий input при maxlength', why: 'Для пин-кодов, OTP' },
                ].map(r => (
                  <tr key={r.pattern} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.pattern}</strong></td>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.how}</td>
                    <td style={{ padding: 8 }}>{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'errors' && (
        <>
          <section className="card">
            <h2>❌ Доступные сообщения об ошибках</h2>
            <p>
              Нативные тултипы браузера нечитаемы скринридерами. Для production нужны
              кастомные ошибки с правильной ARIA-разметкой.
            </p>
            <div className="info-box" style={{ marginTop: 8 }}>
              <strong>💡 Правило:</strong> Каждое поле с ошибкой должно иметь
              <code> aria-describedby</code>, указывающий на элемент с текстом ошибки.
              Ошибка должна быть <code>role="alert"</code> или <code>aria-live="polite"</code>.
            </div>
          </section>

          <section className="card">
            <h2>📋 Паттерн доступной ошибки</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Правильная разметка ошибки -->
<div class="field">
  <label for="email">Email *</label>
  <input id="email" type="email" required
         aria-describedby="email-error"
         aria-invalid="true">
  <span id="email-error" role="alert"
        class="error">
    Введите корректный email
  </span>
</div>

<!-- aria-invalid="true" → скринридер: "invalid entry" -->
<!-- aria-describedby → связывает поле с ошибкой -->
<!-- role="alert" → объявляет ошибку при появлении -->

<!-- Группа ошибок сверху формы -->
<div role="alert" aria-labelledby="error-heading">
  <h2 id="error-heading">
    Исправьте 2 ошибки:
  </h2>
  <ul>
    <li><a href="#email">Email — неверный формат</a></li>
    <li><a href="#phone">Телефон — обязательное поле</a></li>
  </ul>
</div>`}
            </pre>
          </section>

          <section className="card">
            <h2>⏱ Когда показывать ошибки</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Стратегия</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Плюс</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Минус</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { strategy: 'On submit', when: 'Только при отправке', plus: 'Не раздражает при заполнении', minus: 'Пользователь узнаёт поздно' },
                  { strategy: 'On blur', when: 'При уходе из поля', plus: 'Быстрый фидбек', minus: 'Ошибка до первого ввода — плохо' },
                  { strategy: 'On blur (after touch)', when: 'При уходе, только если было взаимодействие', plus: 'Баланс', minus: 'Чуть сложнее в реализации' },
                  { strategy: 'On input (after error)', when: 'Реактивная очистка после показа ошибки', plus: 'Мгновенный фидбек при исправлении', minus: 'Нужно отслеживать dirty-состояние' },
                ].map(r => (
                  <tr key={r.strategy} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.strategy}</strong></td>
                    <td style={{ padding: 8 }}>{r.when}</td>
                    <td style={{ padding: 8 }}>{r.plus}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.minus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>✅ Рекомендация:</strong> On blur (after touch) + on input (after error).
              Показать ошибку при уходе из тронутого поля, убрать при исправлении.
            </div>
          </section>
        </>
      )}

      {tab === 'autofill' && (
        <>
          <section className="card">
            <h2>🔑 autocomplete — автозаполнение браузером</h2>
            <p>
              <code>autocomplete</code> помогает браузеру предложить сохранённые данные.
              Правильные значения ускоряют заполнение на 30-50%.
            </p>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Значение</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Для чего</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Пример</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { val: 'name', what: 'Полное имя', example: 'Иван Петров' },
                  { val: 'given-name', what: 'Имя', example: 'Иван' },
                  { val: 'family-name', what: 'Фамилия', example: 'Петров' },
                  { val: 'email', what: 'Email', example: 'ivan@mail.com' },
                  { val: 'tel', what: 'Телефон', example: '+7 999 123-45-67' },
                  { val: 'street-address', what: 'Адрес', example: 'ул. Пушкина, д. 10' },
                  { val: 'postal-code', what: 'Индекс', example: '101000' },
                  { val: 'cc-number', what: 'Номер карты', example: '4111 1111 1111 1111' },
                  { val: 'cc-exp', what: 'Срок карты', example: '12/25' },
                  { val: 'one-time-code', what: 'OTP / SMS-код', example: '123456' },
                  { val: 'new-password', what: 'Новый пароль (триггерит генератор)', example: '••••••••' },
                  { val: 'current-password', what: 'Текущий пароль', example: '••••••••' },
                ].map(r => (
                  <tr key={r.val} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><code>{r.val}</code></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🔐 Пароли и менеджеры</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Регистрация: триггерим генератор пароля -->
<input type="password" autocomplete="new-password"
       minlength="8">

<!-- Логин: предлагаем сохранённый пароль -->
<input type="password" autocomplete="current-password">

<!-- OTP: автоподставка из SMS (Safari + Chrome) -->
<input type="text" inputmode="numeric"
       autocomplete="one-time-code"
       pattern="[0-9]{6}" maxlength="6">

<!-- ❌ Не делайте так -->
<input autocomplete="off"> <!-- Браузеры игнорируют -->
<input autocomplete="nope"> <!-- Хак, ненадёжен -->
<!-- Если не хотите autofill — скройте поле-ловушку -->`}
            </pre>
          </section>

          <section className="card">
            <h2>💡 Секции autocomplete</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Два адреса на одной странице -->
<fieldset>
  <legend>Адрес доставки</legend>
  <input autocomplete="shipping street-address">
  <input autocomplete="shipping postal-code">
</fieldset>

<fieldset>
  <legend>Адрес оплаты</legend>
  <input autocomplete="billing street-address">
  <input autocomplete="billing postal-code">
</fieldset>

<!-- shipping / billing — section tokens
     Браузер различает два набора адресов -->`}
            </pre>
          </section>
        </>
      )}

      {tab === 'recovery' && (
        <>
          <section className="card">
            <h2>💾 Восстановление состояния формы</h2>
            <p>
              Пользователь случайно закрыл вкладку, сеть упала, страница перезагрузилась —
              данные формы потеряны. Это можно предотвратить.
            </p>
          </section>

          <section className="card">
            <h2>📋 Стратегии восстановления</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Стратегия</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Как</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Ограничения</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { s: 'sessionStorage', how: 'Сохранять на каждый input event', when: 'Короткие формы, одна вкладка', limit: 'Не переживёт закрытие браузера' },
                  { s: 'localStorage', how: 'Сохранять с debounce (300ms)', when: 'Длинные формы (заявки, анкеты)', limit: 'Нужно чистить после отправки' },
                  { s: 'beforeunload', how: 'Предупредить при навигации', when: 'Когда форма dirty', limit: 'Текст не кастомизируется в modern browsers' },
                  { s: 'Server draft', how: 'Auto-save на бэкенд', when: 'Важные данные (редактор, CMS)', limit: 'Нужен API + conflict resolution' },
                ].map(r => (
                  <tr key={r.s} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.s}</strong></td>
                    <td style={{ padding: 8 }}>{r.how}</td>
                    <td style={{ padding: 8 }}>{r.when}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🛠 Реализация авто-сохранения</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Авто-сохранение формы в localStorage
const STORAGE_KEY = 'form-draft-checkout'

function initFormRecovery(form) {
  // Восстановить при загрузке
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    const data = JSON.parse(saved)
    for (const [name, value] of Object.entries(data)) {
      const field = form.elements[name]
      if (field) field.value = value
    }
  }

  // Сохранять с debounce при вводе
  let timer
  form.addEventListener('input', () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const data = Object.fromEntries(new FormData(form))
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }, 300)
  })

  // Очистить после успешной отправки
  form.addEventListener('submit', () => {
    localStorage.removeItem(STORAGE_KEY)
  })
}

// Предупреждение при уходе со страницы
let formDirty = false
form.addEventListener('input', () => { formDirty = true })
form.addEventListener('submit', () => { formDirty = false })

window.addEventListener('beforeunload', (e) => {
  if (formDirty) e.preventDefault()
})`}
            </pre>
          </section>

          <section className="card">
            <h2>🌐 Offline-устойчивая отправка</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// Retry-очередь для отправки формы
async function submitWithRetry(url, formData, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      })
      if (res.ok) {
        localStorage.removeItem(STORAGE_KEY)
        return res.json()
      }
      // Серверная ошибка (5xx) → retry
      if (res.status >= 500) continue
      // Клиентская ошибка (4xx) → показать ошибки
      throw await res.json()
    } catch (err) {
      if (attempt === maxRetries - 1) throw err
      // Экспоненциальная задержка
      await new Promise(r =>
        setTimeout(r, 1000 * 2 ** attempt))
    }
  }
}`}
            </pre>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Совет:</strong> Для критичных форм (заказы, платежи) используйте
              idempotency key — уникальный ID запроса, чтобы retry не создавал дубли.
            </div>
          </section>
        </>
      )}
    </div>
  )
}
