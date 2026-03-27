<script setup lang="ts">
import { ref, reactive, onActivated, onDeactivated } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

const activeTab = ref<'basics' | 'config' | 'hooks' | 'interview'>('basics')

const interviewQuestions = [
  {
    q: 'Как KeepAlive кеширует компоненты?',
    a: 'KeepAlive хранит VNode дерево компонента в памяти (Map<key, VNode>). При деактивации компонент не уничтожается (unmount НЕ вызывается), а перемещается в кеш. При активации — восстанавливается из кеша без повторного mounted.'
  },
  {
    q: 'Какая стратегия вытеснения при использовании max?',
    a: 'LRU (Least Recently Used). Когда кеш заполнен и приходит новый компонент — удаляется тот, к которому дольше всего не обращались. Удалённый компонент полностью уничтожается (unmounted вызывается).'
  },
  {
    q: 'Вызывается ли onMounted при возврате из кеша?',
    a: 'НЕТ. При возврате из кеша вызывается только onActivated. onMounted вызывается только при ПЕРВОМ монтировании. Это ключевое отличие — если нужно обновлять данные при каждом возврате, используйте onActivated.'
  },
  {
    q: 'Как работает include/exclude — по чему сопоставляется?',
    a: 'По свойству name компонента. В script setup нужен defineOptions({ name: "MyComponent" }). Без name компонент НЕ будет кешироваться через include. Принимает строку (через запятую), RegExp или массив.'
  },
  {
    q: 'Как динамически очистить кеш конкретного компонента?',
    a: 'Через реактивный include: привязать :include="cachedViews" и удалить имя из массива. Vue автоматически уничтожит закешированный компонент. Альтернатива — менять key у component :is.'
  },
  {
    q: 'Почему onActivated нужен для обновления данных?',
    a: 'Потому что onMounted НЕ вызывается при возврате из кеша. Если пользователь ушёл со страницы и вернулся — данные могли устареть. onActivated вызывается каждый раз при показе, поэтому там нужно обновлять данные, перезапускать таймеры, обновлять title.'
  },
]

// Live Demo: KeepAlive cache simulation
const currentView = ref<'A' | 'B'>('A')
const counterA = ref(0)
const counterB = ref(0)
const keepAliveEnabled = ref(true)
const keyForReset = ref(0)
const activationLog = ref<string[]>([])

