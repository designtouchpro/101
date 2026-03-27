import CodeBlock from '../components/CodeBlock'

const previewsCode = `// Xcode Previews — мгновенная визуализация Views

import SwiftUI

// Базовый preview
#Preview {
    ContentView()
}

// Именованный preview (с iOS 17+)
#Preview("Dark Mode") {
    ContentView()
        .preferredColorScheme(.dark)
}

#Preview("Large Text") {
    ContentView()
        .dynamicTypeSize(.xxxLarge)
}

// Preview с фиксированным размером
#Preview("iPhone SE", traits: .fixedLayout(width: 320, height: 568)) {
    ContentView()
}

// Preview в NavigationStack
#Preview {
    NavigationStack {
        DetailView(item: .sample)
    }
}

// Preview с mock-данными
#Preview {
    let mockVM = ItemListViewModel()
    mockVM.items = Item.sampleData  // предзаполненные данные

    return ItemListView(viewModel: mockVM)
        .environment(\\.locale, Locale(identifier: "ru_RU"))
}

// ⚠️ Распространённые проблемы:
// • Preview крашится → почистить DerivedData (⌘⇧K, затем Build)
// • Preview не обновляется → нажать Resume (⌥⌘P)
// • Preview слишком медленный → использовать #Preview вместо PreviewProvider`

const viewIdentityCode = `// View Identity — ключ к пониманию перерисовок

// SwiftUI определяет "тот же это view или новый" двумя способами:

// 1. Structural Identity — позиция в иерархии
var body: some View {
    if showDetails {
        DetailView()     // позиция 0 в if-ветке
    } else {
        PlaceholderView() // позиция 0 в else-ветке
    }
    // SwiftUI считает DetailView и PlaceholderView РАЗНЫМИ views
    // → старый уничтожается, новый создаётся (анимация перехода)
}

// 2. Explicit Identity — через .id() или ForEach
ForEach(items) { item in
    ItemRow(item: item)  // id = item.id
}
// Если item.id изменится → SwiftUI создаст НОВЫЙ ItemRow

// ⚠️ Ловушка: .id() пересоздаёт view!
TextField("Name", text: $name)
    .id(someChangingValue)
// Каждое изменение someChangingValue → новый TextField
// → теряется фокус, сбрасывается @State

// Правило: не присваивай .id() значение, которое часто меняется`

const equatableCode = `// Equatable и перерисовки

// SwiftUI перерисовывает view когда его "input" изменился
// Input = все свойства, переданные в view

struct ExpensiveView: View {
    let title: String
    let items: [Item]

    var body: some View {
        // Если title ИЛИ items изменились → body вызовется заново
        VStack {
            Text(title)
            ForEach(items) { ItemRow(item: $0) }
        }
    }
}

// Оптимизация: EquatableView пропускает перерисовку
// если Equatable говорит "ничего не изменилось"
struct ExpensiveView: View, Equatable {
    let title: String
    let items: [Item]

    static func == (lhs: Self, rhs: Self) -> Bool {
        lhs.title == rhs.title && lhs.items.count == rhs.items.count
        // Сравниваем только count вместо полного массива
    }

    var body: some View {
        VStack {
            Text(title)
            ForEach(items) { ItemRow(item: $0) }
        }
    }
}

// Использование:
EquatableView(content: ExpensiveView(title: t, items: arr))`

const performanceCode = `// Оптимизация перерисовок

// ❌ Один @Observable, все views перерисовываются при любом изменении
@Observable
class AppState {
    var user: User?
    var products: [Product] = []
    var cart: [CartItem] = []
    var notifications: [Note] = []
}

struct ProductList: View {
    let state: AppState
    var body: some View {
        // Перерисуется при изменении cart, notifications и т.д.!
        ForEach(state.products) { ProductRow(product: $0) }
    }
}

// ✅ Разделяй observable по зонам ответственности
@Observable class ProductStore {
    var products: [Product] = []
}
@Observable class CartStore {
    var items: [CartItem] = []
}

struct ProductList: View {
    let store: ProductStore  // реагирует только на products
    var body: some View {
        ForEach(store.products) { ProductRow(product: $0) }
    }
}

// ✅ Извлекай подвью (extract subview)
// Вместо одного body на 200 строк — маленькие View
// Каждый перерисовывается только когда его конкретные props меняются

// ✅ Используй let вместо computed для статичных данных
struct ItemRow: View {
    let item: Item  // let — SwiftUI знает, что не меняется
    var body: some View { Text(item.name) }
}`

