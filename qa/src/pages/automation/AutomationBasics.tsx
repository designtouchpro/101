import { useState } from 'react'

const automateDecision = [
  { factor: 'Частота запуска', automate: 'Запускается часто (regression)', manual: 'Разовая проверка' },
  { factor: 'Стабильность', automate: 'Функционал стабилен', manual: 'Часто меняющийся UI' },
  { factor: 'Данные', automate: 'Много комбинаций данных', manual: 'Субъективная оценка (UX)' },
  { factor: 'Время', automate: 'Долгий ручной прогон', manual: 'Быстрая проверка (5 мин)' },
  { factor: 'Критичность', automate: 'Критичный бизнес-сценарий', manual: 'Exploratory testing' },
  { factor: 'Окружение', automate: 'Кросс-браузер/устройства', manual: 'Accessibility, UX review' },
]

const tools = [
  {
    category: 'UI / E2E',
    items: [
      { name: 'Playwright', icon: '🎭', lang: 'JS/TS/Python/C#', stars: 5, desc: 'Лучший выбор для новых проектов. Быстрый, надёжный.' },
      { name: 'Cypress', icon: '🌲', lang: 'JS/TS', stars: 4, desc: 'Отличный DX, но только Chromium-based.' },
      { name: 'Selenium', icon: '🔷', lang: 'Java/Python/C#/JS', stars: 3, desc: 'Классика. Много legacy проектов.' },
    ],
  },
  {
    category: 'API',
    items: [
      { name: 'Postman', icon: '📮', lang: 'GUI + JS', stars: 4, desc: 'GUI для ручного и автотестирования API.' },
      { name: 'REST Assured', icon: '☕', lang: 'Java', stars: 4, desc: 'Стандарт для Java API тестов.' },
      { name: 'Supertest', icon: '⚡', lang: 'JS/TS', stars: 4, desc: 'Для Node.js проектов. Легковесный.' },
    ],
  },
  {
    category: 'Unit',
    items: [
      { name: 'Jest', icon: '🃏', lang: 'JS/TS', stars: 5, desc: 'Стандарт для JavaScript. Всё в одном.' },
      { name: 'Vitest', icon: '⚡', lang: 'JS/TS', stars: 5, desc: 'Быстрый, совместим с Vite. Будущее.' },
      { name: 'JUnit', icon: '☕', lang: 'Java', stars: 5, desc: 'Стандарт для Java.' },
      { name: 'pytest', icon: '🐍', lang: 'Python', stars: 5, desc: 'Стандарт для Python. Простой и мощный.' },
    ],
  },
  {
    category: 'Performance',
    items: [
      { name: 'k6', icon: '📊', lang: 'JS', stars: 5, desc: 'Скриптовый, для dev-команд.' },
      { name: 'JMeter', icon: '🔨', lang: 'GUI + Java', stars: 3, desc: 'GUI, enterprise. Тяжёлый.' },
      { name: 'Locust', icon: '🦗', lang: 'Python', stars: 4, desc: 'Простой, код-first подход.' },
    ],
  },
]

const codeExamples = [
  {
    tool: 'Playwright',
    code: `import { test, expect } from '@playwright/test';

test('login flow', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'user@test.com');
  await page.fill('[name="password"]', 'secret');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
  await expect(page.locator('h1')).toHaveText('Welcome');
});`,
  },
  {
    tool: 'Jest / Vitest',
    code: `import { describe, it, expect } from 'vitest';
import { calculateDiscount } from './pricing';

describe('calculateDiscount', () => {
  it('applies 10% for orders > 1000', () => {
    expect(calculateDiscount(1500)).toBe(150);
  });

  it('returns 0 for small orders', () => {
    expect(calculateDiscount(500)).toBe(0);
  });

  it('throws for negative amounts', () => {
    expect(() => calculateDiscount(-100)).toThrow();
  });
});`,
  },
]

