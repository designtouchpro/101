<script setup lang="ts">
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  done: boolean
}

const todos = ref<Todo[]>([
  { id: 1, text: 'Изучить ref()', done: true },
  { id: 2, text: 'Изучить reactive()', done: true },
  { id: 3, text: 'Изучить computed()', done: false },
  { id: 4, text: 'Изучить watch()', done: false },
])

const newTodo = ref('')
let nextId = 5

const remaining = computed(() => todos.value.filter(t => !t.done).length)
const done = computed(() => todos.value.filter(t => t.done).length)

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: nextId++,
      text: newTodo.value.trim(),
      done: false
    })
    newTodo.value = ''
  }
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter(t => t.id !== id)
}

const toggleAll = () => {
  const allDone = todos.value.every(t => t.done)
  todos.value.forEach(t => t.done = !allDone)
}
</script>

<template>
  <div class="todo-demo">
    <div class="todo-header">
      <input 
        v-model="newTodo" 
        @keyup.enter="addTodo"
        placeholder="Добавить задачу..."
        class="todo-input"
      />
      <button @click="addTodo" class="add-btn">➕</button>
    </div>
    
    <TransitionGroup name="list" tag="ul" class="todo-list">
      <li 
        v-for="todo in todos" 
        :key="todo.id"
        class="todo-item"
        :class="{ done: todo.done }"
      >
        <label class="todo-label">
          <input type="checkbox" v-model="todo.done" class="todo-checkbox" />
          <span class="todo-text">{{ todo.text }}</span>
        </label>
        <button @click="removeTodo(todo.id)" class="remove-btn">✕</button>
      </li>
    </TransitionGroup>
    
    <div class="todo-footer">
      <div class="todo-stats">
        <span class="stat">
          <span class="stat-value" style="color: var(--accent-vue)">{{ remaining }}</span>
          осталось
        </span>
        <span class="stat">
          <span class="stat-value" style="color: var(--accent-orange)">{{ done }}</span>
          выполнено
        </span>
      </div>
      <button @click="toggleAll" class="toggle-all-btn">
        {{ todos.every(t => t.done) ? '↩️ Сбросить все' : '✅ Выполнить все' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-demo {
  background: var(--bg-tertiary);
  border-radius: 12px;
  overflow: hidden;
}

.todo-header {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
}

.todo-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.todo-input:focus {
  outline: none;
  border-color: var(--accent-vue);
}

.add-btn {
  padding: 12px 16px;
  background: var(--accent-vue);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}

.add-btn:hover {
  opacity: 0.9;
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-color);
  transition: all 0.3s;
}

.todo-item:hover {
  background: var(--bg-secondary);
}

.todo-item.done {
  opacity: 0.6;
}

.todo-item.done .todo-text {
  text-decoration: line-through;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  flex: 1;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  accent-color: var(--accent-vue);
}

.todo-text {
  color: var(--text-primary);
}

.remove-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0;
  transition: all 0.2s;
}

.todo-item:hover .remove-btn {
  opacity: 1;
}

.remove-btn:hover {
  background: var(--accent-red);
  color: white;
}

.todo-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-secondary);
}

.todo-stats {
  display: flex;
  gap: 16px;
}

.stat {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.stat-value {
  font-weight: 600;
  font-size: 1.1rem;
}

.toggle-all-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.toggle-all-btn:hover {
  background: var(--bg-primary);
  color: var(--text-primary);
}

/* Animations */
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
</style>
