import { useState } from 'react'

const dpFamilies = [
  {
    name: '1D Linear',
    icon: '📏',
    pattern: 'dp[i] зависит от dp[i-1], dp[i-2], …',
    problems: [
      { name: 'Fibonacci', state: 'dp[i] = dp[i-1] + dp[i-2]', time: 'O(n)', space: 'O(1)' },
      { name: 'Climbing Stairs', state: 'dp[i] = dp[i-1] + dp[i-2]', time: 'O(n)', space: 'O(1)' },
      { name: 'House Robber', state: 'dp[i] = max(dp[i-1], dp[i-2] + nums[i])', time: 'O(n)', space: 'O(1)' },
      { name: 'Decode Ways', state: 'dp[i] = dp[i-1] + (valid2? dp[i-2] : 0)', time: 'O(n)', space: 'O(1)' },
    ],
  },
  {
    name: '2D Grid',
    icon: '🟦',
    pattern: 'dp[i][j] зависит от соседних ячеек',
    problems: [
      { name: 'Unique Paths', state: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]', time: 'O(m×n)', space: 'O(n)' },
      { name: 'Min Path Sum', state: 'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])', time: 'O(m×n)', space: 'O(n)' },
      { name: 'Edit Distance', state: 'dp[i][j] = min(replace, insert, delete)', time: 'O(m×n)', space: 'O(n)' },
      { name: 'LCS', state: 'dp[i][j] = match? dp[i-1][j-1]+1 : max(…)', time: 'O(m×n)', space: 'O(n)' },
    ],
  },
  {
    name: 'Knapsack',
    icon: '🎒',
    pattern: 'Выбор: брать или нет элемент с ограничением',
    problems: [
      { name: '0/1 Knapsack', state: 'dp[w] = max(dp[w], dp[w-wt[i]] + val[i])', time: 'O(n×W)', space: 'O(W)' },
      { name: 'Coin Change', state: 'dp[a] = min(dp[a], dp[a-coin] + 1)', time: 'O(n×amount)', space: 'O(amount)' },
      { name: 'Subset Sum', state: 'dp[s] = dp[s] || dp[s-nums[i]]', time: 'O(n×sum)', space: 'O(sum)' },
      { name: 'Partition Equal', state: 'Subset Sum где target = sum/2', time: 'O(n×sum)', space: 'O(sum)' },
    ],
  },
  {
    name: 'Interval',
    icon: '📐',
    pattern: 'dp[i][j] = оптимум на подотрезке [i..j]',
    problems: [
      { name: 'Longest Palindromic Substr', state: 'dp[i][j] = s[i]==s[j] && dp[i+1][j-1]', time: 'O(n²)', space: 'O(n²)' },
      { name: 'Burst Balloons', state: 'dp[i][j] = max over k ∈ [i,j]', time: 'O(n³)', space: 'O(n²)' },
      { name: 'Matrix Chain Mult', state: 'dp[i][j] = min cost to multiply Ai..Aj', time: 'O(n³)', space: 'O(n²)' },
    ],
  },
  {
    name: 'Subsequence',
    icon: '🔤',
    pattern: 'Выбираем элементы (не обязательно подряд)',
    problems: [
      { name: 'LIS', state: 'dp[i] = max(dp[j]+1) for j<i where a[j]<a[i]', time: 'O(n log n)', space: 'O(n)' },
      { name: 'LCS (subsequence)', state: 'dp[i][j] = match? dp[i-1][j-1]+1 : max(…)', time: 'O(m×n)', space: 'O(n)' },
      { name: 'Distinct Subsequences', state: 'dp[i][j] = dp[i-1][j] + (match? dp[i-1][j-1] : 0)', time: 'O(m×n)', space: 'O(n)' },
    ],
  },
]

const stateDesignSteps = [
  { step: 1, title: 'Определи, что спрашивает задача', desc: 'Максимум? Минимум? Количество? Возможно ли? → Это значение dp[…]' },
  { step: 2, title: 'Определи параметры состояния', desc: 'Какая информация нужна для принятия решения? Индекс? Оставшийся вес? Последний элемент?' },
  { step: 3, title: 'Запиши рекуррентность', desc: 'dp[state] = f(dp[предыдущие состояния]). Какие переходы из текущего состояния?' },
  { step: 4, title: 'Определи базовые случаи', desc: 'dp[0] = 0? dp[0][0] = true? Что при пустом входе?' },
  { step: 5, title: 'Определи порядок заполнения', desc: 'Top-down (рекурсия + memo) или Bottom-up (циклы). Зависимости определяют порядок.' },
  { step: 6, title: 'Оптимизируй пространство', desc: 'Если dp[i] зависит только от dp[i-1], храни только 2 строки или 1 переменную.' },
]

