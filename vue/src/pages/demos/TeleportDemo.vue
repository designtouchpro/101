<script setup lang="ts">
import { ref } from 'vue'

const showModal = ref(false)
const target = ref('body')
</script>

<template>
  <div class="page-container">
    <h2>Teleport Demo</h2>
    <p>Teleport позволяет рендерить компонент в другую часть DOM за пределами иерархии Vue-компонента.</p>

    <div class="card demo-controls">
      <button @click="showModal = true">Открыть модальное окно</button>
      
      <div class="target-select">
        <label>
          <input type="radio" v-model="target" value="body"> To &lt;body&gt;
        </label>
        <label>
          <input type="radio" v-model="target" value="#app"> To #app (Standard)
        </label>
      </div>
    </div>

    <!-- Teleport -->
    <Teleport :to="target">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal-content" @click.stop>
          <h3>Я телепортирован!</h3>
          <p>Мой родитель в DOM: <strong>{{ target }}</strong></p>
          <p>Хотя логически я нахожусь внутри компонента <code>TeleportDemo.vue</code>.</p>
          <button @click="showModal = false">Закрыть</button>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  min-width: 300px;
  text-align: center;
}

.modal-content h3 {
  font-size: 1.5rem;
  margin-bottom: 16px;
  color: var(--accent-vue);
}

.modal-content p {
  color: var(--text-secondary);
  margin-bottom: 12px;
  line-height: 1.6;
}

.modal-content code {
  background: var(--bg-code);
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: var(--accent-vue);
}

.modal-content button {
  margin-top: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: var(--accent-vue);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.modal-content button:hover {
  background: var(--accent-vue-light);
  transform: translateY(-1px);
}
</style>
