import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function CollectionsDemo() {
  // Set Demo
  const [setItems, setSetItems] = useState<string[]>(['apple', 'banana'])
  const [setInput, setSetInput] = useState('')

  // Map Demo
  const [mapItems, setMapItems] = useState<[string, string][]>([['name', 'John'], ['age', '30']])
  const [mapKey, setMapKey] = useState('')
  const [mapValue, setMapValue] = useState('')

  const addToSet = () => {
    if (setInput && !setItems.includes(setInput)) {
      setSetItems([...setItems, setInput])
    }
    setSetInput('')
  }

  const addToMap = () => {
    if (mapKey) {
      const existing = mapItems.findIndex(([k]) => k === mapKey)
      if (existing >= 0) {
        const newItems = [...mapItems]
        newItems[existing] = [mapKey, mapValue]
        setMapItems(newItems)
      } else {
        setMapItems([...mapItems, [mapKey, mapValue]])
      }
      setMapKey('')
      setMapValue('')
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🗃️ Set, Map, WeakSet, WeakMap</h1>
        <p>
          ES6 коллекции для хранения уникальных значений и пар ключ-значение. 
          Важная тема для собеседований!
        </p>
      </div>

      {/* SET */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📦 Set — уникальные значения</span>
          <span className="card-badge">Часто на собесе!</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4>🎮 Интерактивный Set</h4>
            <div className="controls" style={{ marginTop: '12px' }}>
              <input
                className="input"
                value={setInput}
                onChange={(e) => setSetInput(e.target.value)}
                placeholder="Добавить значение..."
                onKeyDown={(e) => e.key === 'Enter' && addToSet()}
              />
              <button className="btn btn-primary" onClick={addToSet}>Add</button>
              <button className="btn btn-danger" onClick={() => setSetItems([])}>Clear</button>
            </div>
            
            <div style={{ 
              marginTop: '16px', 
              padding: '16px', 
              background: 'var(--bg-code)', 
              borderRadius: '8px',
              minHeight: '100px'
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
                Set({setItems.length}) {'{'}
              </div>
              {setItems.map((item, i) => (
                <div key={i} style={{ 
                  display: 'inline-block',
                  padding: '4px 12px',
                  margin: '4px',
                  background: 'var(--accent-purple)',
                  borderRadius: '4px',
                  color: 'white',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
                onClick={() => setSetItems(setItems.filter((_, idx) => idx !== i))}
                title="Клик для удаления"
                >
                  "{item}"
                </div>
              ))}
              <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', fontSize: '0.85rem' }}>
              💡 Попробуйте добавить дубликат — Set его проигнорирует!
            </p>
          </div>
          
          <div>
            <h4>📝 Основные методы</h4>
            <CodeBlock code={`const set = new Set([1, 2, 3]);

set.add(4);        // Set(4) {1, 2, 3, 4}
set.add(2);        // Дубликат игнорируется
set.has(2);        // true
set.delete(2);     // true
set.size;          // 3
set.clear();       // Set(0) {}

// Итерация
for (const item of set) {
  console.log(item);
}

// В массив
[...set]
Array.from(set)`} />
          </div>
        </div>

        <h4 style={{ marginTop: '24px' }}>🎯 Практические задачи с Set</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px' }}>
          <div className="info-box">
            <strong>Убрать дубликаты из массива</strong>
            <CodeBlock code={`const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
// [1, 2, 3]`} />
          </div>
          <div className="info-box">
            <strong>Пересечение массивов</strong>
            <CodeBlock code={`const a = [1, 2, 3];
const b = [2, 3, 4];
const intersection = a.filter(x => 
  new Set(b).has(x)
);
// [2, 3]`} />
          </div>
          <div className="info-box">
            <strong>Разность массивов</strong>
            <CodeBlock code={`const a = [1, 2, 3];
const b = [2, 3, 4];
const diff = a.filter(x => 
  !new Set(b).has(x)
);
// [1]`} />
          </div>
          <div className="info-box">
            <strong>Уникальные символы строки</strong>
            <CodeBlock code={`const str = 'hello';
const unique = [...new Set(str)];
// ['h', 'e', 'l', 'o']`} />
          </div>
        </div>
      </div>

      {/* MAP */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🗺️ Map — ключ-значение</span>
          <span className="card-badge">Часто на собесе!</span>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4>🎮 Интерактивный Map</h4>
            <div className="controls" style={{ marginTop: '12px' }}>
              <input
                className="input"
                value={mapKey}
                onChange={(e) => setMapKey(e.target.value)}
                placeholder="Ключ"
                style={{ width: '100px' }}
              />
              <input
                className="input"
                value={mapValue}
                onChange={(e) => setMapValue(e.target.value)}
                placeholder="Значение"
                style={{ width: '100px' }}
              />
              <button className="btn btn-primary" onClick={addToMap}>Set</button>
              <button className="btn btn-danger" onClick={() => setMapItems([])}>Clear</button>
            </div>
            
            <div style={{ 
              marginTop: '16px', 
              padding: '16px', 
              background: 'var(--bg-code)', 
              borderRadius: '8px',
              minHeight: '100px'
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
                Map({mapItems.length}) {'{'}
              </div>
              {mapItems.map(([key, value], i) => (
                <div key={i} style={{ 
                  padding: '8px 12px',
                  margin: '4px 0',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '4px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span>
                    <span style={{ color: 'var(--accent-cyan)' }}>"{key}"</span>
                    <span style={{ color: 'var(--text-muted)' }}> → </span>
                    <span style={{ color: 'var(--accent-green)' }}>"{value}"</span>
                  </span>
                  <button 
                    onClick={() => setMapItems(mapItems.filter((_, idx) => idx !== i))}
                    style={{ 
                      background: 'transparent', 
                      border: 'none', 
                      color: 'var(--accent-red)',
                      cursor: 'pointer'
                    }}
                  >✕</button>
                </div>
              ))}
              <div style={{ color: 'var(--text-muted)' }}>{'}'}</div>
            </div>
          </div>
          
          <div>
            <h4>📝 Основные методы</h4>
            <CodeBlock code={`const map = new Map();

map.set('name', 'John');
map.set('age', 30);
map.get('name');    // 'John'
map.has('name');    // true
map.delete('age');  // true
map.size;           // 1
map.clear();

// Объект как ключ!
const user = { id: 1 };
map.set(user, 'data');
map.get(user);      // 'data'

// Итерация
for (const [key, value] of map) {
  console.log(key, value);
}

map.keys();   // итератор ключей
map.values(); // итератор значений
map.entries();`} />
          </div>
        </div>

        <h4 style={{ marginTop: '24px' }}>🆚 Map vs Object</h4>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}></th>
                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-green)' }}>Map</th>
                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-orange)' }}>Object</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Типы ключей</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Любые (объекты, функции)</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Только string/Symbol</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Порядок ключей</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Гарантирован</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Не гарантирован*</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Размер</td>
                <td style={{ padding: '12px', textAlign: 'center' }}><code>map.size</code></td>
                <td style={{ padding: '12px', textAlign: 'center' }}><code>Object.keys(obj).length</code></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Итерация</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Напрямую iterable</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Нужен Object.keys/entries</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Производительность</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Лучше для частых add/delete</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Лучше для статических данных</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* WeakSet & WeakMap */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">💨 WeakSet и WeakMap</span>
          <span className="card-badge">Продвинутый уровень</span>
        </div>
        
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>Главное отличие:</strong> "Слабые" ссылки не препятствуют сборке мусора!
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
          <div>
            <h4 style={{ color: 'var(--accent-purple)' }}>WeakSet</h4>
            <CodeBlock code={`const ws = new WeakSet();

let obj = { name: 'John' };
ws.add(obj);
ws.has(obj);  // true

obj = null;   // Объект удалится из WeakSet!
// (после garbage collection)

// ⚠️ Ограничения:
// - Только объекты (не примитивы)
// - Нет итерации (for...of)
// - Нет .size, .clear()
// - Нельзя получить все элементы`} />
            
            <div className="info-box" style={{ marginTop: '12px' }}>
              <strong>Когда использовать:</strong>
              <ul className="info-list">
                <li>Отслеживание "посещённых" объектов</li>
                <li>Пометка объектов без утечек памяти</li>
                <li>Циклические ссылки</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 style={{ color: 'var(--accent-green)' }}>WeakMap</h4>
            <CodeBlock code={`const wm = new WeakMap();

let user = { id: 1 };
wm.set(user, 'private data');
wm.get(user);  // 'private data'

user = null;   // Запись удалится!
// (после garbage collection)

// ⚠️ Ограничения:
// - Ключи только объекты
// - Нет итерации
// - Нет .size, .clear()
// - Нельзя получить все ключи`} />
            
            <div className="info-box" style={{ marginTop: '12px' }}>
              <strong>Когда использовать:</strong>
              <ul className="info-list">
                <li>Приватные данные объектов</li>
                <li>Кэширование без утечек</li>
                <li>Метаданные DOM элементов</li>
              </ul>
            </div>
          </div>
        </div>

        <h4 style={{ marginTop: '24px' }}>💡 Практический пример: кэширование</h4>
        <CodeBlock code={`// Кэш, который не создаёт утечек памяти
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) {
    return cache.get(obj); // Из кэша
  }
  
  const result = /* дорогие вычисления */ obj.data * 2;
  cache.set(obj, result);
  return result;
}

let data = { data: 42 };
process(data);  // Вычисляем
process(data);  // Из кэша

data = null;    // Кэш автоматически очистится!`} />
      </div>

      {/* Interview Questions */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎤 Вопросы на собеседовании</span>
        </div>
        
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <details className="interview-question">
            <summary>В чём разница между Set и Array?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <ul className="info-list">
                <li>Set хранит только уникальные значения</li>
                <li>Set.has() работает за O(1), Array.includes() за O(n)</li>
                <li>Set не имеет индексов</li>
                <li>Set лучше для проверки наличия элемента</li>
              </ul>
            </div>
          </details>

          <details className="interview-question">
            <summary>Когда использовать Map вместо Object?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <ul className="info-list">
                <li>Когда ключи не строки (объекты, функции)</li>
                <li>Когда важен порядок вставки</li>
                <li>Когда часто добавляете/удаляете элементы</li>
                <li>Когда нужен точный размер (.size)</li>
              </ul>
            </div>
          </details>

          <details className="interview-question">
            <summary>Почему WeakMap не итерируемый?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                Потому что его содержимое зависит от garbage collector. В любой момент элементы 
                могут быть удалены, если на них нет других ссылок. Итерация по "случайному" 
                набору элементов не имеет смысла и была бы непредсказуемой.
              </p>
            </div>
          </details>

          <details className="interview-question">
            <summary>Как удалить дубликаты из массива объектов по полю id?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`const arr = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John Doe' }
];

// Способ 1: Map
const unique = [...new Map(
  arr.map(item => [item.id, item])
).values()];

// Способ 2: reduce + объект
const unique2 = arr.reduce((acc, item) => {
  if (!acc.find(x => x.id === item.id)) {
    acc.push(item);
  }
  return acc;
}, []);`} />
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
