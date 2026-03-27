<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'

// Quick interactive demo
const count = ref(0)
const doubled = computed(() => count.value * 2)
</script>

<template>
  <div class="demo-container">
    <div class="home-hero">
      <h1>Vue Playground</h1>
      <p>
        Интерактивная площадка для изучения Vue 3. Визуализируйте, экспериментируйте 
        и понимайте как работает Vue изнутри.
      </p>
    </div>

    <!-- Quick Demo -->
    <div class="card quick-demo">
      <div class="quick-demo-content">
        <div class="quick-demo-visual">
          <div class="quick-counter">
            <button @click="count--" class="counter-btn">−</button>
            <div class="counter-value">{{ count }}</div>
            <button @click="count++" class="counter-btn">+</button>
          </div>
          <div class="quick-computed">
            <span class="computed-label">computed:</span>
            <span class="computed-value">{{ doubled }}</span>
          </div>
        </div>
        <div class="quick-demo-code">
          <code>
            <span class="code-keyword">const</span> count = <span class="code-fn">ref</span>(<span class="code-num">{{ count }}</span>)<br/>
            <span class="code-keyword">const</span> doubled = <span class="code-fn">computed</span>(() => count.value * 2) <span class="code-comment">// {{ doubled }}</span>
          </code>
        </div>
      </div>
      <RouterLink to="/demos/interactive" class="demo-link">
        🎮 Больше интерактивных демо →
      </RouterLink>
    </div>

    <h2 style="margin-bottom: 24px">🎓 Начните изучение</h2>

    <div class="feature-grid">
      <RouterLink to="/reactivity/ref" class="feature-card">
        <div class="feature-icon">📦</div>
        <h3>ref()</h3>
        <p>
          Узнайте как работает реактивность для примитивов, как правильно 
          использовать .value и когда применять ref.
        </p>
      </RouterLink>

      <RouterLink to="/reactivity/reactive" class="feature-card">
        <div class="feature-icon">⚡</div>
        <h3>reactive()</h3>
        <p>
          Глубокая реактивность для объектов, особенности работы с Proxy 
          и отличия от ref.
        </p>
      </RouterLink>

      <RouterLink to="/reactivity/computed" class="feature-card">
        <div class="feature-icon">🧮</div>
        <h3>computed()</h3>
        <p>
          Вычисляемые свойства с автоматическим кешированием, 
          getter/setter и оптимизация.
        </p>
      </RouterLink>

      <RouterLink to="/reactivity/watch" class="feature-card">
        <div class="feature-icon">👁️</div>
        <h3>watch / watchEffect</h3>
        <p>
          Отслеживание изменений, side effects, deep watching 
          и управление жизненным циклом watchers.
        </p>
      </RouterLink>

      <RouterLink to="/lifecycle/hooks" class="feature-card">
        <div class="feature-icon">🔁</div>
        <h3>Lifecycle Hooks</h3>
        <p>
          Полный жизненный цикл компонента от создания до удаления 
          с визуальной timeline.
        </p>
      </RouterLink>

      <RouterLink to="/components/props-emits" class="feature-card">
        <div class="feature-icon">📤</div>
        <h3>Props & Emits</h3>
        <p>
          Передача данных между компонентами, типизация props 
          и создание событий.
        </p>
      </RouterLink>

      <RouterLink to="/components/slots" class="feature-card">
        <div class="feature-icon">🎰</div>
        <h3>Slots</h3>
        <p>
          Композиция контента: default, named и scoped slots 
          для гибких компонентов.
        </p>
      </RouterLink>

      <RouterLink to="/composables/intro" class="feature-card">
        <div class="feature-icon">🧩</div>
        <h3>Composables</h3>
        <p>
          Переиспользуемая логика с Composition API, паттерны 
          и best practices.
        </p>
      </RouterLink>

      <RouterLink to="/state/pinia" class="feature-card">
        <div class="feature-icon">🍍</div>
        <h3>Pinia</h3>
        <p>
          Официальное решение для управления состоянием: stores, 
          actions и интеграция с DevTools.
        </p>
      </RouterLink>

      <RouterLink to="/versions/vue35" class="feature-card">
        <div class="feature-icon">🚀</div>
        <h3>Vue 3.5+</h3>
        <p>
          Новые возможности: useTemplateRef, улучшенная реактивность, 
          и другие нововведения.
        </p>
      </RouterLink>

      <RouterLink to="/demos/interactive" class="feature-card highlight">
        <div class="feature-icon">🎮</div>
        <h3>Интерактивные демо</h3>
        <p>
          Визуальные примеры: Todo, поиск, формы, анимации — 
          всё в одном месте.
        </p>
      </RouterLink>
    </div>

    <div class="card" style="margin-top: 48px">
      <h3>💡 Как использовать</h3>
      <p style="color: var(--text-secondary); margin-top: 12px">
        Каждый раздел содержит интерактивные примеры с визуализацией. Вы можете:
      </p>
      <ul style="color: var(--text-secondary); margin-top: 12px; padding-left: 20px">
        <li>Наблюдать за реактивными обновлениями в реальном времени</li>
        <li>Видеть timeline выполнения lifecycle hooks</li>
        <li>Сравнивать поведение ref vs reactive</li>
        <li>Экспериментировать с разными параметрами</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.quick-demo {
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.1) 0%, rgba(53, 73, 94, 0.1) 100%);
  border: 1px solid var(--accent-vue);
}

.quick-demo-content {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 32px;
  align-items: center;
}

@media (max-width: 700px) {
  .quick-demo-content {
    grid-template-columns: 1fr;
  }
}

.quick-demo-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.quick-counter {
  display: flex;
  align-items: center;
  gap: 12px;
}

.counter-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: var(--accent-vue);
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.counter-btn:hover {
  transform: scale(1.1);
}

.counter-btn:active {
  transform: scale(0.95);
}

.counter-value {
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  color: var(--accent-vue);
  min-width: 80px;
  text-align: center;
}

.quick-computed {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.computed-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.computed-value {
  font-family: 'Fira Code', monospace;
  font-weight: 600;
  color: var(--accent-orange);
  font-size: 1.2rem;
}

.quick-demo-code {
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  line-height: 1.8;
}

.code-keyword { color: var(--accent-purple); }
.code-fn { color: var(--accent-vue); }
.code-num { color: var(--accent-orange); }
.code-comment { color: var(--text-secondary); }

.demo-link {
  display: block;
  margin-top: 16px;
  color: var(--accent-vue);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
}

.demo-link:hover {
  transform: translateX(4px);
}

.feature-card.highlight {
  background: linear-gradient(135deg, rgba(66, 184, 131, 0.15) 0%, rgba(255, 170, 51, 0.15) 100%);
  border-color: var(--accent-vue);
}
</style>
