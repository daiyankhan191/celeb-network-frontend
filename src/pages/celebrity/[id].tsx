import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import API from '../../lib/api';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  country: string;
  instagram?: string;
  fanbase?: string;
  setlist?: string;
}

export default function CelebrityProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [celeb, setCeleb] = useState<Celebrity | null>(null);

  useEffect(() => {
    if (id) {
      API.get(`/celebrities/${id}`)
        .then((res) => setCeleb(res.data as Celebrity))
        .catch(() => alert('Error loading celebrity'));
    }
  }, [id]);

  const downloadPdf = async () => {
    try {
      const res = await API.get(`/pdf/${id}`, { responseType: 'blob' });
      const blob = new Blob([res.data as BlobPart], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${celeb?.name}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch {
      alert('Download failed');
    }
  };

  if (!celeb) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{celeb.name}</h1>
      <p>Category: {celeb.category}</p>
      <p>Country: {celeb.country}</p>
      <p>Instagram: {celeb.instagram}</p>
      <p>Fanbase: {celeb.fanbase}</p>
      <p>Setlist: {celeb.setlist}</p>
      <button onClick={downloadPdf} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Download PDF
      </button>
    </div>
  );
}
