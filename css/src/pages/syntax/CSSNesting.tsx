import { useState } from 'react'
import CodeBlock from '@/components/CodeBlock'

export default function CSSNesting() {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('new')

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>
          🪆 CSS Nesting
          <span className="year-badge">2023</span>
        </h1>
        <p>Вложенные селекторы — нативно в CSS, без препроцессоров!</p>
      </div>

      {/* Main comparison */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Сравнение: старый vs новый синтаксис</h3>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('old')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: activeTab === 'old' ? 'var(--accent-react)' : 'var(--bg-code)',
              color: activeTab === 'old' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            ❌ Старый CSS
          </button>
          <button 
            onClick={() => setActiveTab('new')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: '6px',
              background: activeTab === 'new' ? 'var(--accent-vue)' : 'var(--bg-code)',
              color: activeTab === 'new' ? 'white' : 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            ✅ CSS Nesting
          </button>
        </div>

        {activeTab === 'old' ? (
          <CodeBlock code={`.card {
  padding: 20px;
  background: white;
  border-radius: 12px;
}

.card:hover {
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.card .card-title {
  font-size: 1.5rem;
  font-weight: 600;
}

.card .card-title::before {
  content: "→ ";
  color: blue;
}

.card .card-body {
  margin-top: 12px;
}

.card .card-body p {
  line-height: 1.6;
}

/* 😩 Селекторы разбросаны по файлу */`} />
        ) : (
          <CodeBlock code={`.card {
  padding: 20px;
  background: white;
  border-radius: 12px;

  &:hover {
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;

    &::before {
      content: "→ ";
      color: blue;
    }
  }

  .card-body {
    margin-top: 12px;

    p {
      line-height: 1.6;
    }
  }
}

/* 🎉 Всё в одном месте! */`} />
        )}
      </div>

      {/* Live Example: Button */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔘 Живой пример: Кнопка с состояниями</h3>
        </div>

        <style>{`
          .nesting-demo-btn {
            padding: 12px 24px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            position: relative;
            overflow: hidden;
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
            }
            
            &:active {
              transform: translateY(0);
              box-shadow: 0 5px 10px rgba(102, 126, 234, 0.3);
            }
            
            &:disabled {
              opacity: 0.5;
              cursor: not-allowed;
              transform: none;
              box-shadow: none;
            }
            
            &::before {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
              transform: translateX(-100%);
            }
            
            &:hover::before {
              transform: translateX(100%);
              transition: transform 0.6s;
            }
          }
        `}</style>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <button className="nesting-demo-btn">Hover me</button>
          <button className="nesting-demo-btn" disabled>Disabled</button>
        </div>

        <CodeBlock code={`.button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  
  /* Hover состояние */
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
  }
  
  /* Active состояние */
  &:active {
    transform: translateY(0);
  }
  
  /* Disabled состояние */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Псевдоэлемент для shine эффекта */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transform: translateX(-100%);
  }
  
  /* Анимация shine на hover */
  &:hover::before {
    transform: translateX(100%);
    transition: transform 0.6s;
  }
}`} title="CSS с Nesting" />
      </div>

      {/* Live Example: Card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🃏 Живой пример: Карточка</h3>
        </div>

        <style>{`
          .nesting-card {
            max-width: 320px;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            transition: all 0.3s;
            
            &:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0,0,0,0.15);
              
              .nesting-card-img {
                transform: scale(1.05);
              }
              
              .nesting-card-title {
                color: #667eea;
              }
            }
            
            .nesting-card-img-wrap {
              overflow: hidden;
              height: 180px;
            }
            
            .nesting-card-img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: transform 0.3s;
            }
            
            .nesting-card-body {
              padding: 20px;
              
              .nesting-card-title {
                margin: 0 0 8px;
                font-size: 1.25rem;
                transition: color 0.3s;
              }
              
              .nesting-card-text {
                margin: 0;
                color: #666;
                line-height: 1.5;
              }
            }
            
            .nesting-card-footer {
              padding: 16px 20px;
              border-top: 1px solid #eee;
              display: flex;
              justify-content: space-between;
              align-items: center;
              
              .nesting-card-price {
                font-weight: 700;
                font-size: 1.25rem;
                color: #667eea;
              }
              
              .nesting-card-btn {
                padding: 8px 16px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                
                &:hover {
                  background: #5a67d8;
                }
              }
            }
          }
        `}</style>

        <div className="nesting-card">
          <div className="nesting-card-img-wrap">
            <img className="nesting-card-img" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" alt="" />
          </div>
          <div className="nesting-card-body">
            <h4 className="nesting-card-title">Product Card</h4>
            <p className="nesting-card-text">Hover over the card to see nested transitions in action.</p>
          </div>
          <div className="nesting-card-footer">
            <span className="nesting-card-price">$99</span>
            <button className="nesting-card-btn">Buy Now</button>
          </div>
        </div>

        <CodeBlock code={`.card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s;
  
  /* При ховере на карточку... */
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    
    /* ...зум картинки */
    .card-img {
      transform: scale(1.05);
    }
    
    /* ...изменение цвета заголовка */
    .card-title {
      color: #667eea;
    }
  }
  
  .card-img {
    width: 100%;
    transition: transform 0.3s;
  }
  
  .card-body {
    padding: 20px;
    
    .card-title {
      margin: 0 0 8px;
      transition: color 0.3s;
    }
    
    .card-text {
      color: #666;
      line-height: 1.5;
    }
  }
  
  .card-footer {
    padding: 16px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    
    .card-price {
      font-weight: 700;
      color: #667eea;
    }
    
    .card-btn {
      background: #667eea;
      
      &:hover {
        background: #5a67d8;
      }
    }
  }
}`} title="Вложенный hover эффект" />
      </div>

      {/* Media queries inside nesting */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📱 Media Queries внутри селектора</h3>
        </div>

        <style>{`
          .nesting-responsive {
            display: grid;
            gap: 16px;
            grid-template-columns: 1fr;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa, #e4e8ed);
            border-radius: 12px;
            
            @media (min-width: 500px) {
              grid-template-columns: repeat(2, 1fr);
            }
            
            @media (min-width: 700px) {
              grid-template-columns: repeat(3, 1fr);
            }
            
            .nesting-responsive-item {
              padding: 20px;
              background: white;
              border-radius: 8px;
              text-align: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            }
          }
        `}</style>

        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Измените размер окна браузера — сетка адаптируется!
        </p>

        <div className="nesting-responsive">
          <div className="nesting-responsive-item">Item 1</div>
          <div className="nesting-responsive-item">Item 2</div>
          <div className="nesting-responsive-item">Item 3</div>
          <div className="nesting-responsive-item">Item 4</div>
          <div className="nesting-responsive-item">Item 5</div>
          <div className="nesting-responsive-item">Item 6</div>
        </div>

        <CodeBlock code={`.grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;  /* Mobile: 1 колонка */
  
  /* Tablet */
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* Desktop */
  @media (min-width: 700px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .item {
    padding: 20px;
    background: white;
    border-radius: 8px;
  }
}

/* Всё в одном месте! Не нужно искать 
   media queries по всему файлу */`} title="Media Queries внутри Nesting" />
      </div>

      {/* & symbol explained */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">📝 Символ & — ссылка на родителя</h3>
        </div>

        <div className="grid-2">
          <div>
            <CodeBlock code={`.btn {
  /* & = .btn */
  
  &:hover { }     /* .btn:hover */
  &:active { }    /* .btn:active */
  &::before { }   /* .btn::before */
  &.primary { }   /* .btn.primary */
  &[disabled] { } /* .btn[disabled] */
}`} title="& для псевдо-классов/элементов" />
          </div>
          <div>
            <CodeBlock code={`.btn {
  /* Без & = потомок */
  
  span { }        /* .btn span */
  .icon { }       /* .btn .icon */
  
  /* С & в конце = модификатор */
  .dark & { }     /* .dark .btn */
}`} title="Без & — это потомок" />
          </div>
        </div>

        <div className="info-box" style={{ marginTop: '16px' }}>
          <span className="info-box-icon">💡</span>
          <div className="info-box-content">
            <div className="info-box-title">Правило</div>
            <p>
              Если селектор начинается с буквы/точки/# — это потомок.<br/>
              Если нужен псевдокласс, псевдоэлемент или модификатор — используйте <code>&</code>
            </p>
          </div>
        </div>
      </div>

      {/* BEM example */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🏗️ BEM с Nesting</h3>
        </div>

        <style>{`
          .nesting-bem-card {
            padding: 24px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            
            &__header {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 16px;
            }
            
            &__icon {
              width: 48px;
              height: 48px;
              background: linear-gradient(135deg, #667eea, #764ba2);
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 24px;
            }
            
            &__title {
              font-size: 1.25rem;
              font-weight: 600;
              margin: 0;
            }
            
            &__body {
              color: #666;
              line-height: 1.6;
            }
            
            &--featured {
              border: 2px solid #667eea;
              background: linear-gradient(135deg, #f8f9ff, #fff);
            }
          }
        `}</style>

        <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className="nesting-bem-card">
            <div className="nesting-bem-card__header">
              <div className="nesting-bem-card__icon">📦</div>
              <h4 className="nesting-bem-card__title">Regular Card</h4>
            </div>
            <div className="nesting-bem-card__body">
              Base BEM block with elements
            </div>
          </div>
          
          <div className="nesting-bem-card nesting-bem-card--featured">
            <div className="nesting-bem-card__header">
              <div className="nesting-bem-card__icon">⭐</div>
              <h4 className="nesting-bem-card__title">Featured Card</h4>
            </div>
            <div className="nesting-bem-card__body">
              With --featured modifier
            </div>
          </div>
        </div>

        <CodeBlock code={`.card {
  padding: 24px;
  background: white;
  border-radius: 12px;
  
  /* BEM Elements */
  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  &__icon {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 12px;
  }
  
  &__title {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  &__body {
    color: #666;
    line-height: 1.6;
  }
  
  /* BEM Modifier */
  &--featured {
    border: 2px solid #667eea;
    background: linear-gradient(135deg, #f8f9ff, #fff);
  }
}`} title="BEM + CSS Nesting" />
      </div>

      {/* Browser support */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🌐 Поддержка браузеров</h3>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
          gap: '12px',
          marginBottom: '16px'
        }}>
          {[
            { name: 'Chrome', version: '120+', supported: true },
            { name: 'Firefox', version: '117+', supported: true },
            { name: 'Safari', version: '17.2+', supported: true },
            { name: 'Edge', version: '120+', supported: true },
          ].map(browser => (
            <div key={browser.name} style={{
              padding: '16px',
              background: browser.supported ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontWeight: 600 }}>{browser.name}</div>
              <div style={{ 
                fontSize: '0.85rem', 
                color: browser.supported ? 'var(--accent-vue)' : 'var(--accent-react)' 
              }}>
                {browser.version}
              </div>
            </div>
          ))}
        </div>

        <div className="info-box">
          <span className="info-box-icon">✅</span>
          <div className="info-box-content">
            <div className="info-box-title">Можно использовать!</div>
            <p>CSS Nesting поддерживается во всех современных браузерах с конца 2023 года.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
