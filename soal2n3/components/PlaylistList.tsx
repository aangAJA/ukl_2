"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Playlist = {
    uuid: string;
    playlist_name: string;
    song_count: number;
};

export default function PlaylistPage() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch("https://learn.smktelkom-mlg.sch.id/ukl2/playlists")
            .then((res) => res.json())
            .then((data) => {
                setPlaylists(data.data);
                setLoading(false);
            });
    }, []);

    if (loading)
        return <div className="text-center mt-8 text-black">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-b bg-gray-400  py-8 px-4">
            <div className="max-w-md mx-auto space-y-5">
                {playlists.map((playlist) => (
                    <div
                        key={playlist.uuid}
                        className="bg-gradient-to-r bg-white border rounded-xl p-5 shadow-lg hover:shadow-xl transition flex justify-between items-center"
                    >
                        <div>
                            <div className="font-bold text-black text-lg mb-2">
                                {playlist.playlist_name}
                            </div>
                            <div className="text-black">
                                Song count: {playlist.song_count}
                            </div>
                        </div>

                        <Link href={`/playlists/${playlist.uuid}`}>
                            <button className="bg-black text-white px-4 py-2 rounded">
                                View
                            </button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
