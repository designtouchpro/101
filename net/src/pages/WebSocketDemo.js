import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
import CodeBlock from '../components/CodeBlock';
export default function WebSocketDemo() {
    const [status, setStatus] = useState('disconnected');
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [myClientId, setMyClientId] = useState(null);
    const [connectionEvents, setConnectionEvents] = useState([]);
    const wsRef = useRef(null);
    const messagesEndRef = useRef(null);
    const addConnectionEvent = useCallback((type, detail) => {
        setConnectionEvents(prev => [
            { type, time: new Date().toLocaleTimeString(), detail },
            ...prev.slice(0, 19)
        ]);
    }, []);
    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN)
            return;
        setStatus('connecting');
        addConnectionEvent('connecting', 'Установка соединения...');
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.hostname}:3206/ws`;
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        ws.onopen = () => {
            setStatus('connected');
            addConnectionEvent('connected', 'WebSocket соединение установлено');
            // Присоединяемся с именем
            ws.send(JSON.stringify({
                type: 'join',
                username: username || `User-${Math.random().toString(36).substr(2, 5)}`
            }));
        };
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            addConnectionEvent('message', `Получено: ${message.type}`);
            switch (message.type) {
                case 'welcome':
                    setMessages(prev => [...prev, {
                            type: 'system',
                            text: message.message,
                            timestamp: message.timestamp
                        }]);
                    break;
                case 'joined':
                    setMyClientId(message.clientId || null);
                    setOnlineUsers(message.onlineUsers || []);
                    setMessages(prev => [...prev, {
                            type: 'system',
                            text: `Вы подключились как ${message.username}`,
                            timestamp: new Date().toISOString()
                        }]);
                    break;
                case 'user_joined':
                    setOnlineUsers(prev => [...prev, message.user]);
                    setMessages(prev => [...prev, {
                            type: 'system',
                            text: `${message.user?.username} присоединился`,
                            timestamp: message.timestamp
                        }]);
                    break;
                case 'user_left':
                    setOnlineUsers(prev => prev.filter(u => u.id !== message.user?.id));
                    setMessages(prev => [...prev, {
                            type: 'system',
                            text: `${message.user?.username} вышел`,
                            timestamp: message.timestamp
                        }]);
                    break;
                case 'chat':
                    setMessages(prev => [...prev, message]);
                    break;
                case 'pong':
                    setMessages(prev => [...prev, {
                            type: 'system',
                            text: 'Pong received!',
                            timestamp: message.timestamp
                        }]);
                    break;
                case 'typing':
                    // Можно добавить индикатор набора
                    break;
            }
        };
        ws.onclose = () => {
            setStatus('disconnected');
            setMyClientId(null);
            setOnlineUsers([]);
            addConnectionEvent('disconnected', 'Соединение закрыто');
        };
        ws.onerror = () => {
            setStatus('error');
            addConnectionEvent('error', 'Ошибка соединения');
        };
    }, [username, addConnectionEvent]);
    const disconnect = () => {
        if (wsRef.current) {
            wsRef.current.close();
            wsRef.current = null;
        }
    };
    const sendMessage = () => {
        if (!inputMessage.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
            return;
        wsRef.current.send(JSON.stringify({
            type: 'chat',
            text: inputMessage
        }));
        addConnectionEvent('sent', `Отправлено: chat`);
        setInputMessage('');
    };
    const sendPing = () => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN)
            return;
        wsRef.current.send(JSON.stringify({ type: 'ping' }));
        addConnectionEvent('sent', 'Отправлено: ping');
    };
    // Auto-scroll messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, []);
    return (_jsxs("div", { className: "demo-container", children: [_jsxs("div", { className: "demo-header", children: [_jsx("h1", { children: "\u26A1 WebSocket" }), _jsx("p", { children: "WebSocket \u2014 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0434\u043B\u044F \u0434\u0432\u0443\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0439 \u0441\u0432\u044F\u0437\u0438 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438. \u041F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u043E \u043E\u0431\u043C\u0435\u043D\u0438\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F\u043C\u0438 \u043C\u0435\u0436\u0434\u0443 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043C \u0438 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C." })] }), _jsxs("section", { className: "card theory-card", children: [_jsx("h2", { children: "\uD83D\uDCDA \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438" }), _jsxs("div", { className: "concept-grid", children: [_jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 Handshake" }), _jsx("p", { children: "\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u0441 HTTP Upgrade \u0437\u0430\u043F\u0440\u043E\u0441\u0430, \u0437\u0430\u0442\u0435\u043C \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0438\u0442 \u043D\u0430 WebSocket \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B." }), _jsx(CodeBlock, { language: "http", code: `GET /ws HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
