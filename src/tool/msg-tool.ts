/**
 * @desc   msg-tool.ts
 * @author yijie
 * @date   2021-04-07 19:03
 * @notes  2021-04-07 19:03 yijie 创建了 msg-tool.ts 文件
 */
import { Session } from 'koishi-core'
import { segment } from 'koishi'

class MsgTool {
  at(id: string) {
    return segment('at', { id: id })
  }
  atMe(session: Session) {
    return segment('at', { id: session?.author?.userId ?? '' })
  }
  img(url: string) {
    return segment('image', { url: url })
  }
}

export const msgTool = new MsgTool()
