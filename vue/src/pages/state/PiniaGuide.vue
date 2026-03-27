<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const piniaBasicsCode = `// ═══════════════════════════════════════════════════════════════
// 🍍 Pinia — официальное решение для state management
// ═══════════════════════════════════════════════════════════════

// stores/counter.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// ─────────────────────────────────────────────────────────────
// Setup Store (рекомендуется) — как Composition API
// ─────────────────────────────────────────────────────────────
export const useCounterStore = defineStore('counter', () => {
  // State = ref()
  const count = ref(0)
  const name = ref('Pinia')
  
  // Getters = computed()
  const doubleCount = computed(() => count.value * 2)
  const greeting = computed(() => \`Hello, \${name.value}!\`)
  
  // Actions = functions
  function increment() {
    count.value++
  }
  
  function setName(newName: string) {
    name.value = newName
  }
  
  async function fetchData() {
    const response = await fetch('/api/data')
    // ...
  }
  
  // Возвращаем всё что нужно экспортировать
  return {
    count,
    name,
    doubleCount,
    greeting,
    increment,
    setName,
    fetchData
  }
})`

const optionsStoreCode = `// ═══════════════════════════════════════════════════════════════
// 📦 Options Store — альтернативный синтаксис
// ═══════════════════════════════════════════════════════════════

export const useCounterStore = defineStore('counter', {
  // State — функция, возвращающая объект
  state: () => ({
    count: 0,
    name: 'Pinia'
  }),
  
  // Getters — как computed
  getters: {
    doubleCount: (state) => state.count * 2,
    
    // Доступ к другим getters через this
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    }
  },
  
  // Actions — методы для изменения state
  actions: {
    increment() {
      this.count++
    },
    
    async fetchData() {
      const response = await fetch('/api/data')
      this.count = await response.json()
    }
  }
})`

const useStoreCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔌 Использование Store в компонентах
     ═══════════════════════════════════════════════════════════════ -->

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { storeToRefs } from 'pinia'

// Получаем store
const counterStore = useCounterStore()

// ─────────────────────────────────────────────────────────────
// ⚠️ ВАЖНО: Деструктуризация теряет реактивность!
// ─────────────────────────────────────────────────────────────
// ❌ Неправильно — count больше не реактивен
const { count } = counterStore

// ✅ Правильно — storeToRefs сохраняет реактивность
const { count, name, doubleCount } = storeToRefs(counterStore)

// Actions можно деструктурировать напрямую
const { increment, setName } = counterStore
<\/script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Double: {{ doubleCount }}</p>
    
    <!-- Можно обращаться напрямую к store -->
    <p>{{ counterStore.greeting }}</p>
    
    <button @click="increment">+1</button>
    <button @click="counterStore.count++">Direct mutation</button>
  </div>
</template>`

const advancedPiniaCode = `// ═══════════════════════════════════════════════════════════════
// 🚀 Продвинутые возможности Pinia
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// $reset() — сброс state к начальному (только Options Store)
// ─────────────────────────────────────────────────────────────
counterStore.$reset()


// ─────────────────────────────────────────────────────────────
// $patch() — атомарное обновление нескольких значений
// ─────────────────────────────────────────────────────────────
counterStore.$patch({
  count: counterStore.count + 1,
  name: 'Pinia 2'
})

// С функцией — для сложных мутаций
counterStore.$patch((state) => {
  state.items.push({ id: 1 })
  state.count++
})


// ─────────────────────────────────────────────────────────────
// $subscribe() — подписка на изменения state
// ─────────────────────────────────────────────────────────────
counterStore.$subscribe((mutation, state) => {
  console.log('State changed:', mutation.type)
  console.log('New state:', state)
  
  // Сохраняем в localStorage
  localStorage.setItem('counter', JSON.stringify(state))
})


