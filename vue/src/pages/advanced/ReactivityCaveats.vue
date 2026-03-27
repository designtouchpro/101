<script setup lang="ts">
import { ref, reactive, toRef, toRefs, computed, watch, isRef, isReactive } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'pitfalls' | 'torefs' | 'pinia' | 'interview'>('pitfalls')

const toRefUtils = [
  { name: 'toRef(obj, key)', desc: 'Создаёт ref, СВЯЗАННЫЙ с одним свойством reactive объекта. Двунаправленная связь.', example: 'toRef(state, "count") → Ref<number>' },
  { name: 'toRefs(obj)', desc: 'Преобразует ВСЕ свойства reactive в объект с ref-ами. Для безопасной деструктуризации.', example: 'toRefs(state) → { count: Ref, name: Ref }' },
  { name: 'toValue(refOrGetter)', desc: 'Vue 3.3+. Нормализует ref | getter | значение в значение. Для composables.', example: 'toValue(countRef) → 0' },
]

const interviewQuestions = [
  {
    q: 'Почему деструктуризация reactive теряет реактивность?',
    a: 'reactive основан на Proxy. Proxy перехватывает доступ к СВОЙСТВАМ объекта (get/set trap). При деструктуризации let { count } = state — значение count КОПИРУЕТСЯ в обычную переменную (примитив). Связь с Proxy теряется. Решение: toRefs() создаёт ref-обёртки, связанные с исходным reactive.'
  },
  {
    q: 'Разница между ref и reactive — когда что?',
    a: 'ref — для любых значений (примитивы + объекты), можно перезаписать целиком (.value = newObj). reactive — только объекты, нельзя перезаписать (только mutation). Команда Vue рекомендует ref для всего — проще, предсказуемее, нет ловушек с деструктуризацией.'
  },
  {
    q: 'Зачем storeToRefs если есть toRefs?',
    a: 'toRefs оборачивает ВСЕ свойства в ref — включая actions (функции). storeToRefs — специальная функция Pinia, которая оборачивает только state и getters, пропуская actions. Actions деструктурируются напрямую из store.'
  },
  {
    q: 'Почему watch(reactive.prop) не работает?',
    a: 'watch(reactive.prop) — это watch(0) при числовом prop. Vue отслеживает refs или getters. Решение: watch(() => reactive.prop) — getter function, или watch(toRef(reactive, "prop")) — ref-обёртка. watch(reactive) работает — deep по умолчанию.'
  },
  {
    q: 'Как правильно возвращать реактивные данные из composable?',
    a: 'Два паттерна: 1) Использовать ref-ы и возвращать их напрямую: return { x, y }. 2) Использовать reactive внутри и возвращать toRefs(state). Оба позволяют деструктуризацию у потребителя без потери реактивности: const { x, y } = useMouse().'
  },
  {
    q: 'Что такое shallowRef и shallowReactive?',
    a: 'shallowRef — реактивна только на замену .value (не отслеживает вложенные изменения). shallowReactive — реактивна только на верхнем уровне свойств. Используются для оптимизации производительности с большими объектами (напр., 10000 строк таблицы).'
  }
]

// Live Demo: reactivity loss
const state = reactive({ count: 0, name: 'Vue' })
const brokenCount = ref(state.count) // копия, не ссылка!
const workingCount = toRef(state, 'count') // ссылка на reactive

const destructuredCode = `// ❌ ПРОБЛЕМА: деструктуризация reactive
const state = reactive({ count: 0, name: 'Vue' })

// ❌ Потеря реактивности!
let { count, name } = state
count++ // НЕ обновит шаблон!
// count — просто число 0, оторвано от state

// ❌ Присвоение переменной
let myCount = state.count
myCount++ // НЕ обновит шаблон!

// ✅ Решение 1: toRefs
const { count, name } = toRefs(state)
count.value++ // ✅ Работает! (это ref, связанный с state)

// ✅ Решение 2: toRef для одного свойства
const countRef = toRef(state, 'count')
countRef.value++ // ✅ Работает!

// ✅ Решение 3: computed
const countComputed = computed(() => state.count)
// Но это readonly — нельзя .value++`

const replaceReactiveCode = `// ❌ ПРОБЛЕМА: замена reactive целиком
const state = reactive({ count: 0 })

// ❌ Переменная state теперь другой объект!
// Старая реактивность потеряна!
state = reactive({ count: 1 }) // ⛔ не работает с const

// ❌ Даже через let:
let state = reactive({ count: 0 })
state = reactive({ count: 1 }) // Шаблон не видит новый объект

// ✅ Решение: мутация свойств
Object.assign(state, { count: 1 })
// или
state.count = 1

// ✅ Или используйте ref вместо reactive:
const state = ref({ count: 0 })
state.value = { count: 1 } // ✅ Работает!`

