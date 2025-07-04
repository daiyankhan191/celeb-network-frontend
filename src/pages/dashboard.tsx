import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../lib/api';

export default function Dashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!search) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await API.post('/ai/celeb-info', { name: search });
      setResult(res.data.answer);
    } catch {
      setResult('Celebrity not found or an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Welcome {user?.name || 'Fan'} 🎉</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search a celebrity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-500">Fetching details...</p>}

      {result && (
        <div className="border p-4 rounded shadow mt-4 whitespace-pre-wrap bg-black">
          {result}
        </div>
      )}
    </div>
  );
}
