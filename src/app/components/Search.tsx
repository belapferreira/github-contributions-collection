'use client';

import { cn } from '@/utils/cn';
import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchIcon } from 'lucide-react';

export const Search = () => {
  const [username, setUsername] = useState('');

  const router = useRouter();

  const handleSearch = useCallback(
    (event: FormEvent<HTMLFormElement>, username: string) => {
      event.preventDefault();
      router.push(`/?username=${username}`);
      setUsername('');
    },
    [router]
  );

  return (
    <form
      onSubmit={(event) => handleSearch(event, username)}
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
        className={cn(
          'h-10 rounded-md bg-blue-mid px-3 font-semibold text-white sm:w-32',
          'transition-colors duration-200 hover:bg-blue-dark'
        )}
      >
        <span className="amax-sm:hidden text-sm tracking-wide">Search</span>

        <SearchIcon size={18} className="sm:hidden" />
      </button>
    </form>
  );
};
