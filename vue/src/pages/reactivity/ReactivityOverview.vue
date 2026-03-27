<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'
import ReactivityVisualizer from '@/components/ReactivityVisualizer.vue'

const reactivityOverviewCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 Система реактивности Vue 3
// Как Vue отслеживает изменения и обновляет DOM
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1️⃣ ref() — реактивность через getter/setter
// ─────────────────────────────────────────────────────────────
const count = ref(0)

// Под капотом создаётся объект:
// {
//   get value() { track(); return _value },
//   set value(v) { _value = v; trigger() }
// }

count.value++  // setter вызывает trigger() → обновление


// ─────────────────────────────────────────────────────────────
// 2️⃣ reactive() — реактивность через Proxy
// ─────────────────────────────────────────────────────────────
const state = reactive({ count: 0 })

// Создаётся Proxy:
// new Proxy(target, {
//   get(target, key) { track(key); return target[key] },
//   set(target, key, value) { target[key] = value; trigger(key) }
// })

state.count++  // Proxy перехватывает set → trigger()


// ─────────────────────────────────────────────────────────────
// 3️⃣ Track & Trigger — ядро реактивности
// ─────────────────────────────────────────────────────────────
// track() — запоминает, какой эффект читает это свойство
// trigger() — запускает все эффекты, которые зависят от свойства

// При рендере компонента Vue создаёт "эффект рендеринга"
// Все ref/reactive, прочитанные во время рендера, 
// становятся зависимостями этого эффекта`

