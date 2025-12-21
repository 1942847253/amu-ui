import type { InjectionKey, Ref } from 'vue'

export const BAR_MAP = {
  vertical: {
    offset: 'offsetHeight',
    scroll: 'scrollTop',
    scrollSize: 'scrollHeight',
    size: 'height',
    key: 'vertical',
    axis: 'Y',
    client: 'clientY',
    direction: 'top',
  },
  horizontal: {
    offset: 'offsetWidth',
    scroll: 'scrollLeft',
    scrollSize: 'scrollWidth',
    size: 'width',
    key: 'horizontal',
    axis: 'X',
    client: 'clientX',
    direction: 'left',
  },
} as const

export const renderThumbStyle = ({
  move,
  size,
  bar,
}: {
  move: number
  size: string
  bar: typeof BAR_MAP.vertical | typeof BAR_MAP.horizontal
}) => ({
  [bar.size]: size,
  transform: `translate${bar.axis}(${move}%)`,
})

export interface ScrollbarContext {
  wrapElement: Ref<HTMLDivElement | undefined>
}

export const scrollbarContextKey: InjectionKey<ScrollbarContext> = Symbol('scrollbarContextKey')
