import { Link, useNavigate } from 'react-router-dom';

import LogoImage from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="p-4 border-b border-zinc-800">
      <div className="container mx-auto flex justify-between items-center">
      <Link to="/dashboard" className="flex items-center gap-2">
  <img
    src={LogoImage}
    alt="Piece of Iceland logo"
    className="h-10 w-10 object-contain"
  />
  <div className="flex flex-col leading-tight">
    <span className="text-xl font-bold text-white">Piece of Iceland</span>
    <span className="text-sm font-semibold text-zinc-400">by MatthewFlow</span>
  </div>
</Link>

        <nav className="flex items-center space-x-4 text-sm">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:underline"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
