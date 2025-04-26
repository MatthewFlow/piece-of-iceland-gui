import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-zinc-950 to-zinc-900 text-white font-sans">
      
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
