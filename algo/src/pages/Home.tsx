import { Link } from 'react-router-dom'

const sections = [
  {
    title: 'Стек и Очередь',
    icon: '📚',
    links: [
      { to: '/stack/basics', label: 'Стек — основы', desc: 'push, pop, peek. Реализация на массиве и связном списке' },
      { to: '/stack/problems', label: 'Задачи на стек', desc: 'Скобки, обратная польская нотация, min-stack, монотонный стек' },
      { to: '/queue/basics', label: 'Очередь и Deque', desc: 'Queue, Deque, Priority Queue. BFS-обходы' },
    ]
  },
  {
    title: 'Деревья',
    icon: '🌳',
    links: [
      { to: '/tree/binary', label: 'Бинарное дерево', desc: 'Создание, вставка, обход. Визуализация' },
      { to: '/tree/traversal', label: 'Обходы деревьев', desc: 'DFS (in/pre/post-order), BFS. Итеративно и рекурсивно' },
      { to: '/tree/bst', label: 'BST — дерево поиска', desc: 'Поиск, вставка, удаление. Балансировка' },
    ]
  },
  {
    title: 'Сортировки',
    icon: '🔢',
    links: [
      { to: '/sort/basic', label: 'Простые сортировки', desc: 'Bubble, Selection, Insertion — O(n²)' },
      { to: '/sort/advanced', label: 'Эффективные сортировки', desc: 'Merge Sort, Quick Sort — O(n log n)' },
      { to: '/sort/comparison', label: 'Сравнение сортировок', desc: 'Визуальное сравнение, сложность, когда что использовать' },
    ]
  },
  {
    title: 'Связные списки',
    icon: '🔗',
    links: [
      { to: '/list/singly', label: 'Односвязный список', desc: 'Вставка, удаление, поиск. Разворот списка' },
      { to: '/list/problems', label: 'Задачи на списки', desc: 'Цикл, середина, слияние, палиндром' },
    ]
  },
  {
    title: 'Хеш-таблицы',
    icon: '🗃️',
    links: [
      { to: '/hash/basics', label: 'Хеш-таблица', desc: 'Хеш-функции, коллизии, chaining, open addressing' },
      { to: '/hash/problems', label: 'Задачи с хешами', desc: 'Two Sum, анаграммы, частотный анализ' },
    ]
  },
  {
    title: 'Графы и Поиск',
    icon: '🕸️',
    links: [
      { to: '/graph/basics', label: 'Графы — основы', desc: 'Представление, DFS и BFS обходы, компоненты связности' },
      { to: '/search/binary', label: 'Бинарный поиск', desc: 'Классический, по ответу, lower/upper bound' },
    ]
  },
]

export default function Home() {
  return (
    <div className="page-container">
      <div className="home-hero">
        <h1>🧮 Algo 101</h1>
        <p>
          Алгоритмы и структуры данных на TypeScript — 
          всё что спрашивают на собеседованиях
        </p>
      </div>

      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
            {section.icon} {section.title}
          </h2>
          <div className="feature-grid">
            {section.links.map(link => (
              <Link key={link.to} to={link.to} className="feature-card">
                <h3>{link.label}</h3>
                <p>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
