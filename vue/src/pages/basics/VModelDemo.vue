<script setup lang="ts">
import { ref, computed } from 'vue'
import CodeBlock from '@/components/CodeBlock.vue'

// ====== Живые демо ======
const textValue = ref('')
const numberValue = ref(0)
const checked = ref(false)
const picked = ref('one')
const selected = ref('vue')
const multiSelected = ref<string[]>([])
const lazyValue = ref('')
const trimmedValue = ref('')

// Множественные модели
const firstName = ref('Иван')
const lastName = ref('Иванов')

// Custom component model
const rating = ref(3)

// defineModel
const searchQuery = ref('')
const isActive = ref(true)

// Computed v-model
const fullName = computed({
  get: () => `${firstName.value} ${lastName.value}`,
  set: (val: string) => {
    const parts = val.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts.slice(1).join(' ') || ''
  }
})

// ====== Код-примеры ======

const basicCode = `<template>
  <!-- Текстовый инпут -->
  <input v-model="message" />
  <!-- Эквивалент: -->
  <input :value="message" @input="message = $event.target.value" />

  <!-- Textarea -->
  <textarea v-model="bio"></textarea>

  <!-- Checkbox (boolean) -->
  <input type="checkbox" v-model="agreed" />

  <!-- Radio -->
  <input type="radio" v-model="picked" value="a" />
  <input type="radio" v-model="picked" value="b" />

  <!-- Select -->
  <select v-model="city">
    <option value="msk">Москва</option>
    <option value="spb">Санкт-Петербург</option>
  </select>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')
const bio = ref('')
const agreed = ref(false)
const picked = ref('a')
const city = ref('msk')
<\/script>`

const modifiersCode = `<template>
  <!-- .lazy — обновление по change, не по input -->
  <input v-model.lazy="searchQuery" />
  <!-- Эквивалент: -->
  <input :value="searchQuery" @change="searchQuery = $event.target.value" />

  <!-- .number — автокаст к числу -->
  <input v-model.number="age" type="text" />
  <!-- parseFloat($event.target.value) -->

  <!-- .trim — убирает пробелы по краям -->
  <input v-model.trim="username" />

  <!-- Комбинирование модификаторов -->
  <input v-model.lazy.trim="comment" />
</template>`

const componentModelOldCode = `<!-- Vue 3.3 и ранее — через props + emits -->

<!-- ParentComponent.vue -->
<template>
  <CustomInput v-model="search" />
  <!-- Раскрывается в: -->
  <CustomInput 
    :modelValue="search" 
    @update:modelValue="search = $event" 
  />
</template>

<!-- CustomInput.vue -->
<script setup>
const props = defineProps({
  modelValue: String
})
const emit = defineEmits(['update:modelValue'])

function onInput(e) {
  emit('update:modelValue', e.target.value)
}
<\/script>

<template>
  <input :value="modelValue" @input="onInput" />
</template>`

const defineModelCode = `<!-- Vue 3.4+ — defineModel() 🔥 -->

<!-- CustomInput.vue -->
<script setup>
// Автоматически создаёт prop + emit
const model = defineModel<string>()

// С дефолтным значением
const model = defineModel<string>({ default: '' })

// С валидацией
const model = defineModel<number>({
  required: true,
  validator: (v) => v >= 0
})
<\/script>

<template>
  <!-- model — это ref, можно мутировать напрямую! -->
  <input v-model="model" />

  <!-- или программно -->
  <button @click="model = ''">Очистить</button>
</template>

<!-- Родитель — без изменений -->
<template>
  <CustomInput v-model="searchQuery" />
</template>`

