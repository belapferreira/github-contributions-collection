import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { Search } from '@/components/Search';
import { redirect } from 'next/navigation';
import { mountDayContributions } from '@/utils/mount-day-contributions';
import { UserContributions } from '~/@types/contributions';
import { Heatmap } from '@/components/Heatmap';
import { format, sub } from 'date-fns';
import { Header } from '@/components/Header';

type Props = {
  searchParams: {
    username: string;
  };
};

export default async function Home(props: Props) {
  const username = props.searchParams.username;

  const now = new Date();

  const currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const dayOfWeek = currentDate ? Number(format(currentDate, 'i')) + 1 : 1; // +1 because it starts on Monday

  const totalDays = 52 * 7 + dayOfWeek; // 52 completed weeks + amount of days in the current week (~1 year)

  const from = sub(currentDate, {
    days: totalDays,
  });

  const contributions = await getGithubContributions(
    username,
    from.toISOString()
  );

  const dayContributions = mountDayContributions(
    contributions?.user as UserContributions
  );

  if (!username) {
    redirect(`/?username=${username}`);
  }

  return (
    <div className="flex w-full flex-col">
      <Header />

      <main className="flex w-full items-center justify-center px-5">
        <div className="flex w-full max-w-content-w flex-col items-center">
          <div className="flex w-full max-w-[864px] flex-col items-center gap-6 py-8">
            <Search />

            <div className="flex w-full flex-col gap-4">
              <h2 className="text-lg font-semibold text-blue-mid">
                {contributions?.user?.name}
              </h2>

              {contributions?.user ? (
                <Heatmap
                  startDate={from}
                  totalDays={totalDays}
                  contributions={dayContributions}
                />
              ) : (
                <div className="w-full space-y-3 pt-10 text-center text-gray-300">
                  <p>
                    There was a problem fetching the contributions to this user:{' '}
                    <strong>{username}</strong>.
                  </p>

                  <p>
                    Please check if the <strong>username</strong> is correct and
                    try again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
