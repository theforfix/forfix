"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type RequestMode = "book" | "estimate";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<RequestMode>("book");
  const [loading, setLoading] = useState(false);

  const services = [
    "Handyman Services",
    "Small Plumbing Repairs",
    "Small Electrical Repairs",
    "Drywall Repair",
    "Painting & Touch-Up",
    "Pressure Washing",
    "Trash Bin Cleaning",
    "Fence Repair",
    "Door Repair",
    "Property Maintenance",
    "Move-Out Repairs",
    "HOA Services",
  ];

  const gallery = [
    { before: "/before1.jpg", after: "/after1.jpg" },
    { before: "/before2.jpg", after: "/after2.jpg" },
    { before: "/before3.jpg", after: "/after3.jpg" },
  ];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "Handyman Services",
    date: "",
    time: "",
    issue: "",
  });

  const openForm = (selectedMode: RequestMode) => {
    setMode(selectedMode);
    setOpen(true);
  };

  const submitRequest = async () => {
    if (!form.name || !form.phone || !form.address || !form.issue) {
      alert("Please fill name, phone, address, and issue.");
      return;
    }

    if (mode === "book" && (!form.date || !form.time)) {
      alert("Please choose preferred date and time.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "requests"), {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        service: form.service,
        issue: form.issue,
        date: mode === "book" ? form.date : "",
        time: mode === "book" ? form.time : "",
        type: mode,
        status: "new",
        source: "website",
        createdAt: serverTimestamp(),
      });

      alert("Your request has been sent successfully.");
      setOpen(false);

      setForm({
        name: "",
        phone: "",
        email: "",
        address: "",
        service: "Handyman Services",
        date: "",
        time: "",
        issue: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div style={styles.logoBox}>
          <Image src="/logo.png" alt="ForFix Logo" width={72} height={72} priority />

          <div>
            <h2 style={styles.brand}>The ForFix</h2>
            <p style={styles.subBrand}>Property Solutions LLC</p>
            <div style={styles.contactMini}>
              <a href="tel:5126090528" style={styles.contactLink}>512-609-0528</a>
              <span style={styles.dot}>•</span>
              <a href="mailto:support@theforfix.com" style={styles.contactLink}>
                support@theforfix.com
              </a>
            </div>
          </div>
        </div>

        <nav style={styles.nav}>
          <button onClick={() => openForm("book")} style={styles.headerBtn}>Book Now</button>
          <button onClick={() => openForm("estimate")} style={styles.headerOutline}>
            Get Free Estimate
          </button>
        </nav>
      </header>

      <section style={styles.hero}>
        <p style={styles.badge}>Your Property. Our Priority.</p>
        <h1 style={styles.title}>Professional Property Maintenance Services</h1>
        <p style={styles.subtitle}>
          Handyman, small plumbing, small electrical, drywall, painting, trash bin
          cleaning, pressure washing, fence repair, and property maintenance.
        </p>
        <p style={styles.areaText}>Serving Austin • Buda • Kyle • San Marcos</p>
      </section>

      <section style={styles.section}>
        <p style={styles.sectionBadge}>Our Services</p>
        <h2 style={styles.sectionTitle}>Reliable property repair solutions</h2>

        <div style={styles.grid}>
          {services.map((item) => (
            <div key={item} style={styles.card}>
              <h3 style={styles.cardTitle}>{item}</h3>
              <p style={styles.cardText}>
                Clean, organized, and professional service for residential properties.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.lightSection}>
        <div style={styles.split}>
          <div>
            <p style={styles.sectionBadge}>Why Choose ForFix</p>
            <h2 style={styles.sectionTitleLeft}>A modern system for local property maintenance</h2>
            <p style={styles.sectionTextLeft}>
              Customers submit requests online, and every job is organized inside the admin dashboard.
            </p>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.feature}>✓ Easy Online Booking</div>
            <div style={styles.feature}>✓ Fast Response</div>
            <div style={styles.feature}>✓ Organized Tracking</div>
            <div style={styles.feature}>✓ Professional Service</div>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <p style={styles.sectionBadge}>Before & After</p>
        <h2 style={styles.sectionTitle}>Real ForFix Work Results</h2>

        <div style={styles.galleryGrid}>
          {gallery.map((item, index) => (
            <div key={index} style={styles.galleryCard}>
              <div style={styles.beforeAfterGrid}>
                <div>
                  <p style={styles.photoLabel}>Before</p>
                  <img src={item.before} alt="Before" style={styles.workPhoto} />
                </div>
                <div>
                  <p style={styles.photoLabel}>After</p>
                  <img src={item.after} alt="After" style={styles.workPhoto} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.cta}>
        <p style={styles.ctaBadge}>Ready to start?</p>
        <h2 style={styles.ctaTitle}>Need help with your property?</h2>
        <p style={styles.ctaText}>
          Use the buttons in the header to book a service or request a free estimate.
        </p>
      </section>

      <footer style={styles.footer}>
        <b>The ForFix Property Solutions LLC</b>
        <p>Your Property. Our Priority.</p>
        <p>Austin • Buda • Kyle • San Marcos</p>
        <p>
          <a href="tel:5126090528" style={styles.footerLink}>512-609-0528</a>
          {" • "}
          <a href="mailto:support@theforfix.com" style={styles.footerLink}>
            support@theforfix.com
          </a>
        </p>
      </footer>

      {open && (
        <div style={styles.modalBg}>
          <div style={styles.modalBox}>
            <h2 style={styles.modalTitle}>
              {mode === "book" ? "Book Service" : "Get Free Estimate"}
            </h2>

            <p style={styles.modalDesc}>
              {mode === "book"
                ? "Choose a preferred day and time for service."
                : "Request pricing first. No day or time required."}
            </p>

            <input style={styles.input} placeholder="Full Name" value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />

            <input style={styles.input} placeholder="Phone Number" value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} />

            <input style={styles.input} placeholder="Email Optional" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />

            <input style={styles.input} placeholder="Service Address" value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })} />

            <select style={styles.input} value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}>
              {services.map((service) => <option key={service}>{service}</option>)}
              <option>Other</option>
            </select>

            {mode === "book" && (
              <div style={styles.twoCols}>
                <input style={styles.input} type="date" value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })} />

                <input style={styles.input} type="time" value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })} />
              </div>
            )}

            <textarea style={styles.textarea} placeholder="Describe the issue or work needed" value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })} />

            <button onClick={submitRequest} disabled={loading}
              style={{ ...styles.fullButton, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Sending..." : "Submit Request"}
            </button>

            <button onClick={() => setOpen(false)} style={styles.closeBtn}>Close</button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, CSSProperties> = {
  page: { fontFamily: "Arial, sans-serif", background: "#ffffff", color: "#111827", minHeight: "100vh" },
  header: { background: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "10px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 20, gap: 14, flexWrap: "wrap" },
  logoBox: { display: "flex", alignItems: "center", gap: 12 },
  brand: { margin: 0, fontSize: "clamp(22px, 5vw, 30px)", fontWeight: 900 },
  subBrand: { margin: "3px 0 0", color: "#ff6a00", fontSize: "clamp(12px, 3vw, 15px)", fontWeight: 700 },
  contactMini: { marginTop: 5, display: "flex", gap: 7, flexWrap: "wrap", alignItems: "center", fontSize: "12px" },
  contactLink: { color: "#4b5563", textDecoration: "none", fontWeight: 800 },
  dot: { color: "#d1d5db" },
  nav: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  headerBtn: { background: "#ff6a00", color: "#ffffff", border: "none", padding: "11px 16px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 14 },
  headerOutline: { background: "#ffffff", color: "#ff6a00", border: "2px solid #ff6a00", padding: "9px 16px", borderRadius: 12, fontWeight: 900, cursor: "pointer", fontSize: 14 },
  hero: { background: "#ffffff", padding: "55px 18px", textAlign: "center" },
  badge: { color: "#ff6a00", fontWeight: 900, margin: 0 },
  title: { fontSize: "clamp(32px, 8vw, 50px)", lineHeight: 1.08, maxWidth: 900, margin: "18px auto", fontWeight: 900 },
  subtitle: { fontSize: "clamp(16px, 4vw, 20px)", color: "#4b5563", maxWidth: 820, margin: "0 auto", lineHeight: 1.6 },
  areaText: { marginTop: 22, color: "#374151", fontWeight: 900 },
  section: { padding: "60px 18px", maxWidth: 1180, margin: "0 auto", textAlign: "center", background: "#ffffff" },
  lightSection: { padding: "60px 18px", background: "#f8fafc" },
  sectionBadge: { color: "#ff6a00", fontWeight: 900, margin: 0 },
  sectionTitle: { fontSize: "clamp(28px, 6vw, 38px)", margin: "12px auto 14px", maxWidth: 850, fontWeight: 900 },
  sectionTitleLeft: { fontSize: "clamp(28px, 6vw, 38px)", margin: "12px 0 14px", fontWeight: 900 },
  sectionTextLeft: { color: "#6b7280", fontSize: 17, lineHeight: 1.6 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 18, marginTop: 34 },
  card: { background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 18, padding: 22, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "left" },
  cardTitle: { margin: 0, fontSize: 19, fontWeight: 900 },
  cardText: { color: "#6b7280", lineHeight: 1.6 },
  split: { maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, alignItems: "center" },
  featureBox: { background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 24, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" },
  feature: { padding: "13px 0", borderBottom: "1px solid #f1f5f9", fontWeight: 800, color: "#374151" },
  galleryGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginTop: 32 },
  galleryCard: { background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 18, padding: 14, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "left" },
  beforeAfterGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  photoLabel: { fontWeight: 900, color: "#ff6a00", marginBottom: 8 },
  workPhoto: { width: "100%", height: 190, objectFit: "cover", borderRadius: 12, border: "1px solid #e5e7eb" },
  cta: { background: "#ffffff", textAlign: "center", padding: "60px 18px", borderTop: "1px solid #e5e7eb" },
  ctaBadge: { color: "#ff6a00", fontWeight: 900, margin: 0 },
  ctaTitle: { fontSize: "clamp(28px, 6vw, 40px)", margin: "12px 0", fontWeight: 900 },
  ctaText: { color: "#6b7280", fontSize: 17, margin: "0 auto", maxWidth: 760 },
  footer: { background: "#ffffff", color: "#4b5563", textAlign: "center", padding: 30, borderTop: "1px solid #e5e7eb" },
  footerLink: { color: "#ff6a00", textDecoration: "none", fontWeight: 800 },
  modalBg: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99, padding: 14 },
  modalBox: { background: "#ffffff", padding: 22, borderRadius: 20, width: "100%", maxWidth: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", maxHeight: "90vh", overflowY: "auto" },
  modalTitle: { margin: 0, fontSize: 28, fontWeight: 900 },
  modalDesc: { color: "#6b7280", lineHeight: 1.5, margin: "8px 0 18px" },
  input: { width: "100%", padding: 13, marginBottom: 12, borderRadius: 12, border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box" },
  twoCols: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 },
  textarea: { width: "100%", height: 120, padding: 13, marginBottom: 12, borderRadius: 12, border: "1px solid #d1d5db", fontSize: 15, boxSizing: "border-box" },
  fullButton: { width: "100%", background: "#ff6a00", color: "#ffffff", border: "none", padding: 15, borderRadius: 14, fontWeight: 900, cursor: "pointer" },
  closeBtn: { marginTop: 12, width: "100%", background: "transparent", border: "none", color: "#6b7280", cursor: "pointer" },
};