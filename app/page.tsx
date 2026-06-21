"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

type RequestMode = "book" | "estimate";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<RequestMode>("book");
  const [loading, setLoading] = useState(false);

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

    try {
      setLoading(true);

      await addDoc(collection(db, "requests"), {
        ...form,
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
        <div>
          <h2 style={styles.brand}>The ForFix</h2>
          <p style={styles.subBrand}>Property Solutions LLC</p>
        </div>

        <nav style={styles.nav}>
          <a href="#services" style={styles.navLink}>Services</a>
          <a href="#areas" style={styles.navLink}>Areas</a>
          <a href="#reviews" style={styles.navLink}>Reviews</a>
          <a href="#contact" style={styles.navLink}>Contact</a>
        </nav>

        <button onClick={() => openForm("book")} style={styles.headerBtn}>
          Book Now
        </button>
      </header>

      <section style={styles.hero}>
        <p style={styles.badge}>Your Property. Our Priority.</p>

        <h1 style={styles.title}>
          Professional Property Maintenance Services in Austin, TX
        </h1>

        <p style={styles.subtitle}>
          Handyman, plumbing repairs, electrical repairs, painting, drywall,
          trash bin cleaning, and property maintenance services for homes,
          rentals, and local properties.
        </p>

        <div style={styles.heroButtons}>
          <button onClick={() => openForm("book")} style={styles.primaryBtn}>
            Book Now
          </button>

          <button onClick={() => openForm("estimate")} style={styles.secondaryBtn}>
            Get Free Estimate
          </button>
        </div>

        <div style={styles.trustRow}>
          <span>✓ Austin</span>
          <span>✓ Buda</span>
          <span>✓ Kyle</span>
          <span>✓ San Marcos</span>
          <span>✓ Weekend Support</span>
        </div>
      </section>

      <section id="services" style={styles.section}>
        <p style={styles.sectionBadge}>Our Services</p>
        <h2 style={styles.sectionTitle}>Reliable repair and maintenance solutions</h2>
        <p style={styles.sectionText}>
          ForFix helps homeowners, landlords, and property managers handle
          small repairs, maintenance tasks, and service requests with a simple
          online booking system.
        </p>

        <div style={styles.grid}>
          {[
            "Handyman Services",
            "Plumbing Repairs",
            "Electrical Repairs",
            "Drywall Repair",
            "Painting & Touch-Up",
            "Trash Bin Cleaning",
            "Pressure Washing",
            "Fence Repair",
            "Door Repair",
            "Property Maintenance",
            "Move-Out Repairs",
            "HOA Services",
          ].map((item) => (
            <div key={item} style={styles.card}>
              <h3 style={styles.cardTitle}>{item}</h3>
              <p style={styles.cardText}>
                Professional, organized, and reliable service requests handled
                through the ForFix system.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.lightSection}>
        <div style={styles.split}>
          <div>
            <p style={styles.sectionBadge}>Why ForFix</p>
            <h2 style={styles.sectionTitle}>
              A modern service experience for local property repairs
            </h2>
            <p style={styles.sectionTextLeft}>
              Instead of phone tag and messy notes, ForFix uses a clean online
              request system. Every service request is submitted, organized,
              tracked, and managed from one dashboard.
            </p>
          </div>

          <div style={styles.featureBox}>
            <div style={styles.feature}>✓ Easy online booking</div>
            <div style={styles.feature}>✓ Fast request tracking</div>
            <div style={styles.feature}>✓ Organized admin dashboard</div>
            <div style={styles.feature}>✓ Built for future growth</div>
          </div>
        </div>
      </section>

      <section id="areas" style={styles.section}>
        <p style={styles.sectionBadge}>Service Areas</p>
        <h2 style={styles.sectionTitle}>Serving Austin and nearby communities</h2>

        <div style={styles.areaGrid}>
          {["Austin", "Buda", "Kyle", "San Marcos"].map((area) => (
            <div key={area} style={styles.areaCard}>
              {area}
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" style={styles.lightSection}>
        <p style={styles.sectionBadge}>Customer Reviews</p>
        <h2 style={styles.sectionTitle}>Built on trust and professional service</h2>

        <div style={styles.reviewGrid}>
          <div style={styles.reviewCard}>
            <b>★★★★★</b>
            <p>“Fast response and professional service.”</p>
          </div>
          <div style={styles.reviewCard}>
            <b>★★★★★</b>
            <p>“Easy booking and reliable work.”</p>
          </div>
          <div style={styles.reviewCard}>
            <b>★★★★★</b>
            <p>“Highly recommended for home repairs.”</p>
          </div>
        </div>
      </section>

      <section id="contact" style={styles.cta}>
        <p style={styles.ctaBadge}>Ready to start?</p>
        <h2 style={styles.ctaTitle}>Send your service request today</h2>
        <p style={styles.ctaText}>
          Choose Book Now if you are ready to schedule, or Free Estimate if you
          want pricing first.
        </p>

        <div style={styles.heroButtons}>
          <button onClick={() => openForm("book")} style={styles.primaryBtn}>
            Book Now
          </button>
          <button onClick={() => openForm("estimate")} style={styles.secondaryBtn}>
            Get Free Estimate
          </button>
        </div>
      </section>

      <footer style={styles.footer}>
        <b>The ForFix Property Solutions LLC</b>
        <p>Your Property. Our Priority.</p>
        <p>Austin • Buda • Kyle • San Marcos</p>
        <p>theforfix.com</p>
      </footer>

      {open && (
        <div style={styles.modalBg}>
          <div style={styles.modalBox}>
            <h2 style={styles.modalTitle}>
              {mode === "book" ? "Book Service" : "Get Free Estimate"}
            </h2>

            <p style={styles.modalDesc}>
              {mode === "book"
                ? "Use this form when you are ready to schedule a service."
                : "Use this form to request pricing before booking."}
            </p>

            <input
              style={styles.input}
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Email Optional"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              style={styles.input}
              placeholder="Service Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <select
              style={styles.input}
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option>Handyman Services</option>
              <option>Plumbing Repairs</option>
              <option>Electrical Repairs</option>
              <option>Drywall Repair</option>
              <option>Painting & Touch-Up</option>
              <option>Trash Bin Cleaning</option>
              <option>Pressure Washing</option>
              <option>Fence Repair</option>
              <option>Door Repair</option>
              <option>Property Maintenance</option>
              <option>Move-Out Repairs</option>
              <option>HOA Services</option>
              <option>Other</option>
            </select>

            <div style={styles.twoCols}>
              <input
                style={styles.input}
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />

              <input
                style={styles.input}
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>

            <textarea
              style={styles.textarea}
              placeholder="Describe the issue or work needed"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
            />

            <button
              onClick={submitRequest}
              disabled={loading}
              style={{ ...styles.fullButton, opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Sending..." : "Submit Request"}
            </button>

            <button onClick={() => setOpen(false)} style={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#ffffff",
    color: "#111827",
    minHeight: "100vh",
  },
  header: {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "18px 44px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 20,
    gap: 20,
    flexWrap: "wrap",
  },
  brand: {
    margin: 0,
    fontSize: 28,
    fontWeight: 900,
  },
  subBrand: {
    margin: "4px 0 0",
    color: "#ff6a00",
    fontSize: 14,
    fontWeight: 700,
  },
  nav: {
    display: "flex",
    gap: 18,
    flexWrap: "wrap",
  },
  navLink: {
    color: "#374151",
    textDecoration: "none",
    fontWeight: 700,
  },
  headerBtn: {
    background: "#ff6a00",
    color: "#ffffff",
    border: "none",
    padding: "12px 20px",
    borderRadius: 12,
    fontWeight: 900,
    cursor: "pointer",
  },
  hero: {
    background: "#ffffff",
    padding: "95px 22px",
    textAlign: "center",
  },
  badge: {
    color: "#ff6a00",
    fontWeight: 900,
    letterSpacing: 0.5,
    margin: 0,
  },
  title: {
    fontSize: 50,
    lineHeight: 1.08,
    maxWidth: 980,
    margin: "18px auto",
    fontWeight: 900,
  },
  subtitle: {
    fontSize: 20,
    color: "#4b5563",
    maxWidth: 820,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  heroButtons: {
    marginTop: 34,
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "#ff6a00",
    color: "#ffffff",
    border: "none",
    padding: "16px 30px",
    borderRadius: 14,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#ffffff",
    color: "#ff6a00",
    border: "2px solid #ff6a00",
    padding: "14px 30px",
    borderRadius: 14,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  trustRow: {
    marginTop: 28,
    display: "flex",
    justifyContent: "center",
    gap: 18,
    flexWrap: "wrap",
    color: "#374151",
    fontWeight: 800,
  },
  section: {
    padding: "75px 22px",
    maxWidth: 1180,
    margin: "0 auto",
    textAlign: "center",
    background: "#ffffff",
  },
  lightSection: {
    padding: "75px 22px",
    background: "#f8fafc",
    textAlign: "center",
  },
  sectionBadge: {
    color: "#ff6a00",
    fontWeight: 900,
    margin: 0,
  },
  sectionTitle: {
    fontSize: 38,
    margin: "12px auto 14px",
    maxWidth: 850,
    fontWeight: 900,
  },
  sectionText: {
    color: "#6b7280",
    maxWidth: 780,
    margin: "0 auto 36px",
    fontSize: 18,
    lineHeight: 1.6,
  },
  sectionTextLeft: {
    color: "#6b7280",
    maxWidth: 620,
    margin: "0 auto",
    fontSize: 18,
    lineHeight: 1.6,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
    marginTop: 38,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 26,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
    textAlign: "left",
  },
  cardTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 900,
  },
  cardText: {
    color: "#6b7280",
    lineHeight: 1.6,
  },
  split: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 30,
    alignItems: "center",
    textAlign: "left",
  },
  featureBox: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  feature: {
    padding: "14px 0",
    borderBottom: "1px solid #f1f5f9",
    fontWeight: 800,
    color: "#374151",
  },
  areaGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: 18,
    marginTop: 35,
  },
  areaCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 28,
    fontWeight: 900,
    fontSize: 22,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  reviewGrid: {
    maxWidth: 1050,
    margin: "35px auto 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
  },
  reviewCard: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 20,
    padding: 28,
    color: "#374151",
    lineHeight: 1.7,
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
  },
  cta: {
    background: "#ffffff",
    textAlign: "center",
    padding: "80px 22px",
    borderTop: "1px solid #e5e7eb",
  },
  ctaBadge: {
    color: "#ff6a00",
    fontWeight: 900,
    margin: 0,
  },
  ctaTitle: {
    fontSize: 40,
    margin: "12px 0",
    fontWeight: 900,
  },
  ctaText: {
    color: "#6b7280",
    fontSize: 18,
    margin: "0 auto",
    maxWidth: 760,
  },
  footer: {
    background: "#ffffff",
    color: "#4b5563",
    textAlign: "center",
    padding: 34,
    borderTop: "1px solid #e5e7eb",
  },
  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    padding: 20,
  },
  modalBox: {
    background: "#ffffff",
    padding: 28,
    borderRadius: 22,
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: {
    margin: 0,
    fontSize: 30,
    fontWeight: 900,
  },
  modalDesc: {
    color: "#6b7280",
    lineHeight: 1.5,
    margin: "8px 0 18px",
  },
  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
  },
  twoCols: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 10,
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
  },
  fullButton: {
    width: "100%",
    background: "#ff6a00",
    color: "#ffffff",
    border: "none",
    padding: 15,
    borderRadius: 14,
    fontWeight: 900,
    cursor: "pointer",
  },
  closeBtn: {
    marginTop: 12,
    width: "100%",
    background: "transparent",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
  },
};