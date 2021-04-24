/**
 * @desc   index.ts
 * @author yijie
 * @date   2021-04-09 13:30
 * @notes  2021-04-09 13:30 yijie 创建了 index.ts 文件
 */
import { Context } from 'koishi-core'
import 'koishi-adapter-onebot'
import 'koishi-plugin-puppeteer'

import { registerSubCommands } from './todos'
import { pptTool } from './tool/ppt-tool'

export const name = 'work'

export function apply(ctx: Context, _options?: Record<string, unknown>): void {
  const _logger = ctx.logger('koishi-plugin-work')

  ctx.with([ 'koishi-plugin-puppeteer' ], () => {
    pptTool.initCTX(ctx)
  })

  const workCommand = ctx.command('work', { authority: 1 })
  registerSubCommands(ctx, workCommand)
}
