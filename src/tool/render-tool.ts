/**
 * @desc   render-tool.ts
 * @author yijie
 * @date   2021-04-20 15:58
 * @notes  2021-04-20 15:58 yijie 创建了 render-tool.ts 文件
 */
import path from 'path'
import sass from 'node-sass'

type Styles =  Record<string, string[]>

class RenderTool {
  private styles: Styles = {}

  defaultStyles: Styles = {}

  pushStyle(id: string, ...pathSegments: string[]): RenderTool {
    this.styles[id] = pathSegments
    return this
  }

  pushStyles(styles: Styles): RenderTool {
    this.styles = {
      ...this.styles, ...styles,
    }
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
          file: path.resolve(__dirname, '../', ...styles[id])
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
