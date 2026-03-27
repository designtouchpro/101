import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function BindingPage() {
  const [parentValue, setParentValue] = useState(50)
  const [isPlaying, setIsPlaying] = useState(false)
  const [brightness, setBrightness] = useState(70)

  return (
    <div className="demo-container">
      <h1>🔗 @Binding</h1>
      <p>
        В React, чтобы дочерний компонент мог изменять состояние родителя, мы передаём
        <code> setState</code> как prop. В SwiftUI для этого есть <strong>@Binding</strong> — 
        двусторонняя ссылка на чужой @State. Проще, типобезопаснее и элегантнее.
      </p>

      {/* --- Core Concept --- */}
      <section>
        <h2>🧠 Концепция: @Binding как «ссылка на чужой @State»</h2>
        <div className="card">
          <h3>Визуальная модель</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #2196F3',
            }}>
              <h4 style={{ color: '#2196F3', margin: '0 0 12px' }}>SwiftUI: @State + @Binding</h4>
              <pre style={{ margin: 0, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
{`┌─ Parent ──────────────┐
│ @State var isOn = true │
│                        │
│  ┌─ Child ───────────┐ │
│  │ @Binding var isOn  │ │
│  │     ↕️ (read+write) │ │
│  │ Toggle(isOn: $isOn)│ │
│  └────────────────────┘ │
│                        │
│ isOn изменён в Child → │
│ Parent тоже обновится  │
└────────────────────────┘`}
              </pre>
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #FF9800',
            }}>
              <h4 style={{ color: '#FF9800', margin: '0 0 12px' }}>React: state + setState prop</h4>
              <pre style={{ margin: 0, lineHeight: 1.8, color: 'var(--text-secondary)' }}>
{`┌─ Parent ───────────────┐
│ const [isOn, setIsOn]  │
│   = useState(true)     │
│                        │
│  ┌─ Child ───────────┐ │
│  │ props.isOn  (read) │ │
│  │ props.setIsOn(write)│ │
│  │ <Toggle             │ │
│  │   value={isOn}      │ │
│  │   onChange={setIsOn} │ │
│  │ />                  │ │
│  └─────────────────────┘│
└─────────────────────────┘`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* --- Basic Usage --- */}
      <section>
        <h2>📖 Базовое использование</h2>
        <div className="card">
          <h3>Parent → Child с @Binding</h3>
          <CodeBlock language="swift" title="SwiftUI: @State ↔ @Binding" code={`
// ─── Родительский View (владеет состоянием) ───
struct ParentView: View {
    @State private var isPlaying = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text(isPlaying ? "▶️ Играет" : "⏸️ Пауза")
                .font(.largeTitle)
            
            // Передаём $isPlaying — это создаёт Binding
            PlayButton(isPlaying: $isPlaying)
            //                     ^ $ превращает @State в @Binding
            
            // Родитель видит изменения от ребёнка:
            Text("Status: \\(isPlaying ? "playing" : "paused")")
        }
    }
}

// ─── Дочерний View (получает Binding) ───
struct PlayButton: View {
    @Binding var isPlaying: Bool
    //  ^ НЕ владеет данными, а ссылается на родительский @State
    
    var body: some View {
        Button(isPlaying ? "Пауза" : "Играть") {
            isPlaying.toggle()
            // Изменение здесь → обновляет @State в ParentView
            // → оба View перерисовываются
        }
        .buttonStyle(.borderedProminent)
        .tint(isPlaying ? .red : .green)
    }
}
`} />
          <CodeBlock language="swift" title="React-эквивалент" code={`
// React: Родитель
function ParentComponent() {
    const [isPlaying, setIsPlaying] = useState(false)
    
    return (
        <div>
            <h1>{isPlaying ? '▶️ Играет' : '⏸️ Пауза'}</h1>
            <PlayButton 
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}  // Передаём setter
            />
            {/* 2 props вместо 1 Binding! */}
        </div>
    )
}

// React: Дочерний
function PlayButton({ isPlaying, setIsPlaying }) {
    return (
        <button onClick={() => setIsPlaying(prev => !prev)}>
            {isPlaying ? 'Пауза' : 'Играть'}
        </button>
    )
}
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Player">
              <div className="sim-vstack" style={{ gap: '20px', alignItems: 'center', padding: '40px 16px' }}>
                <span style={{ fontSize: '48px' }}>{isPlaying ? '▶️' : '⏸️'}</span>
                <span className="sim-text" style={{ fontSize: '22px', fontWeight: 700 }}>
                  {isPlaying ? 'Играет' : 'Пауза'}
                </span>
                <span className="sim-text--secondary" style={{ fontSize: '13px' }}>
                  Status: {isPlaying ? 'playing' : 'paused'}
                </span>
                <button className="sim-button--filled" onClick={() => setIsPlaying(v => !v)}
                  style={{ background: isPlaying ? '#ff3b30' : '#34c759', width: '100%' }}>
                  {isPlaying ? '⏸ Пауза' : '▶ Играть'}
                </button>
                <span className="sim-text--secondary" style={{ fontSize: '11px', fontFamily: 'monospace' }}>
                  Child @Binding изменяет Parent @State
                </span>
              </div>
            </PhoneMockup>
          </div>

          <div className="info-box">
            <span className="info-box-icon">💡</span>
            <div className="info-box-content">
              <div className="info-box-title">@Binding = value + onChange в одном</div>
              <p>
                В React нужно передать <strong>два</strong> props: значение и setter.
                В SwiftUI <code>@Binding</code> содержит <strong>и чтение, и запись</strong> —
                один параметр вместо двух. Компилятор гарантирует типобезопасность.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Live Binding Demo --- */}
      <section className="card">
        <h2>🎮 Живой пример: @State ↔ @Binding</h2>
        <p>Родитель владеет состоянием, дочерние компоненты получают «привязку» и могут его менять.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          margin: '16px 0',
        }}>
          {/* Parent */}
          <div style={{
            padding: '20px',
            borderRadius: '16px',
            border: '2px solid #2196F3',
            background: 'var(--bg-tertiary)',
          }}>
            <div style={{ fontSize: '0.7rem', color: '#2196F3', fontFamily: 'monospace', fontWeight: 700, marginBottom: '12px' }}>
              Parent — @State
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '8px' }}>{isPlaying ? '▶️' : '⏸️'}</div>
              <div style={{ fontWeight: 600 }}>{isPlaying ? 'Играет' : 'Пауза'}</div>
              <div style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-secondary)', marginTop: '4px' }}>
                @State var isPlaying = {String(isPlaying)}
              </div>
            </div>
            <div style={{ marginTop: '12px', padding: '12px', background: 'var(--bg-primary)', borderRadius: '8px', fontSize: '0.85rem' }}>
              <strong>Громкость: {parentValue}%</strong>
              <div style={{
                height: '8px',
                borderRadius: '4px',
                background: `linear-gradient(90deg, var(--accent-color) ${parentValue}%, var(--border-color) ${parentValue}%)`,
                marginTop: '6px',
              }} />
            </div>
          </div>

          {/* Children */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Child 1: PlayButton */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #FF9800',
              background: 'var(--bg-tertiary)',
            }}>
              <div style={{ fontSize: '0.7rem', color: '#FF9800', fontFamily: 'monospace', fontWeight: 700, marginBottom: '8px' }}>
                Child — @Binding var isPlaying
              </div>
              <button
                className={`btn ${isPlaying ? 'btn-danger' : 'btn-success'}`}
                onClick={() => setIsPlaying(v => !v)}
                style={{ width: '100%' }}
              >
                {isPlaying ? '⏸ Пауза' : '▶ Играть'}
              </button>
            </div>

            {/* Child 2: VolumeSlider */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #9C27B0',
              background: 'var(--bg-tertiary)',
            }}>
              <div style={{ fontSize: '0.7rem', color: '#9C27B0', fontFamily: 'monospace', fontWeight: 700, marginBottom: '8px' }}>
                Child — @Binding var volume
              </div>
              <input
                type="range" min={0} max={100} value={parentValue}
                onChange={e => setParentValue(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#9C27B0' }}
              />
              <div style={{ fontSize: '0.8rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                volume = {parentValue}
              </div>
            </div>

            {/* Child 3: Brightness */}
            <div style={{
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #00BCD4',
              background: 'var(--bg-tertiary)',
            }}>
              <div style={{ fontSize: '0.7rem', color: '#00BCD4', fontFamily: 'monospace', fontWeight: 700, marginBottom: '8px' }}>
                Child — @Binding var brightness
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>🌙</span>
                <input
                  type="range" min={0} max={100} value={brightness}
                  onChange={e => setBrightness(Number(e.target.value))}
                  style={{ flex: 1, accentColor: '#00BCD4' }}
                />
                <span>☀️</span>
              </div>
            </div>
          </div>
        </div>

        <div className="info-box">
          <span className="info-box-icon">⬆️</span>
          <div className="info-box-content">
            <p>
              Все три дочерних компонента изменяют состояние <strong>родителя</strong> через @Binding.
              В React для этого пришлось бы передать 3 отдельных setter-функции.
            </p>
          </div>
        </div>
      </section>

      {/* --- $ Prefix Deep Dive --- */}
      <section>
        <h2>💲 Глубже про $ prefix</h2>
        <div className="card">
          <h3>Как $ создаёт Binding</h3>
          <CodeBlock language="swift" title="$ — projected value property wrapper'а" code={`
struct Demo: View {
    @State private var user = User(name: "Иван", age: 25)
    
    var body: some View {
        VStack {
            // Доступ к значению — через имя
            Text(user.name)            // String
            
            // Доступ к Binding — через $
            TextField("Имя", text: $user.name)
            //                       ^ Binding<String>
            
            // Спускаемся через $ на любой уровень
            AgeEditor(age: $user.age)
            //              ^ Binding<Int>
            
            // Даже массивы!
            // $items[0].name → Binding<String>
        }
    }
}

struct AgeEditor: View {
    @Binding var age: Int
    
    var body: some View {
        Stepper("Возраст: \\(age)", value: $age, in: 0...120)
        //                               ^ можно сделать $ от @Binding тоже!
    }
}

// Цепочка: @State → $state → @Binding → $binding → можно передать дальше
`} />
        </div>
      </section>

      {/* --- Lifting State Up --- */}
      <section>
        <h2>⬆️ Lifting State Up — поднятие состояния</h2>
        <div className="card">
          <h3>Паттерн: общее состояние для нескольких View</h3>
          <p>
            Как и в React, если два компонента должны делить состояние — поднимаем его в общего родителя.
          </p>
          <CodeBlock language="swift" title="Lifting State Up в SwiftUI" code={`
struct TemperatureConverter: View {
    @State private var celsius: Double = 0
    
    var body: some View {
        VStack(spacing: 24) {
            Text("Конвертер температур")
                .font(.title.bold())
            
            // Оба View разделяют одно состояние через @Binding
            CelsiusInput(value: $celsius)
            FahrenheitDisplay(celsius: celsius)
            
            // Визуальный индикатор
            ThermometerView(celsius: celsius)
        }
        .padding()
    }
}

struct CelsiusInput: View {
    @Binding var value: Double
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Цельсий")
                .font(.headline)
            HStack {
                Slider(value: $value, in: -40...100)
                Text("\\(value, specifier: "%.1f")°C")
                    .monospacedDigit()
            }
        }
    }
}

