import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';

export default function App() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
