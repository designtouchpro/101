import { useState, useRef, useEffect } from 'react'

export default function MediaElements() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [pipSupported, setPipSupported] = useState(false)

  useEffect(() => {
    setPipSupported('pictureInPictureEnabled' in document)
  }, [])

  const togglePiP = async () => {
    if (!videoRef.current) return
    
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture()
    } else {
      await videoRef.current.requestPictureInPicture()
    }
  }

  return (
    <div className="page-container">
      <h1>🎬 Media элементы</h1>
      <p className="page-description">
        Продвинутые возможности video, audio, picture и других медиа-элементов.
        Адаптивные изображения, Picture-in-Picture, субтитры и многое другое.
      </p>

      {/* Responsive Images */}
      <div className="card">
        <h2>🖼️ Адаптивные изображения</h2>
        
        <div className="responsive-section">
          <h3><code>srcset</code> + <code>sizes</code></h3>
          <p>Браузер выбирает оптимальное изображение по размеру экрана и плотности пикселей:</p>
          
          <div className="code-block">
            <pre>{`<!-- По плотности пикселей (DPR) -->
<img 
  src="image-400.jpg"
  srcset="image-400.jpg 1x,
          image-800.jpg 2x,
          image-1200.jpg 3x"
  alt="Описание"
>

<!-- По ширине viewport -->
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw,
         (max-width: 1200px) 50vw,
         800px"
  alt="Описание"
>`}</pre>
          </div>

          <div className="info-box">
            <strong>Как работает sizes:</strong>
            <ul>
              <li><code>(max-width: 600px) 100vw</code> — на экранах до 600px изображение занимает 100% ширины</li>
              <li><code>(max-width: 1200px) 50vw</code> — на экранах до 1200px — 50% ширины</li>
              <li><code>800px</code> — по умолчанию 800px</li>
            </ul>
          </div>
        </div>

        <div className="responsive-section" style={{ marginTop: '24px' }}>
          <h3><code>&lt;picture&gt;</code></h3>
          <p>Полный контроль над art direction и форматами:</p>
          
          <div className="code-block">
            <pre>{`<picture>
  <!-- Современные форматы (первый поддерживаемый) -->
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  
  <!-- Art direction: разные изображения для разных экранов -->
  <source 
    media="(max-width: 600px)" 
    srcset="mobile-crop.jpg"
  >
  <source 
    media="(min-width: 1200px)" 
    srcset="desktop-wide.jpg"
  >
  
  <!-- Fallback -->
  <img src="fallback.jpg" alt="Описание" loading="lazy">
</picture>`}</pre>
          </div>
        </div>
      </div>

      {/* Loading and Decoding */}
      <div className="card">
        <h2>⚡ Оптимизация загрузки</h2>
        
        <div className="optimization-grid">
          <div className="opt-item">
            <h4><code>loading="lazy"</code></h4>
            <p>Ленивая загрузка — изображение грузится когда попадает во viewport</p>
            <div className="code-block small">
              <pre>{`<img src="below-fold.jpg" loading="lazy" alt="...">`}</pre>
            </div>
            <div className="opt-note">
              ⚠️ Не используйте для LCP изображений (hero, первый экран)
            </div>
          </div>

          <div className="opt-item">
            <h4><code>loading="eager"</code></h4>
            <p>Немедленная загрузка (по умолчанию)</p>
            <div className="code-block small">
              <pre>{`<img src="hero.jpg" loading="eager" alt="...">`}</pre>
            </div>
          </div>

          <div className="opt-item">
            <h4><code>decoding="async"</code></h4>
            <p>Асинхронное декодирование — не блокирует рендер</p>
            <div className="code-block small">
              <pre>{`<img src="large.jpg" decoding="async" alt="...">`}</pre>
            </div>
          </div>

          <div className="opt-item">
            <h4><code>fetchpriority="high"</code></h4>
            <p>Высокий приоритет загрузки для LCP</p>
            <div className="code-block small">
              <pre>{`<img src="hero.jpg" fetchpriority="high" alt="...">`}</pre>
            </div>
          </div>
        </div>

        <div className="best-combo" style={{ marginTop: '20px' }}>
          <h4>🎯 Лучшие комбинации:</h4>
          <div className="code-block">
            <pre>{`<!-- Hero/LCP изображение -->
<img 
  src="hero.jpg" 
  fetchpriority="high"
  decoding="async"
  alt="Hero"
>

<!-- Изображения ниже первого экрана -->
<img 
  src="gallery.jpg" 
  loading="lazy"
  decoding="async"
  alt="Gallery item"
>

<!-- Предзагрузка LCP в <head> -->
<link 
  rel="preload" 
  as="image" 
  href="hero.jpg" 
  fetchpriority="high"
>`}</pre>
          </div>
        </div>
      </div>

      {/* Aspect Ratio */}
      <div className="card">
        <h2>📐 Aspect Ratio через width/height</h2>
        <p>Указание размеров предотвращает layout shift (CLS):</p>
        
        <div className="code-block">
          <pre>{`<!-- Браузер резервирует место до загрузки -->
<img 
  src="photo.jpg" 
  width="800" 
  height="600"
  style="width: 100%; height: auto;"
  alt="..."
>

<!-- Эквивалент в CSS -->
<style>
  img {
    aspect-ratio: 800 / 600; /* или просто 4/3 */
    width: 100%;
    height: auto;
  }
</style>`}</pre>
        </div>

        <div className="aspect-demo">
          <div className="aspect-box" style={{ aspectRatio: '16/9' }}>16:9</div>
          <div className="aspect-box" style={{ aspectRatio: '4/3' }}>4:3</div>
          <div className="aspect-box" style={{ aspectRatio: '1/1' }}>1:1</div>
          <div className="aspect-box" style={{ aspectRatio: '9/16' }}>9:16</div>
        </div>
      </div>

      {/* Video Features */}
      <div className="card">
        <h2>🎥 Video возможности</h2>
        
        <div className="video-demo">
          <video 
            ref={videoRef}
            controls
            playsInline
            poster="https://picsum.photos/800/450"
            style={{ width: '100%', borderRadius: '12px' }}
          >
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" type="video/webm" />
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            <track 
              kind="subtitles" 
              src="/subtitles.vtt" 
              srcLang="ru" 
              label="Русский"
            />
            Ваш браузер не поддерживает video
          </video>
          
          <div className="video-controls">
            <div className="control-group">
              <label>Скорость:</label>
              <select 
                value={playbackRate} 
                onChange={(e) => {
                  const rate = parseFloat(e.target.value)
                  setPlaybackRate(rate)
                  if (videoRef.current) videoRef.current.playbackRate = rate
                }}
              >
                <option value="0.5">0.5x</option>
                <option value="0.75">0.75x</option>
                <option value="1">1x</option>
                <option value="1.25">1.25x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2x</option>
              </select>
            </div>
            
            {pipSupported && (
              <button onClick={togglePiP} className="btn btn-secondary">
                📺 Picture-in-Picture
              </button>
            )}
          </div>
        </div>

        <div className="video-attrs" style={{ marginTop: '20px' }}>
          <h4>Важные атрибуты:</h4>
          <div className="attrs-grid">
            <div className="attr">
              <code>playsinline</code>
              <span>Воспроизведение inline на iOS (не fullscreen)</span>
            </div>
            <div className="attr">
              <code>poster</code>
              <span>Превью до загрузки видео</span>
            </div>
            <div className="attr">
              <code>preload="none|metadata|auto"</code>
              <span>Что предзагружать</span>
            </div>
            <div className="attr">
              <code>muted</code>
              <span>Для autoplay (браузеры требуют)</span>
            </div>
            <div className="attr">
              <code>loop</code>
              <span>Зацикливание</span>
            </div>
            <div className="attr">
              <code>disablePictureInPicture</code>
              <span>Запретить PiP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subtitles and Tracks */}
      <div className="card">
        <h2>📝 Субтитры и track</h2>
        
        <div className="code-block">
          <pre>{`<video controls>
  <source src="movie.mp4" type="video/mp4">
  
  <!-- Субтитры -->
  <track 
    kind="subtitles" 
    src="subs-ru.vtt" 
    srclang="ru" 
    label="Русский"
    default
  >
  <track 
    kind="subtitles" 
    src="subs-en.vtt" 
    srclang="en" 
    label="English"
  >
  
  <!-- Описание для незрячих -->
  <track 
    kind="descriptions" 
    src="desc.vtt" 
    srclang="ru"
  >
  
  <!-- Главы/разделы -->
  <track 
    kind="chapters" 
    src="chapters.vtt" 
    srclang="ru"
  >
</video>`}</pre>
        </div>

        <div className="vtt-example" style={{ marginTop: '16px' }}>
          <h4>Формат WebVTT:</h4>
          <div className="code-block small">
            <pre>{`WEBVTT

1
00:00:01.000 --> 00:00:04.000
Привет! Это первый субтитр.

2
00:00:04.500 --> 00:00:08.000
А это второй субтитр с <b>форматированием</b>.

3
00:00:08.500 --> 00:00:12.000 line:0 position:50% align:center
Позиционированный субтитр.`}</pre>
          </div>
        </div>

        <div className="track-kinds">
          <h4>Типы track:</h4>
          <ul>
            <li><code>subtitles</code> — перевод диалогов</li>
            <li><code>captions</code> — субтитры для глухих (включая звуки)</li>
            <li><code>descriptions</code> — описание для незрячих</li>
            <li><code>chapters</code> — разделы/главы</li>
            <li><code>metadata</code> — данные для скриптов</li>
          </ul>
        </div>
      </div>

      {/* Audio */}
      <div className="card">
        <h2>🎵 Audio</h2>
        
        <div className="audio-demo">
          <audio controls style={{ width: '100%' }}>
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" type="audio/mpeg" />
          </audio>
        </div>

        <div className="code-block" style={{ marginTop: '16px' }}>
          <pre>{`<audio controls preload="metadata">
  <source src="audio.opus" type="audio/opus">
  <source src="audio.ogg" type="audio/ogg">
  <source src="audio.mp3" type="audio/mpeg">
  Ваш браузер не поддерживает audio
</audio>

<!-- Autoplay (только muted или после user interaction) -->
<audio autoplay muted loop>
  <source src="ambient.mp3" type="audio/mpeg">
</audio>`}</pre>
        </div>
      </div>

      {/* Embed and iframe */}
      <div className="card">
        <h2>🖼️ Embed и iframe</h2>
        
        <div className="code-block">
          <pre>{`<!-- Lazy loading для iframe -->
<iframe 
  src="https://example.com" 
  loading="lazy"
  title="Embedded content"
></iframe>

<!-- Sandbox для безопасности -->
<iframe 
  src="https://untrusted.com"
  sandbox="allow-scripts allow-same-origin"
  title="Sandboxed iframe"
></iframe>

<!-- Атрибут allow для permissions -->
<iframe 
  src="https://maps.google.com/..."
  allow="geolocation; camera; microphone"
  allowfullscreen
  title="Google Maps"
></iframe>

<!-- Credential isolation -->
<iframe 
  src="https://third-party.com"
  credentialless
  title="Third party widget"
></iframe>`}</pre>
        </div>

        <div className="sandbox-perms">
          <h4>Sandbox permissions:</h4>
          <div className="perms-grid">
            <code>allow-scripts</code>
            <code>allow-same-origin</code>
            <code>allow-forms</code>
            <code>allow-popups</code>
            <code>allow-modals</code>
            <code>allow-downloads</code>
          </div>
        </div>
      </div>

      <style>{`
        .responsive-section h3 {
          margin-bottom: 8px;
        }
        .responsive-section p {
          color: var(--text-secondary);
          margin-bottom: 12px;
        }
        .info-box {
          margin-top: 16px;
          padding: 16px;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 8px;
        }
        .info-box ul {
          margin: 8px 0 0;
          padding-left: 20px;
        }
        .info-box li {
          margin: 4px 0;
        }
        .optimization-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }
        .opt-item {
          padding: 16px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .opt-item h4 {
          margin: 0 0 8px;
        }
        .opt-item p {
          margin: 0 0 12px;
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .opt-note {
          font-size: 0.85em;
          color: var(--warning);
          margin-top: 8px;
        }
        .code-block.small pre {
          font-size: 0.8em;
          padding: 8px;
        }
        .best-combo {
          padding: 16px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          border-radius: 12px;
        }
        .best-combo h4 {
          margin: 0 0 12px;
        }
        .aspect-demo {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          flex-wrap: wrap;
        }
        .aspect-box {
          width: 100px;
          background: var(--bg-secondary);
          border: 2px dashed var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: var(--text-secondary);
        }
        .video-demo video {
          background: #000;
        }
        .video-controls {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 12px;
          flex-wrap: wrap;
        }
        .control-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .control-group select {
          padding: 6px 12px;
          border-radius: 6px;
          border: 1px solid var(--border);
          background: var(--bg-secondary);
          color: var(--text);
        }
        .attrs-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .attr {
          display: flex;
          gap: 16px;
          padding: 8px 12px;
          background: var(--bg-secondary);
          border-radius: 6px;
        }
        .attr code {
          min-width: 200px;
          color: var(--accent);
        }
        .attr span {
          font-size: 0.9em;
          color: var(--text-secondary);
        }
        .track-kinds {
          margin-top: 16px;
        }
        .track-kinds ul {
          padding-left: 20px;
          margin-top: 8px;
        }
        .track-kinds li {
          margin: 4px 0;
        }
        .audio-demo {
          padding: 20px;
          background: var(--bg-secondary);
          border-radius: 12px;
        }
        .sandbox-perms {
          margin-top: 16px;
        }
        .perms-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }
        .perms-grid code {
          padding: 4px 8px;
          background: var(--bg-secondary);
          border-radius: 4px;
          font-size: 0.85em;
        }
      `}</style>
    </div>
  )
}