struct FahrenheitDisplay: View {
    let celsius: Double  // Только чтение — let, не @Binding
    
    var fahrenheit: Double { celsius * 9/5 + 32 }
    
    var body: some View {
        VStack(alignment: .leading) {
            Text("Фаренгейт")
                .font(.headline)
            Text("\\(fahrenheit, specifier: "%.1f")°F")
                .font(.title2)
                .foregroundColor(.orange)
        }
    }
}

struct ThermometerView: View {
    let celsius: Double
    
    var body: some View {
        GeometryReader { geo in
            ZStack(alignment: .bottom) {
                Capsule().fill(.gray.opacity(0.2))
                Capsule()
                    .fill(celsius > 30 ? .red : celsius > 10 ? .orange : .blue)
                    .frame(height: max(4, geo.size.height * (celsius + 40) / 140))
            }
        }
        .frame(width: 30, height: 120)
    }
}
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Температура">
              <div style={{ padding: '16px' }}>
                <div className="sim-vstack" style={{ gap: '16px' }}>
                  <span className="sim-large-title" style={{ textAlign: 'center' }}>🌡️</span>
                  <div>
                    <span className="sim-text" style={{ fontWeight: 600 }}>Цельсий</span>
                    <div className="sim-hstack" style={{ gap: '8px', marginTop: '6px', alignItems: 'center' }}>
                      <input type="range" min={-40} max={100} value={parentValue}
                        onChange={e => setParentValue(Number(e.target.value))}
                        style={{ flex: 1, accentColor: '#007AFF' }} />
                      <span className="sim-text" style={{ fontFamily: 'monospace', minWidth: '55px' }}>{parentValue}°C</span>
                    </div>
                  </div>
                  <div>
                    <span className="sim-text" style={{ fontWeight: 600 }}>Фаренгейт</span>
                    <span className="sim-text" style={{ fontSize: '24px', color: '#ff9500', display: 'block', marginTop: '4px' }}>
                      {(parentValue * 9/5 + 32).toFixed(1)}°F
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                      width: '20px', height: '80px', borderRadius: '10px',
                      background: '#e5e5ea', position: 'relative', overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute', bottom: 0, width: '100%',
                        height: `${Math.max(3, ((parentValue + 40) / 140) * 100)}%`,
                        borderRadius: '10px',
                        background: parentValue > 30 ? '#ff3b30' : parentValue > 10 ? '#ff9500' : '#007AFF',
                        transition: 'all 0.2s'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>

          <div className="info-box">
            <span className="info-box-icon">🔑</span>
            <div className="info-box-content">
              <div className="info-box-title">Правило: @Binding только если ребёнок ПИШЕТ</div>
              <p>
                <code>@Binding</code> нужен только когда дочерний View <strong>изменяет</strong> данные.
                Если дочерний View только <strong>читает</strong> — используйте обычный <code>let</code>.
                Не передавайте Binding без необходимости!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Custom Bindings --- */}
      <section>
        <h2>🔧 Кастомные Bindings</h2>
        <div className="card">
          <h3>Binding(get:set:) — полный контроль</h3>
          <p>
            Иногда нужен Binding с кастомной логикой чтения/записи —
            как computed useState в React.
          </p>
          <CodeBlock language="swift" title="Создание кастомного Binding" code={`
struct FilterView: View {
    @State private var searchText = ""
    
    // Binding, который автоматически приводит к lowercase
    var lowercaseBinding: Binding<String> {
        Binding(
            get: { searchText },
            set: { searchText = $0.lowercased() }
        )
    }
    
    var body: some View {
        TextField("Поиск", text: lowercaseBinding)
        // Пользователь вводит "HELLO" → сохраняется "hello"
    }
}

// Пример: Binding с валидацией
struct AgeInput: View {
    @State private var age = 18
    
    var validatedAge: Binding<Int> {
        Binding(
            get: { age },
            set: { newValue in
                age = min(max(newValue, 0), 120) // Clamp 0...120
            }
        )
    }
    
    var body: some View {
        Stepper("Возраст: \\(age)", value: validatedAge)
    }
}

// Пример: Binding к элементу массива
struct ItemEditor: View {
    @State private var items = ["Apple", "Banana", "Cherry"]
    
    var body: some View {
        List {
            ForEach(items.indices, id: \\.self) { index in
                TextField("Item", text: $items[index])
                // $items[index] — Binding к конкретному элементу!
            }
        }
    }
}
`} />
        </div>

        <div className="card">
          <h3>Binding из Bool → Sheet/Alert</h3>
          <CodeBlock language="swift" title="@Binding для модальных окон" code={`
struct ContentView: View {
    @State private var showSettings = false
    @State private var showDeleteAlert = false
    
    var body: some View {
        VStack {
            Button("Настройки") {
                showSettings = true
            }
            
            Button("Удалить", role: .destructive) {
                showDeleteAlert = true
            }
        }
        // .sheet получает Binding<Bool> через $
        .sheet(isPresented: $showSettings) {
            SettingsView()
            // SwiftUI сам ставит showSettings = false при закрытии!
        }
        .alert("Удалить?", isPresented: $showDeleteAlert) {
            Button("Отмена", role: .cancel) { }
            Button("Удалить", role: .destructive) { deleteItem() }
        }
    }
    
    func deleteItem() { /* ... */ }
}
`} />
          <CodeBlock language="swift" title="React-эквивалент: модальное окно" code={`
// React
function ContentView() {
    const [showSettings, setShowSettings] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    
    return (
        <div>
            <button onClick={() => setShowSettings(true)}>
                Настройки
            </button>
            
            {showSettings && (
                <Modal onClose={() => setShowSettings(false)}>
                    <SettingsView />
                </Modal>
            )}
            
            {showDeleteAlert && (
                <ConfirmDialog 
                    onCancel={() => setShowDeleteAlert(false)}
                    onConfirm={deleteItem}
                />
            )}
        </div>
    )
}
// В React нужно вручную управлять закрытием!
`} />
        </div>
      </section>

      {/* --- Common Patterns --- */}
      <section>
        <h2>📋 Частые паттерны</h2>
        <div className="card">
          <h3>Реальный пример: переиспользуемый компонент</h3>
          <CodeBlock language="swift" title="Рейтинг-компонент с @Binding" code={`
struct RatingView: View {
    @Binding var rating: Int
    let maxRating: Int
    let onColor: Color
    let offColor: Color
    
    init(
        rating: Binding<Int>,
        maxRating: Int = 5,
        onColor: Color = .yellow,
        offColor: Color = .gray.opacity(0.3)
    ) {
        _rating = rating       // _ для доступа к wrapper
        self.maxRating = maxRating
        self.onColor = onColor
        self.offColor = offColor
    }
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(1...maxRating, id: \\.self) { star in
                Image(systemName: star <= rating ? "star.fill" : "star")
                    .foregroundColor(star <= rating ? onColor : offColor)
                    .font(.title2)
                    .onTapGesture {
                        rating = star  // Изменяет @Binding → @State родителя
                    }
            }
        }
    }
}

// Использование
struct ReviewForm: View {
    @State private var foodRating = 3
    @State private var serviceRating = 4
    @State private var ambienceRating = 5
    
    var body: some View {
        Form {
            Section("Оценки") {
                HStack {
                    Text("Еда")
                    Spacer()
                    RatingView(rating: $foodRating)
                }
                HStack {
                    Text("Сервис")
                    Spacer()
                    RatingView(rating: $serviceRating, onColor: .green)
                }
                HStack {
                    Text("Атмосфера")
                    Spacer()
                    RatingView(rating: $ambienceRating, onColor: .purple)
                }
            }
            
            Section("Итого") {
                let avg = Double(foodRating + serviceRating + ambienceRating) / 3
                Text("Средняя: \\(avg, specifier: "%.1f") ⭐")
            }
        }
    }
}
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Отзыв">
              <div style={{ padding: '0' }}>
                <div className="sim-section-header">ОЦЕНКИ</div>
                <div className="sim-list">
                  <div className="sim-form-row">
                    <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Еда</span>
                    <span style={{ fontSize: '18px', letterSpacing: '2px' }}>⭐⭐⭐☆☆</span>
                  </div>
                  <div className="sim-form-row">
                    <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Сервис</span>
                    <span style={{ fontSize: '18px', letterSpacing: '2px' }}>🟢🟢🟢🟢☆</span>
                  </div>
                  <div className="sim-form-row">
                    <span className="sim-text" style={{ flex: 1, fontSize: '14px' }}>Атмосфера</span>
                    <span style={{ fontSize: '18px', letterSpacing: '2px' }}>🟣🟣🟣🟣🟣</span>
                  </div>
                </div>
                <div className="sim-section-header">ИТОГО</div>
                <div className="sim-list">
                  <div className="sim-form-row">
                    <span className="sim-text" style={{ fontSize: '14px' }}>Средняя: 4.0 ⭐</span>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </section>

      {/* --- @Binding vs @State vs let --- */}
      <section>
        <h2>❓ Когда что использовать</h2>
        <div className="feature-grid">
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">📌</div>
            <h3>let (props)</h3>
            <p>Данные от родителя. <strong>Только чтение.</strong> Как props в React. Для отображения.</p>
          </div>
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">📦</div>
            <h3>@State</h3>
            <p>Данные, которыми View <strong>владеет</strong>. Source of truth. Как useState().</p>
          </div>
          <div className="feature-card" style={{ cursor: 'default' }}>
            <div className="feature-icon">🔗</div>
            <h3>@Binding</h3>
            <p>Ссылка на чужой @State. <strong>Чтение + запись.</strong> Как передать setState ребёнку.</p>
          </div>
        </div>
        <div className="card" style={{ marginTop: '16px' }}>
          <CodeBlock language="swift" title="Правило выбора" code={`
// Вопрос: "Кто ВЛАДЕЕТ этими данными?"

// → Этот View создал и владеет → @State
@State private var count = 0

// → Родитель владеет, ребёнок только ЧИТАЕТ → let
let title: String

// → Родитель владеет, ребёнок ЧИТАЕТ и ПИШЕТ → @Binding
@Binding var isSelected: Bool

// → Далёкий предок владеет → @Environment (тема Environment)
// → Внешняя модель данных → @Observable (тема Observable)
`} />
        </div>
      </section>

      {/* --- Summary --- */}
      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевые идеи</div>
          <p>
            1. <code>@Binding</code> — двусторонняя ссылка на <strong>чужой @State</strong><br />
            2. <code>$stateVar</code> создаёт <code>Binding</code> из <code>@State</code> — передаём ребёнку<br />
            3. Binding = value + onChange в одном параметре (вместо двух props в React)<br />
            4. <code>Binding(get:set:)</code> — для кастомной логики (валидация, трансформация)<br />
            5. Используйте <code>@Binding</code> только если ребёнок <strong>пишет</strong>. Для чтения — <code>let</code>
          </p>
        </div>
      </div>
    </div>
  )
}
