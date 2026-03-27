<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'shallow' | 'watch' | 'composables' | 'interview'>('shallow')

/* ── Shallow & Raw APIs ── */
const shallowCode = `import { shallowRef, shallowReactive, triggerRef } from 'vue'

// shallowRef — реактивна ТОЛЬКО при замене .value
const rows = shallowRef([{ id: 1, name: 'Alice' }])
rows.value[0].name = 'Bob'   // ❌ НЕ тригерит обновление
rows.value = [...rows.value]  // ✅ Замена .value — тригерит

// triggerRef — принудительный тригер
rows.value[0].name = 'Bob'
triggerRef(rows)               // ✅ Принудительное обновление

// shallowReactive — реактивен ТОЛЬКО на первом уровне
const config = shallowReactive({
  theme: 'dark',               // ✅ Реактивно
  nested: { color: 'red' }     // ❌ НЕ реактивно внутри
})
config.theme = 'light'         // ✅ Тригерит
config.nested.color = 'blue'   // ❌ НЕ тригерит`

const rawCode = `import { markRaw, toRaw, reactive, ref } from 'vue'

// markRaw — объект НИКОГДА не станет реактивным
class HeavyChart {
  constructor(public data: number[]) {}
  render() { /* canvas drawing */ }
}

const chart = markRaw(new HeavyChart([1, 2, 3]))
const state = reactive({ chart }) // chart остаётся НЕ-реактивным

// toRaw — получить исходный объект из reactive/ref
const original = reactive({ count: 0 })
const raw = toRaw(original)
raw === original  // false (raw — исходный plain object)
raw.count++       // ❌ НЕ тригерит обновление (обход Proxy)

// Когда использовать toRaw:
// 1. Передача во внешние библиотеки (D3, Chart.js)
// 2. Сравнение по ссылке (===)
// 3. JSON.stringify без Proxy-обёрток
// 4. structuredClone для deep copy`

const whenToUseShallow = [
  { api: 'shallowRef', when: 'Большие массивы/объекты, которые заменяются целиком (таблицы, списки из API)', perf: 'Нет deep proxy — O(1) вместо O(n)' },
  { api: 'shallowReactive', when: 'Конфиги с вложенными объектами, где вложенность не меняется', perf: 'Proxy только на 1 уровень' },
  { api: 'markRaw', when: 'Экземпляры классов (Chart.js, Map, regex), DOM-элементы, большие readonly-данные', perf: 'Нет Proxy вообще' },
  { api: 'toRaw', when: 'Передача в сторонние библиотеки, JSON.stringify, deep clone, тесты', perf: 'Обход Proxy для операции' },
  { api: 'triggerRef', when: 'Мутация .value у shallowRef без замены (push в массив)', perf: 'Ручной контроль обновлений' }
]

/* ── Watch Timing ── */

const watchFlushCode = `import { watch, watchEffect, ref, nextTick } from 'vue'

const count = ref(0)

// flush: 'post' (по умолчанию для watch)
// — коллбэк вызывается ПОСЛЕ обновления DOM
watch(count, (val) => {
  console.log(document.querySelector('#el')?.textContent) // обновлённый DOM
}, { flush: 'post' })

// flush: 'pre' (по умолчанию для watchEffect)
// — коллбэк вызывается ДО обновления DOM
watchEffect(() => {
  console.log('count:', count.value) // до DOM update
}, { flush: 'pre' })

// flush: 'sync' — НЕМЕДЛЕННО при изменении, до батчинга
// ⚠️ Используйте ТОЛЬКО если нужна мгновенная реакция
watch(count, (val) => {
  console.log('sync:', val) // сразу, без батчинга
}, { flush: 'sync' })

// watchPostEffect / watchSyncEffect — удобные алиасы (Vue 3.2+)
import { watchPostEffect, watchSyncEffect } from 'vue'
watchPostEffect(() => { /* после DOM */ })
watchSyncEffect(() => { /* мгновенно */ })`

const watchCleanupCode = `import { watch, watchEffect, ref, onWatcherCleanup } from 'vue'

// Паттерн 1: onCleanup в watchEffect
watchEffect((onCleanup) => {
  const controller = new AbortController()
  
  fetch('/api/data?q=' + query.value, {
    signal: controller.signal
  })
  
  // Вызывается ПЕРЕД следующим запуском или unmount
  onCleanup(() => controller.abort())
})

// Паттерн 2: onWatcherCleanup (Vue 3.5+)
watch(searchQuery, (query) => {
  const controller = new AbortController()
  
  fetch('/api/search?q=' + query, { signal: controller.signal })
  
  // Новый API — вызов из любого места внутри callback
  onWatcherCleanup(() => controller.abort())
})

// Паттерн 3: WebSocket cleanup
watchEffect((onCleanup) => {
  const ws = new WebSocket(url.value)
  ws.onmessage = (e) => { messages.value.push(e.data) }
  
  onCleanup(() => ws.close())
})

// Паттерн 4: Timer cleanup
watch(isActive, (active) => {
  if (!active) return
  const id = setInterval(() => tick(), 1000)
  onWatcherCleanup(() => clearInterval(id))
})`

