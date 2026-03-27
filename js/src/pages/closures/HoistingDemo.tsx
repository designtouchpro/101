import CodeBlock from '../../components/CodeBlock'

export default function HoistingDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⬆️ Hoisting (Всплытие)</h1>
        <p>
          Hoisting — механизм JavaScript, при котором объявления переменных и функций 
          "поднимаются" в начало своей области видимости перед выполнением кода.
        </p>
      </div>

      <div className="card">
        <h3>📦 Hoisting переменных</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <h4 style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Как мы пишем:</h4>
            <CodeBlock code={`console.log(x); // ???
var x = 5;
console.log(x); // 5`} />
          </div>
          <div>
            <h4 style={{ color: 'var(--accent-js)', marginBottom: '8px' }}>Как JS это видит:</h4>
            <CodeBlock code={`var x; // Объявление поднято
console.log(x); // undefined
x = 5; // Присвоение на месте
console.log(x); // 5`} />
          </div>
        </div>
        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Важно:</strong> Поднимается только объявление, не инициализация!
        </div>
      </div>

      <div className="card">
        <h3>🚫 TDZ — Temporal Dead Zone</h3>
        <CodeBlock code={`// let и const тоже "всплывают", но попадают в TDZ
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;

// TDZ — зона от начала блока до объявления
{
  // --- TDZ для myVar начинается ---
  console.log(myVar); // ReferenceError!
  // --- TDZ ---
  let myVar = 'hello'; // TDZ заканчивается
  console.log(myVar);  // 'hello'
}`} />
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>TDZ существует для:</strong>
          <ul className="info-list">
            <li>let</li>
            <li>const</li>
            <li>class</li>
            <li>Параметры функций со значениями по умолчанию</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h3>🔧 Hoisting функций</h3>
        <CodeBlock code={`// Function Declaration — полностью поднимается
greet(); // 'Hello!' ✅

function greet() {
  console.log('Hello!');
}

// Function Expression — только объявление переменной
sayHi(); // TypeError: sayHi is not a function

var sayHi = function() {
  console.log('Hi!');
};

// Arrow Function — то же самое
sayBye(); // TypeError

var sayBye = () => {
  console.log('Bye!');
};`} />
      </div>

      <div className="card">
        <h3>📊 Сравнение поведения</h3>
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid var(--accent-red)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ color: 'var(--accent-red)' }}>var</h4>
            <CodeBlock code={`console.log(a); // undefined
var a = 1;
console.log(a); // 1

// Можно переобъявить
var a = 2; // OK`} />
          </div>
          
          <div style={{
            background: 'rgba(168, 85, 247, 0.1)',
            border: '1px solid var(--accent-purple)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ color: 'var(--accent-purple)' }}>let</h4>
            <CodeBlock code={`console.log(b); // ReferenceError (TDZ)
let b = 1;
console.log(b); // 1

// Нельзя переобъявить
let b = 2; // SyntaxError`} />
          </div>
          
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid var(--accent-green)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ color: 'var(--accent-green)' }}>const</h4>
            <CodeBlock code={`console.log(c); // ReferenceError (TDZ)
const c = 1;
console.log(c); // 1

// Нельзя переприсвоить
c = 2; // TypeError`} />
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Классы и Hoisting</h3>
        <CodeBlock code={`// Class Declaration — в TDZ
const p = new Person(); // ReferenceError!

class Person {
  constructor(name) {
    this.name = name;
  }
}

// Class Expression — тоже в TDZ
const p2 = new Animal(); // ReferenceError or TypeError

var Animal = class {
  constructor(type) {
    this.type = type;
  }
};`} />
      </div>

      <div className="card">
        <h3>⚠️ Практические подводные камни</h3>
        <CodeBlock code={`// Пример 1: Неожиданное undefined
var value = 'global';

function test() {
  console.log(value); // undefined, не 'global'!
  var value = 'local';
  console.log(value); // 'local'
}

test();

// Пример 2: Функция в блоке (не делайте так!)
if (true) {
  function foo() { return 1; }
} else {
  function foo() { return 2; }
}
// Поведение зависит от браузера! Не определено в спецификации.

// Правильный способ:
let foo;
if (true) {
  foo = () => 1;
} else {
  foo = () => 2;
}`} />
      </div>

      <div className="card">
        <h3>✅ Best Practices</h3>
        <div className="info-box success">
          <ol className="info-list">
            <li><strong>Используйте const по умолчанию</strong>, let когда нужно переприсвоение</li>
            <li><strong>Избегайте var</strong> — блочная область видимости безопаснее</li>
            <li><strong>Объявляйте переменные в начале scope</strong> — делает код понятнее</li>
            <li><strong>Используйте Function Declaration</strong> для функций, которые нужны до объявления</li>
            <li><strong>Используйте линтер</strong> (ESLint) с правилами no-use-before-define</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
