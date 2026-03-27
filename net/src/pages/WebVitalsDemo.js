import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useCallback } from 'react';
const metrics = [
    {
        name: 'LCP',
        fullName: 'Largest Contentful Paint',
        good: '≤ 2.5s',
        needsImprovement: '2.5s — 4s',
        poor: '> 4s',
        description: 'Время рендера самого большого видимого элемента (картинка, видео, текстовый блок). Показывает, когда основной контент готов.',
        howToFix: [
            'Оптимизировать картинки (WebP/AVIF, lazy loading)',
            'Preload ключевые ресурсы (<link rel="preload">)',
            'SSR/SSG для быстрого первого рендера',
            'CDN для статики',
            'Убрать render-blocking CSS/JS',
        ],
        color: 'var(--accent-cyan)'
    },
    {
        name: 'INP',
        fullName: 'Interaction to Next Paint',
        good: '≤ 200ms',
        needsImprovement: '200ms — 500ms',
        poor: '> 500ms',
        description: 'Задержка от клика/нажатия до визуального обновления. Заменил FID в 2024. Измеряет ВСЕ взаимодействия за сессию, берёт наихудшее.',
        howToFix: [
            'Избегать длинных задач в main thread (> 50ms)',
            'Разбивать работу через requestIdleCallback / scheduler.yield()',
            'Минимизировать re-render (React.memo, v-once)',
            'Web Workers для тяжёлых вычислений',
            'Оптимизировать обработчики событий',
        ],
        color: 'var(--accent-orange)'
    },
    {
        name: 'CLS',
        fullName: 'Cumulative Layout Shift',
        good: '≤ 0.1',
        needsImprovement: '0.1 — 0.25',
        poor: '> 0.25',
        description: 'Сумма всех неожиданных сдвигов layout. Когда элементы прыгают на странице — плохой CLS. Безразмерная величина (не секунды!).',
        howToFix: [
            'Указывать width/height для img и video',
            'Использовать aspect-ratio в CSS',
            'Резервировать место для рекламы и динамического контента',
            'Избегать вставки контента выше текущего viewport',
            'Использовать font-display: swap + size-adjust',
        ],
        color: 'var(--accent-green)'
    },
];
const secondaryMetrics = [
    { name: 'FCP', fullName: 'First Contentful Paint', desc: 'Время до первого пикселя контента (текст, картинка, SVG). Показывает начало загрузки.', good: '≤ 1.8s' },
    { name: 'TTFB', fullName: 'Time to First Byte', desc: 'Время от запроса до первого байта ответа. Показывает скорость сервера.', good: '≤ 0.8s' },
    { name: 'FID', fullName: 'First Input Delay', desc: '⚠️ Устарел (март 2024). Заменён на INP. Измерял задержку только ПЕРВОГО взаимодействия.', good: '≤ 100ms' },
    { name: 'TBT', fullName: 'Total Blocking Time', desc: 'Суммарное время блокировки main thread (задачи > 50ms). Lab-метрика, коррелирует с INP.', good: '≤ 200ms' },
    { name: 'SI', fullName: 'Speed Index', desc: 'Как быстро контент визуально заполняет viewport. Lab-метрика из Lighthouse.', good: '≤ 3.4s' },
];
export default function WebVitalsDemo() {
    const [activeTab, setActiveTab] = useState('core');
    const [clsDemo, setClsDemo] = useState(false);
    const [lcpTime, setLcpTime] = useState(null);
    const lcpRef = useRef(null);
    const [inpDemo, setInpDemo] = useState(false);
    const [inpTime, setInpTime] = useState(null);
    // Simulate LCP measurement
    useEffect(() => {
        const start = performance.now();
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const last = entries[entries.length - 1];
            setLcpTime(Math.round(last.startTime));
        });
        try {
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
        }
        catch {
            setLcpTime(Math.round(performance.now() - start));
        }
        return () => observer.disconnect();
    }, []);
    // INP demo - simulate heavy work
    const handleInpClick = useCallback(() => {
        const start = performance.now();
        // Simulate heavy computation
        let sum = 0;
        for (let i = 0; i < 10000000; i++)
            sum += Math.sqrt(i);
        setInpDemo(true);
        setInpTime(Math.round(performance.now() - start));
        setTimeout(() => setInpDemo(false), 2000);
    }, []);
    return (_jsxs("div", { className: "page-container", children: [_jsx("h1", { children: "\uD83D\uDCCA Web Vitals" }), _jsx("p", { className: "page-description", children: "Core Web Vitals \u2014 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 Google \u0434\u043B\u044F \u043E\u0446\u0435\u043D\u043A\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u043E\u043F\u044B\u0442\u0430. \u0412\u043B\u0438\u044F\u044E\u0442 \u043D\u0430 SEO-\u0440\u0430\u043D\u0436\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435. \u041E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0437\u043D\u0430\u043D\u0438\u044F \u0434\u043B\u044F \u0444\u0440\u043E\u043D\u0442\u0435\u043D\u0434\u0435\u0440\u0430." }), _jsx("div", { className: "tabs", style: { marginBottom: '24px' }, children: [
                    { key: 'core', label: '⭐ Core Web Vitals' },
                    { key: 'all', label: '📊 Все метрики' },
                    { key: 'measure', label: '🔬 Измерение' },
                    { key: 'interview', label: '🎯 Вопросы' },
                ].map(tab => (_jsx("button", { className: `tab ${activeTab === tab.key ? 'active' : ''}`, onClick: () => setActiveTab(tab.key), children: tab.label }, tab.key))) }), activeTab === 'core' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "card", children: [_jsxs("div", { className: "card-header", children: [_jsx("span", { className: "card-title", children: "\u2B50 Core Web Vitals (2024)" }), _jsx("span", { className: "card-badge", children: "\u0412\u043B\u0438\u044F\u044E\u0442 \u043D\u0430 SEO!" })] }), _jsxs("div", { className: "info-box", children: [_jsx("strong", { children: "3 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 Google:" }), " LCP (\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0430), INP (\u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u044C), CLS (\u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E\u0441\u0442\u044C). \u0417\u0430\u043C\u0435\u043D\u044F\u044E\u0442 \u0441\u0442\u0430\u0440\u044B\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442\u0441\u044F \u0434\u043B\u044F \u0440\u0430\u043D\u0436\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432 Google Search."] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '20px' }, children: metrics.map(metric => (_jsxs("div", { style: {
                                        padding: '20px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '12px',
                                        borderTop: `3px solid ${metric.color}`
                                    }, children: [_jsx("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }, children: _jsx("h3", { style: { color: metric.color, fontSize: '1.3rem' }, children: metric.name }) }), _jsx("div", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }, children: metric.fullName }), _jsx("p", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }, children: metric.description }), _jsxs("div", { style: { display: 'flex', gap: '4px', marginBottom: '16px' }, children: [_jsxs("div", { style: { flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px' }, children: [_jsx("div", { style: { fontSize: '0.7rem', color: 'var(--accent-green)' }, children: "\u0425\u043E\u0440\u043E\u0448\u043E" }), _jsx("div", { style: { fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-green)' }, children: metric.good })] }), _jsxs("div", { style: { flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '4px' }, children: [_jsx("div", { style: { fontSize: '0.7rem', color: 'var(--accent-orange)' }, children: "\u0421\u0440\u0435\u0434\u043D\u0435" }), _jsx("div", { style: { fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-orange)' }, children: metric.needsImprovement })] }), _jsxs("div", { style: { flex: 1, textAlign: 'center', padding: '6px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px' }, children: [_jsx("div", { style: { fontSize: '0.7rem', color: 'var(--accent-red)' }, children: "\u041F\u043B\u043E\u0445\u043E" }), _jsx("div", { style: { fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-red)' }, children: metric.poor })] })] }), _jsx("h4", { style: { fontSize: '0.82rem', marginBottom: '6px' }, children: "\uD83D\uDD27 \u041A\u0430\u043A \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C:" }), _jsx("ul", { style: { margin: 0, paddingLeft: '16px' }, children: metric.howToFix.map((fix, i) => (_jsx("li", { style: { fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.6 }, children: fix }, i))) })] }, metric.name))) })] }), _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83C\uDFAE \u0416\u0438\u0432\u044B\u0435 \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0438" }) }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }, children: [_jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsx("h4", { style: { color: 'var(--accent-cyan)', marginBottom: '8px' }, children: "\uD83D\uDCF8 LCP \u044D\u0442\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" }), _jsxs("div", { ref: lcpRef, style: {
                                                    textAlign: 'center',
                                                    padding: '20px',
                                                    background: 'rgba(6, 182, 212, 0.05)',
                                                    borderRadius: '8px'
                                                }, children: [_jsx("div", { style: { fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)' }, children: lcpTime !== null ? `${lcpTime}ms` : '...' }), _jsx("div", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }, children: "LCP (\u0438\u0437 PerformanceObserver)" })] })] }), _jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsx("h4", { style: { color: 'var(--accent-orange)', marginBottom: '8px' }, children: "\u26A1 INP Demo" }), _jsx("button", { className: "btn btn-primary", onClick: handleInpClick, style: { width: '100%', marginBottom: '8px' }, children: inpDemo ? '⏳ Тяжёлая задача...' : 'Кликни (тяжёлая задача)' }), inpTime !== null && (_jsxs("div", { style: {
                                                    textAlign: 'center',
                                                    padding: '12px',
                                                    background: inpTime > 200 ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)',
                                                    borderRadius: '6px'
                                                }, children: [_jsxs("span", { style: {
                                                            fontWeight: 700,
                                                            color: inpTime > 200 ? 'var(--accent-red)' : 'var(--accent-green)'
                                                        }, children: [inpTime, "ms"] }), _jsx("span", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '8px' }, children: inpTime > 500 ? '(Плохо!)' : inpTime > 200 ? '(Средне)' : '(Хорошо)' })] }))] }), _jsxs("div", { style: { padding: '16px', background: 'var(--bg-code)', borderRadius: '8px' }, children: [_jsx("h4", { style: { color: 'var(--accent-green)', marginBottom: '8px' }, children: "\uD83D\uDCD0 CLS Demo" }), _jsx("button", { className: "btn btn-primary", onClick: () => setClsDemo(!clsDemo), style: { width: '100%', marginBottom: '8px' }, children: clsDemo ? 'Убрать сдвиг' : 'Симулировать CLS' }), _jsxs("div", { style: {
                                                    padding: '12px',
                                                    background: 'rgba(34, 197, 94, 0.05)',
                                                    borderRadius: '6px',
                                                    transition: 'none'
                                                }, children: [clsDemo && (_jsx("div", { style: {
                                                            height: '60px',
                                                            background: 'rgba(239, 68, 68, 0.15)',
                                                            borderRadius: '4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            marginBottom: '8px',
                                                            border: '1px dashed var(--accent-red)',
                                                            fontSize: '0.8rem',
                                                            color: 'var(--accent-red)'
                                                        }, children: "\u2193 \u0412\u043D\u0435\u0437\u0430\u043F\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0441\u0434\u0432\u0438\u0433\u0430\u0435\u0442 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0432\u043D\u0438\u0437!" })), _jsx("div", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)' }, children: "\u042D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442 \u0441\u0434\u0432\u0438\u043D\u0443\u043B\u0441\u044F \u0432\u043D\u0438\u0437. \u042D\u0442\u043E \u0438 \u0435\u0441\u0442\u044C CLS!" })] })] })] })] })] })), activeTab === 'all' && (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDCCA \u0412\u0441\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }) }), _jsxs("div", { className: "info-box", style: { marginBottom: '16px' }, children: [_jsx("strong", { children: "Field vs Lab \u043C\u0435\u0442\u0440\u0438\u043A\u0438:" }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }, children: [_jsxs("div", { children: [_jsx("strong", { style: { color: 'var(--accent-green)' }, children: "Field (RUM)" }), " \u2014 \u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0445 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439. CrUX, web-vitals library. \u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u043E\u043F\u044B\u0442."] }), _jsxs("div", { children: [_jsx("strong", { style: { color: 'var(--accent-cyan)' }, children: "Lab" }), " \u2014 \u0441\u0438\u043D\u0442\u0435\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u0442\u0435\u0441\u0442\u044B. Lighthouse, WebPageTest. \u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0435 \u0443\u0441\u043B\u043E\u0432\u0438\u044F."] })] })] }), _jsx("h4", { style: { marginBottom: '12px' }, children: "\u2B50 Core Web Vitals (Field)" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }, children: metrics.map(m => (_jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: '80px 200px 1fr 100px',
                                gap: '16px',
                                padding: '12px 16px',
                                background: 'var(--bg-code)',
                                borderRadius: '8px',
                                alignItems: 'center',
                                borderLeft: `3px solid ${m.color}`
                            }, children: [_jsx("strong", { style: { color: m.color }, children: m.name }), _jsx("span", { style: { fontSize: '0.8rem', color: 'var(--text-muted)' }, children: m.fullName }), _jsxs("span", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)' }, children: [m.description.split('.')[0], "."] }), _jsxs("span", { style: { fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }, children: ["\u2705 ", m.good] })] }, m.name))) }), _jsx("h4", { style: { marginBottom: '12px' }, children: "\uD83D\uDCCF \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043C\u0435\u0442\u0440\u0438\u043A\u0438" }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '8px' }, children: secondaryMetrics.map(m => (_jsxs("div", { style: {
                                display: 'grid',
                                gridTemplateColumns: '80px 200px 1fr 100px',
                                gap: '16px',
                                padding: '12px 16px',
                                background: 'var(--bg-code)',
                                borderRadius: '8px',
                                alignItems: 'center',
                                opacity: m.name === 'FID' ? 0.6 : 1
                            }, children: [_jsx("strong", { style: { color: m.name === 'FID' ? 'var(--text-muted)' : 'var(--accent-purple)' }, children: m.name }), _jsx("span", { style: { fontSize: '0.8rem', color: 'var(--text-muted)' }, children: m.fullName }), _jsx("span", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)' }, children: m.desc }), _jsxs("span", { style: { fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 600 }, children: ["\u2705 ", m.good] })] }, m.name))) })] })), activeTab === 'measure' && (_jsx(_Fragment, { children: _jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83D\uDD2C \u041A\u0430\u043A \u0438\u0437\u043C\u0435\u0440\u044F\u0442\u044C Web Vitals" }) }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [
                                {
                                    tool: 'web-vitals (npm)',
                                    type: 'Field',
                                    color: 'var(--accent-green)',
                                    code: `import { onLCP, onINP, onCLS } from 'web-vitals'\n\nonLCP(metric => {\n  console.log('LCP:', metric.value)\n  // Отправить в аналитику\n  sendToAnalytics(metric)\n})\n\nonINP(metric => console.log('INP:', metric.value))\nonCLS(metric => console.log('CLS:', metric.value))`
                                },
                                {
                                    tool: 'PerformanceObserver',
                                    type: 'Field',
                                    color: 'var(--accent-cyan)',
                                    code: `// LCP\nnew PerformanceObserver((list) => {\n  const entries = list.getEntries()\n  const lcp = entries[entries.length - 1]\n  console.log('LCP:', lcp.startTime)\n}).observe({ type: 'largest-contentful-paint' })\n\n// Layout Shifts (CLS)\nnew PerformanceObserver((list) => {\n  for (const entry of list.getEntries()) {\n    if (!entry.hadRecentInput) {\n      console.log('CLS shift:', entry.value)\n    }\n  }\n}).observe({ type: 'layout-shift', buffered: true })`
                                },
                                {
                                    tool: 'Lighthouse (Chrome DevTools)',
                                    type: 'Lab',
                                    color: 'var(--accent-orange)',
                                    code: `// Chrome DevTools → Lighthouse tab\n// Или CLI:\nnpx lighthouse https://example.com \\\n  --output=json \\\n  --chrome-flags="--headless"\n\n// Показывает:\n// - Performance Score (0-100)\n// - LCP, TBT, CLS, SI, FCP\n// - Рекомендации по улучшению`
                                },
                                {
                                    tool: 'Chrome DevTools Performance',
                                    type: 'Lab',
                                    color: 'var(--accent-purple)',
                                    code: `// Performance tab → Record\n// Покажет:\n// - Main thread timeline\n// - Long tasks (> 50ms) — красные\n// - Layout shifts\n// - Largest contentful paint marker\n// - Interaction events\n\n// Или через console:\nperformance.mark('start')\n// ... код ...\nperformance.mark('end')\nperformance.measure('My Task', 'start', 'end')`
                                },
                            ].map(item => (_jsxs("div", { style: {
                                    padding: '16px',
                                    background: 'var(--bg-code)',
                                    borderRadius: '8px',
                                    borderTop: `3px solid ${item.color}`
                                }, children: [_jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }, children: [_jsx("h4", { style: { color: item.color }, children: item.tool }), _jsx("span", { style: {
                                                    fontSize: '0.7rem',
                                                    padding: '2px 6px',
                                                    background: `${item.color}15`,
                                                    color: item.color,
                                                    borderRadius: '4px'
                                                }, children: item.type })] }), _jsx("pre", { style: { fontSize: '0.78rem', lineHeight: 1.5, whiteSpace: 'pre-wrap' }, children: item.code })] }, item.tool))) })] }) })), activeTab === 'interview' && (_jsxs("div", { className: "card", children: [_jsx("div", { className: "card-header", children: _jsx("span", { className: "card-title", children: "\uD83C\uDFAF \u0412\u043E\u043F\u0440\u043E\u0441\u044B \u0434\u043B\u044F \u0441\u043E\u0431\u0435\u0441\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F" }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: [
                            {
                                q: 'Какие 3 Core Web Vitals актуальны в 2024+?',
                                a: 'LCP (Largest Contentful Paint) — загрузка, ≤2.5s. INP (Interaction to Next Paint) — интерактивность, ≤200ms. CLS (Cumulative Layout Shift) — стабильность, ≤0.1. FID устарел с марта 2024, заменён на INP.'
                            },
                            {
                                q: 'Чем INP отличается от FID?',
                                a: 'FID мерил задержку только ПЕРВОГО взаимодействия. INP измеряет ВСЕ взаимодействия за сессию и берёт наихудшее (p98). Это гораздо более полная метрика интерактивности.'
                            },
                            {
                                q: 'Как CLS считается? Что такое 0.1?',
                                a: 'CLS = impact fraction × distance fraction. Impact — доля viewport, затронутая сдвигом. Distance — на сколько элемент сдвинулся. Это безразмерная величина. 0.1 — значит сдвиги были минимальны. Сдвиги от user input (клик) НЕ считаются.'
                            },
                            {
                                q: 'Как улучшить LCP?',
                                a: 'Preload ключевые ресурсы, оптимизировать картинки (WebP, srcset), использовать CDN, SSR для первого рендера, убрать render-blocking ресурсы, fetchpriority="high" для LCP-элемента.'
                            },
                            {
                                q: 'Что такое Long Task и как влияет на INP?',
                                a: 'Long Task — JS-задача длиннее 50ms, блокирующая main thread. Пока она выполняется, браузер не может обработать клики. Решение: разбить на мелкие задачи через setTimeout(0), requestIdleCallback или scheduler.yield().'
                            },
                            {
                                q: 'Разница между Field и Lab метриками?',
                                a: 'Field (RUM) — данные реальных пользователей (CrUX, web-vitals). Показывают реальный опыт, но нет контроля условий. Lab — синтетические тесты (Lighthouse). Контролируемые условия, но не отражают разнообразие устройств. Google использует Field данные для ранжирования.'
                            },
                            {
                                q: 'Влияют ли Web Vitals на SEO?',
                                a: 'Да! С 2021 Google использует Core Web Vitals как фактор ранжирования (Page Experience). Но контент остаётся важнее — отличные Web Vitals не помогут при плохом контенте, а плохие Vitals могут снизить позиции при равном контенте.'
                            },
                        ].map((item, i) => (_jsxs("details", { className: "interview-question", children: [_jsx("summary", { style: {
                                        cursor: 'pointer',
                                        padding: '14px 16px',
                                        background: 'var(--bg-code)',
                                        borderRadius: '8px',
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }, children: item.q }), _jsx("div", { style: {
                                        padding: '14px 16px',
                                        color: 'var(--text-secondary)',
                                        lineHeight: 1.6,
                                        borderLeft: '3px solid var(--accent-cyan)',
                                        marginLeft: '16px',
                                        marginTop: '8px'
                                    }, children: item.a })] }, i))) })] }))] }));
}
