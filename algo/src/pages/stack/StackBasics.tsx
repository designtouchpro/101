import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function StackBasics() {
  const [stack, setStack] = useState<number[]>([3, 7, 1])
  const [inputValue, setInputValue] = useState('')
  const [lastPopped, setLastPopped] = useState<number | null>(null)

  const push = () => {
    const val = inputValue.trim() ? Number(inputValue) : Math.floor(Math.random() * 100)
    setStack(prev => [...prev, val])
    setInputValue('')
    setLastPopped(null)
  }

  const pop = () => {
    if (stack.length === 0) return
    setLastPopped(stack[stack.length - 1])
    setStack(prev => prev.slice(0, -1))
  }

  const peek = () => {
    if (stack.length === 0) return
    setLastPopped(null)
  }

  return (
    <div className="page-container">
      <h1>📚 Стек — Stack</h1>
      <p className="page-description">
        LIFO (Last In, First Out) — последний вошёл, первый вышел.
        Как стопка тарелок — берём сверху, кладём сверху.
      </p>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎮 Интерактивный стек</span>
            <span className="card-badge">LIFO</span>
          </div>

          <div className="controls">
            <input
              className="input"
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Значение..."
              style={{ width: '120px' }}
            />
            <button className="btn btn-primary" onClick={push}>Push</button>
            <button className="btn btn-danger" onClick={pop} disabled={stack.length === 0}>Pop</button>
            <button className="btn btn-secondary" onClick={peek} disabled={stack.length === 0}>Peek</button>
          </div>

          {lastPopped !== null && (
            <div className="info-box warning" style={{ margin: '8px 0' }}>
              Popped: <strong>{lastPopped}</strong>
            </div>
          )}

          <div className="structure-visual" style={{ minHeight: '240px' }}>
            {stack.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '40px' }}>
                Стек пуст
              </div>
            ) : (
              stack.map((val, i) => (
                <div
                  key={`${i}-${val}`}
                  className={`structure-item stack ${i === stack.length - 1 ? 'highlight' : ''}`}
                  style={{ position: 'relative' }}
                >
                  {val}
                  {i === stack.length - 1 && (
                    <span style={{
                      position: 'absolute',
                      right: '12px',
                      fontSize: '0.7rem',
                      opacity: 0.7
                    }}>← TOP</span>
                  )}
                </div>
              ))
            )}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            Size: {stack.length} | Top: {stack.length > 0 ? stack[stack.length - 1] : 'empty'}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">⏱️ Сложность операций</span>
          </div>

          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left', color: 'var(--text-muted)' }}>Операция</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Сложность</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['push()', 'O(1)', 'good'],
                ['pop()', 'O(1)', 'good'],
                ['peek()', 'O(1)', 'good'],
                ['isEmpty()', 'O(1)', 'good'],
                ['search()', 'O(n)', 'ok'],
              ].map(([op, time, cls]) => (
                <tr key={op} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px', fontFamily: 'monospace' }}>{op}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className={`complexity ${cls}`}>{time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Реализация на массиве</span>
          <span className="card-badge">TypeScript</span>
        </div>
        <CodeBlock language="typescript" title="stack-array.ts" code={`
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }
}

// Использование
const stack = new Stack<number>();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek());  // 30
console.log(stack.pop());   // 30
console.log(stack.size());  // 2
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🔗 Реализация на связном списке</span>
          <span className="card-badge">TypeScript</span>
        </div>
        <CodeBlock language="typescript" title="stack-linked.ts" code={`
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null
  ) {}
}

class LinkedStack<T> {
  private head: ListNode<T> | null = null;
  private _size = 0;

  push(value: T): void {
    const node = new ListNode(value, this.head);
    this.head = node;
    this._size++;
  }

  pop(): T | undefined {
    if (!this.head) return undefined;
    const value = this.head.value;
    this.head = this.head.next;
    this._size--;
    return value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  size(): number {
    return this._size;
  }
}
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📋 Где используется стек</span>
        </div>
        <div style={{ display: 'grid', gap: '12px' }}>
          {[
            ['🔙 Call Stack', 'JavaScript использует стек вызовов для отслеживания функций'],
            ['↩️ Undo/Redo', 'История действий в редакторах'],
            ['🌐 Навигация', 'Кнопки «назад/вперёд» в браузере'],
            ['📐 Скобки', 'Проверка правильности скобочных последовательностей'],
            ['🔤 Postfix', 'Вычисление выражений в обратной польской нотации'],
            ['🔍 DFS', 'Обход графов/деревьев в глубину (итеративный)'],
          ].map(([title, desc]) => (
            <div key={title} style={{
              padding: '12px 16px',
              background: 'var(--bg-code)',
              borderRadius: '8px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start'
            }}>
              <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{title.split(' ')[0]}</span>
              <div>
                <strong>{title.split(' ').slice(1).join(' ')}</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '4px 0 0' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
