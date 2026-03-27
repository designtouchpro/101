import CodeBlock from '../../components/CodeBlock'

export default function PrototypesDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧬 Прототипы</h1>
        <p>
          Прототипное наследование — основа объектной модели JavaScript. 
          Каждый объект имеет скрытую ссылку [[Prototype]] на другой объект.
        </p>
      </div>

      <div className="card">
        <h3>📊 Цепочка прототипов</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          marginTop: '16px',
          padding: '20px',
          background: 'var(--bg-code)',
          borderRadius: '12px'
        }}>
          <div style={{ 
            padding: '16px', 
            border: '2px solid var(--accent-red)',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)'
          }}>
            <strong style={{ color: 'var(--accent-red)' }}>Object.prototype</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              toString(), hasOwnProperty(), valueOf()...
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              [[Prototype]]: <strong>null</strong>
            </p>
          </div>
          
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>↑</div>
          
          <div style={{ 
            padding: '16px', 
            border: '2px solid var(--accent-purple)',
            borderRadius: '8px',
            background: 'rgba(168, 85, 247, 0.1)'
          }}>
            <strong style={{ color: 'var(--accent-purple)' }}>Animal.prototype</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              speak(), eat()
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              [[Prototype]]: Object.prototype
            </p>
          </div>
          
          <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>↑</div>
          
          <div style={{ 
            padding: '16px', 
            border: '2px solid var(--accent-green)',
            borderRadius: '8px',
            background: 'rgba(34, 197, 94, 0.1)'
          }}>
            <strong style={{ color: 'var(--accent-green)' }}>dog (экземпляр)</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              name: "Rex"
            </p>
            <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              [[Prototype]]: Animal.prototype
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🔗 __proto__ vs prototype</h3>
        <CodeBlock code={`function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound');
};

const dog = new Animal('Rex');

// __proto__ — ссылка экземпляра на прототип
console.log(dog.__proto__ === Animal.prototype); // true

// prototype — свойство функции-конструктора
console.log(Animal.prototype); // { speak: f, constructor: Animal }

// Современный способ получить/установить прототип
console.log(Object.getPrototypeOf(dog) === Animal.prototype); // true

// Цепочка до Object.prototype
console.log(dog.__proto__.__proto__ === Object.prototype); // true
console.log(dog.__proto__.__proto__.__proto__); // null`} />
      </div>

      <div className="card">
        <h3>🏗️ Создание объектов</h3>
        <CodeBlock code={`// 1. Object literal
const obj1 = { a: 1 };
// obj1.__proto__ === Object.prototype

// 2. Object.create()
const proto = { greet() { return 'Hi!' } };
const obj2 = Object.create(proto);
console.log(obj2.greet()); // 'Hi!'
// obj2.__proto__ === proto

// 3. Object.create(null) — "чистый" объект
const dict = Object.create(null);
dict.key = 'value';
console.log(dict.toString); // undefined — нет прототипа!

// 4. Constructor function
function Person(name) {
  this.name = name;
}
const person = new Person('John');
// person.__proto__ === Person.prototype

// 5. ES6 Class
class Animal {
  constructor(name) {
    this.name = name;
  }
}
const animal = new Animal('Dog');
// animal.__proto__ === Animal.prototype`} />
      </div>

      <div className="card">
        <h3>📦 Наследование через прототипы</h3>
        <CodeBlock code={`// ES5 способ
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(this.name + ' makes a sound');
};

function Dog(name, breed) {
  Animal.call(this, name); // Вызов родительского конструктора
  this.breed = breed;
}

// Устанавливаем цепочку прототипов
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Восстанавливаем constructor

Dog.prototype.bark = function() {
  console.log(this.name + ' barks!');
};

const rex = new Dog('Rex', 'German Shepherd');
rex.speak(); // 'Rex makes a sound'
rex.bark();  // 'Rex barks!'

console.log(rex instanceof Dog);    // true
console.log(rex instanceof Animal); // true`} />
      </div>

      <div className="card">
        <h3>🎓 ES6 Classes (синтаксический сахар)</h3>
        <CodeBlock code={`class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a sound');
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Вызов Animal constructor
    this.breed = breed;
  }
  
  bark() {
    console.log(this.name + ' barks!');
  }
  
  // Переопределение метода
  speak() {
    super.speak(); // Вызов родительского метода
    console.log('Woof!');
  }
}

// Под капотом — те же прототипы!
console.log(typeof Dog); // 'function'
console.log(Dog.prototype.__proto__ === Animal.prototype); // true`} />
      </div>

      <div className="card">
        <h3>🔍 Полезные методы</h3>
        <CodeBlock code={`const obj = { a: 1 };

// Проверка собственного свойства
obj.hasOwnProperty('a');        // true
obj.hasOwnProperty('toString'); // false (унаследовано)

// Современная альтернатива
Object.hasOwn(obj, 'a');        // true

// Проверка наличия (включая цепочку)
'a' in obj;        // true
'toString' in obj; // true

// Получение всех ключей
Object.keys(obj);                  // ['a'] — только собственные
Object.getOwnPropertyNames(obj);   // ['a'] — включая non-enumerable

// Проверка прототипа
Animal.prototype.isPrototypeOf(rex); // true

// instanceof проверяет всю цепочку
rex instanceof Dog;    // true
rex instanceof Animal; // true
rex instanceof Object; // true`} />
      </div>

      <div className="card">
        <h3>⚠️ Подводные камни</h3>
        <div className="info-box warning">
          <h4>Мутация прототипа</h4>
          <CodeBlock code={`// ❌ Плохо — изменяем встроенные прототипы
Array.prototype.first = function() {
  return this[0];
};
// Может конфликтовать с будущими версиями JS

// ✅ Лучше — utility функция
function first(arr) {
  return arr[0];
}`} />
        </div>
        
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <h4>Свойства на прототипе</h4>
          <CodeBlock code={`function Animal() {}
Animal.prototype.friends = []; // Общий массив!

const dog1 = new Animal();
const dog2 = new Animal();

dog1.friends.push('Cat');
console.log(dog2.friends); // ['Cat'] — тот же массив!

// Исправление — в конструкторе
function Animal() {
  this.friends = []; // Собственный массив для каждого
}`} />
        </div>
      </div>

      <div className="card">
        <h3>💡 Шпаргалка</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Выражение</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Результат</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>obj.__proto__</code></td>
                <td style={{ padding: '12px' }}>Прототип объекта</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>Func.prototype</code></td>
                <td style={{ padding: '12px' }}>Прототип для экземпляров</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>Object.create(proto)</code></td>
                <td style={{ padding: '12px' }}>Создать объект с прототипом</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>Object.getPrototypeOf(obj)</code></td>
                <td style={{ padding: '12px' }}>Получить прототип</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}><code>Object.setPrototypeOf(obj, proto)</code></td>
                <td style={{ padding: '12px' }}>Установить прототип (медленно!)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
