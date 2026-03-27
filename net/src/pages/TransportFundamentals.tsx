import { useState } from 'react'

const tabs = ['DNS & IP', 'TLS / HTTPS', 'HTTP/2 и HTTP/3', 'Путь запроса'] as const
type Tab = typeof tabs[number]

export default function TransportFundamentals() {
  const [activeTab, setActiveTab] = useState<Tab>('DNS & IP')

  return (
    <div className="page">
      <h1>🌐 Транспортный уровень и протоколы</h1>
      <p className="page-description">
        Фундамент сетевого взаимодействия — от DNS-резолвинга и TCP-соединения до HTTP/3 и QUIC.
        Понимание транспортного уровня помогает диагностировать проблемы с задержкой, безопасностью и производительностью.
      </p>

      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'DNS & IP' && <DNSSection />}
        {activeTab === 'TLS / HTTPS' && <TLSSection />}
        {activeTab === 'HTTP/2 и HTTP/3' && <HTTP2Section />}
        {activeTab === 'Путь запроса' && <RequestPathSection />}
      </div>

      <div className="card" style={{ marginTop: '2rem', borderLeft: '4px solid var(--accent)' }}>
        <h3>🎤 Вопросы на собеседовании</h3>
        <ol>
          <li>Что происходит при вводе URL в браузер? Опишите путь запроса от DNS до рендера.</li>
          <li>Чем HTTP/2 отличается от HTTP/1.1? А HTTP/3?</li>
          <li>Что такое TLS handshake и зачем нужен certificate chain?</li>
          <li>Как DNS кэширование влияет на время загрузки?</li>
        </ol>
      </div>
    </div>
  )
}

