import CodeBlock from '../../components/CodeBlock'

export default function ScopeDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🔍 Область видимости (Scope)</h1>
        <p>
          Scope определяет доступность переменных. JavaScript имеет три типа scope: 
          глобальный, функциональный и блочный.
        </p>
      </div>

      <div className="card">
        <h3>🌍 Типы Scope</h3>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px', 
          marginTop: '16px' 
        }}>
          <div style={{
            border: '3px solid var(--accent-red)',
            borderRadius: '12px',
            padding: '16px',
            background: 'rgba(239, 68, 68, 0.05)'
          }}>
            <h4 style={{ color: 'var(--accent-red)' }}>🌐 Global Scope</h4>
            <CodeBlock code={`var globalVar = 'I am global';
let globalLet = 'Also global';

// Доступны везде в программе
console.log(window.globalVar); // 'I am global'
console.log(window.globalLet); // undefined (let не добавляется в window)`} />
            
            <div style={{
              border: '3px solid var(--accent-purple)',
              borderRadius: '12px',
              padding: '16px',
              marginTop: '16px',
              background: 'rgba(168, 85, 247, 0.05)'
            }}>
              <h4 style={{ color: 'var(--accent-purple)' }}>📦 Function Scope</h4>
              <CodeBlock code={`function outer() {
  var functionScoped = 'Only in function';
  
  // Block Scope внутри функции
  if (true) {
    let blockScoped = 'Only in block';
    const alsoBlock = 'Also only in block';
    var stillFunction = 'var ignores blocks!';
  }
  
  console.log(functionScoped);  // ✅
  console.log(stillFunction);   // ✅ var "всплывает" к функции
  // console.log(blockScoped);  // ❌ ReferenceError
}`} />
              
              <div style={{
                border: '3px solid var(--accent-green)',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '16px',
                background: 'rgba(34, 197, 94, 0.05)'
              }}>
                <h4 style={{ color: 'var(--accent-green)' }}>🔲 Block Scope</h4>
                <CodeBlock code={`{
  let blockLet = 'block only';
  const blockConst = 'also block';
}
// blockLet недоступен здесь`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>⛓️ Цепочка областей видимости (Scope Chain)</h3>
        <CodeBlock code={`const global = 'global';

function outer() {
  const outerVar = 'outer';
  
  function inner() {
    const innerVar = 'inner';
    
    // inner видит всё:
    console.log(innerVar);  // 'inner'  - свой scope
    console.log(outerVar);  // 'outer'  - родительский scope
    console.log(global);    // 'global' - глобальный scope
  }
  
  inner();
  // console.log(innerVar); // ❌ Error - inner scope недоступен
}

outer();`} />
        
        <div className="info-box" style={{ marginTop: '16px' }}>
          <strong>Правило:</strong> Поиск переменной идёт от текущего scope вверх по цепочке 
          до глобального. Если не найдено — ReferenceError.
        </div>
      </div>

      <div className="card">
        <h3>📊 Лексическое окружение (Lexical Environment)</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Каждый scope создаёт Lexical Environment — объект со всеми переменными и ссылкой на родительский environment.
        </p>
        <CodeBlock code={`// Lexical Environment визуально:
/*
GlobalEnvironment: {
  outer: <function>,
  [[OuterEnv]]: null
}

outerEnvironment: {
  a: 10,
  inner: <function>,
  [[OuterEnv]]: GlobalEnvironment
}

innerEnvironment: {
  b: 20,
  [[OuterEnv]]: outerEnvironment
}
*/

function outer() {
  let a = 10;
  
  function inner() {
    let b = 20;
    console.log(a + b); // 30
  }
  
  inner();
}`} />
      </div>

      <div className="card">
        <h3>🔄 var vs let vs const</h3>
        <div style={{ overflowX: 'auto' }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '16px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}></th>
                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-red)' }}>var</th>
                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-purple)' }}>let</th>
                <th style={{ padding: '12px', textAlign: 'center', color: 'var(--accent-green)' }}>const</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Scope</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Function</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Block</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>Block</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Hoisting</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>undefined</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>TDZ</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>TDZ</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '12px' }}>Переприсвоение</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>❌</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>Повторное объявление</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>✅</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>❌</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <h3>⚡ Пример работы scope</h3>
        <CodeBlock code={`let x = 1;

function first() {
  let x = 2;
  second();
}

function second() {
  console.log(x);
}

first(); // Что выведет?`} />
        <div className="info-box success" style={{ marginTop: '16px' }}>
          <strong>Ответ: 1</strong>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            JavaScript использует <strong>лексическое</strong> (статическое) связывание. 
            Scope функции second определяется там, где она была <em>объявлена</em>, 
            а не там, где <em>вызвана</em>.
          </p>
        </div>
      </div>

      <div className="card">
        <h3>🎯 Shadowing (затенение)</h3>
        <CodeBlock code={`const name = 'Global';

function greet() {
  const name = 'Local'; // Затеняет глобальную
  console.log(name);    // 'Local'
}

greet();
console.log(name); // 'Global' - глобальная не изменилась`} />
        <div className="info-box warning" style={{ marginTop: '16px' }}>
          <strong>Осторожно:</strong> Затенение может привести к багам, 
          когда вы случайно используете локальную переменную вместо глобальной.
        </div>
      </div>
    </div>
  )
}
