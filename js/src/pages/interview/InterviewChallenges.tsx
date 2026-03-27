import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface Challenge {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  question: string
  code: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const challenges: Challenge[] = [
  {
    id: 1,
    title: 'Promise + setTimeout',
    difficulty: 'easy',
    category: 'Event Loop',
    question: 'Что выведется в консоль?',
    code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
    options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '1, 3, 4, 2'],
    correctAnswer: 1,
    explanation: 'Синхронный код (1, 4) выполняется первым. Promise.then() — микрозадача, выполняется до setTimeout (макрозадача).'
  },
  {
    id: 2,
    title: 'var в цикле',
    difficulty: 'medium',
    category: 'Closures',
    question: 'Что выведется через 1 секунду?',
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}`,
    options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined, undefined, undefined'],
    correctAnswer: 1,
    explanation: 'var имеет функциональную область видимости. К моменту выполнения таймеров цикл завершился и i = 3.'
  },
  {
    id: 3,
    title: 'this в методе объекта',
    difficulty: 'easy',
    category: 'this',
    question: 'Что выведется?',
    code: `const obj = {
  name: 'Alice',
  greet() {
    console.log(this.name);
  }
};

const greet = obj.greet;
greet();`,
    options: ['Alice', 'undefined', 'TypeError', '""'],
    correctAnswer: 1,
    explanation: 'При вызове функции без контекста (не как метод объекта), this указывает на undefined (strict mode) или window.'
  },
  {
    id: 4,
    title: 'Hoisting',
    difficulty: 'easy',
    category: 'Hoisting',
    question: 'Что выведется?',
    code: `console.log(x);
var x = 5;
console.log(x);`,
    options: ['ReferenceError, 5', 'undefined, 5', '5, 5', 'undefined, undefined'],
    correctAnswer: 1,
    explanation: 'Объявление var поднимается (hoisting), но не присваивание. Первый console.log видит x как undefined.'
  },
  {
    id: 5,
    title: 'Promise chain',
    difficulty: 'medium',
    category: 'Promises',
    question: 'Что выведется?',
    code: `Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('Oops'); })
  .then(x => console.log('A:', x))
  .catch(e => console.log('B'))
  .then(() => console.log('C'));`,
    options: ['A: 2, C', 'B, C', 'A: 2, B, C', 'Error: Oops'],
    correctAnswer: 1,
    explanation: 'Ошибка в .then() переходит в .catch(). После .catch() цепочка продолжается, поэтому выводится B, затем C.'
  },
  {
    id: 6,
    title: 'Замыкание и счётчик',
    difficulty: 'easy',
    category: 'Closures',
    question: 'Что выведется при вызовах counter()?',
    code: `function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());`,
    options: ['1, 1, 1', '1, 2, 3', '0, 1, 2', 'undefined, undefined, undefined'],
    correctAnswer: 1,
    explanation: 'Замыкание сохраняет ссылку на переменную count. Каждый вызов увеличивает её на 1.'
  },
  {
    id: 7,
    title: 'async/await порядок',
    difficulty: 'hard',
    category: 'Event Loop',
    question: 'Что выведется?',
    code: `async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
foo();
console.log('4');`,
    options: ['3, 1, 4, 2', '3, 1, 2, 4', '1, 3, 4, 2', '3, 4, 1, 2'],
    correctAnswer: 0,
    explanation: 'Синхронно: 3, затем вызов foo() выводит 1, встречает await и откладывает остаток. Синхронно: 4. Затем микрозадача: 2.'
  },
  {
    id: 8,
    title: 'typeof и null',
    difficulty: 'easy',
    category: 'Types',
    question: 'Что выведется?',
    code: `console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);`,
    options: ['null, undefined, NaN', 'object, undefined, number', 'null, undefined, number', 'object, object, number'],
    correctAnswer: 1,
    explanation: 'typeof null — известный баг JS, возвращает "object". typeof undefined — "undefined". NaN — это число, поэтому "number".'
  },
  {
    id: 9,
    title: '== vs ===',
    difficulty: 'medium',
    category: 'Types',
    question: 'Какие сравнения вернут true?',
    code: `console.log(1 == '1');
console.log(1 === '1');
console.log(null == undefined);
console.log(null === undefined);`,
    options: ['true, true, true, true', 'true, false, true, false', 'false, false, true, true', 'true, false, false, false'],
    correctAnswer: 1,
    explanation: '== выполняет приведение типов. === требует идентичность типов. null == undefined — специальное правило в JS.'
  },
  {
    id: 10,
    title: 'Arrow function и this',
    difficulty: 'medium',
    category: 'this',
    question: 'Что выведется?',
    code: `const obj = {
  name: 'Bob',
  regular: function() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};

obj.regular();
obj.arrow();`,
    options: ['Bob, Bob', 'Bob, undefined', 'undefined, Bob', 'undefined, undefined'],
    correctAnswer: 1,
    explanation: 'regular function берёт this из вызова (obj). Arrow function берёт this из лексического окружения (window/undefined).'
  },
  {
    id: 11,
    title: 'Микро в микро',
    difficulty: 'hard',
    category: 'Event Loop',
    question: 'Что выведется?',
    code: `Promise.resolve().then(() => {
  console.log('1');
  Promise.resolve().then(() => console.log('2'));
});

Promise.resolve().then(() => console.log('3'));

console.log('4');`,
    options: ['4, 1, 3, 2', '4, 1, 2, 3', '4, 3, 1, 2', '1, 3, 4, 2'],
    correctAnswer: 0,
    explanation: 'Синхронно: 4. Микрозадачи: 1 (создаёт новую микрозадачу для 2), 3, 2. Вложенная микрозадача добавляется в конец очереди.'
  },
  {
    id: 12,
    title: 'Spread и копирование',
    difficulty: 'medium',
    category: 'ES6',
    question: 'Что выведется?',
    code: `const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { ...obj1 };

