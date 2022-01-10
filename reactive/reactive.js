import { set, get } from './handler.js'

const proxyMap = new WeakMap()

export const reactive = (data) => {
  if (proxyMap.get(data)) {
    return proxyMap.get(data)
  }

  const proxy = new Proxy(data, {
    get,
    set,
  })
  proxyMap.set(data, proxy)
  return proxy
}
