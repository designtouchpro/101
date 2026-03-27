<script setup lang="ts">
import { ref, computed } from 'vue'

const isVisible = ref(true)
const listItems = ref(['Item 1', 'Item 2', 'Item 3'])
const nextId = ref(4)

const addItem = () => {
  listItems.value.push(`Item ${nextId.value++}`)
}

const removeItem = (index: number) => {
  listItems.value.splice(index, 1)
}

const shuffleItems = () => {
  const arr = [...listItems.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  listItems.value = arr
}

// Animated number
const targetNumber = ref(100)
const displayNumber = ref(100)

const animateNumber = () => {
  const target = Math.floor(Math.random() * 1000)
  targetNumber.value = target
  
  const diff = target - displayNumber.value
  const step = diff / 30
  let current = displayNumber.value
  
  const interval = setInterval(() => {
    current += step
    displayNumber.value = Math.round(current)
    if (Math.abs(displayNumber.value - target) < Math.abs(step)) {
      displayNumber.value = target
      clearInterval(interval)
    }
  }, 20)
}

// Tab animation
const activeTab = ref(0)
const tabs = ['Профиль', 'Настройки', 'Уведомления']
const tabContents = [
  '👤 Здесь информация о пользователе и настройки профиля.',
  '⚙️ Настройки приложения, темы, языка интерфейса.',
  '🔔 Управление уведомлениями и оповещениями.'
]
</script>

<template>
  <div class="transition-showcase">
    <!-- Simple Toggle -->
    <div class="demo-section">
      <h4>🎭 Transition — появление/скрытие</h4>
      <button @click="isVisible = !isVisible" class="toggle-btn">
        {{ isVisible ? 'Скрыть' : 'Показать' }}
      </button>
      
      <Transition name="fade">
        <div v-if="isVisible" class="demo-box fade-box">
          Fade анимация
        </div>
      </Transition>
      
      <Transition name="slide">
        <div v-if="isVisible" class="demo-box slide-box">
          Slide анимация
        </div>
      </Transition>
      
      <Transition name="scale">
        <div v-if="isVisible" class="demo-box scale-box">
          Scale анимация
        </div>
      </Transition>
    </div>

    <!-- TransitionGroup -->
    <div class="demo-section">
      <h4>📋 TransitionGroup — списки</h4>
      <div class="list-controls">
        <button @click="addItem">➕ Добавить</button>
        <button @click="shuffleItems">🔀 Перемешать</button>
      </div>
      
      <TransitionGroup name="list" tag="ul" class="animated-list">
        <li 
          v-for="(item, index) in listItems" 
          :key="item"
          class="list-item"
        >
          {{ item }}
          <button @click="removeItem(index)" class="remove-item">✕</button>
        </li>
      </TransitionGroup>
    </div>

    <!-- Animated Number -->
    <div class="demo-section">
      <h4>🔢 Анимация чисел</h4>
      <div class="number-display">
        {{ displayNumber }}
      </div>
      <button @click="animateNumber" class="animate-btn">
        🎲 Случайное число
      </button>
    </div>

    <!-- Tab Animation -->
    <div class="demo-section">
      <h4>📑 Переключение табов</h4>
      <div class="tabs">
        <button 
          v-for="(tab, index) in tabs"
          :key="tab"
          :class="['tab-btn', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>
      <div class="tab-content-wrapper">
        <Transition name="tab" mode="out-in">
          <div :key="activeTab" class="tab-content">
            {{ tabContents[activeTab] }}
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transition-showcase {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

@media (max-width: 900px) {
  .transition-showcase {
    grid-template-columns: 1fr;
  }
}

.demo-section {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 20px;
}

.demo-section h4 {
  margin: 0 0 16px 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.toggle-btn, .animate-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: var(--accent-vue);
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  margin-bottom: 16px;
  transition: transform 0.2s;
}

.toggle-btn:hover, .animate-btn:hover {
  transform: scale(1.05);
}

.demo-box {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin-top: 12px;
  color: white;
  font-weight: 500;
}

.fade-box { background: linear-gradient(135deg, #42b883, #35495e); }
.slide-box { background: linear-gradient(135deg, #61dafb, #0055ff); }
.scale-box { background: linear-gradient(135deg, #ff6b6b, #ff922b); }

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.slide-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

/* Scale transition */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.8);
  opacity: 0;
}

/* List controls */
.list-controls {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.list-controls button {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
}

.list-controls button:hover {
  background: var(--accent-vue);
  color: white;
}

/* Animated list */
.animated-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 8px;
  background: var(--bg-secondary);
  border-radius: 8px;
  color: var(--text-primary);
}

.remove-item {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.remove-item:hover {
  background: var(--accent-red);
  color: white;
}

/* List transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.3s ease;
}

/* Number display */
.number-display {
  font-size: 4rem;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  color: var(--accent-vue);
  text-align: center;
  margin-bottom: 16px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;
}

.tab-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px 8px 0 0;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  background: var(--accent-vue);
  color: white;
}

.tab-content-wrapper {
  background: var(--bg-secondary);
  border-radius: 0 0 8px 8px;
  padding: 20px;
  min-height: 80px;
}

.tab-content {
  color: var(--text-primary);
  line-height: 1.5;
}

/* Tab transition */
.tab-enter-active,
.tab-leave-active {
  transition: all 0.2s ease;
}
.tab-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.tab-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
