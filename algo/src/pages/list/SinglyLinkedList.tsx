import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface ListNode {
  val: number
  id: number
}

let nextId = 0

export default function SinglyLinkedList() {
  const [nodes, setNodes] = useState<ListNode[]>([
    { val: 10, id: nextId++ },
    { val: 20, id: nextId++ },
    { val: 30, id: nextId++ },
  ])
  const [inputVal, setInputVal] = useState('')
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null)

  const addToHead = () => {
    const val = inputVal.trim() ? Number(inputVal) : Math.floor(Math.random() * 100)
    setNodes(prev => [{ val, id: nextId++ }, ...prev])
    setInputVal('')
    setHighlightIdx(0)
    setTimeout(() => setHighlightIdx(null), 1000)
  }

  const addToTail = () => {
    const val = inputVal.trim() ? Number(inputVal) : Math.floor(Math.random() * 100)
    setNodes(prev => [...prev, { val, id: nextId++ }])
    setInputVal('')
    setHighlightIdx(nodes.length)
    setTimeout(() => setHighlightIdx(null), 1000)
  }

  const removeHead = () => {
    if (nodes.length === 0) return
    setNodes(prev => prev.slice(1))
  }

  const removeTail = () => {
    if (nodes.length === 0) return
    setNodes(prev => prev.slice(0, -1))
  }

  const reverseList = () => {
    setNodes(prev => [...prev].reverse())
  }

  return (
    <div className="page-container">
      <h1>🔗 Связный список</h1>
      <p className="page-description">
        Связный список — линейная структура данных, где каждый узел содержит значение и ссылку
        на следующий узел. Вставка/удаление O(1), но поиск O(n).
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Интерактивный список</span>
          <span className="card-badge">Singly Linked List</span>
        </div>

        <div className="controls">
          <input
            className="input"
            type="number"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Значение..."
            style={{ width: '120px' }}
          />
          <button className="btn btn-primary" onClick={addToHead}>+ В начало</button>
          <button className="btn btn-primary" onClick={addToTail}>+ В конец</button>
          <button className="btn btn-danger" onClick={removeHead}>− Начало</button>
          <button className="btn btn-danger" onClick={removeTail}>− Конец</button>
          <button className="btn btn-secondary" onClick={reverseList}>⟲ Развернуть</button>
        </div>

        <div className="list-visual" style={{ minHeight: '60px' }}>
          {nodes.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', padding: '20px' }}>
              HEAD → null
            </div>
          ) : (
            <>
              <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', fontWeight: 600 }}>HEAD</span>
              {nodes.map((node, i) => (
                <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div className={`list-node${highlightIdx === i ? ' highlight' : ''}`}
                    style={highlightIdx === i ? {
                      borderColor: 'var(--accent-green)',
                      background: 'rgba(34, 197, 94, 0.15)',
                    } : {}}>
                    <div className="list-node-value">{node.val}</div>
                  </div>
                  <span className="list-node-arrow">→</span>
                </div>
              ))}
              <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', fontWeight: 600 }}>null</span>
            </>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Сложность операций</span>
          </div>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Операция</th>
                <th style={{ padding: '10px' }}>Singly</th>
                <th style={{ padding: '10px' }}>Doubly</th>
                <th style={{ padding: '10px' }}>Array</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Доступ по индексу', 'O(n)', 'O(n)', 'O(1)'],
                ['Поиск', 'O(n)', 'O(n)', 'O(n)'],
                ['Вставка в начало', 'O(1)', 'O(1)', 'O(n)'],
                ['Вставка в конец', 'O(n)*', 'O(1)', 'O(1)**'],
                ['Удаление из начала', 'O(1)', 'O(1)', 'O(n)'],
                ['Удаление из конца', 'O(n)', 'O(1)', 'O(1)'],
              ].map(([op, singly, doubly, arr]) => (
                <tr key={op} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', fontSize: '0.8rem' }}>{op}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span className={`complexity ${singly.includes('1') ? 'good' : 'bad'}`}>{singly}</span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span className={`complexity ${doubly.includes('1') ? 'good' : 'bad'}`}>{doubly}</span>
                  </td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <span className={`complexity ${arr.includes('1') ? 'good' : 'bad'}`}>{arr}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '8px' }}>
            * O(1) с указателем на tail | ** Амортизировано O(1)
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🤔 Array vs Linked List</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Массив лучше:', items: ['Random access O(1)', 'Cache-friendly (последовательная память)', 'Меньше overhead на элемент', 'Большинство задач'] },
              { title: 'Список лучше:', items: ['Частые вставки/удаления в начало', 'Размер часто меняется', 'Нет необходимости в random access', 'Реализация стека/очереди'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ padding: '12px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>{title}</strong>
                <ul className="info-list">
                  {items.map(item => <li key={item} style={{ marginBottom: '4px' }}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Реализация связного списка</span>
        </div>
        <CodeBlock language="typescript" title="linked-list.ts" code={`
class ListNode<T> {
  val: T;
  next: ListNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;
  private _size = 0;

  get size(): number {
    return this._size;
  }

  // O(1) — вставка в начало
  prepend(val: T): void {
    const node = new ListNode(val);
    node.next = this.head;
    this.head = node;
    this._size++;
  }

  // O(n) — вставка в конец
  append(val: T): void {
    const node = new ListNode(val);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this._size++;
  }

  // O(1) — удаление из начала
  removeFirst(): T | undefined {
    if (!this.head) return undefined;
    const val = this.head.val;
    this.head = this.head.next;
    this._size--;
    return val;
  }

  // O(n) — поиск
  find(val: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.val === val) return current;
      current = current.next;
    }
    return null;
  }

  // O(n) — разворот списка
  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;

    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    this.head = prev;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }
}
`} />
      </div>
    </div>
  )
}
