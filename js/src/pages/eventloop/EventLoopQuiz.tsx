import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface QuizQuestion {
  id: number
  code: string
  options: string[]
  correct: number
  explanation: string
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    code: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');`,
    options: ['1, 2, 3, 4', '1, 4, 3, 2', '1, 4, 2, 3', '1, 3, 4, 2'],
    correct: 1,
    explanation: 'Синхронный код (1, 4) выполняется первым. Затем микрозадача Promise (3), и только потом макрозадача setTimeout (2).'
  },
  {
    id: 2,
    code: `setTimeout(() => console.log('1'), 0);
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
Promise.resolve().then(() => console.log('4'));`,
    options: ['1, 2, 3, 4', '3, 4, 1, 2', '1, 3, 2, 4', '3, 1, 4, 2'],
    correct: 1,
    explanation: 'Все микрозадачи (3, 4) выполняются перед макрозадачами (1, 2). Порядок внутри каждой очереди сохраняется.'
  },
  {
    id: 3,
    code: `console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => console.log('3'));
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => console.log('5'), 0);
});

console.log('6');`,
    options: ['1, 6, 4, 2, 3, 5', '1, 6, 4, 2, 5, 3', '1, 6, 2, 4, 3, 5', '1, 6, 4, 5, 2, 3'],
    correct: 0,
    explanation: 'Синхронный: 1, 6. Микрозадача: 4 (добавляет setTimeout 5). Макрозадача: 2 (добавляет микрозадачу 3). Микрозадача: 3. Макрозадача: 5.'
  },
  {
    id: 4,
    code: `async function foo() {
  console.log('1');
  await Promise.resolve();
  console.log('2');
}

console.log('3');
foo();
console.log('4');`,
    options: ['3, 1, 4, 2', '3, 1, 2, 4', '1, 3, 4, 2', '3, 4, 1, 2'],
    correct: 0,
    explanation: 'Синхронно: 3, затем вызов foo() — выводит 1, await приостанавливает. Синхронно: 4. Микрозадача (продолжение foo): 2.'
  },
  {
    id: 5,
    code: `Promise.resolve().then(() => {
  console.log('1');
  return Promise.resolve();
}).then(() => {
  console.log('2');
});

Promise.resolve().then(() => {
  console.log('3');
}).then(() => {
  console.log('4');
});`,
    options: ['1, 3, 2, 4', '1, 2, 3, 4', '1, 3, 4, 2', '3, 1, 4, 2'],
    correct: 2,
    explanation: 'Первый then выводит 1 и возвращает Promise (занимает 2 микротика). Параллельно: 3, затем 4. Только потом 2 (после resolve внутреннего Promise).'
  },
  {
    id: 6,
    code: `console.log('1');

new Promise((resolve) => {
  console.log('2');
  resolve();
  console.log('3');
}).then(() => {
  console.log('4');
});

console.log('5');`,
    options: ['1, 2, 3, 5, 4', '1, 2, 4, 3, 5', '1, 2, 3, 4, 5', '1, 5, 2, 3, 4'],
    correct: 0,
    explanation: 'Executor Promise выполняется синхронно (2, 3). resolve() не прерывает выполнение. Затем 5. Микрозадача: 4.'
  },
  {
    id: 7,
    code: `queueMicrotask(() => console.log('1'));
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
queueMicrotask(() => console.log('4'));`,
    options: ['1, 3, 4, 2', '1, 4, 3, 2', '3, 1, 4, 2', '2, 1, 3, 4'],
    correct: 0,
    explanation: 'Все микрозадачи (queueMicrotask и Promise.then) выполняются в порядке добавления: 1, 3, 4. Потом макрозадача: 2.'
  },
  {
    id: 8,
    code: `setTimeout(() => console.log('1'), 100);
setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

console.log('5');`,
    options: ['5, 3, 4, 2, 1', '5, 2, 3, 4, 1', '5, 3, 4, 1, 2', '2, 5, 3, 4, 1'],
    correct: 0,
    explanation: 'Синхронный: 5. Микрозадачи: 3, 4. setTimeout 0ms: 2. setTimeout 100ms: 1.'
  },
]

