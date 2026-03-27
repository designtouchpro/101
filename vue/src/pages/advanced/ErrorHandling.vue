<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'basics' | 'patterns' | 'async' | 'interview'>('basics')

const interviewQuestions = [
  {
    q: 'Есть ли в Vue аналог React Error Boundaries?',
    a: 'Да — onErrorCaptured хук. Он ловит ошибки дочерних компонентов. Разница: в React componentDidCatch — классовый метод. В Vue — Composition API хук, который можно вынести в composable. Vue позволяет return false для остановки всплытия.'
  },
  {
    q: 'Какие ошибки НЕ ловит Vue errorHandler?',
    a: 'Ошибки в «голых» промисах (fetch().then(throw)), setTimeout/setInterval callback-ах, event listeners добавленных через addEventListener. Всё, что выходит за пределы Vue reactivity system. Для них нужен window.addEventListener("unhandledrejection") и window.onerror.'
  },
  {
    q: 'Как onErrorCaptured всплывает?',
    a: 'Снизу вверх по дереву компонентов. Каждый родитель с onErrorCaptured получит ошибку. return false останавливает всплытие (аналог e.stopPropagation). Если никто не остановил — дойдёт до app.config.errorHandler. Если и его нет — console.error.'
  },
  {
    q: 'Как обработать ошибку в async setup() компонента?',
    a: 'Обернуть компонент в Suspense + ErrorBoundary (с onErrorCaptured). ErrorBoundary СНАРУЖИ Suspense. Suspense ожидает async setup, а если он бросит ошибку — ErrorBoundary её поймает. Без Suspense async setup не работает.'
  },
  {
    q: 'Зачем нужен warnHandler?',
    a: 'app.config.warnHandler ловит предупреждения Vue (в dev mode). Полезно для CI/CD — можно собирать warnings и отслеживать потенциальные проблемы. В production warnings не генерируются (tree-shaken).'
  },
]

// Live Demo
const errorLog = ref<string[]>([])
const showBrokenComponent = ref(false)

const addLog = (msg: string) => {
  errorLog.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
}

const errorCapturedCode = `<script setup>
import { onErrorCaptured, ref } from 'vue'

const error = ref<Error | null>(null)

onErrorCaptured((err, instance, info) => {
  // err — объект ошибки
  // instance — компонент где произошла ошибка
  // info — тип ошибки ('render', 'setup', 'watcher', etc.)
  
  error.value = err as Error
  console.error(\`[ErrorBoundary] \${info}:\`, err)
  
  // return false → НЕ пробрасывать вверх по дереву
  // (аналог e.stopPropagation)
  return false
})
<\/script>

<template>
  <!-- Без ошибки — рендерим дочерние -->
  <slot v-if="!error" />
  
  <!-- С ошибкой — fallback UI -->
  <div v-else class="error-boundary">
    <h3>Что-то пошло не так</h3>
    <p>{{ error.message }}</p>
    <button @click="error = null">Попробовать снова</button>
  </div>
</template>`

const globalHandlerCode = `// main.ts
const app = createApp(App)

// Глобальный обработчик ошибок (последний рубеж)
app.config.errorHandler = (err, instance, info) => {
  // err — Error object
  // instance — Vue component instance
  // info — строка типа ошибки
  
  console.error('Global error:', err)
  
  // Отправить в Sentry / Bugsnag
  Sentry.captureException(err, {
    extra: { 
      component: instance?.$options.name,
      info 
    }
  })
}

// Предупреждения Vue (только dev)
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue warning:', msg)
}

// ⚠️ errorHandler ловит ВСЁ что не поймано:
// - ошибки рендера
// - ошибки в хуках lifecycle
// - ошибки в watch callback
// - ошибки в setup()
// - НО НЕ ловит промисы без await!`

const errorTypesCode = `// Типы ошибок (info параметр):
// 'setup function'      — ошибка в setup()
// 'render function'     — ошибка при рендере шаблона
// 'watcher getter'      — ошибка в watch source
// 'watcher callback'    — ошибка в watch callback
// 'component event handler' — @click и т.д.
// 'lifecycle hook'      — mounted, updated и т.д.

// Порядок обработки ошибок:
// 1. onErrorCaptured в родителях (снизу вверх)
//    → return false = остановить
//    → return true/undefined = продолжить вверх
// 2. app.config.errorHandler (глобальный)
// 3. console.error (если нет обработчиков)`

