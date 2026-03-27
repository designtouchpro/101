<script setup lang="ts">
import { ref, reactive, type Directive, type DirectiveBinding } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'basics' | 'hooks' | 'examples' | 'interview'>('basics')

const interviewQuestions = [
  {
    q: 'Когда использовать директивы вместо composables?',
    a: 'Директивы — для прямой манипуляции DOM (focus, intersection, click-outside, drag). Composables — для логики и state. Если задача решается без прямого доступа к DOM — composable предпочтительнее.'
  },
  {
    q: 'Какие lifecycle хуки есть у директив?',
    a: 'created, mounted, beforeUpdate, updated, beforeUnmount, unmounted — аналогично хукам компонентов. Самые важные: mounted (инициализация) и unmounted (очистка). Сокращённая форма (функция вместо объекта) вызывается на mounted + updated.'
  },
  {
    q: 'Что содержит binding объект?',
    a: 'value (текущее значение), oldValue (предыдущее), arg (аргумент после двоеточия), modifiers (объект модификаторов), instance (экземпляр компонента). Пример: v-my:top.animated=val → arg=top, modifiers={animated:true}, value=val.'
  },
  {
    q: 'Почему важно очищать ресурсы в unmounted?',
    a: 'Если директива добавляет event listener (addEventListener) или создаёт observer (IntersectionObserver, MutationObserver) в mounted — они будут жить после удаления элемента. Это утечка памяти. ВСЕГДА очищайте в unmounted.'
  },
  {
    q: 'Как передать директиву на компонент?',
    a: 'Директива применяется к корневому элементу компонента. Если компонент имеет multi-root (фрагмент) — директива не сработает и выдаст предупреждение. Это ограничение — директивы лучше работают с нативными элементами.'
  },
]

// Live demo: v-highlight directive
const highlightColor = ref('#ffd700')
const highlightText = ref('Этот текст подсвечен кастомной директивой!')

// Live demo: v-click-outside
const dropdownOpen = ref(false)

const directiveHooksCode = `// Все хуки директивы (аналог lifecycle компонента)
const vMyDirective: Directive = {
  // Вызывается ДО монтирования элемента
  created(el, binding, vnode, prevVnode) {},
  
  // Вызывается при вставке элемента в DOM
  mounted(el, binding, vnode, prevVnode) {
    // Самый используемый хук!
    // el — DOM-элемент
    // binding.value — значение (v-my="value")
    // binding.arg — аргумент (v-my:arg)
    // binding.modifiers — модификаторы (v-my.mod)
  },
  
  // Перед обновлением компонента
  beforeUpdate(el, binding, vnode, prevVnode) {},
  
  // После обновления компонента
  updated(el, binding, vnode, prevVnode) {},
  
  // Перед размонтированием
  beforeUnmount(el, binding, vnode, prevVnode) {},
  
  // После размонтирования
  unmounted(el, binding, vnode, prevVnode) {}
}

// Сокращённая форма (mounted + updated):
const vColor: Directive = (el, binding) => {
  el.style.color = binding.value
}`

const bindingCode = `// binding — объект с информацией о директиве
// <div v-my:arg.mod1.mod2="value">

// binding = {
//   value: 'текущее значение',
//   oldValue: 'предыдущее (только в updated)',
//   arg: 'arg',              // v-my:arg
//   modifiers: {             // v-my.mod1.mod2
//     mod1: true,
//     mod2: true
//   },
//   instance: ComponentInstance,
//   dir: DirectiveDefinition
// }

// Пример: v-tooltip:top.animated="'Подсказка'"
// arg = 'top'
// modifiers = { animated: true }
// value = 'Подсказка'`

const clickOutsideCode = `// v-click-outside — популярнейшая кастомная директива
const vClickOutside: Directive = {
  mounted(el, binding) {
    el.__clickOutside = (event: Event) => {
      // Клик внутри элемента — игнорируем
      if (el.contains(event.target as Node)) return
      // Клик снаружи — вызываем переданную функцию
      binding.value(event)
    }
    document.addEventListener('click', el.__clickOutside)
  },
  unmounted(el) {
    // ⚠️ ОБЯЗАТЕЛЬНО очищать listener!
    document.removeEventListener('click', el.__clickOutside)
  }
}

// Использование:
// <div v-click-outside="closeDropdown">
//   <button @click="open">Меню</button>
//   <ul v-if="isOpen">...</ul>
// </div>`

const intersectionCode = `// v-lazy-load — загрузка при появлении в viewport
const vLazyLoad: Directive<HTMLImageElement> = {
  mounted(el, binding) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = binding.value
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    el.__observer = observer
  },
  unmounted(el) {
    el.__observer?.disconnect()
  }
}

// Использование:
// <img v-lazy-load="'/img/photo.jpg'" src="/placeholder.jpg">`

const focusTrapCode = `// v-focus — автофокус при монтировании
const vFocus: Directive = {
  mounted(el) {
    el.focus()
  }
}

// v-debounce — debounce для input
const vDebounce: Directive = {
  mounted(el, binding) {
    let timeout: ReturnType<typeof setTimeout>
    const delay = binding.arg ? parseInt(binding.arg) : 300
    
    el.addEventListener('input', (e) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        binding.value(e.target.value)
      }, delay)
    })
  }
}

// <input v-debounce:500="handleSearch">`

