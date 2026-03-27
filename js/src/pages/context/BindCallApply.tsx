import CodeBlock from '../../components/CodeBlock'

export default function BindCallApply() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔗 bind, call, apply</h1>
        <p>
          Методы для явного управления значением this при вызове функции. 
          Позволяют "одолжить" метод у одного объекта для другого.
        </p>
      </div>

      <div className="card">
        <h3>📊 Сравнение методов</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Метод</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Синтаксис</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Вызывает сразу?</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--accent-red)' }}>call</td>
                <td style={{ padding: '12px' }}><code>func.call(thisArg, arg1, arg2, ...)</code></td>
                <td style={{ padding: '12px' }}>✅ Да</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--accent-green)' }}>apply</td>
                <td style={{ padding: '12px' }}><code>func.apply(thisArg, [arg1, arg2, ...])</code></td>
                <td style={{ padding: '12px' }}>✅ Да</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', fontWeight: 600, color: 'var(--accent-purple)' }}>bind</td>
                <td style={{ padding: '12px' }}><code>func.bind(thisArg, arg1, arg2, ...)</code></td>
                <td style={{ padding: '12px' }}>❌ Возвращает функцию</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--accent-red)' }}>📞 call()</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Вызывает функцию с указанным this и аргументами <strong>по отдельности</strong>.
        </p>
        <CodeBlock code={`function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const user = { name: 'John' };

greet.call(user, 'Hello', '!');
// 'Hello, John!'

// Заимствование методов
const numbers = { 0: 1, 1: 2, 2: 3, length: 3 };
const arr = Array.prototype.slice.call(numbers);
// [1, 2, 3] - превратили array-like в массив

// Вызов родительского конструктора
function Animal(name) {
  this.name = name;
}

function Dog(name, breed) {
  Animal.call(this, name); // Вызываем Animal с this = Dog
  this.breed = breed;
}

const dog = new Dog('Rex', 'German Shepherd');`} />
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--accent-green)' }}>📋 apply()</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          То же что call, но аргументы передаются <strong>массивом</strong>.
        </p>
        <CodeBlock code={`function greet(greeting, punctuation) {
  console.log(greeting + ', ' + this.name + punctuation);
}

const user = { name: 'John' };

greet.apply(user, ['Hello', '!']);
// 'Hello, John!'

// Классический пример: Math.max с массивом
const numbers = [5, 6, 2, 3, 7];

// До ES6
const max = Math.max.apply(null, numbers); // 7

// Сейчас проще со spread
const max2 = Math.max(...numbers); // 7

// Мнемоника: 
// Apply = Array (аргументы в массиве)
// Call = Comma (аргументы через запятую)`} />
      </div>

      <div className="card">
        <h3 style={{ color: 'var(--accent-purple)' }}>🔗 bind()</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Создаёт новую функцию с привязанным this. <strong>Не вызывает сразу!</strong>
        </p>
        <CodeBlock code={`const user = {
  name: 'John',
  greet() {
    console.log('Hello, ' + this.name);
  }
};

// Проблема: потеря контекста
const greet = user.greet;
greet(); // 'Hello, undefined'

// Решение: bind
const boundGreet = user.greet.bind(user);
boundGreet(); // 'Hello, John'

// Частичное применение (partial application)
function multiply(a, b) {
  return a * b;
}

const double = multiply.bind(null, 2); // a = 2 зафиксировано
console.log(double(5));  // 10
console.log(double(10)); // 20

// Event handlers
class Button {
  constructor(label) {
    this.label = label;
    // Привязываем в конструкторе
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    console.log('Clicked: ' + this.label);
  }
}

const btn = new Button('Submit');
document.addEventListener('click', btn.handleClick); // Работает!`} />
      </div>

      <div className="card">
        <h3>⚠️ Важные особенности bind</h3>
        <CodeBlock code={`// 1. bind нельзя "перепривязать"
const obj1 = { name: 'obj1' };
const obj2 = { name: 'obj2' };

function getName() {
  return this.name;
}

const bound = getName.bind(obj1);
const reBound = bound.bind(obj2); // Не работает!

console.log(bound());   // 'obj1'
console.log(reBound()); // 'obj1' — всё ещё obj1!

// 2. bind и new
function Person(name) {
  this.name = name;
}

const BoundPerson = Person.bind({ custom: true });
const person = new BoundPerson('John');
// new игнорирует bind!
console.log(person.name);   // 'John'
console.log(person.custom); // undefined

// 3. bind сохраняет arguments из bind
function log(level, message) {
  console.log('[' + level + '] ' + message);
}

const logError = log.bind(null, 'ERROR');
logError('Something went wrong');
// '[ERROR] Something went wrong'`} />
      </div>

      <div className="card">
        <h3>🛠️ Реализация своего bind</h3>
        <CodeBlock code={`// Упрощённая реализация
Function.prototype.myBind = function(thisArg, ...boundArgs) {
  const fn = this;
  
  return function(...callArgs) {
    return fn.apply(thisArg, [...boundArgs, ...callArgs]);
  };
};

// Использование
function greet(greeting, name) {
  console.log(greeting + ', ' + name + '! I am ' + this.title);
}

const obj = { title: 'Mr.' };
const boundGreet = greet.myBind(obj, 'Hello');
boundGreet('John'); // 'Hello, John! I am Mr.'`} />
      </div>

      <div className="card">
        <h3>💡 Когда что использовать?</h3>
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <div className="info-box" style={{ borderColor: 'var(--accent-red)' }}>
            <h4 style={{ color: 'var(--accent-red)' }}>call</h4>
            <ul className="info-list">
              <li>Одноразовый вызов с другим this</li>
              <li>Заимствование методов</li>
              <li>Вызов родительского конструктора</li>
            </ul>
          </div>
          
          <div className="info-box" style={{ borderColor: 'var(--accent-green)' }}>
            <h4 style={{ color: 'var(--accent-green)' }}>apply</h4>
            <ul className="info-list">
              <li>Когда аргументы уже в массиве</li>
              <li>Функции с переменным числом аргументов</li>
              <li>До ES6: Math.max/min с массивами</li>
            </ul>
          </div>
          
          <div className="info-box" style={{ borderColor: 'var(--accent-purple)' }}>
            <h4 style={{ color: 'var(--accent-purple)' }}>bind</h4>
            <ul className="info-list">
              <li>Event handlers</li>
              <li>Callbacks с сохранением контекста</li>
              <li>Частичное применение функций</li>
              <li>React class components</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
