import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T>(component: T): SFCWithInstall<T> => {
  const comp = component as any
  comp.install = (app: App) => {
    const name = comp.name || comp.__name
    if (name) {
      app.component(name, comp)
    }
  }
  return comp as SFCWithInstall<T>
}

export const withInstallFunction = <T>(fn: T, name: string): T & Plugin => {
  ;(fn as any).install = (app: App) => {
    app.config.globalProperties[name] = fn
    app.provide(name, fn)
  }
  return fn as T & Plugin
}
