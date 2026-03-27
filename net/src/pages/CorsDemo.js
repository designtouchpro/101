import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
const corsScenarios = [
    {
        name: 'Simple GET (same-origin)',
        description: 'Запрос на тот же домен',
        allowed: true,
        headers: {}
    },
    {
        name: 'Cross-origin GET',
        description: 'GET на другой домен без credentials',
        allowed: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    },
    {
        name: 'Cross-origin with credentials',
        description: 'Запрос с cookies на другой домен',
        allowed: true,
        headers: {
            'Access-Control-Allow-Origin': 'https://example.com',
            'Access-Control-Allow-Credentials': 'true'
        }
    },
    {
        name: 'Preflight (PUT/DELETE)',
        description: 'Небезопасные методы требуют preflight',
        allowed: true,
        headers: {
            'Access-Control-Allow-Origin': 'https://example.com',
            'Access-Control-Allow-Methods': 'PUT, DELETE',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    },
];
export default function CorsDemo() {
    const [activeDemo, setActiveDemo] = useState('theory');
    const [testUrl, setTestUrl] = useState('https://httpbin.org/get');
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const testCors = async () => {
        setLoading(true);
        setTestResult(null);
        try {
            const res = await fetch(testUrl, { mode: 'cors' });
            const headers = {};
            res.headers.forEach((v, k) => headers[k] = v);
            setTestResult({
                success: true,
                headers
            });
        }
        catch (err) {
            setTestResult({
                success: false,
                error: err.message || 'CORS error - запрос заблокирован браузером'
            });
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83C\uDF10 CORS (Cross-Origin Resource Sharing)" }), _jsx("p", { className: "page-description", children: "CORS \u2014 \u043C\u0435\u0445\u0430\u043D\u0438\u0437\u043C \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430, \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u044E\u0449\u0438\u0439 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043C\u0435\u0436\u0434\u0443 \u0434\u043E\u043C\u0435\u043D\u0430\u043C\u0438. \u0411\u0435\u0437 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u0430\u0448 API \u0431\u0443\u0434\u0435\u0442 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0438\u0437 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430." }), _jsxs("div", { className: "tabs", children: [_jsx("button", { className: `tab ${activeDemo === 'theory' ? 'active' : ''}`, onClick: () => setActiveDemo('theory'), children: "\uD83D\uDCD6 \u0422\u0435\u043E\u0440\u0438\u044F" }), _jsx("button", { className: `tab ${activeDemo === 'test' ? 'active' : ''}`, onClick: () => setActiveDemo('test'), children: "\uD83E\uDDEA \u0422\u0435\u0441\u0442" }), _jsx("button", { className: `tab ${activeDemo === 'config' ? 'active' : ''}`, onClick: () => setActiveDemo('config'), children: "\u2699\uFE0F \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430" })] }), activeDemo === 'theory' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFE0 Same-Origin Policy" }), _jsx("p", { children: "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0441\u0447\u0438\u0442\u0430\u0435\u0442 \u0434\u0432\u0430 URL \"same-origin\" \u0435\u0441\u043B\u0438 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u044E\u0442:" }), _jsxs("div", { className: "origin-parts", children: [_jsxs("div", { className: "origin-part", children: [_jsx("span", { className: "part-value", children: "https://" }), _jsx("span", { className: "part-label", children: "\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B" })] }), _jsxs("div", { className: "origin-part", children: [_jsx("span", { className: "part-value", children: "example.com" }), _jsx("span", { className: "part-label", children: "\u0414\u043E\u043C\u0435\u043D" })] }), _jsxs("div", { className: "origin-part", children: [_jsx("span", { className: "part-value", children: ":443" }), _jsx("span", { className: "part-label", children: "\u041F\u043E\u0440\u0442" })] })] }), _jsxs("div", { className: "origin-examples", children: [_jsxs("div", { className: "example-row same", children: [_jsx("code", { children: "https://example.com/page1" }), _jsx("span", { children: "=" }), _jsx("code", { children: "https://example.com/page2" }), _jsx("span", { className: "result", children: "\u2705 Same" })] }), _jsxs("div", { className: "example-row different", children: [_jsx("code", { children: "https://example.com" }), _jsx("span", { children: "\u2260" }), _jsx("code", { children: "https://api.example.com" }), _jsx("span", { className: "result", children: "\u274C Different (subdomain)" })] }), _jsxs("div", { className: "example-row different", children: [_jsx("code", { children: "http://example.com" }), _jsx("span", { children: "\u2260" }), _jsx("code", { children: "https://example.com" }), _jsx("span", { className: "result", children: "\u274C Different (protocol)" })] }), _jsxs("div", { className: "example-row different", children: [_jsx("code", { children: "https://example.com" }), _jsx("span", { children: "\u2260" }), _jsx("code", { children: "https://example.com:8080" }), _jsx("span", { className: "result", children: "\u274C Different (port)" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u2708\uFE0F Preflight Requests" }), _jsx("p", { children: "\u0414\u043B\u044F \"\u043D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0445\" \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 OPTIONS:" }), _jsxs("div", { className: "preflight-flow", children: [_jsxs("div", { className: "flow-column", children: [_jsx("h4", { children: "Simple Request (\u0431\u0435\u0437 preflight)" }), _jsxs("ul", { children: [_jsx("li", { children: "GET, HEAD, POST" }), _jsx("li", { children: "\u0422\u043E\u043B\u044C\u043A\u043E \"\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0435\" \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438" }), _jsx("li", { children: "Content-Type: text/plain, multipart/form-data, application/x-www-form-urlencoded" })] })] }), _jsxs("div", { className: "flow-column", children: [_jsx("h4", { children: "Preflighted Request" }), _jsxs("ul", { children: [_jsx("li", { children: "PUT, DELETE, PATCH" }), _jsx("li", { children: "\u041A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 (Authorization)" }), _jsx("li", { children: "Content-Type: application/json" })] })] })] }), _jsxs("div", { className: "preflight-diagram", children: [_jsxs("div", { className: "diagram-step", children: [_jsx("span", { className: "step-num", children: "1" }), _jsxs("div", { className: "step-content", children: [_jsx("code", { className: "method", children: "OPTIONS /api/users" }), _jsx("code", { children: "Origin: https://frontend.com" }), _jsx("code", { children: "Access-Control-Request-Method: PUT" }), _jsx("code", { children: "Access-Control-Request-Headers: Authorization" })] })] }), _jsx("div", { className: "diagram-arrow", children: "\u2193" }), _jsxs("div", { className: "diagram-step", children: [_jsx("span", { className: "step-num", children: "2" }), _jsxs("div", { className: "step-content", children: [_jsx("code", { className: "status", children: "204 No Content" }), _jsx("code", { children: "Access-Control-Allow-Origin: https://frontend.com" }), _jsx("code", { children: "Access-Control-Allow-Methods: GET, PUT, DELETE" }), _jsx("code", { children: "Access-Control-Allow-Headers: Authorization" }), _jsx("code", { children: "Access-Control-Max-Age: 86400" })] })] }), _jsx("div", { className: "diagram-arrow", children: "\u2193" }), _jsxs("div", { className: "diagram-step", children: [_jsx("span", { className: "step-num", children: "3" }), _jsxs("div", { className: "step-content", children: [_jsx("code", { className: "method", children: "PUT /api/users" }), _jsx("code", { children: "Authorization: Bearer ..." }), _jsx("p", { children: "\u0422\u0435\u043F\u0435\u0440\u044C \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB CORS Headers Reference" }), _jsxs("div", { className: "headers-table", children: [_jsxs("div", { className: "header-row header-title", children: [_jsx("span", { children: "Response Header" }), _jsx("span", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Allow-Origin" }), _jsx("span", { children: "\u0420\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0439 origin (* \u0438\u043B\u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0439)" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Allow-Methods" }), _jsx("span", { children: "\u0420\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0435 HTTP \u043C\u0435\u0442\u043E\u0434\u044B" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Allow-Headers" }), _jsx("span", { children: "\u0420\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0435 request headers" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Allow-Credentials" }), _jsx("span", { children: "\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C cookies/auth (true/false)" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Expose-Headers" }), _jsx("span", { children: "\u041A\u0430\u043A\u0438\u0435 response headers \u0432\u0438\u0434\u043D\u044B JS" })] }), _jsxs("div", { className: "header-row", children: [_jsx("code", { children: "Access-Control-Max-Age" }), _jsx("span", { children: "\u041A\u0435\u0448 preflight \u0432 \u0441\u0435\u043A\u0443\u043D\u0434\u0430\u0445" })] })] }), _jsxs("div", { className: "warning-box", children: [_jsx("strong", { children: "\u26A0\uFE0F \u0412\u0430\u0436\u043D\u043E!" }), _jsxs("p", { children: [_jsx("code", { children: "Access-Control-Allow-Origin: *" }), " \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 ", _jsx("code", { children: "credentials: true" })] })] })] })] })), activeDemo === 'test' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA \u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C CORS" }), _jsxs("div", { className: "test-form", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "URL \u0434\u043B\u044F \u0442\u0435\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F:" }), _jsx("input", { type: "text", value: testUrl, onChange: e => setTestUrl(e.target.value), className: "input", placeholder: "https://api.example.com/endpoint" })] }), _jsxs("div", { className: "quick-urls", children: [_jsx("span", { children: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0432\u044B\u0431\u043E\u0440:" }), _jsx("button", { onClick: () => setTestUrl('https://httpbin.org/get'), children: "httpbin (CORS \u2705)" }), _jsx("button", { onClick: () => setTestUrl('https://google.com'), children: "google.com (CORS \u274C)" }), _jsx("button", { onClick: () => setTestUrl('/api/users'), children: "\u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 API" })] }), _jsx("button", { onClick: testCors, className: "btn btn-primary", disabled: loading, children: loading ? '⏳ Проверка...' : '🚀 Проверить CORS' })] }), testResult && (_jsx("div", { className: `test-result ${testResult.success ? 'success' : 'error'}`, children: testResult.success ? (_jsxs(_Fragment, { children: [_jsx("h4", { children: "\u2705 \u0417\u0430\u043F\u0440\u043E\u0441 \u0443\u0441\u043F\u0435\u0448\u0435\u043D!" }), _jsx("p", { children: "CORS \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E. \u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043E\u0442\u0432\u0435\u0442\u0430:" }), _jsx("div", { className: "result-headers", children: Object.entries(testResult.headers || {}).map(([k, v]) => (_jsxs("div", { className: "header-item", children: [_jsxs("code", { children: [k, ":"] }), " ", _jsx("span", { children: v })] }, k))) })] })) : (_jsxs(_Fragment, { children: [_jsx("h4", { children: "\u274C CORS Error" }), _jsx("p", { children: testResult.error }), _jsx("p", { className: "hint", children: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DevTools \u2192 Console \u0434\u043B\u044F \u0434\u0435\u0442\u0430\u043B\u0435\u0439" })] })) }))] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD0D \u041A\u0430\u043A \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C CORS \u043E\u0448\u0438\u0431\u043A\u0438" }), _jsxs("div", { className: "debug-steps", children: [_jsxs("div", { className: "debug-step", children: [_jsx("h4", { children: "1. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 DevTools \u2192 Network" }), _jsx("p", { children: "\u041D\u0430\u0439\u0434\u0438\u0442\u0435 \u043D\u0435\u0443\u0434\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0437\u0430\u043F\u0440\u043E\u0441 (\u043A\u0440\u0430\u0441\u043D\u044B\u0439)" })] }), _jsxs("div", { className: "debug-step", children: [_jsx("h4", { children: "2. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u043B\u0438\u0447\u0438\u0435 OPTIONS \u0437\u0430\u043F\u0440\u043E\u0441\u0430" }), _jsx("p", { children: "\u0414\u043B\u044F preflight \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0438\u0434\u0451\u0442 OPTIONS" })] }), _jsxs("div", { className: "debug-step", children: [_jsx("h4", { children: "3. \u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 Response Headers" }), _jsxs("p", { children: ["\u0415\u0441\u0442\u044C \u043B\u0438 ", _jsx("code", { children: "Access-Control-Allow-Origin" }), "?"] })] }), _jsxs("div", { className: "debug-step", children: [_jsx("h4", { children: "4. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 Console" }), _jsx("p", { children: "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u043F\u0438\u0448\u0435\u0442 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u0443\u044E \u043F\u0440\u0438\u0447\u0438\u043D\u0443 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438" })] })] }), _jsxs("div", { className: "common-errors", children: [_jsx("h4", { children: "\u0427\u0430\u0441\u0442\u044B\u0435 \u043E\u0448\u0438\u0431\u043A\u0438:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: "No 'Access-Control-Allow-Origin'" }), " \u2014 \u0441\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 CORS headers"] }), _jsxs("li", { children: [_jsx("code", { children: "Origin not allowed" }), " \u2014 \u0432\u0430\u0448 \u0434\u043E\u043C\u0435\u043D \u043D\u0435 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445"] }), _jsxs("li", { children: [_jsx("code", { children: "Credentials mode 'include'" }), " \u2014 \u043D\u0435\u043B\u044C\u0437\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C * \u0441 credentials"] }), _jsxs("li", { children: [_jsx("code", { children: "Method not allowed" }), " \u2014 \u043C\u0435\u0442\u043E\u0434 \u043D\u0435 \u0432 Access-Control-Allow-Methods"] })] })] })] })] })), activeDemo === 'config' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u2699\uFE0F \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430 CORS \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435" }), _jsxs("div", { className: "config-examples", children: [_jsxs("div", { className: "config-block", children: [_jsx("h4", { children: "Express.js (cors middleware)" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `import cors from 'cors';

