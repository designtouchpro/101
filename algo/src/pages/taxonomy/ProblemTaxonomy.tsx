import { useState } from 'react'

type Tab = 'patterns' | 'matrix' | 'path'

interface PatternFamily {
  name: string
  icon: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  prereqs: string[]
  description: string
  keyIdea: string
  problems: { name: string; diff: 'E' | 'M' | 'H'; hint: string }[]
  template: string
}

const families: PatternFamily[] = [
  {
    name: 'Two Pointers',
    icon: '👈👉',
    difficulty: 'Easy',
    prereqs: ['Массивы', 'Сортировка'],
    description: 'Два указателя идут навстречу или в одном направлении, сужая область поиска.',
    keyIdea: 'Отсортированный массив → O(n) вместо O(n²)',
    problems: [
      { name: 'Two Sum II (sorted)', diff: 'E', hint: 'left + right, сужаем' },
      { name: '3Sum', diff: 'M', hint: 'Фиксируем один, two pointers на остальных' },
      { name: 'Container With Most Water', diff: 'M', hint: 'Двигаем сторону с меньшей высотой' },
      { name: 'Trapping Rain Water', diff: 'H', hint: 'leftMax / rightMax или стек' },
    ],
    template: `function twoPointers(arr) {
  let left = 0, right = arr.length - 1
  while (left < right) {
    const sum = arr[left] + arr[right]
    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }
}`,
  },
  {
    name: 'Sliding Window',
    icon: '🪟',
    difficulty: 'Medium',
    prereqs: ['Two Pointers', 'HashMap'],
    description: 'Окно фиксированного или переменного размера скользит по массиву/строке.',
    keyIdea: 'Подмассив/подстрока с условием → O(n) вместо O(n·k)',
    problems: [
      { name: 'Maximum Sum Subarray of Size K', diff: 'E', hint: 'Фиксированное окно' },
      { name: 'Longest Substring Without Repeating', diff: 'M', hint: 'Set + shrink при дубле' },
      { name: 'Minimum Window Substring', diff: 'H', hint: 'need/have counters + shrink' },
      { name: 'Sliding Window Maximum', diff: 'H', hint: 'Deque (monotonic)' },
    ],
    template: `function slidingWindow(s) {
  let left = 0, result = 0
  const window = new Map()
  for (let right = 0; right < s.length; right++) {
    // expand: add s[right] to window
    while (/* window invalid */) {
      // shrink: remove s[left] from window
      left++
    }
    result = Math.max(result, right - left + 1)
  }
  return result
}`,
  },
  {
    name: 'Prefix Sum',
    icon: '📊',
    difficulty: 'Easy',
    prereqs: ['Массивы'],
    description: 'Предвычисление кумулятивной суммы для O(1) range-запросов.',
    keyIdea: 'sum(l, r) = prefix[r+1] - prefix[l]',
    problems: [
      { name: 'Range Sum Query', diff: 'E', hint: 'prefix[r+1] - prefix[l]' },
      { name: 'Subarray Sum Equals K', diff: 'M', hint: 'HashMap: prefix → count' },
      { name: 'Product of Array Except Self', diff: 'M', hint: 'left prefix × right prefix' },
      { name: '2D Prefix Sum', diff: 'M', hint: 'Inclusion-exclusion' },
    ],
    template: `function buildPrefix(nums) {
  const prefix = [0]
  for (const n of nums) {
    prefix.push(prefix.at(-1) + n)
  }
  // sum(l, r) = prefix[r+1] - prefix[l]
  return prefix
}`,
  },
  {
    name: 'Binary Search',
    icon: '🔍',
    difficulty: 'Medium',
    prereqs: ['Сортировка', 'Монотонность'],
    description: 'Поиск по отсортированным данным или binary search on answer.',
    keyIdea: 'Монотонная функция → O(log n)',
    problems: [
      { name: 'Search in Rotated Array', diff: 'M', hint: 'Определить отсортированную половину' },
      { name: 'Find Minimum in Rotated', diff: 'M', hint: 'mid vs right' },
      { name: 'Koko Eating Bananas', diff: 'M', hint: 'BS on answer: скорость поедания' },
      { name: 'Median of Two Sorted Arrays', diff: 'H', hint: 'BS по partition меньшего' },
    ],
    template: `function binarySearch(lo, hi, check) {
  while (lo < hi) {
    const mid = lo + ((hi - lo) >> 1)
    if (check(mid)) hi = mid
    else lo = mid + 1
  }
  return lo // first true
}`,
  },
  {
    name: 'Intervals',
    icon: '📅',
    difficulty: 'Medium',
    prereqs: ['Сортировка', 'Greedy'],
    description: 'Работа с отрезками [start, end]: merge, overlap, scheduling.',
    keyIdea: 'Сортировка по start → линейный проход',
    problems: [
      { name: 'Merge Intervals', diff: 'M', hint: 'Sort by start, merge overlapping' },
      { name: 'Insert Interval', diff: 'M', hint: 'Before / overlap / after' },
      { name: 'Non-overlapping Intervals', diff: 'M', hint: 'Greedy: удалять с большим end' },
      { name: 'Meeting Rooms II', diff: 'M', hint: 'Min-heap по endTime' },
    ],
    template: `function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const merged = [intervals[0]]
  for (let i = 1; i < intervals.length; i++) {
    const last = merged.at(-1)
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1])
    } else {
      merged.push(intervals[i])
    }
  }
  return merged
}`,
  },
  {
    name: 'Stack (Monotonic)',
    icon: '📚',
    difficulty: 'Medium',
    prereqs: ['Стек'],
    description: 'Монотонный стек для поиска next greater/smaller элемента за O(n).',
    keyIdea: 'Стек хранит кандидатов в порядке возрастания/убывания',
    problems: [
      { name: 'Next Greater Element', diff: 'E', hint: 'Стек: push, pop при большем' },
      { name: 'Daily Temperatures', diff: 'M', hint: 'Стек индексов' },
      { name: 'Largest Rectangle in Histogram', diff: 'H', hint: 'Монотонный стек высот' },
      { name: 'Trapping Rain Water', diff: 'H', hint: 'Стек: pop при большем, ширина×высота' },
    ],
    template: `function nextGreater(nums) {
  const result = new Array(nums.length).fill(-1)
  const stack = [] // indices
  for (let i = 0; i < nums.length; i++) {
    while (stack.length && nums[i] > nums[stack.at(-1)]) {
      result[stack.pop()] = nums[i]
    }
    stack.push(i)
  }
  return result
}`,
  },
  {
    name: 'BFS / DFS',
    icon: '🕸️',
    difficulty: 'Medium',
    prereqs: ['Графы', 'Очередь', 'Рекурсия'],
    description: 'Обход графа/дерева в ширину (BFS) или глубину (DFS).',
    keyIdea: 'BFS — кратчайший путь, DFS — полное исследование',
    problems: [
      { name: 'Number of Islands', diff: 'M', hint: 'DFS/BFS flood fill' },
      { name: 'Clone Graph', diff: 'M', hint: 'BFS + HashMap old→new' },
      { name: 'Course Schedule', diff: 'M', hint: 'Topological sort (BFS Kahn)' },
      { name: 'Word Ladder', diff: 'H', hint: 'BFS: слово→соседи' },
    ],
    template: `function bfs(start, graph) {
  const queue = [start]
  const visited = new Set([start])
  while (queue.length) {
    const node = queue.shift()
    for (const next of graph[node]) {
      if (!visited.has(next)) {
        visited.add(next)
        queue.push(next)
      }
    }
  }
}`,
  },
  {
    name: 'Backtracking',
    icon: '🔙',
    difficulty: 'Medium',
    prereqs: ['Рекурсия', 'DFS'],
    description: 'Генерация всех комбинаций/перестановок с отсечением.',
    keyIdea: 'choose → explore → unchoose',
    problems: [
      { name: 'Subsets', diff: 'M', hint: 'Include/exclude каждый элемент' },
      { name: 'Permutations', diff: 'M', hint: 'Swap или used-массив' },
      { name: 'Combination Sum', diff: 'M', hint: 'Можно повторять, start index' },
      { name: 'N-Queens', diff: 'H', hint: 'Cols + diags sets' },
    ],
    template: `function backtrack(path, choices) {
  if (/* goal */) {
    result.push([...path])
    return
  }
  for (const choice of choices) {
    path.push(choice)      // choose
    backtrack(path, next)   // explore
    path.pop()              // unchoose
  }
}`,
  },
  {
    name: 'Dynamic Programming',
    icon: '🧩',
    difficulty: 'Hard',
    prereqs: ['Рекурсия', 'Backtracking'],
    description: 'Оптимальная подструктура + перекрывающиеся подзадачи.',
    keyIdea: 'Мемоизация или табуляция. Определи состояние → переход → базу.',
    problems: [
      { name: 'Climbing Stairs', diff: 'E', hint: 'dp[i] = dp[i-1] + dp[i-2]' },
      { name: 'Coin Change', diff: 'M', hint: 'dp[amount] = min(dp[amount-coin]+1)' },
      { name: 'Longest Increasing Subsequence', diff: 'M', hint: 'dp[i] = max(dp[j]+1) или BS' },
      { name: 'Edit Distance', diff: 'M', hint: '2D dp: insert/delete/replace' },
    ],
    template: `// Top-down (мемоизация)
function solve(i, memo = {}) {
  if (i in memo) return memo[i]
  if (/* base */) return baseValue
  memo[i] = /* recurrence */
  return memo[i]
}

// Bottom-up (табуляция)
const dp = new Array(n + 1).fill(0)
dp[0] = base
for (let i = 1; i <= n; i++) {
  dp[i] = /* recurrence using dp[...] */
}`,
  },
  {
    name: 'Greedy',
    icon: '💰',
    difficulty: 'Medium',
    prereqs: ['Сортировка'],
    description: 'Локально оптимальный выбор → глобально оптимальный результат.',
    keyIdea: 'Доказательство: exchange argument или жадный остаётся не хуже',
    problems: [
      { name: 'Jump Game', diff: 'M', hint: 'maxReach ≥ i' },
      { name: 'Gas Station', diff: 'M', hint: 'Total ≥ 0 → решение есть, start от min prefix' },
      { name: 'Task Scheduler', diff: 'M', hint: 'Самый частый → idle slots' },
      { name: 'Jump Game II', diff: 'M', hint: 'BFS по уровням' },
    ],
    template: `// Greedy: выбрать лучший вариант на каждом шаге
function greedy(items) {
  items.sort(/* by criterion */)
  let result = 0
  for (const item of items) {
    if (/* feasible */) {
      result += item.value
    }
  }
  return result
}`,
  },
  {
    name: 'Union-Find',
    icon: '🔗',
    difficulty: 'Medium',
    prereqs: ['Графы'],
    description: 'Быстрое объединение и поиск компонент связности.',
    keyIdea: 'Path compression + union by rank → почти O(1) на операцию',
    problems: [
      { name: 'Number of Connected Components', diff: 'M', hint: 'Union edges, count roots' },
      { name: 'Redundant Connection', diff: 'M', hint: 'Union; if same root → лишнее ребро' },
      { name: 'Accounts Merge', diff: 'M', hint: 'Union email → owner' },
      { name: 'Smallest String With Swaps', diff: 'M', hint: 'Union indices, sort within groups' },
    ],
    template: `class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i)
    this.rank = new Array(n).fill(0)
  }
  find(x) {
    if (this.parent[x] !== x)
      this.parent[x] = this.find(this.parent[x])
    return this.parent[x]
  }
  union(a, b) {
    const [ra, rb] = [this.find(a), this.find(b)]
    if (ra === rb) return false
    if (this.rank[ra] < this.rank[rb]) this.parent[ra] = rb
    else if (this.rank[ra] > this.rank[rb]) this.parent[rb] = ra
    else { this.parent[rb] = ra; this.rank[ra]++ }
    return true
  }
}`,
  },
  {
    name: 'Trie',
    icon: '🌲',
    difficulty: 'Medium',
    prereqs: ['Деревья', 'Строки'],
    description: 'Префиксное дерево для эффективного поиска/автодополнения по строкам.',
    keyIdea: 'Общие префиксы → общие узлы',
    problems: [
      { name: 'Implement Trie', diff: 'M', hint: 'insert/search/startsWith' },
      { name: 'Word Search II', diff: 'H', hint: 'Trie + DFS по матрице' },
      { name: 'Design Search Autocomplete', diff: 'H', hint: 'Trie + frequency' },
    ],
    template: `class TrieNode {
  constructor() {
    this.children = {}
    this.isEnd = false
  }
}
class Trie {
  constructor() { this.root = new TrieNode() }
  insert(word) {
    let node = this.root
    for (const ch of word) {
      if (!node.children[ch])
        node.children[ch] = new TrieNode()
      node = node.children[ch]
    }
    node.isEnd = true
  }
}`,
  },
]

