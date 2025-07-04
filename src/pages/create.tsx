import { useState } from 'react';
import API from '../lib/api';

export default function CreateCelebrity() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await API.post('/celebrities/ai-suggest', { prompt });
      setResults(res.data); // Should be array of { name, category, country, instagram }
    } catch (err) {
      alert('AI suggestion failed');
    } finally {
      setLoading(false);
    }
  };

  const saveCelebrity = async (celeb) => {
    try {
      await API.post('/celebrities', celeb);
      alert(`Saved: ${celeb.name}`);
    } catch {
      alert('Failed to save');
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI-Powered Celebrity Creator</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          className="w-full border p-2 mb-2"
          placeholder="e.g. Top Indian cricket players"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Suggest Celebrities'}
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((celeb, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <h2 className="font-semibold">{celeb.name}</h2>
              <p>Category: {celeb.category}</p>
              <p>Country: {celeb.country}</p>
              <p>Instagram: {celeb.instagram || 'N/A'}</p>
              <button
                onClick={() => saveCelebrity(celeb)}
                className="mt-2 bg-green-600 text-white px-3 py-1"
              >
                Save
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
