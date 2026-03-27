<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const componentPatternsCode = `// ═══════════════════════════════════════════════════════════════
// 🧱 Паттерны проектирования компонентов
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1️⃣ Compound Components — связанные компоненты
// ─────────────────────────────────────────────────────────────
// Несколько компонентов, работающих вместе через provide/inject

// Tabs/index.ts
export { default as Tabs } from './Tabs.vue'
export { default as TabList } from './TabList.vue'
export { default as Tab } from './Tab.vue'
export { default as TabPanels } from './TabPanels.vue'
export { default as TabPanel } from './TabPanel.vue'

// Использование:
<Tabs v-model="activeTab">
  <TabList>
    <Tab value="1">Tab 1</Tab>
    <Tab value="2">Tab 2</Tab>
  </TabList>
  <TabPanels>
    <TabPanel value="1">Content 1</TabPanel>
    <TabPanel value="2">Content 2</TabPanel>
  </TabPanels>
</Tabs>


// ─────────────────────────────────────────────────────────────
// 2️⃣ Renderless Component — логика без UI
// ─────────────────────────────────────────────────────────────
// Компонент предоставляет только логику через scoped slots

// Toggle.vue
<script setup>
import { ref } from 'vue'

const isOn = ref(false)
const toggle = () => isOn.value = !isOn.value
<\/script>

<template>
  <slot :isOn="isOn" :toggle="toggle" />
</template>

// Использование:
<Toggle v-slot="{ isOn, toggle }">
  <button @click="toggle">
    {{ isOn ? 'ON' : 'OFF' }}
  </button>
</Toggle>


// ─────────────────────────────────────────────────────────────
// 3️⃣ Higher-Order Component (HOC)
// ─────────────────────────────────────────────────────────────
// Функция, возвращающая компонент с дополнительной логикой

function withLoading(WrappedComponent) {
  return defineComponent({
    props: ['loading', ...WrappedComponent.props],
    setup(props, { slots, attrs }) {
      return () => props.loading
        ? h('div', 'Loading...')
        : h(WrappedComponent, { ...props, ...attrs }, slots)
    }
  })
}

const UserListWithLoading = withLoading(UserList)`

const smartDumbCode = `<!-- ═══════════════════════════════════════════════════════════════
     📦 Smart/Container vs Dumb/Presentational Components
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     Dumb/Presentational Component — только UI
     ───────────────────────────────────────────────────────────── -->
<!-- UserCard.vue -->
<script setup lang="ts">
// ✅ Только props, никакой логики
defineProps<{
  name: string
  avatar: string
  role: string
}>()

// ✅ Только emit события
const emit = defineEmits<{
  edit: []
  delete: []
}>()
<\/script>

<template>
  <div class="user-card">
    <img :src="avatar" />
    <h3>{{ name }}</h3>
    <span>{{ role }}</span>
    <button @click="emit('edit')">Edit</button>
    <button @click="emit('delete')">Delete</button>
  </div>
</template>


<!-- ─────────────────────────────────────────────────────────────
     Smart/Container Component — логика и данные
     ───────────────────────────────────────────────────────────── -->
<!-- UserListContainer.vue -->
<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import UserCard from './UserCard.vue'

// ✅ Работает с store
const userStore = useUserStore()

// ✅ Бизнес-логика
const handleEdit = (id: number) => {
  router.push(\`/users/\${id}/edit\`)
}

const handleDelete = async (id: number) => {
  if (confirm('Delete?')) {
    await userStore.deleteUser(id)
  }
}
<\/script>

<template>
  <div>
    <!-- ✅ Передаёт данные в presentational компонент -->
    <UserCard
      v-for="user in userStore.users"
      :key="user.id"
      :name="user.name"
      :avatar="user.avatar"
      :role="user.role"
      @edit="handleEdit(user.id)"
      @delete="handleDelete(user.id)"
    />
  </div>
</template>`

