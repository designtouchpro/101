import CodeBlock from '../../components/CodeBlock'

const code = `// Bridge — разделение абстракции и реализации

// Реализация (платформа)
interface Renderer {
  renderButton(text: string): string
  renderInput(placeholder: string): string
}

class WebRenderer implements Renderer {
  renderButton(text: string) {
    return \`<button class="web-btn">\${text}</button>\`
  }
  renderInput(placeholder: string) {
    return \`<input class="web-input" placeholder="\${placeholder}" />\`
  }
}

class MobileRenderer implements Renderer {
  renderButton(text: string) {
    return \`<TouchableOpacity><Text>\${text}</Text></TouchableOpacity>\`
  }
  renderInput(placeholder: string) {
    return \`<TextInput placeholder="\${placeholder}" />\`
  }
}

// Абстракция (компонент)
class Form {
  constructor(private renderer: Renderer) {}

  renderLoginForm() {
    return [
      this.renderer.renderInput('Email'),
      this.renderer.renderInput('Пароль'),
      this.renderer.renderButton('Войти'),
    ].join('\\n')
  }
}

// Любая абстракция + любая реализация
const webForm = new Form(new WebRenderer())
const mobileForm = new Form(new MobileRenderer())

// Добавить новую платформу — без изменений Form
// Добавить новую форму — без изменений Renderer`

const frontendCode = `// Фронтенд: Bridge для темизации

// «Мост» между компонентом и его стилями
interface ThemeEngine {
  primary: string
  secondary: string
  apply(element: HTMLElement): void
}

class CSSVariablesTheme implements ThemeEngine {
  primary = 'var(--primary)'
  secondary = 'var(--secondary)'
  apply(el: HTMLElement) {
    el.style.setProperty('--primary', '#7c3aed')
  }
}

class TailwindTheme implements ThemeEngine {
  primary = 'bg-violet-600'
  secondary = 'bg-gray-200'
  apply(el: HTMLElement) {
    el.classList.add('bg-violet-600')
  }
}

// Компонент не знает, какая система стилей используется
class UIComponent {
  constructor(private theme: ThemeEngine) {}
  render() { /* использует this.theme.primary */ }
}

// Хоть CSS Variables, хоть Tailwind, хоть CSS-in-JS`

export default function Bridge() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🌉 Bridge (Мост)</h1>
        <p>Разделяет абстракцию и реализацию так, что они могут изменяться независимо</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Пульт и телевизор.</strong> Пульт (абстракция) работает с любым ТВ (реализация). Можно менять пульт без замены ТВ и наоборот. Мост — это ИК-протокол между ними</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Bridge — кроссплатформенный рендеринг" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Bridge — системы стилей" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Кроссплатформенные UI (web + mobile + desktop)</li>
          <li>Смена движка рендеринга/стилей без изменения компонентов</li>
          <li>Разделение «что делать» и «как делать»</li>
        </ul>
      </div>
    </div>
  )
}
