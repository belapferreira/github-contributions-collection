import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { Search } from '@/components/Search';
import { notFound } from 'next/navigation';
import { mountDayContributions } from '@/utils/mount-day-contributions';
import { UserContributions } from '~/@types/contributions';
import { Heatmap } from '@/components/Heatmap';
import { format, sub } from 'date-fns';

type Props = {
  params: {
    username: string;
  };
};

export async function generateStaticParams() {
  const usernames = ['belapferreira'];

  return usernames;
}

export default async function Home(props: Props) {
  try {
    const username = props.params.username;

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

    if (!contributions?.user) {
      notFound();
    }

    return (
      <main className="flex items-center justify-center py-10">
        <div className="mx-5 flex w-full max-w-content-w flex-col items-center">
          <div className="space-y-6">
            <Search />

            <div className="space-y-3">
              <h2 className="font-semibold text-blue-mid">
                {contributions?.user?.name}
              </h2>

              {contributions ? (
                <Heatmap
                  startDate={from}
                  totalDays={totalDays}
                  contributions={dayContributions}
                />
              ) : (
                <div className="w-full space-y-3 pt-10 text-center text-gray-300">
                  <p>There was a problem fetching the contributions.</p>

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
    );
  } catch (error) {
    console.log('🚫 Contributions: ', error);

    notFound();
  }
}