const lazyCode = `// Lazy загрузка и производительность списков

// ❌ List создаёт ВСЕ rows сразу
List(hugeArray) { item in
    ExpensiveRow(item: item) // 10000 rows создаются все сразу
}

// ✅ LazyVStack создаёт rows по мере скролла
ScrollView {
    LazyVStack {
        ForEach(hugeArray) { item in
            ExpensiveRow(item: item) // создаёт только видимые
        }
    }
}

// ✅ List с правильным id — уже lazy по умолчанию
List(hugeArray, id: \\.self) { item in
    ExpensiveRow(item: item) // List сам использует lazy loading
}

// Lazy Grid для сеток
ScrollView {
    LazyVGrid(columns: [
        GridItem(.adaptive(minimum: 150))
    ]) {
        ForEach(items) { item in
            CardView(item: item)
        }
    }
}

// ⚠️ task vs onAppear для загрузки данных
List(items) { item in
    ItemRow(item: item)
        .task { await prefetch(item) }  // отменяется при уходе со скрина
        // .onAppear { } — НЕ отменяется, нет async
}`

const testingCode = `// Тестирование SwiftUI Views

import XCTest
import ViewInspector  // популярная библиотека для инспекции SwiftUI
@testable import MyApp

// ── Тестирование ViewModel (основной подход) ──
final class ItemListViewModelTests: XCTestCase {

    func test_fetchItems_updatesItems() async {
        let mockService = MockItemService()
        mockService.mockItems = [Item(id: 1, name: "Test")]
        let vm = ItemListViewModel(service: mockService)

        await vm.fetchItems()

        XCTAssertEqual(vm.items.count, 1)
        XCTAssertEqual(vm.items.first?.name, "Test")
        XCTAssertFalse(vm.isLoading)
    }

    func test_deleteItem_removesFromList() {
        let vm = ItemListViewModel()
        vm.items = [Item(id: 1, name: "A"), Item(id: 2, name: "B")]

        vm.delete(id: 1)

        XCTAssertEqual(vm.items.count, 1)
        XCTAssertEqual(vm.items.first?.name, "B")
    }
}

// ── Snapshot тестирование (опционально) ──
// Библиотека: swift-snapshot-testing (PointFree)
import SnapshotTesting

func test_itemRow_snapshot() {
    let view = ItemRow(item: .sample)
        .frame(width: 375)

    assertSnapshot(of: view, as: .image(layout: .device(config: .iPhone13)))
}

// ── UI тесты (XCUITest) — интеграционные ──
final class ItemListUITests: XCTestCase {
    let app = XCUIApplication()

    override func setUp() {
        app.launchArguments = ["--uitesting"]
        app.launch()
    }

    func test_addItem_appearsInList() {
        app.buttons["Add"].tap()
        app.textFields["Name"].typeText("New Item")
        app.buttons["Save"].tap()

        XCTAssertTrue(app.staticTexts["New Item"].exists)
    }
}`

const instrumentsCode = `// Instruments для SwiftUI

// ── Профилирование ──
// Product → Profile (⌘I) → выбрать шаблон:

// 1. SwiftUI Instrument (Xcode 15+)
//    • Показывает body evaluations — сколько раз вызвался body
//    • View updates timeline
//    • Причины перерисовок (какое свойство изменилось)

// 2. Time Profiler
//    • CPU hotspots в body (тяжёлые вычисления)
//    • Долгие .task{} или .onAppear{}
//    Совет: ищите body вызовы в Top Functions

// 3. Allocations
//    • Утечки памяти от @StateObject / @Observable
//    • Retain cycles в замыканиях .task{}

// ── Debug overlay ──
// В любой Preview или Debug build:
.overlay {
    // Визуализация перерисовок (мигает при каждом body)
    Color.red.opacity(0.1)
        .allowsHitTesting(false)
}

// ── Self._printChanges() ──
var body: some View {
    let _ = Self._printChanges()
    // Печатает в консоль КАКОЕ свойство вызвало перерисовку:
    // "ItemRow: @self, @identity, _item changed."
    Text(item.name)
}

// ⚠️ Убрать _printChanges() перед релизом!

// ── Redraw counter ──
struct RedrawCounter: View {
    @State private var count = 0
    var body: some View {
        let _ = { count += 1 }()
        Text("Redraws: \\(count)")
            .font(.caption).foregroundStyle(.red)
    }
}`

