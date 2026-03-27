<script setup lang="ts">
import { ref, computed } from 'vue'

const items = ref([
  { id: 1, name: 'Vue.js', category: 'framework', votes: 42 },
  { id: 2, name: 'React', category: 'library', votes: 38 },
  { id: 3, name: 'TypeScript', category: 'language', votes: 35 },
  { id: 4, name: 'Vite', category: 'tool', votes: 28 },
  { id: 5, name: 'Pinia', category: 'library', votes: 22 },
])

const sortBy = ref<'name' | 'votes'>('votes')
const sortOrder = ref<'asc' | 'desc'>('desc')
const filterCategory = ref<string>('')

const categories = computed(() => {
  const cats = new Set(items.value.map(i => i.category))
  return ['', ...cats]
})

const filteredAndSorted = computed(() => {
  let result = [...items.value]
  
  // Filter
  if (filterCategory.value) {
    result = result.filter(i => i.category === filterCategory.value)
  }
  
  // Sort
  result.sort((a, b) => {
    const aVal = a[sortBy.value]
    const bVal = b[sortBy.value]
    const cmp = typeof aVal === 'string' 
      ? aVal.localeCompare(bVal as string)
      : (aVal as number) - (bVal as number)
    return sortOrder.value === 'asc' ? cmp : -cmp
  })
  
  return result
})

const maxVotes = computed(() => Math.max(...items.value.map(i => i.votes)))

const vote = (id: number) => {
  const item = items.value.find(i => i.id === id)
  if (item) item.votes++
}

const categoryColors: Record<string, string> = {
  framework: '#42b883',
  library: '#61dafb',
  language: '#3178c6',
  tool: '#ffaa33'
}
</script>

<template>
  <div class="sort-filter-demo">
    <div class="controls-bar">
      <div class="control">
        <label>Фильтр:</label>
        <select v-model="filterCategory">
          <option value="">Все</option>
          <option v-for="cat in categories.filter(c => c)" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>
      
      <div class="control">
        <label>Сортировка:</label>
        <select v-model="sortBy">
          <option value="name">По имени</option>
          <option value="votes">По голосам</option>
        </select>
        <button @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'" class="order-btn">
          {{ sortOrder === 'asc' ? '↑' : '↓' }}
        </button>
      </div>
    </div>
    
    <TransitionGroup name="list" tag="div" class="items-list">
      <div 
        v-for="item in filteredAndSorted" 
        :key="item.id"
        class="item-card"
      >
        <div class="item-info">
          <span class="item-name">{{ item.name }}</span>
          <span 
            class="item-category"
            :style="{ backgroundColor: categoryColors[item.category] + '20', color: categoryColors[item.category] }"
          >
            {{ item.category }}
          </span>
        </div>
        
        <div class="item-votes">
          <div class="vote-bar-bg">
            <div 
              class="vote-bar" 
              :style="{ 
                width: (item.votes / maxVotes * 100) + '%',
                backgroundColor: categoryColors[item.category]
              }"
            />
          </div>
          <button @click="vote(item.id)" class="vote-btn">
            👍 {{ item.votes }}
          </button>
        </div>
      </div>
    </TransitionGroup>
    
    <div class="computed-info">
      <code>filteredAndSorted</code> пересчитывается автоматически при изменении фильтров или голосов
    </div>
  </div>
</template>

<style scoped>
.sort-filter-demo {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 20px;
}

.controls-bar {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.control label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.control select {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.9rem;
}

.order-btn {
  width: 36px;
  height: 36px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.order-btn:hover {
  background: var(--accent-vue);
  color: white;
  border-color: var(--accent-vue);
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: 8px;
  transition: all 0.3s;
}

.item-card:hover {
  transform: translateX(4px);
}

.item-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.item-name {
  font-weight: 500;
  color: var(--text-primary);
}

.item-category {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
}

.item-votes {
  display: flex;
  align-items: center;
  gap: 12px;
}

.vote-bar-bg {
  width: 100px;
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.vote-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}

.vote-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.vote-btn:hover {
  background: var(--accent-vue);
  color: white;
  transform: scale(1.05);
}

.computed-info {
  margin-top: 16px;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.85rem;
  text-align: center;
}

.computed-info code {
  color: var(--accent-vue);
}

/* List animations */
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-active {
  position: absolute;
}
</style>
