import React from 'react';

export default function CelebrityCard({ celeb, isFollowing, onFollowToggle }) {
  return (
    <div className="border p-4 rounded-md shadow-md flex justify-between items-center mb-4">
      <div>
        <h3 className="text-lg font-semibold">{celeb.name}</h3>
        <p className="text-sm text-gray-600">{celeb.category} | {celeb.country}</p>
        <p className="text-sm text-gray-400">Instagram: {celeb.instagram || 'N/A'}</p>
      </div>
      <button
        className={`px-4 py-1 rounded text-white ${isFollowing ? 'bg-red-500' : 'bg-green-600'}`}
        onClick={() => onFollowToggle(celeb.id)}
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
