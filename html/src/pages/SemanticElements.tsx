export default function SemanticElements() {
  return (
    <div className="page-container">
      <h1>🏗️ Семантические элементы</h1>
      <p className="page-description">
        Правильная семантика улучшает SEO, доступность (a11y) и поддерживаемость кода.
        Новые семантические элементы HTML5 и Living Standard.
      </p>

      {/* Document Structure */}
      <div className="card">
        <h2>📐 Структура документа</h2>
        
        <div className="structure-demo">
          <div className="structure-visual">
            <div className="struct-header">
              <code>&lt;header&gt;</code>
              <span>Шапка сайта/секции</span>
            </div>
            <div className="struct-nav">
              <code>&lt;nav&gt;</code>
              <span>Навигация</span>
            </div>
            <div className="struct-body">
              <div className="struct-main">
                <code>&lt;main&gt;</code>
                <span>Основной контент (один на странице)</span>
                <div className="struct-article">
                  <code>&lt;article&gt;</code>
                  <span>Самодостаточный контент</span>
                  <div className="struct-section">
                    <code>&lt;section&gt;</code>
                    <span>Тематический раздел</span>
                  </div>
                </div>
              </div>
              <div className="struct-aside">
                <code>&lt;aside&gt;</code>
                <span>Побочный контент</span>
              </div>
            </div>
            <div className="struct-footer">
              <code>&lt;footer&gt;</code>
              <span>Подвал сайта/секции</span>
            </div>
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '20px' }}>
          <pre>{`<body>
  <header>
    <nav aria-label="Main navigation">
      <ul>...</ul>
    </nav>
  </header>
  
  <main>
    <article>
      <header>
        <h1>Заголовок статьи</h1>
        <time datetime="2024-01-15">15 января 2024</time>
      </header>
      
      <section>
        <h2>Первый раздел</h2>
        <p>...</p>
      </section>
      
      <footer>
        <p>Автор: Иван Иванов</p>
      </footer>
    </article>
  </main>
  
  <aside>
    <section aria-label="Related articles">
      ...
    </section>
  </aside>
  
  <footer>
    <p>&copy; 2024</p>
  </footer>
</body>`}</pre>
        </div>
      </div>

      {/* New Elements */}
      <div className="card">
        <h2>🆕 Новые семантические элементы</h2>
        
        <div className="elements-grid">
          <div className="element-card">
            <h3><code>&lt;search&gt;</code> <span className="badge">2023</span></h3>
            <p>Обёртка для элементов поиска. Заменяет <code>role="search"</code>.</p>
            <div className="code-block small">
              <pre>{`<search>
  <form action="/search">
    <label for="query">Поиск:</label>
    <input type="search" id="query" name="q">
    <button type="submit">Найти</button>
  </form>
</search>`}</pre>
            </div>
          </div>

          <div className="element-card">
            <h3><code>&lt;hgroup&gt;</code></h3>
            <p>Группировка заголовка с подзаголовком или метаданными.</p>
            <div className="code-block small">
              <pre>{`<hgroup>
  <h1>Основы JavaScript</h1>
  <p>Полное руководство для начинающих</p>
</hgroup>`}</pre>
            </div>
          </div>

          <div className="element-card">
            <h3><code>&lt;figure&gt;</code> + <code>&lt;figcaption&gt;</code></h3>
            <p>Иллюстрация с подписью. Не только для изображений!</p>
            <div className="code-block small">
              <pre>{`<figure>
  <pre><code>const x = 42;</code></pre>
  <figcaption>Пример объявления переменной</figcaption>
</figure>

<figure>
  <blockquote cite="https://...">
    "Простота — высшая форма изысканности"
  </blockquote>
  <figcaption>— Леонардо да Винчи</figcaption>
</figure>`}</pre>
            </div>
          </div>

          <div className="element-card">
            <h3><code>&lt;address&gt;</code></h3>
            <p>Контактная информация автора статьи или сайта.</p>
            <div className="code-block small">
              <pre>{`<address>
  Автор: <a href="mailto:author@example.com">Иван</a><br>
  Telegram: <a href="https://t.me/ivan">@ivan</a>
</address>`}</pre>
            </div>
          </div>

          <div className="element-card">
            <h3><code>&lt;time&gt;</code></h3>
            <p>Машиночитаемая дата/время.</p>
            <div className="code-block small">
              <pre>{`<time datetime="2024-01-15">15 января 2024</time>
<time datetime="14:30">в 14:30</time>
<time datetime="PT2H30M">2 часа 30 минут</time>
<time datetime="2024-01-15T14:30:00+03:00">
  15 января 2024 в 14:30 MSK
</time>`}</pre>
            </div>
          </div>

          <div className="element-card">
            <h3><code>&lt;mark&gt;</code></h3>
            <p>Выделение текста (подсветка, как маркером).</p>
            <div className="code-block small">
              <pre>{`<p>
  В результатах поиска найдено: 
  <mark>JavaScript</mark> is awesome.
</p>`}</pre>
            </div>
            <div className="demo-result">
              В результатах поиска найдено: <mark>JavaScript</mark> is awesome.
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="card">
        <h2>🎯 Интерактивные семантические элементы</h2>
        
        <div className="interactive-demo">
          <h3><code>&lt;details&gt;</code> + <code>&lt;summary&gt;</code></h3>
          <p>Нативный аккордеон без JavaScript:</p>
          
          <details className="demo-details">
            <summary>Нажмите чтобы раскрыть</summary>
            <p>Скрытый контент становится видимым. Это работает без единой строчки JavaScript!</p>
            <ul>
              <li>Поддерживается во всех браузерах</li>
              <li>Доступен для screen readers</li>
              <li>Стилизуется через CSS</li>
            </ul>
          </details>

          <h4 style={{ marginTop: '20px' }}>Exclusive Accordion (2024+)</h4>
          <p>Атрибут <code>name</code> делает детали эксклюзивными в группе:</p>
          
          <div className="accordion-group">
            <details name="faq" className="demo-details">
              <summary>Вопрос 1: Что такое HTML?</summary>
              <p>HTML (HyperText Markup Language) — язык разметки для создания веб-страниц.</p>
            </details>
            <details name="faq" className="demo-details">
              <summary>Вопрос 2: Зачем семантика?</summary>
              <p>Семантика улучшает SEO, доступность и поддерживаемость кода.</p>
            </details>
            <details name="faq" className="demo-details">
              <summary>Вопрос 3: Что нового в HTML?</summary>
              <p>Popover API, &lt;search&gt;, Speculation Rules и многое другое!</p>
            </details>
          </div>

          <div className="code-block" style={{ marginTop: '16px' }}>
            <pre>{`<!-- Exclusive accordion - только один открыт -->
<details name="faq">
  <summary>Вопрос 1</summary>
  <p>Ответ 1</p>
</details>
<details name="faq">
  <summary>Вопрос 2</summary>
  <p>Ответ 2</p>
</details>`}</pre>
          </div>
        </div>
      </div>

      {/* Text-level semantics */}
      <div className="card">
        <h2>📝 Текстовая семантика</h2>
        
        <div className="text-semantics">
          <div className="semantic-row">
            <code>&lt;strong&gt;</code>
            <span>Важность</span>
            <div className="demo"><strong>Важный текст</strong></div>
          </div>
          <div className="semantic-row">
            <code>&lt;em&gt;</code>
            <span>Акцент</span>
            <div className="demo"><em>Акцентированный текст</em></div>
          </div>
          <div className="semantic-row">
            <code>&lt;small&gt;</code>
            <span>Мелкий шрифт (disclaimer)</span>
            <div className="demo"><small>Мелкий текст</small></div>
          </div>
          <div className="semantic-row">
            <code>&lt;s&gt;</code>
            <span>Неактуальная информация</span>
            <div className="demo"><s>Старая цена</s></div>
          </div>
          <div className="semantic-row">
            <code>&lt;del&gt;</code> / <code>&lt;ins&gt;</code>
            <span>Редактирование документа</span>
            <div className="demo"><del>удалено</del> <ins>добавлено</ins></div>
          </div>
          <div className="semantic-row">
            <code>&lt;abbr&gt;</code>
            <span>Аббревиатура</span>
            <div className="demo"><abbr title="HyperText Markup Language">HTML</abbr></div>
          </div>
          <div className="semantic-row">
            <code>&lt;cite&gt;</code>
            <span>Название работы</span>
            <div className="demo"><cite>Война и мир</cite></div>
          </div>
          <div className="semantic-row">
            <code>&lt;dfn&gt;</code>
            <span>Определяемый термин</span>
            <div className="demo"><dfn>Семантика</dfn> — значение элементов</div>
          </div>
          <div className="semantic-row">
            <code>&lt;code&gt;</code>
            <span>Код</span>
            <div className="demo"><code>const x = 42</code></div>
          </div>
          <div className="semantic-row">
            <code>&lt;kbd&gt;</code>
            <span>Ввод с клавиатуры</span>
            <div className="demo">Нажмите <kbd>Ctrl</kbd> + <kbd>C</kbd></div>
          </div>
          <div className="semantic-row">
            <code>&lt;samp&gt;</code>
            <span>Вывод программы</span>
            <div className="demo"><samp>Hello, World!</samp></div>
          </div>
          <div className="semantic-row">
            <code>&lt;var&gt;</code>
            <span>Переменная</span>
            <div className="demo"><var>x</var> = <var>y</var> + 1</div>
          </div>
          <div className="semantic-row">
            <code>&lt;data&gt;</code>
            <span>Машиночитаемое значение</span>
            <div className="demo"><data value="398">Артикул: 398</data></div>
          </div>
        </div>
      </div>

      {/* ARIA roles vs semantic HTML */}
      <div className="card">
        <h2>♿ Семантика vs ARIA</h2>
        <p>Предпочитайте нативную семантику над ARIA ролями:</p>
        
        <div className="comparison-table">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>❌ С ARIA</th>
                <th>✅ Семантический HTML</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>&lt;div role="button"&gt;</code></td>
                <td><code>&lt;button&gt;</code></td>
              </tr>
              <tr>
                <td><code>&lt;div role="navigation"&gt;</code></td>
                <td><code>&lt;nav&gt;</code></td>
              </tr>
              <tr>
                <td><code>&lt;div role="main"&gt;</code></td>
                <td><code>&lt;main&gt;</code></td>
              </tr>
              <tr>
                <td><code>&lt;div role="search"&gt;</code></td>
                <td><code>&lt;search&gt;</code></td>
              </tr>
              <tr>
                <td><code>&lt;span role="link"&gt;</code></td>
                <td><code>&lt;a href="..."&gt;</code></td>
              </tr>
              <tr>
                <td><code>&lt;div role="heading"&gt;</code></td>
                <td><code>&lt;h1&gt;...&lt;h6&gt;</code></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Правило:</strong> Используйте ARIA только когда нет подходящего HTML элемента.
          "No ARIA is better than bad ARIA".
        </div>
      </div>

      <style>{`
        .structure-visual {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .structure-visual > div {
          padding: 12px 16px;
          border: 2px dashed var(--border);
          border-radius: 8px;
        }
        .struct-header, .struct-footer {
          background: rgba(99, 102, 241, 0.1);
          border-color: rgba(99, 102, 241, 0.3);
        }
        .struct-nav {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
        }
        .struct-body {
          display: flex;
          gap: 16px;
          padding: 16px;
        }
        .struct-main {
          flex: 3;
          background: rgba(16, 185, 129, 0.1);
          border-color: rgba(16, 185, 129, 0.3);
          padding: 16px;
        }
        .struct-aside {
          flex: 1;
          background: rgba(236, 72, 153, 0.1);
          border-color: rgba(236, 72, 153, 0.3);
        }
        .struct-article {
          margin-top: 12px;
          padding: 12px;
          border: 2px dashed rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.1);
          border-radius: 8px;
        }
        .struct-section {
          margin-top: 8px;
          padding: 8px;
          border: 2px dashed rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
          border-radius: 6px;
        }
        .structure-visual code {
          font-weight: bold;
          color: var(--accent);
        }
        .structure-visual span {
          font-size: 0.8em;
          color: var(--text-secondary);
          margin-left: 8px;
        }
        .elements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 20px;
        }
        .element-card {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .element-card h3 {
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .element-card h3 code {
          color: var(--accent);
        }
        .badge {
          font-size: 0.65em;
          padding: 2px 8px;
          background: var(--success);
          color: white;
          border-radius: 12px;
          font-weight: normal;
        }
        .element-card p {
          margin: 0 0 12px;
          color: var(--text-secondary);
          font-size: 0.9em;
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
        .demo-result {
          margin-top: 12px;
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
        }
        .demo-result mark {
          background: #fef08a;
          color: #000;
          padding: 2px 4px;
          border-radius: 2px;
        }
        .demo-details {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          margin: 8px 0;
        }
        .demo-details summary {
          cursor: pointer;
          font-weight: 500;
          padding: 4px;
        }
        .demo-details summary:hover {
          color: var(--accent);
        }
        .demo-details p, .demo-details ul {
          margin-top: 12px;
          color: var(--text-secondary);
        }
        .accordion-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .text-semantics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .semantic-row {
          display: grid;
          grid-template-columns: 150px 200px 1fr;
          gap: 16px;
          align-items: center;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .semantic-row code {
          color: var(--accent);
          font-size: 0.85em;
        }
        .semantic-row span {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .semantic-row .demo {
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          font-size: 0.9em;
        }
        .semantic-row kbd {
          padding: 2px 6px;
          background: var(--bg-secondary);
          border: 1px solid var(--border);
          border-radius: 4px;
          font-family: inherit;
          font-size: 0.85em;
        }
        .comparison-table {
          overflow-x: auto;
        }
        .comparison-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .comparison-table th, .comparison-table td {
          padding: 12px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        .comparison-table th {
          background: var(--bg-secondary);
        }
        .comparison-table code {
          font-size: 0.85em;
        }
        .info-box {
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
        }
        @media (max-width: 768px) {
          .semantic-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
