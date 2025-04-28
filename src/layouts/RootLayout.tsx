import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';
import { ToastProvider } from '../components/ToastProvider';
import { useTokenRefresh } from '../hooks/useTokenRefresh';

export default function RootLayout() {
  useTokenRefresh();
  <ToastProvider />;
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-800 text-white font-sans">
      <Navbar />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <footer className="p-4 border-t border-zinc-800 text-center text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} Piece of Iceland. All rights reserved.
      </footer>
    </div>
  );
}
