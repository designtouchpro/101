<script setup lang="ts">
import TodoDemo from '@/components/TodoDemo.vue'
import ReactivityVisualizer from '@/components/ReactivityVisualizer.vue'
import SortFilterDemo from '@/components/SortFilterDemo.vue'
import WatchSearchDemo from '@/components/WatchSearchDemo.vue'
import ColorPicker from '@/components/ColorPicker.vue'
import TransitionShowcase from '@/components/TransitionShowcase.vue'
import { ref, computed, watch } from 'vue'

// Color picker demo
const primaryColor = ref('#42b883')
const secondaryColor = ref('#35495e')

// Counter with animation
const counter = ref(0)
const isAnimating = ref(false)

const animateCounter = (target: number) => {
  isAnimating.value = true
  const step = target > counter.value ? 1 : -1
  const interval = setInterval(() => {
    counter.value += step
    if (counter.value === target) {
      clearInterval(interval)
      isAnimating.value = false
    }
  }, 30)
}

// Slider demo
const sliderValue = ref(50)
const sliderMin = ref(0)
const sliderMax = ref(100)

const sliderPercentage = computed(() => 
  ((sliderValue.value - sliderMin.value) / (sliderMax.value - sliderMin.value)) * 100
)

// Theme toggle
const isDark = ref(true)

// Form demo
const formData = ref({
  username: '',
  email: '',
  password: '',
  agreeToTerms: false
})

const isFormValid = computed(() => 
  formData.value.username.length >= 3 &&
  formData.value.email.includes('@') &&
  formData.value.password.length >= 6 &&
  formData.value.agreeToTerms
)

const passwordStrength = computed(() => {
  const len = formData.value.password.length
  if (len === 0) return { level: 0, text: '', color: '' }
  if (len < 4) return { level: 1, text: 'Слабый', color: '#ff6b6b' }
  if (len < 8) return { level: 2, text: 'Средний', color: '#ffd43b' }
  return { level: 3, text: 'Сильный', color: '#51cf66' }
})
</script>

