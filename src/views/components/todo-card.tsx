import marked from 'marked'
import hljs from 'highlight.js'
import dayjs from 'dayjs'
import * as React from 'react'
import { renderTool } from '../../tool/render-tool'
import { decode } from 'html-entities'

export type TodoStatus = 'processing' | 'finished'

export interface Designator {
  qq: string
}

export interface Todo {
  id: string
  tags: string[]
  name: string
  desc?: string
  status: TodoStatus
  ctime: Date
  designator?: Designator
}

marked.setOptions({
  highlight(
    code: string, lang: string, _callback?: (error: any, code?: string) => void
  ): string | void {
    if (lang !== '') {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  },
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
})

export const TodoCard = ({ todo }: { todo: Todo }) => {
  renderTool.pushStyles({
    'github-highlight': [
      './node_modules/highlight.js/scss/nord.scss'
    ],
    'todo-card': [
      './static/components/todo-card.module.scss'
    ]
  })

  return (
    <div className="todo-card">
      <h2 className="title">
        <span className="status">{
          todo.status === 'processing'?'❎':'✅'
        }</span>
        <span className="el-tag el-tag--success">{todo.id}</span>
      </h2>
      <h2 className="title">
        {decode(todo.name)}
      </h2>
      {todo.tags.length > 0 &&
      <h3>
        {todo.tags.map((tag, index) =>
          <span key={index} className="el-tag">{tag}</span>
        )}
      </h3>
      }
      <h3>介绍</h3>
      <div
        className="desc markdown-body" dangerouslySetInnerHTML={{
          __html: marked(decode(todo?.desc ?? '未描述内容'))
        }}/>
      <div className="designator">
        <h3>指派人</h3>
        <span className="content">
          {todo.designator?.qq ?
            <img className="avatar" src={`http://q.qlogo.cn/headimg_dl?dst_uin=${todo.designator?.qq}&spec=640`} alt=""/> : ''
          }
          <span className="el-tag">{todo.designator?.qq ?? '无指派人'}</span>
        </span>
      </div>
      <div className="datetime">{dayjs(todo.ctime).format('YYYY-MM-DD HH:mm:ss')}</div>
    </div>
  )
}
