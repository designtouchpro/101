import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function StatusDemo() {
    const [result, setResult] = useState(null);
    const [loadingCode, setLoadingCode] = useState(null);
    const fetchStatus = async (code) => {
        setLoadingCode(code);
        setResult(null);
        try {
            const res = await fetch(`/api/status/${code}`);
            // Читаем body даже если статус ошибка
            // (fetch не кидает reject на 404/500, только на network error)
            const data = await res.json();
            setResult({
                status: res.status,
                ok: res.ok,
                statusText: res.statusText,
                data
            });
        }
        catch (e) {
            setResult({ error: e.message });
        }
        finally {
            setLoadingCode(null);
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsx("h2", { children: "HTTP Status Codes" }), _jsx("p", { children: "\u0418\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A fetch \u043E\u0431\u0440\u0430\u0431\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0440\u0430\u0437\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u0443\u0441\u044B." }), _jsxs("div", { className: "grid-2", children: [_jsxs("div", { className: "card", children: [_jsx("h3", { children: "Success (2xx)" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { onClick: () => fetchStatus(200), children: "200 OK" }), _jsx("button", { onClick: () => fetchStatus(201), children: "201 Created" }), _jsx("button", { onClick: () => fetchStatus(204), children: "204 No Content" })] }), _jsx("h3", { children: "Errors (4xx)" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { onClick: () => fetchStatus(400), className: "error-btn", children: "400 Bad Req" }), _jsx("button", { onClick: () => fetchStatus(401), className: "error-btn", children: "401 Unauth" }), _jsx("button", { onClick: () => fetchStatus(403), className: "error-btn", children: "403 Forbidden" }), _jsx("button", { onClick: () => fetchStatus(404), className: "error-btn", children: "404 Not Found" }), _jsx("button", { onClick: () => fetchStatus(429), className: "error-btn", children: "429 Too Many" })] }), _jsx("h3", { children: "Server Errors (5xx)" }), _jsxs("div", { className: "button-group", children: [_jsx("button", { onClick: () => fetchStatus(500), className: "error-btn", children: "500 Internal" }), _jsx("button", { onClick: () => fetchStatus(502), className: "error-btn", children: "502 Bad Gateway" }), _jsx("button", { onClick: () => fetchStatus(503), className: "error-btn", children: "503 Service Unav" })] })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "Response" }), loadingCode && _jsx("div", { children: "Loading..." }), result && (_jsxs("div", { className: `status-result ${result.ok ? 'success' : 'error'}`, children: [_jsxs("div", { className: "status-badge", children: [result.status, " ", result.statusText] }), _jsx("pre", { children: JSON.stringify(result, null, 2) }), _jsxs("div", { className: "explanation", children: [_jsx("strong", { children: "\u041E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0432 fetch:" }), result.ok
                                                ? _jsxs("p", { children: ["\u2705 ", _jsx("code", { children: "res.ok === true" }), ". \u041A\u043E\u0434 \u0432 \u0434\u0438\u0430\u043F\u0430\u0437\u043E\u043D\u0435 200-299. Promise resolved \u0443\u0441\u043F\u0435\u0448\u043D\u043E."] })
                                                : _jsxs("p", { children: ["\u26A0\uFE0F ", _jsx("code", { children: "res.ok === false" }), ". Fetch ", _jsx("b", { children: "\u041D\u0415" }), " \u0432\u044B\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u0438\u0441\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 (catch \u043D\u0435 \u0441\u0440\u0430\u0431\u043E\u0442\u0430\u043B), \u0432\u044B \u0434\u043E\u043B\u0436\u043D\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C ", _jsx("code", { children: "if (!res.ok)" }), " \u0432\u0440\u0443\u0447\u043D\u0443\u044E!"] })] })] }))] })] })] }));
}
