interface NetworkVisualizerProps {
  requestData?: {
    method?: string
    url?: string
    headers?: Record<string, string>
    body?: unknown
  }
  responseData?: {
    status?: number
    statusText?: string
    headers?: Record<string, string>
    body?: unknown
    time?: number
  }
  isLoading?: boolean
  direction?: 'request' | 'response' | 'both'
}

export default function NetworkVisualizer({ 
  requestData, 
  responseData, 
  isLoading,
  direction = 'both' 
}: NetworkVisualizerProps) {
  return (
    <div className="network-visualizer">
      <div className="network-diagram">
        {/* Client */}
        <div className="network-node network-node-client">
          <div className="network-node-icon">💻</div>
          <div className="network-node-label">Client</div>
        </div>

        {/* Connection Line */}
        <div className="network-connection">
          <div className={`network-line ${isLoading ? 'network-line-active' : ''}`}>
            {(direction === 'request' || direction === 'both') && (
              <div className={`network-packet network-packet-request ${isLoading ? 'network-packet-moving' : ''}`}>
                <span>→</span>
              </div>
            )}
            {(direction === 'response' || direction === 'both') && responseData && (
              <div className="network-packet network-packet-response network-packet-moving-back">
                <span>←</span>
              </div>
            )}
          </div>
          <div className="network-protocol-label">HTTP/HTTPS</div>
        </div>

        {/* Server */}
        <div className="network-node network-node-server">
          <div className="network-node-icon">🖥️</div>
          <div className="network-node-label">Server</div>
        </div>
      </div>

      <div className="network-details">
        {requestData && (
          <div className="network-detail-panel network-detail-request">
            <div className="network-detail-header">
              <span className="network-detail-title">📤 Request</span>
              {requestData.method && (
                <span className={`http-method http-method-${requestData.method.toLowerCase()}`}>
                  {requestData.method}
                </span>
              )}
            </div>
            {requestData.url && (
              <div className="network-detail-url">{requestData.url}</div>
            )}
            {requestData.body && (
              <pre className="network-detail-body">
                {typeof requestData.body === 'string'
                  ? requestData.body
                  : String(JSON.stringify(requestData.body, null, 2))}
              </pre>
            )}
          </div>
        )}

        {responseData && (
          <div className="network-detail-panel network-detail-response">
            <div className="network-detail-header">
              <span className="network-detail-title">📥 Response</span>
              {responseData.status && (
                <span className={`http-status http-status-${Math.floor(responseData.status / 100)}xx`}>
                  {responseData.status} {responseData.statusText}
                </span>
              )}
              {responseData.time && (
                <span className="response-time">{responseData.time}ms</span>
              )}
            </div>
            {responseData.body && (
              <pre className="network-detail-body">
                {typeof responseData.body === 'string'
                  ? responseData.body
                  : String(JSON.stringify(responseData.body, null, 2))}
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
