import CodeBlock from '../../components/CodeBlock'

const code = `// Command — инкапсулирует действие в объект

interface Command {
  execute(): void
  undo(): void
}

// Receiver — объект, над которым выполняются действия
class TextEditor {
  private content = ''

  insert(text: string, position: number) {
    this.content = this.content.slice(0, position) + text + this.content.slice(position)
  }

  delete(position: number, length: number): string {
    const deleted = this.content.slice(position, position + length)
    this.content = this.content.slice(0, position) + this.content.slice(position + length)
    return deleted
  }

  getContent() { return this.content }
}

// Конкретные команды
class InsertCommand implements Command {
  constructor(
    private editor: TextEditor,
    private text: string,
    private position: number
  ) {}

  execute() { this.editor.insert(this.text, this.position) }
  undo() { this.editor.delete(this.position, this.text.length) }
}

class DeleteCommand implements Command {
  private deleted = ''

  constructor(
    private editor: TextEditor,
    private position: number,
    private length: number
  ) {}

  execute() { this.deleted = this.editor.delete(this.position, this.length) }
  undo() { this.editor.insert(this.deleted, this.position) }
}

// Invoker — управляет историей команд
class CommandHistory {
  private history: Command[] = []
  private undone: Command[] = []

  execute(command: Command) {
    command.execute()
    this.history.push(command)
    this.undone = [] // очищаем redo-стек
  }

  undo() {
    const cmd = this.history.pop()
    if (cmd) { cmd.undo(); this.undone.push(cmd) }
  }

  redo() {
    const cmd = this.undone.pop()
    if (cmd) { cmd.execute(); this.history.push(cmd) }
  }
}

// Использование
const editor = new TextEditor()
const history = new CommandHistory()

history.execute(new InsertCommand(editor, 'Hello', 0))
history.execute(new InsertCommand(editor, ' World', 5))
// "Hello World"

history.undo() // "Hello"
history.redo() // "Hello World"`

const frontendCode = `// Фронтенд: Command повсюду

// 1. Undo/Redo в приложениях (Figma, Google Docs)
interface EditorCommand {
  execute(): void
  undo(): void
  description: string
}

class ChangeColorCommand implements EditorCommand {
  private previousColor: string
  description: string

  constructor(
    private element: { color: string },
    private newColor: string
  ) {
    this.previousColor = element.color
    this.description = \`Change color to \${newColor}\`
  }

  execute() { this.element.color = this.newColor }
  undo() { this.element.color = this.previousColor }
}

// 2. Keyboard shortcuts = Command mapping
const shortcuts = new Map<string, Command>([
  ['Ctrl+Z', undoCommand],
  ['Ctrl+Y', redoCommand],
  ['Ctrl+C', copyCommand],
  ['Ctrl+V', pasteCommand],
])

document.addEventListener('keydown', (e) => {
  const key = \`\${e.ctrlKey ? 'Ctrl+' : ''}\${e.key.toUpperCase()}\`
  shortcuts.get(key)?.execute()
})

// 3. Очередь действий (batch operations)
class ActionQueue {
  private queue: Command[] = []

  add(cmd: Command) { this.queue.push(cmd) }

  async flush() {
    for (const cmd of this.queue) {
      cmd.execute()
      await new Promise(r => setTimeout(r, 100))
    }
    this.queue = []
  }
}`

export default function Command() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🎮 Command (Команда)</h1>
        <p>Инкапсулирует запрос как объект, позволяя параметризовать, ставить в очередь и отменять операции</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Заказ в ресторане.</strong> Клиент не идёт на кухню, а пишет заказ (команду) на бумаге. Официант передаёт его повару. Заказ можно отменить, изменить, поставить в очередь</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Command — текстовый редактор с undo/redo" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Undo/Redo, горячие клавиши, очереди" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Undo/Redo (редакторы, Figma, IDE)</li>
          <li>Горячие клавиши (key → command mapping)</li>
          <li>Макросы и батч-операции</li>
          <li>Очередь задач, отложенное выполнение</li>
        </ul>
      </div>
    </div>
  )
}