obj2.a = 10;
obj2.b.c = 20;

console.log(obj1.a);
console.log(obj1.b.c);`,
    options: ['1, 2', '10, 20', '1, 20', '10, 2'],
    correctAnswer: 2,
    explanation: 'Spread создаёт поверхностную копию. Примитив a копируется. Вложенный объект b — это ссылка, поэтому изменения видны в оригинале.'
  }
]

export default function InterviewChallenges() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<string>('all')

  const filteredChallenges = filter === 'all' 
    ? challenges 
    : challenges.filter(c => c.category === filter)

  const current = filteredChallenges[currentIndex] || challenges[0]
  const categories = ['all', ...new Set(challenges.map(c => c.category))]

  const handleAnswer = (index: number) => {
    if (showExplanation) return
    
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (!answeredQuestions.has(current.id)) {
      setAnsweredQuestions(new Set([...answeredQuestions, current.id]))
      if (index === current.correctAnswer) {
        setScore(score + 1)
      }
    }
  }

  const nextQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCurrentIndex((currentIndex + 1) % filteredChallenges.length)
  }

  const prevQuestion = () => {
    setSelectedAnswer(null)
    setShowExplanation(false)
    setCurrentIndex((currentIndex - 1 + filteredChallenges.length) % filteredChallenges.length)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'var(--accent-green)'
      case 'medium': return 'var(--accent-orange)'
      case 'hard': return 'var(--accent-red)'
      default: return 'var(--text-secondary)'
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎯 Задачи на собеседовании</h1>
        <p>
          Практикуйся с реальными вопросами, которые задают на JavaScript собеседованиях.
          Выбери ответ и проверь своё понимание!
        </p>
      </div>

      {/* Score & Filter */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ 
            padding: '12px 24px', 
            background: 'var(--bg-code)', 
            borderRadius: '8px',
            display: 'flex',
            gap: '24px'
          }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Счёт</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-green)' }}>
                {score} / {answeredQuestions.size}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Прогресс</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>
                {answeredQuestions.size} / {challenges.length}
              </div>
            </div>
          </div>
          
          <div className="controls">
            <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>Категория:</span>
            <select 
              className="select"
              value={filter}
              onChange={(e) => { setFilter(e.target.value); setCurrentIndex(0); }}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'Все темы' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title">{current.title}</span>
            <span style={{ 
              marginLeft: '12px', 
              padding: '4px 12px', 
              borderRadius: '12px',
              fontSize: '0.75rem',
              background: `${getDifficultyColor(current.difficulty)}22`,
              color: getDifficultyColor(current.difficulty)
            }}>
              {current.difficulty}
            </span>
          </div>
          <span className="card-badge">{current.category}</span>
        </div>

        <div style={{ marginTop: '16px' }}>
          <h4 style={{ marginBottom: '12px' }}>{current.question}</h4>
          <CodeBlock code={current.code} />
        </div>

        {/* Options */}
        <div style={{ marginTop: '24px', display: 'grid', gap: '12px' }}>
          {current.options.map((option, index) => {
            let bgColor = 'var(--bg-code)'
            let borderColor = 'transparent'
            
            if (showExplanation) {
              if (index === current.correctAnswer) {
                bgColor = 'rgba(34, 197, 94, 0.2)'
                borderColor = 'var(--accent-green)'
              } else if (index === selectedAnswer) {
                bgColor = 'rgba(239, 68, 68, 0.2)'
                borderColor = 'var(--accent-red)'
              }
            } else if (selectedAnswer === index) {
              borderColor = 'var(--accent-yellow)'
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  padding: '16px 20px',
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: '8px',
                  cursor: showExplanation ? 'default' : 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: showExplanation && index === current.correctAnswer 
                    ? 'var(--accent-green)' 
                    : 'var(--bg-elevated)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 'bold'
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <code style={{ fontFamily: 'monospace' }}>{option}</code>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div style={{ 
            marginTop: '24px', 
            padding: '20px', 
            background: selectedAnswer === current.correctAnswer 
              ? 'rgba(34, 197, 94, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            borderLeft: `4px solid ${selectedAnswer === current.correctAnswer ? 'var(--accent-green)' : 'var(--accent-red)'}`
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '8px',
              color: selectedAnswer === current.correctAnswer ? 'var(--accent-green)' : 'var(--accent-red)'
            }}>
              {selectedAnswer === current.correctAnswer ? '✅ Правильно!' : '❌ Неправильно'}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {current.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div style={{ 
          marginTop: '24px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button className="btn btn-secondary" onClick={prevQuestion}>
            ← Предыдущий
          </button>
          
          <span style={{ color: 'var(--text-muted)' }}>
            {currentIndex + 1} / {filteredChallenges.length}
          </span>
          
          <button className="btn btn-primary" onClick={nextQuestion}>
            Следующий →
          </button>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="card" style={{ marginTop: '24px' }}>
        <h4 style={{ marginBottom: '16px' }}>Все вопросы</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {filteredChallenges.map((challenge, index) => {
            const isAnswered = answeredQuestions.has(challenge.id)
            const isCurrent = index === currentIndex
            
            return (
              <button
                key={challenge.id}
                onClick={() => {
                  setCurrentIndex(index)
                  setSelectedAnswer(null)
                  setShowExplanation(false)
                }}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  border: isCurrent ? '2px solid var(--accent-yellow)' : '1px solid var(--border-color)',
                  background: isAnswered ? 'var(--accent-green)' : 'var(--bg-code)',
                  color: isAnswered ? 'white' : 'var(--text-primary)',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {index + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
