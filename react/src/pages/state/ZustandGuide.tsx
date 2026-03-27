import { useState, useRef } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ZustandGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🐻 Zustand</h1>
        <p>Минималистичный state manager — простота Redux без бойлерплейта</p>
        <a 
          href="https://docs.pmnd.rs/zustand/getting-started/introduction" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 Документация Zustand
        </a>
      </div>

      <WhatIsZustand />
      <ZustandLiveDemo />
      <BasicUsage />
      <AdvancedPatterns />
      <ZustandVsRedux />
      <InterviewQuestions />
    </div>
  )
}

function WhatIsZustand() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Что такое Zustand?</h3>
        <span className="card-badge">Теория</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🐻</span>
        <div className="info-box-content">
          <div className="info-box-title">Zustand = "состояние" по-немецки</div>
          <p>Маленький (1.5kb), быстрый, масштабируемый state manager. 
          Нет провайдеров, нет бойлерплейта, работает с React и без него.</p>
        </div>
      </div>

      <div className="comparison-grid" style={{ marginTop: '20px' }}>
        <div className="comparison-card" style={{ borderColor: 'var(--accent-green)' }}>
          <div className="comparison-header" style={{ background: 'rgba(34, 197, 94, 0.1)' }}>
            ✅ Преимущества
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>Минимум бойлерплейта</li>
              <li>Не нужен Provider</li>
              <li>Работает вне React компонентов</li>
              <li>Встроенная поддержка middleware</li>
              <li>TypeScript из коробки</li>
              <li>Селекторы для оптимизации</li>
              <li>DevTools поддержка</li>
            </ul>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-orange)' }}>
          <div className="comparison-header" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
            ⚠️ Когда использовать
          </div>
          <div className="comparison-body">
            <ul className="info-list">
              <li>Глобальное состояние приложения</li>
              <li>Когда Context слишком медленный</li>
              <li>Состояние между несвязанными компонентами</li>
              <li>Когда Redux избыточен</li>
              <li>Нужен доступ к state вне React</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Имитация Zustand store для демонстрации
function ZustandLiveDemo() {
  const [bears, setBears] = useState(0)
  const [honey, setHoney] = useState(10)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  const increasePopulation = () => {
    setBears(b => b + 1)
    addLog('increasePopulation() → bears + 1')
  }

  const decreasePopulation = () => {
    setBears(b => Math.max(0, b - 1))
    addLog('decreasePopulation() → bears - 1')
  }

  const removeAllBears = () => {
    setBears(0)
    addLog('removeAllBears() → bears = 0')
  }

  const feedBear = () => {
    if (honey > 0 && bears > 0) {
      setHoney(h => h - 1)
      addLog('feedBear() → honey - 1 🍯')
    } else {
      addLog('feedBear() → failed (no honey or bears)')
    }
  }

  const addHoney = () => {
    setHoney(h => h + 5)
    addLog('addHoney() → honey + 5 🍯')
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎮 Интерактивная демонстрация Store</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div className="info-box">
        <span className="info-box-icon">🐻</span>
        <div className="info-box-content">
          <p>Это имитация Zustand store. Нажимайте кнопки чтобы увидеть как работают actions!</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '16px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '16px' }}>📦 Store State</h4>
            
            <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem' }}>🐻</div>
                <div className="value-display" style={{ fontSize: '2rem' }}>{bears}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>bears</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem' }}>🍯</div>
                <div className="value-display" style={{ fontSize: '2rem' }}>{honey}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>honey</div>
              </div>
            </div>

            <div className="controls" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-success" onClick={increasePopulation}>
                ➕ Медведь
              </button>
              <button className="btn btn-danger" onClick={decreasePopulation}>
                ➖ Медведь
              </button>
              <button className="btn btn-warning" onClick={feedBear}>
                🍯 Покормить
              </button>
              <button className="btn btn-primary" onClick={addHoney}>
                🍯 +5 мёда
              </button>
              <button className="btn btn-secondary" onClick={removeAllBears}>
                🗑️ Убрать всех
              </button>
            </div>
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <h4 style={{ marginBottom: '12px' }}>📋 Action Log</h4>
          <div style={{ 
            background: 'var(--bg-primary)', 
            borderRadius: '8px', 
            padding: '16px',
            minHeight: '200px',
            fontFamily: 'monospace',
            fontSize: '0.85rem'
          }}>
            {logs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)' }}>Нажмите кнопку...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} style={{ marginBottom: '8px', color: 'var(--accent-green)' }}>
                  {log}
                </div>
              ))
            )}
          </div>

          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <strong>Компонент-наблюдатель:</strong>
            <BearWatcher bears={bears} />
            <HoneyWatcher honey={honey} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Компоненты-наблюдатели (демонстрируют селекторы)
