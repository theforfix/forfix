"use client";

import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

import {
  DoorOpen,
  Layers,
  Droplets,
  Paintbrush,
  Fence,
  Hammer,
} from "lucide-react";

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "",
    issue: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "requests"), {
        ...form,
        status: "new",
        createdAt: new Date(),
      });

      setSuccess(true);

      setForm({
        name: "",
        phone: "",
        address: "",
        service: "",
        issue: "",
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const services = [
    { name: "General Home Repair", price: "$50 - $120" },
    { name: "Plumbing Repair", price: "$80 - $200" },
    { name: "Electrical Repair", price: "$90 - $250" },
    { name: "Drywall Repair", price: "$100 - $300" },
    { name: "Painting", price: "$150 - $500" },
    { name: "Appliance Installation", price: "$60 - $180" },
    { name: "Other", price: "Custom Quote" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <header className="bg-orange-500 text-white p-6 text-center shadow">
        <h1 className="text-3xl font-bold">
          ForFix Property Solutions LLC
        </h1>
        <p>Fast • Reliable • Professional</p>
      </header>

      {/* WEEKEND BANNER */}
      <div className="bg-black text-white text-center py-3 px-4">
        <h2 className="text-lg font-bold">
          📅 Weekend Only Service (Saturday & Sunday)
        </h2>
        <p className="text-sm text-gray-300">
          We operate only on weekends
        </p>
      </div>

      <div className="flex flex-col md:flex-row">

        {/* SIDEBAR */}
        <aside className="w-full md:w-80 bg-white p-4 shadow">

          <a
            href="tel:5126090528"
            className="block bg-orange-500 text-white text-center py-2 rounded mb-2"
          >
            📞 Call Now
          </a>

          <a
            href="mailto:support@theforfix.com"
            className="block bg-blue-500 text-white text-center py-2 rounded mb-4"
          >
            📧 Email Us
          </a>

          <h2 className="font-bold text-orange-500 mb-2">
            Service Prices
          </h2>

          <div className="space-y-2 text-sm">
            {services.map((s, i) => (
              <div key={i} className="border p-2 rounded">
                <p className="font-semibold">{s.name}</p>
                <p className="text-orange-500">{s.price}</p>
              </div>
            ))}
          </div>

        </aside>

        {/* MAIN */}
        <main className="flex-1 p-6 space-y-6">

          {/* SERVICES */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Our Services
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">

              <div className="border p-3 rounded">
                <DoorOpen className="mx-auto text-orange-500" />
                <p>Doors</p>
              </div>

              <div className="border p-3 rounded">
                <Layers className="mx-auto text-orange-500" />
                <p>Floors</p>
              </div>

              <div className="border p-3 rounded">
                <Droplets className="mx-auto text-orange-500" />
                <p>Gutters</p>
              </div>

              <div className="border p-3 rounded">
                <Paintbrush className="mx-auto text-orange-500" />
                <p>Painting</p>
              </div>

              <div className="border p-3 rounded">
                <Fence className="mx-auto text-orange-500" />
                <p>Fencing</p>
              </div>

              <div className="border p-3 rounded">
                <Hammer className="mx-auto text-orange-500" />
                <p>Carpentry</p>
              </div>

            </div>
          </section>

          {/* BEFORE / AFTER (NO WORKERS IMAGES) */}
          <section className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Before & After Work
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="border rounded overflow-hidden">
                <div className="bg-gray-100 p-2 text-center font-bold">
                  Before
                </div>

                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60"
                  className="w-full h-48 object-cover"
                />
              </div>

              <div className="border rounded overflow-hidden">
                <div className="bg-green-100 p-2 text-center font-bold">
                  After
                </div>

                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=800&q=60"
                  className="w-full h-48 object-cover"
                />
              </div>

            </div>
          </section>

          {/* REQUEST FORM */}
          <section className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-2xl font-bold text-orange-500 mb-3">
              Request Service
            </h2>

            {success && (
              <div className="bg-green-100 text-green-700 p-2 mb-2 rounded">
                Request sent successfully ✔
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full border p-2 rounded"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-2 rounded"
              />

              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border p-2 rounded"
              />

              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Service</option>
                {services.map((s, i) => (
                  <option key={i}>{s.name}</option>
                ))}
              </select>

              <textarea
                name="issue"
                value={form.issue}
                onChange={handleChange}
                placeholder="Describe your issue"
                className="w-full border p-2 rounded h-24"
              />

              <button
                disabled={loading}
                className="w-full bg-orange-500 text-white p-2 rounded"
              >
                {loading ? "Sending..." : "Submit Request"}
              </button>

            </form>
          </section>

        </main>
      </div>
    </div>
  );
}