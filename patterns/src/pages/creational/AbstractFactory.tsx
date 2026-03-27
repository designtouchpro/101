import CodeBlock from '../../components/CodeBlock'

const code = `// Abstract Factory — семейства связанных объектов

// Абстрактные продукты
interface Button { render(): string }
interface Input { render(): string }
interface Card { render(): string }

// Абстрактная фабрика
interface UIFactory {
  createButton(text: string): Button
  createInput(placeholder: string): Input
  createCard(title: string, content: string): Card
}

// Тёмная тема
class DarkUIFactory implements UIFactory {
  createButton(text: string): Button {
    return { render: () => \`<button class="dark-btn">\${text}</button>\` }
  }
  createInput(placeholder: string): Input {
    return { render: () => \`<input class="dark-input" placeholder="\${placeholder}" />\` }
  }
  createCard(title: string, content: string): Card {
    return { render: () => \`<div class="dark-card"><h3>\${title}</h3><p>\${content}</p></div>\` }
  }
}

// Светлая тема
class LightUIFactory implements UIFactory {
  createButton(text: string): Button {
    return { render: () => \`<button class="light-btn">\${text}</button>\` }
  }
  createInput(placeholder: string): Input {
    return { render: () => \`<input class="light-input" placeholder="\${placeholder}" />\` }
  }
  createCard(title: string, content: string): Card {
    return { render: () => \`<div class="light-card"><h3>\${title}</h3><p>\${content}</p></div>\` }
  }
}

// Клиент не зависит от конкретной темы
function buildUI(factory: UIFactory) {
  const btn = factory.createButton('Сохранить')
  const input = factory.createInput('Введите имя...')
  const card = factory.createCard('Профиль', 'Настройки аккаунта')
  return [btn, input, card].map(el => el.render()).join('\\n')
}

// Переключение темы — просто меняем фабрику
const factory = isDarkMode ? new DarkUIFactory() : new LightUIFactory()
buildUI(factory)`

const frontendCode = `// Фронтенд: абстрактная фабрика для мультиплатформенных UI

// Фабрика для разных платформ
interface PlatformFactory {
  createDialog: (props: DialogProps) => JSX.Element
  createToast: (props: ToastProps) => JSX.Element
  createModal: (props: ModalProps) => JSX.Element
}

const WebFactory: PlatformFactory = {
  createDialog: (props) => <dialog>{props.content}</dialog>,
  createToast: (props) => <div className="toast">{props.message}</div>,
  createModal: (props) => <div className="modal-overlay">{props.children}</div>,
}

const MobileFactory: PlatformFactory = {
  createDialog: (props) => <BottomSheet>{props.content}</BottomSheet>,
  createToast: (props) => <Snackbar message={props.message} />,
  createModal: (props) => <FullscreenModal>{props.children}</FullscreenModal>,
}

// Выбор фабрики по платформе
const factory = isMobile() ? MobileFactory : WebFactory

// Один код для обеих платформ
function App() {
  return (
    <>
      {factory.createDialog({ content: 'Вы уверены?' })}
      {factory.createToast({ message: 'Сохранено!' })}
    </>
  )
}`

export default function AbstractFactory() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏗 Abstract Factory (Абстрактная фабрика)</h1>
        <p>Создаёт семейства связанных объектов без привязки к конкретным классам</p>
        <span className="pattern-category cat-creational">Порождающий</span>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Мебельная фабрика.</strong> Вы выбираете стиль (модерн, классика, лофт) — и фабрика производит ВСЮ мебель в этом стиле: стул, стол, шкаф. Все элементы гарантированно сочетаются</div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🔄 Отличие от Factory Method</h3></div>
        <table className="comparison-table">
          <thead><tr><th>Factory Method</th><th>Abstract Factory</th></tr></thead>
          <tbody>
            <tr><td>Создаёт ОДИН тип объектов</td><td>Создаёт СЕМЕЙСТВО связанных объектов</td></tr>
            <tr><td>Один метод</td><td>Несколько методов создания</td></tr>
            <tr><td><code>createNotification(type)</code></td><td><code>{'{'}createButton(), createInput(), createCard(){'}'}</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-green">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Abstract Factory — тёмная/светлая тема" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Мультиплатформенные UI-компоненты" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Темы оформления (dark/light) с гарантией совместимости</li>
          <li>Мультиплатформенные UI (web/mobile/desktop)</li>
          <li>Наборы компонентов разных дизайн-систем</li>
        </ul>
      </div>
    </div>
  )
}
