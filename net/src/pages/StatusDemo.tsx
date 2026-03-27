import { useState } from 'react'

export default function StatusDemo() {
  const [result, setResult] = useState<any>(null)
  const [loadingCode, setLoadingCode] = useState<number | null>(null)

  const fetchStatus = async (code: number) => {
    setLoadingCode(code)
    setResult(null)
    try {
      const res = await fetch(`/api/status/${code}`)
      
      // Читаем body даже если статус ошибка
      // (fetch не кидает reject на 404/500, только на network error)
      const data = await res.json()
      
      setResult({
        status: res.status,
        ok: res.ok,
        statusText: res.statusText,
        data
      })
    } catch (e: any) {
      setResult({ error: e.message })
    } finally {
      setLoadingCode(null)
    }
  }

  return (
    <div className="page-container">
      <h2>HTTP Status Codes</h2>
      <p>Интерактивная проверка того, как fetch обрабатывает разные статусы.</p>

      <div className="grid-2">
        <div className="card">
          <h3>Success (2xx)</h3>
          <div className="button-group">
            <button onClick={() => fetchStatus(200)}>200 OK</button>
            <button onClick={() => fetchStatus(201)}>201 Created</button>
            <button onClick={() => fetchStatus(204)}>204 No Content</button>
          </div>

          <h3>Errors (4xx)</h3>
          <div className="button-group">
            <button onClick={() => fetchStatus(400)} className="error-btn">400 Bad Req</button>
            <button onClick={() => fetchStatus(401)} className="error-btn">401 Unauth</button>
            <button onClick={() => fetchStatus(403)} className="error-btn">403 Forbidden</button>
            <button onClick={() => fetchStatus(404)} className="error-btn">404 Not Found</button>
            <button onClick={() => fetchStatus(429)} className="error-btn">429 Too Many</button>
          </div>

          <h3>Server Errors (5xx)</h3>
          <div className="button-group">
            <button onClick={() => fetchStatus(500)} className="error-btn">500 Internal</button>
            <button onClick={() => fetchStatus(502)} className="error-btn">502 Bad Gateway</button>
            <button onClick={() => fetchStatus(503)} className="error-btn">503 Service Unav</button>
          </div>
        </div>

        <div className="card">
          <h3>Response</h3>
          {loadingCode && <div>Loading...</div>}
          {result && (
            <div className={`status-result ${result.ok ? 'success' : 'error'}`}>
              <div className="status-badge">
                {result.status} {result.statusText}
              </div>
              <pre>{JSON.stringify(result, null, 2)}</pre>
              
              <div className="explanation">
                <strong>Обработка в fetch:</strong>
                {result.ok 
                  ? <p>✅ <code>res.ok === true</code>. Код в диапазоне 200-299. Promise resolved успешно.</p>
                  : <p>⚠️ <code>res.ok === false</code>. Fetch <b>НЕ</b> выбрасывает исключение (catch не сработал), вы должны проверить <code>if (!res.ok)</code> вручную!</p>
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