const diffColor = { E: '#34C759', M: '#FF9500', H: '#FF3B30' }
const diffLabel = { E: 'Easy', M: 'Medium', H: 'Hard' }

export default function ProblemTaxonomy() {
  const [tab, setTab] = useState<Tab>('patterns')
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div className="demo-container">
      <h1>🗺️ Таксономия задач и паттернов</h1>
      <p className="section-desc">
        Карта паттернов: от условия задачи к подходу решения.
        Группировка по семействам, сложность и пререквизиты.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['patterns', '🧩 Семейства паттернов'],
          ['matrix', '📊 Матрица задач'],
          ['path', '🛤️ Путь изучения'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'patterns' && (
        <>
          {families.map(f => (
            <section key={f.name} className="card" style={{ marginBottom: 16 }}>
              <div
                onClick={() => setExpanded(expanded === f.name ? null : f.name)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <h2 style={{ margin: 0 }}>{f.icon} {f.name}</h2>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    padding: '2px 10px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 600,
                    background: f.difficulty === 'Easy' ? '#dcfce7' : f.difficulty === 'Medium' ? '#fef3c7' : '#fecaca',
                    color: f.difficulty === 'Easy' ? '#166534' : f.difficulty === 'Medium' ? '#92400e' : '#991b1b',
                  }}>
                    {f.difficulty}
                  </span>
                  <span style={{ fontSize: '1.2rem', transition: 'transform 0.2s', transform: expanded === f.name ? 'rotate(180deg)' : 'none' }}>▼</span>
                </div>
              </div>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>{f.description}</p>
              <div style={{ margin: '4px 0', fontSize: '0.85rem' }}>
                <strong>Пререквизиты:</strong> {f.prereqs.join(', ')}
              </div>

              {expanded === f.name && (
                <div style={{ marginTop: 16 }}>
                  <div className="info-box" style={{ marginBottom: 12 }}>
                    <strong>💡 Ключевая идея:</strong> {f.keyIdea}
                  </div>

                  <h3>Задачи</h3>
                  <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border)' }}>
                        <th style={{ textAlign: 'left', padding: 8 }}>Задача</th>
                        <th style={{ textAlign: 'left', padding: 8 }}>Diff</th>
                        <th style={{ textAlign: 'left', padding: 8 }}>Hint</th>
                      </tr>
                    </thead>
                    <tbody>
                      {f.problems.map(p => (
                        <tr key={p.name} style={{ borderBottom: '1px solid var(--border)' }}>
                          <td style={{ padding: 8 }}>{p.name}</td>
                          <td style={{ padding: 8, color: diffColor[p.diff], fontWeight: 600 }}>{diffLabel[p.diff]}</td>
                          <td style={{ padding: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{p.hint}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 style={{ marginTop: 16 }}>Шаблон</h3>
                  <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
                    {f.template}
                  </pre>
                </div>
              )}
            </section>
          ))}
        </>
      )}

      {tab === 'matrix' && (
        <>
          <section className="card">
            <h2>📊 Как распознать паттерн по условию</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Фраза в условии</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Паттерн</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Почему</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { phrase: '«Найти пару с суммой...»', pattern: 'Two Pointers / HashMap', why: 'Сортируем → left/right, или hash для O(1) lookup' },
                  { phrase: '«Подстрока/подмассив с условием...»', pattern: 'Sliding Window', why: 'Окно переменной длины, shrink при нарушении' },
                  { phrase: '«Сумма на отрезке...»', pattern: 'Prefix Sum', why: 'Предвычисление → O(1) range query' },
                  { phrase: '«Минимум/максимум ... отсортировано»', pattern: 'Binary Search', why: 'Монотонная функция → BS' },
                  { phrase: '«Объединить интервалы...»', pattern: 'Intervals (Sort + Merge)', why: 'Sort by start → linear merge' },
                  { phrase: '«Следующий больший элемент»', pattern: 'Monotonic Stack', why: 'Стек хранит кандидатов по убыванию' },
                  { phrase: '«Кратчайший путь / уровни»', pattern: 'BFS', why: 'По слоям → кратчайшее расстояние' },
                  { phrase: '«Все комбинации / перестановки»', pattern: 'Backtracking', why: 'Перебор с отсечением' },
                  { phrase: '«Минимальная стоимость / макс. прибыль»', pattern: 'DP', why: 'Оптимальная подструктура + overlapping' },
                  { phrase: '«Можно ли жадно...»', pattern: 'Greedy', why: 'Локальный оптимум → глобальный' },
                  { phrase: '«Компоненты связности»', pattern: 'Union-Find / DFS', why: 'Объединение по рёбрам' },
                  { phrase: '«Поиск по префиксу / автодополнение»', pattern: 'Trie', why: 'Общие префиксы в дереве' },
                  { phrase: '«Top K / Kth element»', pattern: 'Heap (Priority Queue)', why: 'Min/Max heap размера K → O(n log K)' },
                  { phrase: '«Зависимости / порядок»', pattern: 'Topological Sort', why: 'DAG → Kahn BFS или DFS postorder' },
                  { phrase: '«Битовые операции / XOR»', pattern: 'Bit Manipulation', why: 'XOR свойства: a⊕a=0, a⊕0=a' },
                ].map(r => (
                  <tr key={r.phrase} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontStyle: 'italic' }}>{r.phrase}</td>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.pattern}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="card">
            <h2>📐 Сложность по паттернам</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Паттерн</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Time</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Space</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { p: 'Two Pointers', t: 'O(n)', s: 'O(1)', note: 'Если массив уже отсортирован' },
                  { p: 'Sliding Window', t: 'O(n)', s: 'O(k)', note: 'k — размер окна/алфавита' },
                  { p: 'Prefix Sum', t: 'O(n) build + O(1) query', s: 'O(n)', note: 'С HashMap O(n) для subarray sum' },
                  { p: 'Binary Search', t: 'O(log n)', s: 'O(1)', note: 'BS on answer может быть O(n log n)' },
                  { p: 'Monotonic Stack', t: 'O(n)', s: 'O(n)', note: 'Каждый элемент push/pop 1 раз' },
                  { p: 'BFS/DFS', t: 'O(V + E)', s: 'O(V)', note: 'V — вершины, E — рёбра' },
                  { p: 'Backtracking', t: 'O(k^n)', s: 'O(n)', note: 'Экспоненциальный, pruning помогает' },
                  { p: 'DP', t: 'O(n × states)', s: 'O(states)', note: 'Space optimization: rolling array' },
                  { p: 'Union-Find', t: 'O(α(n)) ≈ O(1)', s: 'O(n)', note: 'α — обратная функция Аккермана' },
                  { p: 'Trie', t: 'O(L) per op', s: 'O(Σ × L × N)', note: 'L — длина слова, Σ — алфавит' },
                ].map(r => (
                  <tr key={r.p} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8, fontWeight: 600 }}>{r.p}</td>
                    <td style={{ padding: 8, fontFamily: 'monospace' }}>{r.t}</td>
                    <td style={{ padding: 8, fontFamily: 'monospace' }}>{r.s}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'path' && (
        <>
          <section className="card">
            <h2>🛤️ Рекомендуемый порядок изучения</h2>
            <p>Каждый уровень основан на предыдущем. Не перескакивайте.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 16 }}>
              {[
                { level: 1, name: 'Основы', color: '#34C759', items: ['Массивы и строки', 'HashMap / HashSet', 'Стек и очередь', 'Связные списки', 'Сортировки (merge, quick)'] },
                { level: 2, name: 'Базовые паттерны', color: '#007AFF', items: ['Two Pointers', 'Prefix Sum', 'Binary Search', 'Sliding Window (фикс.)', 'Рекурсия'] },
                { level: 3, name: 'Средние паттерны', color: '#FF9500', items: ['Sliding Window (переменный)', 'Monotonic Stack', 'BFS / DFS', 'Intervals', 'Backtracking', 'Greedy'] },
                { level: 4, name: 'Продвинутые', color: '#FF3B30', items: ['Dynamic Programming (1D → 2D)', 'Union-Find', 'Trie', 'Topological Sort', 'Segment Tree / BIT'] },
                { level: 5, name: 'Экспертные', color: '#AF52DE', items: ['DP on trees / bitmask DP', 'Dijkstra / Bellman-Ford', 'Max Flow / Bipartite Matching', 'String algorithms (KMP, Z-function)'] },
              ].map(l => (
                <div key={l.level} style={{
                  display: 'grid', gridTemplateColumns: '3fr 7fr', gap: 16,
                  padding: 16, borderRadius: 8, border: `2px solid ${l.color}`,
                }}>
                  <div>
                    <div style={{
                      display: 'inline-block', padding: '4px 12px', borderRadius: 12,
                      background: l.color, color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                    }}>
                      Level {l.level}
                    </div>
                    <div style={{ fontWeight: 600, marginTop: 4 }}>{l.name}</div>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {l.items.map(item => (
                      <span key={item} style={{
                        padding: '4px 12px', borderRadius: 8,
                        background: 'var(--bg-secondary)', fontSize: '0.9rem',
                      }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>📋 Стратегия подготовки к интервью</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {[
                { step: '1. По 5 задач на паттерн', desc: 'Начать с Easy, переходить на Medium. Не гнаться за количеством.' },
                { step: '2. Шаблон → вариации', desc: 'Выучить шаблон паттерна, затем решать вариации. 80% задач — комбинация 2-3 паттернов.' },
                { step: '3. Таймер 25 минут', desc: 'Если не решил за 25 мин — смотри решение, затем реши сам. Не тратить часы на одну задачу.' },
                { step: '4. Spaced repetition', desc: 'Повторять задачи через 1 день, 3 дня, 1 неделю. Забытое = не выученное.' },
                { step: '5. Mock interviews', desc: 'Объяснять решение вслух. Если не можешь объяснить — не понимаешь.' },
              ].map(s => (
                <div key={s.step} style={{
                  padding: 12, borderRadius: 8, border: '1px solid var(--border)',
                }}>
                  <strong>{s.step}</strong>
                  <div style={{ marginTop: 4, color: 'var(--text-secondary)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  )
}
