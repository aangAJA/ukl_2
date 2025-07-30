"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import React from "react";

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

// 🔧 Enhanced YouTube URL converter with debugging
function getEmbedUrl(url: string): string | null {
  console.log("Original URL:", url); // Debug log
  
  if (!url) {
    console.log("No URL provided");
    return null;
  }

  // Handle YouTube URLs
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  if (match && match[2].length === 11) {
    const embedUrl = `https://www.youtube.com/embed/${match[2]}`;
    console.log("Converted to embed URL:", embedUrl); // Debug log
    return embedUrl;
  }

  // Handle youtu.be short links
  const shortRegExp = /youtu\.be\/([^#&?]*)/;
  const shortMatch = url.match(shortRegExp);
  
  if (shortMatch && shortMatch[1].length === 11) {
    const embedUrl = `https://www.youtube.com/embed/${shortMatch[1]}`;
    console.log("Converted short URL to embed:", embedUrl);
    return embedUrl;
  }

  console.log("URL format not recognized");
  return null;
}

export default function SongDetailPage() {
  const params = useParams();
  const songId = params.id as string;

  const [song, setSong] = useState<Song | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongDetail = async () => {
      try {
        setLoading(true);
        console.log("Fetching song with ID:", songId); // Debug log
        const res = await fetch(`https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song/${songId}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API response:", data); // Debug log
        
        if (data.success) {
          setSong(data.data);
          setError(null);
        } else {
          throw new Error(data.message || 'Failed to load song');
        }
      } catch (err: any) {
        console.error("Fetch error:", err); // Debug log
        setError(err.message || "Something went wrong");
        setSong(null);
      } finally {
        setLoading(false);
      }
    };
    
    if (songId) {
      fetchSongDetail();
    }
  }, [songId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!song) {
    return <div className="min-h-screen flex items-center justify-center">Song not found</div>;
  }

  const embedUrl = getEmbedUrl(song.source);
  console.log("Final embed URL:", embedUrl); // Debug log

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-100 to-blue-200 text-gray-800 p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">{song.title}</h1>
      <p className="text-center text-blue-500 mb-8">By {song.artist}</p>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-1/2">
          {embedUrl ? (
            <div className="relative w-full aspect-video rounded-lg shadow-lg overflow-hidden">
              <iframe
                src={embedUrl}
                title={song.title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-center p-4">
              <p className="text-gray-500 text-center">Video not available</p>
              <p className="text-xs text-gray-400 mt-2">Source URL: {song.source || 'None'}</p>
            </div>
          )}
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold text-blue-700 mb-2">Description</h2>
            <p className="text-gray-700">{song.description}</p>
            <p className="mt-3 text-blue-600">❤ {song.likes.toLocaleString()} likes</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow max-h-80 overflow-y-auto">
            <h2 className="font-semibold text-blue-700 mb-3">Comments</h2>
            {song.comments.length === 0 ? (
              <p className="italic text-gray-500">No comments yet.</p>
            ) : (
              <ul className="space-y-3">
                {song.comments.map((comment, i) => (
                  <li key={i} className="border-b border-blue-100 pb-3 last:border-0">
                    <div className="flex justify-between items-start">
                      <strong className="text-blue-600">{comment.creator}</strong>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.comment_text}</p>
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