export default function AutomationBasics() {
  const [tab, setTab] = useState<'decision' | 'tools' | 'code'>('decision')
  const [selectedTool, setSelectedTool] = useState(0)

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>🤖 Основы автоматизации</h1>
        <p>Когда автоматизировать, какие инструменты выбрать и примеры кода.</p>
      </div>

      <div className="card" style={{ borderLeft: '4px solid var(--accent-main)' }}>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          <strong>Автоматизация тестирования</strong> — это написание программного кода, который проверяет другой программный код. 
          Вместо того чтобы вручную кликать по UI и проверять результат, тестировщик пишет скрипт, 
          который делает это за секунды и может повторяться бесконечно. Но автоматизация — не серебряная пуля: 
          она требует времени на создание и поддержку, и не всё стоит автоматизировать.
        </p>
        <p style={{ fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 12 }}>
          Правило ROI: автоматизируйте то, что запускается часто (регрессия), стабильно (не меняется каждую неделю) 
          и критично (smoke-тесты, основные сценарии). Exploratory testing, UX-проверки и новый функционал 
          с нестабильным UI — лучше тестировать вручную. Популярные инструменты: <strong>Playwright</strong> и <strong>Cypress</strong> для Web, <strong>Appium</strong> для мобильных, <strong>Jest</strong> для unit-тестов.
        </p>
        <div className="info-box">
          <div className="info-box-content">
            <strong>⚠️ Анти-паттерн</strong>: «Давайте автоматизируем все тест-кейсы!» — классическая ошибка. 
            80% тестов, которые автоматизируют «на всякий случай», ломаются из-за изменений UI и никогда не находят багов. 
            Начните с 20% критических сценариев, которые дают 80% покрытия рисков.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {([['decision', '🤔 Автоматизировать?'], ['tools', '🔧 Инструменты'], ['code', '💻 Примеры кода']] as const).map(([k, l]) => (
          <button key={k} className={`btn ${tab === k ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {tab === 'decision' && (
        <div className="card">
          <h3>🤔 Автоматизировать или нет?</h3>
          <table className="data-table">
            <thead>
              <tr><th>Фактор</th><th style={{ color: '#22c55e' }}>✅ Автоматизировать</th><th style={{ color: '#ef4444' }}>❌ Вручную</th></tr>
            </thead>
            <tbody>
              {automateDecision.map(d => (
                <tr key={d.factor}>
                  <td><strong>{d.factor}</strong></td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.automate}</td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.manual}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="info-box" style={{ marginTop: 16 }}>
            <div className="info-box-content">
              <div className="info-box-title">💡 ROI автоматизации</div>
              <div style={{ fontSize: '0.8rem' }}>
                <strong>Формула:</strong> ROI = (Время ручного прогона × Количество запусков - Время создания и поддержки) / Время создания и поддержки<br />
                Автотест окупается обычно после 5-10 запусков.
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'tools' && (
        <div className="card">
          <h3>🔧 Инструменты автоматизации</h3>
          {tools.map(cat => (
            <div key={cat.category} style={{ marginBottom: 20 }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: 8, color: 'var(--accent-main)' }}>{cat.category}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cat.items.map(t => (
                  <div key={t.name} style={{
                    padding: '12px 16px', borderRadius: 8, background: 'var(--bg-code)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8,
                  }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{t.icon} {t.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{t.desc}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{t.lang}</div>
                      <div>{'⭐'.repeat(t.stars)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'code' && (
        <div className="card">
          <h3>💻 Примеры кода</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {codeExamples.map((ex, i) => (
              <button key={ex.tool} className={`btn ${selectedTool === i ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedTool(i)}>{ex.tool}</button>
            ))}
          </div>
          <pre style={{
            padding: 16, borderRadius: 8, background: 'var(--bg-code)',
            overflow: 'auto', fontSize: '0.8rem', lineHeight: 1.6,
            border: '1px solid var(--border-color)',
          }}>
            {codeExamples[selectedTool]!.code}
          </pre>
        </div>
      )}
    </div>
  )
}
