import CodeBlock from '../../components/CodeBlock'

export default function SpreadRestDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>... Spread и Rest операторы</h1>
        <p>
          Три точки (...) в JavaScript работают по-разному в зависимости от контекста: 
          spread "разворачивает" массивы/объекты, rest "собирает" аргументы.
        </p>
      </div>

      <div className="card">
        <h3>📤 Spread operator — разворачивание</h3>
        <CodeBlock code={`// Массивы
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Объединение массивов
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Копирование массива (shallow copy)
const copy = [...arr1];

// Добавление элементов
const withExtra = [0, ...arr1, 4];
// [0, 1, 2, 3, 4]

// Преобразование string → array
const chars = [...'hello'];
// ['h', 'e', 'l', 'l', 'o']

// Передача в функцию
Math.max(...arr1); // 3`} />
      </div>

      <div className="card">
        <h3>📦 Spread для объектов</h3>
        <CodeBlock code={`const user = { name: 'John', age: 30 };
const address = { city: 'NYC', country: 'USA' };

// Объединение объектов
const fullUser = { ...user, ...address };
// { name: 'John', age: 30, city: 'NYC', country: 'USA' }

// Shallow copy
const copy = { ...user };

// Переопределение свойств (порядок важен!)
const updated = { ...user, age: 31 };
// { name: 'John', age: 31 }

// Добавление новых свойств
const withId = { id: 1, ...user };
// { id: 1, name: 'John', age: 30 }

// Условное добавление свойств
const withOptional = {
  ...user,
  ...(hasEmail && { email: 'john@example.com' })
};`} />
      </div>

      <div className="card">
        <h3>📥 Rest operator — собирание</h3>
        <CodeBlock code={`// В параметрах функции
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Комбинация с обычными параметрами
function log(first, second, ...rest) {
  console.log(first);  // 1
  console.log(second); // 2
  console.log(rest);   // [3, 4, 5]
}
log(1, 2, 3, 4, 5);

// В деструктуризации массива
const [head, ...tail] = [1, 2, 3, 4];
// head: 1, tail: [2, 3, 4]

// В деструктуризации объекта
const { name, ...otherProps } = { name: 'John', age: 30, city: 'NYC' };
// name: 'John', otherProps: { age: 30, city: 'NYC' }`} />
      </div>

      <div className="card">
        <h3>🎯 Практические паттерны</h3>
        
        <h4 style={{ marginTop: '16px' }}>Иммутабельное обновление state</h4>
        <CodeBlock code={`// Обновление вложенного объекта
const state = {
  user: {
    name: 'John',
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
};

const newState = {
  ...state,
  user: {
    ...state.user,
    settings: {
      ...state.user.settings,
      theme: 'light'
    }
  }
};

// Добавление в массив
const todos = [{ id: 1, text: 'Learn JS' }];
const newTodos = [...todos, { id: 2, text: 'Learn React' }];

// Удаление из массива
const withoutFirst = todos.slice(1);
const withoutById = todos.filter(t => t.id !== 1);`} />

        <h4 style={{ marginTop: '16px' }}>Функции с переменным числом аргументов</h4>
        <CodeBlock code={`// Wrapper функция
function logger(fn) {
  return function(...args) {
    console.log('Called with:', args);
    return fn(...args);
  };
}

const loggedSum = logger((a, b) => a + b);
loggedSum(1, 2); // 'Called with: [1, 2]', returns 3

// Частичное применение
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

const add = (a, b, c) => a + b + c;
const add5 = partial(add, 5);
add5(3, 2); // 10`} />

        <h4 style={{ marginTop: '16px' }}>Клонирование и слияние</h4>
        <CodeBlock code={`// Shallow clone
const clone = { ...original };
const arrClone = [...original];

// Merge objects (последний побеждает)
const merged = { ...defaults, ...userConfig };

// Merge arrays
const all = [...arr1, ...arr2, ...arr3];

// Уникальные значения
const unique = [...new Set(array)];`} />
      </div>

      <div className="card">
        <h3>⚠️ Важные особенности</h3>
        
        <div className="info-box warning">
          <h4>Shallow copy!</h4>
          <CodeBlock code={`const original = {
  name: 'John',
  address: { city: 'NYC' }
};

const copy = { ...original };
copy.address.city = 'LA';

console.log(original.address.city); // 'LA' — изменился!

// Для deep copy используйте:
const deep = structuredClone(original);
// или
const deep = JSON.parse(JSON.stringify(original));`} />
        </div>

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <h4>Rest всегда последний</h4>
          <CodeBlock code={`// ❌ Синтаксическая ошибка
function bad(...rest, last) {}
const [...rest, last] = array;

// ✅ Правильно
function good(first, ...rest) {}
const [first, ...rest] = array;`} />
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <h4>Spread работает только с iterable</h4>
          <CodeBlock code={`// ✅ Работает
[...array]
[...'string']
[...new Set()]
[...new Map()]

// ❌ Не работает
[...123]      // TypeError
[...null]     // TypeError
[...undefined] // TypeError`} />
        </div>
      </div>

      <div className="card">
        <h3>📊 Spread vs Rest</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}></th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--accent-purple)' }}>Spread</th>
                <th style={{ padding: '12px', textAlign: 'left', color: 'var(--accent-green)' }}>Rest</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Что делает</td>
                <td style={{ padding: '12px' }}>Разворачивает</td>
                <td style={{ padding: '12px' }}>Собирает</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Контекст</td>
                <td style={{ padding: '12px' }}>Литералы, вызовы</td>
                <td style={{ padding: '12px' }}>Параметры, деструктуризация</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Пример</td>
                <td style={{ padding: '12px' }}><code>[...arr]</code></td>
                <td style={{ padding: '12px' }}><code>(...args) =&gt; {}</code></td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Позиция</td>
                <td style={{ padding: '12px' }}>Любая</td>
                <td style={{ padding: '12px' }}>Только последняя</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