const refVsReactiveCode = `// ref vs reactive — когда что?

// ref — примитивы + возможность перезаписать целиком
const count = ref(0)
count.value = 5 // ✅
const user = ref({ name: 'Vue' })
user.value = { name: 'React' } // ✅ Новый объект

// reactive — объекты, НО нельзя перезаписать целиком
const state = reactive({ count: 0 })
state.count = 5 // ✅
// state = { count: 5 } // ❌ Нельзя!

// ⚡ Рекомендация команды Vue:
// Используйте ref для ВСЕГО. Он проще и предсказуемее.
// reactive — только когда явно хотите avoid .value
// и понимаете ограничения.

// ref автоматически unwrap-ится в шаблоне:
// <template>{{ count }}</template>
// НЕ нужно {{ count.value }}`

const piniaCode = `// ❌ ПРОБЛЕМА: деструктуризация Pinia store
import { useUserStore } from '@/stores/user'

const store = useUserStore()

// ❌ Потеря реактивности!
const { name, email } = store
// name — просто строка, оторвана от store

// ✅ Решение: storeToRefs
import { storeToRefs } from 'pinia'

const { name, email } = storeToRefs(store)
// name.value — реактивный ref, связанный со store

// ⚠️ Actions НЕ нужно оборачивать в storeToRefs!
const { fetchUser, logout } = store // ✅ OK для methods

// ⚡ Полный паттерн:
const store = useUserStore()
const { name, email, isAuth } = storeToRefs(store) // данные
const { login, logout } = store // действия`

const watchPitfallsCode = `// ❌ watch не срабатывает на reactive напрямую
const obj = reactive({ count: 0 })

// ❌ Не работает!
watch(obj.count, (val) => {
  console.log(val) // Никогда не вызовется
})
// obj.count — это число 0, не реактивная ссылка!

// ✅ Решение 1: getter function
watch(() => obj.count, (val) => {
  console.log(val) // ✅ Работает
})

// ✅ Решение 2: toRef
const countRef = toRef(obj, 'count')
watch(countRef, (val) => {
  console.log(val) // ✅ Работает
})

// ✅ watch(reactive) — deep по умолчанию
watch(obj, (newVal) => {
  // Срабатывает при любом изменении ВНУТРИ obj
  // ⚠️ newVal === oldVal (тот же объект!)
})`

