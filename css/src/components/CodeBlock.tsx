import { useEffect, useRef } from 'react'
import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import xml from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('css', css)
hljs.registerLanguage('html', xml)

interface CodeBlockProps {
  code: string
  language?: 'css' | 'html'
  title?: string
}

export default function CodeBlock({ code, language = 'css', title }: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current)
    }
  }, [code])

  return (
    <div className="code-block">
      {title && (
        <div className="code-block-header">
          <span className="code-block-title">{title}</span>
        </div>
      )}
      <div className="code-block-content">
        <pre>
          <code ref={codeRef} className={`language-${language}`}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  )
}