const addLog = (msg: string) => {
  activationLog.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`)
  if (activationLog.value.length > 8) activationLog.value.shift()
}

const basicCode = `<template>
  <!-- Без KeepAlive: компонент УНИЧТОЖАЕТСЯ при переключении -->
  <component :is="currentView" />
  
  <!-- С KeepAlive: компонент КЕШИРУЕТСЯ в памяти -->
  <KeepAlive>
    <component :is="currentView" />
  </KeepAlive>
</template>

<!-- Что происходит при переключении: -->
<!-- Без KeepAlive:  mounted → unmounted → mounted (заново) -->
<!-- С KeepAlive:    mounted → deactivated → activated (из кеша) -->`

const includeExcludeCode = `<!-- include/exclude принимают: строку, regex, массив -->

<!-- Только компоненты с именем ComponentA и ComponentB кэшируются -->
<KeepAlive include="ComponentA,ComponentB">
  <component :is="view" />
</KeepAlive>

<!-- Regex: всё, что начинается на "Tab" -->
<KeepAlive :include="/^Tab/">
  <component :is="view" />
</KeepAlive>

<!-- Массив -->
<KeepAlive :include="['ComponentA', 'ComponentB']">
  <component :is="view" />
</KeepAlive>

<!-- Всё кроме HeavyComponent -->
<KeepAlive exclude="HeavyComponent">
  <component :is="view" />
</KeepAlive>

<!-- ⚠️ Важно: сопоставляется по ИМЕНИ компонента! -->
<!-- В <scrip t setup> нужен отдельный defineOptions: -->
<!-- <scrip t setup> -->
<!-- defineOptions({ name: 'ComponentA' }) -->
<!-- </scrip t> -->`

const maxCode = `<!-- max — максимальное число кэшированных компонентов -->
<KeepAlive :max="5">
  <component :is="currentTab" />
</KeepAlive>

<!-- Стратегия вытеснения: LRU (Least Recently Used) -->
<!-- Если в кеше 5 компонентов и приходит 6-й → -->
<!-- → самый давно неиспользованный уничтожается -->`

const hooksCode = ['<scr', 'ipt setup>'].join('') + `
import { onActivated, onDeactivated } from 'vue'

// ✅ ТОЛЬКО в компонентах внутри <KeepAlive>!

onActivated(() => {
  // Компонент вернулся из кеша (стал видимым)
  // Используйте для:
  // - обновления данных
  // - запуска таймеров/анимаций
  // - обновления title страницы
  console.log('Компонент активирован')
  fetchLatestData() // обновить данные при возврате
})

onDeactivated(() => {
  // Компонент ушёл в кеш (скрылся)
  // Используйте для:
  // - остановки таймеров/интервалов
  // - отмены запросов
  // - паузы видео/аудио
  console.log('Компонент деактивирован')
  clearInterval(pollInterval)
})

// Порядок хуков при первом монтировании:
// setup → onMounted → onActivated

// При переключении:
// onDeactivated (старый) → onActivated (новый)
` + ['</scr', 'ipt>'].join('')

const routerViewCode = `<!-- KeepAlive с <router-view> -->
<router-view v-slot="{ Component }">
  <KeepAlive :include="cachedViews">
    <component :is="Component" :key="$route.fullPath" />
  </KeepAlive>
</router-view>

<!-- Динамическое управление кешем: -->
` + ['<scr', 'ipt setup>'].join('') + `
const cachedViews = ref(['Dashboard', 'UserList'])

// Добавить в кеш
const addCache = (name: string) => {
  if (!cachedViews.value.includes(name)) {
    cachedViews.value.push(name)
  }
}

// Удалить из кеша (компонент уничтожится)
const removeCache = (name: string) => {
  cachedViews.value = cachedViews.value.filter(v => v !== name)
}
` + ['</scr', 'ipt>'].join('') + `

// key=$route.fullPath — разные параметры = разные кеши
// /user/1 и /user/2 будут кешированы отдельно`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>📦 KeepAlive</h1>
      <p>
        Кеширование компонентов в памяти для сохранения состояния 
        при переключении. Хуки activated/deactivated.
      </p>
    </div>

    <div class="tabs" style="margin-bottom: 24px">
      <button 
        v-for="tab in [
          { key: 'basics', label: '📦 Основы' },
          { key: 'config', label: '⚙️ Настройка' },
          { key: 'hooks', label: '🔗 Хуки' },
          { key: 'interview', label: '🎯 Вопросы' },
        ]"
        :key="tab.key"
        :class="['tab', { active: activeTab === tab.key }]"
        @click="activeTab = tab.key as any"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Основы -->
    <template v-if="activeTab === 'basics'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📦 Что такое KeepAlive?</h3>
        </div>

        <div class="info-box">
          <span class="info-box-icon">💡</span>
          <div class="info-box-content">
            <div class="info-box-title">Абстрактный компонент</div>
            <p>
              KeepAlive — встроенный компонент Vue, который кэширует неактивные компоненты
              вместо их уничтожения. Состояние (ref, reactive) сохраняется.
              Не рендерит DOM-обёртку — это "абстрактный" компонент.
            </p>
          </div>
        </div>

        <CodeBlock :code="basicCode" language="html" title="Базовое использование" />
      </div>

      <!-- Live Demo -->
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎮 Live Demo: с кешем и без</h3>
        </div>

        <div style="display: flex; gap: 12px; margin-bottom: 16px; align-items: center">
          <label style="display: flex; align-items: center; gap: 8px; cursor: pointer">
            <input type="checkbox" v-model="keepAliveEnabled" />
            <span>KeepAlive {{ keepAliveEnabled ? 'ВКЛ' : 'ВЫКЛ' }}</span>
          </label>

          <div style="display: flex; gap: 8px; margin-left: auto">
            <button 
              :class="['btn', currentView === 'A' ? '' : 'btn-secondary']"
              @click="currentView = 'A'; addLog(keepAliveEnabled ? 'A activated (из кеша)' : 'A mounted (заново)')"
            >
              Компонент A
            </button>
            <button 
              :class="['btn', currentView === 'B' ? '' : 'btn-secondary']" 
              @click="currentView = 'B'; addLog(keepAliveEnabled ? 'B activated (из кеша)' : 'B mounted (заново)')"
            >
              Компонент B
            </button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px">
          <div style="padding: 20px; background: var(--bg-code); border-radius: 8px; border: 2px solid var(--accent-vue)">
            <template v-if="currentView === 'A'">
              <h4 style="margin-bottom: 12px">Компонент A</h4>
              <div style="display: flex; align-items: center; gap: 12px">
                <button class="btn btn-secondary" @click="counterA++">+1</button>
                <span style="font-size: 1.3rem; font-weight: 700; color: var(--accent-cyan)">{{ counterA }}</span>
              </div>
              <p style="margin-top: 8px; font-size: 0.8rem; color: var(--text-muted)">
                Увеличьте счётчик, переключитесь на B, вернитесь
              </p>
            </template>
            <template v-else>
              <h4 style="margin-bottom: 12px">Компонент B</h4>
              <div style="display: flex; align-items: center; gap: 12px">
                <button class="btn btn-secondary" @click="counterB++">+1</button>
                <span style="font-size: 1.3rem; font-weight: 700; color: var(--accent-orange)">{{ counterB }}</span>
              </div>
            </template>
          </div>

          <div style="padding: 16px; background: var(--bg-code); border-radius: 8px; max-height: 200px; overflow-y: auto">
            <h4 style="margin-bottom: 8px; font-size: 0.85rem">Лог событий</h4>
            <div v-for="(entry, i) in activationLog" :key="i" style="font-family: monospace; font-size: 0.8rem; padding: 3px 0; color: var(--text-secondary)">
              {{ entry }}
            </div>
            <div v-if="!activationLog.length" style="color: var(--text-muted); font-size: 0.85rem">
              Переключайте компоненты...
            </div>
          </div>
        </div>

        <div v-if="!keepAliveEnabled" class="info-box warning" style="margin-top: 16px">
          <span class="info-box-icon">⚠️</span>
          <div class="info-box-content">
            <p>Без KeepAlive счётчик сбросится при переключении!</p>
          </div>
        </div>
      </div>
    </template>

    <!-- Настройка -->
    <template v-if="activeTab === 'config'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔍 include / exclude</h3>
        </div>
        <CodeBlock :code="includeExcludeCode" language="html" title="Фильтрация компонентов" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">📊 max — ограничение кеша</h3>
        </div>
        <CodeBlock :code="maxCode" language="html" title="LRU стратегия" />
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔀 С router-view</h3>
        </div>
        <CodeBlock :code="routerViewCode" language="html" title="Кеширование маршрутов" />
      </div>
    </template>

    <!-- Хуки -->
    <template v-if="activeTab === 'hooks'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🔗 onActivated / onDeactivated</h3>
        </div>
        <CodeBlock :code="hooksCode" language="typescript" title="Lifecycle хуки KeepAlive" />

        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 8px">
          <h4>Порядок вызова хуков</h4>
          <div v-for="(item, i) in [
            { event: 'Первый рендер', hooks: 'setup → onBeforeMount → onMounted → onActivated', color: 'var(--accent-green)' },
            { event: 'Уход в кеш', hooks: 'onDeactivated (unmounted НЕ вызывается!)', color: 'var(--accent-orange)' },
            { event: 'Возврат из кеша', hooks: 'onActivated (mounted НЕ вызывается!)', color: 'var(--accent-cyan)' },
            { event: 'Полное удаление', hooks: 'onDeactivated → onBeforeUnmount → onUnmounted', color: 'var(--accent-red)' },
          ]" :key="i" :style="{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '12px', padding: '10px 14px', background: 'var(--bg-code)', borderRadius: '6px', borderLeft: `3px solid ${item.color}` }">
            <strong style="font-size: 0.85rem">{{ item.event }}</strong>
            <code style="font-size: 0.8rem; color: var(--text-secondary)">{{ item.hooks }}</code>
          </div>
        </div>
      </div>
    </template>

    <!-- Собеседование -->
    <template v-if="activeTab === 'interview'">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title">🎯 Вопросы для собеседования</h3>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px">
          <details v-for="(item, i) in interviewQuestions" :key="i" class="interview-question">
            <summary style="cursor: pointer; padding: 14px 16px; background: var(--bg-code); border-radius: 8px; font-weight: 600; font-size: 0.9rem">
              {{ item.q }}
            </summary>
            <div style="padding: 14px 16px; color: var(--text-secondary); line-height: 1.6; border-left: 3px solid var(--accent-vue); margin-left: 16px; margin-top: 8px">
              {{ item.a }}
            </div>
          </details>
        </div>
      </div>
    </template>
  </div>
</template>
