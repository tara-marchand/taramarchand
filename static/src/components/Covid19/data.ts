import * as d3Array from 'd3-array';
import { parse } from 'date-fns';
import { Daily } from './types';

export function transformDataForCaByDay(statesCaDailyRaw: Daily[]) {
  return d3Array.group(statesCaDailyRaw, day => {
    const parsedDate = parse(day.date + '', 'yyyyMMdd', new Date());
    const parsedDateUtcMilliseconds = Date.UTC(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedDate.getHours(),
      parsedDate.getMinutes(),
      parsedDate.getSeconds()
    );

    return [parsedDateUtcMilliseconds, day.death];
  });
}
