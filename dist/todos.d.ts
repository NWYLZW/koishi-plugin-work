/**
 * @desc   todos.ts
 * @author yijie
 * @date   2021-04-09 17:12
 * @notes  2021-04-09 17:12 yijie 创建了 todos.ts 文件
 */
import { Command } from 'koishi-core';
import { Context } from 'koishi-core';
import { Todo } from './views/components/todo-card';
declare module 'koishi-core' {
    interface User {
        todos: Todo[];
    }
}
export declare const staticTodosTemplate: (todos: Todo[]) => string;
export declare const listTodos: (todos: Todo[], tag?: string, options?: {
    week?: boolean;
    mouth?: boolean;
}) => Todo[];
export declare const registerSubCommands: (ctx: Context, cmd: Command) => void;
