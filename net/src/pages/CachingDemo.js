import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const cacheDirectives = [
    {
        directive: 'max-age=<seconds>',
        meaning: 'Кеш валиден N секунд',
        example: 'max-age=3600',
        useCase: 'Статические ресурсы (1 час)'
    },
    {
        directive: 'no-cache',
        meaning: 'Кешировать, но ВСЕГДА проверять на сервере',
        example: 'no-cache',
        useCase: 'Контент, который может измениться'
    },
    {
        directive: 'no-store',
        meaning: 'НИКОГДА не кешировать',
        example: 'no-store',
        useCase: 'Чувствительные данные (банкинг)'
    },
    {
        directive: 'public',
        meaning: 'Можно кешировать везде (CDN, proxy)',
        example: 'public, max-age=86400',
        useCase: 'Публичные ресурсы'
    },
    {
        directive: 'private',
        meaning: 'Только в браузере пользователя',
        example: 'private, max-age=600',
        useCase: 'Персональные данные'
    },
    {
        directive: 'must-revalidate',
        meaning: 'После истечения — обязательно проверить',
        example: 'max-age=3600, must-revalidate',
        useCase: 'Важные ресурсы'
    },
    {
        directive: 'stale-while-revalidate',
        meaning: 'Отдать старое, пока обновляем в фоне',
        example: 'max-age=60, stale-while-revalidate=30',
        useCase: 'Быстрый UX для списков'
    },
    {
        directive: 'immutable',
        meaning: 'Ресурс НИКОГДА не изменится',
        example: 'max-age=31536000, immutable',
        useCase: 'Файлы с хешем в имени'
    },
];
export default function CachingDemo() {
    const [cacheTest, setCacheTest] = useState({
        url: '/api/cache-test',
        cacheControl: 'max-age=10',
        etag: ''
    });
    const [requests, setRequests] = useState([]);
    const [requestId, setRequestId] = useState(0);
    const makeRequest = async () => {
        const start = Date.now();
        const id = requestId + 1;
        setRequestId(id);
        try {
            const headers = {};
            if (cacheTest.etag) {
                headers['If-None-Match'] = cacheTest.etag;
            }
            const res = await fetch(`/api/cache-demo?control=${encodeURIComponent(cacheTest.cacheControl)}`, {
                headers
            });
            const data = await res.json();
            const responseHeaders = {};
            res.headers.forEach((value, key) => {
                responseHeaders[key] = value;
            });
            if (responseHeaders['etag']) {
                setCacheTest(prev => ({ ...prev, etag: responseHeaders['etag'] }));
            }
            setRequests(prev => [{
                    id,
                    time: new Date().toLocaleTimeString(),
                    status: res.status,
                    cached: res.status === 304,
                    headers: responseHeaders
                }, ...prev.slice(0, 9)]);
        }
        catch (err) {
            console.error(err);
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDCBE HTTP Caching" }), _jsx("p", { className: "page-description", children: "\u041A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u2014 \u043A\u043B\u044E\u0447 \u043A \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438. \u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u043C\u043E\u0433\u0443\u0442 \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0442\u0440\u0430\u0444\u0438\u043A \u043D\u0430 90% \u0438 \u0443\u0441\u043A\u043E\u0440\u0438\u0442\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0443 \u0432 \u0440\u0430\u0437\u044B." }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCDA Cache-Control \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u044B" }), _jsx("div", { className: "table-container", children: _jsxs("table", { className: "info-table", children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0414\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u0430" }), _jsx("th", { children: "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435" }), _jsx("th", { children: "\u041F\u0440\u0438\u043C\u0435\u0440" }), _jsx("th", { children: "\u041A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C" })] }) }), _jsx("tbody", { children: cacheDirectives.map(d => (_jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: d.directive }) }), _jsx("td", { children: d.meaning }), _jsx("td", { children: _jsx("code", { className: "example", children: d.example }) }), _jsx("td", { className: "use-case", children: d.useCase })] }, d.directive))) })] }) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD04 \u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" }), _jsxs("div", { className: "cache-flow", children: [_jsxs("div", { className: "flow-step", children: [_jsx("div", { className: "step-number", children: "1" }), _jsxs("div", { className: "step-content", children: [_jsx("h4", { children: "\u041F\u0435\u0440\u0432\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441" }), _jsx("div", { className: "flow-arrow", children: "\u2192" }), _jsx("code", { children: "GET /api/data" }), _jsx("div", { className: "flow-arrow", children: "\u2190" }), _jsx("code", { children: "200 OK" }), _jsx("code", { className: "header-ex", children: "Cache-Control: max-age=3600" }), _jsx("code", { className: "header-ex", children: "ETag: \"abc123\"" })] })] }), _jsxs("div", { className: "flow-step", children: [_jsx("div", { className: "step-number", children: "2" }), _jsxs("div", { className: "step-content", children: [_jsx("h4", { children: "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441 (\u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 1 \u0447\u0430\u0441\u0430)" }), _jsx("p", { className: "cache-hit", children: "\u2705 \u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0431\u0435\u0440\u0451\u0442 \u0438\u0437 \u043A\u0435\u0448\u0430 \u2014 \u0437\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440 \u041D\u0415 \u0438\u0434\u0451\u0442!" })] })] }), _jsxs("div", { className: "flow-step", children: [_jsx("div", { className: "step-number", children: "3" }), _jsxs("div", { className: "step-content", children: [_jsx("h4", { children: "\u041F\u043E\u0441\u043B\u0435 \u0438\u0441\u0442\u0435\u0447\u0435\u043D\u0438\u044F (\u0438\u043B\u0438 no-cache)" }), _jsx("div", { className: "flow-arrow", children: "\u2192" }), _jsx("code", { children: "GET /api/data" }), _jsx("code", { className: "header-ex", children: "If-None-Match: \"abc123\"" }), _jsx("div", { className: "flow-arrow", children: "\u2190" }), _jsx("code", { children: "304 Not Modified" }), _jsx("p", { className: "cache-hit", children: "\u2705 \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u2014 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u043C \u043A\u0435\u0448" })] })] }), _jsxs("div", { className: "flow-step", children: [_jsx("div", { className: "step-number", children: "4" }), _jsxs("div", { className: "step-content", children: [_jsx("h4", { children: "\u0415\u0441\u043B\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C" }), _jsx("div", { className: "flow-arrow", children: "\u2192" }), _jsx("code", { children: "GET /api/data" }), _jsx("code", { className: "header-ex", children: "If-None-Match: \"abc123\"" }), _jsx("div", { className: "flow-arrow", children: "\u2190" }), _jsx("code", { children: "200 OK" }), _jsx("code", { className: "header-ex", children: "ETag: \"xyz789\"" }), _jsx("p", { children: "\uD83D\uDCE5 \u041F\u043E\u043B\u0443\u0447\u0430\u0435\u043C \u043D\u043E\u0432\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFF7\uFE0F ETag vs Last-Modified" }), _jsxs("div", { className: "comparison-grid", children: [_jsxs("div", { className: "comparison-col", children: [_jsx("h3", { children: "ETag (Entity Tag)" }), _jsx("p", { children: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0432\u0435\u0440\u0441\u0438\u0438 \u0440\u0435\u0441\u0443\u0440\u0441\u0430" }), _jsx("div", { className: "code-block small", children: _jsx("pre", { children: `// Response
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

// Conditional request  
If-None-Match: "33a64df..."

// Response если не изменилось
304 Not Modified` }) }), _jsxs("ul", { children: [_jsx("li", { children: "\u2705 \u0422\u043E\u0447\u043D\u0435\u0435 \u2014 \u043E\u0441\u043D\u043E\u0432\u0430\u043D \u043D\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0435" }), _jsx("li", { children: "\u2705 \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441 \u0434\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438" }), _jsx("li", { children: "\u26A0\uFE0F \u041D\u0443\u0436\u043D\u043E \u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0445\u0435\u0448" })] })] }), _jsxs("div", { className: "comparison-col", children: [_jsx("h3", { children: "Last-Modified" }), _jsx("p", { children: "\u0414\u0430\u0442\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F" }), _jsx("div", { className: "code-block small", children: _jsx("pre", { children: `// Response
Last-Modified: Wed, 21 Oct 2024 07:28:00 GMT

// Conditional request
If-Modified-Since: Wed, 21 Oct 2024...

// Response если не изменилось
304 Not Modified` }) }), _jsxs("ul", { children: [_jsx("li", { children: "\u2705 \u041F\u0440\u043E\u0441\u0442\u0430\u044F \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F" }), _jsx("li", { children: "\u2705 \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u043E \u0441\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u043C\u0438 \u0444\u0430\u0439\u043B\u0430\u043C\u0438" }), _jsx("li", { children: "\u26A0\uFE0F \u0422\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043E \u0441\u0435\u043A\u0443\u043D\u0434\u044B" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAF \u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }), _jsxs("div", { className: "strategies", children: [_jsxs("div", { className: "strategy", children: [_jsx("h4", { children: "\uD83D\uDCE6 \u0421\u0442\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0430\u0441\u0441\u0435\u0442\u044B (JS, CSS, images)" }), _jsx("code", { children: "Cache-Control: public, max-age=31536000, immutable" }), _jsx("p", { children: "\u041A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0433\u043E\u0434. \u0412\u0435\u0440\u0441\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 \u0445\u0435\u0448 \u0432 \u0438\u043C\u0435\u043D\u0438 \u0444\u0430\u0439\u043B\u0430:" }), _jsx("code", { className: "filename", children: "app.a1b2c3d4.js" })] }), _jsxs("div", { className: "strategy", children: [_jsx("h4", { children: "\uD83D\uDCC4 HTML \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" }), _jsx("code", { children: "Cache-Control: no-cache" }), _jsx("p", { children: "\u0412\u0441\u0435\u0433\u0434\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C. HTML \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0430\u0441\u0441\u0435\u0442\u044B." })] }), _jsxs("div", { className: "strategy", children: [_jsx("h4", { children: "\uD83D\uDD0C API \u0434\u0430\u043D\u043D\u044B\u0435 (\u0447\u0430\u0441\u0442\u043E \u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F)" }), _jsx("code", { children: "Cache-Control: private, max-age=0, must-revalidate" }), _jsx("p", { children: "+ ETag \u0434\u043B\u044F \u0443\u0441\u043B\u043E\u0432\u043D\u044B\u0445 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432" })] }), _jsxs("div", { className: "strategy", children: [_jsx("h4", { children: "\uD83D\uDCCA API \u0434\u0430\u043D\u043D\u044B\u0435 (\u0440\u0435\u0434\u043A\u043E \u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F)" }), _jsx("code", { children: "Cache-Control: public, max-age=60, stale-while-revalidate=30" }), _jsx("p", { children: "\u041A\u0435\u0448 \u043D\u0430 \u043C\u0438\u043D\u0443\u0442\u0443, + 30 \u0441\u0435\u043A \u043E\u0442\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0442\u0430\u0440\u043E\u0435 \u043F\u043E\u043A\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C" })] }), _jsxs("div", { className: "strategy", children: [_jsx("h4", { children: "\uD83D\uDD10 \u041F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" }), _jsx("code", { children: "Cache-Control: private, no-store" }), _jsx("p", { children: "\u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0442\u044C! \u0414\u043B\u044F \u0431\u0430\u043D\u043A\u0438\u043D\u0433\u0430, \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u044B \u0438 \u0442.\u0434." })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0442\u0435\u0441\u0442" }), _jsx("p", { children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0440\u0430\u0437\u043D\u044B\u0435 \u0434\u0438\u0440\u0435\u043A\u0442\u0438\u0432\u044B \u0438 \u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043D\u0430 \u0441\u0442\u0430\u0442\u0443\u0441 \u043E\u0442\u0432\u0435\u0442\u0430:" }), _jsxs("div", { className: "demo-controls", children: [_jsxs("div", { className: "form-group", children: [_jsx("label", { children: "Cache-Control:" }), _jsxs("select", { value: cacheTest.cacheControl, onChange: e => setCacheTest(prev => ({ ...prev, cacheControl: e.target.value, etag: '' })), className: "input", children: [_jsx("option", { value: "max-age=10", children: "max-age=10 (\u043A\u0435\u0448 10 \u0441\u0435\u043A)" }), _jsx("option", { value: "no-cache", children: "no-cache (\u0432\u0441\u0435\u0433\u0434\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0442\u044C)" }), _jsx("option", { value: "no-store", children: "no-store (\u043D\u0435 \u043A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u0442\u044C)" }), _jsx("option", { value: "max-age=60, stale-while-revalidate=30", children: "stale-while-revalidate" })] })] }), cacheTest.etag && (_jsxs("div", { className: "etag-info", children: [_jsx("strong", { children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 ETag:" }), " ", _jsx("code", { children: cacheTest.etag })] })), _jsx("button", { onClick: makeRequest, className: "btn btn-primary", children: "\uD83D\uDE80 \u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441" })] }), _jsxs("div", { className: "requests-log", children: [_jsx("h4", { children: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432:" }), requests.length === 0 ? (_jsx("p", { className: "empty", children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043A\u043D\u043E\u043F\u043A\u0443 \u0434\u043B\u044F \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" })) : (_jsx("div", { className: "requests-list", children: requests.map(r => (_jsxs("div", { className: `request-item ${r.cached ? 'cached' : ''}`, children: [_jsx("span", { className: "req-time", children: r.time }), _jsxs("span", { className: `req-status status-${r.status}`, children: [r.status, " ", r.cached ? '(from cache)' : ''] }), r.headers['cache-control'] && (_jsxs("code", { className: "req-header", children: ["Cache-Control: ", r.headers['cache-control']] })), r.headers['etag'] && (_jsxs("code", { className: "req-header", children: ["ETag: ", r.headers['etag']] }))] }, r.id))) }))] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDF10 \u041A\u0435\u0448 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435" }), _jsxs("div", { className: "info-box", children: [_jsx("strong", { children: "DevTools \u2192 Network" }), _jsx("p", { children: "\u041A\u043E\u043B\u043E\u043D\u043A\u0430 \"Size\" \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: "(disk cache)" }), " \u2014 \u0432\u0437\u044F\u0442\u043E \u0438\u0437 \u0434\u0438\u0441\u043A\u043E\u0432\u043E\u0433\u043E \u043A\u0435\u0448\u0430"] }), _jsxs("li", { children: [_jsx("code", { children: "(memory cache)" }), " \u2014 \u0438\u0437 \u043E\u043F\u0435\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0439 \u043F\u0430\u043C\u044F\u0442\u0438"] }), _jsxs("li", { children: [_jsx("code", { children: "304" }), " \u2014 \u0441\u0435\u0440\u0432\u0435\u0440 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u043B, \u0447\u0442\u043E \u043A\u0435\u0448 \u0430\u043A\u0442\u0443\u0430\u043B\u0435\u043D"] }), _jsx("li", { children: "\u0420\u0430\u0437\u043C\u0435\u0440 \u0432 \u0431\u0430\u0439\u0442\u0430\u0445 \u2014 \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u043A\u0430\u0447\u0430\u043D\u044B \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" })] })] }), _jsxs("div", { className: "info-box info-box-warning", children: [_jsx("strong", { children: "\u26A0\uFE0F Disable cache" }), _jsx("p", { children: "\u0412 DevTools \u0435\u0441\u0442\u044C \u0447\u0435\u043A\u0431\u043E\u043A\u0441 \"Disable cache\" \u2014 \u043E\u043D \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043A\u043E\u0433\u0434\u0430 DevTools \u043E\u0442\u043A\u0440\u044B\u0442!" })] })] }), _jsx("style", { children: `
        .cache-flow {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .flow-step {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .step-number {
          width: 32px;
          height: 32px;
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
        .step-content h4 {
          margin: 0 0 8px;
        }
        .step-content code {
          display: inline-block;
          margin: 2px 4px;
        }
        .header-ex {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
        }
        .flow-arrow {
          display: inline-block;
          margin: 0 8px;
          color: var(--text-secondary);
        }
        .cache-hit {
          color: var(--success);
          font-weight: 500;
          margin: 8px 0 0;
        }
        .comparison-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
        .code-block.small pre {
          font-size: 0.8em;
          padding: 12px;
        }
        .strategies {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .strategy {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          border-left: 4px solid var(--accent);
        }
        .strategy h4 {
          margin: 0 0 8px;
        }
        .strategy code {
          display: block;
          margin: 8px 0;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
        }
        .strategy p {
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: 0.9em;
        }
        .filename {
          background: rgba(16, 185, 129, 0.2) !important;
          color: #10b981 !important;
        }
        .demo-controls {
          display: flex;
          gap: 16px;
          align-items: flex-end;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .etag-info {
          padding: 8px 12px;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 0.85em;
        }
        .requests-log {
          background: var(--bg-secondary);
          border-radius: 8px;
          padding: 16px;
        }
        .requests-log h4 {
          margin: 0 0 12px;
        }
        .empty {
          color: var(--text-secondary);
          font-style: italic;
        }
        .requests-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .request-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 8px 12px;
          background: var(--bg-code);
          border-radius: 4px;
          flex-wrap: wrap;
        }
        .request-item.cached {
          border-left: 3px solid var(--success);
        }
        .req-time {
          color: var(--text-secondary);
          font-size: 0.85em;
        }
        .req-status {
          font-weight: 600;
        }
        .status-200 { color: var(--success); }
        .status-304 { color: #8b5cf6; }
        .req-header {
          font-size: 0.8em;
          color: var(--text-secondary);
        }
        .use-case {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .example {
          font-size: 0.85em;
        }
      ` })] }));
}
