import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
const cookieParams = [
    {
        name: 'Name=Value',
        values: 'любые строки',
        description: 'Имя и значение куки. Имена регистрозависимые. Значения URL-кодируются.',
        example: 'sessionId=abc123',
        important: true
    },
    {
        name: 'Domain',
        values: '.example.com',
        description: 'Домен, на который отправляется кука. Если не указан — только текущий домен (без поддоменов). Если указан .example.com — будет отправляться и на sub.example.com.',
        example: 'Domain=.example.com',
        important: true
    },
    {
        name: 'Path',
        values: '/',
        description: 'URL-путь, для которого действует кука. Path=/ — все страницы. Path=/admin — только /admin и вложенные.',
        example: 'Path=/api',
        important: false
    },
    {
        name: 'Expires',
        values: 'дата GMT',
        description: 'Абсолютная дата истечения куки. После этой даты браузер удаляет куку. Формат: Thu, 01 Jan 2026 00:00:00 GMT',
        example: 'Expires=Thu, 01 Jan 2026 00:00:00 GMT',
        important: true
    },
    {
        name: 'Max-Age',
        values: 'секунды',
        description: 'Относительное время жизни в секундах. Имеет приоритет над Expires если указаны оба. Max-Age=0 — удалить куку. Max-Age=3600 — 1 час.',
        example: 'Max-Age=86400',
        important: true
    },
    {
        name: 'HttpOnly',
        values: 'флаг (без значения)',
        description: 'Запрещает доступ к куке через JavaScript (document.cookie). Защита от XSS-атак. ВСЕГДА ставить для сессионных кук!',
        example: 'HttpOnly',
        important: true
    },
    {
        name: 'Secure',
        values: 'флаг (без значения)',
        description: 'Кука отправляется только по HTTPS. На HTTP-сайтах кука не будет установлена. Обязательно для SameSite=None.',
        example: 'Secure',
        important: true
    },
    {
        name: 'SameSite',
        values: 'Strict | Lax | None',
        description: 'Контроль отправки куки при cross-origin запросах. Strict = только same-site. Lax = same-site + top-level навигация (GET). None = всегда (требует Secure).',
        example: 'SameSite=Lax',
        important: true
    },
];
const sameSiteComparison = [
    { scenario: 'Ссылка с другого сайта (GET)', strict: '❌', lax: '✅', none: '✅' },
    { scenario: 'Форма POST с другого сайта', strict: '❌', lax: '❌', none: '✅' },
    { scenario: 'Форма GET с другого сайта', strict: '❌', lax: '✅', none: '✅' },
    { scenario: 'fetch/XMLHttpRequest cross-origin', strict: '❌', lax: '❌', none: '✅' },
    { scenario: 'iframe с другого сайта', strict: '❌', lax: '❌', none: '✅' },
    { scenario: 'Навигация на том же сайте', strict: '✅', lax: '✅', none: '✅' },
];
export default function CookiesDemo() {
    const [activeTab, setActiveTab] = useState('params');
    const [testCookieName, setTestCookieName] = useState('testCookie');
    const [testCookieValue, setTestCookieValue] = useState('hello');
    const [testMaxAge, setTestMaxAge] = useState('60');
    const [currentCookies, setCurrentCookies] = useState(document.cookie);
    const setCookie = () => {
        document.cookie = `${testCookieName}=${testCookieValue}; Max-Age=${testMaxAge}; Path=/; SameSite=Lax`;
        setCurrentCookies(document.cookie);
    };
    const deleteCookie = (name) => {
        document.cookie = `${name}=; Max-Age=0; Path=/`;
        setCurrentCookies(document.cookie);
    };
    const deleteAllCookies = () => {
        document.cookie.split(';').forEach(cookie => {
            const name = cookie.split('=')[0].trim();
            document.cookie = `${name}=; Max-Age=0; Path=/`;
        });
        setCurrentCookies(document.cookie);
    };
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83C\uDF6A Cookies \u2014 Deep Dive" }), _jsx("p", { className: "page-description", children: "\u0412\u0441\u0451, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0437\u043D\u0430\u0442\u044C \u043F\u0440\u043E cookies \u0434\u043B\u044F \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F: \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B, \u0432\u0440\u0435\u043C\u044F \u0436\u0438\u0437\u043D\u0438, \u043B\u0438\u043C\u0438\u0442\u044B, SameSite, \u043F\u043E\u0434\u0432\u043E\u0434\u043D\u044B\u0435 \u043A\u0430\u043C\u043D\u0438." }), _jsx("div", { className: "tabs", style: { marginBottom: '24px' }, children: [
                    { key: 'params', label: '⚙️ Параметры' },
                    { key: 'lifetime', label: '⏰ Время жизни' },
                    { key: 'limits', label: '📏 Лимиты' },
                    { key: 'samesite', label: '🛡️ SameSite' },
                    { key: 'interview', label: '🎯 Вопросы' },
                ].map(tab => (_jsx("button", { className: `tab ${activeTab === tab.key ? 'active' : ''}`, onClick: () => setActiveTab(tab.key), children: tab.label }, tab.key))) }), activeTab === 'params' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83D\uDCCB \u0412\u0441\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B Set-Cookie" }), _jsx("span", { className: "card-badge", children: "\u0412\u0430\u0436\u043D\u043E \u0437\u043D\u0430\u0442\u044C!" })] }), _jsxs("div", { className: "info-box", children: [_jsx("strong", { children: "\u0424\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430:" }), _jsx("pre", { style: { margin: '8px 0', padding: '12px', background: 'var(--bg-code)', borderRadius: '6px', fontSize: '0.85rem' }, children: `Set-Cookie: name=value; Domain=.example.com; Path=/; Max-Age=3600; HttpOnly; Secure; SameSite=Lax` })] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }, children: cookieParams.map(param => (_jsxs("div", { className: `param-card ${param.important ? 'param-important' : ''}`, children: [_jsxs("div", { className: "param-card-header", children: [_jsx("code", { className: "param-name", children: param.name }), param.important && (_jsx("span", { className: "param-badge", children: "\u26A1 \u0427\u0430\u0441\u0442\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442" }))] }), _jsxs("div", { className: "param-values-row", children: [_jsx("span", { className: "param-values-label", children: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F:" }), param.values.includes('|')
                                                    ? param.values.split('|').map(v => (_jsx("span", { className: "param-value-tag", children: v.trim() }, v.trim())))
                                                    : _jsx("span", { className: "param-value-tag", children: param.values })] }), _jsx("p", { className: "param-description", children: param.description }), _jsxs("code", { className: "param-example", children: ["\uD83D\uDCA1 ", param.example] })] }, param.name))) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83C\uDFAE \u0416\u0438\u0432\u0430\u044F \u0434\u0435\u043C\u043E: document.cookie" }) }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }, children: [_jsxs("div", { children: [_jsx("h4", { children: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043A\u0443\u043A\u0443" }), _jsxs("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }, children: [_jsx("input", { className: "input", value: testCookieName, onChange: e => setTestCookieName(e.target.value), placeholder: "\u0418\u043C\u044F" }), _jsx("input", { className: "input", value: testCookieValue, onChange: e => setTestCookieValue(e.target.value), placeholder: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435" }), _jsx("input", { className: "input", value: testMaxAge, onChange: e => setTestMaxAge(e.target.value), placeholder: "Max-Age (\u0441\u0435\u043A)" }), _jsxs("div", { className: "controls", children: [_jsx("button", { className: "btn btn-primary", onClick: setCookie, children: "Set Cookie" }), _jsx("button", { className: "btn btn-danger", onClick: deleteAllCookies, children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0441\u0435" })] })] }), _jsxs("div", { className: "info-box warning", style: { marginTop: '12px' }, children: [_jsx("strong", { children: "\u26A0\uFE0F document.cookie" }), " \u2014 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E name=value \u043F\u0430\u0440\u044B. HttpOnly, Secure, Expires \u2014 \u041D\u0415 \u0432\u0438\u0434\u043D\u044B \u0438\u0437 JS!"] })] }), _jsxs("div", { children: [_jsx("h4", { children: "\u0422\u0435\u043A\u0443\u0449\u0438\u0435 cookies" }), _jsx("div", { style: {
                                                    marginTop: '8px',
                                                    padding: '16px',
                                                    background: 'var(--bg-code)',
                                                    borderRadius: '8px',
                                                    minHeight: '120px'
                                                }, children: currentCookies ? currentCookies.split(';').map((cookie, i) => {
                                                    const [name] = cookie.trim().split('=');
                                                    return (_jsxs("div", { style: {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '6px 0',
                                                            borderBottom: '1px solid rgba(255,255,255,0.05)'
                                                        }, children: [_jsx("code", { style: { fontSize: '0.85rem' }, children: cookie.trim() }), _jsx("button", { className: "btn btn-danger", style: { padding: '2px 8px', fontSize: '0.75rem' }, onClick: () => deleteCookie(name), children: "\u2715" })] }, i));
                                                }) : (_jsx("span", { style: { color: 'var(--text-muted)' }, children: "\u041D\u0435\u0442 cookies" })) }), _jsx("button", { className: "btn btn-secondary", style: { marginTop: '8px' }, onClick: () => setCurrentCookies(document.cookie), children: "\uD83D\uDD04 \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" })] })] })] })] })), activeTab === 'lifetime' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\u23F0 \u0412\u0440\u0435\u043C\u044F \u0436\u0438\u0437\u043D\u0438 cookies" }), _jsx("span", { className: "card-badge", children: "\u0427\u0430\u0441\u0442\u044B\u0439 \u0432\u043E\u043F\u0440\u043E\u0441!" })] }), _jsxs("div", { className: "info-box", style: { background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.2)' }, children: [_jsx("strong", { children: "\uD83D\uDD25 \u0412\u043E\u043F\u0440\u043E\u0441: \u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0435\u0441\u043B\u0438 \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u0442\u044C Expires/Max-Age?" }), _jsxs("p", { style: { marginTop: '8px' }, children: ["\u041A\u0443\u043A\u0430 \u0441\u0442\u0430\u043D\u0435\u0442 ", _jsx("strong", { children: "\u0441\u0435\u0441\u0441\u0438\u043E\u043D\u043D\u043E\u0439 (session cookie)" }), " \u2014 \u043E\u043D\u0430 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u0430, \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0437\u0430\u043A\u0440\u043E\u0435\u0442 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 (\u0432\u0441\u0435 \u043E\u043A\u043D\u0430/\u0432\u043A\u043B\u0430\u0434\u043A\u0438)."] }), _jsx("p", { style: { marginTop: '4px', color: 'var(--text-muted)', fontSize: '0.85rem' }, children: "\u26A0\uFE0F \u041D\u043E! \u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u044B (Chrome, Edge) \u043C\u043E\u0433\u0443\u0442 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u0441\u0435\u0441\u0441\u0438\u044E \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0435, \u0438 \u0441\u0435\u0441\u0441\u0438\u043E\u043D\u043D\u044B\u0435 \u043A\u0443\u043A\u0438 \u0438\u043D\u043E\u0433\u0434\u0430 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u044E\u0442 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u0435." })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }, children: [_jsxs("div", { style: { padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsx("h4", { style: { color: 'var(--accent-green)', marginBottom: '12px' }, children: "\uD83D\uDFE2 Session Cookie" }), _jsx("pre", { style: { fontSize: '0.85rem', lineHeight: 1.6 }, children: `Set-Cookie: token=abc123
