import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import GuideQuickStart from './pages/GuideQuickStart.vue'
import ComponentDoc from './pages/ComponentDoc.vue'

import nav from 'virtual:amu-docs-nav'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/guide/quick-start', component: GuideQuickStart },
    {
      path: '/components',
      redirect: nav.components[0]?.route ?? '/'
    },
    {
      path: '/components/:name',
      component: ComponentDoc
    }
  ]
})
