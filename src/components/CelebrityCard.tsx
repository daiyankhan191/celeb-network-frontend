import React from 'react';

interface Celebrity {
  id: number;
  name: string;
  category: string;
  country: string;
  instagram?: string;
  fanbase?: number;
  setlist?: string;
}

interface CelebrityCardProps {
  celeb: Celebrity;
  isFollowing: boolean;
  onFollowToggle: (id: number) => void;
}

export default function CelebrityCard({
  celeb,
  isFollowing,
  onFollowToggle,
}: CelebrityCardProps) {
  return (
    <div className="border p-4 rounded-md shadow-md flex justify-between items-center mb-4">
      <div>
        <h2 className="text-xl font-bold">{celeb.name}</h2>
        <p>Category: {celeb.category}</p>
        <p>Country: {celeb.country}</p>
        <p>Instagram: {celeb.instagram}</p>
        <p>Fanbase: {celeb.fanbase}</p>
        <p>Setlist: {celeb.setlist}</p>
      </div>
      <button
        onClick={() => onFollowToggle(celeb.id)}
        className={`px-4 py-2 rounded ${
          isFollowing ? 'bg-red-500' : 'bg-green-500'
        } text-white`}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
