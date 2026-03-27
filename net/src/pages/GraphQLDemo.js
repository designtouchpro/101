import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import CodeBlock from '../components/CodeBlock';
export default function GraphQLDemo() {
    const { data, error, loading, time, fetchApi } = useApi();
    const [query, setQuery] = useState(`query GetUsers {
  users {
    id
    name
    email
    role
    posts {
      id
      title
    }
  }
}`);
    const [variables, setVariables] = useState('');
    const [activeTab, setActiveTab] = useState('query');
    const presets = [
        {
            name: 'Все пользователи',
            type: 'query',
            query: `query GetUsers {
  users {
    id
    name
    email
    role
    posts {
      id
      title
    }
  }
}`
        },
        {
            name: 'Пользователь по ID',
            type: 'query',
            query: `query GetUser($id: ID!) {
  user(id: $id) {
    id
    name
    email
    role
    posts {
      id
      title
      content
      createdAt
    }
  }
}`,
            variables: '{\n  "id": "1"\n}'
        },
        {
            name: 'Все посты',
            type: 'query',
            query: `query GetPosts {
  posts {
    id
    title
    content
    createdAt
    author {
      id
      name
    }
  }
}`
        },
        {
            name: 'Создать пользователя',
            type: 'mutation',
            query: `mutation CreateUser($name: String!, $email: String!, $role: String) {
  createUser(name: $name, email: $email, role: $role) {
    id
    name
    email
    role
  }
}`,
            variables: '{\n  "name": "Новый пользователь",\n  "email": "new@example.com",\n  "role": "user"\n}'
        },
        {
            name: 'Обновить пользователя',
            type: 'mutation',
            query: `mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
  }
}`,
            variables: '{\n  "id": "1",\n  "name": "Обновлённое имя"\n}'
        },
        {
            name: 'Удалить пользователя',
            type: 'mutation',
            query: `mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    id
    name
  }
}`,
            variables: '{\n  "id": "3"\n}'
        }
    ];
    const executeQuery = async () => {
        const parsedVariables = variables ? JSON.parse(variables) : undefined;
        await fetchApi('/graphql', {
            method: 'POST',
            body: JSON.stringify({
                query,
                variables: parsedVariables
            })
        });
    };
    const loadPreset = (preset) => {
        setQuery(preset.query);
        setVariables(preset.variables || '');
    };
    const getQueryType = () => {
        if (query.trim().startsWith('mutation'))
            return 'mutation';
        return 'query';
    };
    return (_jsxs("div", { className: "demo-container", children: [_jsxs("div", { className: "demo-header", children: [_jsx("h1", { children: "\u25C8 GraphQL" }), _jsx("p", { children: "GraphQL \u2014 \u044F\u0437\u044B\u043A \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u0434\u043B\u044F API, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0443 \u0437\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0442\u044C \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0435\u043C\u0443 \u043D\u0443\u0436\u043D\u044B. \u0421\u0442\u0440\u043E\u0433\u043E \u0442\u0438\u043F\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0445\u0435\u043C\u0430 \u0438 \u0441\u0430\u043C\u043E\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0438\u0440\u0443\u044E\u0449\u0438\u0439\u0441\u044F API." })] }), _jsxs("section", { className: "card theory-card", children: [_jsx("h2", { children: "\uD83D\uDCDA \u041E\u0441\u043D\u043E\u0432\u043D\u044B\u0435 \u043A\u043E\u043D\u0446\u0435\u043F\u0446\u0438\u0438" }), _jsxs("div", { className: "concept-grid", children: [_jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 Query" }), _jsx("p", { children: "\u0417\u0430\u043F\u0440\u043E\u0441\u044B \u043D\u0430 \u0447\u0442\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445. \u041C\u043E\u0436\u043D\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C \u043D\u0443\u0436\u043D\u044B\u0435 \u043F\u043E\u043B\u044F \u0438 \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u043E\u0431\u044A\u0435\u043A\u0442\u044B." }), _jsx(CodeBlock, { language: "graphql", code: `query {
  user(id: "1") {
    name
    posts { title }
  }
}` })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 Mutation" }), _jsx("p", { children: "\u041E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0434\u0430\u043D\u043D\u044B\u0445: \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435, \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435." }), _jsx(CodeBlock, { language: "graphql", code: `mutation {
  createUser(name: "John") {
    id
    name
  }
}` })] }), _jsxs("div", { className: "concept-item", children: [_jsx("h4", { children: "\uD83D\uDD39 Subscription" }), _jsx("p", { children: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0438 \u043D\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F \u0432 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C \u0432\u0440\u0435\u043C\u0435\u043D\u0438 \u0447\u0435\u0440\u0435\u0437 WebSocket." }), _jsx(CodeBlock, { language: "graphql", code: `subscription {
  messageSent {
    text
    from
    timestamp
  }
}` })] })] }), _jsxs("div", { className: "graphql-benefits", children: [_jsx("h3", { children: "\u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 GraphQL" }), _jsxs("div", { className: "benefits-grid", children: [_jsxs("div", { className: "benefit-item", children: [_jsx("span", { className: "benefit-icon", children: "\uD83C\uDFAF" }), _jsxs("div", { children: [_jsx("strong", { children: "\u0422\u043E\u0447\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435" }), _jsx("p", { children: "\u0417\u0430\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0443\u0436\u043D\u044B\u0435 \u043F\u043E\u043B\u044F, \u043D\u0438\u043A\u0430\u043A\u043E\u0433\u043E over-fetching" })] })] }), _jsxs("div", { className: "benefit-item", children: [_jsx("span", { className: "benefit-icon", children: "\uD83D\uDD17" }), _jsxs("div", { children: [_jsx("strong", { children: "\u041E\u0434\u0438\u043D \u0437\u0430\u043F\u0440\u043E\u0441" }), _jsx("p", { children: "\u041F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0435 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u044B\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0437\u0430 \u043E\u0434\u0438\u043D \u0437\u0430\u043F\u0440\u043E\u0441 \u0432\u043C\u0435\u0441\u0442\u043E \u043C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0430 REST \u0432\u044B\u0437\u043E\u0432\u043E\u0432" })] })] }), _jsxs("div", { className: "benefit-item", children: [_jsx("span", { className: "benefit-icon", children: "\uD83D\uDCCB" }), _jsxs("div", { children: [_jsx("strong", { children: "\u0422\u0438\u043F\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0441\u0445\u0435\u043C\u0430" }), _jsx("p", { children: "\u0421\u0442\u0440\u043E\u0433\u0438\u0435 \u0442\u0438\u043F\u044B, \u0430\u0432\u0442\u043E\u0434\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u0430\u0446\u0438\u044F, \u0432\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432" })] })] }), _jsxs("div", { className: "benefit-item", children: [_jsx("span", { className: "benefit-icon", children: "\uD83D\uDD04" }), _jsxs("div", { children: [_jsx("strong", { children: "\u042D\u0432\u043E\u043B\u044E\u0446\u0438\u044F API" }), _jsx("p", { children: "\u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043F\u043E\u043B\u044F \u0431\u0435\u0437 \u0432\u0435\u0440\u0441\u0438\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F, deprecation \u0432\u043C\u0435\u0441\u0442\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F" })] })] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83E\uDDEA GraphQL Playground" }), _jsx("div", { className: "preset-buttons", children: presets.map((preset, i) => (_jsxs("button", { className: `preset-btn preset-btn-${preset.type}`, onClick: () => loadPreset(preset), children: [_jsx("span", { className: `type-badge type-${preset.type}`, children: preset.type === 'query' ? 'Q' : 'M' }), preset.name] }, i))) }), _jsxs("div", { className: "graphql-editor", children: [_jsxs("div", { className: "editor-panel", children: [_jsxs("div", { className: "editor-tabs", children: [_jsx("button", { className: `editor-tab ${activeTab === 'query' ? 'active' : ''}`, onClick: () => setActiveTab('query'), children: getQueryType() === 'mutation' ? '✏️ Mutation' : '🔍 Query' }), _jsx("button", { className: `editor-tab ${activeTab === 'variables' ? 'active' : ''}`, onClick: () => setActiveTab('variables'), children: "\uD83D\uDCE6 Variables" })] }), activeTab === 'query' ? (_jsx("textarea", { value: query, onChange: e => setQuery(e.target.value), className: "graphql-textarea", spellCheck: false })) : (_jsx("textarea", { value: variables, onChange: e => setVariables(e.target.value), className: "graphql-textarea", placeholder: '{\\n  "key": "value"\\n}', spellCheck: false })), _jsx("button", { onClick: executeQuery, disabled: loading, className: "execute-btn", children: loading ? '⏳ Выполнение...' : '▶️ Выполнить' })] }), _jsxs("div", { className: "result-panel", children: [_jsxs("div", { className: "result-header", children: [_jsx("span", { children: "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442" }), time && _jsxs("span", { className: "time-badge", children: ["\u23F1\uFE0F ", time, "ms"] })] }), _jsxs("div", { className: "result-content", children: [loading && (_jsxs("div", { className: "loading-state", children: [_jsx("div", { className: "spinner" }), _jsx("span", { children: "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u0430..." })] })), error && (_jsxs("div", { className: "error-state", children: [_jsx("span", { className: "error-icon", children: "\u274C" }), _jsx("span", { children: error })] })), data && (_jsx(CodeBlock, { code: JSON.stringify(data, null, 2), language: "json" })), !loading && !error && !data && (_jsxs("div", { className: "empty-state", children: [_jsx("span", { children: "\uD83D\uDC46" }), _jsx("span", { children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0435\u0441\u0435\u0442 \u0438\u043B\u0438 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0437\u0430\u043F\u0440\u043E\u0441 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \"\u0412\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C\"" })] }))] })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCA \u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 GraphQL" }), _jsx("div", { className: "graphql-flow", children: _jsx("div", { className: "flow-diagram", children: _jsxs("div", { className: "flow-step-visual", children: [_jsxs("div", { className: "flow-box flow-box-client", children: [_jsx("span", { className: "flow-box-icon", children: "\uD83D\uDCBB" }), _jsx("span", { className: "flow-box-label", children: "Client" }), _jsx("div", { className: "flow-box-detail", children: "\u0424\u043E\u0440\u043C\u0438\u0440\u0443\u0435\u0442 GraphQL \u0437\u0430\u043F\u0440\u043E\u0441" })] }), _jsx("div", { className: "flow-arrow", children: "\u2192" }), _jsxs("div", { className: "flow-box flow-box-server", children: [_jsx("span", { className: "flow-box-icon", children: "\uD83D\uDDA5\uFE0F" }), _jsx("span", { className: "flow-box-label", children: "GraphQL Server" }), _jsx("div", { className: "flow-box-detail", children: "\u041F\u0430\u0440\u0441\u0438\u043D\u0433 \u2192 \u0412\u0430\u043B\u0438\u0434\u0430\u0446\u0438\u044F \u2192 \u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435" })] }), _jsx("div", { className: "flow-arrow", children: "\u2192" }), _jsxs("div", { className: "flow-box flow-box-resolvers", children: [_jsx("span", { className: "flow-box-icon", children: "\u2699\uFE0F" }), _jsx("span", { className: "flow-box-label", children: "Resolvers" }), _jsx("div", { className: "flow-box-detail", children: "\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432" })] })] }) }) })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\u2696\uFE0F GraphQL vs REST" }), _jsxs("div", { className: "comparison-example", children: [_jsxs("div", { className: "comparison-item", children: [_jsx("h4", { children: "REST: \u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0437\u0430\u043F\u0440\u043E\u0441\u044B" }), _jsx(CodeBlock, { language: "javascript", code: `// Получить пользователя с его постами

// Запрос 1: Получить пользователя
GET /api/users/1
// Ответ: { id, name, email }

// Запрос 2: Получить посты пользователя  
GET /api/users/1/posts
// Ответ: [{ id, title, content }, ...]

// Запрос 3: Для каждого поста - комментарии
GET /api/posts/1/comments
GET /api/posts/2/comments
// ...

// Итого: N+2 запросов (N+1 problem)` })] }), _jsxs("div", { className: "comparison-item comparison-item-highlight", children: [_jsx("h4", { children: "GraphQL: \u041E\u0434\u0438\u043D \u0437\u0430\u043F\u0440\u043E\u0441" }), _jsx(CodeBlock, { language: "graphql", code: `# Получить всё за один запрос

query {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
      content
      comments {
        id
        text
        author { name }
      }
    }
  }
}

# Итого: 1 запрос, точные данные` })] })] })] }), _jsxs("section", { className: "card", children: [_jsx("h2", { children: "\uD83D\uDCCB \u0421\u0445\u0435\u043C\u0430 API" }), _jsx(CodeBlock, { language: "graphql", code: `type User {
  id: ID!
  name: String!
  email: String!
  role: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: String!
}

type Query {
  users: [User!]!
  user(id: ID!): User
  posts: [Post!]!
  post(id: ID!): Post
}

type Mutation {
  createUser(name: String!, email: String!, role: String): User!
  updateUser(id: ID!, name: String, email: String, role: String): User
  deleteUser(id: ID!): User
  createPost(title: String!, content: String!, authorId: ID!): Post!
}

type Subscription {
  messageSent: Message!
  userCreated: User!
}` })] })] }));
}
