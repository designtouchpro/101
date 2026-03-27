import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export default function SecurityDemo() {
    const [directResult, setDirectResult] = useState(null);
    const [directError, setDirectError] = useState(null);
    const [proxyResult, setProxyResult] = useState(null);
    const [proxyError, setProxyError] = useState(null);
    const fetchDirect = async () => {
        setDirectResult(null);
        setDirectError(null);
        try {
            // Прямой запрос на порт сервера (3206)
            // Браузер заблокирует это, так как Origin (3205) != Server (3206)
            // и сервер не присылает заголовки Access-Control-Allow-Origin
            const res = await fetch('http://localhost:3206/api/demo/no-cors');
            const data = await res.json();
            setDirectResult(JSON.stringify(data, null, 2));
        }
        catch (err) {
            setDirectError('Ошибка запроса! (Скорее всего CORS заблокировал доступ)');
            console.error(err);
        }
    };
    const fetchProxy = async () => {
        setProxyResult(null);
        setProxyError(null);
        try {
            // Запрос через Vite Proxy
            // Для браузера это запрос на тот же домен (localhost:3205/api/...)
            // Vite под капотом пересылает его на 3206.
            const res = await fetch('/api/demo/no-cors');
            const data = await res.json();
            setProxyResult(JSON.stringify(data, null, 2));
        }
        catch (err) {
            setProxyError('Ошибка запроса');
            console.error(err);
        }
    };
    return (_jsxs("div", { className: "page-container", children: [_jsxs("div", { className: "page-header", children: [_jsx("h2", { children: "\uD83D\uDEE1 Security & Network Demo" }), _jsx("p", { children: "\u0414\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u044F \u0440\u0430\u0431\u043E\u0442\u044B CORS \u0438 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 Proxy \u0432 Vite" })] }), _jsxs("div", { className: "card", children: [_jsx("h3", { children: "CORS (Cross-Origin Resource Sharing)" }), _jsxs("p", { className: "description", children: ["\u0411\u0440\u0430\u0443\u0437\u0435\u0440\u044B \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u044E\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u043A \u0434\u0440\u0443\u0433\u0438\u043C \u0434\u043E\u043C\u0435\u043D\u0430\u043C (\u0438\u043B\u0438 \u043F\u043E\u0440\u0442\u0430\u043C), \u0435\u0441\u043B\u0438 \u0441\u0435\u0440\u0432\u0435\u0440 \u044F\u0432\u043D\u043E \u044D\u0442\u043E\u0433\u043E \u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0430\u0435\u0442.", _jsx("br", {}), "\u0421\u0435\u0440\u0432\u0435\u0440 (\u043F\u043E\u0440\u0442 3206) \u0438\u043C\u0435\u0435\u0442 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439 \u044D\u043D\u0434\u043F\u043E\u0438\u043D\u0442 ", _jsx("code", { children: "/api/demo/no-cors" }), ", \u043A\u043E\u0442\u043E\u0440\u044B\u0439 ", _jsx("b", { children: "\u043D\u0435 \u0432\u044B\u0434\u0430\u0435\u0442" }), " \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 CORS."] }), _jsxs("div", { className: "grid-2", children: [_jsxs("div", { className: "demo-box", children: [_jsx("h4", { children: "\uD83D\uDD34 \u041F\u0440\u044F\u043C\u043E\u0439 \u0437\u0430\u043F\u0440\u043E\u0441" }), _jsx("p", { className: "small-text", children: "GET http://localhost:3206/api/demo/no-cors" }), _jsx("p", { className: "small-text", children: "\u0421 \u043F\u043E\u0440\u0442\u0430 3205 \u043D\u0430 \u043F\u043E\u0440\u0442 3206 \u0431\u0435\u0437 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432." }), _jsx("button", { onClick: fetchDirect, className: "action-btn error-btn", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441" }), directError && _jsx("div", { className: "result-box error", children: directError }), directResult && _jsx("pre", { className: "result-box success", children: directResult }), _jsxs("div", { className: "explanation", children: [_jsx("strong", { children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u043E\u0448\u0438\u0431\u043A\u0430?" }), _jsx("br", {}), "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0432\u0438\u0434\u0438\u0442, \u0447\u0442\u043E Origin \u043E\u0442\u043B\u0438\u0447\u0430\u0435\u0442\u0441\u044F, \u0430 \u0441\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043F\u0440\u0438\u0441\u043B\u0430\u043B \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", _jsx("code", { children: "Access-Control-Allow-Origin" }), ". \u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0437\u0430\u043F\u0440\u0435\u0449\u0430\u0435\u0442 \u0441\u043A\u0440\u0438\u043F\u0442\u0443 \u0447\u0438\u0442\u0430\u0442\u044C \u043E\u0442\u0432\u0435\u0442 \u0440\u0430\u0434\u0438 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438."] })] }), _jsxs("div", { className: "demo-box", children: [_jsx("h4", { children: "\uD83D\uDFE2 \u0417\u0430\u043F\u0440\u043E\u0441 \u0447\u0435\u0440\u0435\u0437 Proxy" }), _jsx("p", { className: "small-text", children: "GET /api/demo/no-cors" }), _jsx("p", { className: "small-text", children: "\u0411\u0440\u0430\u0443\u0437\u0435\u0440 \u0434\u0443\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0437\u0430\u043F\u0440\u043E\u0441 \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0439 (Same-Origin)." }), _jsx("button", { onClick: fetchProxy, className: "action-btn success-btn", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u043F\u0440\u043E\u0441" }), proxyError && _jsx("div", { className: "result-box error", children: proxyError }), proxyResult && _jsx("pre", { className: "result-box success", children: proxyResult }), _jsxs("div", { className: "explanation", children: [_jsx("strong", { children: "\u041F\u043E\u0447\u0435\u043C\u0443 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442?" }), _jsx("br", {}), "\u0417\u0430\u043F\u0440\u043E\u0441 \u0438\u0434\u0435\u0442 \u043D\u0430 ", _jsx("code", { children: "localhost:3205" }), ". Vite \u043F\u0435\u0440\u0435\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u0435\u0442 \u0435\u0433\u043E \u0438 \u0441\u0430\u043C \u0438\u0434\u0435\u0442 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440 3206 (\u0441\u0435\u0440\u0432\u0435\u0440-\u0441\u0435\u0440\u0432\u0435\u0440 \u043E\u0431\u0449\u0435\u043D\u0438\u0435). CORS \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435."] })] })] })] })] }));
}
