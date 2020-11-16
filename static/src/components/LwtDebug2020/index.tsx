import React from 'react';
import agendaHtml from './LwtDebug2020Agenda.html';

interface Props {}

export const LwtDebug2020 = (props: Props) => {
  // 'session-day'
  // each 'day-title'
  // - get times: go up 3 levels, find rows without child 'day-title-row' until next 'day-title-row'
  const agendaFragment = document
    .createRange()
    .createContextualFragment(agendaHtml);
  const sessionDayContainers = agendaFragment.querySelectorAll(
    '.session-day-container'
  );

  let days: object[] = [];
  let newDay = {
    day: null as object | null,
    times: [] as Element[] | null,
  };
  sessionDayContainers.forEach((row) => {
    // session-day
    for (const child of row.children) {
      if (child.classList.contains('day-title-row')) {
        newDay && !!newDay.day && days.push(newDay);
        newDay = {
          day: child.innerText.trim(),
          times: [],
        };
      } else if (child.classList.contains('time-row')) {
        const timeText = child.querySelector('time')?.innerText;
        newDay.times.push(timeText);
      }
    }
  });

  return (
    <div>
      {days.map((day) => {
        return (
          <>
            <div>{day.day}</div>
            <div>
              {day.times.map((time) => (
                <div>{time}</div>
              ))}
            </div>
          </>
        );
      })}
    </div>
  );
};
