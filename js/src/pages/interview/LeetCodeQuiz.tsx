import { useState, useMemo, useCallback } from 'react'
import CodeBlock from '../../components/CodeBlock'

interface LeetQuestion {
  id: number
  title: string
  difficulty: 'easy' | 'medium' | 'hard'
  question: string
  code: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const allQuestions: LeetQuestion[] = [
  {
    id: 1,
    title: 'Array.prototype.flat',
    difficulty: 'easy',
    question: 'Что вернёт этот код?',
    code: `const arr = [1, [2, [3, [4]]]];
console.log(arr.flat(2));`,
    options: ['[1, 2, 3, [4]]', '[1, 2, [3, [4]]]', '[1, 2, 3, 4]', 'TypeError'],
    correctAnswer: 0,
    explanation: 'flat(2) «разворачивает» массив на 2 уровня вложенности. [4] остался бы, если бы flat(1). flat(Infinity) развернул бы всё.'
  },
  {
    id: 2,
    title: 'typeof null',
    difficulty: 'easy',
    question: 'Что выведет код?',
    code: `console.log(typeof null);
console.log(typeof undefined);
console.log(null == undefined);
console.log(null === undefined);`,
    options: [
      '"object", "undefined", true, false',
      '"null", "undefined", true, false',
      '"object", "undefined", false, false',
      '"null", "undefined", true, true'
    ],
    correctAnswer: 0,
    explanation: 'typeof null === "object" — известный баг JS с первых дней. null == undefined → true (нестрогое), но null === undefined → false (разные типы).'
  },
  {
    id: 3,
    title: 'Reduce — сумма объектов',
    difficulty: 'medium',
    question: 'Что вернёт этот код?',
    code: `const items = [
  { name: 'A', price: 10, qty: 2 },
  { name: 'B', price: 20, qty: 1 },
  { name: 'C', price: 5, qty: 4 },
];

const total = items.reduce(
  (sum, item) => sum + item.price * item.qty, 0
);
console.log(total);`,
    options: ['35', '60', '80', 'NaN'],
    correctAnswer: 1,
    explanation: '10*2 + 20*1 + 5*4 = 20 + 20 + 20 = 60. reduce суммирует price * qty для каждого элемента.'
  },
  {
    id: 4,
    title: 'Set и уникальные значения',
    difficulty: 'easy',
    question: 'Что выведет этот код?',
    code: `const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique.length, unique);`,
    options: ['3, [1, 2, 3]', '6, [1, 2, 2, 3, 3, 3]', '3, Set(3)', 'TypeError'],
    correctAnswer: 0,
    explanation: 'Set хранит только уникальные значения. Spread оператор (...) конвертирует Set обратно в массив.'
  },
  {
    id: 5,
    title: 'Optional chaining',
    difficulty: 'easy',
    question: 'Что выведет этот код?',
    code: `const user = { 
  profile: { name: 'Alice' } 
};

console.log(user.profile?.name);
console.log(user.address?.city);
console.log(user.getAge?.());`,
    options: [
      '"Alice", undefined, undefined',
      '"Alice", null, TypeError',
      '"Alice", undefined, TypeError',
      '"Alice", null, null'
    ],
    correctAnswer: 0,
    explanation: '?. возвращает undefined (не null, не TypeError) если промежуточное свойство не существует. Работает и для вызова методов ?.().'
  },
  {
    id: 6,
    title: 'Promise.all vs Promise.allSettled',
    difficulty: 'medium',
    question: 'Что произойдёт?',
    code: `const p1 = Promise.resolve(1);
const p2 = Promise.reject('error');
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(r => console.log('all:', r))
  .catch(e => console.log('catch:', e));

Promise.allSettled([p1, p2, p3])
  .then(r => console.log('settled:', r.length));`,
    options: [
      'all: [1, error, 3], settled: 3',
      'catch: error, settled: 3',
      'catch: error, settled: 2',
      'all: [1, 3], settled: 3'
    ],
    correctAnswer: 1,
    explanation: 'Promise.all отклоняется при первом реджекте → catch. Promise.allSettled всегда ждёт все промисы и возвращает массив с результатами ВСЕХ (3 шт).'
  },
  {
    id: 7,
    title: 'Map vs Object',
    difficulty: 'medium',
    question: 'Что выведет код?',
    code: `const map = new Map();
map.set('1', 'str');
map.set(1, 'num');
map.set(true, 'bool');

console.log(map.get('1'));
console.log(map.get(1));
console.log(map.size);`,
    options: [
      '"str", "num", 3',
      '"num", "num", 2',
      '"str", "str", 1',
      '"bool", "num", 3'
    ],
    correctAnswer: 0,
    explanation: 'В отличие от обычного объекта, Map различает ключи по типу: "1" (строка) ≠ 1 (число) ≠ true (boolean). Все три — разные ключи.'
  },
  {
    id: 8,
    title: 'Деструктуризация с default',
    difficulty: 'easy',
    question: 'Что выведет код?',
    code: `const { a = 10, b = 20, c = 30 } = { a: 1, b: undefined };
console.log(a, b, c);`,
    options: ['1, 20, 30', '1, undefined, 30', '10, 20, 30', '1, 20, undefined'],
    correctAnswer: 0,
    explanation: 'Дефолтные значения применяются только когда значение === undefined. a=1 (есть значение), b=20 (undefined → дефолт), c=30 (отсутствует → дефолт).'
  },
  {
    id: 9,
    title: 'Двоичный поиск',
    difficulty: 'medium',
    question: 'Какова сложность этого алгоритма?',
    code: `function search(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
    correctAnswer: 1,
    explanation: 'Бинарный поиск делит массив пополам на каждом шаге → O(log n). Работает только на отсортированном массиве.'
  },
  {
    id: 10,
    title: 'Two Sum подход',
    difficulty: 'medium',
    question: 'Какой результат у оптимального решения Two Sum?',
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9));`,
    options: ['[0, 1]', '[2, 7]', '[1, 0]', 'undefined'],
    correctAnswer: 0,
    explanation: 'HashMap подход: на i=0 сохраняем 2→0, на i=1 ищем 9-7=2 → найдено! Возвращаем [0, 1]. Сложность O(n).'
  },
  {
    id: 11,
    title: 'Палиндром',
    difficulty: 'easy',
    question: 'Что вернёт функция?',
    code: `function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return clean === clean.split('').reverse().join('');
}

console.log(isPalindrome("A man, a plan, a canal: Panama"));`,
    options: ['true', 'false', '"amanaplanacanalpanama"', 'TypeError'],
    correctAnswer: 0,
    explanation: 'После очистки строка "amanaplanacanalpanama" читается одинаково в обоих направлениях → палиндром.'
  },
  {
    id: 12,
    title: 'Debounce реализация',
    difficulty: 'hard',
    question: 'Сколько раз вызовется fn?',
    code: `function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const log = debounce(() => console.log('called'), 100);
log(); // t=0ms
log(); // t=20ms
log(); // t=50ms
// ...ждём 200мс`,
    options: ['3 раза', '1 раз', '0 раз', '2 раза'],
    correctAnswer: 1,
    explanation: 'Debounce сбрасывает таймер при каждом вызове. Только последний вызов (t=50ms) выполнится через 100ms, когда таймер не будет сброшен.'
  },
  {
    id: 13,
    title: 'Spread и мутация',
    difficulty: 'medium',
    question: 'Что выведет код?',
    code: `const a = { x: 1, inner: { y: 2 } };
const b = { ...a };
b.x = 10;
b.inner.y = 20;

console.log(a.x, a.inner.y);`,
    options: ['1, 2', '10, 20', '1, 20', '10, 2'],
    correctAnswer: 2,
    explanation: 'Spread создаёт поверхностную копию. b.x = 10 не влияет на a.x (примитив скопирован). Но inner — один и тот же объект (ссылка), поэтому a.inner.y тоже 20.'
  },
  {
    id: 14,
    title: 'async/await порядок',
    difficulty: 'hard',
    question: 'В каком порядке выведутся числа?',
    code: `async function foo() {
  console.log(1);
  const x = await Promise.resolve(2);
  console.log(x);
}

console.log(3);
foo();
console.log(4);`,
    options: ['3, 1, 4, 2', '1, 2, 3, 4', '3, 1, 2, 4', '3, 4, 1, 2'],
    correctAnswer: 0,
    explanation: '3 (синхронно), foo() вызывается → 1 (до await, синхронно), await приостанавливает → 4 (синхронно), затем микрозадача → 2.'
  },
  {
    id: 15,
    title: 'Анаграммы',
    difficulty: 'medium',
    question: 'Что вернёт функция?',
    code: `function isAnagram(s1, s2) {
  const sort = s => s.toLowerCase()
    .split('').sort().join('');
  return sort(s1) === sort(s2);
}

console.log(isAnagram("listen", "silent"));
console.log(isAnagram("hello", "world"));`,
    options: ['true, false', 'false, true', 'true, true', 'false, false'],
    correctAnswer: 0,
    explanation: '"listen" → "eilnst", "silent" → "eilnst" — совпадают. "hello" → "ehllo", "world" → "dlorw" — разные.'
  },
  {
    id: 16,
    title: 'WeakMap и GC',
    difficulty: 'hard',
    question: 'Что особенного в WeakMap?',
    code: `let obj = { data: 'secret' };
const weakMap = new WeakMap();
const map = new Map();

weakMap.set(obj, 1);
map.set(obj, 2);
obj = null;

// После garbage collection:
console.log(map.size);`,
    options: [
      '1 (Map хранит ссылку, WeakMap — нет)',
      '0 (оба удалят запись)',
      '1 (оба хранят ссылку)',
      'TypeError'
    ],
    correctAnswer: 0,
    explanation: 'Map держит сильную ссылку → объект не соберётся GC, map.size = 1. WeakMap имеет слабую ссылку — объект может быть удалён GC, но проверить .size нельзя (нет такого свойства).'
  },
  {
    id: 17,
    title: 'Event delegation',
    difficulty: 'medium',
    question: 'Сколько обработчиков нужно?',
    code: `// 1000 кнопок в контейнере
// <div id="container">
//   <button>1</button>
//   <button>2</button>
//   ...
//   <button>1000</button>
// </div>

// Оптимальный подход:
document.getElementById('container')
  .addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      console.log(e.target.textContent);
    }
  });`,
    options: ['1000 обработчиков', '1 обработчик', '2 обработчика', '0 обработчиков'],
    correctAnswer: 1,
    explanation: 'Event delegation: один обработчик на родителе вместо 1000 на каждой кнопке. События всплывают (bubble) от кнопки к контейнеру. Экономит память и работает для динамических элементов.'
  },
  {
    id: 18,
    title: 'Генераторы',
    difficulty: 'hard',
    question: 'Что выведет код?',
    code: `function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());`,
    options: [
      '{ value: 1, done: false }, { value: 2, done: false }, { value: 3, done: false }, { value: undefined, done: true }',
      '1, 2, 3, undefined',
      '{ value: 1 }, { value: 2 }, { value: 3 }, { done: true }',
      'TypeError: gen is not iterable'
    ],
    correctAnswer: 0,
    explanation: 'Генератор возвращает объекты { value, done }. После последнего yield done становится true, value — undefined.'
  },
  {
    id: 19,
    title: 'Каррирование',
    difficulty: 'hard',
    question: 'Что выведет код?',
    code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}

const sum = curry((a, b, c) => a + b + c);
console.log(sum(1)(2)(3));
console.log(sum(1, 2)(3));`,
    options: ['6, 6', '6, NaN', 'TypeError', '1, 3'],
    correctAnswer: 0,
    explanation: 'Каррирование позволяет вызывать функцию по частям. sum(1)(2)(3) = 6 и sum(1,2)(3) = 6 — оба варианта работают через fn.length.'
  },
  {
    id: 20,
    title: 'Замыкание в IIFE',
    difficulty: 'medium',
    question: 'Что выведет код?',
    code: `for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}`,
    options: ['0, 1, 2', '3, 3, 3', '0, 0, 0', 'undefined, undefined, undefined'],
    correctAnswer: 0,
    explanation: 'IIFE (Immediately Invoked Function Expression) создаёт новую область видимости для каждой итерации. Переменная j захватывается замыканием с текущим значением i.'
  },
  {
    id: 21,
    title: 'Object.freeze',
    difficulty: 'easy',
    question: 'Что выведет код?',
    code: `const obj = Object.freeze({
  x: 1,
  nested: { y: 2 }
});

obj.x = 10;
obj.nested.y = 20;

console.log(obj.x, obj.nested.y);`,
    options: ['1, 20', '10, 20', '1, 2', 'TypeError'],
    correctAnswer: 0,
    explanation: 'Object.freeze — поверхностная заморозка. obj.x = 10 молча игнорируется (strict mode → TypeError). Но nested — вложенный объект, его freeze не коснулся → y = 20 успешно.'
  },
  {
    id: 22,
    title: 'Array.from и генерация',
    difficulty: 'easy',
    question: 'Что выведет код?',
    code: `const matrix = Array.from(
  { length: 3 }, 
  (_, i) => Array.from(
    { length: 3 },
    (_, j) => i * 3 + j + 1
  )
);
console.log(matrix[1][2]);`,
    options: ['6', '5', '9', '3'],
    correctAnswer: 0,
    explanation: 'Создаётся матрица 3x3: [[1,2,3],[4,5,6],[7,8,9]]. matrix[1][2] = 1*3 + 2 + 1 = 6.'
  },
  {
    id: 23,
    title: 'queueMicrotask',
    difficulty: 'hard',
    question: 'В каком порядке выведутся буквы?',
    code: `console.log('A');

setTimeout(() => console.log('B'), 0);

queueMicrotask(() => {
  console.log('C');
  queueMicrotask(() => console.log('D'));
});

Promise.resolve().then(() => console.log('E'));

console.log('F');`,
    options: ['A, F, C, E, D, B', 'A, F, C, D, E, B', 'A, F, E, C, D, B', 'A, C, E, F, D, B'],
    correctAnswer: 0,
    explanation: 'Синхронно: A, F. Микрозадачи в порядке добавления: C (queueMicrotask), E (Promise.then). C добавляет D в очередь микрозадач. D выполняется. Затем макрозадача: B.'
  },
  {
    id: 24,
    title: 'Fibonacci мемоизация',
    difficulty: 'medium',
    question: 'Какова сложность мемоизированного Fibonacci?',
    code: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(10)); // 55`,
    options: ['O(2^n)', 'O(n)', 'O(n²)', 'O(n log n)'],
    correctAnswer: 1,
    explanation: 'Без мемоизации Fibonacci — O(2^n). С мемоизацией каждое значение вычисляется ровно один раз → O(n) по времени и O(n) по памяти.'
  },
  {
    id: 25,
    title: 'Symbol и уникальность',
    difficulty: 'medium',
    question: 'Что выведет код?',
    code: `const s1 = Symbol('id');
const s2 = Symbol('id');
const s3 = Symbol.for('id');
const s4 = Symbol.for('id');

console.log(s1 === s2);
console.log(s3 === s4);`,
    options: ['false, true', 'true, true', 'false, false', 'true, false'],
    correctAnswer: 0,
    explanation: 'Symbol() всегда создаёт уникальный символ (s1 ≠ s2). Symbol.for() ищет в глобальном реестре — если есть с таким ключом, возвращает его (s3 === s4).'
  }
]

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