const flushComparison = [
  { flush: 'pre', timing: 'До обновления DOM', useCase: 'Чтение pre-update состояния', default: 'watchEffect' },
  { flush: 'post', timing: 'После обновления DOM', useCase: 'Чтение обновлённого DOM', default: 'watch' },
  { flush: 'sync', timing: 'Синхронно (без батчинга)', useCase: 'Критичная мгновенная реакция', default: '—' }
]

/* ── Composable Anti-patterns ── */

const antiPatterns = [
  {
    title: '❌ Composable без ref (потеря реактивности)',
    bad: `// ❌ Возвращает примитив
function useCounter() {
  let count = 0
  const increment = () => count++
  return { count, increment }
}`,
    good: `// ✅ Возвращает ref
function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}`
  },
  {
    title: '❌ Деструктуризация reactive в composable',
    bad: `// ❌ Потеря реактивности
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  // ...
  return { ...state } // ❌ spread теряет Proxy
}`,
    good: `// ✅ toRefs сохраняет связь
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  // ...  
  return toRefs(state)
}
// Или просто используйте ref с самого начала:
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  return { x, y }
}`
  },
  {
    title: '❌ Side-effects без cleanup',
    bad: `// ❌ Утечка подписки при unmount
function useWindowSize() {
  const width = ref(window.innerWidth)
  window.addEventListener('resize', () => {
    width.value = window.innerWidth
  })
  return { width }
}`,
    good: `// ✅ Cleanup через onUnmounted
function useWindowSize() {
  const width = ref(window.innerWidth)
  const handler = () => { width.value = window.innerWidth }
  
  onMounted(() => window.addEventListener('resize', handler))
  onUnmounted(() => window.removeEventListener('resize', handler))
  
  return { width }
}`
  },
  {
    title: '❌ Composable вне setup',
    bad: `// ❌ Вызов в обычной функции
function handleClick() {
  const { data } = useFetch('/api') // ❌ Нет контекста
}`,
    good: `// ✅ Вызов в setup (или другом composable)
const { data } = useFetch('/api') // ✅ В <script setup>

// ✅ Или в composable, который вызывается из setup
function useUserData(userId: Ref<string>) {
  return useFetch(computed(() => \'/api/users/\' + userId.value))
}`
  },
  {
    title: '❌ Жёсткие значения вместо ref/getter параметров',
    bad: `// ❌ Не реагирует на изменение url
function useFetch(url: string) {
  const data = ref(null)
  fetch(url).then(r => r.json()).then(d => data.value = d)
  return { data }
}`,
    good: `// ✅ Принимает ref или getter для реактивности
function useFetch(url: MaybeRefOrGetter<string>) {
  const data = ref(null)
  watchEffect(() => {
    fetch(toValue(url))
      .then(r => r.json())
      .then(d => data.value = d)
  })
  return { data }
}`
  }
]

const composableRules = [
  { rule: 'Вызывать только в setup или в другом composable', why: 'Нужен контекст компонента для lifecycle hooks' },
  { rule: 'Возвращать ref-ы, не примитивы и не reactive', why: 'Потребитель может деструктурировать без потерь' },
  { rule: 'Принимать ref/getter параметры через MaybeRefOrGetter', why: 'Composable реагирует на изменения входных данных' },
  { rule: 'Очищать side-effects в onUnmounted', why: 'addEventListener, setInterval, WebSocket → утечки' },
  { rule: 'Использовать toValue() для нормализации входов', why: 'Vue 3.3+, работает с ref | getter | значение' },
  { rule: 'Именовать use* и держать в composables/', why: 'Конвенция + автоимпорт в Nuxt' }
]

const interviewQuestions = [
  {
    q: 'В чём разница между shallowRef и ref? Когда использовать shallow?',
    a: 'ref делает deep reactive — проксирует все вложенные объекты. shallowRef реактивен только при замене .value. Используют для больших данных (таблицы 10K+ строк, Canvas-данные), где deep tracking — лишний overhead. Мутации внутри требуют triggerRef().'
  },
  {
    q: 'Что такое flush у watch и чем отличаются pre/post/sync?',
    a: 'flush определяет КОГДА запускается callback. pre — до DOM update (default watchEffect), post — после DOM update (default watch), sync — мгновенно без батчинга (⚠️ осторожно с performance). watchPostEffect и watchSyncEffect — алиасы для удобства.'
  },
  {
    q: 'Как правильно отменять запросы при смене зависимости в watch?',
    a: 'Использовать onCleanup (параметр watchEffect) или onWatcherCleanup (Vue 3.5+). В cleanup вызывать AbortController.abort(), clearInterval, ws.close() и т.д. Cleanup срабатывает ПЕРЕД следующим запуском и при unmount компонента.'
  },
  {
    q: 'Назовите 3 антипаттерна в composables и как их исправить.',
    a: '1) Возврат примитивов вместо ref → потеря реактивности. Исправить: возвращать ref. 2) Отсутствие cleanup → утечки памяти. Исправить: onUnmounted. 3) Строковые параметры вместо ref/getter → нет реактивности на изменение. Исправить: MaybeRefOrGetter + toValue().'
  }
]
</script>

