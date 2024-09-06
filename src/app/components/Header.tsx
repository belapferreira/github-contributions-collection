import { LayoutDashboard } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex w-full items-center justify-center bg-gray-950 p-16">
      <div className="max-w-content-w flex w-full justify-center">
        <h1 className="text-blue-light flex items-center gap-2 text-2xl font-bold">
          <LayoutDashboard size={20} className="text-gray-300" />
          Git Contribs
        </h1>
      </div>
    </header>
  );
};
