"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Comment {
  comment_text: string;
  creator: string;
  createdAt: string;
}

interface Song {
  uuid: string;
  title: string;
  artist: string;
  description: string;
  source: string;
  thumbnail: string;
  likes: number;
  comments: Comment[];
}

interface Playlist {
  uuid: string;
  playlist_name: string;
  song_list: Song[];
}

export default function PlaylistDetailPage() {
  const params = useParams();
  const playlistId = params.id as string;

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song-list/${playlistId}`);
        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Gagal memuat playlist");
        }

        const loadedPlaylist: Playlist = {
          uuid: playlistId,
          playlist_name: `Playlist ${playlistId}`,
          song_list: data.data || [],
        };

        setPlaylist(loadedPlaylist);
        setFilteredSongs(loadedPlaylist.song_list);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan saat memuat playlist");
        setPlaylist(null);
      } finally {
        setLoading(false);
      }
    };

    if (playlistId) fetchPlaylist();
  }, [playlistId]);

  useEffect(() => {
    if (!playlist) return;
    const keyword = search.toLowerCase();
    const result = playlist.song_list.filter(
      (song) =>
        song.title.toLowerCase().includes(keyword) ||
        song.artist.toLowerCase().includes(keyword)
    );
    setFilteredSongs(result);
  }, [search, playlist]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-gray-500 to-blue-950 text-white py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-300 mb-6 text-center">
          🎵 {playlist?.playlist_name || "Memuat..."}
        </h1>

        <input
          type="text"
          placeholder="🔍 Cari lagu berdasarkan judul atau artist..."
          className="w-full p-3 rounded-lg mb-8 bg-gray-800 text-white border border-blue-400 placeholder-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="text-center text-blue-400">Memuat lagu...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {!loading && !error && filteredSongs.length === 0 && (
          <p className="text-center text-blue-300">Tidak ada lagu ditemukan.</p>
        )}

        {!loading && filteredSongs.length > 0 && (
          <ul className="grid md:grid-cols-2 gap-6">
            {filteredSongs.map((song) => (
              <li
                key={song.uuid}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-5 shadow-lg hover:bg-white/20 transition flex gap-4"
              >
                <Image
                  src={`https://learn.smktelkom-mlg.sch.id/ukl2/thumbnail/${song.thumbnail}`}
                  unoptimized
                  alt={song.title}
                  width={100}
                  height={100}
                  className="rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-blue-300">{song.title}</h3>
                  <p className="text-sm text-gray-300">🎤 {song.artist}</p>
                  <p className="text-sm text-gray-400">{song.description}</p>

                  <div className="mt-2 flex justify-between items-center">
                    <p className="text-sm text-blue-400">❤ {song.likes} likes</p>
                    <Link href={`/songs/${song.uuid}`}>
                      <span className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg transition">
                        Lihat Detail
                      </span>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}