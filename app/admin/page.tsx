"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

const ADMIN_PASSWORD = "1234";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pass, setPass] = useState("");

  const [requests, setRequests] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadRequests = async () => {
    const snap = await getDocs(collection(db, "requests"));

    const data = snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    data.sort((a: any, b: any) => {
      return b.createdAt?.seconds - a.createdAt?.seconds;
    });

    setRequests(data);
  };

  useEffect(() => {
    if (auth) loadRequests();
  }, [auth]);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "requests", id), { status });
    loadRequests();
  };

  const filtered = requests.filter((r) => {
    return (
      r.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.phone?.includes(search) ||
      r.address?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const getStatusColor = (status: string) => {
    if (status === "new") return "bg-blue-500";
    if (status === "in progress") return "bg-yellow-500";
    if (status === "completed") return "bg-green-500";
    return "bg-gray-400";
  };

  const formatDate = (ts: any) => {
    if (!ts?.seconds) return "";
    return new Date(ts.seconds * 1000).toLocaleString();
  };

  // 🔐 LOGIN SCREEN
  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-3 text-center">
            Admin Login
          </h2>

          <input
            type="password"
            placeholder="Enter password"
            className="w-full border p-2 mb-3 rounded"
            onChange={(e) => setPass(e.target.value)}
          />

          <button
            onClick={() => {
              if (pass === ADMIN_PASSWORD) setAuth(true);
              else alert("Wrong password");
            }}
            className="w-full bg-orange-500 text-white p-2 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-orange-500 mb-4">
        🔧 ForFix Admin Panel
      </h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold text-orange-500">
            {requests.length}
          </p>
          <p>Total</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold text-blue-500">
            {requests.filter(r => r.status === "new").length}
          </p>
          <p>New</p>
        </div>

        <div className="bg-white p-4 rounded shadow text-center">
          <p className="text-2xl font-bold text-green-500">
            {requests.filter(r => r.status === "completed").length}
          </p>
          <p>Completed</p>
        </div>

      </div>

      {/* SEARCH + REFRESH */}
      <div className="flex gap-3 mb-4">

        <input
          className="p-2 border rounded w-full"
          placeholder="Search name, phone, address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={loadRequests}
          className="bg-gray-800 text-white px-4 rounded"
        >
          Refresh
        </button>

      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-4">

        {filtered.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded shadow">

            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-lg">{r.name}</h2>

              <span
                className={`text-white px-2 py-1 rounded text-xs ${getStatusColor(
                  r.status
                )}`}
              >
                {r.status}
              </span>
            </div>

            <p>📞 {r.phone}</p>
            <p>📍 {r.address}</p>
            <p>🛠 {r.service}</p>
            <p>🧾 {r.issue}</p>

            <p className="text-xs text-gray-500 mt-2">
              {formatDate(r.createdAt)}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3 flex-wrap">

              <button
                onClick={() => updateStatus(r.id, "new")}
                className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
              >
                New
              </button>

              <button
                onClick={() => updateStatus(r.id, "in progress")}
                className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
              >
                In Progress
              </button>

              <button
                onClick={() => updateStatus(r.id, "completed")}
                className="bg-green-500 text-white px-2 py-1 rounded text-xs"
              >
                Completed
              </button>

              <a
                href={`tel:${r.phone}`}
                className="bg-orange-500 text-white px-2 py-1 rounded text-xs"
              >
                Call
              </a>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}