import CodeBlock from '@/components/CodeBlock'

export default function NewProperties() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🆕 Новые CSS свойства и значения
          <span className="year-badge">2020+</span>
        </h1>
        <p>inset, gap, accent-color, text-wrap и другие</p>
      </div>

      {/* inset */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📍 inset — shorthand для позиционирования</h3>
        </div>

        <style>{`
          .inset-demo-container {
            position: relative;
            height: 200px;
            background: var(--bg-code);
            border-radius: 12px;
          }
          .inset-demo-box {
            position: absolute;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 600;
            font-size: 14px;
          }
          .inset-demo-full {
            inset: 20px;
          }
          .inset-demo-xy {
            inset: 20px 40px;
          }
          .inset-demo-trbl {
            inset: 10px 20px 30px 40px;
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>inset: 20px</div>
            <div className="inset-demo-container">
              <div className="inset-demo-box inset-demo-full">20px all</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>inset: 20px 40px</div>
            <div className="inset-demo-container">
              <div className="inset-demo-box inset-demo-xy">20px Y, 40px X</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>inset: 10px 20px 30px 40px</div>
            <div className="inset-demo-container">
              <div className="inset-demo-box inset-demo-trbl">T R B L</div>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* ❌ Старый способ */
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

/* ✅ Новый способ — inset */
.overlay {
  position: absolute;
  inset: 0;  /* = top, right, bottom, left: 0 */
}

/* Варианты */
inset: 20px;                /* все стороны */
inset: 10px 20px;           /* Y X */
inset: 10px 20px 30px;      /* top X bottom */
inset: 10px 20px 30px 40px; /* top right bottom left */

/* Отдельные свойства */
inset-block: 10px;   /* top + bottom (или start/end в LTR) */
inset-inline: 20px;  /* left + right (или start/end) */`} title="inset — короткая запись позиционирования" />
      </div>

      {/* gap everywhere */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📏 gap теперь работает везде</h3>
        </div>

        <style>{`
          .gap-flex-demo {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
          }
          .gap-flex-demo > div {
            padding: 16px 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 8px;
            font-weight: 500;
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Раньше <code>gap</code> работал только в Grid. Теперь — и во Flexbox!
        </p>

        <div className="gap-flex-demo" style={{ marginBottom: '16px' }}>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          <div>Item 5</div>
        </div>

        <CodeBlock code={`/* ❌ Старый способ — margin hack */
.flex-container > * {
  margin-right: 12px;
  margin-bottom: 12px;
}
.flex-container > *:last-child {
  margin-right: 0;
}
/* Сложно, нужны хаки для последнего элемента */

/* ✅ Новый способ — gap работает в Flexbox! */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;  /* Просто работает! */
}

/* row-gap и column-gap тоже работают */
.flex-container {
  row-gap: 16px;
  column-gap: 8px;
}

/* Поддержка: все современные браузеры с 2020+ */`} title="gap в Flexbox" />
      </div>

      {/* accent-color */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎨 accent-color — цвет нативных контролов</h3>
        </div>

        <style>{`
          .accent-demo input[type="checkbox"],
          .accent-demo input[type="radio"],
          .accent-demo input[type="range"],
          .accent-demo progress {
            accent-color: #667eea;
          }
          .accent-demo-green {
            accent-color: #10b981;
          }
          .accent-demo-pink {
            accent-color: #ec4899;
          }
        `}</style>

        <div className="accent-demo" style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked />
              Checkbox
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="radio" name="demo" defaultChecked />
              Radio
            </label>
            <input type="range" style={{ width: '150px' }} />
            <progress value="70" max="100" style={{ height: '20px' }}></progress>
          </div>
          
          <div style={{ display: 'flex', gap: '32px', marginTop: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" className="accent-demo-green" defaultChecked />
              Green
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="radio" className="accent-demo-pink" name="demo2" defaultChecked />
              Pink
            </label>
            <input type="range" className="accent-demo-green" style={{ width: '150px' }} />
            <progress className="accent-demo-pink" value="70" max="100" style={{ height: '20px' }}></progress>
          </div>
        </div>

        <CodeBlock code={`/* Одно свойство — цвет всех нативных контролов */
:root {
  accent-color: #667eea;
}

/* Работает для: */
input[type="checkbox"]
input[type="radio"]
input[type="range"]
progress

/* Можно на отдельные элементы */
.success-checkbox {
  accent-color: green;
}

/* До accent-color приходилось полностью 
   перерисовывать контролы через CSS/SVG 😱 */`} title="accent-color" />
      </div>

      {/* text-wrap: balance */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 text-wrap: balance</h3>
        </div>

        <style>{`
          .balance-demo-normal {
            text-wrap: auto;
          }
          .balance-demo-balanced {
            text-wrap: balance;
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Сравните перенос строк в заголовках:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>text-wrap: auto</div>
            <h3 className="balance-demo-normal" style={{ margin: 0, fontSize: '1.5rem', maxWidth: '300px' }}>
              This is a long headline that wraps awkwardly
            </h3>
          </div>
          <div style={{ padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>text-wrap: balance</div>
            <h3 className="balance-demo-balanced" style={{ margin: 0, fontSize: '1.5rem', maxWidth: '300px' }}>
              This is a long headline that wraps balanced
            </h3>
          </div>
        </div>

        <CodeBlock code={`/* Сбалансированный перенос строк */
h1, h2, h3 {
  text-wrap: balance;
}

/* Было: */
"This is a long headline that wraps
awkwardly"

/* Стало: */
"This is a long headline
that wraps balanced"

/* pretty — для параграфов (избегает висячих слов) */
p {
  text-wrap: pretty;
}

/* Ограничение: balance работает до 6 строк */`} title="text-wrap: balance / pretty" />
      </div>

      {/* place-* shorthand */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📐 place-* — выравнивание в одну строку</h3>
        </div>

        <style>{`
          .place-demo {
            display: grid;
            height: 150px;
            background: var(--bg-code);
            border-radius: 8px;
          }
          .place-demo > div {
            padding: 16px 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border-radius: 8px;
            font-weight: 500;
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>place-items: center</div>
            <div className="place-demo" style={{ placeItems: 'center' }}>
              <div>Center</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>place-items: end start</div>
            <div className="place-demo" style={{ placeItems: 'end start' }}>
              <div>End Start</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>place-content: center</div>
            <div className="place-demo" style={{ placeContent: 'center' }}>
              <div>Center</div>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* place-items = align-items + justify-items */
.grid {
  place-items: center;
  /* = align-items: center; justify-items: center; */
}

/* place-content = align-content + justify-content */
.grid {
  place-content: center;
  /* = align-content: center; justify-content: center; */
}

/* place-self = align-self + justify-self */
.item {
  place-self: end start;
  /* = align-self: end; justify-self: start; */
}

/* Один способ идеально центрировать! */
.container {
  display: grid;
  place-items: center;
}`} title="place-* shorthands" />
      </div>

      {/* overscroll-behavior */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🛑 overscroll-behavior</h3>
        </div>

        <style>{`
          .overscroll-demo {
            height: 150px;
            overflow-y: auto;
            padding: 16px;
            background: var(--bg-code);
            border-radius: 8px;
          }
          .overscroll-demo-contain {
            overscroll-behavior: contain;
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Попробуйте проскроллить до конца каждого блока:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Без overscroll-behavior</div>
            <div className="overscroll-demo">
              <p>Scroll me to the bottom...</p>
              <p>Keep scrolling...</p>
              <p>Almost there...</p>
              <p>End! Now keep scrolling — page will scroll too! 😱</p>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>overscroll-behavior: contain</div>
            <div className="overscroll-demo overscroll-demo-contain">
              <p>Scroll me to the bottom...</p>
              <p>Keep scrolling...</p>
              <p>Almost there...</p>
              <p>End! Scrolling stops here! ✅</p>
            </div>
          </div>
        </div>

        <CodeBlock code={`/* Проблема: скролл "проваливается" в родителя */
.modal {
  overflow-y: auto;
}
/* Когда дойдём до конца модалки, 
   начнёт скроллиться страница за ней! */

/* Решение */
.modal {
  overflow-y: auto;
  overscroll-behavior: contain;
  /* Скролл останавливается на границе */
}

/* Значения */
overscroll-behavior: auto;     /* по умолчанию */
overscroll-behavior: contain;  /* не передавать родителю */
overscroll-behavior: none;     /* + отключить bounce эффект */

/* Отдельно по осям */
overscroll-behavior-y: contain;
overscroll-behavior-x: none;`} title="overscroll-behavior — контроль скролла" />
      </div>

      {/* contain */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📦 contain — изоляция для производительности</h3>
        </div>

        <CodeBlock code={`/* contain изолирует элемент для оптимизации */

/* Изоляция layout */
.widget {
  contain: layout;
  /* Изменения внутри не влияют на layout снаружи */
}

/* Изоляция paint */
.card {
  contain: paint;
  /* Контент не рисуется за пределами */
}

/* Изоляция size */
.fixed-size {
  contain: size;
  /* Размер не зависит от контента */
}

/* Полная изоляция */
.isolated {
  contain: strict;
  /* = contain: layout paint size */
}

/* content = layout + paint (без size) */
.component {
  contain: content;
}

/* Нужно для Container Queries! */
.container {
  container-type: inline-size;
  /* Автоматически добавляет contain: inline-size */
}`} title="contain для производительности" />
      </div>

      {/* Summary */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📋 Сводная таблица новых свойств</h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Свойство</th>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Год</th>
                <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border)' }}>Описание</th>
              </tr>
            </thead>
            <tbody>
              {[
                { prop: 'inset', year: '2020', desc: 'Shorthand для top/right/bottom/left' },
                { prop: 'gap (flex)', year: '2020', desc: 'gap теперь работает в Flexbox' },
                { prop: 'aspect-ratio', year: '2021', desc: 'Соотношение сторон без хаков' },
                { prop: 'accent-color', year: '2021', desc: 'Цвет нативных контролов' },
                { prop: 'text-wrap', year: '2023', desc: 'balance/pretty для переноса' },
                { prop: 'place-*', year: '2020', desc: 'Shorthand для align + justify' },
                { prop: 'overscroll-behavior', year: '2018', desc: 'Контроль прокрутки' },
                { prop: 'contain', year: '2020', desc: 'Изоляция для оптимизации' },
                { prop: 'content-visibility', year: '2020', desc: 'Ленивый рендеринг' },
              ].map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>
                    <code style={{ color: 'var(--accent-vue)' }}>{row.prop}</code>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)' }}>{row.year}</td>
                  <td style={{ padding: '10px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)' }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
