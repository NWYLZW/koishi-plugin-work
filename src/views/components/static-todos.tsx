import { Todo, TodoCard, TodoStatus } from './todo-card'
import * as React from 'react'
import { renderTool } from '../../tool/render-tool'

export const StaticTodos = ({ todos }: {
  todos: Todo[]
}) => {
  renderTool.pushStyles({
    'static-todos': [
      './static/components/static-todos.module.scss'
    ]
  })

  const sumTodos = todos.length
  const getStatusTodos = (status: TodoStatus) =>
    todos.filter(todo => todo.status === status)
  const finishedTodos = getStatusTodos('finished')

  return (
    <div className="staticTodosTemplate">
      <h1>共{sumTodos}📝</h1>
      <h2>
        <label>当前进度 {finishedTodos.length} / {sumTodos}</label>
        <div className="bar">
          <div className="cur-process" style={{
            width: `${finishedTodos.length / sumTodos * 100}%`
          }}/>
        </div>
      </h2>
      {todos.map(todo =>
        <TodoCard key={todo.id} todo={todo}/>
      )}
    </div>
  )
}
