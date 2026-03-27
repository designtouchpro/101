import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>👨‍💼 TeamLead Playground — площадка тимлида</h1>
        <p>Интерактивный курс по тимлидству в IT. Лидерство, конфликты, делегирование, 1-on-1 и процессы — с примерами и симуляциями.</p>
      </div>

      <h2 style={{ marginBottom: 24 }}>🎓 Начните изучение</h2>

      <div className="feature-grid">
        <Link to="/leadership/styles" className="feature-card">
          <div className="feature-icon">🎭</div>
          <h3>Стили лидерства</h3>
          <p>Автократ, демократ, servant leader (лидер-слуга), коуч — когда какой стиль применять и как переключаться</p>
        </Link>

        <Link to="/leadership/delegation" className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>Делегирование</h3>
          <p>7 уровней делегирования Юргена Аппело. Интерактивная доска с реальными IT-задачами</p>
        </Link>

        <Link to="/leadership/maturity" className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Зрелость команды</h3>
          <p>Модель Такмана: forming (формирование) → storming (штормы) → norming (нормализация) → performing (производительность). Симулятор жизни команды</p>
        </Link>

        <Link to="/one-on-one/guide" className="feature-card">
          <div className="feature-icon">🤝</div>
          <h3>1-on-1 встречи</h3>
          <p>Как проводить, о чём спрашивать, какие ошибки допускают начинающие тимлиды</p>
        </Link>

        <Link to="/one-on-one/feedback" className="feature-card">
          <div className="feature-icon">💬</div>
          <h3>Модели фидбека</h3>
          <p>SBI, STAR, Radical Candor (радикальная откровенность) — практика обратной связи на реальных ситуациях</p>
        </Link>

        <Link to="/conflicts/styles" className="feature-card">
          <div className="feature-icon">⚔️</div>
          <h3>Стили поведения в конфликтах</h3>
          <p>Модель Томаса-Килманна: 5 стилей, квиз для определения вашего стиля</p>
        </Link>

        <Link to="/conflicts/resolution" className="feature-card">
          <div className="feature-icon">🕊️</div>
          <h3>Разрешение конфликтов</h3>
          <p>Алгоритм действий, разбор кейсов из IT-команд</p>
        </Link>

        <Link to="/decomposition/tasks" className="feature-card">
          <div className="feature-icon">🧩</div>
          <h3>Декомпозиция задач</h3>
          <p>Как разбивать большие задачи на маленькие. INVEST-критерии, user stories (пользовательские истории)</p>
        </Link>

        <Link to="/decomposition/estimation" className="feature-card">
          <div className="feature-icon">🃏</div>
          <h3>Оценка задач</h3>
          <p>Planning Poker (покер планирования), T-shirt sizing (оценка «размерами»), #NoEstimates (без оценок) — симулятор оценки</p>
        </Link>

        <Link to="/processes/guilds" className="feature-card">
          <div className="feature-icon">🏛️</div>
          <h3>Гильдии и CoP (сообщества практик)</h3>
          <p>Spotify-модель: tribes (племена), squads (отряды), chapters (чаптеры), guilds (гильдии). Как организовать обмен знаниями</p>
        </Link>

        <Link to="/processes/topologies" className="feature-card">
          <div className="feature-icon">🔷</div>
          <h3>Team Topologies (топологии команд)</h3>
          <p>Stream-aligned (потоковая), enabling (помогающая), complicated subsystem (сложная подсистема), platform (платформенная) — 4 типа команд</p>
        </Link>

        <Link to="/processes/tech-radar" className="feature-card">
          <div className="feature-icon">📡</div>
          <h3>Tech Radar (технологический радар)</h3>
          <p>Как вести технологический радар: adopt (внедряем), trial (пробуем), assess (изучаем), hold (замораживаем)</p>
        </Link>
      </div>

      <div className="card" style={{ marginTop: 48 }}>
        <h3>💡 Как использовать</h3>
        <ul>
          <li>Каждая тема содержит <strong>теорию</strong> и <strong>интерактивные упражнения</strong></li>
          <li>Проходите <strong>квизы</strong> и <strong>симуляции</strong> чтобы закрепить материал</li>
          <li>Все примеры из реальных <strong>IT-команд</strong></li>
          <li>Навигация по темам — в боковой панели слева</li>
        </ul>
      </div>
    </div>
  )
}
