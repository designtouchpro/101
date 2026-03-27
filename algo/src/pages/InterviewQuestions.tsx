import { useState, useEffect, useCallback, ReactNode } from 'react'

/* ═══════════════════════════════════════════════════════════════
   Mini Visual Components for Interview Answers
   ═══════════════════════════════════════════════════════════════ */

// ── Big O Chart ──
function BigOChart() {
  const [n, setN] = useState(10)
  const maxN = 50
  const maxY = 120

  const fns: { label: string; fn: (x: number) => number; color: string }[] = [
    { label: 'O(1)', fn: () => 1, color: '#22c55e' },
    { label: 'O(log n)', fn: (x) => Math.log2(x + 1), color: '#06b6d4' },
    { label: 'O(n)', fn: (x) => x, color: '#f7df1e' },
    { label: 'O(n log n)', fn: (x) => x * Math.log2(x + 1), color: '#f59e0b' },
    { label: 'O(n²)', fn: (x) => x * x, color: '#ef4444' },
  ]

  const scale = maxY / (maxN * maxN)

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {fns.map(f => (
          <span key={f.label} style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: f.color, display: 'inline-block' }} />
            {f.label}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${maxN + 10} ${maxY + 10}`} style={{ width: '100%', height: 140, background: 'var(--bg-primary)', borderRadius: 8 }}>
        {fns.map(f => (
          <polyline
            key={f.label}
            fill="none"
            stroke={f.color}
            strokeWidth="1.5"
            points={Array.from({ length: n }, (_, i) => {
              const x = i + 1
              const y = Math.min(f.fn(x) * scale, maxY)
              return `${x + 5},${maxY - y + 5}`
            }).join(' ')}
          />
        ))}
        <line x1="5" y1={maxY + 5} x2={maxN + 5} y2={maxY + 5} stroke="#333" strokeWidth="0.5" />
        <line x1="5" y1="5" x2="5" y2={maxY + 5} stroke="#333" strokeWidth="0.5" />
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>n =</span>
        <input
          type="range" min="5" max={maxN} value={n}
          onChange={e => setN(+e.target.value)}
          style={{ flex: 1 }}
        />
        <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--accent-algo)' }}>{n}</span>
      </div>
    </div>
  )
}

// ── Stack Visual ──
function StackVisual() {
  const [stack, setStack] = useState<number[]>([3, 7, 1])
  const [nextVal, setNextVal] = useState(5)
  const [lastOp, setLastOp] = useState('')

  const push = () => {
    setStack(s => [...s, nextVal])
    setLastOp(`push(${nextVal})`)
    setNextVal(Math.floor(Math.random() * 20) + 1)
  }
  const pop = () => {
    if (stack.length === 0) return
    const val = stack[stack.length - 1]
    setStack(s => s.slice(0, -1))
    setLastOp(`pop() → ${val}`)
  }

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={push}>
          Push({nextVal})
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={pop} disabled={stack.length === 0}>
          Pop()
        </button>
        {lastOp && <span style={{ fontSize: '0.8rem', color: 'var(--accent-algo)', alignSelf: 'center' }}>{lastOp}</span>}
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column-reverse', gap: '3px',
        padding: '12px', background: 'var(--bg-primary)', borderRadius: 8,
        minHeight: 80, border: '2px solid var(--border-color)',
        borderBottom: '3px solid var(--accent-algo)',
      }}>
        {stack.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>Пусто</span>}
        {stack.map((val, i) => (
          <div key={`${i}-${val}`} style={{
            padding: '6px 16px', borderRadius: 6, textAlign: 'center',
            fontFamily: 'monospace', fontWeight: 600, fontSize: '0.85rem',
            background: i === stack.length - 1
              ? 'linear-gradient(135deg, var(--accent-algo), var(--accent-algo-light))'
              : 'var(--bg-card)',
            color: i === stack.length - 1 ? '#000' : 'var(--text-primary)',
            border: `1px solid ${i === stack.length - 1 ? 'var(--accent-algo)' : 'var(--border-color)'}`,
            animation: 'slideIn 0.2s ease-out',
            position: 'relative',
          }}>
            {val}
            {i === stack.length - 1 && (
              <span style={{ position: 'absolute', right: 8, fontSize: '0.65rem', color: i === stack.length - 1 ? '#000' : 'var(--text-muted)' }}>← top</span>
            )}
          </div>
        ))}
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>LIFO: Last In, First Out</div>
    </div>
  )
}

// ── Queue Visual ──
function QueueVisual() {
  const [queue, setQueue] = useState<number[]>([4, 8, 2])
  const [nextVal, setNextVal] = useState(6)
  const [lastOp, setLastOp] = useState('')

  const enqueue = () => {
    setQueue(q => [...q, nextVal])
    setLastOp(`enqueue(${nextVal})`)
    setNextVal(Math.floor(Math.random() * 20) + 1)
  }
  const dequeue = () => {
    if (queue.length === 0) return
    const val = queue[0]
    setQueue(q => q.slice(1))
    setLastOp(`dequeue() → ${val}`)
  }

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={enqueue}>
          Enqueue({nextVal})
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={dequeue} disabled={queue.length === 0}>
          Dequeue()
        </button>
        {lastOp && <span style={{ fontSize: '0.8rem', color: 'var(--accent-algo)', alignSelf: 'center' }}>{lastOp}</span>}
      </div>
      <div style={{
        display: 'flex', gap: '3px', padding: '12px',
        background: 'var(--bg-primary)', borderRadius: 8, minHeight: 50,
        border: '2px solid var(--border-color)', alignItems: 'center',
        borderLeft: '3px solid var(--accent-green)',
        borderRight: '3px solid var(--accent-purple)',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--accent-green)', marginRight: 4 }}>front→</span>
        {queue.length === 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Пусто</span>}
        {queue.map((val, i) => (
          <div key={`${i}-${val}`} style={{
            padding: '6px 14px', borderRadius: 6, textAlign: 'center',
            fontFamily: 'monospace', fontWeight: 600, fontSize: '0.85rem',
            background: i === 0 ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: `1px solid ${i === 0 ? 'var(--accent-green)' : 'var(--border-color)'}`,
            animation: 'slideIn 0.2s ease-out',
          }}>
            {val}
          </div>
        ))}
        <span style={{ fontSize: '0.65rem', color: 'var(--accent-purple)', marginLeft: 4 }}>←back</span>
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4 }}>FIFO: First In, First Out</div>
    </div>
  )
}

// ── Tree Traversal Visual ──
function TreeTraversalVisual() {
  const tree = [10, 5, 15, 3, 7, 12, 20]
  const [traversal, setTraversal] = useState<'inorder' | 'preorder' | 'postorder'>('inorder')
  const [visited, setVisited] = useState<number[]>([])
  const [running, setRunning] = useState(false)

  const getOrder = useCallback((type: string): number[] => {
    const result: number[] = []
    const traverse = (i: number) => {
      if (i >= tree.length || tree[i] === undefined) return
      if (type === 'preorder') result.push(tree[i])
      traverse(2 * i + 1)
      if (type === 'inorder') result.push(tree[i])
      traverse(2 * i + 2)
      if (type === 'postorder') result.push(tree[i])
    }
    traverse(0)
    return result
  }, [])

  const run = () => {
    if (running) return
    setRunning(true)
    setVisited([])
    const order = getOrder(traversal)
    order.forEach((val, i) => {
      setTimeout(() => {
        setVisited(prev => [...prev, val])
        if (i === order.length - 1) setRunning(false)
      }, (i + 1) * 500)
    })
  }

  const levels = [[0], [1, 2], [3, 4, 5, 6]]

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
        {(['inorder', 'preorder', 'postorder'] as const).map(t => (
          <button key={t} className={`btn ${traversal === t ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            onClick={() => { setTraversal(t); setVisited([]) }}
          >
            {t === 'inorder' ? 'In-order (LNR)' : t === 'preorder' ? 'Pre-order (NLR)' : 'Post-order (LRN)'}
          </button>
        ))}
        <button className="btn btn-success" style={{ padding: '4px 12px', fontSize: '0.75rem' }} onClick={run} disabled={running}>
          ▶ Запуск
        </button>
      </div>
      <div style={{ padding: '16px', background: 'var(--bg-primary)', borderRadius: 8 }}>
        {levels.map((level, li) => (
          <div key={li} style={{ display: 'flex', justifyContent: 'center', gap: li === 0 ? 0 : li === 1 ? 60 : 16, marginBottom: li < 2 ? 12 : 0 }}>
            {level.map(idx => {
              if (idx >= tree.length) return null
              const val = tree[idx]
              const isVisited = visited.includes(val)
              const isCurrent = visited.length > 0 && visited[visited.length - 1] === val
              return (
                <div key={idx} style={{
                  width: 40, height: 40, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.8rem', fontFamily: 'monospace',
                  background: isCurrent ? 'var(--accent-orange)' : isVisited ? 'var(--accent-algo)' : 'var(--bg-card)',
                  color: isCurrent || isVisited ? '#000' : 'var(--text-primary)',
                  border: `2px solid ${isCurrent ? 'var(--accent-orange)' : isVisited ? 'var(--accent-algo)' : 'var(--border-color)'}`,
                  transition: 'all 0.3s',
                  boxShadow: isCurrent ? '0 0 12px rgba(245, 158, 11, 0.5)' : 'none',
                }}>
                  {val}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {visited.length > 0 && (
        <div style={{ fontSize: '0.8rem', marginTop: 8, fontFamily: 'monospace', color: 'var(--accent-algo)' }}>
          [{visited.join(' → ')}]
        </div>
      )}
    </div>
  )
}

// ── Sorting Visual ──
function SortVisual() {
  const [arr, setArr] = useState(() => Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10))
  const [sorting, setSorting] = useState(false)
  const [comparing, setComparing] = useState<number[]>([])
  const [sorted, setSorted] = useState<number[]>([])

  const reset = () => {
    setArr(Array.from({ length: 12 }, () => Math.floor(Math.random() * 80) + 10))
    setComparing([])
    setSorted([])
  }

  const bubbleSort = async () => {
    if (sorting) return
    setSorting(true)
    setSorted([])
    const a = [...arr]
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a.length - i - 1; j++) {
        setComparing([j, j + 1])
        await delay(100)
        if (a[j] > a[j + 1]) {
          ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
          setArr([...a])
          await delay(100)
        }
      }
      setSorted(prev => [...prev, a.length - i - 1])
    }
    setComparing([])
    setSorted(a.map((_, i) => i))
    setSorting(false)
  }

  const maxVal = Math.max(...arr)

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={bubbleSort} disabled={sorting}>
          ▶ Bubble Sort
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={reset} disabled={sorting}>
          Новый массив
        </button>
      </div>
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 3, padding: '12px',
        background: 'var(--bg-primary)', borderRadius: 8, height: 100,
      }}>
        {arr.map((val, i) => (
          <div key={i} style={{
            flex: 1, borderRadius: '3px 3px 0 0',
            height: `${(val / maxVal) * 70 + 10}%`,
            background: sorted.includes(i) ? 'var(--accent-green)'
              : comparing.includes(i) ? 'var(--accent-orange)'
              : 'var(--accent-algo)',
            transition: 'height 0.1s, background 0.1s',
          }} />
        ))}
      </div>
    </div>
  )
}

