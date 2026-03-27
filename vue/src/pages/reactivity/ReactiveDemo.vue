<script setup lang="ts">
import { reactive, ref, watch, onMounted, toRefs } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import RenderLog from '@/components/RenderLog.vue'
import RenderCounter from '@/components/RenderCounter.vue'
import type { LogEntry } from '@/components/RenderLog.vue'

// Demo state
const state = reactive({
  user: {
    name: 'Вася',
    age: 25,
    address: {
      city: 'Москва',
      country: 'Россия'
    }
  },
  items: ['Vue', 'React', 'Angular']
})

const updateCount = ref(0)
const logs = ref<LogEntry[]>([])
const mountTime = ref(Date.now())

const addLog = (type: LogEntry['type'], message: string) => {
  logs.value.push({
    type,
    message,
    timestamp: Date.now() - mountTime.value
  })
}

onMounted(() => {
  addLog('mount', 'Компонент смонтирован')
})

watch(
  () => state,
  () => {
    updateCount.value++
    addLog('update', 'state изменился')
  },
  { deep: true }
)

const updateName = () => {
  state.user.name = state.user.name === 'Вася' ? 'Петя' : 'Вася'
}

const updateAge = () => {
  state.user.age++
}

const updateCity = () => {
  state.user.address.city = state.user.address.city === 'Москва' ? 'Питер' : 'Москва'
}

const addItem = () => {
  state.items.push(`Item ${state.items.length + 1}`)
}

const resetDemo = () => {
  state.user.name = 'Вася'
  state.user.age = 25
  state.user.address.city = 'Москва'
  state.items = ['Vue', 'React', 'Angular']
  updateCount.value = 0
  logs.value = []
  mountTime.value = Date.now()
  addLog('mount', 'Демо сброшено')
}

const whatIsReactiveCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ reactive() — глубокая реактивность для объектов
// Использует JavaScript Proxy под капотом
// ═══════════════════════════════════════════════════════════════

import { reactive } from 'vue'

// ─────────────────────────────────────────────────────────────
// Создание reactive объекта
// ─────────────────────────────────────────────────────────────
const state = reactive({
  user: {
    name: 'Вася',
    profile: {
      age: 25,
      city: 'Москва'
    }
  },
  items: ['a', 'b', 'c']
})

// ─────────────────────────────────────────────────────────────
// Доступ к значениям: БЕЗ .value!
// ─────────────────────────────────────────────────────────────
console.log(state.user.name)         // 'Вася'
state.user.name = 'Петя'             // ✅ Реактивно!
state.user.profile.age++             // ✅ Глубокая реактивность
state.items.push('d')                // ✅ Массивы тоже работают


// ═══════════════════════════════════════════════════════════════
// 🎯 ВАЖНО: reactive() работает ТОЛЬКО с объектами!
// ═══════════════════════════════════════════════════════════════
// const count = reactive(0)         // ❌ НЕ РАБОТАЕТ!
// const name = reactive('Vue')      // ❌ НЕ РАБОТАЕТ!
// const flag = reactive(true)       // ❌ НЕ РАБОТАЕТ!`

const refVsReactiveCode = `// ═══════════════════════════════════════════════════════════════
// 📦 ref() vs ⚡ reactive() — когда что использовать?
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// ref() — универсальный, работает с чем угодно
// ─────────────────────────────────────────────────────────────
const count = ref(0)              // ✅ Примитивы
const user = ref({ name: 'Vue' }) // ✅ Объекты тоже

count.value++                      // Нужен .value
user.value.name = 'React'          // Нужен .value


// ─────────────────────────────────────────────────────────────
// reactive() — только объекты, без .value
// ─────────────────────────────────────────────────────────────
const state = reactive({
  count: 0,
  user: { name: 'Vue' }
})

state.count++                      // Без .value!
state.user.name = 'React'          // Без .value!


// ═══════════════════════════════════════════════════════════════
// 🎯 Рекомендация: используйте ref() по умолчанию
// reactive() — для сложных вложенных структур
// ═══════════════════════════════════════════════════════════════`

