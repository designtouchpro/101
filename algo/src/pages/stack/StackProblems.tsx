import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function StackProblems() {
  const [bracketInput, setBracketInput] = useState('({[]})')
  const [bracketResult, setBracketResult] = useState<{ valid: boolean; steps: string[] } | null>(null)

  const checkBrackets = (s: string) => {
    const stack: string[] = []
    const map: Record<string, string> = { ')': '(', ']': '[', '}': '{' }
    const steps: string[] = []

    for (const ch of s) {
      if ('([{'.includes(ch)) {
        stack.push(ch)
        steps.push(`Push '${ch}' → стек: [${stack.join(', ')}]`)
      } else if (')]}}'.includes(ch)) {
        if (stack.length === 0 || stack[stack.length - 1] !== map[ch]) {
          steps.push(`❌ '${ch}' — нет пары, стек: [${stack.join(', ')}]`)
          return { valid: false, steps }
        }
        stack.pop()
        steps.push(`Pop '${map[ch]}' для '${ch}' → стек: [${stack.join(', ')}]`)
      }
    }

    const valid = stack.length === 0
    steps.push(valid ? '✅ Стек пуст — валидная последовательность!' : `❌ Стек не пуст: [${stack.join(', ')}]`)
    return { valid, steps }
  }

  const [monotonicArr] = useState([2, 1, 5, 6, 2, 3])
  const [monotonicResult, setMonotonicResult] = useState<number[] | null>(null)

  const nextGreaterElement = (arr: number[]): number[] => {
    const result = new Array(arr.length).fill(-1)
    const stack: number[] = []

    for (let i = 0; i < arr.length; i++) {
      while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
        const idx = stack.pop()!
        result[idx] = arr[i]
      }
      stack.push(i)
    }
    return result
  }

  return (
    <div className="page-container">
      <h1>🧩 Задачи на стек</h1>
      <p className="page-description">
        Классические задачи, которые решаются с помощью стека.
        Часто встречаются на собеседованиях.
      </p>

      {/* Скобки */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📐 Valid Parentheses (LeetCode #20)</span>
          <span className="card-badge">Easy</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Дана строка из скобок <code>()[]&#123;&#125;</code>. Определить, является ли она валидной.
        </p>

        <div className="controls">
          <input
            className="input"
            value={bracketInput}
            onChange={e => setBracketInput(e.target.value)}
            placeholder="Введите скобки..."
            style={{ width: '200px', fontFamily: 'monospace' }}
          />
          <button
            className="btn btn-primary"
            onClick={() => setBracketResult(checkBrackets(bracketInput))}
          >
            Проверить
          </button>
        </div>

        {bracketResult && (
          <div style={{ marginTop: '16px' }}>
            <div className={`info-box ${bracketResult.valid ? 'success' : 'error'}`}>
              <strong>{bracketResult.valid ? '✅ Валидная' : '❌ Невалидная'}</strong> последовательность
            </div>
            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {bracketResult.steps.map((step, i) => (
                <div key={i} style={{
                  padding: '8px 12px',
                  background: 'var(--bg-code)',
                  borderRadius: '6px',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)'
                }}>
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}

        <CodeBlock language="typescript" title="valid-parentheses.ts" code={`
function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(', ']': '[', '}': '{'
  };

  for (const ch of s) {
    if ('([{'.includes(ch)) {
      stack.push(ch);            // открывающая → в стек
    } else {
      if (stack.pop() !== map[ch]) {
        return false;            // нет пары
      }
    }
  }

  return stack.length === 0;     // стек должен быть пуст
}
`} />
      </div>

      {/* Min Stack */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📉 Min Stack (LeetCode #155)</span>
          <span className="card-badge">Medium</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Реализовать стек с поддержкой <code>getMin()</code> за O(1).
          Идея: храним два стека — основной и стек минимумов.
        </p>

        <CodeBlock language="typescript" title="min-stack.ts" code={`
class MinStack {
  private stack: number[] = [];
  private minStack: number[] = [];  // хранит текущие минимумы

  push(val: number): void {
    this.stack.push(val);
    // Кладём в minStack если новый минимум
    const currentMin = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(currentMin);
  }

  pop(): void {
    this.stack.pop();
    this.minStack.pop();  // удаляем и минимум
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  getMin(): number {
    return this.minStack[this.minStack.length - 1];  // O(1)!
  }
}

// push(5) → stack: [5], min: [5]
// push(3) → stack: [5,3], min: [5,3]
// push(7) → stack: [5,3,7], min: [5,3,3]
// getMin() → 3
// pop()   → stack: [5,3], min: [5,3]
// getMin() → 3
`} />
      </div>

      {/* Monotonic Stack */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">📊 Монотонный стек — Next Greater Element</span>
          <span className="card-badge">Medium</span>
        </div>

        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
          Для каждого элемента найти следующий больший элемент справа.
          Монотонный стек — стек, элементы которого упорядочены (убывают или возрастают).
        </p>

        <div className="controls">
          <div style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
            Массив: [{monotonicArr.join(', ')}]
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setMonotonicResult(nextGreaterElement(monotonicArr))}
          >
            Вычислить
          </button>
        </div>

        {monotonicResult && (
          <div style={{ marginTop: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${monotonicArr.length}, 1fr)`, gap: '8px', textAlign: 'center' }}>
              {monotonicArr.map((val, i) => (
                <div key={i}>
                  <div style={{
                    padding: '12px',
                    background: 'var(--bg-code)',
                    borderRadius: '8px 8px 0 0',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}>{val}</div>
                  <div style={{ padding: '2px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>↓</div>
                  <div style={{
                    padding: '12px',
                    background: monotonicResult[i] === -1 ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
                    borderRadius: '0 0 8px 8px',
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    color: monotonicResult[i] === -1 ? 'var(--accent-red)' : 'var(--accent-green)'
                  }}>{monotonicResult[i]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <CodeBlock language="typescript" title="next-greater-element.ts" code={`
function nextGreaterElement(nums: number[]): number[] {
  const result = new Array(nums.length).fill(-1);
  const stack: number[] = [];  // хранит индексы!

  for (let i = 0; i < nums.length; i++) {
    // Пока текущий элемент > вершины стека
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      const idx = stack.pop()!;
      result[idx] = nums[i];  // нашли next greater
    }
    stack.push(i);
  }

  return result;
}

// [2, 1, 5, 6, 2, 3]
// → [5, 5, 6, -1, 3, -1]
`} />

        <div className="info-box">
          <strong>💡 Паттерн:</strong> Монотонный стек используется когда нужно найти
          ближайший элемент, удовлетворяющий условию (больше/меньше), слева или справа.
          Сложность: O(n) — каждый элемент попадает в стек и извлекается максимум один раз.
        </div>
      </div>

      {/* RPN */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">🔤 Обратная польская нотация (RPN)</span>
          <span className="card-badge">Medium</span>
        </div>

        <CodeBlock language="typescript" title="rpn-calculator.ts" code={`
// Evaluate Reverse Polish Notation (LeetCode #150)
// Постфиксная нотация: "3 4 + 2 *" = (3 + 4) * 2 = 14

function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  const ops: Record<string, (a: number, b: number) => number> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (token in ops) {
      const b = stack.pop()!;  // второй операнд
      const a = stack.pop()!;  // первый операнд
      stack.push(ops[token](a, b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
}

// evalRPN(["2","1","+","3","*"]) → 9
// Шаги: push 2, push 1, pop 1&2 → push 3,
//        push 3, pop 3&3 → push 9
`} />
      </div>
    </div>
  )
}
