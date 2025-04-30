import { Link } from 'react-router-dom';

import LogoImage from '../assets/logo.png';
import { useSession } from '../hooks/useSession';

export default function Navbar() {
  const { isAuthenticated, logout } = useSession();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="p-4 border-b border-zinc-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img src={LogoImage} alt="Piece of Iceland logo" className="h-10 w-10 object-contain" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold text-white">Piece of Iceland</span>
            <span className="text-sm font-semibold text-zinc-400">by MatthewFlow</span>
          </div>
        </Link>

        <nav className="flex items-center space-x-4 text-sm">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline underline-offset-4 transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:underline underline-offset-4 transition-colors">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline underline-offset-4 transition-colors"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
