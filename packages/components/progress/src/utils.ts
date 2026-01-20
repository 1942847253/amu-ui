import type { ProgressColor, ProgressColorType } from './props'

export const getCurrentColor = (percentage: number, color: ProgressColorType): string => {
  if (typeof color === 'function') {
    return color(percentage)
  } else if (typeof color === 'string') {
    return color
  } else {
    return getLevelColor(percentage, color)
  }
}

const getLevelColor = (percentage: number, color: ProgressColor[]): string => {
  const span = 100
  const series = color.map((item) => {
    if (typeof item === 'string') {
      return {
        color: item,
        percentage: (span * (color.indexOf(item) + 1)) / color.length
      }
    }
    return item
  }).sort((a, b) => a.percentage - b.percentage)

  for (let i = 0; i < series.length; i++) {
    if (percentage <= series[i].percentage) {
      return series[i].color
    }
  }
  return series[series.length - 1]?.color
}
