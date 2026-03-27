import CodeBlock from '../components/CodeBlock'

const spmBasicsCode = `// Swift Package Manager (SPM)
// Встроенный менеджер зависимостей и система сборки

// Package.swift — манифест пакета
// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "MyApp",
    platforms: [.iOS(.v16), .macOS(.v13)],  // минимальные версии
    products: [
        .library(name: "MyLib", targets: ["MyLib"]),
        .executable(name: "MyTool", targets: ["MyTool"]),
    ],
    dependencies: [
        // Зависимости от удалённых пакетов
        .package(url: "https://github.com/Alamofire/Alamofire", from: "5.8.0"),
        .package(url: "https://github.com/pointfreeco/swift-composable-architecture",
                 exact: "1.5.0"),   // фиксированная версия
        .package(path: "../MyLocalLib"),  // локальный пакет
    ],
    targets: [
        .target(
            name: "MyLib",
            dependencies: ["Alamofire"],
            path: "Sources/MyLib"    // кастомный путь (по умолчанию Sources/<name>)
        ),
        .testTarget(
            name: "MyLibTests",
            dependencies: ["MyLib"],
            path: "Tests/MyLibTests"
        ),
        .executableTarget(
            name: "MyTool",
            dependencies: ["MyLib"]
        ),
    ]
)`

const spmCommandsCode = `// Команды SPM в терминале

// Создание нового пакета
swift package init --type library    // библиотека
swift package init --type executable // исполняемый файл
swift package init --type empty      // пустой пакет

// Сборка и запуск
swift build                    // сборка (debug)
swift build -c release         // сборка (release, с оптимизацией)
swift run                      // собрать + запустить executable
swift run MyTool --arg1 val    // запуск с аргументами

// Управление зависимостями
swift package resolve           // загрузить/обновить зависимости
swift package update            // обновить до последних совместимых версий
swift package show-dependencies // дерево зависимостей

// Версионирование   
.upToNextMajor(from: "5.0.0")   // ≥ 5.0.0 и < 6.0.0 (по умолчанию 'from:')
.upToNextMinor(from: "5.2.0")   // ≥ 5.2.0 и < 5.3.0
.exact("5.2.1")                  // ровно 5.2.1
.branch("develop")               // ветка (нестабильно)
.revision("abc123")              // конкретный коммит`

const spmVsCode = `// SPM и Xcode

// В Xcode: File → Add Package Dependencies...
// URL → версия → Add to Target

// Структура SPM-пакета в Xcode:
// MyPackage/
// ├── Package.swift        ← манифест (редактируется как обычный Swift файл)
// ├── Sources/
// │   └── MyLib/
// │       └── MyLib.swift
// ├── Tests/
// │   └── MyLibTests/
// │       └── MyLibTests.swift
// └── Package.resolved     ← lock-файл (аналог package-lock.json)

// Преимущества SPM перед CocoaPods:
// ✅ Встроен в Swift/Xcode (не нужен ruby/gem)
// ✅ Декларативный Package.swift (Swift код, не YAML/Ruby DSL)
// ✅ Воспроизводимые сборки (Package.resolved)
// ✅ Поддержка бинарных пакетов (.xcframework)
// ✅ Кросс-платформенный (Linux, macOS, iOS)`

const xctestCode = `// XCTest — встроенный фреймворк тестирования

import XCTest
@testable import MyLib  // доступ к internal сущностям

final class CalculatorTests: XCTestCase {

    var sut: Calculator!  // System Under Test

    // ── Lifecycle ──
    override func setUp() {
        super.setUp()
        sut = Calculator()  // перед КАЖДЫМ тестом
    }

    override func tearDown() {
        sut = nil           // после КАЖДОГО теста
        super.tearDown()
    }

    // ── Assertions ──
    func testAddition() {
        let result = sut.add(2, 3)

        XCTAssertEqual(result, 5)                     // ==
        XCTAssertNotEqual(result, 4)                   // !=
        XCTAssertTrue(result > 0)                      // bool
        XCTAssertFalse(result < 0)                     // !bool
        XCTAssertNil(sut.lastError)                    // nil
        XCTAssertNotNil(result)                        // not nil
        XCTAssertGreaterThan(result, 0)                // >
        XCTAssertLessThanOrEqual(result, 100)          // <=
    }

    // ── Errors ──
    func testDivisionByZero() {
        XCTAssertThrowsError(try sut.divide(10, by: 0)) { error in
            XCTAssertEqual(error as? CalcError, .divisionByZero)
        }
        XCTAssertNoThrow(try sut.divide(10, by: 2))
    }

    // ── Performance ──
    func testPerformance() {
        measure {
            _ = sut.fibonacci(30)  // замерит среднее время 10 запусков
        }
    }
}`