const whenToUseCode = `// ═══════════════════════════════════════════════════════════════
// 🎯 Когда использовать что?
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 📦 ref() — рекомендуется по умолчанию
// ─────────────────────────────────────────────────────────────
// ✅ Примитивы: числа, строки, boolean
const count = ref(0)
const name = ref('Vue')
const isActive = ref(false)

// ✅ Когда нужно переназначить целиком
const user = ref({ name: 'Vue' })
user.value = { name: 'React' }  // Работает!

// ✅ Когда передаёте в функции/composables
function useCounter(initialValue: Ref<number>) { ... }


// ─────────────────────────────────────────────────────────────
// ⚡ reactive() — для сложных вложенных структур
// ─────────────────────────────────────────────────────────────
// ✅ Когда много вложенных данных и не нужен .value
const state = reactive({
  user: { profile: { settings: { ... } } },
  items: [...],
  filters: { ... }
})

// ✅ Когда имитируете Vuex/Pinia store
const store = reactive({
  state: { ... },
  getters: { ... }
})


// ─────────────────────────────────────────────────────────────
// 🧮 computed() — для производных данных
// ─────────────────────────────────────────────────────────────
// ✅ Когда значение вычисляется из других
const fullName = computed(() => \`\${firstName.value} \${lastName.value}\`)
const filteredList = computed(() => items.value.filter(x => x.active))
const total = computed(() => cart.value.reduce((s, i) => s + i.price, 0))


// ─────────────────────────────────────────────────────────────
// 👁️ watch() — для side effects
// ─────────────────────────────────────────────────────────────
// ✅ Когда нужно выполнить действие при изменении
watch(route, () => fetchData())           // Загрузка при смене роута
watch(searchQuery, () => search(), { debounce: 300 })  // Поиск
watch(user, () => saveToLocalStorage())   // Сохранение`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🔄 Обзор реактивности Vue</h1>
      <p>Как работает система реактивности и когда что использовать</p>
      <a 
        href="https://vuejs.org/guide/extras/reactivity-in-depth.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Reactivity in Depth
      </a>
    </div>

    <!-- Как работает реактивность -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Как работает реактивность Vue?</h3>
        <span class="card-badge">Теория</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🔬</span>
        <div class="info-box-content">
          <div class="info-box-title">Под капотом</div>
          <p>
            Vue использует JavaScript Proxy (для reactive) и getter/setter (для ref) 
            для перехвата операций чтения/записи и автоматического отслеживания зависимостей.
          </p>
        </div>
      </div>

      <CodeBlock :code="reactivityOverviewCode" language="typescript" title="🔬 Механизм реактивности" />
    </div>

    <!-- Визуальная схема -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Цикл реактивности</h3>
        <span class="card-badge">Визуализация</span>
      </div>

      <div class="visual-diagram">
        <div style="display: flex; justify-content: center; align-items: center; gap: 24px; flex-wrap: wrap">
          <div class="diagram-box state">
            📦 Реактивные данные<br/>
            <small>ref / reactive</small>
          </div>
          <div class="diagram-arrow">→</div>
          <div class="diagram-box render">
            🎨 Рендер<br/>
            <small>track() зависимостей</small>
          </div>
          <div class="diagram-arrow">→</div>
          <div class="diagram-box component">
            📄 DOM<br/>
            <small>Актуальный UI</small>
          </div>
        </div>
        <div style="display: flex; justify-content: center; margin-top: 24px">
          <div style="display: flex; align-items: center; gap: 24px">
            <div class="diagram-arrow">↑</div>
            <div class="diagram-box effect">
              ⚡ Изменение данных<br/>
              <small>trigger() обновления</small>
            </div>
            <div class="diagram-arrow">←</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Сравнительная таблица -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Сравнение API реактивности</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">API</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Типы данных</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">.value</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Переназначение</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Глубокая реакт.</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code style="color: var(--accent-vue)">ref()</code></td>
              <td style="padding: 12px">Любые</td>
              <td style="padding: 12px">✅ Нужен в script</td>
              <td style="padding: 12px">✅ Да</td>
              <td style="padding: 12px">✅ Для объектов</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code style="color: var(--accent-purple)">reactive()</code></td>
              <td style="padding: 12px">Только объекты</td>
              <td style="padding: 12px">❌ Не нужен</td>
              <td style="padding: 12px">❌ Нет</td>
              <td style="padding: 12px">✅ Всегда</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code style="color: var(--accent-orange)">computed()</code></td>
              <td style="padding: 12px">Любые (результат)</td>
              <td style="padding: 12px">✅ Нужен в script</td>
              <td style="padding: 12px">❌ Только read</td>
              <td style="padding: 12px">—</td>
            </tr>
            <tr>
              <td style="padding: 12px"><code style="color: var(--accent-blue)">shallowRef()</code></td>
              <td style="padding: 12px">Любые</td>
              <td style="padding: 12px">✅ Нужен</td>
              <td style="padding: 12px">✅ Да</td>
              <td style="padding: 12px">❌ Только .value</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Когда что использовать -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🎯 Когда что использовать</h3>
        <span class="card-badge">Best Practices</span>
      </div>

      <CodeBlock :code="whenToUseCode" language="typescript" title="🎯 Рекомендации" />
    </div>

    <!-- Частые ошибки -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚠️ Частые ошибки</h3>
        <span class="card-badge">Важно!</span>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header before">
            <span>❌ Неправильно</span>
          </div>
          <div class="comparison-body">
            <CodeBlock 
              :code="`// Забыли .value для ref
const count = ref(0)
count++  // ❌ NaN

// Деструктуризация reactive
const { name } = reactive({ name: 'Vue' })
// name теперь НЕ реактивен!

// Переназначение reactive
let state = reactive({ x: 1 })
state = { x: 2 }  // ❌ Потеря реактивности`"
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
              :code="`// Используйте .value
const count = ref(0)
count.value++  // ✅

// Используйте toRefs
const { name } = toRefs(reactive({ name: 'Vue' }))
// name теперь ref!

// Изменяйте свойства
const state = reactive({ x: 1 })
state.x = 2  // ✅`"
              language="typescript"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Interactive Visualizer -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚡ Интерактивная визуализация</h3>
        <span class="card-badge">Попробуй!</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">🎮</span>
        <div class="info-box-content">
          <div class="info-box-title">Реактивность в действии</div>
          <p>
            Измените значения и наблюдайте за историей изменений. 
            Так работает система отслеживания Vue!
          </p>
        </div>
      </div>

      <ReactivityVisualizer />
    </div>
  </div>
</template>
