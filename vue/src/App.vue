<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import ThemeToggle from './components/ThemeToggle.vue'

const mobileMenuOpen = ref(false)
const sidebarCollapsed = ref(localStorage.getItem('vue-sidebar-collapsed') === 'true')
const indexHref = import.meta.env.VITE_DEPLOY_TARGET === 'github-pages'
  ? new URL('..', window.location.origin + import.meta.env.BASE_URL).toString()
  : 'http://localhost:3200'
const route = useRoute()

const handleNavClick = () => {
  mobileMenuOpen.value = false
}

const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
  localStorage.setItem('vue-sidebar-collapsed', String(sidebarCollapsed.value))
}

const isActive = (path: string) => {
  return route.path === path
}
</script>

<template>
  <!-- Mobile Header -->
  <header class="mobile-header">
    <button 
      class="hamburger-btn" 
      @click="mobileMenuOpen = !mobileMenuOpen"
      aria-label="Toggle menu"
    >
      {{ mobileMenuOpen ? '✕' : '☰' }}
    </button>
    <h1><img src="/logo.svg" alt="" width="28" height="28" style="margin-right: 8px" /> Vue 101</h1>
  </header>

  <!-- Mobile Menu Overlay -->
  <div 
    v-if="mobileMenuOpen" 
    class="mobile-overlay" 
    @click="mobileMenuOpen = false" 
  />

  <div :class="['app-layout', { 'layout-collapsed': sidebarCollapsed }]">
    <aside :class="['sidebar', { 'sidebar-open': mobileMenuOpen, 'sidebar-collapsed': sidebarCollapsed }]">
      <div class="sidebar-header">
        <div class="sidebar-header-top">
          <h1><img src="/logo.svg" alt="" width="28" height="28" style="margin-right: 8px" /> Vue 101</h1>
          <ThemeToggle />
        </div>
        <p>Интерактивный курс</p>
        <a :href="indexHref" class="back-to-index">← Все плейграунды</a>
      </div>

      <nav class="nav-section">
        <RouterLink 
          to="/" 
          :class="['nav-link', { active: isActive('/') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🏠</span>
          Главная
        </RouterLink>

        <div class="nav-section-title">Основы</div>
        
        <RouterLink 
          to="/basics/template-syntax" 
          :class="['nav-link', { active: isActive('/basics/template-syntax') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">📝</span>
          Template Syntax
        </RouterLink>
        
        <RouterLink 
          to="/basics/styling" 
          :class="['nav-link', { active: isActive('/basics/styling') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🎨</span>
          Стилизация
        </RouterLink>

        <RouterLink 
          to="/basics/v-model" 
          :class="['nav-link', { active: isActive('/basics/v-model') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🔗</span>
          v-model
        </RouterLink>

        <div class="nav-section-title">Реактивность</div>
        
        <RouterLink 
          to="/reactivity/ref" 
          :class="['nav-link', { active: isActive('/reactivity/ref') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">📦</span>
          ref()
        </RouterLink>
        
        <RouterLink 
          to="/reactivity/reactive" 
          :class="['nav-link', { active: isActive('/reactivity/reactive') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">⚡</span>
          reactive()
        </RouterLink>
        
        <RouterLink 
          to="/reactivity/computed" 
          :class="['nav-link', { active: isActive('/reactivity/computed') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🧮</span>
          computed()
        </RouterLink>
        
        <RouterLink 
          to="/reactivity/watch" 
          :class="['nav-link', { active: isActive('/reactivity/watch') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">👁️</span>
          watch / watchEffect
        </RouterLink>
        
        <RouterLink 
          to="/reactivity/comparison" 
          :class="['nav-link', { active: isActive('/reactivity/comparison') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🔬</span>
          ref vs shallowRef
        </RouterLink>
        
        <RouterLink 
          to="/reactivity/overview" 
          :class="['nav-link', { active: isActive('/reactivity/overview') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🔄</span>
          Обзор реактивности
        </RouterLink>

        <div class="nav-section-title">Жизненный цикл</div>
        
        <RouterLink 
          to="/lifecycle/hooks" 
          :class="['nav-link', { active: isActive('/lifecycle/hooks') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🔁</span>
          Lifecycle Hooks
        </RouterLink>

        <div class="nav-section-title">Компоненты</div>
        
        <RouterLink 
          to="/components/props-emits" 
          :class="['nav-link', { active: isActive('/components/props-emits') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">📤</span>
          Props & Emits
        </RouterLink>
        
        <RouterLink 
          to="/components/slots" 
          :class="['nav-link', { active: isActive('/components/slots') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🎰</span>
          Slots
        </RouterLink>
        
        <RouterLink 
          to="/components/provide-inject" 
          :class="['nav-link', { active: isActive('/components/provide-inject') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">💉</span>
          Provide / Inject
        </RouterLink>

        <div class="nav-section-title">Composables</div>
        
        <RouterLink 
          to="/composables/intro" 
          :class="['nav-link', { active: isActive('/composables/intro') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🧩</span>
          Введение
        </RouterLink>

        <div class="nav-section-title">State Management</div>
        
        <RouterLink 
          to="/state/pinia" 
          :class="['nav-link', { active: isActive('/state/pinia') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🍍</span>
          Pinia
        </RouterLink>

        <div class="nav-section-title">Паттерны</div>
        
        <RouterLink 
          to="/patterns/components" 
          :class="['nav-link', { active: isActive('/patterns/components') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🧱</span>
          Компоненты
        </RouterLink>

        <div class="nav-section-title">Vue 3.5+</div>
        
        <RouterLink 
          to="/versions/vue35" 
          :class="['nav-link', { active: isActive('/versions/vue35') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🚀</span>
          Новые фичи
        </RouterLink>

        <div class="nav-section-title">Демонстрации</div>
        
        <RouterLink 
          to="/demos/interactive" 
          :class="['nav-link', { active: isActive('/demos/interactive') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🎮</span>
          Интерактивные демо
        </RouterLink>
        <RouterLink 
          to="/demos/teleport" 
          :class="['nav-link', { active: isActive('/demos/teleport') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">👻</span>
          Teleport
        </RouterLink>

        <div class="nav-section-title">Продвинутое</div>
        
        <RouterLink 
          to="/advanced/custom-directives" 
          :class="['nav-link', { active: isActive('/advanced/custom-directives') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🎯</span>
          Кастомные директивы
        </RouterLink>
        
        <RouterLink 
          to="/advanced/next-tick" 
          :class="['nav-link', { active: isActive('/advanced/next-tick') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">⏱️</span>
          nextTick
        </RouterLink>
        
        <RouterLink 
          to="/advanced/keep-alive" 
          :class="['nav-link', { active: isActive('/advanced/keep-alive') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">📦</span>
          KeepAlive
        </RouterLink>
        
        <RouterLink 
          to="/advanced/error-handling" 
          :class="['nav-link', { active: isActive('/advanced/error-handling') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🛡️</span>
          Обработка ошибок
        </RouterLink>
        
        <RouterLink 
          to="/advanced/reactivity-caveats" 
          :class="['nav-link', { active: isActive('/advanced/reactivity-caveats') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">⚡</span>
          Подводные камни
        </RouterLink>

        <RouterLink 
          to="/advanced/reactivity-deep" 
          :class="['nav-link', { active: isActive('/advanced/reactivity-deep') }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🔬</span>
          Продвинутая реактивность
        </RouterLink>

        <div class="nav-section-title">Тестирование</div>

        <RouterLink
          to="/testing/guide"
          :class="['nav-link', { active: $route.path === '/testing/guide' }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🧪</span>
          Vitest + VTU
        </RouterLink>

        <div class="nav-section-title">Роутинг и Архитектура</div>

        <RouterLink
          to="/routing/architecture"
          :class="['nav-link', { active: $route.path === '/routing/architecture' }]"
          @click="handleNavClick"
        >
          <span class="nav-link-icon">🗺️</span>
          Router и Архитектура
        </RouterLink>

        <button class="sidebar-collapse-btn" @click="toggleSidebar">
          {{ sidebarCollapsed ? '»' : '«' }}
          <span class="collapse-text">{{ sidebarCollapsed ? 'Развернуть' : 'Свернуть' }}</span>
        </button>
      </nav>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
