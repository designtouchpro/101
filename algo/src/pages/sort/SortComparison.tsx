import CodeBlock from '../../components/CodeBlock'

const SORTS = [
  {
    name: 'Bubble Sort',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    memory: 'O(1)',
    stable: true,
    desc: 'Сравниваем соседние, меняем местами. Оптимизация — флаг swapped.',
  },
  {
    name: 'Selection Sort',
    best: 'O(n²)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    memory: 'O(1)',
    stable: false,
    desc: 'Ищем минимум, ставим в начало. Минимум обменов, но всегда O(n²).',
  },
  {
    name: 'Insertion Sort',
    best: 'O(n)',
    avg: 'O(n²)',
    worst: 'O(n²)',
    memory: 'O(1)',
    stable: true,
    desc: 'Вставляем элемент в нужное место. Лучший для малых и почти отсортированных.',
  },
  {
    name: 'Merge Sort',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    memory: 'O(n)',
    stable: true,
    desc: 'Разделяй и властвуй. Гарантированно O(n log n). Доп. память O(n).',
  },
  {
    name: 'Quick Sort',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n²)',
    memory: 'O(log n)',
    stable: false,
    desc: 'Partition по pivot. Быстрее на практике. Деградирует при плохом pivot.',
  },
  {
    name: 'Heap Sort',
    best: 'O(n log n)',
    avg: 'O(n log n)',
    worst: 'O(n log n)',
    memory: 'O(1)',
    stable: false,
    desc: 'Строим max-heap, извлекаем максимум. In-place, но не cache-friendly.',
  },
  {
    name: 'Counting Sort',
    best: 'O(n + k)',
    avg: 'O(n + k)',
    worst: 'O(n + k)',
    memory: 'O(k)',
    stable: true,
    desc: 'Считаем количество каждого элемента. Только для целых, ограниченный диапазон.',
  },
  {
    name: 'Radix Sort',
    best: 'O(nk)',
    avg: 'O(nk)',
    worst: 'O(nk)',
    memory: 'O(n + k)',
    stable: true,
    desc: 'Сортируем по разрядам (от младшего к старшему). Не сравнительная.',
  },
]

function getComplexityClass(val: string): string {
  if (val.includes('n²')) return 'bad'
  if (val.includes('n log n') || val.includes('n + k') || val.includes('nk')) return 'ok'
  if (val === 'O(n)' || val === 'O(1)' || val === 'O(log n)') return 'good'
  return 'ok'
}

export default function SortComparison() {
  return (
    <div className="page-container">
      <h1>📋 Сравнение сортировок</h1>
      <p className="page-description">
        Полная таблица сравнения всех основных сортировок.
        Знание сложностей — must have для собеседования.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📊 Сводная таблица</span>
          <span className="card-badge">Шпаргалка</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '700px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Алгоритм</th>
                <th style={{ padding: '12px' }}>Лучший</th>
                <th style={{ padding: '12px' }}>Средний</th>
                <th style={{ padding: '12px' }}>Худший</th>
                <th style={{ padding: '12px' }}>Память</th>
                <th style={{ padding: '12px' }}>Стабильность</th>
              </tr>
            </thead>
            <tbody>
              {SORTS.map(sort => (
                <tr key={sort.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {sort.name}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`complexity ${getComplexityClass(sort.best)}`}>{sort.best}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`complexity ${getComplexityClass(sort.avg)}`}>{sort.avg}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`complexity ${getComplexityClass(sort.worst)}`}>{sort.worst}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span className={`complexity ${getComplexityClass(sort.memory)}`}>{sort.memory}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {sort.stable ? '✅ Да' : '❌ Нет'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">🤔 Когда что использовать?</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { q: 'Маленький массив (< 50)', a: 'Insertion Sort — меньше overhead' },
              { q: 'Почти отсортирован', a: 'Insertion Sort — O(n) в лучшем случае' },
              { q: 'Нужна стабильность', a: 'Merge Sort — гарантированно O(n log n)' },
              { q: 'Ограниченная память', a: 'Quick Sort или Heap Sort — in-place' },
              { q: 'Связный список', a: 'Merge Sort — не нужен random access' },
              { q: 'Целые числа, малый диапазон', a: 'Counting/Radix Sort — O(n)' },
              { q: 'Общий случай', a: 'Quick Sort (случайный pivot) или TimSort' },
            ].map(({ q, a }, i) => (
              <div key={i} style={{
                padding: '10px 14px',
                background: 'var(--bg-code)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--accent-algo)'
              }}>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.85rem' }}>{q}</div>
                <div style={{ color: 'var(--accent-algo)', fontSize: '0.8rem', marginTop: '4px' }}>→ {a}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🧩 Стабильность сортировки</span>
          </div>
          <div className="info-box info" style={{ marginBottom: '16px' }}>
            <strong>Стабильная сортировка</strong> сохраняет относительный порядок
            равных элементов. Важно при сортировке по нескольким критериям.
          </div>
          <CodeBlock language="typescript" title="stability-example.ts" code={`
// Пример: сортируем студентов по оценке
const students = [
  { name: 'Алиса', grade: 'A' },
  { name: 'Боб',   grade: 'B' },
  { name: 'Олег',  grade: 'A' },
];

// Стабильная сортировка:
// Алиса (A), Олег (A), Боб (B)
// ✅ Алиса перед Олегом (как в оригинале)

// Нестабильная сортировка:
// Олег (A), Алиса (A), Боб (B)
// ❌ Порядок среди A может измениться
`} />

          <div className="info-box info" style={{ marginTop: '16px' }}>
            <strong>Array.sort() в JavaScript:</strong><br/>
            V8 (Chrome, Node.js) использует <strong>TimSort</strong> —
            гибрид Merge Sort + Insertion Sort. Стабильный, O(n log n).
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Counting Sort & Heap Sort</span>
        </div>

        <CodeBlock language="typescript" title="counting-sort.ts" code={`
// Counting Sort — O(n + k), только для целых чисел
function countingSort(arr: number[]): number[] {
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Считаем количество каждого элемента
  for (const num of arr) {
    count[num - min]++;
  }

  // Кумулятивные суммы (для стабильности)
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }

  // Строим результат (с конца для стабильности)
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}
`} />

        <CodeBlock language="typescript" title="heap-sort.ts" code={`
// Heap Sort — O(n log n), in-place, не стабильная
function heapSort(arr: number[]): number[] {
  const n = arr.length;

  // Строим max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Извлекаем макс элемент
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Макс в конец
    heapify(arr, i, 0);
  }

  return arr;
}

function heapify(arr: number[], n: number, i: number): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
`} />
      </div>
    </div>
  )
}
