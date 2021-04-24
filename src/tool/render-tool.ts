/**
 * @desc   render-tool.ts
 * @author yijie
 * @date   2021-04-20 15:58
 * @notes  2021-04-20 15:58 yijie 创建了 render-tool.ts 文件
 */
import path from 'path'
import sass from 'node-sass'

class RenderTool {
  private styles: Record<string, string[]> = {}

  defaultStyles: Record<string, string[]> = {}

  pushStyle(id: string, ...pathSegments: string[]): RenderTool {
    this.styles[id] = pathSegments
    return this
  }

  renderStyles(): string {
    let stylesStr = ''
    const styles = {
      ...this.styles,
      ...this.defaultStyles
    }
    for (const id in styles) {
      stylesStr += `<style>${
        sass.renderSync({
          file: path.resolve(...styles[id])
        }).css.toString()
      }</style>`
    }
    return stylesStr
  }

  clearStyle(): RenderTool {
    this.styles = {}
    return this
  }
}

export const renderTool = new RenderTool()
