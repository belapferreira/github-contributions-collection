'use client';

import { cn } from '@/utils/cn';
import { useCallback, useRef, useState } from 'react';
import { LoaderCircle, SearchIcon } from 'lucide-react';
import { UserContributions } from '~/@types/contributions';
import { mountDayContributions } from '@/utils/mount-day-contributions';
import { Heatmap } from './Heatmap';
import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { Search } from './Search';

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
  const [isLoading, setIsLoading] = useState(false);
  const [contributions, setContributions] = useState(userContributions);

  const notFoundUsername = useRef('');

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

        if (!response?.user) {
          notFoundUsername.current = username;
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
      <Search handleSearch={handleSearch} isLoading={isLoading} />

      <h2 className="mr-auto mt-2 text-lg font-semibold text-blue-mid">
        {isLoading ? (
          <span className="inline-flex h-4 w-44 animate-pulse rounded-sm bg-gray-700" />
        ) : (
          contributions?.name
        )}
      </h2>

      <div className="flex w-full flex-col gap-4">
        {contributions ? (
          <>
            <Heatmap
              startDate={from}
              totalDays={totalDays}
              isLoading={isLoading}
              contributions={dayContributions}
            />

            <span />
          </>
        ) : (
          <div className="w-full space-y-3 pt-10 text-center text-gray-300">
            {!!notFoundUsername.current ? (
              <>
                <p>
                  There was a problem fetching the contributions to this user:{' '}
                  <strong>{notFoundUsername.current}</strong>.
                </p>

                <p>
                  Please check if the <strong>username</strong> is correct and
                  try again.
                </p>
              </>
            ) : (
              <p>
                Insert a valid <strong>username</strong> to see their
                contributions.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};
