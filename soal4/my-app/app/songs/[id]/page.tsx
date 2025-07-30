"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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

// 🔧 Fungsi untuk mengonversi URL YouTube ke format embed
function getEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return url;
}

export default function SongDetailPage() {
  const params = useParams();
  const songId = params.id as string;

  const [song, setSong] = useState<Song | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongDetail = async () => {
      try {
        const res = await fetch(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song/${songId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setSong(data.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
        setSong(null);
      }
    };
    fetchSongDetail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-500 to-blue-500 text-gray-500  p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">{song?.title}</h1>
      <p className="text-center text-blue-500 mb-8">By {song?.artist}</p>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-1/2">
          <iframe
            src={song?.source ? getEmbedUrl(song.source) : ""}
            title={song?.title}
            className="w-full aspect-video rounded-lg shadow-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <p className="text-blue-900">{song?.description}</p>
          <p className="text-blue-600">❤ {song?.likes} likes</p>

          <div className="bg-white/70 p-4 rounded-lg max-h-80 overflow-y-auto">
            <h2 className="font-semibold text-blue-700 mb-3">Comments</h2>
            {song?.comments.length === 0 ? (
              <p className="italic text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-2 text-gray-800 text-sm">
                {song?.comments.map((comment, i) => (
                  <li key={i} className="border-b border-blue-300 pb-2">
                    <p>
                      <strong className="text-blue-600">{comment.creator}</strong>: {comment.comment_text}
                    </p>
                    <p className="text-xs text-blue-400">{comment.createdAt}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}