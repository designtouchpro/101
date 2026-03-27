import React from 'react';
import CodeBlock from './CodeBlock';
import PhoneMockup from './PhoneMockup';

interface CodeWithPreviewProps {
  code: string;
  language?: string;
  title?: string;
  previewTitle?: string;
  darkMode?: boolean;
  children: React.ReactNode;
}

export default function CodeWithPreview({
  code,
  language = 'swift',
  title,
  previewTitle,
  darkMode,
  children,
}: CodeWithPreviewProps) {
  return (
    <div className="code-with-preview">
      <div className="code-with-preview__code">
        <CodeBlock language={language} title={title} code={code} />
      </div>
      <div className="code-with-preview__preview">
        <PhoneMockup title={previewTitle} darkMode={darkMode}>
          {children}
        </PhoneMockup>
      </div>
    </div>
  );
}
