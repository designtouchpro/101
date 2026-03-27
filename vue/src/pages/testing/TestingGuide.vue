<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'setup' | 'components' | 'composables' | 'pinia' | 'async' | 'patterns'>('setup')

const interviewQuestions = [
  {
    q: 'Чем Vitest лучше Jest для Vue проектов?',
    a: 'Vitest использует тот же конфиг Vite что и проект — ESM native, быстрый HMR режим (watch), поддержка TypeScript без babel. Jest нужно отдельно настраивать трансформеры для Vue SFC, ESM, TS. Vitest совместим с Jest API (describe, it, expect, vi.fn).'
  },
  {
    q: 'Зачем mount vs shallowMount?',
    a: 'mount рендерит компонент и все дочерние. shallowMount заглушает дочерние компоненты стабами. shallowMount быстрее и изолирует тест, но может пропустить интеграционные баги. Рекомендация: mount по умолчанию, shallowMount для юнит-тестов тяжёлых компонентов.'
  },
  {
    q: 'Как тестировать composable с зависимостями?',
    a: 'Создаём wrapper-компонент с setup() для provide/inject. Для Pinia — createTestingPinia(). Для router — используем мок роутера. Composable нужно вызывать ВНУТРИ setup() компонента (или withSetup helper), иначе не сработают lifecycle hooks.'
  },
]

const setupCode = `// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',          // или 'happy-dom' (быстрее)
    globals: true,                  // describe, it, expect без import
    setupFiles: './tests/setup.ts', // глобальные настройки
  },
  resolve: {
    alias: { '@': '/src' },
  },
})

// tests/setup.ts
import { config } from '@vue/test-utils'

// Глобальные моки для всех тестов
config.global.stubs = {
  Transition: false,     // рендерить <Transition> как обычный элемент
  RouterLink: true,      // заглушить RouterLink
}

// package.json scripts
// "test": "vitest",
// "test:run": "vitest run",
// "test:coverage": "vitest run --coverage"`

const componentTestCode = `// Counter.vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
const emit = defineEmits<{ change: [value: number] }>()
const increment = () => { count.value++; emit('change', count.value) }
<\/script>
<template>
  <div>
    <span data-testid="count">{{ count }}</span>
    <button @click="increment">+1</button>
  </div>
</template>

// Counter.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Counter from './Counter.vue'

describe('Counter', () => {
  it('renders initial count', () => {
    const wrapper = mount(Counter)
    expect(wrapper.find('[data-testid="count"]').text()).toBe('0')
  })

  it('increments on click', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('[data-testid="count"]').text()).toBe('1')
  })

  it('emits change event', async () => {
    const wrapper = mount(Counter)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')![0]).toEqual([1])
  })

  // Props
  it('accepts initial value via props', () => {
    const wrapper = mount(Counter, {
      props: { initialValue: 5 }
    })
    expect(wrapper.find('[data-testid="count"]').text()).toBe('5')
  })

  // Slots
  it('renders slot content', () => {
    const wrapper = mount(Counter, {
      slots: { default: '<span>Custom</span>' }
    })
    expect(wrapper.html()).toContain('Custom')
  })

  // Provide/Inject
  it('uses injected value', () => {
    const wrapper = mount(Counter, {
      global: {
        provide: { theme: 'dark' }
      }
    })
    // ...
  })
})`

const composableTestCode = `// useCounter.ts
import { ref, computed } from 'vue'

export function useCounter(initial = 0) {
  const count = ref(initial)
  const doubled = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }

  return { count, doubled, increment, decrement }
}

// useCounter.spec.ts
import { describe, it, expect } from 'vitest'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  // Простой composable без lifecycle — тестируем напрямую
  it('starts with initial value', () => {
    const { count } = useCounter(10)
    expect(count.value).toBe(10)
  })

  it('increments', () => {
    const { count, increment } = useCounter()
    increment()
    expect(count.value).toBe(1)
  })

  it('computes doubled', () => {
    const { doubled, increment } = useCounter(5)
    expect(doubled.value).toBe(10)
    increment()
    expect(doubled.value).toBe(12)
  })
})

// Composable С lifecycle hooks — нужен компонент-обёртка
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { useFetch } from './useFetch'

function withSetup<T>(composable: () => T) {
  let result: T
  const wrapper = mount(defineComponent({
    setup() {
      result = composable()
      return {}
    },
    template: '<div />'
  }))
  return { result: result!, wrapper }
}

it('useFetch loads data', async () => {
  const { result } = withSetup(() => useFetch('/api/users'))
  // result.data, result.loading, result.error
})`

