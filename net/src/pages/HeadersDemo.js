import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const commonHeaders = [
    // Request headers
    { name: 'Accept', value: 'application/json', description: 'Какой формат ответа ожидает клиент', category: 'request' },
    { name: 'Accept-Language', value: 'ru-RU, en;q=0.9', description: 'Предпочитаемые языки (q = приоритет)', category: 'request' },
    { name: 'Accept-Encoding', value: 'gzip, deflate, br', description: 'Поддерживаемые алгоритмы сжатия', category: 'request' },
    { name: 'Content-Type', value: 'application/json', description: 'MIME-тип тела запроса', category: 'both' },
    { name: 'Content-Length', value: '348', description: 'Размер тела в байтах', category: 'both' },
    { name: 'Authorization', value: 'Bearer eyJhbGci...', description: 'Токен авторизации', category: 'request' },
    { name: 'Cookie', value: 'session=abc123', description: 'Куки, отправляемые серверу', category: 'request' },
    { name: 'User-Agent', value: 'Mozilla/5.0 ...', description: 'Информация о браузере/клиенте', category: 'request' },
    { name: 'Origin', value: 'https://example.com', description: 'Откуда пришёл запрос (для CORS)', category: 'request' },
    { name: 'Referer', value: 'https://example.com/page', description: 'URL страницы, с которой сделан запрос', category: 'request' },
    { name: 'If-None-Match', value: '"abc123"', description: 'ETag для условного запроса', category: 'request' },
    { name: 'If-Modified-Since', value: 'Wed, 21 Oct 2024 07:28:00 GMT', description: 'Дата для условного запроса', category: 'request' },
    // Response headers
    { name: 'Cache-Control', value: 'max-age=3600, public', description: 'Инструкции кеширования', category: 'response' },
    { name: 'ETag', value: '"abc123"', description: 'Версия ресурса для кеширования', category: 'response' },
    { name: 'Last-Modified', value: 'Wed, 21 Oct 2024 07:28:00 GMT', description: 'Дата последнего изменения', category: 'response' },
    { name: 'Set-Cookie', value: 'session=xyz; HttpOnly; Secure', description: 'Установка куки', category: 'response' },
    { name: 'Location', value: '/new-url', description: 'URL для редиректа (3xx)', category: 'response' },
    { name: 'Content-Encoding', value: 'gzip', description: 'Алгоритм сжатия ответа', category: 'response' },
    { name: 'Access-Control-Allow-Origin', value: '*', description: 'CORS: разрешённые origins', category: 'response' },
    { name: 'X-RateLimit-Remaining', value: '99', description: 'Осталось запросов (rate limiting)', category: 'response' },
    { name: 'Retry-After', value: '120', description: 'Когда повторить (секунды или дата)', category: 'response' },
];
const contentTypes = [
    { type: 'application/json', use: 'REST API, современные веб-сервисы', example: '{"name": "John"}' },
    { type: 'application/x-www-form-urlencoded', use: 'HTML формы (по умолчанию)', example: 'name=John&age=30' },
    { type: 'multipart/form-data', use: 'Загрузка файлов', example: '------boundary\\nContent-Disposition: form-data; name="file"...' },
    { type: 'text/plain', use: 'Простой текст', example: 'Hello, World!' },
    { type: 'text/html', use: 'HTML страницы', example: '<html>...</html>' },
    { type: 'application/xml', use: 'SOAP, legacy API', example: '<user><name>John</name></user>' },
    { type: 'application/octet-stream', use: 'Бинарные данные', example: '[binary data]' },
];
export default function HeadersDemo() {
    const [filter, setFilter] = useState('all');
    const [testUrl, setTestUrl] = useState('https://httpbin.org/headers');
    const [customHeaders, setCustomHeaders] = useState({
        'X-Custom-Header': 'my-value',
        'Accept': 'application/json'
    });
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const filteredHeaders = commonHeaders.filter(h => filter === 'all' || h.category === filter || h.category === 'both');
    const addHeader = () => {
        const name = prompt('Header name:');
        if (name) {
            const value = prompt('Header value:') || '';
            setCustomHeaders(prev => ({ ...prev, [name]: value }));
        }
    };
    const removeHeader = (name) => {
        setCustomHeaders(prev => {
            const copy = { ...prev };
            delete copy[name];
            return copy;
        });
    };
    const sendRequest = async () => {
        setLoading(true);
        try {
            const res = await fetch(testUrl, {
                headers: customHeaders
            });
            const data = await res.json();
            setResponse({
                status: res.status,
                headers: Object.fromEntries(res.headers.entries()),
                body: data
            });
        }
        catch (err) {
            setResponse({ error: err.message });
        }
        setLoading(false);
    };
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDCCB HTTP Headers" }), _jsx("p", { className: "page-description", children: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u2014 \u043C\u0435\u0442\u0430\u0434\u0430\u043D\u043D\u044B\u0435 HTTP \u0437\u0430\u043F\u0440\u043E\u0441\u0430/\u043E\u0442\u0432\u0435\u0442\u0430. \u041E\u043D\u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u044E\u0442 \u043A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C, \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0435\u0439, \u0442\u0438\u043F\u043E\u043C \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430 \u0438 \u043C\u043D\u043E\u0433\u0438\u043C \u0434\u0440\u0443\u0433\u0438\u043C." }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCDA \u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432" }), _jsx("div", { style: { display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }, children: ['all', 'request', 'response'].map(f => (_jsx("button", { onClick: () => setFilter(f), className: `btn ${filter === f ? 'btn-primary' : 'btn-secondary'}`, children: f === 'all' ? '📋 Все' : f === 'request' ? '📤 Request' : '📥 Response' }, f))) }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "info-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" }), _jsx("th", { children: "\u041F\u0440\u0438\u043C\u0435\u0440" }), _jsx("th", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" })] }) }), _jsx("tbody", { children: filteredHeaders.map(h => (_jsxs("tr", { children: [_jsxs("td", { children: [_jsx("code", { className: "header-name", children: h.name }), _jsx("span", { className: `badge badge-${h.category === 'request' ? 'blue' : h.category === 'response' ? 'green' : 'purple'}`, children: h.category })] }), _jsx("td", { children: _jsx("code", { className: "header-value", children: h.value }) }), _jsx("td", { children: h.description })] }, h.name))) })] }) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCE6 Content-Type" }), _jsx("p", { children: "\u0421\u0430\u043C\u044B\u0439 \u0432\u0430\u0436\u043D\u044B\u0439 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u2014 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0444\u043E\u0440\u043C\u0430\u0442 \u0434\u0430\u043D\u043D\u044B\u0445:" }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "info-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "Content-Type" }), _jsx("th", { children: "\u041A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C" }), _jsx("th", { children: "\u041F\u0440\u0438\u043C\u0435\u0440 \u0434\u0430\u043D\u043D\u044B\u0445" })] }) }), _jsx("tbody", { children: contentTypes.map(ct => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: ct.type }) }), _jsx("td", { children: ct.use }), _jsx("td", { children: _jsx("code", { className: "example-small", children: ct.example }) })] }, ct.type))) })] }) }), _jsxs("div", { className: "code-block", children: [_jsx("div", { className: "code-header", children: "JavaScript: \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0440\u0430\u0437\u043D\u044B\u0445 \u0442\u0438\u043F\u043E\u0432" }), _jsx("pre", { children: `// JSON (самый частый)
fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'John' })
})

// Form data (файлы)
const formData = new FormData()
formData.append('file', fileInput.files[0])
fetch('/api/upload', {
  method: 'POST',
  // НЕ указываем Content-Type — браузер сам добавит с boundary!
  body: formData
})

// URL-encoded (как HTML form)
fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ username: 'john', password: 'secret' })
})` })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA \u0422\u0435\u0441\u0442 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432" }), _jsx("p", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0441 \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u043C\u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438 \u043D\u0430 httpbin.org:" }), _jsxs("div", { className: "form-group", children: [_jsx("label", { children: "URL:" }), _jsx("input", { type: "text", value: testUrl, onChange: e => setTestUrl(e.target.value), className: "input" })] }), _jsxs("div", { className: "headers-editor", children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }, children: [_jsx("strong", { children: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438:" }), _jsx("button", { onClick: addHeader, className: "btn btn-small", children: "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" })] }), Object.entries(customHeaders).map(([name, value]) => (_jsxs("div", { className: "header-row", children: [_jsxs("code", { children: [name, ":"] }), _jsx("input", { type: "text", value: value, onChange: e => setCustomHeaders(prev => ({ ...prev, [name]: e.target.value })), className: "input input-small" }), _jsx("button", { onClick: () => removeHeader(name), className: "btn btn-danger btn-small", children: "\u00D7" })] }, name)))] }), _jsx("button", { onClick: sendRequest, disabled: loading, className: "btn btn-primary", children: loading ? '⏳ Отправка...' : '🚀 Отправить' }), response && (_jsxs("div", { className: "response-block", children: [_jsx("div", { className: "code-header", children: response.error ? '❌ Ошибка' : `✅ ${response.status}` }), _jsx("pre", { children: JSON.stringify(response, null, 2) })] }))] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCE4\uD83D\uDCE5 Request vs Response Headers" }), _jsxs("div", { className: "comparison-grid", children: [_jsxs("div", { className: "comparison-col", children: [_jsx("h3", { children: "\uD83D\uDCE4 Request Headers" }), _jsx("p", { children: "\u041A\u043B\u0438\u0435\u043D\u0442 \u2192 \u0421\u0435\u0440\u0432\u0435\u0440" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Accept" }), " \u2014 \u043A\u0430\u043A\u043E\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0445\u043E\u0447\u0443 \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C"] }), _jsxs("li", { children: [_jsx("strong", { children: "Authorization" }), " \u2014 \u043A\u0442\u043E \u044F \u0442\u0430\u043A\u043E\u0439"] }), _jsxs("li", { children: [_jsx("strong", { children: "Content-Type" }), " \u2014 \u0447\u0442\u043E \u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u044E"] }), _jsxs("li", { children: [_jsx("strong", { children: "Cookie" }), " \u2014 \u043C\u043E\u0438 \u043A\u0443\u043A\u0438"] }), _jsxs("li", { children: [_jsx("strong", { children: "User-Agent" }), " \u2014 \u043C\u043E\u0439 \u0431\u0440\u0430\u0443\u0437\u0435\u0440"] }), _jsxs("li", { children: [_jsx("strong", { children: "If-None-Match" }), " \u2014 \u0435\u0441\u0442\u044C \u043B\u0438 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F?"] })] })] }), _jsxs("div", { className: "comparison-col", children: [_jsx("h3", { children: "\uD83D\uDCE5 Response Headers" }), _jsx("p", { children: "\u0421\u0435\u0440\u0432\u0435\u0440 \u2192 \u041A\u043B\u0438\u0435\u043D\u0442" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Content-Type" }), " \u2014 \u0447\u0442\u043E \u044F \u043E\u0442\u0434\u0430\u044E"] }), _jsxs("li", { children: [_jsx("strong", { children: "Set-Cookie" }), " \u2014 \u0437\u0430\u043F\u043E\u043C\u043D\u0438 \u044D\u0442\u043E"] }), _jsxs("li", { children: [_jsx("strong", { children: "Cache-Control" }), " \u2014 \u043A\u0430\u043A \u043A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u0442\u044C"] }), _jsxs("li", { children: [_jsx("strong", { children: "Location" }), " \u2014 \u0438\u0434\u0438 \u0441\u044E\u0434\u0430 (redirect)"] }), _jsxs("li", { children: [_jsx("strong", { children: "ETag" }), " \u2014 \u0432\u0435\u0440\u0441\u0438\u044F \u0440\u0435\u0441\u0443\u0440\u0441\u0430"] }), _jsxs("li", { children: [_jsx("strong", { children: "Access-Control-*" }), " \u2014 CORS \u043F\u0440\u0430\u0432\u0438\u043B\u0430"] })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFF7\uFE0F \u041A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438" }), _jsxs("div", { className: "info-box info-box-warning", children: [_jsx("strong", { children: "X- \u043F\u0440\u0435\u0444\u0438\u043A\u0441 \u0443\u0441\u0442\u0430\u0440\u0435\u043B!" }), _jsx("p", { children: "\u0420\u0430\u043D\u044C\u0448\u0435 \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043D\u0430\u0447\u0438\u043D\u0430\u043B\u0438\u0441\u044C \u0441 X- (X-Custom-Header). \u0421 2012 \u0433\u043E\u0434\u0430 \u044D\u0442\u043E \u043D\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u0442\u0441\u044F \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u043F\u043E\u043D\u044F\u0442\u043D\u043E\u0435 \u0438\u043C\u044F." })] }), _jsxs("div", { className: "code-block", children: [_jsx("div", { className: "code-header", children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0445 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432" }), _jsx("pre", { children: `// Трекинг запросов
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000

// Rate limiting info
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000

// API версионирование
API-Version: 2024-01-01
Accept-Version: v2

// Пагинация
X-Total-Count: 150
X-Page: 1
X-Per-Page: 20
Link: </api/users?page=2>; rel="next"` })] })] }), _jsx("style", { children: `
        .header-name {
          font-weight: 600;
          color: var(--accent);
        }
        .header-value {
          font-size: 0.85em;
          color: var(--text-secondary);
          word-break: break-all;
        }
        .badge {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7em;
          margin-left: 8px;
          text-transform: uppercase;
        }
        .badge-blue { background: rgba(59, 130, 246, 0.2); color: #3b82f6; }
        .badge-green { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .badge-purple { background: rgba(139, 92, 246, 0.2); color: #8b5cf6; }
        .example-small {
          font-size: 0.8em;
          max-width: 200px;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .headers-editor {
          background: var(--bg-secondary);
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .header-row {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }
        .header-row code {
          min-width: 150px;
        }
        .input-small {
          flex: 1;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .comparison-col {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .comparison-col h3 {
          margin-top: 0;
        }
        .comparison-col ul {
          margin: 0;
          padding-left: 20px;
        }
        .comparison-col li {
          margin-bottom: 8px;
        }
        .response-block {
          margin-top: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          overflow: hidden;
        }
        .response-block pre {
          padding: 16px;
          margin: 0;
          overflow-x: auto;
          font-size: 0.85em;
        }
      ` })] }));
}
