import { useState, useRef, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'

type BarState = 'default' | 'comparing' | 'swapping' | 'sorted' | 'pivot' | 'active'

interface Bar {
  value: number
  state: BarState
}

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10)
}

export default function AdvancedSorts() {
  const [bars, setBars] = useState<Bar[]>(() =>
    generateArray(24).map(v => ({ value: v, state: 'default' }))
  )
  const [sortType, setSortType] = useState<'merge' | 'quick'>('merge')
  const [isSorting, setIsSorting] = useState(false)
  const [speed, setSpeed] = useState(50)
  const cancelRef = useRef(false)

  const delay = useCallback(() => new Promise<void>(res => setTimeout(res, 120 - speed)), [speed])

  const reset = useCallback(() => {
    cancelRef.current = true
    setTimeout(() => {
      cancelRef.current = false
      setBars(generateArray(24).map(v => ({ value: v, state: 'default' })))
      setIsSorting(false)
    }, 100)
  }, [])

  const mergeSort = useCallback(async () => {
    const arr: Bar[] = bars.map(b => ({ ...b, state: 'default' as BarState }))
    setBars([...arr])

    async function merge(left: number, mid: number, right: number) {
      if (cancelRef.current) return
      const temp: Bar[] = []
      let i = left, j = mid + 1

      while (i <= mid && j <= right) {
        if (cancelRef.current) return
        arr[i].state = 'comparing'
        arr[j].state = 'comparing'
        setBars([...arr])
        await delay()

        if (arr[i].value <= arr[j].value) {
          temp.push({ ...arr[i], state: 'active' })
          arr[i].state = 'default'
          i++
        } else {
          temp.push({ ...arr[j], state: 'active' })
          arr[j].state = 'default'
          j++
        }
      }

      while (i <= mid) {
        temp.push({ ...arr[i], state: 'active' })
        i++
      }
      while (j <= right) {
        temp.push({ ...arr[j], state: 'active' })
        j++
      }

      for (let k = 0; k < temp.length; k++) {
        arr[left + k] = { ...temp[k], state: 'swapping' }
        setBars([...arr])
        await delay()
        arr[left + k].state = 'default'
      }
      setBars([...arr])
    }

    async function sort(left: number, right: number) {
      if (left >= right || cancelRef.current) return
      const mid = Math.floor((left + right) / 2)
      await sort(left, mid)
      await sort(mid + 1, right)
      await merge(left, mid, right)
    }

    await sort(0, arr.length - 1)
    arr.forEach(b => b.state = 'sorted')
    setBars([...arr])
  }, [bars, delay])

  const quickSort = useCallback(async () => {
    const arr: Bar[] = bars.map(b => ({ ...b, state: 'default' as BarState }))
    setBars([...arr])

    async function partition(low: number, high: number): Promise<number> {
      const pivot = arr[high]
      pivot.state = 'pivot'
      setBars([...arr])
      let i = low - 1

      for (let j = low; j < high; j++) {
        if (cancelRef.current) return low
        arr[j].state = 'comparing'
        setBars([...arr])
        await delay()

        if (arr[j].value < pivot.value) {
          i++
          if (i !== j) {
            arr[i].state = 'swapping'
            arr[j].state = 'swapping'
            setBars([...arr])
            await delay()
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
          }
        }
        if (arr[j].state !== 'pivot') arr[j].state = 'default'
        if (i >= low && arr[i].state !== 'pivot') arr[i].state = 'default'
      }

      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      arr[i + 1].state = 'sorted'
      for (let k = low; k <= high; k++) {
        if (arr[k].state !== 'sorted') arr[k].state = 'default'
      }
      setBars([...arr])
      return i + 1
    }

    async function sort(low: number, high: number) {
      if (low >= high || cancelRef.current) return
      const pi = await partition(low, high)
      await sort(low, pi - 1)
      await sort(pi + 1, high)
    }

    await sort(0, arr.length - 1)
    arr.forEach(b => b.state = 'sorted')
    setBars([...arr])
  }, [bars, delay])

  const startSort = () => {
    setIsSorting(true)
    cancelRef.current = false
    const fn = sortType === 'merge' ? mergeSort : quickSort
    fn().then(() => setIsSorting(false))
  }

  const maxVal = Math.max(...bars.map(b => b.value))

  return (
    <div className="page-container">
      <h1>⚡ Продвинутые сортировки</h1>
      <p className="page-description">
        Merge Sort и Quick Sort — O(n log n) сортировки. Основа реальных систем.
        Array.sort() в V8 использует TimSort (гибрид Merge + Insertion).
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Визуализация</span>
          <span className="card-badge">O(n log n)</span>
        </div>

        <div className="tabs">
          <button className={`tab ${sortType === 'merge' ? 'active' : ''}`}
            onClick={() => { if (!isSorting) { setSortType('merge'); reset() } }}>Merge Sort</button>
          <button className={`tab ${sortType === 'quick' ? 'active' : ''}`}
            onClick={() => { if (!isSorting) { setSortType('quick'); reset() } }}>Quick Sort</button>
        </div>

        <div className="viz-container" style={{ minHeight: '220px' }}>
          {bars.map((bar, i) => (
            <div
              key={i}
              className={`viz-bar ${bar.state}`}
              style={{
                height: `${(bar.value / maxVal) * 180}px`,
                width: `${Math.max(100 / bars.length - 1, 6)}%`,
              }}
            />
          ))}
        </div>

        <div className="controls" style={{ marginTop: '12px' }}>
          <button className="btn btn-primary" onClick={startSort} disabled={isSorting}>
            ▶ Сортировать
          </button>
          <button className="btn btn-secondary" onClick={reset} disabled={isSorting}>
            ↺ Новый массив
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Скорость:
            <input type="range" min="10" max="110" value={speed}
              onChange={e => setSpeed(Number(e.target.value))} />
          </label>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Merge Sort</span>
          <span className="complexity good">O(n log n)</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Разделяй и властвуй: делим массив пополам, сортируем каждую половину рекурсивно,
          потом сливаем. Стабильная, гарантированно O(n log n), но требует O(n) доп. памяти.
        </p>
        <CodeBlock language="typescript" title="merge-sort.ts" code={`
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Время: O(n log n) — всегда!
// Память: O(n) — нужен доп. массив
// Стабильная: Да
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Quick Sort</span>
          <span className="complexity good">O(n log n)</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Выбираем опорный элемент (pivot), перемещаем меньшие влево, большие вправо,
          рекурсивно сортируем части. In-place, но НЕ стабильная. Деградирует до O(n²)
          при плохом выборе pivot.
        </p>
        <CodeBlock language="typescript" title="quick-sort.ts" code={`
function quickSort(
  arr: number[],
  low = 0,
  high = arr.length - 1
): number[] {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(
  arr: number[],
  low: number,
  high: number
): number {
  const pivot = arr[high]; // Последний элемент как pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Время: O(n log n) среднее, O(n²) худшее
// Память: O(log n) — стек рекурсии
// Стабильная: Нет
// Оптимизация: случайный pivot, median-of-three
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🧠 Merge Sort vs Quick Sort</span>
        </div>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Критерий</th>
              <th style={{ padding: '10px' }}>Merge Sort</th>
              <th style={{ padding: '10px' }}>Quick Sort</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Средний', 'O(n log n)', 'O(n log n)'],
              ['Худший', 'O(n log n)', 'O(n²)'],
              ['Память', 'O(n)', 'O(log n)'],
              ['Стабильность', 'Да ✅', 'Нет ❌'],
              ['In-place', 'Нет ❌', 'Да ✅'],
              ['Cache-friendly', 'Нет', 'Да'],
              ['На практике', 'Linked Lists', 'Массивы'],
            ].map(([criterion, merge, quick]) => (
              <tr key={criterion} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontWeight: 600 }}>{criterion}</td>
                <td style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)' }}>{merge}</td>
                <td style={{ padding: '10px', textAlign: 'center', color: 'var(--text-secondary)' }}>{quick}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