const globalVsLocalCode = `// Глобальная регистрация (main.ts):
app.directive('focus', {
  mounted(el) { el.focus() }
})
// Доступна во ВСЕХ компонентах

// Локальная регистрация (внутри <script setup>):
const vFocus: Directive = {
  mounted(el) { el.focus() }
}
// ⚡ Автоматически доступна в шаблоне
// Имя: vFocus → v-focus (camelCase → kebab)

// Или в Options API:
export default {
  directives: {
    focus: { mounted(el) { el.focus() } }
  }
}`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🎯 Кастомные директивы</h1>
      <p>
        Директивы — низкоуровневый доступ к DOM. Когда composables не хватает 
        и нужно напрямую управлять элементами.
      </p>
      <a href="https://vuejs.org/guide/reusability/custom-directives" target="_blank" class="docs-link">
        📚 Документация Vue
      </a>
    </div>

    <div class="tabs" style="margin-bottom: 24px">
      <button 
        v-for="tab in [
          { key: 'basics', label: '📦 Основы' },
          { key: 'hooks', label: '🔗 Хуки и binding' },
          { key: 'examples', label: '🧩 Примеры' },
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
          <h3 class="card-title">📦 Когда использовать директивы</h3>
        </div>

        <div class="info-box">
          <span class="info-box-icon">💡</span>
          <div class="info-box-content">
            <div class="info-box-title">Директивы vs Composables</div>
            <p>
              Composables — для логики (state, side effects). 
              Директивы — для прямой работы с DOM-элементом (focus, intersection, resize, click-outside).
              Если можете решить через composable — предпочитайте его.
            </p>
          </div>
        </div>

        <CodeBlock :code="globalVsLocalCode" language="typescript" title="Регистрация директив" />
      </div>

      <!-- Live Demo -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎮 Live Demo: v-highlight</h3>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px">
          <div>
            <h4>Настройки</h4>
            <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 8px">
              <label style="display: flex; align-items: center; gap: 8px">
                Цвет:
                <input type="color" v-model="highlightColor" />
              </label>
              <input 
                class="input" 
                v-model="highlightText" 
                placeholder="Текст..."
              />
            </div>
          </div>

          <div>
            <h4>Результат</h4>
            <div 
              :style="{ 
                padding: '16px', 
                background: highlightColor + '22', 
                borderRadius: '8px',
                borderLeft: '3px solid ' + highlightColor,
                marginTop: '8px'
              }"
            >
              {{ highlightText }}
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Хуки -->
    <template v-if="activeTab === 'hooks'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔗 Lifecycle хуки директив</h3>
          <span class="card-badge">6 хуков</span>
        </div>

        <CodeBlock :code="directiveHooksCode" language="typescript" title="Все хуки" />

        <div style="display: flex; flex-direction: column; gap: 8px; margin-top: 16px">
          <div v-for="(hook, i) in [
            { name: 'created', desc: 'До монтирования. Элемент существует, но ещё не в DOM.', freq: 'Редко' },
            { name: 'mounted', desc: 'Элемент вставлен в DOM. Основной хук для инициализации.', freq: 'Очень часто' },
            { name: 'beforeUpdate', desc: 'Перед обновлением VNode компонента.', freq: 'Редко' },
            { name: 'updated', desc: 'После обновления VNode. Новые binding.value доступны.', freq: 'Часто' },
            { name: 'beforeUnmount', desc: 'Перед размонтированием элемента.', freq: 'Редко' },
            { name: 'unmounted', desc: 'Элемент удалён. Обязательно чистить listeners!', freq: 'Часто' },
          ]" 
            :key="hook.name"
            :style="{ 
              display: 'grid', 
              gridTemplateColumns: '140px 1fr 100px',
              gap: '12px',
              padding: '10px 14px', 
              background: 'var(--bg-code)', 
              borderRadius: '6px',
              alignItems: 'center'
            }"
          >
            <code style="color: var(--accent-vue); font-weight: 600">{{ hook.name }}</code>
            <span style="color: var(--text-secondary); font-size: 0.85rem">{{ hook.desc }}</span>
            <span :style="{ 
              fontSize: '0.75rem', 
              padding: '2px 6px',
              borderRadius: '4px',
              background: hook.freq === 'Очень часто' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(99, 102, 241, 0.1)',
              color: hook.freq === 'Очень часто' ? 'var(--accent-green)' : 'var(--text-muted)',
              textAlign: 'center'
            }">{{ hook.freq }}</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📋 Объект binding</h3>
        </div>
        <CodeBlock :code="bindingCode" language="typescript" title="Аргументы, модификаторы, значение" />
      </div>
    </template>

    <!-- Примеры -->
    <template v-if="activeTab === 'examples'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🖱️ v-click-outside</h3>
          <span class="card-badge">Самая популярная!</span>
        </div>
        <CodeBlock :code="clickOutsideCode" language="typescript" title="Закрытие dropdown при клике снаружи" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">👁️ v-lazy-load (Intersection Observer)</h3>
        </div>
        <CodeBlock :code="intersectionCode" language="typescript" title="Lazy load изображений" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">⌨️ v-focus & v-debounce</h3>
        </div>
        <CodeBlock :code="focusTrapCode" language="typescript" title="Утилитарные директивы" />
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
