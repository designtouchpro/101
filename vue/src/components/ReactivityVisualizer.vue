<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'

const count = ref(0)
const state = reactive({ x: 0, y: 0 })
const history = ref<Array<{ type: string; value: string; time: number }>>([])
const startTime = ref(Date.now())

const addToHistory = (type: string, value: string) => {
  history.value.unshift({
    type,
    value,
    time: Date.now() - startTime.value
  })
  if (history.value.length > 10) {
    history.value.pop()
  }
}

watch(count, (val) => {
  addToHistory('ref', `count = ${val}`)
})

watch(() => state.x, (val) => {
  addToHistory('reactive', `state.x = ${val}`)
})

watch(() => state.y, (val) => {
  addToHistory('reactive', `state.y = ${val}`)
})

const handleMouseMove = (e: MouseEvent) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  state.x = Math.round(e.clientX - rect.left)
  state.y = Math.round(e.clientY - rect.top)
}

const reset = () => {
  count.value = 0
  state.x = 0
  state.y = 0
  history.value = []
  startTime.value = Date.now()
}
</script>

<template>
  <div class="reactivity-visualizer">
    <div class="panels">
      <!-- Left Panel: Controls -->
      <div class="panel control-panel">
        <h4>🎮 Управление</h4>
        
        <div class="control-group">
          <label>ref() — count: {{ count }}</label>
          <div class="button-row">
            <button @click="count--" class="ctrl-btn">−</button>
            <div class="value-badge">{{ count }}</div>
            <button @click="count++" class="ctrl-btn">+</button>
          </div>
        </div>

        <div class="control-group">
          <label>reactive() — двигайте мышкой</label>
          <div 
            class="mouse-area"
            @mousemove="handleMouseMove"
          >
            <div 
              class="cursor-dot"
              :style="{ left: state.x + 'px', top: state.y + 'px' }"
            />
            <span class="coords">x: {{ state.x }}, y: {{ state.y }}</span>
          </div>
        </div>

        <button @click="reset" class="reset-btn">🔄 Сброс</button>
      </div>

      <!-- Right Panel: History -->
      <div class="panel history-panel">
        <h4>📜 История изменений</h4>
        <TransitionGroup name="history" tag="div" class="history-list">
          <div 
            v-for="(item, i) in history" 
            :key="item.time + item.value"
            class="history-item"
            :class="item.type"
            :style="{ opacity: 1 - i * 0.08 }"
          >
            <span class="history-badge">{{ item.type }}</span>
            <span class="history-value">{{ item.value }}</span>
            <span class="history-time">{{ item.time }}ms</span>
          </div>
        </TransitionGroup>
        <div v-if="history.length === 0" class="empty-state">
          Измените значения слева, чтобы увидеть реактивность в действии
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reactivity-visualizer {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 20px;
}

.panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

@media (max-width: 768px) {
  .panels {
    grid-template-columns: 1fr;
  }
}

.panel {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
}

.panel h4 {
  margin: 0 0 16px 0;
  color: var(--text-primary);
  font-size: 0.95rem;
}

.control-group {
  margin-bottom: 20px;
}

.control-group label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-bottom: 8px;
}

.button-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ctrl-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: var(--accent-vue);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s;
}

.ctrl-btn:hover {
  transform: scale(1.05);
}

.ctrl-btn:active {
  transform: scale(0.95);
}

.value-badge {
  min-width: 60px;
  padding: 8px 16px;
  background: var(--bg-tertiary);
  border-radius: 8px;
  text-align: center;
  font-family: 'Fira Code', monospace;
  font-size: 1.2rem;
  color: var(--accent-vue);
}

.mouse-area {
  position: relative;
  height: 100px;
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%);
  border-radius: 8px;
  border: 1px dashed var(--border-color);
  overflow: hidden;
  cursor: crosshair;
}

.cursor-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  background: var(--accent-orange);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  box-shadow: 0 0 10px var(--accent-orange);
  transition: all 0.05s linear;
}

.coords {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  padding: 4px 8px;
  border-radius: 4px;
}

.reset-btn {
  width: 100%;
  padding: 10px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 250px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  font-size: 0.85rem;
}

.history-item.ref {
  border-left: 3px solid var(--accent-vue);
}

.history-item.reactive {
  border-left: 3px solid var(--accent-orange);
}

.history-badge {
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
}

.history-item.ref .history-badge {
  background: rgba(66, 184, 131, 0.2);
  color: var(--accent-vue);
}

.history-item.reactive .history-badge {
  background: rgba(255, 170, 51, 0.2);
  color: var(--accent-orange);
}

.history-value {
  flex: 1;
  font-family: 'Fira Code', monospace;
  color: var(--text-primary);
}

.history-time {
  color: var(--text-secondary);
  font-size: 0.75rem;
}

.empty-state {
  color: var(--text-secondary);
  text-align: center;
  padding: 40px 20px;
  font-size: 0.9rem;
}

/* Animations */
.history-enter-active {
  transition: all 0.3s ease;
}

.history-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
