import { Header } from '@/components/Header';
import { Heatmap } from '@/components/Heatmap';

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex items-center justify-center py-10">
        <div className="mx-5 flex w-full max-w-content-w flex-col gap-5">
          <h2 className="text-xl font-semibold">Contributions</h2>

          <Heatmap />
        </div>
      </main>
    </>
  );
}