Sec-WebSocket-Version: 13` })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u0414\u0432\u0443\u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0441\u0442\u044C" }), _jsx("p", { children: "\u0418 \u043A\u043B\u0438\u0435\u043D\u0442, \u0438 \u0441\u0435\u0440\u0432\u0435\u0440 \u043C\u043E\u0433\u0443\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0442\u044C \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442, \u043D\u0435 \u0434\u043E\u0436\u0438\u0434\u0430\u044F\u0441\u044C \u0437\u0430\u043F\u0440\u043E\u0441\u0430." })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 \u0421\u043E\u0431\u044B\u0442\u0438\u044F" }), _jsxs("ul", { children: [_jsxs("li", { children: [_jsx("code", { children: "onopen" }), " \u2014 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E"] }), _jsxs("li", { children: [_jsx("code", { children: "onmessage" }), " \u2014 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435"] }), _jsxs("li", { children: [_jsx("code", { children: "onclose" }), " \u2014 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u043E"] }), _jsxs("li", { children: [_jsx("code", { children: "onerror" }), " \u2014 \u043E\u0448\u0438\u0431\u043A\u0430"] })] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDD0C \u0421\u0442\u0430\u0442\u0443\u0441 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F" }), _jsxs("div", { className: "ws-connection-visual", children: [_jsxs("div", { className: "ws-endpoint ws-client", children: [_jsx("div", { className: "ws-icon", children: "\uD83D\uDCBB" }), _jsx("div", { className: "ws-label", children: "Client" })] }), _jsxs("div", { className: `ws-line ws-line-${status}`, children: [_jsxs("div", { className: "ws-line-inner", children: [status === 'connecting' && _jsx("div", { className: "ws-pulse" }), status === 'connected' && (_jsxs(_Fragment, { children: [_jsx("div", { className: "ws-data-flow ws-data-flow-right", children: "\u2192" }), _jsx("div", { className: "ws-data-flow ws-data-flow-left", children: "\u2190" })] }))] }), _jsx("div", { className: "ws-protocol", children: status === 'connected' ? 'ws://' : status === 'connecting' ? 'HTTP Upgrade' : '' })] }), _jsxs("div", { className: "ws-endpoint ws-server", children: [_jsx("div", { className: "ws-icon", children: "\uD83D\uDDA5\uFE0F" }), _jsx("div", { className: "ws-label", children: "Server" })] })] }), _jsxs("div", { className: "ws-status-info", children: [_jsxs("div", { className: `ws-status-badge ws-status-${status}`, children: [status === 'disconnected' && '⚪ Отключено', status === 'connecting' && '🟡 Подключение...', status === 'connected' && '🟢 Подключено', status === 'error' && '🔴 Ошибка'] }), myClientId && _jsxs("div", { className: "ws-client-id", children: ["ID: ", myClientId] })] }), _jsxs("div", { className: "ws-controls", children: [_jsx("input", { type: "text", placeholder: "\u0412\u0430\u0448\u0435 \u0438\u043C\u044F (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)", value: username, onChange: e => setUsername(e.target.value), disabled: status === 'connected', className: "ws-username-input" }), status !== 'connected' ? (_jsx("button", { onClick: connect, disabled: status === 'connecting', className: "ws-btn ws-btn-connect", children: status === 'connecting' ? '⏳ Подключение...' : '🔌 Подключиться' })) : (_jsx("button", { onClick: disconnect, className: "ws-btn ws-btn-disconnect", children: "\u274C \u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F" })), _jsx("button", { onClick: sendPing, disabled: status !== 'connected', className: "ws-btn ws-btn-ping", children: "\uD83D\uDCE1 Ping" })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCAC \u0427\u0430\u0442 \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438" }), _jsxs("div", { className: "ws-chat-layout", children: [_jsxs("div", { className: "ws-users-panel", children: [_jsxs("h4", { children: ["\uD83D\uDC65 \u041E\u043D\u043B\u0430\u0439\u043D (", onlineUsers.length, ")"] }), _jsxs("ul", { className: "ws-users-list", children: [onlineUsers.map(user => (_jsxs("li", { className: user.id === myClientId ? 'ws-user-me' : '', children: [_jsx("span", { className: "ws-user-indicator", children: "\u25CF" }), user.username, user.id === myClientId && ' (вы)'] }, user.id))), onlineUsers.length === 0 && (_jsx("li", { className: "ws-no-users", children: "\u041D\u0438\u043A\u043E\u0433\u043E \u043D\u0435\u0442" }))] })] }), _jsxs("div", { className: "ws-messages-panel", children: [_jsxs("div", { className: "ws-messages", children: [messages.length === 0 && (_jsx("div", { className: "ws-empty-messages", children: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u043E\u0431\u0449\u0435\u043D\u0438\u0435" })), messages.map((msg, i) => (_jsx("div", { className: `ws-message ws-message-${msg.type} ${msg.fromId === myClientId ? 'ws-message-own' : ''}`, children: msg.type === 'system' ? (_jsxs("div", { className: "ws-message-system", children: [_jsx("span", { className: "ws-message-icon", children: "\u2139\uFE0F" }), msg.text] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "ws-message-header", children: [_jsx("span", { className: "ws-message-from", children: msg.from }), _jsx("span", { className: "ws-message-time", children: msg.timestamp && new Date(msg.timestamp).toLocaleTimeString() })] }), _jsx("div", { className: "ws-message-text", children: msg.text })] })) }, i))), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "ws-input-area", children: [_jsx("input", { type: "text", value: inputMessage, onChange: e => setInputMessage(e.target.value), onKeyPress: e => e.key === 'Enter' && sendMessage(), placeholder: status === 'connected' ? 'Введите сообщение...' : 'Сначала подключитесь', disabled: status !== 'connected', className: "ws-message-input" }), _jsx("button", { onClick: sendMessage, disabled: status !== 'connected' || !inputMessage.trim(), className: "ws-send-btn", children: "\uD83D\uDCE4 \u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" })] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB \u041B\u043E\u0433 \u0441\u043E\u0431\u044B\u0442\u0438\u0439" }), _jsx("div", { className: "ws-events-log", children: connectionEvents.length === 0 ? (_jsx("div", { className: "ws-events-empty", children: "\u0421\u043E\u0431\u044B\u0442\u0438\u044F \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F" })) : (connectionEvents.map((event, i) => (_jsxs("div", { className: `ws-event ws-event-${event.type}`, children: [_jsx("span", { className: "ws-event-time", children: event.time }), _jsxs("span", { className: `ws-event-type ws-event-type-${event.type}`, children: [event.type === 'connecting' && '🟡', event.type === 'connected' && '🟢', event.type === 'disconnected' && '⚪', event.type === 'error' && '🔴', event.type === 'message' && '📥', event.type === 'sent' && '📤', ' ', event.type] }), event.detail && _jsx("span", { className: "ws-event-detail", children: event.detail })] }, i)))) })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCBB \u041F\u0440\u0438\u043C\u0435\u0440\u044B \u043A\u043E\u0434\u0430" }), _jsxs("div", { className: "code-examples", children: [_jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "\u0411\u0430\u0437\u043E\u0432\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435" }), _jsx(CodeBlock, { language: "javascript", code: `const ws = new WebSocket('ws://localhost:3206/ws');