function BearWatcher({ bears }: { bears: number }) {
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ fontSize: '0.85rem', marginTop: '8px' }}>
      <span style={{ color: 'var(--accent-blue)' }}>useBearStore(s =&gt; s.bears)</span>
      <span style={{ marginLeft: '8px' }}>→ {bears}</span>
      <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>(renders: {renderCount.current})</span>
    </div>
  )
}

function HoneyWatcher({ honey }: { honey: number }) {
  const renderCount = useRef(0)
  renderCount.current++
  
  return (
    <div style={{ fontSize: '0.85rem', marginTop: '4px' }}>
      <span style={{ color: 'var(--accent-purple)' }}>useBearStore(s =&gt; s.honey)</span>
      <span style={{ marginLeft: '8px' }}>→ {honey}</span>
      <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>(renders: {renderCount.current})</span>
    </div>
  )
}

function BasicUsage() {
  const [activeTab, setActiveTab] = useState<'create' | 'use' | 'actions'>('create')

  const createStoreCode = `// ═══════════════════════════════════════════════════════════════
// 📁 store/useBearStore.ts — Создание Zustand store
// ═══════════════════════════════════════════════════════════════

// Импортируем функцию create — это единственное что нужно!
// create создаёт хук, который можно использовать в компонентах
import { create } from 'zustand'

// ─────────────────────────────────────────────────────────────
// ТИПИЗАЦИЯ: Описываем форму нашего состояния
// Это обязательно для TypeScript — без этого не будет автокомплита
// ─────────────────────────────────────────────────────────────
interface BearState {
  bears: number                           // Количество медведей
  honey: number                           // Количество мёда
  increasePopulation: () => void          // Функция: добавить медведя
  decreasePopulation: () => void          // Функция: убрать медведя  
  removeAllBears: () => void              // Функция: убрать всех
  feedBear: () => void                    // Функция: покормить (мёд -1)
}

// ─────────────────────────────────────────────────────────────
// СОЗДАНИЕ STORE: create<Тип>((set, get) => initialState)
// 
// set — функция для обновления состояния (как setState)
// get — функция для чтения текущего состояния
// ─────────────────────────────────────────────────────────────
export const useBearStore = create<BearState>((set, get) => ({
  
  // ═══════════════════════════════════════════════════════════
  // НАЧАЛЬНОЕ СОСТОЯНИЕ
  // Просто объявляем переменные с начальными значениями
  // ═══════════════════════════════════════════════════════════
  bears: 0,                               // Начинаем с 0 медведей
  honey: 10,                              // Начинаем с 10 единиц мёда
  
  // ═══════════════════════════════════════════════════════════
  // ACTIONS (действия) — функции которые меняют состояние
  // Каждый action вызывает set() чтобы обновить store
  // ═══════════════════════════════════════════════════════════
  
  // Action 1: Увеличить популяцию на 1
  // set() принимает функцию с текущим state и возвращает изменения
  increasePopulation: () => set((state) => ({ 
    bears: state.bears + 1               // Берём текущее значение и +1
  })),
  
  // Action 2: Уменьшить популяцию (но не меньше 0)
  // Используем Math.max чтобы не уйти в минус
  decreasePopulation: () => set((state) => ({ 
    bears: Math.max(0, state.bears - 1)  // Не даём уйти ниже 0
  })),
  
  // Action 3: Убрать всех медведей
  // Можно передать объект напрямую (без функции) если не нужен prev state
  removeAllBears: () => set({ 
    bears: 0                             // Просто устанавливаем 0
  }),
  
  // Action 4: Покормить медведя (сложная логика)
  // Используем get() чтобы прочитать текущее состояние
  feedBear: () => {
    const currentHoney = get().honey     // Читаем текущее количество мёда
    const currentBears = get().bears     // Читаем текущее количество медведей
    
    // Проверяем: есть ли мёд и есть ли кого кормить?
    if (currentHoney > 0 && currentBears > 0) {
      set({ honey: currentHoney - 1 })   // Уменьшаем мёд на 1
    }
  },
}))`

  const useStoreCode = `// ═══════════════════════════════════════════════════════════════
// 📁 components/BearCounter.tsx — Использование store в компонентах
// ═══════════════════════════════════════════════════════════════

import { useBearStore } from '../store/useBearStore'

// ─────────────────────────────────────────────────────────────
// СПОСОБ 1: Селектор (РЕКОМЕНДУЕТСЯ!)
// Подписываемся только на конкретное поле state
// Компонент перерендерится ТОЛЬКО если это поле изменится
// ─────────────────────────────────────────────────────────────
function BearCounter() {
  // Передаём функцию-селектор: (state) => state.bears
  // Это говорит Zustand: "меня интересуют только bears"
  const bears = useBearStore((state) => state.bears)
  //                         ↑ селектор выбирает часть state
  
  // Если изменится honey — этот компонент НЕ перерендерится!
  // Потому что мы подписаны только на bears
  return <h1>🐻 В лесу {bears} медведей</h1>
}


// ─────────────────────────────────────────────────────────────
// СПОСОБ 2: Несколько селекторов
// Каждый вызов — отдельная подписка
// ─────────────────────────────────────────────────────────────
function BearAndHoneyDisplay() {
  // Два отдельных селектора = две подписки
  const bears = useBearStore((state) => state.bears)   // Подписка 1
  const honey = useBearStore((state) => state.honey)   // Подписка 2
  
  return (
    <div>
      <p>Медведей: {bears}</p>
      <p>Мёда: {honey} 🍯</p>
    </div>
  )
}


// ─────────────────────────────────────────────────────────────
// СПОСОБ 3: Объект + shallow (для нескольких полей сразу)
// ВАЖНО: без shallow будет ре-рендер на ЛЮБОЕ изменение!
// ─────────────────────────────────────────────────────────────
import { shallow } from 'zustand/shallow'   // Импорт shallow compare

function BearInfo() {
  // Возвращаем объект с нужными полями
  // shallow сравнивает поля объекта, а не ссылку
  const { bears, honey } = useBearStore(
    (state) => ({                          // Селектор возвращает объект
      bears: state.bears,                  // Выбираем bears
      honey: state.honey,                  // Выбираем honey
    }),
    shallow                                // ← БЕЗ ЭТОГО НЕ РАБОТАЕТ!
  )
  // shallow делает поверхностное сравнение: 
  // { bears: 5, honey: 10 } === { bears: 5, honey: 10 } → true
  // Без shallow: {} === {} → всегда false (разные ссылки)
  
  return <div>{bears} bears with {honey} honey</div>
}


// ─────────────────────────────────────────────────────────────
// ❌ АНТИПАТТЕРН: Подписка на весь store
// Компонент перерендерится при ЛЮБОМ изменении!
// ─────────────────────────────────────────────────────────────
function BadComponent() {
  // Без селектора = подписка на ВСЁ
  const store = useBearStore()             // ❌ Плохо!
  //                         ↑ нет селектора
  
  // Этот компонент будет ререндериться при любом изменении store
  return <div>{store.bears}</div>
}`

  const actionsCode = `// ═══════════════════════════════════════════════════════════════
// 📁 components/BearControls.tsx — Вызов actions
// ═══════════════════════════════════════════════════════════════

import { useBearStore } from '../store/useBearStore'

function BearControls() {
  // ─────────────────────────────────────────────────────────────
  // ПОЛУЧЕНИЕ ACTIONS: Через селектор
  // Actions — это просто функции, они не меняются между рендерами
  // Поэтому подписка на action НЕ вызывает лишних ре-рендеров
  // ─────────────────────────────────────────────────────────────
  
  const increasePopulation = useBearStore((s) => s.increasePopulation)
  const decreasePopulation = useBearStore((s) => s.decreasePopulation)
  const removeAllBears = useBearStore((s) => s.removeAllBears)
  //    ↑ функция           ↑ store         ↑ селектор

  return (
    <div>
      {/* Вызываем action при клике */}
      <button onClick={increasePopulation}>
        ➕ Добавить медведя
      </button>
      
      <button onClick={decreasePopulation}>
        ➖ Убрать медведя
      </button>
      
      <button onClick={removeAllBears}>
        🗑️ Убрать всех
      </button>
    </div>
  )
}


// ─────────────────────────────────────────────────────────────
// ИСПОЛЬЗОВАНИЕ ВНЕ REACT (в обычном JS/TS файле)
// Zustand store — это обычный объект, работает везде!
// ─────────────────────────────────────────────────────────────

// 📁 utils/bearUtils.ts (не React компонент!)

import { useBearStore } from '../store/useBearStore'

// ✅ Читаем state напрямую (без хука)
export function getCurrentBears() {
  // getState() возвращает текущий снимок state
  const state = useBearStore.getState()
  return state.bears                      // Возвращаем количество медведей
}

// ✅ Вызываем action напрямую  
export function addBearFromOutside() {
  // getState() даёт доступ к actions тоже
  useBearStore.getState().increasePopulation()
}

// ✅ Изменяем state напрямую (без action)
export function setBears(count: number) {
  // setState работает как set() внутри store
  useBearStore.setState({ bears: count })
}

// ✅ Подписываемся на изменения (для логирования, аналитики)
export function setupBearLogger() {
  // subscribe вызывает callback при каждом изменении
  const unsubscribe = useBearStore.subscribe(
    (state, prevState) => {               // Получаем новый и старый state
      console.log(
        'Bears changed:',
        prevState.bears,                  // Было
        '→',
        state.bears                       // Стало
      )
    }
  )
  
  // Вызови unsubscribe() чтобы отписаться
  return unsubscribe
}`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Базовое использование</h3>
        <span className="card-badge">Код</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          className={`btn ${activeTab === 'create' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('create')}
        >
          1. Создание store
        </button>
        <button 
          className={`btn ${activeTab === 'use' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('use')}
        >
          2. Использование
        </button>
        <button 
          className={`btn ${activeTab === 'actions' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('actions')}
        >
          3. Actions
        </button>
      </div>

      {activeTab === 'create' && <CodeBlock code={createStoreCode} language="tsx" />}
      {activeTab === 'use' && <CodeBlock code={useStoreCode} language="tsx" />}
      {activeTab === 'actions' && <CodeBlock code={actionsCode} language="tsx" />}
    </div>
  )
}

function AdvancedPatterns() {
  const [pattern, setPattern] = useState<'persist' | 'devtools' | 'slices'>('persist')

  const persistCode = `// ═══════════════════════════════════════════════════════════════
// PERSIST — автоматическое сохранение state в localStorage
// При перезагрузке страницы state восстанавливается!
// ═══════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface UserState {
  user: { name: string; theme: 'light' | 'dark' } | null
  token: string | null
  setUser: (user: UserState['user']) => void
  logout: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    // Store creator — обычная функция как без persist
    (set) => ({
      user: null,                         // Изначально не залогинен
      token: null,                        // Изначально нет токена
      
      setUser: (user) => set({ user }),   // Устанавливаем юзера
      
      logout: () => set({                 // Очищаем всё при логауте
        user: null, 
        token: null 
      }),
    }),
    
    // ─────────────────────────────────────────────────────────
    // КОНФИГУРАЦИЯ PERSIST
    // ─────────────────────────────────────────────────────────
    {
      name: 'user-storage',               // Ключ в localStorage
      
      storage: createJSONStorage(         // Какой storage использовать
        () => localStorage                // Можно sessionStorage
      ),
      
      // Выбираем ЧТО сохранять (не всё нужно!)
      partialize: (state) => ({
        user: state.user,                 // ✅ Сохраняем user
        // token не сохраняем — безопасность!
      }),
      
      // Версионирование для миграций
      version: 1,
      
      // Миграция при изменении схемы
      migrate: (persisted: any, version) => {
        if (version === 0) {
          // Старая версия → новая
          persisted.user = {
            ...persisted.user,
            theme: persisted.theme || 'light'
          }
        }
        return persisted
      },
    }
  )
)`

  const devtoolsCode = `// ═══════════════════════════════════════════════════════════════
// DEVTOOLS — интеграция с Redux DevTools в браузере
// Позволяет отслеживать все изменения state
// ═══════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface TodoState {
  todos: Array<{ id: number; text: string; done: boolean }>
  addTodo: (text: string) => void
  toggleTodo: (id: number) => void
}