// ─────────────────────────────────────────────────────────────
// $onAction() — подписка на вызовы actions
// ─────────────────────────────────────────────────────────────
counterStore.$onAction(({ name, args, after, onError }) => {
  console.log(\`Action "\${name}" called with:\`, args)
  
  after((result) => {
    console.log(\`Action "\${name}" finished with:\`, result)
  })
  
  onError((error) => {
    console.error(\`Action "\${name}" failed:\`, error)
  })
})


// ─────────────────────────────────────────────────────────────
// Использование одного store в другом
// ─────────────────────────────────────────────────────────────
export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()  // Другой store
  
  const canCheckout = computed(() => {
    return userStore.isLoggedIn && items.value.length > 0
  })
  
  return { canCheckout }
})`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🍍 Pinia</h1>
      <p>Официальное решение для управления состоянием Vue</p>
      <a 
        href="https://pinia.vuejs.org/" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Pinia
      </a>
    </div>

    <!-- Основы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Setup Store (рекомендуется)</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Почему Pinia?</div>
          <p>
            Pinia — это официальная замена Vuex. Проще, типизированнее, 
            без mutations, с поддержкой Composition API.
          </p>
        </div>
      </div>

      <CodeBlock :code="piniaBasicsCode" language="typescript" title="🍍 Setup Store" />
    </div>

    <!-- Options Store -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Options Store</h3>
        <span class="card-badge">Альтернатива</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">📦</span>
        <div class="info-box-content">
          <div class="info-box-title">Похоже на Vuex</div>
          <p>
            Options синтаксис знаком тем, кто работал с Vuex. 
            Но Setup Store даёт больше гибкости.
          </p>
        </div>
      </div>

      <CodeBlock :code="optionsStoreCode" language="typescript" title="📦 Options Store" />
    </div>

    <!-- Использование -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Использование в компонентах</h3>
        <span class="card-badge">Практика</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">storeToRefs!</div>
          <p>
            При деструктуризации state/getters используйте <code>storeToRefs()</code> 
            для сохранения реактивности. Actions можно деструктурировать напрямую.
          </p>
        </div>
      </div>

      <CodeBlock :code="useStoreCode" language="html" title="🔌 Использование Store" />
    </div>

    <!-- Продвинутые возможности -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Продвинутые возможности</h3>
        <span class="card-badge">Pro</span>
      </div>

      <CodeBlock :code="advancedPiniaCode" language="typescript" title="🚀 $patch, $subscribe, $onAction" />
    </div>

    <!-- Сравнение с Vuex -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Pinia vs Vuex</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Аспект</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">🍍 Pinia</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Vuex 4</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Mutations</td>
              <td style="padding: 12px">❌ Не нужны</td>
              <td style="padding: 12px">✅ Обязательны</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">TypeScript</td>
              <td style="padding: 12px">✅ Отличная поддержка</td>
              <td style="padding: 12px">⚠️ Сложная настройка</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">DevTools</td>
              <td style="padding: 12px">✅ Встроено</td>
              <td style="padding: 12px">✅ Встроено</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Hot Module Reload</td>
              <td style="padding: 12px">✅ Автоматически</td>
              <td style="padding: 12px">⚠️ Нужна настройка</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Modules</td>
              <td style="padding: 12px">Отдельные stores</td>
              <td style="padding: 12px">Вложенные модули</td>
            </tr>
            <tr>
              <td style="padding: 12px">Bundle size</td>
              <td style="padding: 12px">~1KB</td>
              <td style="padding: 12px">~10KB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Структура проекта -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📁 Структура проекта</h3>
        <span class="card-badge">Best Practice</span>
      </div>

      <div class="visual-diagram">
        <pre style="font-family: 'Fira Code', monospace; font-size: 0.85rem; color: var(--text-secondary)">
src/
├── stores/
│   ├── index.ts         # Экспорт всех stores
│   ├── user.ts          # useUserStore
│   ├── cart.ts          # useCartStore
│   ├── products.ts      # useProductsStore
│   └── ui.ts            # useUIStore (темы, модалки)
├── composables/         # Локальная логика
└── components/
        </pre>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✅</span>
        <div class="info-box-content">
          <div class="info-box-title">Когда использовать Pinia vs Composable</div>
          <p>
            <strong>Pinia</strong> — для глобального состояния (auth, cart, settings).<br/>
            <strong>Composables</strong> — для локальной переиспользуемой логики.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
