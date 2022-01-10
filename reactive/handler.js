import { track, trigger } from './effect.js'

function getHandler(target, propKey, receiver) {
  track(target, propKey)
  return Reflect.get(target, propKey, receiver)
}
function setHandler(target, propKey, value, receiver) {
  const res = Reflect.set(target, propKey, value, receiver)
  trigger(target, propKey)
  return res
}

export const get = getHandler

export const set = setHandler
