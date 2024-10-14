'use client';

import { cn } from '@/utils/cn';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export const Search = () => {
  const [username, setUsername] = useState('');

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
    </>
  );
};
