import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ThisDemo() {
  const [result, setResult] = useState('')

  const runExample = (example: string) => {
    let output = ''
    
    if (example === 'global') {
      output = 'В браузере: window\nВ strict mode: undefined'
    } else if (example === 'method') {
      const obj = {
        name: 'Object',
        getName() { return this.name }
      }
      output = `obj.getName() = "${obj.getName()}"`
    } else if (example === 'arrow') {
      output = 'Arrow function берёт this из места определения (лексически)'
    } else if (example === 'constructor') {
      output = 'В конструкторе this = новый создаваемый объект'
    }
    
    setResult(output)
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>👆 this в JavaScript</h1>
        <p>
          this — специальное ключевое слово, которое ссылается на объект, 
          в контексте которого выполняется код. Значение this определяется <strong> в момент вызова</strong>, не в момент объявления.
        </p>
      </div>

      <div className="card">
        <h3>🎯 Правила определения this</h3>
        <div className="timeline" style={{ marginTop: '16px' }}>
          <div className="timeline-item">
            <strong>1. new</strong> → новый созданный объект
          </div>
          <div className="timeline-item">
            <strong>2. bind/call/apply</strong> → явно переданный объект
          </div>
          <div className="timeline-item">
            <strong>3. obj.method()</strong> → объект перед точкой
          </div>
          <div className="timeline-item">
            <strong>4. По умолчанию</strong> → window / undefined (strict mode)
          </div>
          <div className="timeline-item">
            <strong>5. Arrow function</strong> → лексический this (от родителя)
          </div>
        </div>
      </div>

      <div className="card">
        <h3>🌐 Глобальный контекст</h3>
        <CodeBlock code={`// В браузере (не strict mode)
console.log(this); // window

// В strict mode
'use strict';
function test() {
  console.log(this); // undefined
}
test();

// В модулях (ESM всегда strict)
console.log(this); // undefined`} />
      </div>

      <div className="card">
        <h3>📦 Метод объекта</h3>
        <CodeBlock code={`const user = {
  name: 'John',
  greet() {
    console.log('Hello, ' + this.name);
  },
  greetArrow: () => {
    // Arrow function НЕ имеет своего this!
    console.log('Hello, ' + this.name); // undefined или window.name
  }
};

user.greet();      // 'Hello, John' ✅
user.greetArrow(); // 'Hello, undefined' ❌

// Потеря контекста
const greet = user.greet;
greet(); // 'Hello, undefined' — this потерян!`} />
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>Частая ошибка:</strong> При передаче метода как callback, this теряется.
        </div>
      </div>

      <div className="card">
        <h3>➡️ Arrow Functions</h3>
        <CodeBlock code={`const obj = {
  name: 'Object',
  
  // Обычная функция
  regular() {
    console.log(this.name); // 'Object'
    
    // Вложенная обычная функция
    function inner() {
      console.log(this.name); // undefined (свой this)
    }
    inner();
    
    // Arrow function берёт this из regular()
    const arrowInner = () => {
      console.log(this.name); // 'Object' ✅
    };
    arrowInner();
  },
  
  // Arrow как метод — плохая идея!
  arrow: () => {
    console.log(this.name); // undefined (this от глобального scope)
  }
};`} />
        <div className="info-box success" style={{ marginTop: '16px' }}>
          <strong>Правило:</strong> Используйте arrow functions для callback'ов внутри методов, 
          но не как сами методы объекта.
        </div>
      </div>

      <div className="card">
        <h3>🏗️ Конструкторы и классы</h3>
        <CodeBlock code={`// Function constructor
function Person(name) {
  this.name = name;
  // this = новый объект, созданный new
}
const john = new Person('John');
console.log(john.name); // 'John'

// ES6 Class
class Animal {
  constructor(type) {
    this.type = type;
  }
  
  speak() {
    console.log(this.type + ' makes a sound');
  }
  
  // Автоматическая привязка через arrow
  speakArrow = () => {
    console.log(this.type + ' (arrow)');
  }
}

const dog = new Animal('Dog');
const speak = dog.speak;
speak(); // TypeError или undefined

const speakArrow = dog.speakArrow;
speakArrow(); // 'Dog (arrow)' ✅`} />
      </div>

      <div className="card">
        <h3>🎭 Практические примеры</h3>
        
        <h4 style={{ marginTop: '16px' }}>Event handlers</h4>
        <CodeBlock code={`class Button {
  constructor(label) {
    this.label = label;
  }
  
  // ❌ this будет элементом DOM
  handleClick() {
    console.log(this.label);
  }
  
  // ✅ Arrow сохраняет this
  handleClickArrow = () => {
    console.log(this.label);
  }
  
  // ✅ Или привязка в конструкторе
  constructor(label) {
    this.label = label;
    this.handleClick = this.handleClick.bind(this);
  }
}`} />

        <h4 style={{ marginTop: '16px' }}>setTimeout / setInterval</h4>
        <CodeBlock code={`const timer = {
  seconds: 0,
  
  // ❌ this потеряется
  startBroken() {
    setInterval(function() {
      this.seconds++; // this = window
    }, 1000);
  },
  
  // ✅ Arrow function
  startArrow() {
    setInterval(() => {
      this.seconds++; // this = timer
    }, 1000);
  },
  
  // ✅ bind
  startBind() {
    setInterval(function() {
      this.seconds++;
    }.bind(this), 1000);
  }
};`} />
      </div>

      <div className="card">
        <h3>📊 Шпаргалка по this</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Как вызвана</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>this равен</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>func()</code></td>
                <td style={{ padding: '12px' }}>window / undefined</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>obj.method()</code></td>
                <td style={{ padding: '12px' }}>obj</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>new Func()</code></td>
                <td style={{ padding: '12px' }}>новый объект</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>func.call(obj)</code></td>
                <td style={{ padding: '12px' }}>obj</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}><code>func.bind(obj)()</code></td>
                <td style={{ padding: '12px' }}>obj</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}><code>() ={'>'}  ...</code></td>
                <td style={{ padding: '12px' }}>от родительского scope</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Interview Questions */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🎤 Вопросы на собеседовании</span>
          <span className="card-badge">Интервью</span>
        </div>
        
        <div style={{ display: 'grid', gap: '16px', marginTop: '16px' }}>
          <details className="interview-question">
            <summary>Что выведет этот код?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`const obj = {
  name: 'Alice',
  greet: function() {
    return () => console.log(this.name);
  }
};

const greet = obj.greet();
greet();`} />
              <p style={{ color: 'var(--accent-green)', marginTop: '12px' }}>
                <strong>Ответ: "Alice"</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Arrow function внутри greet() захватывает this из момента создания. 
                Когда obj.greet() вызывается, this = obj, и arrow function его запоминает.
              </p>
            </div>
          </details>

          <details className="interview-question">
            <summary>Можно ли изменить this у arrow function через bind?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`const arrow = () => console.log(this);

const bound = arrow.bind({ name: 'John' });
bound(); // Что выведет?`} />
              <p style={{ color: 'var(--accent-red)', marginTop: '12px' }}>
                <strong>Ответ: НЕТ, bind не работает с arrow functions!</strong>
              </p>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Arrow function не имеет собственного this. Она берёт его из лексического 
                окружения и его нельзя изменить. bind/call/apply просто игнорируются.
              </p>
            </div>
          </details>

          <details className="interview-question">
            <summary>Почему setTimeout теряет контекст и как это исправить?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <CodeBlock code={`const user = {
  name: 'Bob',
  greet() {
    setTimeout(function() {
      console.log(this.name); // undefined!
    }, 100);
  }
};

// Решения:
// 1. Arrow function
setTimeout(() => console.log(this.name), 100);

// 2. bind
setTimeout(function() {
  console.log(this.name);
}.bind(this), 100);

// 3. Сохранить this в переменную
const self = this;
setTimeout(function() {
  console.log(self.name);
}, 100);`} />
            </div>
          </details>

          <details className="interview-question">
            <summary>Что такое "потеря контекста" и когда это происходит?</summary>
            <div style={{ padding: '16px', background: 'var(--bg-code)', marginTop: '8px', borderRadius: '8px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>
                <strong>Потеря контекста</strong> — когда метод объекта вызывается 
                без объекта перед точкой:
              </p>
              <CodeBlock code={`const obj = {
  name: 'John',
  greet() { console.log(this.name); }
};

obj.greet();        // 'John' ✅

const fn = obj.greet;
fn();               // undefined ❌ — потеря контекста!

// Происходит при:
// - Передаче метода как callback
// - Присваивании метода в переменную
// - Деструктуризации методов`} />
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
