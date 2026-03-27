import { useState, useCallback } from 'react';
export function useApi() {
    const [response, setResponse] = useState({
        data: null,
        error: null,
        loading: false,
    });
    const fetchApi = useCallback(async (url, options = {}) => {
        setResponse({ data: null, error: null, loading: true });
        const startTime = performance.now();
        try {
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });
            const endTime = performance.now();
            const time = Math.round(endTime - startTime);
            const data = await res.json();
            const result = {
                data,
                error: res.ok ? null : data.error || 'Request failed',
                loading: false,
                status: res.status,
                statusText: res.statusText,
                time,
            };
            setResponse(result);
            return result;
        }
        catch (err) {
            const endTime = performance.now();
            const time = Math.round(endTime - startTime);
            const result = {
                data: null,
                error: err instanceof Error ? err.message : 'Unknown error',
                loading: false,
                time,
            };
            setResponse(result);
            return result;
        }
    }, []);
    const reset = useCallback(() => {
        setResponse({ data: null, error: null, loading: false });
    }, []);
    return { ...response, fetchApi, reset };
}
