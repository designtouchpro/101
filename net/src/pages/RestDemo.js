import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import CodeBlock from '../components/CodeBlock';
import NetworkVisualizer from '../components/NetworkVisualizer';
import RequestFlow from '../components/RequestFlow';
export default function RestDemo() {
    const { data, error, loading, status, statusText, time, fetchApi } = useApi();
    const [method, setMethod] = useState('GET');
    const [endpoint, setEndpoint] = useState('/api/users');
    const [body, setBody] = useState('{\n  "name": "Новый пользователь",\n  "email": "new@example.com",\n  "role": "user"\n}');
    const [steps, setSteps] = useState([]);
    const [history, setHistory] = useState([]);
    const executeRequest = async () => {
        // Начинаем визуализацию шагов
        setSteps([
            { label: 'Формирование запроса', status: 'active' },
            { label: 'Отправка', status: 'pending' },
            { label: 'Обработка на сервере', status: 'pending' },
            { label: 'Получение ответа', status: 'pending' },
        ]);
        await new Promise(r => setTimeout(r, 300));
        setSteps(prev => prev.map((s, i) => i === 0 ? { ...s, status: 'completed' } :
            i === 1 ? { ...s, status: 'active' } : s));
        await new Promise(r => setTimeout(r, 200));
        setSteps(prev => prev.map((s, i) => i === 1 ? { ...s, status: 'completed' } :
            i === 2 ? { ...s, status: 'active' } : s));
        const options = { method };
        if (['POST', 'PUT'].includes(method)) {
            options.body = body;
        }
        const result = await fetchApi(endpoint, options);
        setSteps(prev => prev.map((s, i) => i === 2 ? { ...s, status: 'completed' } :
            i === 3 ? { ...s, status: result.error ? 'error' : 'completed', detail: `${result.status} ${result.statusText}` } : s));
        if (result.status) {
            setHistory(prev => [
                { method, endpoint, status: result.status, time: result.time },
                ...prev.slice(0, 9)
            ]);
        }
    };
    const presetRequests = [
        { method: 'GET', endpoint: '/api/users', label: 'Получить пользователей' },
        { method: 'GET', endpoint: '/api/users/1', label: 'Получить пользователя по ID' },
        { method: 'GET', endpoint: '/api/posts', label: 'Получить посты' },
        { method: 'POST', endpoint: '/api/users', label: 'Создать пользователя' },
        { method: 'PUT', endpoint: '/api/users/1', label: 'Обновить пользователя' },
        { method: 'DELETE', endpoint: '/api/users/3', label: 'Удалить пользователя' },
    ];
    return (_jsxs("div", { className: "demo-container", children: [_jsxs("div", { className: "demo-header", children: [_jsx("h1", { children: "\uD83D\uDCE1 REST API" }), _jsx("p", { children: "REST (Representational State Transfer) \u2014 \u0430\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F \u043F\u043E\u0441\u0442\u0440\u043E\u0435\u043D\u0438\u044F \u0432\u0435\u0431-\u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432. \u0420\u0435\u0441\u0443\u0440\u0441\u044B \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u0446\u0438\u0440\u0443\u044E\u0442\u0441\u044F URL, \u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u044E\u0442\u0441\u044F \u0447\u0435\u0440\u0435\u0437 HTTP \u043C\u0435\u0442\u043E\u0434\u044B." })] }), _jsxs("section", { className: "card theory-card", children: [_jsx("h2", { children: "\uD83D\uDCDA \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438" }), _jsxs("div", { className: "concept-grid", children: [_jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 HTTP \u041C\u0435\u0442\u043E\u0434\u044B" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "GET" }), " \u2014 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445"] }), _jsxs("li", { children: [_jsx("strong", { children: "POST" }), " \u2014 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u0443\u0440\u0441\u0430"] }), _jsxs("li", { children: [_jsx("strong", { children: "PUT" }), " \u2014 \u043F\u043E\u043B\u043D\u043E\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435"] }), _jsxs("li", { children: [_jsx("strong", { children: "PATCH" }), " \u2014 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435"] }), _jsxs("li", { children: [_jsx("strong", { children: "DELETE" }), " \u2014 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435"] })] })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u0421\u0442\u0430\u0442\u0443\u0441-\u043A\u043E\u0434\u044B" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "2xx" }), " \u2014 \u0443\u0441\u043F\u0435\u0445 (200, 201, 204)"] }), _jsxs("li", { children: [_jsx("strong", { children: "3xx" }), " \u2014 \u0440\u0435\u0434\u0438\u0440\u0435\u043A\u0442"] }), _jsxs("li", { children: [_jsx("strong", { children: "4xx" }), " \u2014 \u043E\u0448\u0438\u0431\u043A\u0430 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 (400, 401, 404)"] }), _jsxs("li", { children: [_jsx("strong", { children: "5xx" }), " \u2014 \u043E\u0448\u0438\u0431\u043A\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430"] })] })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u041F\u0440\u0438\u043D\u0446\u0438\u043F\u044B REST" }), _jsxs("ul", { children: [_jsx("li", { children: "Stateless \u2014 \u0431\u0435\u0437 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F" }), _jsx("li", { children: "Uniform Interface \u2014 \u0435\u0434\u0438\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441" }), _jsx("li", { children: "Cacheable \u2014 \u043A\u0435\u0448\u0438\u0440\u0443\u0435\u043C\u043E\u0441\u0442\u044C" }), _jsx("li", { children: "Client-Server \u2014 \u0440\u0430\u0437\u0434\u0435\u043B\u0435\u043D\u0438\u0435" })] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA \u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u0437\u0430\u043F\u0440\u043E\u0441" }), _jsx("div", { className: "preset-buttons", children: presetRequests.map((preset, i) => (_jsxs("button", { className: `preset-btn preset-btn-${preset.method.toLowerCase()}`, onClick: () => {
                                setMethod(preset.method);
                                setEndpoint(preset.endpoint);
                            }, children: [_jsx("span", { className: `method-badge method-${preset.method.toLowerCase()}`, children: preset.method }), preset.label] }, i))) }), _jsxs("div", { className: "request-builder", children: [_jsxs("div", { className: "request-line", children: [_jsxs("select", { value: method, onChange: e => setMethod(e.target.value), className: `method-select method-select-${method.toLowerCase()}`, children: [_jsx("option", { value: "GET", children: "GET" }), _jsx("option", { value: "POST", children: "POST" }), _jsx("option", { value: "PUT", children: "PUT" }), _jsx("option", { value: "DELETE", children: "DELETE" })] }), _jsx("input", { type: "text", value: endpoint, onChange: e => setEndpoint(e.target.value), className: "endpoint-input", placeholder: "/api/..." }), _jsx("button", { onClick: executeRequest, disabled: loading, className: "send-btn", children: loading ? '⏳ Отправка...' : '🚀 Отправить' })] }), ['POST', 'PUT'].includes(method) && (_jsxs("div", { className: "request-body", children: [_jsx("label", { children: "Request Body (JSON):" }), _jsx("textarea", { value: body, onChange: e => setBody(e.target.value), rows: 6, className: "body-textarea" })] }))] }), steps.length > 0 && (_jsxs("div", { className: "flow-section", children: [_jsx("h3", { children: "\u041F\u043E\u0442\u043E\u043A \u0437\u0430\u043F\u0440\u043E\u0441\u0430" }), _jsx(RequestFlow, { steps: steps })] })), _jsx(NetworkVisualizer, { requestData: {
                            method,
                            url: endpoint,
                            body: ['POST', 'PUT'].includes(method) ? JSON.parse(body || '{}') : undefined
                        }, responseData: data ? {
                            status,
                            statusText,
                            body: data,
                            time
                        } : undefined, isLoading: loading }), (data || error) && (_jsxs("div", { className: "response-section", children: [_jsxs("div", { className: "response-header", children: [_jsx("h3", { children: "\u041E\u0442\u0432\u0435\u0442 \u0441\u0435\u0440\u0432\u0435\u0440\u0430" }), status && (_jsxs("span", { className: `status-badge status-${Math.floor(status / 100)}xx`, children: [status, " ", statusText] })), time && _jsxs("span", { className: "time-badge", children: ["\u23F1\uFE0F ", time, "ms"] })] }), _jsx(CodeBlock, { code: JSON.stringify(data || { error }, null, 2), language: "json" })] }))] }), history.length > 0 && (_jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCDC \u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432" }), _jsx("div", { className: "history-list", children: history.map((item, i) => (_jsxs("div", { className: "history-item", children: [_jsx("span", { className: `method-badge method-${item.method.toLowerCase()}`, children: item.method }), _jsx("span", { className: "history-endpoint", children: item.endpoint }), _jsx("span", { className: `status-badge status-${Math.floor(item.status / 100)}xx`, children: item.status }), _jsxs("span", { className: "history-time", children: [item.time, "ms"] })] }, i))) })] })), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCBB \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043A\u043E\u0434\u0430" }), _jsxs("div", { className: "code-examples", children: [_jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "Fetch API (JavaScript)" }), _jsx(CodeBlock, { language: "javascript", code: `// GET запрос
const response = await fetch('/api/users');
const users = await response.json();

// POST запрос
const newUser = await fetch('/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Новый пользователь',
    email: 'user@example.com'
  })
});

// PUT запрос
await fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Обновлённое имя' })
});

// DELETE запрос
await fetch('/api/users/1', { method: 'DELETE' });` })] }), _jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "Axios" }), _jsx(CodeBlock, { language: "javascript", code: `import axios from 'axios';

// GET
const { data: users } = await axios.get('/api/users');

// POST
const { data: newUser } = await axios.post('/api/users', {
  name: 'Новый пользователь',
  email: 'user@example.com'
});

// PUT
await axios.put('/api/users/1', { name: 'Обновлённое имя' });

// DELETE
await axios.delete('/api/users/1');` })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u044D\u043D\u0434\u043F\u043E\u0438\u043D\u0442\u044B" }), _jsx("div", { className: "endpoints-table", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u041C\u0435\u0442\u043E\u0434" }), _jsx("th", { children: "Endpoint" }), _jsx("th", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-get", children: "GET" }) }), _jsx("td", { children: _jsx("code", { children: "/api/users" }) }), _jsx("td", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-get", children: "GET" }) }), _jsx("td", { children: _jsx("code", { children: "/api/users/:id" }) }), _jsx("td", { children: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043F\u043E ID" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-post", children: "POST" }) }), _jsx("td", { children: _jsx("code", { children: "/api/users" }) }), _jsx("td", { children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-put", children: "PUT" }) }), _jsx("td", { children: _jsx("code", { children: "/api/users/:id" }) }), _jsx("td", { children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-delete", children: "DELETE" }) }), _jsx("td", { children: _jsx("code", { children: "/api/users/:id" }) }), _jsx("td", { children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-get", children: "GET" }) }), _jsx("td", { children: _jsx("code", { children: "/api/posts" }) }), _jsx("td", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u043F\u043E\u0441\u0442\u043E\u0432" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("span", { className: "method-badge method-get", children: "GET" }) }), _jsx("td", { children: _jsx("code", { children: "/api/posts/:id" }) }), _jsx("td", { children: "\u041F\u043E\u0441\u0442 \u043F\u043E ID (\u0441 \u0430\u0432\u0442\u043E\u0440\u043E\u043C)" })] })] })] }) })] })] }));
}
