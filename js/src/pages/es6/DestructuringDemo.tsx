import CodeBlock from '../../components/CodeBlock'

export default function DestructuringDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📤 Деструктуризация</h1>
        <p>
          Деструктуризация позволяет извлекать значения из массивов и объектов 
          в отдельные переменные с помощью компактного синтаксиса.
        </p>
      </div>

      <div className="card">
        <h3>📦 Деструктуризация объектов</h3>
        <CodeBlock code={`const user = {
  name: 'John',
  age: 30,
  city: 'New York'
};

// Базовая деструктуризация
const { name, age } = user;
console.log(name); // 'John'
console.log(age);  // 30

// Переименование переменных
const { name: userName, age: userAge } = user;
console.log(userName); // 'John'

// Значения по умолчанию
const { name, country = 'USA' } = user;
console.log(country); // 'USA'

// Комбинация: переименование + значение по умолчанию
const { city: userCity = 'Unknown' } = user;`} />
      </div>

      <div className="card">
        <h3>📚 Деструктуризация массивов</h3>
        <CodeBlock code={`const colors = ['red', 'green', 'blue'];

// Базовая деструктуризация
const [first, second] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'

// Пропуск элементов
const [, , third] = colors;
console.log(third); // 'blue'

// Значения по умолчанию
const [a, b, c, d = 'yellow'] = colors;
console.log(d); // 'yellow'

// Обмен переменных
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1`} />
      </div>

      <div className="card">
        <h3>🔄 Rest в деструктуризации</h3>
        <CodeBlock code={`// Массивы
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

// Объекты
const { name, ...otherProps } = {
  name: 'John',
  age: 30,
  city: 'NYC'
};
console.log(name);       // 'John'
console.log(otherProps); // { age: 30, city: 'NYC' }

// Удаление свойства из объекта (иммутабельно)
const { password, ...safeUser } = user;
// safeUser не содержит password`} />
      </div>

      <div className="card">
        <h3>🪆 Вложенная деструктуризация</h3>
        <CodeBlock code={`const user = {
  name: 'John',
  address: {
    city: 'New York',
    coords: {
      lat: 40.7128,
      lng: -74.0060
    }
  },
  friends: ['Alice', 'Bob']
};

// Вложенные объекты
const { 
  name,
  address: { 
    city,
    coords: { lat, lng }
  }
} = user;

console.log(city); // 'New York'
console.log(lat);  // 40.7128

// Вложенные массивы
const matrix = [[1, 2], [3, 4]];
const [[a, b], [c, d]] = matrix;

// Комбинация объект + массив
const { friends: [firstFriend] } = user;
console.log(firstFriend); // 'Alice'`} />
      </div>

      <div className="card">
        <h3>⚙️ Деструктуризация в параметрах функций</h3>
        <CodeBlock code={`// Параметр-объект
function createUser({ name, age, role = 'user' }) {
  return { name, age, role };
}

createUser({ name: 'John', age: 30 });
// { name: 'John', age: 30, role: 'user' }

// Параметр-массив
function sum([a, b, c = 0]) {
  return a + b + c;
}

sum([1, 2]); // 3

// Комбинация с rest
function logAll({ name, ...rest }) {
  console.log(name);
  console.log(rest);
}

// Деструктуризация + значение по умолчанию для всего объекта
function greet({ name = 'Guest' } = {}) {
  console.log('Hello, ' + name);
}

greet();         // 'Hello, Guest'
greet({});       // 'Hello, Guest'
greet({ name: 'John' }); // 'Hello, John'`} />
      </div>

      <div className="card">
        <h3>🎯 Практические примеры</h3>
        
        <h4 style={{ marginTop: '16px' }}>React компоненты</h4>
        <CodeBlock code={`// Props деструктуризация
function UserCard({ name, avatar, role = 'user', ...rest }) {
  return (
    <div {...rest}>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
      <span>{role}</span>
    </div>
  );
}

// Хуки
const [count, setCount] = useState(0);
const { data, loading, error } = useFetch('/api/users');`} />

        <h4 style={{ marginTop: '16px' }}>Импорты</h4>
        <CodeBlock code={`// Именованные импорты — это тоже деструктуризация!
import { useState, useEffect } from 'react';
import { map, filter, reduce } from 'lodash';`} />

        <h4 style={{ marginTop: '16px' }}>Обработка API ответов</h4>
        <CodeBlock code={`const response = await fetch('/api/user');
const { data: { user: { name, email } }, status } = await response.json();`} />
      </div>

      <div className="card">
        <h3>⚠️ Подводные камни</h3>
        <div className="info-box warning">
          <h4>Деструктуризация null/undefined</h4>
          <CodeBlock code={`// ❌ Ошибка
const { name } = null; // TypeError
const [first] = undefined; // TypeError

// ✅ Защита значением по умолчанию
const { name } = data || {};
const [first] = arr ?? [];

// ✅ Optional chaining + nullish coalescing
const name = data?.user?.name ?? 'Anonymous';`} />
        </div>

        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <h4>Объявление без let/const</h4>
          <CodeBlock code={`// ❌ Синтаксическая ошибка
{ name } = user; // Воспринимается как блок кода

// ✅ Оберните в скобки
({ name } = user);
([first] = array);`} />
        </div>
      </div>
    </div>
  )
}
