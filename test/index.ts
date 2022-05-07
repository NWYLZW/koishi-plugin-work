/**
 * @desc   index.ts
 * @author yijie
 * @date   2021-04-24 17:32
 * @notes  2021-04-24 17:32 yijie 创建了 index.ts 文件
 * @notes  2022-05-08 02:52 JST test no longer works because: koishi-test-utils does not provided koishi v4 test utils.
 */
import { App } from 'koishi-test-utils'

import * as work from 'koishi-plugin-work'
import { aTodoTemplate, staticTodosTemplate } from '../src/subcommands/todos'
import { Todo } from 'koishi-plugin-work/views/components/todo-card'
import { User } from 'koishi'

const app = new App({
  mockDatabase: true
})

app.plugin(work, {})

describe('Work Plugin', async () => {
  describe('Basic Test', async () => {
    before(async () => {
      await app.database.initUser('001', 4)
    })

    const ses = app.session(
      '001'
    )
    const curUserData = async (): Promise<User> => await app.database.memory.getUser('mock', ses.userId)

    const waitAddTodos: (Pick<Todo, 'name' | 'desc' | 'tags'>)[] = [{
      name: 'test01',
      desc: 'some dec',
      tags: []
    }, {
      name: 'test02',
      desc: 'some dec',
      tags: [ 'demo' ]
    }]

    it('add todo', async () => {
      await ses.shouldReply(
        'todos.add', '参数错误'
      )
      const todo = waitAddTodos[0]
      await ses.shouldReply(
        `todos.add ${todo.name} ${todo.desc}`,
        new RegExp(`^\\[${todo.name}📝todo] 添加成功\\n共1📝，❎待完成1，✅已完成0\\n📝.id: .*$`)
      )
    })

    it('list todos', async () => {
      const todos = (await curUserData()).todos
      await ses.shouldReply(
        'todos.list', staticTodosTemplate(todos) + todos.map(todo => aTodoTemplate(todo, true)).join('\n')
      )
    })

    it('update todo', async () => {
      const todos = (await curUserData()).todos
      await ses.shouldReply(
        `todos.update ${todos[0].id} finished`
      )
    })

    it('list updated todos', async () => {
      const todos = (await curUserData()).todos
      await ses.shouldReply(
        'todos.list', staticTodosTemplate(todos) + todos.map(todo => aTodoTemplate(todo, true)).join('\n')
      )
    })

    it('del todo', async () => {
      const todos = (await curUserData()).todos
      await ses.shouldReply(
        `todos.del ${todos[0].id}`, '删除todo成功\n' + staticTodosTemplate(
          todos.filter(todo => todo.id !== todos[0].id)
        )
      )
    })

    it('list deleted todos', async () => {
      const todos = (await curUserData()).todos
      await ses.shouldReply(
        'todos.list', staticTodosTemplate(todos) + todos.map(todo => aTodoTemplate(todo, true)).join('\n')
      )
    })

    it('add tag todo', async () => {
      await ses.shouldReply(
        'todos.add', '参数错误'
      )
      const todo = waitAddTodos[1]
      await ses.shouldReply(
        `todos.add -t ${todo.tags[0]} ${todo.name} ${todo.desc}`,
        new RegExp(`^\\[${todo.name}📝todo] 添加成功\\n共1📝，❎待完成1，✅已完成0\\n📝.id: .*$`)
      )
    })

    it('list tag todos', async () => {
      const tagName = 'demo'
      const todos = (await curUserData()).todos.filter(todo => todo.tags.includes(tagName))
      await ses.shouldReply(
        `todos.list ${tagName}`, staticTodosTemplate(todos) + todos.map(todo => aTodoTemplate(todo, true)).join('\n')
      )
    })
  })
})
