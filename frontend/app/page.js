"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/users", { name, email });
      setName("");
      setEmail("");
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans selection:bg-indigo-500 selection:text-white abddd">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4 tracking-tight">
            User Management
          </h1>
          <p className="text-slate-400 text-lg">
            Seamlessly manage your users with our premium interface.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Add User Form */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-indigo-500/10 transition-all hover:shadow-indigo-500/20 hover:border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-sm">
                +
              </span>
              Add New User
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-300 ml-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  placeholder="e.g. Alex Morgan"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300 ml-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600"
                  placeholder="e.g. alex@example.com"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 transform transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Create User"
                )}
              </button>
            </form>
          </section>

          {/* User List */}
          <section className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10 transition-all hover:shadow-cyan-500/20 hover:border-white/20 flex flex-col h-[600px]">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-sm text-black font-bold">
                {users.length}
              </span>
              Registered Users
            </h2>

            <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
              {users.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <p>No users found. Start by adding one!</p>
                </div>
              ) : (
                users.map((user) => (
                  <div
                    key={user._id}
                    className="group bg-slate-800/40 hover:bg-slate-800/80 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-4 transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg font-bold shadow-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate group-hover:text-indigo-400 transition-colors">
                        {user.name}
                      </h3>
                      <p className="text-slate-400 text-sm truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      ID: {user._id.slice(-4)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
