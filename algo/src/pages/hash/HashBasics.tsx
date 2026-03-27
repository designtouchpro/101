import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface HashEntry {
  key: string
  value: number
  hash: number
}

function simpleHash(key: string, size: number): number {
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % size
  }
  return hash
}

export default function HashBasics() {
  const TABLE_SIZE = 8
  const [entries, setEntries] = useState<HashEntry[]>([
    { key: 'name', value: 1, hash: simpleHash('name', TABLE_SIZE) },
    { key: 'age', value: 2, hash: simpleHash('age', TABLE_SIZE) },
    { key: 'city', value: 3, hash: simpleHash('city', TABLE_SIZE) },
  ])
  const [inputKey, setInputKey] = useState('')
  const [highlightHash, setHighlightHash] = useState<number | null>(null)

  const addEntry = () => {
    if (!inputKey.trim()) return
    const hash = simpleHash(inputKey, TABLE_SIZE)
    const existing = entries.find(e => e.key === inputKey)
    if (existing) return
    setEntries(prev => [...prev, { key: inputKey, value: prev.length + 1, hash }])
    setHighlightHash(hash)
    setInputKey('')
    setTimeout(() => setHighlightHash(null), 1500)
  }

  const buckets: HashEntry[][] = Array.from({ length: TABLE_SIZE }, () => [])
  entries.forEach(e => buckets[e.hash].push(e))

  return (
    <div className="page-container">
      <h1>#️⃣ Хеш-таблицы</h1>
      <p className="page-description">
        Хеш-таблица (HashMap, Object, Map) — структура для хранения пар ключ-значение
        с доступом O(1) в среднем. Основа множества алгоритмов.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎮 Визуализация хеш-таблицы</span>
          <span className="card-badge">Chaining</span>
        </div>

        <div className="controls">
          <input
            className="input"
            type="text"
            value={inputKey}
            onChange={e => setInputKey(e.target.value)}
            placeholder="Ключ..."
            onKeyDown={e => e.key === 'Enter' && addEntry()}
          />
          <button className="btn btn-primary" onClick={addEntry}>Добавить</button>
          <button className="btn btn-secondary" onClick={() => {
            setEntries([])
            setHighlightHash(null)
          }}>Очистить</button>
          {inputKey && (
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              hash("{inputKey}") = {simpleHash(inputKey, TABLE_SIZE)}
            </span>
          )}
        </div>

        <div className="hash-table">
          {buckets.map((bucket, idx) => (
            <div
              key={idx}
              className={`hash-bucket${highlightHash === idx ? ' highlight' : ''}`}
              style={highlightHash === idx ? { borderColor: 'var(--accent-green)', background: 'rgba(34,197,94,0.08)' } : {}}
            >
              <div className="hash-index">[{idx}]</div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: 1 }}>
                {bucket.length === 0 ? (
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>empty</span>
                ) : (
                  bucket.map((entry, i) => (
                    <div
                      key={entry.key}
                      className={`hash-entry${i > 0 ? ' collision' : ''}`}
                    >
                      {entry.key}: {entry.value}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {entries.some((e, i) => entries.findIndex(e2 => e2.hash === e.hash) !== i) && (
          <div className="info-box warning" style={{ marginTop: '12px' }}>
            <strong>Коллизия!</strong> Несколько ключей попали в один бакет.
            Здесь используется chaining (цепочки). Другой подход — open addressing.
          </div>
        )}
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <span className="card-title">📊 Сложность операций</span>
          </div>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Операция</th>
                <th style={{ padding: '10px' }}>Среднее</th>
                <th style={{ padding: '10px' }}>Худшее</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Вставка', 'O(1)', 'O(n)'],
                ['Поиск', 'O(1)', 'O(n)'],
                ['Удаление', 'O(1)', 'O(n)'],
              ].map(([op, avg, worst]) => (
                <tr key={op} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px' }}>{op}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className="complexity good">{avg}</span>
                  </td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <span className="complexity bad">{worst}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="info-box info" style={{ marginTop: '12px' }}>
            Худший O(n) — когда все ключи попадают в один бакет (плохая хеш-функция).
            Хорошая хеш-функция → мало коллизий → O(1).
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-title">🔑 Map vs Object в JS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Object', items: ['Ключи только string/Symbol', 'Есть прототип (нежелательные ключи)', 'Нет .size', 'JSON-сериализуемый'] },
              { title: 'Map', items: ['Любой тип ключей', 'Гарантированный порядок', 'Есть .size', 'Лучше для динамических ключей'] },
              { title: 'Set', items: ['Только уникальные значения', 'has() за O(1)', 'Полезен для дедупликации', 'Итерируемый'] },
            ].map(({ title, items }) => (
              <div key={title} style={{ padding: '10px', background: 'var(--bg-code)', borderRadius: '8px' }}>
                <strong style={{ color: 'var(--accent-algo)', fontSize: '0.85rem' }}>{title}</strong>
                <ul className="info-list">
                  {items.map(item => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">💻 Реализация хеш-таблицы</span>
        </div>
        <CodeBlock language="typescript" title="hash-table.ts" code={`
class HashTable<V> {
  private buckets: Array<Array<[string, V]>>;
  private _size = 0;
  private capacity: number;

  constructor(capacity = 16) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  // Простая хеш-функция
  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  set(key: string, value: V): void {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];

    // Обновляем если ключ уже есть
    const existing = bucket.find(([k]) => k === key);
    if (existing) {
      existing[1] = value;
      return;
    }

    bucket.push([key, value]);
    this._size++;

    // Ресайз при load factor > 0.75
    if (this._size / this.capacity > 0.75) {
      this.resize();
    }
  }

  get(key: string): V | undefined {
    const idx = this.hash(key);
    const entry = this.buckets[idx].find(([k]) => k === key);
    return entry?.[1];
  }

  delete(key: string): boolean {
    const idx = this.hash(key);
    const bucket = this.buckets[idx];
    const i = bucket.findIndex(([k]) => k === key);
    if (i === -1) return false;
    bucket.splice(i, 1);
    this._size--;
    return true;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this._size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  get size(): number { return this._size; }
}
`} />
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🔧 Разрешение коллизий</span>
        </div>
        <div className="grid-2">
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
            <strong style={{ color: 'var(--accent-algo)' }}>Chaining (цепочки)</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '8px 0' }}>
              Каждый бакет — связный список. При коллизии добавляем в список.
            </p>
            <ul className="info-list">
              <li>Простая реализация</li>
              <li>Нет деградации при высоком load factor</li>
              <li>Дополнительная память на указатели</li>
            </ul>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-code)', borderRadius: '10px' }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Open Addressing</strong>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '8px 0' }}>
              При коллизии ищем свободный слот (linear/quadratic probing, double hashing).
            </p>
            <ul className="info-list">
              <li>Лучше cache-friendly</li>
              <li>Нет дополнительных аллокаций</li>
              <li>Деградация при load factor {'>'} 0.7</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