// Без Expires и Max-Age!

// Живёт до закрытия браузера
// Не пишется на диск
// Хранится только в памяти` })] }), _jsxs("div", { style: { padding: '20px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsx("h4", { style: { color: 'var(--accent-cyan)', marginBottom: '12px' }, children: "\uD83D\uDD35 Persistent Cookie" }), _jsx("pre", { style: { fontSize: '0.85rem', lineHeight: 1.6 }, children: `Set-Cookie: prefs=dark; Max-Age=31536000
// Или
Set-Cookie: prefs=dark; Expires=...

// Живёт до указанной даты
// Пишется на диск
// Переживает закрытие браузера` })] })] }), _jsx("h4", { style: { marginTop: '20px' }, children: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0438 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }, children: [
                                    { rule: 'Если указаны и Expires, и Max-Age → Max-Age побеждает', icon: '1️⃣' },
                                    { rule: 'Max-Age=0 → кука удаляется немедленно', icon: '2️⃣' },
                                    { rule: 'Expires в прошлом → кука удаляется', icon: '3️⃣' },
                                    { rule: 'Для удаления нужно указать тот же Domain + Path', icon: '4️⃣' },
                                    { rule: 'Нельзя удалить HttpOnly куку через document.cookie', icon: '5️⃣' },
                                ].map((item, i) => (_jsxs("div", { style: {
                                        display: 'flex',
                                        gap: '10px',
                                        padding: '10px 14px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '6px'
                                    }, children: [_jsx("span", { children: item.icon }), _jsx("span", { children: item.rule })] }, i))) })] }), _jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83C\uDF10 Third-party cookies" }), _jsx("span", { className: "card-badge", children: "2024+ \u0442\u0440\u0435\u043D\u0434" })] }), _jsxs("p", { style: { color: 'var(--text-secondary)', lineHeight: 1.6 }, children: [_jsx("strong", { children: "Third-party cookie" }), " \u2014 \u043A\u0443\u043A\u0430, \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043D\u0430\u044F \u0434\u043E\u043C\u0435\u043D\u043E\u043C, \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u043C \u043E\u0442 \u0442\u0435\u043A\u0443\u0449\u0435\u0433\u043E (\u0438\u0437 iframe, img, script \u0434\u0440\u0443\u0433\u043E\u0433\u043E \u0434\u043E\u043C\u0435\u043D\u0430). \u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442 \u0442\u0440\u0435\u043A\u0438\u043D\u0433\u0430 \u0440\u0435\u043A\u043B\u0430\u043C\u044B."] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }, children: [_jsxs("div", { style: { padding: '16px', background: 'rgba(239, 68, 68, 0.05)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.15)' }, children: [_jsx("h4", { style: { color: 'var(--accent-red)' }, children: "\u274C \u0411\u043B\u043E\u043A\u0438\u0440\u0443\u044E\u0442\u0441\u044F" }), _jsxs("ul", { style: { marginTop: '8px', lineHeight: 2 }, children: [_jsx("li", { children: "Safari \u2014 \u0443\u0436\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E (ITP)" }), _jsx("li", { children: "Firefox \u2014 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 (ETP Strict)" }), _jsx("li", { children: "Chrome \u2014 \u043E\u0442\u043A\u0430\u0437\u0430\u043B\u0441\u044F \u043E\u0442 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0432 2024, \u043D\u043E \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0432\u0430\u0435\u0442" })] })] }), _jsxs("div", { style: { padding: '16px', background: 'rgba(34, 197, 94, 0.05)', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.15)' }, children: [_jsx("h4", { style: { color: 'var(--accent-green)' }, children: "\u2705 \u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u044B" }), _jsxs("ul", { style: { marginTop: '8px', lineHeight: 2 }, children: [_jsx("li", { children: "First-party cookies + \u0441\u0435\u0440\u0432\u0435\u0440\u043D\u044B\u0439 \u0442\u0440\u0435\u043A\u0438\u043D\u0433" }), _jsx("li", { children: "Privacy Sandbox (Chrome)" }), _jsx("li", { children: "Storage Access API" }), _jsx("li", { children: "CHIPS (Cookies Having Independent Partitioned State)" })] })] })] })] })] })), activeTab === 'limits' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83D\uDCCF \u041B\u0438\u043C\u0438\u0442\u044B cookies" }), _jsx("span", { className: "card-badge", children: "\u0417\u043D\u0430\u0442\u044C \u043D\u0430\u0438\u0437\u0443\u0441\u0442\u044C!" })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, children: [_jsxs("div", { style: {
                                            textAlign: 'center',
                                            padding: '24px',
                                            background: 'var(--bg-code)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(99, 102, 241, 0.2)'
                                        }, children: [_jsx("div", { style: { fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }, children: "4 KB" }), _jsx("div", { style: { color: 'var(--text-secondary)', marginTop: '4px' }, children: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043E\u0434\u043D\u043E\u0439 \u043A\u0443\u043A\u0438" }), _jsx("div", { style: { color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }, children: "\u0418\u043C\u044F + \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 + \u0410\u0442\u0440\u0438\u0431\u0443\u0442\u044B" })] }), _jsxs("div", { style: {
                                            textAlign: 'center',
                                            padding: '24px',
                                            background: 'var(--bg-code)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(99, 102, 241, 0.2)'
                                        }, children: [_jsx("div", { style: { fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-orange)' }, children: "~50" }), _jsx("div", { style: { color: 'var(--text-secondary)', marginTop: '4px' }, children: "\u041A\u0443\u043A \u043D\u0430 \u0434\u043E\u043C\u0435\u043D" }), _jsx("div", { style: { color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }, children: "RFC 6265: \u043C\u0438\u043D\u0438\u043C\u0443\u043C 50" })] }), _jsxs("div", { style: {
                                            textAlign: 'center',
                                            padding: '24px',
                                            background: 'var(--bg-code)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(99, 102, 241, 0.2)'
                                        }, children: [_jsx("div", { style: { fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-green)' }, children: "~3000" }), _jsx("div", { style: { color: 'var(--text-secondary)', marginTop: '4px' }, children: "\u041A\u0443\u043A \u0432\u0441\u0435\u0433\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435" }), _jsx("div", { style: { color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }, children: "\u0417\u0430\u0432\u0438\u0441\u0438\u0442 \u043E\u0442 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\u2696\uFE0F \u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449" }) }), _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '2px solid rgba(255,255,255,0.1)' }, children: [_jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u0425\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435" }), _jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u0420\u0430\u0437\u043C\u0435\u0440" }), _jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440" }), _jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u0421\u0440\u043E\u043A \u0436\u0438\u0437\u043D\u0438" }), _jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u0414\u043E\u0441\u0442\u0443\u043F \u0438\u0437 JS" })] }) }), _jsx("tbody", { children: [
                                            ['Cookie', '~4 KB', '✅ Автоматически', 'До Expires/Max-Age', '⚠️ Если нет HttpOnly'],
                                            ['localStorage', '~5-10 MB', '❌ Нет', 'Навсегда', '✅ Да'],
                                            ['sessionStorage', '~5-10 MB', '❌ Нет', 'До закрытия вкладки', '✅ Да'],
                                            ['IndexedDB', '~50 MB+', '❌ Нет', 'Навсегда', '✅ Да'],
                                        ].map(([name, size, server, lifetime, js], i) => (_jsxs("tr", { style: {
                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                background: i === 0 ? 'rgba(99, 102, 241, 0.03)' : 'transparent'
                                            }, children: [_jsx("td", { style: { padding: '10px 8px', fontWeight: 600 }, children: name }), _jsx("td", { style: { padding: '10px 8px', color: 'var(--accent-cyan)' }, children: size }), _jsx("td", { style: { padding: '10px 8px' }, children: server }), _jsx("td", { style: { padding: '10px 8px', color: 'var(--text-secondary)' }, children: lifetime }), _jsx("td", { style: { padding: '10px 8px' }, children: js })] }, i))) })] }), _jsxs("div", { className: "info-box warning", style: { marginTop: '16px' }, children: [_jsx("strong", { children: "\uD83D\uDCA1 \u041A\u043B\u044E\u0447\u0435\u0432\u043E\u0435 \u043E\u0442\u043B\u0438\u0447\u0438\u0435 cookies" }), " \u2014 \u043A\u0443\u043A\u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0441 \u043A\u0430\u0436\u0434\u044B\u043C HTTP-\u0437\u0430\u043F\u0440\u043E\u0441\u043E\u043C \u043A \u0441\u0435\u0440\u0432\u0435\u0440\u0443! \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u043D\u0435 \u0441\u0442\u043E\u0438\u0442 \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u043D\u0438\u0445 \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u2014 \u044D\u0442\u043E \u0437\u0430\u043C\u0435\u0434\u043B\u044F\u0435\u0442 \u041A\u0410\u0416\u0414\u042B\u0419 \u0437\u0430\u043F\u0440\u043E\u0441."] })] })] })), activeTab === 'samesite' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\uD83D\uDEE1\uFE0F SameSite \u2014 \u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 CSRF" }), _jsx("span", { className: "card-badge", children: "\u0421\u043B\u043E\u0436\u043D\u0430\u044F \u0442\u0435\u043C\u0430!" })] }), _jsx("p", { style: { color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }, children: "\u0410\u0442\u0440\u0438\u0431\u0443\u0442 SameSite \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u0442, \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043B\u0438 \u043A\u0443\u043A\u0430 \u043F\u0440\u0438 cross-site \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u0445. \u042D\u0442\u043E \u043E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 CSRF-\u0430\u0442\u0430\u043A \u0432 \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u044B\u0445 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430\u0445." }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, children: [
                                    {
                                        value: 'Strict',
                                        color: 'var(--accent-green)',
                                        desc: 'Никогда не отправляется при cross-site. Даже при переходе по ссылке!',
                                        use: 'Банковские и финансовые приложения'
                                    },
                                    {
                                        value: 'Lax',
                                        color: 'var(--accent-orange)',
                                        desc: 'Отправляется при top-level навигации GET. Не отправляется при POST, iframe, fetch.',
                                        use: 'Значение по умолчанию в Chrome (с 2020)'
                                    },
                                    {
                                        value: 'None',
                                        color: 'var(--accent-red)',
                                        desc: 'Отправляется всегда. ТРЕБУЕТ Secure! Нужен для cross-site сценариев.',
                                        use: 'Виджеты, SSO, рекламные трекеры'
                                    },
                                ].map(item => (_jsxs("div", { style: {
                                        padding: '20px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '8px',
                                        borderTop: `3px solid ${item.color}`
                                    }, children: [_jsxs("h4", { style: { color: item.color, marginBottom: '8px' }, children: ["SameSite=", item.value] }), _jsx("p", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '12px' }, children: item.desc }), _jsxs("div", { style: { fontSize: '0.8rem', color: 'var(--text-muted)' }, children: ["\uD83D\uDCCC ", item.use] })] }, item.value))) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDCCA \u041C\u0430\u0442\u0440\u0438\u0446\u0430 SameSite" }) }), _jsxs("table", { style: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }, children: [_jsx("thead", { children: _jsxs("tr", { style: { borderBottom: '2px solid rgba(255,255,255,0.1)' }, children: [_jsx("th", { style: { textAlign: 'left', padding: '12px 8px' }, children: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439" }), _jsx("th", { style: { textAlign: 'center', padding: '12px 8px', color: 'var(--accent-green)' }, children: "Strict" }), _jsx("th", { style: { textAlign: 'center', padding: '12px 8px', color: 'var(--accent-orange)' }, children: "Lax" }), _jsx("th", { style: { textAlign: 'center', padding: '12px 8px', color: 'var(--accent-red)' }, children: "None" })] }) }), _jsx("tbody", { children: sameSiteComparison.map((row, i) => (_jsxs("tr", { style: { borderBottom: '1px solid rgba(255,255,255,0.05)' }, children: [_jsx("td", { style: { padding: '10px 8px' }, children: row.scenario }), _jsx("td", { style: { textAlign: 'center', padding: '10px 8px' }, children: row.strict }), _jsx("td", { style: { textAlign: 'center', padding: '10px 8px' }, children: row.lax }), _jsx("td", { style: { textAlign: 'center', padding: '10px 8px' }, children: row.none })] }, i))) })] }), _jsxs("div", { className: "info-box", style: { marginTop: '16px' }, children: [_jsx("strong", { children: "\uD83D\uDCA1 Lax vs Strict \u2014 \u0445\u0438\u0442\u0440\u044B\u0439 \u043A\u0435\u0439\u0441:" }), _jsxs("p", { style: { marginTop: '4px' }, children: ["\u0415\u0441\u043B\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u0435\u0440\u0435\u0448\u0451\u043B \u0441 Google \u043D\u0430 \u0432\u0430\u0448 \u0441\u0430\u0439\u0442 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435, \u043A\u0443\u043A\u0430 \u0441 SameSite=Strict ", _jsx("strong", { children: "\u041D\u0415 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u0441\u044F" }), " \u043F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0435! \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0443\u0432\u0438\u0434\u0438\u0442 \u0441\u0430\u0439\u0442 \u043A\u0430\u043A \u043D\u0435\u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D\u043D\u044B\u0439. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0434\u043B\u044F \u0441\u0435\u0441\u0441\u0438\u0439 \u043B\u0443\u0447\u0448\u0435 Lax."] })] })] })] })), activeTab === 'interview' && (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83C\uDFAF \u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B \u043F\u0440\u043E cookies" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
                            {
                                q: 'Что будет, если не указать Expires и Max-Age?',
                                a: 'Кука будет сессионной — удалится при закрытии браузера. Хранится только в памяти, не на диске.'
                            },
                            {
                                q: 'Какой максимальный размер одной куки?',
                                a: '~4 KB (4096 байт) — это имя + значение + все атрибуты. Если превысить — кука молча проигнорируется.'
                            },
                            {
                                q: 'Сколько кук может быть на один домен?',
                                a: 'По RFC 6265 — минимум 50 кук на домен. В реальности Chrome позволяет ~180, Firefox ~150.'
                            },
                            {
                                q: 'Чем HttpOnly отличается от Secure?',
                                a: 'HttpOnly — запрещает доступ через document.cookie (защита от XSS). Secure — отправлять только по HTTPS (защита от MITM). Это разные и взаимодополняющие защиты.'
                            },
                            {
                                q: 'Что такое SameSite=Lax и почему это дефолт?',
                                a: 'Lax отправляет куки только при top-level GET навигации (клик по ссылке). Не отправляет при POST, fetch, iframe. Это защита от CSRF без поломки обычной навигации. Дефолт в Chrome с 2020.'
                            },
                            {
                                q: 'Можно ли поставить SameSite=None без Secure?',
                                a: 'Нет! Браузер отклонит такую куку. SameSite=None требует обязательного Secure (HTTPS).'
                            },
                            {
                                q: 'В чём разница между cookie и localStorage?',
                                a: 'Cookies: ~4KB, отправляются с каждым HTTP-запросом, имеют Domain/Path/Expires. localStorage: ~5-10MB, не отправляется на сервер, живёт бессрочно, доступен только из JS.'
                            },
                            {
                                q: 'Как удалить HttpOnly куку?',
                                a: 'Только с сервера — установить Set-Cookie с Max-Age=0 или Expires в прошлом. Из JS (document.cookie) удалить нельзя — HttpOnly не даёт доступа.'
                            },
                            {
                                q: 'Что такое third-party cookie?',
                                a: 'Кука, установленная доменом, отличным от текущего (через iframe, img, script). Используется для трекинга. Safari и Firefox уже блокируют по умолчанию.'
                            },
                            {
                                q: 'Кука с Domain=.example.com — попадёт ли на sub.example.com?',
                                a: 'Да! Точка перед доменом включает все поддомены. Без Domain — только текущий домен, без поддоменов.'
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
