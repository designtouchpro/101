import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function AnimationsPage() {
  const [pulseActive, setPulseActive] = useState(false)
  const [flipAngle, setFlipAngle] = useState(0)
  const [cardColor, setCardColor] = useState('#3b82f6')
  const [springBounce, setSpringBounce] = useState(0.3)
  const [springDuration, setSpringDuration] = useState(0.5)
  const [springActive, setSpringActive] = useState(false)
  const [currentEasing, setCurrentEasing] = useState('ease-in-out')
  const [showBanner, setShowBanner] = useState(false)
  const [heroExpanded, setHeroExpanded] = useState(false)

  return (
    <div className="demo-container">
      <h1>✨ Animations</h1>
      <p>
        Анимации в SwiftUI — одна из самых впечатляющих частей фреймворка. Достаточно одной строки
        кода, чтобы анимировать практически любое свойство View. SwiftUI автоматически интерполирует
        переход между состояниями — тебе не нужно описывать каждый кадр.
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            В React анимации обычно делаются через CSS transitions, Framer Motion или
            react-spring. В SwiftUI анимации — часть фреймворка. Не нужно ставить библиотеки.
            Декларативный подход: «При изменении этого состояния — анимируй все затронутые View».
            Это проще, чем <code>transition</code> в CSS или <code>animate()</code> в Framer Motion.
          </p>
        </div>
      </div>

      {/* ─── Implicit Animations ─── */}
      <section className="card">
        <h2>🎬 Implicit Animations — модификатор .animation()</h2>
        <p>
          Неявные анимации — самый простой способ. Добавляешь <code>.animation()</code> к View,
          и любое изменение анимируемого свойства будет плавным. Это аналог
          <code>transition: all 0.3s ease</code> в CSS.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI</h3>
            <CodeBlock language="swift" code={`
struct PulseButton: View {
    @State private var isPressed = false
    
    var body: some View {
        Circle()
            .fill(isPressed ? .red : .blue)
            .frame(width: isPressed ? 120 : 80,
                   height: isPressed ? 120 : 80)
            .scaleEffect(isPressed ? 1.2 : 1.0)
            .opacity(isPressed ? 0.8 : 1.0)
            // Одна строка — все свойства выше анимируются!
            .animation(.easeInOut(duration: 0.3), value: isPressed)
            .onTapGesture {
                isPressed.toggle()
            }
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ CSS Transition</h3>
            <CodeBlock language="swift" code={`
// CSS подход
.circle {
  width: 80px;
  height: 80px;
  background: blue;
  border-radius: 50%;
  /* Аналог .animation() */
  transition: all 0.3s ease-in-out;
}
.circle.pressed {
  width: 120px;
  height: 120px;
  background: red;
  transform: scale(1.2);
  opacity: 0.8;
}

// React
function PulseButton() {
  const [pressed, setPressed] = useState(false)
  return (
    <div 
      className={\`circle \${pressed ? 'pressed' : ''}\`}
      onClick={() => setPressed(p => !p)}
    />
  )
}`} />
          </div>
        </div>

        <div className="info-box">
          <strong>⚠️ value: параметр:</strong> Модификатор <code>.animation(.easeInOut, value: isPressed)</code>
          привязан к конкретному значению. Анимация запустится только когда <code>isPressed</code> изменится.
          Без <code>value:</code> будут анимироваться ВСЕ изменения — это нежелательно.
        </div>

        {/* Live Pulse Button Demo */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)' }}>🎮 Живой пример: Implicit Animation</h4>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Нажмите на круг — все свойства анимируются одновременно, как <code>.animation(.easeInOut, value: isPressed)</code>
          </p>
          <div
            onClick={() => setPulseActive(v => !v)}
            style={{
              width: pulseActive ? 120 : 80,
              height: pulseActive ? 120 : 80,
              borderRadius: '50%',
              background: pulseActive ? '#ef4444' : '#3b82f6',
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              transform: `scale(${pulseActive ? 1.2 : 1})`,
              opacity: pulseActive ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: pulseActive ? '1.1rem' : '0.85rem',
              boxShadow: pulseActive ? '0 8px 32px rgba(239,68,68,0.4)' : '0 4px 16px rgba(59,130,246,0.3)',
              userSelect: 'none',
            }}
          >
            {pulseActive ? 'ON' : 'Tap'}
          </div>
          <div style={{ marginTop: '12px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            isPressed = {String(pulseActive)}
          </div>
        </div>
      </section>

      {/* ─── Explicit Animations ─── */}
      <section className="card">
        <h2>🎯 Explicit Animations — withAnimation {'{}'}</h2>
        <p>
          Явные анимации — ты контролируешь <em>какое именно изменение</em> будет анимировано.
          Оборачиваешь изменение состояния в <code>withAnimation</code>. Это более точный
          контроль, чем implicit animation — аналог <code>animate()</code> из Framer Motion.
        </p>

        <CodeBlock language="swift" title="withAnimation — явная анимация" code={`
struct CardFlip: View {
    @State private var isFlipped = false
    @State private var rotation: Double = 0
    @State private var cardOffset: CGFloat = 0
    
    var body: some View {
        VStack(spacing: 30) {
            // Карточка
            RoundedRectangle(cornerRadius: 16)
                .fill(isFlipped ? .green : .blue)
                .frame(width: 200, height: 120)
                .rotation3DEffect(.degrees(rotation), axis: (x: 0, y: 1, z: 0))
                .offset(x: cardOffset)
            
            HStack(spacing: 20) {
                // Анимированное изменение
                Button("Перевернуть") {
                    withAnimation(.spring(duration: 0.6, bounce: 0.3)) {
                        isFlipped.toggle()
                        rotation += 180
                    }
                }
                
                // Разные анимации для разных действий
                Button("Сдвинуть") {
                    withAnimation(.easeInOut(duration: 0.5)) {
                        cardOffset = cardOffset == 0 ? 100 : 0
                    }
                }
                
                // Без анимации — мгновенно
                Button("Сброс") {
                    isFlipped = false
                    rotation = 0
                    cardOffset = 0
                }
            }
        }
    }
}`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI explicit</h3>
            <CodeBlock language="swift" code={`
// Только это изменение анимируется
withAnimation(.spring) {
    isExpanded = true
}

// А это — нет (мгновенно)
count += 1`} />
          </div>
          <div className="feature-card">
            <h3>Framer Motion</h3>
            <CodeBlock language="swift" code={`
// Framer Motion — контроль через variants
<motion.div
  animate={{ height: isExpanded ? 200 : 0 }}
  transition={{ type: "spring" }}
/>`} />
          </div>
        </div>

        {/* Live Card Flip Demo */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)' }}>🎮 Живой пример: withAnimation</h4>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Нажмите «Перевернуть» — карточка повернётся с пружинной анимацией
          </p>
          <div style={{
            width: 200, height: 120,
            borderRadius: '16px',
            background: flipAngle % 360 >= 180 ? '#22c55e' : cardColor,
            margin: '0 auto 16px',
            transition: `transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s`,
            transform: `perspective(600px) rotateY(${flipAngle}deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: '1.1rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          }}>
            {flipAngle % 360 >= 90 && flipAngle % 360 < 270 ? '🔄 Back' : '🃏 Front'}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setFlipAngle(a => a + 180)}>
              Перевернуть
            </button>
            <button className="btn btn-secondary" onClick={() => setCardColor(cardColor === '#3b82f6' ? '#8b5cf6' : '#3b82f6')}>
              Сменить цвет
            </button>
            <button className="btn" onClick={() => { setFlipAngle(0); setCardColor('#3b82f6') }}>
              Сброс
            </button>
          </div>
          <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            rotation = {flipAngle}°
          </div>
        </div>
      </section>

      {/* ─── Типы анимаций ─── */}
      <section className="card">
        <h2>🎨 Типы анимаций</h2>
        <p>
          SwiftUI предлагает несколько типов анимаций — от простых easing-функций до
          физически-корректных пружин.
        </p>

        <CodeBlock language="swift" title="Все типы анимаций" code={`
// ═══ Easing (как CSS timing functions) ═══
.animation(.linear(duration: 0.3))           // постоянная скорость
.animation(.easeIn(duration: 0.3))           // медленный старт
.animation(.easeOut(duration: 0.3))          // медленный финиш
.animation(.easeInOut(duration: 0.3))        // медленный старт и финиш

// ═══ Spring (пружинная) — самый естественный тип ═══

// Новый API (iOS 17+) — рекомендуемый
.animation(.spring(duration: 0.5, bounce: 0.3))   // bounce: 0...1
.animation(.spring(duration: 0.5, bounce: 0))     // без отскока
.animation(.spring(duration: 0.3, bounce: 0.7))   // сильный отскок

// Старый API — всё ещё рабочий
.animation(.spring(response: 0.5, dampingFraction: 0.6, blendDuration: 0))
.animation(.interactiveSpring(response: 0.3, dampingFraction: 0.7))

// Предустановки
.animation(.smooth)      // плавный spring без bounce
.animation(.snappy)      // быстрый spring, лёгкий bounce
.animation(.bouncy)      // выраженный bounce

// ═══ Модификаторы анимаций ═══
.animation(.easeInOut(duration: 0.5).delay(0.2))     // задержка
.animation(.spring.speed(2))                          // скорость x2
.animation(.easeOut.repeatCount(3, autoreverses: true)) // повтор 3 раза
.animation(.linear(duration: 1).repeatForever())       // бесконечный повтор`} />

        <div className="info-box">
          <strong>💡 Совет:</strong> В 90% случаев используй <code>.spring</code> — пружинные
          анимации выглядят наиболее естественно для UI. Apple рекомендует <code>.smooth</code>
          для большинства случаев. Easing-функции остались для совместимости.
        </div>

        {/* Live Easing Comparison */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)', textAlign: 'center' }}>🎮 Сравнение типов анимаций</h4>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Выберите тип и нажмите «Запустить» — шарик проедет от начала до конца
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
            {(['linear', 'ease-in', 'ease-out', 'ease-in-out'] as const).map(easing => (
              <button
                key={easing}
                className={`btn ${currentEasing === easing ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setCurrentEasing(easing)}
                style={{ fontSize: '0.8rem' }}
              >
                {easing}
              </button>
            ))}
          </div>

          {/* Spring controls */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Duration:
              <input type="range" min={0.2} max={2} step={0.1} value={springDuration} onChange={e => setSpringDuration(Number(e.target.value))} style={{ width: '80px', accentColor: 'var(--accent-color)' }} />
              <span style={{ fontFamily: 'monospace', minWidth: '30px' }}>{springDuration}s</span>
            </label>
          </div>

          {/* Animated bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {(['linear', 'ease-in', 'ease-out', 'ease-in-out'] as const).map(easing => (
              <div key={easing} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '90px', fontSize: '0.75rem', fontFamily: 'monospace', color: easing === currentEasing ? 'var(--accent-color)' : 'var(--text-secondary)', fontWeight: easing === currentEasing ? 700 : 400 }}>{easing}</div>
                <div style={{ flex: 1, height: '32px', background: 'var(--bg-primary)', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    width: '28px', height: '28px',
                    borderRadius: '50%',
                    background: easing === currentEasing ? 'var(--accent-color)' : 'var(--text-secondary)',
                    position: 'absolute', top: '2px',
                    left: springActive ? 'calc(100% - 30px)' : '2px',
                    transition: `left ${springDuration}s ${easing}`,
                  }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="btn btn-primary" onClick={() => setSpringActive(v => !v)}>
              {springActive ? '↩ Назад' : '▶ Запустить'}
            </button>
          </div>
        </div>
      </section>

      {/* ─── Transitions ─── */}
      <section className="card">
        <h2>🔄 Transitions — появление и исчезновение</h2>
        <p>
          <code>.transition()</code> определяет, как View появляется и исчезает из иерархии.
          Это аналог <code>AnimatePresence</code> из Framer Motion или CSS-классов
          <code>enter/leave</code> в Vue.
        </p>

        <CodeBlock language="swift" title="Transitions для появления/исчезновения" code={`
struct NotificationBanner: View {
    @State private var showBanner = false
    
    var body: some View {
        VStack {
            // Баннер появляется/исчезает с анимацией
            if showBanner {
                Text("Операция успешна!")
                    .padding()
                    .background(.green)
                    .cornerRadius(12)
                    // Transition — как элемент входит/выходит
                    .transition(.move(edge: .top).combined(with: .opacity))
            }
            
            Spacer()
            
            Button("Показать баннер") {
                withAnimation(.spring(duration: 0.4)) {
                    showBanner.toggle()
                }
            }
        }
    }
}

// ═══ Встроенные transitions ═══
.transition(.opacity)                           // fade in/out
.transition(.scale)                             // zoom in/out  
.transition(.slide)                             // slide from leading
.transition(.move(edge: .top))                  // slide from top
.transition(.move(edge: .bottom))               // slide from bottom

// Комбинированные
.transition(.opacity.combined(with: .scale))    // fade + zoom
.transition(.asymmetric(                         // разный вход и выход
    insertion: .move(edge: .trailing),           // вход справа
    removal: .move(edge: .leading)               // выход влево
))

// Кастомный с модификаторами
.transition(
    .scale(scale: 0.5)
    .combined(with: .opacity)
    .animation(.spring(bounce: 0.4))
)`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI Transition</h3>
            <CodeBlock language="swift" code={`
if showModal {
    ModalView()
        .transition(.move(edge: .bottom))
}

// Анимация контролируется withAnimation
Button("Toggle") {
    withAnimation(.spring) {
        showModal.toggle()
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>Framer Motion AnimatePresence</h3>
            <CodeBlock language="swift" code={`
<AnimatePresence>
  {showModal && (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring' }}
    >
      <Modal />
    </motion.div>
  )}
</AnimatePresence>`} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <PhoneMockup title="Transitions">
            <div className="sim-vstack" style={{ gap: '16px', padding: '16px', minHeight: '200px' }}>
              {showBanner && (
                <div style={{
                  padding: '12px 16px', borderRadius: '12px', background: '#34c759',
                  color: '#fff', fontWeight: 600, textAlign: 'center', fontSize: '14px',
                  animation: 'slideDown 0.4s ease-out'
                }}>
                  ✅ Операция успешна!
                </div>
              )}
              <div className="sim-spacer" />
              <button className="sim-button--filled" onClick={() => setShowBanner(v => !v)}>
                {showBanner ? 'Скрыть баннер' : 'Показать баннер'}
              </button>
              <span className="sim-text--secondary" style={{ fontSize: '11px', textAlign: 'center' }}>
                .transition(.move(edge: .top).combined(with: .opacity))
              </span>
            </div>
          </PhoneMockup>
        </div>
      </section>
      <section className="card">
        <h2>🪄 matchedGeometryEffect — Shared Element Transitions</h2>
        <p>
          Один из самых мощных инструментов — <code>matchedGeometryEffect</code> позволяет
          плавно анимировать элемент между двумя состояниями/позициями. Это как
          <code>layoutId</code> в Framer Motion — «shared element transition».
        </p>

        <CodeBlock language="swift" title="matchedGeometryEffect — плавный переход" code={`
struct HeroAnimation: View {
    @State private var isExpanded = false
    @Namespace private var animation  // пространство имён для связи
    
    var body: some View {
        VStack {
            if isExpanded {
                // Развёрнутое состояние
                VStack {
                    RoundedRectangle(cornerRadius: 20)
                        .fill(.blue)
                        .matchedGeometryEffect(id: "card", in: animation)
                        .frame(height: 300)
                    
                    Text("Детальное описание")
                        .matchedGeometryEffect(id: "title", in: animation)
                        .font(.title)
                    
                    Text("Здесь контент карточки...")
                        .padding()
                    
                    Button("Свернуть") {
                        withAnimation(.spring(duration: 0.5, bounce: 0.3)) {
                            isExpanded = false
                        }
                    }
                }
                .padding()
            } else {
                // Свёрнутое состояние
                HStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(.blue)
                        .matchedGeometryEffect(id: "card", in: animation)
                        .frame(width: 60, height: 60)
                    
                    Text("Детальное описание")
                        .matchedGeometryEffect(id: "title", in: animation)
                        .font(.headline)
                    
                    Spacer()
                }
                .padding()
                .onTapGesture {
                    withAnimation(.spring(duration: 0.5, bounce: 0.3)) {
                        isExpanded = true
                    }
                }
            }
        }
    }
}`} />

        <div className="info-box">
          <strong>💡 @Namespace:</strong> <code>@Namespace</code> создаёт уникальное пространство
          для связи элементов. Элементы с одинаковым <code>id</code> и <code>namespace</code>
          будут плавно переходить между позициями. Аналог <code>layoutId</code> в Framer Motion.
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <PhoneMockup title="Hero">
            <div style={{ padding: '16px' }}>
              {heroExpanded ? (
                <div style={{ animation: 'fadeIn 0.3s ease' }}>
                  <div style={{
                    width: '100%', height: '160px', borderRadius: '16px',
                    background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                    marginBottom: '12px', transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)'
                  }} />
                  <span className="sim-text" style={{ fontSize: '20px', fontWeight: 700, display: 'block' }}>
                    Детальное описание
                  </span>
                  <span className="sim-text--secondary" style={{ fontSize: '13px', display: 'block', margin: '8px 0' }}>
                    Здесь контент карточки...
                  </span>
                  <button className="sim-button--filled" onClick={() => setHeroExpanded(false)} style={{ width: '100%' }}>
                    Свернуть
                  </button>
                </div>
              ) : (
                <div className="sim-hstack" style={{ gap: '12px', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => setHeroExpanded(true)}>
                  <div style={{
                    width: '50px', height: '50px', borderRadius: '10px', flexShrink: 0,
                    background: 'linear-gradient(135deg, #007AFF, #5856D6)',
                    transition: 'all 0.5s cubic-bezier(0.34,1.56,0.64,1)'
                  }} />
                  <span className="sim-text" style={{ fontWeight: 600, fontSize: '15px' }}>
                    Детальное описание
                  </span>
                  <div className="sim-spacer" />
                  <span className="sim-list-row__chevron">›</span>
                </div>
              )}
            </div>
          </PhoneMockup>
        </div>
      </section>

      {/* ─── PhaseAnimator ─── */}
      <section className="card">
        <h2>🔄 PhaseAnimator (iOS 17+)</h2>
        <p>
          <code>PhaseAnimator</code> позволяет создавать многофазные анимации — серию шагов,
          которые выполняются последовательно. Идеально для сложных анимаций загрузки,
          пульсации, attention-привлечения.
        </p>

        <CodeBlock language="swift" title="PhaseAnimator — пошаговая анимация" code={`
// Фазы — enum или массив значений
enum PulsePhase: CaseIterable {
    case initial, scale, rotate, fadeOut
}

struct PulseView: View {
    var body: some View {
        // Автоматически циклит через все фазы
        PhaseAnimator(PulsePhase.allCases) { phase in
            Circle()
                .fill(.blue)
                .frame(width: 80, height: 80)
                .scaleEffect(phase == .scale ? 1.5 : 1.0)
                .rotationEffect(.degrees(phase == .rotate ? 360 : 0))
                .opacity(phase == .fadeOut ? 0.3 : 1.0)
        } animation: { phase in
            // Разная анимация для каждой фазы
            switch phase {
            case .initial: .spring(duration: 0.3)
            case .scale: .easeInOut(duration: 0.4)
            case .rotate: .linear(duration: 0.6)
            case .fadeOut: .easeOut(duration: 0.3)
            }
        }
    }
}

// Простой пульс с массивом Bool
struct SimplePulse: View {
    var body: some View {
        PhaseAnimator([false, true]) { isActive in
            Circle()
                .fill(isActive ? .red : .blue)
                .frame(width: isActive ? 100 : 60)
                .opacity(isActive ? 0.6 : 1.0)
        } animation: { _ in
            .easeInOut(duration: 0.8)
        }
    }
}`} />
      </section>

      {/* ─── KeyframeAnimator ─── */}
      <section className="card">
        <h2>🎹 KeyframeAnimator (iOS 17+)</h2>
        <p>
          <code>KeyframeAnimator</code> — точный контроль свойств по временной шкале,
          как <code>@keyframes</code> в CSS. Каждое свойство может иметь свою timeline.
        </p>

        <CodeBlock language="swift" title="KeyframeAnimator — как CSS @keyframes" code={`
// Структура значений для анимации
struct BounceValues {
    var scale = 1.0
    var yOffset = 0.0
    var rotation = 0.0
}

struct BounceAnimation: View {
    @State private var trigger = false
    
    var body: some View {
        VStack {
            Text("🏀")
                .font(.system(size: 60))
                .keyframeAnimator(
                    initialValue: BounceValues(),
                    trigger: trigger
                ) { content, value in
                    content
                        .scaleEffect(value.scale)
                        .offset(y: value.yOffset)
                        .rotationEffect(.degrees(value.rotation))
                } keyframes: { _ in
                    // Timeline для yOffset
                    KeyframeTrack(\\.yOffset) {
                        CubicKeyframe(0, duration: 0.1)
                        CubicKeyframe(-100, duration: 0.3)     // вверх
                        CubicKeyframe(0, duration: 0.3)         // вниз
                        CubicKeyframe(-50, duration: 0.2)       // отскок
                        CubicKeyframe(0, duration: 0.2)
                    }
                    
                    // Timeline для scale — независимо от yOffset
                    KeyframeTrack(\\.scale) {
                        CubicKeyframe(1.0, duration: 0.1)
                        CubicKeyframe(0.8, duration: 0.3)
                        CubicKeyframe(1.2, duration: 0.3)       // сжатие при приземлении
                        CubicKeyframe(1.0, duration: 0.3)
                    }
                    
                    // Timeline для rotation
                    KeyframeTrack(\\.rotation) {
                        LinearKeyframe(0, duration: 0.2)
                        LinearKeyframe(360, duration: 0.8)
                    }
                }
            
            Button("Бросить") {
                trigger.toggle()
            }
            .padding(.top, 30)
        }
    }
}`} />

        <div className="feature-grid">
          <div className="feature-card">
            <h3>SwiftUI KeyframeAnimator</h3>
            <CodeBlock language="swift" code={`
KeyframeTrack(\\.yOffset) {
    CubicKeyframe(-100, duration: 0.3)
    CubicKeyframe(0, duration: 0.3)
}`} />
          </div>
          <div className="feature-card">
            <h3>CSS @keyframes</h3>
            <CodeBlock language="swift" code={`
@keyframes bounce {
  0%   { transform: translateY(0); }
  30%  { transform: translateY(-100px); }
  60%  { transform: translateY(0); }
  100% { transform: translateY(0); }
}`} />
          </div>
        </div>
      </section>

      {/* ─── Анимируемые свойства ─── */}
      <section className="card">
        <h2>📐 Анимируемые свойства</h2>
        <p>
          Практически все визуальные свойства в SwiftUI анимируемые. Вот основные:
        </p>

        <CodeBlock language="swift" title="Что можно анимировать" code={`
// Геометрия
.frame(width: animated ? 200 : 100)
.offset(x: animated ? 50 : 0)
.position(x: 100, y: animated ? 200 : 50)
.scaleEffect(animated ? 1.5 : 1.0)
.rotationEffect(.degrees(animated ? 360 : 0))
.rotation3DEffect(.degrees(animated ? 180 : 0), axis: (x: 0, y: 1, z: 0))

// Цвет и opacity
.foregroundColor(animated ? .red : .blue)
.background(animated ? Color.green : Color.gray)
.opacity(animated ? 0 : 1)
.shadow(radius: animated ? 20 : 5)

// Эффекты
.blur(radius: animated ? 10 : 0)
.brightness(animated ? 0.5 : 0)
.saturation(animated ? 0 : 1)
.contrast(animated ? 2 : 1)

// Layout
.padding(animated ? 40 : 16)
.cornerRadius(animated ? 50 : 8)

// Trim для рисования (прогресс-бары, графики)
Circle()
    .trim(from: 0, to: animated ? 1.0 : 0.0)  // «рисование» круга
    .stroke(lineWidth: 4)`} />
      </section>

      {/* ─── Итого ─── */}
      <section className="card">
        <h2>📝 Шпаргалка: React Animations → SwiftUI</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>React / Web</h3>
            <ul>
              <li><code>CSS transition</code></li>
              <li><code>CSS @keyframes</code></li>
              <li>Framer Motion <code>animate</code></li>
              <li>Framer Motion <code>AnimatePresence</code></li>
              <li>Framer Motion <code>layoutId</code></li>
              <li><code>requestAnimationFrame</code></li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <ul>
              <li><code>.animation()</code> implicit</li>
              <li><code>KeyframeAnimator</code></li>
              <li><code>withAnimation {'{}'}</code> explicit</li>
              <li><code>.transition()</code></li>
              <li><code>matchedGeometryEffect</code></li>
              <li><code>PhaseAnimator</code> / <code>TimelineView</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
