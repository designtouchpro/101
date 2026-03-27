import CodeBlock from '@/components/CodeBlock'

export default function IsWhere() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          ✨ :is() и :where()
          <span className="year-badge">2021</span>
        </h1>
        <p>Группировка селекторов с контролем специфичности</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/:is" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: :is()
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">Зачем нужны?</div>
          <p>
            Раньше для стилизации нескольких селекторов приходилось писать длинные списки.
            <code>:is()</code> и <code>:where()</code> делают CSS компактнее и читабельнее.
          </p>
        </div>
      </div>

      {/* Before/After */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 До и После</h3>
        </div>

        <div className="grid-2">
          <div>
            <CodeBlock 
              code={`/* ❌ Старый способ — много повторений */
header a:hover,
main a:hover,
footer a:hover,
nav a:hover {
  color: blue;
}

article h1,
article h2,
article h3,
article h4 {
  margin-top: 2rem;
}`}
              title="❌ До"
            />
          </div>
          <div>
            <CodeBlock 
              code={`/* ✅ С :is() — компактно */
:is(header, main, footer, nav) a:hover {
  color: blue;
}

article :is(h1, h2, h3, h4) {
  margin-top: 2rem;
}`}
              title="✅ После"
            />
          </div>
        </div>
      </div>

      {/* :is() vs :where() */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚖️ :is() vs :where() — Специфичность</h3>
          <span className="card-badge">Важно!</span>
        </div>

        <div className="info-box warning">
          <span className="info-box-icon">⚠️</span>
          <div className="info-box-content">
            <div className="info-box-title">Ключевое отличие</div>
            <p>
              <code>:is()</code> берёт специфичность самого специфичного аргумента.<br/>
              <code>:where()</code> всегда имеет специфичность 0.
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* :is() — специфичность = (0, 1, 0) из-за .class */
:is(h1, .title, #id) { 
  color: blue;  /* специфичность = (1, 0, 0) от #id! */
}

/* :where() — специфичность = (0, 0, 0) всегда */
:where(h1, .title, #id) { 
  color: blue;  /* специфичность = (0, 0, 0) */
}

/* Практический пример */
article :where(h1, h2, h3) {
  margin-top: 2rem;  /* Легко переопределить! */
}

/* Это переопределит :where() */
h2 { 
  margin-top: 1rem;  /* (0, 0, 1) > (0, 0, 0) */
}`}
          title="📝 Специфичность"
        />

        <table className="comparison-table" style={{ marginTop: '16px' }}>
          <thead>
            <tr>
              <th>Псевдокласс</th>
              <th>Специфичность</th>
              <th>Когда использовать</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>:is()</code></td>
              <td>Самый специфичный аргумент</td>
              <td>Обычная стилизация</td>
            </tr>
            <tr>
              <td><code>:where()</code></td>
              <td>Всегда 0</td>
              <td>Базовые стили, которые легко переопределить</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Forgiving Selector List */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🛡️ Forgiving Selector List</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✨</span>
          <div className="info-box-content">
            <div className="info-box-title">Прощающий парсинг</div>
            <p>
              Если один селектор в списке невалидный, обычно отбрасывается всё правило.
              <code>:is()</code> и <code>:where()</code> игнорируют только невалидный селектор!
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* ❌ Обычный список — всё правило отбросится */
a:hover, a:focus, a:-webkit-focus-visible {
  outline: none;  
  /* Если браузер не знает -webkit-focus-visible,
     правило НЕ применится вообще */
}

/* ✅ С :is() — работает */
a:is(:hover, :focus, :-webkit-focus-visible) {
  outline: none;
  /* Неизвестный селектор игнорируется,
     остальные работают */
}`}
          title="📝 Forgiving Parsing"
        />
      </div>

      {/* Practical Examples */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌍 Практические примеры</h3>
        </div>

        <CodeBlock 
          code={`/* 1. Статья — все заголовки */
article :is(h1, h2, h3, h4, h5, h6) {
  font-family: Georgia, serif;
  line-height: 1.3;
}

/* 2. Формы — все инпуты */
:is(input, textarea, select):focus {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-alpha);
}

/* 3. Навигация — вложенные ссылки */
nav :is(a, button):is(:hover, :focus) {
  background: var(--bg-hover);
}

/* 4. Базовые стили (легко переопределить) */
:where(ul, ol) {
  padding-left: 1.5rem;
}

/* 5. Reset с :where() */
:where(h1, h2, h3, h4, h5, h6) {
  margin: 0;
  font-weight: inherit;
}

/* 6. Комбинация :is() и :where() */
article :where(:is(h1, h2, h3) + p) {
  margin-top: 0.5em;
}`}
          title="📝 Примеры"
        />
      </div>

      {/* Live Demo */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: Стилизация списка</h3>
        </div>

        <style>{`
          .is-demo-list :is(h2, h3, h4) {
            color: var(--accent-css-light);
            margin-bottom: 8px;
          }
          .is-demo-list :is(ul, ol) li {
            padding: 8px 0;
            border-bottom: 1px solid var(--border-color);
          }
          .is-demo-list :is(ul, ol) li:last-child {
            border-bottom: none;
          }
          .is-demo-list :where(p) {
            color: var(--text-secondary);
            font-size: 0.9rem;
          }
        `}</style>

        <div className="is-demo-list" style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '12px' }}>
          <h3>Список задач</h3>
          <p>Все заголовки и элементы списка стилизованы через :is()</p>
          <ul className="info-list">
            <li>Изучить Flexbox ✓</li>
            <li>Изучить Grid ✓</li>
            <li>Изучить Container Queries</li>
            <li>Изучить :has()</li>
          </ul>
          <h4 style={{ marginTop: '16px' }}>Дополнительно</h4>
          <ol className="info-list">
            <li>oklch() цвета</li>
            <li>Scroll-driven animations</li>
          </ol>
        </div>

        <CodeBlock 
          code={`.list :is(h2, h3, h4) {
  color: var(--accent);
  margin-bottom: 8px;
}

.list :is(ul, ol) li {
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

/* :where() для легко переопределяемых стилей */
.list :where(p) {
  color: var(--text-secondary);
}`}
          title="📝 CSS"
        />
      </div>

      {/* Browser support note */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌐 Поддержка браузеров</h3>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">✅</span>
          <div className="info-box-content">
            <div className="info-box-title">Отличная поддержка!</div>
            <p>
              <code>:is()</code> и <code>:where()</code> поддерживаются во всех современных браузерах
              начиная с 2021 года. Можно смело использовать в продакшене.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