const composableCode = `// ❌ Composable теряет реактивность при return
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  
  onMounted(() => {
    window.addEventListener('mousemove', (e) => {
      state.x = e.clientX
      state.y = e.clientY
    })
  })
  
  // ❌ Деструктуризация у потребителя сломает:
  // const { x, y } = useMouse() // x = 0, неактивно
  return state
}

// ✅ Решение 1: возвращать toRefs
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  // ...
  return toRefs(state) // { x: Ref<number>, y: Ref<number> }
}
const { x, y } = useMouse() // ✅ работает

// ✅ Решение 2: возвращать ref-ы
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  // ...
  return { x, y }
}
const { x, y } = useMouse() // ✅ работает`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>⚡ Подводные камни реактивности</h1>
      <p>
        Потеря реактивности при деструктуризации, toRefs, storeToRefs, 
        ref vs reactive — все ловушки в одном месте.
      </p>
    </div>

    <div class="tabs" style="margin-bottom: 24px">
      <button 
        v-for="tab in [
          { key: 'pitfalls', label: '💀 Ловушки' },
          { key: 'torefs', label: '🔗 toRefs' },
          { key: 'pinia', label: '🍍 Pinia' },
          { key: 'interview', label: '🎯 Вопросы' },
        ]"
        :key="tab.key"
        :class="['tab', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key as any"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Ловушки -->
    <template v-if="activeTab === 'pitfalls'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">💀 #1: Деструктуризация reactive</h3>
          <span class="card-badge" style="background: rgba(239, 68, 68, 0.1); color: var(--accent-red)">Главная ловушка!</span>
        </div>

        <CodeBlock :code="destructuredCode" language="typescript" title="Потеря реактивности" />

        <!-- Live Demo -->
        <div style="margin-top: 16px; padding: 16px; background: var(--bg-code); border-radius: 8px">
          <h4 style="margin-bottom: 12px">Live Demo</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px">
            <div style="text-align: center">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px">reactive.count</div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-green)">{{ state.count }}</div>
              <button class="btn" style="margin-top: 8px" @click="state.count++">state.count++</button>
            </div>
            <div style="text-align: center">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px">❌ копия (broken)</div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-red)">{{ brokenCount }}</div>
              <button class="btn btn-secondary" style="margin-top: 8px" @click="brokenCount++">brokenCopy++</button>
            </div>
            <div style="text-align: center">
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px">✅ toRef (working)</div>
              <div style="font-size: 1.5rem; font-weight: 700; color: var(--accent-cyan)">{{ workingCount }}</div>
              <button class="btn btn-secondary" style="margin-top: 8px" @click="workingCount++">toRef++</button>
            </div>
          </div>
          <p style="margin-top: 12px; font-size: 0.8rem; color: var(--text-muted); text-align: center">
            Обратите внимание: toRef синхронизирован с reactive, копия — нет
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">💀 #2: Замена reactive целиком</h3>
        </div>
        <CodeBlock :code="replaceReactiveCode" language="typescript" title="Нельзя переприсвоить reactive" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">💀 #3: watch на свойство reactive</h3>
        </div>
        <CodeBlock :code="watchPitfallsCode" language="typescript" title="watch + reactive" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📊 ref vs reactive</h3>
        </div>
        <CodeBlock :code="refVsReactiveCode" language="typescript" title="Когда что использовать" />

        <div class="info-box" style="margin-top: 16px">
          <span class="info-box-icon">💡</span>
          <div class="info-box-content">
            <div class="info-box-title">Рекомендация Vue team</div>
            <p>
              Используйте <strong>ref для всего</strong>. Он проще: нет проблем с деструктуризацией,
              можно перезаписать целиком. Цена — <code>.value</code>, но в шаблоне он unwrap-ится автоматически.
            </p>
          </div>
        </div>
      </div>
    </template>

    <!-- toRefs -->
    <template v-if="activeTab === 'torefs'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔗 toRef / toRefs — спасение от деструктуризации</h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px">
          <div v-for="(item, i) in toRefUtils" :key="i" :style="{ padding: '14px 16px', background: 'var(--bg-code)', borderRadius: '8px', borderLeft: '3px solid var(--accent-vue)' }">
            <code style="color: var(--accent-vue); font-weight: 600; font-size: 0.9rem">{{ item.name }}</code>
            <p style="margin-top: 4px; font-size: 0.85rem; color: var(--text-secondary)">{{ item.desc }}</p>
            <code style="font-size: 0.8rem; color: var(--text-muted)">{{ item.example }}</code>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🧩 toRefs в composables</h3>
          <span class="card-badge">Best Practice</span>
        </div>
        <CodeBlock :code="composableCode" language="typescript" title="Composables + toRefs" />
      </div>
    </template>

    <!-- Pinia -->
    <template v-if="activeTab === 'pinia'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🍍 storeToRefs — деструктуризация Pinia</h3>
        </div>

        <div class="info-box warning">
          <span class="info-box-icon">⚠️</span>
          <div class="info-box-content">
            <div class="info-box-title">toRefs НЕ подходит для Pinia!</div>
            <p>
              toRefs создаст ref-ы для ВСЕХ свойств, включая actions и getters.
              storeToRefs — специальная функция Pinia, которая оборачивает 
              только state и getters, пропуская actions.
            </p>
          </div>
        </div>

        <CodeBlock :code="piniaCode" language="typescript" title="storeToRefs vs toRefs" />

        <div style="margin-top: 20px; overflow-x: auto">
          <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem">
            <thead>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid var(--accent-vue)">Метод</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">State</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">Getters</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">Actions</th>
                <th style="text-align: center; padding: 10px; border-bottom: 2px solid var(--accent-vue)">Для Pinia</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in [
                { method: 'Деструктуризация', state: '❌', getters: '❌', actions: '✅', pinia: '❌' },
                { method: 'toRefs(store)', state: '✅', getters: '⚠️', actions: '⚠️ обернёт', pinia: '❌' },
                { method: 'storeToRefs(store)', state: '✅', getters: '✅', actions: '✅ пропустит', pinia: '✅' },
              ]" :key="i" :style="{ background: i % 2 ? 'var(--bg-code)' : 'transparent' }">
                <td style="padding: 8px 10px; font-weight: 500">{{ row.method }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.state }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.getters }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.actions }}</td>
                <td style="text-align: center; padding: 8px 10px">{{ row.pinia }}</td>
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