/* ─── DNS & IP ─── */
function DNSSection() {
  return (
    <>
      <div className="card">
        <h2>🔍 Как работает DNS</h2>
        <p>
          DNS (Domain Name System) преобразует доменное имя (например, <code>api.example.com</code>)
          в IP-адрес. Без DNS браузер не знает, куда отправлять запрос.
        </p>

        <h3>Цепочка резолвинга</h3>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Браузерный кэш → OS кэш → Router кэш
→ ISP Recursive Resolver
→ Root NS (.  ) → TLD NS (.com) → Authoritative NS (example.com)
→ A/AAAA запись → IP адрес`}</pre>
        </div>

        <h3>Типы DNS-записей</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Тип</th><th>Назначение</th><th>Пример</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>A</strong></td><td>Домен → IPv4</td><td><code>93.184.216.34</code></td></tr>
            <tr><td><strong>AAAA</strong></td><td>Домен → IPv6</td><td><code>2606:2800:220:1:...</code></td></tr>
            <tr><td><strong>CNAME</strong></td><td>Алиас на другой домен</td><td><code>www → example.com</code></td></tr>
            <tr><td><strong>MX</strong></td><td>Почтовый сервер</td><td><code>mail.example.com</code></td></tr>
            <tr><td><strong>TXT</strong></td><td>Метаданные (SPF, DKIM)</td><td><code>"v=spf1 ..."</code></td></tr>
            <tr><td><strong>NS</strong></td><td>Авторитетный сервер</td><td><code>ns1.example.com</code></td></tr>
            <tr><td><strong>SRV</strong></td><td>Сервис + порт</td><td><code>_sip._tcp 5060</code></td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>⏱️ DNS и производительность</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Оптимизация</th><th>Механизм</th><th>Когда использовать</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>dns-prefetch</strong></td>
              <td><code>&lt;link rel="dns-prefetch" href="//cdn.example.com"&gt;</code></td>
              <td>Внешние ресурсы, шрифты, аналитика</td>
            </tr>
            <tr>
              <td><strong>preconnect</strong></td>
              <td><code>&lt;link rel="preconnect" href="//api.example.com"&gt;</code></td>
              <td>Критичные API — DNS + TCP + TLS заранее</td>
            </tr>
            <tr>
              <td><strong>TTL</strong></td>
              <td>Time-to-Live в DNS-записи (секунды)</td>
              <td>Баланс: низкий TTL = быстрая миграция, высокий = меньше запросов</td>
            </tr>
          </tbody>
        </table>

        <h3>⚠️ Подводные камни</h3>
        <ul>
          <li><strong>DNS propagation</strong> — при смене NS обновление занимает до 48 ч (зависит от TTL)</li>
          <li><strong>DNS over HTTPS (DoH)</strong> — браузеры могут обходить системный DNS → корпоративные фильтры не работают</li>
          <li><strong>Round-robin DNS</strong> — простая балансировка, но нет health checks</li>
          <li><strong>Wildcard записи</strong> (<code>*.example.com</code>) — удобны, но усложняют отладку</li>
        </ul>
      </div>

      <div className="card">
        <h2>🔗 TCP vs UDP</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Свойство</th><th>TCP</th><th>UDP</th></tr>
          </thead>
          <tbody>
            <tr><td>Соединение</td><td>3-way handshake (SYN → SYN-ACK → ACK)</td><td>Без установки соединения</td></tr>
            <tr><td>Доставка</td><td>Гарантированная, упорядоченная</td><td>Best-effort, могут теряться</td></tr>
            <tr><td>Overhead</td><td>Высокий (ACK, retransmit)</td><td>Минимальный</td></tr>
            <tr><td>HTTP/1.1, HTTP/2</td><td>✅</td><td>❌</td></tr>
            <tr><td>HTTP/3 (QUIC)</td><td>❌</td><td>✅ (поверх UDP)</td></tr>
            <tr><td>Применение</td><td>Web, email, file transfer</td><td>DNS, video streaming, gaming</td></tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

/* ─── TLS / HTTPS ─── */
function TLSSection() {
  return (
    <>
      <div className="card">
        <h2>🔒 TLS Handshake</h2>
        <p>
          TLS (Transport Layer Security) шифрует трафик между клиентом и сервером.
          HTTPS = HTTP поверх TLS. Без TLS данные передаются в открытом виде.
        </p>

        <h3>TLS 1.3 Handshake (1-RTT)</h3>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Client                              Server
  │                                    │
  ├──── ClientHello ──────────────────►│  (supported ciphers, key share)
  │                                    │
  │◄──── ServerHello ─────────────────┤  (chosen cipher, key share, cert)
  │◄──── {EncryptedExtensions} ───────┤
  │◄──── {Certificate} ───────────────┤
  │◄──── {CertificateVerify} ─────────┤
  │◄──── {Finished} ──────────────────┤
  │                                    │
  ├──── {Finished} ───────────────────►│
  │                                    │
  │◄════ Encrypted Application Data ═►│  ← 1 RTT до первых данных`}</pre>
        </div>

        <h3>TLS 1.2 vs TLS 1.3</h3>
        <table className="comparison-table">
          <thead>
            <tr><th>Свойство</th><th>TLS 1.2</th><th>TLS 1.3</th></tr>
          </thead>
          <tbody>
            <tr><td>RTT до данных</td><td>2 RTT</td><td>1 RTT (0-RTT при reconnect)</td></tr>
            <tr><td>Cipher suites</td><td>~37 (включая устаревшие)</td><td>5 (только безопасные)</td></tr>
            <tr><td>Forward Secrecy</td><td>Опционально (DHE/ECDHE)</td><td>Обязательно</td></tr>
            <tr><td>RSA key exchange</td><td>✅</td><td>❌ (удалён)</td></tr>
            <tr><td>0-RTT Resumption</td><td>❌</td><td>✅ (с replay-риском)</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>📜 Certificate Chain</h2>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`Root CA (предустановлен в ОС/браузере)
  └── Intermediate CA (подписан Root CA)
       └── Leaf Certificate (ваш домен, подписан Intermediate)

Браузер проверяет цепочку снизу вверх до доверенного Root CA.`}</pre>
        </div>

        <h3>Что проверяет браузер</h3>
        <ul>
          <li><strong>Domain match</strong> — CN или SAN совпадает с запрашиваемым доменом</li>
          <li><strong>Validity period</strong> — сертификат не истёк и не начался раньше времени</li>
          <li><strong>Chain of trust</strong> — каждый сертификат подписан вышестоящим CA</li>
          <li><strong>Revocation</strong> — проверка через CRL или OCSP (OCSP Stapling для скорости)</li>
        </ul>

        <h3>⚠️ Типичные проблемы</h3>
        <ul>
          <li><strong>Mixed content</strong> — HTTPS-страница загружает HTTP-ресурсы → блокировка</li>
          <li><strong>Certificate pinning</strong> — защита от MITM, но усложняет ротацию</li>
          <li><strong>Let's Encrypt</strong> — бесплатные сертификаты, авто-renewal через ACME</li>
          <li><strong>HSTS</strong> — <code>Strict-Transport-Security</code> header → браузер всегда использует HTTPS</li>
        </ul>
      </div>
    </>
  )
}

