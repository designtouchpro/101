import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page-home">
      {/* Hero Section */}
      <section
        className="home-hero"
        style={{
          textAlign: 'center',
          padding: '4rem 2rem 3rem',
          background: 'linear-gradient(135deg, rgba(255,149,0,0.08) 0%, rgba(255,59,48,0.08) 50%, rgba(175,82,222,0.08) 100%)',
          borderRadius: '1.5rem',
          marginBottom: '3rem',
          border: '1px solid var(--border-color)',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>🐦‍🔥</div>
        <h1
          style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #FF9500, #FF3B30, #AF52DE)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
          }}
        >
          Swift 101
        </h1>
        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}
        >
          Изучаем Swift с точки зрения JS/TS-разработчика.
          <br />
          Всё, что нужно знать для перехода в iOS-разработку — от базовых типов до async/await и управления памятью.
        </p>
        <div
          style={{
            display: 'inline-flex',
            gap: '0.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Swift 5.9+', 'Xcode', 'iOS / macOS', 'SwiftUI-ready'].map((tag) => (
            <span
              key={tag}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: 'var(--bg-card)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Swift vs JavaScript Comparison */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}
        >
          ⚡ Swift vs JavaScript — краткое сравнение
        </h2>

        <div
          style={{
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            background: 'var(--bg-card)',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              padding: '0.85rem 1.25rem',
              fontWeight: 700,
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--text-secondary)',
              borderBottom: '2px solid var(--border-color)',
              background: 'linear-gradient(135deg, rgba(255,149,0,0.05), rgba(175,82,222,0.05))',
            }}
          >
            <div>Концепция</div>
            <div style={{ textAlign: 'center' }}>🐦‍🔥 Swift</div>
            <div style={{ textAlign: 'center' }}>💛 JavaScript / TS</div>
          </div>

          {/* Table Rows */}
          {([
            ['Переменные', 'let (const) / var (mut)', 'const / let'],
            ['Типизация', 'Строгая + вывод типов', 'Динамическая / TS'],
            ['Null-безопасность', 'Optionals (Int?)', 'undefined / null'],
            ['Строки', 'Интерполяция \\(expr)', 'Шаблонные литералы ${expr}'],
            ['Функции', 'func keyword', 'function / arrow =>'],
            ['Обработка ошибок', 'do / try / catch + throws', 'try / catch'],
            ['Конкурентность', 'async/await + actors', 'async/await + Promises'],
            ['Память', 'ARC (ручное управление)', 'Garbage Collector'],
            ['ООП', 'Протоколы + расширения', 'Прототипы / классы'],
            ['Коллекции', 'Array, Set, Dictionary', 'Array, Set, Map'],
          ] as const).map(([concept, swift, js], i) => (
            <div
              key={concept}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '0.75rem 1.25rem',
                fontSize: '0.9rem',
                borderBottom: i < 9 ? '1px solid var(--border-color)' : 'none',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,149,0,0.04)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{concept}</div>
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--accent-blue)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                }}
              >
                {swift}
              </div>
              <div
                style={{
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                }}
              >
                {js}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section style={{ marginBottom: '3rem' }}>
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}
        >
          📚 Разделы курса
        </h2>

        <div
          className="feature-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {([
            {
              to: '/basics',
              emoji: '🔤',
              title: 'Основы языка',
              desc: 'Типы данных, let/var, строковая интерполяция, базовые операторы',
            },
            {
              to: '/control-flow',
              emoji: '🔀',
              title: 'Управление потоком',
              desc: 'if/else, guard, switch с pattern matching, циклы for-in',
            },
            {
              to: '/functions',
              emoji: '⚙️',
              title: 'Функции',
              desc: 'Именованные параметры, значения по умолчанию, inout, variadic',
            },
            {
              to: '/closures',
              emoji: '🔗',
              title: 'Замыкания',
              desc: 'Trailing closures, capture lists, @escaping, автозамыкания',
            },
            {
              to: '/optionals',
              emoji: '❓',
              title: 'Опционалы',
              desc: 'Optional, if let, guard let, optional chaining, nil coalescing',
            },
            {
              to: '/enums',
              emoji: '🏷️',
              title: 'Перечисления',
              desc: 'Associated values, raw values, CaseIterable, pattern matching',
            },
            {
              to: '/collections',
              emoji: '📦',
              title: 'Коллекции',
              desc: 'Array, Set, Dictionary, map/filter/reduce, lazy sequences',
            },
            {
              to: '/structs-classes',
              emoji: '🏗️',
              title: 'Структуры и классы',
              desc: 'Value vs reference types, mutating, инициализаторы, deinit',
            },
            {
              to: '/protocols',
              emoji: '📋',
              title: 'Протоколы',
              desc: 'Protocol-oriented programming, композиция, existentials',
            },
            {
              to: '/extensions',
              emoji: '🧩',
              title: 'Расширения',
              desc: 'Расширение типов, conformance, computed properties, методы',
            },
            {
              to: '/generics',
              emoji: '🧬',
              title: 'Дженерики',
              desc: 'Generic-функции, where-ограничения, associated types, opaque types',
            },
            {
              to: '/error-handling',
              emoji: '🛡️',
              title: 'Обработка ошибок',
              desc: 'do/try/catch, throws, Result<T, E>, кастомные ошибки',
            },
            {
              to: '/concurrency',
              emoji: '⚡',
              title: 'Конкурентность',
              desc: 'async/await, actors, Task, TaskGroup, structured concurrency',
            },
            {
              to: '/memory',
              emoji: '🧠',
              title: 'Управление памятью',
              desc: 'ARC, weak/unowned ссылки, retain cycles, closure captures',
            },
          ] as const).map(({ to, emoji, title, desc }) => (
            <Link
              key={to}
              to={to}
              className="feature-card"
              style={{
                display: 'block',
                padding: '1.25rem',
                borderRadius: '1rem',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                textDecoration: 'none',
                transition: 'transform 0.15s, box-shadow 0.15s, border-color 0.15s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'
                e.currentTarget.style.borderColor = 'var(--accent-blue)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'var(--border-color)'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{emoji}</div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.35rem',
                }}
              >
                {title}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {desc}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Start */}
      <section style={{ marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '1.25rem',
            textAlign: 'center',
          }}
        >
          🚀 Быстрый старт
        </h2>

        <div
          style={{
            borderRadius: '1rem',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            background: 'var(--bg-card)',
          }}
        >
          <div
            style={{
              padding: '0.6rem 1.25rem',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              borderBottom: '1px solid var(--border-color)',
              background: 'linear-gradient(135deg, rgba(255,149,0,0.06), rgba(175,82,222,0.06))',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>🐦‍🔥</span> main.swift
          </div>
          <pre
            style={{
              margin: 0,
              padding: '1.25rem',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              overflowX: 'auto',
              color: 'var(--text-primary)',
              fontFamily: '"SF Mono", "Fira Code", "JetBrains Mono", monospace',
            }}
          >
            <code>{`// 🐦‍🔥 Привет, Swift!
import Foundation

// Константы и переменные
let language = "Swift"        // неизменяемая (как const в JS)
var version = 5.9             // изменяемая (как let в JS)

// Функция с именованными параметрами
func greet(name: String, from city: String = "Москва") -> String {
    return "Привет, \\(name) из \\(city)! 👋"
}

// Опционалы — безопасная работа с nil
let nickname: String? = "swiftDev"
if let name = nickname {
    print(greet(name: name))
}

// Структура (value type — как объект, но копируется)
struct Developer {
    let name: String
    var skills: [String]
    
    mutating func learn(_ skill: String) {
        skills.append(skill)
    }
}

var dev = Developer(name: "Алекс", skills: ["TypeScript", "React"])
dev.learn("Swift")
dev.learn("SwiftUI")

print("\\(dev.name) знает: \\(dev.skills.joined(separator: ", "))")
// → Алекс знает: TypeScript, React, Swift, SwiftUI`}</code>
          </pre>
        </div>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.5rem',
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
          }}
        >
          Готов начать? Переходи к{' '}
          <Link
            to="/basics"
            style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            Основам языка →
          </Link>
        </p>
      </section>
    </div>
  )
}