export default function TestingPerfPage() {
  return (
    <div className="demo-container">
      <h1>🧪 Тестирование, Debugging и Performance</h1>
      <p>
        SwiftUI перерисовывает views автоматически — это удобно, но может стать
        проблемой производительности. Этот модуль учит понимать <em>когда</em> и <em>почему</em> view
        перерисовывается, как это тестировать и профилировать.
      </p>

      {/* ── Previews ── */}
      <section className="card">
        <h2>👁️ Xcode Previews</h2>
        <p style={{ marginBottom: 16 }}>
          Previews — встроенный live-рендеринг views прямо в Xcode. Быстрее, чем запуск на
          симуляторе. Используйте для визуальной проверки состояний: light/dark mode,
          размеры экранов, RTL, Dynamic Type.
        </p>
        <CodeBlock code={previewsCode} language="swift" title="Previews: базовые и продвинутые" />
      </section>

      {/* ── View Identity ── */}
      <section className="card">
        <h2>🪪 View Identity: Structural vs Explicit</h2>
        <p style={{ marginBottom: 16 }}>
          SwiftUI определяет «тот же это view или новый» через <strong>identity</strong>.
          Понимание identity — ключ к предсказуемым анимациям и отсутствию багов.
        </p>
        <CodeBlock code={viewIdentityCode} language="swift" title="Как SwiftUI определяет identity" />
        <div style={{ marginTop: 16, padding: '12px 16px', background: 'var(--card-bg)', borderLeft: '3px solid #ff9800', borderRadius: 4 }}>
          <strong>Правило:</strong> Structural identity (позиция в иерархии) — для статичных layouts.
          Explicit identity (<code>.id()</code>, <code>ForEach</code>) — для динамических коллекций.
          Избегай <code>.id(changingValue)</code> — это пересоздаёт view.
        </div>
      </section>

      {/* ── Equatable ── */}
      <section className="card">
        <h2>⚖️ Equatable и пропуск перерисовок</h2>
        <CodeBlock code={equatableCode} language="swift" title="EquatableView для оптимизации" />
      </section>

      {/* ── Performance ── */}
      <section className="card">
        <h2>⚡ Оптимизация перерисовок</h2>
        <CodeBlock code={performanceCode} language="swift" title="Разделение observable, extract subview" />

        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Проблема</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Причина</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Решение</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Весь экран мигает</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Один @Observable на всё приложение</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Разделить на мелкие store</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Скролл лагает</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Тяжёлый body / не lazy</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>LazyVStack + extract subview</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>TextField теряет фокус</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>.id() пересоздаёт view</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Убрать/стабилизировать .id()</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Анимация сбрасывается</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Structural identity сменилась</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Использовать .opacity() вместо if/else</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Lazy Loading ── */}
      <section className="card">
        <h2>🦥 Lazy Loading и списки</h2>
        <CodeBlock code={lazyCode} language="swift" title="LazyVStack, task, prefetch" />
      </section>

      {/* ── Testing ── */}
      <section className="card">
        <h2>🧪 Тестирование Views</h2>
        <p style={{ marginBottom: 16 }}>
          Основной подход: тестируй <strong>ViewModel</strong>, не View. View — это
          чистая функция от state. Если state правильный, view правильный.
          UI-тесты (XCUITest) — для критичных e2e сценариев.
        </p>
        <CodeBlock code={testingCode} language="swift" title="ViewModel tests, snapshots, UI tests" />
      </section>

      {/* ── Instruments ── */}
      <section className="card">
        <h2>📈 Instruments и Debug Tools</h2>
        <CodeBlock code={instrumentsCode} language="swift" title="SwiftUI Instrument, _printChanges, debug overlay" />
      </section>

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Что такое View Identity в SwiftUI?</div><div className="a">Механизм, по которому SwiftUI определяет «тот же это view или новый». Structural identity — по позиции в иерархии (if/else создаёт разные views). Explicit identity — через .id() или ForEach. Определяет, будет ли анимация перехода и сохранится ли @State</div></div>
        <div className="interview-item"><div className="q">Как оптимизировать перерисовки в SwiftUI?</div><div className="a">1) Разделить @Observable на мелкие store по зонам. 2) Extract subview — маленькие views перерисовываются независимо. 3) Использовать let для неизменяемых props. 4) EquatableView для тяжёлых views. 5) LazyVStack для длинных списков. 6) Self._printChanges() для диагностики</div></div>
        <div className="interview-item"><div className="q">Как тестировать SwiftUI Views?</div><div className="a">Основной подход — тестирование ViewModel: unit-тесты на логику, проверка state после действий. View тестируется визуально через Previews и Snapshot-тесты (swift-snapshot-testing). XCUITest — для e2e сценариев. Сами views не unit-тестируются напрямую</div></div>
      </section>
    </div>
  )
}
