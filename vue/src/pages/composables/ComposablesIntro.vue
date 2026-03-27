<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const whatIsComposableCode = `// ═══════════════════════════════════════════════════════════════
// 🧩 Composables — переиспользуемая логика в Vue 3
// ═══════════════════════════════════════════════════════════════

// Composable — это функция, которая использует Composition API
// для инкапсуляции и переиспользования stateful логики


// ─────────────────────────────────────────────────────────────
// composables/useCounter.ts
// ─────────────────────────────────────────────────────────────
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  // Реактивное состояние
  const count = ref(initialValue)
  
  // Computed
  const doubled = computed(() => count.value * 2)
  
  // Методы
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue
  
  // Возвращаем всё что нужно
  return {
    count,
    doubled,
    increment,
    decrement,
    reset
  }
}


// ─────────────────────────────────────────────────────────────
// Использование в компоненте
// ─────────────────────────────────────────────────────────────
<script setup>
import { useCounter } from '@/composables/useCounter'

// Каждый вызов создаёт независимое состояние!
const { count, doubled, increment } = useCounter(10)
const secondCounter = useCounter(100)  // Отдельный инстанс
<\/script>

<template>
  <button @click="increment">{{ count }} (x2 = {{ doubled }})</button>
</template>`

const useFetchCode = `// ═══════════════════════════════════════════════════════════════
// 📡 useFetch — загрузка данных
// ═══════════════════════════════════════════════════════════════

import { ref, watchEffect, toValue, type MaybeRefOrGetter } from 'vue'

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)
  
  const fetchData = async () => {
    // toValue разворачивает ref или вызывает getter
    const urlValue = toValue(url)
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await fetch(urlValue)
      if (!response.ok) throw new Error('Failed to fetch')
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  }
  
  // Автоматически перезагружаем при изменении URL
  watchEffect(() => {
    fetchData()
  })
  
  return {
    data,
    error,
    isLoading,
    refetch: fetchData
  }
}


// ─────────────────────────────────────────────────────────────
// Использование
// ─────────────────────────────────────────────────────────────
<script setup>
import { useFetch } from '@/composables/useFetch'

const userId = ref(1)

// URL может быть ref — автоматический refetch при изменении!
const { data: user, isLoading, error } = useFetch<User>(
  () => \`/api/users/\${userId.value}\`
)
<\/script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>{{ user?.name }}</div>
</template>`

const useLocalStorageCode = `// ═══════════════════════════════════════════════════════════════
// 💾 useLocalStorage — синхронизация с localStorage
// ═══════════════════════════════════════════════════════════════

import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // Читаем начальное значение
  const stored = localStorage.getItem(key)
  const value = ref<T>(
    stored ? JSON.parse(stored) : defaultValue
  )
  
  // Синхронизируем изменения с localStorage
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  // Слушаем изменения из других вкладок
  const handleStorage = (e: StorageEvent) => {
    if (e.key === key && e.newValue) {
      value.value = JSON.parse(e.newValue)
    }
  }
  
  window.addEventListener('storage', handleStorage)
  
  // Cleanup (для правильной очистки используйте в компоненте)
  // onUnmounted(() => window.removeEventListener('storage', handleStorage))
  
  return value
}


// ─────────────────────────────────────────────────────────────
// Использование
// ─────────────────────────────────────────────────────────────
<script setup>
import { useLocalStorage } from '@/composables/useLocalStorage'

// Автоматически сохраняется в localStorage!
const theme = useLocalStorage('theme', 'dark')
const settings = useLocalStorage('settings', { 
  notifications: true,
  language: 'ru'
})
<\/script>

<template>
  <select v-model="theme">
    <option value="dark">Dark</option>
    <option value="light">Light</option>
  </select>
</template>`

