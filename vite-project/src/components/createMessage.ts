import { createApp } from 'vue'
import Message from './Message.vue'
export type MessageType = 'success' | 'error' | 'default'
// 用函数的形式创建一个组件
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // createApp 创建组件实例
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div')
  document.body.appendChild(mountNode)
  //messageInstance 挂载到 mountNode
  messageInstance.mount(mountNode)
  setTimeout(() => {
    // 节点卸载组件
    messageInstance.unmount(mountNode)
    // 删除节点
    document.body.removeChild(mountNode)
  }, timeout)
}
export default createMessage