const asyncTestCode = `// Асинхронные тесты

// ── async/await тест ──
func testFetchUser() async throws {
    let service = UserService()
    let user = try await service.fetchUser(id: 1)

    XCTAssertEqual(user.name, "Alice")
}

// ── Expectations (для callback-based API) ──
func testFetchWithCallback() {
    let expectation = expectation(description: "User fetched")

    service.fetchUser(id: 1) { result in
        switch result {
        case .success(let user):
            XCTAssertEqual(user.name, "Alice")
        case .failure:
            XCTFail("Should succeed")
        }
        expectation.fulfill()  // сигнализируем завершение
    }

    wait(for: [expectation], timeout: 5.0)
}

// ── Множественные expectations ──
func testMultipleEvents() {
    let exp1 = expectation(description: "Event 1")
    let exp2 = expectation(description: "Event 2")
    exp2.expectedFulfillmentCount = 3  // ожидаем 3 вызова

    // ...
    wait(for: [exp1, exp2], timeout: 5.0, enforceOrder: true)
}

// ── Тестирование потоков (AsyncSequence) ──
func testAsyncStream() async {
    var values: [Int] = []
    for await value in sut.numbersStream().prefix(3) {
        values.append(value)
    }
    XCTAssertEqual(values, [1, 2, 3])
}`

const mockingCode = `// Мокирование и Dependency Injection

// Протокол вместо конкретного типа
protocol NetworkClient {
    func fetch<T: Decodable>(url: URL) async throws -> T
}

// Реальная реализация
class URLSessionClient: NetworkClient {
    func fetch<T: Decodable>(url: URL) async throws -> T {
        let (data, _) = try await URLSession.shared.data(from: url)
        return try JSONDecoder().decode(T.self, from: data)
    }
}

// Мок для тестов
class MockNetworkClient: NetworkClient {
    var mockData: Any?
    var mockError: Error?
    var fetchCallCount = 0

    func fetch<T: Decodable>(url: URL) async throws -> T {
        fetchCallCount += 1
        if let error = mockError { throw error }
        return mockData as! T
    }
}

// DI в тестах
class UserServiceTests: XCTestCase {
    var mockClient: MockNetworkClient!
    var sut: UserService!

    override func setUp() {
        mockClient = MockNetworkClient()
        sut = UserService(client: mockClient)  // инъекция мока
    }

    func testFetchUser() async throws {
        mockClient.mockData = User(id: 1, name: "Alice")

        let user = try await sut.fetchUser(id: 1)

        XCTAssertEqual(user.name, "Alice")
        XCTAssertEqual(mockClient.fetchCallCount, 1)
    }

    func testNetworkError() async {
        mockClient.mockError = URLError(.notConnectedToInternet)

        do {
            _ = try await sut.fetchUser(id: 1)
            XCTFail("Should throw")
        } catch {
            XCTAssertTrue(error is URLError)
        }
    }
}`

const debuggingCode = `// Debugging в Xcode

// ── print debugging ──
print("Value:", someValue)          // простой вывод
debugPrint(someObject)              // подробный (показывает тип)
dump(complexObject)                 // рекурсивный дамп (все поля)

// ── LLDB команды в консоли Xcode ──
po expression         // print object — вычислить и показать
p expression          // print — показать с типом
v variable            // показать значение без вычисления (быстрее po)
bt                    // backtrace — стек вызовов
frame variable        // все переменные текущего фрейма
expr myVar = 42       // изменить значение на лету
thread list           // список потоков
watchpoint set variable myVar  // остановка при изменении переменной

// ── Breakpoints ──
// • Обычный: клик на гаттере слева от строки
// • Conditional: правый клик → Edit → Condition: "count > 10"
// • Symbolic: Debug → Breakpoints → Create Symbolic: "viewDidAppear"
// • Exception: ловит все Swift/ObjC исключения

// ── Instruments (Performance profiling) ──
// Product → Profile (⌘I)
// • Time Profiler:  CPU hotspots (какие функции тормозят)
// • Allocations:    утечки и чрезмерные аллокации
// • Leaks:          retain cycles
// • Network:        запросы, размер, latency
// • Energy Log:     энергопотребление

// ── Memory Graph Debugger ──
// Debug Navigator → Memory → кнопка графа
// Показывает граф объектов и retain cycles визуально`

const testingCommandsCode = `// Запуск тестов

// В Xcode:
// ⌘U                — все тесты
// ⌘⌥U               — тест под курсором
// Ромбик в гаттере   — запустить один тест/класс

// В терминале (SPM):
swift test                             // все тесты
swift test --filter CalculatorTests    // только один класс
swift test --filter testAddition       // только один тест
swift test -c release                  // тесты в release mode
swift test --parallel                  // параллельный запуск

// ── Naming Convention ──
// test_[метод]_[условие]_[ожидание]
func test_add_positiveNumbers_returnsSum() { }
func test_divide_byZero_throwsError() { }
func test_fetchUser_networkError_returnsNil() { }

// ── Структура проекта с тестами ──
// Sources/
//   MyLib/
//     Calculator.swift
//     UserService.swift
// Tests/
//   MyLibTests/
//     CalculatorTests.swift
//     UserServiceTests.swift
//     Mocks/
//       MockNetworkClient.swift`

