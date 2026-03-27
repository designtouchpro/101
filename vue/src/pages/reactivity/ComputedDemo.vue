<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import RenderLog from '@/components/RenderLog.vue'
import RenderCounter from '@/components/RenderCounter.vue'
import TodoDemo from '@/components/TodoDemo.vue'
import SortFilterDemo from '@/components/SortFilterDemo.vue'
import type { LogEntry } from '@/components/RenderLog.vue'

// Demo state
const firstName = ref('Иван')
const lastName = ref('Петров')
const computedCallCount = ref(0)
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

// Computed с трекингом вызовов
const fullName = computed(() => {
  computedCallCount.value++
  addLog('effect', `computed вычислен: ${firstName.value} ${lastName.value}`)
  return `${firstName.value} ${lastName.value}`
})

// Цена и количество
const price = ref(100)
const quantity = ref(2)
const discount = ref(10)

const totalPrice = computed(() => {
  const subtotal = price.value * quantity.value
  const discountAmount = subtotal * (discount.value / 100)
  return subtotal - discountAmount
})

// Writable computed
const fullNameWritable = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (newValue: string) => {
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  }
})

onMounted(() => {
  addLog('mount', 'Компонент смонтирован')
})

watch([firstName, lastName], () => {
  updateCount.value++
})

const resetDemo = () => {
  firstName.value = 'Иван'
  lastName.value = 'Петров'
  computedCallCount.value = 0
  updateCount.value = 0
  price.value = 100
  quantity.value = 2
  discount.value = 10
  logs.value = []
  mountTime.value = Date.now()
  addLog('mount', 'Демо сброшено')
}

const whatIsComputedCode = `// ═══════════════════════════════════════════════════════════════
// 🧮 computed() — вычисляемые свойства с кешированием
// Автоматически отслеживает зависимости и пересчитывает только при их изменении
// ═══════════════════════════════════════════════════════════════

import { ref, computed } from 'vue'

const firstName = ref('Иван')
const lastName = ref('Петров')

// ─────────────────────────────────────────────────────────────
// computed автоматически отслеживает зависимости
// ─────────────────────────────────────────────────────────────
const fullName = computed(() => {
  // Vue знает, что эта функция зависит от firstName и lastName
  return \`\${firstName.value} \${lastName.value}\`
})

// ─────────────────────────────────────────────────────────────
// Доступ к значению: .value в script, без .value в template
// ─────────────────────────────────────────────────────────────
console.log(fullName.value)  // 'Иван Петров'

// В template:
// {{ fullName }}  ← автоматический unwrap


// ═══════════════════════════════════════════════════════════════
// 🎯 ГЛАВНОЕ ПРЕИМУЩЕСТВО: КЕШИРОВАНИЕ
// ═══════════════════════════════════════════════════════════════
// computed пересчитывается ТОЛЬКО когда меняются зависимости
// При повторном доступе возвращается кешированное значение`

const computedVsMethodCode = `// ═══════════════════════════════════════════════════════════════
// 🧮 computed vs function — в чём разница?
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// ❌ Function — вызывается КАЖДЫЙ раз при обращении
// ─────────────────────────────────────────────────────────────
function getFullName() {
  console.log('Function вызвана!')  // Каждый раз при вызове
  return \`\${firstName.value} \${lastName.value}\`
}

// В template:
// {{ getFullName() }}  ← вызывается при КАЖДОМ рендере!
// {{ getFullName() }}  ← и тут тоже!
// {{ getFullName() }}  ← и тут! 3 вызова функции


// ─────────────────────────────────────────────────────────────
// ✅ computed — вычисляется ОДИН раз, затем кеш
// ─────────────────────────────────────────────────────────────
const fullName = computed(() => {
  console.log('Computed вычислен!')  // Только при изменении deps
  return \`\${firstName.value} \${lastName.value}\`
})

// В template:
// {{ fullName }}  ← возвращает кеш
// {{ fullName }}  ← возвращает тот же кеш
// {{ fullName }}  ← 1 вычисление, 3 обращения к кешу!


// ═══════════════════════════════════════════════════════════════
// 🎯 Правило: используйте computed для производных данных
// ═══════════════════════════════════════════════════════════════`

