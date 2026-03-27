import { useState } from 'react'

const graphAlgos = [
  {
    name: 'BFS (Breadth-First)',
    icon: '🌊',
    when: 'Кратчайший путь в невзвешенном графе, обход по уровням',
    complexity: 'O(V + E)',
    structure: 'Queue',
    code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  
  while (queue.length) {
    const node = queue.shift();
    order.push(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
  },
  {
    name: 'DFS (Depth-First)',
    icon: '🏊',
    when: 'Поиск компонент, циклов, топологическая сортировка',
    complexity: 'O(V + E)',
    structure: 'Stack / Рекурсия',
    code: `function dfs(graph, start) {
  const visited = new Set();
  const order = [];
  
  function visit(node) {
    visited.add(node);
    order.push(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visit(neighbor);
      }
    }
  }
  
  visit(start);
  return order;
}`,
  },
  {
    name: 'Dijkstra',
    icon: '🛤️',
    when: 'Кратчайший путь во взвешенном графе (неотрицательные веса)',
    complexity: 'O((V + E) log V)',
    structure: 'Min-Heap (Priority Queue)',
    code: `function dijkstra(graph, start) {
  const dist = {};
  for (const v of Object.keys(graph)) dist[v] = Infinity;
  dist[start] = 0;
  
  // Min-heap: [distance, node]
  const heap = new MinHeap();
  heap.push([0, start]);
  
  while (heap.size > 0) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue; // stale entry
    
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        heap.push([dist[v], v]);
      }
    }
  }
  return dist;
}`,
  },
  {
    name: 'Topological Sort',
    icon: '📋',
    when: 'Порядок зависимостей (DAG): сборка, курсы, задачи',
    complexity: 'O(V + E)',
    structure: 'DFS + Stack / Kahn (BFS + indegree)',
    code: `function topoSort(graph, numNodes) {
  // Kahn's algorithm (BFS-based)
  const indegree = new Array(numNodes).fill(0);
  for (const u of Object.keys(graph))
    for (const v of graph[u]) indegree[v]++;
  
  const queue = [];
  for (let i = 0; i < numNodes; i++)
    if (indegree[i] === 0) queue.push(i);
  
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of graph[u]) {
      if (--indegree[v] === 0) queue.push(v);
    }
  }
  
  return order.length === numNodes ? order : []; // cycle!
}`,
  },
]

const heapOperations = [
  { op: 'push (insert)', time: 'O(log n)', desc: 'Добавить элемент + bubble up' },
  { op: 'pop (extract min/max)', time: 'O(log n)', desc: 'Удалить верх + bubble down' },
  { op: 'peek (top)', time: 'O(1)', desc: 'Посмотреть верхний без удаления' },
  { op: 'heapify (build)', time: 'O(n)', desc: 'Построить heap из массива' },
  { op: 'size', time: 'O(1)', desc: 'Количество элементов' },
]

const heapProblems = [
  { name: 'K Largest / Smallest', approach: 'Min-heap размера K', complexity: 'O(n log k)' },
  { name: 'Merge K Sorted Lists', approach: 'Min-heap из K указателей', complexity: 'O(n log k)' },
  { name: 'Median from Stream', approach: 'Max-heap (левая) + Min-heap (правая)', complexity: 'O(log n) insert' },
  { name: 'Task Scheduler', approach: 'Max-heap по частоте + cooldown queue', complexity: 'O(n log 26)' },
  { name: 'K Closest Points', approach: 'Max-heap размера K по расстоянию', complexity: 'O(n log k)' },
]

export default function GraphsHeap() {
  const [tab, setTab] = useState<'algos' | 'heap' | 'when'>('algos')
  const [selectedAlgo, setSelectedAlgo] = useState(0)

  const algo = graphAlgos[selectedAlgo]!

  return (
    <div className="demo-container">
      <h1>🕸️ Графы и Приоритетные структуры</h1>
      <p>Графовые алгоритмы + heap/priority queue — фундамент для задач на кратчайшие пути, зависимости, и Top-K.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['algos', '🕸️ Алгоритмы графов'],
          ['heap', '🏔️ Heap / Priority Queue'],
          ['when', '🎯 Когда что выбрать'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Graph Algorithms ── */}
      {tab === 'algos' && (
        <>
          <section className="card">
            <h2>🕸️ Графовые алгоритмы</h2>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {graphAlgos.map((a, i) => (
                <button
                  key={a.name}
                  onClick={() => setSelectedAlgo(i)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: selectedAlgo === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: selectedAlgo === i ? 'var(--accent)' : 'var(--card-bg)',
                    color: selectedAlgo === i ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  {a.icon} {a.name}
                </button>
              ))}
            </div>

            <div style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 8px' }}>{algo.icon} {algo.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>Когда</div>
                  <div style={{ fontSize: '0.85rem' }}>{algo.when}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>Сложность</div>
                  <div style={{ fontWeight: 600, fontFamily: 'monospace' }}>{algo.complexity}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.6, textTransform: 'uppercase' }}>Структура</div>
                  <div style={{ fontSize: '0.85rem' }}>{algo.structure}</div>
                </div>
              </div>

              <pre style={{ margin: 0, padding: 16, background: 'var(--bg)', borderRadius: 8, overflow: 'auto', fontSize: '0.8rem', lineHeight: 1.5 }}>
                {algo.code}
              </pre>
            </div>
          </section>

          <section className="card">
            <h2>📊 Представления графа</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h4 style={{ margin: '0 0 8px' }}>Adjacency List</h4>
                <pre style={{ margin: '0 0 8px', padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem' }}>{`const graph = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['D', 'E'],
  D: [],
  E: []
};`}</pre>
                <div style={{ fontSize: '0.8rem' }}>
                  <span style={{ color: '#22c55e' }}>✅ Экономит память O(V+E)</span><br/>
                  <span style={{ color: '#22c55e' }}>✅ Быстрый обход соседей</span><br/>
                  <span style={{ color: '#ef4444' }}>⚠️ Проверка ребра O(degree)</span>
                </div>
              </div>
              <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <h4 style={{ margin: '0 0 8px' }}>Adjacency Matrix</h4>
                <pre style={{ margin: '0 0 8px', padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem' }}>{`const matrix = [
  [0, 1, 1, 0, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0]
];`}</pre>
                <div style={{ fontSize: '0.8rem' }}>
                  <span style={{ color: '#22c55e' }}>✅ Проверка ребра O(1)</span><br/>
                  <span style={{ color: '#ef4444' }}>⚠️ Память O(V²)</span><br/>
                  <span style={{ color: '#ef4444' }}>⚠️ Обход всех ребер O(V²)</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── Heap ── */}
      {tab === 'heap' && (
        <>
          <section className="card">
            <h2>🏔️ Heap (Priority Queue)</h2>
            <p style={{ marginBottom: 16 }}>Heap — полное бинарное дерево. Min-heap: родитель ≤ детей. Max-heap: родитель ≥ детей. Хранится в массиве.</p>

            <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, marginBottom: 16 }}>
              <h4 style={{ margin: '0 0 8px' }}>📐 Индексация в массиве</h4>
              <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.8 }}>
                parent(i) = Math.floor((i - 1) / 2)<br/>
                left(i) = 2 * i + 1<br/>
                right(i) = 2 * i + 2
              </div>
            </div>

            <h3>Операции</h3>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Операция</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Time</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                  </tr>
                </thead>
                <tbody>
                  {heapOperations.map(op => (
                    <tr key={op.op}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{op.op}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontFamily: 'monospace' }}>{op.time}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{op.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>🧩 Min-Heap Implementation</h2>
            <pre style={{ padding: 16, background: 'var(--bg)', borderRadius: 8, overflow: 'auto', fontSize: '0.8rem', lineHeight: 1.5 }}>{`class MinHeap {
  constructor() { this.data = []; }
  get size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(val) {
    this.data.push(val);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (this.data[i] >= this.data[parent]) break;
      [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
      i = parent;
    }
  }

  _sinkDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.data[l] < this.data[smallest]) smallest = l;
      if (r < n && this.data[r] < this.data[smallest]) smallest = r;
      if (smallest === i) break;
      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}`}</pre>
          </section>

          <section className="card">
            <h2>🎯 Задачи на Heap</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Задача</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Подход</th>
                    <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {heapProblems.map(p => (
                    <tr key={p.name}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{p.name}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{p.approach}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontFamily: 'monospace', fontSize: '0.85rem' }}>{p.complexity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── When to choose ── */}
      {tab === 'when' && (
        <>
          <section className="card">
            <h2>🎯 BFS vs DFS vs Dijkstra</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Задача</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Алгоритм</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Почему</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Кратчайший путь, все веса = 1', 'BFS', 'BFS находит кратчайший путь в невзвешенном графе'],
                    ['Кратчайший путь, есть веса', 'Dijkstra', 'Учитывает веса через priority queue'],
                    ['Есть ли путь A → B?', 'BFS или DFS', 'Оба работают, BFS найдёт кратчайший'],
                    ['Обнаружить цикл', 'DFS', 'Цикл = back edge (посещаем уже в стеке)'],
                    ['Топологический порядок (DAG)', 'DFS + reverse / Kahn', 'Порядок зависимостей без циклов'],
                    ['Компоненты связности', 'DFS / BFS', 'Обход из каждой непосещённой → компонента'],
                    ['Уровни (расстояние от root)', 'BFS', 'BFS обходит по уровням'],
                    ['Top K элементов', 'Heap', 'Min-heap размера K: O(n log k) vs O(n log n) для sort'],
                    ['Кратчайший путь, отриц. веса', 'Bellman-Ford', 'Dijkstra не работает с отрицательными'],
                    ['MST (минимальное остовное)', 'Prim (heap) / Kruskal (sort+UF)', 'Жадный алгоритм для минимального дерева'],
                  ].map(([task, algo, why]) => (
                    <tr key={task}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{task}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem', color: 'var(--accent)' }}>{algo}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>📊 Сравнение сложностей</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Алгоритм</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Time</th>
                    <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Space</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Ограничения</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['BFS', 'O(V + E)', 'O(V)', 'Невзвешенный граф'],
                    ['DFS', 'O(V + E)', 'O(V)', 'Stack overflow при глубоком графе'],
                    ['Dijkstra', 'O((V+E) log V)', 'O(V)', 'Нет отрицательных весов'],
                    ['Bellman-Ford', 'O(V × E)', 'O(V)', 'Отрицательные веса ок, циклы — нет'],
                    ['Topo Sort (Kahn)', 'O(V + E)', 'O(V)', 'Только DAG (без циклов)'],
                    ['Prim (MST)', 'O(E log V)', 'O(V)', 'Связный граф'],
                    ['Kruskal (MST)', 'O(E log E)', 'O(V)', 'Union-Find'],
                  ].map(([algo, time, space, limit]) => (
                    <tr key={algo}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{algo}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.85rem' }}>{time}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center', fontFamily: 'monospace', fontSize: '0.85rem' }}>{space}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Когда использовать BFS vs DFS?</div><div className="a">BFS: кратчайший путь в невзвешенном графе, обход по уровням. DFS: обнаружение циклов, топологическая сортировка, компоненты связности. BFS использует очередь, DFS — стек/рекурсию. Для взвешенных графов — Dijkstra (через priority queue).</div></div>
        <div className="interview-item"><div className="q">Как работает Heap и зачем нужен?</div><div className="a">Min/Max-Heap — полное бинарное дерево в массиве. Insert и extract: O(log n), peek: O(1). Главное применение: Top K задачи (O(n log k) вместо O(n log n)), merge K sorted lists, Dijkstra. Реализация: bubbleUp при вставке, sinkDown при удалении.</div></div>
        <div className="interview-item"><div className="q">Как найти кратчайший путь во взвешенном графе?</div><div className="a">Dijkstra: жадный алгоритм с min-heap. Из текущей вершины relaxation всех соседей. O((V+E) log V). Ограничение: неотрицательные веса. Для отрицательных — Bellman-Ford O(V×E). Для всех пар — Floyd-Warshall O(V³).</div></div>
      </section>
    </div>
  )
}
