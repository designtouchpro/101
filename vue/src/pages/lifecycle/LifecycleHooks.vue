<script setup lang="ts">
import { ref, onMounted, onUpdated, onUnmounted, onBeforeMount, onBeforeUpdate, onBeforeUnmount } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import RenderLog from '@/components/RenderLog.vue'
import type { LogEntry } from '@/components/RenderLog.vue'

const showChild = ref(true)
const childKey = ref(0)
const parentLogs = ref<LogEntry[]>([])
const childLogs = ref<LogEntry[]>([])
const mountTime = ref(Date.now())

const addParentLog = (type: LogEntry['type'], message: string) => {
  parentLogs.value.push({
    type,
    message,
    timestamp: Date.now() - mountTime.value
  })
}

const addChildLog = (type: LogEntry['type'], message: string) => {
  childLogs.value.push({
    type,
    message,
    timestamp: Date.now() - mountTime.value
  })
}

const resetDemo = () => {
  showChild.value = true
  childKey.value++
  parentLogs.value = []
  childLogs.value = []
  mountTime.value = Date.now()
  addParentLog('mount', 'Демо сброшено')
}

// Parent lifecycle
onBeforeMount(() => addParentLog('mount', 'onBeforeMount'))
onMounted(() => addParentLog('mount', 'onMounted'))
onBeforeUpdate(() => addParentLog('update', 'onBeforeUpdate'))
onUpdated(() => addParentLog('update', 'onUpdated'))

const lifecycleCode = `// ═══════════════════════════════════════════════════════════════
// 🔁 Lifecycle Hooks — жизненный цикл компонента
// ═══════════════════════════════════════════════════════════════

import { 
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

// ─────────────────────────────────────────────────────────────
// 🟢 CREATION (Создание)
// ─────────────────────────────────────────────────────────────
// setup() — выполняется первым (Composition API)
// В Options API: beforeCreate, created

onBeforeMount(() => {
  // Компонент создан, но ещё НЕ в DOM
  // Нет доступа к DOM элементам
  console.log('onBeforeMount')
})

onMounted(() => {
  // ✅ Компонент в DOM, можно работать с элементами
  // Идеальное место для:
  // - Получения данных с API
  // - Подписки на события
  // - Инициализации сторонних библиотек
  console.log('onMounted')
})


// ─────────────────────────────────────────────────────────────
// 🔵 UPDATE (Обновление)
// ─────────────────────────────────────────────────────────────
onBeforeUpdate(() => {
  // Данные изменились, но DOM ещё старый
  console.log('onBeforeUpdate')
})

onUpdated(() => {
  // ✅ DOM обновлён
  // Осторожно: изменение state здесь вызовет бесконечный цикл!
  console.log('onUpdated')
})


// ─────────────────────────────────────────────────────────────
// 🔴 DESTRUCTION (Уничтожение)
// ─────────────────────────────────────────────────────────────
onBeforeUnmount(() => {
  // Компонент ещё в DOM
  console.log('onBeforeUnmount')
})

onUnmounted(() => {
  // ✅ Компонент удалён из DOM
  // Идеальное место для:
  // - Отписки от событий
  // - Очистки таймеров
  // - Отмены запросов
  console.log('onUnmounted')
})`

const cleanupCode = `// ═══════════════════════════════════════════════════════════════
// 🧹 Очистка ресурсов в onUnmounted
// ═══════════════════════════════════════════════════════════════

import { ref, onMounted, onUnmounted } from 'vue'

// ─────────────────────────────────────────────────────────────
// Пример: Таймер
// ─────────────────────────────────────────────────────────────
const timer = ref<number | null>(null)

onMounted(() => {
  timer.value = setInterval(() => {
    console.log('tick')
  }, 1000)
})

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)  // ✅ Очистка таймера
  }
})


// ─────────────────────────────────────────────────────────────
// Пример: Event Listener
// ─────────────────────────────────────────────────────────────
const handleResize = () => console.log(window.innerWidth)

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)  // ✅ Отписка
})


// ─────────────────────────────────────────────────────────────
// Пример: AbortController для fetch
// ─────────────────────────────────────────────────────────────
const controller = new AbortController()

onMounted(async () => {
  const response = await fetch('/api/data', {
    signal: controller.signal
  })
})

onUnmounted(() => {
  controller.abort()  // ✅ Отмена запроса
})`