// ── Linked List Visual ──
function LinkedListVisual() {
  const [nodes, setNodes] = useState([4, 2, 7, 1, 9])
  const [reversed, setReversed] = useState(false)

  const reverseList = () => {
    setNodes(n => [...n].reverse())
    setReversed(r => !r)
  }

  return (
    <div className="mini-viz">
      <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem', marginBottom: '12px' }}
        onClick={reverseList}>
        🔄 Reverse
      </button>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 0, padding: '12px',
        background: 'var(--bg-primary)', borderRadius: 8, overflowX: 'auto',
      }}>
        <span style={{ fontSize: '0.65rem', color: 'var(--accent-algo)', marginRight: 6 }}>head→</span>
        {nodes.map((val, i) => (
          <div key={`${i}`} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '6px 14px', borderRadius: 6,
              border: '2px solid var(--accent-purple)',
              fontFamily: 'monospace', fontWeight: 600, fontSize: '0.85rem',
              background: 'var(--bg-card)', color: 'var(--text-primary)',
              animation: reversed ? 'slideIn 0.3s ease-out' : undefined,
            }}>
              {val}
            </div>
            {i < nodes.length - 1 && (
              <span style={{ padding: '0 6px', color: 'var(--text-muted)' }}>→</span>
            )}
          </div>
        ))}
        <span style={{ padding: '0 6px', color: 'var(--accent-red)', fontFamily: 'monospace', fontStyle: 'italic' }}>null</span>
      </div>
    </div>
  )
}

