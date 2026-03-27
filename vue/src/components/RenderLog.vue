<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

export interface LogEntry {
  type: 'mount' | 'update' | 'cleanup' | 'effect'
  message: string
  timestamp: number
}

defineProps<{
  logs: LogEntry[]
}>()

const logRef = ref<HTMLDivElement | null>(null)

const getLogIcon = (type: LogEntry['type']): string => {
  switch (type) {
    case 'mount': return '🟢'
    case 'update': return '🔵'
    case 'cleanup': return '🔴'
    case 'effect': return '🟣'
    default: return '⚪'
  }
}

watch(() => logRef.value, () => {
  nextTick(() => {
    if (logRef.value) {
      logRef.value.scrollTop = logRef.value.scrollHeight
    }
  })
}, { deep: true })
</script>

<template>
  <div class="render-log" ref="logRef">
    <div v-if="logs.length === 0" class="log-empty">
      Лог пуст. Начните взаимодействие...
    </div>
    <div 
      v-for="(log, index) in logs" 
      :key="index" 
      :class="['render-log-entry', log.type]"
    >
      <span class="log-timestamp">[{{ log.timestamp }}ms]</span>
      <span>{{ getLogIcon(log.type) }}</span>
      <span>{{ log.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.log-empty {
  color: var(--text-muted);
  font-style: italic;
}

.log-timestamp {
  opacity: 0.5;
}
</style>
