'use client';

import { ContributionDay } from '~/@types/contributions';
import {
  AVERAGE_SCALE_PERCENTAGE,
  DAYS_PER_WEEK,
  WEEK_LABELS,
} from '@/constants';
import { cn } from '@/utils/cn';
import { generateArray } from '@/utils/generate-array';
import * as Tooltip from '@radix-ui/react-tooltip';
import { add, format, isBefore, sub } from 'date-fns';
import { Minus, Plus } from 'lucide-react';
import { useCallback, useMemo } from 'react';

type HeatmapProps = {
  contributions: ContributionDay[];
  totalDays: number;
  startDate: Date;
  isLoading?: boolean;
};

export const HeatmapComponent = ({
  contributions,
  totalDays,
  startDate,
  isLoading,
}: HeatmapProps) => {
  const cells = generateArray(totalDays);
  const weekDays = generateArray(DAYS_PER_WEEK);
  const weeks = generateArray(Math.ceil(totalDays / DAYS_PER_WEEK));

  const average = useMemo(() => {
    return (
      contributions.reduce(
        (acc, { contributionCount: count }) => acc + Number(count),
        0
      ) / contributions.length || 1
    );
  }, [contributions]);

  const cellClass = useCallback(
    (value: number) => {
      if (!value) {
        return undefined;
      }

      const scalePercentage =
        (value * AVERAGE_SCALE_PERCENTAGE) / average / 100;

      let className;

      switch (true) {
        case scalePercentage > 1:
          className = `border-blue-dark/80 bg-blue-light`;
          break;
        case scalePercentage >= 0.8:
          className = `border-blue-light/80 bg-blue-mid/90`;
          break;
        case scalePercentage > 0.4:
          className = `border-blue-mid/70 bg-blue-mid/60`;
          break;
        case scalePercentage > 0:
          className = `border-blue-mid/40 bg-blue-mid/30`;
          break;
        default:
          className = `bg-gray-900 border-gray-700`;
          break;
      }

      return className;
    },
    [average]
  );

  const Cell = ({ index }: { index: number }) => {
    const cellData = contributions[index - 1];

    const value = cellData?.contributionCount || 0;
    const date = cellData?.date.split('-').reverse().join('/');

    const className = cellClass(value);

    const tooltipContent = useMemo(() => {
      return value <= 1
        ? `${value} atividade ${date && `em ${date}`}`
        : `${value} atividades ${date && `em ${date}`}`;
    }, [date, value]);

    return (
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>
          <div
            data-loading={isLoading}
            className={cn(
              'size-3 flex-shrink-0 rounded-sm border border-gray-700',
              'data-[loading="true"]:animate-pulse data-[loading="true"]:border-gray-700 data-[loading="true"]:bg-gray-700',
              className
            )}
          />
        </Tooltip.Trigger>

        <Tooltip.Content
          className={cn(
            'flex flex-col items-center gap-3 px-4 py-3',
            'text-center text-sm leading-[140%] text-gray-100',
            'z-tooltip select-none rounded-md bg-gray-950 shadow-[4px_16px_24px_0px_rgba(0,0,0,0.25)]'
          )}
        >
          <Tooltip.Arrow className="fill-gray-950" />

          {tooltipContent}
        </Tooltip.Content>
      </Tooltip.Root>
    );
  };

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
    <div className="relative flex min-h-[9.5rem] w-full justify-center">
      <div className="absolute flex w-full justify-start gap-3">
        {/* Weekdays*/}
        <div className="flex flex-col">
          {weekDays.map((day) => (
            <span
              key={`weekday-${day}`}
              className="my-[0.3px] text-center text-[0.625rem] text-gray-300"
            >
              {WEEK_LABELS[day - 1]}
            </span>
          ))}
        </div>

        <div className="relative flex h-full w-[calc(100%-1.25rem)] flex-col">
          <div className="flex w-full cursor-move flex-col items-start gap-3 overflow-x-auto overflow-y-hidden lg:cursor-default lg:overflow-hidden">
            <div className="grid max-w-fit grid-flow-col grid-rows-7 gap-1">
              {cells.map((cell) => (
                <Cell key={`cell-${cell}`} index={cell} />
              ))}
            </div>

            <div className="mb-3 flex w-full gap-1">
              {weeks.map((week) => (
                <Month
                  key={`month-${week}`}
                  startDate={startDate}
                  index={week}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex w-full items-center justify-end gap-1">
            <Minus size={16} className="text-gray-200" />
            <div className="h-3 w-3 rounded-sm border border-gray-700 bg-gray-900" />
            <div className="h-3 w-3 rounded-sm border border-blue-mid/40 bg-blue-mid/30" />
            <div className="h-3 w-3 rounded-sm border border-blue-mid/70 bg-blue-mid/60" />
            <div className="h-3 w-3 rounded-sm border border-blue-light/80 bg-blue-mid/90" />
            <div className="h-3 w-3 rounded-sm border border-blue-dark/80 bg-blue-light" />
            <Plus size={16} className="text-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Heatmap = (props: HeatmapProps) => {
  return (
    <Tooltip.Provider disableHoverableContent>
      <HeatmapComponent {...props} />
    </Tooltip.Provider>
  );
};
