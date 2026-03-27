import CodeBlock from '../../components/CodeBlock'

export default function RecursionBacktracking() {
  return (
    <div className="page-container">
      <h1>🔄 Рекурсия и бэктрекинг</h1>
      <p className="page-description">
        Ментальная модель рекурсии, поведение стека вызовов, паттерны бэктрекинга с ветвлением и отсечением.
      </p>

      <RecursionModel />
      <CallStack />
      <BaseCasePatterns />
      <BacktrackingIntro />
      <ClassicProblems />
      <PruningSection />
      <ComplexitySection />
    </div>
  )
}

/* ─── Mental model ────────────────────────────────────── */

function RecursionModel() {
  const code = `// Рекурсия = функция вызывает СЕБЯ с уменьшённой задачей
// Три обязательных компонента:

function solve(problem) {
  // 1. БАЗОВЫЙ СЛУЧАЙ — когда остановиться
  if (problem.isSimple()) return trivialAnswer

  // 2. РЕКУРСИВНЫЙ ШАГ — уменьшить задачу
  const smaller = problem.reduce()

  // 3. КОМБИНИРОВАНИЕ — собрать ответ из подзадач
  return combine(solve(smaller))
}

// Пример: факториал
function factorial(n: number): number {
  if (n <= 1) return 1           // базовый случай
  return n * factorial(n - 1)    // рекурсивный шаг + комбинирование
}
// factorial(4) → 4 * factorial(3) → 4 * 3 * factorial(2) → 4 * 3 * 2 * 1 = 24

// Пример: сумма массива
function sum(arr: number[], i = 0): number {
  if (i >= arr.length) return 0           // базовый случай
  return arr[i] + sum(arr, i + 1)         // уменьшение + комбинирование
}

// Пример: Фибоначчи (наивная рекурсия)
function fib(n: number): number {
  if (n <= 1) return n                    // два базовых случая
  return fib(n - 1) + fib(n - 2)         // два рекурсивных вызова → дерево
}
// ⚠️ O(2^n) — экспоненциальная сложность!
// Оптимизация → мемоизация или итеративный подход`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🧠 Ментальная модель рекурсии</span>
      </div>
      <p>
        Рекурсия — способ решения задачи через <strong>разбиение на подзадачи того же типа</strong>.
        Каждый вызов решает меньшую версию, пока не дойдёт до тривиального случая.
      </p>

      <CodeBlock language="typescript" title="Три компонента рекурсии" code={code} />

      <div className="info-box info" style={{ marginTop: '12px' }}>
        <strong>💡 Главное правило:</strong> Каждый рекурсивный вызов должен приближать к базовому случаю.
        Если задача не уменьшается — бесконечная рекурсия → Stack Overflow.
      </div>
    </div>
  )
}

/* ─── Call stack ───────────────────────────────────────── */

