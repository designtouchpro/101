import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
export default function RequestFlow({ steps, direction = 'horizontal' }) {
    const activeRef = useRef(null);
    useEffect(() => {
        if (activeRef.current) {
            activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [steps]);
    return (_jsx("div", { className: `request-flow request-flow-${direction}`, children: steps.map((step, index) => (_jsxs("div", { className: "flow-step-wrapper", children: [_jsxs("div", { ref: step.status === 'active' ? activeRef : null, className: `flow-step flow-step-${step.status}`, children: [_jsxs("div", { className: "flow-step-indicator", children: [step.status === 'completed' && '✓', step.status === 'error' && '✕', step.status === 'active' && _jsx("div", { className: "flow-spinner" }), step.status === 'pending' && (index + 1)] }), _jsxs("div", { className: "flow-step-content", children: [_jsx("span", { className: "flow-step-label", children: step.label }), step.detail && _jsx("span", { className: "flow-step-detail", children: step.detail })] })] }), index < steps.length - 1 && (_jsx("div", { className: `flow-connector flow-connector-${step.status === 'completed' ? 'active' : 'pending'}` }))] }, index))) }));
}