export default function EventLoopQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false))

  const question = questions[currentQuestion]

  const handleAnswer = (optionIndex: number) => {
    if (showResult) return
    setSelectedAnswer(optionIndex)
  }

  const checkAnswer = () => {
    if (selectedAnswer === null) return
    setShowResult(true)
    if (selectedAnswer === question.correct && !answered[currentQuestion]) {
      setScore(prev => prev + 1)
      const newAnswered = [...answered]
      newAnswered[currentQuestion] = true
      setAnswered(newAnswered)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
      setSelectedAnswer(null)
      setShowResult(false)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
    setAnswered(new Array(questions.length).fill(false))
  }

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧩 Event Loop Quiz</h1>
        <p>
          Проверьте своё понимание Event Loop! Определите порядок вывода в консоль 
          для каждого примера кода.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">
            Вопрос {currentQuestion + 1} из {questions.length}
          </span>
          <span className="card-badge">Счёт: {score}/{questions.length}</span>
        </div>

        <div className="step-indicator">
          {questions.map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                className={`step ${currentQuestion === i ? 'active' : ''} ${answered[i] ? 'completed' : ''}`}
              >
                {answered[i] ? '✓' : i + 1}
              </div>
              {i < questions.length - 1 && (
                <div className={`step-line ${answered[i] ? 'completed' : ''}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Какой будет порядок вывода?</h3>
        <CodeBlock code={question.code} />

        <div style={{ marginTop: '24px' }}>
          {question.options.map((option, i) => (
            <div
              key={i}
              className={`quiz-option ${selectedAnswer === i ? 'selected' : ''} ${
                showResult ? (i === question.correct ? 'correct' : selectedAnswer === i ? 'incorrect' : '') : ''
              }`}
              onClick={() => handleAnswer(i)}
            >
              <span style={{ marginRight: '12px', fontWeight: 600 }}>
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </div>
          ))}
        </div>

        {showResult && (
          <div className={`info-box ${selectedAnswer === question.correct ? 'success' : 'warning'}`} 
               style={{ marginTop: '16px' }}>
            <h4>{selectedAnswer === question.correct ? '✅ Правильно!' : '❌ Неправильно'}</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              {question.explanation}
            </p>
            <p style={{ marginTop: '8px' }}>
              <strong>Правильный ответ:</strong> {question.options[question.correct]}
            </p>
          </div>
        )}

        <div className="controls" style={{ marginTop: '24px' }}>
          <button 
            className="btn btn-secondary" 
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            ← Назад
          </button>
          
          {!showResult ? (
            <button 
              className="btn btn-primary" 
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
            >
              Проверить
            </button>
          ) : currentQuestion < questions.length - 1 ? (
            <button className="btn btn-primary" onClick={nextQuestion}>
              Далее →
            </button>
          ) : (
            <button className="btn btn-success" onClick={resetQuiz}>
              🔄 Начать заново
            </button>
          )}
        </div>
      </div>

      {currentQuestion === questions.length - 1 && showResult && (
        <div className="card">
          <h3>🎉 Квиз завершён!</h3>
          <p style={{ fontSize: '1.5rem', marginTop: '16px' }}>
            Ваш результат: <strong style={{ color: 'var(--accent-js)' }}>{score}</strong> из {questions.length}
          </p>
          <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
            {score === questions.length 
              ? '🏆 Отлично! Вы мастер Event Loop!'
              : score >= questions.length * 0.7 
                ? '👍 Хороший результат! Но есть куда расти.'
                : '📚 Рекомендую перечитать раздел про Event Loop.'}
          </p>
        </div>
      )}

      <div className="card">
        <h3>💡 Подсказка</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
          Помните порядок выполнения:
        </p>
        <ol className="info-list">
          <li><span className="diagram-box sync" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Синхронный код</span> — первым</li>
          <li><span className="diagram-box micro" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Microtasks</span> — Promise, queueMicrotask</li>
          <li><span className="diagram-box macro" style={{ padding: '4px 8px', fontSize: '0.8rem' }}>Macrotasks</span> — setTimeout, setInterval</li>
        </ol>
      </div>
    </div>
  )
}
