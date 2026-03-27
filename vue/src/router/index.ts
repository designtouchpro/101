import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const router = createRouter({
  history: import.meta.env.VITE_DEPLOY_TARGET === 'github-pages'
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/Home.vue')
    },
    // Основы
    {
      path: '/basics/template-syntax',
      name: 'template-syntax',
      component: () => import('@/pages/basics/TemplateSyntax.vue')
    },
    {
      path: '/basics/styling',
      name: 'styling',
      component: () => import('@/pages/basics/StylingGuide.vue')
    },
    {
      path: '/basics/v-model',
      name: 'v-model',
      component: () => import('@/pages/basics/VModelDemo.vue')
    },
    // Reactivity
    {
      path: '/reactivity/ref',
      name: 'ref',
      component: () => import('@/pages/reactivity/RefDemo.vue')
    },
    {
      path: '/reactivity/reactive',
      name: 'reactive',
      component: () => import('@/pages/reactivity/ReactiveDemo.vue')
    },
    {
      path: '/reactivity/computed',
      name: 'computed',
      component: () => import('@/pages/reactivity/ComputedDemo.vue')
    },
    {
      path: '/reactivity/watch',
      name: 'watch',
      component: () => import('@/pages/reactivity/WatchDemo.vue')
    },
    {
      path: '/reactivity/comparison',
      name: 'reactivity-comparison',
      component: () => import('@/pages/reactivity/ReactivityComparison.vue')
    },
    {
      path: '/reactivity/overview',
      name: 'reactivity-overview',
      component: () => import('@/pages/reactivity/ReactivityOverview.vue')
    },
    // Lifecycle
    {
      path: '/lifecycle/hooks',
      name: 'lifecycle-hooks',
      component: () => import('@/pages/lifecycle/LifecycleHooks.vue')
    },
    // Components
    {
      path: '/components/props-emits',
      name: 'props-emits',
      component: () => import('@/pages/components/PropsEmits.vue')
    },
    {
      path: '/components/slots',
      name: 'slots',
      component: () => import('@/pages/components/SlotsDemo.vue')
    },
    {
      path: '/components/provide-inject',
      name: 'provide-inject',
      component: () => import('@/pages/components/ProvideInject.vue')
    },
    // Composables
    {
      path: '/composables/intro',
      name: 'composables',
      component: () => import('@/pages/composables/ComposablesIntro.vue')
    },
    // State Management
    {
      path: '/state/pinia',
      name: 'pinia',
      component: () => import('@/pages/state/PiniaGuide.vue')
    },
    // Vue 3.5+ Features
    {
      path: '/versions/vue35',
      name: 'vue35',
      component: () => import('@/pages/versions/Vue35Features.vue')
    },
    // Patterns
    {
      path: '/patterns/components',
      name: 'component-patterns',
      component: () => import('@/pages/patterns/ComponentPatterns.vue')
    },
    // Interactive Demos
    {
      path: '/demos/interactive',
      name: 'interactive-demos',
      component: () => import('@/pages/demos/InteractiveDemos.vue')
    },
    {
      path: '/demos/teleport',
      name: 'teleport',
      component: () => import('@/pages/demos/TeleportDemo.vue')
    },
    // Продвинутое (Собеседование)
    {
      path: '/advanced/custom-directives',
      name: 'custom-directives',
      component: () => import('@/pages/advanced/CustomDirectives.vue')
    },
    {
      path: '/advanced/next-tick',
      name: 'next-tick',
      component: () => import('@/pages/advanced/NextTickDemo.vue')
    },
    {
      path: '/advanced/keep-alive',
      name: 'keep-alive',
      component: () => import('@/pages/advanced/KeepAliveDemo.vue')
    },
    {
      path: '/advanced/error-handling',
      name: 'error-handling',
      component: () => import('@/pages/advanced/ErrorHandling.vue')
    },
    {
      path: '/advanced/reactivity-caveats',
      name: 'reactivity-caveats',
      component: () => import('@/pages/advanced/ReactivityCaveats.vue')
    },
    {
      path: '/advanced/reactivity-deep',
      name: 'advanced-reactivity',
      component: () => import('@/pages/advanced/AdvancedReactivity.vue')
    },
    // Testing
    {
      path: '/testing/guide',
      name: 'testing-guide',
      component: () => import('@/pages/testing/TestingGuide.vue')
    },
    // Routing & Architecture
    {
      path: '/routing/architecture',
      name: 'router-architecture',
      component: () => import('@/pages/routing/RouterArchitecture.vue')
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