export const useTodoStore = create<TodoState>()(
  devtools(
    (set) => ({
      todos: [],
      
      // Третий параметр set() — имя action для DevTools
      addTodo: (text) => set(
        (state) => ({
          todos: [...state.todos, {       // Добавляем новую задачу
            id: Date.now(),               // Уникальный ID
            text,                         // Текст из параметра
            done: false                   // Изначально не выполнена
          }]
        }),
        false,                            // replace: false = merge
        'todos/addTodo'                   // ← Имя в DevTools!
      ),
      
      toggleTodo: (id) => set(
        (state) => ({
          todos: state.todos.map(todo => 
            todo.id === id 
              ? { ...todo, done: !todo.done }
              : todo
          )
        }),
        false,
        'todos/toggleTodo'
      ),
    }),
    {
      name: 'TodoStore',                  // Имя store в DevTools
      enabled: process.env.NODE_ENV === 'development',
    }
  )
)`

  const slicesCode = `// ═══════════════════════════════════════════════════════════════
// SLICES — разделение большого store на модули
// ═══════════════════════════════════════════════════════════════

// 📁 slices/bearSlice.ts
import { StateCreator } from 'zustand'

export interface BearSlice {
  bears: number
  addBear: () => void
}

export const createBearSlice: StateCreator<
  BearSlice & FishSlice,                  // Полный тип store
  [],
  [],
  BearSlice                                // Тип этого slice
