import { useState, useRef, useEffect } from 'react'

export default function FormsValidation() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    website: '',
    phone: ''
  })
  const [validationState, setValidationState] = useState<Record<string, { valid: boolean; message: string }>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const customInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Проверяем валидность через Constraint Validation API
    const validity = e.target.validity
    const validationMessage = e.target.validationMessage
    
    setValidationState(prev => ({
      ...prev,
      [name]: {
        valid: validity.valid,
        message: validationMessage
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formRef.current?.checkValidity()) {
      alert('✅ Форма валидна!')
    } else {
      formRef.current?.reportValidity()
    }
  }

  // Кастомная валидация через setCustomValidity
  useEffect(() => {
    const input = customInputRef.current
    if (input) {
      const value = input.value
      if (value && !value.startsWith('@')) {
        input.setCustomValidity('Username должен начинаться с @')
      } else if (value && value.length < 4) {
        input.setCustomValidity('Минимум 4 символа включая @')
      } else {
        input.setCustomValidity('')
      }
    }
  }, [formData.username])

  return (
    <div className="page-container">
      <h1>✅ Валидация форм</h1>
      <p className="page-description">
        Нативная HTML5 валидация и Constraint Validation API. 
        Без библиотек, без JavaScript (почти).
      </p>

      {/* Validation Attributes */}
      <div className="card">
        <h2>🏷️ Атрибуты валидации</h2>
        
        <div className="attributes-grid">
          <div className="attr-item">
            <code>required</code>
            <span>Поле обязательно</span>
          </div>
          <div className="attr-item">
            <code>minlength / maxlength</code>
            <span>Длина текста</span>
          </div>
          <div className="attr-item">
            <code>min / max</code>
            <span>Диапазон чисел/дат</span>
          </div>
          <div className="attr-item">
            <code>pattern</code>
            <span>Regex паттерн</span>
          </div>
          <div className="attr-item">
            <code>type="email"</code>
            <span>Формат email</span>
          </div>
          <div className="attr-item">
            <code>type="url"</code>
            <span>Формат URL</span>
          </div>
          <div className="attr-item">
            <code>step</code>
            <span>Шаг для чисел</span>
          </div>
          <div className="attr-item">
            <code>multiple</code>
            <span>Несколько значений</span>
          </div>
        </div>
      </div>

      {/* Interactive Form */}
      <div className="card">
        <h2>🧪 Интерактивная форма</h2>
        <p>Попробуйте ввести некорректные данные:</p>
        
        <form ref={formRef} onSubmit={handleSubmit} className="validation-form" noValidate>
          <div className="form-field">
            <label>
              Username (начинается с @, мин 4 символа)
              <input
                ref={customInputRef}
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                placeholder="@username"
              />
            </label>
            <div className={`validation-status ${validationState.username?.valid === false ? 'invalid' : validationState.username?.valid ? 'valid' : ''}`}>
              {validationState.username?.message || (validationState.username?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input required> + setCustomValidity()`}</code>
          </div>

          <div className="form-field">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="user@example.com"
              />
            </label>
            <div className={`validation-status ${validationState.email?.valid === false ? 'invalid' : validationState.email?.valid ? 'valid' : ''}`}>
              {validationState.email?.message || (validationState.email?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input type="email" required>`}</code>
          </div>

          <div className="form-field">
            <label>
              Пароль (8-20 символов, буквы и цифры)
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                maxLength={20}
                pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                title="Минимум 8 символов, хотя бы одна буква и цифра"
                placeholder="••••••••"
              />
            </label>
            <div className={`validation-status ${validationState.password?.valid === false ? 'invalid' : validationState.password?.valid ? 'valid' : ''}`}>
              {validationState.password?.message || (validationState.password?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input pattern="..." minlength="8" maxlength="20">`}</code>
          </div>

          <div className="form-field">
            <label>
              Возраст (18-120)
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min={18}
                max={120}
                placeholder="25"
              />
            </label>
            <div className={`validation-status ${validationState.age?.valid === false ? 'invalid' : validationState.age?.valid ? 'valid' : ''}`}>
              {validationState.age?.message || (validationState.age?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input type="number" min="18" max="120">`}</code>
          </div>

          <div className="form-field">
            <label>
              Вебсайт
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
              />
            </label>
            <div className={`validation-status ${validationState.website?.valid === false ? 'invalid' : validationState.website?.valid ? 'valid' : ''}`}>
              {validationState.website?.message || (validationState.website?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input type="url">`}</code>
          </div>

          <div className="form-field">
            <label>
              Телефон (формат: +7-XXX-XXX-XXXX)
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                pattern="\+7-[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="+7-999-123-4567"
              />
            </label>
            <div className={`validation-status ${validationState.phone?.valid === false ? 'invalid' : validationState.phone?.valid ? 'valid' : ''}`}>
              {validationState.phone?.message || (validationState.phone?.valid ? '✓ Валидно' : '')}
            </div>
            <code className="field-code">{`<input type="tel" pattern="\\+7-[0-9]{3}...">`}</code>
          </div>

          <button type="submit" className="btn btn-primary">Отправить</button>
        </form>
      </div>

      {/* Constraint Validation API */}
      <div className="card">
        <h2>🔧 Constraint Validation API</h2>
        
        <div className="api-section">
          <h3>ValidityState свойства</h3>
          <div className="code-block">
            <pre>{`input.validity = {
  valid: true/false,        // Общий результат
  valueMissing: false,      // required не заполнен
  typeMismatch: false,      // type="email" не соответствует
  patternMismatch: false,   // pattern не совпадает
  tooLong: false,           // превышен maxlength
  tooShort: false,          // меньше minlength
  rangeUnderflow: false,    // меньше min
  rangeOverflow: false,     // больше max
  stepMismatch: false,      // не кратно step
  badInput: false,          // невозможно преобразовать
  customError: false        // setCustomValidity() установлен
}`}</pre>
          </div>
        </div>

        <div className="api-section">
          <h3>Методы</h3>
          <div className="methods-grid">
            <div className="method">
              <code>checkValidity()</code>
              <span>Проверить валидность (boolean)</span>
            </div>
            <div className="method">
              <code>reportValidity()</code>
              <span>Проверить + показать сообщения</span>
            </div>
            <div className="method">
              <code>setCustomValidity(msg)</code>
              <span>Установить своё сообщение об ошибке</span>
            </div>
            <div className="method">
              <code>validationMessage</code>
              <span>Текущее сообщение об ошибке</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Validation Example */}
      <div className="card">
        <h2>🎨 Кастомная валидация</h2>
        
        <div className="code-block">
          <pre>{`// Кастомная валидация через setCustomValidity
const input = document.querySelector('input[name="password"]');

input.addEventListener('input', (e) => {
  const value = e.target.value;
  
  if (value.length < 8) {
    input.setCustomValidity('Минимум 8 символов');
  } else if (!/[A-Z]/.test(value)) {
    input.setCustomValidity('Нужна хотя бы одна заглавная буква');
  } else if (!/[0-9]/.test(value)) {
    input.setCustomValidity('Нужна хотя бы одна цифра');
  } else {
    input.setCustomValidity(''); // Валидно!
  }
});

// Проверка подтверждения пароля
const confirmInput = document.querySelector('input[name="confirm"]');
confirmInput.addEventListener('input', () => {
  if (confirmInput.value !== passwordInput.value) {
    confirmInput.setCustomValidity('Пароли не совпадают');
  } else {
    confirmInput.setCustomValidity('');
  }
});`}</pre>
        </div>
      </div>

      {/* CSS Pseudo-classes */}
      <div className="card">
        <h2>🎭 CSS Псевдоклассы для валидации</h2>
        
        <div className="pseudo-grid">
          <div className="pseudo-item">
            <code>:valid</code>
            <span>Поле валидно</span>
            <div className="pseudo-example valid-example">Валидный input</div>
          </div>
          <div className="pseudo-item">
            <code>:invalid</code>
            <span>Поле невалидно</span>
            <div className="pseudo-example invalid-example">Невалидный input</div>
          </div>
          <div className="pseudo-item">
            <code>:required</code>
            <span>Обязательное поле</span>
            <div className="pseudo-example required-example">Required input</div>
          </div>
          <div className="pseudo-item">
            <code>:optional</code>
            <span>Необязательное поле</span>
            <div className="pseudo-example optional-example">Optional input</div>
          </div>
          <div className="pseudo-item">
            <code>:user-invalid</code>
            <span>Невалидно ПОСЛЕ взаимодействия</span>
            <div className="pseudo-example">Показывает ошибку только после blur</div>
          </div>
          <div className="pseudo-item">
            <code>:in-range / :out-of-range</code>
            <span>Значение в/вне диапазона</span>
            <div className="pseudo-example">Для min/max</div>
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '20px' }}>
          <pre>{`/* CSS для валидации */
input:valid {
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

input:invalid {
  border-color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Показываем ошибку только после взаимодействия */
input:user-invalid {
  border-color: #ef4444;
}

/* Подсветка обязательных полей */
input:required {
  border-left: 3px solid #f59e0b;
}

/* Сообщение об ошибке через :invalid + sibling */
input:invalid + .error-message {
  display: block;
}
input:valid + .error-message {
  display: none;
}`}</pre>
        </div>
      </div>

      {/* novalidate and formnovalidate */}
      <div className="card">
        <h2>🚫 Отключение валидации</h2>
        
        <div className="code-block">
          <pre>{`<!-- Отключить валидацию для всей формы -->
<form novalidate>
  <input type="email" required>
  <button type="submit">Submit</button>
</form>

<!-- Отключить только для определённой кнопки -->
<form>
  <input type="email" required>
  <button type="submit">Submit</button>
  <button type="submit" formnovalidate>Save Draft</button>
</form>`}</pre>
        </div>
        
        <p style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
          <code>novalidate</code> полезен когда вы хотите использовать свою JS валидацию,
          но сохранить атрибуты для Constraint Validation API.
        </p>
      </div>

      <style>{`
        .attributes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .attr-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .attr-item code {
          color: var(--accent);
          font-weight: 600;
        }
        .attr-item span {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .validation-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-top: 20px;
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .form-field label {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-weight: 500;
        }
        .form-field input {
          padding: 12px;
          border: 2px solid var(--border);
          border-radius: 8px;
          font-size: 1rem;
          background: var(--bg-secondary);
          color: var(--text);
          transition: border-color 0.2s, background 0.2s;
        }
        .form-field input:focus {
          outline: none;
          border-color: var(--accent);
        }
        .form-field input:valid:not(:placeholder-shown) {
          border-color: var(--success);
          background: rgba(16, 185, 129, 0.05);
        }
        .form-field input:invalid:not(:placeholder-shown) {
          border-color: var(--error);
          background: rgba(239, 68, 68, 0.05);
        }
        .validation-status {
          font-size: 0.85em;
          min-height: 20px;
        }
        .validation-status.valid {
          color: var(--success);
        }
        .validation-status.invalid {
          color: var(--error);
        }
        .field-code {
          font-size: 0.75em;
          color: var(--text-secondary);
          background: var(--bg-code);
          padding: 4px 8px;
          border-radius: 4px;
          align-self: flex-start;
        }
        .api-section {
          margin: 20px 0;
        }
        .api-section h3 {
          margin-bottom: 12px;
        }
        .methods-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .method {
          display: flex;
          gap: 16px;
          align-items: center;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .method code {
          min-width: 180px;
          color: var(--accent);
        }
        .pseudo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }
        .pseudo-item {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .pseudo-item code {
          display: block;
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 4px;
        }
        .pseudo-item span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .pseudo-example {
          margin-top: 12px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.85em;
          border: 2px solid var(--border);
        }
        .valid-example {
          border-color: var(--success);
          background: rgba(16, 185, 129, 0.1);
        }
        .invalid-example {
          border-color: var(--error);
          background: rgba(239, 68, 68, 0.1);
        }
        .required-example {
          border-left: 4px solid #f59e0b;
        }
        .optional-example {
          border-style: dashed;
        }
      `}</style>
    </div>
  )
}
