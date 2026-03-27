<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const provideInjectCode = `<!-- ═══════════════════════════════════════════════════════════════
     💉 Provide / Inject — передача данных через дерево компонентов
     ═══════════════════════════════════════════════════════════════ -->

<!-- GrandParent.vue (Provider) -->
<script setup lang="ts">
import { provide, ref, readonly } from 'vue'

// ─────────────────────────────────────────────────────────────
// Provide — предоставляем данные потомкам
// ─────────────────────────────────────────────────────────────
const theme = ref('dark')
const user = ref({ name: 'Вася', role: 'admin' })

// Базовый provide
provide('theme', theme)

// readonly — защита от мутаций
provide('user', readonly(user))

// Можно предоставить функции для изменения
provide('updateTheme', (newTheme: string) => {
  theme.value = newTheme
})
<\/script>


<!-- DeepChild.vue (Consumer) — любой уровень вложенности! -->
<script setup lang="ts">
import { inject } from 'vue'

// ─────────────────────────────────────────────────────────────
// Inject — получаем данные от предка
// ─────────────────────────────────────────────────────────────
const theme = inject('theme')                    // Ref<string> | undefined
const user = inject('user')                      // readonly Ref

// С дефолтным значением
const locale = inject('locale', 'ru')            // Если нет — 'ru'

// С фабрикой для дефолта
const config = inject('config', () => ({
  debug: false
}))

// Функция для изменения
const updateTheme = inject('updateTheme')
<\/script>

<template>
  <div :class="theme">
    <p>User: {{ user?.name }}</p>
    <button @click="updateTheme?.('light')">
      Light theme
    </button>
  </div>
</template>`

const typedProvideCode = `// ═══════════════════════════════════════════════════════════════
// 🔷 Типизированный Provide / Inject
// ═══════════════════════════════════════════════════════════════

import type { InjectionKey, Ref } from 'vue'
import { provide, inject, ref } from 'vue'

// ─────────────────────────────────────────────────────────────
// Создаём типизированный ключ (в отдельном файле!)
// ─────────────────────────────────────────────────────────────
// injection-keys.ts
export interface User {
  id: number
  name: string
  role: 'admin' | 'user'
}

export const UserKey: InjectionKey<Ref<User>> = Symbol('user')
export const ThemeKey: InjectionKey<Ref<'light' | 'dark'>> = Symbol('theme')


// ─────────────────────────────────────────────────────────────
// Provider.vue
// ─────────────────────────────────────────────────────────────
import { UserKey, ThemeKey } from './injection-keys'

const user = ref<User>({ id: 1, name: 'Вася', role: 'admin' })
const theme = ref<'light' | 'dark'>('dark')

provide(UserKey, user)   // TypeScript знает тип!
provide(ThemeKey, theme)


// ─────────────────────────────────────────────────────────────
// Consumer.vue
// ─────────────────────────────────────────────────────────────
import { UserKey, ThemeKey } from './injection-keys'

const user = inject(UserKey)       // Ref<User> | undefined
const theme = inject(ThemeKey)     // Ref<'light' | 'dark'> | undefined

// С обязательным значением (throws если нет)
const user = inject(UserKey)!      // Ref<User>`

