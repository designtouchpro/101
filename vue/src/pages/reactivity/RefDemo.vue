<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import RenderLog from '@/components/RenderLog.vue'
import RenderCounter from '@/components/RenderCounter.vue'
import type { LogEntry } from '@/components/RenderLog.vue'

// Basic counter demo
const count = ref(0)
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

watch(count, (newVal) => {
  updateCount.value++
  addLog('update', `count изменился на ${newVal}`)
})

const resetDemo = () => {
  count.value = 0
  updateCount.value = 0
  logs.value = []
  mountTime.value = Date.now()
  addLog('mount', 'Демо сброшено')
}

const whatIsRefCode = `// ═══════════════════════════════════════════════════════════════
// 📦 ref() — реактивная обёртка для любого значения
// Работает с примитивами, объектами, массивами
// ═══════════════════════════════════════════════════════════════

import { ref } from 'vue'

// ─────────────────────────────────────────────────────────────
// Создание ref
// ─────────────────────────────────────────────────────────────
const count = ref(0)          // number
const name = ref('Vue')       // string
const isActive = ref(true)    // boolean
const user = ref({ id: 1 })   // object (тоже работает!)

// ─────────────────────────────────────────────────────────────
// Доступ к значению: через .value в JS/TS
// ─────────────────────────────────────────────────────────────
console.log(count.value)      // 0
count.value++                 // изменение триггерит обновление
count.value = 10              // прямое присвоение тоже работает


// ═══════════════════════════════════════════════════════════════
// 🎯 ВАЖНО: В template НЕ НУЖЕН .value!
// ═══════════════════════════════════════════════════════════════
// <template>
//   <p>{{ count }}</p>       <!-- Автоматический unwrap -->
//   <button @click="count++">+1</button>  <!-- Тоже без .value -->
// </template>`

const refVsVariableCode = `// ═══════════════════════════════════════════════════════════════
// ❌ НЕПРАВИЛЬНО: обычная переменная
// ═══════════════════════════════════════════════════════════════
let count = 0

const increment = () => {
  count++  // Значение изменится, но UI НЕ обновится!
}

// Vue не знает об этом изменении — нет реактивности


// ═══════════════════════════════════════════════════════════════
// ✅ ПРАВИЛЬНО: ref()
// ═══════════════════════════════════════════════════════════════
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++  // Vue отслеживает это изменение → UI обновится
}

// Под капотом: ref создаёт объект { value: 0 } с getter/setter
// При изменении .value Vue запускает реактивное обновление`

const basicCounterCode = `<script setup lang="ts">
import { ref } from 'vue'

// Создаём реактивную переменную
const count = ref(0)

// Функции для изменения
const increment = () => count.value++
const decrement = () => count.value--
const reset = () => count.value = 0
<\/script>

<template>
  <div class="counter">
    <!-- В template .value не нужен! -->
    <span>{{ count }}</span>
    
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="reset">Сброс</button>
  </div>
</template>`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>📦 ref()</h1>
      <p>Реактивная обёртка для примитивов и объектов</p>
      <a 
        href="https://vuejs.org/api/reactivity-core.html#ref" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Что такое ref -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Что такое ref() и зачем он нужен?</h3>
        <span class="card-badge">Теория</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            <strong>ref()</strong> создаёт реактивную обёртку вокруг значения. 
            В JavaScript — доступ через <code>.value</code>, в template — автоматический unwrap.
          </p>
        </div>
      </div>

      <CodeBlock :code="whatIsRefCode" language="typescript" title="📦 Основы ref()" />
    </div>

    <!-- ref vs обычная переменная -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ref() vs обычная переменная</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Распространённая ошибка</div>
          <p>
            Обычные переменные (let/const) не реактивны — Vue не узнает об их изменении 
            и не обновит UI. Всегда используйте ref() для данных, которые должны обновлять интерфейс.
          </p>
        </div>
      </div>

      <CodeBlock :code="refVsVariableCode" language="typescript" title="🔄 Почему нужна реактивность" />
    </div>

    <!-- Интерактивная демка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Базовый счётчик</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Что происходит?</div>
          <p>
            Каждое изменение <code>count.value</code> автоматически обновляет UI. 
            Следите за счётчиком обновлений и логом справа!
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <div class="value-display large">{{ count }}</div>
            <p style="margin-top: 16px; color: var(--text-secondary)">
              Каждое изменение count.value → реактивное обновление
            </p>
          </div>

          <div class="controls">
            <button class="btn btn-primary" @click="count++">
              ➕ Увеличить
            </button>
            <button class="btn btn-secondary" @click="count--">
              ➖ Уменьшить
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

      <CodeBlock :code="basicCounterCode" language="vue" title="📝 Код примера" />
    </div>

    <!-- Объекты в ref -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">ref() с объектами</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🔥</span>
        <div class="info-box-content">
          <div class="info-box-title">Глубокая реактивность</div>
          <p>
            ref() с объектом автоматически делает его глубоко реактивным 
            (использует reactive() под капотом для .value).
          </p>
        </div>
      </div>

      <CodeBlock 
        :code="`const user = ref({
  name: 'Вася',
  profile: {
    age: 25,
    city: 'Москва'
  }
})

// Все изменения реактивны:
user.value.name = 'Петя'           // ✅ UI обновится
user.value.profile.age = 26        // ✅ Глубокая реактивность
user.value = { name: 'Новый' }     // ✅ Полная замена тоже работает`"
        language="typescript"
        title="🔄 Глубокая реактивность ref()"
      />
    </div>

    <!-- Правила ref -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Правила работы с ref()</h3>
        <span class="card-badge">Best Practices</span>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header before">
            <span>❌ Неправильно</span>
          </div>
          <div class="comparison-body">
            <CodeBlock 
              :code="`// В script — забыли .value
const count = ref(0)
count++  // ❌ NaN

// Деструктуризация теряет реактивность
const { value } = count
value++  // ❌ Не реактивно`"
              language="typescript"
            />
          </div>
        </div>

        <div class="comparison-card">
          <div class="comparison-header after">
            <span>✅ Правильно</span>
          </div>
          <div class="comparison-body">
            <CodeBlock 
              :code="`// В script — всегда .value
const count = ref(0)
count.value++  // ✅

// Используйте toRef или computed
import { toRef } from 'vue'
const valueRef = toRef(count, 'value')  // ✅`"
              language="typescript"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
