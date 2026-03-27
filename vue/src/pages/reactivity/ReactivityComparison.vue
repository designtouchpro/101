<script setup lang="ts">
import { ref, shallowRef, reactive, shallowReactive, watch, triggerRef } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

// ═══════════════════════════════════════════════════════════════
// ref() Demo
// ═══════════════════════════════════════════════════════════════
const refObject = ref({
  count: 0,
  nested: {
    value: 0
  }
})

const refRenderCount = ref(0)
const refLogs = ref<string[]>([])

watch(refObject, () => {
  refRenderCount.value++
  refLogs.value.push(`[${new Date().toLocaleTimeString()}] ref изменился`)
}, { deep: true })

const incrementRefCount = () => {
  refObject.value.count++
  refLogs.value.push(`count++ → ${refObject.value.count}`)
}

const incrementRefNested = () => {
  refObject.value.nested.value++
  refLogs.value.push(`nested.value++ → ${refObject.value.nested.value}`)
}

const replaceRefObject = () => {
  refObject.value = { count: 100, nested: { value: 100 } }
  refLogs.value.push(`Полная замена объекта`)
}

// ═══════════════════════════════════════════════════════════════
// shallowRef() Demo
// ═══════════════════════════════════════════════════════════════
const shallowRefObject = shallowRef({
  count: 0,
  nested: {
    value: 0
  }
})

const shallowRefRenderCount = ref(0)
const shallowRefLogs = ref<string[]>([])

watch(shallowRefObject, () => {
  shallowRefRenderCount.value++
  shallowRefLogs.value.push(`[${new Date().toLocaleTimeString()}] shallowRef изменился`)
})

const incrementShallowRefCount = () => {
  shallowRefObject.value.count++
  shallowRefLogs.value.push(`count++ → ${shallowRefObject.value.count} (НЕ триггерит watch!)`)
}

const incrementShallowRefNested = () => {
  shallowRefObject.value.nested.value++
  shallowRefLogs.value.push(`nested.value++ → ${shallowRefObject.value.nested.value} (НЕ триггерит watch!)`)
}

const replaceShallowRefObject = () => {
  shallowRefObject.value = { count: 100, nested: { value: 100 } }
  shallowRefLogs.value.push(`Полная замена объекта (ТРИГГЕРИТ watch!)`)
}

const triggerShallowRef = () => {
  triggerRef(shallowRefObject)
  shallowRefLogs.value.push(`triggerRef() вызван (ПРИНУДИТЕЛЬНЫЙ триггер!)`)
}

// ═══════════════════════════════════════════════════════════════
// reactive() Demo
// ═══════════════════════════════════════════════════════════════
const reactiveObject = reactive({
  count: 0,
  nested: {
    value: 0
  }
})

const reactiveRenderCount = ref(0)
const reactiveLogs = ref<string[]>([])

watch(() => reactiveObject, () => {
  reactiveRenderCount.value++
  reactiveLogs.value.push(`[${new Date().toLocaleTimeString()}] reactive изменился`)
}, { deep: true })

const incrementReactiveCount = () => {
  reactiveObject.count++
  reactiveLogs.value.push(`count++ → ${reactiveObject.count}`)
}

const incrementReactiveNested = () => {
  reactiveObject.nested.value++
  reactiveLogs.value.push(`nested.value++ → ${reactiveObject.nested.value}`)
}

const replaceReactiveNested = () => {
  Object.assign(reactiveObject, { count: 100, nested: { value: 100 } })
  reactiveLogs.value.push(`Object.assign с новыми значениями`)
}

// ═══════════════════════════════════════════════════════════════
// shallowReactive() Demo
// ═══════════════════════════════════════════════════════════════
const shallowReactiveObject = shallowReactive({
  count: 0,
  nested: {
    value: 0
  }
})

const shallowReactiveRenderCount = ref(0)
const shallowReactiveLogs = ref<string[]>([])

watch(() => shallowReactiveObject.count, () => {
  shallowReactiveRenderCount.value++
  shallowReactiveLogs.value.push(`[${new Date().toLocaleTimeString()}] shallowReactive.count изменился`)
})

