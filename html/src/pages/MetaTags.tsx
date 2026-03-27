import { useState } from 'react'

export default function MetaTags() {
  const [activeTab, setActiveTab] = useState<'basic' | 'og' | 'twitter' | 'pwa' | 'security'>('basic')

  const tabs = [
    { id: 'basic', label: '📄 Basic' },
    { id: 'og', label: '📘 Open Graph' },
    { id: 'twitter', label: '🐦 Twitter' },
    { id: 'pwa', label: '📱 PWA' },
    { id: 'security', label: '🔒 Security' },
  ]

  return (
    <div className="page-container">
      <h1>🔖 Meta теги</h1>
      <p className="page-description">
        Метаданные страницы: SEO, социальные сети, PWA, безопасность.
        Правильные meta теги критичны для индексации и шаринга.
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'basic' && (
        <>
          <div className="card">
            <h2>📄 Базовые Meta теги</h2>
            
            <div className="code-block">
              <pre>{`<!DOCTYPE html>
<html lang="ru">
<head>
  <!-- Кодировка — ВСЕГДА первым в head! -->
  <meta charset="UTF-8">
  
  <!-- Viewport для мобильных -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Заголовок страницы (50-60 символов) -->
  <title>Название страницы | Бренд</title>
  
  <!-- Описание для поисковиков (150-160 символов) -->
  <meta name="description" content="Краткое описание страницы для результатов поиска">
  
  <!-- Ключевые слова (игнорируются Google, но не всеми) -->
  <meta name="keywords" content="ключевое, слово, теги">
  
  <!-- Автор -->
  <meta name="author" content="Имя автора">
  
  <!-- Robots директивы -->
  <meta name="robots" content="index, follow">
  
  <!-- Canonical URL (избегаем дублей) -->
  <link rel="canonical" href="https://example.com/page">
</head>`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🤖 Robots директивы</h2>
            
            <div className="grid-2">
              {[
                { dir: 'index', desc: 'Индексировать страницу' },
                { dir: 'noindex', desc: 'НЕ индексировать' },
                { dir: 'follow', desc: 'Переходить по ссылкам' },
                { dir: 'nofollow', desc: 'НЕ переходить по ссылкам' },
                { dir: 'noarchive', desc: 'Не сохранять кеш' },
                { dir: 'nosnippet', desc: 'Не показывать сниппет' },
                { dir: 'max-snippet:50', desc: 'Макс. длина сниппета' },
                { dir: 'max-image-preview:large', desc: 'Размер превью изображения' },
              ].map(item => (
                <div key={item.dir} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <code>{item.dir}</code>
                  <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="code-block" style={{ marginTop: '16px' }}>
              <pre>{`<!-- Не индексировать, не следовать ссылкам -->
<meta name="robots" content="noindex, nofollow">

<!-- Только для Google -->
<meta name="googlebot" content="noindex">

<!-- Не показывать в Google Discover -->
<meta name="googlebot-news" content="nosnippet">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>📱 Viewport настройки</h2>
            
            <div className="code-block">
              <pre>{`<!-- Стандартный viewport -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- С ограничением зума (не рекомендуется для accessibility) -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

<!-- Viewport-fit для notch на iPhone -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">

<!-- Используй CSS для safe area -->
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);`}</pre>
            </div>
          </div>
        </>
      )}

      {activeTab === 'og' && (
        <>
          <div className="card">
            <h2>📘 Open Graph Protocol</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Контролирует как страница выглядит при шаринге в Facebook, LinkedIn, Telegram, Discord и др.
            </p>
            
            <div className="code-block">
              <pre>{`<!-- Базовые OG теги -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page">
<meta property="og:title" content="Заголовок для шаринга">
<meta property="og:description" content="Описание при шаринге (2-4 предложения)">
<meta property="og:image" content="https://example.com/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Описание изображения">
<meta property="og:locale" content="ru_RU">
<meta property="og:site_name" content="Название сайта">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>📝 OG для статей</h2>
            
            <div className="code-block">
              <pre>{`<meta property="og:type" content="article">
<meta property="article:published_time" content="2024-01-15T08:00:00+00:00">
<meta property="article:modified_time" content="2024-01-20T10:30:00+00:00">
<meta property="article:author" content="https://facebook.com/author">
<meta property="article:section" content="Technology">
<meta property="article:tag" content="JavaScript">
<meta property="article:tag" content="Web Development">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🖼️ Размеры OG изображений</h2>
            
            <div className="grid-3">
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ 
                  width: '120px', 
                  height: '63px', 
                  background: 'var(--accent-muted)', 
                  borderRadius: '4px',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7em',
                  color: 'var(--accent)'
                }}>1200×630</div>
                <strong>Рекомендуемый</strong>
                <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>1.91:1 ratio</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ 
                  width: '100px', 
                  height: '100px', 
                  background: 'var(--bg-hover)', 
                  borderRadius: '4px',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7em',
                  color: 'var(--text-secondary)'
                }}>1200×1200</div>
                <strong>Квадрат</strong>
                <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>Для некоторых платформ</p>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'var(--bg-hover)', 
                  borderRadius: '4px',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.6em',
                  color: 'var(--text-secondary)'
                }}>min</div>
                <strong>Минимум</strong>
                <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>200×200</p>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'twitter' && (
        <>
          <div className="card">
            <h2>🐦 Twitter Cards</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Специальные теги для красивого отображения в Twitter/X:
            </p>
            
            <div className="code-block">
              <pre>{`<!-- Summary Card (маленькая картинка слева) -->
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="Заголовок">
<meta name="twitter:description" content="Описание">
<meta name="twitter:image" content="https://example.com/image.jpg">

<!-- Summary with Large Image (большая картинка сверху) -->
<meta name="twitter:card" content="summary_large_image">

<!-- Player Card (для видео) -->
<meta name="twitter:card" content="player">
<meta name="twitter:player" content="https://example.com/player.html">
<meta name="twitter:player:width" content="480">
<meta name="twitter:player:height" content="480">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🔄 Twitter + Open Graph</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Twitter использует OG теги как fallback. Минимальный набор:
            </p>
            
            <div className="code-block">
              <pre>{`<!-- Достаточно для большинства случаев -->
<meta name="twitter:card" content="summary_large_image">
<meta property="og:title" content="Заголовок">
<meta property="og:description" content="Описание">
<meta property="og:image" content="https://example.com/og.jpg">

<!-- twitter:title, twitter:description, twitter:image 
     будут взяты из og:* тегов автоматически -->`}</pre>
            </div>
          </div>
        </>
      )}

      {activeTab === 'pwa' && (
        <>
          <div className="card">
            <h2>📱 PWA Meta теги</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              Теги для Progressive Web Apps и добавления на домашний экран:
            </p>
            
            <div className="code-block">
              <pre>{`<!-- Web App Manifest -->
<link rel="manifest" href="/manifest.json">

<!-- Theme color (цвет адресной строки на Android) -->
<meta name="theme-color" content="#f97316">
<meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)">

<!-- iOS Safari специфичные -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="App Name">

<!-- iOS иконки -->
<link rel="apple-touch-icon" href="/icons/icon-180.png">
<link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png">
<link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">

<!-- Splash screen для iOS -->
<link rel="apple-touch-startup-image" href="/splash.png">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🎨 Theme Color варианты</h2>
            
            <div className="code-block">
              <pre>{`<!-- Один цвет -->
<meta name="theme-color" content="#6366f1">

<!-- Разный для light/dark mode -->
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)">

<!-- Динамически через JavaScript -->
document.querySelector('meta[name="theme-color"]')
  .setAttribute('content', '#ff0000');`}</pre>
            </div>

            <div className="demo-area" style={{ marginTop: '16px' }}>
              <p style={{ marginBottom: '12px' }}>Попробуй изменить theme-color:</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['#f97316', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#0a0a0f'].map(color => (
                  <button
                    key={color}
                    onClick={() => {
                      const meta = document.querySelector('meta[name="theme-color"]')
                      if (meta) meta.setAttribute('content', color)
                    }}
                    style={{
                      width: '40px',
                      height: '40px',
                      background: color,
                      border: '2px solid var(--border)',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <h2>📋 manifest.json пример</h2>
            
            <div className="code-block">
              <pre>{`{
  "name": "My App",
  "short_name": "App",
  "description": "Описание приложения",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#f97316",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}`}</pre>
            </div>
          </div>
        </>
      )}

      {activeTab === 'security' && (
        <>
          <div className="card">
            <h2>🔒 Security Meta теги</h2>
            
            <div className="code-block">
              <pre>{`<!-- Content Security Policy -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">

<!-- Запретить кеширование (для sensitive pages) -->
<meta http-equiv="Cache-Control" content="no-store">
<meta http-equiv="Pragma" content="no-cache">

<!-- Принудительный HTTPS -->
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">

<!-- Referrer Policy -->
<meta name="referrer" content="strict-origin-when-cross-origin">

<!-- X-UA-Compatible (для старых IE) -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">`}</pre>
            </div>
          </div>

          <div className="card">
            <h2>🛡️ Content Security Policy (CSP)</h2>
            <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
              CSP защищает от XSS атак, определяя откуда можно загружать ресурсы:
            </p>

            <div className="grid-2">
              {[
                { dir: "default-src 'self'", desc: 'Только с текущего домена' },
                { dir: "script-src 'self' cdn.com", desc: 'Скрипты с self и cdn' },
                { dir: "style-src 'unsafe-inline'", desc: 'Разрешить inline стили' },
                { dir: "img-src * data:", desc: 'Изображения отовсюду и data:' },
                { dir: "connect-src api.com", desc: 'Fetch/XHR только к api.com' },
                { dir: "frame-ancestors 'none'", desc: 'Запретить вложение в iframe' },
              ].map(item => (
                <div key={item.dir} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <code style={{ fontSize: '0.85em' }}>{item.dir}</code>
                  <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="info-box warning" style={{ marginTop: '16px' }}>
              <strong>⚠️ CSP лучше через HTTP заголовок</strong>
              <p style={{ marginTop: '8px' }}>
                Meta CSP имеет ограничения (нельзя report-uri, frame-ancestors).
                В production используй заголовок <code>Content-Security-Policy</code>
              </p>
            </div>
          </div>

          <div className="card">
            <h2>🔗 Referrer Policy</h2>
            
            <div className="grid-2">
              {[
                { policy: 'no-referrer', desc: 'Никогда не отправлять referrer' },
                { policy: 'origin', desc: 'Только origin (без path)' },
                { policy: 'same-origin', desc: 'Referrer только для same-origin' },
                { policy: 'strict-origin', desc: 'Origin только для HTTPS→HTTPS' },
                { policy: 'strict-origin-when-cross-origin', desc: 'Рекомендуемый по умолчанию' },
                { policy: 'unsafe-url', desc: 'Полный URL (небезопасно!)' },
              ].map(item => (
                <div key={item.policy} style={{ padding: '12px', background: 'var(--bg-tertiary)', borderRadius: '8px' }}>
                  <code>{item.policy}</code>
                  <p style={{ fontSize: '0.85em', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
