import { ReactNode } from 'react';
import { getGithubContributions } from '@/api/queries/get-github-contributions';
import { Search } from '@/components/Search';
import { notFound } from 'next/navigation';

type Props = {
  children: ReactNode;
  params: {
    username: string;
  };
};

export default async function Home(props: Props) {
  try {
    const username = props.params.username;

    const contributions = await getGithubContributions(username);

    if (!contributions.data.user) {
      notFound();
    }

    return (
      <main className="flex items-center justify-center py-10">
        <div className="mx-5 flex w-full max-w-content-w flex-col items-center">
          <div className="space-y-6">
            <Search contributions={contributions} />
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log('🚫 Contribs: ', error);

    notFound();
  }
}
