import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
const authMethods = [
    {
        name: 'Session + Cookie',
        description: 'Сервер создаёт сессию, ID хранится в cookie',
        pros: ['Просто реализовать', 'Автоматически отправляется браузером', 'Легко инвалидировать'],
        cons: ['Stateful — нужно хранилище сессий', 'Проблемы с масштабированием', 'CSRF уязвимость'],
        useCase: 'Традиционные веб-приложения, SSR'
    },
    {
        name: 'JWT (JSON Web Token)',
        description: 'Токен с данными пользователя, подписанный сервером',
        pros: ['Stateless', 'Масштабируется легко', 'Можно хранить данные в токене'],
        cons: ['Нельзя отозвать до истечения', 'Размер больше session ID', 'Сложнее refresh flow'],
        useCase: 'SPA, Mobile apps, Микросервисы'
    },
    {
        name: 'OAuth 2.0 / OpenID Connect',
        description: 'Делегированная авторизация через провайдера',
        pros: ['Не храните пароли', 'SSO из коробки', 'Стандарт индустрии'],
        cons: ['Сложная реализация', 'Зависимость от провайдера', 'Много редиректов'],
        useCase: '"Войти через Google/GitHub", Enterprise SSO'
    },
    {
        name: 'API Key',
        description: 'Статический ключ для идентификации приложения',
        pros: ['Очень просто', 'Хорош для server-to-server', 'Легко отозвать'],
        cons: ['Не для пользователей', 'Нет granular permissions', 'Легко утечь'],
        useCase: 'Публичные API, CLI tools, Интеграции'
    },
];
export default function AuthDemo() {
    const [activeTab, setActiveTab] = useState('methods');
    const [jwtParts, setJwtParts] = useState({
        header: '{\n  "alg": "HS256",\n  "typ": "JWT"\n}',
        payload: '{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "email": "john@example.com",\n  "iat": 1516239022,\n  "exp": 1516242622,\n  "roles": ["user", "admin"]\n}',
    });
    const tabs = [
        { id: 'methods', label: '🔐 Методы' },
        { id: 'jwt', label: '🎫 JWT' },
        { id: 'headers', label: '📋 Headers' },
        { id: 'best', label: '✨ Best Practices' },
    ];
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDD10 Authentication & Authorization" }), _jsxs("p", { className: "page-description", children: [_jsx("strong", { children: "Authentication" }), " \u2014 \u043A\u0442\u043E \u0442\u044B? ", _jsx("strong", { children: "Authorization" }), " \u2014 \u0447\u0442\u043E \u0442\u0435\u0431\u0435 \u043C\u043E\u0436\u043D\u043E?"] }), _jsx("div", { className: "tabs", children: tabs.map(tab => (_jsx("button", { className: `tab ${activeTab === tab.id ? 'active' : ''}`, onClick: () => setActiveTab(tab.id), children: tab.label }, tab.id))) }), activeTab === 'methods' && (_jsxs("div", { className: "tab-content", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD11 \u041C\u0435\u0442\u043E\u0434\u044B \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438" }), _jsx("div", { className: "methods-grid", children: authMethods.map(method => (_jsxs("div", { className: "method-card", children: [_jsx("h3", { children: method.name }), _jsx("p", { className: "method-desc", children: method.description }), _jsxs("div", { className: "pros-cons", children: [_jsxs("div", { className: "pros", children: [_jsx("strong", { children: "\u2705 \u041F\u043B\u044E\u0441\u044B" }), _jsx("ul", { children: method.pros.map(p => _jsx("li", { children: p }, p)) })] }), _jsxs("div", { className: "cons", children: [_jsx("strong", { children: "\u274C \u041C\u0438\u043D\u0443\u0441\u044B" }), _jsx("ul", { children: method.cons.map(c => _jsx("li", { children: c }, c)) })] })] }), _jsxs("div", { className: "use-case", children: [_jsx("strong", { children: "\uD83D\uDCCD \u041A\u043E\u0433\u0434\u0430:" }), " ", method.useCase] })] }, method.name))) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDF6A Session Flow" }), _jsxs("div", { className: "flow-diagram", children: [_jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "1. Login" }), _jsxs("code", { children: ["POST /login ", `{ email, password }`] })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "2. Server" }), _jsx("code", { children: "\u0421\u043E\u0437\u0434\u0430\u0451\u0442 \u0441\u0435\u0441\u0441\u0438\u044E \u0432 Redis/DB" }), _jsx("code", { children: "Set-Cookie: sessionId=abc123; HttpOnly; Secure" })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "3. \u0417\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx("code", { children: "Cookie: sessionId=abc123 (\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438)" })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "4. Server" }), _jsx("code", { children: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u0441\u0435\u0441\u0441\u0438\u044E \u0432 \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u2192 \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAB JWT Flow" }), _jsxs("div", { className: "flow-diagram", children: [_jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "1. Login" }), _jsxs("code", { children: ["POST /login ", `{ email, password }`] })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "2. Server" }), _jsx("code", { children: "\u0421\u043E\u0437\u0434\u0430\u0451\u0442 JWT \u0441 payload \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442" }), _jsx("code", { children: `{ accessToken: "eyJhbG...", refreshToken: "..." }` })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "3. \u0417\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx("code", { children: "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." })] }), _jsx("div", { className: "flow-arrow", children: "\u2193" }), _jsxs("div", { className: "flow-step", children: [_jsx("span", { className: "step-label", children: "4. Server" }), _jsx("code", { children: "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u044C \u2192 \u0447\u0438\u0442\u0430\u0435\u0442 payload \u2192 \u0433\u043E\u0442\u043E\u0432\u043E!" })] })] })] })] })), activeTab === 'jwt' && (_jsxs("div", { className: "tab-content", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAB \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 JWT" }), _jsxs("p", { children: ["JWT \u0441\u043E\u0441\u0442\u043E\u0438\u0442 \u0438\u0437 3 \u0447\u0430\u0441\u0442\u0435\u0439, \u0440\u0430\u0437\u0434\u0435\u043B\u0451\u043D\u043D\u044B\u0445 \u0442\u043E\u0447\u043A\u043E\u0439: ", _jsx("code", { children: "header.payload.signature" })] }), _jsxs("div", { className: "jwt-demo", children: [_jsxs("div", { className: "jwt-part", children: [_jsx("h4", { style: { color: '#ef4444' }, children: "Header (\u0430\u043B\u0433\u043E\u0440\u0438\u0442\u043C)" }), _jsx("textarea", { value: jwtParts.header, onChange: e => setJwtParts(p => ({ ...p, header: e.target.value })), className: "jwt-input", rows: 4 }), _jsxs("code", { className: "jwt-encoded", style: { color: '#ef4444' }, children: [btoa(jwtParts.header).replace(/=/g, '').slice(0, 30), "..."] })] }), _jsx("div", { className: "jwt-separator", children: "." }), _jsxs("div", { className: "jwt-part", children: [_jsx("h4", { style: { color: '#8b5cf6' }, children: "Payload (\u0434\u0430\u043D\u043D\u044B\u0435)" }), _jsx("textarea", { value: jwtParts.payload, onChange: e => setJwtParts(p => ({ ...p, payload: e.target.value })), className: "jwt-input", rows: 8 }), _jsxs("code", { className: "jwt-encoded", style: { color: '#8b5cf6' }, children: [btoa(jwtParts.payload).replace(/=/g, '').slice(0, 40), "..."] })] }), _jsx("div", { className: "jwt-separator", children: "." }), _jsxs("div", { className: "jwt-part", children: [_jsx("h4", { style: { color: '#10b981' }, children: "Signature" }), _jsxs("div", { className: "signature-info", children: [_jsx("code", { children: "HMACSHA256(" }), _jsx("code", { children: "  base64UrlEncode(header) + \".\" +" }), _jsx("code", { children: "  base64UrlEncode(payload)," }), _jsx("code", { children: "  your-256-bit-secret" }), _jsx("code", { children: ")" })] }), _jsx("p", { className: "note", children: "\u26A0\uFE0F \u0421\u0435\u043A\u0440\u0435\u0442 \u0437\u043D\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0435\u0440\u0432\u0435\u0440!" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u23F0 \u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 Claims" }), _jsxs("div", { className: "claims-grid", children: [_jsxs("div", { className: "claim", children: [_jsx("code", { children: "sub" }), _jsx("span", { children: "Subject \u2014 ID \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "iat" }), _jsx("span", { children: "Issued At \u2014 \u043A\u043E\u0433\u0434\u0430 \u0441\u043E\u0437\u0434\u0430\u043D" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "exp" }), _jsx("span", { children: "Expiration \u2014 \u043A\u043E\u0433\u0434\u0430 \u0438\u0441\u0442\u0435\u0447\u0451\u0442" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "nbf" }), _jsx("span", { children: "Not Before \u2014 \u043D\u0435 \u0440\u0430\u043D\u044C\u0448\u0435 \u0447\u0435\u043C" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "iss" }), _jsx("span", { children: "Issuer \u2014 \u043A\u0442\u043E \u0432\u044B\u0434\u0430\u043B" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "aud" }), _jsx("span", { children: "Audience \u2014 \u0434\u043B\u044F \u043A\u043E\u0433\u043E" })] }), _jsxs("div", { className: "claim", children: [_jsx("code", { children: "jti" }), _jsx("span", { children: "JWT ID \u2014 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 ID \u0442\u043E\u043A\u0435\u043D\u0430" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD04 Access + Refresh Tokens" }), _jsxs("div", { className: "tokens-comparison", children: [_jsxs("div", { className: "token-col", children: [_jsx("h3", { children: "Access Token" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0416\u0438\u0432\u0451\u0442 15-30 \u043C\u0438\u043D\u0443\u0442" }), _jsx("li", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441 \u043A\u0430\u0436\u0434\u044B\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u043C" }), _jsx("li", { children: "\u0425\u0440\u0430\u043D\u0438\u0442\u0441\u044F \u0432 \u043F\u0430\u043C\u044F\u0442\u0438 (JS variable)" }), _jsx("li", { children: "\u0415\u0441\u043B\u0438 \u0443\u0442\u0451\u043A \u2014 \u0441\u043A\u043E\u0440\u043E \u0438\u0441\u0442\u0435\u0447\u0451\u0442" })] })] }), _jsxs("div", { className: "token-col", children: [_jsx("h3", { children: "Refresh Token" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0416\u0438\u0432\u0451\u0442 7-30 \u0434\u043D\u0435\u0439" }), _jsx("li", { children: "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F access token" }), _jsx("li", { children: "HttpOnly cookie (\u043D\u0435 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0438\u0437 JS)" }), _jsx("li", { children: "\u041C\u043E\u0436\u043D\u043E \u043E\u0442\u043E\u0437\u0432\u0430\u0442\u044C \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435" })] })] })] }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Типичный refresh flow
async function fetchWithAuth(url, options) {
  let res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': \`Bearer \${accessToken}\`
    }
  });
  
  if (res.status === 401) {
    // Access token истёк
    const refreshRes = await fetch('/api/refresh', {
      method: 'POST',
      credentials: 'include' // отправит refresh cookie
    });
    
    if (refreshRes.ok) {
      const { accessToken: newToken } = await refreshRes.json();
      accessToken = newToken;
      // Повторяем запрос с новым токеном
      return fetch(url, { ...options, headers: { 'Authorization': \`Bearer \${newToken}\` }});
    }
    
    // Refresh тоже истёк — на логин
    logout();
  }
  
  return res;
}` }) })] })] })), activeTab === 'headers' && (_jsxs("div", { className: "tab-content", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB Authorization Header" }), _jsxs("div", { className: "auth-schemes", children: [_jsxs("div", { className: "scheme", children: [_jsx("h4", { children: "Bearer Token (JWT, OAuth)" }), _jsx("code", { children: "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." }), _jsx("p", { children: "\u0421\u0430\u043C\u044B\u0439 \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u0434\u043B\u044F API" })] }), _jsxs("div", { className: "scheme", children: [_jsx("h4", { children: "Basic Auth" }), _jsx("code", { children: "Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }), _jsx("p", { children: "Base64(username:password) \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 HTTPS!" })] }), _jsxs("div", { className: "scheme", children: [_jsx("h4", { children: "API Key (\u0432 header)" }), _jsx("code", { children: "X-API-Key: sk-1234567890abcdef" }), _jsxs("p", { children: ["\u0438\u043B\u0438 ", _jsx("code", { children: "Authorization: ApiKey sk-..." })] })] }), _jsxs("div", { className: "scheme", children: [_jsx("h4", { children: "Digest Auth" }), _jsx("code", { children: "Authorization: Digest username=\"...\", realm=\"...\", nonce=\"...\"" }), _jsx("p", { children: "\u0420\u0435\u0434\u043A\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F, \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u0435\u0435 Basic" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDF6A Cookie Flags" }), _jsxs("div", { className: "cookie-flags", children: [_jsxs("div", { className: "flag", children: [_jsx("code", { children: "HttpOnly" }), _jsx("p", { children: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0438\u0437 JavaScript \u2014 \u0437\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 XSS" }), _jsx("span", { className: "flag-must", children: "\uD83D\uDD12 \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0434\u043B\u044F auth cookies!" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "Secure" }), _jsx("p", { children: "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 HTTPS" }), _jsx("span", { className: "flag-must", children: "\uD83D\uDD12 \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u0432 production!" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "SameSite=Strict" }), _jsx("p", { children: "Cookie \u043D\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441 cross-site \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C\u0438" }), _jsx("span", { className: "flag-use", children: "\uD83D\uDEE1\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 CSRF" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "SameSite=Lax" }), _jsx("p", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441 GET \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0435" }), _jsx("span", { className: "flag-use", children: "\u2696\uFE0F \u0411\u0430\u043B\u0430\u043D\u0441 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 \u0438 UX" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "SameSite=None; Secure" }), _jsx("p", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432\u0441\u0435\u0433\u0434\u0430 (\u043D\u0443\u0436\u0435\u043D \u0434\u043B\u044F cross-site)" }), _jsx("span", { className: "flag-warn", children: "\u26A0\uFE0F \u0422\u043E\u043B\u044C\u043A\u043E \u0435\u0441\u043B\u0438 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043D\u0443\u0436\u043D\u043E" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "Max-Age / Expires" }), _jsx("p", { children: "\u0412\u0440\u0435\u043C\u044F \u0436\u0438\u0437\u043D\u0438 cookie" })] }), _jsxs("div", { className: "flag", children: [_jsx("code", { children: "Domain / Path" }), _jsx("p", { children: "\u041E\u0431\u043B\u0430\u0441\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F cookie" })] })] }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Идеальный auth cookie
Set-Cookie: refreshToken=abc123; 
  HttpOnly; 
  Secure; 
  SameSite=Strict; 
  Path=/api/refresh;
  Max-Age=604800` }) })] })] })), activeTab === 'best' && (_jsxs("div", { className: "tab-content", children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u2728 Best Practices" }), _jsxs("div", { className: "best-practices", children: [_jsxs("div", { className: "practice do", children: [_jsx("h4", { children: "\u2705 DO" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0412\u0441\u0435\u0433\u0434\u0430 HTTPS \u0432 production" }), _jsx("li", { children: "HttpOnly cookies \u0434\u043B\u044F refresh tokens" }), _jsx("li", { children: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0436\u0438\u0437\u043D\u0438 access token (15-30 \u043C\u0438\u043D)" }), _jsx("li", { children: "\u0412\u0430\u043B\u0438\u0434\u0438\u0440\u0443\u0439 \u0432\u0441\u0435 claims \u0432 JWT (exp, iss, aud)" }), _jsx("li", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 strong secrets (256+ \u0431\u0438\u0442)" }), _jsx("li", { children: "Rate limiting \u043D\u0430 login endpoint" }), _jsx("li", { children: "\u041B\u043E\u0433\u0438\u0440\u0443\u0439 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u0432\u0445\u043E\u0434\u0430" }), _jsx("li", { children: "\u0425\u0435\u0448\u0438\u0440\u0443\u0439 \u043F\u0430\u0440\u043E\u043B\u0438 (bcrypt, argon2)" })] })] }), _jsxs("div", { className: "practice dont", children: [_jsx("h4", { children: "\u274C DON'T" }), _jsxs("ul", { children: [_jsx("li", { children: "\u041D\u0435 \u0445\u0440\u0430\u043D\u0438 JWT \u0432 localStorage (XSS)" }), _jsx("li", { children: "\u041D\u0435 \u0445\u0440\u0430\u043D\u0438 \u0447\u0443\u0432\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0432 JWT payload" }), _jsx("li", { children: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 alg: none" }), _jsx("li", { children: "\u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439 \u0442\u043E\u043A\u0435\u043D\u044B \u0432 URL (?token=...)" }), _jsx("li", { children: "\u041D\u0435 \u0434\u043E\u0432\u0435\u0440\u044F\u0439 \u0434\u0430\u043D\u043D\u044B\u043C \u0438\u0437 JWT \u0431\u0435\u0437 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0438" }), _jsx("li", { children: "\u041D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043E\u0434\u0438\u043D secret \u0434\u043B\u044F \u0432\u0441\u0435\u0445 environments" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDEE1\uFE0F \u0417\u0430\u0449\u0438\u0442\u0430 \u043E\u0442 \u0430\u0442\u0430\u043A" }), _jsxs("div", { className: "attacks-grid", children: [_jsxs("div", { className: "attack", children: [_jsx("h4", { children: "XSS (Cross-Site Scripting)" }), _jsx("p", { className: "attack-desc", children: "\u0412\u043D\u0435\u0434\u0440\u0435\u043D\u0438\u0435 \u0432\u0440\u0435\u0434\u043E\u043D\u043E\u0441\u043D\u043E\u0433\u043E JS \u043A\u043E\u0434\u0430" }), _jsxs("div", { className: "protection", children: [_jsx("strong", { children: "\u0417\u0430\u0449\u0438\u0442\u0430:" }), _jsxs("ul", { children: [_jsx("li", { children: "HttpOnly cookies" }), _jsx("li", { children: "Content Security Policy (CSP)" }), _jsx("li", { children: "\u042D\u043A\u0440\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 user input" })] })] })] }), _jsxs("div", { className: "attack", children: [_jsx("h4", { children: "CSRF (Cross-Site Request Forgery)" }), _jsx("p", { className: "attack-desc", children: "\u041F\u043E\u0434\u0434\u0435\u043B\u043A\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043E\u0442 \u0438\u043C\u0435\u043D\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), _jsxs("div", { className: "protection", children: [_jsx("strong", { children: "\u0417\u0430\u0449\u0438\u0442\u0430:" }), _jsxs("ul", { children: [_jsx("li", { children: "SameSite cookies" }), _jsx("li", { children: "CSRF tokens" }), _jsx("li", { children: "\u041F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 Origin/Referer" })] })] })] }), _jsxs("div", { className: "attack", children: [_jsx("h4", { children: "\u0411\u0440\u0443\u0442\u0444\u043E\u0440\u0441" }), _jsx("p", { className: "attack-desc", children: "\u041F\u0435\u0440\u0435\u0431\u043E\u0440 \u043F\u0430\u0440\u043E\u043B\u0435\u0439" }), _jsxs("div", { className: "protection", children: [_jsx("strong", { children: "\u0417\u0430\u0449\u0438\u0442\u0430:" }), _jsxs("ul", { children: [_jsx("li", { children: "Rate limiting" }), _jsx("li", { children: "Account lockout" }), _jsx("li", { children: "CAPTCHA" }), _jsx("li", { children: "2FA" })] })] })] }), _jsxs("div", { className: "attack", children: [_jsx("h4", { children: "Token Theft" }), _jsx("p", { className: "attack-desc", children: "\u041A\u0440\u0430\u0436\u0430 \u0442\u043E\u043A\u0435\u043D\u0430" }), _jsxs("div", { className: "protection", children: [_jsx("strong", { children: "\u0417\u0430\u0449\u0438\u0442\u0430:" }), _jsxs("ul", { children: [_jsx("li", { children: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0436\u0438\u0437\u043D\u0438" }), _jsx("li", { children: "Token rotation" }), _jsx("li", { children: "Fingerprinting" }), _jsx("li", { children: "\u0410\u043D\u043E\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C" })] })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD27 \u0427\u0435\u043A\u043B\u0438\u0441\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 API" }), _jsxs("div", { className: "checklist", children: [_jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " HTTPS \u0432\u0435\u0437\u0434\u0435"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " Helmet.js (security headers)"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " Rate limiting"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " Input validation"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " Prepared statements (SQL injection)"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " CORS \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " \u041B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 security events"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " \u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0439 audit dependencies"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " Error messages \u043D\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u044E\u0442 \u0434\u0435\u0442\u0430\u043B\u0438"] }), _jsxs("label", { children: [_jsx("input", { type: "checkbox" }), " \u0421\u0435\u043A\u0440\u0435\u0442\u044B \u0432 env variables, \u043D\u0435 \u0432 \u043A\u043E\u0434\u0435"] })] })] })] })), _jsx("style", { children: `
        .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .tab {
          padding: 10px 20px;
          border: none;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s;
        }
        .tab:hover {
          background: var(--bg-hover);
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .methods-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .method-card {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
          border-left: 4px solid var(--accent);
        }
        .method-card h3 {
          margin: 0 0 8px;
        }
        .method-desc {
          color: var(--text-secondary);
          font-size: 0.9em;
          margin-bottom: 16px;
        }
        .pros-cons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          font-size: 0.85em;
        }
        .pros-cons ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .pros-cons li {
          margin-bottom: 4px;
        }
        .use-case {
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border);
          font-size: 0.9em;
        }
        .flow-diagram {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .flow-step {
          width: 100%;
          max-width: 500px;
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          text-align: center;
        }
        .flow-step code {
          display: block;
          margin: 4px 0;
        }
        .step-label {
          font-weight: bold;
          color: var(--accent);
        }
        .flow-arrow {
          font-size: 1.5em;
          color: var(--text-secondary);
        }
        .jwt-demo {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }
        .jwt-part {
          flex: 1;
          min-width: 200px;
        }
        .jwt-part h4 {
          margin: 0 0 8px;
        }
        .jwt-input {
          width: 100%;
          padding: 12px;
          border: 1px solid var(--border);
          border-radius: 8px;
          background: var(--bg-secondary);
          color: var(--text);
          font-family: monospace;
          font-size: 0.85em;
          resize: vertical;
        }
        .jwt-encoded {
          display: block;
          margin-top: 8px;
          font-size: 0.75em;
          word-break: break-all;
        }
        .jwt-separator {
          font-size: 2em;
          font-weight: bold;
          color: var(--text-secondary);
          align-self: center;
          margin-top: 40px;
        }
        .signature-info {
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
          font-family: monospace;
          font-size: 0.85em;
        }
        .signature-info code {
          display: block;
        }
        .note {
          color: var(--warning);
          font-size: 0.85em;
          margin-top: 8px;
        }
        .claims-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 12px;
        }
        .claim {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .claim code {
          color: var(--accent);
          font-weight: bold;
        }
        .claim span {
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .tokens-comparison {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }
        .token-col {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .token-col h3 {
          margin-top: 0;
        }
        .token-col ul {
          margin: 0;
          padding-left: 20px;
        }
        .auth-schemes {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .scheme {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .scheme h4 {
          margin: 0 0 8px;
        }
        .scheme code {
          display: block;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          margin-bottom: 8px;
          font-size: 0.85em;
        }
        .scheme p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.9em;
        }
        .cookie-flags {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }
        .flag {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .flag code {
          font-size: 1.1em;
          color: var(--accent);
          font-weight: bold;
        }
        .flag p {
          margin: 8px 0;
          font-size: 0.9em;
        }
        .flag-must {
          color: var(--success);
          font-size: 0.85em;
        }
        .flag-use {
          color: var(--info);
          font-size: 0.85em;
        }
        .flag-warn {
          color: var(--warning);
          font-size: 0.85em;
        }
        .best-practices {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .practice {
          padding: 20px;
          border-radius: 12px;
        }
        .practice.do {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .practice.dont {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .practice h4 {
          margin: 0 0 12px;
        }
        .practice ul {
          margin: 0;
          padding-left: 20px;
        }
        .practice li {
          margin-bottom: 8px;
        }
        .attacks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .attack {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
          border-left: 4px solid var(--error);
        }
        .attack h4 {
          margin: 0 0 8px;
          color: var(--error);
        }
        .attack-desc {
          color: var(--text-secondary);
          font-size: 0.9em;
          margin-bottom: 12px;
        }
        .protection {
          padding: 12px;
          background: var(--bg-code);
          border-radius: 8px;
        }
        .protection ul {
          margin: 8px 0 0;
          padding-left: 20px;
          font-size: 0.9em;
        }
        .checklist {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .checklist label {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: var(--bg-secondary);
          border-radius: 8px;
          cursor: pointer;
        }
        .checklist input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      ` })] }));
}
