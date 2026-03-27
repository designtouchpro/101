<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/night-owl.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('vue', xml)
hljs.registerLanguage('html', xml)

const props = withDefaults(defineProps<{
  code: string
  language?: string
  title?: string
}>(), {
  language: 'typescript'
})

const codeRef = ref<HTMLElement | null>(null)

const highlightCode = () => {
  nextTick(() => {
    if (codeRef.value) {
      codeRef.value.textContent = props.code.trim()
      hljs.highlightElement(codeRef.value)
    }
  })
}

onMounted(highlightCode)
watch(() => props.code, highlightCode)
</script>

<template>
  <div class="code-block-wrapper">
    <div v-if="title" class="code-block-title">{{ title }}</div>
    <pre :class="['code-pre', { 'with-title': title }]"><code ref="codeRef" :class="`language-${language}`">{{ code.trim() }}</code></pre>
  </div>
</template>

<style scoped>
.code-pre {
  margin: 0;
  padding: 16px;
  border-radius: 8px;
  font-size: 0.85rem;
  line-height: 1.6;
  overflow: auto;
  background: var(--code-bg, #011627);
  transition: background 0.3s, color 0.3s;
}

.code-pre.with-title {
  border-radius: 0 0 8px 8px;
}

.code-pre code {
  font-family: 'Fira Code', 'Monaco', monospace;
}
</style>
