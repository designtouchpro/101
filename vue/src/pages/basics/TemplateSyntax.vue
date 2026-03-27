<script setup lang="ts">
import CodeBlock from '@/components/CodeBlock.vue'

const templateSyntaxCode = `<!-- ═══════════════════════════════════════════════════════════════
     📝 Vue Template Syntax — основы
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     Интерполяция текста: {{ }}
     ───────────────────────────────────────────────────────────── -->
<p>Привет, {{ name }}!</p>
<p>Сумма: {{ 1 + 2 + 3 }}</p>
<p>{{ message.split('').reverse().join('') }}</p>


<!-- ─────────────────────────────────────────────────────────────
     v-bind — привязка атрибутов
     ───────────────────────────────────────────────────────────── -->
<img v-bind:src="imageUrl" />
<img :src="imageUrl" />          <!-- Сокращённая форма -->

<button :disabled="isLoading">Отправить</button>
<div :class="{ active: isActive, 'text-danger': hasError }"></div>
<div :style="{ color: textColor, fontSize: fontSize + 'px' }"></div>


<!-- ─────────────────────────────────────────────────────────────
     v-on — обработка событий
     ───────────────────────────────────────────────────────────── -->
<button v-on:click="handleClick">Клик</button>
<button @click="handleClick">Клик</button>  <!-- Сокращённая форма -->

<button @click="count++">+1</button>        <!-- Inline expression -->
<input @keyup.enter="submit" />             <!-- Модификатор .enter -->
<form @submit.prevent="onSubmit">           <!-- .prevent = preventDefault -->


<!-- ─────────────────────────────────────────────────────────────
     v-model — двусторонняя привязка
     ───────────────────────────────────────────────────────────── -->
<input v-model="message" />
<textarea v-model="text"></textarea>
<input type="checkbox" v-model="checked" />
<select v-model="selected">
  <option value="a">A</option>
  <option value="b">B</option>
</select>

<!-- Модификаторы -->
<input v-model.trim="name" />               <!-- Убирает пробелы -->
<input v-model.number="age" type="number" /> <!-- Конвертирует в число -->
<input v-model.lazy="message" />            <!-- sync по blur, не input -->`

const conditionalCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔀 Условный рендеринг
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     v-if / v-else-if / v-else
     Элемент добавляется/удаляется из DOM
     ───────────────────────────────────────────────────────────── -->
<div v-if="type === 'A'">Тип A</div>
<div v-else-if="type === 'B'">Тип B</div>
<div v-else>Другой тип</div>

<!-- template для группировки без wrapper элемента -->
<template v-if="show">
  <h1>Заголовок</h1>
  <p>Параграф 1</p>
  <p>Параграф 2</p>
</template>


<!-- ─────────────────────────────────────────────────────────────
     v-show — переключение visibility
     Элемент всегда в DOM, меняется display: none
     ───────────────────────────────────────────────────────────── -->
<div v-show="isVisible">Виден через v-show</div>


<!-- ═══════════════════════════════════════════════════════════════
     🎯 v-if vs v-show
     ═══════════════════════════════════════════════════════════════
     v-if:
       - Ленивый: не рендерит до true
       - Дорогое переключение
       - ✅ Используйте для редко меняющихся условий
     
     v-show:
       - Всегда рендерит
       - Дешёвое переключение (только CSS)
       - ✅ Используйте для частых переключений
     ═══════════════════════════════════════════════════════════════ -->`

const loopsCode = `<!-- ═══════════════════════════════════════════════════════════════
     🔄 Списки и циклы — v-for
     ═══════════════════════════════════════════════════════════════ -->

<!-- ─────────────────────────────────────────────────────────────
     Базовый v-for с массивом
     ───────────────────────────────────────────────────────────── -->
<ul>
  <li v-for="item in items" :key="item.id">
    {{ item.name }}
  </li>
</ul>

<!-- С индексом -->
<li v-for="(item, index) in items" :key="item.id">
  {{ index }}: {{ item.name }}
</li>


<!-- ─────────────────────────────────────────────────────────────
     v-for с объектом
     ───────────────────────────────────────────────────────────── -->
