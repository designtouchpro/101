import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Highlight, themes } from 'prism-react-renderer';
export default function CodeBlock({ code, language = 'json', title }) {
    const trimmedCode = code.trim();
    return (_jsxs("div", { className: "code-block-wrapper", children: [title && _jsx("div", { className: "code-block-title", children: title }), _jsx(Highlight, { theme: themes.nightOwl, code: trimmedCode, language: language, children: ({ className, style, tokens, getLineProps, getTokenProps }) => (_jsx("pre", { className: className, style: {
                        ...style,
                        margin: 0,
                        padding: '16px',
                        borderRadius: title ? '0 0 8px 8px' : '8px',
                        fontSize: '0.85rem',
                        lineHeight: '1.6',
                        overflow: 'auto',
                        background: '#011627'
                    }, children: tokens.map((line, i) => (_jsxs("div", { ...getLineProps({ line }), style: { display: 'table-row' }, children: [_jsx("span", { style: {
                                    display: 'table-cell',
                                    paddingRight: '16px',
                                    userSelect: 'none',
                                    opacity: 0.5,
                                    textAlign: 'right',
                                    width: '1%',
                                    whiteSpace: 'nowrap'
                                }, children: i + 1 }), _jsx("span", { style: { display: 'table-cell' }, children: line.map((token, key) => (_jsx("span", { ...getTokenProps({ token }) }, key))) })] }, i))) })) })] }));
}
