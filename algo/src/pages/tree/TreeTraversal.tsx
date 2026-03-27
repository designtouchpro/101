import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
}

const sampleTree: TreeNode = {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
}

type TraversalType = 'inorder' | 'preorder' | 'postorder' | 'bfs'

function inorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result
  inorder(node.left, result)
  result.push(node.val)
  inorder(node.right, result)
  return result
}

function preorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result
  result.push(node.val)
  preorder(node.left, result)
  preorder(node.right, result)
  return result
}

function postorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result
  postorder(node.left, result)
  postorder(node.right, result)
  result.push(node.val)
  return result
}

function bfs(root: TreeNode | null): number[] {
  if (!root) return []
  const result: number[] = []
  const queue: TreeNode[] = [root]
  while (queue.length > 0) {
    const node = queue.shift()!
    result.push(node.val)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return result
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

const TRAVERSAL_INFO: Record<TraversalType, { label: string; order: string; mnemonic: string; color: string }> = {
  inorder: {
    label: 'In-order (LNR)',
    order: 'Левый → Узел → Правый',
    mnemonic: 'Даёт отсортированный массив в BST',
    color: 'var(--accent-green)',
  },
  preorder: {
    label: 'Pre-order (NLR)',
    order: 'Узел → Левый → Правый',
    mnemonic: 'Копирование дерева, сериализация',
    color: 'var(--accent-algo)',
  },
  postorder: {
    label: 'Post-order (LRN)',
    order: 'Левый → Правый → Узел',
    mnemonic: 'Удаление дерева, вычисление выражений',
    color: 'var(--accent-purple)',
  },
  bfs: {
    label: 'BFS (по уровням)',
    order: 'Уровень за уровнем слева направо',
    mnemonic: 'Кратчайший путь, обход по уровням',
    color: 'var(--accent-orange)',
  },
}

export default function TreeTraversal() {
  const [activeTraversal, setActiveTraversal] = useState<TraversalType>('inorder')
  const [visitedNodes, setVisitedNodes] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(-1)
  const [isAnimating, setIsAnimating] = useState(false)

  const traversalFns: Record<TraversalType, (node: TreeNode | null) => number[]> = {
    inorder, preorder, postorder, bfs,
  }

  const result = traversalFns[activeTraversal](sampleTree)
  const levels = getLevels(sampleTree)

  const animate = () => {
    const order = traversalFns[activeTraversal](sampleTree)
    setVisitedNodes([])
    setCurrentStep(-1)
    setIsAnimating(true)

    order.forEach((val, i) => {
      setTimeout(() => {
        setVisitedNodes(prev => [...prev, val])
        setCurrentStep(i)
        if (i === order.length - 1) {
          setTimeout(() => setIsAnimating(false), 500)
        }
      }, (i + 1) * 500)
    })
  }

  const reset = () => {
    setVisitedNodes([])
    setCurrentStep(-1)
    setIsAnimating(false)
  }

  return (
    <div className="page-container">
      <h1>🔄 Обход деревьев</h1>
      <p className="page-description">
        Четыре основных способа обхода: In-order, Pre-order, Post-order (DFS) и BFS (по уровням).
        Каждый используется для своих задач.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Визуализация обхода</span>
          <span className="card-badge">Анимация</span>
        </div>

        <div className="tabs">
          {(Object.keys(TRAVERSAL_INFO) as TraversalType[]).map(type => (
            <button
              key={type}
              className={`tab ${activeTraversal === type ? 'active' : ''}`}
              onClick={() => { setActiveTraversal(type); reset() }}
            >
              {TRAVERSAL_INFO[type].label}
            </button>
          ))}
        </div>

        <div style={{
          padding: '16px',
          background: 'var(--bg-code)',
          borderRadius: '12px',
          margin: '16px 0',
          textAlign: 'center',
        }}>
          <div style={{ marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            {TRAVERSAL_INFO[activeTraversal].order}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            💡 {TRAVERSAL_INFO[activeTraversal].mnemonic}
          </div>
        </div>

        <div className="tree-visual">
          {levels.map((level, li) => (
            <div key={li} className="tree-level">
              {level.map((val, vi) => (
                <div
                  key={vi}
                  className={`tree-node${visitedNodes.includes(val) ? ' visited' : ''}${
                    currentStep >= 0 && result[currentStep] === val ? ' current' : ''
                  }`}
                  style={visitedNodes.includes(val) ? {
                    borderColor: TRAVERSAL_INFO[activeTraversal].color,
                    background: `${TRAVERSAL_INFO[activeTraversal].color}22`,
                  } : {}}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="controls" style={{ justifyContent: 'center' }}>
          <button
            className="btn btn-primary"
            onClick={animate}
            disabled={isAnimating}
          >
            ▶ Запустить обход
          </button>
          <button className="btn btn-secondary" onClick={reset} disabled={isAnimating}>
            ↺ Сбросить
          </button>
        </div>

        {visitedNodes.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '12px',
          }}>
            {visitedNodes.map((val, i) => (
              <div key={i} style={{
                padding: '6px 14px',
                borderRadius: '6px',
                background: i === currentStep
                  ? TRAVERSAL_INFO[activeTraversal].color
                  : `${TRAVERSAL_INFO[activeTraversal].color}33`,
                color: i === currentStep ? 'white' : TRAVERSAL_INFO[activeTraversal].color,
                fontFamily: 'monospace',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.3s',
              }}>
                {val}
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          Результат: [{result.join(', ')}]
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 DFS — рекурсивный обход</span>
        </div>
        <CodeBlock language="typescript" title="dfs-traversals.ts" code={`
// In-order (LNR) — отсортированный вывод в BST
function inorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result;
  inorder(node.left, result);   // L
  result.push(node.val);         // N
  inorder(node.right, result);  // R
  return result;
}

// Pre-order (NLR) — копирование/сериализация
function preorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result;
  result.push(node.val);         // N
  preorder(node.left, result);  // L
  preorder(node.right, result); // R
  return result;
}

// Post-order (LRN) — удаление/вычисление
function postorder(node: TreeNode | null, result: number[] = []): number[] {
  if (!node) return result;
  postorder(node.left, result);  // L
  postorder(node.right, result); // R
  result.push(node.val);          // N
  return result;
}
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 DFS — итеративный (через стек)</span>
          <span className="card-badge">Собес!</span>
        </div>

        <div className="info-box info" style={{ marginBottom: '16px' }}>
          На собеседовании часто просят реализовать обход итеративно. Рекурсия — это
          неявный стек. Итеративная версия использует явный стек.
        </div>

        <CodeBlock language="typescript" title="iterative-dfs.ts" code={`
// Итеративный In-order
function inorderIterative(root: TreeNode | null): number[] {
  const result: number[] = [];
  const stack: TreeNode[] = [];
  let current = root;

  while (current || stack.length > 0) {
    // Идём максимально влево
    while (current) {
      stack.push(current);
      current = current.left;
    }
    // Обрабатываем узел
    current = stack.pop()!;
    result.push(current.val);
    // Переходим к правому поддереву
    current = current.right;
  }

  return result;
}

// Итеративный Pre-order (самый простой)
function preorderIterative(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.push(node.val);
    // Правый первым (стек LIFO → левый обработается раньше)
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return result;
}

// Итеративный Post-order (два стека)
function postorderIterative(root: TreeNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const stack: TreeNode[] = [root];

  while (stack.length > 0) {
    const node = stack.pop()!;
    result.unshift(node.val); // В начало!
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return result;
}
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 BFS — обход в ширину</span>
        </div>
        <CodeBlock language="typescript" title="bfs.ts" code={`
function bfs(root: TreeNode | null): number[][] {
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

// DFS vs BFS — когда что использовать?
// DFS: поиск пути, проверка свойств, backtracking
// BFS: кратчайший путь, обход по уровням, поиск ближайшего
`} />
      </div>
    </div>
  )
}