<div v-for="(value, key) in object" :key="key">
  {{ key }}: {{ value }}
</div>

<div v-for="(value, key, index) in object" :key="key">
  {{ index }}. {{ key }}: {{ value }}
</div>


<!-- ─────────────────────────────────────────────────────────────
     v-for с диапазоном чисел
     ───────────────────────────────────────────────────────────── -->
<span v-for="n in 10" :key="n">{{ n }}</span>  <!-- 1, 2, 3... 10 -->


<!-- ═══════════════════════════════════════════════════════════════
     ⚠️ ВАЖНО: :key обязателен!
     ═══════════════════════════════════════════════════════════════
     - Используйте уникальный идентификатор (id, не index!)
     - key помогает Vue эффективно обновлять DOM
     - Без key Vue использует "in-place patch" (может быть баг с state)
     ═══════════════════════════════════════════════════════════════ -->

<!-- ❌ Плохо: index как key -->
<li v-for="(item, index) in items" :key="index">

<!-- ✅ Хорошо: уникальный id -->
<li v-for="item in items" :key="item.id">`
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>📝 Template Syntax</h1>
      <p>Основы синтаксиса шаблонов Vue</p>
      <a 
        href="https://vuejs.org/guide/essentials/template-syntax.html" 
        target="_blank" 
        rel="noopener noreferrer"
        class="docs-link"
      >
        📚 Документация Vue
      </a>
    </div>

    <!-- Основы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Базовый синтаксис</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">Template в Vue</div>
          <p>
            Vue использует HTML-подобный синтаксис шаблонов с директивами (v-bind, v-on, v-model) 
            и интерполяцией {{ }} для связи данных с DOM.
          </p>
        </div>
      </div>

      <CodeBlock :code="templateSyntaxCode" language="html" title="📝 Основы синтаксиса" />
    </div>

    <!-- Условный рендеринг -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Условный рендеринг</h3>
        <span class="card-badge">v-if / v-show</span>
      </div>

      <CodeBlock :code="conditionalCode" language="html" title="🔀 v-if и v-show" />
    </div>

    <!-- Списки -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Списки и циклы</h3>
        <span class="card-badge">v-for</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Всегда используйте :key!</div>
          <p>
            key должен быть уникальным идентификатором (id), а не индексом массива.
            Это критично для корректного обновления DOM.
          </p>
        </div>
      </div>

      <CodeBlock :code="loopsCode" language="html" title="🔄 v-for" />
    </div>

    <!-- Шпаргалка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Шпаргалка по директивам</h3>
        <span class="card-badge">Справочник</span>
      </div>

      <div style="overflow-x: auto">
        <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem">
          <thead>
            <tr style="border-bottom: 2px solid var(--border-color)">
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Директива</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Сокращение</th>
              <th style="text-align: left; padding: 12px; color: var(--text-secondary)">Назначение</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-bind:attr</code></td>
              <td style="padding: 12px"><code>:attr</code></td>
              <td style="padding: 12px">Привязка атрибутов</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-on:event</code></td>
              <td style="padding: 12px"><code>@event</code></td>
              <td style="padding: 12px">Обработка событий</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-model</code></td>
              <td style="padding: 12px">—</td>
              <td style="padding: 12px">Двусторонняя привязка</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-if / v-else</code></td>
              <td style="padding: 12px">—</td>
              <td style="padding: 12px">Условный рендеринг</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-show</code></td>
              <td style="padding: 12px">—</td>
              <td style="padding: 12px">CSS visibility toggle</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-for</code></td>
              <td style="padding: 12px">—</td>
              <td style="padding: 12px">Рендеринг списков</td>
            </tr>
            <tr style="border-bottom: 1px solid var(--border-color)">
              <td style="padding: 12px"><code>v-slot</code></td>
              <td style="padding: 12px"><code>#name</code></td>
              <td style="padding: 12px">Именованные слоты</td>
            </tr>
            <tr>
              <td style="padding: 12px"><code>v-html</code></td>
              <td style="padding: 12px">—</td>
              <td style="padding: 12px">Вставка HTML (осторожно!)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
