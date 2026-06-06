"use client";

import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"book" | "estimate">("book");

  const [service, setService] = useState("Plumbing");
  const [sqft, setSqft] = useState(500);
  const [distance, setDistance] = useState(5);

  const rates: any = {
    Plumbing: 1.2,
    Electrical: 1.5,
    Handyman: 1,
    Painting: 2,
    HVAC: 2.5,
  };

  const calculate = () => {
    const base = sqft * rates[service];
    const travel = distance * 5;
    return Math.round(base + travel);
  };

  return (
    <main className="bg-gray-100 text-gray-900">

      {/* HERO */}
      <section className="bg-black text-white text-center py-24 px-6">
        <h1 className="text-4xl font-bold">
          The ForFix Property Solutions LLC
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Fast, Reliable Home Repair Services You Can Trust
        </p>

        <p className="mt-2 text-sm text-yellow-400">
          Weekend Support Only
        </p>

        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => {
              setMode("book");
              setOpen(true);
            }}
            className="bg-orange-500 px-6 py-3 rounded-lg font-semibold"
          >
            Book Now
          </button>

          <button
            onClick={() => {
              setMode("estimate");
              setOpen(true);
            }}
            className="border border-orange-500 px-6 py-3 rounded-lg"
          >
            Get Free Estimate
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-700">
          The ForFix Property Solutions LLC provides professional home repair
          services including plumbing, electrical, handyman, painting, and HVAC.
          We focus on quality, speed, and customer satisfaction.
        </p>
      </section>

      {/* SERVICES + PRICING */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Services & Pricing</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.keys(rates).map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold">{s}</h3>
              <p className="text-gray-600">
                ${rates[s] * 100} per sqft (approx)
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-16 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-8">Before & After</h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">

          <div className="bg-gray-50 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Bathroom Work</h3>

            <div className="grid grid-cols-2 gap-2">
              <img src="/before1.jpg" className="rounded" />
              <img src="/after1.jpg" className="rounded" />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl shadow">
            <h3 className="font-semibold mb-3">Kitchen Work</h3>

            <div className="grid grid-cols-2 gap-2">
              <img src="/before2.jpg" className="rounded" />
              <img src="/after2.jpg" className="rounded" />
            </div>
          </div>

        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded shadow">
            ⭐⭐⭐⭐⭐<br />
            "Fast and professional service."<br />
            <b>John M.</b>
          </div>

          <div className="bg-white p-6 rounded shadow">
            ⭐⭐⭐⭐⭐<br />
            "Very reliable work."<br />
            <b>Sarah K.</b>
          </div>

          <div className="bg-white p-6 rounded shadow">
            ⭐⭐⭐⭐⭐<br />
            "Highly recommended!"<br />
            <b>Michael R.</b>
          </div>
        </div>
      </section>

      {/* MODAL QUOTE SYSTEM */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              {mode === "book" ? "Book Service" : "Free Estimate"}
            </h2>

            <select
              className="w-full border p-2 mb-3 rounded"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Handyman</option>
              <option>Painting</option>
              <option>HVAC</option>
            </select>

            <input
              className="w-full border p-2 mb-3 rounded"
              type="number"
              placeholder="Square Feet"
              value={sqft}
              onChange={(e) => setSqft(Number(e.target.value))}
            />

            <input
              className="w-full border p-2 mb-3 rounded"
              type="number"
              placeholder="Distance (miles)"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
            />

            <div className="text-center text-green-600 font-bold mb-4 text-lg">
              Estimated: ${calculate()}
            </div>

            <button className="w-full bg-orange-500 text-white py-2 rounded">
              Confirm & Book
            </button>

            <button
              onClick={() => setOpen(false)}
              className="mt-3 w-full text-sm text-gray-500"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </main>
  );
}