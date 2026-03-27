import CodeBlock from '../../components/CodeBlock'

const code = `// Visitor — добавление операций к объектам без изменения их классов

// Элементы дерева AST (абстрактного синтаксического дерева)
interface ASTNode {
  accept(visitor: ASTVisitor): unknown
}

class NumberNode implements ASTNode {
  constructor(public value: number) {}
  accept(visitor: ASTVisitor) { return visitor.visitNumber(this) }
}

class StringNode implements ASTNode {
  constructor(public value: string) {}
  accept(visitor: ASTVisitor) { return visitor.visitString(this) }
}

class BinaryExpr implements ASTNode {
  constructor(
    public left: ASTNode,
    public op: '+' | '-' | '*',
    public right: ASTNode
  ) {}
  accept(visitor: ASTVisitor) { return visitor.visitBinary(this) }
}

// Visitor — определяет операцию для каждого типа узла
interface ASTVisitor {
  visitNumber(node: NumberNode): unknown
  visitString(node: StringNode): unknown
  visitBinary(node: BinaryExpr): unknown
}

// Visitor 1: Вычисление
class Evaluator implements ASTVisitor {
  visitNumber(node: NumberNode) { return node.value }
  visitString(node: StringNode) { return node.value }
  visitBinary(node: BinaryExpr) {
    const left = node.left.accept(this) as number
    const right = node.right.accept(this) as number
    switch (node.op) {
      case '+': return left + right
      case '-': return left - right
      case '*': return left * right
    }
  }
}

// Visitor 2: Вывод в строку
class Printer implements ASTVisitor {
  visitNumber(node: NumberNode) { return String(node.value) }
  visitString(node: StringNode) { return \`"\${node.value}"\` }
  visitBinary(node: BinaryExpr) {
    return \`(\${node.left.accept(this)} \${node.op} \${node.right.accept(this)})\`
  }
}

// AST: (2 + 3) * 4
const ast = new BinaryExpr(
  new BinaryExpr(new NumberNode(2), '+', new NumberNode(3)),
  '*',
  new NumberNode(4)
)

console.log(ast.accept(new Evaluator())) // 20
console.log(ast.accept(new Printer()))   // "((2 + 3) * 4)"`

const frontendCode = `// Фронтенд: Visitor в трансформации данных

// 1. Babel plugins — классический Visitor
// babel-plugin трансформирует AST через visitor
const babelPlugin = {
  visitor: {
    CallExpression(path) {
      // Заменяем console.log() на noop
      if (path.node.callee.name === 'console') {
        path.remove()
      }
    },
    ArrowFunctionExpression(path) {
      // Превращаем arrow functions в function
    }
  }
}

// 2. DOM traversal — обход и обработка разных узлов
interface DOMVisitor {
  visitElement(el: HTMLElement): void
  visitText(text: Text): void
  visitComment(comment: Comment): void
}

function walkDOM(node: Node, visitor: DOMVisitor) {
  if (node instanceof HTMLElement) visitor.visitElement(node)
  else if (node instanceof Text) visitor.visitText(node)
  else if (node instanceof Comment) visitor.visitComment(node)
  
  node.childNodes.forEach(child => walkDOM(child, visitor))
}

// Visitor: подсчёт статистики DOM
class DOMStatsVisitor implements DOMVisitor {
  elements = 0; texts = 0; comments = 0
  visitElement() { this.elements++ }
  visitText() { this.texts++ }
  visitComment() { this.comments++ }
}

const stats = new DOMStatsVisitor()
walkDOM(document.body, stats)
console.log(\`Elements: \${stats.elements}, Texts: \${stats.texts}\`)`

export default function Visitor() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🚶 Visitor (Посетитель)</h1>
        <p>Добавляет новые операции к иерархии объектов, не изменяя сами классы</p>
        <span className="pattern-category cat-behavioral">Поведенческий</span>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🌍 Аналогия</h3></div>
        <div className="analogy"><strong>Инспектор.</strong> Здания (элементы) стоят на месте. Разные инспекторы (посетители) приходят и проводят разные проверки: пожарный, электрик, санитарный. Здание не знает заранее, что будут проверять</div>
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">💻 Реализация</h3><span className="card-badge badge-blue">TypeScript</span></div>
        <CodeBlock code={code} language="typescript" title="Visitor — AST (абстрактное синтаксическое дерево)" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">🎯 Фронтенд примеры</h3></div>
        <CodeBlock code={frontendCode} language="typescript" title="Babel plugins, DOM traversal" />
      </div>
      <div className="card">
        <div className="card-header"><h3 className="card-title">✅ Когда использовать</h3></div>
        <ul className="use-cases">
          <li>Компиляторы и трансформации AST (Babel, ESLint)</li>
          <li>Обход и анализ DOM-дерева</li>
          <li>Сериализация/десериализация разнотипных объектов</li>
          <li>Когда нужно много операций над стабильной иерархией</li>
        </ul>
      </div>
    </div>
  )
}