const composablePatternCode = `// ═══════════════════════════════════════════════════════════════
// 📋 Паттерны и Best Practices
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// 1️⃣ Naming Convention: use*
// ─────────────────────────────────────────────────────────────
useCounter()
useFetch()
useAuth()
useLocalStorage()


// ─────────────────────────────────────────────────────────────
// 2️⃣ Принимайте ref или getter для реактивных параметров
// ─────────────────────────────────────────────────────────────
import { toValue, type MaybeRefOrGetter } from 'vue'

function useFeature(input: MaybeRefOrGetter<string>) {
  // toValue() разворачивает ref, вызывает getter, или возвращает как есть
  const value = toValue(input)
}

// Теперь можно вызывать:
useFeature('static')           // ✅ Просто строка
useFeature(someRef)            // ✅ Ref
useFeature(() => props.value)  // ✅ Getter


// ─────────────────────────────────────────────────────────────
// 3️⃣ Возвращайте ref вместо reactive для гибкости
// ─────────────────────────────────────────────────────────────
// ❌ Плохо — нельзя деструктуризировать
function useBad() {
  return reactive({ count: 0, name: 'vue' })
}
const { count } = useBad()  // Потеря реактивности!

// ✅ Хорошо — безопасная деструктуризация
function useGood() {
  const count = ref(0)
  const name = ref('vue')
  return { count, name }
}
const { count, name } = useGood()  // Работает!


// ─────────────────────────────────────────────────────────────
// 4️⃣ Cleanup в onUnmounted
// ─────────────────────────────────────────────────────────────
import { onUnmounted } from 'vue'

function useEventListener(target, event, handler) {
  target.addEventListener(event, handler)
  
  // Автоматическая очистка при размонтировании компонента
  onUnmounted(() => {
    target.removeEventListener(event, handler)
  })
}`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🧩 Composables</h1>
      <p>Переиспользуемая логика с Composition API</p>
      <a 
        href="https://vuejs.org/guide/reusability/composables.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Что такое Composable -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Что такое Composable?</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Ключевое понимание</div>
          <p>
            <strong>Composable</strong> — это функция, которая использует Composition API 
            для инкапсуляции и переиспользования stateful логики между компонентами.
          </p>
        </div>
      </div>

      <CodeBlock :code="whatIsComposableCode" language="typescript" title="🧩 useCounter" />
    </div>

    <!-- useFetch -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">useFetch — загрузка данных</h3>
        <span class="card-badge">Практика</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">📡</span>
        <div class="info-box-content">
          <div class="info-box-title">Типичный use-case</div>
          <p>
            useFetch инкапсулирует логику загрузки: loading state, error handling, 
            auto-refetch при изменении URL.
          </p>
        </div>
      </div>

      <CodeBlock :code="useFetchCode" language="typescript" title="📡 useFetch" />
    </div>

    <!-- useLocalStorage -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">useLocalStorage</h3>
        <span class="card-badge">Практика</span>
      </div>

      <CodeBlock :code="useLocalStorageCode" language="typescript" title="💾 useLocalStorage" />
    </div>

    <!-- Паттерны -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Паттерны и Best Practices</h3>
        <span class="card-badge">Guidelines</span>
      </div>

      <CodeBlock :code="composablePatternCode" language="typescript" title="📋 Best Practices" />
    </div>

    <!-- Сравнение с React -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Vue Composables vs React Hooks</h3>
        <span class="card-badge">Сравнение</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Аспект</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Vue Composables</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">React Hooks</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Вызов</td>
              <td style="padding: 12px">Один раз в setup</td>
              <td style="padding: 12px">При каждом рендере</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Порядок</td>
              <td style="padding: 12px">Не важен</td>
              <td style="padding: 12px">Строго фиксирован</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Условия</td>
              <td style="padding: 12px">✅ Можно</td>
              <td style="padding: 12px">❌ Нельзя</td>
            </tr>
            <tr>
              <td style="padding: 12px">Deps массив</td>
              <td style="padding: 12px">Автоматически</td>
              <td style="padding: 12px">Вручную</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Популярные библиотеки -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📚 Готовые Composables</h3>
        <span class="card-badge">Библиотеки</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">🎁</span>
        <div class="info-box-content">
          <div class="info-box-title">VueUse — коллекция composables</div>
          <p>
            <a href="https://vueuse.org" target="_blank" style="color: var(--accent-vue)">VueUse</a> 
            содержит 200+ готовых composables: useMouse, useLocalStorage, useFetch, 
            useIntersectionObserver и многое другое.
          </p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-top: 16px">
        <div class="diagram-box state">
          <strong>State</strong><br/>
          <small>useLocalStorage, useSessionStorage, useStorage</small>
        </div>
        <div class="diagram-box effect">
          <strong>Browser</strong><br/>
          <small>useMouse, useClipboard, useFullscreen</small>
        </div>
        <div class="diagram-box component">
          <strong>Sensors</strong><br/>
          <small>useIntersectionObserver, useResizeObserver</small>
        </div>
        <div class="diagram-box render">
          <strong>Animation</strong><br/>
          <small>useTransition, useInterval, useTimeout</small>
        </div>
      </div>
    </div>
  </div>
</template>
