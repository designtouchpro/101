<script setup lang="ts">
defineProps<{
  count: number
  label?: string
}>()
</script>

<template>
  <div class="render-tracker">
    <div class="render-count">
      <span class="render-count-number">{{ count }}</span>
      <span class="render-count-label">{{ label || 'Обновлений' }}</span>
    </div>
  </div>
</template>
