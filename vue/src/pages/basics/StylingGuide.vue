<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const scopedStylesCode = `<!-- ═══════════════════════════════════════════════════════════════
     🎨 Scoped Styles — стили только для этого компонента
     ═══════════════════════════════════════════════════════════════ -->

<template>
  <div class="container">
    <h1 class="title">Заголовок</h1>
    <p class="text">Текст</p>
  </div>
</template>

<style scoped>
/* Стили применяются ТОЛЬКО к этому компоненту */
.container {
  padding: 20px;
}

.title {
  color: #42b883;  /* Vue green */
}

.text {
  color: gray;
}
</style>

<!-- 
  Под капотом Vue добавляет уникальный атрибут:
  
  <div class="container" data-v-7ba5bd90>
    <h1 class="title" data-v-7ba5bd90>Заголовок</h1>
  </div>
  
  .title[data-v-7ba5bd90] { color: #42b883; }
-->`

const deepSelectorCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔽 Deep Selector — стилизация дочерних компонентов
     ═══════════════════════════════════════════════════════════════ -->

<template>
  <div class="parent">
    <ChildComponent />
  </div>
</template>

<style scoped>
.parent {
  /* Стили для родителя */
}

/* ─────────────────────────────────────────────────────────────
   :deep() — проникает в scoped стили дочерних компонентов
   ───────────────────────────────────────────────────────────── */
.parent :deep(.child-class) {
  color: red;  /* Применится к .child-class внутри ChildComponent */
}

/* Старый синтаксис (deprecated):
   .parent >>> .child-class
   .parent /deep/ .child-class
   .parent ::v-deep .child-class
*/
</style>`

const cssModulesCode = `<!-- ═══════════════════════════════════════════════════════════════
     📦 CSS Modules — автоматическая генерация уникальных классов
     ═══════════════════════════════════════════════════════════════ -->

<template>
  <!-- Доступ через $style -->
  <div :class="$style.container">
    <h1 :class="$style.title">Заголовок</h1>
    
    <!-- Несколько классов -->
    <p :class="[$style.text, $style.highlight]">Текст</p>
    
    <!-- Условные классы -->
    <button :class="{ [$style.active]: isActive }">Кнопка</button>
  </div>
</template>

<style module>
.container {
  padding: 20px;
}

.title {
  color: #42b883;
}

.text {
  font-size: 14px;
}

.highlight {
  background: yellow;
}

.active {
  border: 2px solid green;
}
</style>

<!-- 
  Результат: классы становятся уникальными
  .container → .container_abc123
  .title → .title_abc123
-->`

const bindingClassesCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔗 Динамическая привязка классов и стилей
     ═══════════════════════════════════════════════════════════════ -->

<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const fontSize = ref(16)
<\/script>

<template>
  <!-- ─────────────────────────────────────────────────────────────
       Объектный синтаксис для классов
       ───────────────────────────────────────────────────────────── -->
  <div :class="{ active: isActive, 'text-danger': hasError }">
    Класс 'active' добавится если isActive === true
  </div>

  <!-- Массив классов -->
  <div :class="[activeClass, { error: hasError }]">
    Комбинация строки и объекта
  </div>


  <!-- ─────────────────────────────────────────────────────────────
       Динамические инлайн стили
       ───────────────────────────────────────────────────────────── -->
  <div :style="{ color: 'red', fontSize: fontSize + 'px' }">
    Инлайн стили
  </div>

  <!-- camelCase автоматически конвертируется в kebab-case -->
  <div :style="{ backgroundColor: 'blue', marginTop: '10px' }">
    backgroundColor → background-color
  </div>

  <!-- Массив стилей (merge) -->
  <div :style="[baseStyles, overrideStyles]">
    Объединение стилей
  </div>
</template>`

