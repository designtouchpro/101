import { useRef, useState } from 'react'

export default function DialogPopover() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const modalDialogRef = useRef<HTMLDialogElement>(null)
  const [dialogResult, setDialogResult] = useState<string>('')
  
  const openDialog = () => {
    dialogRef.current?.show()
  }
  
  const openModal = () => {
    modalDialogRef.current?.showModal()
  }

  return (
    <div className="page-container">
      <h1>💬 Dialog & Popover</h1>
      <p className="page-description">
        Нативные модальные окна и поповеры — без JavaScript библиотек. 
        Полноценная поддержка accessibility, фокуса, backdrop и keyboard навигации.
      </p>

      {/* Dialog */}
      <div className="card">
        <h2>🗨️ &lt;dialog&gt; — Модальные окна</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Элемент <code>&lt;dialog&gt;</code> — нативное модальное окно с backdrop, 
          trap focus и закрытием по Escape.
        </p>

        <div className="grid-2">
          <div>
            <h4 style={{ marginBottom: '8px' }}>Non-modal (show)</h4>
            <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Не блокирует страницу, нет backdrop
            </p>
            <button className="btn btn-secondary" onClick={openDialog}>
              Открыть dialog.show()
            </button>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '8px' }}>Modal (showModal)</h4>
            <p style={{ fontSize: '0.9em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Блокирует страницу, backdrop, Esc закрывает
            </p>
            <button className="btn btn-primary" onClick={openModal}>
              Открыть dialog.showModal()
            </button>
          </div>
        </div>

        {/* Non-modal dialog */}
        <dialog 
          ref={dialogRef}
          style={{
            padding: '24px',
            borderRadius: '12px',
            border: '1px solid var(--border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow)'
          }}
        >
          <h3 style={{ marginBottom: '12px' }}>Non-modal Dialog</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Это обычный диалог. Страница позади интерактивна.
          </p>
          <button 
            className="btn btn-secondary"
            onClick={() => dialogRef.current?.close()}
          >
            Закрыть
          </button>
        </dialog>

        {/* Modal dialog */}
        <dialog 
          ref={modalDialogRef}
          style={{
            padding: '32px',
            borderRadius: '16px',
            border: 'none',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow)',
            maxWidth: '400px'
          }}
          onClose={(e) => setDialogResult((e.target as HTMLDialogElement).returnValue)}
        >
          <h3 style={{ marginBottom: '16px' }}>Modal Dialog</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Модальный диалог блокирует страницу. Фокус захвачен внутри.
            Нажми Escape или кнопку для закрытия.
          </p>
          <form method="dialog" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button className="btn btn-secondary" value="cancel">Отмена</button>
            <button className="btn btn-primary" value="confirm">Подтвердить</button>
          </form>
        </dialog>

        {dialogResult && (
          <div className="info-box success" style={{ marginTop: '16px' }}>
            <strong>Результат:</strong> dialog.returnValue = "{dialogResult}"
          </div>
        )}

        <div className="code-block" style={{ marginTop: '20px' }}>
          <pre>{`<!-- HTML -->
<dialog id="myDialog">
  <h2>Заголовок</h2>
  <p>Контент диалога</p>
  <form method="dialog">
    <button value="cancel">Отмена</button>
    <button value="ok">OK</button>
  </form>
</dialog>

<!-- JavaScript -->
dialog.show()      // Non-modal
dialog.showModal() // Modal с backdrop
dialog.close()     // Закрыть
dialog.returnValue // Значение кнопки`}</pre>
        </div>
      </div>

      {/* Dialog Backdrop */}
      <div className="card">
        <h2>🎨 Стилизация ::backdrop</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Псевдоэлемент <code>::backdrop</code> — оверлей за модальным окном:
        </p>

        <div className="code-block">
          <pre>{`dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* Анимация появления */
dialog[open] {
  animation: fadeIn 0.3s ease;
}

dialog[open]::backdrop {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}`}</pre>
        </div>
      </div>

      {/* Popover API */}
      <div className="card">
        <h2>🎈 Popover API</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Новый API для поповеров/тултипов. Полностью декларативный — без JavaScript!
        </p>

        <div className="demo-area">
          <h4 style={{ marginBottom: '16px' }}>Интерактивный пример:</h4>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            {/* Auto popover */}
            <div>
              <button 
                // @ts-ignore
                popovertarget="popover-auto"
                className="btn btn-primary"
              >
                Toggle Popover (auto)
              </button>
              <div 
                id="popover-auto" 
                // @ts-ignore
                popover="auto"
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <p style={{ margin: 0 }}>Auto popover — закрывается при клике снаружи</p>
              </div>
            </div>

            {/* Manual popover */}
            <div>
              <button 
                // @ts-ignore
                popovertarget="popover-manual"
                className="btn btn-secondary"
              >
                Toggle Popover (manual)
              </button>
              <div 
                id="popover-manual" 
                // @ts-ignore
                popover="manual"
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--accent)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <p style={{ margin: 0 }}>Manual popover — только кнопкой</p>
              </div>
            </div>

            {/* Show/Hide actions */}
            <div>
              <button 
                // @ts-ignore
                popovertarget="popover-actions"
                popovertargetaction="show"
                className="btn btn-secondary"
                style={{ marginRight: '8px' }}
              >
                Show
              </button>
              <button 
                // @ts-ignore
                popovertarget="popover-actions"
                popovertargetaction="hide"
                className="btn btn-secondary"
              >
                Hide
              </button>
              <div 
                id="popover-actions" 
                // @ts-ignore
                popover="manual"
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <p style={{ margin: 0 }}>Контролируется отдельными кнопками</p>
              </div>
            </div>
          </div>
        </div>

        <div className="code-block" style={{ marginTop: '20px' }}>
          <pre>{`<!-- Auto popover (закрывается при клике снаружи и Esc) -->
<button popovertarget="my-popover">Toggle</button>
<div id="my-popover" popover="auto">
  Контент поповера
</div>

<!-- Manual popover (только программно) -->
<div popover="manual">...</div>

<!-- Раздельные кнопки show/hide -->
<button popovertarget="p1" popovertargetaction="show">Show</button>
<button popovertarget="p1" popovertargetaction="hide">Hide</button>

<!-- JavaScript API -->
element.showPopover()
element.hidePopover()
element.togglePopover()`}</pre>
        </div>
      </div>

      {/* Popover vs Dialog */}
      <div className="card">
        <h2>⚖️ Dialog vs Popover — когда что?</h2>
        
        <div className="grid-2" style={{ marginTop: '16px' }}>
          <div style={{ padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>🗨️ Dialog</h4>
            <ul className="info-list">
              <li>Требует действия пользователя</li>
              <li>Блокирует страницу (modal)</li>
              <li>Форма подтверждения</li>
              <li>Важные уведомления</li>
              <li>Trap focus внутри</li>
            </ul>
          </div>
          
          <div style={{ padding: '20px', background: 'var(--bg-tertiary)', borderRadius: '12px' }}>
            <h4 style={{ color: 'var(--accent)', marginBottom: '12px' }}>🎈 Popover</h4>
            <ul className="info-list">
              <li>Дополнительная информация</li>
              <li>Не блокирует страницу</li>
              <li>Тултипы, дропдауны</li>
              <li>Легко закрывается</li>
              <li>Может быть несколько открытых</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Details/Summary */}
      <div className="card">
        <h2>📂 &lt;details&gt; &lt;summary&gt; — Аккордеон</h2>
        <p style={{ marginBottom: '16px', color: 'var(--text-secondary)' }}>
          Нативный раскрывающийся контент без JavaScript:
        </p>

        <div className="demo-area">
          <details style={{ 
            marginBottom: '8px',
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
              Что такое HTML?
            </summary>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
              HTML (HyperText Markup Language) — язык разметки для создания веб-страниц.
            </p>
          </details>

          <details style={{ 
            marginBottom: '8px',
            padding: '16px',
            background: 'var(--bg-secondary)',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <summary style={{ cursor: 'pointer', fontWeight: '500' }}>
              Чем отличается от XHTML?
            </summary>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
              XHTML требует строгого синтаксиса XML, HTML5 более терпим к ошибкам.
            </p>
          </details>

          <details 
            name="faq-group"
            style={{ 
              marginBottom: '8px',
              padding: '16px',
              background: 'var(--bg-secondary)',
              borderRadius: '8px',
              border: '1px solid var(--accent)'
            }}
          >
            <summary style={{ cursor: 'pointer', fontWeight: '500', color: 'var(--accent)' }}>
              🆕 Эксклюзивный аккордеон (name="group")
            </summary>
            <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
              С атрибутом <code>name</code> можно создать группу — открывается только один элемент!
            </p>
          </details>
        </div>

        <div className="code-block" style={{ marginTop: '16px' }}>
          <pre>{`<!-- Обычный details -->
<details>
  <summary>Заголовок</summary>
  <p>Скрытый контент</p>
</details>

<!-- Открытый по умолчанию -->
<details open>
  <summary>Уже открыт</summary>
  ...
</details>

<!-- Эксклюзивный аккордеон (2024) -->
<details name="faq">
  <summary>Вопрос 1</summary>
  ...
</details>
<details name="faq">
  <summary>Вопрос 2</summary>
  ...
</details>`}</pre>
        </div>
      </div>

      <style>{`
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
        }
        
        dialog[open] {
          animation: dialogFadeIn 0.2s ease;
        }
        
        @keyframes dialogFadeIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        [popover] {
          margin: 0;
          position: fixed;
          inset: unset;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        [popover]:popover-open {
          animation: popoverFadeIn 0.2s ease;
        }

        @keyframes popoverFadeIn {
          from { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        details summary {
          list-style: none;
        }
        
        details summary::-webkit-details-marker {
          display: none;
        }
        
        details summary::before {
          content: '▶';
          display: inline-block;
          margin-right: 8px;
          transition: transform 0.2s;
        }
        
        details[open] summary::before {
          transform: rotate(90deg);
        }
      `}</style>
    </div>
  )
}
