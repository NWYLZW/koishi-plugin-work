/**
 * @desc   user-tool.ts
 * @author yijie
 * @date   2021-04-20 15:44
 * @notes  2021-04-20 15:44 yijie 创建了 user-tool.ts 文件
 */
import { Context, User } from 'koishi'
export type Platform = string
export const userTool = {
  async getUserFromStr<T extends User.Field> (
    ctx: Context, uStr: string, fields?: readonly T[]
  ) {
    const splits = uStr.split(':')
    const [type, id] = splits as [ Platform, User['id'] ]
    const u = await ctx.database.getUser(
      //        compliant 'readonly'
      type, id, fields && [...fields]
    )
    if (u === undefined) {
      await ctx.database.setUser(
        type, id, { todos: [] }
      )
      return await ctx.database.getUser(
        //        compliant 'readonly'
        type, id, fields && [...fields]
      )
    }
    return u
  }
}