/* ─── HTTP/2 и HTTP/3 ─── */
function HTTP2Section() {
  return (
    <>
      <div className="card">
        <h2>⚡ Эволюция HTTP</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Свойство</th><th>HTTP/1.1</th><th>HTTP/2</th><th>HTTP/3</th></tr>
          </thead>
          <tbody>
            <tr><td>Формат</td><td>Текстовый</td><td>Бинарный (фреймы)</td><td>Бинарный (QUIC)</td></tr>
            <tr><td>Транспорт</td><td>TCP</td><td>TCP</td><td>QUIC (UDP)</td></tr>
            <tr><td>Мультиплексирование</td><td>❌ (1 запрос/соединение)</td><td>✅ Streams</td><td>✅ Streams</td></tr>
            <tr><td>Head-of-line blocking</td><td>На уровне TCP</td><td>На уровне TCP</td><td>❌ Решено</td></tr>
            <tr><td>Server Push</td><td>❌</td><td>✅ (редко используется)</td><td>✅</td></tr>
            <tr><td>Сжатие заголовков</td><td>❌</td><td>HPACK</td><td>QPACK</td></tr>
            <tr><td>Handshake RTT</td><td>TCP (1) + TLS (1-2)</td><td>TCP (1) + TLS (1)</td><td>QUIC: 1 RTT (0-RTT при reconnect)</td></tr>
            <tr><td>Поддержка</td><td>Все</td><td>97%+ браузеров</td><td>~95% браузеров</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🔀 HTTP/2: мультиплексирование</h2>
        <p>Одно TCP-соединение → множество параллельных streams. Каждый stream имеет ID и приоритет.</p>
        <div className="info-box">
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`HTTP/1.1: 6 TCP-соединений → 6 параллельных запросов
           ├── conn 1: GET /style.css ─────────────────────► ОК
           ├── conn 2: GET /app.js ────────────────────────► ОК
           ├── conn 3: GET /image.png ─────────────────────► ОК
           ...

HTTP/2:    1 TCP-соединение → N параллельных streams
           ├── stream 1: GET /style.css ───► ОК
           ├── stream 3: GET /app.js ──────► ОК
           ├── stream 5: GET /image.png ───► ОК
           ├── stream 7: GET /api/data ────► ОК
           └── stream 9: GET /font.woff2 ──► ОК`}</pre>
        </div>

        <h3>Что это меняет на практике</h3>
        <ul>
          <li><strong>Не нужен domain sharding</strong> — один домен достаточно</li>
          <li><strong>Не нужна конкатенация</strong> — много маленьких файлов ≈ один большой</li>
          <li><strong>Sprite sheets </strong> менее полезны — HTTP/2 параллелит запросы</li>
          <li><strong>Приоритизация</strong> — CSS/JS можно пометить выше, чем изображения</li>
        </ul>
      </div>

      <div className="card">
        <h2>🚀 HTTP/3 и QUIC</h2>
        <p>
          QUIC — транспортный протокол поверх UDP, разработанный Google и стандартизированный IETF.
          HTTP/3 = HTTP поверх QUIC (вместо TCP).
        </p>

        <h3>Ключевые преимущества QUIC</h3>
        <ul>
          <li><strong>Нет HOL blocking</strong> — потеря пакета одного stream не блокирует остальные</li>
          <li><strong>0-RTT reconnect</strong> — при повторном подключении к серверу</li>
          <li><strong>Connection migration</strong> — смена Wi-Fi → LTE без разрыва соединения (connection ID вместо IP:port)</li>
          <li><strong>Встроенное шифрование</strong> — TLS 1.3 интегрирован в QUIC, нельзя использовать без</li>
        </ul>

        <h3>⚠️ Нюансы</h3>
        <ul>
          <li>Некоторые корпоративные сети блокируют UDP → fallback на HTTP/2</li>
          <li>Отладка сложнее — Wireshark поддерживает, но трафик зашифрован</li>
          <li>Server Push в HTTP/3 реже используется — <code>103 Early Hints</code> как альтернатива</li>
        </ul>
      </div>
    </>
  )
}

