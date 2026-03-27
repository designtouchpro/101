import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'
import PhoneMockup from '../components/PhoneMockup'

export default function StatePage() {
  const [count, setCount] = useState(0)
  const [isOn, setIsOn] = useState(false)
  const [name, setName] = useState('')
  const [volume, setVolume] = useState(50)
  const [selectedColor, setSelectedColor] = useState('#3b82f6')

  return (
    <div className="demo-container">
      <h1>📦 @State</h1>
      <p>
        <code>@State</code> — это <strong>useState()</strong> из React, но на стероидах.
        Это property wrapper, который делает переменную реактивной: при изменении значения
        SwiftUI автоматически перерисовывает View. Основа всей реактивности в SwiftUI.
      </p>

      {/* --- Basic Concept --- */}
      <section>
        <h2>🧠 Концепция: Property Wrapper</h2>
        <div className="card">
          <h3>Что такое @State под капотом</h3>
          <p>
            <code>@State</code> — это <strong>property wrapper</strong> (обёртка свойства). Swift позволяет создавать
            специальные обёртки, которые добавляют поведение к свойствам. <code>@State</code> говорит SwiftUI:
            «Это значение может меняться, следи за ним и обновляй UI.»
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '16px 0',
          }}>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #2196F3',
            }}>
              <h4 style={{ color: '#2196F3', margin: '0 0 12px' }}>SwiftUI @State</h4>
              <CodeBlock language="swift" code={`struct Counter: View {
    @State private var count = 0
    
    var body: some View {
        Button("Count: \\(count)") {
            count += 1
        }
    }
}`} />
            </div>
            <div style={{
              padding: '20px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #FF9800',
            }}>
              <h4 style={{ color: '#FF9800', margin: '0 0 12px' }}>React useState</h4>
              <CodeBlock language="tsx" code={`function Counter() {
    const [count, setCount] = 
        useState(0)
    
    return (
        <button onClick={() => 
            setCount(c => c + 1)}>
            Count: {count}
        </button>
    )
}`} />
            </div>
          </div>
          <div className="info-box">
            <span className="info-box-icon">💡</span>
            <div className="info-box-content">
              <div className="info-box-title">Ключевое отличие от React</div>
              <p>
                В React вы получаете <code>[value, setter]</code> — два отдельных элемента.
                В SwiftUI <code>@State var count = 0</code> даёт вам <strong>и чтение, и запись</strong> через
                одну переменную. Просто пишете <code>count = 5</code> — и UI обновится. Не нужен setter!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- How @State triggers updates --- */}
      <section>
        <h2>🔄 Как @State вызывает обновления</h2>
        <div className="card">
          <h3>Механизм обновления</h3>
          <CodeBlock language="swift" title="@State и перерисовка body" code={`
struct ToggleDemo: View {
    @State private var isOn = false  // SwiftUI хранит это значение
    
    // body вызывается ЗАНОВО при любом изменении @State
    // Это как re-render в React
    var body: some View {
        VStack(spacing: 20) {
            // Текст зависит от isOn — обновится при изменении
            Text(isOn ? "🌞 Включено" : "🌙 Выключено")
                .font(.largeTitle)
            
            Button("Переключить") {
                isOn.toggle()   // Изменяем → body пересчитывается
            }
            .buttonStyle(.borderedProminent)
            
            // Можно присвоить напрямую
            Button("Включить") {
                isOn = true     // Просто присваиваем!
            }
            
            Button("Выключить") {
                isOn = false
            }
        }
    }
}
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="ToggleDemo">
              <div className="sim-vstack" style={{ gap: '20px', alignItems: 'center', padding: '40px 16px' }}>
                <span style={{ fontSize: '48px' }}>{isOn ? '🌞' : '🌙'}</span>
                <span className="sim-text" style={{ fontSize: '28px', fontWeight: 700 }}>
                  {isOn ? 'Включено' : 'Выключено'}
                </span>
                <div className="sim-vstack" style={{ gap: '10px', width: '100%' }}>
                  <button className="sim-button--filled" onClick={() => setIsOn(v => !v)}>
                    Переключить
                  </button>
                  <button className="sim-button--filled" style={{ background: '#34c759' }} onClick={() => setIsOn(true)}>
                    Включить
                  </button>
                  <button className="sim-button--filled" style={{ background: '#8e8e93' }} onClick={() => setIsOn(false)}>
                    Выключить
                  </button>
                </div>
              </div>
            </PhoneMockup>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #4CAF50',
            }}>
              <strong style={{ color: '#4CAF50' }}>1.</strong> Пользователь нажимает кнопку «Переключить»
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #2196F3',
            }}>
              <strong style={{ color: '#2196F3' }}>2.</strong> <code>isOn.toggle()</code> изменяет значение @State
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #FF9800',
            }}>
              <strong style={{ color: '#FF9800' }}>3.</strong> SwiftUI замечает изменение и пересчитывает <code>body</code>
            </div>
            <div style={{
              padding: '12px 16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '8px',
              borderLeft: '4px solid #E91E63',
            }}>
              <strong style={{ color: '#E91E63' }}>4.</strong> Только изменившиеся View перерисовываются (diffing)
            </div>
          </div>
        </div>
      </section>

      {/* --- Live Demo: Counter + Toggle --- */}
      <section className="card">
        <h2>🎮 Живой пример: @State в действии</h2>
        <p>Эти интерактивные демо показывают, как работает <code>@State</code>. Нажимайте кнопки — UI реагирует мгновенно, точно как в SwiftUI.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', margin: '16px 0' }}>
          {/* Counter demo */}
          <div style={{
            padding: '24px',
            background: 'var(--bg-tertiary)',
            borderRadius: '16px',
            border: '2px solid var(--border-color)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'monospace' }}>
              @State private var count = {count}
            </div>
            <div style={{
              fontSize: '3rem',
              fontWeight: 700,
              color: 'var(--accent-color)',
              margin: '12px 0',
              transition: 'transform 0.15s ease',
              transform: `scale(${1 + count * 0.02})`,
            }}>
              {count}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-primary"
                onClick={() => setCount(c => c + 1)}
                style={{ fontSize: '0.85rem' }}
              >
                count += 1
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setCount(c => c - 1)}
                style={{ fontSize: '0.85rem' }}
              >
                count -= 1
              </button>
              <button
                className="btn"
                onClick={() => setCount(0)}
                style={{ fontSize: '0.85rem' }}
              >
                Сброс
              </button>
            </div>
          </div>

          {/* Toggle demo */}
          <div style={{
            padding: '24px',
            background: 'var(--bg-tertiary)',
            borderRadius: '16px',
            border: '2px solid var(--border-color)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px', fontFamily: 'monospace' }}>
              @State private var isOn = {String(isOn)}
            </div>
            <div style={{
              fontSize: '4rem',
              margin: '12px 0',
              transition: 'all 0.3s ease',
            }}>
              {isOn ? '🌞' : '🌙'}
            </div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 600,
              color: isOn ? '#22c55e' : 'var(--text-secondary)',
              marginBottom: '12px',
              transition: 'color 0.3s ease',
            }}>
              {isOn ? 'Включено' : 'Выключено'}
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => setIsOn(v => !v)} style={{ fontSize: '0.85rem' }}>
                isOn.toggle()
              </button>
              <button className="btn btn-success" onClick={() => setIsOn(true)} style={{ fontSize: '0.85rem' }}>
                isOn = true
              </button>
              <button className="btn btn-secondary" onClick={() => setIsOn(false)} style={{ fontSize: '0.85rem' }}>
                isOn = false
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- @State with different types --- */}
      <section>
        <h2>📊 @State с разными типами</h2>
        <div className="card">
          <h3>Bool, String, Int, Double, Array, Struct</h3>
          <CodeBlock language="swift" title="@State с примитивами" code={`
struct AllTypesDemo: View {
    @State private var isVisible = true          // Bool
    @State private var name = ""                  // String
    @State private var count = 0                  // Int
    @State private var volume = 0.5               // Double
    @State private var selectedColor = Color.blue // Color (enum)
    
    var body: some View {
        VStack(spacing: 16) {
            // Bool → Toggle
            Toggle("Показать", isOn: $isVisible)
            
            // String → TextField
            TextField("Имя", text: $name)
                .textFieldStyle(.roundedBorder)
            if !name.isEmpty {
                Text("Привет, \\(name)!")
            }
            
            // Int → Stepper
            Stepper("Количество: \\(count)", value: $count, in: 0...10)
            
            // Double → Slider
            Slider(value: $volume, in: 0...1)
            Text("Громкость: \\(Int(volume * 100))%")
            
            // Color → ColorPicker
            ColorPicker("Цвет", selection: $selectedColor)
        }
        .padding()
    }
}
`} />
        </div>

        <div className="card">
          <h3>@State с массивами и структурами</h3>
          <CodeBlock language="swift" title="@State с коллекциями" code={`
struct TodoList: View {
    @State private var todos: [String] = ["Купить молоко", "Написать код"]
    @State private var newTodo = ""
    
    var body: some View {
        VStack {
            // Поле ввода
            HStack {
                TextField("Новая задача", text: $newTodo)
                    .textFieldStyle(.roundedBorder)
                Button("Добавить") {
                    guard !newTodo.isEmpty else { return }
                    todos.append(newTodo)  // Мутируем массив напрямую!
                    newTodo = ""
                }
            }
            
            // Список
            List {
                ForEach(todos, id: \\.self) { todo in
                    Text(todo)
                }
                .onDelete { indexSet in
                    todos.remove(atOffsets: indexSet) // Свайп для удаления
                }
            }
            
            Text("Всего: \\(todos.count) задач")
        }
    }
}
`} />
          <CodeBlock language="swift" title="React-эквивалент" code={`
// React
function TodoList() {
    const [todos, setTodos] = useState(['Купить молоко', 'Написать код'])
    const [newTodo, setNewTodo] = useState('')
    
    const addTodo = () => {
        if (!newTodo) return
        setTodos(prev => [...prev, newTodo])  // Нужен spread!
        setNewTodo('')
    }
    
    return (
        <div>
            <input value={newTodo} onChange={e => setNewTodo(e.target.value)} />
            <button onClick={addTodo}>Добавить</button>
            <ul>
                {todos.map((todo, i) => <li key={i}>{todo}</li>)}
            </ul>
        </div>
    )
}
`} />
          <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
            <PhoneMockup title="Todo List">
              <div style={{ padding: '0' }}>
                <div className="sim-hstack" style={{ padding: '8px 16px', gap: '8px' }}>
                  <div className="sim-textfield" style={{ flex: 1 }}>Новая задача</div>
                  <button className="sim-button--filled" style={{ padding: '8px 12px', fontSize: '13px' }}>Добавить</button>
                </div>
                <div className="sim-list">
                  <div className="sim-list-row">
                    <span className="sim-text">Купить молоко</span>
                  </div>
                  <div className="sim-list-row">
                    <span className="sim-text">Написать код</span>
                  </div>
                </div>
                <div style={{ padding: '8px 16px', textAlign: 'center' }}>
                  <span className="sim-text--secondary" style={{ fontSize: '13px' }}>Всего: 2 задач</span>
                </div>
              </div>
            </PhoneMockup>
          </div>
          <div className="info-box">
            <span className="info-box-icon">🔑</span>
            <div className="info-box-content">
              <div className="info-box-title">Мутация vs Иммутабельность</div>
              <p>
                В React массивы нельзя мутировать напрямую — нужен spread:
                <code>setTodos(prev =&gt; [...prev, item])</code>.<br />
                В SwiftUI можно просто писать <code>todos.append(item)</code> — потому что struct (value type)
                копируется при изменении. SwiftUI сам определит diff.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3>@State с кастомной структурой</h3>
          <CodeBlock language="swift" title="@State с struct" code={`
struct UserProfile {
    var name: String
    var age: Int
    var isPremium: Bool
}

struct ProfileEditor: View {
    @State private var profile = UserProfile(
        name: "Иван",
        age: 25,
        isPremium: false
    )
    
    var body: some View {
        Form {
            TextField("Имя", text: $profile.name)
            // $profile.name — Binding к свойству name внутри struct
            // SwiftUI знает, что profile изменился → перерисовка
            
            Stepper("Возраст: \\(profile.age)", value: $profile.age, in: 0...120)
            
            Toggle("Premium", isOn: $profile.isPremium)
            
            // Отображение
            Section("Превью") {
                Text("\\(profile.name), \\(profile.age) лет")
                if profile.isPremium {
                    Label("Premium", systemImage: "crown.fill")
                        .foregroundColor(.yellow)
                }
            }
        }
    }
}
`} />
          <div className="info-box">
            <span className="info-box-icon">🔗</span>
            <div className="info-box-content">
              <div className="info-box-title">$profile.name — ключевая магия</div>
              <p>
                <code>$profile.name</code> создаёт <code>Binding&lt;String&gt;</code> к свойству <code>name</code>
                внутри struct. Это как если бы React позволял писать <code>setState.name</code> — 
                автоматический setter для вложенного свойства. Работает на любом уровне вложенности!
              </p>
            </div>
          </div>
        </div>

        {/* Live multi-type demo */}
        <div className="card">
          <h3>🎮 Живой пример: @State с разными типами</h3>
          <p>Каждый элемент ниже — отдельный <code>@State</code>. Попробуйте взаимодействовать:</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            margin: '16px 0',
          }}>
            {/* String */}
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '8px' }}>@State var name: String</div>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Введите имя..."
                style={{
                  width: '100%', padding: '8px 12px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', background: 'var(--bg-primary)',
                  color: 'var(--text-primary)', fontSize: '0.9rem', boxSizing: 'border-box',
                }}
              />
              {name && <div style={{ marginTop: '8px', color: 'var(--accent-color)', fontWeight: 600 }}>Привет, {name}! 👋</div>}
            </div>
            {/* Double → Slider */}
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '8px' }}>@State var volume: Double = {volume}%</div>
              <input
                type="range" min={0} max={100} value={volume}
                onChange={e => setVolume(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-color)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '0.85rem' }}>
                <span>🔇</span>
                <span style={{ fontWeight: 600 }}>{volume}%</span>
                <span>🔊</span>
              </div>
            </div>
            {/* Color */}
            <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '8px' }}>@State var color: Color</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="color"
                  value={selectedColor}
                  onChange={e => setSelectedColor(e.target.value)}
                  style={{ width: '48px', height: '48px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ width: '80px', height: '40px', borderRadius: '8px', background: selectedColor, transition: 'background 0.2s' }} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', fontFamily: 'monospace' }}>{selectedColor}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Two-way binding with $ --- */}
      <section>
        <h2>🔗 Двусторонняя привязка с $</h2>
        <div className="card">
          <h3>Что такое $ prefix</h3>
          <CodeBlock language="swift" title="Три лица @State" code={`
struct Demo: View {
    @State private var text = "Hello"
    
    var body: some View {
        VStack {
            // 1. Чтение значения — просто имя
            Text(text)          // "Hello" — читаем String
            
            // 2. Запись значения — просто присваивание
            Button("Change") {
                text = "World"  // Прямая запись
            }
            
            // 3. Binding ($) — передача «ссылки» на чтение+запись
            TextField("Edit", text: $text)
            //                       ^ $text = Binding<String>
            // TextField может И читать, И писать в text
        }
    }
}

// Аналогия в React:
// text       → value               (чтение)
// text = ... → setState(...)       (запись)
// $text      → { value, onChange } (чтение + запись в одном)
`} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '16px 0',
            fontSize: '0.85rem',
          }}>
            <div style={{
              padding: '16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #2196F3',
            }}>
              <h4 style={{ color: '#2196F3', margin: '0 0 8px' }}>SwiftUI</h4>
              <code style={{ lineHeight: 2 }}>
                TextField("", text: <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>$name</span>)
              </code>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
                Один $ — и TextField может читать и писать
              </p>
            </div>
            <div style={{
              padding: '16px',
              background: 'var(--bg-tertiary)',
              borderRadius: '12px',
              border: '2px solid #FF9800',
            }}>
              <h4 style={{ color: '#FF9800', margin: '0 0 8px' }}>React</h4>
              <code style={{ lineHeight: 2 }}>
                {'<input value={name} onChange={e => setName(e.target.value)} />'}
              </code>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
                Нужно передать и value, и onChange отдельно
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Initializing @State --- */}
      <section>
        <h2>🏗️ Инициализация @State</h2>
        <div className="card">
          <h3>Правила инициализации</h3>
          <CodeBlock language="swift" title="Как правильно инициализировать @State" code={`
// ✅ Значение по умолчанию (самый частый случай)
struct MyView: View {
    @State private var count = 0
    @State private var name = ""
    @State private var items: [String] = []
    
    var body: some View { /* ... */ }
}

// ✅ Через init (когда нужно вычислить начальное значение)
struct MyView: View {
    @State private var text: String
    
    init(defaultText: String) {
        _text = State(initialValue: defaultText.uppercased())
        //  ^ доступ к обёртке через _
    }
    
    var body: some View {
        TextField("Edit", text: $text)
    }
}

// ❌ ОШИБКА: инициализация @State от props при каждом вызове
struct BadView: View {
    let title: String
    @State private var editedTitle: String
    
    init(title: String) {
        self.title = title
        // ⚠️ Это сработает только ОДИН РАЗ при создании View!
        // При обновлении title от родителя — editedTitle НЕ обновится
        _editedTitle = State(initialValue: title)
    }
    
    var body: some View { /* ... */ }
}

// ✅ Для такого случая используйте .onChange или .task
struct GoodView: View {
    let title: String
    @State private var editedTitle = ""
    
    var body: some View {
        TextField("Edit", text: $editedTitle)
            .onChange(of: title) { _, newValue in
                editedTitle = newValue  // синхронизация
            }
            .onAppear {
                editedTitle = title  // начальное значение
            }
    }
}
`} />
          <div className="info-box">
            <span className="info-box-icon">⚠️</span>
            <div className="info-box-content">
              <div className="info-box-title">@State = Source of Truth</div>
              <p>
                <code>@State</code> должен использоваться <strong>только для данных, которыми владеет View</strong>.
                Если данные приходят от родителя — используйте <code>@Binding</code> или обычный <code>let</code>.
                Это частая ошибка новичков. В React аналог: «не клонируйте props в useState без причины».
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- @State vs let --- */}
      <section>
        <h2>❓ @State vs let vs var</h2>
        <div className="card">
          <h3>Когда что использовать</h3>
          <CodeBlock language="swift" title="@State vs let vs var" code={`
struct MyView: View {
    // let — неизменяемые данные от родителя (как props)
    let title: String
    let onTap: () -> Void
    
    // @State — изменяемые данные, принадлежащие ЭТОМУ View
    @State private var isExpanded = false
    @State private var inputText = ""
    
    // ❌ var БЕЗ @State — НЕ вызовет перерисовку!
    // var counter = 0  // Изменение не обновит UI!
    
    var body: some View {
        VStack {
            Text(title)   // let — просто отображаем
            
            if isExpanded {
                TextField("Input", text: $inputText)
            }
            
            Button(isExpanded ? "Свернуть" : "Развернуть") {
                isExpanded.toggle()  // @State — UI обновится
                onTap()              // let — вызываем callback
            }
        }
    }
}

// Использование
MyView(title: "Секция", onTap: { print("Tapped") })
`} />

          <div className="feature-grid" style={{ marginTop: '16px' }}>
            <div className="feature-card" style={{ cursor: 'default' }}>
              <div className="feature-icon">📌</div>
              <h3>let (props)</h3>
              <p>Данные от родителя. Только чтение. Как props в React.</p>
            </div>
            <div className="feature-card" style={{ cursor: 'default' }}>
              <div className="feature-icon">📦</div>
              <h3>@State</h3>
              <p>Локальное состояние View. Чтение + запись. Как useState().</p>
            </div>
            <div className="feature-card" style={{ cursor: 'default' }}>
              <div className="feature-icon">🔗</div>
              <h3>@Binding</h3>
              <p>Ссылка на чужой @State. Как передать setState ребёнку.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Practical Examples --- */}
      <section>
        <h2>🛠️ Практические примеры</h2>
        <div className="card">
          <h3>Пример: форма регистрации</h3>
          <CodeBlock language="swift" title="Полноценная форма" code={`
struct RegistrationForm: View {
    @State private var email = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @State private var agreeToTerms = false
    @State private var showPassword = false
    @State private var showError = false
    
    private var isValid: Bool {
        !email.isEmpty &&
        password.count >= 8 &&
        password == confirmPassword &&
        agreeToTerms
    }
    
    var body: some View {
        NavigationStack {
            Form {
                Section("Учётные данные") {
                    TextField("Email", text: $email)
                        .keyboardType(.emailAddress)
                        .autocapitalization(.none)
                    
                    if showPassword {
                        TextField("Пароль", text: $password)
                    } else {
                        SecureField("Пароль", text: $password)
                    }
                    
                    SecureField("Подтверждение", text: $confirmPassword)
                    
                    Toggle("Показать пароль", isOn: $showPassword)
                }
                
                Section {
                    Toggle("Принимаю условия", isOn: $agreeToTerms)
                }
                
                Section {
                    Button("Зарегистрироваться") {
                        register()
                    }
                    .disabled(!isValid) // Кнопка неактивна если форма невалидна
                    .frame(maxWidth: .infinity)
                }
            }
            .navigationTitle("Регистрация")
            .alert("Ошибка", isPresented: $showError) {
                Button("OK") { }
            } message: {
                Text("Что-то пошло не так")
            }
        }
    }
    
    private func register() {
        // логика регистрации
    }
}
`} />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <PhoneMockup title="Регистрация">
            <div style={{ padding: '0' }}>
              <div className="sim-section-header">УЧЁТНЫЕ ДАННЫЕ</div>
              <div className="sim-list">
                <div className="sim-form-row">
                  <span className="sim-text" style={{ color: '#8e8e93', fontSize: '14px' }}>Email</span>
                  <span className="sim-text" style={{ fontSize: '14px' }}>ivan@mail.ru</span>
                </div>
                <div className="sim-form-row">
                  <span className="sim-text" style={{ color: '#8e8e93', fontSize: '14px' }}>Пароль</span>
                  <span className="sim-text" style={{ fontSize: '14px' }}>••••••••</span>
                </div>
                <div className="sim-form-row">
                  <span className="sim-text" style={{ color: '#8e8e93', fontSize: '14px' }}>Подтверждение</span>
                  <span className="sim-text" style={{ fontSize: '14px' }}>••••••••</span>
                </div>
                <div className="sim-form-row">
                  <span className="sim-text" style={{ fontSize: '14px', flex: 1 }}>Показать пароль</span>
                  <div className="sim-toggle--off" />
                </div>
              </div>
              <div className="sim-list" style={{ marginTop: '20px' }}>
                <div className="sim-form-row">
                  <span className="sim-text" style={{ fontSize: '14px', flex: 1 }}>Принимаю условия</span>
                  <div className="sim-toggle" />
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <button className="sim-button--filled" style={{ width: '100%' }}>Зарегистрироваться</button>
              </div>
            </div>
          </PhoneMockup>
        </div>
        </div>
      </section>

      {/* --- Summary --- */}
      <div className="info-box" style={{ marginTop: '32px' }}>
        <span className="info-box-icon">🎯</span>
        <div className="info-box-content">
          <div className="info-box-title">Ключевые идеи</div>
          <p>
            1. <code>@State</code> = <strong>useState()</strong> — локальное состояние View<br />
            2. Изменение @State → body пересчитывается → UI обновляется<br />
            3. <code>$variable</code> создаёт <strong>Binding</strong> — двусторонняя связь (value + onChange в одном)<br />
            4. @State <strong>private</strong> — только для данных, которыми View владеет сам<br />
            5. Можно мутировать массивы и struct напрямую — без spread/иммутабельности<br />
            6. Инициализация через <code>_state = State(initialValue:)</code> работает только при первом создании View
          </p>
        </div>
      </div>
    </div>
  )
}
