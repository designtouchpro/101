import { useState } from 'react'

interface WBSNode {
  id: string
  title: string
  children: WBSNode[]
  collapsed?: boolean
  estimate?: number // story points
}

const defaultWBS: WBSNode = {
  id: '1',
  title: '🚀 Интернет-магазин (MVP)',
  children: [
    {
      id: '1.1', title: '🎨 Фронтенд', children: [
        { id: '1.1.1', title: 'Каталог товаров', children: [], estimate: 8 },
        { id: '1.1.2', title: 'Карточка товара', children: [], estimate: 5 },
        { id: '1.1.3', title: 'Корзина', children: [], estimate: 8 },
        { id: '1.1.4', title: 'Оформление заказа', children: [], estimate: 13 },
      ]
    },
    {
      id: '1.2', title: '⚙️ Бэкенд', children: [
        { id: '1.2.1', title: 'API товаров (CRUD)', children: [], estimate: 5 },
        { id: '1.2.2', title: 'Аутентификация', children: [], estimate: 8 },
        { id: '1.2.3', title: 'Обработка заказов', children: [], estimate: 13 },
        { id: '1.2.4', title: 'Интеграция с платёжкой', children: [], estimate: 21 },
      ]
    },
    {
      id: '1.3', title: '🧪 Тестирование', children: [
        { id: '1.3.1', title: 'Unit-тесты', children: [], estimate: 5 },
        { id: '1.3.2', title: 'E2E тесты', children: [], estimate: 8 },
        { id: '1.3.3', title: 'Нагрузочное тестирование', children: [], estimate: 3 },
      ]
    },
    {
      id: '1.4', title: '🚢 DevOps', children: [
        { id: '1.4.1', title: 'CI/CD пайплайн', children: [], estimate: 5 },
        { id: '1.4.2', title: 'Мониторинг и логирование', children: [], estimate: 5 },
      ]
    },
  ]
}

const rules = [
  { title: 'Правило 100%', desc: 'Сумма работ дочерних элементов = 100% работы родителя. Ничего лишнего, ничего не упущено.' },
  { title: 'Взаимоисключение', desc: 'Элементы одного уровня не должны пересекаться. Нет дублирования работ.' },
  { title: '8/80', desc: 'Рабочий пакет = от 8 до 80 часов работы. Меньше — слишком мелко, больше — надо декомпозировать.' },
  { title: 'Ориентация на результат', desc: 'WBS описывает ЧТО (deliverables), а не КАК (активности). "Документация API" ✅, "Писать документацию" ❌.' },
  { title: '3-4 уровня', desc: 'Оптимальная глубина WBS для большинства проектов. Слишком глубоко = бюрократия.' },
]

