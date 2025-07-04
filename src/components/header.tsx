import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/">
        <span className="text-xl font-bold cursor-pointer">CelebNetwork</span>
      </Link>
      <nav className="space-x-4 text-sm">
        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/create">Create</Link>
            <button onClick={logout} className="text-red-400">Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
