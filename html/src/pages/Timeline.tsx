export default function Timeline() {
  const timelineData = [
    {
      year: '2014',
      title: 'HTML5 — Официальная рекомендация W3C',
      features: [
        { name: '<video>, <audio>', desc: 'Нативное воспроизведение медиа' },
        { name: '<canvas>', desc: '2D графика через JavaScript' },
        { name: '<article>, <section>, <nav>', desc: 'Семантические элементы' },
        { name: '<input type="date/time/color">', desc: 'Новые типы инпутов' },
        { name: 'localStorage, sessionStorage', desc: 'Клиентское хранилище' },
        { name: 'Geolocation API', desc: 'Определение местоположения' },
        { name: 'Drag and Drop API', desc: 'Нативный drag-n-drop' },
      ]
    },
    {
      year: '2016',
      title: 'HTML 5.1',
      features: [
        { name: '<picture>', desc: 'Адаптивные изображения' },
        { name: 'srcset, sizes', desc: 'Responsive images' },
        { name: '<details>, <summary>', desc: 'Нативный аккордеон' },
        { name: '<menu>, <menuitem>', desc: 'Контекстные меню (deprecated)' },
        { name: 'requestAnimationFrame', desc: 'Синхронизация с рендерингом' },
      ]
    },
    {
      year: '2017',
      title: 'HTML 5.2',
      features: [
        { name: '<dialog>', desc: 'Нативные модальные окна' },
        { name: 'Payment Request API', desc: 'Стандартизированные платежи' },
        { name: '<link rel="modulepreload">', desc: 'Предзагрузка ES модулей' },
        { name: 'allowpaymentrequest', desc: 'Атрибут для iframe' },
      ]
    },
    {
      year: '2019',
      title: 'Living Standard Updates',
      features: [
        { name: 'loading="lazy"', desc: 'Ленивая загрузка для img и iframe' },
        { name: '<input type="date"> улучшения', desc: 'min, max, step для дат' },
        { name: 'autocomplete tokens', desc: 'Расширенный автокомплит' },
        { name: 'inputmode', desc: 'Контроль мобильной клавиатуры' },
      ]
    },
    {
      year: '2020',
      title: 'Новые API и атрибуты',
      features: [
        { name: 'enterkeyhint', desc: 'Кастомизация Enter на мобильных' },
        { name: '<link rel="preconnect">', desc: 'Предварительное соединение' },
        { name: 'decoding="async"', desc: 'Асинхронное декодирование изображений' },
        { name: 'hidden="until-found"', desc: 'Скрытие до поиска на странице' },
      ]
    },
    {
      year: '2021',
      title: 'Declarative Shadow DOM & более',
      features: [
        { name: 'Declarative Shadow DOM', desc: '<template shadowrootmode="open">' },
        { name: '<link rel="preload" as="fetch">', desc: 'Предзагрузка данных' },
        { name: 'aspect-ratio в HTML', desc: 'width/height для соотношения сторон' },
        { name: 'inert', desc: 'Отключение интерактивности поддерева' },
      ]
    },
    {
      year: '2022',
      title: 'Dialog и Popover',
      features: [
        { name: 'dialog::backdrop', desc: 'Стилизация оверлея модалки' },
        { name: 'popover API', desc: 'Нативные поповеры без JS' },
        { name: 'popovertarget', desc: 'Декларативное управление поповерами' },
        { name: ':modal pseudo-class', desc: 'Стилизация модальных элементов' },
      ]
    },
    {
      year: '2023',
      title: 'Interop & Baseline',
      features: [
        { name: 'fetchpriority', desc: 'Приоритет загрузки ресурсов' },
        { name: '<search>', desc: 'Семантический элемент для поиска' },
        { name: 'blocking="render"', desc: 'Блокировка рендера до загрузки' },
        { name: 'Popover в Baseline', desc: 'Поддержка во всех браузерах' },
      ]
    },
    {
      year: '2024',
      title: 'Современный стандарт',
      features: [
        { name: '<selectlist> (в разработке)', desc: 'Стилизуемый select' },
        { name: 'Invoker Commands', desc: 'commandfor, command атрибуты' },
        { name: 'CSS Anchor Positioning + HTML', desc: 'Позиционирование относительно якоря' },
        { name: 'Exclusive Accordion', desc: '<details name="group">' },
      ]
    },
    {
      year: '2025+',
      title: 'Что ожидается',
      features: [
        { name: '<permission>', desc: 'Декларативный запрос разрешений' },
        { name: 'Custom Elements v2', desc: 'Улучшения Web Components' },
        { name: '<model>', desc: '3D модели нативно в HTML' },
        { name: 'Scoped Custom Elements', desc: 'Изоляция кастомных элементов' },
      ]
    },
  ]

  return (
    <div className="page-container">
      <h1>📅 Timeline HTML</h1>
      <p className="page-description">
        История развития HTML от HTML5 к Living Standard. 
        Ключевые фичи и когда они появились.
      </p>

      <div className="info-box">
        <strong>💡 Living Standard</strong>
        <p style={{ marginTop: '8px' }}>
          С 2019 года HTML развивается как "Living Standard" — постоянно обновляемая спецификация 
          без версий. WHATWG (не W3C) теперь главный источник стандарта.
        </p>
      </div>

      <div className="timeline">
        {timelineData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-content">
              <h3 style={{ marginBottom: '12px' }}>{item.title}</h3>
              <div className="grid-2" style={{ gap: '8px' }}>
                {item.features.map((feature, fIndex) => (
                  <div key={fIndex} style={{ 
                    padding: '8px 12px', 
                    background: 'var(--bg-secondary)', 
                    borderRadius: '6px',
                    borderLeft: '3px solid var(--accent)'
                  }}>
                    <code style={{ display: 'block', marginBottom: '4px' }}>{feature.name}</code>
                    <span style={{ fontSize: '0.85em', color: 'var(--text-secondary)' }}>{feature.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '32px' }}>
        <h2>🔄 Процесс стандартизации</h2>
        <div className="grid-3" style={{ marginTop: '16px' }}>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--accent)' }}>1. Proposal</h4>
            <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Идея обсуждается в GitHub issues WHATWG или W3C
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--accent)' }}>2. Incubation</h4>
            <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Разработка в WICG, эксперименты в браузерах за флагами
            </p>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
            <h4 style={{ color: 'var(--accent)' }}>3. Baseline</h4>
            <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Поддержка во всех основных браузерах, безопасно использовать
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .timeline-item:nth-child(odd) .timeline-item::before {
          background: var(--accent-secondary);
        }
      `}</style>
    </div>
  )
}
