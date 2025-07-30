'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

type Song = {
  uuid: string;
  title: string;
  artist: string;
  thumbnail: string;
};

export default function SongList() {
  const params = useParams();
  const playlistId = params?.id as string;
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song-list/${playlistId}?search=${search}`)
      .then(res => setSongs(res.data.data));
  }, [playlistId, search]);

  return (
    <div className="p-4">
      <input
        type="text-black"
        placeholder="Search by title or artist"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <div className="grid gap-4">
        {songs.map(song => (
          <Link href={`/songs/detail/${song.uuid}`} key={song.uuid} className="block border p-4 rounded">
            <img
              src={`https://learn.smktelkom-mlg.sch.id/ukl2/thumbnail/${song.thumbnail}`}
              alt={song.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-sm">{song.artist}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}