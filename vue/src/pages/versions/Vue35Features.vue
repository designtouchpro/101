<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const useTemplateRefCode = `// ═══════════════════════════════════════════════════════════════
// 📌 useTemplateRef() — новый способ работы с template refs
// Vue 3.5+
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// Раньше: ref с тем же именем, что и в template
// ─────────────────────────────────────────────────────────────
<script setup>
import { ref, onMounted } from 'vue'

// ❌ Старый способ — имя переменной должно совпадать с ref="input"
const input = ref<HTMLInputElement | null>(null)

onMounted(() => {
  input.value?.focus()
})
<\/script>

<template>
  <input ref="input" />  <!-- Имя "input" должно совпадать -->
</template>


// ─────────────────────────────────────────────────────────────
// Vue 3.5+: useTemplateRef() — явная связь
// ─────────────────────────────────────────────────────────────
<script setup>
import { useTemplateRef, onMounted } from 'vue'

// ✅ Новый способ — явно указываем имя ref из template
const inputEl = useTemplateRef<HTMLInputElement>('input')
const buttonEl = useTemplateRef<HTMLButtonElement>('submit-btn')

onMounted(() => {
  inputEl.value?.focus()
})
<\/script>

<template>
  <input ref="input" />
  <button ref="submit-btn">Submit</button>
</template>


// Преимущества:
// ✅ Явная связь между ref в template и переменной
// ✅ Можно использовать любое имя переменной
// ✅ Лучшая типизация
// ✅ Работает с kebab-case ref`

const reactivityImprovementsCode = `// ═══════════════════════════════════════════════════════════════
// ⚡ Улучшения реактивности в Vue 3.5
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// Reactive Props Destructure (стабильно в 3.5!)
// ─────────────────────────────────────────────────────────────
<script setup>
// ✅ Теперь работает! Props остаются реактивными при деструктуризации
const { count, title = 'Default' } = defineProps<{
  count: number
  title?: string
}>()

// count и title реактивны!
watchEffect(() => {
  console.log(count)  // Работает!
})
<\/script>


// ─────────────────────────────────────────────────────────────
// Улучшенный watch() с onWatcherCleanup
// ─────────────────────────────────────────────────────────────
import { watch, onWatcherCleanup } from 'vue'

watch(searchQuery, async (query) => {
  const controller = new AbortController()
  
  // Новый способ cleanup!
  onWatcherCleanup(() => {
    controller.abort()
  })
  
  const data = await fetch(\`/api/search?q=\${query}\`, {
    signal: controller.signal
  })
})


// ─────────────────────────────────────────────────────────────
// useId() — генерация уникальных ID для SSR
// ─────────────────────────────────────────────────────────────
import { useId } from 'vue'

<script setup>
const id = useId()  // Уникальный ID, стабильный при SSR
<\/script>

<template>
  <label :for="id">Name</label>
  <input :id="id" />
</template>`

const defineModelCode = `// ═══════════════════════════════════════════════════════════════
// 🔄 defineModel() — упрощённая двусторонняя привязка
// Стабильно в Vue 3.4+, улучшено в 3.5
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// Раньше: громоздкий синтаксис
// ─────────────────────────────────────────────────────────────
<script setup>
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const updateValue = (value: string) => {
  emit('update:modelValue', value)
}
<\/script>

<template>
  <input :value="modelValue" @input="updateValue($event.target.value)" />
</template>


// ─────────────────────────────────────────────────────────────
// Теперь: defineModel() — всё в одной строке!
// ─────────────────────────────────────────────────────────────
<script setup>
// Автоматически создаёт prop + emit
const model = defineModel<string>()

// С дефолтным значением
const model = defineModel<string>({ default: '' })

// Именованные модели
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')

// С модификаторами (3.5+)
const [model, modifiers] = defineModel<string>()
// modifiers.trim, modifiers.number, modifiers.lazy
<\/script>

<template>
  <!-- v-model напрямую! -->
  <input v-model="model" />
</template>


// Использование:
<CustomInput v-model="text" />
<CustomInput v-model:firstName="first" v-model:lastName="last" />`

