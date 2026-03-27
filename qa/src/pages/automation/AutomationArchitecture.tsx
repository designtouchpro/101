import { useState } from 'react'

const architectureLayers = [
  { layer: 'Core / Driver', icon: '⚙️', desc: 'Selenium, Playwright, Appium — взаимодействие с UI', responsibilities: ['Browser management', 'Element interaction', 'Screenshot/video capture'] },
  { layer: 'Page Objects / Components', icon: '🧱', desc: 'Абстракция страниц, переиспользуемые компоненты', responsibilities: ['Encapsulate selectors', 'Expose business actions', 'Hide implementation details'] },
  { layer: 'Step / Action Layer', icon: '🦶', desc: 'Бизнес-действия: login(), createOrder()', responsibilities: ['Compose page objects', 'Reusable across tests', 'Readable as spec'] },
  { layer: 'Test Layer', icon: '🧪', desc: 'Тест-кейсы: arrange → act → assert', responsibilities: ['Test data setup', 'Assertions', 'Independent & isolated'] },
  { layer: 'CI / Runner', icon: '🏗️', desc: 'Запуск, отчёты, retry, параллелизация', responsibilities: ['Pipeline integration', 'Reporting (Allure/HTML)', 'Flaky management'] },
]

const selectorStrategy = [
  { strategy: 'data-testid', reliability: '🟢 Высокая', example: '[data-testid="submit-btn"]', pros: 'Стабильный, не зависит от UI', cons: 'Нужна поддержка frontend' },
  { strategy: 'Role / Accessibility', reliability: '🟢 Высокая', example: 'getByRole("button", {name: "Submit"})', pros: 'Тестирует a11y заодно', cons: 'Не все элементы имеют роли' },
  { strategy: 'Text content', reliability: '🟡 Средняя', example: 'getByText("Submit")', pros: 'Понятный, user-facing', cons: 'Ломается при i18n / изменении текста' },
  { strategy: 'CSS class', reliability: '🟠 Низкая', example: '.btn-primary', pros: 'Доступен всегда', cons: 'Часто меняется при рефакторинге CSS' },
  { strategy: 'XPath', reliability: '🔴 Хрупкий', example: '//div[3]/button[1]', pros: 'Мощный для сложных случаев', cons: 'Brittle, нечитаемый, медленный' },
]

const envStrategy = [
  { env: 'Local', purpose: 'Быстрый фидбек при разработке', tests: 'Unit + Component', data: 'Mocks / in-memory', ci: 'Pre-commit hooks' },
  { env: 'Dev / Feature', purpose: 'Интеграция внутри фичи', tests: 'Unit + Integration + Smoke E2E', data: 'Seeded DB', ci: 'PR pipeline' },
  { env: 'Staging', purpose: 'Production-like верификация', tests: 'Full E2E + Performance', data: 'Anonymized prod data', ci: 'Merge to main' },
  { env: 'Production', purpose: 'Мониторинг и canary', tests: 'Smoke + Synthetic monitoring', data: 'Real', ci: 'Post-deploy + scheduled' },
]

const flakyCauses = [
  { cause: 'Timing / Race conditions', icon: '⏱️', diagnosis: 'Тест проходит при retry, random fails', fixes: ['Явные waits вместо sleep', 'waitFor conditions', 'Retry на уровне assertion'] },
  { cause: 'Shared state / Data', icon: '🗃️', diagnosis: 'Fails при параллельном запуске или после другого теста', fixes: ['Изолированные тест-данные', 'Setup/teardown per test', 'Unique IDs per run'] },
  { cause: 'Flaky selectors', icon: '🎯', diagnosis: 'Element not found / stale element', fixes: ['data-testid', 'Accessibility selectors', 'Avoid XPath / nth-child'] },
  { cause: 'Environment instability', icon: '🌐', diagnosis: 'Fails на CI но не локально (или наоборот)', fixes: ['Docker-based env', 'Headless = headed parity', 'Network stubbing'] },
  { cause: 'Animation / Transition', icon: '✨', diagnosis: 'Click intercepted / element not interactable', fixes: ['Disable animations in test', 'Wait for animation end', 'Force-click with caution'] },
  { cause: 'External dependencies', icon: '🔌', diagnosis: 'Third-party API down / slow', fixes: ['Mock external services', 'Contract tests отдельно', 'Timeout + retry policy'] },
]