const piniaTestCode = `// stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  function increment() { count.value++ }
  return { count, doubled, increment }
})

// stores/counter.spec.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './counter'

describe('Counter Store', () => {
  beforeEach(() => {
    // Свежий Pinia для каждого теста — изоляция!
    setActivePinia(createPinia())
  })

  it('starts at 0', () => {
    const store = useCounterStore()
    expect(store.count).toBe(0)
  })

  it('increments', () => {
    const store = useCounterStore()
    store.increment()
    expect(store.count).toBe(1)
    expect(store.doubled).toBe(2)
  })
})

// Тестирование компонента с Pinia
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import Component from './Component.vue'

it('renders with mocked store', () => {
  const wrapper = mount(Component, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            counter: { count: 42 }  // имя store → начальное состояние
          },
          stubActions: true,  // все actions заменены на vi.fn()
        })
      ]
    }
  })
  expect(wrapper.text()).toContain('42')
})`

const asyncTestCode = `// Тестирование async компонентов

import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UserList from './UserList.vue'

// Мок fetch
global.fetch = vi.fn()

describe('UserList', () => {
  it('loads and displays users', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ])
    } as Response)

    const wrapper = mount(UserList)

    // Ждём все промисы и nextTick
    await flushPromises()

    expect(wrapper.findAll('li')).toHaveLength(2)
    expect(wrapper.text()).toContain('Alice')
  })

  it('shows error on failure', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const wrapper = mount(UserList)
    await flushPromises()

    expect(wrapper.find('.error').text()).toContain('Network error')
  })
})

// Тестирование с nextTick
import { nextTick } from 'vue'

it('updates DOM after state change', async () => {
  const wrapper = mount(Counter)

  // Меняем reactive state напрямую
  wrapper.vm.count = 5

  // DOM ещё НЕ обновлён — Vue батчит обновления
  await nextTick()
  // Теперь DOM обновлён

  expect(wrapper.find('[data-testid="count"]').text()).toBe('5')
})

// Тестирование таймеров
it('debounced search', async () => {
  vi.useFakeTimers()

  const wrapper = mount(SearchComponent)
  await wrapper.find('input').setValue('vue')

  vi.advanceTimersByTime(300) // пропустить debounce
  await flushPromises()

  expect(wrapper.find('.results').exists()).toBe(true)
  vi.useRealTimers()
})`

const patternsCode = `// === Организация тестов ===

// Структура файлов
// src/
//   components/
//     Counter.vue
//     Counter.spec.ts        ← рядом с компонентом
//   composables/
//     useCounter.ts
//     useCounter.spec.ts
//   stores/
//     counter.ts
//     counter.spec.ts

// === Что тестировать в Vue ===
// ✅ Composables — логика, реактивность, edge cases
// ✅ Store (Pinia) — state transitions, actions, getters
// ✅ Компоненты — рендеринг, события, props/emits, slots
// ✅ Интеграция — компонент + store + router вместе
// ❌ Шаблон (HTML) — не тестируйте точную структуру DOM
// ❌ Стили — не тестируйте CSS (используйте visual regression)
// ❌ Внутри Vue — не тестируйте ref/reactive сам по себе

// === Мок роутера ===
import { mount } from '@vue/test-utils'
import { createRouter, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/users/:id', component: { template: '<div>User</div>' } },
  ],
})

it('navigates to user', async () => {
  router.push('/users/1')
  await router.isReady()

  const wrapper = mount(UserPage, {
    global: { plugins: [router] }
  })
  // ...
})

// === Snapshot testing ===
it('matches snapshot', () => {
  const wrapper = mount(Counter)
  expect(wrapper.html()).toMatchSnapshot()
  // ⚠️ Snapshots ломаются при любом изменении разметки
  // Используйте осторожно — только для стабильных компонентов
})`
</script>

