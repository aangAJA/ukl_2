'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SongsRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.push('/playlists');
  }, [router]);

  return <p>Redirecting...</p>;
}