const realWorldCode = `<!-- ═══════════════════════════════════════════════════════════════
     🌍 Практический пример: Theme Provider
     ═══════════════════════════════════════════════════════════════ -->

<!-- composables/useTheme.ts -->
import { ref, provide, inject, readonly } from 'vue'
import type { InjectionKey, Ref } from 'vue'

type Theme = 'light' | 'dark'

interface ThemeContext {
  theme: Readonly<Ref<Theme>>
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme')

// Provider composable
export function provideTheme() {
  const theme = ref<Theme>('dark')
  
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
  }
  
  const context: ThemeContext = {
    theme: readonly(theme),
    toggleTheme,
    setTheme
  }
  
  provide(ThemeKey, context)
  
  return context
}

// Consumer composable
export function useTheme() {
  const context = inject(ThemeKey)
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  
  return context
}


<!-- App.vue -->
<script setup>
import { provideTheme } from './composables/useTheme'

provideTheme()  // Один раз в корне
<\/script>


<!-- AnyDeepComponent.vue -->
<script setup>
import { useTheme } from './composables/useTheme'

const { theme, toggleTheme } = useTheme()
<\/script>

<template>
  <button @click="toggleTheme">
    Current: {{ theme }}
  </button>
</template>`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>💉 Provide / Inject</h1>
      <p>Dependency Injection в Vue — передача данных через дерево компонентов</p>
      <a 
        href="https://vuejs.org/guide/components/provide-inject.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Основы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Provide / Inject</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Зачем нужно?</div>
          <p>
            Provide/Inject позволяет передавать данные от предка к любому потомку <strong>без prop drilling</strong> — не нужно прокидывать props через каждый уровень.
          </p>
        </div>
      </div>

      <CodeBlock :code="provideInjectCode" language="html" title="💉 Provide / Inject" />
    </div>

    <!-- Визуальная схема -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Props vs Provide/Inject</h3>
        <span class="card-badge">Визуализация</span>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header before">
            <span>❌ Props Drilling</span>
          </div>
          <div class="comparison-body">
            <div class="visual-diagram" style="padding: 16px; font-size: 0.85rem">
              <div style="text-align: center">
                <div class="diagram-box component" style="margin: 0 auto 8px">Parent (data)</div>
                ↓ props
                <div class="diagram-box state" style="margin: 8px auto">Child (не нужно)</div>
                ↓ props
                <div class="diagram-box state" style="margin: 8px auto">GrandChild (не нужно)</div>
                ↓ props
                <div class="diagram-box effect" style="margin: 8px auto 0">DeepChild (нужно!)</div>
              </div>
            </div>
          </div>
        </div>

        <div class="comparison-card">
          <div class="comparison-header after">
            <span>✅ Provide / Inject</span>
          </div>
          <div class="comparison-body">
            <div class="visual-diagram" style="padding: 16px; font-size: 0.85rem">
              <div style="text-align: center">
                <div class="diagram-box component" style="margin: 0 auto 8px">Parent (provide)</div>
                <div style="display: flex; justify-content: center; align-items: center; height: 80px">
                  <div style="border-left: 2px dashed var(--accent-vue); height: 100%"></div>
                </div>
                <div class="diagram-box effect" style="margin: 0 auto">DeepChild (inject)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Типизация -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Типизированный Provide/Inject</h3>
        <span class="card-badge">TypeScript</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">🔷</span>
        <div class="info-box-content">
          <div class="info-box-title">InjectionKey для типобезопасности</div>
          <p>
            Используйте <code>InjectionKey&lt;T&gt;</code> для полной типизации. 
            TypeScript будет знать тип при inject!
          </p>
        </div>
      </div>

      <CodeBlock :code="typedProvideCode" language="typescript" title="🔷 TypeScript" />
    </div>

    <!-- Практический пример -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Практический пример: Theme Provider</h3>
        <span class="card-badge">Best Practice</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">Composable + Provide/Inject</div>
          <p>
            Комбинируйте composables с provide/inject для создания 
            глобальных контекстов (theme, auth, locale).
          </p>
        </div>
      </div>

      <CodeBlock :code="realWorldCode" language="typescript" title="🌍 Theme Provider" />
    </div>

    <!-- Когда использовать -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Когда использовать?</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header after">
            <span>✅ Используйте</span>
          </div>
          <div class="comparison-body">
            <ul style="color: var(--text-secondary); padding-left: 20px; font-size: 0.9rem">
              <li>Глобальные настройки (theme, locale)</li>
              <li>Auth context</li>
              <li>Библиотеки компонентов</li>
              <li>Plugin-ы</li>
              <li>Избежание prop drilling</li>
            </ul>
          </div>
        </div>

        <div class="comparison-card">
          <div class="comparison-header before">
            <span>❌ Не используйте</span>
          </div>
          <div class="comparison-body">
            <ul style="color: var(--text-secondary); padding-left: 20px; font-size: 0.9rem">
              <li>Для простых props (1-2 уровня)</li>
              <li>Для бизнес-логики (используйте Pinia)</li>
              <li>Когда нужно явное отслеживание данных</li>
              <li>Вместо event emitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
