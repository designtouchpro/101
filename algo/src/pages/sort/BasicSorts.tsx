import { useState, useRef, useCallback, useEffect } from 'react'
import CodeBlock from '../../components/CodeBlock'

type SortType = 'bubble' | 'selection' | 'insertion'

type BarState = 'default' | 'comparing' | 'swapping' | 'sorted'

interface Bar {
  value: number
  state: BarState
}

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 10)
}

export default function BasicSorts() {
  const [bars, setBars] = useState<Bar[]>(() =>
    generateArray(20).map(v => ({ value: v, state: 'default' }))
  )
  const [sortType, setSortType] = useState<SortType>('bubble')
  const [isSorting, setIsSorting] = useState(false)
  const [speed, setSpeed] = useState(50)
  const cancelRef = useRef(false)

  const reset = useCallback(() => {
    cancelRef.current = true
    setTimeout(() => {
      cancelRef.current = false
      setBars(generateArray(20).map(v => ({ value: v, state: 'default' })))
      setIsSorting(false)
    }, 100)
  }, [])

  const delay = useCallback(() => new Promise<void>(res => setTimeout(res, 150 - speed)), [speed])

  const bubbleSort = useCallback(async () => {
    const arr: Bar[] = bars.map(b => ({ ...b, state: 'default' as BarState }))
    setBars([...arr])

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (cancelRef.current) return
        arr[j].state = 'comparing'
        arr[j + 1].state = 'comparing'
        setBars([...arr])
        await delay()

        if (arr[j].value > arr[j + 1].value) {
          arr[j].state = 'swapping'
          arr[j + 1].state = 'swapping'
          setBars([...arr])
          await delay()
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        }
        arr[j].state = 'default'
        arr[j + 1].state = 'default'
      }
      arr[arr.length - 1 - i].state = 'sorted'
      setBars([...arr])
    }
    arr.forEach(b => b.state = 'sorted')
    setBars([...arr])
  }, [bars, delay])

  const selectionSort = useCallback(async () => {
    const arr: Bar[] = bars.map(b => ({ ...b, state: 'default' as BarState }))
    setBars([...arr])

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i
      arr[i].state = 'comparing'
      setBars([...arr])

      for (let j = i + 1; j < arr.length; j++) {
        if (cancelRef.current) return
        arr[j].state = 'comparing'
        setBars([...arr])
        await delay()

        if (arr[j].value < arr[minIdx].value) {
          if (minIdx !== i) arr[minIdx].state = 'default'
          minIdx = j
          arr[minIdx].state = 'swapping'
        } else {
          arr[j].state = 'default'
        }
        setBars([...arr])
      }

      if (minIdx !== i) {
        arr[i].state = 'swapping'
        arr[minIdx].state = 'swapping'
        setBars([...arr])
        await delay()
        ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      }

      arr[i].state = 'sorted'
      for (let k = i + 1; k < arr.length; k++) {
        if (arr[k].state !== 'sorted') arr[k].state = 'default'
      }
      setBars([...arr])
    }
    arr.forEach(b => b.state = 'sorted')
    setBars([...arr])
  }, [bars, delay])

  const insertionSort = useCallback(async () => {
    const arr: Bar[] = bars.map(b => ({ ...b, state: 'default' as BarState }))
    arr[0].state = 'sorted'
    setBars([...arr])

    for (let i = 1; i < arr.length; i++) {
      if (cancelRef.current) return
      const key = arr[i]
      key.state = 'comparing'
      setBars([...arr])
      await delay()

      let j = i - 1
      while (j >= 0 && arr[j].value > key.value) {
        if (cancelRef.current) return
        arr[j].state = 'swapping'
        setBars([...arr])
        await delay()
        arr[j + 1] = arr[j]
        arr[j].state = 'sorted'
        j--
      }
      arr[j + 1] = key
      key.state = 'sorted'
      setBars([...arr])
      await delay()
    }
    arr.forEach(b => b.state = 'sorted')
    setBars([...arr])
  }, [bars, delay])

  const startSort = () => {
    setIsSorting(true)
    cancelRef.current = false
    const fn = { bubble: bubbleSort, selection: selectionSort, insertion: insertionSort }[sortType]
    fn().then(() => setIsSorting(false))
  }

  const maxVal = Math.max(...bars.map(b => b.value))

  useEffect(() => {
    cancelRef.current = true
    setTimeout(() => {
      cancelRef.current = false
      setBars(generateArray(20).map(v => ({ value: v, state: 'default' })))
      setIsSorting(false)
    }, 100)
  }, [sortType])

  return (
    <div className="page-container">
      <h1>📊 Базовые сортировки</h1>
      <p className="page-description">
        Bubble Sort, Selection Sort, Insertion Sort — O(n²) сортировки.
        Простые для понимания, но медленные для больших массивов.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Визуализация сортировки</span>
          <span className="card-badge">Анимация</span>
        </div>

        <div className="tabs">
          <button className={`tab ${sortType === 'bubble' ? 'active' : ''}`}
            onClick={() => !isSorting && setSortType('bubble')}>Bubble Sort</button>
          <button className={`tab ${sortType === 'selection' ? 'active' : ''}`}
            onClick={() => !isSorting && setSortType('selection')}>Selection Sort</button>
          <button className={`tab ${sortType === 'insertion' ? 'active' : ''}`}
            onClick={() => !isSorting && setSortType('insertion')}>Insertion Sort</button>
        </div>

        <div className="viz-container" style={{ minHeight: '220px' }}>
          {bars.map((bar, i) => (
            <div
              key={i}
              className={`viz-bar ${bar.state}`}
              style={{
                height: `${(bar.value / maxVal) * 180}px`,
                width: `${Math.max(100 / bars.length - 1, 8)}%`,
              }}
            />
          ))}
        </div>

        <div className="controls" style={{ marginTop: '16px' }}>
          <button className="btn btn-primary" onClick={startSort} disabled={isSorting}>
            ▶ Сортировать
          </button>
          <button className="btn btn-secondary" onClick={reset} disabled={isSorting}>
            ↺ Новый массив
          </button>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            Скорость:
            <input type="range" min="10" max="140" value={speed}
              onChange={e => setSpeed(Number(e.target.value))} />
          </label>
        </div>

        <div style={{
          display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '12px',
          fontSize: '0.8rem', color: 'var(--text-muted)', flexWrap: 'wrap'
        }}>
          <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: 'var(--accent-algo)', verticalAlign: 'middle', marginRight: 4 }}></span> Сравнение</span>
          <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: 'var(--accent-orange)', verticalAlign: 'middle', marginRight: 4 }}></span> Обмен</span>
          <span><span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: 3, background: 'var(--accent-green)', verticalAlign: 'middle', marginRight: 4 }}></span> Отсортировано</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Bubble Sort</span>
          <span className="complexity bad">O(n²)</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Сравниваем соседние элементы и меняем местами. Как пузырьки всплывают вверх.
          Стабильная сортировка.
        </p>
        <CodeBlock language="typescript" title="bubble-sort.ts" code={`
function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    let swapped = false; // Оптимизация!
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // Если не было обменов — массив уже отсортирован
    if (!swapped) break;
  }
  
  return arr;
}
// Лучший: O(n), Средний: O(n²), Худший: O(n²)
// Память: O(1), Стабильная: Да
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Selection Sort</span>
          <span className="complexity bad">O(n²)</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Ищем минимум в оставшейся части и ставим в начало. Всегда O(n²) сравнений,
          но минимум обменов. НЕ стабильная.
        </p>
        <CodeBlock language="typescript" title="selection-sort.ts" code={`
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  
  return arr;
}
// Лучший: O(n²), Средний: O(n²), Худший: O(n²)
// Память: O(1), Стабильная: Нет
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Insertion Sort</span>
          <span className="complexity bad">O(n²)</span>
        </div>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Берём элемент и вставляем в правильную позицию в уже отсортированной части.
          Как сортировка карт в руке. Лучший для почти отсортированных данных!
        </p>
        <CodeBlock language="typescript" title="insertion-sort.ts" code={`
function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    // Сдвигаем элементы больше key вправо
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}
// Лучший: O(n), Средний: O(n²), Худший: O(n²)
// Память: O(1), Стабильная: Да
// Отлично для маленьких массивов и почти отсортированных данных
`} />
      </div>
    </div>
  )
}