const ciPolicies = [
  { policy: 'Gate: block merge on failure', desc: 'Красные тесты = нельзя мержить', when: 'Stable suite, high trust', tradeoff: 'Flaky тесты блокируют всех' },
  { policy: 'Quarantine: isolate flaky', desc: 'Помечаем flaky, запускаем отдельно', when: 'Переходный период, много flaky', tradeoff: 'Flaky могут скрывать реальные баги' },
  { policy: 'Auto-retry: 2-3 attempts', desc: 'Retry при первом fail', when: 'Умеренно flaky suite', tradeoff: 'Маскирует root cause, увеличивает время' },
  { policy: 'SLA: ≤N% flaky', desc: 'Мониторим % flaky, чиним при превышении', when: 'Зрелая команда', tradeoff: 'Нужна инфраструктура мониторинга' },
]

export default function AutomationArchitecture() {
  const [tab, setTab] = useState<'arch' | 'selectors' | 'envs' | 'flaky' | 'ci'>('arch')

  return (
    <div className="demo-container">
      <h1>🏗️ Архитектура автоматизации и Flaky-тесты</h1>
      <p>Слои автоматизации, стратегии селекторов, окружения, диагностика flaky и CI-политики.</p>

      <div style={{ display: 'flex', gap: 8, margin: '24px 0', flexWrap: 'wrap' }}>
        {([
          ['arch', '🏗️ Архитектура'],
          ['selectors', '🎯 Селекторы'],
          ['envs', '🌍 Окружения'],
          ['flaky', '🩺 Flaky-тесты'],
          ['ci', '🔄 CI-политики'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
              background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
              color: tab === key ? '#fff' : 'var(--text)',
              cursor: 'pointer',
              fontWeight: tab === key ? 600 : 400,
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Architecture ── */}
      {tab === 'arch' && (
        <section className="card">
          <h2>🏗️ Слои автоматизации</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Хорошая архитектура = maintainable, readable, scalable тесты.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {architectureLayers.map((l, i) => (
              <div key={l.layer} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ minWidth: 48, height: 48, borderRadius: 8, background: 'var(--accent)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{l.icon}</div>
                <div style={{ flex: 1, padding: 14, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8, borderLeft: '4px solid var(--accent)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <h3 style={{ margin: 0 }}>Layer {i + 1}: {l.layer}</h3>
                  </div>
                  <p style={{ margin: '0 0 8px', fontSize: '0.85rem' }}>{l.desc}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {l.responsibilities.map(r => (
                      <span key={r} style={{ fontSize: '0.8rem', padding: '3px 10px', borderRadius: 6, background: 'var(--bg)', border: '1px solid var(--border)' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '2px solid var(--accent)', borderRadius: 8 }}>
            <h4 style={{ margin: '0 0 8px' }}>💡 Page Object Pattern</h4>
            <pre style={{ margin: 0, padding: 12, background: 'var(--bg)', borderRadius: 6, fontSize: '0.8rem', overflow: 'auto', lineHeight: 1.5 }}>{`// LoginPage.ts — Page Object
class LoginPage {
  private page: Page;
  
  // Selectors in one place
  private emailInput = '[data-testid="email"]';
  private passInput  = '[data-testid="password"]';
  private submitBtn  = '[data-testid="login-submit"]';

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passInput, password);
    await this.page.click(this.submitBtn);
    await this.page.waitForURL('/dashboard');
  }
}

// test.spec.ts — Clean test
test('user can log in', async () => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@test.com', 'pass123');
  await expect(page.locator('h1')).toHaveText('Dashboard');
});`}</pre>
          </div>
        </section>
      )}

      {/* ── Selectors ── */}
      {tab === 'selectors' && (
        <section className="card">
          <h2>🎯 Стратегия селекторов</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Надёжные селекторы = стабильные тесты. Приоритет: data-testid → role → text → CSS → XPath.</p>

          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Стратегия</th>
                  <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Надёжность</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Пример</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Плюсы</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Минусы</th>
                </tr>
              </thead>
              <tbody>
                {selectorStrategy.map(s => (
                  <tr key={s.strategy}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{s.strategy}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>{s.reliability}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontFamily: 'monospace', fontSize: '0.8rem' }}>{s.example}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.pros}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{s.cons}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ── Environments ── */}
      {tab === 'envs' && (
        <section className="card">
          <h2>🌍 Стратегия окружений</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Окружение</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Цель</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Тесты</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Данные</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>CI триггер</th>
                </tr>
              </thead>
              <tbody>
                {envStrategy.map(e => (
                  <tr key={e.env}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>{e.env}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{e.purpose}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{e.tests}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{e.data}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{e.ci}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 16, padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>📦 Test Data Strategy</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
              {[
                { name: 'Factory / Builder', desc: 'Создаём данные в тесте (Faker, Factory Bot)', best: 'Изолированные тесты' },
                { name: 'Fixtures / Seeds', desc: 'Pre-loaded набор данных при старте', best: 'Стабильный baseline' },
                { name: 'API Setup', desc: 'Создаём через API в beforeAll', best: 'E2E, реалистичные данные' },
                { name: 'DB Snapshot', desc: 'Откат к snapshot после теста', best: 'Скорость + изоляция' },
              ].map(d => (
                <div key={d.name} style={{ padding: 12, background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.name}</div>
                  <div style={{ fontSize: '0.8rem', marginBottom: 4 }}>{d.desc}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)' }}>Best for: {d.best}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Flaky Tests ── */}
      {tab === 'flaky' && (
        <section className="card">
          <h2>🩺 Диагностика Flaky-тестов</h2>
          <p style={{ marginBottom: 16, fontSize: '0.85rem', opacity: 0.8 }}>Flaky test — тест, проходящий/падающий недетерминированно без изменений кода.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {flakyCauses.map(f => (
              <div key={f.cause} style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                  <h3 style={{ margin: 0 }}>{f.icon} {f.cause}</h3>
                </div>
                <div style={{ fontSize: '0.85rem', marginBottom: 8, fontStyle: 'italic' }}>Диагностика: {f.diagnosis}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {f.fixes.map(fix => (
                    <span key={fix} style={{ fontSize: '0.8rem', padding: '4px 10px', borderRadius: 6, background: 'var(--bg)', border: '1px solid var(--border)' }}>✅ {fix}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CI Policies ── */}
      {tab === 'ci' && (
        <section className="card">
          <h2>🔄 CI-политики для тестов</h2>
          <div style={{ overflowX: 'auto', marginBottom: 16 }}>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Политика</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Описание</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Когда</th>
                  <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '2px solid var(--border)' }}>Trade-off</th>
                </tr>
              </thead>
              <tbody>
                {ciPolicies.map(p => (
                  <tr key={p.policy}>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontWeight: 600, fontSize: '0.85rem' }}>{p.policy}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{p.desc}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{p.when}</td>
                    <td style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', fontSize: '0.85rem' }}>{p.tradeoff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ padding: 16, background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <h3 style={{ margin: '0 0 12px' }}>⚡ Оптимизация CI-пайплайна</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[
                { tip: 'Параллелизация', desc: 'Sharding тестов по агентам' },
                { tip: 'Selective testing', desc: 'Запуск только affected tests (git diff → test mapping)' },
                { tip: 'Fail-fast', desc: 'Прервать suite при N красных' },
                { tip: 'Cache dependencies', desc: 'node_modules, Docker layers' },
                { tip: 'Allure / HTML reports', desc: 'Трендовые отчёты, screenshot on fail' },
                { tip: 'Flaky dashboard', desc: 'Отслеживать % flaky, автоматически карантинить' },
              ].map(t => (
                <div key={t.tip} style={{ padding: 10, background: 'var(--bg)', borderRadius: 8 }}>
                  <div style={{ fontWeight: 600, marginBottom: 2 }}>{t.tip}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{t.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Interview ── */}
      <section className="card">
        <h2>❓ Вопросы на собесе</h2>
        <div className="interview-item"><div className="q">Как вы организуете архитектуру тест-автоматизации?</div><div className="a">5 слоёв: Driver (Playwright/Selenium), Page Objects (селекторы + действия), Steps (бизнес-операции), Tests (arrange-act-assert), CI Runner (параллелизация, отчёты). Page Object Pattern инкапсулирует селекторы, Step Layer обеспечивает читаемость и reuse.</div></div>
        <div className="interview-item"><div className="q">Как боретесь с flaky-тестами?</div><div className="a">Диагностика: timing → explicit waits, shared state → изоляция данных, селекторы → data-testid, env → Docker. CI: quarantine + SLA ≤2% flaky. Flaky dashboard с трендами. Не auto-retry без root cause анализа — это маскирует проблему.</div></div>
        <div className="interview-item"><div className="q">Какую стратегию селекторов используете?</div><div className="a">Приоритет: data-testid (стабильный, фронтенд добавляет) → getByRole (a11y бонус) → getByText (user-facing). Избегаем CSS-классов (меняются при рефакторинге) и XPath (хрупкий). Договариваемся с фронтендом о стандарте data-testid.</div></div>
      </section>
    </div>
  )
}