const incrementShallowReactiveCount = () => {
  shallowReactiveObject.count++
  shallowReactiveLogs.value.push(`count++ → ${shallowReactiveObject.count} (ТРИГГЕРИТ!)`)
}

const incrementShallowReactiveNested = () => {
  shallowReactiveObject.nested.value++
  shallowReactiveLogs.value.push(`nested.value++ → ${shallowReactiveObject.nested.value} (НЕ триггерит watch!)`)
}

// ═══════════════════════════════════════════════════════════════
// Reset functions
// ═══════════════════════════════════════════════════════════════
const resetRef = () => {
  refObject.value = { count: 0, nested: { value: 0 } }
  refRenderCount.value = 0
  refLogs.value = ['Сброс']
}

const resetShallowRef = () => {
  shallowRefObject.value = { count: 0, nested: { value: 0 } }
  shallowRefRenderCount.value = 0
  shallowRefLogs.value = ['Сброс']
}

const resetReactive = () => {
  Object.assign(reactiveObject, { count: 0, nested: { value: 0 } })
  reactiveRenderCount.value = 0
  reactiveLogs.value = ['Сброс']
}

const resetShallowReactive = () => {
  shallowReactiveObject.count = 0
  shallowReactiveObject.nested = { value: 0 }
  shallowReactiveRenderCount.value = 0
  shallowReactiveLogs.value = ['Сброс']
}

const refCode = `import { ref } from 'vue'

// ref() делает ГЛУБОКУЮ реактивность
const state = ref({
  count: 0,
  nested: { value: 0 }
})

// ✅ Любое изменение триггерит обновление
state.value.count++           // триггерит
state.value.nested.value++    // триггерит  
state.value = { ... }         // триггерит`

const shallowRefCode = `import { shallowRef, triggerRef } from 'vue'

// shallowRef() — реактивна только ссылка .value
const state = shallowRef({
  count: 0,
  nested: { value: 0 }
})

// ❌ Мутации НЕ триггерят обновление
state.value.count++           // НЕ триггерит!
state.value.nested.value++    // НЕ триггерит!

// ✅ Только замена .value триггерит
state.value = { ... }         // триггерит

// 💡 Можно принудительно триггернуть
triggerRef(state)             // триггерит`

const reactiveCode = `import { reactive } from 'vue'

// reactive() — глубокая реактивность для объектов
const state = reactive({
  count: 0,
  nested: { value: 0 }
})

// ✅ Все изменения триггерят
state.count++                 // триггерит
state.nested.value++          // триггерит

// ⚠️ Нельзя заменить весь объект!
// state = { ... }            // потеря реактивности!
Object.assign(state, { ... }) // правильно`

