import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function QueueBasics() {
  const [queue, setQueue] = useState<number[]>([5, 12, 8])
  const [inputValue, setInputValue] = useState('')

  const enqueue = () => {
    const val = inputValue.trim() ? Number(inputValue) : Math.floor(Math.random() * 100)
    setQueue(prev => [...prev, val])
    setInputValue('')
  }

  const dequeue = () => {
    if (queue.length === 0) return
    setQueue(prev => prev.slice(1))
  }

  return (
    <div className="page-container">
      <h1>🚶 Очередь и Deque</h1>
      <p className="page-description">
        FIFO (First In, First Out) — первый вошёл, первый вышел.
        Как очередь в магазине. Deque — двусторонняя очередь.
      </p>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">🎮 Интерактивная очередь</span>
            <span className="card-badge">FIFO</span>
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
            <button className="btn btn-primary" onClick={enqueue}>Enqueue</button>
            <button className="btn btn-danger" onClick={dequeue} disabled={queue.length === 0}>Dequeue</button>
          </div>

          <div style={{
            display: 'flex',
            gap: '8px',
            padding: '16px',
            background: 'var(--bg-code)',
            borderRadius: '12px',
            minHeight: '80px',
            alignItems: 'center',
            margin: '16px 0',
            overflowX: 'auto'
          }}>
            {queue.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%' }}>
                Очередь пуста
              </div>
            ) : (
              <>
                <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>FRONT →</span>
                {queue.map((val, i) => (
                  <div key={`${i}-${val}`} style={{
                    padding: '12px 20px',
                    borderRadius: '8px',
                    background: i === 0
                      ? 'linear-gradient(135deg, var(--accent-green), #4ade80)'
                      : 'linear-gradient(135deg, var(--accent-purple), #c084fc)',
                    color: 'white',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    flexShrink: 0
                  }}>
                    {val}
                  </div>
                ))}
                <span style={{ color: 'var(--accent-orange)', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>← BACK</span>
              </>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Queue vs Stack vs Deque</span>
          </div>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Структура</th>
                <th style={{ padding: '10px' }}>Добавить</th>
                <th style={{ padding: '10px' }}>Удалить</th>
                <th style={{ padding: '10px' }}>Принцип</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Stack', 'push (top)', 'pop (top)', 'LIFO'],
                ['Queue', 'enqueue (back)', 'dequeue (front)', 'FIFO'],
                ['Deque', 'оба конца', 'оба конца', 'Гибрид'],
                ['Priority Q', 'insert(pri)', 'extractMin', 'По приоритету'],
              ].map(([name, add, rm, type]) => (
                <tr key={name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px', fontWeight: 600 }}>{name}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{add}</td>
                  <td style={{ padding: '10px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{rm}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className="complexity good">{type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Реализация очереди</span>
        </div>
        <CodeBlock language="typescript" title="queue.ts" code={`
class Queue<T> {
  private items: Map<number, T> = new Map();
  private head = 0;
  private tail = 0;

  // O(1) — в отличие от array.shift() который O(n)!
  enqueue(item: T): void {
    this.items.set(this.tail, item);
    this.tail++;
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    const item = this.items.get(this.head);
    this.items.delete(this.head);
    this.head++;
    return item;
  }

  peek(): T | undefined {
    return this.items.get(this.head);
  }

  isEmpty(): boolean {
    return this.tail === this.head;
  }

  size(): number {
    return this.tail - this.head;
  }
}
`} />

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>⚠️ Почему не Array.shift()?</strong><br/>
          <code>array.shift()</code> имеет сложность O(n) — сдвигает все элементы.
          Реализация через Map с индексами — всё O(1).
          Также можно использовать связный список.
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎯 BFS через очередь</span>
          <span className="card-badge">Важно!</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Очередь — ключевая структура для обхода графов/деревьев в ширину (BFS).
        </p>

        <CodeBlock language="typescript" title="bfs-tree.ts" code={`
interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// Обход дерева по уровням
function levelOrder(root: TreeNode | null): number[][] {
  if (!root) return [];
  
  const result: number[][] = [];
  const queue: TreeNode[] = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

//       1
//      / \\
//     2   3
//    / \\
//   4   5
// → [[1], [2, 3], [4, 5]]
`} />
      </div>
    </div>
  )
}