const asyncErrorsCode = `// ⚠️ Ловятся — ошибки в async setup:
export default {
  async setup() {
    const data = await fetch('/api') // ✅ ловится
    throw new Error('oops')          // ✅ ловится
  }
}

// ⚠️ НЕ ловятся — «голые» промисы:
const fetchData = () => {
  // ❌ НЕ ловится errorHandler!
  fetch('/api').then(r => {
    throw new Error('oops')
  })
}

// ✅ Решение 1: async/await + try/catch
const fetchData = async () => {
  try {
    const res = await fetch('/api')
  } catch (err) {
    handleError(err)
  }
}

// ✅ Решение 2: window.onunhandledrejection
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason)
  event.preventDefault()
})`

const errorBoundaryCode = `<!-- ErrorBoundary.vue — переиспользуемый компонент -->
<script setup lang="ts">
import { onErrorCaptured, ref, useSlots } from 'vue'

const props = defineProps<{
  fallback?: string
}>()

const emit = defineEmits<{
  error: [err: Error, info: string]
}>()

const error = ref<Error | null>(null)
const errorInfo = ref('')

onErrorCaptured((err, instance, info) => {
  error.value = err as Error
  errorInfo.value = info
  emit('error', err as Error, info)
  return false // не пробрасывать
})

const retry = () => {
  error.value = null
}
<\/script>

<template>
  <slot v-if="!error" />
  <div v-else class="error-fallback">
    <slot name="fallback" :error="error" :retry="retry">
      <p>{{ fallback || error.message }}</p>
      <button @click="retry">Повторить</button>
    </slot>
  </div>
</template>

<!-- Использование: -->
<ErrorBoundary fallback="Ошибка загрузки виджета">
  <SomeUnreliableWidget />
</ErrorBoundary>

<!-- Или с кастомным fallback: -->
<ErrorBoundary @error="logToSentry">
  <template #fallback="{ error, retry }">
    <div class="custom-error">
      <h3>{{ error.message }}</h3>
      <button @click="retry">↻ Обновить</button>
    </div>
  </template>
  <DashboardWidget />
</ErrorBoundary>`