// Разрешить всё (только для dev!)
app.use(cors());

// Продакшен настройка
app.use(cors({
  origin: ['https://myapp.com', 'https://admin.myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // кеш preflight на 24 часа
}));

// Динамический origin
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['https://myapp.com'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));` }) })] }), _jsxs("div", { className: "config-block", children: [_jsx("h4", { children: "NestJS" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// main.ts
app.enableCors({
  origin: ['https://myapp.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});` }) })] }), _jsxs("div", { className: "config-block", children: [_jsx("h4", { children: "Nginx" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `location /api/ {
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
        add_header 'Access-Control-Max-Age' 86400;
        return 204;
    }
    
    add_header 'Access-Control-Allow-Origin' 'https://myapp.com';
    add_header 'Access-Control-Allow-Credentials' 'true';
    
    proxy_pass http://backend;
}` }) })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAF \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438" }), _jsxs("div", { className: "recommendations", children: [_jsxs("div", { className: "rec do", children: [_jsx("h4", { children: "\u2705 DO" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0423\u043A\u0430\u0437\u044B\u0432\u0430\u0439\u0442\u0435 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0435 origins \u0432 production" }), _jsx("li", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 credentials: true \u0442\u043E\u043B\u044C\u043A\u043E \u0435\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u044B cookies" }), _jsx("li", { children: "\u041A\u0435\u0448\u0438\u0440\u0443\u0439\u0442\u0435 preflight (Access-Control-Max-Age)" }), _jsx("li", { children: "\u041C\u0438\u043D\u0438\u043C\u0438\u0437\u0438\u0440\u0443\u0439\u0442\u0435 \u0441\u043F\u0438\u0441\u043E\u043A \u0440\u0430\u0437\u0440\u0435\u0448\u0451\u043D\u043D\u044B\u0445 \u043C\u0435\u0442\u043E\u0434\u043E\u0432 \u0438 headers" })] })] }), _jsxs("div", { className: "rec dont", children: [_jsx("h4", { children: "\u274C DON'T" }), _jsxs("ul", { children: [_jsxs("li", { children: ["\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 ", _jsx("code", { children: "origin: '*'" }), " \u0432 production"] }), _jsx("li", { children: "\u041D\u0435 \u043E\u0442\u0440\u0430\u0436\u0430\u0439\u0442\u0435 Origin header \u0431\u0435\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438" }), _jsx("li", { children: "\u041D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0439\u0442\u0435 CORS headers \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C middleware" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD04 \u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u044B CORS" }), _jsxs("div", { className: "alternatives", children: [_jsxs("div", { className: "alt", children: [_jsx("h4", { children: "Proxy \u0441\u0435\u0440\u0432\u0435\u0440" }), _jsx("p", { children: "\u0417\u0430\u043F\u0440\u043E\u0441\u044B \u0438\u0434\u0443\u0442 \u0447\u0435\u0440\u0435\u0437 \u0432\u0430\u0448 \u0431\u044D\u043A\u0435\u043D\u0434, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0434\u0435\u043B\u0430\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441 \u043A API" }), _jsx("code", { children: "Frontend \u2192 Your Server \u2192 External API" })] }), _jsxs("div", { className: "alt", children: [_jsx("h4", { children: "JSONP (\u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E)" }), _jsxs("p", { children: ["\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 ", `<script>`, " \u0442\u0435\u0433\u0438 \u0434\u043B\u044F \u043E\u0431\u0445\u043E\u0434\u0430 CORS. \u0422\u043E\u043B\u044C\u043A\u043E GET, \u043D\u0435\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E."] })] }), _jsxs("div", { className: "alt", children: [_jsx("h4", { children: "Dev Proxy (Vite/Webpack)" }), _jsx("p", { children: "Proxy \u043D\u0430 dev \u0441\u0435\u0440\u0432\u0435\u0440\u0435 \u2014 CORS \u043D\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F" }), _jsx("div", { className: "code-block small", children: _jsx("pre", { children: `// vite.config.ts
export default {
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}` }) })] })] })] })] })), _jsx("style", { children: `
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .origin-parts {
          display: flex;
          gap: 4px;
          margin: 20px 0;
          justify-content: center;
        }
        .origin-part {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .part-value {
          font-family: monospace;
          font-size: 1.2em;
          color: var(--accent);
        }
        .part-label {
          font-size: 0.8em;
          color: var(--text-secondary);
          margin-top: 4px;
        }
        .origin-examples {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .example-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          flex-wrap: wrap;
        }
        .example-row.same {
          border-left: 3px solid var(--success);
        }
        .example-row.different {
          border-left: 3px solid var(--error);
        }
        .example-row code {
          font-size: 0.85em;
        }
        .example-row .result {
          margin-left: auto;
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .preflight-flow {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .flow-column {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .flow-column h4 {
          margin-top: 0;
        }
        .flow-column ul {
          margin: 0;
          padding-left: 20px;
        }
        .preflight-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
        }
        .diagram-step {
          display: flex;
          gap: 16px;
          width: 100%;
          max-width: 500px;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .step-num {
          width: 28px;
          height: 28px;
          background: var(--accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }
        .step-content {
          flex: 1;
        }
        .step-content code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .step-content code.method {
          color: var(--accent);
          font-weight: bold;
        }
        .step-content code.status {
          color: var(--success);
          font-weight: bold;
        }
        .diagram-arrow {
          font-size: 1.5em;
          color: var(--text-secondary);
        }
        .headers-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .header-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .header-row.header-title {
          font-weight: bold;
          background: var(--bg-code);
        }
        .warning-box {
          margin-top: 20px;
          padding: 16px;
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 8px;
        }
        .warning-box p {
          margin: 8px 0 0;
        }
        .test-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .quick-urls {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }
        .quick-urls button {
          padding: 6px 12px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.85em;
        }
        .quick-urls button:hover {
          background: var(--bg-hover);
        }
        .test-result {
          margin-top: 20px;
          padding: 20px;
          border-radius: 12px;
        }
        .test-result.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .test-result.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .test-result h4 {
          margin: 0 0 8px;
        }
        .result-headers {
          margin-top: 12px;
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
          max-height: 200px;
          overflow: auto;
        }
        .header-item {
          margin: 4px 0;
          font-size: 0.85em;
        }
        .hint {
          color: var(--text-secondary);
          font-size: 0.9em;
          font-style: italic;
        }
        .debug-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        .debug-step {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .debug-step h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .debug-step p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .common-errors {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .common-errors ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .common-errors li {
          margin-bottom: 8px;
        }
        .config-examples {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .config-block h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .recommendations {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .rec {
          padding: 20px;
          border-radius: 12px;
        }
        .rec.do {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .rec.dont {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .rec h4 {
          margin: 0 0 12px;
        }
        .rec ul {
          margin: 0;
          padding-left: 20px;
        }
        .alternatives {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .alt {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .alt h4 {
          margin: 0 0 8px;
        }
        .alt p {
          margin: 0 0 8px;
          color: var(--text-secondary);
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
      ` })] }));
}
