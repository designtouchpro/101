import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface CloneResult {
  method: string
  verdict: 'error' | 'ref' | 'shallow' | 'ok' | 'partial'
  verdictText: string
  original: string
  copy: string
  explanation: string
}

function safeStringify(obj: any): string {
  return JSON.stringify(obj, (_, v) => {
    if (typeof v === 'function') return '() => {...}'
    if (v instanceof Date) return `[Date] ${v.toISOString()}`
    return v
  }, 2)
}

export default function DeepCloneDemo() {
  const [result, setResult] = useState<CloneResult | null>(null)

  const runTest = (method: 'assignment' | 'spread' | 'json' | 'recursivedeep') => {
    const original = {
      name: 'User',
      details: {
        age: 30,
        settings: { theme: 'dark' }
      },
      date: new Date(),
      sayHi: () => console.log('Hi')
    }

    let copy: any
    let res: CloneResult

    try {
      if (method === 'assignment') {
        copy = original
        copy.details.age = 99
        copy.name = 'Changed'
        res = {
          method: 'const copy = original',
          verdict: 'ref',
          verdictText: '❌ Это та же ссылка, а не копия!',
          original: safeStringify(original),
          copy: safeStringify(copy),
          explanation: 'copy === original → true. Изменяя copy, мы меняем original.'
        }
      } else if (method === 'spread') {
        copy = { ...original }
        copy.details.age = 99
        copy.name = 'Changed'
        res = {
          method: 'const copy = { ...original }',
          verdict: 'shallow',
          verdictText: '⚠️ Shallow — вложенные объекты не копируются',
          original: safeStringify(original),
          copy: safeStringify(copy),
          explanation: 'copy.name ≠ original.name (ОК), но copy.details === original.details (мутация!)'
        }
      } else if (method === 'json') {
        copy = JSON.parse(JSON.stringify(original))
        copy.details.age = 99
        copy.name = 'Changed'
        res = {
          method: 'const copy = JSON.parse(JSON.stringify(original))',
          verdict: 'partial',
          verdictText: '⚠️ Глубокая, но теряет Date и функции',
          original: safeStringify(original),
          copy: safeStringify(copy),
          explanation: `date: ${original.date.constructor.name} → ${typeof copy.date} (String!), sayHi: пропала`
        }
      } else {
        copy = structuredClone(original)
        copy.details.age = 99
        copy.name = 'Changed'
        res = {
          method: 'const copy = structuredClone(original)',
          verdict: 'ok',
          verdictText: '✅ Полная глубокая копия (кроме функций)',
          original: safeStringify(original),
          copy: safeStringify(copy),
          explanation: `original не изменился! date сохранён как ${original.date.constructor.name}. Функции не клонируются (ограничение API).`
        }
      }
    } catch (e: any) {
      res = {
        method,
        verdict: 'error',
        verdictText: '💥 Ошибка: ' + e.message,
        original: '',
        copy: '',
        explanation: e.message
      }
    }
    
    setResult(res)
  }

  const verdictColor: Record<string, string> = {
    ref: '#ef4444',
    shallow: '#f59e0b',
    partial: '#f59e0b',
    ok: '#10b981',
    error: '#ef4444'
  }

  return (
    <div className="page-container">
      <h2>Deep vs Shallow Copy</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3>Тестовый объект</h3>
          <CodeBlock code={`const original = {
  name: 'User',
  details: {
    age: 30,
    settings: { theme: 'dark' }
  },
  date: new Date(),
  sayHi: () => console.log('Hi')
}`} language="javascript" />
        </div>

        <div className="card">
          <h3>Методы копирования</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 12 }}>
            Каждый метод скопирует объект, затем изменит copy.name и copy.details.age
          </p>
          <div className="button-group-vertical">
            <button onClick={() => runTest('assignment')}>= (Просто ссылка)</button>
            <button onClick={() => runTest('spread')}>{`{...spread} (Shallow)`}</button>
            <button onClick={() => runTest('json')}>JSON.parse/stringify</button>
            <button onClick={() => runTest('recursivedeep')}>structuredClone()</button>
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="card" style={{ 
            marginTop: 16, 
            borderLeft: `4px solid ${verdictColor[result.verdict]}`,
            padding: '16px 20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <code style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{result.method}</code>
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: verdictColor[result.verdict] }}>
              {result.verdictText}
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              {result.explanation}
            </div>
          </div>

          <div className="grid-2" style={{ marginTop: 16 }}>
            <div className="card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                📋 original
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: 4,
                  background: result.verdict === 'ref' || result.verdict === 'shallow' 
                    ? 'rgba(239,68,68,0.15)' 
                    : 'rgba(16,185,129,0.15)',
                  color: result.verdict === 'ref' || result.verdict === 'shallow' 
                    ? '#ef4444' 
                    : '#10b981'
                }}>
                  {result.verdict === 'ref' ? 'МУТИРОВАН!' : 
                   result.verdict === 'shallow' ? 'details мутирован!' : 
                   'не изменён'}
                </span>
              </h3>
              <CodeBlock code={result.original} language="json" />
            </div>
            <div className="card">
              <h3>📝 copy</h3>
              <CodeBlock code={result.copy} language="json" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
