/**
 * @desc   index.ts
 * @author yijie
 * @date   2021-04-24 17:32
 * @notes  2021-04-24 17:32 yijie 创建了 index.ts 文件
 */
import {
  describe, test
} from 'mocha'
import { App } from 'koishi-test-utils'

import * as work from 'koishi-plugin-work'

const app = new App({
  mockDatabase: true
})

app.plugin(work, {})

const firstSes = app.session(
  '123456'
)

describe('Work Plugin', async () => {
  test('basic support', async () => {
    await firstSes.shouldReply(
      'todos.list', '共0📝，❎待完成0，✅已完成0\n'
    )
  })
})