const namedModelsCode = `<!-- Именованные модели (v-model:xxx) -->

<!-- Родитель -->
<template>
  <UserForm
    v-model:first-name="first"
    v-model:last-name="last"
    v-model:email="email"
  />
</template>

<!-- UserForm.vue (Vue 3.3 и ранее) -->
<script setup>
defineProps({
  firstName: String,
  lastName: String,
  email: String
})
defineEmits([
  'update:firstName',
  'update:lastName', 
  'update:email'
])
<\/script>

<!-- UserForm.vue (Vue 3.4+ с defineModel) -->
<script setup>
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
const email = defineModel<string>('email')
<\/script>

<template>
  <input v-model="firstName" placeholder="Имя" />
  <input v-model="lastName" placeholder="Фамилия" />
  <input v-model="email" placeholder="Email" />
</template>`

const customModifiersCode = `<!-- Кастомные модификаторы -->

<!-- Родитель -->
<template>
  <MyInput v-model.capitalize="text" />
  <MyInput v-model.uppercase.trim="text2" />
</template>

<!-- MyInput.vue -->
<script setup>
const [model, modifiers] = defineModel<string>({
  // Трансформеры: get/set для модификаторов
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    if (modifiers.uppercase) {
      return value.toUpperCase()
    }
    return value
  }
})
<\/script>

<template>
  <input v-model="model" />
</template>

<!-- Для именованных моделей -->
<script setup>
const [title, titleModifiers] = defineModel<string>('title', {
  set(value) {
    if (titleModifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
<\/script>`

const computedModelCode = `<!-- Computed v-model (паттерн прокси) -->

<script setup>
import { computed } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// Writable computed как прокси для v-model
const proxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
<\/script>

<template>
  <!-- Используем computed ref как модель -->
  <input v-model="proxy" />
</template>

<!-- ============================== -->
<!-- Разбиение на части (fullName ↔ first + last) -->

<script setup>
import { ref, computed } from 'vue'

const firstName = ref('Иван')
const lastName = ref('Иванов')

const fullName = computed({
  get: () => \`\${firstName.value} \${lastName.value}\`,
  set: (val) => {
    const parts = val.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts.slice(1).join(' ') || ''
  }
})
<\/script>

<template>
  <input v-model="fullName" />
  <!-- Меняем fullName → автоматически firstName и lastName -->
</template>`

const v2vsv3Code = `<!-- Миграция с Vue 2 на Vue 3 -->

<!-- Vue 2: .sync модификатор (удалён в Vue 3) -->
<MyComp :title.sync="pageTitle" />
<!-- ↓ В Vue 3 стало: -->
<MyComp v-model:title="pageTitle" />

<!-- Vue 2: v-model использовал value/input -->
<input v-model="msg" />
<!-- = <input :value="msg" @input="msg = $event"> -->

<!-- Vue 3: v-model использует modelValue/update:modelValue -->
<CustomInput v-model="msg" />
<!-- = <CustomInput :modelValue="msg" @update:modelValue="msg = $event"> -->

<!-- Vue 2: Только ОДИН v-model на компонент -->
<!-- Vue 3: Сколько угодно именованных v-model -->
<UserForm
  v-model:first-name="first"
  v-model:last-name="last"
  v-model:age="age"
/>`

const patternCode = `<!-- Продвинутые паттерны -->

<!-- 1. v-model + debounce (через composable) -->
<script setup>
import { ref, watch } from 'vue'

function useDebouncedModel(initial, delay = 300) {
  const inner = ref(initial)
  const debounced = ref(initial)
  let timer

  watch(inner, (val) => {
    clearTimeout(timer)
    timer = setTimeout(() => debounced.value = val, delay)
  })

  return { inner, debounced }
}

const { inner: searchInput, debounced: searchQuery } = useDebouncedModel('')
<\/script>

<!-- 2. v-model на массиве чекбоксов -->
<script setup>
const selectedFruits = ref<string[]>([])
<\/script>
<template>
  <label v-for="fruit in ['🍎', '🍌', '🍇']">
    <input type="checkbox" v-model="selectedFruits" :value="fruit" />
    {{ fruit }}
  </label>
  <!-- selectedFruits = ['🍎', '🍇'] -->
</template>

<!-- 3. v-model с объектом (spread-паттерн) -->
<script setup>
const form = ref({ name: '', email: '', age: 0 })
<\/script>
<template>
  <FormFields v-model="form" />
</template>

<!-- FormFields.vue -->
<script setup>
const model = defineModel<{ name: string; email: string; age: number }>()
<\/script>
<template>
  <input v-model="model.name" />
  <input v-model="model.email" />
  <input v-model.number="model.age" />
</template>`

