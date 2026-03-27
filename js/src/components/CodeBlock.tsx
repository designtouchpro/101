import { useState, useEffect } from 'react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
}

export default function CodeBlock({ code, language = 'javascript', title }: CodeBlockProps) {
  const trimmedCode = code.trim()
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.getAttribute('data-theme') !== 'light'
  )

  useEffect(() => {
    const el = document.documentElement
    const update = () => setIsDark(el.getAttribute('data-theme') !== 'light')
    const observer = new MutationObserver(update)
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    update()
    return () => observer.disconnect()
  }, [])

  return (
    <div className="code-block-wrapper">
      {title && <div className="code-block-title">{title}</div>}
      <Highlight
        theme={isDark ? themes.nightOwl : themes.github}
        code={trimmedCode}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre 
            className={className} 
            style={{ 
              ...style, 
              margin: 0,
              padding: '16px',
              borderRadius: title ? '0 0 8px 8px' : '8px',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              overflow: 'auto',
            }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} style={{ display: 'table-row' }}>
                <span style={{ 
                  display: 'table-cell', 
                  paddingRight: '16px', 
                  userSelect: 'none',
                  opacity: 0.5,
                  textAlign: 'right',
                  width: '1%',
                  whiteSpace: 'nowrap'
                }}>
                  {i + 1}
                </span>
                <span style={{ display: 'table-cell' }}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