export default function DynamicProgramming() {
  const [tab, setTab] = useState<'concept' | 'families' | 'design'>('concept')
  const [selectedFamily, setSelectedFamily] = useState(0)

  const family = dpFamilies[selectedFamily]!

  return (
    <div className="demo-container">
      <h1>🧩 Динамическое программирование</h1>
      <p>DP — метод решения задач через разбиение на подзадачи с запоминанием результатов. Самый частый тип задач на интервью после массивов и строк.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['concept', '💡 Концепция'],
          ['families', '📚 Семейства задач'],
          ['design', '🏗️ Дизайн состояния'],
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

      {/* ── Concept ── */}
      {tab === 'concept' && (
        <>
          <section className="card">
            <h2>💡 Когда задача — это DP?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12, marginBottom: 16 }}>
              {[
                { signal: 'Оптимальная подструктура', desc: 'Оптимальное решение строится из оптимальных подрешений', example: 'Кратчайший путь A→C через B = кратчайший A→B + B→C' },
                { signal: 'Перекрывающиеся подзадачи', desc: 'Одни и те же подзадачи решаются многократно', example: 'fib(5) = fib(4) + fib(3), и fib(4) тоже считает fib(3)' },
                { signal: 'Формулировка задачи', desc: '«Найди минимум/максимум/количество способов»', example: '«Минимальное количество монет для суммы N»' },
              ].map(s => (
                <div key={s.signal} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px', color: 'var(--accent)' }}>✅ {s.signal}</h4>
                  <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{s.desc}</p>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic' }}>{s.example}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🔄 Memoization vs Tabulation</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ padding: 16, background: 'var(--card-bg)', border: '2px solid #3b82f6', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 12px', color: '#3b82f6' }}>Top-Down (Memoization)</h3>
                <pre style={{ margin: '0 0 12px', padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', overflow: 'auto' }}>{`function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}`}</pre>
                <ul className="info-list">
                  <li>Рекурсия + кэш</li>
                  <li>Считает только нужные подзадачи</li>
                  <li>Проще писать</li>
                  <li>⚠️ Stack overflow при глубокой рекурсии</li>
                </ul>
              </div>

              <div style={{ padding: 16, background: 'var(--card-bg)', border: '2px solid #22c55e', borderRadius: 8 }}>
                <h3 style={{ margin: '0 0 12px', color: '#22c55e' }}>Bottom-Up (Tabulation)</h3>
                <pre style={{ margin: '0 0 12px', padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', overflow: 'auto' }}>{`function fib(n) {
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`}</pre>
                <ul className="info-list">
                  <li>Итерация + таблица</li>
                  <li>Считает все подзадачи по порядку</li>
                  <li>Можно оптимизировать память</li>
                  <li>✅ Нет риска stack overflow</li>
                </ul>
              </div>
            </div>

            <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #f59e0b', borderRadius: 4, fontSize: '0.85rem' }}>
              <strong>Правило:</strong> Начни с top-down (проще думать), затем переведи в bottom-up для оптимизации. На интервью оба варианта принимаются.
            </div>
          </section>

          <section className="card">
            <h2>⚡ Сложность DP</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Формула</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Пример</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Time = Состояния × Переход', 'Количество уникальных состояний × стоимость перехода', 'Fibonacci: n состояний × O(1) = O(n)'],
                    ['Space = Количество состояний', 'Сколько dp-значений храним', 'Grid: m×n или O(n) при оптимизации'],
                    ['Оптимизация: rolling array', 'Если dp[i] зависит от dp[i-1], храним 2 строки', 'Edit Distance: O(m×n) → O(n) space'],
                    ['Оптимизация: 1-2 переменные', 'Если зависим от dp[i-1], dp[i-2]', 'Fibonacci: O(n) → O(1) space'],
                  ].map(([formula, desc, example]) => (
                    <tr key={formula}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontFamily: 'monospace', fontSize: '0.85rem' }}>{formula}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{desc}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ── Families ── */}
      {tab === 'families' && (
        <>
          <section className="card">
            <h2>📚 Семейства DP-задач</h2>
            <p style={{ marginBottom: 16 }}>Большинство DP-задач попадают в одно из 5 семейств. Узнай паттерн → примени шаблон.</p>

            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
              {dpFamilies.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFamily(i)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: selectedFamily === i ? '2px solid var(--accent)' : '1px solid var(--border)',
                    background: selectedFamily === i ? 'var(--accent)' : 'var(--card-bg)',
                    color: selectedFamily === i ? '#fff' : 'var(--text)',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                  }}
                >
                  {f.icon} {f.name}
                </button>
              ))}
            </div>

            <div style={{ padding: 20, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 8px' }}>{family.icon} {family.name}</h3>
              <p style={{ margin: '0 0 16px', fontSize: '0.85rem', fontFamily: 'monospace', opacity: 0.7 }}>{family.pattern}</p>

              <div style={{ overflowX: 'auto' }}>
                <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Задача</th>
                      <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Рекуррентность</th>
                      <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Time</th>
                      <th style={{ textAlign: 'right', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Space</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.problems.map(p => (
                      <tr key={p.name}>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{p.name}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{p.state}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontSize: '0.85rem' }}>{p.time}</td>
                        <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'right', fontSize: '0.85rem' }}>{p.space}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>🧪 Coin Change — разбор</h2>
            <p style={{ marginBottom: 12 }}>Классика DP. Монеты [1, 3, 4], сумма = 6. Минимум монет?</p>

            <div style={{ overflowX: 'auto', marginBottom: 16 }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {[0,1,2,3,4,5,6].map(i => (
                      <th key={i} style={{ padding: '8px 12px', borderBottom: '2px solid var(--border)', textAlign: 'center', minWidth: 50 }}>
                        dp[{i}]
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {[0,1,2,1,1,2,2].map((val, i) => (
                      <td key={i} style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid var(--border)',
                        textAlign: 'center',
                        fontWeight: 700,
                        background: i === 6 ? 'var(--accent)' : 'transparent',
                        color: i === 6 ? '#fff' : 'var(--text)',
                        borderRadius: i === 6 ? 4 : 0,
                      }}>
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <pre style={{ padding: 16, background: 'var(--bg)', borderRadius: 8, overflow: 'auto', fontSize: '0.8rem', lineHeight: 1.6 }}>{`function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (a - coin >= 0) {
        dp[a] = Math.min(dp[a], dp[a - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// Time: O(amount × coins.length)
// Space: O(amount)`}</pre>
          </section>
        </>
      )}

      {/* ── State Design ── */}
      {tab === 'design' && (
        <>
          <section className="card">
            <h2>🏗️ Как проектировать DP-состояние</h2>
            <p style={{ marginBottom: 20 }}>Главный навык в DP — не запоминание задач, а умение проектировать состояние. 6 шагов:</p>

            <div style={{ position: 'relative' }}>
              {stateDesignSteps.map((s, i) => (
                <div key={s.step} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 40 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'var(--accent)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '0.9rem',
                    }}>
                      {s.step}
                    </div>
                    {i < stateDesignSteps.length - 1 && (
                      <div style={{ width: 2, flex: 1, background: 'var(--border)', marginTop: 4 }} />
                    )}
                  </div>
                  <div style={{ flex: 1, padding: 12, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                    <h4 style={{ margin: '0 0 4px' }}>{s.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🎯 Шпаргалка: «Какой тип DP?»</h2>
            <div style={{ overflowX: 'auto' }}>
              <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Если в условии</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Тип DP</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Первое действие</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Массив/строка, max/min', '1D Linear', 'dp[i] = f(dp[i-1], dp[i-2])'],
                    ['Матрица, путь', '2D Grid', 'dp[i][j] = f(соседи)'],
                    ['Ограничение (вес, сумма)', 'Knapsack', 'dp[capacity] = f(dp[capacity - item])'],
                    ['Подотрезок [i..j]', 'Interval', 'dp[i][j] = f(dp[i][k], dp[k][j])'],
                    ['Подпоследовательность', 'Subsequence', 'dp[i] = f(dp[j]) для j < i'],
                    ['Разбиение на части', 'Knapsack / Interval', 'Зависит от ограничений'],
                  ].map(([cond, type, action]) => (
                    <tr key={cond}>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{cond}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{type}</td>
                      <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>⚠️ Типичные ошибки</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
              {[
                { error: 'Неверный базовый случай', fix: 'Проверь: dp[0] = 0 или dp[0] = 1? Зависит от задачи. Всегда прогоняй минимальный пример.' },
                { error: 'Забыл Infinity вместо 0', fix: 'Для min-задач инициализируй dp = [Infinity]. dp[0] = 0. Иначе min всегда будет 0.' },
                { error: 'Неверный порядок циклов', fix: 'Knapsack 0/1: внутренний цикл назад (j = W..wt[i]). Unbounded: вперёд.' },
                { error: 'Не видишь подзадачу', fix: 'Спроси: «Что бы я решил рекурсивно, если бы не думал об эффективности?» → это и есть рекуррентность.' },
              ].map(e => (
                <div key={e.error} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                  <h4 style={{ margin: '0 0 8px', color: '#ef4444' }}>❌ {e.error}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem' }}>✅ {e.fix}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Чем отличается memoization от tabulation?</div><div className="a">Memoization (top-down): рекурсия + кэш, считает только нужные подзадачи, проще писать, но может быть stack overflow. Tabulation (bottom-up): итерация + таблица, считает все подзадачи по порядку, можно оптимизировать пространство. На практике начинаю с top-down, потом перевожу в bottom-up.</div></div>
        <div className="interview-item"><div className="q">Как определить, что задача решается DP?</div><div className="a">Два признака: 1) Оптимальная подструктура — решение строится из решений подзадач. 2) Перекрывающиеся подзадачи — одни подзадачи вычисляются многократно. Формулировка «найди минимум/максимум/количество способов» — сильный сигнал. Если нет перекрытий — это обычная рекурсия (divide and conquer).</div></div>
        <div className="interview-item"><div className="q">Как оценить сложность DP-решения?</div><div className="a">Time = количество уникальных состояний × стоимость вычисления одного. Fibonacci: n состояний × O(1) = O(n). Coin Change: amount × coins = O(amount × n). Space = количество хранимых состояний. Оптимизация: если dp[i] зависит только от dp[i-1], можно хранить O(1) вместо O(n).</div></div>
      </section>
    </div>
  )
}