const interviewQuestions = [
  {
    q: 'Что делает v-model под капотом?',
    a: 'На нативных элементах: :value + @input (или :checked + @change для чекбоксов). На компонентах: :modelValue + @update:modelValue'
  },
  {
    q: 'Как передать несколько v-model в один компонент?',
    a: 'Через именованные модели: v-model:firstName="first" v-model:lastName="last". Каждая создаёт свою пару prop/emit'
  },
  {
    q: 'Что такое defineModel() и зачем он нужен?',
    a: 'Макрос из Vue 3.4+. Автоматически создаёт prop и emit, возвращает ref, который можно мутировать напрямую. Убирает бойлерплейт'
  },
  {
    q: 'Чем .lazy отличается от обычного v-model?',
    a: '.lazy слушает событие change вместо input — значение обновляется при потере фокуса, а не при каждом нажатии клавиши'
  },
  {
    q: 'Как сделать writable computed для v-model?',
    a: 'computed({ get: () => props.modelValue, set: (val) => emit("update:modelValue", val) }) — паттерн прокси для трансформации данных'
  },
  {
    q: 'Что изменилось в v-model между Vue 2 и Vue 3?',
    a: 'Vue 2: value/input, один v-model, .sync для доп. привязок. Vue 3: modelValue/update:modelValue, множественные v-model, .sync удалён'
  }
]
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🔗 v-model — двусторонняя привязка</h1>
      <p>Полный гайд: от базового использования до defineModel() и кастомных модификаторов</p>
      <a href="https://vuejs.org/guide/components/v-model.html" target="_blank" rel="noopener noreferrer" class="docs-link">
        📚 Документация Vue — v-model
      </a>
    </div>

    <!-- Базовое использование -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Базовый v-model</h3>
        <span class="card-badge">Основы</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">💡</span>
        <div class="info-box-content">
          <div class="info-box-title">v-model = синтаксический сахар</div>
          <p><code>v-model</code> — это сокращение для <code>:value</code> + <code>@input</code> на нативных элементах. На компонентах — <code>:modelValue</code> + <code>@update:modelValue</code></p>
        </div>
      </div>

      <CodeBlock :code="basicCode" language="html" title="📝 Все варианты нативного v-model" />

      <!-- Живые демо -->
      <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
        <h4 style="margin: 0 0 12px; color: #4fc08d;">▶ Попробуй сам</h4>
        
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Text:</label>
            <input v-model="textValue" placeholder="Введи текст..." style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
            <code style="color: #4fc08d; font-size: 13px;">{{ textValue || '""' }}</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Number:</label>
            <input v-model.number="numberValue" type="number" style="width: 100px; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
            <code style="color: #4fc08d; font-size: 13px;">{{ numberValue }} ({{ typeof numberValue }})</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Checkbox:</label>
            <input v-model="checked" type="checkbox" />
            <code style="color: #4fc08d; font-size: 13px;">{{ checked }}</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Radio:</label>
            <label><input v-model="picked" type="radio" value="one" /> One</label>
            <label><input v-model="picked" type="radio" value="two" /> Two</label>
            <code style="color: #4fc08d; font-size: 13px;">{{ picked }}</code>
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Select:</label>
            <select v-model="selected" style="padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;">
              <option value="vue">Vue</option>
              <option value="react">React</option>
              <option value="angular">Angular</option>
            </select>
            <code style="color: #4fc08d; font-size: 13px;">{{ selected }}</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Модификаторы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Встроенные модификаторы</h3>
        <span class="card-badge badge-warning">.lazy .number .trim</span>
      </div>

      <CodeBlock :code="modifiersCode" language="html" title="⚙️ Модификаторы v-model" />

      <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
        <h4 style="margin: 0 0 12px; color: #4fc08d;">▶ Сравни .lazy vs обычный</h4>
        
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 100px; color: #999;">.lazy:</label>
            <input v-model.lazy="lazyValue" placeholder="Обновится при blur..." style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
            <code style="color: #e5c07b; font-size: 13px;">{{ lazyValue || '""' }}</code>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 100px; color: #999;">.trim:</label>
            <input v-model.trim="trimmedValue" placeholder="  пробелы  убираются  " style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
            <code style="color: #e5c07b; font-size: 13px;">"{{ trimmedValue }}" (len: {{ trimmedValue.length }})</code>
          </div>
        </div>
      </div>
    </div>

    <!-- v-model на компонентах (старый способ) -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">v-model на компонентах</h3>
        <span class="card-badge">Props + Emits</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">⚠️</span>
        <div class="info-box-content">
          <div class="info-box-title">Старый способ (Vue 3.0—3.3)</div>
          <p>Работает, но многословно. В Vue 3.4+ используйте <code>defineModel()</code> вместо этого</p>
        </div>
      </div>

      <CodeBlock :code="componentModelOldCode" language="html" title="📦 v-model через props/emits" />
    </div>

    <!-- defineModel -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">defineModel() — Vue 3.4+</h3>
        <span class="card-badge badge-success">🔥 Рекомендуется</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🚀</span>
        <div class="info-box-content">
          <div class="info-box-title">Макрос-убийца бойлерплейта</div>
          <p><code>defineModel()</code> автоматически создаёт prop + emit и возвращает <code>ref</code>, который можно мутировать напрямую. Никаких <code>defineProps</code>/<code>defineEmits</code> вручную!</p>
        </div>
      </div>

      <CodeBlock :code="defineModelCode" language="html" title="✨ defineModel() — чистый синтаксис" />
    </div>

    <!-- Множественные модели -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Множественные v-model</h3>
        <span class="card-badge badge-info">v-model:xxx</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🎯</span>
        <div class="info-box-content">
          <div class="info-box-title">Сколько угодно моделей!</div>
          <p>В Vue 3 можно передать сколько угодно именованных <code>v-model</code> в один компонент. Каждый создаёт свою пару prop/emit</p>
        </div>
      </div>

      <CodeBlock :code="namedModelsCode" language="html" title="👥 Несколько v-model на одном компоненте" />

      <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
        <h4 style="margin: 0 0 12px; color: #4fc08d;">▶ Живой пример: два связанных поля</h4>
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Имя:</label>
            <input v-model="firstName" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 80px; color: #999;">Фамилия:</label>
            <input v-model="lastName" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
          </div>
          <div style="padding: 8px 12px; background: rgba(79, 192, 141, 0.1); border-radius: 6px; color: #4fc08d; font-family: monospace; font-size: 14px;">
            v-model:first-name = "{{ firstName }}" | v-model:last-name = "{{ lastName }}"
          </div>
        </div>
      </div>
    </div>

    <!-- Кастомные модификаторы -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Кастомные модификаторы</h3>
        <span class="card-badge badge-warning">Продвинутое</span>
      </div>

      <CodeBlock :code="customModifiersCode" language="html" title="🔧 Создание своих модификаторов" />
    </div>

    <!-- Computed v-model -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Computed v-model (Writable computed)</h3>
        <span class="card-badge badge-info">Паттерн</span>
      </div>

      <div class="info-box">
        <span class="info-box-icon">🧠</span>
        <div class="info-box-content">
          <div class="info-box-title">Writable computed — часто на собесе!</div>
          <p>Позволяет создать <code>v-model</code> из трансформированных данных. Классический пример: <code>fullName</code> из <code>firstName</code> + <code>lastName</code></p>
        </div>
      </div>

      <CodeBlock :code="computedModelCode" language="html" title="🔄 Writable computed для v-model" />

      <div style="margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
        <h4 style="margin: 0 0 12px; color: #4fc08d;">▶ Попробуй: измени fullName</h4>
        <div style="display: grid; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <label style="min-width: 100px; color: #999;">fullName:</label>
            <input v-model="fullName" style="flex: 1; padding: 6px 10px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; color: #e0e0e0;" />
          </div>
          <div style="display: flex; gap: 16px;">
            <code style="color: #e5c07b;">firstName: "{{ firstName }}"</code>
            <code style="color: #e5c07b;">lastName: "{{ lastName }}"</code>
          </div>
        </div>
      </div>
    </div>

    <!-- Vue 2 vs Vue 3 -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Vue 2 → Vue 3: что изменилось</h3>
        <span class="card-badge">Миграция</span>
      </div>

      <div class="info-box warning">
        <span class="info-box-icon">🔄</span>
        <div class="info-box-content">
          <div class="info-box-title">Breaking changes</div>
          <p><code>.sync</code> удалён, <code>value</code>/<code>input</code> заменены на <code>modelValue</code>/<code>update:modelValue</code>, добавлены множественные модели</p>
        </div>
      </div>

      <CodeBlock :code="v2vsv3Code" language="html" title="🔀 Сравнение Vue 2 и Vue 3" />
    </div>

    <!-- Продвинутые паттерны -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Продвинутые паттерны</h3>
        <span class="card-badge badge-success">Бонус</span>
      </div>
      
      <CodeBlock :code="patternCode" language="html" title="🎯 Debounce, массив чекбоксов, объект-модель" />
    </div>

    <!-- Вопросы на собесе -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">❓ Вопросы на собеседовании</h3>
        <span class="card-badge badge-warning">Interview</span>
      </div>

      <div v-for="(item, i) in interviewQuestions" :key="i" style="padding: 12px 16px; margin-bottom: 8px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 3px solid #4fc08d;">
        <div style="font-weight: 600; color: #e0e0e0; margin-bottom: 6px;">{{ item.q }}</div>
        <div style="color: #999; font-size: 14px; line-height: 1.5;">{{ item.a }}</div>
      </div>
    </div>

    <!-- Шпаргалка -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Шпаргалка</h3>
        <span class="card-badge">Cheatsheet</span>
      </div>

      <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <thead>
            <tr style="border-bottom: 2px solid rgba(255,255,255,0.1);">
              <th style="text-align: left; padding: 10px 12px; color: #4fc08d;">Синтаксис</th>
              <th style="text-align: left; padding: 10px 12px; color: #4fc08d;">Что делает</th>
              <th style="text-align: left; padding: 10px 12px; color: #4fc08d;">Vue</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">v-model="x"</td>
              <td style="padding: 8px 12px; color: #ccc;">Базовая двусторонняя привязка</td>
              <td style="padding: 8px 12px; color: #999;">2+</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">v-model.lazy</td>
              <td style="padding: 8px 12px; color: #ccc;">@change вместо @input</td>
              <td style="padding: 8px 12px; color: #999;">2+</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">v-model.number</td>
              <td style="padding: 8px 12px; color: #ccc;">Auto parseFloat</td>
              <td style="padding: 8px 12px; color: #999;">2+</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">v-model.trim</td>
              <td style="padding: 8px 12px; color: #ccc;">Убирает пробелы</td>
              <td style="padding: 8px 12px; color: #999;">2+</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">v-model:title="x"</td>
              <td style="padding: 8px 12px; color: #ccc;">Именованная модель</td>
              <td style="padding: 8px 12px; color: #999;">3+</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">defineModel()</td>
              <td style="padding: 8px 12px; color: #ccc;">Авто prop+emit ref</td>
              <td style="padding: 8px 12px; color: #999;">3.4+</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-family: monospace; color: #e5c07b;">defineModel('name')</td>
              <td style="padding: 8px 12px; color: #ccc;">Именованный defineModel</td>
              <td style="padding: 8px 12px; color: #999;">3.4+</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
