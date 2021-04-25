/**
 * @desc   index.ts
 * @author yijie
 * @date   2021-04-09 13:30
 * @notes  2021-04-09 13:30 yijie 创建了 index.ts 文件
 */
import { Context } from 'koishi-core'
import 'koishi-adapter-onebot'
import 'koishi-plugin-puppeteer'

import { Config } from './main'
import { pptTool } from './tool/ppt-tool'
import { registerSubCommands } from './subcommands/todos'

export * from './main'

declare module 'koishi-core' {
  namespace Plugin {
    interface Packages {
      'koishi-plugin-work': typeof import('.')
    }
  }
}

export const name = 'work'

const defaultConfig: Config = {
}

export const apply = (ctx: Context, config: Config = {}) => {
  const _config = Object.assign(defaultConfig, config)
  const logger = ctx.logger('koishi-plugin-work')
  pptTool.initCTX(ctx)

  const workCommand = ctx.command('work', { authority: 1 })
  registerSubCommands(ctx, workCommand)
  logger.info(
    `koishi-plugin-${name} installed...`
  )
}
