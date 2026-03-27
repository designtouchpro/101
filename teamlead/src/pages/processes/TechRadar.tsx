import { useState } from 'react'

type Ring = 'adopt' | 'trial' | 'assess' | 'hold'
type Quadrant = 'languages' | 'tools' | 'platforms' | 'techniques'

interface RadarItem {
  name: string
  ring: Ring
  quadrant: Quadrant
  desc: string
  moved?: 'up' | 'down' | 'new'
}

const rings: Record<Ring, { name: string; color: string; desc: string }> = {
  adopt: { name: 'Adopt', color: '#22c55e', desc: 'Используем активно. Рекомендуем всем командам.' },
  trial: { name: 'Trial', color: '#6366f1', desc: 'Пробуем на некритичных проектах. Выглядит перспективно.' },
  assess: { name: 'Assess', color: '#f59e0b', desc: 'Изучаем. Стоит обратить внимание, но рано принимать решение.' },
  hold: { name: 'Hold', color: '#ef4444', desc: 'Не используем для новых проектов. Легаси или не оправдало ожиданий.' },
}

const quadrants: Record<Quadrant, { name: string; icon: string }> = {
  languages: { name: 'Языки & Фреймворки', icon: '💻' },
  tools: { name: 'Инструменты', icon: '🔧' },
  platforms: { name: 'Платформы', icon: '☁️' },
  techniques: { name: 'Техники & Практики', icon: '📐' },
}

const sampleItems: RadarItem[] = [
  // Languages
  { name: 'TypeScript', ring: 'adopt', quadrant: 'languages', desc: 'Стандарт для frontend и Node.js проектов' },
  { name: 'React 19', ring: 'adopt', quadrant: 'languages', desc: 'Основной UI-фреймворк' },
  { name: 'Rust', ring: 'assess', quadrant: 'languages', desc: 'Для performance-critical сервисов', moved: 'new' },
  { name: 'Vue 3', ring: 'trial', quadrant: 'languages', desc: 'Альтернатива React для некоторых проектов' },
  { name: 'Angular', ring: 'hold', quadrant: 'languages', desc: 'Не стартуем новые проекты на Angular' },
  { name: 'Go', ring: 'trial', quadrant: 'languages', desc: 'Для микросервисов и CLI', moved: 'up' },

  // Tools
  { name: 'GitHub Actions', ring: 'adopt', quadrant: 'tools', desc: 'CI/CD по умолчанию' },
  { name: 'Vitest', ring: 'adopt', quadrant: 'tools', desc: 'Тестирование для Vite-проектов', moved: 'up' },
  { name: 'Biome', ring: 'trial', quadrant: 'tools', desc: 'Замена ESLint + Prettier', moved: 'new' },
  { name: 'Webpack', ring: 'hold', quadrant: 'tools', desc: 'Переходим на Vite', moved: 'down' },
  { name: 'Linear', ring: 'adopt', quadrant: 'tools', desc: 'Менеджмент задач' },
  { name: 'Playwright', ring: 'adopt', quadrant: 'tools', desc: 'E2E тестирование' },

  // Platforms
  { name: 'Kubernetes', ring: 'adopt', quadrant: 'platforms', desc: 'Оркестрация контейнеров' },
  { name: 'Vercel', ring: 'trial', quadrant: 'platforms', desc: 'Хостинг фронтенда' },
  { name: 'Supabase', ring: 'assess', quadrant: 'platforms', desc: 'BaaS для быстрого старта', moved: 'new' },
  { name: 'Heroku', ring: 'hold', quadrant: 'platforms', desc: 'Дорого, ограничено' },
  { name: 'AWS', ring: 'adopt', quadrant: 'platforms', desc: 'Основной облачный провайдер' },

  // Techniques
  { name: 'Trunk-based development', ring: 'adopt', quadrant: 'techniques', desc: 'Короткоживущие ветки, частая интеграция' },
  { name: 'Feature flags', ring: 'adopt', quadrant: 'techniques', desc: 'Деплой != релиз' },
  { name: 'ADR', ring: 'trial', quadrant: 'techniques', desc: 'Architecture Decision Records', moved: 'up' },
  { name: 'Micro frontends', ring: 'assess', quadrant: 'techniques', desc: 'Нужно ли нам это?' },
  { name: 'Gitflow', ring: 'hold', quadrant: 'techniques', desc: 'Слишком сложный branching model', moved: 'down' },
]

