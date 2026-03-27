import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface MethodExample {
  input: string
  code: string
  output: string
}

interface ArrayMethod {
  name: string
  emoji: string
  color: string
  description: string
  returns: string
  mutates: boolean
  chainable: boolean
  examples: MethodExample[]
  interview: string
}

const arrayMethods: ArrayMethod[] = [
  {
    name: 'forEach',
    emoji: '🔄',
    color: '#f59e0b',
    description: 'Выполняет функцию для каждого элемента. Ничего не возвращает.',
    returns: 'undefined',
    mutates: false,
    chainable: false,
    examples: [
      {
        input: '[1, 2, 3]',
        code: `const arr = [1, 2, 3];
arr.forEach((item, index) => {
  console.log(\`[\${index}]: \${item}\`);
});
// [0]: 1
// [1]: 2
// [2]: 3`,
        output: 'undefined (ничего не возвращает)'
      },
      {
        input: 'users',
        code: `const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
];

// ❌ Частая ошибка — пытаться return
const result = users.forEach(u => u.name);
console.log(result); // undefined!

// ✅ forEach для сайд-эффектов
users.forEach(u => {
  sendEmail(u.name);
  logAction(u.name);
});`,
        output: 'undefined — используй для сайд-эффектов'
      }
    ],
    interview: 'forEach не возвращает значение, нельзя break/return из него, не чейнится. Для трансформации — map, для фильтра — filter.'
  },
  {
    name: 'map',
    emoji: '🗺️',
    color: '#3b82f6',
    description: 'Создаёт НОВЫЙ массив, применяя функцию к каждому элементу.',
    returns: 'new Array (той же длины)',
    mutates: false,
    chainable: true,
    examples: [
      {
        input: '[1, 2, 3]',
        code: `const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);

console.log(doubled); // [2, 4, 6]
console.log(nums);    // [1, 2, 3] — оригинал не изменён`,
        output: '[2, 4, 6]'
      },
      {
        input: 'users',
        code: `const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
];

// Извлечь имена
const names = users.map(u => u.name);
// ['Alice', 'Bob']

// Трансформация объектов
const cards = users.map(u => ({
  title: u.name,
  subtitle: \`\${u.age} лет\`,
}));`,
        output: "['Alice', 'Bob']"
      }
    ],
    interview: 'map ВСЕГДА возвращает массив той же длины. Не используй map для сайд-эффектов (используй forEach). Чейнится: arr.map().filter().map().'
  },
  {
    name: 'filter',
    emoji: '🔍',
    color: '#8b5cf6',
    description: 'Создаёт НОВЫЙ массив с элементами, прошедшими проверку.',
    returns: 'new Array (≤ исходной длины)',
    mutates: false,
    chainable: true,
    examples: [
      {
        input: '[1, 2, 3, 4, 5]',
        code: `const nums = [1, 2, 3, 4, 5];
const even = nums.filter(n => n % 2 === 0);

console.log(even); // [2, 4]`,
        output: '[2, 4]'
      },
      {
        input: 'products',
        code: `const products = [
  { name: 'A', price: 100, inStock: true },
  { name: 'B', price: 200, inStock: false },
  { name: 'C', price: 50, inStock: true },
];

// Цепочка filter + map
const affordable = products
  .filter(p => p.inStock)
  .filter(p => p.price < 150)
  .map(p => p.name);

console.log(affordable); // ['A', 'C']`,
        output: "['A', 'C']"
      }
    ],
    interview: 'filter возвращает массив 0..N элементов. Callback должен возвращать boolean. Часто используется в цепочке с map.'
  },
  {
    name: 'reduce',
    emoji: '📊',
    color: '#ef4444',
    description: 'Сводит массив к одному значению, применяя функцию к аккумулятору.',
    returns: 'любое значение (число, объект, массив...)',
    mutates: false,
    chainable: false,
    examples: [
      {
        input: '[1, 2, 3, 4]',
        code: `const nums = [1, 2, 3, 4];

// Сумма
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 10

// Разбор по шагам:
// acc=0, n=1 → 1
// acc=1, n=2 → 3
// acc=3, n=3 → 6
// acc=6, n=4 → 10`,
        output: '10'
      },
      {
        input: 'items',
        code: `const items = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple'];

// Подсчёт вхождений
const count = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

console.log(count);
// { apple: 3, banana: 2, cherry: 1 }`,
        output: '{ apple: 3, banana: 2, cherry: 1 }'
      },
      {
        input: 'nested',
        code: `// Flatten с reduce
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => [...acc, ...arr], []);
console.log(flat); // [1, 2, 3, 4, 5]

// Группировка
const users = [
  { name: 'Alice', dept: 'dev' },
  { name: 'Bob', dept: 'qa' },
  { name: 'Carol', dept: 'dev' },
];

const byDept = users.reduce((acc, u) => {
  (acc[u.dept] ??= []).push(u.name);
  return acc;
}, {} as Record<string, string[]>);
// { dev: ['Alice', 'Carol'], qa: ['Bob'] }`,
        output: '{ dev: [...], qa: [...] }'
      }
    ],
    interview: 'reduce — самый универсальный метод. Можно реализовать map, filter, flatMap через reduce. Начальное значение (2й аргумент) критически важно — без него acc = первый элемент.'
  },
  {
    name: 'find / findIndex',
    emoji: '🎯',
    color: '#10b981',
    description: 'find — первый элемент, прошедший проверку. findIndex — его индекс.',
    returns: 'элемент | undefined / число',
    mutates: false,
    chainable: false,
    examples: [
      {
        input: 'users',
        code: `const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
];

const bob = users.find(u => u.name === 'Bob');
console.log(bob); // { id: 2, name: 'Bob' }

const idx = users.findIndex(u => u.name === 'Bob');
console.log(idx); // 1

const missing = users.find(u => u.name === 'Dave');
console.log(missing); // undefined`,
        output: "{ id: 2, name: 'Bob' } / 1"
      }
    ],
    interview: 'find возвращает ПЕРВЫЙ найденный элемент или undefined. Останавливается после первого совпадения (в отличие от filter). findIndex возвращает -1 если не найдено.'
  },
  {
    name: 'some / every',
    emoji: '✅',
    color: '#06b6d4',
    description: 'some — хотя бы один true? every — все true?',
    returns: 'boolean',
    mutates: false,
    chainable: false,
    examples: [
      {
        input: '[1, 2, 3, 4]',
        code: `const nums = [1, 2, 3, 4];

// Есть ли чётное?
console.log(nums.some(n => n % 2 === 0)); // true

// Все ли положительные?
console.log(nums.every(n => n > 0)); // true

// Все ли чётные?
console.log(nums.every(n => n % 2 === 0)); // false

// Пустой массив:
console.log([].some(() => true));  // false
console.log([].every(() => false)); // true (!)`,
        output: 'true / true / false'
      }
    ],
    interview: 'some останавливается на первом true. every — на первом false. Пустой массив: some → false, every → true (вакуумная истина).'
  },
  {
    name: 'flatMap',
    emoji: '📦',
    color: '#d946ef',
    description: 'map + flat(1) в одном вызове. Каждый элемент может стать массивом.',
    returns: 'new Array',
    mutates: false,
    chainable: true,
    examples: [
      {
        input: 'sentences',
        code: `const sentences = ['hello world', 'foo bar baz'];

// map вернул бы [['hello','world'], ['foo','bar','baz']]
// flatMap «раскрывает» один уровень
const words = sentences.flatMap(s => s.split(' '));
console.log(words);
// ['hello', 'world', 'foo', 'bar', 'baz']

// Фильтрация + маппинг в одном
const nums = [1, 2, 3, 4, 5];
const result = nums.flatMap(n => n % 2 === 0 ? [n * 10] : []);
console.log(result); // [20, 40]`,
        output: "['hello', 'world', 'foo', 'bar', 'baz']"
      }
    ],
    interview: 'flatMap = map + flat(1). Можно использовать для filter+map в одном вызове (возвращай [] для пропуска, [value] для включения).'
  }
]

