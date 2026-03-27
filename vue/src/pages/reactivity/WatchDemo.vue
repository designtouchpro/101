<script setup lang="ts">
import { ref, watch, watchEffect, onMounted } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'
import RenderLog from '@/components/RenderLog.vue'
import WatchSearchDemo from '@/components/WatchSearchDemo.vue'
import type { LogEntry } from '@/components/RenderLog.vue'

// Demo state
const count = ref(0)
const searchQuery = ref('')
const watchLogs = ref<LogEntry[]>([])
const watchEffectLogs = ref<LogEntry[]>([])
const mountTime = ref(Date.now())

const addWatchLog = (message: string) => {
  watchLogs.value.push({
    type: 'effect',
    message,
    timestamp: Date.now() - mountTime.value
  })
}

const addWatchEffectLog = (message: string) => {
  watchEffectLogs.value.push({
    type: 'effect',
    message,
    timestamp: Date.now() - mountTime.value
  })
}

// watch example
watch(count, (newVal, oldVal) => {
  addWatchLog(`count: ${oldVal} → ${newVal}`)
})

// watchEffect example
watchEffect(() => {
  addWatchEffectLog(`Эффект: count = ${count.value}`)
})

// Deep watch example
const user = ref({
  name: 'Вася',
  profile: { age: 25 }
})

const deepWatchLogs = ref<LogEntry[]>([])

watch(
  user,
  (newVal) => {
    deepWatchLogs.value.push({
      type: 'update',
      message: `user изменён: ${JSON.stringify(newVal)}`,
      timestamp: Date.now() - mountTime.value
    })
  },
  { deep: true }
)

onMounted(() => {
  addWatchLog('watch зарегистрирован')
  addWatchEffectLog('watchEffect запущен при монтировании')
})

const resetDemo = () => {
  count.value = 0
  searchQuery.value = ''
  user.value = { name: 'Вася', profile: { age: 25 } }
  watchLogs.value = []
  watchEffectLogs.value = []
  deepWatchLogs.value = []
  mountTime.value = Date.now()
}

const watchCode = `// ═══════════════════════════════════════════════════════════════
// 👁️ watch() — отслеживание конкретных источников
// Ленивый по умолчанию: НЕ запускается при создании
// ═══════════════════════════════════════════════════════════════

import { ref, watch } from 'vue'

const count = ref(0)

// ─────────────────────────────────────────────────────────────
// Базовый watch — отслеживает одно значение
// ─────────────────────────────────────────────────────────────
watch(count, (newValue, oldValue) => {
  console.log(\`count: \${oldValue} → \${newValue}\`)
})

// ─────────────────────────────────────────────────────────────
// Watch нескольких источников
// ─────────────────────────────────────────────────────────────
const firstName = ref('Иван')
const lastName = ref('Петров')

watch([firstName, lastName], ([newFirst, newLast], [oldFirst, oldLast]) => {
  console.log(\`Имя изменено: \${oldFirst} \${oldLast} → \${newFirst} \${newLast}\`)
})

// ─────────────────────────────────────────────────────────────
// Watch с getter-функцией (для reactive или вычислений)
// ─────────────────────────────────────────────────────────────
const state = reactive({ user: { name: 'Vue' } })

watch(
  () => state.user.name,  // getter возвращает отслеживаемое значение
  (newName, oldName) => {
    console.log(\`Имя: \${oldName} → \${newName}\`)
  }
)`

const watchEffectCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ watchEffect() — автоматическое отслеживание зависимостей
// Запускается СРАЗУ при создании
// ═══════════════════════════════════════════════════════════════

import { ref, watchEffect } from 'vue'

const count = ref(0)
const name = ref('Vue')

