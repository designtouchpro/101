import { useState, useRef, FormEvent } from 'react'
import CodeBlock from '../../components/CodeBlock'

export default function ReactFormsGuide() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📝 React Forms</h1>
        <p>Работа с формами: controlled, uncontrolled, валидация</p>
        <a 
          href="https://react.dev/reference/react-dom/components/input" 
          target="_blank" 
          rel="noopener noreferrer"
          className="docs-link"
        >
          📚 React Form Docs
        </a>
      </div>

      <LiveFormExamples />
      <ControlledVsUncontrolledDemo />
      <ValidationDemo />
      <RealWorldFormDemo />
      <InterviewQuestions />
    </div>
  )
}

// =====================================================
// ЖИВЫЕ ПРИМЕРЫ ФОРМ
// =====================================================
function LiveFormExamples() {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎯 Живые примеры форм</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <LoginFormExample />
        <SearchFormExample />
        <FeedbackFormExample />
      </div>
    </div>
  )
}

// Пример 1: Форма логина
function LoginFormExample() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!email) newErrors.email = 'Email обязателен'
    else if (!email.includes('@')) newErrors.email = 'Некорректный email'
    if (!password) newErrors.password = 'Пароль обязателен'
    else if (password.length < 6) newErrors.password = 'Минимум 6 символов'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (validate()) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2000)
    }
  }

  return (
    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
      <h4 style={{ marginBottom: '16px' }}>🔐 Форма входа</h4>
      
      {submitted ? (
        <div style={{ padding: '20px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✅</div>
          <p style={{ color: 'var(--accent-green)' }}>Успешный вход!</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Email: {email}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1px solid ${errors.email ? 'var(--accent-red)' : 'var(--border-color)'}`,
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem'
              }}
            />
            {errors.email && <p style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</p>}
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>Пароль</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${errors.password ? 'var(--accent-red)' : 'var(--border-color)'}`,
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && <p style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Войти
          </button>
        </form>
      )}
    </div>
  )
}

// Пример 2: Поиск с мгновенной фильтрацией
function SearchFormExample() {
  const [query, setQuery] = useState('')
  const items = ['React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'Nuxt', 'Remix', 'Astro']
  const filtered = items.filter(item => item.toLowerCase().includes(query.toLowerCase()))

  return (
    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
      <h4 style={{ marginBottom: '16px' }}>🔍 Поиск (мгновенный)</h4>
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Найти фреймворк..."
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          background: 'var(--bg-primary)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          marginBottom: '12px'
        }}
      />

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>Ничего не найдено</p>
        ) : (
          filtered.map(item => (
            <span 
              key={item}
              style={{
                padding: '6px 12px',
                background: 'var(--accent-blue)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                color: 'white'
              }}
            >
              {item}
            </span>
          ))
        )}
      </div>

      <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        Controlled input — фильтрация при каждом нажатии
      </p>
    </div>
  )
}

// Пример 3: Форма обратной связи
function FeedbackFormExample() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (rating > 0) {
      setSubmitted(true)
    }
  }

  const handleReset = () => {
    setRating(0)
    setComment('')
    setSubmitted(false)
  }

  return (
    <div style={{ padding: '20px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
      <h4 style={{ marginBottom: '16px' }}>⭐ Оцените сервис</h4>
      
      {submitted ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🎉</div>
          <p style={{ color: 'var(--accent-green)', marginBottom: '8px' }}>Спасибо за отзыв!</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Ваша оценка: {'⭐'.repeat(rating)}
          </p>
          <button onClick={handleReset} className="btn btn-secondary" style={{ marginTop: '12px' }}>
            Оставить ещё
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  transform: rating >= star ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.2s'
                }}
              >
                {rating >= star ? '⭐' : '☆'}
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий (необязательно)"
            rows={3}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
              resize: 'none',
              marginBottom: '12px'
            }}
          />

          <button 
            type="submit" 
            className="btn btn-success" 
            style={{ width: '100%' }}
            disabled={rating === 0}
          >
            Отправить отзыв
          </button>
        </form>
      )}
    </div>
  )
}