function CallStack() {
  const code = `// Как работает стек вызовов при factorial(4):

// Вызов           Стек (снизу вверх)
// factorial(4)    [factorial(4)]
// factorial(3)    [factorial(4), factorial(3)]
// factorial(2)    [factorial(4), factorial(3), factorial(2)]
// factorial(1)    [factorial(4), factorial(3), factorial(2), factorial(1)]
//                 ↓ базовый случай → начинаем РАЗВОРАЧИВАТЬСЯ
// return 1        [factorial(4), factorial(3), factorial(2)]  → 2*1 = 2
// return 2        [factorial(4), factorial(3)]                → 3*2 = 6
// return 6        [factorial(4)]                              → 4*6 = 24
// return 24       []                                          → результат

// Глубина стека = глубина рекурсии
// factorial(10000) → Stack Overflow (~10K-30K кадров в зависимости от среды)

// Хвостовая рекурсия — можно оптимизировать (но JS не гарантирует TCO)
function factorialTail(n: number, acc = 1): number {
  if (n <= 1) return acc
  return factorialTail(n - 1, acc * n)  // ничего после вызова
}

// Итеративный эквивалент (всегда безопаснее для больших n)
function factorialIter(n: number): number {
  let result = 1
  for (let i = 2; i <= n; i++) result *= i
  return result
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📚 Стек вызовов</span>
      </div>
      <p>
        Каждый рекурсивный вызов создаёт кадр на стеке. Стек растёт вглубь,
        затем разворачивается при возвращении значений. Ключевое ограничение —
        размер стека (обычно ~10K кадров).
      </p>

      <CodeBlock language="typescript" title="Визуализация стека вызовов" code={code} />

      <div className="info-box warning" style={{ marginTop: '12px' }}>
        <strong>⚠️ Stack Overflow</strong>: Если рекурсия может быть глубже ~5000 — используйте
        итеративный подход с явным стеком или очередью.
      </div>
    </div>
  )
}

/* ─── Base case patterns ──────────────────────────────── */

function BaseCasePatterns() {
  const code = `// Паттерн 1: Один базовый случай
function power(base: number, exp: number): number {
  if (exp === 0) return 1
  return base * power(base, exp - 1)
}

// Паттерн 2: Два базовых случая
function fib(n: number): number {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

// Паттерн 3: Пустая коллекция
function flattenArray(arr: any[]): any[] {
  if (arr.length === 0) return []
  const [first, ...rest] = arr
  if (Array.isArray(first)) {
    return [...flattenArray(first), ...flattenArray(rest)]
  }
  return [first, ...flattenArray(rest)]
}

// Паттерн 4: Null-узел (деревья)
function maxDepth(node: TreeNode | null): number {
  if (node === null) return 0   // пустое поддерево
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right))
}

// Паттерн 5: Взаимная рекурсия
function isEven(n: number): boolean {
  if (n === 0) return true
  return isOdd(n - 1)
}
function isOdd(n: number): boolean {
  if (n === 0) return false
  return isEven(n - 1)
}

// ❌ Забытый базовый случай — классическая ошибка
function badRecursion(n: number): number {
  // if (n <= 0) return 0  // ← забыли!
  return n + badRecursion(n - 1) // бесконечная рекурсия при n < 0
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🎯 Паттерны базового случая</span>
      </div>
      <p>Базовый случай — точка остановки рекурсии. Каждый тип задачи имеет свой характерный паттерн.</p>

      <CodeBlock language="typescript" title="Пять паттернов базового случая" code={code} />
    </div>
  )
}

/* ─── Backtracking intro ──────────────────────────────── */

