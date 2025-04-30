import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as Error;

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-white bg-zinc-900 text-center p-10">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-lg">Something went wrong:</p>
      <pre className="mt-4 text-red-400">{error.message || 'Unknown error'}</pre>
    </div>
  );
}