// ─────────────────────────────────────────────────────────────
// watchEffect автоматически отслеживает ВСЕ refs внутри
// ─────────────────────────────────────────────────────────────
watchEffect(() => {
  // Vue сам понимает, что нужно отслеживать count и name
  console.log(\`count = \${count.value}, name = \${name.value}\`)
})

// Запустится при:
// 1. Создании (сразу!)
// 2. Изменении count
// 3. Изменении name


// ═══════════════════════════════════════════════════════════════
// 🆚 watch vs watchEffect
// ═══════════════════════════════════════════════════════════════
// watch:
//   - Ленивый (не запускается сразу)
//   - Явные источники
//   - Доступ к старому и новому значению
//
// watchEffect:
//   - Немедленный (запускается сразу)
//   - Автоматические зависимости
//   - Только текущие значения`

const watchOptionsCode = `// ═══════════════════════════════════════════════════════════════
// ⚙️ Опции watch
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// immediate: true — запустить сразу (как watchEffect)
// ─────────────────────────────────────────────────────────────
watch(count, (newVal) => {
  console.log(\`count = \${newVal}\`)
}, { immediate: true })  // Запустится сразу с текущим значением


// ─────────────────────────────────────────────────────────────
// deep: true — глубокое отслеживание объектов
// ─────────────────────────────────────────────────────────────
const user = ref({ profile: { settings: { theme: 'dark' } } })

watch(user, (newUser) => {
  console.log('user изменён')
}, { deep: true })  // Сработает при user.value.profile.settings.theme = 'light'


// ─────────────────────────────────────────────────────────────
// flush: 'post' | 'pre' | 'sync' — когда запускать
// ─────────────────────────────────────────────────────────────
watch(count, () => {
  // 'pre' (default) — до обновления DOM
  // 'post' — после обновления DOM (для доступа к актуальному DOM)
  // 'sync' — синхронно (осторожно!)
}, { flush: 'post' })


// ─────────────────────────────────────────────────────────────
// once: true — сработает только один раз (Vue 3.4+)
// ─────────────────────────────────────────────────────────────
watch(count, () => {
  console.log('Сработает только один раз!')
}, { once: true })`

const cleanupCode = `// ═══════════════════════════════════════════════════════════════
// 🧹 Cleanup — очистка при перезапуске эффекта
// ═══════════════════════════════════════════════════════════════

import { watch, watchEffect, onWatcherCleanup } from 'vue'

const searchQuery = ref('')

// ─────────────────────────────────────────────────────────────
// Способ 1: onCleanup параметр
// ─────────────────────────────────────────────────────────────
watch(searchQuery, async (newQuery, oldQuery, onCleanup) => {
  const controller = new AbortController()
  
  // Регистрируем cleanup
  onCleanup(() => {
    controller.abort()  // Отменяем предыдущий запрос
  })
  
  const response = await fetch(\`/api/search?q=\${newQuery}\`, {
    signal: controller.signal
  })
})


// ─────────────────────────────────────────────────────────────
// Способ 2: onWatcherCleanup (Vue 3.5+)
// ─────────────────────────────────────────────────────────────
watchEffect(async () => {
  const controller = new AbortController()
  
  onWatcherCleanup(() => {
    controller.abort()
  })
  
  const response = await fetch(\`/api/data?q=\${searchQuery.value}\`, {
    signal: controller.signal
  })
})`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>👁️ watch / watchEffect</h1>
      <p>Отслеживание изменений и выполнение side effects</p>
      <a 
        href="https://vuejs.org/api/reactivity-core.html#watch" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- watch -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">watch() — явное отслеживание</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            <strong>watch()</strong> отслеживает конкретные источники и запускает колбек при их изменении.
            Ленивый по умолчанию — НЕ запускается при создании.
          </p>
        </div>
      </div>

      <CodeBlock :code="watchCode" language="typescript" title="👁️ Основы watch()" />
    </div>

    <!-- watchEffect -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">watchEffect() — автоматическое отслеживание</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">⚡</span>
        <div class="info-box-content">
          <div class="info-box-title">Автоматические зависимости</div>
          <p>
            <strong>watchEffect()</strong> автоматически отслеживает все реактивные значения,
            используемые внутри колбека. Запускается сразу при создании.
          </p>
        </div>
      </div>

      <CodeBlock :code="watchEffectCode" language="typescript" title="⚡ watchEffect()" />
    </div>

    <!-- Интерактивная демка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">watch vs watchEffect в действии</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <div style="margin-bottom: 24px">
              <label style="color: var(--text-secondary); display: block; margin-bottom: 8px">count:</label>
              <div style="display: flex; gap: 12px; align-items: center">
                <div class="value-display large">{{ count }}</div>
                <button class="btn btn-primary" @click="count++">+1</button>
                <button class="btn btn-secondary" @click="count--">-1</button>
              </div>
            </div>
          </div>

          <div class="controls">
            <button class="btn btn-danger" @click="resetDemo">
              🔄 Сброс
            </button>
          </div>
        </div>

        <div style="width: 500px">
          <div class="comparison-grid" style="grid-template-columns: 1fr 1fr">
            <div>
              <h4 style="margin-bottom: 8px; color: var(--accent-vue)">👁️ watch</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px">Ленивый: не срабатывает при создании</p>
              <RenderLog :logs="watchLogs" />
            </div>
            <div>
              <h4 style="margin-bottom: 8px; color: var(--accent-purple)">⚡ watchEffect</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px">Немедленный: срабатывает сразу</p>
              <RenderLog :logs="watchEffectLogs" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deep watch -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Deep watch для объектов</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Важно!</div>
          <p>
            По умолчанию watch НЕ отслеживает вложенные изменения объекта.
            Используйте <code>{ deep: true }</code> для глубокого отслеживания.
          </p>
        </div>
      </div>

      <div style="display: flex; gap: 24px; align-items: flex-start">
        <div style="flex: 1">
          <div class="visual-diagram">
            <pre style="font-family: 'Fira Code', monospace; font-size: 0.9rem;">
user = {
  name: "<span style="color: var(--accent-vue)">{{ user.name }}</span>",
  profile: {
    age: <span style="color: var(--accent-orange)">{{ user.profile.age }}</span>
  }
}
            </pre>
            <div class="controls" style="margin-top: 16px">
              <button class="btn btn-primary" @click="user.name = user.name === 'Вася' ? 'Петя' : 'Вася'">
                📝 Изменить name
              </button>
              <button class="btn btn-primary" @click="user.profile.age++">
                🎂 age +1
              </button>
            </div>
          </div>
        </div>

        <div style="width: 300px">
          <h4 style="margin-bottom: 8px">Лог deep watch:</h4>
          <RenderLog :logs="deepWatchLogs" />
        </div>
      </div>
    </div>

    <!-- Опции -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚙️ Опции watch</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <CodeBlock :code="watchOptionsCode" language="typescript" title="⚙️ immediate, deep, flush, once" />
    </div>

    <!-- Cleanup -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🧹 Cleanup — очистка эффектов</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🧹</span>
        <div class="info-box-content">
          <div class="info-box-title">Когда нужен cleanup?</div>
          <p>
            При асинхронных операциях (fetch, таймеры) нужно отменять предыдущие 
            операции, когда значение меняется снова.
          </p>
        </div>
      </div>

      <CodeBlock :code="cleanupCode" language="typescript" title="🧹 Отмена предыдущих операций" />
    </div>

    <!-- Search Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🔎 Практика: Поиск с debounce</h3>
        <span class="card-badge">Интерактив</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">Реальный пример</div>
          <p>
            watch идеален для поиска: отслеживаем ввод, делаем debounce, отменяем 
            предыдущие запросы. Попробуйте изменить задержку debounce!
          </p>
        </div>
      </div>

      <WatchSearchDemo />
    </div>
  </div>
</template>
