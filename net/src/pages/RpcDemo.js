import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import CodeBlock from '../components/CodeBlock';
export default function RpcDemo() {
    const { data, error, loading, time, fetchApi } = useApi();
    const [method, setMethod] = useState('user.getAll');
    const [params, setParams] = useState('{}');
    const [requestId, setRequestId] = useState(1);
    const [history, setHistory] = useState([]);
    const presets = [
        { name: 'Все пользователи', method: 'user.getAll', params: {} },
        { name: 'Пользователь по ID', method: 'user.getById', params: { id: 1 } },
        { name: 'Создать пользователя', method: 'user.create', params: { name: 'Новый', email: 'new@test.com' } },
        { name: 'Обновить пользователя', method: 'user.update', params: { id: 1, name: 'Обновлённый' } },
        { name: 'Удалить пользователя', method: 'user.delete', params: { id: 3 } },
        { name: 'Сложение', method: 'math.add', params: { a: 10, b: 5 } },
        { name: 'Умножение', method: 'math.multiply', params: { a: 7, b: 8 } },
        { name: 'Список методов', method: 'system.listMethods', params: {} },
        { name: 'Echo', method: 'system.echo', params: { message: 'Hello, RPC!' } },
    ];
    const executeRpc = async () => {
        const id = requestId;
        setRequestId(prev => prev + 1);
        let parsedParams;
        try {
            parsedParams = JSON.parse(params);
        }
        catch {
            parsedParams = {};
        }
        const result = await fetchApi('/rpc', {
            method: 'POST',
            body: JSON.stringify({
                jsonrpc: '2.0',
                method,
                params: parsedParams,
                id
            })
        });
        setHistory(prev => [
            {
                id,
                method,
                success: !result.error && !result.data?.error,
                time: result.time || 0
            },
            ...prev.slice(0, 9)
        ]);
    };
    const loadPreset = (preset) => {
        setMethod(preset.method);
        setParams(JSON.stringify(preset.params, null, 2));
    };
    const getRequestJson = () => {
        let parsedParams;
        try {
            parsedParams = JSON.parse(params);
        }
        catch {
            parsedParams = {};
        }
        return JSON.stringify({
            jsonrpc: '2.0',
            method,
            params: parsedParams,
            id: requestId
        }, null, 2);
    };
    return (_jsxs("div", { className: "demo-container", children: [_jsxs("div", { className: "demo-header", children: [_jsx("h1", { children: "\uD83D\uDD27 JSON-RPC" }), _jsx("p", { children: "JSON-RPC \u2014 \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0443\u0434\u0430\u043B\u0451\u043D\u043D\u043E\u0433\u043E \u0432\u044B\u0437\u043E\u0432\u0430 \u043F\u0440\u043E\u0446\u0435\u0434\u0443\u0440, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0449\u0438\u0439 JSON \u0434\u043B\u044F \u043A\u043E\u0434\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u044B\u0437\u043E\u0432\u043E\u0432. \u0412\u044B \u0432\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0435 \u043C\u0435\u0442\u043E\u0434\u044B \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435 \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u0444\u0443\u043D\u043A\u0446\u0438\u0438." })] }), _jsxs("section", { className: "card theory-card", children: [_jsx("h2", { children: "\uD83D\uDCDA \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438" }), _jsxs("div", { className: "concept-grid", children: [_jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u0421\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0430 \u0437\u0430\u043F\u0440\u043E\u0441\u0430" }), _jsx(CodeBlock, { language: "json", code: `{
  "jsonrpc": "2.0",
  "method": "user.getById",
  "params": { "id": 1 },
  "id": 1
}` }), _jsxs("ul", { className: "concept-list", children: [_jsxs("li", { children: [_jsx("code", { children: "jsonrpc" }), " \u2014 \u0432\u0435\u0440\u0441\u0438\u044F \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430"] }), _jsxs("li", { children: [_jsx("code", { children: "method" }), " \u2014 \u0438\u043C\u044F \u043C\u0435\u0442\u043E\u0434\u0430"] }), _jsxs("li", { children: [_jsx("code", { children: "params" }), " \u2014 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B (\u043E\u0431\u044A\u0435\u043A\u0442 \u0438\u043B\u0438 \u043C\u0430\u0441\u0441\u0438\u0432)"] }), _jsxs("li", { children: [_jsx("code", { children: "id" }), " \u2014 \u0438\u0434\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u043F\u0440\u043E\u0441\u0430"] })] })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u0423\u0441\u043F\u0435\u0448\u043D\u044B\u0439 \u043E\u0442\u0432\u0435\u0442" }), _jsx(CodeBlock, { language: "json", code: `{
  "jsonrpc": "2.0",
  "result": {
    "id": 1,
    "name": "Алексей",
    "email": "alex@example.com"
  },
  "id": 1
}` })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u041E\u0442\u0432\u0435\u0442 \u0441 \u043E\u0448\u0438\u0431\u043A\u043E\u0439" }), _jsx(CodeBlock, { language: "json", code: `{
  "jsonrpc": "2.0",
  "error": {
    "code": -32601,
    "message": "Method not found"
  },
  "id": 1
}` }), _jsxs("ul", { className: "concept-list", children: [_jsxs("li", { children: [_jsx("code", { children: "-32700" }), " \u2014 Parse error"] }), _jsxs("li", { children: [_jsx("code", { children: "-32600" }), " \u2014 Invalid Request"] }), _jsxs("li", { children: [_jsx("code", { children: "-32601" }), " \u2014 Method not found"] }), _jsxs("li", { children: [_jsx("code", { children: "-32602" }), " \u2014 Invalid params"] }), _jsxs("li", { children: [_jsx("code", { children: "-32603" }), " \u2014 Internal error"] })] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA RPC Playground" }), _jsx("div", { className: "preset-buttons", children: presets.map((preset, i) => (_jsx("button", { className: "preset-btn preset-btn-rpc", onClick: () => loadPreset(preset), children: preset.name }, i))) }), _jsxs("div", { className: "rpc-editor", children: [_jsxs("div", { className: "rpc-input-section", children: [_jsxs("div", { className: "rpc-field", children: [_jsx("label", { children: "\u041C\u0435\u0442\u043E\u0434:" }), _jsx("input", { type: "text", value: method, onChange: e => setMethod(e.target.value), className: "rpc-method-input", placeholder: "namespace.method" })] }), _jsxs("div", { className: "rpc-field", children: [_jsx("label", { children: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B (JSON):" }), _jsx("textarea", { value: params, onChange: e => setParams(e.target.value), className: "rpc-params-textarea", rows: 4, spellCheck: false })] }), _jsx("button", { onClick: executeRpc, disabled: loading, className: "rpc-execute-btn", children: loading ? '⏳ Выполнение...' : '🚀 Вызвать метод' })] }), _jsxs("div", { className: "rpc-preview-section", children: [_jsx("h4", { children: "\u0417\u0430\u043F\u0440\u043E\u0441 (JSON-RPC 2.0):" }), _jsx(CodeBlock, { code: getRequestJson(), language: "json" })] })] }), _jsx("div", { className: "rpc-visualization", children: _jsxs("div", { className: "rpc-flow", children: [_jsxs("div", { className: "rpc-flow-item rpc-flow-client", children: [_jsx("div", { className: "rpc-flow-icon", children: "\uD83D\uDCBB" }), _jsx("div", { className: "rpc-flow-label", children: "Client" }), _jsxs("div", { className: "rpc-flow-detail", children: ["\u0412\u044B\u0437\u043E\u0432: ", _jsxs("code", { children: [method, "()"] })] })] }), _jsx("div", { className: `rpc-flow-arrow ${loading ? 'rpc-flow-arrow-active' : ''}`, children: _jsx("span", { children: "\u2192 JSON-RPC \u2192" }) }), _jsxs("div", { className: "rpc-flow-item rpc-flow-server", children: [_jsx("div", { className: "rpc-flow-icon", children: "\uD83D\uDDA5\uFE0F" }), _jsx("div", { className: "rpc-flow-label", children: "Server" }), _jsx("div", { className: "rpc-flow-detail", children: loading ? 'Обработка...' : 'Готов' })] })] }) }), (data || error) && (_jsxs("div", { className: "rpc-result", children: [_jsxs("div", { className: "rpc-result-header", children: [_jsx("h3", { children: "\u041E\u0442\u0432\u0435\u0442" }), time && _jsxs("span", { className: "time-badge", children: ["\u23F1\uFE0F ", time, "ms"] }), data && !data.error && _jsx("span", { className: "success-badge", children: "\u2713 \u0423\u0441\u043F\u0435\u0445" }), (data?.error || error) && _jsx("span", { className: "error-badge", children: "\u2715 \u041E\u0448\u0438\u0431\u043A\u0430" })] }), _jsx(CodeBlock, { code: JSON.stringify(data || { error }, null, 2), language: "json" })] }))] }), history.length > 0 && (_jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCDC \u0418\u0441\u0442\u043E\u0440\u0438\u044F \u0432\u044B\u0437\u043E\u0432\u043E\u0432" }), _jsx("div", { className: "rpc-history", children: history.map((item, i) => (_jsxs("div", { className: `rpc-history-item ${item.success ? 'rpc-history-success' : 'rpc-history-error'}`, children: [_jsxs("span", { className: "rpc-history-id", children: ["#", item.id] }), _jsx("span", { className: "rpc-history-method", children: item.method }), _jsx("span", { className: `rpc-history-status ${item.success ? 'success' : 'error'}`, children: item.success ? '✓' : '✕' }), _jsxs("span", { className: "rpc-history-time", children: [item.time, "ms"] })] }, i))) })] })), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043C\u0435\u0442\u043E\u0434\u044B" }), _jsx("div", { className: "rpc-methods-table", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u041C\u0435\u0442\u043E\u0434" }), _jsx("th", { children: "\u041F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B" }), _jsx("th", { children: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "user.getAll" }) }), _jsx("td", { children: "\u2014" }), _jsx("td", { children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0432\u0441\u0435\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "user.getById" }) }), _jsx("td", { children: _jsx("code", { children: `{ id: number }` }) }), _jsx("td", { children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043F\u043E ID" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "user.create" }) }), _jsx("td", { children: _jsx("code", { children: `{ name, email, role? }` }) }), _jsx("td", { children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "user.update" }) }), _jsx("td", { children: _jsx("code", { children: `{ id, name?, email?, role? }` }) }), _jsx("td", { children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "user.delete" }) }), _jsx("td", { children: _jsx("code", { children: `{ id: number }` }) }), _jsx("td", { children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "math.add" }) }), _jsx("td", { children: _jsx("code", { children: `{ a: number, b: number }` }) }), _jsx("td", { children: "\u0421\u043B\u043E\u0436\u0438\u0442\u044C \u0434\u0432\u0430 \u0447\u0438\u0441\u043B\u0430" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "math.multiply" }) }), _jsx("td", { children: _jsx("code", { children: `{ a: number, b: number }` }) }), _jsx("td", { children: "\u0423\u043C\u043D\u043E\u0436\u0438\u0442\u044C \u0434\u0432\u0430 \u0447\u0438\u0441\u043B\u0430" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "system.listMethods" }) }), _jsx("td", { children: "\u2014" }), _jsx("td", { children: "\u0421\u043F\u0438\u0441\u043E\u043A \u0432\u0441\u0435\u0445 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u043C\u0435\u0442\u043E\u0434\u043E\u0432" })] }), _jsxs("tr", { children: [_jsx("td", { children: _jsx("code", { children: "system.echo" }) }), _jsx("td", { children: _jsx("code", { children: "any" }) }), _jsx("td", { children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B" })] })] })] }) })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCBB \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043A\u043E\u0434\u0430" }), _jsxs("div", { className: "code-examples", children: [_jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u0432\u044B\u0437\u043E\u0432" }), _jsx(CodeBlock, { language: "javascript", code: `async function rpcCall(method, params) {
  const response = await fetch('/rpc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method,
      params,
      id: Date.now()
    })
  });
  
  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  return data.result;
}

// Использование
const users = await rpcCall('user.getAll');
const user = await rpcCall('user.getById', { id: 1 });
const sum = await rpcCall('math.add', { a: 5, b: 3 });` })] }), _jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "Batch \u0437\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx(CodeBlock, { language: "javascript", code: `// JSON-RPC поддерживает batch запросы
const batchRequest = [
  { jsonrpc: '2.0', method: 'user.getById', params: { id: 1 }, id: 1 },
  { jsonrpc: '2.0', method: 'user.getById', params: { id: 2 }, id: 2 },
  { jsonrpc: '2.0', method: 'math.add', params: { a: 1, b: 2 }, id: 3 }
];

const response = await fetch('/rpc', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(batchRequest)
});

const results = await response.json();
// results - массив ответов в том же порядке` })] }), _jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "TypeScript \u043A\u043B\u0438\u0435\u043D\u0442" }), _jsx(CodeBlock, { language: "typescript", code: `interface RpcClient {
  user: {
    getAll(): Promise<User[]>;
    getById(id: number): Promise<User>;
    create(data: CreateUserDto): Promise<User>;
  };
  math: {
    add(a: number, b: number): Promise<number>;
  };
}

function createRpcClient(baseUrl: string): RpcClient {
  const call = async (method: string, params?: unknown) => {
    const res = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method, params, id: Date.now() })
    });
    const { result, error } = await res.json();
    if (error) throw new Error(error.message);
    return result;
  };

  return {
    user: {
      getAll: () => call('user.getAll'),
      getById: (id) => call('user.getById', { id }),
      create: (data) => call('user.create', data),
    },
    math: {
      add: (a, b) => call('math.add', { a, b }),
    }
  };
}

// Использование
const client = createRpcClient('/rpc');
const users = await client.user.getAll();
const sum = await client.math.add(5, 3);` })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\u2696\uFE0F JSON-RPC vs REST" }), _jsx("div", { className: "comparison-table", children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\u0410\u0441\u043F\u0435\u043A\u0442" }), _jsx("th", { children: "JSON-RPC" }), _jsx("th", { children: "REST" })] }) }), _jsxs("tbody", { children: [_jsxs("tr", { children: [_jsx("td", { children: "\u0424\u043E\u043A\u0443\u0441" }), _jsx("td", { children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F (\u043C\u0435\u0442\u043E\u0434\u044B)" }), _jsx("td", { children: "\u0420\u0435\u0441\u0443\u0440\u0441\u044B (\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435)" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Endpoint" }), _jsxs("td", { children: ["\u041E\u0434\u0438\u043D (", _jsx("code", { children: "/rpc" }), ")"] }), _jsxs("td", { children: ["\u041C\u043D\u043E\u0433\u043E (", _jsx("code", { children: "/users" }), ", ", _jsx("code", { children: "/posts" }), ")"] })] }), _jsxs("tr", { children: [_jsx("td", { children: "HTTP \u043C\u0435\u0442\u043E\u0434\u044B" }), _jsx("td", { children: "\u0422\u043E\u043B\u044C\u043A\u043E POST" }), _jsx("td", { children: "GET, POST, PUT, DELETE" })] }), _jsxs("tr", { children: [_jsx("td", { children: "Batch \u0437\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx("td", { children: "\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u0432 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B" }), _jsx("td", { children: "\u041D\u0435 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u044B" })] }), _jsxs("tr", { children: [_jsx("td", { children: "\u041A\u0435\u0448\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" }), _jsx("td", { children: "\u0421\u043B\u043E\u0436\u043D\u0435\u0435 (\u0442\u043E\u043B\u044C\u043A\u043E POST)" }), _jsx("td", { children: "\u041B\u0435\u0433\u043A\u043E (GET \u043A\u0435\u0448\u0438\u0440\u0443\u0435\u0442\u0441\u044F)" })] }), _jsxs("tr", { children: [_jsx("td", { children: "\u0418\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B" }), _jsx("td", { children: "\u041C\u0435\u043D\u044C\u0448\u0435" }), _jsx("td", { children: "\u0411\u043E\u0433\u0430\u0442\u0430\u044F \u044D\u043A\u043E\u0441\u0438\u0441\u0442\u0435\u043C\u0430" })] })] })] }) })] })] }));
}
