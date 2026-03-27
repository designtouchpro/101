<script setup lang="ts">
import { ref } from 'vue'

const tab = ref<'basics' | 'guards' | 'async' | 'arch'>('basics')

const routeBasics = [
  { feature: 'Dynamic params', code: `{ path: '/user/:id', component: UserPage }\n// useRoute().params.id`, desc: 'Параметры в URL' },
  { feature: 'Query params', code: `// /search?q=vue&page=2\nconst { q, page } = useRoute().query`, desc: 'Строка запроса' },
  { feature: 'Nested routes', code: `{ path: '/user/:id',\n  component: UserLayout,\n  children: [\n    { path: '', component: UserProfile },\n    { path: 'posts', component: UserPosts }\n  ]\n}`, desc: 'Вложенные маршруты + <RouterView>' },
  { feature: 'Named routes', code: `{ path: '/user/:id', name: 'user' }\n// <RouterLink :to="{ name: 'user', params: { id: 1 } }">\nrouter.push({ name: 'user', params: { id: 1 } })`, desc: 'Имена вместо путей — устойчивость к рефакторингу' },
  { feature: 'Route meta', code: `{ path: '/admin', meta: { requiresAuth: true } }\n// route.meta.requiresAuth`, desc: 'Кастомные данные маршрута' },
]

const guardTypes = [
  { guard: 'beforeEach (global)', icon: '🌍', when: 'Каждый переход', useCase: 'Auth check, analytics', code: `router.beforeEach((to, from) => {\n  if (to.meta.requiresAuth && !isAuthenticated()) {\n    return { name: 'login' }\n  }\n})` },
  { guard: 'beforeEnter (per-route)', icon: '🚪', when: 'Конкретный маршрут', useCase: 'Role-based access', code: `{\n  path: '/admin',\n  beforeEnter: (to) => {\n    if (!isAdmin()) return '/forbidden'\n  }\n}` },
  { guard: 'onBeforeRouteLeave', icon: '🚶', when: 'Уход со страницы', useCase: 'Unsaved changes warning', code: `onBeforeRouteLeave((to, from) => {\n  if (hasUnsavedChanges.value) {\n    return confirm('Уйти без сохранения?')\n  }\n})` },
  { guard: 'afterEach (global)', icon: '📊', when: 'После перехода', useCase: 'Page title, scroll, analytics', code: `router.afterEach((to) => {\n  document.title = to.meta.title || 'App'\n  window.scrollTo(0, 0)\n})` },
]

const asyncFeatures = [
  { feature: 'Lazy loading', icon: '💤', code: `component: () => import('@/pages/Heavy.vue')`, desc: 'Каждый маршрут — отдельный chunk. Автоматический code splitting.' },
  { feature: 'Route-level code splitting', icon: '✂️', code: `component: () => import(\n  /* webpackChunkName: "admin" */\n  '@/pages/admin/Dashboard.vue'\n)`, desc: 'Именованные chunks для группировки.' },
  { feature: 'Loading state', icon: '⏳', code: `<Suspense>\n  <RouterView />\n  <template #fallback>\n    <LoadingSpinner />\n  </template>\n</Suspense>`, desc: 'Suspense для отображения загрузки.' },
  { feature: 'Data fetching', icon: '📡', code: `// В setup или onBeforeRouteUpdate\nconst route = useRoute()\nconst data = ref(null)\n\nwatch(() => route.params.id, async (id) => {\n  data.value = await fetchUser(id)\n}, { immediate: true })`, desc: 'Загрузка данных при смене маршрута.' },
]

const archPatterns = [
  { pattern: 'Layout pattern', desc: 'Общий layout (header/sidebar) через вложенные маршруты', code: `// router\n{ path: '/', component: MainLayout,\n  children: [\n    { path: 'dashboard', component: Dashboard },\n    { path: 'settings', component: Settings },\n  ]\n}\n// MainLayout.vue\n<template>\n  <Header /><Sidebar />\n  <main><RouterView /></main>\n</template>` },
  { pattern: 'Store + Router', desc: 'Pinia store для глобального state, router для навигации', code: `// auth.store.ts\nexport const useAuthStore = defineStore('auth', () => {\n  const user = ref(null)\n  const isAuthenticated = computed(() => !!user.value)\n  return { user, isAuthenticated }\n})\n\n// router guard\nrouter.beforeEach((to) => {\n  const auth = useAuthStore()\n  if (to.meta.requiresAuth && !auth.isAuthenticated)\n    return '/login'\n})` },
  { pattern: 'Composable + Route', desc: 'Composable реагирует на route params', code: `// useUser.ts\nexport function useUser() {\n  const route = useRoute()\n  const user = ref(null)\n  \n  watch(() => route.params.id, async (id) => {\n    user.value = await api.getUser(id)\n  }, { immediate: true })\n  \n  return { user }\n}` },
  { pattern: 'Feature folders', desc: 'Группировка по фичам, не по типам файлов', code: `src/\n  features/\n    auth/\n      LoginPage.vue\n      auth.store.ts\n      useAuth.ts\n      auth.routes.ts\n    users/\n      UserList.vue\n      user.store.ts\n      user.routes.ts\n  router/\n    index.ts  // merges feature routes` },
]
</script>

