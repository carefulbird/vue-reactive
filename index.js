import { reactive, effect } from './reactive/index.js'
import { createApp } from './render.js'
window.data = reactive({ count: 0 })
window.add = () => {
  data.count = data.count + 1
}
createApp('app')

effect(() => {
  console.log(data.count, 'data.count 变化了')
})
