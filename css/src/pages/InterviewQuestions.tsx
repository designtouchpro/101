import { useState } from 'react'

interface InterviewItem {
  q: string
  a: string
}

const categories: { title: string; icon: string; items: InterviewItem[] }[] = [
  {
    title: 'Box Model и Layout',
    icon: '📦',
    items: [
      {
        q: 'Объясните CSS Box Model. Чем отличаются content-box и border-box?',
        a: 'Box Model: content → padding → border → margin. content-box (по умолчанию): width/height задают только content, padding и border добавляются сверху. border-box: width/height включают content + padding + border. Почти все проекты используют *, *::before, *::after { box-sizing: border-box } для предсказуемости.'
      },
      {
        q: 'Что такое BFC (Block Formatting Context)? Как его создать?',
        a: 'BFC — изолированная область, где блочные элементы размещаются независимо от внешнего контекста. Создаётся: overflow: hidden/auto/scroll, display: flow-root (самый чистый способ), float, position: absolute/fixed, display: flex/grid/inline-block. BFC предотвращает margin collapsing, содержит float-элементы, не наезжает на float-соседей.'
      },
      {
        q: 'Что такое margin collapsing? Когда схлопываются отступы?',
        a: 'Вертикальные margin соседних блочных элементов объединяются в один (больший). Правила: 1) Смежные siblings — берётся max(margin1, margin2). 2) Родитель и первый/последний потомок — если нет border/padding между ними. 3) Пустой блок — его top и bottom margin схлопываются. НЕ схлопываются: горизонтальные margin, внутри flex/grid, элементы с float/position: absolute.'
      },
      {
        q: 'Как центрировать элемент по горизонтали и вертикали? Все способы.',
        a: '1) Flexbox: display: flex; justify-content: center; align-items: center — самый популярный. 2) Grid: display: grid; place-items: center — самый короткий. 3) Position + transform: position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%). 4) margin: auto в grid/flex контейнере. 5) Горизонтально: text-align: center для inline, margin: 0 auto для block.'
      },
    ]
  },
  {
    title: 'Специфичность и Каскад',
    icon: '⚖️',
    items: [
      {
        q: 'Как рассчитывается специфичность CSS? Приведите примеры.',
        a: 'Специфичность = (inline, #id, .class/[attr]/:pseudo-class, element/::pseudo-element). Примеры: div = (0,0,0,1), .card = (0,0,1,0), #header = (0,1,0,0), div.card.active = (0,0,2,1), #nav .link:hover = (0,1,2,0), style="" = (1,0,0,0). !important побеждает всё (антипаттерн). При равной специфичности — побеждает последний в коде.'
      },
      {
        q: 'Как работает CSS каскад? Порядок приоритетов?',
        a: 'Каскад определяет, какое правило победит: 1) !important (user-agent → user → author → author !important → user !important → user-agent !important). 2) Inline styles. 3) Специфичность (id > class > element). 4) Порядок в коде (позднее побеждает). Cascade Layers (@layer) добавляют новый уровень между origin и specificity.'
      },
      {
        q: 'Объясните Cascade Layers (@layer). Зачем они нужны?',
        a: '@layer позволяет группировать стили по слоям с явным приоритетом. Порядок объявления = порядок приоритета (последний слой побеждает). @layer reset, base, components, utilities; — reset имеет наименьший приоритет. Решает проблему: можно писать стили без гонки специфичности. Стили без @layer всегда побеждают layered стили.'
      },
      {
        q: 'Отличие :is() от :where()?',
        a: 'Оба принимают список селекторов и упрощают код. :is(.a, .b) .child = .a .child, .b .child. Главное отличие: :is() БЕРЁТ специфичность самого сильного аргумента, :where() ВСЕГДА имеет специфичность 0. Используйте :where() для reset/base стилей (легко переопределить), :is() для обычных стилей.'
      },
    ]
  },
  {
    title: 'Flexbox и Grid',
    icon: '🔲',
    items: [
      {
        q: 'Flexbox vs Grid — когда что использовать?',
        a: 'Flexbox — одномерный (строка ИЛИ колонка). Идеален для: навигации, выравнивания элементов, карточек в ряд, динамического кол-ва элементов. Grid — двумерный (строки И колонки). Идеален для: страничных layout-ов, сложных сеток, когда нужен контроль по двум осям. Практика: Grid для layout страницы, Flexbox для компонентов внутри.'
      },
      {
        q: 'Объясните flex: 1 1 0. Что значат три значения?',
        a: 'flex: <grow> <shrink> <basis>. flex-grow: 1 = занимает долю свободного пространства. flex-shrink: 1 = может сжиматься. flex-basis: 0 = начальный размер 0 (распределяет ВСЁ пространство). flex: 1 = flex: 1 1 0. flex: auto = flex: 1 1 auto (basis = content size). flex: none = flex: 0 0 auto (фиксированный).'
      },
      {
        q: 'Что такое Container Queries и чем отличаются от Media Queries?',
        a: 'Media Queries реагируют на размер viewport (окна). Container Queries (@container) реагируют на размер контейнера-родителя. Нужно объявить container-type: inline-size на родителе. Преимущество: компонент адаптируется к своему контексту, а не к экрану. Идеально для переиспользуемых компонентов в разных layout-ах.'
      },
      {
        q: 'Что такое Subgrid? Когда использовать?',
        a: 'Subgrid позволяет дочерней grid-ячейке наследовать grid-линии родителя. grid-template-columns: subgrid / grid-template-rows: subgrid. Решает проблему: карточки в grid с выровненными заголовками, ценами и кнопками. Без subgrid каждая карточка — отдельный grid и элементы не выравниваются между карточками.'
      },
    ]
  },
  {
    title: 'Позиционирование',
    icon: '📍',
    items: [
      {
        q: 'Объясните все значения position в CSS.',
        a: 'static — по умолчанию, обычный поток. relative — смещается от своей позиции, остаётся в потоке. absolute — относительно ближайшего positioned предка, выпадает из потока. fixed — относительно viewport, выпадает из потока. sticky — relative до порога, потом fixed. Sticky: нужен top/left, прилипает к ближайшему scroll-контейнеру.'
      },
      {
        q: 'Как работает z-index? Что такое stacking context?',
        a: 'z-index работает ТОЛЬКО на positioned элементах (не static) или flex/grid items. Stacking context — группа элементов с общим порядком перекрытия. Создаётся: position + z-index ≠ auto, opacity < 1, transform, filter, will-change. Важно: z-index: 9999 не поможет, если stacking context родителя ниже. Порядок внутри контекста: background → z-index < 0 → block → float → inline → z-index ≥ 0.'
      },
      {
        q: 'Как работает position: sticky? Подводные камни?',
        a: 'sticky = relative + fixed. Элемент ведёт себя как relative пока не достигнет порога (top: 0), потом становится fixed в рамках scroll-контейнера. Подводные камни: 1) Не работает если у родителя overflow: hidden/auto/scroll. 2) Не работает если предок имеет height, ограничивающий зону прилипания. 3) Нужен явный top/bottom/left/right.'
      },
    ]
  },
  {
    title: 'Современный CSS',
    icon: '✨',
    items: [
      {
        q: 'Чем CSS Custom Properties отличаются от переменных Sass/Less?',
        a: 'CSS Custom Properties: 1) Работают в рантайме (Sass — компилируется). 2) Доступны из JS (getComputedStyle, setProperty). 3) Каскадируются и наследуются. 4) Можно менять в media queries, :hover, JS. Sass-переменные: 1) Скоупинг по блоку кода. 2) Циклы, условия, функции. 3) Не каскад. Лучшая практика: используйте оба — Sass для статических значений, CSS vars для динамических.'
      },
      {
        q: 'Как работает :has() селектор? Примеры.',
        a: ':has() — "родительский селектор" (но не только). form:has(input:invalid) — форма, содержащая невалидный input. .card:has(img) — карточка с изображением. h2:has(+ p) — h2, за которым идёт p. Ограничения: нельзя использовать внутри @media, нет поддержки в Firefox < 121. Меняет парадигму — раньше CSS мог стилизовать только вниз по дереву.'
      },
      {
        q: 'Что такое CSS Nesting? Отличие от Sass nesting?',
        a: 'Нативный CSS nesting: .card { & .title { color: red } }. Отличия от Sass: 1) & обязателен (в новой спеке уже нет). 2) Работает в рантайме. 3) Вложенность меняет специфичность как обычные CSS-селекторы. 4) Поддержка @media/@layer вложенных. Sass: & всегда ссылается на родительский селектор, компилируется. Оба дают одинаковый результат, но CSS nesting — без сборки.'
      },
      {
        q: 'Разница между transition и animation? Когда что использовать?',
        a: 'transition: реагирует на изменение свойства (hover, class toggle). Задаёт from/to автоматически. animation: автономная, работает через @keyframes, поддерживает множество шагов, iteration-count, direction. Transition — для simple hover/active эффектов, toggling. Animation — для сложных, многошаговых, автономных анимаций (loader, pulse, skeleton). Используйте transform/opacity для 60fps (GPU-ускорение).'
      },
      {
        q: 'Что такое Logical Properties и зачем они нужны?',
        a: 'Логические свойства заменяют физические (left/right/top/bottom) на inline/block направления. margin-inline-start вместо margin-left. Зачем: правильная поддержка RTL языков (арабский, иврит) без дублирования стилей. Также: text-align: start вместо left. Модель: inline = направление текста, block = перпендикулярно тексту.'
      },
    ]
  },
]

export default function InterviewQuestions() {
  const [openCategories, setOpenCategories] = useState<Set<number>>(() => new Set([0]))

  const toggleCategory = (idx: number) => {
    setOpenCategories(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="page-container">
      <h1>🎯 Вопросы для собеседования — CSS</h1>
      <p className="page-description">
        Самые популярные вопросы по CSS на frontend-собеседованиях.
        Кликните на вопрос, чтобы увидеть ответ.
      </p>

      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="card" style={{ marginBottom: '16px' }}>
          <div 
            className="card-header" 
            style={{ cursor: 'pointer' }}
            onClick={() => toggleCategory(catIdx)}
          >
            <span className="card-title">{cat.icon} {cat.title}</span>
            <span className="card-badge">{cat.items.length} вопросов</span>
          </div>

          {openCategories.has(catIdx) && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
              {cat.items.map((item, i) => (
                <details key={i} className="interview-question">
                  <summary>{item.q}</summary>
                  <div style={{
                    padding: '14px 16px',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.7,
                    borderLeft: '3px solid var(--accent-css)',
                    marginLeft: '16px',
                    marginTop: '8px'
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
