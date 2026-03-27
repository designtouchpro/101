import CodeBlock from '../../components/CodeBlock'

const code = `// Flyweight — экономия памяти через разделение общего состояния

// Без Flyweight: 10000 частиц × полный объект = много памяти
// С Flyweight: общие данные (цвет, текстура) хранятся один раз

interface ParticleType {
  color: string
  sprite: string  // тяжёлые данные (изображение)
  size: number
}

// Flyweight Factory — кэширует и переиспользует общие объекты
class ParticleTypeFactory {
  private static cache = new Map<string, ParticleType>()

  static getType(color: string, sprite: string, size: number): ParticleType {
    const key = \`\${color}-\${sprite}-\${size}\`
    
    if (!this.cache.has(key)) {
      this.cache.set(key, { color, sprite, size })
      console.log(\`Создан новый тип: \${key}\`)
    }
    
    return this.cache.get(key)! // переиспользуем существующий
  }
}

// Частица: уникальные данные (координаты) + ссылка на общий тип
class Particle {
  constructor(
    public x: number,
    public y: number,
    public velocityX: number,
    public velocityY: number,
    public type: ParticleType  // ссылка на общий Flyweight
  ) {}
}

// 10000 частиц, но всего 3 типа в памяти
const particles: Particle[] = []
for (let i = 0; i < 10000; i++) {
  const type = ParticleTypeFactory.getType(
    i % 3 === 0 ? 'red' : i % 3 === 1 ? 'blue' : 'green',
    'spark',
    i % 3 + 1
  )
  particles.push(new Particle(Math.random() * 800, Math.random() * 600, 0, 0, type))
}
// 10000 частиц, но ParticleType создан только 3 раза!`

const frontendCode = `// Фронтенд: Flyweight на практике

// 1. Виртуализация списков (react-window, vue-virtual-scroller)
// Рендерим только видимые элементы, переиспользуем DOM-ноды
// 1000 элементов в списке, но DOM-нод всего ~20

// 2. CSS классы вместо inline styles
// ❌ 1000 элементов × объект стилей = 1000 объектов
items.forEach(item => {
  el.style.color = 'red'
  el.style.fontSize = '14px'
  // Каждый элемент хранит свой объект стилей
})

// ✅ CSS класс — один объект на все элементы
// .item { color: red; font-size: 14px; }
items.forEach(item => {
  el.className = 'item' // ссылка на общий стиль
})

// 3. Интернирование строк в иконках
const iconCache = new Map<string, SVGElement>()

function getIcon(name: string): SVGElement {
  if (!iconCache.has(name)) {
    iconCache.set(name, loadSVG(name))
  }
  return iconCache.get(name)!.cloneNode(true) as SVGElement
}

// 4. String.prototype.intern() в Java, 
// В JS строки уже интернируются движком!
const a = 'hello'
const b = 'hello'
console.log(a === b) // true — один объект в памяти`

export default function Flyweight() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🪶 Flyweight (Легковес)</h1>
        <p>Экономит память, разделяя общее состояние между множеством похожих объектов</p>
        <span className="pattern-category cat-structural">Структурный</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Шрифт в текстовом редакторе.</strong> Каждая буква «А» на странице не хранит свой глиф (изображение буквы). Глиф один, а буквы просто ссылаются на него и хранят только своё положение</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Flyweight — система частиц" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Виртуализация, CSS классы, кэш иконок" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Огромные списки/таблицы (виртуализация)</li>
          <li>Частицы, анимации, игровые объекты</li>
          <li>Кэширование тяжёлых ресурсов (иконки, спрайты)</li>
          <li>Когда много одинаковых объектов «съедают» память</li>
        </ul>
      </div>
    </div>
  )
}
