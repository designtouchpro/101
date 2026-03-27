import { useState, useRef, useCallback } from 'react'
import CodeBlock from '../components/CodeBlock'

export default function GesturesPage() {
  const [tapCount, setTapCount] = useState(0)
  const [tapColor, setTapColor] = useState('#3b82f6')
  const [longPressProgress, setLongPressProgress] = useState(0)
  const [longPressComplete, setLongPressComplete] = useState(false)
  const longPressTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

  const startLongPress = useCallback(() => {
    setLongPressProgress(0)
    setLongPressComplete(false)
    let progress = 0
    longPressTimer.current = setInterval(() => {
      progress += 5
      setLongPressProgress(progress)
      if (progress >= 100) {
        if (longPressTimer.current) clearInterval(longPressTimer.current)
        setLongPressComplete(true)
        setTimeout(() => { setLongPressComplete(false); setLongPressProgress(0) }, 1500)
      }
    }, 50)
  }, [])

  const endLongPress = useCallback(() => {
    if (longPressTimer.current) clearInterval(longPressTimer.current)
    if (!longPressComplete) setLongPressProgress(0)
  }, [longPressComplete])

  const handleDragStart = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    dragRef.current = { startX: e.clientX, startY: e.clientY, origX: dragPos.x, origY: dragPos.y }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [dragPos])

  const handleDragMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return
    setDragPos({
      x: dragRef.current.origX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.origY + (e.clientY - dragRef.current.startY),
    })
  }, [isDragging])

  const handleDragEnd = useCallback(() => { setIsDragging(false) }, [])

  return (
    <div className="demo-container">
      <h1>👆 Gestures</h1>
      <p>
        Жесты в SwiftUI — это декларативный способ обработки пользовательского ввода:
        тапы, долгие нажатия, перетаскивание, пинч и вращение. В отличие от web, где жесты
        — это низкоуровневые touch/pointer events, SwiftUI даёт высокоуровневые компоненты,
        которые работают «из коробки».
      </p>

      <div className="info-box">
        <span className="info-box-icon">💡</span>
        <div className="info-box-content">
          <div className="info-box-title">React-разработчику</div>
          <p>
            В React жесты — это <code>onClick</code>, <code>onMouseDown</code>,
            <code>onTouchStart</code> или библиотеки типа <code>react-use-gesture</code> и
            <code>@use-gesture/react</code>. В SwiftUI жесты — первоклассные объекты,
            которые можно комбинировать, секвенировать и привязывать к состоянию.
            Не нужны сторонние библиотеки.
          </p>
        </div>
      </div>

      {/* ─── TapGesture ─── */}
      <section className="card">
        <h2>👆 TapGesture — аналог onClick</h2>
        <p>
          Самый простой жест — тап. <code>.onTapGesture</code> — это как <code>onClick</code>
          в React. Поддерживает одинарный, двойной и тройной тап.
        </p>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>🍎 SwiftUI</h3>
            <CodeBlock language="swift" code={`
struct TapExample: View {
    @State private var tapCount = 0
    @State private var color = Color.blue
    
    var body: some View {
        VStack(spacing: 20) {
            // Простой тап — как onClick
            Circle()
                .fill(color)
                .frame(width: 100, height: 100)
                .onTapGesture {
                    tapCount += 1
                }
            
            Text("Тапов: \\(tapCount)")
            
            // Двойной тап
            Rectangle()
                .fill(.green)
                .frame(width: 150, height: 100)
                .onTapGesture(count: 2) {
                    color = .red  // по двойному тапу
                }
            
            // Тап + долгий тап на одном View
            Text("Нажми или удерживай")
                .padding()
                .background(.orange)
                .cornerRadius(8)
                .onTapGesture {
                    print("Одинарный тап")
                }
                .onLongPressGesture {
                    print("Долгое нажатие!")
                }
        }
    }
}`} />
          </div>
          <div className="feature-card">
            <h3>⚛️ React</h3>
            <CodeBlock language="swift" code={`
function TapExample() {
  const [tapCount, setTapCount] = useState(0)
  const [color, setColor] = useState('blue')
  
  // Простой клик
  return (
    <div>
      <div 
        style={{
          width: 100, height: 100,
          borderRadius: '50%',
          background: color,
        }}
        onClick={() => setTapCount(c => c + 1)}
      />
      
      <p>Тапов: {tapCount}</p>
      
      {/* Двойной клик */}
      <div 
        style={{ width: 150, height: 100, 
                 background: 'green' }}
        onDoubleClick={() => setColor('red')}
      />
    </div>
  )
}`} />
          </div>
        </div>

        {/* Live Tap Demo */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)' }}>🎮 Живой пример: TapGesture</h4>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Нажмите на круг (одинарный клик). Двойной клик — меняет цвет.
          </p>
          <div
            onClick={() => setTapCount(c => c + 1)}
            onDoubleClick={() => setTapColor(c => c === '#3b82f6' ? '#ef4444' : c === '#ef4444' ? '#22c55e' : '#3b82f6')}
            style={{
              width: 100, height: 100,
              borderRadius: '50%',
              background: tapColor,
              margin: '0 auto',
              cursor: 'pointer',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              transform: `scale(${1 + (tapCount % 5) * 0.05})`,
              boxShadow: `0 4px ${12 + tapCount * 2}px ${tapColor}66`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '1.5rem',
              userSelect: 'none',
            }}
          >
            {tapCount}
          </div>
          <div style={{ marginTop: '12px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            tapCount = {tapCount} &nbsp;|&nbsp; color = {tapColor}
          </div>
        </div>
      </section>

      {/* ─── LongPressGesture ─── */}
      <section className="card">
        <h2>✊ LongPressGesture — долгое нажатие</h2>
        <p>
          <code>LongPressGesture</code> распознаёт долгое нажатие с настраиваемой длительностью.
          Можно отследить момент начала нажатия (для визуального feedback) и завершения.
        </p>

        <CodeBlock language="swift" title="LongPressGesture с визуальным feedback" code={`
struct LongPressButton: View {
    @State private var isPressed = false
    @State private var isCompleted = false
    
    var body: some View {
        Circle()
            .fill(isCompleted ? .green : (isPressed ? .yellow : .blue))
            .frame(width: 100, height: 100)
            .scaleEffect(isPressed ? 1.3 : 1.0)
            .animation(.spring(duration: 0.3), value: isPressed)
            .gesture(
                LongPressGesture(minimumDuration: 1.0)
                    // Момент начала нажатия — для visual feedback
                    .onChanged { isPressing in
                        isPressed = isPressing
                    }
                    // Жест завершён — палец удерживался 1 секунду
                    .onEnded { _ in
                        isCompleted = true
                        isPressed = false
                        
                        // Сброс через 2 секунды
                        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
                            isCompleted = false
                        }
                    }
            )
        
        Text(isCompleted ? "✅ Готово!" : isPressed ? "Удерживай..." : "Зажми на 1 сек")
    }
}

// Простой вариант через модификатор
Text("Удали элемент")
    .onLongPressGesture(minimumDuration: 0.5) {
        deleteItem()
    } onPressingChanged: { isPressing in
        // visual feedback
        withAnimation { isHighlighted = isPressing }
    }`} />

        {/* Live Long Press Demo */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)' }}>🎮 Живой пример: LongPressGesture</h4>
          <p style={{ margin: '0 0 16px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Зажмите круг и удерживайте — прогресс заполнится за 1 секунду
          </p>
          <div
            onPointerDown={startLongPress}
            onPointerUp={endLongPress}
            onPointerLeave={endLongPress}
            style={{
              width: 110, height: 110,
              borderRadius: '50%',
              background: longPressComplete
                ? '#22c55e'
                : `conic-gradient(#f59e0b ${longPressProgress * 3.6}deg, var(--bg-primary) ${longPressProgress * 3.6}deg)`,
              margin: '0 auto',
              cursor: 'pointer',
              transition: longPressComplete ? 'all 0.3s ease' : 'none',
              transform: `scale(${longPressProgress > 0 ? 1.15 : 1})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              userSelect: 'none',
              position: 'relative',
            }}
          >
            <div style={{
              width: 90, height: 90,
              borderRadius: '50%',
              background: longPressComplete ? '#22c55e' : 'var(--bg-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem',
              transition: 'background 0.3s ease',
            }}>
              {longPressComplete ? '✅' : longPressProgress > 0 ? '⏳' : '👆'}
            </div>
          </div>
          <div style={{ marginTop: '12px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {longPressComplete ? 'Готово!' : longPressProgress > 0 ? `Прогресс: ${longPressProgress}%` : 'Зажмите на 1 сек'}
          </div>
        </div>
      </section>

      {/* ─── DragGesture ─── */}
      <section className="card">
        <h2>🤏 DragGesture — перетаскивание</h2>
        <p>
          <code>DragGesture</code> — основа для перетаскивания, свайпов и кастомных слайдеров.
          Отслеживает позицию пальца, смещение, скорость. В React для этого нужен
          <code>onPointerDown</code> + <code>onPointerMove</code> или библиотека жестов.
        </p>

        <CodeBlock language="swift" title="DragGesture — перетаскивание объекта" code={`
struct DraggableCard: View {
    // @GestureState — автоматически возвращается к начальному значению
    // когда жест заканчивается (аналог transient state)
    @GestureState private var dragOffset = CGSize.zero
    
    // @State — сохраняет позицию после отпускания
    @State private var position = CGSize.zero
    
    var body: some View {
        RoundedRectangle(cornerRadius: 16)
            .fill(.blue)
            .frame(width: 150, height: 100)
            .offset(
                x: position.width + dragOffset.width,
                y: position.height + dragOffset.height
            )
            .gesture(
                DragGesture()
                    // updating — вызывается каждый кадр при перетаскивании
                    // Обновляет @GestureState (сбросится автоматически)
                    .updating($dragOffset) { value, state, _ in
                        state = value.translation
                    }
                    // onEnded — когда палец отпущен
                    .onEnded { value in
                        position.width += value.translation.width
                        position.height += value.translation.height
                    }
            )
            .animation(.spring, value: dragOffset)
    }
}`} />

        <div className="info-box">
          <strong>💡 @GestureState vs @State:</strong> <code>@GestureState</code> автоматически
          сбрасывается в начальное значение, когда жест заканчивается — идеально для
          «транзиентного» смещения во время драга. <code>@State</code> сохраняет значение
          после окончания жеста — для финальной позиции.
        </div>

        {/* Live Drag Demo */}
        <div style={{
          margin: '20px 0',
          padding: '24px',
          background: 'var(--bg-tertiary)',
          borderRadius: '16px',
          border: '2px dashed var(--accent-color)',
          textAlign: 'center',
        }}>
          <h4 style={{ margin: '0 0 8px', color: 'var(--accent-color)' }}>🎮 Живой пример: DragGesture</h4>
          <p style={{ margin: '0 0 12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Перетащите карточку мышкой — она следует за курсором
          </p>
          <div style={{
            width: '100%', height: '200px',
            background: 'var(--bg-primary)',
            borderRadius: '12px',
            position: 'relative',
            overflow: 'hidden',
            touchAction: 'none',
          }}>
            <div
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              style={{
                width: 120, height: 80,
                borderRadius: '12px',
                background: isDragging ? '#8b5cf6' : '#3b82f6',
                position: 'absolute',
                left: '50%', top: '50%',
                transform: `translate(calc(-50% + ${dragPos.x}px), calc(-50% + ${dragPos.y}px))`,
                cursor: isDragging ? 'grabbing' : 'grab',
                transition: isDragging ? 'none' : 'background 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '0.85rem',
                boxShadow: isDragging ? '0 12px 32px rgba(0,0,0,0.3)' : '0 4px 16px rgba(0,0,0,0.2)',
                userSelect: 'none',
              }}
            >
              {isDragging ? '🤏 Drag' : '👋 Grab me'}
            </div>
          </div>
          <div style={{ marginTop: '8px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            offset = ({dragPos.x.toFixed(0)}, {dragPos.y.toFixed(0)})
          </div>
          <button className="btn btn-secondary" onClick={() => setDragPos({ x: 0, y: 0 })} style={{ marginTop: '8px', fontSize: '0.8rem' }}>
            Вернуть на место
          </button>
        </div>
      </section>

      {/* ─── DragGesture — практический пример ─── */}
      <section className="card">
        <h2>🃏 Пример: Draggable Card со свайпом</h2>
        <p>
          Построим карточку, которую можно свайпнуть влево/вправо (как в Tinder).
          Демонстрирует DragGesture с порогом, вращением и snap-back анимацией.
        </p>

        <CodeBlock language="swift" title="Swipeable Card — как в Tinder" code={`
struct SwipeableCard: View {
    @State private var offset = CGSize.zero
    @State private var color = Color.blue
    
    var body: some View {
        RoundedRectangle(cornerRadius: 20)
            .fill(color)
            .frame(width: 300, height: 400)
            .overlay(
                VStack {
                    Text("Свайпни меня!")
                        .font(.title).bold()
                        .foregroundColor(.white)
                    
                    if abs(offset.width) > 50 {
                        Text(offset.width > 0 ? "👍 LIKE" : "👎 NOPE")
                            .font(.largeTitle).bold()
                            .foregroundColor(.white)
                    }
                }
            )
            .offset(x: offset.width, y: offset.height * 0.3)
            // Вращение пропорционально смещению
            .rotationEffect(.degrees(Double(offset.width / 20)))
            .gesture(
                DragGesture()
                    .onChanged { gesture in
                        offset = gesture.translation
                        
                        // Меняем цвет в зависимости от направления
                        withAnimation {
                            if gesture.translation.width > 0 {
                                color = .green
                            } else {
                                color = .red
                            }
                        }
                    }
                    .onEnded { gesture in
                        // Если свайп достаточно далёкий — убрать карточку
                        if abs(gesture.translation.width) > 150 {
                            withAnimation(.spring) {
                                offset.width = gesture.translation.width > 0 
                                    ? 500 : -500
                            }
                        } else {
                            // Snap back — вернуть на место
                            withAnimation(.spring(duration: 0.5, bounce: 0.4)) {
                                offset = .zero
                                color = .blue
                            }
                        }
                    }
            )
    }
}`} />
      </section>

      {/* ─── MagnificationGesture ─── */}
      <section className="card">
        <h2>🔍 MagnificationGesture — пинч для зума</h2>
        <p>
          <code>MagnificationGesture</code> (он же pinch-to-zoom) отслеживает масштабирование
          двумя пальцами. На web это обычно делается через <code>wheel</code> event или
          touch events с расчётом расстояния.
        </p>

        <CodeBlock language="swift" title="Pinch-to-zoom на изображении" code={`
struct ZoomableImage: View {
    @State private var currentScale: CGFloat = 1.0
    @GestureState private var gestureScale: CGFloat = 1.0
    
    var body: some View {
        Image("photo")
            .resizable()
            .scaledToFit()
            .scaleEffect(currentScale * gestureScale)
            .gesture(
                MagnificationGesture()
                    .updating($gestureScale) { value, state, _ in
                        state = value  // обновляем масштаб в реальном времени
                    }
                    .onEnded { value in
                        currentScale *= value
                        // Ограничиваем масштаб
                        currentScale = min(max(currentScale, 0.5), 5.0)
                    }
            )
            // Двойной тап для сброса
            .onTapGesture(count: 2) {
                withAnimation(.spring) {
                    currentScale = 1.0
                }
            }
    }
}`} />
      </section>

      {/* ─── RotationGesture ─── */}
      <section className="card">
        <h2>🔄 RotationGesture — вращение двумя пальцами</h2>
        <p>
          <code>RotationGesture</code> отслеживает вращение двумя пальцами — используется
          для поворота фотографий, элементов на канвасе и т.д.
        </p>

        <CodeBlock language="swift" title="RotationGesture — вращение объекта" code={`
struct RotatableView: View {
    @State private var currentAngle: Angle = .zero
    @GestureState private var gestureAngle: Angle = .zero
    
    var body: some View {
        Image(systemName: "arrow.up")
            .font(.system(size: 60))
            .rotationEffect(currentAngle + gestureAngle)
            .gesture(
                RotationGesture()
                    .updating($gestureAngle) { value, state, _ in
                        state = value
                    }
                    .onEnded { value in
                        currentAngle += value
                    }
            )
    }
}`} />
      </section>

      {/* ─── Composing Gestures ─── */}
      <section className="card">
        <h2>🧩 Комбинирование жестов</h2>
        <p>
          SwiftUI позволяет комбинировать жесты тремя способами:
          <strong>simultaneously</strong> (одновременно),
          <strong>sequenced</strong> (последовательно) и
          <strong>exclusively</strong> (один OR другой).
        </p>

        <CodeBlock language="swift" title="Комбинирование жестов" code={`
// ═══ .simultaneously — оба жеста одновременно ═══
// Зум + вращение одновременно (как в фоторедакторе)
struct PhotoEditor: View {
    @State private var scale: CGFloat = 1.0
    @State private var angle: Angle = .zero
    @GestureState private var gestureState = GestureInfo()
    
    struct GestureInfo {
        var scale: CGFloat = 1.0
        var angle: Angle = .zero
    }
    
    var magnification: some Gesture {
        MagnificationGesture()
            .map { GestureInfo(scale: $0, angle: .zero) }
    }
    
    var rotation: some Gesture {
        RotationGesture()
            .map { GestureInfo(scale: 1.0, angle: $0) }
    }
    
    var body: some View {
        Image("photo")
            .resizable()
            .scaledToFit()
            .scaleEffect(scale * gestureState.scale)
            .rotationEffect(angle + gestureState.angle)
            .gesture(
                magnification.simultaneously(with: rotation)
                    .updating($gestureState) { value, state, _ in
                        state.scale = value.first?.scale ?? 1.0
                        state.angle = value.second?.angle ?? .zero
                    }
                    .onEnded { value in
                        scale *= value.first?.scale ?? 1.0
                        angle += value.second?.angle ?? .zero
                    }
            )
    }
}

// ═══ .sequenced — сначала один, потом другой ═══
// Долгое нажатие → потом перетаскивание
struct LongPressThenDrag: View {
    @State private var isActivated = false
    @State private var offset = CGSize.zero
    
    var body: some View {
        Circle()
            .fill(isActivated ? .green : .blue)
            .frame(width: 80, height: 80)
            .offset(offset)
            .gesture(
                LongPressGesture(minimumDuration: 0.5)
                    .sequenced(before: DragGesture())
                    .onChanged { value in
                        switch value {
                        case .first(true):
                            isActivated = true  // долгое нажатие активировано
                        case .second(true, let drag):
                            offset = drag?.translation ?? .zero
                        default:
                            break
                        }
                    }
                    .onEnded { _ in
                        isActivated = false
                    }
            )
    }
}

// ═══ .exclusively — один ИЛИ другой ═══
// Если долгое нажатие не сработало — обработай как тап
let gesture = LongPressGesture()
    .exclusively(before: TapGesture())`} />
      </section>

      {/* ─── highPriorityGesture ─── */}
      <section className="card">
        <h2>⚡ Приоритет жестов</h2>
        <p>
          Когда у parent и child View есть жесты, возникает конфликт. SwiftUI предоставляет
          три уровня приоритета для разрешения конфликтов.
        </p>

        <CodeBlock language="swift" title="Приоритет жестов" code={`
struct GesturePriority: View {
    var body: some View {
        // ═══ Обычный gesture — child побеждает ═══
        VStack {
            Text("Тапни")
                .onTapGesture { print("child tap") }  // ← побеждает
        }
        .onTapGesture { print("parent tap") }         // ← проигрывает
        
        // ═══ highPriorityGesture — parent побеждает ═══
        VStack {
            Text("Тапни")
                .onTapGesture { print("child tap") }  // ← проигрывает
        }
        .highPriorityGesture(
            TapGesture().onEnded { print("parent wins!") }  // ← побеждает
        )
        
        // ═══ simultaneousGesture — оба срабатывают ═══
        VStack {
            Text("Тапни")
                .onTapGesture { print("child tap") }  // ← срабатывает
        }
        .simultaneousGesture(
            TapGesture().onEnded { print("parent too!") }   // ← тоже срабатывает
        )
    }
}`} />

        <div className="info-box">
          <strong>📌 Правило:</strong> По умолчанию дочерний View «перехватывает» жест (как
          event bubbling в web, но наоборот — capture phase). <code>highPriorityGesture</code>
          позволяет родителю перехватить первым. <code>simultaneousGesture</code> — оба реагируют.
        </div>
      </section>

      {/* ─── Gesture State ─── */}
      <section className="card">
        <h2>📊 Данные жеста — что доступно</h2>
        <p>
          Каждый жест предоставляет разные данные. Вот что ты получаешь в <code>onChanged</code>
          и <code>onEnded</code>:
        </p>

        <CodeBlock language="swift" title="Информация доступная из жестов" code={`
// ═══ DragGesture.Value ═══
DragGesture()
    .onChanged { value in
        value.translation    // CGSize — смещение от начальной точки
        value.location       // CGPoint — текущая позиция пальца
        value.startLocation  // CGPoint — где началось перетаскивание
        value.velocity       // CGSize — скорость (iOS 17+)
        // predictedEndLocation и predictedEndTranslation — куда «летит»
        value.predictedEndTranslation  // прогнозируемое смещение
    }

// ═══ MagnificationGesture.Value ═══  
MagnificationGesture()
    .onChanged { value in
        value  // CGFloat — текущий масштаб (1.0 = исходный)
        // > 1.0 = увеличение, < 1.0 = уменьшение
    }

// ═══ RotationGesture.Value ═══
RotationGesture()
    .onChanged { value in
        value  // Angle — текущий угол поворота
        value.degrees   // Double — в градусах
        value.radians   // Double — в радианах
    }

// ═══ Использование velocity для «бросания» ═══
DragGesture()
    .onEnded { value in
        // Если скорость большая — «бросить» элемент
        let speed = sqrt(
            pow(value.velocity.width, 2) + 
            pow(value.velocity.height, 2)
        )
        if speed > 500 {
            // Бросок! Используем predictedEndTranslation
            withAnimation(.spring) {
                position = value.predictedEndTranslation
            }
        }
    }`} />
      </section>

      {/* ─── Полный пример — Draggable Card ─── */}
      <section className="card">
        <h2>🏗️ Полный пример: Draggable + Zoomable + Rotatable</h2>
        <p>
          Комбинируем все жесты вместе — объект, который можно перетаскивать,
          масштабировать и вращать одновременно (как стикер в Instagram Stories).
        </p>

        <CodeBlock language="swift" title="Интерактивный стикер — все жесты" code={`
struct InteractiveSticker: View {
    // Позиция
    @State private var offset = CGSize.zero
    @GestureState private var dragOffset = CGSize.zero
    
    // Масштаб
    @State private var scale: CGFloat = 1.0
    @GestureState private var gestureScale: CGFloat = 1.0
    
    // Вращение
    @State private var angle: Angle = .zero
    @GestureState private var gestureAngle: Angle = .zero
    
    var body: some View {
        Text("🎉")
            .font(.system(size: 80))
            // Применяем все трансформации
            .offset(
                x: offset.width + dragOffset.width,
                y: offset.height + dragOffset.height
            )
            .scaleEffect(scale * gestureScale)
            .rotationEffect(angle + gestureAngle)
            // Drag
            .gesture(
                DragGesture()
                    .updating($dragOffset) { value, state, _ in
                        state = value.translation
                    }
                    .onEnded { value in
                        offset.width += value.translation.width
                        offset.height += value.translation.height
                    }
            )
            // Zoom + Rotation одновременно
            .simultaneousGesture(
                MagnificationGesture()
                    .updating($gestureScale) { value, state, _ in
                        state = value
                    }
                    .onEnded { value in
                        scale *= value
                        scale = min(max(scale, 0.3), 5.0)
                    }
            )
            .simultaneousGesture(
                RotationGesture()
                    .updating($gestureAngle) { value, state, _ in
                        state = value
                    }
                    .onEnded { value in
                        angle += value
                    }
            )
            // Двойной тап для сброса
            .onTapGesture(count: 2) {
                withAnimation(.spring) {
                    offset = .zero
                    scale = 1.0
                    angle = .zero
                }
            }
    }
}`} />
      </section>

      {/* ─── Итого ─── */}
      <section className="card">
        <h2>📝 Шпаргалка: React Events → SwiftUI Gestures</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>React / Web</h3>
            <ul>
              <li><code>onClick</code></li>
              <li><code>onDoubleClick</code></li>
              <li><code>onMouseDown/Up/Move</code></li>
              <li><code>onTouchStart/Move/End</code></li>
              <li><code>@use-gesture/react</code></li>
              <li><code>onWheel</code> для zoom</li>
              <li><code>e.stopPropagation()</code></li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>SwiftUI</h3>
            <ul>
              <li><code>.onTapGesture</code></li>
              <li><code>.onTapGesture(count: 2)</code></li>
              <li><code>DragGesture</code></li>
              <li><code>LongPressGesture</code></li>
              <li><code>.simultaneously / .sequenced</code></li>
              <li><code>MagnificationGesture</code></li>
              <li><code>.highPriorityGesture</code></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
