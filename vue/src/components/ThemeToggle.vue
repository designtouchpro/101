<script setup lang="ts">
import { ref, watchEffect, onMounted, onUnmounted } from 'vue'

type Theme = 'dark' | 'light' | 'system'

const ICONS: Record<Theme, string> = { dark: '🌙', light: '☀️', system: '🖥️' }
const NEXT: Record<Theme, Theme> = { dark: 'light', light: 'system', system: 'dark' }
const LABELS: Record<Theme, string> = { dark: 'Тёмная тема', light: 'Светлая тема', system: 'Системная тема' }

const theme = ref<Theme>((() => {
  const saved = localStorage.getItem('playground-theme')
  return (saved === 'dark' || saved === 'light' || saved === 'system') ? saved as Theme : 'system'
})())

function applyTheme(t: Theme) {
  const resolved = t === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : t
  document.documentElement.setAttribute('data-theme', resolved)
}

let mq: MediaQueryList | null = null
let mqHandler: ((e: MediaQueryListEvent) => void) | null = null

watchEffect(() => {
  const t = theme.value
  applyTheme(t)
  localStorage.setItem('playground-theme', t)

  if (mq && mqHandler) {
    mq.removeEventListener('change', mqHandler)
    mq = null
    mqHandler = null
  }

  if (t === 'system') {
    mq = window.matchMedia('(prefers-color-scheme: dark)')
    mqHandler = (e: MediaQueryListEvent) =>
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
    mq.addEventListener('change', mqHandler)
  }
})

onUnmounted(() => {
  if (mq && mqHandler) mq.removeEventListener('change', mqHandler)
})

const toggle = () => { theme.value = NEXT[theme.value] }
</script>

<template>
  <button
    class="theme-toggle"
    @click="toggle"
    :title="LABELS[theme]"
    :aria-label="LABELS[theme]"
  >
    <span class="theme-toggle-icon">{{ ICONS[theme] }}</span>
  </button>
</template>
