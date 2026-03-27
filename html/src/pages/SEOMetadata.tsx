import { useState } from 'react'

type Tab = 'technical' | 'social' | 'structured' | 'mistakes'

export default function SEOMetadata() {
  const [tab, setTab] = useState<Tab>('technical')

  return (
    <div className="demo-container">
      <h1>🔍 SEO и метаданные</h1>
      <p className="section-desc">
        Canonical, robots, hreflang, Open Graph, Twitter Cards, JSON-LD —
        когда каждый тег обязателен и типичные ошибки.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {([
          ['technical', '⚙️ Техническое SEO'],
          ['social', '📱 Social Meta'],
          ['structured', '📊 JSON-LD'],
          ['mistakes', '⚠️ Ошибки'],
        ] as [Tab, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              cursor: 'pointer', padding: '8px 16px', fontSize: '0.9rem',
              border: '1px solid var(--border)', borderRadius: 8,
              background: tab === key ? 'var(--accent-blue, #007AFF)' : 'var(--bg-secondary)',
              color: tab === key ? '#fff' : 'var(--text-primary)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'technical' && (
        <>
          <section className="card">
            <h2>🔗 canonical — борьба с дубликатами</h2>
            <p>
              Если одна страница доступна по нескольким URL (с параметрами, www/без www,
              http/https), поисковик может воспринять их как дубликаты и понизить ранжирование.
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Указываем каноничный URL -->
<link rel="canonical" href="https://example.com/products/shoes">

<!-- Без canonical, все эти URL — «разные» страницы: -->
<!-- /products/shoes -->
<!-- /products/shoes?color=red -->
<!-- /products/shoes?utm_source=google -->
<!-- /products/shoes/ (trailing slash) -->`}
            </pre>
            <div className="info-box" style={{ marginTop: 12 }}>
              <strong>💡 Когда обязателен:</strong> Всегда. Каждая страница должна иметь canonical.
              Для SPA — динамически обновлять при навигации.
            </div>
          </section>

          <section className="card">
            <h2>🤖 robots — управление индексацией</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Директива</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что делает</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Когда</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { dir: 'index, follow', what: 'Индексировать + переходить по ссылкам (по умолчанию)', when: 'Публичные страницы' },
                  { dir: 'noindex, follow', what: 'Не индексировать, но переходить по ссылкам', when: 'Страницы фильтров, пагинация, staging' },
                  { dir: 'noindex, nofollow', what: 'Полностью исключить', when: 'Admin-панели, личные кабинеты' },
                  { dir: 'nosnippet', what: 'Не показывать сниппет в выдаче', when: 'Юридические тексты (GDPR)' },
                  { dir: 'max-snippet:160', what: 'Ограничить длину сниппета', when: 'Контроль preview-текста' },
                  { dir: 'max-image-preview:large', what: 'Разрешить большие превью изображений', when: 'Медиа-контент, pinterest' },
                ].map(r => (
                  <tr key={r.dir} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><code>{r.dir}</code></td>
                    <td style={{ padding: 8 }}>{r.what}</td>
                    <td style={{ padding: 8, color: 'var(--text-secondary)' }}>{r.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem', marginTop: 12 }}>
{`<!-- В <head> -->
<meta name="robots" content="index, follow">

<!-- Для конкретного бота -->
<meta name="googlebot" content="nosnippet">

<!-- robots.txt (корень сайта) -->
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://example.com/sitemap.xml`}
            </pre>
          </section>

          <section className="card">
            <h2>🌍 hreflang — мультиязычность</h2>
            <p>
              Говорит поисковику, что одна страница существует на нескольких языках.
              Без hreflang Google может показать русскую страницу немецкому пользователю.
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Мультиязычные альтернативы -->
<link rel="alternate" hreflang="ru"
      href="https://example.com/ru/about">
<link rel="alternate" hreflang="en"
      href="https://example.com/en/about">
<link rel="alternate" hreflang="de"
      href="https://example.com/de/about">
<!-- Fallback для остальных языков -->
<link rel="alternate" hreflang="x-default"
      href="https://example.com/en/about">

<!-- Правила:
  - Каждая языковая страница ссылается на ВСЕ версии
  - x-default — страница для нераспознанных языков
  - Формат: lang или lang-region (en, en-US, pt-BR)
  - canonical + hreflang — не конфликтуют -->`}
            </pre>
          </section>

          <section className="card">
            <h2>📋 Обязательные meta-теги</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<head>
  <meta charset="utf-8">
  <meta name="viewport"
        content="width=device-width, initial-scale=1">
  <title>Обувь Nike Air Max — купить в Москве | Shop</title>
  <meta name="description"
        content="Купить Nike Air Max 90 по цене от 9990₽.
                 Доставка по России. 1500+ отзывов.">
  <link rel="canonical"
        href="https://shop.com/nike-air-max">
  <meta name="robots" content="index, follow">
</head>

<!-- title: 50-60 символов, keyword + brand -->
<!-- description: 120-160 символов, CTA -->`}
            </pre>
          </section>
        </>
      )}

      {tab === 'social' && (
        <>
          <section className="card">
            <h2>📱 Open Graph — превью в соцсетях</h2>
            <p>
              OG-теги определяют, как страница выглядит при шеринге в Facebook, Telegram,
              LinkedIn, Slack, WhatsApp. Без них — будет случайный текст и кривое изображение.
            </p>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Минимальный набор OG -->
<meta property="og:title" content="Nike Air Max 90">
<meta property="og:description"
      content="Лимитированная серия. Доставка от 1 дня.">
<meta property="og:image"
      content="https://shop.com/images/og-nike.jpg">
<meta property="og:url"
      content="https://shop.com/nike-air-max">
<meta property="og:type" content="product">
<meta property="og:site_name" content="Shop.com">
<meta property="og:locale" content="ru_RU">

<!-- og:image — рекомендации:
  - Размер: 1200×630px (Facebook/Telegram)
  - Формат: JPG или PNG
  - Размер файла: < 1MB
  - Текст не более 20% площади -->`}
            </pre>
          </section>

          <section className="card">
            <h2>🐦 Twitter Cards</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<!-- Summary Card (маленькая картинка слева) -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Nike Air Max 90">
<meta name="twitter:description" content="Лимитированная серия">
<meta name="twitter:image" content="https://shop.com/og.jpg">
<meta name="twitter:site" content="@shopcom">

<!-- Summary Large Image (большая картинка сверху) -->
<meta name="twitter:card" content="summary_large_image">

<!-- Типы карточек:
  summary           — маленькая картинка + текст
  summary_large_image — большая картинка + текст
  player            — видео/аудио-плеер
  app               — превью мобильного приложения -->`}
            </pre>
          </section>

          <section className="card">
            <h2>📊 OG-теги по типам страниц</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Тип страницы</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>og:type</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Дополнительные теги</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { page: 'Главная / лендинг', type: 'website', extra: 'og:locale, og:site_name' },
                  { page: 'Статья / блог', type: 'article', extra: 'article:published_time, article:author, article:section' },
                  { page: 'Товар', type: 'product', extra: 'product:price:amount, product:price:currency' },
                  { page: 'Видео', type: 'video.other', extra: 'og:video, og:video:width, og:video:height' },
                  { page: 'Профиль', type: 'profile', extra: 'profile:first_name, profile:last_name' },
                ].map(r => (
                  <tr key={r.page} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.page}</strong></td>
                    <td style={{ padding: 8 }}><code>{r.type}</code></td>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.extra}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'structured' && (
        <>
          <section className="card">
            <h2>📊 JSON-LD — структурированные данные</h2>
            <p>
              JSON-LD помогает поисковикам понять контент страницы. Результат — rich snippets
              в выдаче: звёзды, цена, FAQ, breadcrumbs, логотип.
            </p>
            <div className="info-box" style={{ marginTop: 8 }}>
              <strong>💡 Формат:</strong> Google рекомендует JSON-LD (не Microdata и не RDFa).
              Вставляется в <code>&lt;script type="application/ld+json"&gt;</code>.
            </div>
          </section>

          <section className="card">
            <h2>🏢 Organization</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Shop.com",
  "url": "https://shop.com",
  "logo": "https://shop.com/logo.png",
  "sameAs": [
    "https://t.me/shopcom",
    "https://vk.com/shopcom"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-800-555-35-35",
    "contactType": "customer service"
  }
}
</script>`}
            </pre>
          </section>

          <section className="card">
            <h2>📝 Article</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Как выбрать кроссовки для бега",
  "author": {
    "@type": "Person",
    "name": "Иван Петров"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-03-20",
  "image": "https://shop.com/blog/shoes-guide.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "Shop.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://shop.com/logo.png"
    }
  }
}
</script>`}
            </pre>
          </section>

          <section className="card">
            <h2>❓ FAQ — часто задаваемые вопросы</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько стоит доставка?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Бесплатно при заказе от 3000₽."
      }
    },
    {
      "@type": "Question",
      "name": "Можно ли вернуть товар?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, в течение 14 дней."
      }
    }
  ]
}
</script>
<!-- В выдаче: раскрывающиеся вопросы под сниппетом -->`}
            </pre>
          </section>

          <section className="card">
            <h2>🧭 BreadcrumbList</h2>
            <pre style={{ background: 'var(--bg-secondary)', padding: 16, borderRadius: 8, overflow: 'auto', fontSize: '0.85rem' }}>
{`<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1,
      "name": "Главная",
      "item": "https://shop.com" },
    { "@type": "ListItem", "position": 2,
      "name": "Кроссовки",
      "item": "https://shop.com/sneakers" },
    { "@type": "ListItem", "position": 3,
      "name": "Nike Air Max 90" }
  ]
}
</script>
<!-- В выдаче: Главная > Кроссовки > Nike Air Max 90 -->`}
            </pre>
          </section>

          <section className="card">
            <h2>📋 Типы JSON-LD для разных сайтов</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Тип сайта</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Обязательные schema</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Rich snippet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { site: 'Интернет-магазин', schemas: 'Product, BreadcrumbList, Organization', snippet: 'Цена, наличие, рейтинг' },
                  { site: 'Блог / Медиа', schemas: 'Article, BreadcrumbList, FAQPage', snippet: 'Автор, дата, FAQ' },
                  { site: 'Локальный бизнес', schemas: 'LocalBusiness, OpeningHoursSpecification', snippet: 'Адрес, часы работы, отзывы' },
                  { site: 'SaaS', schemas: 'SoftwareApplication, FAQPage, Organization', snippet: 'Рейтинг, цена, FAQ' },
                  { site: 'Рецепты', schemas: 'Recipe', snippet: 'Время, калории, фото' },
                  { site: 'Events', schemas: 'Event', snippet: 'Дата, место, цена билета' },
                ].map(r => (
                  <tr key={r.site} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.site}</strong></td>
                    <td style={{ padding: 8, fontFamily: 'monospace', fontSize: '0.85rem' }}>{r.schemas}</td>
                    <td style={{ padding: 8 }}>{r.snippet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}

      {tab === 'mistakes' && (
        <>
          <section className="card">
            <h2>⚠️ Типичные SEO-ошибки в HTML</h2>
          </section>

          {[
            { err: 'Нет canonical', impact: 'Дублирование страниц → каннибализация ранжирования', fix: 'Добавить <link rel="canonical"> на каждую страницу. Для SPA — обновлять динамически' },
            { err: 'title = description', impact: 'Дублирование → Google игнорирует, генерирует свой сниппет', fix: 'title: 50-60 символов, keyword + brand. description: 120-160, CTA + value proposition' },
            { err: 'OG-картинка не та', impact: 'В Telegram/WhatsApp — битое превью', fix: 'og:image всегда абсолютный URL, 1200×630, < 1MB. Проверять через Facebook Debugger' },
            { err: 'noindex на продакшене', impact: 'Страницы пропадают из поиска', fix: 'CI/CD проверка: staging = noindex, production = index. Lint meta-теги в pipeline' },
            { err: 'hreflang без x-default', impact: 'Непокрытые языки → случайная версия в выдаче', fix: 'Всегда добавлять x-default. Каждая версия ссылается на все остальные' },
            { err: 'JSON-LD с ошибками', impact: 'Rich snippet не появляется, warning в Search Console', fix: 'Валидировать через Rich Results Test (search.google.com/test/rich-results)' },
            { err: 'SPA не рендерит meta на сервере', impact: 'Боты видят пустой <head> → не индексируют', fix: 'SSR/SSG для публичных страниц. Или prerender.io / rendertron' },
            { err: 'Отсутствие sitemap.xml', impact: 'Новые страницы индексируются медленнее', fix: 'Автогенерация sitemap + отправка в Search Console. Обновлять при деплое' },
          ].map((m, i) => (
            <section key={i} className="card">
              <h3>🔴 {m.err}</h3>
              <p style={{ color: 'var(--text-secondary)', margin: '4px 0 8px' }}>
                <strong>Последствие:</strong> {m.impact}
              </p>
              <div className="info-box">
                <strong>✅ Решение:</strong> {m.fix}
              </div>
            </section>
          ))}

          <section className="card">
            <h2>🛠 Инструменты проверки</h2>
            <table className="comparison-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)' }}>
                  <th style={{ textAlign: 'left', padding: 8 }}>Инструмент</th>
                  <th style={{ textAlign: 'left', padding: 8 }}>Что проверяет</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: 'Google Rich Results Test', check: 'JSON-LD валидность + preview сниппета' },
                  { tool: 'Facebook Sharing Debugger', check: 'OG-теги + очистка кеша превью' },
                  { tool: 'Twitter Card Validator', check: 'Twitter Cards preview' },
                  { tool: 'Google Search Console', check: 'Индексация, ошибки, sitemap' },
                  { tool: 'Lighthouse SEO audit', check: 'Meta-теги, a11y, performance' },
                  { tool: 'Screaming Frog / Ahrefs', check: 'Массовый аудит canonical, hreflang, дублей' },
                ].map(r => (
                  <tr key={r.tool} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: 8 }}><strong>{r.tool}</strong></td>
                    <td style={{ padding: 8 }}>{r.check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  )
}
