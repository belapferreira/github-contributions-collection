import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { format, sub } from 'date-fns';
import { Header } from '@/components/Header';
import { Contributions } from './components/Contributions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const defaultUsername = 'belapferreira';

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

  const contributions = await getGithubContributions(
    defaultUsername,
    fromParsed
  );

  return (
    <div className="flex w-full flex-col">
      <Header />

      <main className="flex w-full items-center justify-center px-5">
        <div className="flex w-full max-w-content-w flex-col items-center">
          <div className="flex w-full max-w-[864px] flex-col items-center gap-4 py-8">
            <Contributions
              userContributions={contributions?.user}
              totalDays={totalDays}
              from={from}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