const pitfallsCode = `// ═══════════════════════════════════════════════════════════════
// ⚠️ ЛОВУШКИ reactive() — потеря реактивности!
// ═══════════════════════════════════════════════════════════════

const state = reactive({ count: 0, user: { name: 'Vue' } })

// ─────────────────────────────────────────────────────────────
// ❌ ОШИБКА 1: Переназначение всего объекта
// ─────────────────────────────────────────────────────────────
state = { count: 1 }              // ❌ Потеря реактивности!
// Proxy потерян, новый объект не реактивен

// ✅ Правильно: изменяйте свойства
state.count = 1


// ─────────────────────────────────────────────────────────────
// ❌ ОШИБКА 2: Деструктуризация
// ─────────────────────────────────────────────────────────────
let { count } = state             // ❌ count теперь обычная переменная
count++                           // Не триггерит обновление UI

// ✅ Правильно: используйте toRefs
import { toRefs } from 'vue'
const { count } = toRefs(state)   // count теперь ref
count.value++                     // ✅ Реактивно!


// ─────────────────────────────────────────────────────────────
// ❌ ОШИБКА 3: Передача свойства в функцию
// ─────────────────────────────────────────────────────────────
function double(n) { return n * 2 }
double(state.count)               // Просто число, не реактивно

// ✅ Правильно: передавайте весь объект или ref
function double(state) { return state.count * 2 }`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>⚡ reactive()</h1>
      <p>Глубокая реактивность для объектов через Proxy</p>
      <a 
        href="https://vuejs.org/api/reactivity-core.html#reactive" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Что такое reactive -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Что такое reactive()?</h3>
        <span class="card-badge">Теория</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            <strong>reactive()</strong> создаёт Proxy-объект с глубокой реактивностью. 
            В отличие от ref(), не требует <code>.value</code>, но работает <strong>только с объектами</strong>.
          </p>
        </div>
      </div>

      <CodeBlock :code="whatIsReactiveCode" language="typescript" title="⚡ Основы reactive()" />
    </div>

    <!-- ref vs reactive -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ref() vs reactive()</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <CodeBlock :code="refVsReactiveCode" language="typescript" title="🔄 Когда что использовать" />

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header before">
            <span>📦 ref()</span>
          </div>
          <div class="comparison-body">
            <ul style="color: var(--text-secondary); padding-left: 20px">
              <li>✅ Работает с любыми типами</li>
              <li>✅ Можно переназначить целиком</li>
              <li>✅ Безопаснее в использовании</li>
              <li>⚠️ Нужен .value в script</li>
            </ul>
          </div>
        </div>

        <div class="comparison-card">
          <div class="comparison-header after">
            <span>⚡ reactive()</span>
          </div>
          <div class="comparison-body">
            <ul style="color: var(--text-secondary); padding-left: 20px">
              <li>❌ Только объекты</li>
              <li>❌ Нельзя переназначить целиком</li>
              <li>⚠️ Есть ловушки</li>
              <li>✅ Не нужен .value</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Интерактивная демка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Глубокая реактивность</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Попробуйте!</div>
          <p>
            Изменения на любом уровне вложенности автоматически отслеживаются.
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <pre style="font-family: 'Fira Code', monospace; font-size: 0.9rem;">
state = {
  user: {
    name: "<span style="color: var(--accent-vue)">{{ state.user.name }}</span>",
    age: <span style="color: var(--accent-orange)">{{ state.user.age }}</span>,
    address: {
      city: "<span style="color: var(--accent-purple)">{{ state.user.address.city }}</span>"
    }
  },
  items: {{ JSON.stringify(state.items) }}
}
            </pre>
          </div>

          <div class="controls">
            <button class="btn btn-primary" @click="updateName">
              📝 Имя
            </button>
            <button class="btn btn-primary" @click="updateAge">
              🎂 Возраст +1
            </button>
            <button class="btn btn-primary" @click="updateCity">
              🏙️ Город
            </button>
            <button class="btn btn-secondary" @click="addItem">
              ➕ Добавить item
            </button>
            <button class="btn btn-danger" @click="resetDemo">
              🔄 Сброс
            </button>
          </div>
        </div>

        <div style="width: 300px">
          <RenderCounter :count="updateCount" label="Обновлений" />
          <RenderLog :logs="logs" />
        </div>
      </div>
    </div>

    <!-- Ловушки -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚠️ Ловушки reactive()</h3>
        <span class="card-badge">Важно!</span>
      </div>

      <div class="info-box error">
        <span class="info-box-icon">🚨</span>
        <div class="info-box-content">
          <div class="info-box-title">Будьте осторожны!</div>
          <p>
            reactive() имеет несколько ловушек, которые приводят к потере реактивности.
            Изучите их, чтобы избежать багов.
          </p>
        </div>
      </div>

      <CodeBlock :code="pitfallsCode" language="typescript" title="⚠️ Частые ошибки" />
    </div>
  </div>
</template>
