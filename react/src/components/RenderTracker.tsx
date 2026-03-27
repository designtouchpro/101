import { useRef, useEffect } from 'react'

export interface LogEntry {
  type: 'mount' | 'update' | 'cleanup' | 'effect'
  message: string
  timestamp: number
}

export function useRenderTracker(_name: string) {
  const renderCount = useRef(0)
  const logs = useRef<LogEntry[]>([])
  const mountTime = useRef(Date.now())

  renderCount.current++

  const addLog = (type: LogEntry['type'], message: string) => {
    const timestamp = Date.now() - mountTime.current
    logs.current = [...logs.current, { type, message, timestamp }]
  }

  return {
    renderCount: renderCount.current,
    logs: logs.current,
    addLog,
    resetLogs: () => {
      logs.current = []
      mountTime.current = Date.now()
    }
  }
}

export function RenderCounter({ count, label = 'Рендеров' }: { count: number; label?: string }) {
  return (
    <div className="render-tracker">
      <div className="render-count">
        <span className="render-count-number">{count}</span>
        <span className="render-count-label">{label}</span>
      </div>
    </div>
  )
}

export function RenderLog({ logs }: { logs: LogEntry[] }) {
  const logRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  }, [logs])

  return (
    <div className="render-log" ref={logRef}>
      {logs.length === 0 && (
        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Лог пуст. Начните взаимодействие...
        </div>
      )}
      {logs.map((log, index) => (
        <div key={index} className={`render-log-entry ${log.type}`}>
          <span style={{ opacity: 0.5 }}>[{log.timestamp}ms]</span>
          <span>{getLogIcon(log.type)}</span>
          <span>{log.message}</span>
        </div>
      ))}
    </div>
  )
}

function getLogIcon(type: LogEntry['type']): string {
  switch (type) {
    case 'mount': return '🟢'
    case 'update': return '🔵'
    case 'cleanup': return '🔴'
    case 'effect': return '🟣'
    default: return '⚪'
  }
}

export function HighlightOnRender({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (ref.current && !isFirstRender.current) {
      ref.current.classList.add('highlight-flash')
      const timer = setTimeout(() => {
        ref.current?.classList.remove('highlight-flash')
      }, 500)
      return () => clearTimeout(timer)
    }
    isFirstRender.current = false
  })

  return <div ref={ref}>{children}</div>
}