// =====================================================
// CONTROLLED VS UNCONTROLLED
// =====================================================
function ControlledVsUncontrolledDemo() {
  const [controlledValue, setControlledValue] = useState('Hello')
  const [controlledRenders, setControlledRenders] = useState(0)
  const uncontrolledRef = useRef<HTMLInputElement>(null)
  const [uncontrolledResult, setUncontrolledResult] = useState('')

  const handleControlledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControlledValue(e.target.value)
    setControlledRenders(r => r + 1)
  }

  const handleUncontrolledSubmit = () => {
    setUncontrolledResult(uncontrolledRef.current?.value || '')
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">🎮 Controlled vs Uncontrolled</h3>
        <span className="card-badge">Сравнение</span>
      </div>

      <div className="comparison-grid">
        <div className="comparison-card" style={{ borderColor: 'var(--accent-blue)' }}>
          <div className="comparison-header" style={{ background: 'rgba(59, 130, 246, 0.1)' }}>
            🎮 Controlled
          </div>
          <div className="comparison-body">
            <p style={{ fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
              React управляет значением через state
            </p>
            
            <input
              type="text"
              value={controlledValue}
              onChange={handleControlledChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid var(--accent-blue)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                marginBottom: '12px'
              }}
            />

            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <strong>Значение:</strong> {controlledValue}
              </div>
              <div>
                <strong style={{ color: 'var(--accent-orange)' }}>Re-renders:</strong> {controlledRenders}
              </div>
            </div>

            <ul className="info-list">
              <li>✅ Мгновенная валидация</li>
              <li>✅ Форматирование ввода</li>
              <li>❌ Re-render на каждый символ</li>
            </ul>
          </div>
        </div>

        <div className="comparison-card" style={{ borderColor: 'var(--accent-purple)' }}>
          <div className="comparison-header" style={{ background: 'rgba(168, 85, 247, 0.1)' }}>
            🔓 Uncontrolled
          </div>
          <div className="comparison-body">
            <p style={{ fontSize: '0.85rem', marginBottom: '12px', color: 'var(--text-muted)' }}>
              DOM сам хранит значение, читаем через ref
            </p>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
              <input
                type="text"
                ref={uncontrolledRef}
                defaultValue="World"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--accent-purple)',
                  background: 'var(--bg-primary)',
                  color: 'var(--text-primary)'
                }}
              />
              <button className="btn btn-secondary" onClick={handleUncontrolledSubmit}>
                Прочитать
              </button>
            </div>

            <div style={{ fontSize: '0.85rem' }}>
              <strong>Прочитанное:</strong> {uncontrolledResult || '(нажмите кнопку)'}
            </div>

            <ul className="info-list">
              <li>✅ Меньше ре-рендеров</li>
              <li>✅ Проще для простых форм</li>
              <li>❌ Нет мгновенной валидации</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// ВАЛИДАЦИЯ ФОРМ
