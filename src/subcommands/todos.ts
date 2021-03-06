/**
 * @desc   todos.ts
 * @author yijie
 * @date   2021-04-09 17:12
 * @notes  2021-04-09 17:12 yijie 创建了 todos.ts 文件
 */
import { Command, /* User, */Context/*, Session*/ } from 'koishi'
import { v4 as uuidv4 } from 'uuid'
import dayjs from 'dayjs'
import * as querystring from 'querystring'
import '@koishijs/plugin-adapter-onebot'

import { Todo, TodoStatus } from '../views/components/todo-card'
import { msgTool } from '../tool/msg-tool'
import { userTool } from '../tool/user-tool'
import { registerTodosRoutes } from '../views/todos.router'
import { pptTool } from '../tool/ppt-tool'

// in v4: ctx.model.extend
// User.extend(() => ({ todos: [] }))

/*

user.onebot no longer exists in v4: https://github.com/koishijs/koishi/blob/master/plugins/adapter/onebot/src/index.ts
this declare only fixes the 
*/
declare module 'koishi' {
  interface User {
    onebot?: string
  }
}
/*
const getUser = async (
  ctx: Context, session: Session
): Promise<User> => {
  return ctx.database.getUser('onebot', session?.author?.userId ?? '')
}
*/
const getTodo = <T extends {todos: Todo[]}>(
  user: T, id: string
): Todo => {
  const todo = user.todos.filter(todo => new RegExp(id).test(todo.id))[0]
  if (todo === undefined) throw new Error('todo不存在')
  return todo
}

export const aTodoTemplate = (
  todo: Todo, isSimple = false
) => {
  const id = isSimple ? todo.id.slice(0, 10) : todo.id
  const tagsStr = todo.tags.length > 0 ? `[${todo.tags.join(', ')}]` : ''
  return `[${dayjs(todo.ctime).format('YYYY-MM-DD HH:mm:ss')}][${id}]${tagsStr}\n` +
    `标题: ${todo.name}\n` +
    `介绍: ${todo?.desc ?? '未描述内容'}\n` +
    `指派人: ${todo.designator?.qq ?? '无指派人'}\n` +
    `================================= (${todo.status})\n`
}

export const staticTodosTemplate = (todos: Todo[]): string => {
  return `共${todos.length}📝，` +
    `❎待完成${todos.filter(todo => todo.status === 'processing').length}，` +
    `✅已完成${todos.filter(todo => todo.status === 'finished').length}\n`
}

export const listTodos = (
  todos: Todo[] = [], tag?: string, options?: {
    week?: boolean
    mouth?: boolean
  }
): Todo[] => {
  if (todos.length > 0 && tag) {
    todos = todos
      .filter(
        todo => tag === undefined || tag === 'all' || (
          todo.tags.length > 0 && todo.tags.indexOf(tag) !== -1
        )
      )
  }
  if (options?.week && !options.mouth) {
    todos = todos.filter(todo => !dayjs(todo.ctime).isBefore(dayjs().add(-7, 'day')))
  }
  if (options?.mouth) {
    todos = todos.filter(todo => !dayjs(todo.ctime).isBefore(dayjs().add(-30, 'day')))
  }
  return todos
}

