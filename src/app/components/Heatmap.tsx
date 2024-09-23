import { WEEK_LABELS } from '@/constants';
import { generateArray } from '@/utils/generate-array';
import { add, format, sub } from 'date-fns';

export const Heatmap = () => {
  const now = new Date();

  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const dayOfWeek = currentDate ? Number(format(currentDate, 'i')) + 1 : 1; // +1 because it starts on Monday

  const totalDays = 52 * 7 + dayOfWeek; // 52 completed weeks + amount of days in the current week (~1 year)
  const daysPerWeek = 7;

  const startDate = sub(currentDate, {
    days: totalDays,
  });

  const cells = generateArray(totalDays);
  const weekDays = generateArray(daysPerWeek);
  const weeks = generateArray(Math.ceil(totalDays / daysPerWeek));

  const Month = ({ startDate, index }: { startDate: Date; index: number }) => {
    const prevMonthName = format(
      add(startDate, { days: (index - 1) * 7 }),
      'MMM'
    );

    const monthName = format(add(startDate, { days: index * 7 }), 'MMM');

    const hidden = prevMonthName === monthName;

    return (
      <span
        data-hidden={hidden}
        className="min-w-3 max-w-3 border border-gray-300/0 text-center text-[0.625rem] text-gray-300 data-[hidden='true']:invisible"
      >
        {monthName}
      </span>
    );
  };

  return (
    <div className="flex w-full justify-center gap-3">
      {/* Weekdays*/}
      <div className="flex flex-col">
        {weekDays.map((day) => (
          <span
            key={`weekday-${day}`}
            className="my-[0.7px] text-center text-xs text-gray-300"
          >
            {WEEK_LABELS[day - 1]}
          </span>
        ))}
      </div>

      <div className="relative h-full min-h-[9.5rem] w-full overflow-hidden">
        <div className="absolute left-0 top-0 flex w-full cursor-move flex-col items-start gap-3 overflow-x-auto overflow-y-hidden lg:w-fit lg:cursor-default lg:overflow-hidden">
          <div className="grid max-w-fit grid-flow-col grid-rows-7 gap-1.5">
            {cells.map((cell) => (
              <div
                key={`cell-${cell}`}
                className="size-3 flex-shrink-0 border border-gray-700"
              />
            ))}
          </div>

          <div className="mb-3 flex w-full gap-1.5">
            {weeks.map((week) => (
              <Month key={`month-${week}`} startDate={startDate} index={week} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