// =====================================================
function ValidationDemo() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    website: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const validators: Record<string, (value: string) => string | null> = {
    username: (v) => {
      if (!v) return 'Обязательное поле'
      if (v.length < 3) return 'Минимум 3 символа'
      if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Только буквы, цифры и _'
      return null
    },
    email: (v) => {
      if (!v) return 'Обязательное поле'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Некорректный email'
      return null
    },
    age: (v) => {
      if (!v) return null // необязательное
      const num = parseInt(v)
      if (isNaN(num)) return 'Должно быть числом'
      if (num < 18 || num > 120) return 'От 18 до 120'
      return null
    },
    website: (v) => {
      if (!v) return null // необязательное
      if (!/^https?:\/\/.+/.test(v)) return 'Начните с http:// или https://'
      return null
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (touched[field]) {
      const error = validators[field]?.(value)
      setErrors(prev => ({ ...prev, [field]: error || '' }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validators[field]?.(formData[field as keyof typeof formData])
    setErrors(prev => ({ ...prev, [field]: error || '' }))
  }

  const isValid = Object.keys(validators).every(field => {
    const error = validators[field](formData[field as keyof typeof formData])
    return error === null
  })

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">✅ Валидация форм</h3>
        <span className="card-badge">Практика</span>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 350px' }}>
          <div className="visual-diagram">
            <h4 style={{ marginBottom: '16px' }}>Форма регистрации</h4>
            
            {(['username', 'email', 'age', 'website'] as const).map(field => (
              <div key={field} style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem' }}>
                  {field === 'username' && '👤 Имя пользователя *'}
                  {field === 'email' && '📧 Email *'}
                  {field === 'age' && '🎂 Возраст'}
                  {field === 'website' && '🌐 Сайт'}
                </label>
                <input
                  type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                  value={formData[field]}
                  onChange={(e) => handleChange(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  placeholder={
                    field === 'username' ? 'john_doe' :
                    field === 'email' ? 'john@example.com' :
                    field === 'age' ? '25' :
                    'https://example.com'
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `2px solid ${
                      errors[field] ? 'var(--accent-red)' : 
                      touched[field] && !errors[field] ? 'var(--accent-green)' : 
                      'var(--border-color)'
                    }`,
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
                {errors[field] && (
                  <p style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '4px' }}>
                    ❌ {errors[field]}
                  </p>
                )}
                {touched[field] && !errors[field] && formData[field] && (
                  <p style={{ color: 'var(--accent-green)', fontSize: '0.8rem', marginTop: '4px' }}>
                    ✅ Валидно
                  </p>
                )}
              </div>
            ))}

            <button 
              className="btn btn-primary" 
              style={{ width: '100%' }}
              disabled={!isValid}
            >
              {isValid ? '✅ Отправить' : '⏳ Заполните форму'}
            </button>
          </div>
        </div>

        <div style={{ flex: '1 1 350px' }}>
          <CodeBlock 
            code={`// Паттерн валидации с touched state
const validators = {
  email: (v) => {
    if (!v) return 'Обязательное поле';
    if (!v.includes('@')) return 'Некорректный email';
    return null; // null = валидно
  }
};

function Form() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setError(validators.email(email) || '');
  };

  return (
    <input
      value={email}
      onChange={(e) => {
        setEmail(e.target.value);
        // Валидируем только если поле уже touched
        if (touched) {
          setError(validators.email(e.target.value) || '');
        }
      }}
      onBlur={handleBlur}
      style={{
        borderColor: error ? 'red' : 'green'
      }}
    />
  );
}`}
            language="tsx"
            title="📝 Паттерн валидации"
          />
        </div>
      </div>
    </div>
  )
}

// =====================================================
// РЕАЛЬНАЯ ФОРМА
// =====================================================
function RealWorldFormDemo() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    firstName: '',
    lastName: '',
    // Step 2
    email: '',
    phone: '',
    // Step 3
    plan: 'basic',
    newsletter: true
  })
  const [submitted, setSubmitted] = useState(false)

  const updateField = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    if (step === 1) return formData.firstName && formData.lastName
    if (step === 2) return formData.email && formData.phone
    return true
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎉 Заказ оформлен!</h3>
        </div>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
          <h2>Спасибо, {formData.firstName}!</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>
            Подтверждение отправлено на {formData.email}
          </p>
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: 'var(--bg-secondary)', 
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <h4 style={{ marginBottom: '12px' }}>Ваш заказ:</h4>
            <p><strong>Имя:</strong> {formData.firstName} {formData.lastName}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Телефон:</strong> {formData.phone}</p>
            <p><strong>Тариф:</strong> {formData.plan === 'basic' ? 'Базовый' : formData.plan === 'pro' ? 'Pro' : 'Enterprise'}</p>
          </div>
          <button className="btn btn-primary" style={{ marginTop: '24px' }} onClick={() => {
            setSubmitted(false)
            setStep(1)
            setFormData({
              firstName: '', lastName: '', email: '', phone: '',
              plan: 'basic', newsletter: true
            })
          }}>
            Оформить новый заказ
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">📋 Многошаговая форма</h3>
        <span className="card-badge">Real World</span>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {[1, 2, 3].map(s => (
          <div 
            key={s}
            style={{
              flex: 1,
              height: '8px',
              borderRadius: '4px',
              background: s <= step ? 'var(--accent-blue)' : 'var(--border-color)',
              transition: 'background 0.3s'
            }}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 350px' }}>
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="visual-diagram">
              <h4 style={{ marginBottom: '16px' }}>👤 Шаг 1: Личные данные</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Имя</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField('firstName', e.target.value)}
                  placeholder="Иван"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Фамилия</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField('lastName', e.target.value)}
                  placeholder="Петров"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Contact */}
          {step === 2 && (
            <div className="visual-diagram">
              <h4 style={{ marginBottom: '16px' }}>📧 Шаг 2: Контакты</h4>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="ivan@example.com"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '6px' }}>Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 3: Plan */}
          {step === 3 && (
            <div className="visual-diagram">
              <h4 style={{ marginBottom: '16px' }}>💳 Шаг 3: Выбор тарифа</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {[
                  { id: 'basic', name: 'Базовый', price: '0 ₽/мес', icon: '🆓' },
                  { id: 'pro', name: 'Pro', price: '990 ₽/мес', icon: '⭐' },
                  { id: 'enterprise', name: 'Enterprise', price: '4990 ₽/мес', icon: '🏢' }
                ].map(plan => (
                  <label
                    key={plan.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '16px',
                      borderRadius: '8px',
                      border: `2px solid ${formData.plan === plan.id ? 'var(--accent-blue)' : 'var(--border-color)'}`,
                      background: formData.plan === plan.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-primary)',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={formData.plan === plan.id}
                      onChange={() => updateField('plan', plan.id)}
                      style={{ display: 'none' }}
                    />
                    <span style={{ fontSize: '1.5rem' }}>{plan.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{plan.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{plan.price}</div>
                    </div>
                    {formData.plan === plan.id && (
                      <span style={{ color: 'var(--accent-blue)' }}>✓</span>
                    )}
                  </label>
                ))}
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={formData.newsletter}
                  onChange={(e) => updateField('newsletter', e.target.checked)}
                />
                Подписаться на новости
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="controls" style={{ marginTop: '16px' }}>
            {step > 1 && (
              <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)}>
                ← Назад
              </button>
            )}
            {step < 3 ? (
              <button 
                className="btn btn-primary" 
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
              >
                Далее →
              </button>
            ) : (
              <button 
                className="btn btn-success" 
                onClick={handleSubmit}
              >
                ✅ Оформить
              </button>
            )}
          </div>
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <div style={{ padding: '16px', background: 'var(--bg-secondary)', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px' }}>📊 Данные формы (live)</h4>
            <pre style={{ 
              fontSize: '0.8rem', 
              color: 'var(--accent-green)',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace'
            }}>
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

// =====================================================
// INTERVIEW QUESTIONS
// =====================================================
function InterviewQuestions() {
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({})

  const questions = [
    {
      q: "В чём разница между controlled и uncontrolled компонентами?",
      a: "Controlled: React управляет значением через state (value + onChange). Uncontrolled: DOM сам хранит значение, читаем через ref. Controlled даёт больше контроля, uncontrolled — меньше ре-рендеров."
    },
    {
      q: "Когда использовать onBlur vs onChange для валидации?",
      a: "onChange — мгновенная валидация (каждый символ). onBlur — валидация при потере фокуса (user-friendly). Лучший UX: показывать ошибку после blur, убирать при исправлении (onChange после touched)."
    },
    {
      q: "Как предотвратить лишние ре-рендеры в формах?",
      a: "1) Uncontrolled компоненты + ref. 2) Изолировать поля в отдельные компоненты. 3) useCallback для обработчиков. 4) Библиотеки вроде react-hook-form (uncontrolled под капотом)."
    },
    {
      q: "Зачем нужен e.preventDefault() в onSubmit?",
      a: "Без него браузер сделает полную перезагрузку страницы (default behavior). С SPA это уничтожит state. Всегда вызывай e.preventDefault() и обрабатывай submit в JS."
    }
  ]

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">❓ Вопросы на собеседовании</h3>
        <span className="card-badge">Interview</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {questions.map((item, i) => (
          <div 
            key={i}
            style={{ background: 'var(--bg-secondary)', borderRadius: '8px', padding: '16px', cursor: 'pointer' }}
            onClick={() => setShowAnswers(prev => ({ ...prev, [i]: !prev[i] }))}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{item.q}</strong>
              <span>{showAnswers[i] ? '🔼' : '🔽'}</span>
            </div>
            {showAnswers[i] && (
              <p style={{ marginTop: '12px', color: 'var(--accent-green)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
