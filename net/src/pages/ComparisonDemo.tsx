import CodeBlock from '../components/CodeBlock'

export default function ComparisonDemo() {
  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>⚖️ Сравнение протоколов</h1>
        <p>
          Выбор правильного протокола API зависит от конкретных требований проекта.
          Разберём когда какой протокол лучше использовать.
        </p>
      </div>

      {/* Общее сравнение */}
      <section className="card">
        <h2>📊 Сравнительная таблица</h2>
        
        <div className="comparison-table-full">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Критерий</th>
                <th className="col-rest">REST</th>
                <th className="col-graphql">GraphQL</th>
                <th className="col-websocket">WebSocket</th>
                <th className="col-rpc">JSON-RPC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Тип связи</strong></td>
                <td>Запрос-ответ</td>
                <td>Запрос-ответ</td>
                <td>Двунаправленная</td>
                <td>Запрос-ответ</td>
              </tr>
              <tr>
                <td><strong>Транспорт</strong></td>
                <td>HTTP</td>
                <td>HTTP (+ WS для subscriptions)</td>
                <td>WebSocket</td>
                <td>HTTP/WebSocket</td>
              </tr>
              <tr>
                <td><strong>Формат данных</strong></td>
                <td>JSON/XML/любой</td>
                <td>JSON</td>
                <td>Любой</td>
                <td>JSON</td>
              </tr>
              <tr>
                <td><strong>Типизация</strong></td>
                <td>Нет (OpenAPI опционально)</td>
                <td>Строгая схема</td>
                <td>Нет</td>
                <td>Нет</td>
              </tr>
              <tr>
                <td><strong>Кеширование</strong></td>
                <td>✅ Отличное (HTTP)</td>
                <td>⚠️ Сложнее</td>
                <td>❌ Нет</td>
                <td>⚠️ Сложнее</td>
              </tr>
              <tr>
                <td><strong>Real-time</strong></td>
                <td>❌ Polling/SSE</td>
                <td>✅ Subscriptions</td>
                <td>✅ Нативно</td>
                <td>⚠️ Через WS</td>
              </tr>
              <tr>
                <td><strong>Сложность</strong></td>
                <td>Низкая</td>
                <td>Средняя</td>
                <td>Низкая-Средняя</td>
                <td>Низкая</td>
              </tr>
              <tr>
                <td><strong>Инструменты</strong></td>
                <td>✅ Богатые</td>
                <td>✅ Отличные</td>
                <td>⚠️ Базовые</td>
                <td>⚠️ Ограниченные</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* REST */}
      <section className="card protocol-card protocol-card-rest">
        <div className="protocol-header">
          <div className="protocol-icon">📡</div>
          <div>
            <h2>REST API</h2>
            <p className="protocol-tagline">Архитектурный стиль для веб-сервисов</p>
          </div>
        </div>

        <div className="protocol-content">
          <div className="when-use">
            <h4>✅ Когда использовать</h4>
            <ul>
              <li>Публичные API с кешированием</li>
              <li>CRUD операции над ресурсами</li>
              <li>Простые микросервисы</li>
              <li>Когда важна совместимость</li>
              <li>Мобильные приложения (экономия трафика)</li>
            </ul>
          </div>

          <div className="when-not">
            <h4>❌ Когда НЕ использовать</h4>
            <ul>
              <li>Сложные запросы с множеством связей</li>
              <li>Real-time приложения</li>
              <li>Когда нужна строгая типизация</li>
              <li>Over-fetching/under-fetching критичны</li>
            </ul>
          </div>

          <div className="example-request">
            <h4>Пример</h4>
            <CodeBlock
              language="http"
              code={`GET /api/users/1/posts?include=comments HTTP/1.1

# Ответ содержит ВСЕ поля, даже если нужны только заголовки
{
  "data": [{
    "id": 1,
    "title": "Post",
    "content": "Very long content...",
    "comments": [...]
  }]
}`}
            />
          </div>
        </div>
      </section>

      {/* GraphQL */}
      <section className="card protocol-card protocol-card-graphql">
        <div className="protocol-header">
          <div className="protocol-icon">◈</div>
          <div>
            <h2>GraphQL</h2>
            <p className="protocol-tagline">Язык запросов для API</p>
          </div>
        </div>

        <div className="protocol-content">
          <div className="when-use">
            <h4>✅ Когда использовать</h4>
            <ul>
              <li>Сложные связи между сущностями</li>
              <li>Разные клиенты (web, mobile, desktop)</li>
              <li>Быстрая итерация без версионирования</li>
              <li>Нужна строгая типизация</li>
              <li>Избежание N+1 запросов</li>
            </ul>
          </div>

          <div className="when-not">
            <h4>❌ Когда НЕ использовать</h4>
            <ul>
              <li>Простые CRUD API</li>
              <li>Критично HTTP кеширование</li>
              <li>Загрузка файлов</li>
              <li>Команда не знакома с GraphQL</li>
            </ul>
          </div>

          <div className="example-request">
            <h4>Пример</h4>
            <CodeBlock
              language="graphql"
              code={`query {
  user(id: 1) {
    name
    posts {
      title
      comments { text }
    }
  }
}

# Получаем ТОЛЬКО нужные поля за 1 запрос`}
            />
          </div>
        </div>
      </section>

      {/* WebSocket */}
      <section className="card protocol-card protocol-card-websocket">
        <div className="protocol-header">
          <div className="protocol-icon">⚡</div>
          <div>
            <h2>WebSocket</h2>
            <p className="protocol-tagline">Двунаправленная связь в реальном времени</p>
          </div>
        </div>

        <div className="protocol-content">
          <div className="when-use">
            <h4>✅ Когда использовать</h4>
            <ul>
              <li>Чаты и мессенджеры</li>
              <li>Онлайн-игры</li>
              <li>Биржевые котировки</li>
              <li>Live-уведомления</li>
              <li>Коллаборативное редактирование</li>
            </ul>
          </div>

          <div className="when-not">
            <h4>❌ Когда НЕ использовать</h4>
            <ul>
              <li>Обычные CRUD операции</li>
              <li>Редкие обновления (лучше polling)</li>
              <li>SEO-критичный контент</li>
              <li>Ограниченные ресурсы сервера</li>
            </ul>
          </div>

          <div className="example-request">
            <h4>Пример</h4>
            <CodeBlock
              language="javascript"
              code={`const ws = new WebSocket('ws://api/chat');

// Двунаправленный обмен
ws.send(JSON.stringify({ type: 'message', text: 'Hi!' }));
ws.onmessage = (e) => console.log(e.data);

// Соединение остаётся открытым`}
            />
          </div>
        </div>
      </section>

      {/* JSON-RPC */}
      <section className="card protocol-card protocol-card-rpc">
        <div className="protocol-header">
          <div className="protocol-icon">🔧</div>
          <div>
            <h2>JSON-RPC</h2>
            <p className="protocol-tagline">Удалённый вызов процедур</p>
          </div>
        </div>

        <div className="protocol-content">
          <div className="when-use">
            <h4>✅ Когда использовать</h4>
            <ul>
              <li>Внутренние микросервисы</li>
              <li>Batch операции</li>
              <li>Действия важнее ресурсов</li>
              <li>Простой протокол без overhead</li>
              <li>Blockchain API (Ethereum JSON-RPC)</li>
            </ul>
          </div>

          <div className="when-not">
            <h4>❌ Когда НЕ использовать</h4>
            <ul>
              <li>Публичные RESTful API</li>
              <li>Нужно HTTP кеширование</li>
              <li>Интеграция со сторонними сервисами</li>
              <li>Документация важна</li>
            </ul>
          </div>

          <div className="example-request">
            <h4>Пример</h4>
            <CodeBlock
              language="json"
              code={`// Все запросы идут на один endpoint
POST /rpc
{
  "jsonrpc": "2.0",
  "method": "user.create",
  "params": { "name": "John" },
  "id": 1
}`}
            />
          </div>
        </div>
      </section>

      {/* Сценарии выбора */}
      <section className="card">
        <h2>🎯 Как выбрать?</h2>
        
        <div className="decision-tree">
          <div className="decision-node">
            <div className="decision-question">Нужен real-time?</div>
            <div className="decision-branches">
              <div className="decision-branch decision-yes">
                <span className="decision-label">Да</span>
                <div className="decision-node">
                  <div className="decision-question">Двунаправленная связь?</div>
                  <div className="decision-branches">
                    <div className="decision-branch decision-yes">
                      <span className="decision-label">Да</span>
                      <div className="decision-result decision-result-websocket">
                        ⚡ WebSocket
                      </div>
                    </div>
                    <div className="decision-branch decision-no">
                      <span className="decision-label">Нет</span>
                      <div className="decision-result decision-result-graphql">
                        ◈ GraphQL Subscriptions
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="decision-branch decision-no">
                <span className="decision-label">Нет</span>
                <div className="decision-node">
                  <div className="decision-question">Сложные связи данных?</div>
                  <div className="decision-branches">
                    <div className="decision-branch decision-yes">
                      <span className="decision-label">Да</span>
                      <div className="decision-result decision-result-graphql">
                        ◈ GraphQL
                      </div>
                    </div>
                    <div className="decision-branch decision-no">
                      <span className="decision-label">Нет</span>
                      <div className="decision-node">
                        <div className="decision-question">Публичный API?</div>
                        <div className="decision-branches">
                          <div className="decision-branch decision-yes">
                            <span className="decision-label">Да</span>
                            <div className="decision-result decision-result-rest">
                              📡 REST
                            </div>
                          </div>
                          <div className="decision-branch decision-no">
                            <span className="decision-label">Нет</span>
                            <div className="decision-result decision-result-rpc">
                              🔧 JSON-RPC
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Комбинирование */}
      <section className="card">
        <h2>🔀 Комбинирование протоколов</h2>
        <p className="section-intro">
          В реальных проектах часто используется комбинация протоколов:
        </p>

        <div className="combination-examples">
          <div className="combination-item">
            <h4>🛒 E-commerce платформа</h4>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-rest">REST</span>
              <span className="combo-desc">Каталог товаров, заказы</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-graphql">GraphQL</span>
              <span className="combo-desc">Корзина, профиль пользователя</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-websocket">WebSocket</span>
              <span className="combo-desc">Чат поддержки, статус доставки</span>
            </div>
          </div>

          <div className="combination-item">
            <h4>💬 Социальная сеть</h4>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-graphql">GraphQL</span>
              <span className="combo-desc">Лента, профили, связи</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-websocket">WebSocket</span>
              <span className="combo-desc">Сообщения, уведомления</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-rest">REST</span>
              <span className="combo-desc">Загрузка медиа</span>
            </div>
          </div>

          <div className="combination-item">
            <h4>📊 Trading платформа</h4>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-websocket">WebSocket</span>
              <span className="combo-desc">Котировки, ордера</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-rest">REST</span>
              <span className="combo-desc">История, отчёты</span>
            </div>
            <div className="combination-stack">
              <span className="combo-tag combo-tag-rpc">JSON-RPC</span>
              <span className="combo-desc">Blockchain интеграция</span>
            </div>
          </div>
        </div>
      </section>

      {/* Резюме */}
      <section className="card summary-card">
        <h2>📝 Резюме</h2>
        
        <div className="summary-grid">
          <div className="summary-item summary-rest">
            <div className="summary-icon">📡</div>
            <h4>REST</h4>
            <p>Стандарт для публичных API. Простой, кешируемый, понятный.</p>
          </div>
          
          <div className="summary-item summary-graphql">
            <div className="summary-icon">◈</div>
            <h4>GraphQL</h4>
            <p>Для сложных данных. Гибкие запросы, типизация, один endpoint.</p>
          </div>
          
          <div className="summary-item summary-websocket">
            <div className="summary-icon">⚡</div>
            <h4>WebSocket</h4>
            <p>Real-time коммуникация. Чаты, игры, live-данные.</p>
          </div>
          
          <div className="summary-item summary-rpc">
            <div className="summary-icon">🔧</div>
            <h4>JSON-RPC</h4>
            <p>Вызов методов. Простой протокол для внутренних сервисов.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