const shallowReactiveCode = `import { shallowReactive } from 'vue'

// shallowReactive() — реактивны только 
// свойства первого уровня
const state = shallowReactive({
  count: 0,
  nested: { value: 0 }
})

// ✅ Первый уровень триггерит
state.count++                 // триггерит

// ❌ Вложенные НЕ триггерят
state.nested.value++          // НЕ триггерит!
state.nested = { value: 5 }   // триггерит (замена)`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🔬 Сравнение реактивности Vue</h1>
      <p>
        Наглядное сравнение <code>ref</code>, <code>shallowRef</code>, 
        <code>reactive</code> и <code>shallowReactive</code>. 
        Кликайте по кнопкам и смотрите разницу в поведении!
      </p>
    </div>

    <!-- Quick Summary -->
    <div class="card">
      <h3>📋 Быстрая справка</h3>
      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Функция</th>
              <th>Тип данных</th>
              <th>Глубина</th>
              <th>Доступ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>ref()</code></td>
              <td>Любой</td>
              <td>🌊 Глубокая</td>
              <td><code>.value</code></td>
            </tr>
            <tr>
              <td><code>shallowRef()</code></td>
              <td>Любой</td>
              <td>🏊 Поверхностная</td>
              <td><code>.value</code></td>
            </tr>
            <tr>
              <td><code>reactive()</code></td>
              <td>Объект/Массив</td>
              <td>🌊 Глубокая</td>
              <td>Напрямую</td>
            </tr>
            <tr>
              <td><code>shallowReactive()</code></td>
              <td>Объект/Массив</td>
              <td>🏊 Поверхностная</td>
              <td>Напрямую</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Interactive Comparison -->
    <div class="comparison-grid">
      <!-- ref() -->
      <div class="card comparison-card ref-card">
        <div class="card-header">
          <span class="card-title">📦 ref()</span>
          <span class="badge badge-success">Глубокая реактивность</span>
        </div>
        
        <CodeBlock :code="refCode" language="typescript" />
        
        <div class="demo-state">
          <div class="state-display">
            <pre>{{ JSON.stringify(refObject, null, 2) }}</pre>
          </div>
          <div class="render-count">
            Watch триггеров: <strong>{{ refRenderCount }}</strong>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" @click="incrementRefCount">count++</button>
          <button class="btn btn-primary" @click="incrementRefNested">nested.value++</button>
          <button class="btn btn-secondary" @click="replaceRefObject">Заменить объект</button>
          <button class="btn btn-outline" @click="resetRef">Сброс</button>
        </div>

        <div class="logs-container">
          <div class="logs-header">📜 Лог действий</div>
          <div class="logs">
            <div v-for="(log, i) in refLogs.slice(-5)" :key="i" class="log-entry success">
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <!-- shallowRef() -->
      <div class="card comparison-card shallow-ref-card">
        <div class="card-header">
          <span class="card-title">🏊 shallowRef()</span>
          <span class="badge badge-warning">Только .value</span>
        </div>
        
        <CodeBlock :code="shallowRefCode" language="typescript" />
        
        <div class="demo-state">
          <div class="state-display">
            <pre>{{ JSON.stringify(shallowRefObject, null, 2) }}</pre>
          </div>
          <div class="render-count">
            Watch триггеров: <strong>{{ shallowRefRenderCount }}</strong>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-warning" @click="incrementShallowRefCount">count++ ❌</button>
          <button class="btn btn-warning" @click="incrementShallowRefNested">nested.value++ ❌</button>
          <button class="btn btn-success" @click="replaceShallowRefObject">Заменить объект ✅</button>
          <button class="btn btn-purple" @click="triggerShallowRef">triggerRef() 💡</button>
          <button class="btn btn-outline" @click="resetShallowRef">Сброс</button>
        </div>

        <div class="logs-container">
          <div class="logs-header">📜 Лог действий</div>
          <div class="logs">
            <div v-for="(log, i) in shallowRefLogs.slice(-5)" :key="i" 
                 :class="['log-entry', log.includes('НЕ') ? 'warning' : 'success']">
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <!-- reactive() -->
      <div class="card comparison-card reactive-card">
        <div class="card-header">
          <span class="card-title">⚡ reactive()</span>
          <span class="badge badge-success">Глубокая реактивность</span>
        </div>
        
        <CodeBlock :code="reactiveCode" language="typescript" />
        
        <div class="demo-state">
          <div class="state-display">
            <pre>{{ JSON.stringify(reactiveObject, null, 2) }}</pre>
          </div>
          <div class="render-count">
            Watch триггеров: <strong>{{ reactiveRenderCount }}</strong>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-primary" @click="incrementReactiveCount">count++</button>
          <button class="btn btn-primary" @click="incrementReactiveNested">nested.value++</button>
          <button class="btn btn-secondary" @click="replaceReactiveNested">Object.assign</button>
          <button class="btn btn-outline" @click="resetReactive">Сброс</button>
        </div>

        <div class="logs-container">
          <div class="logs-header">📜 Лог действий</div>
          <div class="logs">
            <div v-for="(log, i) in reactiveLogs.slice(-5)" :key="i" class="log-entry success">
              {{ log }}
            </div>
          </div>
        </div>
      </div>

      <!-- shallowReactive() -->
      <div class="card comparison-card shallow-reactive-card">
        <div class="card-header">
          <span class="card-title">🌊 shallowReactive()</span>
          <span class="badge badge-warning">Только первый уровень</span>
        </div>
        
        <CodeBlock :code="shallowReactiveCode" language="typescript" />
        
        <div class="demo-state">
          <div class="state-display">
            <pre>{{ JSON.stringify(shallowReactiveObject, null, 2) }}</pre>
          </div>
          <div class="render-count">
            Watch триггеров: <strong>{{ shallowReactiveRenderCount }}</strong>
          </div>
        </div>

        <div class="controls">
          <button class="btn btn-success" @click="incrementShallowReactiveCount">count++ ✅</button>
          <button class="btn btn-warning" @click="incrementShallowReactiveNested">nested.value++ ❌</button>
          <button class="btn btn-outline" @click="resetShallowReactive">Сброс</button>
        </div>

        <div class="logs-container">
          <div class="logs-header">📜 Лог действий</div>
          <div class="logs">
            <div v-for="(log, i) in shallowReactiveLogs.slice(-5)" :key="i" 
                 :class="['log-entry', log.includes('НЕ') ? 'warning' : 'success']">
              {{ log }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- When to use -->
    <div class="card">
      <h3>🤔 Когда что использовать?</h3>
      <div class="usage-grid">
        <div class="usage-card">
          <h4>📦 ref()</h4>
          <ul>
            <li>Примитивы (string, number, boolean)</li>
            <li>Небольшие объекты</li>
            <li>Когда нужна полная реактивность</li>
            <li>Значение может быть заменено целиком</li>
          </ul>
        </div>
        <div class="usage-card">
          <h4>🏊 shallowRef()</h4>
          <ul>
            <li>Большие объекты для оптимизации</li>
            <li>Внешние данные (API ответы)</li>
            <li>Когда мутации не важны</li>
            <li>Интеграция с не-Vue библиотеками</li>
          </ul>
        </div>
        <div class="usage-card">
          <h4>⚡ reactive()</h4>
          <ul>
            <li>Сложные объекты со state</li>
            <li>Когда не хочется писать .value</li>
            <li>Store-подобные структуры</li>
            <li>Формы с множеством полей</li>
          </ul>
        </div>
        <div class="usage-card">
          <h4>🌊 shallowReactive()</h4>
          <ul>
            <li>Корневой state без глубокой реактивности</li>
            <li>Большие коллекции</li>
            <li>Оптимизация производительности</li>
            <li>Внешние mutable структуры</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 24px;
}

