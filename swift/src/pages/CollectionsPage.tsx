import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState<'array' | 'dict' | 'set'>('array')

  return (
    <div className="demo-container">
      <h1>📚 Коллекции в Swift</h1>
      <p>
        Swift предоставляет три основных типа коллекций: <code>Array</code> (упорядоченный список),
        <code>Dictionary</code> (ключ-значение) и <code>Set</code> (уникальные элементы без порядка).
        Все коллекции — <strong>дженерики</strong> и <strong>value types</strong> (копируются при присваивании,
        но с оптимизацией copy-on-write).
      </p>

      {/* ─── Визуальная схема: три коллекции ─── */}
      <section className="card">
        <h2>🗺️ Три коллекции Swift</h2>
        <p>Каждая коллекция решает свою задачу. Выбор зависит от того, нужен ли порядок и уникальность:</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '20px 0' }}>
          {[
            { type: 'array' as const, label: 'Array', icon: '📋', color: '#4CAF50', desc: 'Упорядоченный список. Элементы могут повторяться. Доступ по индексу O(1).' },
            { type: 'dict' as const, label: 'Dictionary', icon: '🗂️', color: '#2196F3', desc: 'Пары ключ-значение. Ключи уникальны. Доступ по ключу O(1).' },
            { type: 'set' as const, label: 'Set', icon: '🎯', color: '#FF9800', desc: 'Уникальные элементы без порядка. Поиск O(1). Поддерживает теорию множеств.' },
          ].map(c => (
            <button key={c.type} onClick={() => setActiveTab(c.type)} style={{
              flex: '1 1 200px',
              padding: '16px',
              background: activeTab === c.type ? c.color + '22' : 'var(--bg-tertiary)',
              border: `2px solid ${activeTab === c.type ? c.color : 'transparent'}`,
              borderRadius: 12,
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--text-primary)',
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{c.icon} {c.label}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.desc}</div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Array ─── */}
      {activeTab === 'array' && (
        <>
          <section className="card">
            <h2>📋 Array — упорядоченный массив</h2>
            <p>
              <code>Array</code> в Swift — это generic value type, аналог <code>T[]</code> в TypeScript.
              Но есть принципиальное отличие: массив в Swift — это <strong>value type</strong> (struct),
              а не reference type как в JS. Это значит, что при присваивании <code>let b = a</code>
              создаётся копия (с оптимизацией copy-on-write).
            </p>

            <h3>Создание и основные операции</h3>
            <CodeBlock language="swift" code={`// Создание массива
var numbers: [Int] = [1, 2, 3, 4, 5]
var names = ["Анна", "Борис", "Вера"]  // тип выведен как [String]
var empty: [Double] = []               // пустой массив
var zeros = Array(repeating: 0, count: 5)  // [0, 0, 0, 0, 0]

// Доступ по индексу
let first = numbers[0]      // 1
let last = numbers[numbers.count - 1]  // 5

// Безопасный доступ (нет встроенного, но легко добавить):
extension Array {
    subscript(safe index: Int) -> Element? {
        indices.contains(index) ? self[index] : nil
    }
}
numbers[safe: 10]  // nil, вместо краша`} />

            <h3>Мутация массива</h3>
            <CodeBlock language="swift" code={`var fruits = ["🍎", "🍊", "🍋"]

// Добавление
fruits.append("🍇")           // ["🍎", "🍊", "🍋", "🍇"]
fruits += ["🍓", "🫐"]        // + append contentsOf
fruits.insert("🍑", at: 1)    // вставить на позицию

// Удаление
fruits.remove(at: 0)           // удалить по индексу
fruits.removeLast()            // удалить последний
fruits.removeAll { $0 == "🍋" }  // удалить по условию

// Замена
fruits[0] = "🥝"
fruits[1...2] = ["🍒", "🍌", "🥭"]  // заменить диапазон`} />

            <h3>Функциональные методы (как в JS)</h3>
            <CodeBlock language="swift" code={`let scores = [85, 92, 78, 95, 88]

// map — преобразование
let doubled = scores.map { $0 * 2 }           // [170, 184, 156, 190, 176]
let labels = scores.map { "Балл: \\($0)" }

// filter — фильтрация
let high = scores.filter { $0 >= 90 }         // [92, 95]

// reduce — аккумуляция
let sum = scores.reduce(0, +)                 // 438
let avg = Double(sum) / Double(scores.count)   // 87.6

// compactMap — map + убрать nil
let strings = ["1", "abc", "3", "4x"]
let nums = strings.compactMap { Int($0) }      // [1, 3]

// flatMap — развернуть вложенные массивы
let nested = [[1, 2], [3, 4], [5]]
let flat = nested.flatMap { $0 }               // [1, 2, 3, 4, 5]

// sorted, reversed, contains, first(where:), ...
let sorted = scores.sorted()                   // [78, 85, 88, 92, 95]
let hasHigh = scores.contains { $0 > 90 }      // true
let firstHigh = scores.first { $0 > 90 }       // Optional(92)`} />

            <div className="info-box">
              <strong>💡 Value Semantics:</strong> В JavaScript <code>const b = a</code> создаёт ссылку
              на тот же массив. В Swift <code>let b = a</code> создаёт независимую копию (с CoW-оптимизацией).
              Это исключает целый класс багов, связанных с неожиданной мутацией.
            </div>
          </section>

          <section className="card">
            <h2>⚡ Производительность Array</h2>
            <p>Знание сложности операций критично для iOS-разработки с большими датасетами:</p>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Операция</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Сложность</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Доступ по индексу [i]', 'O(1)', 'Моментальный'],
                  ['append(_:)', 'O(1)*', 'Амортизированный O(1)'],
                  ['insert(_:at:)', 'O(n)', 'Сдвиг элементов'],
                  ['remove(at:)', 'O(n)', 'Сдвиг элементов'],
                  ['contains(_:)', 'O(n)', 'Линейный поиск'],
                  ['first(where:)', 'O(n)', 'В худшем случае'],
                  ['sort()', 'O(n log n)', 'TimSort'],
                ].map(([op, complexity, note]) => (
                  <tr key={op}>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{op}</td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{complexity}</td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {/* ─── Dictionary ─── */}
      {activeTab === 'dict' && (
        <>
          <section className="card">
            <h2>🗂️ Dictionary — словарь ключ-значение</h2>
            <p>
              <code>Dictionary&lt;Key, Value&gt;</code> (сокращённо <code>[Key: Value]</code>) — неупорядоченная
              коллекция пар «ключ → значение». Ключ должен быть <code>Hashable</code>.
              Аналог <code>Map&lt;K, V&gt;</code> в TypeScript или <code>Record&lt;K, V&gt;</code>.
            </p>

            <h3>Создание и доступ</h3>
            <CodeBlock language="swift" code={`// Создание словаря
var capitals: [String: String] = [
    "Россия": "Москва",
    "Франция": "Париж",
    "Япония": "Токио"
]

// Доступ по ключу — всегда возвращает Optional!
let moscow = capitals["Россия"]          // Optional("Москва")
let unknown = capitals["Марс"]           // nil

// Значение по умолчанию
let safe = capitals["Марс", default: "Неизвестно"]  // "Неизвестно"

// Количество
capitals.count     // 3
capitals.isEmpty   // false`} />

            <h3>Мутация</h3>
            <CodeBlock language="swift" code={`var scores: [String: Int] = [:]

// Добавление / обновление
scores["Анна"] = 95
scores["Борис"] = 87
scores.updateValue(100, forKey: "Анна")  // вернёт старое Optional(95)

// Удаление
scores["Борис"] = nil
scores.removeValue(forKey: "Анна")

// Слияние (merge)
var base = ["a": 1, "b": 2]
let updates = ["b": 20, "c": 30]
base.merge(updates) { current, new in new }  // ["a":1, "b":20, "c":30]`} />

            <h3>Итерация и трансформация</h3>
            <CodeBlock language="swift" code={`let ages = ["Анна": 25, "Борис": 30, "Вера": 28]

// Итерация
for (name, age) in ages {
    print("\\(name): \\(age) лет")
}

// map на словаре → возвращает Array!
let descriptions = ages.map { "\\($0.key) — \\($0.value)" }

// mapValues — новый словарь с теми же ключами
let nextYear = ages.mapValues { $0 + 1 }  // ["Анна": 26, ...]

// filter → возвращает Dictionary
let adults = ages.filter { $0.value >= 28 }

// compactMapValues — убрать nil из значений
let raw: [String: String] = ["a": "1", "b": "abc", "c": "3"]
let parsed: [String: Int] = raw.compactMapValues { Int($0) }
// ["a": 1, "c": 3]

// Группировка из массива
let words = ["apple", "avocado", "banana", "cherry", "apricot"]
let grouped = Dictionary(grouping: words) { $0.first! }
// ["a": ["apple", "avocado", "apricot"], "b": ["banana"], "c": ["cherry"]]`} />

            <div className="info-box">
              <strong>⚠️ Важно:</strong> В отличие от JS-объектов, где доступ по ключу возвращает <code>undefined</code>,
              в Swift доступ по ключу всегда возвращает <code>Optional</code>. Это заставляет обработать случай
              отсутствия ключа — типичный источник багов в JS.
            </div>
          </section>
        </>
      )}

      {/* ─── Set ─── */}
      {activeTab === 'set' && (
        <>
          <section className="card">
            <h2>🎯 Set — множество уникальных элементов</h2>
            <p>
              <code>Set&lt;Element&gt;</code> — неупорядоченная коллекция уникальных значений.
              Element должен быть <code>Hashable</code>. Близкий аналог — <code>Set</code> в JavaScript,
              но в Swift Set — полноценный value type с операциями теории множеств.
            </p>

            <h3>Создание и операции</h3>
            <CodeBlock language="swift" code={`// Создание
var colors: Set<String> = ["red", "green", "blue"]
var numbers: Set = [1, 2, 3, 4, 5]  // тип выведен
let empty = Set<Int>()

// Добавление (дубликаты игнорируются)
colors.insert("red")    // (inserted: false, memberAfterInsert: "red")
colors.insert("yellow") // (inserted: true,  memberAfterInsert: "yellow")

// Удаление
colors.remove("green")  // Optional("green") или nil

// Проверка
colors.contains("blue") // true — O(1)!`} />

            <h3>Операции теории множеств</h3>
            <p>
              Одно из главных преимуществ Set — встроенная поддержка всех стандартных
              операций над множествами. В JS для этого нужен полифилл или ручная реализация.
            </p>
            <CodeBlock language="swift" code={`let frontend: Set = ["React", "Vue", "Angular", "Svelte"]
let backend: Set  = ["Node", "Django", "Rails", "Svelte"]

// Объединение (Union) A ∪ B
frontend.union(backend)
// {"React", "Vue", "Angular", "Svelte", "Node", "Django", "Rails"}

// Пересечение (Intersection) A ∩ B
frontend.intersection(backend)       // {"Svelte"}

// Разность (Subtracting) A \\ B
frontend.subtracting(backend)         // {"React", "Vue", "Angular"}

// Симметрическая разность (XOR) A △ B
frontend.symmetricDifference(backend) // все кроме общих

// Проверки
let webDev: Set = ["React", "Vue", "Angular", "Svelte", "Node"]
frontend.isSubset(of: webDev)         // true
webDev.isSuperset(of: frontend)       // true
frontend.isDisjoint(with: backend)    // false (есть общие)`} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
              margin: '20px 0'
            }}>
              {[
                { op: 'A ∪ B', name: 'union', color: '#4CAF50', desc: 'Все элементы обоих' },
                { op: 'A ∩ B', name: 'intersection', color: '#2196F3', desc: 'Только общие' },
                { op: 'A \\ B', name: 'subtracting', color: '#FF9800', desc: 'В A, но не в B' },
                { op: 'A △ B', name: 'symmetricDiff', color: '#9C27B0', desc: 'Во всех, кроме общих' },
              ].map(s => (
                <div key={s.name} style={{
                  padding: 14,
                  background: 'var(--bg-tertiary)',
                  borderRadius: 10,
                  border: `2px solid ${s.color}`,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: s.color }}>{s.op}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', margin: '4px 0' }}>.{s.name}()</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card">
            <h2>🤔 Когда использовать Set vs Array?</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Критерий</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Array</th>
                  <th style={{ textAlign: 'left', padding: '10px', borderBottom: '2px solid var(--border-color)' }}>Set</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Порядок важен?', '✅ Да', '❌ Нет'],
                  ['Дубликаты?', '✅ Разрешены', '❌ Уникальные'],
                  ['Поиск contains', 'O(n)', 'O(1)'],
                  ['Доступ по индексу', '✅ O(1)', '❌ Нет'],
                  ['Теория множеств', '❌ Нет', '✅ Union, intersect...'],
                  ['Типичное применение', 'Списки, очереди', 'Теги, права, фильтры'],
                ].map(([criterion, arr, set]) => (
                  <tr key={criterion}>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)', fontWeight: 600 }}>{criterion}</td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{arr}</td>
                    <td style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-color)' }}>{set}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {/* ─── Общее: Протоколы коллекций ─── */}
      <section className="card">
        <h2>🧬 Иерархия протоколов коллекций</h2>
        <p>
          Все три коллекции в Swift реализуют общую иерархию протоколов. Понимание этой иерархии
          помогает писать обобщённый код, работающий с любой коллекцией.
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          margin: '20px 0',
          fontSize: '0.85rem',
        }}>
          {[
            { name: 'Sequence', desc: 'for-in итерация', color: '#9E9E9E' },
            { name: 'Collection', desc: '+ subscript, count, indices', color: '#2196F3' },
            { name: 'BidirectionalCollection', desc: '+ last, reversed()', color: '#4CAF50' },
            { name: 'RandomAccessCollection', desc: '+ O(1) доступ по индексу', color: '#FF9800' },
          ].map((p, i) => (
            <div key={p.name}>
              {i > 0 && <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>⬇️</div>}
              <div style={{
                padding: '10px 24px',
                background: p.color + '22',
                border: `2px solid ${p.color}`,
                borderRadius: 10,
                textAlign: 'center',
              }}>
                <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{p.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <CodeBlock language="swift" code={`// Функция работающая с любой коллекцией
func printAll<C: Collection>(_ collection: C) where C.Element: CustomStringConvertible {
    for item in collection {
        print(item.description)
    }
}

printAll([1, 2, 3])              // Array
printAll(Set(["a", "b"]))        // Set
printAll(["key": "value"].keys)  // Dictionary.Keys`} />
      </section>

      {/* ─── Copy-on-Write ─── */}
      <section className="card">
        <h2>📋 Copy-on-Write (CoW)</h2>
        <p>
          Все стандартные коллекции Swift используют оптимизацию <strong>Copy-on-Write</strong>.
          При присваивании <code>var b = a</code> данные физически не копируются — обе переменные
          ссылаются на одну область памяти. Копирование происходит только при первой мутации.
        </p>
        <CodeBlock language="swift" code={`var a = [1, 2, 3]
var b = a           // Пока что НЕ копирует данные! (shared buffer)

// Оба указывают на одни данные
b.append(4)         // Вот теперь копирование произошло!
// a = [1, 2, 3]    — оригинал не изменился
// b = [1, 2, 3, 4] — независимая копия

// Проверка уникальности ссылки (для своих типов):
// isKnownUniquelyReferenced(&storage)`} />
        <div className="info-box">
          <strong>💡 Для iOS-разработки:</strong> CoW означает, что передавать массивы/словари в функции
          дёшево — копирование происходит лениво. Не нужно бояться <code>let copy = array</code>.
        </div>
      </section>
    </div>
  )
}
