import { Header } from '@/components/Header';
import { Contributions } from './components/Contributions';

export default function Home() {
  return (
    <div className="flex w-full flex-col">
      <Header />

      <main className="flex w-full items-center justify-center px-5">
        <div className="flex w-full max-w-content-w flex-col items-center">
          <div className="flex w-full max-w-[864px] flex-col items-center gap-4 py-8">
            <Contributions />
          </div>
        </div>
      </main>
    </div>
  );
}
