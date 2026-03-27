import CodeBlock from '../../components/CodeBlock'

const code = `// Template Method — скелет алгоритма в базовом классе, 
// шаги переопределяются в подклассах

abstract class DataExporter {
  // Template Method — неизменяемый скелет
  export(data: unknown[]) {
    const filtered = this.filter(data)
    const formatted = this.format(filtered)
    const result = this.addHeader() + formatted + this.addFooter()
    this.save(result)
    console.log(\`Exported \${filtered.length} records\`)
  }

  // Шаги, которые можно переопределить
  protected filter(data: unknown[]) { return data } // хук — по умолчанию без фильтра
  protected abstract format(data: unknown[]): string  // обязательно переопределить
  protected addHeader() { return '' }  // хук — опционально
  protected addFooter() { return '' }  // хук — опционально
  protected abstract save(content: string): void
}

class CSVExporter extends DataExporter {
  protected format(data: unknown[]) {
    return data.map(row => Object.values(row as object).join(',')).join('\\n')
  }
  protected addHeader() { return 'id,name,email\\n' }
  protected save(content: string) {
    console.log('Saving CSV...', content)
  }
}

class JSONExporter extends DataExporter {
  protected format(data: unknown[]) {
    return JSON.stringify(data, null, 2)
  }
  protected save(content: string) {
    console.log('Saving JSON...', content)
  }
}

class FilteredCSVExporter extends CSVExporter {
  protected filter(data: unknown[]) {
    return data.filter((item: any) => item.active)
  }
}

// Все используют один алгоритм, но с разными шагами
new CSVExporter().export(users)
new JSONExporter().export(users)
new FilteredCSVExporter().export(users)`

const frontendCode = `// Фронтенд: Template Method через hooks/callbacks

// 1. React component lifecycle = Template Method
// class App extends React.Component {
//   componentDidMount() { }    // хук — шаг 1
//   shouldComponentUpdate() { } // хук — шаг 2
//   render() { }                // обязательный шаг
//   componentDidUpdate() { }    // хук — шаг 3
// }
// React вызывает эти методы в определённом порядке (скелет)

// 2. Custom hook как Template Method
function useDataLoader<T>(
  fetchFn: () => Promise<T>,
  options?: {
    transform?: (data: T) => T    // хук: преобразование
    validate?: (data: T) => boolean  // хук: валидация
    onSuccess?: (data: T) => void   // хук: после загрузки
    onError?: (err: Error) => void  // хук: при ошибке
  }
) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchFn()
      .then(result => {
        // Скелет алгоритма:
        const transformed = options?.transform?.(result) ?? result
        if (options?.validate && !options.validate(transformed)) {
          throw new Error('Validation failed')
        }
        setData(transformed)
        options?.onSuccess?.(transformed)
      })
      .catch(err => options?.onError?.(err))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

// Использование — переопределяем нужные «шаги»
const { data } = useDataLoader(fetchUsers, {
  transform: users => users.filter(u => u.active),
  onSuccess: users => analytics.track('users_loaded', { count: users.length }),
})`

export default function TemplateMethod() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>📋 Template Method (Шаблонный метод)</h1>
        <p>Определяет скелет алгоритма, перекладывая реализацию отдельных шагов на подклассы</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Рецепт.</strong> Базовый рецепт пиццы: замесить тесто → раскатать → добавить начинку → запечь. Шаги «замесить» и «запечь» одинаковы для всех, а «начинку» каждый выбирает свою. Скелет рецепта фиксирован</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Template Method — экспортёр данных" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="React lifecycle, custom hooks" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Фреймворки (lifecycle hooks в React/Vue)</li>
          <li>Экспорт данных в разных форматах</li>
          <li>Общий алгоритм с вариативными шагами</li>
          <li>Базовые классы API/сервисов</li>
        </ul>
      </div>
    </div>
  )
}