<template>
  <div class="demo-container">
    <div class="demo-header">
      <h1>🎮 Интерактивные демо</h1>
      <p>Визуальные примеры работы реактивности Vue</p>
    </div>

    <!-- Reactivity Visualizer -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">⚡ Визуализация реактивности</h3>
        <span class="card-badge">ref & reactive</span>
      </div>
      
      <div class="info-box">
        <span class="info-box-icon">👀</span>
        <div class="info-box-content">
          <div class="info-box-title">Наблюдайте за изменениями</div>
          <p>
            Изменяйте значения и смотрите как Vue отслеживает каждое изменение.
            История показывает все реактивные обновления.
          </p>
        </div>
      </div>
      
      <ReactivityVisualizer />
    </div>

    <!-- Todo Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📝 Todo List</h3>
        <span class="card-badge">ref + computed</span>
      </div>
      
      <div class="info-box">
        <span class="info-box-icon">📋</span>
        <div class="info-box-content">
          <div class="info-box-title">Классический пример</div>
          <p>
            Демонстрирует ref для списка, computed для подсчёта, 
            TransitionGroup для анимаций.
          </p>
        </div>
      </div>
      
      <TodoDemo />
    </div>

    <!-- Sort & Filter Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🔍 Сортировка и фильтрация</h3>
        <span class="card-badge">computed</span>
      </div>
      
      <div class="info-box success">
        <span class="info-box-icon">🧮</span>
        <div class="info-box-content">
          <div class="info-box-title">Мощь computed</div>
          <p>
            computed автоматически пересчитывается при изменении сортировки, 
            фильтра или данных. Попробуйте проголосовать!
          </p>
        </div>
      </div>
      
      <SortFilterDemo />
    </div>

    <!-- Watch Search Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🔎 Поиск с debounce</h3>
        <span class="card-badge">watch</span>
      </div>
      
      <div class="info-box">
        <span class="info-box-icon">⏱️</span>
        <div class="info-box-content">
          <div class="info-box-title">watch в действии</div>
          <p>
            watch следит за изменениями поискового запроса и запускает 
            поиск с debounce. Измените задержку и посмотрите разницу.
          </p>
        </div>
      </div>
      
      <WatchSearchDemo />
    </div>

    <!-- Color Picker -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🎨 Цвета и computed</h3>
        <span class="card-badge">v-model + computed</span>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px">
        <div>
          <p style="color: var(--text-secondary); margin-bottom: 12px">Primary:</p>
          <ColorPicker v-model="primaryColor" />
        </div>
        <div>
          <p style="color: var(--text-secondary); margin-bottom: 12px">Secondary:</p>
          <ColorPicker v-model="secondaryColor" />
        </div>
      </div>
      
      <div 
        class="color-preview-box"
        :style="{ 
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
        }"
      >
        <span>Градиент из выбранных цветов</span>
      </div>
    </div>

    <!-- Form Validation Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">📋 Валидация формы</h3>
        <span class="card-badge">computed + v-model</span>
      </div>
      
      <div class="form-demo">
        <div class="form-group">
          <label>Имя пользователя</label>
          <input v-model="formData.username" placeholder="Минимум 3 символа" class="form-input" />
          <span class="validation-hint" :class="{ valid: formData.username.length >= 3 }">
            {{ formData.username.length >= 3 ? '✓' : `${formData.username.length}/3` }}
          </span>
        </div>
        
        <div class="form-group">
          <label>Email</label>
          <input v-model="formData.email" type="email" placeholder="example@mail.com" class="form-input" />
          <span class="validation-hint" :class="{ valid: formData.email.includes('@') }">
            {{ formData.email.includes('@') ? '✓' : 'Нужен @' }}
          </span>
        </div>
        
        <div class="form-group">
          <label>Пароль</label>
          <input v-model="formData.password" type="password" placeholder="Минимум 6 символов" class="form-input" />
          <div class="password-strength">
            <div class="strength-bar">
              <div 
                class="strength-fill"
                :style="{ 
                  width: (passwordStrength.level / 3 * 100) + '%',
                  backgroundColor: passwordStrength.color
                }"
              />
            </div>
            <span :style="{ color: passwordStrength.color }">{{ passwordStrength.text }}</span>
          </div>
        </div>
        
        <div class="form-group checkbox-group">
          <label>
            <input type="checkbox" v-model="formData.agreeToTerms" />
            Согласен с условиями
          </label>
        </div>
        
        <button 
          class="submit-btn"
          :class="{ valid: isFormValid }"
          :disabled="!isFormValid"
        >
          {{ isFormValid ? '✓ Отправить' : 'Заполните форму' }}
        </button>
      </div>
    </div>

    <!-- Animated Counter -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🔢 Анимированный счётчик</h3>
        <span class="card-badge">ref + watch</span>
      </div>
      
      <div class="counter-demo">
        <div class="counter-display" :class="{ animating: isAnimating }">
          {{ counter }}
        </div>
        <div class="counter-buttons">
          <button @click="animateCounter(counter - 10)" :disabled="isAnimating">-10</button>
          <button @click="animateCounter(counter - 1)" :disabled="isAnimating">-1</button>
          <button @click="counter = 0" :disabled="isAnimating">Reset</button>
          <button @click="animateCounter(counter + 1)" :disabled="isAnimating">+1</button>
          <button @click="animateCounter(counter + 10)" :disabled="isAnimating">+10</button>
        </div>
      </div>
    </div>

    <!-- Slider Demo -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🎚️ Интерактивный слайдер</h3>
        <span class="card-badge">v-model + computed</span>
      </div>
      
      <div class="slider-demo">
        <div class="slider-value-display">
          <span class="slider-value">{{ sliderValue }}</span>
          <span class="slider-percent">{{ sliderPercentage.toFixed(0) }}%</span>
        </div>
        
        <div class="slider-track">
          <div class="slider-fill" :style="{ width: sliderPercentage + '%' }" />
          <input 
            type="range" 
            v-model.number="sliderValue"
            :min="sliderMin"
            :max="sliderMax"
            class="slider-input"
          />
        </div>
        
        <div class="slider-labels">
          <span>{{ sliderMin }}</span>
          <span>{{ sliderMax }}</span>
        </div>
      </div>
    </div>

    <!-- Transition Showcase -->
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">🎭 Transition анимации</h3>
        <span class="card-badge">Transition & TransitionGroup</span>
      </div>
      
      <div class="info-box">
        <span class="info-box-icon">✨</span>
        <div class="info-box-content">
          <div class="info-box-title">Vue Transitions</div>
          <p>
            Vue предоставляет мощные компоненты для анимаций: Transition для одиночных элементов
            и TransitionGroup для списков.
          </p>
        </div>
      </div>
      
      <TransitionShowcase />
    </div>
  </div>
</template>

<style scoped>
.color-preview-box {
  margin-top: 20px;
  height: 100px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

/* Form Demo */
.form-demo {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-vue);
}

.validation-hint {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.validation-hint.valid {
  color: var(--accent-vue);
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.strength-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  border-radius: 3px;
  transition: all 0.3s;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.checkbox-group input {
  width: 18px;
  height: 18px;
  accent-color: var(--accent-vue);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: not-allowed;
  transition: all 0.3s;
}

.submit-btn.valid {
  background: var(--accent-vue);
  color: white;
  cursor: pointer;
}

.submit-btn.valid:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.3);
}

/* Counter Demo */
.counter-demo {
  text-align: center;
  padding: 24px;
  background: var(--bg-tertiary);
  border-radius: 12px;
}

.counter-display {
  font-size: 4rem;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  color: var(--accent-vue);
  transition: all 0.1s;
}

.counter-display.animating {
  color: var(--accent-orange);
}

.counter-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.counter-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.counter-buttons button:hover:not(:disabled) {
  background: var(--accent-vue);
  color: white;
}

.counter-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Slider Demo */
.slider-demo {
  padding: 24px;
  background: var(--bg-tertiary);
  border-radius: 12px;
}

.slider-value-display {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
}

.slider-value {
  font-size: 3rem;
  font-weight: 700;
  font-family: 'Fira Code', monospace;
  color: var(--accent-vue);
}

.slider-percent {
  font-size: 1.5rem;
  color: var(--text-secondary);
}

.slider-track {
  position: relative;
  height: 12px;
  background: var(--bg-secondary);
  border-radius: 6px;
  overflow: hidden;
}

.slider-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, var(--accent-vue), var(--accent-orange));
  border-radius: 6px;
  transition: width 0.1s;
}

.slider-input {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 20px;
  opacity: 0;
  cursor: pointer;
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 0.85rem;
}
</style>
