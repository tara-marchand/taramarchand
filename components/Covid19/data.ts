import { parse } from 'date-fns';
import compact from 'lodash.compact';
import sortBy from 'lodash.sortby';

export function transformDataForCaByDay(
  statesCaDailyRaw: Daily[]
): PartialPoint[] {
  let transformedData = sortBy(
    statesCaDailyRaw.map((day: Daily) => {
      const parsedDate = parse(day.date + '', 'yyyyMMdd', new Date());
      const parsedDateUtcMilliseconds = Date.UTC(
        parsedDate.getFullYear(),
        parsedDate.getMonth(),
        parsedDate.getDate(),
        parsedDate.getHours(),
        parsedDate.getMinutes(),
        parsedDate.getSeconds()
      );

      return {
        x: parsedDateUtcMilliseconds,
        y: day.death,
      };
    }),
    (day) => day.x
  );

  return compact(transformedData);
}
