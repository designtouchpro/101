<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const defaultSlotCode = `<!-- ═══════════════════════════════════════════════════════════════
     🎰 Default Slot — слот по умолчанию
     ═══════════════════════════════════════════════════════════════ -->

<!-- Card.vue -->
<template>
  <div class="card">
    <div class="card-body">
      <!-- Контент от родителя вставится сюда -->
      <slot>
        <!-- Fallback контент, если слот пустой -->
        <p>Контент по умолчанию</p>
      </slot>
    </div>
  </div>
</template>


<!-- Parent.vue -->
<template>
  <!-- Использование слота -->
  <Card>
    <h2>Заголовок</h2>
    <p>Любой контент внутри компонента</p>
    <button>Кнопка</button>
  </Card>
  
  <!-- Без контента — покажется fallback -->
  <Card />
</template>`

const namedSlotsCode = `<!-- ═══════════════════════════════════════════════════════════════
     🏷️ Named Slots — именованные слоты
     ═══════════════════════════════════════════════════════════════ -->

<!-- Layout.vue -->
<template>
  <div class="layout">
    <header>
      <slot name="header">
        <h1>Default Header</h1>
      </slot>
    </header>
    
    <main>
      <slot>  <!-- default slot -->
        <p>Main content</p>
      </slot>
    </main>
    
    <footer>
      <slot name="footer">
        <p>Default Footer</p>
      </slot>
    </footer>
  </div>
</template>


<!-- Parent.vue -->
<template>
  <Layout>
    <!-- Способ 1: v-slot:name -->
    <template v-slot:header>
      <h1>Мой заголовок</h1>
    </template>
    
    <!-- Способ 2: #name (сокращение) -->
    <template #footer>
      <p>© 2024 Company</p>
    </template>
    
    <!-- Default slot — без template -->
    <p>Основной контент страницы</p>
    
    <!-- Или явно: -->
    <template #default>
      <p>Тоже основной контент</p>
    </template>
  </Layout>
</template>`

const scopedSlotsCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔗 Scoped Slots — слоты с данными
     ═══════════════════════════════════════════════════════════════ -->

<!-- List.vue -->
<script setup lang="ts">
defineProps<{
  items: { id: number; name: string }[]
}>()
<\/script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <!-- Передаём данные в слот -->
      <slot :item="item" :index="index">
        <!-- Fallback -->
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>


<!-- Parent.vue -->
<template>
  <!-- Получаем данные из слота -->
  <List :items="users">
    <template #default="{ item, index }">
      <div class="user-card">
        <span>{{ index + 1 }}.</span>
        <strong>{{ item.name }}</strong>
        <button @click="edit(item)">Edit</button>
      </div>
    </template>
  </List>
  
  <!-- Деструктуризация -->
  <List :items="users">
    <template #default="{ item: user }">
      <UserCard :user="user" />
    </template>
  </List>
</template>


<!-- ═══════════════════════════════════════════════════════════════
     🎯 Типичные use-cases для scoped slots:
     - Renderless компоненты (логика без UI)
     - Кастомизация рендеринга списков
     - Headless UI библиотеки
     ═══════════════════════════════════════════════════════════════ -->`

const renderlessCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔮 Renderless Component — логика без UI
     ═══════════════════════════════════════════════════════════════ -->

<!-- MouseTracker.vue -->
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

const update = (e: MouseEvent) => {
  x.value = e.pageX
  y.value = e.pageY
}

onMounted(() => window.addEventListener('mousemove', update))
onUnmounted(() => window.removeEventListener('mousemove', update))
<\/script>

<template>
  <!-- Компонент только передаёт данные, UI определяет родитель -->
  <slot :x="x" :y="y" />
</template>


<!-- Parent.vue -->
<template>
  <MouseTracker v-slot="{ x, y }">
    <!-- Полная свобода в рендеринге! -->
    <div class="tracker">
      Курсор: {{ x }}, {{ y }}
    </div>
  </MouseTracker>
  
  <!-- Или совсем другой UI -->
  <MouseTracker v-slot="{ x, y }">
    <div 
      class="follower"
      :style="{ transform: \`translate(\${x}px, \${y}px)\` }"
    />
  </MouseTracker>
</template>`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🎰 Slots</h1>
      <p>Композиция контента: default, named и scoped slots</p>
      <a 
        href="https://vuejs.org/guide/components/slots.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Default Slot -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Default Slot</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Что такое Slot?</div>
          <p>
            Slot — это "окно" в компоненте, куда родитель может вставить свой контент.
            Это основа для создания гибких, переиспользуемых компонентов.
          </p>
        </div>
      </div>

      <CodeBlock :code="defaultSlotCode" language="html" title="🎰 Default Slot" />
    </div>

    <!-- Named Slots -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Named Slots</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🏷️</span>
        <div class="info-box-content">
          <div class="info-box-title">Несколько слотов</div>
          <p>
            Именованные слоты позволяют определить несколько точек вставки контента 
            (header, footer, sidebar и т.д.)
          </p>
        </div>
      </div>

      <CodeBlock :code="namedSlotsCode" language="html" title="🏷️ Named Slots" />
    </div>

    <!-- Scoped Slots -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Scoped Slots</h3>
        <span class="card-badge">Мощь!</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">🔗</span>
        <div class="info-box-content">
          <div class="info-box-title">Слоты с данными</div>
          <p>
            Scoped slots позволяют дочернему компоненту передавать данные в слот,
            давая родителю полный контроль над рендерингом.
          </p>
        </div>
      </div>

      <CodeBlock :code="scopedSlotsCode" language="html" title="🔗 Scoped Slots" />
    </div>

    <!-- Renderless Component -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Renderless Components</h3>
        <span class="card-badge">Паттерн</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🔮</span>
        <div class="info-box-content">
          <div class="info-box-title">Логика без UI</div>
          <p>
            Renderless компоненты содержат только логику и передают данные через 
            scoped slot. Родитель полностью определяет UI.
          </p>
        </div>
      </div>

      <CodeBlock :code="renderlessCode" language="html" title="🔮 Renderless Pattern" />
    </div>

    <!-- Шпаргалка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Шпаргалка по слотам</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Тип</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Синтаксис</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Use Case</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Default</td>
              <td style="padding: 12px"><code>&lt;slot /&gt;</code></td>
              <td style="padding: 12px">Простая вставка контента</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Named</td>
              <td style="padding: 12px"><code>&lt;slot name="header" /&gt;</code></td>
              <td style="padding: 12px">Layouts, несколько зон</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px">Scoped</td>
              <td style="padding: 12px"><code>&lt;slot :item="item" /&gt;</code></td>
              <td style="padding: 12px">Кастомный рендеринг с данными</td>
            </tr>
            <tr>
              <td style="padding: 12px">Fallback</td>
              <td style="padding: 12px"><code>&lt;slot&gt;Default&lt;/slot&gt;</code></td>
              <td style="padding: 12px">Контент по умолчанию</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
