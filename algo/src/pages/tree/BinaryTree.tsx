import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

function buildSampleTree(): TreeNode {
  return {
    val: 10,
    left: {
      val: 5,
      left: { val: 3, left: null, right: null },
      right: { val: 7, left: null, right: null },
    },
    right: {
      val: 15,
      left: { val: 12, left: null, right: null },
      right: { val: 20, left: null, right: null },
    },
  }
}

function getLevels(root: TreeNode | null): number[][] {
  if (!root) return []
  const result: number[][] = []
  const queue: TreeNode[] = [root]
  while (queue.length > 0) {
    const size = queue.length
    const level: number[] = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}

export default function BinaryTree() {
  const tree = buildSampleTree()
  const levels = getLevels(tree)

  const [insertVal, setInsertVal] = useState('')
  const [customTree, setCustomTree] = useState<TreeNode | null>(null)
  const [customLevels, setCustomLevels] = useState<number[][]>([])

  const insertBST = (root: TreeNode | null, val: number): TreeNode => {
    if (!root) return { val, left: null, right: null }
    if (val < root.val) {
      return { ...root, left: insertBST(root.left, val) }
    } else if (val > root.val) {
      return { ...root, right: insertBST(root.right, val) }
    }
    return root
  }

  const handleInsert = () => {
    const val = Number(insertVal)
    if (isNaN(val)) return
    const newTree = insertBST(customTree, val)
    setCustomTree(newTree)
    setCustomLevels(getLevels(newTree))
    setInsertVal('')
  }

  const resetCustom = () => {
    setCustomTree(null)
    setCustomLevels([])
  }

  return (
    <div className="page-container">
      <h1>🌳 Бинарное дерево</h1>
      <p className="page-description">
        Дерево — иерархическая структура данных. У каждого узла максимум 2 ребёнка (left, right).
        Корень — верхний узел, листья — узлы без детей.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🔍 Визуализация дерева</span>
        </div>

        <div className="tree-visual">
          {levels.map((level, li) => (
            <div key={li} className="tree-level">
              {level.map((val, vi) => (
                <div key={vi} className="tree-node">{val}</div>
              ))}
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          BST: левый ребёнок {'<'} родитель {'<'} правый ребёнок
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📐 Свойства деревьев</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              ['Высота', 'Максимальная глубина от корня до листа'],
              ['Глубина узла', 'Количество рёбер от корня до узла'],
              ['Полное дерево', 'Каждый узел имеет 0 или 2 ребёнка'],
              ['Идеальное дерево', 'Все уровни заполнены полностью'],
              ['Сбалансированное', '|height(left) - height(right)| ≤ 1'],
            ].map(([title, desc]) => (
              <div key={title} style={{
                padding: '10px 14px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--accent-algo)'
              }}>
                <strong style={{ color: 'var(--text-primary)' }}>{title}</strong>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '2px' }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Сложность операций BST</span>
          </div>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Операция</th>
                <th style={{ padding: '10px' }}>Среднее</th>
                <th style={{ padding: '10px' }}>Худшее</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Поиск', 'O(log n)', 'O(n)'],
                ['Вставка', 'O(log n)', 'O(n)'],
                ['Удаление', 'O(log n)', 'O(n)'],
                ['Обход', 'O(n)', 'O(n)'],
                ['Мин/Макс', 'O(log n)', 'O(n)'],
              ].map(([op, avg, worst]) => (
                <tr key={op} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px' }}>{op}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className="complexity good">{avg}</span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className="complexity bad">{worst}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="info-box warning" style={{ marginTop: '12px' }}>
            Худший случай O(n) наступает при вырожденном дереве (все узлы в одну сторону).
            Решение — самобалансирующиеся деревья: AVL, Red-Black.
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Построй BST</span>
          <span className="card-badge">Интерактив</span>
        </div>

        <div className="controls">
          <input
            className="input"
            type="number"
            value={insertVal}
            onChange={e => setInsertVal(e.target.value)}
            placeholder="Значение..."
            style={{ width: '120px' }}
            onKeyDown={e => e.key === 'Enter' && handleInsert()}
          />
          <button className="btn btn-primary" onClick={handleInsert}>Вставить</button>
          <button className="btn btn-secondary" onClick={resetCustom}>Сбросить</button>
        </div>

        <div className="tree-visual" style={{ minHeight: '80px' }}>
          {customLevels.length === 0 ? (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', padding: '20px' }}>
              Добавьте узлы для построения BST
            </div>
          ) : (
            customLevels.map((level, li) => (
              <div key={li} className="tree-level">
                {level.map((val, vi) => (
                  <div key={vi} className="tree-node">{val}</div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Реализация бинарного дерева</span>
        </div>

        <CodeBlock language="typescript" title="binary-tree.ts" code={`
class TreeNode<T> {
  val: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(val: T) {
    this.val = val;
  }
}

class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  // Вставка в BST
  insert(val: T): void {
    this.root = this._insert(this.root, val);
  }

  private _insert(node: TreeNode<T> | null, val: T): TreeNode<T> {
    if (!node) return new TreeNode(val);

    if (val < node.val) {
      node.left = this._insert(node.left, val);
    } else if (val > node.val) {
      node.right = this._insert(node.right, val);
    }
    return node;
  }

  // Поиск
  search(val: T): boolean {
    let current = this.root;
    while (current) {
      if (val === current.val) return true;
      current = val < current.val ? current.left : current.right;
    }
    return false;
  }

  // Высота дерева
  height(node: TreeNode<T> | null = this.root): number {
    if (!node) return -1;
    return 1 + Math.max(
      this.height(node.left),
      this.height(node.right)
    );
  }

  // Количество узлов
  size(node: TreeNode<T> | null = this.root): number {
    if (!node) return 0;
    return 1 + this.size(node.left) + this.size(node.right);
  }
}
`} />
      </div>
    </div>
  )
}
