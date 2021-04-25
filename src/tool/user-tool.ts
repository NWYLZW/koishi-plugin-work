/**
 * @desc   user-tool.ts
 * @author yijie
 * @date   2021-04-20 15:44
 * @notes  2021-04-20 15:44 yijie 创建了 user-tool.ts 文件
 */
import { Context } from 'koishi-core'
import { User } from 'koishi'

export const userTool = {
  async getUserFromStr<T extends User.Field>(
    ctx: Context, uStr: string, fields?: readonly T[]
  ): Promise<
    Pick<User, User.Index | T>
  > {
    const splits = uStr.split(':')
    const [ type, id ] = splits as [ User.Index, string ]
    const u = await ctx.database.getUser(
      type, id, fields
    )
    if (u === undefined) {
      await ctx.database.createUser(
        type, id, { todos: [] }
      )
      return await ctx.database.getUser(
        type, id, fields
      ) as Pick<User, User.Index | T>
    }
    return u
  }
}
