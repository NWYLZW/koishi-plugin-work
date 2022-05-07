/**
 * @desc   index.ts
 * @author yijie
 * @date   2021-04-09 13:30
 * @notes  2021-04-09 13:30 yijie 创建了 index.ts 文件
 */
import { Context, Schema } from 'koishi'
import { Todo } from './views/components/todo-card'
import { Config } from './main'
import { pptTool } from './tool/ppt-tool'
import { registerSubCommands } from './subcommands/todos'

export * from './main'

declare module 'koishi' {
  namespace Plugin {
    interface Packages {
      'koishi-plugin-work': typeof import('.')
    }
  }
}

declare module 'koishi' {
  interface User {
    todos: Todo[]
  }
}

export const name = 'work'
export const schema = Schema.object({})
export const apply = (ctx: Context, _config: Config = {}) => {
  ctx.model.extend('user', {
    todos: 'list'
  })
  // const _config = Object.assign(defaultConfig, config)
  const logger = ctx.logger('koishi-plugin-work')
  pptTool.initCTX(ctx)

  const workCommand = ctx.command('work', { authority: 1 })
  registerSubCommands(ctx, workCommand)
  logger.info(
    `koishi-plugin-${name} installed...`
  )
}
