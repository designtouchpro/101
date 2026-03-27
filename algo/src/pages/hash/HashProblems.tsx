import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function HashProblems() {
  const [activeTab, setActiveTab] = useState<'twosum' | 'anagram' | 'frequency' | 'subarray' | 'group'>('twosum')

  const [twoSumInput, setTwoSumInput] = useState('2,7,11,15')
  const [twoSumTarget, setTwoSumTarget] = useState('9')
  const [twoSumResult, setTwoSumResult] = useState<string | null>(null)

  const solveTwoSum = () => {
    const nums = twoSumInput.split(',').map(Number)
    const target = Number(twoSumTarget)
    const map = new Map<number, number>()

    for (let i = 0; i < nums.length; i++) {
      const complement = target - nums[i]
      if (map.has(complement)) {
        setTwoSumResult(`Индексы: [${map.get(complement)}, ${i}] → ${nums[map.get(complement)!]} + ${nums[i]} = ${target}`)
        return
      }
      map.set(nums[i], i)
    }
    setTwoSumResult('❌ Решение не найдено')
  }

  return (
    <div className="page-container">
      <h1>🧩 Задачи на хеш-таблицы</h1>
      <p className="page-description">
        Hash Map — самый частый инструмент для оптимизации от O(n²) до O(n).
        Запоминаем уже виденные значения для быстрого поиска.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📝 Классические задачи</span>
          <span className="card-badge">LeetCode</span>
        </div>

        <div className="tabs" style={{ flexWrap: 'wrap' }}>
          {[
            { key: 'twosum', label: 'Two Sum (#1)' },
            { key: 'anagram', label: 'Anagrams (#242)' },
            { key: 'frequency', label: 'Top K Frequent (#347)' },
            { key: 'subarray', label: 'Subarray Sum (#560)' },
            { key: 'group', label: 'Group Anagrams (#49)' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`tab ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key as typeof activeTab)}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'twosum' && (
          <>
            <div className="interview-question">
              <strong>Two Sum (LeetCode #1) — №1 по популярности!</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Найти два числа в массиве, сумма которых равна target.
                Наивно O(n²), с HashMap O(n).
              </p>
            </div>

            <div className="controls">
              <input className="input" value={twoSumInput} onChange={e => setTwoSumInput(e.target.value)}
                placeholder="Числа через запятую" style={{ width: '200px' }} />
              <input className="input" value={twoSumTarget} onChange={e => setTwoSumTarget(e.target.value)}
                placeholder="Target" style={{ width: '80px' }} />
              <button className="btn btn-primary" onClick={solveTwoSum}>Решить</button>
            </div>

            {twoSumResult && (
              <div style={{
                padding: '12px', textAlign: 'center', borderRadius: '8px',
                background: 'var(--bg-code)', color: 'var(--accent-green)', fontWeight: 600, margin: '12px 0'
              }}>
                {twoSumResult}
              </div>
            )}

            <CodeBlock language="typescript" title="two-sum.ts" code={`
// O(n) — один проход с HashMap
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>(); // value → index

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i);
  }

  return []; // Не найдено
}

// Ключевая идея: для каждого числа проверяем,
// видели ли мы уже complement = target - current
`} />
          </>
        )}

        {activeTab === 'anagram' && (
          <>
            <div className="interview-question">
              <strong>Valid Anagram (LeetCode #242)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Проверить, являются ли две строки анаграммами.
                Считаем частоту символов через Map.
              </p>
            </div>
            <CodeBlock language="typescript" title="valid-anagram.ts" code={`
function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;

  const count = new Map<string, number>();

  // Считаем символы первой строки (+1)
  for (const char of s) {
    count.set(char, (count.get(char) ?? 0) + 1);
  }

  // Вычитаем символы второй строки (-1)
  for (const char of t) {
    const val = (count.get(char) ?? 0) - 1;
    if (val < 0) return false; // Лишний символ
    count.set(char, val);
  }

  return true;
}

// Альтернатива для ASCII: массив new Array(26).fill(0)
function isAnagramArray(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  const a = 'a'.charCodeAt(0);

  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - a]++;
    count[t.charCodeAt(i) - a]--;
  }

  return count.every(c => c === 0);
}
`} />
          </>
        )}

        {activeTab === 'frequency' && (
          <>
            <div className="interview-question">
              <strong>Top K Frequent Elements (LeetCode #347)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Найти K самых частых элементов. HashMap + Bucket Sort = O(n).
              </p>
            </div>
            <CodeBlock language="typescript" title="top-k-frequent.ts" code={`
function topKFrequent(nums: number[], k: number): number[] {
  // 1. Считаем частоту — O(n)
  const freq = new Map<number, number>();
  for (const num of nums) {
    freq.set(num, (freq.get(num) ?? 0) + 1);
  }

  // 2. Bucket sort по частоте — O(n)
  // buckets[i] = числа с частотой i
  const buckets: number[][] = Array.from(
    { length: nums.length + 1 },
    () => []
  );

  for (const [num, count] of freq) {
    buckets[count].push(num);
  }

  // 3. Собираем k самых частых — O(n)
  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  return result.slice(0, k);
}
// Общая сложность: O(n)
// Альтернатива: heap — O(n log k)
`} />
          </>
        )}

        {activeTab === 'subarray' && (
          <>
            <div className="interview-question">
              <strong>Subarray Sum Equals K (LeetCode #560)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Подсчитать подмассивы с суммой k. Prefix sum + HashMap — мощная комбинация!
              </p>
            </div>
            <CodeBlock language="typescript" title="subarray-sum.ts" code={`
function subarraySum(nums: number[], k: number): number {
  // prefixSum[j] - prefixSum[i] = сумма подмассива [i..j]
  // Если prefixSum[j] - k = prefixSum[i], значит есть подмассив с суммой k

  const prefixCount = new Map<number, number>();
  prefixCount.set(0, 1); // Пустой префикс

  let sum = 0;
  let count = 0;

  for (const num of nums) {
    sum += num;

    // Сколько раз видели prefixSum = sum - k?
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k)!;
    }

    prefixCount.set(sum, (prefixCount.get(sum) ?? 0) + 1);
  }

  return count;
}

// [1, 1, 1], k = 2 → 2 подмассива: [1,1] и [1,1]
// [1, 2, 3], k = 3 → 2 подмассива: [1,2] и [3]
`} />
            <div className="info-box info" style={{ marginTop: '12px' }}>
              <strong>Prefix Sum + HashMap</strong> — шаблон для задач на подмассивы.
              Запоминаем все встреченные prefix sums в Map.
            </div>
          </>
        )}

        {activeTab === 'group' && (
          <>
            <div className="interview-question">
              <strong>Group Anagrams (LeetCode #49)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Сгруппировать слова-анаграммы. Ключ — отсортированная строка (или частотный массив).
              </p>
            </div>
            <CodeBlock language="typescript" title="group-anagrams.ts" code={`
function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    // Ключ: отсортированные символы
    const key = str.split('').sort().join('');
    
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}

// Оптимизация: ключ через counting (без sort)
function groupAnagramsOptimal(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const count = new Array(26).fill(0);
    for (const char of str) {
      count[char.charCodeAt(0) - 97]++;
    }
    const key = count.join('#'); // "1#0#0#...#0"

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(str);
  }

  return Array.from(map.values());
}

// ["eat","tea","tan","ate","nat","bat"]
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
`} />
          </>
        )}
      </div>
    </div>
  )
}
