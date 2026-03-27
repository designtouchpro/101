<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = defineProps<{
  highlight?: boolean
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const isFlashing = ref(false)

watch(() => props.highlight, (newVal) => {
  if (newVal) {
    isFlashing.value = true
    nextTick(() => {
      setTimeout(() => {
        isFlashing.value = false
      }, 500)
    })
  }
})
</script>

<template>
  <div ref="containerRef" :class="{ 'highlight-flash': isFlashing }">
    <slot />
  </div>
</template>
