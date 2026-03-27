import { useState } from 'react'

const tabs = ['Bug Triage', 'Дефекты-кейсы', 'Сценарная практика', 'Debug Toolkit'] as const
type Tab = typeof tabs[number]

export default function BugTriagePractice() {
  const [activeTab, setActiveTab] = useState<Tab>('Bug Triage')

  return (
    <div className="page">
      <h1>🐛 Практика: Bug Triage и Дефекты</h1>
      <p className="page-description">
        Реалистичные баги, техники триажа, сценарные задачи для практики.
        Учимся не только находить баги, но и правильно их классифицировать, репортить и отлаживать.
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'Bug Triage' && <BugTriageSection />}
        {activeTab === 'Дефекты-кейсы' && <DefectCasesSection />}
        {activeTab === 'Сценарная практика' && <ScenarioSection />}
        {activeTab === 'Debug Toolkit' && <DebugToolkitSection />}
      </div>
    </div>
  )
}

function BugTriageSection() {
  return (
    <>
      <div className="card">
        <h2>📊 Процесс Bug Triage</h2>
        <p>
          Triage (от франц. «сортировка») — процесс оценки и приоритизации багов.
          Не все баги нужно чинить. Triage отвечает на вопросы: <strong>Это баг?</strong>, <strong>Насколько он серьёзен?</strong>, <strong>Когда чинить?</strong>
        </p>
        <table className="comparison-table">
          <thead>
            <tr><th>Шаг</th><th>Вопрос</th><th>Результат</th></tr>
          </thead>
          <tbody>
            <tr><td>1. Валидация</td><td>Это действительно баг? Воспроизводится?</td><td>Confirmed / Not a bug / Duplicate / Need info</td></tr>
            <tr><td>2. Severity</td><td>Насколько серьёзно для пользователя?</td><td>Critical / Major / Minor / Trivial</td></tr>
            <tr><td>3. Priority</td><td>Когда чинить?</td><td>P0 (сейчас) / P1 (спринт) / P2 (бэклог) / P3 (когда-нибудь)</td></tr>
            <tr><td>4. Assign</td><td>Кто отвечает за фикс?</td><td>Команда / конкретный разработчик</td></tr>
            <tr><td>5. Track</td><td>Как отслеживаем прогресс?</td><td>Статус в трекере, SLA</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🎯 Severity vs Priority</h2>
        <p>Severity — <em>техническая</em> серьёзность. Priority — <em>бизнес</em>-срочность. Они не всегда совпадают!</p>
        <table className="comparison-table">
          <thead>
            <tr><th></th><th>High Priority</th><th>Low Priority</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>High Severity</strong></td>
              <td>💀 Оплата не работает в проде → фиксим СЕЙЧАС</td>
              <td>😤 Crash на устаревшем Android 8 (0.1% пользователей)</td>
            </tr>
            <tr>
              <td><strong>Low Severity</strong></td>
              <td>😬 Опечатка на лендинге перед конференцией</td>
              <td>🤷 Кнопка смещена на 2px в Safari на macOS</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📝 Шаблон идеального баг-репорта</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Title: [Компонент] Краткое описание проблемы
Severity: Major | Priority: P1

Environment:
- OS: iOS 17.4, iPhone 15 Pro
- Browser: Safari 17.4
- App version: 2.3.1 (build 456)
- Account: test-user@example.com

Steps to Reproduce:
1. Перейти на /checkout
2. Добавить товар за 1000₽ в корзину
3. Ввести промокод "SALE50"
4. Нажать "Оплатить"

Expected Result:
Скидка 50% (500₽) применяется, итог = 500₽

Actual Result:
Скидка не применяется, итог = 1000₽.
API возвращает 200, но discount_amount = 0.

Additional Info:
- Воспроизводится в 100% случаев
- Промокод "SALE30" работает корректно
- Консоль: нет ошибок
- Network: POST /api/apply-promo → 200, response.discount = 0
- Скриншот: [прикреплён]
- Видео: [прикреплено]`}</pre>
        </div>
      </div>
    </>
  )
}

function DefectCasesSection() {
  return (
    <>
      <div className="card">
        <h2>🔍 Реалистичные дефекты для анализа</h2>
        <p>Разберите каждый кейс: определите severity, priority, root cause и предложите fix.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #e74c3c' }}>
        <h3>🐛 Кейс 1: «Двойная оплата»</h3>
        <p><strong>Описание:</strong> Пользователь нажимает «Оплатить», видит спиннер 5 секунд, нажимает ещё раз.
        С карты списывается дважды.</p>
        <table className="comparison-table">
          <tbody>
            <tr><td><strong>Severity</strong></td><td>🔴 Critical — финансовый ущерб пользователю</td></tr>
            <tr><td><strong>Priority</strong></td><td>P0 — фиксить немедленно</td></tr>
            <tr><td><strong>Root cause</strong></td><td>Кнопка не дизейблится после клика, нет idempotency key на бэкенде</td></tr>
            <tr><td><strong>Fix (frontend)</strong></td><td>Disable кнопки после первого клика, показать loading state</td></tr>
            <tr><td><strong>Fix (backend)</strong></td><td>Idempotency key в заголовке, дедупликация транзакций</td></tr>
            <tr><td><strong>Regression test</strong></td><td>Быстрый двойной клик, slow network simulation</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #e67e22' }}>
        <h3>🐛 Кейс 2: «Пропадающие данные формы»</h3>
        <p><strong>Описание:</strong> Пользователь заполняет длинную форму заявки (10 полей).
        При ошибке валидации одного поля все остальные поля очищаются.</p>
        <table className="comparison-table">
          <tbody>
            <tr><td><strong>Severity</strong></td><td>🟠 Major — пользователь теряет введённые данные</td></tr>
            <tr><td><strong>Priority</strong></td><td>P1 — высокий churn на этом шаге</td></tr>
            <tr><td><strong>Root cause</strong></td><td>Full page reload при серверной валидации, state не сохраняется</td></tr>
            <tr><td><strong>Fix</strong></td><td>Client-side валидация, preserve form state, SPA submit</td></tr>
            <tr><td><strong>Как найти</strong></td><td>Boundary value analysis + error path testing</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #e67e22' }}>
        <h3>🐛 Кейс 3: «Гонка состояний в корзине»</h3>
        <p><strong>Описание:</strong> Два пользователя (или две вкладки) добавляют товар одновременно.
        В корзине вместо 2 товаров — 1. Второй перезаписывает первый.</p>
        <table className="comparison-table">
          <tbody>
            <tr><td><strong>Severity</strong></td><td>🟠 Major — потеря данных</td></tr>
            <tr><td><strong>Priority</strong></td><td>P1 — влияет на конверсию</td></tr>
            <tr><td><strong>Root cause</strong></td><td>Read-modify-write без блокировки. Оба читают count=0, оба пишут count=1</td></tr>
            <tr><td><strong>Fix</strong></td><td>Atomic increment (INCR в Redis), optimistic locking (version), или queue</td></tr>
            <tr><td><strong>Как найти</strong></td><td>Concurrency testing, race condition scenarios</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #f1c40f' }}>
        <h3>🐛 Кейс 4: «XSS через имя пользователя»</h3>
        <p><strong>Описание:</strong> Пользователь устанавливает имя <code>{'<img src=x onerror=alert(1)>'}</code>.
        При открытии его профиля у других пользователей выполняется JavaScript.</p>
        <table className="comparison-table">
          <tbody>
            <tr><td><strong>Severity</strong></td><td>🔴 Critical — уязвимость безопасности (Stored XSS)</td></tr>
            <tr><td><strong>Priority</strong></td><td>P0 — фиксить немедленно</td></tr>
            <tr><td><strong>Root cause</strong></td><td>Отсутствие sanitization при выводе пользовательских данных</td></tr>
            <tr><td><strong>Fix</strong></td><td>HTML-экранирование при выводе (не при вводе), CSP header</td></tr>
            <tr><td><strong>Как найти</strong></td><td>Security testing: ввод спецсимволов в каждое поле</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card" style={{ borderLeft: '4px solid #3498db' }}>
        <h3>🐛 Кейс 5: «Утечка памяти в SPA»</h3>
        <p><strong>Описание:</strong> После 30 минут использования приложение начинает тормозить.
        Memory в DevTools растёт с 50MB до 300MB.</p>
        <table className="comparison-table">
          <tbody>
            <tr><td><strong>Severity</strong></td><td>🟠 Major — деградация UX со временем</td></tr>
            <tr><td><strong>Priority</strong></td><td>P2 — не падает, но ухудшается</td></tr>
            <tr><td><strong>Root cause</strong></td><td>useEffect без cleanup: таймеры, event listeners, WebSocket подписки</td></tr>
            <tr><td><strong>Fix</strong></td><td>Return cleanup function в useEffect, AbortController для fetch</td></tr>
            <tr><td><strong>Как найти</strong></td><td>Chrome Memory profiler: 3 heap snapshots, сравнить retained objects</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

function ScenarioSection() {
  return (
    <>
      <div className="card">
        <h2>🎯 Задания для самостоятельной практики</h2>
        <p>Выполните каждое задание как на реальном проекте. Напишите баг-репорт по шаблону.</p>
      </div>

      <div className="card">
        <h3>📝 Задание 1: Тестирование формы регистрации</h3>
        <p><strong>Контекст:</strong> Форма регистрации с полями: email, пароль (мин. 8 символов, буквы + цифры), подтверждение пароля, checkbox согласия.</p>
        <table className="comparison-table">
          <thead>
            <tr><th>#</th><th>Тестовый сценарий</th><th>Техника</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Все поля валидные — успешная регистрация</td><td>Positive path</td></tr>
            <tr><td>2</td><td>Email без @, email без домена, email с пробелами</td><td>Equivalence partitioning</td></tr>
            <tr><td>3</td><td>Пароль 7 символов / 8 символов / 9 символов</td><td>Boundary value</td></tr>
            <tr><td>4</td><td>Пароль только буквы / только цифры / буквы+цифры</td><td>Equivalence partitioning</td></tr>
            <tr><td>5</td><td>Пароли не совпадают / копипаст пароля</td><td>Error guessing</td></tr>
            <tr><td>6</td><td>Checkbox не отмечен → кнопка disabled?</td><td>State transition</td></tr>
            <tr><td>7</td><td>Email уже зарегистрирован → сообщение об ошибке</td><td>Error path</td></tr>
            <tr><td>8</td><td>SQL injection / XSS в полях email и пароля</td><td>Security testing</td></tr>
            <tr><td>9</td><td>Двойной клик на «Зарегистрироваться»</td><td>Concurrency</td></tr>
            <tr><td>10</td><td>Отключить JS → форма работает? (progressive enhancement)</td><td>Compatibility</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>📝 Задание 2: Тестирование REST API</h3>
        <p><strong>Контекст:</strong> Endpoint <code>POST /api/orders</code>. Принимает JSON: <code>{`{ "items": [...], "address": "...", "payment_method": "card" }`}</code></p>
        <table className="comparison-table">
          <thead>
            <tr><th>#</th><th>Тестовый сценарий</th><th>Expected</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Валидный запрос с 1 товаром</td><td>201 Created + order ID</td></tr>
            <tr><td>2</td><td>Пустой items array</td><td>400 Bad Request</td></tr>
            <tr><td>3</td><td>Несуществующий item ID</td><td>404 / 422</td></tr>
            <tr><td>4</td><td>Количество 0 / отрицательное / 999999</td><td>422 Validation Error</td></tr>
            <tr><td>5</td><td>Без Authorization header</td><td>401 Unauthorized</td></tr>
            <tr><td>6</td><td>Истёкший token</td><td>401 + конкретное сообщение</td></tr>
            <tr><td>7</td><td>Content-Type: text/plain (не JSON)</td><td>415 Unsupported Media Type</td></tr>
            <tr><td>8</td><td>Тело запроса &gt; 1MB</td><td>413 Payload Too Large</td></tr>
            <tr><td>9</td><td>Rate limit: 100 запросов за 1 секунду</td><td>429 Too Many Requests</td></tr>
            <tr><td>10</td><td>Concurrent orders для last item in stock</td><td>Один 201, один 409 Conflict</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>📝 Задание 3: Баг-триаж симуляция</h3>
        <p><strong>Контекст:</strong> У вас 5 багов в очереди. Монда утренний стендап через 15 минут. Расставьте приоритеты.</p>
        <table className="comparison-table">
          <thead>
            <tr><th>Баг</th><th>Описание</th><th>Ваш Severity?</th><th>Ваш Priority?</th></tr>
          </thead>
          <tbody>
            <tr><td>A</td><td>Лого компании отображается с белым фоном на тёмной теме</td><td>?</td><td>?</td></tr>
            <tr><td>B</td><td>Push-уведомления не приходят на iOS 17</td><td>?</td><td>?</td></tr>
            <tr><td>C</td><td>Пользователь может изменить чужой профиль, зная user ID</td><td>?</td><td>?</td></tr>
            <tr><td>D</td><td>Поиск возвращает 500 при запросе с эмодзи</td><td>?</td><td>?</td></tr>
            <tr><td>E</td><td>Кнопка «Добавить в корзину» не работает в Firefox 120</td><td>?</td><td>?</td></tr>
          </tbody>
        </table>
        <div className="info-box" style={{ marginTop: 16 }}>
          <p><strong>Подсказка:</strong> C — security issue (IDOR уязвимость), всегда P0. B и E блокируют функциональность для сегментов пользователей. D — edge case. A — cosmetic.</p>
        </div>
      </div>
    </>
  )
}

function DebugToolkitSection() {
  return (
    <>
      <div className="card">
        <h2>🔧 Инструменты отладки</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Инструмент</th><th>Когда использовать</th><th>Ключевые фичи</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Chrome DevTools → Network</strong></td>
              <td>API-ошибки, таймауты, CORS</td>
              <td>Filter by XHR, throttling, copy as cURL, HAR export</td>
            </tr>
            <tr>
              <td><strong>Chrome DevTools → Console</strong></td>
              <td>JS ошибки, логирование</td>
              <td>$0 (last selected), copy(), monitorEvents(), getEventListeners()</td>
            </tr>
            <tr>
              <td><strong>Chrome DevTools → Application</strong></td>
              <td>Cookies, localStorage, Service Workers</td>
              <td>Clear storage, view/edit cookies, cache inspection</td>
            </tr>
            <tr>
              <td><strong>Chrome DevTools → Memory</strong></td>
              <td>Утечки памяти</td>
              <td>Heap snapshots comparison, allocation timeline</td>
            </tr>
            <tr>
              <td><strong>Postman / Insomnia</strong></td>
              <td>API тестирование</td>
              <td>Collections, environments, pre-request scripts, tests</td>
            </tr>
            <tr>
              <td><strong>Charles Proxy / mitmproxy</strong></td>
              <td>Mobile трафик, SSL debugging</td>
              <td>SSL proxying, breakpoints, map remote/local</td>
            </tr>
            <tr>
              <td><strong>Lighthouse</strong></td>
              <td>Performance, accessibility, SEO, PWA</td>
              <td>Автоматический аудит с рекомендациями</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🔍 Систематический подход к debug</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`1. ВОСПРОИЗВЕДИ — Можешь ли ты стабильно получить баг?
   → Если нет: собирай больше данных (логи, окружение, шаги)

2. ИЗОЛИРУЙ — Где проблема: фронт, бэк, API, БД, инфраструктура?
   → Network tab: запрос ушёл? Ответ корректный?
   → Console: есть ошибки?
   → Другой браузер/устройство: воспроизводится?

3. СУЗЬ — Найди минимальный набор шагов
   → Убирай шаги по одному, пока баг не пропадёт
   → Последний убранный шаг = виновник

4. ПРОВЕРЬ ГИПОТЕЗУ — Одна переменная за раз
   → Измени одну вещь → проверь → верни обратно
   → НЕ меняй несколько вещей одновременно

5. ЗАФИКСИРУЙ — Баг-репорт + root cause + fix
   → Все находки в тикете для разработчика`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>🎤 Вопросы на собеседовании</h2>
        <ol>
          <li>Чем отличается severity от priority? Приведите пример, когда они не совпадают.</li>
          <li>Как бы вы протестировали форму оплаты? Какие edge cases?</li>
          <li>Вам пришёл баг «Иногда не работает». Как начнёте разбор?</li>
          <li>Как отлаживать проблему, которая воспроизводится только на проде?</li>
          <li>Расскажите о баге, который вы нашли и которым гордитесь. Как нашли?</li>
        </ol>
      </div>
    </>
  )
}
