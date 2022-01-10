import { targetMap } from './effect.js'

export const createDep = (target, key) => {
  let DepMap = targetMap.get(target)
  if (DepMap) {
    if (DepMap.get(key)) {
      return DepMap.get(key)
    } else {
      const set = new Set()
      DepMap.set(key, set)
      return set
    }
  } else {
    DepMap = new Map()
    const set = new Set()
    DepMap.set(key, set)
    targetMap.set(target, DepMap)
    return set
  }
}