<template>
  <div class="page-container">
    <h1>🧪 Тестирование Vue</h1>
    <p class="page-description">
      Vitest + Vue Test Utils: компоненты, composables, Pinia, асинхронность и паттерны.
    </p>

    <div class="card">
      <div class="tabs">
        <button
          v-for="tab in [
            { key: 'setup', label: '⚙️ Настройка' },
            { key: 'components', label: '🧩 Компоненты' },
            { key: 'composables', label: '🔗 Composables' },
            { key: 'pinia', label: '🍍 Pinia' },
            { key: 'async', label: '⏳ Async' },
            { key: 'patterns', label: '📋 Паттерны' },
          ]"
          :key="tab.key"
          :class="['tab-button', { active: activeTab === tab.key }]"
          @click="activeTab = tab.key as any"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Setup -->
      <div v-if="activeTab === 'setup'">
        <h3 style="margin-top: 16px">Vitest + Vue Test Utils</h3>
        <p>
          Vitest — тестовый фреймворк от Vite. Использует тот же конфиг, поддерживает ESM нативно,
          TypeScript без трансформеров, watch mode с HMR.
        </p>
        <CodeBlock :code="setupCode" title="📝 Конфигурация Vitest для Vue" />
        <div class="info-box" style="margin-top: 12px">
          <strong>📦 Зависимости:</strong>
          <code>vitest @vue/test-utils happy-dom @pinia/testing</code>
        </div>
      </div>

      <!-- Components -->
      <div v-if="activeTab === 'components'">
        <h3 style="margin-top: 16px">Тестирование компонентов</h3>
        <p>
          <code>mount()</code> создаёт компонент с реальным DOM. Можно проверять рендеринг,
          взаимодействие, events, props, slots, provide/inject.
        </p>
        <CodeBlock :code="componentTestCode" title="📝 Counter: рендеринг, клики, events, props, slots" />
      </div>

      <!-- Composables -->
      <div v-if="activeTab === 'composables'">
        <h3 style="margin-top: 16px">Тестирование composables</h3>
        <p>
          Простые composables (без lifecycle) тестируются напрямую.
          Composables с <code>onMounted</code>, <code>watch</code> и т.д. — через компонент-обёртку.
        </p>
        <CodeBlock :code="composableTestCode" title="📝 Composable: прямой тест и withSetup helper" />
      </div>

      <!-- Pinia -->
      <div v-if="activeTab === 'pinia'">
        <h3 style="margin-top: 16px">Тестирование Pinia</h3>
        <p>
          Stores тестируются напрямую с <code>setActivePinia(createPinia())</code>.
          Для компонентов — <code>createTestingPinia()</code> с начальным состоянием и мок-actions.
        </p>
        <CodeBlock :code="piniaTestCode" title="📝 Pinia: unit-тест store и интеграция с компонентом" />
      </div>

      <!-- Async -->
      <div v-if="activeTab === 'async'">
        <h3 style="margin-top: 16px">Асинхронные тесты</h3>
        <p>
          <code>flushPromises()</code> ждёт все pending-промисы.
          <code>await nextTick()</code> — ждёт один цикл обновления DOM.
          <code>vi.useFakeTimers()</code> — контроль setTimeout/setInterval.
        </p>
        <CodeBlock :code="asyncTestCode" title="📝 Async: fetch, nextTick, таймеры" />
      </div>

      <!-- Patterns -->
      <div v-if="activeTab === 'patterns'">
        <h3 style="margin-top: 16px">Паттерны и организация</h3>
        <CodeBlock :code="patternsCode" title="📝 Структура, мок роутера, snapshot testing" />
      </div>
    </div>

    <!-- Interview questions -->
    <div class="card" style="margin-top: 24px">
      <div class="card-header">
        <span class="card-title">🎯 Вопросы на собеседовании</span>
      </div>
      <div v-for="(question, i) in interviewQuestions" :key="i" class="interview-question">
        <strong>{{ question.q }}</strong>
        <p>{{ question.a }}</p>
      </div>
    </div>
  </div>
</template>
