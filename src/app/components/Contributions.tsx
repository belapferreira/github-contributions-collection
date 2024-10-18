'use client';

import { cn } from '@/utils/cn';
import { useCallback, useState } from 'react';
import { LoaderCircle, SearchIcon } from 'lucide-react';
import { UserContributions } from '~/@types/contributions';
import { mountDayContributions } from '@/utils/mount-day-contributions';
import { Heatmap } from './Heatmap';
import { getGithubContributions } from '@/api/queries/get-github-contributions';

type ContrinutionsProps = {
  userContributions?: UserContributions;
  totalDays: number;
  from: Date;
};

export const Contributions = ({
  userContributions,
  totalDays,
  from,
}: ContrinutionsProps) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contributions, setContributions] = useState(userContributions);

  const dayContributions = mountDayContributions(
    contributions as UserContributions
  );

  const handleSearch = useCallback(
    async (username: string) => {
      try {
        setIsLoading(true);

        const response = await getGithubContributions(
          username,
          from.toISOString()
        );

        setContributions(response?.user as UserContributions);

        if (response?.user) {
          setUsername('');
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [from]
  );

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();

          handleSearch(username);
        }}
        className="flex w-full items-center justify-between gap-5 md:gap-10"
      >
        <div
          className={cn(
            'flex h-10 w-full items-center justify-center gap-2 rounded-md px-4 py-2',
            'border border-gray-700 focus-within:border-blue-mid',
            'transition-colors duration-200'
          )}
        >
          <input
            type="text"
            placeholder="Insert username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className={cn(
              'h-full w-full text-sm text-gray-100 outline-none transition-colors duration-200',
              'placeholder:text-sm placeholder:text-gray-300'
            )}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={cn(
            'flex h-10 items-center justify-center rounded-md bg-blue-mid px-3 font-semibold text-white sm:w-32',
            'transition-colors duration-200 enabled:hover:bg-blue-dark'
          )}
        >
          {isLoading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <span className="text-sm tracking-wide max-sm:hidden">
                Search
              </span>

              <SearchIcon size={18} className="sm:hidden" />
            </>
          )}
        </button>
      </form>

      <h2 className="mr-auto mt-2 text-lg font-semibold text-blue-mid">
        {contributions?.name}
      </h2>

      <div className="flex w-full flex-col gap-4">
        {contributions ? (
          <Heatmap
            startDate={from}
            totalDays={totalDays}
            isLoading={isLoading}
            contributions={dayContributions}
          />
        ) : (
          <div className="w-full space-y-3 pt-10 text-center text-gray-300">
            <p>
              There was a problem fetching the contributions to this user:{' '}
              <strong>{username}</strong>.
            </p>

            <p>
              Please check if the <strong>username</strong> is correct and try
              again.
            </p>
          </div>
        )}
      </div>
    </>
  );
};
