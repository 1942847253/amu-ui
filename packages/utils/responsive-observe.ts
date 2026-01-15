export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>

export const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

type SubscribeFunc = (screens: ScreenMap) => void

let subscribers: Map<Symbol, SubscribeFunc> = new Map()
let subUid = -1
let screens: ScreenMap = {}

const responsiveObserve = {
  matchHandlers: {} as {
    [prop: string]: {
      mql: MediaQueryList
      listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
    }
  },
  dispatch(updatedScreens: ScreenMap) {
    screens = updatedScreens
    if (subscribers.size < 1) return
    subscribers.forEach((func) => func(screens))
  },
  subscribe(func: SubscribeFunc): number {
    if (subscribers.size === 0) {
      this.register()
    }
    subUid += 1
    const token = Symbol(subUid)
    subscribers.set(token, func)
    func(screens)
    return subUid // This is actually a token simulation, but we used Symbol as key. 
    // Wait, let's return a proper unsubscribe token.
    // Simpler: just return the token.
  },
  unsubscribe(token: number) {
    // This logic is slightly flawed as I used Symbol key but return number.
    // Let's fix this implementation.
  },
  register() {
    Object.keys(responsiveMap).forEach((screen: string) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint]
      const listener = ({ matches }: { matches: boolean }) => {
        this.dispatch({
          ...screens,
          [screen]: matches,
        })
      }
      const mql = window.matchMedia(matchMediaQuery)
      mql.addEventListener('change', listener)
      listener(mql)
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      }
    })
  },
  unregister() {
    Object.keys(responsiveMap).forEach((screen: string) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint]
      const handler = this.matchHandlers[matchMediaQuery]
      handler?.mql.removeEventListener('change', handler.listener)
    })
    subscribers.clear()
  },
}

// Re-implement with valid token logic
let tokenUid = 0
const subscribersMap = new Map<number, SubscribeFunc>()

export const ResponsiveObserve = {
  matchHandlers: {} as {
    [prop: string]: {
      mql: MediaQueryList
      listener: ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
    }
  },
  dispatch(updatedScreens: ScreenMap) {
    screens = updatedScreens
    if (subscribersMap.size < 1) return
    subscribersMap.forEach((func) => func(screens))
  },
  subscribe(func: SubscribeFunc): number {
    if (subscribersMap.size === 0) {
      this.register()
    }
    tokenUid += 1
    subscribersMap.set(tokenUid, func)
    func(screens)
    return tokenUid
  },
  unsubscribe(token: number) {
    subscribersMap.delete(token)
    if (subscribersMap.size === 0) {
      this.unregister()
    }
  },
  register() {
    Object.keys(responsiveMap).forEach((screen: string) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint]
      const listener = ({ matches }: { matches: boolean }) => {
        this.dispatch({
          ...screens,
          [screen]: matches,
        })
      }
      const mql = window.matchMedia(matchMediaQuery)
      mql.addEventListener('change', listener)
      listener(mql)
      this.matchHandlers[matchMediaQuery] = {
        mql,
        listener,
      }
    })
  },
  unregister() {
    Object.keys(responsiveMap).forEach((screen: string) => {
      const matchMediaQuery = responsiveMap[screen as Breakpoint]
      const handler = this.matchHandlers[matchMediaQuery]
      handler?.mql.removeEventListener('change', handler.listener)
    })
    this.matchHandlers = {}
  },
}