const cssVarsCode = `<!-- ═══════════════════════════════════════════════════════════════
     🎨 CSS Variables с v-bind() — реактивные переменные в CSS
     ═══════════════════════════════════════════════════════════════ -->

<script setup>
import { ref } from 'vue'

const color = ref('#42b883')
const fontSize = ref(16)
const theme = ref({
  primary: '#42b883',
  secondary: '#35495e'
})
<\/script>

<template>
  <div class="box">
    <p class="text">Текст с реактивным цветом</p>
    <input type="color" v-model="color" />
    <input type="range" v-model="fontSize" min="12" max="32" />
  </div>
</template>

<style scoped>
.box {
  padding: 20px;
  border: 2px solid v-bind(color);  /* Реактивная привязка! */
}

.text {
  color: v-bind(color);
  font-size: v-bind(fontSize + 'px');
  
  /* Доступ к вложенным свойствам */
  background: v-bind('theme.secondary');
}
</style>

<!-- 
  При изменении color или fontSize:
  1. Vue обновляет CSS переменную
  2. Браузер автоматически применяет новые стили
  3. Никакого re-render компонента!
-->`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🎨 Стилизация в Vue</h1>
      <p>Scoped styles, CSS Modules и динамическая стилизация</p>
      <a 
        href="https://vuejs.org/api/sfc-css-features.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Scoped Styles -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Scoped Styles</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Изоляция стилей</div>
          <p>
            <code>&lt;style scoped&gt;</code> ограничивает стили текущим компонентом,
            предотвращая конфликты с другими компонентами.
          </p>
        </div>
      </div>

      <CodeBlock :code="scopedStylesCode" language="html" title="🔒 Scoped styles" />
    </div>

    <!-- Deep Selector -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">:deep() — стилизация дочерних компонентов</h3>
        <span class="card-badge">Продвинуто</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Используйте осторожно</div>
          <p>
            :deep() нарушает инкапсуляцию стилей. Используйте только когда 
            нет другого способа стилизовать сторонний компонент.
          </p>
        </div>
      </div>

      <CodeBlock :code="deepSelectorCode" language="html" title="🔽 Deep selector" />
    </div>

    <!-- CSS Modules -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">CSS Modules</h3>
        <span class="card-badge">Альтернатива</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">📦</span>
        <div class="info-box-content">
          <div class="info-box-title">Уникальные классы</div>
          <p>
            CSS Modules генерируют уникальные имена классов, гарантируя 
            отсутствие конфликтов. Доступ через <code>$style</code>.
          </p>
        </div>
      </div>

      <CodeBlock :code="cssModulesCode" language="html" title="📦 CSS Modules" />
    </div>

    <!-- Динамические классы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Динамические классы и стили</h3>
        <span class="card-badge">Практика</span>
      </div>

      <CodeBlock :code="bindingClassesCode" language="html" title="🔗 :class и :style" />
    </div>

    <!-- CSS Variables с v-bind -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">CSS переменные с v-bind()</h3>
        <span class="card-badge">Vue 3.2+</span>
      </div>

      <div class="info-box success">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">Реактивный CSS!</div>
          <p>
            v-bind() в &lt;style&gt; позволяет использовать реактивные переменные 
            прямо в CSS. Стили обновляются автоматически!
          </p>
        </div>
      </div>

      <CodeBlock :code="cssVarsCode" language="html" title="🎨 Реактивный CSS" />
    </div>

    <!-- Сравнительная таблица -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Сравнение подходов</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Подход</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Изоляция</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Динамика</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Когда использовать</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>scoped</code></td>
              <td style="padding: 12px">✅ Да</td>
              <td style="padding: 12px">⚠️ Ограниченно</td>
              <td style="padding: 12px">По умолчанию для компонентов</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>module</code></td>
              <td style="padding: 12px">✅ Полная</td>
              <td style="padding: 12px">✅ Через $style</td>
              <td style="padding: 12px">Библиотеки компонентов</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-bind()</code></td>
              <td style="padding: 12px">✅ Да</td>
              <td style="padding: 12px">✅ Полная</td>
              <td style="padding: 12px">Темы, настраиваемые компоненты</td>
            </tr>
            <tr>
              <td style="padding: 12px">Глобальные</td>
              <td style="padding: 12px">❌ Нет</td>
              <td style="padding: 12px">⚠️ Через JS</td>
              <td style="padding: 12px">Reset, базовые стили</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