function BacktrackingIntro() {
  const code = `// Бэктрекинг = рекурсивный перебор с ОТКАТОМ
// Шаблон:

function backtrack(candidate: State, result: Answer[]) {
  // 1. Проверить — нашли ли решение?
  if (isSolution(candidate)) {
    result.push(copy(candidate))
    return
  }

  // 2. Для каждого возможного выбора
  for (const choice of getChoices(candidate)) {
    // 3. СДЕЛАТЬ выбор
    candidate.apply(choice)

    // 4. Рекурсивно продолжить
    backtrack(candidate, result)

    // 5. ОТКАТИТЬ выбор (backtrack!)
    candidate.undo(choice)
  }
}

// Пример: все перестановки массива
function permutations(nums: number[]): number[][] {
  const result: number[][] = []

  function backtrack(current: number[], remaining: number[]) {
    if (remaining.length === 0) {
      result.push([...current])  // нашли перестановку
      return
    }

    for (let i = 0; i < remaining.length; i++) {
      current.push(remaining[i])              // выбрать
      const next = [...remaining.slice(0, i), ...remaining.slice(i + 1)]
      backtrack(current, next)                 // углубиться
      current.pop()                            // откатить
    }
  }

  backtrack([], nums)
  return result
}
// permutations([1,2,3]) → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🔙 Бэктрекинг — перебор с откатом</span>
      </div>
      <p>
        Бэктрекинг строит решение по шагам. На каждом шаге пробует варианты,
        углубляется, а если тупик — <strong>откатывает последний выбор</strong> и пробует следующий.
        Это обход дерева решений в глубину (DFS).
      </p>

      <CodeBlock language="typescript" title="Шаблон бэктрекинга и перестановки" code={code} />

      <div className="info-box info" style={{ marginTop: '12px' }}>
        <strong>Дерево решений:</strong> Каждый узел — состояние, ветви — выборы,
        листья — решения (или тупики). Бэктрекинг = DFS по этому дереву.
      </div>
    </div>
  )
}

/* ─── Classic problems ────────────────────────────────── */

function ClassicProblems() {
  const code = `// === N Queens (LeetCode #51) ===
// Расставить N ферзей на N×N доске без взаимных атак

function solveNQueens(n: number): string[][] {
  const result: string[][] = []
  const board: string[][] = Array.from({ length: n },
    () => Array(n).fill('.'))

  function isSafe(row: number, col: number): boolean {
    // Проверяем столбец выше
    for (let r = 0; r < row; r++) {
      if (board[r][col] === 'Q') return false
    }
    // Проверяем диагональ ↖
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r--, c--) {
      if (board[r][c] === 'Q') return false
    }
    // Проверяем диагональ ↗
    for (let r = row - 1, c = col + 1; r >= 0 && c < n; r--, c++) {
      if (board[r][c] === 'Q') return false
    }
    return true
  }

  function backtrack(row: number) {
    if (row === n) {
      result.push(board.map(r => r.join('')))
      return
    }
    for (let col = 0; col < n; col++) {
      if (!isSafe(row, col)) continue     // ОТСЕЧЕНИЕ (pruning)
      board[row][col] = 'Q'                // выбрать
      backtrack(row + 1)                   // углубиться
      board[row][col] = '.'                // откатить
    }
  }

  backtrack(0)
  return result
}

// === Combination Sum (LeetCode #39) ===
// Найти все комбинации чисел, дающих target (можно повторять)

function combinationSum(candidates: number[], target: number): number[][] {
  const result: number[][] = []
  candidates.sort((a, b) => a - b)

  function backtrack(start: number, remaining: number, path: number[]) {
    if (remaining === 0) {
      result.push([...path])
      return
    }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break  // ОТСЕЧЕНИЕ
      path.push(candidates[i])
      backtrack(i, remaining - candidates[i], path)  // i, не i+1 → повторы OK
      path.pop()
    }
  }

  backtrack(0, target, [])
  return result
}

// === Subsets (LeetCode #78) ===
// Все подмножества массива