export default function ToolingPage() {
  return (
    <div className="demo-container">
      <h1>🔧 Tooling: SPM, XCTest и Debugging</h1>
      <p>
        Знание языка — половина дела. Другая половина — уметь собирать проект, тестировать
        и отлаживать. Этот модуль связывает Swift-код с реальным рабочим процессом:
        Swift Package Manager для управления зависимостями, XCTest для тестирования
        и Xcode Instruments для профилирования.
      </p>

      {/* ── SPM Basics ── */}
      <section className="card">
        <h2>📦 Swift Package Manager: Package.swift</h2>
        <p style={{ marginBottom: 16 }}>
          SPM — встроенный в Swift инструмент управления зависимостями и сборки.
          Аналог <code>npm</code> для JavaScript или <code>pip</code> для Python.
          Манифест пишется на Swift — не на YAML, не на Ruby.
        </p>
        <CodeBlock code={spmBasicsCode} language="swift" title="Package.swift — манифест пакета" />
      </section>

      {/* ── SPM Commands ── */}
      <section className="card">
        <h2>⌨️ Команды SPM</h2>
        <CodeBlock code={spmCommandsCode} language="swift" title="Терминальные команды" />
      </section>

      {/* ── SPM + Xcode ── */}
      <section className="card">
        <h2>🔗 SPM + Xcode</h2>
        <CodeBlock code={spmVsCode} language="swift" title="SPM в Xcode и структура проекта" />

        <div style={{ overflowX: 'auto', marginTop: 16 }}>
          <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Инструмент</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Язык манифеста</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Lock-файл</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}><strong>SPM</strong></td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Swift</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Package.resolved</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>✅ Стандарт</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}><strong>CocoaPods</strong></td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Ruby (Podfile)</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Podfile.lock</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>⚠️ Legacy</td>
              </tr>
              <tr>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}><strong>Carthage</strong></td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Text (Cartfile)</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>Cartfile.resolved</td>
                <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)' }}>⚠️ Редко</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── XCTest ── */}
      <section className="card">
        <h2>🧪 XCTest: основы</h2>
        <p style={{ marginBottom: 16 }}>
          XCTest — встроенный фреймворк тестирования от Apple. Каждый тестовый метод
          начинается с <code>test</code>, каждый класс наследует <code>XCTestCase</code>.
        </p>
        <CodeBlock code={xctestCode} language="swift" title="XCTest — assertions, lifecycle, errors" />
      </section>

      {/* ── Async Tests ── */}
      <section className="card">
        <h2>⏳ Асинхронные тесты</h2>
        <CodeBlock code={asyncTestCode} language="swift" title="async/await тесты и expectations" />
      </section>

      {/* ── Mocking ── */}
      <section className="card">
        <h2>🎭 Мокирование и DI</h2>
        <p style={{ marginBottom: 16 }}>
          В Swift нет runtime-мокинга (как Mockito в Java). Мокаем через протоколы:
          зависимость принимается как протокол → в тесте подставляем мок-реализацию.
        </p>
        <CodeBlock code={mockingCode} language="swift" title="Protocol-based mocking" />
      </section>

      {/* ── Debugging ── */}
      <section className="card">
        <h2>🐛 Debugging и профилирование</h2>
        <CodeBlock code={debuggingCode} language="swift" title="LLDB, breakpoints, Instruments" />
      </section>

      {/* ── Running Tests ── */}
      <section className="card">
        <h2>▶️ Запуск тестов и конвенции</h2>
        <CodeBlock code={testingCommandsCode} language="swift" title="Команды и naming conventions" />
      </section>

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Чем SPM отличается от CocoaPods?</div><div className="a">SPM встроен в Swift/Xcode, манифест на Swift (Package.swift), поддерживает Linux. CocoaPods — сторонний инструмент на Ruby, требует .xcworkspace, вмешивается в конфигурацию проекта. SPM — стандарт с 2019+</div></div>
        <div className="interview-item"><div className="q">Как тестировать асинхронный код в Swift?</div><div className="a">Для async/await: тест-метод помечается как <code>async throws</code>. Для callback-based: создаём XCTestExpectation, вызываем fulfill() в callback, вызываем wait(for:timeout:) в конце теста</div></div>
        <div className="interview-item"><div className="q">Как мокировать зависимости в Swift?</div><div className="a">Через протоколы и DI. Зависимость объявляется как протокол. В продакшене — реальная реализация, в тестах — мок-класс с нужным поведением. Runtime-мокинга (Mockito) нет</div></div>
        <div className="interview-item"><div className="q">Как найти retain cycle?</div><div className="a">Xcode Memory Graph Debugger (кнопка в Debug Navigator). Instruments → Leaks. Оба визуально показывают графы объектов и циклические ссылки. Профилактика: weak/unowned в замыканиях</div></div>
      </section>
    </div>
  )
}
