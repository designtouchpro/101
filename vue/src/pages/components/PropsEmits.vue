<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const propsCode = `<!-- ═══════════════════════════════════════════════════════════════
     📤 Props — передача данных от родителя к ребёнку
     ═══════════════════════════════════════════════════════════════ -->

<!-- ChildComponent.vue -->
<script setup lang="ts">
// ─────────────────────────────────────────────────────────────
// Способ 1: defineProps с типами TypeScript
// ─────────────────────────────────────────────────────────────
const props = defineProps<{
  title: string
  count?: number           // Опциональный
  items: string[]
  user: { name: string; age: number }
}>()

// Доступ к props
console.log(props.title)
console.log(props.count)


// ─────────────────────────────────────────────────────────────
// Способ 2: с default значениями (withDefaults)
// ─────────────────────────────────────────────────────────────
const props = withDefaults(defineProps<{
  title: string
  count?: number
  items?: string[]
}>(), {
  count: 0,
  items: () => []   // Для объектов/массивов используйте функцию!
})
<\/script>

<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
  </div>
</template>


<!-- ParentComponent.vue -->
<template>
  <!-- Передача props -->
  <ChildComponent 
    title="Заголовок"
    :count="42"
    :items="['a', 'b', 'c']"
    :user="{ name: 'Вася', age: 25 }"
  />
</template>`

const emitsCode = `<!-- ═══════════════════════════════════════════════════════════════
     📨 Emits — события от ребёнка к родителю
     ═══════════════════════════════════════════════════════════════ -->

<!-- ChildComponent.vue -->
<script setup lang="ts">
// ─────────────────────────────────────────────────────────────
// defineEmits с типизацией
// ─────────────────────────────────────────────────────────────
const emit = defineEmits<{
  (e: 'update', value: number): void
  (e: 'submit', data: { name: string }): void
  (e: 'close'): void                    // Без payload
}>()

// Альтернативный синтаксис (Vue 3.3+)
const emit = defineEmits<{
  update: [value: number]
  submit: [data: { name: string }]
  close: []
}>()

// Вызов события
const handleClick = () => {
  emit('update', 42)
  emit('submit', { name: 'Вася' })
  emit('close')
}
<\/script>

<template>
  <button @click="emit('update', count + 1)">
    Увеличить
  </button>
</template>


<!-- ParentComponent.vue -->
<template>
  <ChildComponent 
    @update="handleUpdate"
    @submit="handleSubmit"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
const handleUpdate = (value: number) => {
  console.log('New value:', value)
}

const handleSubmit = (data: { name: string }) => {
  console.log('Submitted:', data)
}

const handleClose = () => {
  console.log('Closed')
}
<\/script>`

const modelCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔄 v-model на компонентах — двусторонняя привязка
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     Базовый v-model (modelValue + update:modelValue)
     ───────────────────────────────────────────────────────────── -->

<!-- CustomInput.vue -->
<script setup lang="ts">
const model = defineModel<string>()  // Vue 3.4+ 🎉
<\/script>

<template>
  <input 
    :value="model"
    @input="model = $event.target.value"
  />
</template>


<!-- Parent.vue -->
<template>
  <CustomInput v-model="text" />
  <!-- Эквивалентно: -->
  <CustomInput 
    :modelValue="text" 
    @update:modelValue="text = $event" 
  />
</template>


<!-- ─────────────────────────────────────────────────────────────
     Несколько v-model с именами
     ───────────────────────────────────────────────────────────── -->

<!-- UserForm.vue -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
<\/script>

<template>
  <input v-model="firstName" placeholder="Имя" />
  <input v-model="lastName" placeholder="Фамилия" />
</template>


<!-- Parent.vue -->
<template>
  <UserForm 
    v-model:firstName="first"
    v-model:lastName="last"
  />