> = (set) => ({
  bears: 0,
  addBear: () => set((s) => ({ bears: s.bears + 1 })),
})

// 📁 slices/fishSlice.ts
export interface FishSlice {
  fishes: number
  addFish: () => void
}

export const createFishSlice: StateCreator<
  BearSlice & FishSlice,
  [],
  [],
  FishSlice
> = (set) => ({
  fishes: 0,
  addFish: () => set((s) => ({ fishes: s.fishes + 1 })),
})

// 📁 store/index.ts — объединение
import { create } from 'zustand'

type StoreState = BearSlice & FishSlice

export const useStore = create<StoreState>()(
  (...args) => ({
    ...createBearSlice(...args),          // Spread bear slice
    ...createFishSlice(...args),          // Spread fish slice
  })
)

// Использование
const bears = useStore((s) => s.bears)    // Из bear slice
const addFish = useStore((s) => s.addFish) // Из fish slice`

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Продвинутые паттерны</h3>
        <span className="card-badge">Pro</span>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
        {(['persist', 'devtools', 'slices'] as const).map(p => (
          <button 
            key={p}
            className={`btn ${pattern === p ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setPattern(p)}
          >
            {p === 'persist' && '💾 Persist'}
            {p === 'devtools' && '🔧 DevTools'}
            {p === 'slices' && '🍕 Slices'}
          </button>
        ))}
      </div>

      {pattern === 'persist' && <CodeBlock code={persistCode} language="tsx" />}
      {pattern === 'devtools' && <CodeBlock code={devtoolsCode} language="tsx" />}
      {pattern === 'slices' && <CodeBlock code={slicesCode} language="tsx" />}
    </div>
  )
}

function ZustandVsRedux() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Zustand vs Redux</h3>
        <span className="card-badge">Сравнение</span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>Критерий</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>🐻 Zustand</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>🔮 Redux</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Размер</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)' }}>~1.5kb</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>~12kb</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Provider</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)' }}>Не нужен</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Обязателен</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>Async</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-green)' }}>async/await</td>
              <td style={{ padding: '12px', borderBottom: '1px solid var(--border-color)' }}>createAsyncThunk</td>
            </tr>
            <tr>
              <td style={{ padding: '12px' }}>Learning curve</td>
              <td style={{ padding: '12px', color: 'var(--accent-green)' }}>Низкий</td>
              <td style={{ padding: '12px' }}>Средний</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "Чем Zustand отличается от Context API?",
      a: "Context перерендеривает ВСЕ компоненты при изменении. Zustand использует селекторы — обновляется только если изменилась выбранная часть. Также работает вне React."
    },
    {
      q: "Как избежать лишних ре-рендеров?",
      a: "Селекторы: useBearStore(s => s.bears). Для объектов — shallow: useBearStore(selector, shallow)."
    },
    {
      q: "Можно ли использовать вне React?",
      a: "Да! store.getState(), store.setState(), store.subscribe()."
    }
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">❓ Вопросы на собеседовании</h3>
        <span className="card-badge">Interview</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((item, i) => (
          <div 
            key={i}
            style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ marginTop: '12px', color: 'var(--accent-green)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
