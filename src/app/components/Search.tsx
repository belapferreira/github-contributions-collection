import { cn } from '@/utils/cn';
import { LoaderCircle, SearchIcon } from 'lucide-react';
import { FormEvent, useCallback, useState } from 'react';

type SearchProps = {
  handleSearch: (username: string) => void;
  isLoading: boolean;
};

export const Search = ({ handleSearch, isLoading }: SearchProps) => {
  const [username, setUsername] = useState('');

  const onSearch = useCallback(
    (event: FormEvent) => {
      event.preventDefault();

      handleSearch(username);

      setUsername('');
    },
    [handleSearch, username]
  );

  return (
    <form
      onSubmit={onSearch}
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
            <span className="text-sm tracking-wide max-sm:hidden">Search</span>

            <SearchIcon size={18} className="sm:hidden" />
          </>
        )}
      </button>
    </form>
  );
};