export default function WBS() {
  const [tree, setTree] = useState<WBSNode>(defaultWBS)
  const [editId, setEditId] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const toggleCollapse = (id: string) => {
    const toggle = (node: WBSNode): WBSNode => {
      if (node.id === id) return { ...node, collapsed: !node.collapsed }
      return { ...node, children: node.children.map(toggle) }
    }
    setTree(toggle(tree))
  }

  const updateTitle = (id: string, title: string) => {
    const update = (node: WBSNode): WBSNode => {
      if (node.id === id) return { ...node, title }
      return { ...node, children: node.children.map(update) }
    }
    setTree(update(tree))
    setEditId(null)
  }

  const addChild = (parentId: string) => {
    const add = (node: WBSNode): WBSNode => {
      if (node.id === parentId) {
        const newId = `${node.id}.${node.children.length + 1}`
        return { ...node, collapsed: false, children: [...node.children, { id: newId, title: 'Новый элемент', children: [], estimate: 3 }] }
      }
      return { ...node, children: node.children.map(add) }
    }
    setTree(add(tree))
  }

  const removeNode = (id: string) => {
    const remove = (node: WBSNode): WBSNode => ({
      ...node, children: node.children.filter(c => c.id !== id).map(remove),
    })
    setTree(remove(tree))
  }

  const getTotalEstimate = (node: WBSNode): number => {
    if (node.children.length === 0) return node.estimate || 0
    return node.children.reduce((sum, c) => sum + getTotalEstimate(c), 0)
  }

  const renderNode = (node: WBSNode, depth: number = 0): React.ReactNode => {
    const total = getTotalEstimate(node)
    const hasChildren = node.children.length > 0
    const isEditing = editId === node.id

    return (
      <div key={node.id} style={{ marginLeft: depth * 24 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px',
          borderRadius: 8, marginBottom: 4,
          background: depth === 0 ? 'var(--accent-main-alpha)' : 'var(--bg-secondary)',
          border: depth === 0 ? '1px solid var(--accent-main)' : '1px solid transparent',
        }}>
          {/* Collapse toggle */}
          {hasChildren ? (
            <button onClick={() => toggleCollapse(node.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-muted)', width: 18 }}>
              {node.collapsed ? '▶' : '▼'}
            </button>
          ) : (
            <span style={{ width: 18, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-muted)' }}>•</span>
          )}

          {/* ID */}
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace', minWidth: 36 }}>
            {node.id}
          </span>

          {/* Title */}
          {isEditing ? (
            <input className="input" value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => updateTitle(node.id, editValue)}
              onKeyDown={e => { if (e.key === 'Enter') updateTitle(node.id, editValue); if (e.key === 'Escape') setEditId(null) }}
              autoFocus style={{ flex: 1, fontSize: '0.85rem', padding: '2px 6px' }} />
          ) : (
            <span onClick={() => { setEditId(node.id); setEditValue(node.title) }}
              style={{ flex: 1, fontSize: '0.85rem', fontWeight: depth < 2 ? 600 : 400, cursor: 'pointer' }}>
              {node.title}
            </span>
          )}

          {/* Estimate */}
          <span style={{
            fontSize: '0.7rem', padding: '2px 8px', borderRadius: 10,
            background: hasChildren ? 'var(--accent-main-alpha)' : '#22c55e20',
            color: hasChildren ? 'var(--accent-main)' : '#22c55e',
            fontWeight: 600,
          }}>
            {total} SP
          </span>

          {/* Actions */}
          <button onClick={() => addChild(node.id)} title="Добавить дочерний"
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.5 }}>+</button>
          {depth > 0 && (
            <button onClick={() => removeNode(node.id)} title="Удалить"
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.4 }}>✕</button>
          )}
        </div>

        {hasChildren && !node.collapsed && node.children.map(c => renderNode(c, depth + 1))}
      </div>
    )
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏗️ Work Breakdown Structure</h1>
        <p>Декомпозиция проекта на управляемые части. Кликайте на названия для редактирования.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Work Breakdown Structure (WBS)</strong> — это иерархическая декомпозиция всего объёма работ проекта, 
          описанная в PMBOK как один из ключевых инструментов планирования. Вместо того чтобы оценивать проект целиком 
          («сделать приложение за 3 месяца»), WBS разбивает его на пакеты работ (work packages) — элементы, 
          которые можно оценить, назначить ответственного и отследить.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Правило «100%»: WBS должна покрывать 100% scope проекта. Если работа не попала в WBS — её не существует 
          для планирования и бюджета. Но WBS описывает <em>что</em> нужно сделать, а не <em>как</em>. 
          Каждый «лист» дерева — это work package, который можно оценить в часах/SP и назначить исполнителю.
          Типичная глубина — 3-4 уровня: проект → модуль → функционал → задача.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>💡 Совет</strong>: Используйте WBS не только для waterfall. В Agile WBS отлично работает 
            для начальной разбивки эпиков на фичи перед story mapping. Дерево помогает убедиться, что ничего не забыто, 
            прежде чем переходить к user stories.
          </div>
        </div>
      </div>

      {/* WBS Tree */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h3 style={{ margin: 0 }}>🌳 WBS-дерево</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Итого: <strong>{getTotalEstimate(tree)} SP</strong>
          </div>
        </div>
        {renderNode(tree)}
      </div>

      {/* Visual breakdown */}
      <div className="card">
        <h3>📊 Распределение по блокам</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {tree.children.map(child => {
            const est = getTotalEstimate(child)
            const total = getTotalEstimate(tree)
            const pct = total ? Math.round((est / total) * 100) : 0
            const colors = ['#3b82f6', '#ef4444', '#f59e0b', '#22c55e', '#a855f7', '#ec4899']
            const idx = tree.children.indexOf(child)
            return (
              <div key={child.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 4 }}>
                  <span>{child.title}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{est} SP ({pct}%)</span>
                </div>
                <div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${pct}%`, background: colors[idx % colors.length],
                    borderRadius: 6, transition: 'width 0.3s',
                  }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rules */}
      <div className="card">
        <h3>📏 Правила хорошей WBS</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rules.map((rule, i) => (
            <div key={i} style={{ padding: '10px 14px', borderRadius: 8, background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-main)' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 2 }}>{rule.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rule.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
