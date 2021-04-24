/**
 * @desc   user-tool.ts
 * @author yijie
 * @date   2021-04-20 15:44
 * @notes  2021-04-20 15:44 yijie 创建了 user-tool.ts 文件
 */
import { Context } from 'koishi-core'
import { User } from 'koishi'

export const userTool = {
  async getUserFromStr (ctx: Context, uStr: string): Promise<
    Pick<User, 'todos' | 'onebot' | 'name' | 'id'>
  > {
    const splits = uStr.split(':')
    const [ type, id ] = splits as [ User.Index, string ]
    let u = await ctx.database.getUser(
      type, id, [ 'todos' ]
    )
    if (u === undefined) {
      await ctx.database.createUser(
        type, id, { todos: [] }
      )
      u = await ctx.database.getUser(type, id)
    }
    return u
  }
}