ws.onopen = () => {
  console.log('Connected!');
  ws.send(JSON.stringify({ type: 'join', username: 'User1' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Received:', data);
};

ws.onclose = () => {
  console.log('Disconnected');
};

ws.onerror = (error) => {
  console.error('Error:', error);
};` })] }), _jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "\u041E\u0442\u043F\u0440\u0430\u0432\u043A\u0430 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0439" }), _jsx(CodeBlock, { language: "javascript", code: `// Отправка текстового сообщения
ws.send(JSON.stringify({
  type: 'chat',
  text: 'Hello, World!'
}));

// Ping для проверки соединения
ws.send(JSON.stringify({ type: 'ping' }));

// Закрытие соединения
ws.close();` })] }), _jsxs("div", { className: "code-example", children: [_jsx("h4", { children: "React Hook \u0434\u043B\u044F WebSocket" }), _jsx(CodeBlock, { language: "typescript", code: `function useWebSocket(url: string) {
  const [status, setStatus] = useState<'connecting' | 'open' | 'closed'>('closed');
  const [messages, setMessages] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => setStatus('open');
    ws.onclose = () => setStatus('closed');
    ws.onmessage = (e) => {
      setMessages(prev => [...prev, JSON.parse(e.data)]);
    };
  }, [url]);

  const send = useCallback((data: unknown) => {
    wsRef.current?.send(JSON.stringify(data));
  }, []);

  return { status, messages, connect, send };
}` })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83C\uDFAF \u041A\u043E\u0433\u0434\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C WebSocket" }), _jsxs("div", { className: "use-cases-grid", children: [_jsxs("div", { className: "use-case use-case-good", children: [_jsx("h4", { children: "\u2705 \u041F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F" }), _jsxs("ul", { children: [_jsx("li", { children: "\uD83D\uDCAC \u0427\u0430\u0442\u044B \u0438 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u044B" }), _jsx("li", { children: "\uD83C\uDFAE \u041E\u043D\u043B\u0430\u0439\u043D-\u0438\u0433\u0440\u044B" }), _jsx("li", { children: "\uD83D\uDCCA \u0411\u0438\u0440\u0436\u0435\u0432\u044B\u0435 \u043A\u043E\u0442\u0438\u0440\u043E\u0432\u043A\u0438" }), _jsx("li", { children: "\uD83D\uDD14 \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438" }), _jsx("li", { children: "\uD83D\uDCCD \u041E\u0442\u0441\u043B\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 \u0433\u0435\u043E\u043B\u043E\u043A\u0430\u0446\u0438\u0438" }), _jsx("li", { children: "\uD83D\uDC65 \u041A\u043E\u043B\u043B\u0430\u0431\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" })] })] }), _jsxs("div", { className: "use-case use-case-bad", children: [_jsx("h4", { children: "\u274C \u041D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F" }), _jsxs("ul", { children: [_jsx("li", { children: "\uD83D\uDCC4 \u041E\u0431\u044B\u0447\u043D\u044B\u0435 CRUD \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438" }), _jsx("li", { children: "\uD83D\uDCC1 \u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0444\u0430\u0439\u043B\u043E\u0432" }), _jsx("li", { children: "\uD83D\uDD0D \u041F\u043E\u0438\u0441\u043A\u043E\u0432\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx("li", { children: "\uD83D\uDCCA \u0420\u0435\u0434\u043A\u0438\u0435 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445" }), _jsx("li", { children: "\uD83C\uDF10 SEO-\u043A\u0440\u0438\u0442\u0438\u0447\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442" })] })] })] })] })] }));
}
