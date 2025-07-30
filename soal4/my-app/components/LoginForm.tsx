"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      setUserData(res.data);

      setToast("Login berhasil!");

      localStorage.setItem("user", JSON.stringify(res.data));

      setTimeout(() => {
        router.push("/playlists");
      }, 3000);
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setToast("Username atau password salah!");
      } else {
        setToast("Terjadi kesalahan saat login.");
      }
    }
  };

  return (
    <>
      {toast && (
        <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {toast}
          {userData && (
            <div className="mt-2 text-left text-sm bg-white text-black rounded p-2 shadow-inner max-w-xs">
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>First Name:</strong> {userData.firstName}</p>
              <p><strong>Last Name:</strong> {userData.lastName}</p>
              <p><strong>Gender:</strong> {userData.gender || "N/A"}</p>
            </div>
          )}
        </div>
      )}

      <div
        className="w-screen h-screen flex justify-center items-center p-5"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1506748686210-4d8a2e5b3d5f')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-black">Login</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              className="border p-2 rounded-md w-full text-black placeholder-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoFocus
            />

            <input
              type="password"
              className="border p-2 rounded-md w-full text-black placeholder-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-600 text-white w-full p-2 rounded-md font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
