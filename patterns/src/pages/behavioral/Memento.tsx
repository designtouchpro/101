import CodeBlock from '../../components/CodeBlock'

const code = `// Memento — сохранение и восстановление состояния

// Memento — снимок состояния
class EditorMemento {
  constructor(
    readonly content: string,
    readonly cursorPosition: number,
    readonly selection: { start: number; end: number } | null,
    readonly timestamp: Date = new Date()
  ) {}
}

// Originator — объект, чьё состояние сохраняем
class TextEditor {
  private content = ''
  private cursor = 0
  private selection: { start: number; end: number } | null = null

  type(text: string) {
    this.content = 
      this.content.slice(0, this.cursor) + 
      text + 
      this.content.slice(this.cursor)
    this.cursor += text.length
  }

  save(): EditorMemento {
    return new EditorMemento(this.content, this.cursor, this.selection)
  }

  restore(memento: EditorMemento) {
    this.content = memento.content
    this.cursor = memento.cursorPosition
    this.selection = memento.selection
  }

  getContent() { return this.content }
}

// Caretaker — управляет историей снимков
class History {
  private snapshots: EditorMemento[] = []
  private current = -1

  push(memento: EditorMemento) {
    this.snapshots = this.snapshots.slice(0, this.current + 1)
    this.snapshots.push(memento)
    this.current++
  }

  undo(): EditorMemento | null {
    if (this.current <= 0) return null
    return this.snapshots[--this.current]
  }

  redo(): EditorMemento | null {
    if (this.current >= this.snapshots.length - 1) return null
    return this.snapshots[++this.current]
  }
}

// Использование
const editor = new TextEditor()
const history = new History()

editor.type('Hello')
history.push(editor.save())    // snapshot 1

editor.type(' World')
history.push(editor.save())    // snapshot 2

const prev = history.undo()    // вернёт snapshot 1
if (prev) editor.restore(prev)
console.log(editor.getContent()) // "Hello"`

const frontendCode = `// Фронтенд: Memento на практике

// 1. Undo/Redo через массив состояний
function useHistory<T>(initial: T) {
  const [states, setStates] = useState([initial])
  const [index, setIndex] = useState(0)

  const current = states[index]

  const push = (state: T) => {
    setStates(prev => [...prev.slice(0, index + 1), state])
    setIndex(prev => prev + 1)
  }

  const undo = () => setIndex(prev => Math.max(0, prev - 1))
  const redo = () => setIndex(prev => Math.min(states.length - 1, prev + 1))

  return { current, push, undo, redo, canUndo: index > 0 }
}

// 2. localStorage как снимок состояния
function saveFormState(form: FormData) {
  const snapshot = JSON.stringify(Object.fromEntries(form))
  localStorage.setItem('form-draft', snapshot)
}

function restoreFormState(): Record<string, string> | null {
  const data = localStorage.getItem('form-draft')
  return data ? JSON.parse(data) : null
}

// 3. History API — Memento для навигации
// Каждый pushState/replaceState — snapshot URL и состояния
history.pushState({ page: 'products', filters: ['new'] }, '', '/products?filter=new')
// popstate — восстановление предыдущего состояния
window.addEventListener('popstate', (e) => {
  restoreApp(e.state) // восстанавливаем из снимка
})`

export default function Memento() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📸 Memento (Снимок)</h1>
        <p>Сохраняет и восстанавливает состояние объекта без раскрытия деталей его реализации</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Сохранение в игре.</strong> Перед боссом вы сохраняетесь (создаёте снимок). Если проиграете — загружаете сохранение. Снимок содержит всё состояние (позиция, инвентарь, здоровье)</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Memento — текстовый редактор" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="useHistory hook, localStorage, History API" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Undo/Redo (вместе с Command паттерном)</li>
          <li>Сохранение черновиков форм в localStorage</li>
          <li>History API / react-router state</li>
          <li>Тайм-трэвел дебаг (Redux DevTools)</li>
        </ul>
      </div>
    </div>
  )
}
