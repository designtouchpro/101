import React from 'react';

interface PhoneMockupProps {
  children: React.ReactNode;
  title?: string;
  darkMode?: boolean;
}

export default function PhoneMockup({ children, title, darkMode = false }: PhoneMockupProps) {
  return (
    <div className={`phone-mockup ${darkMode ? 'phone-mockup--dark' : ''}`}>
      <div className="phone-frame">
        <div className="phone-dynamic-island" />
        <div className="phone-status-bar">
          <span className="phone-time">9:41</span>
          <div className="phone-status-icons">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <rect x="0" y="5" width="3" height="7" rx="0.5" opacity="0.3"/>
              <rect x="4.5" y="3" width="3" height="9" rx="0.5" opacity="0.5"/>
              <rect x="9" y="1" width="3" height="11" rx="0.5" opacity="0.7"/>
              <rect x="13.5" y="0" width="2.5" height="12" rx="0.5"/>
            </svg>
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
              <path d="M8 2.2C10.7 2.2 13.1 3.3 14.8 5.1L16 3.9C14 1.8 11.2 0.5 8 0.5S2 1.8 0 3.9L1.2 5.1C2.9 3.3 5.3 2.2 8 2.2Z" opacity="0.3"/>
              <path d="M8 5.5C9.8 5.5 11.4 6.2 12.5 7.4L13.7 6.2C12.3 4.7 10.3 3.8 8 3.8S3.7 4.7 2.3 6.2L3.5 7.4C4.6 6.2 6.2 5.5 8 5.5Z" opacity="0.6"/>
              <path d="M8 8.8C8.9 8.8 9.8 9.2 10.4 9.8L8 12.2L5.6 9.8C6.2 9.2 7.1 8.8 8 8.8Z"/>
            </svg>
            <svg width="25" height="12" viewBox="0 0 25 12" fill="currentColor">
              <rect x="0" y="1" width="21" height="10" rx="2" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.35"/>
              <rect x="22" y="4" width="2" height="4" rx="0.5" opacity="0.4"/>
              <rect x="1.5" y="2.5" width="14" height="7" rx="1" fill="currentColor"/>
            </svg>
          </div>
        </div>
        {title && (
          <div className="phone-nav-bar">
            <span className="phone-nav-back">‹</span>
            <span className="phone-nav-title">{title}</span>
            <span />
          </div>
        )}
        <div className="phone-screen">
          {children}
        </div>
        <div className="phone-home-indicator" />
      </div>
    </div>
  );
}
