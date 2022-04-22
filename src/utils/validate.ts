/**
 * 
 * @param {string} path 
 * @returns {boolean}
 */
export function  isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}