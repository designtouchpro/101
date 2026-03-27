import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function BinarySearch() {
  const [arr] = useState([1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25])
  const [target, setTarget] = useState('11')
  const [steps, setSteps] = useState<{ left: number; right: number; mid: number; found: boolean }[]>([])
  const [result, setResult] = useState<string | null>(null)

  const runSearch = () => {
    const t = Number(target)
    const newSteps: typeof steps = []
    let left = 0, right = arr.length - 1

    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      const found = arr[mid] === t
      newSteps.push({ left, right, mid, found })

      if (found) break
      if (arr[mid] < t) left = mid + 1
      else right = mid - 1
    }

    setSteps(newSteps)
    const lastStep = newSteps[newSteps.length - 1]
    setResult(lastStep?.found
      ? `✅ Найдено: arr[${lastStep.mid}] = ${t} за ${newSteps.length} шагов`
      : `❌ Не найдено за ${newSteps.length} шагов`
    )
  }

  const lastStep = steps[steps.length - 1]

  return (
    <div className="page-container">
      <h1>🔍 Бинарный поиск</h1>
      <p className="page-description">
        O(log n) — поиск в отсортированном массиве. Делим пространство поиска пополам на каждом шаге.
        Одна из самых важных алгоритмических техник.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Визуализация</span>
          <span className="card-badge">O(log n)</span>
        </div>

        <div className="controls">
          <input
            className="input"
            type="number"
            value={target}
            onChange={e => setTarget(e.target.value)}
            placeholder="Искать..."
            style={{ width: '100px' }}
            onKeyDown={e => e.key === 'Enter' && runSearch()}
          />
          <button className="btn btn-primary" onClick={runSearch}>Найти</button>
        </div>

        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '12px',
        }}>
          {arr.map((val, i) => {
            let bg = 'var(--bg-code)'
            let color = 'var(--text-secondary)'
            let border = '2px solid transparent'

            if (lastStep) {
              if (lastStep.found && i === lastStep.mid) {
                bg = 'var(--accent-green)'
                color = 'white'
              } else if (i === lastStep.mid) {
                bg = 'var(--accent-algo)'
                color = 'white'
              } else if (i >= lastStep.left && i <= lastStep.right) {
                border = '2px solid var(--accent-algo)'
              } else {
                bg = 'var(--bg-code)'
                color = 'var(--text-muted)'
              }
            }

            return (
              <div key={i} style={{
                padding: '10px 14px',
                borderRadius: '8px',
                background: bg,
                color,
                border,
                fontFamily: 'monospace',
                fontWeight: 600,
                fontSize: '0.85rem',
                textAlign: 'center',
                minWidth: '40px',
                transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: '0.65rem', opacity: 0.6 }}>{i}</div>
                {val}
              </div>
            )
          })}
        </div>

        {result && (
          <div style={{
            textAlign: 'center', padding: '12px', marginTop: '12px',
            color: result.startsWith('✅') ? 'var(--accent-green)' : 'var(--accent-red)',
            fontWeight: 600,
          }}>
            {result}
          </div>
        )}

        {steps.length > 0 && (
          <div style={{ marginTop: '16px' }}>
            <strong style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>Шаги поиска:</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
              {steps.map((s, i) => (
                <div key={i} style={{
                  padding: '8px 12px',
                  background: 'var(--bg-code)',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                  color: s.found ? 'var(--accent-green)' : 'var(--text-secondary)',
                }}>
                  Шаг {i + 1}: left={s.left}, right={s.right}, mid={s.mid}, arr[{s.mid}]={arr[s.mid]}
                  {s.found ? ' ✅ FOUND!' : Number(target) > arr[s.mid] ? ' → ищем ПРАВЕЕ' : ' → ищем ЛЕВЕЕ'}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Классический бинарный поиск</span>
        </div>
        <CodeBlock language="typescript" title="binary-search.ts" code={`
// Классический — ищем точное значение
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2); // Избегаем overflow
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1; // Не найдено
}
// Время: O(log n), Память: O(1)
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Вариации бинарного поиска</span>
          <span className="card-badge">Собес</span>
        </div>

        <CodeBlock language="typescript" title="binary-search-variations.ts" code={`
// Левая граница (first occurrence / lower bound)
// Полезно: "Сколько элементов < target?"
function leftBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length; // НЕ arr.length - 1!

  while (left < right) { // НЕ left <= right!
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid; // НЕ mid - 1!
    }
  }

  return left; // Индекс первого >= target
}

// Правая граница (last occurrence / upper bound)
function rightBound(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    if (arr[mid] <= target) { // <= вместо <
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  return left - 1; // Индекс последнего <= target
}

// Поиск по ответу — мощная техника!
// "Найти минимальное X, при котором условие выполняется"
function searchByAnswer(
  low: number,
  high: number,
  check: (mid: number) => boolean
): number {
  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);
    if (check(mid)) {
      high = mid; // Ответ mid или меньше
    } else {
      low = mid + 1;
    }
  }
  return low;
}
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🧩 Задачи с бинарным поиском</span>
        </div>

        <div className="interview-question">
          <strong>Search in Rotated Sorted Array (LeetCode #33)</strong>
        </div>
        <CodeBlock language="typescript" title="rotated-array.ts" code={`
// [4,5,6,7,0,1,2], target = 0 → index 4
function searchRotated(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (nums[mid] === target) return mid;

    // Определяем, какая половина отсортирована
    if (nums[left] <= nums[mid]) {
      // Левая половина отсортирована
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Правая половина отсортирована
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
}
`} />

        <div className="interview-question" style={{ marginTop: '16px' }}>
          <strong>Koko Eating Bananas — Поиск по ответу (LeetCode #875)</strong>
        </div>
        <CodeBlock language="typescript" title="koko-bananas.ts" code={`
// Минимальная скорость поедания бананов, чтобы успеть за h часов
function minEatingSpeed(piles: number[], h: number): number {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    
    // Сколько часов нужно при скорости mid?
    const hours = piles.reduce(
      (sum, pile) => sum + Math.ceil(pile / mid), 0
    );

    if (hours <= h) {
      right = mid; // Можно медленнее
    } else {
      left = mid + 1; // Нужно быстрее
    }
  }

  return left;
}
// Паттерн: "Найти минимальное значение, при котором условие true"
// → Binary Search по ответу!
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎯 Шаблон бинарного поиска</span>
        </div>
        <div className="info-box info">
          <strong>Три вопроса для бинарного поиска:</strong>
          <ol className="info-list">
            <li><strong>Что ищем?</strong> — пространство поиска (массив, диапазон ответов)</li>
            <li><strong>Как проверяем?</strong> — условие для mid (check function)</li>
            <li><strong>Куда двигаемся?</strong> — left = mid+1 или right = mid (или mid-1)</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
