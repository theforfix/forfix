"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"book" | "estimate">("book");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    service: "Handyman Service",
    issue: "",
  });

  const submitRequest = async () => {
    if (!form.name || !form.phone || !form.issue) {
      alert("Please fill name, phone, and issue.");
      return;
    }

    setLoading(true);

    await addDoc(collection(db, "requests"), {
      ...form,
      type: mode,
      status: "new",
      source: "website",
      createdAt: serverTimestamp(),
    });

    setLoading(false);
    setOpen(false);
    alert("Request sent successfully!");

    setForm({
      name: "",
      phone: "",
      address: "",
      service: "Handyman Service",
      issue: "",
    });
  };

  return (
    <main style={{ fontFamily: "Arial, sans-serif", background: "#f5f5f5", color: "#222" }}>
      <header style={{
        background: "#ffffff",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e5e5e5",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>
            The ForFix
          </h2>
          <p style={{ margin: 0, color: "#ff6a00", fontSize: 13 }}>
            Property Solutions LLC
          </p>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => { setMode("book"); setOpen(true); }} style={btnOrange}>
            Book Now
          </button>
          <button onClick={() => { setMode("estimate"); setOpen(true); }} style={btnOutline}>
            Get Free Estimate
          </button>
        </div>
      </header>

      <section style={{
        padding: "90px 20px",
        textAlign: "center",
        background: "linear-gradient(180deg,#ffffff,#f3f4f6)"
      }}>
        <p style={{ color: "#ff6a00", fontWeight: 800 }}>
          Weekend Support Only
        </p>

        <h1 style={{
          fontSize: 56,
          maxWidth: 950,
          margin: "10px auto",
          lineHeight: 1.05,
          fontWeight: 900
        }}>
          Fast & Reliable Home Repair Services in Austin, TX
        </h1>

        <p style={{
          fontSize: 20,
          color: "#555",
          maxWidth: 750,
          margin: "20px auto"
        }}>
          Professional handyman, plumbing, electrical, painting, and property maintenance services.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
          <button onClick={() => { setMode("book"); setOpen(true); }} style={bigOrange}>
            Book Now
          </button>
          <button onClick={() => { setMode("estimate"); setOpen(true); }} style={bigOutline}>
            Get Free Estimate
          </button>
        </div>
      </section>

      <section style={{ padding: "60px 20px", maxWidth: 1100, margin: "auto" }}>
        <h2 style={sectionTitle}>Our Services</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18
        }}>
          {["Handyman Service", "Plumbing Repair", "Electrical Repair", "Painting", "Property Maintenance", "Appliance Help"].map((s) => (
            <div key={s} style={card}>
              <h3>{s}</h3>
              <p style={{ color: "#666" }}>Fast, clean, and professional service.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#ffffff", padding: "60px 20px", textAlign: "center" }}>
        <h2 style={sectionTitle}>Why Choose ForFix?</h2>
        <p style={{ maxWidth: 750, margin: "auto", color: "#555", fontSize: 18 }}>
          We make home repair simple: easy booking, fast response, organized requests, and professional service.
        </p>
      </section>

      <footer style={{
        padding: 30,
        textAlign: "center",
        background: "#eeeeee",
        color: "#555"
      }}>
        © 2026 The ForFix Property Solutions LLC — Austin, TX
      </footer>

      {open && (
        <div style={modalBg}>
          <div style={modalBox}>
            <h2 style={{ marginTop: 0 }}>
              {mode === "book" ? "Book Service" : "Get Free Estimate"}
            </h2>

            <input style={input} placeholder="Full Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <input style={input} placeholder="Phone Number" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />

            <input style={input} placeholder="Address" value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })} />

            <select style={input} value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}>
              <option>Handyman Service</option>
              <option>Plumbing Repair</option>
              <option>Electrical Repair</option>
              <option>Painting</option>
              <option>Property Maintenance</option>
              <option>Appliance Help</option>
            </select>

            <textarea style={{ ...input, height: 110 }} placeholder="Describe the issue"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })} />

            <button onClick={submitRequest} style={{ ...bigOrange, width: "100%" }}>
              {loading ? "Sending..." : "Submit Request"}
            </button>

            <button onClick={() => setOpen(false)} style={{
              marginTop: 12,
              background: "transparent",
              border: "none",
              color: "#777",
              cursor: "pointer",
              width: "100%"
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const btnOrange = { background: "#ff6a00", color: "white", border: "none", padding: "10px 16px", borderRadius: 8, fontWeight: 800, cursor: "pointer" };
const btnOutline = { background: "white", color: "#ff6a00", border: "2px solid #ff6a00", padding: "10px 16px", borderRadius: 8, fontWeight: 800, cursor: "pointer" };
const bigOrange = { background: "#ff6a00", color: "white", border: "none", padding: "16px 30px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 16 };
const bigOutline = { background: "white", color: "#ff6a00", border: "2px solid #ff6a00", padding: "16px 30px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 16 };
const sectionTitle = { textAlign: "center" as const, fontSize: 34, marginBottom: 30 };
const card = { background: "white", padding: 24, borderRadius: 16, boxShadow: "0 8px 25px rgba(0,0,0,.06)", border: "1px solid #eee" };
const input = { width: "100%", padding: 13, marginBottom: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 };
const modalBg = { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99, padding: 20 };
const modalBox = { background: "white", padding: 25, borderRadius: 18, width: "100%", maxWidth: 460 };