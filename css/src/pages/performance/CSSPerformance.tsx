import { useState } from 'react'

type Tab = 'pipeline' | 'cost' | 'containment' | 'profiling'

export default function CSSPerformance() {
  const [tab, setTab] = useState<Tab>('pipeline')

  return (
    <div className="demo-container">
      <h1>⚡ CSS Performance и Rendering</h1>
      <p className="section-desc">
        Reflow, repaint, compositing, will-change, contain, стоимость селекторов —
        как CSS влияет на производительность и как это профилировать.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['pipeline', '🔄 Rendering Pipeline'],
          ['cost', '💰 Стоимость свойств'],
          ['containment', '📦 Containment'],
          ['profiling', '🔬 Профилирование'],
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

      {tab === 'pipeline' && (
        <>
          <section className="card">
            <h2>🔄 Rendering Pipeline браузера</h2>
            <div style={{
              display: 'flex', gap: 8, flexWrap: 'wrap', padding: 16,
              background: 'var(--bg-secondary)', borderRadius: 8, alignItems: 'center',
            }}>
              {[
                { step: 'Style', color: '#007AFF', desc: 'Вычисление стилей' },
                { step: 'Layout', color: '#FF9500', desc: 'Расчёт размеров и позиций' },
                { step: 'Paint', color: '#34C759', desc: 'Заполнение пикселей' },
                { step: 'Composite', color: '#AF52DE', desc: 'Слияние слоёв GPU' },
              ].map((s, i) => (
                <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    padding: '12px 20px', borderRadius: 8,
                    background: s.color, color: '#fff', textAlign: 'center',
                    minWidth: 80, fontWeight: 600,
                  }}>
                    {s.step}
                    <div style={{ fontSize: '0.7rem', fontWeight: 400, opacity: 0.9 }}>{s.desc}</div>
                  </div>
                  {i < 3 && <span style={{ fontSize: '1.2rem' }}>→</span>}
                </div>
              ))}
            </div>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Правило:</strong> Чем позже в pipeline начинается изменение, тем оно дешевле.
              Composite-only свойства (transform, opacity) — самые дешёвые.
            </div>
          </section>

          <section className="card">
            <h2>🔀 Reflow vs Repaint vs Composite</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Операция</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что происходит</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Стоимость</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Триггеры</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#FF3B30' }}>Reflow (Layout)</strong></td>
                  <td style={{ padding: 8 }}>Пересчёт геометрии всех affected элементов</td>
                  <td style={{ padding: 8 }}>🔴 Дорого</td>
                  <td style={{ padding: 8 }}><code>width</code>, <code>height</code>, <code>margin</code>, <code>padding</code>, <code>display</code>, <code>position</code>, <code>font-size</code></td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#FF9500' }}>Repaint</strong></td>
                  <td style={{ padding: 8 }}>Перерисовка пикселей (без изменения геометрии)</td>
                  <td style={{ padding: 8 }}>🟡 Средне</td>
                  <td style={{ padding: 8 }}><code>color</code>, <code>background</code>, <code>border-color</code>, <code>box-shadow</code>, <code>visibility</code></td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><strong style={{ color: '#34C759' }}>Composite</strong></td>
                  <td style={{ padding: 8 }}>Только GPU-операция над уже отрисованными слоями</td>
                  <td style={{ padding: 8 }}>🟢 Дёшево</td>
                  <td style={{ padding: 8 }}><code>transform</code>, <code>opacity</code>, <code>filter</code>, <code>will-change</code></td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>⚡ Layout Thrashing</h2>
            <p>
              Принудительный синхронный layout — самый частый performance-баг.
              Происходит при чередовании чтения и записи DOM-свойств.
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`// ❌ Layout thrashing — N reflows вместо 1
for (const el of elements) {
  const height = el.offsetHeight  // READ → force layout
  el.style.height = height + 10 + 'px'  // WRITE → invalidate
  // Следующий read снова force layout!
}

// ✅ Batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight) // all READs
elements.forEach((el, i) => {
  el.style.height = heights[i] + 10 + 'px' // all WRITEs
})

// Свойства, вызывающие forced layout при чтении:
// offsetTop/Left/Width/Height
// scrollTop/Left/Width/Height
// clientTop/Left/Width/Height
// getComputedStyle()
// getBoundingClientRect()`}
            </pre>
          </section>
        </>
      )}

      {tab === 'cost' && (
        <>
          <section className="card">
            <h2>💰 Стоимость CSS-свойств</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Стоимость</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Свойства</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Pipeline</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#34C759' }}>🟢 Дёшево</strong></td>
                  <td style={{ padding: 8 }}><code>transform</code>, <code>opacity</code>, <code>filter</code></td>
                  <td style={{ padding: 8 }}>Composite only</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><strong style={{ color: '#FF9500' }}>🟡 Средне</strong></td>
                  <td style={{ padding: 8 }}><code>color</code>, <code>background-color</code>, <code>border-color</code>, <code>box-shadow</code></td>
                  <td style={{ padding: 8 }}>Paint + Composite</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><strong style={{ color: '#FF3B30' }}>🔴 Дорого</strong></td>
                  <td style={{ padding: 8 }}><code>width</code>, <code>height</code>, <code>margin</code>, <code>padding</code>, <code>top/left</code>, <code>font-size</code></td>
                  <td style={{ padding: 8 }}>Layout + Paint + Composite</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>✅ Паттерны production-анимаций</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* ❌ Анимация через top/left — reflow каждый кадр */
.bad {
  position: absolute;
  transition: top 0.3s, left 0.3s;
}
.bad:hover {
  top: 10px;
  left: 20px;
}

/* ✅ Анимация через transform — composite only */
.good {
  transition: transform 0.3s;
}
.good:hover {
  transform: translate(20px, 10px);
}

/* ❌ Анимация width/height */
.bad-resize {
  transition: width 0.3s, height 0.3s;
}

/* ✅ Анимация scale */
.good-resize {
  transition: transform 0.3s;
}
.good-resize:hover {
  transform: scale(1.1);
}

/* ❌ Скрытие через display: none → reflow */
/* ✅ Скрытие через opacity: 0 → composite */`}
            </pre>
          </section>

          <section className="card">
            <h2>🎯 will-change — подсказка для GPU</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Сообщаем браузеру, что будет анимация */
.animated-element {
  will-change: transform;
  /* Создаёт отдельный composite layer */
}

/* ⚠️ Правила will-change: */
/* 1. НЕ ставить на всё подряд */
.everything { will-change: transform; } /* ❌ */

/* 2. Включать перед анимацией, выключать после */
.card:hover {
  will-change: transform;
}
.card.animating {
  transform: scale(1.05);
}

/* 3. Не на статичные элементы */
/* 4. Каждый will-change = отдельный GPU-слой = память */
/* 5. Альтернатива: transform: translateZ(0) — hack */`}
            </pre>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>⚠️ Осторожно:</strong> Каждый composite layer потребляет GPU-память.
              100 элементов с <code>will-change</code> = 100 текстур. На мобильных это может
              привести к вылету приложения.
            </div>
          </section>

          <section className="card">
            <h2>🔍 Стоимость селекторов</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Селектор</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Скорость</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Почему</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sel: '#id', speed: '🟢 Быстро', why: 'Прямой lookup по hash' },
                  { sel: '.class', speed: '🟢 Быстро', why: 'Индекс по классу' },
                  { sel: 'tag', speed: '🟢 Быстро', why: 'Индекс по тегу' },
                  { sel: '[attr]', speed: '🟡 Средне', why: 'Перебор элементов с атрибутом' },
                  { sel: ':nth-child()', speed: '🟡 Средне', why: 'Подсчёт siblings' },
                  { sel: 'div > p > span', speed: '🟡 Средне', why: 'Каждый уровень — проверка (RTL)' },
                  { sel: 'div span', speed: '🟡 Средне', why: 'Поиск по всем предкам (RTL)' },
                  { sel: '*', speed: '🔴 Медленно', why: 'Проверяет каждый элемент' },
                ].map(r => (
                  <tr key={r.sel} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontFamily: 'monospace' }}>{r.sel}</td>
                    <td style={{ padding: 8 }}>{r.speed}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 На практике:</strong> Стоимость селекторов редко является bottleneck.
              На странице с 10000+ элементов — да. На обычном SPA — нет. Focus на reflow/repaint.
            </div>
          </section>
        </>
      )}

      {tab === 'containment' && (
        <>
          <section className="card">
            <h2>📦 CSS Containment — contain</h2>
            <p>
              <code>contain</code> сообщает браузеру, что элемент изолирован от остальной страницы.
              Браузер может оптимизировать rendering, пропуская пересчёт для внешних элементов.
            </p>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Значение</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что изолирует</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Ограничения</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { val: 'layout', what: 'Layout элемента не влияет на внешний layout', limit: 'Ведёт себя как BFC (Block Formatting Context)' },
                  { val: 'paint', what: 'Содержимое не рисуется за пределами', limit: 'Как overflow: hidden + stacking context' },
                  { val: 'size', what: 'Размер не зависит от содержимого', limit: 'Нужно явно задать width/height' },
                  { val: 'style', what: 'CSS-counters не утекают наружу', limit: 'Минимальный эффект' },
                  { val: 'strict', what: 'layout + paint + size', limit: 'Максимальная оптимизация, но нужен явный размер' },
                  { val: 'content', what: 'layout + paint + style', limit: 'Хороший баланс — не требует фиксированного размера' },
                ].map(r => (
                  <tr key={r.val} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><code>contain: {r.val}</code></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.limit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🛠 Паттерны использования contain</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`/* Карточки в списке — каждая изолирована */
.card-list .card {
  contain: content;
  /* Изменение одной карточки не вызывает
     reflow остальных */
}

/* Виджет с фиксированным размером */
.sidebar-widget {
  contain: strict;
  width: 300px;
  height: 200px;
  /* Максимальная оптимизация: контент
     полностью изолирован */
}

/* Длинный список (виртуализация) */
.virtual-list-item {
  contain: strict;
  height: 60px;
  /* Не рассчитывать layout для скрытых items */
}

/* content-visibility: auto — ленивый rendering */
.offscreen-section {
  content-visibility: auto;
  contain-intrinsic-size: 0 500px;
  /* Не рендерить пока не видимо.
     contain-intrinsic-size — placeholder-размер */
}`}
            </pre>
          </section>

          <section className="card">
            <h2>👁️ content-visibility — ленивый rendering</h2>
            <p>
              <code>content-visibility: auto</code> — самый мощный инструмент производительности CSS.
              Браузер пропускает rendering для элементов вне viewport.
            </p>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Значение</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Поведение</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>visible</code></td>
                  <td style={{ padding: 8 }}>Обычное поведение (default)</td>
                  <td style={{ padding: 8 }}>—</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}><code>auto</code></td>
                  <td style={{ padding: 8 }}>Рендерить только при видимости</td>
                  <td style={{ padding: 8 }}>Длинные страницы, списки, FAQ</td>
                </tr>
                <tr>
                  <td style={{ padding: 8 }}><code>hidden</code></td>
                  <td style={{ padding: 8 }}>Никогда не рендерить содержимое</td>
                  <td style={{ padding: 8 }}>Скрытые off-canvas панели</td>
                </tr>
              </tbody>
            </table>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>📊 Результат:</strong> На странице с 100+ секциями <code>content-visibility: auto</code>
              может уменьшить initial rendering time на 50-90%. Chrome 85+.
            </div>
          </section>
        </>
      )}

      {tab === 'profiling' && (
        <>
          <section className="card">
            <h2>🔬 Chrome DevTools — Performance Panel</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Метрика</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что показывает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Хорошо</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Плохо</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { metric: 'Recalculate Style', what: 'Время пересчёта CSS', good: '< 5ms', bad: '> 15ms (jank)' },
                  { metric: 'Layout', what: 'Время reflow', good: '< 5ms', bad: '> 10ms на каждый кадр' },
                  { metric: 'Paint', what: 'Время перерисовки', good: '< 3ms', bad: '> 10ms' },
                  { metric: 'Composite Layers', what: 'Кол-во GPU-слоёв', good: '< 30', bad: '> 100 (OOM на мобильных)' },
                  { metric: 'FPS', what: 'Кадры в секунду', good: '60 fps', bad: '< 30 fps (visible jank)' },
                ].map(r => (
                  <tr key={r.metric} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.metric}</strong></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: '#34C759' }}>{r.good}</td>
                    <td style={{ padding: 8, color: '#FF3B30' }}>{r.bad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>🛠 Пошаговая диагностика</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { step: '1. Recording', desc: 'Performance tab → Record → взаимодействие → Stop', tip: 'Тестировать на 4x CPU throttle' },
                { step: '2. Ищем red bars', desc: 'Красные полосы в FPS = dropped frames', tip: 'Zoom in на проблемный участок' },
                { step: '3. Layout events', desc: 'Фиолетовые блоки = Layout/Reflow', tip: 'Hover → кто вызвал reflow' },
                { step: '4. Paint events', desc: 'Зелёные блоки = Paint', tip: 'Rendering tab → Paint flashing' },
                { step: '5. Layers panel', desc: 'Shift+Cmd+1 → Layers → 3D view', tip: 'Показывает все composite layers' },
                { step: '6. Fix & measure', desc: 'Заменить top/left → transform, добавить contain', tip: 'Before/after recording для сравнения' },
              ].map(s => (
                <div key={s.step} style={{
                  padding: 12, borderRadius: 8, border: '1px solid var(--border)',
                  display: 'grid', gridTemplateColumns: '1fr 2fr 2fr', gap: 8,
                }}>
                  <strong>{s.step}</strong>
                  <span>{s.desc}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>💡 {s.tip}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>📋 Чеклист CSS Performance</h2>
            <div style={{ lineHeight: 2 }}>
              {[
                'Анимировать только transform, opacity, filter',
                'will-change только на анимируемые элементы, снимать после',
                'Избегать layout thrashing (batch reads/writes)',
                'content-visibility: auto для длинных страниц',
                'contain: content для изолированных компонентов (карточки, виджеты)',
                'Не использовать * в селекторах на больших DOM',
                'Проверять Paint flashing при scroll',
                'Тестировать на 4x CPU throttle в DevTools',
                'Количество composite layers < 30',
              ].map((item, i) => (
                <div key={i}>☑️ {item}</div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