const controlledUncontrolledCode = `<!-- ═══════════════════════════════════════════════════════════════
     🎛️ Controlled vs Uncontrolled Components
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     Controlled — родитель управляет состоянием
     ───────────────────────────────────────────────────────────── -->
<script setup lang="ts">
// Родитель контролирует value через v-model
const model = defineModel<string>()
<\/script>

<template>
  <input :value="model" @input="model = $event.target.value" />
</template>

// Использование:
<ControlledInput v-model="text" />


<!-- ─────────────────────────────────────────────────────────────
     Uncontrolled — внутреннее состояние с ref для доступа
     ───────────────────────────────────────────────────────────── -->
<script setup lang="ts">
import { ref } from 'vue'

const internalValue = ref('')

// Expose для доступа извне
defineExpose({
  getValue: () => internalValue.value,
  setValue: (v: string) => internalValue.value = v,
  focus: () => inputRef.value?.focus()
})
<\/script>

<template>
  <input ref="inputRef" v-model="internalValue" />
</template>

// Использование:
<UncontrolledInput ref="inputRef" />
<button @click="console.log(inputRef.getValue())">
  Get Value
</button>


<!-- ─────────────────────────────────────────────────────────────
     Hybrid — поддержка обоих режимов
     ───────────────────────────────────────────────────────────── -->
<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const internalValue = ref('')

// Используем modelValue если передан, иначе internal
const value = computed({
  get: () => props.modelValue ?? internalValue.value,
  set: (v) => {
    if (props.modelValue !== undefined) {
      emit('update:modelValue', v)
    } else {
      internalValue.value = v
    }
  }
})
<\/script>`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🧱 Component Patterns</h1>
      <p>Паттерны проектирования компонентов во Vue</p>
      <a 
        href="https://vuejs.org/guide/components/registration.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Основные паттерны -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Основные паттерны</h3>
        <span class="card-badge">Паттерны</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Выбор паттерна</div>
          <p>
            Выбор паттерна зависит от задачи: переиспользование логики, гибкость UI, 
            разделение ответственности.
          </p>
        </div>
      </div>

      <CodeBlock :code="componentPatternsCode" language="typescript" title="🧱 Compound, Renderless, HOC" />
    </div>

    <!-- Smart/Dumb -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Smart vs Dumb Components</h3>
        <span class="card-badge">Архитектура</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">📦</span>
        <div class="info-box-content">
          <div class="info-box-title">Разделение ответственности</div>
          <p>
            <strong>Dumb</strong> — только отображение, получает данные через props.<br/>
            <strong>Smart</strong> — логика, работа со store, API вызовы.
          </p>
        </div>
      </div>

      <CodeBlock :code="smartDumbCode" language="html" title="📦 Container/Presentational" />
    </div>

    <!-- Controlled/Uncontrolled -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Controlled vs Uncontrolled</h3>
        <span class="card-badge">Паттерн</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🎛️</span>
        <div class="info-box-content">
          <div class="info-box-title">Управление состоянием</div>
          <p>
            <strong>Controlled</strong> — родитель управляет через v-model.<br/>
            <strong>Uncontrolled</strong> — компонент хранит состояние сам.
          </p>
        </div>
      </div>

      <CodeBlock :code="controlledUncontrolledCode" language="html" title="🎛️ Controlled/Uncontrolled" />
    </div>

    <!-- Рекомендации -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Когда использовать</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Паттерн</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Когда использовать</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Пример</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Compound</td>
              <td style="padding: 12px">Группа связанных компонентов</td>
              <td style="padding: 12px">Tabs, Accordion, Menu</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Renderless</td>
              <td style="padding: 12px">Логика без привязки к UI</td>
              <td style="padding: 12px">Toggle, Fetch, Form</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Smart/Dumb</td>
              <td style="padding: 12px">Разделение логики и UI</td>
              <td style="padding: 12px">Container + Card</td>
            </tr>
            <tr>
              <td style="padding: 12px">Controlled</td>
              <td style="padding: 12px">Родитель управляет данными</td>
              <td style="padding: 12px">Form inputs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