export default function ArrayMethodsDemo() {
  const [activeMethod, setActiveMethod] = useState(0)
  const [activeExample, setActiveExample] = useState(0)

  const method = arrayMethods[activeMethod]

  return (
    <div className="page-container">
      <h1>🔧 Методы массивов</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>
        map, reduce, forEach, filter и другие — полный разбор с примерами и подводными камнями для собеседований.
      </p>

      {/* Method Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {arrayMethods.map((m, i) => (
          <button
            key={m.name}
            onClick={() => { setActiveMethod(i); setActiveExample(0) }}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `2px solid ${i === activeMethod ? m.color : 'transparent'}`,
              background: i === activeMethod ? `${m.color}22` : 'var(--bg-code)',
              color: i === activeMethod ? m.color : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: i === activeMethod ? 600 : 400,
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}
          >
            {m.emoji} {m.name}
          </button>
        ))}
      </div>

      {/* Method Detail */}
      <div className="card" style={{ borderLeft: `4px solid ${method.color}`, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: '1.5rem' }}>{method.emoji}</span>
          <h2 style={{ margin: 0, color: method.color }}>.{method.name}()</h2>
        </div>
        <p style={{ fontSize: '1rem', marginBottom: 16 }}>{method.description}</p>

        {/* Properties */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <span style={{ 
            padding: '4px 12px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500,
            background: 'var(--bg-code)', color: 'var(--text-secondary)' 
          }}>
            Возвращает: <strong style={{ color: method.color }}>{method.returns}</strong>
          </span>
          <span style={{ 
            padding: '4px 12px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500,
            background: method.mutates ? 'rgba(239,68,68,0.15)' : 'rgba(16,185,129,0.15)',
            color: method.mutates ? '#ef4444' : '#10b981'
          }}>
            {method.mutates ? '⚠️ Мутирует' : '✅ Не мутирует'}
          </span>
          <span style={{ 
            padding: '4px 12px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 500,
            background: method.chainable ? 'rgba(59,130,246,0.15)' : 'rgba(156,163,175,0.15)',
            color: method.chainable ? '#3b82f6' : '#9ca3af'
          }}>
            {method.chainable ? '🔗 Чейнится' : '🔚 Не чейнится'}
          </span>
        </div>

        {/* Example Tabs */}
        {method.examples.length > 1 && (
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {method.examples.map((ex, i) => (
              <button
                key={i}
                onClick={() => setActiveExample(i)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 6,
                  border: 'none',
                  background: i === activeExample ? method.color : 'var(--bg-code)',
                  color: i === activeExample ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s'
                }}
              >
                Пример {i + 1}: {ex.input}
              </button>
            ))}
          </div>
        )}

        <CodeBlock code={method.examples[activeExample]?.code || ''} language="javascript" />

        <div style={{ 
          marginTop: 12, 
          padding: '10px 16px', 
          background: `${method.color}11`, 
          borderRadius: 8,
          fontSize: '0.9rem',
          color: method.color,
          fontWeight: 500
        }}>
          → Результат: {method.examples[activeExample]?.output}
        </div>
      </div>

      {/* Interview Note */}
      <div className="card" style={{ 
        marginBottom: 24,
        background: 'var(--bg-code)',
        borderLeft: `4px solid ${method.color}`
      }}>
        <h4 style={{ marginBottom: 8, color: method.color }}>💬 Вопрос на собеседовании</h4>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
          {method.interview}
        </p>
      </div>

      {/* Quick Cheatsheet */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>📋 Шпаргалка: когда что использовать</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          {[
            { task: 'Преобразовать каждый элемент', method: 'map', c: '#3b82f6' },
            { task: 'Отобрать подходящие', method: 'filter', c: '#8b5cf6' },
            { task: 'Найти один элемент', method: 'find', c: '#10b981' },
            { task: 'Свернуть в одно значение', method: 'reduce', c: '#ef4444' },
            { task: 'Проверить наличие', method: 'some', c: '#06b6d4' },
            { task: 'Проверить все', method: 'every', c: '#06b6d4' },
            { task: 'Выполнить действие (сайд-эффект)', method: 'forEach', c: '#f59e0b' },
            { task: 'map + flatten', method: 'flatMap', c: '#d946ef' },
          ].map((r, i) => (
            <div key={i} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12, 
              padding: '8px 12px',
              borderRadius: 6,
              background: i % 2 === 0 ? 'var(--bg-code)' : 'transparent'
            }}>
              <span style={{ flex: 1, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{r.task}</span>
              <code style={{ 
                padding: '2px 10px', 
                borderRadius: 6, 
                background: `${r.c}22`, 
                color: r.c,
                fontWeight: 600,
                fontSize: '0.85rem'
              }}>.{r.method}()</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