/* ─── Путь запроса ─── */
function RequestPathSection() {
  return (
    <>
      <div className="card">
        <h2>🗺️ Что происходит при вводе URL в браузер</h2>
        <p>Классический вопрос на собеседовании. Разберём по шагам:</p>

        <div className="info-box" style={{ fontSize: '0.95em' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{`1. URL Parsing
   └── Браузер разбирает scheme://host:port/path?query#fragment

2. DNS Resolution
   └── host → IP (кэш → resolver → root → TLD → authoritative)

3. TCP Connection
   └── 3-way handshake (SYN → SYN-ACK → ACK)

4. TLS Handshake (если HTTPS)
   └── ClientHello → ServerHello → Certificate → Finished

5. HTTP Request
   └── GET /path HTTP/2  +  Headers (Host, Accept, Cookie, ...)

6. Server Processing
   └── Load Balancer → App Server → DB/Cache → Response

7. HTTP Response
   └── 200 OK  +  Headers (Content-Type, Cache-Control, ...)  +  Body

8. Browser Processing
   ├── HTML Parsing → DOM
   ├── CSS Parsing → CSSOM
   ├── JS Execution (блокирует парсинг без async/defer)
   ├── Render Tree → Layout → Paint → Composite
   └── Subresource Loading (CSS, JS, images, fonts)

9. Отображение
   └── First Paint → FCP → LCP → Interactive`}</pre>
        </div>
      </div>

      <div className="card">
        <h2>⏱️ Где теряется время</h2>
        <table className="comparison-table">
          <thead>
            <tr><th>Этап</th><th>Типичная задержка</th><th>Оптимизация</th></tr>
          </thead>
          <tbody>
            <tr><td>DNS</td><td>20-120 мс</td><td>dns-prefetch, низкий TTL кэш</td></tr>
            <tr><td>TCP handshake</td><td>~1 RTT (10-100 мс)</td><td>Keep-alive, HTTP/2 (1 соединение)</td></tr>
            <tr><td>TLS handshake</td><td>1-2 RTT (20-200 мс)</td><td>TLS 1.3, 0-RTT, OCSP Stapling</td></tr>
            <tr><td>TTFB (server)</td><td>50-500 мс</td><td>CDN, edge computing, caching</td></tr>
            <tr><td>Content Download</td><td>Зависит от размера</td><td>Compression (gzip/brotli), code splitting</td></tr>
            <tr><td>Parsing + Render</td><td>50-300 мс</td><td>Critical CSS, async/defer JS, lazy loading</td></tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <h2>🌍 CDN и Edge</h2>
        <p>
          CDN (Content Delivery Network) размещает копии контента на серверах по всему миру.
          Пользователь получает данные от ближайшего edge-сервера.
        </p>
        <table className="comparison-table">
          <thead>
            <tr><th>Тип</th><th>Что кэширует</th><th>Примеры</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Static CDN</strong></td><td>JS, CSS, изображения, шрифты</td><td>CloudFront, Cloudflare, Fastly</td></tr>
            <tr><td><strong>API CDN / Edge</strong></td><td>API-ответы, SSR</td><td>Cloudflare Workers, Vercel Edge</td></tr>
            <tr><td><strong>Media CDN</strong></td><td>Video, audio streaming</td><td>Akamai, Mux</td></tr>
          </tbody>
        </table>

        <h3>Связь с протоколами</h3>
        <ul>
          <li><strong>HTTP/2 Push</strong> — CDN может push'ить критические ресурсы, но <code>103 Early Hints</code> проще</li>
          <li><strong>HTTP/3</strong> — CDN первыми внедрили (Cloudflare, Google) → большинство трафика уже QUIC</li>
          <li><strong>TLS termination</strong> — CDN завершает TLS на edge → backend может общаться по HTTP внутри сети</li>
        </ul>
      </div>
    </>
  )
}