export const registerSubCommands = (ctx: Context, cmd: Command): void => {
  const baseUrl = `http://localhost:${ctx.app.options.port}`
  registerTodosRoutes(ctx)

  const todoCommand = cmd
    .subcommand('.todos', { authority: 1 })
    .alias('todos')

  const checkId: Command.Action = (argv, id) => {
    if (id === undefined || id === '') return '参数错误'
  }

  todoCommand.subcommand('.add <name> [desc:text]')
    .usage('添加todo到代办列表')
    .option('tag', '-t [tag] 标签')
    .option('isGroup', '-g 指定到当前群组', { type: 'boolean' })
    .option('user', '-u [user:user] 指定用户', { authority: 3 })
    .check((
      _,
      name
    ) => {
      if (name === undefined || name === '') return '参数错误'
    })
    .userFields(['todos', 'onebot'])
    .action(async ({
      session, options
    }, name, desc) => {
      const user = session.user
      let u
      if (options?.user) {
        u = await userTool.getUserFromStr(ctx, options.user)
      } else {
        u = user
      }

      const todo: Todo = {
        id: uuidv4(),
        name,
        desc,
        tags: options?.tag ? [options?.tag] : [],
        status: 'processing',
        designator: { qq: user.onebot },
        ctime: new Date()
      }
      if (!u.todos) u.todos = []
      u.todos.push(todo)
      // await ctx.database.setUser(
      //   'onebot', u.onebot, u
      // )
      return `[${name}📝todo] 添加成功\n` + staticTodosTemplate(u.todos) + `📝.id: ${todo.id}`
    })

  todoCommand.subcommand('.list [tag]')
    .usage('展示已有的todo，第一个参数为设置的标签')
    .option('week', '-w 展示近一周', { type: 'boolean' })
    .option('mouth', '-m 展示近一个月', { type: 'boolean' })
    .option('picture', '-p 以图片的形式展示', { type: 'boolean' })
    .option('isGroup', '-g 指定到当前群组', { type: 'boolean' })
    .option('long', '-l 长信息', { type: 'boolean' })
    .option('user', '-u [user:user] 指定用户', { authority: 3 })
    .userFields(['todos', 'onebot'])
    .action(async ({ session, options }, tag) => {
      const { user } = session
      let u
      if (options?.user) {
        u = await userTool.getUserFromStr(ctx, options.user)
      } else {
        u = user
      }

      if (options.picture) {
        const url = `${baseUrl}/work/${
          u.onebot
        }/todos/${tag ?? 'all'}?${querystring.stringify(options)}`

        await pptTool
          .open(url).$('body').shot()
          .start()
        const img = pptTool.images[0]
        pptTool.images = []
        return img
      }

      const todos = listTodos(u.todos, tag, options)
      return staticTodosTemplate(todos) + todos.map(todo => aTodoTemplate(todo, !options?.long)).join('\n')
    })

  todoCommand.subcommand('.update <id> [status]')
    .usage('更新已有的todo信息，第一个参数为todo的id，可简写但必须唯一。')
    .check(checkId)
    .option('tag', '-t [tag] 标签')
    .option('desc', '-d [desc:text] 介绍')
    .userFields(['todos', 'onebot'])
    .action(async ({
      session,
      options
    }, id, status) => {
      if (
        status && ['processing', 'finished'].indexOf(status) === -1
      ) return '参数错误'
      if (session) {
        try {
          const u = session.user
          // const u = await getUser(ctx, session)
          const todo = getTodo(u, id)

          if (status) todo.status = <TodoStatus> status

          options?.tag && todo.tags.push(options?.tag)
          if (options.desc) todo.desc = options?.desc
          // await ctx.database.setUser(
          //   'onebot', session?.author?.userId ?? '', u
          // )

          if (todo.designator?.qq && todo.designator?.qq !== u.onebot && status === 'finished') {
            return `${msgTool.at(todo.designator?.qq ?? '')}\n${aTodoTemplate(todo)}`
          }
          return aTodoTemplate(todo)
        } catch (e: unknown) {
          if (e instanceof Error) { return e.message }
        }
      }
    })

  todoCommand.subcommand('.get <id>')
    .check(checkId)
    .usage('获取指定的todo信息，第一个参数为todo的id，可简写但必须唯一。')
    .userFields(['todos'])
    .action(async ({
      session
    }, id) => {
      if (session) {
        try {
          const u = session.user
          // const u = await getUser(ctx, session)
          const todo = getTodo(u, id)
          return aTodoTemplate(todo)
        } catch (e: unknown) {
          if (e instanceof Error) { return e.message }
        }
      }
    })

  todoCommand.subcommand('.del <id>')
    .usage('删除指定的todo信息，第一个参数为todo的id，可简写但必须唯一。')
    .check(checkId)
    .userFields(['todos', 'onebot'])
    .action(async ({
      session
    }, id) => {
      try {
        const u = session.user
        const index = u.todos.findIndex(
          todo => new RegExp(`^${id}`).test(todo.id)
        )
        if (index === -1) return '未检索到指定todo，请检查是否存在'

        u.todos.splice(index, 1)
        // await ctx.database.setUser(
        //   'onebot', session?.author?.userId ?? '', u
        // )
        return '删除todo成功\n' + staticTodosTemplate(u.todos)
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.stack)
          return e.message
        }
      }
    })

  todoCommand.subcommand('.clear <tag>')
    .usage('删除指定tag的todo信息，第一个参数为todo的tag。')
    .userFields(['todos'])
    .action(async ({
      session
    }, tag) => {
      if (tag === undefined || tag === '') return '参数错误'
      if (session) {
        try {
          const u = session.user
          // const u = await getUser(ctx, session)
          let index = 0
          do {
            index = u.todos.findIndex(todo => todo.tags.indexOf(tag) !== -1) - 1
            u.todos.splice(index, 1)
          } while (index !== -1)

          // await ctx.database.setUser(
          //   'onebot', session?.author?.userId ?? '', u
          // )
          return `删除todo(${tag})成功`
        } catch (e: unknown) {
          if (e instanceof Error) { return e.message }
        }
      }
    })
}
