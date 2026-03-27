import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>React Playground</h1>
        <p>
          Интерактивная площадка для изучения React. Визуализируйте, экспериментируйте 
          и понимайте как работает React изнутри.
        </p>
      </div>

      <h2 style={{ marginBottom: '24px' }}>🎓 Начните изучение</h2>

      <div className="feature-grid">
        <Link to="/hooks/usestate" className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>useState</h3>
          <p>
            Узнайте как работает состояние компонента, почему происходит ре-рендер 
            и как правильно обновлять state.
          </p>
        </Link>

        <Link to="/hooks/useeffect" className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>useEffect</h3>
          <p>
            Визуализация жизненного цикла эффектов: монтирование, обновление, 
            cleanup и зависимости.
          </p>
        </Link>

        <Link to="/hooks/usecallback" className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3>useCallback</h3>
          <p>
            Понимание мемоизации функций, референсное равенство и оптимизация 
            передачи колбеков в дочерние компоненты.
          </p>
        </Link>

        <Link to="/hooks/usememo" className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>useMemo</h3>
          <p>
            Кеширование вычислений, предотвращение лишних расчётов и 
            оптимизация производительности.
          </p>
        </Link>

        <Link to="/hooks/useref" className="feature-card">
          <div className="feature-icon">📌</div>
          <h3>useRef</h3>
          <p>
            Изменяемые значения между рендерами, доступ к DOM элементам 
            и сохранение данных без ре-рендера.
          </p>
        </Link>

        <Link to="/hooks/usecontext" className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>useContext</h3>
          <p>
            Глобальное состояние, избежание prop drilling и правильное 
            использование контекста.
          </p>
        </Link>

        <Link to="/concepts/rendering" className="feature-card">
          <div className="feature-icon">🎨</div>
          <h3>Рендеринг</h3>
          <p>
            Визуализация процесса рендеринга, Virtual DOM, reconciliation 
            и причины ре-рендеров.
          </p>
        </Link>

        <Link to="/concepts/lifecycle" className="feature-card">
          <div className="feature-icon">🔁</div>
          <h3>Жизненный цикл</h3>
          <p>
            Полный жизненный цикл компонента от создания до удаления 
            с визуальной timeline.
          </p>
        </Link>

        <Link to="/concepts/batching" className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>Batching</h3>
          <p>
            Автоматическое группирование обновлений состояния и отличия 
            между React 17 и 18+.
          </p>
        </Link>

        <Link to="/versions/react19" className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>React 19</h3>
          <p>
            Новые хуки use, useOptimistic, useFormStatus и другие 
            нововведения последней версии.
          </p>
        </Link>
      </div>

      <div className="card" style={{ marginTop: '48px' }}>
        <h3>💡 Как использовать</h3>
        <p style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
          Каждый раздел содержит интерактивные примеры с визуализацией. Вы можете:
        </p>
        <ul className="info-list">
          <li>Наблюдать за количеством рендеров компонентов</li>
          <li>Видеть timeline выполнения эффектов</li>
          <li>Сравнивать поведение с и без оптимизаций</li>
          <li>Экспериментировать с разными параметрами</li>
        </ul>
      </div>
    </div>
  )
}
