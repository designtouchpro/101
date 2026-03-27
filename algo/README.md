# Algo Playground

Интерактивная площадка для изучения алгоритмов и структур данных — от основ до подготовки к собеседованиям.

## 🎯 Чему учит

- **Линейные структуры**: стек, очередь, связные списки, хеш-таблицы
- **Деревья**: бинарные деревья, обходы, BST
- **Сортировки**: базовые (bubble, selection, insertion), продвинутые (merge, quick, heap), сравнение
- **Графы и поиск**: представления, BFS/DFS, Dijkstra, бинарный поиск, heap
- **Рекурсия и backtracking**: call stack, базовые случаи, pruning, N Queens
- **ДП**: memoization vs tabulation, семейства задач, проектирование состояний
- **Таксономия**: 12 паттернов (Two Pointers, Sliding Window, Prefix Sum и др.)

## 📋 Пререквизиты

- JavaScript или TypeScript (массивы, объекты, функции)
- Базовая математика: O-нотация, логарифмы
- [JS Playground](../js/) — замыкания, рекурсия

## 🗺️ Рекомендуемый порядок

| # | Раздел | Маршрут | Уровень |
|---|--------|---------|---------|
| 1 | Главная (обзор) | `/` | 🟢 Базовый |
| 2 | Стек — основы | `/stack/basics` | 🟢 Базовый |
| 3 | Очередь — основы | `/queue/basics` | 🟢 Базовый |
| 4 | Хеш-таблицы — основы | `/hash/basics` | 🟢 Базовый |
| 5 | Связный список | `/list/singly` | 🟢 Базовый |
| 6 | Базовые сортировки | `/sort/basic` | 🟢 Базовый |
| 7 | Стек — задачи | `/stack/problems` | 🟡 Средний |
| 8 | Хеш-таблицы — задачи | `/hash/problems` | 🟡 Средний |
| 9 | Связные списки — задачи | `/list/problems` | 🟡 Средний |
| 10 | Бинарное дерево | `/tree/binary` | 🟡 Средний |
| 11 | Обходы деревьев | `/tree/traversal` | 🟡 Средний |
| 12 | BST | `/tree/bst` | 🟡 Средний |
| 13 | Продвинутые сортировки | `/sort/advanced` | 🟡 Средний |
| 14 | Сравнение сортировок | `/sort/comparison` | 🟡 Средний |
| 15 | Бинарный поиск | `/search/binary` | 🟡 Средний |
| 16 | Графы — основы | `/graph/basics` | 🟡 Средний |
| 17 | Рекурсия и backtracking | `/recursion/backtracking` | 🔴 Продвинутый |
| 18 | Графы и Heap | `/graph/heap` | 🔴 Продвинутый |
| 19 | Динамическое программирование | `/dp/basics` | 🔴 Продвинутый |
| 20 | Таксономия задач | `/taxonomy` | 🔴 Продвинутый |
| 21 | Вопросы к собеседованию | `/interview` | 🎤 Собеседование |

### Условные обозначения уровней
- 🟢 **Базовый** — фундаментальные структуры и операции
- 🟡 **Средний** — задачи на интервью, алгоритмические паттерны
- 🔴 **Продвинутый** — ДП, графовые алгоритмы, сложные паттерны

## 📚 Основные темы

### Стек и Очередь
- **Stack Basics** — LIFO, push/pop, реализация на массиве
- **Stack Problems** — скобочные последовательности, монотонный стек
- **Queue Basics** — FIFO, enqueue/dequeue, приоритетная очередь

### Деревья
- **Binary Tree** — узлы, высота, полные/сбалансированные деревья
- **Traversal** — inorder, preorder, postorder, BFS, DFS
- **BST** — поиск, вставка, удаление, балансировка

### Сортировки
- **Basic** — Bubble, Selection, Insertion (O(n²))
- **Advanced** — Merge Sort, Quick Sort, Heap Sort (O(n log n))
- **Comparison** — стабильность, memory, best/worst case, когда какую

### Связные списки
- **Singly** — реализация, вставка, удаление, реверс
- **Problems** — cycle detection, merge sorted, middle node

### Хеш-таблицы
- **Basics** — hash function, коллизии, chaining vs open addressing
- **Problems** — two sum, group anagrams, frequency counting

### Графы и Поиск
- **Graph Basics** — представления (adjacency list/matrix), BFS, DFS
- **Graph & Heap** — Dijkstra, TopSort, Priority Queue
- **Binary Search** — шаблон, вариации, подводные камни

### Рекурсия
- **Backtracking** — mental model, call stack, pruning, N Queens, Subsets

### Динамическое программирование
- **DP Basics** — memoization vs tabulation, 5 семейств задач, state design

### Таксономия
- **Problem Taxonomy** — 12 паттернов, матрица фраза→паттерн, learning path

## 🎤 Подготовка к собеседованию

Раздел `/interview` + `/taxonomy`. Ключевые ожидания:
- Уметь определить паттерн по условию задачи (Two Pointers, Sliding Window, DP и т.д.)
- Оценить сложность алгоритма (time + space)
- Написать решение на доске / в IDE за 20–30 минут
- Объяснить trade-offs между подходами

## ➡️ Что дальше

- [Patterns Playground](../patterns/) — SOLID, GoF-паттерны, архитектура
- [JS Playground](../js/) — углублённый JavaScript для алгоритмов

## 🛠 Запуск

```bash
cd playgrounds/algo
npm install
npm run dev
# → http://localhost:3241
```

## 📁 Структура

```
src/
  pages/       — страницы по темам (stack, queue, tree, sort, list, hash, graph, search, recursion, dp, taxonomy)
  components/  — переиспользуемые компоненты
  App.tsx      — роутинг и навигация
```
