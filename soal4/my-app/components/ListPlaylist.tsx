'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Playlist {
  uuid: string;
  playlist_name: string;
  song_count: number;
}
 
export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const router = useRouter();

  useEffect(() => {
    fetch("https://learn.smktelkom-mlg.sch.id/ukl2/playlists")
      .then((res) => res.json())
      .then((data) => {
        setPlaylists(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center mt-8 text-blue-800">Loading...</div>;

  // Filter playlist sesuai search
  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.playlist_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-300 to-white py-8 px-4">
      <div className="max-w-md mx-auto space-y-5">
        {/* Input search */}
        <input
          type="text"
          placeholder="Search playlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        {filteredPlaylists.map((playlist) => (
          <div
            key={playlist.uuid}
            className="bg-gradient-to-r from-white to-blue-200 border border-blue-400 rounded-xl p-5 shadow-lg hover:shadow-xl transition flex justify-between items-center"
          >
            <div>
              <div className="font-bold text- text-lg mb-2">
                {playlist.playlist_name}
              </div>
              <div className="text-blue-700">Song count: {playlist.song_count}</div>
            </div>

            <Link href={`/playlist/${playlist.uuid}`}>
              <button className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600 transition">
                View
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