export default function TechRadar() {
  const [activeQuadrant, setActiveQuadrant] = useState<Quadrant | null>(null)
  const [activeRing, setActiveRing] = useState<Ring | null>(null)
  const [selectedItem, setSelectedItem] = useState<RadarItem | null>(null)
  const [userItems, setUserItems] = useState<RadarItem[]>([])
  const [newItemName, setNewItemName] = useState('')
  const [newItemQuadrant, setNewItemQuadrant] = useState<Quadrant>('languages')
  const [newItemRing, setNewItemRing] = useState<Ring>('assess')

  const filteredItems = sampleItems.filter(item => {
    if (activeQuadrant && item.quadrant !== activeQuadrant) return false
    if (activeRing && item.ring !== activeRing) return false
    return true
  })

  const allItems = [...sampleItems, ...userItems]

  const addItem = () => {
    if (!newItemName.trim()) return
    setUserItems(prev => [...prev, {
      name: newItemName,
      ring: newItemRing,
      quadrant: newItemQuadrant,
      desc: 'Добавлено вами',
      moved: 'new',
    }])
    setNewItemName('')
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📡 Tech Radar</h1>
        <p>Инструмент для визуализации технологических решений компании. Придуман в ThoughtWorks.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Tech Radar</strong> — это методология управления технологическим стеком, впервые опубликованная компанией ThoughtWorks в 2010 году.
          Суть проста: все технологии (языки, фреймворки, инструменты, платформы) размещаются на радаре из 4 колец — от «Adopt» (используем активно)
          до «Hold» (замораживаем). Радар помогает командам принимать согласованные решения и избегать «зоопарка» технологий.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Зачем нужен радар? В растущей организации каждая команда склонна выбирать свой стек. Без единого ориентира это приводит к дублированию
          компетенций, проблемам с поддержкой и найму под десятки разных технологий. Tech Radar делает выбор прозрачным: новичок видит,
          какие технологии поддерживаются, а тимлид может аргументировать, почему не стоит внедрять очередной framework «потому что модно».
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Как внедрить</strong>: Соберите Tech leads раз в квартал. Каждый предлагает «блипы» (blips) — технологии с обоснованием кольца.
            Обсудите спорные, зафиксируйте результат. Опубликуйте радар внутри компании (Confluence, Notion, GitHub Pages).
            Обновляйте раз в 3–6 месяцев — технологии двигаются между кольцами, а не добавляются и забываются.
          </div>
        </div>
      </div>

      {/* What is it */}
      <div className="card">
        <h3>Что такое Tech Radar?</h3>
        <p style={{ marginBottom: 16 }}>
          Визуальный инструмент для управления технологическим стеком. Помогает командам понять:
          <strong> что использовать, что пробовать, а от чего уходить</strong>.
        </p>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: 8 }}>🎯 4 Кольца (Rings)</h4>
            {Object.entries(rings).map(([key, ring]) => (
              <div
                key={key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', borderRadius: 8,
                  marginBottom: 6, cursor: 'pointer',
                  background: activeRing === key ? `${ring.color}20` : 'transparent',
                  border: `1px solid ${activeRing === key ? ring.color : 'transparent'}`,
                }}
                onClick={() => setActiveRing(activeRing === key ? null : key as Ring)}
              >
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: ring.color }} />
                <div>
                  <strong style={{ color: ring.color }}>{ring.name}</strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: 8 }}>{ring.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ marginBottom: 8 }}>📊 4 Квадранта (Quadrants)</h4>
            {Object.entries(quadrants).map(([key, q]) => (
              <div
                key={key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 12px', borderRadius: 8,
                  marginBottom: 6, cursor: 'pointer',
                  background: activeQuadrant === key ? 'rgba(99,102,241,0.1)' : 'transparent',
                  border: `1px solid ${activeQuadrant === key ? 'var(--accent-main)' : 'transparent'}`,
                }}
                onClick={() => setActiveQuadrant(activeQuadrant === key ? null : key as Quadrant)}
              >
                <span>{q.icon}</span>
                <strong>{q.name}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Radar */}
      <div className="card">
        <h3>🎯 Интерактивный Radar</h3>
        <p style={{ marginBottom: 8, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Кликните на кольцо или квадрант выше, чтобы фильтровать. Кликните на технологию для деталей.
        </p>

        {/* Radar visual (simplified) */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: 500,
          aspectRatio: '1',
          margin: '0 auto',
          background: 'var(--bg-code)',
          borderRadius: '50%',
          overflow: 'hidden',
        }}>
          {/* Rings */}
          {[
            { ring: 'hold' as Ring, size: 100 },
            { ring: 'assess' as Ring, size: 75 },
            { ring: 'trial' as Ring, size: 50 },
            { ring: 'adopt' as Ring, size: 25 },
          ].map(r => (
            <div key={r.ring} style={{
              position: 'absolute',
              width: `${r.size}%`,
              height: `${r.size}%`,
              borderRadius: '50%',
              border: `1px solid ${rings[r.ring].color}40`,
              background: `${rings[r.ring].color}08`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }} />
          ))}

          {/* Cross lines for quadrants */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: 'var(--border-color)' }} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 1, background: 'var(--border-color)' }} />

          {/* Quadrant labels */}
          <div style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{quadrants.languages.icon} Языки</div>
          <div style={{ position: 'absolute', top: 8, right: 8, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{quadrants.tools.icon} Инструменты</div>
          <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{quadrants.platforms.icon} Платформы</div>
          <div style={{ position: 'absolute', bottom: 8, right: 8, fontSize: '0.65rem', color: 'var(--text-muted)' }}>{quadrants.techniques.icon} Техники</div>

          {/* Items as dots */}
          {filteredItems.map((item, idx) => {
            const ringDistance = { adopt: 12, trial: 37, assess: 62, hold: 87 }[item.ring]
            const quadAngle = { languages: 225, tools: 315, platforms: 135, techniques: 45 }[item.quadrant]
            const angle = (quadAngle + (idx % 6) * 12 - 30) * (Math.PI / 180)
            const jitter = ringDistance + (idx % 3) * 4 - 4
            const x = 50 + (jitter / 100) * 45 * Math.cos(angle)
            const y = 50 + (jitter / 100) * 45 * Math.sin(angle)

            return (
              <div
                key={item.name}
                onClick={() => setSelectedItem(selectedItem?.name === item.name ? null : item)}
                style={{
                  position: 'absolute',
                  left: `${x}%`,
                  top: `${y}%`,
                  width: selectedItem?.name === item.name ? 14 : 10,
                  height: selectedItem?.name === item.name ? 14 : 10,
                  borderRadius: '50%',
                  background: rings[item.ring].color,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'all 0.2s',
                  boxShadow: selectedItem?.name === item.name ? `0 0 12px ${rings[item.ring].color}` : 'none',
                }}
                title={item.name}
              />
            )
          })}
        </div>

        {selectedItem && (
          <div className="info-box" style={{ marginTop: 16, borderColor: rings[selectedItem.ring].color }}>
            <div className="info-box-icon" style={{ fontSize: '0.9rem' }}>
              {selectedItem.moved === 'up' ? '⬆️' : selectedItem.moved === 'down' ? '⬇️' : selectedItem.moved === 'new' ? '🆕' : '●'}
            </div>
            <div className="info-box-content">
              <div className="info-box-title">{selectedItem.name}</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                <span className="tag" style={{ background: `${rings[selectedItem.ring].color}20`, color: rings[selectedItem.ring].color }}>
                  {rings[selectedItem.ring].name}
                </span>
                <span className="tag blue">{quadrants[selectedItem.quadrant].name}</span>
              </div>
              {selectedItem.desc}
            </div>
          </div>
        )}
      </div>

      {/* Item list */}
      <div className="card">
        <h3>📋 Все технологии</h3>

        {(Object.keys(quadrants) as Quadrant[]).map(q => {
          const items = allItems.filter(i => i.quadrant === q)
          if (activeQuadrant && activeQuadrant !== q) return null
          return (
            <div key={q} style={{ marginBottom: 20 }}>
              <h4>{quadrants[q].icon} {quadrants[q].name}</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {(Object.keys(rings) as Ring[]).map(r => {
                  const ringItems = items.filter(i => i.ring === r)
                  if (activeRing && activeRing !== r) return null
                  if (ringItems.length === 0) return null
                  return ringItems.map(item => (
                    <span
                      key={item.name}
                      className="tag"
                      style={{ background: `${rings[r].color}20`, color: rings[r].color, cursor: 'pointer' }}
                      onClick={() => setSelectedItem(item)}
                    >
                      {item.moved === 'new' ? '🆕 ' : item.moved === 'up' ? '⬆️ ' : item.moved === 'down' ? '⬇️ ' : ''}
                      {item.name}
                    </span>
                  ))
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add your own */}
      <div className="card">
        <h3>➕ Добавь свою технологию</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 2, minWidth: 180 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Название</label>
            <input
              className="input"
              placeholder="Next.js, Bun, etc."
              value={newItemName}
              onChange={e => setNewItemName(e.target.value)}
            />
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Квадрант</label>
            <select className="input" value={newItemQuadrant} onChange={e => setNewItemQuadrant(e.target.value as Quadrant)}>
              {(Object.entries(quadrants) as [Quadrant, typeof quadrants[Quadrant]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.icon} {v.name}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: 4 }}>Кольцо</label>
            <select className="input" value={newItemRing} onChange={e => setNewItemRing(e.target.value as Ring)}>
              {(Object.entries(rings) as [Ring, typeof rings[Ring]][]).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={addItem} style={{ height: 42 }}>
            Добавить
          </button>
        </div>

        {userItems.length > 0 && (
          <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {userItems.map((item, i) => (
              <span key={i} className="tag" style={{ background: `${rings[item.ring].color}20`, color: rings[item.ring].color }}>
                🆕 {item.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* How to maintain */}
      <div className="card">
        <h3>🔄 Как вести Tech Radar</h3>
        <div className="grid-2">
          <div className="info-box success">
            <div className="info-box-content">
              <div className="info-box-title">Процесс</div>
              <ol className="info-list">
                <li>Обновлять <strong>раз в квартал</strong></li>
                <li>Решения принимает <strong>Architecture Guild</strong></li>
                <li>Любой может <strong>предложить</strong> изменение</li>
                <li>Каждое изменение <strong>обосновывается</strong></li>
                <li>Публикуется для <strong>всей компании</strong></li>
              </ol>
            </div>
          </div>
          <div className="info-box warning">
            <div className="info-box-content">
              <div className="info-box-title">Ошибки</div>
              <ul className="info-list">
                <li>Радар обновили, но <strong>никто не читает</strong></li>
                <li>Один человек <strong>решает за всех</strong></li>
                <li>Нет <strong>объяснений</strong> почему в этом кольце</li>
                <li><strong>Hold</strong> = запрет, а не рекомендация</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
