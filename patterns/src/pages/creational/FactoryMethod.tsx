import CodeBlock from '../../components/CodeBlock'

const code = `// Factory Method — делегирует создание объектов подклассам

interface Notification {
  send(message: string): void
}

class EmailNotification implements Notification {
  send(message: string) {
    console.log(\`📧 Email: \${message}\`)
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log(\`🔔 Push: \${message}\`)
  }
}

class SMSNotification implements Notification {
  send(message: string) {
    console.log(\`📱 SMS: \${message}\`)
  }
}

// Фабричный метод — решает ЧТО создавать
function createNotification(type: 'email' | 'push' | 'sms'): Notification {
  const map = {
    email: EmailNotification,
    push: PushNotification,
    sms: SMSNotification,
  }
  return new map[type]()
}

// Использование
const notification = createNotification('push')
notification.send('Привет!') // 🔔 Push: Привет!`

const frontendCode = `// Фронтенд: фабрика компонентов / элементов

// 1. Фабрика UI-элементов формы
interface FormField {
  type: string
  render(): string
}

function createFormField(config: {
  type: 'text' | 'select' | 'checkbox' | 'date'
  name: string
  label: string
  options?: string[]
}): FormField {
  switch (config.type) {
    case 'text':
      return {
        type: 'text',
        render: () => \`<input type="text" name="\${config.name}" />\`
      }
    case 'select':
      return {
        type: 'select',
        render: () => \`<select name="\${config.name}">
          \${config.options?.map(o => \`<option>\${o}</option>\`).join('')}
        </select>\`
      }
    case 'checkbox':
      return {
        type: 'checkbox',
        render: () => \`<label><input type="checkbox" name="\${config.name}" /> \${config.label}</label>\`
      }
    default:
      return { type: config.type, render: () => '<input />' }
  }
}

// 2. React: фабрика компонентов по типу данных
const componentMap = {
  string: TextInput,
  number: NumberInput,
  boolean: Checkbox,
  date: DatePicker,
}

function createFieldComponent(type: keyof typeof componentMap) {
  return componentMap[type] // возвращает React-компонент
}`

export default function FactoryMethod() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏭 Factory Method (Фабричный метод)</h1>
        <p>Определяет интерфейс создания объекта, но позволяет подклассам решать, какой класс создавать</p>
        <span className="pattern-category cat-creational">Порождающий</span>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Кадровое агентство.</strong> Вы говорите «нужен разработчик» — агентство само решает, какого именно специалиста предоставить. Вам не нужно знать, где и как его нашли</div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-green">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Factory Method — создание уведомлений" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Фабрики на фронтенде" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Создание UI-компонентов по типу/конфигурации</li>
          <li>Динамические формы (поля по schema)</li>
          <li>Парсеры / сериализаторы по формату</li>
          <li>Когда тип объекта определяется во время выполнения</li>
        </ul>
      </div>
    </div>
  )
}
