import { createDep } from './dep.js'

const effectStack = []

export const targetMap = new WeakMap()

export const track = (target, key) => {
  const deps = createDep(target, key)
  deps.add(Effect.target)
}

export const trigger = (target, key) => {
  const deps = createDep(target, key)
  for (const effect of deps) {
    effect.run()
  }
}

class Effect {
  constructor(fn) {
    this.fn = fn
  }
  run() {
    effectStack.push(Effect.target)
    this.fn()
    effectStack.pop()
  }
}
Effect.target = undefined

const effect = (fn) => {
  const targetEffect = new Effect(fn)
  Effect.target = targetEffect
  targetEffect.run()
}

export { effect }
