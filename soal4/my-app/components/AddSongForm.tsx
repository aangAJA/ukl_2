
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
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <input name="title" placeholder="Title" onChange={handleChange} className="border p-2 w-full" />
      <input name="artist" placeholder="Artist" onChange={handleChange} className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" onChange={handleChange} className="border p-2 w-full" />
      <input name="source" placeholder="YouTube Link" onChange={handleChange} className="border p-2 w-full" />
      <input type="file" name="thumbnail" onChange={handleFileChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Add Song</button>
    </form>
  );
}
