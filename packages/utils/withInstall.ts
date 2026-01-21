import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export const withInstall = <T, E extends Record<string, any> = Record<string, any>>(
  main: T,
  extra?: E
): SFCWithInstall<T> & E => {
  const comp = main as SFCWithInstall<T> & E
  comp.install = (app: App) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      const c = comp as any
      const name = c.name || c.__name
      if (name) {
        app.component(name, c)
      }
    }
  }
  if (extra) {
    for (const [key, value] of Object.entries(extra)) {
      ;(comp as any)[key] = value
    }
  }
  return comp
}

export const withNoopInstall = <T>(component: T): SFCWithInstall<T> => {
  const comp = component as SFCWithInstall<T>
  comp.install = () => {}
  return comp
}

export const withInstallFunction = <T>(fn: T, name: string): T & Plugin => {
  ;(fn as any).install = (app: App) => {
    app.config.globalProperties[name] = fn
    app.provide(name, fn)
  }
  return fn as T & Plugin
}
