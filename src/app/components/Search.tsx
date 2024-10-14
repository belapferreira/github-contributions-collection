'use client';

import { cn } from '@/utils/cn';
import { Heatmap } from './Heatmap';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchProps = {
  contributions: unknown;
};

export const Search = ({ contributions }: SearchProps) => {
  const [username, setUsername] = useState('');

  console.log('contributions', contributions);

  const router = useRouter();

  const handleSearch = useCallback(
    async (username: string) => {
      router.push(`/${username}`);
    },
    [router]
  );

  return (
    <>
      <div className="flex items-center justify-between gap-5 md:gap-10">
        <div
          className={cn(
            'flex h-10 w-full items-center justify-center gap-2 rounded-md px-4 py-3',
            'border border-gray-700 focus-within:border-blue-mid',
            'transition-colors duration-200'
          )}
        >
          <input
            type="text"
            placeholder="Insert username"
            onChange={(event) => setUsername(event.target.value)}
            className={cn(
              'h-full w-full text-gray-100 outline-none transition-colors duration-200',
              'placeholder:text-sm placeholder:text-gray-300'
            )}
          />
        </div>

        <button
          onClick={() => handleSearch(username)}
          className={cn(
            'h-10 w-32 rounded-md bg-blue-mid font-semibold text-white',
            'transition-colors duration-200 hover:bg-blue-dark'
          )}
        >
          Search
        </button>
      </div>

      <div className="space-y-3">
        <h2 className="font-semibold text-blue-mid">
          {contributions?.data?.user?.name}
        </h2>

        {contributions.data.user ? (
          <Heatmap />
        ) : (
          <div className="w-full space-y-3 pt-10 text-center text-gray-300">
            <p>There was a problem fetching the contributions.</p>

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
