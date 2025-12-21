import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import GuideQuickStart from './pages/GuideQuickStart.vue'
import GuideI18n from './pages/GuideI18n.vue'
import ComponentDoc from './pages/ComponentDoc.vue'

import nav from 'virtual:amu-docs-nav'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/guide/quick-start', component: GuideQuickStart },
    { path: '/guide/i18n', component: GuideI18n },
    {
      path: '/components',
      redirect: nav.groups[0]?.items[0]?.route ?? '/'
    },
    {
      path: '/components/:name',
      component: ComponentDoc
    }
  ]
})
