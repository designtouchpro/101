import { useState, useLayoutEffect, useEffect, useRef } from 'react'

export default function LayoutEffectDemo() {
  const [count, setCount] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  
  // Эксперимент 1: Мерцание с useEffect
  const [valueEffect, setValueEffect] = useState(0)
  
  // Эксперимент 2: Плавность с useLayoutEffect
  const [valueLayout, setValueLayout] = useState(0)

  // Имитация тяжелых вычислений блокирующих поток
  const now = performance.now()
  while (performance.now() - now < 10) {
    // block 10ms
  }

  useEffect(() => {
    if (valueEffect === 0) {
      setValueEffect(10 + Math.random() * 200)
    }
  }, [valueEffect])

  useLayoutEffect(() => {
    if (valueLayout === 0) {
      setValueLayout(10 + Math.random() * 200)
    }
  }, [valueLayout])

  return (
    <div className="page-container">
      <h2>useEffect vs useLayoutEffect</h2>
      <p>Нажимайте кнопки быстро. <code>useEffect</code> может показать "0" перед скачком, а <code>useLayoutEffect</code> обновит DOM синхронно до отрисовки.</p>

      <div className="grid-2">
        <div className="card">
          <h3>useEffect (Flicker)</h3>
          <p>Значение: 0 &rarr; Random</p>
          <div 
            className="box" 
            style={{ 
              width: '100%', 
              height: '100px', 
              background: '#ef4444',
              marginTop: valueEffect + 'px', // Скачет
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
             }}
          >
            Margin: {valueEffect.toFixed(0)}px
          </div>
          <button onClick={() => setValueEffect(0)}>Сбросить и Пересчитать</button>
        </div>

        <div className="card">
          <h3>useLayoutEffect (Smooth)</h3>
          <p>Значение: 0 &rarr; Random</p>
          <div 
            className="box" 
            style={{ 
              width: '100%', 
              height: '100px', 
              background: '#22c55e',
              marginTop: valueLayout + 'px', // Не скачет визуально
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}
          >
            Margin: {valueLayout.toFixed(0)}px
          </div>
          <button onClick={() => setValueLayout(0)}>Сбросить и Пересчитать</button>
        </div>
      </div>
      
      <div className="explanation">
        <strong>В чем разница?</strong>
        <ul>
          <li><code>useEffect</code> - асинхронный. Браузер успевает отрисовать "0", потом срабатывает эффект, меняет на новое число &rarr; происходит вторая отрисовка (мерцание).</li>
          <li><code>useLayoutEffect</code> - синхронный. Срабатывает ПОСЛЕ изменения DOM, но ДО того, как браузер покрасит пиксели. Пользователь видит сразу финальное состояние.</li>
        </ul>
      </div>
    </div>
  )
}
