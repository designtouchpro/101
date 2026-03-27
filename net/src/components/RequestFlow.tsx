import { useEffect, useRef } from 'react'

interface RequestFlowProps {
  steps: {
    label: string
    status: 'pending' | 'active' | 'completed' | 'error'
    detail?: string
  }[]
  direction?: 'horizontal' | 'vertical'
}

export default function RequestFlow({ steps, direction = 'horizontal' }: RequestFlowProps) {
  const activeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }, [steps])

  return (
    <div className={`request-flow request-flow-${direction}`}>
      {steps.map((step, index) => (
        <div key={index} className="flow-step-wrapper">
          <div 
            ref={step.status === 'active' ? activeRef : null}
            className={`flow-step flow-step-${step.status}`}
          >
            <div className="flow-step-indicator">
              {step.status === 'completed' && '✓'}
              {step.status === 'error' && '✕'}
              {step.status === 'active' && <div className="flow-spinner" />}
              {step.status === 'pending' && (index + 1)}
            </div>
            <div className="flow-step-content">
              <span className="flow-step-label">{step.label}</span>
              {step.detail && <span className="flow-step-detail">{step.detail}</span>}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flow-connector flow-connector-${step.status === 'completed' ? 'active' : 'pending'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
