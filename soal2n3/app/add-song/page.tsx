'use client';
import { useState } from 'react';
import axios from 'axios';

export default function AddSongForm() {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    description: '',
    source: '',
    thumbnail: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, thumbnail: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) data.append(key, value as any);
    });
    try {
      await axios.post('https://learn.smktelkom-mlg.sch.id/ukl2/playlists/song', data);
      alert('Song created!');
    } catch (error) {
      alert('Failed to add song.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 p-6">
      <div className="backdrop-blur-md bg-white/30 border border-white/50 rounded-2xl shadow-xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">Add New Song</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            name="title"
            value={form.title}
            placeholder="Title"
            onChange={handleChange}
            className="border p-2 w-full rounded text-black"
          />
          <input 
            name="artist"
            value={form.artist}
            placeholder="Artist"
            onChange={handleChange}
            className="border p-2 w-full rounded text-black"
          />
          <textarea
            name="description"
            value={form.description}
            placeholder="Description"
            onChange={handleChange}
            className="border p-2 w-full rounded text-black"
          />
          <input 
            name="source"
            value={form.source}
            placeholder="YouTube Link"
            onChange={handleChange}
            className="border p-2 w-full rounded text-black"
          />
          <input 
            type="file"
            name="thumbnail"
            onChange={handleFileChange}
            className="border p-2 w-full rounded bg-white/60 text-black"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full"
          >
            Add Song
          </button>
        </form>
      </div>
    </div>
  );
}