<template>
  <div>
    <h1>⚡ Продвинутая реактивность и Composables</h1>
    <p class="section-desc">
      Shallow/Raw API, тайминг watchers, cleanup-паттерны и антипаттерны composables.
    </p>

    <div class="tab-nav">
      <button :class="['tab-btn', { active: activeTab === 'shallow' }]" @click="activeTab = 'shallow'">
        Shallow & Raw
      </button>
      <button :class="['tab-btn', { active: activeTab === 'watch' }]" @click="activeTab = 'watch'">
        Watch Timing
      </button>
      <button :class="['tab-btn', { active: activeTab === 'composables' }]" @click="activeTab = 'composables'">
        Composable Pitfalls
      </button>
      <button :class="['tab-btn', { active: activeTab === 'interview' }]" @click="activeTab = 'interview'">
        🎤 Собеседование
      </button>
    </div>

    <!-- Shallow & Raw Tab -->
    <div v-if="activeTab === 'shallow'">
      <h2>shallowRef / shallowReactive</h2>
      <p class="section-desc">Оптимизация для больших данных — реактивность только на верхнем уровне.</p>
      <CodeBlock :code="shallowCode" language="typescript" title="Shallow APIs" />

      <h2>toRaw / markRaw</h2>
      <p class="section-desc">Обход реактивной системы для внешних библиотек и тяжёлых объектов.</p>
      <CodeBlock :code="rawCode" language="typescript" title="Raw APIs" />

      <h2>Когда какой API</h2>
      <table>
        <thead>
          <tr>
            <th>API</th>
            <th>Когда использовать</th>
            <th>Performance-выигрыш</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in whenToUseShallow" :key="item.api">
            <td><code>{{ item.api }}</code></td>
            <td>{{ item.when }}</td>
            <td>{{ item.perf }}</td>
          </tr>
        </tbody>
      </table>

      <div class="info-box" style="margin-top: 1.5rem;">
        <strong>⚠️ Правило:</strong> Начинайте с ref/reactive. Переходите на shallow/raw только когда профилируете
        и видите проблему с deep tracking (DevTools → Performance → Scripting time).
      </div>
    </div>

    <!-- Watch Timing Tab -->
    <div v-if="activeTab === 'watch'">
      <h2>flush: pre / post / sync</h2>
      <p class="section-desc">Контроль КОГДА именно срабатывает callback watcher-а.</p>

      <table>
        <thead>
          <tr>
            <th>flush</th>
            <th>Тайминг</th>
            <th>Use Case</th>
            <th>Default для</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in flushComparison" :key="item.flush">
            <td><code>{{ item.flush }}</code></td>
            <td>{{ item.timing }}</td>
            <td>{{ item.useCase }}</td>
            <td>{{ item.default }}</td>
          </tr>
        </tbody>
      </table>

      <CodeBlock :code="watchFlushCode" language="typescript" title="Watch flush modes" />

      <h2>Cleanup (отмена предыдущего эффекта)</h2>
      <p class="section-desc">Критично для fetch, WebSocket, таймеров — предотвращает race conditions и утечки.</p>
      <CodeBlock :code="watchCleanupCode" language="typescript" title="Watch cleanup patterns" />

      <div class="info-box" style="margin-top: 1.5rem;">
        <strong>💡 Vue 3.5+:</strong> <code>onWatcherCleanup()</code> можно вызвать из любого места внутри callback
        (не только как параметр). Это удобнее для сложных условий.
      </div>
    </div>

    <!-- Composable Anti-patterns Tab -->
    <div v-if="activeTab === 'composables'">
      <h2>Антипаттерны composables</h2>
      <p class="section-desc">5 частых ошибок при создании composables и их исправления.</p>

      <div v-for="(pattern, i) in antiPatterns" :key="i" style="margin-bottom: 2rem;">
        <h3>{{ pattern.title }}</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <CodeBlock :code="pattern.bad" language="typescript" title="❌ Плохо" />
          <CodeBlock :code="pattern.good" language="typescript" title="✅ Хорошо" />
        </div>
      </div>

      <h2>Правила composables</h2>
      <table>
        <thead>
          <tr>
            <th>Правило</th>
            <th>Почему</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in composableRules" :key="item.rule">
            <td>{{ item.rule }}</td>
            <td>{{ item.why }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Interview Tab -->
    <div v-if="activeTab === 'interview'">
      <h2>🎤 Вопросы к собеседованию</h2>
      <div v-for="(q, i) in interviewQuestions" :key="i" class="interview-item">
        <h3>{{ q.q }}</h3>
        <p>{{ q.a }}</p>
      </div>
    </div>
  </div>
</template>