const otherFeaturesCode = `// ═══════════════════════════════════════════════════════════════
// 🎁 Другие улучшения Vue 3.4-3.5
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// defineOptions() — мета компонента
// ─────────────────────────────────────────────────────────────
<script setup>
defineOptions({
  name: 'MyComponent',      // Имя для DevTools
  inheritAttrs: false,       // Не наследовать атрибуты
  customOptions: { ... }     // Кастомные опции
})
<\/script>


// ─────────────────────────────────────────────────────────────
// defineSlots() — типизация слотов
// ─────────────────────────────────────────────────────────────
<script setup lang="ts">
const slots = defineSlots<{
  default(props: { item: Item }): any
  header(props: { title: string }): any
  footer(): any
}>()
<\/script>


// ─────────────────────────────────────────────────────────────
// Улучшенный Generic компонент
// ─────────────────────────────────────────────────────────────
<script setup lang="ts" generic="T extends { id: number }">
defineProps<{
  items: T[]
  selected: T | null
}>()

defineEmits<{
  select: [item: T]
}>()
<\/script>


// ─────────────────────────────────────────────────────────────
// Hydration mismatch warnings улучшены
// ─────────────────────────────────────────────────────────────
// Vue 3.5 показывает точное место несоответствия при SSR

// ─────────────────────────────────────────────────────────────
// Улучшенная производительность
// ─────────────────────────────────────────────────────────────
// - Память: -56% для реактивной системы
// - Скорость: оптимизация computed и watch
// - SSR: быстрее гидратация`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🚀 Vue 3.5+ Features</h1>
      <p>Новые возможности последних версий Vue</p>
      <a 
        href="https://blog.vuejs.org/posts/vue-3-5" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Vue 3.5 Announcement
      </a>
    </div>

    <!-- useTemplateRef -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">useTemplateRef()</h3>
        <span class="card-badge">Vue 3.5</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">Явные template refs</div>
          <p>
            Новый способ связи переменной с ref в template. Больше не нужно 
            совпадение имён — связь явная и типобезопасная.
          </p>
        </div>
      </div>

      <CodeBlock :code="useTemplateRefCode" language="typescript" title="📌 useTemplateRef()" />
    </div>

    <!-- Reactivity improvements -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Улучшения реактивности</h3>
        <span class="card-badge">Vue 3.5</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">⚡</span>
        <div class="info-box-content">
          <div class="info-box-title">Reactive Props Destructure</div>
          <p>
            Деструктуризация props теперь сохраняет реактивность! 
            Плюс новый <code>onWatcherCleanup</code> и <code>useId</code>.
          </p>
        </div>
      </div>

      <CodeBlock :code="reactivityImprovementsCode" language="typescript" title="⚡ Reactivity" />
    </div>

    <!-- defineModel -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">defineModel()</h3>
        <span class="card-badge">Vue 3.4+</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">🔄</span>
        <div class="info-box-content">
          <div class="info-box-title">v-model в одну строку</div>
          <p>
            defineModel() заменяет громоздкую комбинацию defineProps + defineEmits 
            для создания компонентов с v-model.
          </p>
        </div>
      </div>

      <CodeBlock :code="defineModelCode" language="typescript" title="🔄 defineModel()" />
    </div>

    <!-- Other features -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Другие улучшения</h3>
        <span class="card-badge">3.4-3.5</span>
      </div>

      <CodeBlock :code="otherFeaturesCode" language="typescript" title="🎁 defineOptions, defineSlots, generics" />
    </div>

    <!-- Timeline -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📅 Timeline релизов</h3>
        <span class="card-badge">История</span>
      </div>

      <div class="timeline">
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-vue)">Vue 3.5 "Tengen Toppa Gurren Lagann"</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Сентябрь 2024 — useTemplateRef, reactive props destructure, 
              улучшенная производительность реактивности.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-orange)">Vue 3.4 "Slam Dunk"</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Декабрь 2023 — defineModel стабилен, улучшенный парсер шаблонов, 
              defineOptions/defineSlots.
            </p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-content">
            <h4 style="color: var(--accent-purple)">Vue 3.3 "Rurouni Kenshin"</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem">
              Май 2023 — generic компоненты, defineOptions (experimental), 
              улучшенный TypeScript.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
