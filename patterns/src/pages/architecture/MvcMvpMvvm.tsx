import CodeBlock from '../../components/CodeBlock'

const mvcCode = `// MVC — Model-View-Controller
// Классическое разделение на 3 слоя

// Model — данные и бизнес-логика
class TodoModel {
  private todos: Todo[] = []

  add(text: string) {
    this.todos.push({ id: Date.now(), text, done: false })
  }

  toggle(id: number) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  getAll() { return [...this.todos] }
}

// View — отображение (ничего не знает о логике)
class TodoView {
  render(todos: Todo[]) {
    return todos.map(t =>
      \`<li class="\${t.done ? 'done' : ''}">\${t.text}</li>\`
    ).join('')
  }
}

// Controller — связывает Model и View
class TodoController {
  constructor(
    private model: TodoModel,
    private view: TodoView
  ) {}

  addTodo(text: string) {
    this.model.add(text)
    this.updateView()
  }

  toggle(id: number) {
    this.model.toggle(id)
    this.updateView()
  }

  private updateView() {
    const html = this.view.render(this.model.getAll())
    document.getElementById('list')!.innerHTML = html
  }
}`

const mvpCode = `// MVP — Model-View-Presenter
// View пассивна, Presenter управляет всем

// View — только отображение + события
interface ITodoView {
  onAddClick(handler: (text: string) => void): void
  onToggle(handler: (id: number) => void): void
  showTodos(todos: Todo[]): void
  showError(message: string): void
}

class TodoView implements ITodoView {
  onAddClick(handler: (text: string) => void) {
    this.addBtn.addEventListener('click', () => {
      handler(this.input.value)
    })
  }

  showTodos(todos: Todo[]) {
    this.list.innerHTML = todos.map(t =>
      \`<li>\${t.text}</li>\`
    ).join('')
  }

  showError(message: string) {
    this.errorEl.textContent = message
  }
}

// Presenter — вся логика
class TodoPresenter {
  constructor(
    private model: TodoModel,
    private view: ITodoView
  ) {
    // Подписка на события View
    view.onAddClick(text => this.addTodo(text))
    view.onToggle(id => this.toggle(id))
  }

  addTodo(text: string) {
    if (!text.trim()) {
      this.view.showError('Введите текст')
      return
    }
    this.model.add(text)
    this.view.showTodos(this.model.getAll())
  }
}`

const mvvmCode = `// MVVM — Model-View-ViewModel
// ViewModel предоставляет данные через привязку (binding)
// Это основа Vue, Angular, SwiftUI, WPF

// Model
interface Todo {
  id: number
  text: string
  done: boolean
}

// ViewModel — реактивное состояние + логика
class TodoViewModel {
  // Реактивные данные (аналог ref/reactive в Vue)
  todos = reactive<Todo[]>([])
  newTodoText = ref('')
  
  // Computed свойства
  get remaining() {
    return this.todos.filter(t => !t.done).length
  }

  get isEmpty() {
    return this.todos.length === 0
  }

  // Методы (Commands)
  addTodo() {
    if (!this.newTodoText.value.trim()) return
    this.todos.push({
      id: Date.now(),
      text: this.newTodoText.value,
      done: false
    })
    this.newTodoText.value = ''
  }

  toggleTodo(id: number) {
    const todo = this.todos.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }
}

// View — привязка к ViewModel (Vue template)
// <input v-model="vm.newTodoText" />
// <button @click="vm.addTodo()">Добавить</button>
// <li v-for="todo in vm.todos" @click="vm.toggleTodo(todo.id)">
//   {{ todo.text }}
// </li>
// <span>Осталось: {{ vm.remaining }}</span>`

export default function MvcMvpMvvm() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏢 MVC / MVP / MVVM</h1>
        <p>Архитектурные паттерны разделения ответственности в UI-приложениях</p>
        <span className="pattern-category cat-architecture">Архитектура</span>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📊 Сравнение</h3>
        </div>
        <table className="comparison-table">
          <thead>
            <tr><th>Критерий</th><th>MVC</th><th>MVP</th><th>MVVM</th></tr>
          </thead>
          <tbody>
            <tr><td>Связующее звено</td><td>Controller</td><td>Presenter</td><td>Data Binding</td></tr>
            <tr><td>View знает о логике?</td><td>Немного</td><td>Нет (пассивна)</td><td>Нет (binding)</td></tr>
            <tr><td>Тестируемость</td><td>Средняя</td><td>Высокая</td><td>Высокая</td></tr>
            <tr><td>Где используется</td><td>Express, Rails, Django</td><td>Android (старый)</td><td>Vue, Angular, SwiftUI</td></tr>
            <tr><td>Сложность</td><td>Низкая</td><td>Средняя</td><td>Средняя</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔄 MVC — Model-View-Controller</h3>
          <span className="card-badge badge-green">Классика</span>
        </div>
        <div className="diagram">
          <div className="diagram-box">Model</div>
          <span className="diagram-arrow">←→</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-blue)' }}>Controller</div>
          <span className="diagram-arrow">←→</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-orange)' }}>View</div>
        </div>
        <div className="analogy"><strong>Аналогия:</strong> Ресторан. Model — кухня (данные), View — зал (отображение), Controller — официант (передаёт заказы и блюда)</div>
        <CodeBlock code={mvcCode} language="typescript" title="MVC — классическая реализация" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🎯 MVP — Model-View-Presenter</h3>
          <span className="card-badge badge-blue">Тестируемость</span>
        </div>
        <div className="diagram">
          <div className="diagram-box">Model</div>
          <span className="diagram-arrow">←→</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-blue)' }}>Presenter</div>
          <span className="diagram-arrow">←→</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-orange)' }}>View (passive)</div>
        </div>
        <div className="analogy"><strong>Аналогия:</strong> Телеведущий. View — камера (показывает), Presenter — ведущий (решает что показывать), Model — редакция (готовит материал)</div>
        <CodeBlock code={mvpCode} language="typescript" title="MVP — пассивная View" />
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔗 MVVM — Model-View-ViewModel</h3>
          <span className="card-badge badge-orange">Vue / Angular</span>
        </div>
        <div className="diagram">
          <div className="diagram-box">Model</div>
          <span className="diagram-arrow">←→</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-blue)' }}>ViewModel</div>
          <span className="diagram-arrow">⟺ binding</span>
          <div className="diagram-box" style={{ borderColor: 'var(--accent-orange)' }}>View</div>
        </div>
        <div className="analogy"><strong>Аналогия:</strong> Электронное табло. ViewModel — датчик (реактивные данные), View — экран (автоматически обновляется при изменении данных)</div>
        <CodeBlock code={mvvmCode} language="typescript" title="MVVM — реактивный data binding" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">❓ Вопросы на собесе</h3></div>
        <div className="interview-item"><div className="q">Чем MVC отличается от MVVM?</div><div className="a">В MVC Controller явно управляет View. В MVVM View автоматически обновляется через data binding — ViewModel не знает о View, только предоставляет реактивные данные</div></div>
        <div className="interview-item"><div className="q">Какой паттерн использует Vue?</div><div className="a">MVVM: template = View, script setup (ref/reactive/computed) = ViewModel, API/store = Model. Data binding через v-model, {'{{ }}'}, v-bind</div></div>
        <div className="interview-item"><div className="q">А React — это MVC?</div><div className="a">React ближе к View-слою. С Redux: Store = Model, Component = View, Action/Reducer = Controller-подобная логика. Но чистый React не навязывает архитектуру</div></div>
      </div>
    </div>
  )
}
