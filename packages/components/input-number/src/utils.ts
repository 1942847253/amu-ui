// Precise math utilities to avoid typical JS floating point errors (0.1 + 0.2)

/**
 * Get the number of decimal places
 * @param num The number to check
 */
export const getPrecision = (num: number | undefined | null): number => {
  if (num === undefined || num === null) return 0
  const numStr = num.toString()
  const dotIndex = numStr.indexOf('.')
  let precision = 0
  if (dotIndex !== -1) {
    precision = numStr.length - dotIndex - 1
  }
  return precision
}

/**
 * Safe addition
 */
export const add = (num1: number, num2: number): number => {
  const p1 = getPrecision(num1)
  const p2 = getPrecision(num2)
  const maxPrecision = Math.max(p1, p2)
  const factor = Math.pow(10, maxPrecision)
  return (Math.round(num1 * factor) + Math.round(num2 * factor)) / factor
}

/**
 * Safe subtraction
 */
export const subtract = (num1: number, num2: number): number => {
    const p1 = getPrecision(num1)
    const p2 = getPrecision(num2)
    const maxPrecision = Math.max(p1, p2)
    const factor = Math.pow(10, maxPrecision)
    return (Math.round(num1 * factor) - Math.round(num2 * factor)) / factor
}

/**
 * Check if the number is valid
 */
export const isNumber = (val: any): val is number => {
    return typeof val === 'number' && !isNaN(val)
}
