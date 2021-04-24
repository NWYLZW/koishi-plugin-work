import { Context } from 'koishi-core'
import { renderToString } from 'react-dom/server'
import * as React from 'react'
import { userTool } from '../tool/user-tool'
import { renderTool } from '../tool/render-tool'
import { listTodos } from '../todos'
import { StaticTodos } from './components/static-todos'

export const registerTodosRoutes = (ctx: Context) => {
  const koaRouter = ctx.app.router

  koaRouter.use(async (koaCtx, next) => {
    if (/^\/work\/.*/.test(koaCtx.path)) {
      let content = await next()
      if (content.$$typeof === Symbol.for('react.element')) {
        content = renderToString(content)
        koaCtx.body = `
          <head>
            <title></title>
            ${renderTool.renderStyles()}
          </head>
          ${content}
        `
        renderTool.clearStyle()
      }
    } else {
      return await next()
    }
  })

  koaRouter.get('/work/:qqNum/todos/:tag', async (koaCtx, next) => {
    const u = await userTool.getUserFromStr(
      ctx, `onebot:${parseInt(koaCtx.params.qqNum)}`
    )
    const todos = listTodos(u.todos, koaCtx.params.tag, koaCtx.query)

    renderTool.defaultStyles = {
      'label': [ __dirname, '../static/label.scss' ],
      'element': [ __dirname, '../static/element.scss' ],
      'github-md': [ __dirname, '../static/github-markdown.scss' ]
    }

    return (
      <body style={{
        width: '800px'
      }}>
        <StaticTodos todos={todos}/>
      </body>
    )
  })
}
