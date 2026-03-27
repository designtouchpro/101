<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps<{
  title?: string
}>()

const showCode = ref(false)
</script>

<template>
  <div class="interactive-demo">
    <div class="demo-area">
      <slot name="demo" />
    </div>
    
    <div v-if="$slots.code" class="code-toggle">
      <button @click="showCode = !showCode" class="toggle-btn">
        {{ showCode ? '🙈 Скрыть код' : '👁️ Показать код' }}
      </button>
    </div>
    
    <div v-if="showCode && $slots.code" class="code-area">
      <slot name="code" />
    </div>
  </div>
</template>

<style scoped>
.interactive-demo {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  overflow: hidden;
}

.demo-area {
  padding: 24px;
  background: var(--bg-secondary);
}

.code-toggle {
  border-top: 1px solid var(--border-color);
  padding: 8px 16px;
  background: var(--bg-primary);
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}

.code-area {
  border-top: 1px solid var(--border-color);
}
</style>
