'use client';

import { cn } from '@/utils/cn';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LoaderCircle, SearchIcon } from 'lucide-react';
import { UserContributions } from '~/@types/contributions';
import { mountDayContributions } from '@/utils/mount-day-contributions';
import { Heatmap } from './Heatmap';
import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { Search } from './Search';
import { format, sub } from 'date-fns';

export const Contributions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contributions, setContributions] = useState({} as UserContributions);

  const notFoundUsername = useRef('');
  const fetched = useRef(false);

  const defaultUsername = 'belapferreira';

  const loading = isLoading || !contributions?.name;

  const now = new Date();

  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const dayOfWeek = currentDate ? Number(format(currentDate, 'i')) + 1 : 1; // +1 because it starts on Monday

  const totalDays = 51 * 7 + dayOfWeek; // 51 completed weeks + amount of days in the current week (~1 year)

  const from = sub(currentDate, {
    days: totalDays,
  });

  const fromParsed = from.toISOString();

  const dayContributions = mountDayContributions(
    contributions as UserContributions
  );

  const handleSearch = useCallback(
    async (username: string) => {
      try {
        setIsLoading(true);

        const response = await getGithubContributions(username, fromParsed);

        setContributions(response?.user as UserContributions);

        if (!response?.user) {
          notFoundUsername.current = username;
        }
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    },
    [fromParsed]
  );

  const getInitialContributions = useCallback(async () => {
    const response = await getGithubContributions(defaultUsername, fromParsed);

    setContributions(response?.user as UserContributions);

    fetched.current = true;
  }, [fromParsed]);

  useEffect(() => {
    if (!contributions?.name && !fetched.current) {
      getInitialContributions();
    }
  }, [contributions, getInitialContributions]);

  return (
    <>
      <Search handleSearch={handleSearch} isLoading={isLoading} />

      <h2 className="mr-auto mt-2 text-lg font-semibold text-blue-mid">
        {loading && !notFoundUsername.current ? (
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
              isLoading={loading}
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
