import { effect } from './reactive/index.js'

// 简易版 renderer
export const render = (template) => {
  const btnIdEventMap = {}
  // 将{{属性名}} 替换为对应的响应式数据
  const newHtml = template
    .replace(/\{\{(\w+)\}\}/g, (match, propName) => {
      return data[propName]
    })
    // 为有点击事件的元素打上标记id
    .replace(/onclick=\"(\w+)\"/g, (match, eventName) => {
      const eventCount = Object.keys(btnIdEventMap).length
      btnIdEventMap[`btn${eventCount}`] = eventName
      return match + ` id="btn${eventCount}" `
    })
  //重新渲染
  app.innerHTML = newHtml
  // 添加点击事件
  for (const btnId in btnIdEventMap) {
    document.getElementById(btnId).onclick = window[btnIdEventMap[btnId]]
  }
}

export const createApp = (id) => {
  const app = document.getElementById(id)
  const template = app.innerHTML
  effect(render.bind(this, template))
  return { render: render.bind(this, template) }
}
