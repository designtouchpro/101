import CodeBlock from '../../components/CodeBlock'

const code = `// Facade — простой интерфейс к сложной системе

// Сложная система из множества модулей
class AuthModule {
  login(email: string, pass: string) { /* OAuth, JWT, refresh... */ }
  logout() { /* очистка токенов, сессий... */ }
  getToken() { return localStorage.getItem('token') }
}

class AnalyticsModule {
  track(event: string, data: object) { /* отправка в GA, Mixpanel... */ }
  identify(userId: string) { /* идентификация пользователя */ }
}

class NotificationModule {
  requestPermission() { /* Push API */ }
  show(title: string, body: string) { /* Notification API */ }
}

class StorageModule {
  save(key: string, data: unknown) {
    localStorage.setItem(key, JSON.stringify(data))
  }
  load<T>(key: string): T | null {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }
}

// Фасад — один простой интерфейс для всего
class AppFacade {
  private auth = new AuthModule()
  private analytics = new AnalyticsModule()
  private notifications = new NotificationModule()
  private storage = new StorageModule()

  async loginUser(email: string, password: string) {
    // Одна команда вместо 5 ручных вызовов
    await this.auth.login(email, password)
    this.analytics.identify(email)
    this.analytics.track('login', { method: 'email' })
    this.storage.save('lastLogin', new Date())
    this.notifications.show('Добро пожаловать!', \`Привет, \${email}\`)
  }

  logout() {
    this.auth.logout()
    this.analytics.track('logout', {})
    this.storage.save('lastLogin', null)
  }
}

// Клиентский код: одна строка вместо десяти
const app = new AppFacade()
app.loginUser('user@test.com', 'password123')`

const frontendCode = `// Фронтенд: фасады повсюду

// 1. jQuery — фасад для DOM API
// ❌ Без фасада
document.getElementById('el')?.addEventListener('click', handler)
document.querySelector('.class')?.classList.add('active')

// ✅ jQuery — фасад
// \$('#el').on('click', handler)
// \$('.class').addClass('active')

// 2. Axios — фасад для fetch/XMLHttpRequest
// ❌ Голый fetch
const res = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ivan' })
})
const data = await res.json()

// ✅ Axios — фасад
// const { data } = await axios.post('/api/users', { name: 'Ivan' })

// 3. Composable / Custom Hook как фасад
function useAuth() {
  // Скрываем сложность: токены, refresh, store, роутер
  const login = async (email: string, password: string) => {
    const { token } = await api.post('/auth/login', { email, password })
    store.setToken(token)
    router.push('/dashboard')
    analytics.track('login')
  }

  return { login, logout, user, isAuthenticated }
}

// Использование — просто!
const { login, user } = useAuth()`

export default function Facade() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🏛 Facade (Фасад)</h1>
        <p>Предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Заказ в ресторане.</strong> Вы говорите «стейк medium rare» — не идёте на кухню, не выбираете мясо, не настраиваете гриль. Официант (фасад) скрывает все внутренние процессы кухни</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Facade — единая точка входа" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="jQuery, Axios, Composables — всё фасады" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Custom hooks / composables (useAuth, useFetch)</li>
          <li>Обёртки над сложными API (DOM, Canvas, WebGL)</li>
          <li>SDK для работы с вашим сервисом</li>
          <li>Упрощение инициализации приложения</li>
        </ul>
      </div>
    </div>
  )
}
