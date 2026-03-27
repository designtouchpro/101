<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'

const searchQuery = ref('')
const debounceMs = ref(300)
const searchResults = ref<string[]>([])
const isSearching = ref(false)
const searchCount = ref(0)
const lastSearchTime = ref<number | null>(null)

const mockDatabase = [
  'Vue.js', 'Vue Router', 'Vuex', 'Vue DevTools',
  'React', 'React Router', 'Redux', 'React DevTools',
  'Angular', 'Angular CLI', 'RxJS', 'NgRx',
  'TypeScript', 'JavaScript', 'Node.js', 'Deno',
  'Vite', 'Webpack', 'Rollup', 'esbuild',
  'Pinia', 'Composition API', 'Options API'
]

let timeoutId: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (query) => {
  // Clear previous timeout
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  
  if (!query) {
    searchResults.value = []
    isSearching.value = false
    return
  }
  
  isSearching.value = true
  
  // Debounce
  timeoutId = setTimeout(() => {
    // Simulate API call
    searchCount.value++
    lastSearchTime.value = Date.now()
    
    searchResults.value = mockDatabase.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    )
    
    isSearching.value = false
  }, debounceMs.value)
})

const clearSearch = () => {
  searchQuery.value = ''
  searchResults.value = []
  searchCount.value = 0
}
</script>

<template>
  <div class="watch-demo">
    <div class="search-section">
      <div class="search-box">
        <input 
          v-model="searchQuery"
          placeholder="Поиск..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-btn">✕</button>
        <div v-if="isSearching" class="loading-indicator">
          <span class="spinner"></span>
        </div>
      </div>
      
      <div class="debounce-control">
        <label>Debounce: {{ debounceMs }}ms</label>
        <input type="range" v-model.number="debounceMs" min="0" max="1000" step="100" />
      </div>
    </div>
    
    <div class="results-section">
      <div class="results-header">
        <span v-if="searchResults.length">
          Найдено: <strong>{{ searchResults.length }}</strong>
        </span>
        <span v-else-if="searchQuery && !isSearching">
          Ничего не найдено
        </span>
        <span v-else>
          Введите запрос для поиска
        </span>
      </div>
      
      <TransitionGroup name="results" tag="div" class="results-list">
        <div 
          v-for="result in searchResults" 
          :key="result"
          class="result-item"
        >
          <span v-html="highlightMatch(result, searchQuery)"></span>
        </div>
      </TransitionGroup>
    </div>
    
    <div class="stats-section">
      <div class="stat-item">
        <span class="stat-label">Поисков выполнено:</span>
        <span class="stat-value">{{ searchCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">Последний поиск:</span>
        <span class="stat-value">{{ lastSearchTime ? new Date(lastSearchTime).toLocaleTimeString() : '—' }}</span>
      </div>
    </div>
    
    <div class="code-hint">
      <code>watch(searchQuery, callback, { debounce })</code> — вызывается при каждом изменении
    </div>
  </div>
</template>

<script lang="ts">
function highlightMatch(text: string, query: string): string {
  if (!query) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
</script>

<style scoped>
.watch-demo {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 20px;
}

.search-section {
  margin-bottom: 20px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.search-input {
  width: 100%;
  padding: 14px 50px 14px 16px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-vue);
}

.clear-btn {
  position: absolute;
  right: 50px;
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 8px;
  font-size: 1rem;
}

.clear-btn:hover {
  color: var(--text-primary);
}

.loading-indicator {
  position: absolute;
  right: 16px;
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-top-color: var(--accent-vue);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.debounce-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.debounce-control label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  min-width: 130px;
}

.debounce-control input[type="range"] {
  flex: 1;
  accent-color: var(--accent-vue);
}

.results-section {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  min-height: 150px;
}

.results-header {
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-size: 0.9rem;
}

.results-header strong {
  color: var(--accent-vue);
}

.results-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.result-item {
  padding: 8px 12px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.result-item :deep(mark) {
  background: var(--accent-vue);
  color: white;
  padding: 0 2px;
  border-radius: 2px;
}

.stats-section {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
}

.stat-item {
  display: flex;
  gap: 8px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.stat-value {
  color: var(--accent-orange);
  font-weight: 600;
  font-family: 'Fira Code', monospace;
}

.code-hint {
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  text-align: center;
}

.code-hint code {
  color: var(--accent-vue);
}

/* Animations */
.results-enter-active,
.results-leave-active {
  transition: all 0.3s ease;
}

.results-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.results-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