// ── Hash Table Visual ──
function HashTableVisual() {
  const [input, setInput] = useState('')
  const bucketCount = 7
  const [entries, setEntries] = useState<{ key: string; bucket: number }[]>([
    { key: 'apple', bucket: hashStr('apple', 7) },
    { key: 'banana', bucket: hashStr('banana', 7) },
    { key: 'cherry', bucket: hashStr('cherry', 7) },
  ])

  const add = () => {
    if (!input.trim()) return
    const b = hashStr(input.trim(), bucketCount)
    setEntries(e => [...e, { key: input.trim(), bucket: b }])
    setInput('')
  }

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          className="input" style={{ padding: '4px 10px', fontSize: '0.8rem', width: 120 }}
          value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ключ..."
          onKeyDown={e => e.key === 'Enter' && add()}
        />
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={add}>
          Put
        </button>
      </div>
      <div style={{ padding: '8px', background: 'var(--bg-primary)', borderRadius: 8 }}>
        {Array.from({ length: bucketCount }, (_, i) => {
          const items = entries.filter(e => e.bucket === i)
          const hasCollision = items.length > 1
          return (
            <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center', padding: '3px 0' }}>
              <span style={{
                width: 28, textAlign: 'center', fontSize: '0.7rem',
                fontFamily: 'monospace', color: 'var(--text-muted)',
                background: 'var(--bg-card)', borderRadius: 4, padding: '2px 4px',
              }}>
                [{i}]
              </span>
              {items.map((item, j) => (
                <span key={j} style={{
                  padding: '2px 8px', borderRadius: 4, fontSize: '0.75rem',
                  fontFamily: 'monospace',
                  background: hasCollision ? 'rgba(245, 158, 11, 0.15)' : 'rgba(6, 182, 212, 0.15)',
                  border: `1px solid ${hasCollision ? 'var(--accent-orange)' : 'var(--accent-algo)'}`,
                }}>
                  {item.key}
                </span>
              ))}
              {hasCollision && (
                <span style={{ fontSize: '0.6rem', color: 'var(--accent-orange)' }}>collision!</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Binary Search Visual ──
function BinarySearchVisual() {
  const sortedArr = [2, 5, 8, 11, 15, 19, 23, 27, 31, 35, 42, 48]
  const [target, setTarget] = useState(23)
  const [lo, setLo] = useState(-1)
  const [hi, setHi] = useState(-1)
  const [mid, setMid] = useState(-1)
  const [found, setFound] = useState(-1)
  const [running, setRunning] = useState(false)
  const [step, setStep] = useState(0)

  const search = async () => {
    if (running) return
    setRunning(true)
    setFound(-1)
    let l = 0, h = sortedArr.length - 1
    setLo(l); setHi(h); setStep(0)
    await delay(600)

    while (l <= h) {
      const m = Math.floor((l + h) / 2)
      setMid(m)
      setStep(s => s + 1)
      await delay(800)

      if (sortedArr[m] === target) {
        setFound(m)
        setRunning(false)
        return
      } else if (sortedArr[m] < target) {
        l = m + 1
      } else {
        h = m - 1
      }
      setLo(l); setHi(h)
      await delay(400)
    }
    setMid(-1)
    setRunning(false)
  }

  const reset = () => {
    setLo(-1); setHi(-1); setMid(-1); setFound(-1); setStep(0)
    setTarget(sortedArr[Math.floor(Math.random() * sortedArr.length)])
  }

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>target = {target}</span>
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={search} disabled={running}>
          ▶ Поиск
        </button>
        <button className="btn btn-secondary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={reset} disabled={running}>
          Сброс
        </button>
        {step > 0 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Шаг: {step}</span>}
      </div>
      <div style={{
        display: 'flex', gap: '3px', padding: '12px',
        background: 'var(--bg-primary)', borderRadius: 8,
      }}>
        {sortedArr.map((val, i) => {
          const isInRange = lo >= 0 && i >= lo && i <= hi
          const isMid = i === mid
          const isFound = i === found
          return (
            <div key={i} style={{
              padding: '6px 8px', borderRadius: 6, textAlign: 'center',
              fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 600,
              minWidth: 32,
              background: isFound ? 'var(--accent-green)'
                : isMid ? 'var(--accent-orange)'
                : isInRange ? 'rgba(6, 182, 212, 0.15)'
                : 'var(--bg-card)',
              color: isFound || isMid ? '#000' : isInRange ? 'var(--accent-algo)' : 'var(--text-muted)',
              border: `1px solid ${isFound ? 'var(--accent-green)' : isMid ? 'var(--accent-orange)' : isInRange ? 'var(--accent-algo)' : 'var(--border-color)'}`,
              transition: 'all 0.3s',
              opacity: lo >= 0 && !isInRange && !isFound ? 0.3 : 1,
              boxShadow: isMid && !isFound ? '0 0 8px rgba(245, 158, 11, 0.4)' : 'none',
            }}>
              {val}
            </div>
          )
        })}
      </div>
      <div style={{ display: 'flex', gap: '12px', marginTop: 6, fontSize: '0.7rem' }}>
        {lo >= 0 && <span style={{ color: 'var(--accent-algo)' }}>lo={lo}</span>}
        {mid >= 0 && <span style={{ color: 'var(--accent-orange)' }}>mid={mid} (val={sortedArr[mid]})</span>}
        {hi >= 0 && <span style={{ color: 'var(--accent-algo)' }}>hi={hi}</span>}
        {found >= 0 && <span style={{ color: 'var(--accent-green)' }}>Найдено! O(log n)</span>}
      </div>
    </div>
  )
}

// ── Graph Visual ──
function GraphVisual() {
  const [visited, setVisited] = useState<string[]>([])
  const [running, setRunning] = useState(false)

  const nodes: { id: string; x: number; y: number }[] = [
    { id: 'A', x: 50, y: 20 }, { id: 'B', x: 20, y: 55 },
    { id: 'C', x: 80, y: 55 }, { id: 'D', x: 10, y: 90 },
    { id: 'E', x: 50, y: 90 }, { id: 'F', x: 90, y: 90 },
  ]
  const edges: [string, string][] = [['A', 'B'], ['A', 'C'], ['B', 'D'], ['B', 'E'], ['C', 'E'], ['C', 'F']]

  const bfs = async () => {
    if (running) return
    setRunning(true)
    setVisited([])
    const order = ['A', 'B', 'C', 'D', 'E', 'F']
    for (let i = 0; i < order.length; i++) {
      await delay(500)
      setVisited(prev => [...prev, order[i]])
    }
    setRunning(false)
  }

  return (
    <div className="mini-viz">
      <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem', marginBottom: '12px' }}
        onClick={bfs} disabled={running}>
        ▶ BFS от A
      </button>
      <svg viewBox="0 0 100 110" style={{ width: '100%', height: 130, background: 'var(--bg-primary)', borderRadius: 8 }}>
        {edges.map(([a, b], i) => {
          const n1 = nodes.find(n => n.id === a)!
          const n2 = nodes.find(n => n.id === b)!
          return <line key={i} x1={n1.x} y1={n1.y} x2={n2.x} y2={n2.y} stroke="#333" strokeWidth="1" />
        })}
        {nodes.map(n => {
          const isVisited = visited.includes(n.id)
          const isCurrent = visited.length > 0 && visited[visited.length - 1] === n.id
          return (
            <g key={n.id}>
              <circle cx={n.x} cy={n.y} r={9}
                fill={isCurrent ? '#f59e0b' : isVisited ? '#06b6d4' : '#1a1a1a'}
                stroke={isCurrent ? '#f59e0b' : isVisited ? '#06b6d4' : '#333'}
                strokeWidth="1.5"
              />
              <text x={n.x} y={n.y + 3.5} textAnchor="middle" fontSize="7"
                fill={isCurrent || isVisited ? '#000' : '#f5f5f5'} fontWeight="700" fontFamily="monospace">
                {n.id}
              </text>
            </g>
          )
        })}
      </svg>
      {visited.length > 0 && (
        <div style={{ fontSize: '0.75rem', marginTop: 4, fontFamily: 'monospace', color: 'var(--accent-algo)' }}>
          Порядок: {visited.join(' → ')}
        </div>
      )}
    </div>
  )
}

// ── Two Sum Visual ──
function TwoSumVisual() {
  const arr = [2, 7, 11, 15, 1, 8]
  const target = 9
  const [step, setStep] = useState(-1)
  const [map, setMap] = useState<Map<number, number>>(new Map())
  const [foundPair, setFoundPair] = useState<[number, number] | null>(null)
  const [running, setRunning] = useState(false)

  const run = async () => {
    if (running) return
    setRunning(true)
    setStep(-1)
    setMap(new Map())
    setFoundPair(null)

    const m = new Map<number, number>()
    for (let i = 0; i < arr.length; i++) {
      setStep(i)
      await delay(800)
      const complement = target - arr[i]
      if (m.has(complement)) {
        setFoundPair([m.get(complement)!, i])
        setRunning(false)
        return
      }
      m.set(arr[i], i)
      setMap(new Map(m))
      await delay(400)
    }
    setRunning(false)
  }

  return (
    <div className="mini-viz">
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>target = {target}</span>
        <button className="btn btn-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={run} disabled={running}>
          ▶ Запуск
        </button>
      </div>
      <div style={{ display: 'flex', gap: '3px', padding: '8px', background: 'var(--bg-primary)', borderRadius: 8, marginBottom: 8 }}>
        {arr.map((val, i) => (
          <div key={i} style={{
            padding: '6px 12px', borderRadius: 6, textAlign: 'center',
            fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 600,
            background: foundPair && (i === foundPair[0] || i === foundPair[1]) ? 'var(--accent-green)'
              : i === step ? 'var(--accent-orange)'
              : i < step ? 'rgba(6, 182, 212, 0.15)'
              : 'var(--bg-card)',
            color: foundPair && (i === foundPair[0] || i === foundPair[1]) ? '#000'
              : i === step ? '#000' : 'var(--text-primary)',
            border: `1px solid ${foundPair && (i === foundPair[0] || i === foundPair[1]) ? 'var(--accent-green)' : i === step ? 'var(--accent-orange)' : 'var(--border-color)'}`,
            transition: 'all 0.3s',
          }}>
            {val}
          </div>
        ))}
      </div>
      {map.size > 0 && (
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
          Map: {'{'}{Array.from(map.entries()).map(([k, v]) => `${k}→idx${v}`).join(', ')}{'}'}
        </div>
      )}
      {foundPair && (
        <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', marginTop: 4 }}>
          Найдено! arr[{foundPair[0]}] + arr[{foundPair[1]}] = {arr[foundPair[0]]} + {arr[foundPair[1]]} = {target}
        </div>
      )}
    </div>
  )
}

// ── Helpers ──
function hashStr(str: string, size: number): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % size
  return h
}

const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

/* ═══════════════════════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════════════════════ */

interface Question {
  id: number
  topic: string
  question: string
  answer: string
  difficulty: 'easy' | 'medium' | 'hard'
  visual?: () => ReactNode
}

const QUESTIONS: Question[] = [
  // Big O
  { id: 1, topic: 'Big O', difficulty: 'easy', question: 'Что такое Big O нотация?',
    answer: 'Описывает верхнюю границу роста функции. Показывает, как алгоритм масштабируется с ростом входных данных. O(n) — линейный, O(log n) — логарифмический, O(n²) — квадратичный.',
    visual: BigOChart },
  { id: 2, topic: 'Big O', difficulty: 'medium', question: 'Какая сложность у вложенных циклов? А у последовательных?',
    answer: 'Вложенные: O(n * m), последовательные: O(n + m). Последовательные складываем, вложенные перемножаем. Константы отбрасываем.' },
  { id: 3, topic: 'Big O', difficulty: 'medium', question: 'Что такое амортизированная сложность?',
    answer: 'Средняя стоимость операции при выполнении последовательности. Например, array.push() — O(1) амортизировано, хотя иногда O(n) при расширении массива.' },

  // Стек
  { id: 4, topic: 'Стек', difficulty: 'easy', question: 'Стек — LIFO или FIFO? Основные операции?',
    answer: 'LIFO — Last In, First Out. Операции: push (O(1)), pop (O(1)), peek/top (O(1)). Реализация: массив или связный список.',
    visual: StackVisual },
  { id: 5, topic: 'Стек', difficulty: 'medium', question: 'Как проверить валидность скобок?',
    answer: 'Стек: открывающая скобка → push, закрывающая → pop и проверяем пару. В конце стек должен быть пустым. Задача Valid Parentheses (LeetCode #20).' },
  { id: 6, topic: 'Стек', difficulty: 'medium', question: 'Что такое монотонный стек?',
    answer: 'Стек, в котором элементы всегда отсортированы (возрастающе или убывающе). Используется для задач Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram.' },

  // Очередь
  { id: 7, topic: 'Очередь', difficulty: 'easy', question: 'Почему array.shift() — плохая очередь?',
    answer: 'shift() имеет сложность O(n) — сдвигает все элементы. Правильная очередь через Map/объект с указателями head и tail — все операции O(1).',
    visual: QueueVisual },

  // Деревья
  { id: 8, topic: 'Деревья', difficulty: 'easy', question: 'Какие виды обхода дерева существуют?',
    answer: 'DFS: In-order (LNR), Pre-order (NLR), Post-order (LRN). BFS: по уровням через очередь. In-order BST даёт отсортированный массив.',
    visual: TreeTraversalVisual },
  { id: 9, topic: 'Деревья', difficulty: 'medium', question: 'Как реализовать обход дерева итеративно?',
    answer: 'Через явный стек. Pre-order: push right, push left (стек LIFO). In-order: идём влево до конца, pop, идём вправо. Рекурсия = неявный стек.' },
  { id: 10, topic: 'Деревья', difficulty: 'medium', question: 'Чем BST отличается от обычного бинарного дерева?',
    answer: 'В BST: left < node < right для всех узлов. Поиск O(log n) в среднем. Деградирует до O(n) при вырожденном дереве. Решение: AVL, Red-Black деревья.' },
  { id: 11, topic: 'Деревья', difficulty: 'hard', question: 'Как валидировать BST? Какие ловушки?',
    answer: 'Нельзя просто сравнивать с родителем — нужно проверять диапазон (min, max). isValid(node, min, max) — node.val должен быть в диапазоне. Или: in-order обход должен быть строго возрастающим.' },
  { id: 12, topic: 'Деревья', difficulty: 'hard', question: 'Как удалить узел из BST?',
    answer: '3 случая: 1) Лист — удаляем. 2) Один ребёнок — заменяем. 3) Два ребёнка — находим inorder-преемника (мин. в правом поддереве), копируем значение, удаляем преемника.' },

  // Сортировки
  { id: 13, topic: 'Сортировки', difficulty: 'easy', question: 'Какой алгоритм использует Array.sort() в V8?',
    answer: 'TimSort — гибрид Merge Sort + Insertion Sort. Стабильный, O(n log n) в среднем и худшем, O(n) в лучшем (почти отсортированные данные).',
    visual: SortVisual },
  { id: 14, topic: 'Сортировки', difficulty: 'medium', question: 'Merge Sort vs Quick Sort — когда что?',
    answer: 'Merge Sort: стабильная, O(n log n) всегда, O(n) память, хороша для linked lists. Quick Sort: in-place O(log n) память, быстрее на практике (cache-friendly), но O(n²) худший.' },
  { id: 15, topic: 'Сортировки', difficulty: 'medium', question: 'Что такое стабильная сортировка?',
    answer: 'Сохраняет относительный порядок равных элементов. Стабильные: Bubble, Insertion, Merge, Tim, Counting, Radix. Нестабильные: Selection, Quick, Heap.' },
  { id: 16, topic: 'Сортировки', difficulty: 'hard', question: 'Можно ли отсортировать быстрее O(n log n)?',
    answer: 'Для сравнительных сортировок O(n log n) — нижняя граница. Но Counting Sort O(n+k) и Radix Sort O(nk) обходят это ограничение, так как не основаны на сравнениях.' },

  // Связные списки
  { id: 17, topic: 'Списки', difficulty: 'easy', question: 'Когда использовать связный список вместо массива?',
    answer: 'Частые вставки/удаления в начало O(1) vs O(n). Размер часто меняется. Не нужен random access. На практике массивы почти всегда лучше из-за cache locality.',
    visual: LinkedListVisual },
  { id: 18, topic: 'Списки', difficulty: 'medium', question: 'Как развернуть связный список?',
    answer: 'Итеративно: три указателя prev, curr, next. Цикл: next = curr.next, curr.next = prev, prev = curr, curr = next. Результат: prev — новый head.' },
  { id: 19, topic: 'Списки', difficulty: 'medium', question: 'Как определить цикл в списке?',
    answer: 'Floyd\'s algorithm: slow (1 шаг) и fast (2 шага). Если встретились — цикл есть. Для нахождения начала цикла: сбрасываем slow на head, оба идут по 1 шагу до встречи.' },
  { id: 20, topic: 'Списки', difficulty: 'medium', question: 'Что такое dummy node и зачем он нужен?',
    answer: 'Фиктивный узел перед head. Упрощает edge cases: не надо отдельно обрабатывать пустой head, удаление первого элемента. Возвращаем dummy.next.' },

  // Хеш-таблицы
  { id: 21, topic: 'Хеш', difficulty: 'easy', question: 'Map vs Object в JavaScript?',
    answer: 'Map: любые ключи, гарантированный порядок, .size, нет прототипа. Object: только string/Symbol ключи, JSON-сериализуемый. Map лучше для динамических ключей.' },
  { id: 22, topic: 'Хеш', difficulty: 'medium', question: 'Что такое коллизия и как её разрешить?',
    answer: 'Два ключа с одним хешем. Chaining: список в бакете. Open addressing: ищем свободный слот (linear/quadratic probing). Load factor > 0.75 → resize (удвоение).',
    visual: HashTableVisual },
  { id: 23, topic: 'Хеш', difficulty: 'medium', question: 'Как решить Two Sum за O(n)?',
    answer: 'HashMap: для каждого числа проверяем, есть ли complement = target - num в Map. Если есть — ответ. Если нет — добавляем num в Map. Один проход.',
    visual: TwoSumVisual },

  // Графы
  { id: 24, topic: 'Графы', difficulty: 'medium', question: 'DFS vs BFS — когда что использовать?',
    answer: 'DFS: все пути, backtracking, топологическая сортировка, циклы. BFS: кратчайший путь, обход по уровням, ближайший элемент. DFS использует стек, BFS — очередь.',
    visual: GraphVisual },
  { id: 25, topic: 'Графы', difficulty: 'medium', question: 'Как решить задачу Number of Islands?',
    answer: 'Проходим по grid, при нахождении "1" увеличиваем count и запускаем DFS/BFS для заливки всего острова (помечаем как "0"). Это flood fill алгоритм.' },

  // Бинарный поиск
  { id: 26, topic: 'Поиск', difficulty: 'easy', question: 'Что такое бинарный поиск? Условие применения?',
    answer: 'O(log n) поиск: делим пространство пополам. Условие: данные отсортированы (или есть монотонное свойство). Сравниваем mid с target, сужаем диапазон.',
    visual: BinarySearchVisual },
  { id: 27, topic: 'Поиск', difficulty: 'hard', question: 'Что такое "бинарный поиск по ответу"?',
    answer: 'Ищем не в массиве, а в диапазоне возможных ответов. Проверяем: "возможно ли решение при значении mid?" Если да — ищем меньше, нет — больше. Примеры: Koko Bananas, Ship Packages.' },
]

const TOPICS = ['Все', ...Array.from(new Set(QUESTIONS.map(q => q.topic)))]
const DIFFICULTIES = {
  easy: { label: 'Лёгкий', color: 'var(--accent-green)' },
  medium: { label: 'Средний', color: 'var(--accent-orange)' },
  hard: { label: 'Сложный', color: 'var(--accent-red)' },
}

export default function InterviewQuestions() {
  const [activeTopic, setActiveTopic] = useState('Все')
  const [openIds, setOpenIds] = useState<Set<number>>(new Set())

  const filtered = activeTopic === 'Все'
    ? QUESTIONS
    : QUESTIONS.filter(q => q.topic === activeTopic)

  const toggle = (id: number) => {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setOpenIds(new Set(filtered.map(q => q.id)))
  const collapseAll = () => setOpenIds(new Set())

  return (
    <div className="page-container">
      <h1>🎯 Вопросы на собеседовании</h1>
      <p className="page-description">
        {QUESTIONS.length} вопросов по алгоритмам и структурам данных.
        Нажмите на вопрос, чтобы увидеть ответ с интерактивной визуализацией.
      </p>

      <div className="card">
        <div className="tabs" style={{ flexWrap: 'wrap' }}>
          {TOPICS.map(topic => (
            <button
              key={topic}
              className={`tab ${activeTopic === topic ? 'active' : ''}`}
              onClick={() => setActiveTopic(topic)}
            >
              {topic} {topic !== 'Все' && `(${QUESTIONS.filter(q => q.topic === topic).length})`}
            </button>
          ))}
        </div>

        <div className="controls" style={{ justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={expandAll}>Раскрыть все</button>
          <button className="btn btn-secondary" onClick={collapseAll}>Свернуть все</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
          {filtered.map(q => (
            <div key={q.id} className="interview-question">
              <div
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}
                onClick={() => toggle(q.id)}
              >
                <span style={{
                  color: openIds.has(q.id) ? 'var(--accent-algo)' : 'var(--text-muted)',
                  transition: 'transform 0.2s',
                  transform: openIds.has(q.id) ? 'rotate(90deg)' : 'rotate(0)',
                  flexShrink: 0,
                  marginTop: '2px',
                }}>▶</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{q.question}</strong>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      background: `${DIFFICULTIES[q.difficulty].color}22`,
                      color: DIFFICULTIES[q.difficulty].color,
                    }}>
                      {DIFFICULTIES[q.difficulty].label}
                    </span>
                    {q.visual && (
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        background: 'rgba(6, 182, 212, 0.1)',
                        color: 'var(--accent-algo)',
                        border: '1px solid rgba(6, 182, 212, 0.2)',
                      }}>
                        ▶ интерактив
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {openIds.has(q.id) && (
                <div style={{ marginTop: '12px', marginLeft: '24px' }}>
                  <div style={{
                    padding: '12px 16px',
                    background: 'var(--bg-code)',
                    borderRadius: '8px',
                    borderLeft: '3px solid var(--accent-algo)',
                    color: 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                  }}>
                    {q.answer}
                  </div>
                  {q.visual && (
                    <div style={{ marginTop: '12px' }}>
                      <q.visual />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
