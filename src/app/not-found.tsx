import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="mt-12 flex h-full w-full justify-center px-6">
      <div className="flex h-full w-full max-w-content-w flex-col items-start justify-center">
        <p className="text-7xl font-bold text-blue-light md:text-9xl">404...</p>
        <span className="mt-2 text-xl font-semibold text-blue-mid md:text-3xl">
          Page not found
        </span>

        <p className="mt-4 text-gray-300 md:text-lg">
          {`We can't find the page you are looking for. To return, click the link below:`}
        </p>

        <Link
          href="/"
          className="text-red-50 ml-auto mr-auto mt-16 rounded bg-blue-dark p-2 font-semibold uppercase transition duration-200 hover:bg-opacity-75 md:px-4 md:py-3"
        >
          Return
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
