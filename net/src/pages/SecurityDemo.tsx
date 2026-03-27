import { useState } from 'react'

export default function SecurityDemo() {
  const [directResult, setDirectResult] = useState<string | null>(null)
  const [directError, setDirectError] = useState<string | null>(null)
  
  const [proxyResult, setProxyResult] = useState<string | null>(null)
  const [proxyError, setProxyError] = useState<string | null>(null)

  const fetchDirect = async () => {
    setDirectResult(null)
    setDirectError(null)
    try {
      // Прямой запрос на порт сервера (3206)
      // Браузер заблокирует это, так как Origin (3205) != Server (3206)
      // и сервер не присылает заголовки Access-Control-Allow-Origin
      const res = await fetch('http://localhost:3206/api/demo/no-cors')
      const data = await res.json()
      setDirectResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setDirectError('Ошибка запроса! (Скорее всего CORS заблокировал доступ)')
      console.error(err)
    }
  }

  const fetchProxy = async () => {
    setProxyResult(null)
    setProxyError(null)
    try {
      // Запрос через Vite Proxy
      // Для браузера это запрос на тот же домен (localhost:3205/api/...)
      // Vite под капотом пересылает его на 3206.
      const res = await fetch('/api/demo/no-cors')
      const data = await res.json()
      setProxyResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setProxyError('Ошибка запроса')
      console.error(err)
    }
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>🛡 Security & Network Demo</h2>
        <p>Демонстрация работы CORS и настройки Proxy в Vite</p>
      </div>

      <div className="card">
        <h3>CORS (Cross-Origin Resource Sharing)</h3>
        <p className="description">
          Браузеры по умолчанию блокируют запросы к другим доменам (или портам), если сервер явно этого не разрешает.
          <br />
          Сервер (порт 3206) имеет специальный эндпоинт <code>/api/demo/no-cors</code>, который <b>не выдает</b> заголовки CORS.
        </p>

        <div className="grid-2">
          <div className="demo-box">
            <h4>🔴 Прямой запрос</h4>
            <p className="small-text">GET http://localhost:3206/api/demo/no-cors</p>
            <p className="small-text">С порта 3205 на порт 3206 без заголовков.</p>
            <button onClick={fetchDirect} className="action-btn error-btn">
              Отправить запрос
            </button>
            
            {directError && <div className="result-box error">{directError}</div>}
            {directResult && <pre className="result-box success">{directResult}</pre>}
            
            <div className="explanation">
              <strong>Почему ошибка?</strong><br/>
              Браузер видит, что Origin отличается, а сервер не прислал заголовок 
              <code>Access-Control-Allow-Origin</code>. Браузер запрещает скрипту читать ответ ради безопасности.
            </div>
          </div>

          <div className="demo-box">
            <h4>🟢 Запрос через Proxy</h4>
            <p className="small-text">GET /api/demo/no-cors</p>
            <p className="small-text">Браузер думает, что запрос локальный (Same-Origin).</p>
            <button onClick={fetchProxy} className="action-btn success-btn">
              Отправить запрос
            </button>
            
            {proxyError && <div className="result-box error">{proxyError}</div>}
            {proxyResult && <pre className="result-box success">{proxyResult}</pre>}

             <div className="explanation">
              <strong>Почему работает?</strong><br/>
              Запрос идет на <code>localhost:3205</code>. Vite перехватывает его и сам идет на сервер 3206 (сервер-сервер общение). CORS работает только в браузере.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
