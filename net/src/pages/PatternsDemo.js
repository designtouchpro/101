import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
export default function PatternsDemo() {
    const [activeSection, setActiveSection] = useState('pagination');
    const sections = [
        { id: 'pagination', label: '📄 Пагинация' },
        { id: 'filtering', label: '🔍 Фильтрация' },
        { id: 'errors', label: '⚠️ Ошибки' },
        { id: 'versioning', label: '🏷️ Версионирование' },
        { id: 'rate', label: '⏱️ Rate Limiting' },
    ];
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDCD0 API Design Patterns" }), _jsx("p", { className: "page-description", children: "\u041F\u0430\u0442\u0442\u0435\u0440\u043D\u044B \u043F\u0440\u043E\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F API, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0434\u0435\u043B\u0430\u044E\u0442 \u0432\u0430\u0448\u0443 \u0436\u0438\u0437\u043D\u044C (\u0438 \u0436\u0438\u0437\u043D\u044C \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0435\u0439) \u043F\u0440\u043E\u0449\u0435." }), _jsx("div", { className: "tabs", children: sections.map(s => (_jsx("button", { className: `tab ${activeSection === s.id ? 'active' : ''}`, onClick: () => setActiveSection(s.id), children: s.label }, s.id))) }), activeSection === 'pagination' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCC4 \u041F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u044F" }), _jsx("p", { children: "\u0421\u043F\u043E\u0441\u043E\u0431\u044B \u0440\u0430\u0437\u0431\u0438\u0435\u043D\u0438\u044F \u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u0441\u043F\u0438\u0441\u043A\u043E\u0432 \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" }), _jsxs("div", { className: "patterns-grid", children: [_jsxs("div", { className: "pattern-card", children: [_jsx("h3", { children: "Offset Pagination" }), _jsx("code", { className: "endpoint", children: "GET /users?limit=20&offset=40" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Response
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 40,
    "hasMore": true
  }
}` }) }), _jsxs("div", { className: "pros-cons", children: [_jsxs("div", { className: "pros", children: [_jsx("strong", { children: "\u2705" }), " \u041F\u0440\u043E\u0441\u0442\u043E, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u044B\u0433\u0430\u0442\u044C \u043D\u0430 \u043B\u044E\u0431\u0443\u044E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443"] }), _jsxs("div", { className: "cons", children: [_jsx("strong", { children: "\u274C" }), " \u041F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438/\u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0438, \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E \u043D\u0430 \u0431\u043E\u043B\u044C\u0448\u0438\u0445 offset"] })] })] }), _jsxs("div", { className: "pattern-card", children: [_jsx("h3", { children: "Cursor Pagination" }), _jsx("code", { className: "endpoint", children: "GET /users?limit=20&cursor=eyJpZCI6MTAwfQ" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Response
{
  "data": [...],
  "pagination": {
    "nextCursor": "eyJpZCI6MTIwfQ",
    "prevCursor": "eyJpZCI6MTAwfQ",
    "hasMore": true
  }
}

// Cursor = base64({"id": 100})
// или просто ID последнего элемента` }) }), _jsxs("div", { className: "pros-cons", children: [_jsxs("div", { className: "pros", children: [_jsx("strong", { children: "\u2705" }), " \u0421\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F\u0445, \u0431\u044B\u0441\u0442\u0440\u043E"] }), _jsxs("div", { className: "cons", children: [_jsx("strong", { children: "\u274C" }), " \u041D\u0435\u043B\u044C\u0437\u044F \u043F\u0440\u044B\u0433\u0430\u0442\u044C \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443, \u0441\u043B\u043E\u0436\u043D\u0435\u0435 \u0440\u0435\u0430\u043B\u0438\u0437\u043E\u0432\u0430\u0442\u044C"] })] })] }), _jsxs("div", { className: "pattern-card", children: [_jsx("h3", { children: "Keyset Pagination" }), _jsx("code", { className: "endpoint", children: "GET /users?limit=20&created_after=2024-01-01" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Для сортировки по дате/ID
SELECT * FROM users
WHERE created_at > '2024-01-01'
ORDER BY created_at
LIMIT 20

// Быстрее чем OFFSET на миллионах записей` }) }), _jsxs("div", { className: "pros-cons", children: [_jsxs("div", { className: "pros", children: [_jsx("strong", { children: "\u2705" }), " \u0421\u0430\u043C\u044B\u0439 \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431"] }), _jsxs("div", { className: "cons", children: [_jsx("strong", { children: "\u274C" }), " \u0422\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F"] })] })] })] }), _jsxs("div", { className: "recommendation-box", children: [_jsx("strong", { children: "\uD83D\uDCA1 \u0420\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F:" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("strong", { children: "Offset" }), " \u2014 \u0434\u043B\u044F \u0430\u0434\u043C\u0438\u043D\u043E\u043A \u0438 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u043E\u0432"] }), _jsxs("li", { children: [_jsx("strong", { children: "Cursor" }), " \u2014 \u0434\u043B\u044F \u0444\u0438\u0434\u043E\u0432, \u0441\u043F\u0438\u0441\u043A\u043E\u0432 \u0441 real-time \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F\u043C\u0438"] }), _jsxs("li", { children: [_jsx("strong", { children: "Keyset" }), " \u2014 \u0434\u043B\u044F \u0431\u043E\u043B\u044C\u0448\u0438\u0445 \u0434\u0430\u0442\u0430\u0441\u0435\u0442\u043E\u0432 \u0441 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u043E\u0439"] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCD0 \u0424\u043E\u0440\u043C\u0430\u0442 \u043E\u0442\u0432\u0435\u0442\u0430 \u043F\u0430\u0433\u0438\u043D\u0430\u0446\u0438\u0438" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Стиль 1: Метаданные в корне
{
  "data": [...],
  "meta": {
    "total": 1000,
    "page": 3,
    "perPage": 20,
    "lastPage": 50
  },
  "links": {
    "first": "/users?page=1",
    "last": "/users?page=50",
    "prev": "/users?page=2",
    "next": "/users?page=4"
  }
}

// Стиль 2: Envelope
{
  "users": [...],
  "pagination": {
    "total": 1000,
    "limit": 20,
    "offset": 40
  }
}

// Стиль 3: Link header (GitHub style)
Link: <https://api.example.com/users?page=3>; rel="next",
      <https://api.example.com/users?page=50>; rel="last"` }) })] })] })), activeSection === 'filtering' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD0D \u0424\u0438\u043B\u044C\u0442\u0440\u0430\u0446\u0438\u044F \u0438 \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430" }), _jsxs("div", { className: "filter-patterns", children: [_jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "Simple Query Params" }), _jsx("code", { children: "GET /users?status=active&role=admin" }), _jsx("p", { children: "\u041F\u0440\u043E\u0441\u0442\u044B\u0435 equality \u0444\u0438\u043B\u044C\u0442\u0440\u044B" })] }), _jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "Comparison Operators" }), _jsx("code", { children: "GET /products?price[gte]=100&price[lte]=500" }), _jsxs("p", { children: ["\u0438\u043B\u0438 ", _jsx("code", { children: "?price_min=100&price_max=500" })] })] }), _jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "Array Values" }), _jsx("code", { children: "GET /users?roles[]=admin&roles[]=moderator" }), _jsxs("p", { children: ["\u0438\u043B\u0438 ", _jsx("code", { children: "?roles=admin,moderator" })] })] }), _jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "Full-text Search" }), _jsx("code", { children: "GET /products?q=wireless+headphones" }), _jsx("p", { children: "\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C \u043F\u043E\u043B\u044F\u043C" })] }), _jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0430" }), _jsx("code", { children: "GET /products?sort=price&order=asc" }), _jsxs("p", { children: ["\u0438\u043B\u0438 ", _jsx("code", { children: "?sort=-price" }), " (\u043C\u0438\u043D\u0443\u0441 = desc)"] }), _jsxs("p", { children: ["\u0438\u043B\u0438 ", _jsx("code", { children: "?sort=price:desc,name:asc" })] })] }), _jsxs("div", { className: "filter-pattern", children: [_jsx("h4", { children: "Field Selection" }), _jsx("code", { children: "GET /users?fields=id,name,email" }), _jsx("p", { children: "\u0412\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0435 \u043F\u043E\u043B\u044F (partial response)" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCA \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 API" }), _jsxs("div", { className: "api-examples", children: [_jsxs("div", { className: "api-example", children: [_jsx("h4", { children: "GitHub" }), _jsx("code", { children: "GET /repos?sort=updated&direction=desc&per_page=30" })] }), _jsxs("div", { className: "api-example", children: [_jsx("h4", { children: "Stripe" }), _jsx("code", { children: "GET /charges?created[gte]=1609459200&limit=100" })] }), _jsxs("div", { className: "api-example", children: [_jsx("h4", { children: "Shopify" }), _jsx("code", { children: "GET /products.json?status=active&vendor=Nike&fields=id,title" })] }), _jsxs("div", { className: "api-example", children: [_jsx("h4", { children: "JSON:API spec" }), _jsx("code", { children: "GET /articles?filter[author]=john&sort=-created&include=comments" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD17 Include / Expand" }), _jsx("p", { children: "\u0412\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0432 \u043E\u0442\u0432\u0435\u0442 (\u0438\u0437\u0431\u0435\u0433\u0430\u0435\u043C N+1 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432)" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Без include
GET /posts/123
{ "id": 123, "title": "...", "authorId": 1 }

GET /users/1  // Ещё один запрос для автора
{ "id": 1, "name": "John" }

// С include
GET /posts/123?include=author,comments
{
  "id": 123,
  "title": "...",
  "author": { "id": 1, "name": "John" },
  "comments": [
    { "id": 1, "text": "Great post!" }
  ]
}

// Или expand (Stripe style)
GET /charges/ch_123?expand[]=customer&expand[]=invoice` }) })] })] })), activeSection === 'errors' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u26A0\uFE0F Error Handling" }), _jsx("p", { children: "\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0442\u044C \u043E\u0448\u0438\u0431\u043A\u0438 \u0432 API" }), _jsxs("div", { className: "error-format", children: [_jsx("h4", { children: "RFC 7807 - Problem Details" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Стандартизированный формат ошибок
HTTP/1.1 400 Bad Request
Content-Type: application/problem+json

{
  "type": "https://api.example.com/errors/validation",
  "title": "Validation Error",
  "status": 400,
  "detail": "The request body contains invalid data",
  "instance": "/users/123",
  "errors": [
    {
      "field": "email",
      "code": "invalid_format",
      "message": "Invalid email format"
    },
    {
      "field": "age",
      "code": "out_of_range",
      "message": "Age must be between 0 and 150"
    }
  ],
  "traceId": "abc-123-xyz"
}` }) })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB HTTP Status Codes \u0434\u043B\u044F \u043E\u0448\u0438\u0431\u043E\u043A" }), _jsxs("div", { className: "status-grid", children: [_jsxs("div", { className: "status-group", children: [_jsx("h4", { children: "4xx \u2014 Client Errors" }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "400" }), _jsx("span", { children: "Bad Request \u2014 \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "401" }), _jsx("span", { children: "Unauthorized \u2014 \u0442\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "403" }), _jsx("span", { children: "Forbidden \u2014 \u0434\u043E\u0441\u0442\u0443\u043F \u0437\u0430\u043F\u0440\u0435\u0449\u0451\u043D" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "404" }), _jsx("span", { children: "Not Found \u2014 \u0440\u0435\u0441\u0443\u0440\u0441 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "409" }), _jsx("span", { children: "Conflict \u2014 \u043A\u043E\u043D\u0444\u043B\u0438\u043A\u0442 (\u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442)" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "422" }), _jsx("span", { children: "Unprocessable Entity \u2014 \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F \u043D\u0435 \u043F\u0440\u043E\u0448\u043B\u0430" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "429" }), _jsx("span", { children: "Too Many Requests \u2014 rate limit" })] })] }), _jsxs("div", { className: "status-group", children: [_jsx("h4", { children: "5xx \u2014 Server Errors" }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "500" }), _jsx("span", { children: "Internal Server Error \u2014 \u0447\u0442\u043E-\u0442\u043E \u0441\u043B\u043E\u043C\u0430\u043B\u043E\u0441\u044C" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "502" }), _jsx("span", { children: "Bad Gateway \u2014 upstream \u0441\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "503" }), _jsx("span", { children: "Service Unavailable \u2014 \u0441\u0435\u0440\u0432\u0438\u0441 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D" })] }), _jsxs("div", { className: "status-item", children: [_jsx("code", { children: "504" }), _jsx("span", { children: "Gateway Timeout \u2014 timeout upstream" })] })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u2705 Best Practices" }), _jsxs("div", { className: "best-practices-list", children: [_jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u043A\u043E\u0434\u044B" }), _jsxs("p", { children: ["\u041D\u0435 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0439 200 \u0441 ", `{ "error": true }`] })] }), _jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u041C\u0430\u0448\u0438\u043D\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0435 error codes" }), _jsxs("p", { children: [_jsx("code", { children: "\"code\": \"invalid_email\"" }), " \u0432\u043C\u0435\u0441\u0442\u043E \u0442\u0435\u043A\u0441\u0442\u0430"] })] }), _jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u0427\u0435\u043B\u043E\u0432\u0435\u043A\u043E\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F" }), _jsx("p", { children: "\u0414\u043B\u044F \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E" })] }), _jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u041D\u0435 \u0440\u0430\u0441\u043A\u0440\u044B\u0432\u0430\u0439 \u0432\u043D\u0443\u0442\u0440\u0435\u043D\u043D\u043E\u0441\u0442\u0438" }), _jsx("p", { children: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 stack traces \u0432 production!" })] }), _jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0439 trace ID" }), _jsx("p", { children: "\u0414\u043B\u044F \u043E\u0442\u043B\u0430\u0434\u043A\u0438 \u0438 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438" })] }), _jsxs("div", { className: "practice", children: [_jsx("strong", { children: "\u041B\u043E\u043A\u0430\u043B\u0438\u0437\u0443\u0439 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F" }), _jsx("p", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 Accept-Language header" })] })] })] })] })), activeSection === 'versioning' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFF7\uFE0F API Versioning" }), _jsx("p", { children: "\u0421\u043F\u043E\u0441\u043E\u0431\u044B \u0432\u0435\u0440\u0441\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F API" }), _jsxs("div", { className: "versioning-grid", children: [_jsxs("div", { className: "version-method", children: [_jsx("h4", { children: "URL Path" }), _jsx("code", { children: "GET /api/v1/users" }), _jsx("code", { children: "GET /api/v2/users" }), _jsxs("div", { className: "pros-cons", children: [_jsx("span", { className: "pro", children: "\u2705 \u041E\u0447\u0435\u0432\u0438\u0434\u043D\u043E, \u043B\u0435\u0433\u043A\u043E \u0440\u043E\u0443\u0442\u0438\u0442\u044C" }), _jsx("span", { className: "con", children: "\u274C \"\u041B\u043E\u043C\u0430\u0435\u0442\" REST \u043F\u0440\u0438\u043D\u0446\u0438\u043F\u044B" })] }), _jsx("p", { className: "used-by", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442: Twitter, Stripe, GitHub" })] }), _jsxs("div", { className: "version-method", children: [_jsx("h4", { children: "Query Parameter" }), _jsx("code", { children: "GET /users?version=2" }), _jsxs("div", { className: "pros-cons", children: [_jsx("span", { className: "pro", children: "\u2705 \u041F\u0440\u043E\u0441\u0442\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C" }), _jsx("span", { className: "con", children: "\u274C \u041B\u0435\u0433\u043A\u043E \u0437\u0430\u0431\u044B\u0442\u044C" })] }), _jsx("p", { className: "used-by", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442: Google, Amazon" })] }), _jsxs("div", { className: "version-method", children: [_jsx("h4", { children: "Custom Header" }), _jsx("code", { children: "X-API-Version: 2" }), _jsx("code", { children: "Api-Version: 2024-01-15" }), _jsxs("div", { className: "pros-cons", children: [_jsx("span", { className: "pro", children: "\u2705 \u0427\u0438\u0441\u0442\u044B\u0435 URL" }), _jsx("span", { className: "con", children: "\u274C \u041D\u0435 \u0432\u0438\u0434\u043D\u043E \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435" })] }), _jsx("p", { className: "used-by", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442: Stripe (\u0434\u0430\u0442\u0430-\u0432\u0435\u0440\u0441\u0438\u044F)" })] }), _jsxs("div", { className: "version-method", children: [_jsx("h4", { children: "Accept Header" }), _jsx("code", { children: "Accept: application/vnd.api+json; version=2" }), _jsx("code", { children: "Accept: application/vnd.github.v3+json" }), _jsxs("div", { className: "pros-cons", children: [_jsx("span", { className: "pro", children: "\u2705 \"\u041F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439\" REST \u0441\u043F\u043E\u0441\u043E\u0431" }), _jsx("span", { className: "con", children: "\u274C \u0421\u043B\u043E\u0436\u043D\u0435\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C" })] }), _jsx("p", { className: "used-by", children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442: GitHub" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCC5 Date-based Versioning (Stripe style)" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `// Stripe использует даты вместо номеров версий
Stripe-Version: 2024-01-01

// Преимущества:
// 1. Понятно когда была версия
// 2. Можно делать частые релизы
// 3. Не нужно думать о semver

// В dashboard можно "закрепить" версию аккаунта
// Новые изменения не сломают существующие интеграции` }) })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD04 Breaking vs Non-Breaking Changes" }), _jsxs("div", { className: "changes-grid", children: [_jsxs("div", { className: "change-type safe", children: [_jsx("h4", { children: "\u2705 Non-Breaking (\u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E)" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u044B\u0445 endpoints" }), _jsx("li", { children: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043D\u043E\u0432\u044B\u0445 \u043F\u043E\u043B\u0435\u0439 \u0432 response" }), _jsx("li", { children: "\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432" }), _jsx("li", { children: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 enum \u043D\u043E\u0432\u044B\u043C\u0438 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F\u043C\u0438" })] })] }), _jsxs("div", { className: "change-type breaking", children: [_jsx("h4", { children: "\u274C Breaking (\u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043D\u043E\u0432\u043E\u0439 \u0432\u0435\u0440\u0441\u0438\u0438)" }), _jsxs("ul", { children: [_jsx("li", { children: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 endpoints" }), _jsx("li", { children: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u0435\u0439 \u0438\u0437 response" }), _jsx("li", { children: "\u041F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E\u043B\u0435\u0439" }), _jsx("li", { children: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u0442\u0438\u043F\u043E\u0432 \u0434\u0430\u043D\u043D\u044B\u0445" }), _jsx("li", { children: "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u043E\u0432" })] })] })] })] })] })), activeSection === 'rate' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsx("h2", { children: "\u23F1\uFE0F Rate Limiting" }), _jsx("p", { children: "\u0417\u0430\u0449\u0438\u0442\u0430 API \u043E\u0442 \u0437\u043B\u043E\u0443\u043F\u043E\u0442\u0440\u0435\u0431\u043B\u0435\u043D\u0438\u0439" }), _jsxs("div", { className: "rate-headers", children: [_jsx("h4", { children: "\u0421\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `HTTP/1.1 200 OK
X-RateLimit-Limit: 100        // Максимум запросов
X-RateLimit-Remaining: 45     // Осталось
X-RateLimit-Reset: 1640995200 // Когда сбросится (Unix timestamp)

// Или стандарт IETF draft:
RateLimit-Limit: 100
RateLimit-Remaining: 45
RateLimit-Reset: 60           // Секунд до сброса` }) })] }), _jsxs("div", { className: "rate-response", children: [_jsx("h4", { children: "\u041E\u0442\u0432\u0435\u0442 \u043F\u0440\u0438 \u043F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u0438\u0438" }), _jsx("div", { className: "code-block", children: _jsx("pre", { children: `HTTP/1.1 429 Too Many Requests
Retry-After: 60

{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Too many requests. Please retry after 60 seconds.",
    "retryAfter": 60
  }
}` }) })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAF \u0410\u043B\u0433\u043E\u0440\u0438\u0442\u043C\u044B Rate Limiting" }), _jsxs("div", { className: "algorithms-grid", children: [_jsxs("div", { className: "algorithm", children: [_jsx("h4", { children: "Fixed Window" }), _jsx("p", { children: "100 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0432 \u043C\u0438\u043D\u0443\u0442\u0443, \u0441\u0447\u0451\u0442\u0447\u0438\u043A \u0441\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u0432 \u043D\u0430\u0447\u0430\u043B\u0435 \u043A\u0430\u0436\u0434\u043E\u0439 \u043C\u0438\u043D\u0443\u0442\u044B" }), _jsx("div", { className: "algo-visual", children: _jsx("span", { children: "|----100 req----|----100 req----|" }) }), _jsx("span", { className: "algo-note", children: "\u26A0\uFE0F \u041F\u0440\u043E\u0431\u043B\u0435\u043C\u0430: burst \u043D\u0430 \u0433\u0440\u0430\u043D\u0438\u0446\u0435 \u043E\u043A\u043E\u043D" })] }), _jsxs("div", { className: "algorithm", children: [_jsx("h4", { children: "Sliding Window" }), _jsx("p", { children: "100 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0437\u0430 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 60 \u0441\u0435\u043A\u0443\u043D\u0434 (\u0441\u043A\u043E\u043B\u044C\u0437\u044F\u0449\u0435\u0435 \u043E\u043A\u043D\u043E)" }), _jsx("div", { className: "algo-visual", children: _jsx("span", { children: "|~~~~ 60s ~~~~|" }) }), _jsx("span", { className: "algo-note", children: "\u2705 \u0411\u043E\u043B\u0435\u0435 \u0440\u0430\u0432\u043D\u043E\u043C\u0435\u0440\u043D\u043E\u0435 \u0440\u0430\u0441\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u0438\u0435" })] }), _jsxs("div", { className: "algorithm", children: [_jsx("h4", { children: "Token Bucket" }), _jsx("p", { children: "\u0422\u043E\u043A\u0435\u043D\u044B \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u044E\u0442\u0441\u044F \u0441 \u0444\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C\u044E, \u0437\u0430\u043F\u0440\u043E\u0441 \u0442\u0440\u0430\u0442\u0438\u0442 \u0442\u043E\u043A\u0435\u043D" }), _jsx("div", { className: "algo-visual", children: _jsx("span", { children: "\uD83E\uDEA3 [\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022] \u2192 1 req = -1 token" }) }), _jsx("span", { className: "algo-note", children: "\u2705 \u041F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 bursts, \u0441\u0433\u043B\u0430\u0436\u0438\u0432\u0430\u0435\u0442 \u043F\u0438\u043A\u0438" })] }), _jsxs("div", { className: "algorithm", children: [_jsx("h4", { children: "Leaky Bucket" }), _jsx("p", { children: "\u0417\u0430\u043F\u0440\u043E\u0441\u044B \"\u0443\u0442\u0435\u043A\u0430\u044E\u0442\" \u0441 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C\u044E" }), _jsx("div", { className: "algo-visual", children: _jsx("span", { children: "\uD83E\uDEA3 [\u2022\u2022\u2022] \u2192 \u2022 \u2192 \u2022 \u2192 \u2022 (fixed rate)" }) }), _jsx("span", { className: "algo-note", children: "\u2705 \u0413\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u0443\u0435\u0442 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u0443\u044E \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0443" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCA \u0421\u0442\u0440\u0430\u0442\u0435\u0433\u0438\u0438 \u043B\u0438\u043C\u0438\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F" }), _jsxs("div", { className: "strategies-list", children: [_jsxs("div", { className: "strategy-item", children: [_jsx("strong", { children: "\u041F\u043E IP \u0430\u0434\u0440\u0435\u0441\u0443" }), _jsx("p", { children: "\u041F\u0440\u043E\u0441\u0442\u043E, \u043D\u043E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0441 NAT \u0438 proxy" })] }), _jsxs("div", { className: "strategy-item", children: [_jsx("strong", { children: "\u041F\u043E API \u043A\u043B\u044E\u0447\u0443 / \u0442\u043E\u043A\u0435\u043D\u0443" }), _jsx("p", { children: "\u0422\u043E\u0447\u043D\u0435\u0435, \u0440\u0430\u0437\u043D\u044B\u0435 \u043B\u0438\u043C\u0438\u0442\u044B \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })] }), _jsxs("div", { className: "strategy-item", children: [_jsx("strong", { children: "\u041F\u043E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044E" }), _jsx("p", { children: "\u041F\u043E\u0441\u043B\u0435 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u0438" })] }), _jsxs("div", { className: "strategy-item", children: [_jsx("strong", { children: "\u041F\u043E endpoint" }), _jsx("p", { children: "\u0420\u0430\u0437\u043D\u044B\u0435 \u043B\u0438\u043C\u0438\u0442\u044B \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 (\u0442\u044F\u0436\u0451\u043B\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B \u2014 \u043C\u0435\u043D\u044C\u0448\u0435)" })] }), _jsxs("div", { className: "strategy-item", children: [_jsx("strong", { children: "\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439" }), _jsx("p", { children: "IP + API key + endpoint + time of day" })] })] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCA1 Best Practices" }), _jsxs("div", { className: "best-list", children: [_jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "\u0412\u0441\u0435\u0433\u0434\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0439 rate limit headers" })] }), _jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 429 \u0441\u0442\u0430\u0442\u0443\u0441 \u043A\u043E\u0434, \u043D\u0435 403" })] }), _jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "\u0414\u043E\u0431\u0430\u0432\u044C Retry-After header" })] }), _jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u0439 \u043B\u0438\u043C\u0438\u0442\u044B" })] }), _jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "\u0420\u0430\u0437\u043D\u044B\u0435 tier'\u044B \u0434\u043B\u044F \u0440\u0430\u0437\u043D\u044B\u0445 \u043F\u043B\u0430\u043D\u043E\u0432 (free/paid)" })] }), _jsxs("div", { className: "best-item", children: [_jsx("span", { className: "icon", children: "\u2705" }), _jsx("span", { children: "Graceful degradation \u2014 \u043B\u0443\u0447\u0448\u0435 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E, \u0447\u0435\u043C 429" })] })] })] })] })), _jsx("style", { children: `
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
          font-size: 0.95rem;
        }
        .tab.active {
          background: var(--accent);
          color: white;
        }
        .patterns-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .pattern-card {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .pattern-card h3 {
          margin: 0 0 12px;
        }
        .endpoint {
          display: block;
          padding: 8px 12px;
          background: var(--bg-code);
          border-radius: 6px;
          margin-bottom: 12px;
          color: var(--accent);
        }
        .pros-cons {
          margin-top: 12px;
          font-size: 0.85em;
        }
        .pros, .cons {
          margin: 4px 0;
        }
        .pros { color: var(--success); }
        .cons { color: var(--text-secondary); }
        .recommendation-box {
          margin-top: 20px;
          padding: 16px;
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 8px;
        }
        .recommendation-box ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .filter-patterns {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .filter-pattern {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .filter-pattern h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .filter-pattern code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .filter-pattern p {
          margin: 8px 0 0;
          font-size: 0.85em;
          color: var(--text-secondary);
        }
        .api-examples {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .api-example {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .api-example h4 {
          margin: 0;
          min-width: 80px;
          color: var(--accent);
        }
        .api-example code {
          font-size: 0.85em;
        }
        .error-format h4 {
          margin-bottom: 12px;
        }
        .status-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .status-group h4 {
          margin: 0 0 12px;
          color: var(--accent);
        }
        .status-item {
          display: flex;
          gap: 12px;
          padding: 8px;
          margin: 4px 0;
          background: var(--bg-secondary);
          border-radius: 4px;
        }
        .status-item code {
          font-weight: bold;
          min-width: 40px;
        }
        .status-item span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .best-practices-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 12px;
        }
        .practice {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .practice strong {
          display: block;
          margin-bottom: 4px;
        }
        .practice p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .versioning-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        .version-method {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .version-method h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .version-method code {
          display: block;
          margin: 4px 0;
          font-size: 0.85em;
        }
        .version-method .pros-cons {
          margin: 12px 0;
        }
        .version-method .pro, .version-method .con {
          display: block;
          font-size: 0.85em;
        }
        .used-by {
          font-size: 0.8em;
          color: var(--text-secondary);
          margin: 0;
        }
        .changes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
        }
        .change-type {
          padding: 20px;
          border-radius: 12px;
        }
        .change-type.safe {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .change-type.breaking {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
        }
        .change-type h4 {
          margin: 0 0 12px;
        }
        .change-type ul {
          margin: 0;
          padding-left: 20px;
        }
        .rate-headers, .rate-response {
          margin: 16px 0;
        }
        .rate-headers h4, .rate-response h4 {
          margin-bottom: 8px;
        }
        .algorithms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .algorithm {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .algorithm h4 {
          margin: 0 0 8px;
          color: var(--accent);
        }
        .algorithm p {
          margin: 0 0 8px;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .algo-visual {
          font-family: monospace;
          padding: 8px;
          background: var(--bg-code);
          border-radius: 4px;
          margin: 8px 0;
        }
        .algo-note {
          font-size: 0.85em;
        }
        .strategies-list, .best-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .strategy-item {
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .strategy-item strong {
          display: block;
          margin-bottom: 4px;
        }
        .strategy-item p {
          margin: 0;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .best-item {
          display: flex;
          gap: 12px;
          align-items: center;
          padding: 12px 16px;
          background: var(--bg-secondary);
          border-radius: 8px;
        }
        .best-item .icon {
          font-size: 1.2em;
        }
      ` })] }));
}
