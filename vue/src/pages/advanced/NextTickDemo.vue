<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'basics' | 'why' | 'gotchas' | 'interview'>('basics')

const interviewQuestions = [
  {
    q: 'Почему Vue обновляет DOM асинхронно?',
    a: 'Производительность. Если обновлять DOM на каждое изменение ref — при 100 изменениях будет 100 перерисовок. Vue собирает все изменения в батч и делает ОДИН рендер. Это достигается через микрозадачу (Promise.then).'
  },
  {
    q: 'Что делает nextTick и как работает внутри?',
    a: 'nextTick возвращает Promise, который резолвится после того, как Vue flush-ит очередь обновлений DOM. Внутри Vue 3 это Promise.then(). Vue 2 мог использовать MutationObserver или setTimeout как fallback.'
  },
  {
    q: 'Разница между $nextTick и nextTick из vue?',
    a: 'Функционально идентичны. this.$nextTick() — Options API (привязан к экземпляру). import { nextTick } from "vue" — Composition API. В Vue 3 оба используют один и тот же механизм.'
  },
  {
    q: 'Что такое flush в watch и какие значения бывают?',
    a: 'flush определяет КОГДА вызывается callback: pre (default) — до обновления DOM, post — после DOM обновления (аналог nextTick), sync — синхронно (опасно для производительности). watchPostEffect — shorthand для flush: post.'
  },
  {
    q: 'Когда nextTick НЕ нужен?',
    a: 'В шаблоне — Vue автоматически работает с актуальным state. В computed — Vue гарантирует актуальность. В watch callback — данные уже обновлены (но DOM может быть нет, если flush: pre). nextTick нужен только когда вам нужен ОБНОВЛЁННЫЙ DOM в императивном коде.'
  },
]

// Live Demo: nextTick
const message = ref('Старый текст')
const domContent = ref('')
const log = ref<string[]>([])

const updateMessage = async () => {
  log.value = []
  log.value.push('1. message = "Новый текст" (реактивное обновление)')
  message.value = 'Новый текст'
  
  // DOM ещё НЕ обновился!
  const beforeTick = document.getElementById('nextTickTarget')?.textContent
  log.value.push(`2. DOM до nextTick: "${beforeTick}"`)
  
  await nextTick()
  
  // Теперь DOM обновился
  const afterTick = document.getElementById('nextTickTarget')?.textContent
  log.value.push(`3. DOM после nextTick: "${afterTick}"`)
}

const resetDemo = () => {
  message.value = 'Старый текст'
  log.value = []
}

// Live Demo: multiple updates
const counter = ref(0)
const renderCount = ref(0)
const batchLog = ref<string[]>([])

const batchUpdate = () => {
  batchLog.value = []
  const startRenders = renderCount.value
  
  // Vue батчит все эти обновления!
  counter.value = 1
  counter.value = 2
  counter.value = 3
  counter.value = 42
  
  batchLog.value.push('counter = 1, 2, 3, 42 (4 присвоения)')
  batchLog.value.push('→ DOM обновится ОДИН раз с финальным значением 42')
  batchLog.value.push(`→ Рендеров: 1 (не 4!)`)
}

const basicCode = `// nextTick — ждёт следующего цикла обновления DOM
import { ref, nextTick } from 'vue'

const count = ref(0)

// Реактивное обновление НЕ синхронно обновляет DOM!
count.value++

// ❌ DOM ещё старый!
console.log(el.textContent) // "0"

// ✅ Ждём обновления DOM
await nextTick()
console.log(el.textContent) // "1"

// Альтернативный синтаксис (callback):
nextTick(() => {
  console.log(el.textContent) // "1"
})`

const batchingCode = `// Vue БАТЧИТ обновления DOM
const count = ref(0)

// Все 3 изменения → один рендер!
count.value++
count.value++
count.value++
// DOM обновится ОДИН раз с count = 3

// Даже разные ref'ы батчатся:
const a = ref(0)
const b = ref(0)
a.value = 1
b.value = 2
// Один рендер с a=1, b=2

// Почему? Vue использует Promise (microtask)
// для откладывания flush'а обновлений`

const microtaskCode = `// Порядок выполнения:
console.log('1. Синхронный код')

count.value++ // ставит flush в microtask queue

Promise.resolve().then(() => {
  console.log('3. Другой microtask')
})

await nextTick()
console.log('4. DOM обновлён')

console.log('2. Ещё синхронный код')

// Порядок: 1 → 2 → flush DOM → 3 → 4
// nextTick использует Promise.then() внутри`

const useCasesCode = `// Кейс 1: Фокус на новый элемент
const showInput = ref(false)
const inputRef = ref<HTMLInputElement>()

const addField = async () => {
  showInput.value = true
  await nextTick()
  inputRef.value?.focus() // Элемент уже в DOM
}

// Кейс 2: Получить размеры после обновления
const items = ref<string[]>([])
const listRef = ref<HTMLDivElement>()

const addItem = async (item: string) => {
  items.value.push(item)
  await nextTick()
  // scrollHeight уже учитывает новый элемент
  listRef.value?.scrollTo(0, listRef.value.scrollHeight)
}

// Кейс 3: Тестирование (Vitest/Vue Test Utils)
test('updates text', async () => {
  const wrapper = mount(MyComponent)
  wrapper.vm.message = 'new'
  await nextTick() // или await wrapper.vm.$nextTick()
  expect(wrapper.text()).toContain('new')
})`

