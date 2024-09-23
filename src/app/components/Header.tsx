import { LayoutDashboard } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center bg-gray-950 p-16">
      <div className="mx-5 flex w-full max-w-content-w justify-center">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-wide text-blue-light">
          <LayoutDashboard size={20} className="text-gray-300" />
          Git Contribs
        </h1>
      </div>
    </header>
  );
};