const writableComputedCode = `// ═══════════════════════════════════════════════════════════════
// ✏️ Writable computed — get и set
// ═══════════════════════════════════════════════════════════════

const firstName = ref('Иван')
const lastName = ref('Петров')

// ─────────────────────────────────────────────────────────────
// Computed с getter и setter
// ─────────────────────────────────────────────────────────────
const fullName = computed({
  get: () => \`\${firstName.value} \${lastName.value}\`,
  set: (newValue: string) => {
    // Парсим новое значение и обновляем источники
    const [first, ...rest] = newValue.split(' ')
    firstName.value = first
    lastName.value = rest.join(' ')
  }
})

// Теперь можно присваивать:
fullName.value = 'Пётр Сидоров'
// firstName === 'Пётр'
// lastName === 'Сидоров'


// ═══════════════════════════════════════════════════════════════
// 🎯 Используйте writable computed для двусторонней связи
// Например: форматирование/парсинг данных для форм
// ═══════════════════════════════════════════════════════════════`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🧮 computed()</h1>
      <p>Вычисляемые свойства с автоматическим кешированием</p>
      <a 
        href="https://vuejs.org/api/reactivity-core.html#computed" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Что такое computed -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Что такое computed()?</h3>
        <span class="card-badge">Теория</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            <strong>computed()</strong> создаёт кешированное вычисляемое значение, 
            которое автоматически пересчитывается только при изменении зависимостей.
          </p>
        </div>
      </div>

      <CodeBlock :code="whatIsComputedCode" language="typescript" title="🧮 Основы computed()" />
    </div>

    <!-- computed vs function -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">computed vs function</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚡</span>
        <div class="info-box-content">
          <div class="info-box-title">Производительность</div>
          <p>
            Функции вызываются при каждом рендере. computed кеширует результат 
            и пересчитывает только при изменении зависимостей.
          </p>
        </div>
      </div>

      <CodeBlock :code="computedVsMethodCode" language="typescript" title="🔄 Кеширование в действии" />
    </div>

    <!-- Интерактивная демка fullName -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Кеширование computed</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Попробуйте!</div>
          <p>
            computed пересчитывается ТОЛЬКО когда меняются firstName или lastName.
            Следите за счётчиком вычислений!
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <div style="margin-bottom: 16px">
              <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Имя:</label>
              <input v-model="firstName" class="input" style="width: 100%" />
            </div>
            <div style="margin-bottom: 16px">
              <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Фамилия:</label>
              <input v-model="lastName" class="input" style="width: 100%" />
            </div>
            <div class="value-display large" style="width: 100%; justify-content: center">
              {{ fullName }}
            </div>
            <p style="margin-top: 16px; color: var(--text-secondary); text-align: center">
              Вычислений computed: <strong style="color: var(--accent-orange)">{{ computedCallCount }}</strong>
            </p>
          </div>

          <div class="controls">
            <button class="btn btn-danger" @click="resetDemo">
              🔄 Сброс
            </button>
          </div>
        </div>

        <div style="width: 300px">
          <RenderCounter :count="updateCount" label="Изменений" />
          <RenderLog :logs="logs" />
        </div>
      </div>
    </div>

    <!-- Демка с ценой -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Пример: Калькулятор цены</h3>
        <span class="card-badge">Практика</span>
      </div>

      <div class="visual-diagram">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px">
          <div>
            <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Цена:</label>
            <input v-model.number="price" type="number" class="input" style="width: 100%" />
          </div>
          <div>
            <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Количество:</label>
            <input v-model.number="quantity" type="number" class="input" style="width: 100%" />
          </div>
          <div>
            <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Скидка %:</label>
            <input v-model.number="discount" type="number" class="input" style="width: 100%" />
          </div>
        </div>

        <div style="text-align: center">
          <p style="color: var(--text-secondary); margin-bottom: 8px">Итого:</p>
          <div class="value-display large" style="color: var(--accent-vue)">
            {{ totalPrice.toFixed(2) }} ₽
          </div>
        </div>
      </div>

      <CodeBlock 
        :code="`const price = ref(100)
const quantity = ref(2)
const discount = ref(10)

const totalPrice = computed(() => {
  const subtotal = price.value * quantity.value
  const discountAmount = subtotal * (discount.value / 100)
  return subtotal - discountAmount
})`"
        language="typescript"
        title="📝 Код калькулятора"
      />
    </div>

    <!-- Writable computed -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">✏️ Writable computed</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">✏️</span>
        <div class="info-box-content">
          <div class="info-box-title">Двусторонняя связь</div>
          <p>
            Writable computed позволяет не только читать, но и записывать значение,
            автоматически обновляя исходные данные.
          </p>
        </div>
      </div>

      <div class="visual-diagram">
        <div style="margin-bottom: 16px">
          <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">Полное имя (редактируемое):</label>
          <input v-model="fullNameWritable" class="input" style="width: 100%" />
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
          <div>
            <p style="color: var(--text-secondary)">firstName:</p>
            <div class="value-display">{{ firstName }}</div>
          </div>
          <div>
            <p style="color: var(--text-secondary)">lastName:</p>
            <div class="value-display">{{ lastName }}</div>
          </div>
        </div>
      </div>

      <CodeBlock :code="writableComputedCode" language="typescript" title="✏️ Writable computed" />
    </div>

    <!-- Todo Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📝 Практика: Todo List</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">📋</span>
        <div class="info-box-content">
          <div class="info-box-title">computed в действии</div>
          <p>
            Счётчики "осталось" и "выполнено" — это computed свойства.
            Они автоматически пересчитываются при изменении списка.
          </p>
        </div>
      </div>

      <TodoDemo />
    </div>

    <!-- Sort & Filter Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🔍 Практика: Сортировка и фильтрация</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">🧮</span>
        <div class="info-box-content">
          <div class="info-box-title">Мощь computed</div>
          <p>
            Отфильтрованный и отсортированный список — computed. Изменение фильтров 
            или голосование автоматически пересчитывает результат.
          </p>
        </div>
      </div>

      <SortFilterDemo />
    </div>
  </div>
</template>