<template>
  <div class="demo-container">
    <h1>🗺️ Vue Router и Архитектура приложения</h1>
    <p>Маршрутизация, guards, lazy loading, и паттерны организации Vue-приложения.</p>

    <div style="display: flex; gap: 8px; margin: 24px 0; flex-wrap: wrap">
      <button
        v-for="[key, label] in [
          ['basics', '🗺️ Основы Router'],
          ['guards', '🛡️ Guards'],
          ['async', '⚡ Async & Lazy'],
          ['arch', '🏗️ Архитектура'],
        ] as const"
        :key="key"
        @click="tab = key as typeof tab"
        :style="{
          padding: '8px 20px',
          borderRadius: '8px',
          border: tab === key ? '2px solid var(--accent)' : '1px solid var(--border)',
          background: tab === key ? 'var(--accent)' : 'var(--card-bg)',
          color: tab === key ? '#fff' : 'var(--text)',
          cursor: 'pointer',
          fontWeight: tab === key ? 600 : 400,
        }"
      >
        {{ label }}
      </button>
    </div>

    <!-- Route Basics -->
    <template v-if="tab === 'basics'">
      <section class="card">
        <h2>🗺️ Vue Router — ключевые фичи</h2>
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div
            v-for="r in routeBasics"
            :key="r.feature"
            style="padding: 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px"
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px">
              <h3 style="margin: 0">{{ r.feature }}</h3>
            </div>
            <p style="margin: 0 0 8px; font-size: 0.85rem; opacity: 0.8">{{ r.desc }}</p>
            <pre style="margin: 0; padding: 10px; background: var(--bg); border-radius: 6px; font-size: 0.8rem; line-height: 1.5; overflow: auto; white-space: pre-wrap">{{ r.code }}</pre>
          </div>
        </div>
      </section>
    </template>

    <!-- Guards -->
    <template v-if="tab === 'guards'">
      <section class="card">
        <h2>🛡️ Navigation Guards</h2>
        <p style="margin-bottom: 16px; font-size: 0.85rem; opacity: 0.8">Порядок: beforeEach → beforeEnter → onBeforeRouteUpdate → afterEach</p>
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div
            v-for="g in guardTypes"
            :key="g.guard"
            style="padding: 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; border-left: 4px solid var(--accent)"
          >
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px">
              <h3 style="margin: 0">{{ g.icon }} {{ g.guard }}</h3>
              <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; background: var(--bg)">{{ g.when }}</span>
            </div>
            <p style="margin: 0 0 8px; font-size: 0.85rem; color: var(--accent)">Use case: {{ g.useCase }}</p>
            <pre style="margin: 0; padding: 10px; background: var(--bg); border-radius: 6px; font-size: 0.8rem; line-height: 1.5; overflow: auto; white-space: pre-wrap">{{ g.code }}</pre>
          </div>
        </div>
      </section>
    </template>

    <!-- Async & Lazy -->
    <template v-if="tab === 'async'">
      <section class="card">
        <h2>⚡ Async Routes и Lazy Loading</h2>
        <div style="display: flex; flex-direction: column; gap: 12px">
          <div
            v-for="f in asyncFeatures"
            :key="f.feature"
            style="padding: 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px"
          >
            <h3 style="margin: 0 0 4px">{{ f.icon }} {{ f.feature }}</h3>
            <p style="margin: 0 0 8px; font-size: 0.85rem">{{ f.desc }}</p>
            <pre style="margin: 0; padding: 10px; background: var(--bg); border-radius: 6px; font-size: 0.8rem; line-height: 1.5; overflow: auto; white-space: pre-wrap">{{ f.code }}</pre>
          </div>
        </div>
      </section>
    </template>

    <!-- Architecture -->
    <template v-if="tab === 'arch'">
      <section class="card">
        <h2>🏗️ Архитектура Vue-приложения</h2>
        <p style="margin-bottom: 16px; font-size: 0.85rem; opacity: 0.8">Как routing взаимодействует с stores и composables.</p>
        <div style="display: flex; flex-direction: column; gap: 16px">
          <div
            v-for="p in archPatterns"
            :key="p.pattern"
            style="padding: 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px"
          >
            <h3 style="margin: 0 0 4px">{{ p.pattern }}</h3>
            <p style="margin: 0 0 8px; font-size: 0.85rem; opacity: 0.8">{{ p.desc }}</p>
            <pre style="margin: 0; padding: 12px; background: var(--bg); border-radius: 6px; font-size: 0.8rem; line-height: 1.5; overflow: auto; white-space: pre-wrap">{{ p.code }}</pre>
          </div>
        </div>
      </section>
    </template>

    <!-- Interview -->
    <section class="card">
      <h2>❓ Вопросы на собесе</h2>
      <div class="interview-item"><div class="q">Какие виды navigation guards есть во Vue Router?</div><div class="a">Global: beforeEach (auth, analytics), afterEach (title, scroll). Per-route: beforeEnter (role check). In-component: onBeforeRouteLeave (unsaved changes), onBeforeRouteUpdate (refetch data). Порядок: global before → per-route → component update → global after.</div></div>
      <div class="interview-item"><div class="q">Как организовать lazy loading маршрутов?</div><div class="a">Dynamic import: component: () => import('@/pages/Page.vue'). Vite/Webpack автоматически делает code splitting. Для UX — Suspense с fallback. Можно группировать chunks через именованные imports. Предзагрузка через router.beforeResolve.</div></div>
      <div class="interview-item"><div class="q">Как store и router взаимодействуют?</div><div class="a">Store (Pinia) хранит глобальный state (auth, user). Router guards используют store для проверок (beforeEach → useAuthStore). Composables могут реагировать на route.params через watch(). Feature folders объединяют store + routes + components в одном модуле.</div></div>
    </section>
  </div>
</template>
