import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function GraphBasics() {
  const [activeTab, setActiveTab] = useState<'concepts' | 'dfs' | 'bfs' | 'problems'>('concepts')

  return (
    <div className="page-container">
      <h1>🕸️ Графы</h1>
      <p className="page-description">
        Граф — набор вершин (nodes) и рёбер (edges). Деревья — частный случай графа.
        Графы моделируют связи: соцсети, карты, зависимости.
      </p>

      <div className="card">
        <div className="tabs">
          {[
            { key: 'concepts', label: 'Основы' },
            { key: 'dfs', label: 'DFS' },
            { key: 'bfs', label: 'BFS' },
            { key: 'problems', label: 'Задачи' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key as typeof activeTab)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'concepts' && (
          <>
            <div className="card-header">
              <span className="card-title">📐 Представления графа</span>
            </div>

            <div className="grid-2">
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--accent-algo)' }}>Adjacency List (список смежности)</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '8px 0' }}>
                  Map: вершина → массив соседей. Экономит память для разреженных графов.
                </p>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  0: [1, 2]<br/>
                  1: [0, 3]<br/>
                  2: [0]<br/>
                  3: [1]
                </div>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
                <strong style={{ color: 'var(--accent-purple)' }}>Adjacency Matrix (матрица смежности)</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '8px 0' }}>
                  2D массив: matrix[i][j] = 1 если есть ребро. Быстрая проверка связи O(1).
                </p>
                <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {'  '}0 1 2 3<br/>
                  0 [0,1,1,0]<br/>
                  1 [1,0,0,1]<br/>
                  2 [1,0,0,0]<br/>
                  3 [0,1,0,0]
                </div>
              </div>
            </div>

            <CodeBlock language="typescript" title="graph-representation.ts" code={`
// Adjacency List — самый частый на собесах
class Graph {
  private adj = new Map<number, number[]>();

  addVertex(v: number): void {
    if (!this.adj.has(v)) {
      this.adj.set(v, []);
    }
  }

  addEdge(v1: number, v2: number): void {
    this.adj.get(v1)?.push(v2);
    this.adj.get(v2)?.push(v1); // Для ненаправленного
  }

  getNeighbors(v: number): number[] {
    return this.adj.get(v) ?? [];
  }
}

// Часто граф задаётся как edge list:
// edges = [[0,1], [0,2], [1,3]]
function buildGraph(n: number, edges: number[][]): Map<number, number[]> {
  const graph = new Map<number, number[]>();
  for (let i = 0; i < n; i++) graph.set(i, []);
  for (const [u, v] of edges) {
    graph.get(u)!.push(v);
    graph.get(v)!.push(u);
  }
  return graph;
}
`} />

            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '16px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Операция</th>
                  <th style={{ padding: '10px' }}>Adj. List</th>
                  <th style={{ padding: '10px' }}>Adj. Matrix</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Память', 'O(V + E)', 'O(V²)'],
                  ['Добавить ребро', 'O(1)', 'O(1)'],
                  ['Проверить ребро', 'O(degree)', 'O(1)'],
                  ['Найти соседей', 'O(degree)', 'O(V)'],
                  ['DFS/BFS', 'O(V + E)', 'O(V²)'],
                ].map(([op, list, matrix]) => (
                  <tr key={op} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px' }}>{op}</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)' }}>{list}</td>
                    <td style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)' }}>{matrix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === 'dfs' && (
          <>
            <div className="card-header">
              <span className="card-title">🔍 DFS — обход в глубину</span>
            </div>
            <div className="info-box info" style={{ marginBottom: '16px' }}>
              DFS идёт «вглубь» до тупика, потом возвращается (backtrack).
              Использует стек (рекурсия = неявный стек). Применяется для поиска путей,
              компонент связности, топологической сортировки.
            </div>
            <CodeBlock language="typescript" title="graph-dfs.ts" code={`
// DFS — рекурсивный
function dfs(
  graph: Map<number, number[]>,
  start: number,
  visited = new Set<number>()
): number[] {
  visited.add(start);
  const result = [start];

  for (const neighbor of graph.get(start) ?? []) {
    if (!visited.has(neighbor)) {
      result.push(...dfs(graph, neighbor, visited));
    }
  }

  return result;
}

// DFS — итеративный (через стек)
function dfsIterative(
  graph: Map<number, number[]>,
  start: number
): number[] {
  const visited = new Set<number>();
  const stack = [start];
  const result: number[] = [];

  while (stack.length > 0) {
    const node = stack.pop()!;
    if (visited.has(node)) continue;

    visited.add(node);
    result.push(node);

    // Добавляем соседей в стек
    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }

  return result;
}

// DFS на матрице (grid) — частый паттерн!
function dfsGrid(
  grid: number[][],
  row: number,
  col: number,
  visited: boolean[][]
): void {
  if (row < 0 || row >= grid.length ||
      col < 0 || col >= grid[0].length ||
      visited[row][col] || grid[row][col] === 0) {
    return;
  }

  visited[row][col] = true;

  dfsGrid(grid, row - 1, col, visited); // Up
  dfsGrid(grid, row + 1, col, visited); // Down
  dfsGrid(grid, row, col - 1, visited); // Left
  dfsGrid(grid, row, col + 1, visited); // Right
}
`} />
          </>
        )}

        {activeTab === 'bfs' && (
          <>
            <div className="card-header">
              <span className="card-title">📡 BFS — обход в ширину</span>
            </div>
            <div className="info-box info" style={{ marginBottom: '16px' }}>
              BFS идёт «по уровням» — сначала все соседи, потом соседи соседей.
              Использует очередь. Находит кратчайший путь в невзвешенном графе.
            </div>
            <CodeBlock language="typescript" title="graph-bfs.ts" code={`
// BFS — кратчайший путь в невзвешенном графе
function bfs(
  graph: Map<number, number[]>,
  start: number
): number[] {
  const visited = new Set<number>([start]);
  const queue = [start];
  const result: number[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return result;
}

// BFS — кратчайшее расстояние
function shortestPath(
  graph: Map<number, number[]>,
  start: number,
  end: number
): number {
  const visited = new Set<number>([start]);
  const queue: [number, number][] = [[start, 0]]; // [node, distance]

  while (queue.length > 0) {
    const [node, dist] = queue.shift()!;
    
    if (node === end) return dist;

    for (const neighbor of graph.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }

  return -1; // Не достижим
}
`} />
          </>
        )}

        {activeTab === 'problems' && (
          <>
            <div className="card-header">
              <span className="card-title">🧩 Задачи на графы</span>
            </div>

            <div className="interview-question">
              <strong>Number of Islands (LeetCode #200)</strong>
            </div>
            <CodeBlock language="typescript" title="number-of-islands.ts" code={`
function numIslands(grid: string[][]): number {
  if (!grid.length) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function dfs(r: number, c: number): void {
    if (r < 0 || r >= rows || c < 0 || c >= cols || 
        grid[r][c] === '0') return;

    grid[r][c] = '0'; // Помечаем как visited
    dfs(r - 1, c);
    dfs(r + 1, c);
    dfs(r, c - 1);
    dfs(r, c + 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
`} />

            <div className="interview-question" style={{ marginTop: '16px' }}>
              <strong>Clone Graph (LeetCode #133)</strong>
            </div>
            <CodeBlock language="typescript" title="clone-graph.ts" code={`
function cloneGraph(node: GraphNode | null): GraphNode | null {
  if (!node) return null;

  const cloned = new Map<GraphNode, GraphNode>();

  function dfs(n: GraphNode): GraphNode {
    if (cloned.has(n)) return cloned.get(n)!;

    const copy = new GraphNode(n.val);
    cloned.set(n, copy);

    for (const neighbor of n.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}
`} />

            <div className="interview-question" style={{ marginTop: '16px' }}>
              <strong>Course Schedule — Topological Sort (LeetCode #207)</strong>
            </div>
            <CodeBlock language="typescript" title="topological-sort.ts" code={`
function canFinish(
  numCourses: number,
  prerequisites: number[][]
): boolean {
  const graph = new Map<number, number[]>();
  const inDegree = new Array(numCourses).fill(0);

  for (let i = 0; i < numCourses; i++) graph.set(i, []);

  for (const [course, prereq] of prerequisites) {
    graph.get(prereq)!.push(course);
    inDegree[course]++;
  }

  // Kahn's algorithm (BFS)
  const queue: number[] = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let completed = 0;
  while (queue.length > 0) {
    const course = queue.shift()!;
    completed++;

    for (const next of graph.get(course)!) {
      inDegree[next]--;
      if (inDegree[next] === 0) queue.push(next);
    }
  }

  return completed === numCourses; // Все курсы можно пройти?
}
`} />
          </>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🧠 DFS vs BFS</span>
        </div>
        <div className="grid-2">
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
            <strong style={{ color: 'var(--accent-algo)' }}>DFS использовать когда:</strong>
            <ul className="info-list">
              <li>Нужно найти все пути</li>
              <li>Backtracking задачи</li>
              <li>Топологическая сортировка</li>
              <li>Обнаружение циклов</li>
              <li>Компоненты связности</li>
            </ul>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>BFS использовать когда:</strong>
            <ul className="info-list">
              <li>Кратчайший путь</li>
              <li>Обход по уровням</li>
              <li>Ближайший элемент</li>
              <li>Minimum steps / moves</li>
              <li>Multi-source BFS</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
