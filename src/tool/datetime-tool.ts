/**
 * @desc   时间相关工具类 datetime-tool.ts
 * @author yijie
 * @date   2021-04-03 19:31
 * @notes  2021-04-03 19:31 yijie 创建了 datetime-tool.ts 文件
 */
import dayjs from 'dayjs'

export interface DatetimeRange {
  startDateTime: Date | undefined
  endDateTime: Date | undefined
}

export const ONE_DAY = 24 * 60 * 60 * 1000
export const HALF_ONE_DAY = ONE_DAY / 2
export const QUARTER_ONE_DAY = HALF_ONE_DAY / 2
export const WEEK = 7 * ONE_DAY
export const YEAR = 365 * ONE_DAY
export const HALF_YEAR = YEAR / 2
export const QUARTER_YEAR = HALF_YEAR / 2

export const datetimeTool = {
  datetimeRanges: {
    week: {
      startDateTime: dayjs()
        .add(-7, 'day')
        .toDate(),
      endDateTime: dayjs().toDate()
    } as DatetimeRange,
    mouth: {
      startDateTime: dayjs()
        .add(-30, 'day')
        .toDate(),
      endDateTime: dayjs().toDate()
    } as DatetimeRange,
    season: {
      startDateTime: dayjs()
        .add(-90, 'day')
        .toDate(),
      endDateTime: dayjs().toDate()
    } as DatetimeRange,
    halfYear: {
      startDateTime: dayjs()
        .add(-180, 'day')
        .toDate(),
      endDateTime: dayjs().toDate()
    } as DatetimeRange,
    year: {
      startDateTime: dayjs()
        .add(-365, 'day')
        .toDate(),
      endDateTime: dayjs().toDate()
    } as DatetimeRange
  }
}
