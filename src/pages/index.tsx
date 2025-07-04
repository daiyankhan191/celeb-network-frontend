import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center p-6 bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to CelebNetwork ✨</h1>
      <p className="text-lg max-w-xl mb-6">
        Discover, follow, and explore your favorite celebrities.
        Powered by AI and loved by fans.
      </p>
      <div className="flex space-x-4">
        <Link href="/login">
          <span className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium">Login</span>
        </Link>
        <Link href="/register">
          <span className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium">Register</span>
        </Link>
      </div>
    </div>
  );
}