@media (max-width: 1200px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.comparison-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.comparison-card .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-success {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.badge-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.demo-state {
  background: var(--bg-code);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.state-display pre {
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: var(--accent-vue);
}

.render-count {
  font-size: 0.85rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.render-count strong {
  color: var(--accent-vue);
  font-size: 1.2rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-warning {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid #f59e0b;
}

.btn-warning:hover {
  background: rgba(245, 158, 11, 0.3);
}

.btn-purple {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
  border: 1px solid #a855f7;
}

.btn-purple:hover {
  background: rgba(168, 85, 247, 0.3);
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}

.btn-outline:hover {
  border-color: var(--text-secondary);
}

.logs-container {
  background: var(--bg-secondary);
  border-radius: 8px;
  overflow: hidden;
}

.logs-header {
  padding: 8px 12px;
  background: var(--bg-card);
  font-size: 0.8rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

.logs {
  padding: 8px;
  max-height: 150px;
  overflow-y: auto;
}

.log-entry {
  padding: 4px 8px;
  font-size: 0.8rem;
  font-family: 'Fira Code', monospace;
  border-radius: 4px;
  margin-bottom: 4px;
}

.log-entry.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.log-entry.warning {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.comparison-table th {
  background: var(--bg-code);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.comparison-table td code {
  background: var(--bg-code);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-top: 16px;
}

@media (max-width: 1200px) {
  .usage-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .usage-grid {
    grid-template-columns: 1fr;
  }
}

.usage-card {
  background: var(--bg-code);
  padding: 16px;
  border-radius: 8px;
}

.usage-card h4 {
  margin-bottom: 12px;
  color: var(--accent-vue);
}

.usage-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.usage-card li {
  padding: 4px 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  position: relative;
  padding-left: 16px;
}

.usage-card li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-vue);
}
</style>
