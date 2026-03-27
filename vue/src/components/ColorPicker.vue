<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string>({ default: '#42b883' })

const rgbValues = computed(() => {
  const hex = model.value.replace('#', '')
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  }
})
</script>

<template>
  <div class="color-picker">
    <div class="color-preview" :style="{ backgroundColor: model }">
      <span class="color-value">{{ model }}</span>
    </div>
    <input type="color" v-model="model" class="color-input" />
    <div class="rgb-values">
      <span class="rgb-item" style="color: #ff6b6b">R: {{ rgbValues.r }}</span>
      <span class="rgb-item" style="color: #51cf66">G: {{ rgbValues.g }}</span>
      <span class="rgb-item" style="color: #339af0">B: {{ rgbValues.b }}</span>
    </div>
  </div>
</template>

<style scoped>
.color-picker {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: var(--bg-tertiary);
  border-radius: 8px;
}

.color-preview {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.color-value {
  font-size: 0.7rem;
  font-family: 'Fira Code', monospace;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.color-input {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: none;
}

.rgb-values {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
}
</style>
