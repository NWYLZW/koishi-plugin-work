/**
 * @desc   puppeteer-tool.ts
 * @author yijie
 * @date   2021-04-22 19:42
 * @notes  2021-04-22 19:42 yijie 创建了 puppeteer-tool.ts 文件
 */
import { Context } from 'koishi-core'
import { Page, Viewport, Shooter, BinaryScreenshotOptions } from 'puppeteer-core'
import { PNG } from 'pngjs'
import { segment } from 'koishi'

class PuppeteerTool {
  ctx?: Context
  get ppt(): Context['puppeteer'] {
    try {
      return this.ctx.puppeteer
    } catch (e) {
      throw new Error(
        'Require koishi-plugin-puppeteer, but not install.You need to install koishi-plugin-puppeteer'
      )
    }
  }
  get cfg () {
    return this.ppt.config
  }

  initCTX(ctx: Context) {
    this.ctx = ctx
  }

  private curPage: Page
  private curShooter: Shooter

  images: string[] = []

  private stream: {
    url: string
    selector?: string
    viewport?: Viewport
    option?: BinaryScreenshotOptions
  } = {
    url: ''
  }

  async asyncOpen(url: string) {
    await this.ppt.launch()
    this.curPage = await this.ppt.browser.newPage()
    this.curShooter = this.curPage
    await this.curPage.goto(url)
    return this
  }
  open(url: string) {
    this.stream.url = url
    return this
  }

  async asyncSelect(selector: string) {
    this.curShooter = await this.curPage.$(selector)
    return this
  }
  async$ = this.asyncSelect

  select(selector: string) {
    this.stream.selector = selector
    return this
  }
  $ = this.select

  async asyncViewport(viewport: Viewport) {
    await this.curPage.setViewport({
      ...this.cfg.browser.defaultViewport,
      ...this.cfg.renderViewport,
      ...viewport
    })
    return this
  }

  viewport(viewport: Viewport) {
    this.stream.viewport = viewport
    return this
  }

  async asyncShot(
    option: BinaryScreenshotOptions = {}
  ) {
    let buffer: Buffer = await this.curShooter.screenshot({
      encoding: 'binary',
      ...option
    })
    if (buffer.byteLength > this.cfg.maxLength) {
      await new Promise<PNG>((resolve, reject) => {
        const png = new PNG()
        png.parse(buffer, (error, data) => {
          return error ? reject(error) : resolve(data)
        })
      }).then((data) => {
        const width = data.width
        const height = data.height * this.cfg.maxLength / buffer.byteLength
        const png = new PNG({width, height})
        data.bitblt(png, 0, 0, width, height, 0, 0)
        buffer = PNG.sync.write(png)
      }).catch(console.error)
    }
    this.images.push(segment.image(buffer))
    return this
  }

  shot(option: BinaryScreenshotOptions = {}) {
    this.stream.option = option
    return this
  }

  async asyncClose() {
    await this.ppt.close()
    return this
  }

  async start() {
    const {
      url,
      selector, viewport,
      option
    } = this.stream
    url && await this.asyncOpen(url)
    selector && await this.async$(selector)
    viewport && await this.asyncViewport(viewport)
    option && await this.asyncShot(option)
  }
}

export const pptTool = new PuppeteerTool()