const watchFlushCode = `// watch - контроль порядка через flush
import { watch, ref } from 'vue'

const count = ref(0)

// flush: 'pre' (default) — до обновления DOM
watch(count, (val) => {
  // DOM ещё НЕ обновлён!
  console.log('pre:', document.querySelector('#c')?.textContent)
})

// flush: 'post' — ПОСЛЕ обновления DOM
watch(count, (val) => {
  // DOM уже обновлён, как после nextTick
  console.log('post:', document.querySelector('#c')?.textContent)
}, { flush: 'post' })

// watchPostEffect — shorthand для flush: 'post'
import { watchPostEffect } from 'vue'
watchPostEffect(() => {
  // Автоматически tracks + вызывается после DOM flush
})`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>⏱️ nextTick</h1>
      <p>
        Почему DOM обновляется не сразу, как Vue батчит обновления, 
        и когда нужен nextTick.
      </p>
    </div>

    <div class="tabs" style="margin-bottom: 24px">
      <button 
        v-for="tab in [
          { key: 'basics', label: '📦 Основы' },
          { key: 'why', label: '🧠 Батчинг' },
          { key: 'gotchas', label: '⚡ Кейсы' },
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
          <h3 class="card-title">📦 Зачем нужен nextTick?</h3>
        </div>

        <div class="info-box warning">
          <span class="info-box-icon">⚠️</span>
          <div class="info-box-content">
            <div class="info-box-title">Главное: DOM обновляется АСИНХРОННО</div>
            <p>
              Когда вы меняете реактивные данные, Vue НЕ обновляет DOM сразу.
              Вместо этого он собирает все изменения и применяет их одним батчем
              в следующем микротаске (Promise.then).
            </p>
          </div>
        </div>

        <CodeBlock :code="basicCode" language="typescript" title="Базовое использование" />
      </div>

      <!-- Live Demo: nextTick -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎮 Live Demo</h3>
        </div>

        <div style="margin-bottom: 16px; padding: 16px; background: var(--bg-code); border-radius: 8px; font-size: 1.1rem;">
          DOM: <span id="nextTickTarget" style="color: var(--accent-vue); font-weight: 700">{{ message }}</span>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 16px">
          <button class="btn" @click="updateMessage">Обновить</button>
          <button class="btn btn-secondary" @click="resetDemo">Сброс</button>
        </div>

        <div v-if="log.length" style="display: flex; flex-direction: column; gap: 6px">
          <div 
            v-for="(entry, i) in log" :key="i"
            :style="{ 
              padding: '8px 14px', 
              background: 'var(--bg-code)', 
              borderRadius: '6px', 
              fontFamily: 'monospace', 
              fontSize: '0.85rem',
              borderLeft: `3px solid ${i === 2 ? 'var(--accent-green)' : i === 1 ? 'var(--accent-orange)' : 'var(--accent-cyan)'}` 
            }"
          >
            {{ entry }}
          </div>
        </div>
      </div>
    </template>

    <!-- Батчинг -->
    <template v-if="activeTab === 'why'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🧠 Батчинг обновлений</h3>
        </div>

        <CodeBlock :code="batchingCode" language="typescript" title="Vue батчит все изменения" />
      </div>

      <!-- Live Demo: Batching -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎮 Демо: 4 присвоения → 1 рендер</h3>
        </div>

        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px">
          <span style="font-size: 1.2rem">counter = <strong style="color: var(--accent-vue)">{{ counter }}</strong></span>
          <button class="btn" @click="batchUpdate">Батч (4 присвоения)</button>
          <button class="btn btn-secondary" @click="counter = 0; batchLog = []">Сброс</button>
        </div>

        <div v-if="batchLog.length" style="display: flex; flex-direction: column; gap: 6px">
          <div 
            v-for="(entry, i) in batchLog" :key="i"
            style="padding: 8px 14px; background: var(--bg-code); border-radius: 6px; font-family: monospace; font-size: 0.85rem"
          >
            {{ entry }}
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔄 Microtask Queue</h3>
        </div>
        <CodeBlock :code="microtaskCode" language="typescript" title="Порядок выполнения" />

        <div class="info-box" style="margin-top: 16px">
          <span class="info-box-icon">📌</span>
          <div class="info-box-content">
            <div class="info-box-title">Vue 2 vs Vue 3</div>
            <p>
              Vue 2 использовал разные стратегии (Promise → MutationObserver → setImmediate → setTimeout).
              Vue 3 ВСЕГДА использует Promise.then() — один механизм, предсказуемый порядок.
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- Кейсы -->
    <template v-if="activeTab === 'gotchas'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">⚡ Типичные кейсы для nextTick</h3>
        </div>
        <CodeBlock :code="useCasesCode" language="typescript" title="Фокус, скролл, тесты" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔄 watch flush: 'post' — альтернатива nextTick</h3>
        </div>

        <CodeBlock :code="watchFlushCode" language="typescript" title="flush: 'pre' vs 'post'" />

        <div class="info-box" style="margin-top: 16px">
          <span class="info-box-icon">💡</span>
          <div class="info-box-content">
            <div class="info-box-title">watch + flush: 'post' лучше nextTick</div>
            <p>
              Если вам нужно реагировать на изменение данных И работать с обновлённым DOM —
              используйте <code>flush: 'post'</code> вместо nextTick. 
              Это декларативнее и не требует ручного вызова.
            </p>
          </div>
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
