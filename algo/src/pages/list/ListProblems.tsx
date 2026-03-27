import { useState } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ListProblems() {
  const [activeTab, setActiveTab] = useState<'reverse' | 'cycle' | 'middle' | 'merge' | 'palindrome'>('reverse')

  return (
    <div className="page-container">
      <h1>🧩 Задачи на связные списки</h1>
      <p className="page-description">
        Классические задачи на собеседовании. Техники: два указателя (slow/fast),
        разворот списка, merge, dummy node.
      </p>

      <div className="card">
        <div className="card-header">
          <span className="card-title">📝 Популярные задачи</span>
          <span className="card-badge">LeetCode</span>
        </div>

        <div className="tabs" style={{ flexWrap: 'wrap' }}>
          {[
            { key: 'reverse', label: 'Разворот (#206)' },
            { key: 'cycle', label: 'Цикл (#141)' },
            { key: 'middle', label: 'Середина (#876)' },
            { key: 'merge', label: 'Merge (#21)' },
            { key: 'palindrome', label: 'Палиндром (#234)' },
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

        {activeTab === 'reverse' && (
          <>
            <div className="interview-question">
              <strong>Reverse Linked List (LeetCode #206)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Развернуть связный список. Классика — спрашивают почти всегда!
                Два подхода: итеративный и рекурсивный.
              </p>
            </div>
            <CodeBlock language="typescript" title="reverse-iterative.ts" code={`
// Итеративный — O(n) время, O(1) память
function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;

  while (current) {
    const next = current.next; // Сохраняем ссылку
    current.next = prev;       // Разворачиваем
    prev = current;            // Сдвигаем prev
    current = next;            // Сдвигаем current
  }

  return prev; // Новый head
}

// Рекурсивный — O(n) время, O(n) память (стек)
function reverseListRecursive(
  head: ListNode | null
): ListNode | null {
  if (!head || !head.next) return head;

  const newHead = reverseListRecursive(head.next);
  head.next.next = head; // Разворачиваем связь
  head.next = null;       // Обнуляем старую

  return newHead;
}
`} />
            <div className="info-box info" style={{ marginTop: '12px' }}>
              <strong>Мнемоника для итеративного:</strong> «Сохрани, разверни, сдвинь, сдвинь»
              — next = curr.next, curr.next = prev, prev = curr, curr = next
            </div>
          </>
        )}

        {activeTab === 'cycle' && (
          <>
            <div className="interview-question">
              <strong>Linked List Cycle (LeetCode #141, #142)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Определить, есть ли цикл в списке. Floyd's Cycle Detection — два указателя
                (slow + fast). Если встретились — цикл есть.
              </p>
            </div>
            <CodeBlock language="typescript" title="cycle-detection.ts" code={`
// Есть ли цикл? — O(n) время, O(1) память
function hasCycle(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;

    if (slow === fast) return true; // Встретились!
  }

  return false;
}

// Где начало цикла? (LeetCode #142)
function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  // Шаг 1: Найти точку встречи
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  if (!fast || !fast.next) return null; // Нет цикла

  // Шаг 2: Найти начало цикла
  // Перемещаем один указатель в начало
  slow = head;
  while (slow !== fast) {
    slow = slow!.next;
    fast = fast!.next;
  }

  return slow; // Начало цикла
}
`} />
            <div className="info-box warning" style={{ marginTop: '12px' }}>
              <strong>Почему это работает?</strong> Когда slow и fast встречаются внутри цикла,
              расстояние от head до начала цикла = расстоянию от точки встречи до начала цикла
              (математическое доказательство через модулярную арифметику).
            </div>
          </>
        )}

        {activeTab === 'middle' && (
          <>
            <div className="interview-question">
              <strong>Middle of the Linked List (LeetCode #876)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Найти средний узел. Техника slow/fast: slow идёт по одному, fast по два.
                Когда fast дойдёт до конца, slow будет посередине.
              </p>
            </div>
            <CodeBlock language="typescript" title="find-middle.ts" code={`
function middleNode(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow!.next;     // 1 шаг
    fast = fast.next.next; // 2 шага
  }

  return slow; // Середина!
}

// Для чётного количества возвращает второй средний.
// 1 → 2 → 3 → 4 → 5       → slow = 3
// 1 → 2 → 3 → 4 → 5 → 6   → slow = 4

// Если нужен ПЕРВЫЙ средний для чётных:
function firstMiddle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;

  while (fast?.next?.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  return slow;
}
`} />
          </>
        )}

        {activeTab === 'merge' && (
          <>
            <div className="interview-question">
              <strong>Merge Two Sorted Lists (LeetCode #21)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Слить два отсортированных списка в один. Техника dummy node —
                создаём фиктивный узел, чтобы не обрабатывать edge case пустого head.
              </p>
            </div>
            <CodeBlock language="typescript" title="merge-lists.ts" code={`
function mergeTwoLists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode(0); // Фиктивный узел!
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // Оставшийся хвост
  current.next = l1 ?? l2;

  return dummy.next; // Пропускаем dummy
}
// Время: O(n + m), Память: O(1)
`} />
            <div className="info-box info" style={{ marginTop: '12px' }}>
              <strong>Dummy node (sentinel)</strong> — частый паттерн в задачах на списки.
              Упрощает код, убирая проверки на null/empty head.
            </div>
          </>
        )}

        {activeTab === 'palindrome' && (
          <>
            <div className="interview-question">
              <strong>Palindrome Linked List (LeetCode #234)</strong>
              <p style={{ color: 'var(--text-secondary)', margin: '8px 0' }}>
                Проверить, является ли список палиндромом. Комбинация трёх техник:
                найти середину → развернуть вторую половину → сравнить.
              </p>
            </div>
            <CodeBlock language="typescript" title="palindrome-list.ts" code={`
function isPalindrome(head: ListNode | null): boolean {
  if (!head || !head.next) return true;

  // 1. Найти середину (slow/fast)
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;
  while (fast?.next?.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }

  // 2. Развернуть вторую половину
  let prev: ListNode | null = null;
  let curr = slow!.next;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // 3. Сравнить первую и развёрнутую вторую
  let left: ListNode | null = head;
  let right: ListNode | null = prev;
  while (right) {
    if (left!.val !== right.val) return false;
    left = left!.next;
    right = right.next;
  }

  return true;
}
// Время: O(n), Память: O(1)
// 1 → 2 → 3 → 2 → 1  →  true
// 1 → 2 → 3 → 4 → 5  →  false
`} />
          </>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">🎯 Ключевые техники</span>
        </div>
        <div className="grid-2" style={{ gap: '12px' }}>
          {[
            { name: 'Два указателя (slow/fast)', desc: 'Середина, цикл, n-й с конца', color: 'var(--accent-algo)' },
            { name: 'Dummy node', desc: 'Merge, удаление, вставка без edge cases', color: 'var(--accent-green)' },
            { name: 'Разворот списка', desc: 'Палиндром, k-группы, чередование', color: 'var(--accent-purple)' },
            { name: 'Рекурсия', desc: 'Разворот, merge, сравнение', color: 'var(--accent-orange)' },
          ].map(({ name, desc, color }) => (
            <div key={name} style={{
              padding: '14px',
              background: 'var(--bg-code)',
              borderRadius: '10px',
              borderLeft: `3px solid ${color}`,
            }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{name}</strong>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
