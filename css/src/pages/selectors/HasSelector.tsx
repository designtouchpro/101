import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function HasSelector() {
  const [hasChecked, setHasChecked] = useState(false)
  const [hasText, setHasText] = useState('')
  const [hasImage, setHasImage] = useState(true)

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🎯 :has() Selector
          <span className="year-badge">2022</span>
        </h1>
        <p>Наконец-то! CSS может выбирать родителей на основе их детей</p>
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/:has" 
          target="_blank" 
          rel="noopener noreferrer"
          className="mdn-link"
        >
          📚 MDN: :has()
        </a>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🎉</span>
        <div className="info-box-content">
          <div className="info-box-title">Родительский селектор — святой грааль CSS!</div>
          <p>
            20 лет разработчики мечтали о возможности "если внутри есть X, то стилизуй родителя Y".
            В 2022 году мечта сбылась!
          </p>
        </div>
      </div>

      {/* Interactive Demo 1: Checkbox */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: Form с чекбоксом</h3>
          <span className="card-badge">Интерактив</span>
        </div>

        <style>{`
          .has-demo-form {
            padding: 20px;
            border: 2px solid var(--border-color);
            border-radius: 12px;
            transition: all 0.3s ease;
          }
          .has-demo-form:has(input:checked) {
            border-color: var(--accent-green);
            background: rgba(34, 197, 94, 0.1);
          }
          .has-demo-form:has(input:checked) .submit-btn {
            background: var(--accent-green);
          }
        `}</style>

        <div className="has-demo-form">
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={hasChecked}
              onChange={e => setHasChecked(e.target.checked)}
              style={{ width: '20px', height: '20px', accentColor: 'var(--accent-green)' }}
            />
            <span>Я согласен с условиями</span>
          </label>
          <button 
            className="submit-btn"
            style={{ 
              marginTop: '16px', 
              padding: '12px 24px', 
              border: 'none',
              borderRadius: '8px',
              background: hasChecked ? 'var(--accent-green)' : 'var(--text-muted)',
              color: 'white',
              fontWeight: 600,
              cursor: hasChecked ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease'
            }}
          >
            Отправить
          </button>
        </div>

        <CodeBlock 
          code={`/* Форма меняет стиль, если чекбокс отмечен */
form:has(input:checked) {
  border-color: green;
  background: rgba(34, 197, 94, 0.1);
}

/* Кнопка активируется */
form:has(input:checked) .submit-btn {
  background: green;
  cursor: pointer;
}`}
          title="📝 CSS"
        />
      </div>

      {/* Interactive Demo 2: Input focus */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: Подсветка при фокусе</h3>
        </div>

        <style>{`
          .has-input-group {
            padding: 16px;
            border: 2px solid var(--border-color);
            border-radius: 8px;
            transition: all 0.3s ease;
          }
          .has-input-group:has(input:focus) {
            border-color: var(--accent-css);
            box-shadow: 0 0 0 4px rgba(38, 77, 228, 0.2);
          }
          .has-input-group:has(input:focus) label {
            color: var(--accent-css-light);
          }
        `}</style>

        <div className="has-input-group" style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, transition: 'color 0.3s' }}>
            Email
          </label>
          <input 
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '1rem'
            }}
          />
        </div>

        <CodeBlock 
          code={`/* Подсвечиваем группу, когда input в фокусе */
.input-group:has(input:focus) {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(38, 77, 228, 0.2);
}

/* Меняем цвет label */
.input-group:has(input:focus) label {
  color: var(--accent);
}`}
          title="📝 CSS"
        />
      </div>

      {/* Card with/without image */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎮 Демо: Карточка с/без картинки</h3>
        </div>

        <div className="controls">
          <button 
            className={`btn ${hasImage ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setHasImage(!hasImage)}
          >
            {hasImage ? '🖼️ Убрать картинку' : '🖼️ Добавить картинку'}
          </button>
        </div>

        <style>{`
          .has-card {
            border: 1px solid var(--border-color);
            border-radius: 12px;
            overflow: hidden;
            max-width: 300px;
          }
          .has-card:has(img) .has-card-content {
            padding: 16px;
          }
          .has-card:not(:has(img)) .has-card-content {
            padding: 24px;
            text-align: center;
          }
          .has-card:not(:has(img)) .has-card-title {
            font-size: 1.5rem;
          }
        `}</style>

        <div className="has-card">
          {hasImage && (
            <img 
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150' viewBox='0 0 300 150'%3E%3Crect fill='%23264de4' width='300' height='150'/%3E%3Ctext x='150' y='85' text-anchor='middle' fill='white' font-size='24'%3E🖼️ Image%3C/text%3E%3C/svg%3E"
              alt="Placeholder"
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
          )}
          <div className="has-card-content">
            <h4 className="has-card-title" style={{ marginBottom: '8px' }}>Card Title</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Стили меняются в зависимости от наличия картинки
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* Если в карточке есть картинка */
.card:has(img) .content {
  padding: 16px;
}

/* Если картинки нет */
.card:not(:has(img)) .content {
  padding: 24px;
  text-align: center;
}

.card:not(:has(img)) .title {
  font-size: 1.5rem;
}`}
          title="📝 CSS"
        />
      </div>

      {/* Previous Sibling */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">↩️ Предыдущий sibling (невозможно в старом CSS!)</h3>
          <span className="card-badge">Магия!</span>
        </div>

        <div className="info-box success">
          <span className="info-box-icon">🤯</span>
          <div className="info-box-content">
            <div className="info-box-title">Это было невозможно!</div>
            <p>
              В CSS всегда можно было выбрать следующий sibling (<code>+ ~</code>), 
              но не предыдущий. <code>:has()</code> решает и эту проблему!
            </p>
          </div>
        </div>

        <CodeBlock 
          code={`/* Предыдущий элемент перед :hover */
.item:has(+ .item:hover) {
  /* Стили для элемента ПЕРЕД hover */
  transform: scale(0.95);
}

/* Все предыдущие элементы */
.item:has(~ .item:hover) {
  opacity: 0.5;
}`}
          title="📝 Previous Sibling Selector"
        />

        <style>{`
          .sibling-demo {
            display: flex;
            gap: 12px;
            padding: 20px;
            background: var(--bg-code);
            border-radius: 12px;
          }
          .sibling-item {
            padding: 20px 30px;
            background: var(--accent-css);
            color: white;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          .sibling-item:hover {
            background: var(--accent-purple);
            transform: scale(1.1);
          }
          .sibling-item:has(+ .sibling-item:hover) {
            transform: scale(0.9);
            opacity: 0.7;
          }
        `}</style>

        <div className="sibling-demo" style={{ marginTop: '16px' }}>
          <div className="sibling-item">1</div>
          <div className="sibling-item">2</div>
          <div className="sibling-item">3</div>
          <div className="sibling-item">4</div>
          <div className="sibling-item">5</div>
        </div>
        <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Наведите на элемент — предыдущий уменьшится!
        </p>
      </div>

      {/* Real-world examples */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌍 Реальные примеры использования</h3>
        </div>

        <CodeBlock 
          code={`/* 1. Форма с ошибками */
form:has(.error) {
  border-color: red;
}

/* 2. Таблица с выбранными строками */
table:has(tr.selected) .bulk-actions {
  display: flex;
}

/* 3. Навигация: подсветить родительский пункт при hover подменю */
.nav-item:has(.submenu:hover) {
  background: var(--bg-active);
}

/* 4. Статья без картинок — больше padding */
article:not(:has(img)) {
  padding: 2rem;
}

/* 5. Quantity selector — изменить стили если 0 */
.quantity:has(input[value="0"]) {
  opacity: 0.5;
}

/* 6. Sticky header при скролле (с JS) */
body:has(.scrolled) header {
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}`}
          title="📝 Практические примеры"
        />
      </div>
    </div>
  )
}