const optionsVsCompositionCode = `// ═══════════════════════════════════════════════════════════════
// Options API vs Composition API — хуки жизненного цикла
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// Options API
// ─────────────────────────────────────────────────────────────
export default {
  beforeCreate() { },   // ❌ Нет аналога в setup
  created() { },        // ❌ Нет аналога — используйте setup()
  beforeMount() { },    // → onBeforeMount
  mounted() { },        // → onMounted
  beforeUpdate() { },   // → onBeforeUpdate
  updated() { },        // → onUpdated
  beforeUnmount() { },  // → onBeforeUnmount
  unmounted() { }       // → onUnmounted
}


// ─────────────────────────────────────────────────────────────
// Composition API
// ─────────────────────────────────────────────────────────────
import { onMounted, onUnmounted } from 'vue'

// setup() сам по себе эквивалентен created()
// Код в setup выполняется ДО монтирования

onMounted(() => {
  // Компонент смонтирован
})

onUnmounted(() => {
  // Компонент размонтирован
})`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🔁 Lifecycle Hooks</h1>
      <p>Жизненный цикл компонента от создания до уничтожения</p>
      <a 
        href="https://vuejs.org/api/composition-api-lifecycle.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Основы lifecycle -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Жизненный цикл компонента</h3>
        <span class="card-badge">Теория</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            Каждый компонент Vue проходит через серию этапов: создание, монтирование, 
            обновление и уничтожение. Lifecycle hooks позволяют выполнять код на каждом этапе.
          </p>
        </div>
      </div>

      <CodeBlock :code="lifecycleCode" language="typescript" title="🔁 Lifecycle Hooks" />
    </div>

    <!-- Визуальная timeline -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Timeline жизненного цикла</h3>
        <span class="card-badge">Визуализация</span>
      </div>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-vue)">🟢 setup()</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Инициализация реактивных данных, computed, watchers.
              Выполняется ДО монтирования.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-orange)">onBeforeMount</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Компонент создан, но ещё не в DOM.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-green)">✅ onMounted</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Компонент в DOM. Можно работать с элементами, делать fetch, подписываться на события.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-blue)">🔄 onBeforeUpdate → onUpdated</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              При изменении реактивных данных. Может вызываться многократно.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-red)">🔴 onBeforeUnmount → onUnmounted</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              При удалении компонента. Очистка ресурсов, отписка от событий.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Интерактивная демка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Lifecycle в действии</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Попробуйте!</div>
          <p>
            Нажмите "Скрыть" чтобы увидеть unmount хуки, затем "Показать" для mount.
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <div v-if="showChild" :key="childKey" style="padding: 20px; border: 2px solid var(--accent-vue); border-radius: 8px">
              <ChildComponent @log="addChildLog" />
            </div>
            <div v-else style="padding: 20px; border: 2px dashed var(--border-color); border-radius: 8px; text-align: center; color: var(--text-muted)">
              Компонент размонтирован
            </div>
          </div>

          <div class="controls">
            <button class="btn btn-primary" @click="showChild = !showChild">
              {{ showChild ? '🔴 Скрыть (unmount)' : '🟢 Показать (mount)' }}
            </button>
            <button class="btn btn-danger" @click="resetDemo">
              🔄 Сброс
            </button>
          </div>
        </div>

        <div style="width: 400px">
          <div style="margin-bottom: 16px">
            <h4 style="margin-bottom: 8px">Parent logs:</h4>
            <RenderLog :logs="parentLogs" />
          </div>
          <div>
            <h4 style="margin-bottom: 8px">Child logs:</h4>
            <RenderLog :logs="childLogs" />
          </div>
        </div>
      </div>
    </div>

    <!-- Очистка ресурсов -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🧹 Очистка ресурсов</h3>
        <span class="card-badge">Важно!</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Memory Leaks</div>
          <p>
            Всегда очищайте таймеры, отписывайтесь от событий и отменяйте запросы в onUnmounted.
            Иначе получите утечки памяти!
          </p>
        </div>
      </div>

      <CodeBlock :code="cleanupCode" language="typescript" title="🧹 Паттерны очистки" />
    </div>

    <!-- Options vs Composition -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Options API vs Composition API</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <CodeBlock :code="optionsVsCompositionCode" language="typescript" title="🔄 Маппинг хуков" />
    </div>
  </div>
</template>

<script lang="ts">
// Child component for demo
// Note: These imports are separate from <script setup> scope
import { defineComponent, ref as childRef, onBeforeMount as childOnBeforeMount, onMounted as childOnMounted, onBeforeUpdate as childOnBeforeUpdate, onUpdated as childOnUpdated, onBeforeUnmount as childOnBeforeUnmount, onUnmounted as childOnUnmounted } from 'vue'

const ChildComponent = defineComponent({
  emits: ['log'],
  setup(_, { emit }) {
    const counter = childRef(0)

    childOnBeforeMount(() => emit('log', 'mount', 'Child: onBeforeMount'))
    childOnMounted(() => emit('log', 'mount', 'Child: onMounted'))
    childOnBeforeUpdate(() => emit('log', 'update', 'Child: onBeforeUpdate'))
    childOnUpdated(() => emit('log', 'update', 'Child: onUpdated'))
    childOnBeforeUnmount(() => emit('log', 'cleanup', 'Child: onBeforeUnmount'))
    childOnUnmounted(() => emit('log', 'cleanup', 'Child: onUnmounted'))

    return { counter }
  },
  template: `
    <div style="text-align: center">
      <h4 style="color: var(--accent-vue)">👶 Child Component</h4>
      <p style="color: var(--text-secondary); margin: 8px 0">Counter: {{ counter }}</p>
      <button class="btn btn-secondary" @click="counter++">+1 (trigger update)</button>
    </div>
  `
})

export { ChildComponent }
</script>