const suspenseErrorCode = `<!-- Suspense + ErrorBoundary = обработка async ошибок -->
<ErrorBoundary>
  <Suspense>
    <template #default>
      <AsyncComponent />  <!-- async setup() может упасть -->
    </template>
    <template #fallback>
      <LoadingSpinner />
    </template>
  </Suspense>
</ErrorBoundary>

<!-- Порядок:
  1. Рендерится LoadingSpinner (Suspense fallback)
  2. AsyncComponent загружается (async setup)
  3a. Успех → рендерится AsyncComponent
  3b. Ошибка → ErrorBoundary ловит → показывает fallback
-->`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🛡️ Обработка ошибок</h1>
      <p>
        Error Boundaries, onErrorCaptured, глобальный errorHandler, 
        и как ловить async ошибки.
      </p>
    </div>

    <div class="tabs" style="margin-bottom: 24px">
      <button 
        v-for="tab in [
          { key: 'basics', label: '📦 Основы' },
          { key: 'patterns', label: '🧩 Паттерны' },
          { key: 'async', label: '⚡ Async' },
          { key: 'interview', label: '🎯 Вопросы' },
        ]"
        :key="tab.key"
        :class="['tab', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key as any"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Основы -->
    <template v-if="activeTab === 'basics'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🛡️ Три уровня обработки ошибок</h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px">
          <div v-for="(level, i) in [
            { name: 'onErrorCaptured (компонент)', desc: 'Ловит ошибки дочерних компонентов. Аналог React Error Boundaries. Может остановить всплытие (return false).', color: 'var(--accent-green)' },
            { name: 'app.config.errorHandler (глобальный)', desc: 'Последний рубеж. Ловит всё, что не перехвачено. Идеально для Sentry / логирования.', color: 'var(--accent-orange)' },
            { name: 'window.onerror / unhandledrejection', desc: 'Браузерный уровень. Ловит неперехваченные промисы и runtime ошибки вне Vue.', color: 'var(--accent-red)' },
          ]" :key="i" :style="{ padding: '14px 16px', background: 'var(--bg-code)', borderRadius: '8px', borderLeft: `3px solid ${level.color}` }">
            <strong style="font-size: 0.9rem">{{ i + 1 }}. {{ level.name }}</strong>
            <p style="margin-top: 4px; font-size: 0.85rem; color: var(--text-secondary)">{{ level.desc }}</p>
          </div>
        </div>

        <CodeBlock :code="errorTypesCode" language="typescript" title="Типы ошибок и порядок обработки" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔧 onErrorCaptured</h3>
        </div>
        <CodeBlock :code="errorCapturedCode" language="html" title="Error Boundary на Vue" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🌍 Глобальный errorHandler</h3>
        </div>
        <CodeBlock :code="globalHandlerCode" language="typescript" title="main.ts — глобальная обработка" />
      </div>
    </template>

    <!-- Паттерны -->
    <template v-if="activeTab === 'patterns'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🧩 ErrorBoundary компонент</h3>
          <span class="card-badge">Best Practice</span>
        </div>
        <CodeBlock :code="errorBoundaryCode" language="html" title="Переиспользуемый Error Boundary" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔄 Suspense + ErrorBoundary</h3>
        </div>
        <CodeBlock :code="suspenseErrorCode" language="html" title="Обработка async ошибок с Suspense" />

        <div class="info-box" style="margin-top: 16px">
          <span class="info-box-icon">💡</span>
          <div class="info-box-content">
            <div class="info-box-title">ErrorBoundary оборачивает Suspense</div>
            <p>
              ErrorBoundary должен быть СНАРУЖИ Suspense, чтобы поймать ошибки 
              async компонентов. Если ErrorBoundary внутри — ошибка async setup 
              может его обойти.
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- Async -->
    <template v-if="activeTab === 'async'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">⚡ Async ошибки — главная ловушка</h3>
        </div>

        <div class="info-box warning">
          <span class="info-box-icon">⚠️</span>
          <div class="info-box-content">
            <div class="info-box-title">«Голые» промисы не ловятся!</div>
            <p>
              app.config.errorHandler и onErrorCaptured НЕ ловят ошибки в промисах 
              без await. fetch().then(() => throw) — эта ошибка уйдёт в 
              unhandledrejection, минуя Vue.
            </p>
          </div>
        </div>

        <CodeBlock :code="asyncErrorsCode" language="typescript" title="Что ловится и что нет" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📊 Матрица отлова ошибок</h3>
        </div>

        <div style="overflow-x: auto">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem">
            <thead>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid var(--accent-vue)">Тип ошибки</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">onErrorCaptured</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">errorHandler</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">try/catch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in [
                { type: 'Ошибка в setup()', captured: true, handler: true, tryCatch: true },
                { type: 'Ошибка в render', captured: true, handler: true, tryCatch: false },
                { type: 'Ошибка в @click', captured: true, handler: true, tryCatch: true },
                { type: 'Ошибка в watch', captured: true, handler: true, tryCatch: false },
                { type: 'async setup() ошибка', captured: true, handler: true, tryCatch: true },
                { type: 'fetch().then(throw)', captured: false, handler: false, tryCatch: false },
                { type: 'await fetch() в async', captured: true, handler: true, tryCatch: true },
                { type: 'setTimeout throw', captured: false, handler: false, tryCatch: false },
              ]" :key="i" :style="{ background: i % 2 ? 'var(--bg-code)' : 'transparent' }">
                <td style="padding: 8px 10px; font-weight: 500">{{ row.type }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.captured ? '✅' : '❌' }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.handler ? '✅' : '❌' }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.tryCatch ? '✅' : '❌' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Собеседование -->
    <template v-if="activeTab === 'interview'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎯 Вопросы для собеседования</h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <details v-for="(item, i) in interviewQuestions" :key="i" class="interview-question">
            <summary style="cursor: pointer; padding: 14px 16px; background: var(--bg-code); border-radius: 8px; font-weight: 600; font-size: 0.9rem">
              {{ item.q }}
            </summary>
            <div style="padding: 14px 16px; color: var(--text-secondary); line-height: 1.6; border-left: 3px solid var(--accent-vue); margin-left: 16px; margin-top: 8px">
              {{ item.a }}
            </div>
          </details>
        </div>
      </div>
    </template>
  </div>
</template>
