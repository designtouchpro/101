import CodeBlock from '../../components/CodeBlock'

const code = `// Composite — древовидная структура «часть-целое»

interface UIComponent {
  render(indent?: number): string
}

// Лист (не содержит детей)
class Button implements UIComponent {
  constructor(private text: string) {}
  render(indent = 0) {
    return ' '.repeat(indent) + \`<button>\${this.text}</button>\`
  }
}

class Text implements UIComponent {
  constructor(private content: string) {}
  render(indent = 0) {
    return ' '.repeat(indent) + \`<span>\${this.content}</span>\`
  }
}

// Композит (содержит детей — как листья, так и другие композиты)
class Container implements UIComponent {
  private children: UIComponent[] = []

  constructor(private tag: string) {}

  add(...components: UIComponent[]) {
    this.children.push(...components)
    return this
  }

  render(indent = 0) {
    const pad = ' '.repeat(indent)
    const inner = this.children.map(c => c.render(indent + 2)).join('\\n')
    return \`\${pad}<\${this.tag}>\\n\${inner}\\n\${pad}</\${this.tag}>\`
  }
}

// Строим дерево
const page = new Container('div')
  .add(
    new Container('header').add(
      new Text('Мой сайт'),
      new Button('Меню')
    ),
    new Container('main').add(
      new Container('section').add(
        new Text('Контент'),
        new Button('Читать далее')
      )
    ),
    new Container('footer').add(
      new Text('© 2025')
    )
  )

console.log(page.render())
// <div>
//   <header>
//     <span>Мой сайт</span>
//     <button>Меню</button>
//   </header>
//   <main>
//     <section>
//       <span>Контент</span>
//       <button>Читать далее</button>
//     </section>
//   </main>
// </div>`

const frontendCode = `// Фронтенд: React = Composite!

// Каждый React-компонент — это узел дерева
// JSX — это Composite паттерн

// Меню с произвольной вложенностью
interface MenuItem {
  label: string
  href?: string
  children?: MenuItem[]
}

function Menu({ items }: { items: MenuItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.label}>
          <a href={item.href}>{item.label}</a>
          {item.children && <Menu items={item.children} />}  {/* рекурсия! */}
        </li>
      ))}
    </ul>
  )
}

// Файловое дерево
interface TreeNode {
  name: string
  type: 'file' | 'folder'
  children?: TreeNode[]
}

function FileTree({ node }: { node: TreeNode }) {
  if (node.type === 'file') return <span>📄 {node.name}</span>
  return (
    <details>
      <summary>📁 {node.name}</summary>
      {node.children?.map(child => (
        <FileTree key={child.name} node={child} />
      ))}
    </details>
  )
}`

export default function Composite() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌳 Composite (Компоновщик)</h1>
        <p>Группирует объекты в древовидные структуры и позволяет работать с ними как с единым объектом</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Армия.</strong> Армия состоит из дивизий, дивизия из полков, полк из взводов, взвод из солдат. Приказ «наступать» работает и для всей армии, и для одного солдата — единый интерфейс</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Composite — дерево UI-компонентов" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="React компоненты — это Composite" />
        <div className="info-box" style={{ marginTop: 16 }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">React = Composite + Strategy</div>
            <p>Virtual DOM — это Composite-дерево. Каждый компонент может содержать другие компоненты или быть «листом». JSX делает это естественным</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Меню с вложенностью, файловые деревья, комментарии</li>
          <li>UI-фреймворки (React/Vue деревья компонентов)</li>
          <li>Форма из групп полей</li>
          <li>Организационные структуры</li>
        </ul>
      </div>
    </div>
  )
}