type QuizMode = 'menu' | 'quiz' | 'results'

export default function LeetCodeQuiz() {
  const [mode, setMode] = useState<QuizMode>('menu')
  const [questions, setQuestions] = useState<LeetQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answers, setAnswers] = useState<Map<number, number>>(new Map())
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)

  const startQuiz = useCallback((count: number) => {
    const selected = count >= allQuestions.length 
      ? shuffleArray(allQuestions) 
      : shuffleArray(allQuestions).slice(0, count)
    setQuestions(selected)
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setAnswers(new Map())
    setStartTime(Date.now())
    setEndTime(0)
    setMode('quiz')
  }, [])

  const handleAnswer = (index: number) => {
    if (showExplanation) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    setAnswers(prev => new Map(prev).set(questions[currentIndex].id, index))
  }

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setEndTime(Date.now())
      setMode('results')
    }
  }

  const score = useMemo(() => {
    let correct = 0
    answers.forEach((answer, qId) => {
      const q = questions.find(q => q.id === qId)
      if (q && answer === q.correctAnswer) correct++
    })
    return correct
  }, [answers, questions])

  const current = questions[currentIndex]
  
  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'easy': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#888'
    }
  }

  const elapsed = endTime > 0 ? endTime - startTime : 0
  const minutes = Math.floor(elapsed / 60000)
  const seconds = Math.floor((elapsed % 60000) / 1000)

  if (mode === 'menu') {
    return (
      <div className="page-container">
        <h1 style={{ marginBottom: 8 }}>💻 Задачи</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 32 }}>
          LeetCode-стиль задачи по JavaScript. Выбери режим:
        </p>

        <div className="grid-2">
          <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => startQuiz(10)}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎯</div>
            <h3>Быстрый раунд</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              10 случайных вопросов из банка ({allQuestions.length} шт)
            </p>
          </div>
          <div className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => startQuiz(allQuestions.length)}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>🏆</div>
            <h3>Марафон</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Все {allQuestions.length} вопросов в случайном порядке
            </p>
          </div>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Темы в банке вопросов</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {['Array', 'Object', 'Promise', 'Closures', 'Types', 'Algo', 'Event Loop', 'ES6+', 'Patterns'].map(tag => (
              <span key={tag} style={{
                padding: '4px 12px',
                borderRadius: 12,
                background: 'var(--bg-code)',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem'
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (mode === 'results') {
    const percent = Math.round((score / questions.length) * 100)
    const grade = percent >= 90 ? '🏆' : percent >= 70 ? '👍' : percent >= 50 ? '💪' : '📚'
    
    return (
      <div className="page-container">
        <h1 style={{ marginBottom: 24 }}>Результаты {grade}</h1>
        
        <div className="grid-2" style={{ marginBottom: 24 }}>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>Счёт</div>
            <div style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              color: percent >= 70 ? '#10b981' : percent >= 50 ? '#f59e0b' : '#ef4444' 
            }}>
              {score}/{questions.length}
            </div>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{percent}%</div>
          </div>
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>Время</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-cyan, #06b6d4)' }}>
              {minutes}:{seconds.toString().padStart(2, '0')}
            </div>
            <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>минут</div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 24 }}>
          <h3 style={{ marginBottom: 16 }}>Обзор ответов</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {questions.map((q, i) => {
              const userAnswer = answers.get(q.id)
              const isCorrect = userAnswer === q.correctAnswer
              return (
                <div key={q.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: isCorrect ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                  border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
                }}>
                  <span style={{ fontSize: '1.1rem' }}>{isCorrect ? '✅' : '❌'}</span>
                  <span style={{ flex: 1, fontSize: '0.9rem' }}>{q.title}</span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: 8,
                    fontSize: '0.75rem',
                    background: `${getDifficultyColor(q.difficulty)}22`,
                    color: getDifficultyColor(q.difficulty)
                  }}>{q.difficulty}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => setMode('menu')}>← В меню</button>
          <button className="btn btn-primary" onClick={() => startQuiz(questions.length)}>🔄 Заново</button>
        </div>
      </div>
    )
  }

  // Quiz mode
  return (
    <div className="page-container">
      {/* Progress bar */}
      <div style={{ 
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 16
      }}>
        <button 
          className="btn btn-secondary" 
          onClick={() => setMode('menu')}
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          ✕
        </button>
        <div style={{ flex: 1, height: 8, background: 'var(--bg-code)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${((currentIndex + (showExplanation ? 1 : 0)) / questions.length) * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            borderRadius: 4,
            transition: 'width 0.3s ease'
          }} />
        </div>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{
            padding: '4px 12px',
            borderRadius: 12,
            fontSize: '0.75rem',
            fontWeight: 600,
            background: `${getDifficultyColor(current.difficulty)}22`,
            color: getDifficultyColor(current.difficulty)
          }}>{current.difficulty}</span>
          <h3 style={{ margin: 0 }}>{current.title}</h3>
        </div>

        <h4 style={{ marginBottom: 12 }}>{current.question}</h4>
        <CodeBlock code={current.code} language="javascript" />

        <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
          {current.options.map((option, index) => {
            let bgColor = 'var(--bg-code)'
            let borderColor = 'transparent'
            
            if (showExplanation) {
              if (index === current.correctAnswer) {
                bgColor = 'rgba(34, 197, 94, 0.2)'
                borderColor = '#10b981'
              } else if (index === selectedAnswer) {
                bgColor = 'rgba(239, 68, 68, 0.2)'
                borderColor = '#ef4444'
              }
            } else if (selectedAnswer === index) {
              borderColor = '#eab308'
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  padding: '14px 18px',
                  background: bgColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: 8,
                  cursor: showExplanation ? 'default' : 'pointer',
                  textAlign: 'left',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <span style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: showExplanation && index === current.correctAnswer ? '#10b981' : 'var(--bg-elevated, #2a2a3e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  flexShrink: 0,
                  color: showExplanation && index === current.correctAnswer ? 'white' : 'inherit'
                }}>
                  {String.fromCharCode(65 + index)}
                </span>
                <code style={{ fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap' }}>{option}</code>
              </button>
            )
          })}
        </div>

        {showExplanation && (
          <div style={{ 
            marginTop: 24, 
            padding: 20, 
            background: selectedAnswer === current.correctAnswer 
              ? 'rgba(34, 197, 94, 0.1)' 
              : 'rgba(239, 68, 68, 0.1)',
            borderRadius: 8,
            borderLeft: `4px solid ${selectedAnswer === current.correctAnswer ? '#10b981' : '#ef4444'}`
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: 8,
              color: selectedAnswer === current.correctAnswer ? '#10b981' : '#ef4444'
            }}>
              {selectedAnswer === current.correctAnswer ? '✅ Правильно!' : '❌ Неправильно'}
            </div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              {current.explanation}
            </p>
          </div>
        )}

        {showExplanation && (
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentIndex < questions.length - 1 ? 'Следующий →' : '📊 Результаты'}
            </button>
          </div>
        )}
      </div>

      {/* Quick nav dots */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
        {questions.map((q, i) => {
          const answered = answers.has(q.id)
          const isCorrect = answered && answers.get(q.id) === q.correctAnswer
          return (
            <div
              key={q.id}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: i === currentIndex 
                  ? '#8b5cf6' 
                  : answered 
                    ? (isCorrect ? '#10b981' : '#ef4444')
                    : 'var(--bg-code)',
                transition: 'all 0.2s'
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
