import PlaylistList from '@/components/PlaylistList';

export default function PlaylistPage() {
    return (
        <main className="min-h-screen bg-white px-4 py-6">
            <h1 className="text-3xl font-bold mb-4 text-center text-black">Song Playlists</h1>
            <PlaylistList />
        </main>
    );
}