function subsets(nums: number[]): number[][] {
  const result: number[][] = []

  function backtrack(start: number, path: number[]) {
    result.push([...path])  // каждый узел дерева — подмножество

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i])
      backtrack(i + 1, path)
      path.pop()
    }
  }

  backtrack(0, [])
  return result
}
// subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">🧩 Классические задачи</span>
      </div>

      <div className="interview-question">
        <strong>N Queens</strong> (LeetCode #51) — расстановка ферзей, отсечение безопасности
      </div>
      <div className="interview-question">
        <strong>Combination Sum</strong> (LeetCode #39) — комбинации до целевой суммы
      </div>
      <div className="interview-question">
        <strong>Subsets</strong> (LeetCode #78) — генерация всех подмножеств
      </div>

      <CodeBlock language="typescript" title="N Queens + Combination Sum + Subsets" code={code} />
    </div>
  )
}

/* ─── Pruning ─────────────────────────────────────────── */

function PruningSection() {
  const code = `// Отсечение (pruning) — пропуск ветвей, которые точно не дадут ответ
// Без отсечения: перебираем ВСЁ дерево
// С отсечением: отрезаем бесполезные поддеревья → ускоряем в разы

// Виды отсечений:

// 1. Ограничение по значению
if (candidates[i] > remaining) break  // сумма уже превышена

// 2. Ограничение по безопасности
if (!isSafe(row, col)) continue       // ферзь под атакой

// 3. Пропуск дубликатов
if (i > start && nums[i] === nums[i - 1]) continue  // избегаем одинаковых ветвей

// 4. Ограничение по длине
if (path.length > maxLength) return    // решение не может быть длиннее

// 5. Мемоизация (кэширование состояний)
const key = \`\${row},\${col},\${mask}\`
if (memo.has(key)) return memo.get(key)

// Пример: Subsets II (LeetCode #90) — подмножества без дублей
function subsetsWithDup(nums: number[]): number[][] {
  const result: number[][] = []
  nums.sort((a, b) => a - b)  // сортировка для группировки дублей

  function backtrack(start: number, path: number[]) {
    result.push([...path])

    for (let i = start; i < nums.length; i++) {
      // ОТСЕЧЕНИЕ: пропускаем дублирующий элемент на том же уровне
      if (i > start && nums[i] === nums[i - 1]) continue
      path.push(nums[i])
      backtrack(i + 1, path)
      path.pop()
    }
  }

  backtrack(0, [])
  return result
}`

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">✂️ Отсечение (Pruning)</span>
      </div>
      <p>
        Отсечение — ключевая оптимизация бэктрекинга. Вместо полного перебора мы
        <strong> отрезаем ветви</strong>, которые не могут привести к решению.
      </p>

      <CodeBlock language="typescript" title="Виды отсечений и пример" code={code} />
    </div>
  )
}

/* ─── Complexity ──────────────────────────────────────── */

function ComplexitySection() {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-title">📊 Сложность</span>
      </div>

      <table className="comparison-table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Задача</th>
            <th>Время</th>
            <th>Пространство</th>
            <th>Комментарий</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Факториал / Степень</td>
            <td><span className="card-badge">O(n)</span></td>
            <td>O(n) стек</td>
            <td>Линейная рекурсия</td>
          </tr>
          <tr>
            <td>Фибоначчи (наивно)</td>
            <td><span className="card-badge" style={{ background: '#ef4444' }}>O(2ⁿ)</span></td>
            <td>O(n) стек</td>
            <td>Экспоненциальный рост без мемоизации</td>
          </tr>
          <tr>
            <td>Фибоначчи (memo)</td>
            <td><span className="card-badge">O(n)</span></td>
            <td>O(n)</td>
            <td>Мемоизация убирает повторные вычисления</td>
          </tr>
          <tr>
            <td>Перестановки</td>
            <td><span className="card-badge" style={{ background: '#ef4444' }}>O(n!)</span></td>
            <td>O(n)</td>
            <td>Все n! вариантов</td>
          </tr>
          <tr>
            <td>Подмножества</td>
            <td><span className="card-badge" style={{ background: '#ef4444' }}>O(2ⁿ)</span></td>
            <td>O(n)</td>
            <td>Каждый элемент — включить или нет</td>
          </tr>
          <tr>
            <td>N Queens</td>
            <td><span className="card-badge" style={{ background: '#f59e0b' }}>O(n!)</span></td>
            <td>O(n)</td>
            <td>С отсечением значительно быстрее</td>
          </tr>
          <tr>
            <td>Combination Sum</td>
            <td><span className="card-badge" style={{ background: '#f59e0b' }}>O(nᵗ)</span></td>
            <td>O(t)</td>
            <td>t = target/min — глубина дерева</td>
          </tr>
        </tbody>
      </table>

      <div className="info-box tip" style={{ marginTop: '16px' }}>
        <strong>🎯 Когда рекурсия vs итерация:</strong>
        <ul className="info-list">
          <li><strong>Рекурсия лучше:</strong> деревья, графы, вложенные структуры, бэктрекинг</li>
          <li><strong>Итерация лучше:</strong> линейные задачи, большие N (стек), хвостовая рекурсия</li>
          <li><strong>Оба:</strong> DFS можно сделать итеративно через явный стек</li>
        </ul>
      </div>
    </div>
  )
}
