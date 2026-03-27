import CodeBlock from '../../components/CodeBlock'

const code = `// Builder — пошаговое создание сложных объектов

class QueryBuilder {
  private table = ''
  private conditions: string[] = []
  private sortField = ''
  private sortDir: 'ASC' | 'DESC' = 'ASC'
  private limitVal = 0
  private fields: string[] = ['*']

  from(table: string) {
    this.table = table
    return this  // цепочка вызовов (fluent API)
  }

  select(...fields: string[]) {
    this.fields = fields
    return this
  }

  where(condition: string) {
    this.conditions.push(condition)
    return this
  }

  orderBy(field: string, dir: 'ASC' | 'DESC' = 'ASC') {
    this.sortField = field
    this.sortDir = dir
    return this
  }

  limit(n: number) {
    this.limitVal = n
    return this
  }

  build(): string {
    let q = \`SELECT \${this.fields.join(', ')} FROM \${this.table}\`
    if (this.conditions.length) q += \` WHERE \${this.conditions.join(' AND ')}\`
    if (this.sortField) q += \` ORDER BY \${this.sortField} \${this.sortDir}\`
    if (this.limitVal) q += \` LIMIT \${this.limitVal}\`
    return q
  }
}

// Удобный пошаговый API
const query = new QueryBuilder()
  .from('users')
  .select('id', 'name', 'email')
  .where('age > 18')
  .where('active = true')
  .orderBy('name')
  .limit(10)
  .build()

// SELECT id, name, email FROM users WHERE age > 18 AND active = true ORDER BY name ASC LIMIT 10`

const frontendCode = `// Фронтенд: Builder для конфигурации запросов

class FetchBuilder {
  private url = ''
  private method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET'
  private headers = new Headers()
  private bodyData: unknown = undefined
  private timeout = 30000
  private retries = 0

  to(url: string) { this.url = url; return this }
  
  post(data: unknown) {
    this.method = 'POST'
    this.bodyData = data
    this.headers.set('Content-Type', 'application/json')
    return this
  }

  withAuth(token: string) {
    this.headers.set('Authorization', \`Bearer \${token}\`)
    return this
  }

  withTimeout(ms: number) { this.timeout = ms; return this }
  withRetries(n: number) { this.retries = n; return this }

  async execute<T>(): Promise<T> {
    const controller = new AbortController()
    setTimeout(() => controller.abort(), this.timeout)

    let lastError: Error | null = null
    for (let i = 0; i <= this.retries; i++) {
      try {
        const res = await fetch(this.url, {
          method: this.method,
          headers: this.headers,
          body: this.bodyData ? JSON.stringify(this.bodyData) : undefined,
          signal: controller.signal
        })
        return res.json()
      } catch (e) {
        lastError = e as Error
      }
    }
    throw lastError
  }
}

// Чистый fluent API
const user = await new FetchBuilder()
  .to('/api/users')
  .post({ name: 'Иван', email: 'ivan@test.ru' })
  .withAuth(token)
  .withRetries(3)
  .withTimeout(5000)
  .execute<User>()`

export default function Builder() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🧱 Builder (Строитель)</h1>
        <p>Позволяет создавать сложные объекты пошагово, разделяя конструирование и представление</p>
        <span className="pattern-category cat-creational">Порождающий</span>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Конструктор бургера.</strong> Вы шаг за шагом выбираете: булку → котлету → соус → овощи → сыр. Каждый шаг опционален. В конце — готовый бургер. Без Builder пришлось бы передавать 15 параметров в конструктор</div>
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-green">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Builder — Query Builder" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="FetchBuilder — fluent API для запросов" />
      </div>

      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Объект с множеством опциональных параметров</li>
          <li>Query builders, Request builders</li>
          <li>Пошаговые формы / визарды</li>
          <li>Конфигурации (Vite, Webpack, ESLint)</li>
        </ul>
      </div>
    </div>
  )
}
