import { Link } from 'react-router-dom'

const sections = [
  {
    title: '📐 Принципы',
    items: [
      { to: '/principles/solid', icon: '🏛', name: 'SOLID', desc: '5 принципов объектно-ориентированного дизайна' },
      { to: '/principles/dry-kiss-yagni', icon: '✨', name: 'DRY / KISS / YAGNI', desc: 'Фундаментальные принципы чистого кода' },
    ]
  },
  {
    title: '🏗 Архитектура',
    items: [
      { to: '/architecture/mvc-mvp-mvvm', icon: '🏢', name: 'MVC / MVP / MVVM', desc: 'Архитектурные паттерны разделения ответственности' },
    ]
  },
  {
    title: '🔨 Порождающие (Creational)',
    items: [
      { to: '/creational/singleton', icon: '1️⃣', name: 'Singleton', desc: 'Один экземпляр на всё приложение' },
      { to: '/creational/factory-method', icon: '🏭', name: 'Factory Method', desc: 'Делегирует создание объектов подклассам' },
      { to: '/creational/abstract-factory', icon: '🏗', name: 'Abstract Factory', desc: 'Семейства связанных объектов' },
      { to: '/creational/builder', icon: '🧱', name: 'Builder', desc: 'Пошаговое создание сложных объектов' },
      { to: '/creational/prototype', icon: '🧬', name: 'Prototype', desc: 'Клонирование существующих объектов' },
    ]
  },
  {
    title: '🧩 Структурные (Structural)',
    items: [
      { to: '/structural/adapter', icon: '🔌', name: 'Adapter', desc: 'Совместимость несовместимых интерфейсов' },
      { to: '/structural/bridge', icon: '🌉', name: 'Bridge', desc: 'Разделение абстракции и реализации' },
      { to: '/structural/composite', icon: '🌳', name: 'Composite', desc: 'Древовидные структуры компонентов' },
      { to: '/structural/decorator', icon: '🎀', name: 'Decorator', desc: 'Динамическое добавление поведения' },
      { to: '/structural/facade', icon: '🏛', name: 'Facade', desc: 'Простой интерфейс к сложной системе' },
      { to: '/structural/flyweight', icon: '🪶', name: 'Flyweight', desc: 'Экономия памяти через разделение состояния' },
      { to: '/structural/proxy', icon: '🛡', name: 'Proxy', desc: 'Контроль доступа к объекту' },
    ]
  },
  {
    title: '🎭 Поведенческие (Behavioral)',
    items: [
      { to: '/behavioral/observer', icon: '👀', name: 'Observer', desc: 'Подписка на изменения состояния' },
      { to: '/behavioral/strategy', icon: '♟', name: 'Strategy', desc: 'Взаимозаменяемые алгоритмы' },
      { to: '/behavioral/command', icon: '📜', name: 'Command', desc: 'Инкапсуляция действий в объекты' },
      { to: '/behavioral/state', icon: '🚦', name: 'State', desc: 'Поведение зависит от состояния' },
      { to: '/behavioral/chain-of-responsibility', icon: '⛓', name: 'Chain of Responsibility', desc: 'Цепочка обработчиков запросов' },
      { to: '/behavioral/mediator', icon: '📡', name: 'Mediator', desc: 'Централизация взаимодействий' },
      { to: '/behavioral/iterator', icon: '🔁', name: 'Iterator', desc: 'Последовательный обход коллекций' },
      { to: '/behavioral/template-method', icon: '📋', name: 'Template Method', desc: 'Скелет алгоритма с переопределяемыми шагами' },
      { to: '/behavioral/memento', icon: '💾', name: 'Memento', desc: 'Сохранение и восстановление состояния' },
      { to: '/behavioral/visitor', icon: '🚶', name: 'Visitor', desc: 'Новые операции без изменения классов' },
    ]
  },
]

export default function Home() {
  return (
    <div className="demo-container">
      <div className="home-hero">
        <h1>🧩 Patterns 101</h1>
        <p>Паттерны проектирования, принципы и архитектурные подходы с примерами из фронтенд-разработки</p>
      </div>

      {sections.map(section => (
        <div key={section.title}>
          <h2 style={{ fontSize: '1.3rem', margin: '32px 0 16px', color: 'var(--text-primary)' }}>{section.title}</h2>
          <div className="pattern-grid">
            {section.items.map(item => (
              <Link key={item.to} to={item.to} className="pattern-card">
                <h3>{item.icon} {item.name}</h3>
                <p>{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
