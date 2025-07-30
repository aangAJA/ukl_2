'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

type Comment = {
  comment_text: string;
  creator: string;
  createdAt: string;
};

type SongDetail = {
  title: string;
  artist: string;
  description: string;
  source: string;
  thumbnail: string;
  comments: Comment[];
};

export default function SongDetail() {
  const params = useParams();
  const songId = params?.songId as string;
  const [song, setSong] = useState<SongDetail | null>(null);

  useEffect(() => {
    axios
      .get(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song/${songId}`)
      .then(res => setSong(res.data.data));
  }, [songId]);

  if (!song) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <iframe
        className="w-full h-64 mb-4"
        src={song.source.replace('watch?v=', 'embed/')}
        allowFullScreen
        title={song.title}
      />
      <h2 className="text-2xl font-bold">{song.title}</h2>
      <p className="text-lg">{song.artist}</p>
      <p className="my-2">{song.description}</p>
      <h3 className="mt-4 font-semibold">Comments</h3>
      <ul className="mt-2 space-y-2">
        {song.comments.map((c, i) => (
          <li key={i} className="border p-2 rounded">
            <p className="text-sm">{c.comment_text}</p>
            <small className="block text-xs text-gray-500">
              By {c.creator} at {c.createdAt}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}