</template>`

const propsRulesCode = `// ═══════════════════════════════════════════════════════════════
// 📋 Правила работы с Props
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// ❌ НЕЛЬЗЯ мутировать props напрямую!
// ─────────────────────────────────────────────────────────────
const props = defineProps<{ count: number }>()

props.count++  // ❌ Ошибка! Props read-only


// ─────────────────────────────────────────────────────────────
// ✅ Используйте emit для изменений
// ─────────────────────────────────────────────────────────────
const emit = defineEmits<{ (e: 'update:count', value: number): void }>()

const increment = () => {
  emit('update:count', props.count + 1)
}


// ─────────────────────────────────────────────────────────────
// ✅ Или создайте локальную копию
// ─────────────────────────────────────────────────────────────
const localCount = ref(props.count)

// Если нужна синхронизация:
watch(() => props.count, (newVal) => {
  localCount.value = newVal
})


// ─────────────────────────────────────────────────────────────
// ✅ Или используйте computed для трансформации
// ─────────────────────────────────────────────────────────────
const normalizedCount = computed(() => {
  return Math.max(0, props.count)  // Не меньше 0
})`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>📤 Props & Emits</h1>
      <p>Коммуникация между родительским и дочерним компонентами</p>
      <a 
        href="https://vuejs.org/guide/components/props.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Props -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Props — данные сверху вниз</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">⬇️</span>
        <div class="info-box-content">
          <div class="info-box-title">Однонаправленный поток</div>
          <p>
            Props передают данные от родителя к ребёнку. 
            Это <strong>read-only</strong> — нельзя изменять напрямую!
          </p>
        </div>
      </div>

      <CodeBlock :code="propsCode" language="html" title="📤 defineProps" />
    </div>

    <!-- Emits -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Emits — события снизу вверх</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">⬆️</span>
        <div class="info-box-content">
          <div class="info-box-title">Обратная связь</div>
          <p>
            Emits позволяют дочернему компоненту уведомлять родителя о событиях.
            Родитель решает, как реагировать.
          </p>
        </div>
      </div>

      <CodeBlock :code="emitsCode" language="html" title="📨 defineEmits" />
    </div>

    <!-- v-model на компонентах -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">v-model на компонентах</h3>
        <span class="card-badge">Vue 3.4+</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">defineModel — новый способ!</div>
          <p>
            В Vue 3.4+ появился <code>defineModel()</code> — самый простой способ 
            создать двустороннюю привязку для компонента.
          </p>
        </div>
      </div>

      <CodeBlock :code="modelCode" language="html" title="🔄 defineModel" />
    </div>

    <!-- Правила Props -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚠️ Правила работы с Props</h3>
        <span class="card-badge">Важно!</span>
      </div>

      <div class="info-box error">
        <span class="info-box-icon">🚨</span>
        <div class="info-box-content">
          <div class="info-box-title">Не мутируйте props!</div>
          <p>
            Props — это read-only. Мутация приведёт к ошибке и нарушит 
            однонаправленный поток данных.
          </p>
        </div>
      </div>

      <CodeBlock :code="propsRulesCode" language="typescript" title="📋 Best Practices" />
    </div>

    <!-- Визуальная схема -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Поток данных</h3>
        <span class="card-badge">Визуализация</span>
      </div>

      <div class="visual-diagram">
        <div style="display: flex; justify-content: center; align-items: center; gap: 48px">
          <div class="diagram-box component" style="text-align: center; padding: 24px">
            <strong>Parent</strong>
            <div style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary)">
              data, методы
            </div>
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="color: var(--accent-vue)">Props ⬇️</span>
            </div>
            <div style="display: flex; align-items: center; gap: 8px">
              <span style="color: var(--accent-orange)">Emits ⬆️</span>
            </div>
          </div>
          
          <div class="diagram-box state" style="text-align: center; padding: 24px">
            <strong>Child</strong>
            <div style="font-size: 0.8rem; margin-top: 8px; color: var(--text-secondary)">
              props (read-only)
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
