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
    service: "Handyman Services",
    issue: "",
  });

  async function submitRequest() {
    if (!form.name || !form.phone || !form.issue) {
      alert("Please fill name, phone, and issue.");
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
        address: "",
        service: "Handyman Services",
        issue: "",
      });
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h2 style={styles.brand}>The ForFix</h2>
          <p style={styles.subBrand}>Property Solutions LLC</p>
        </div>

        <div style={styles.headerButtons}>
          <button onClick={() => { setMode("book"); setOpen(true); }} style={styles.smallOrange}>
            Book Now
          </button>
          <button onClick={() => { setMode("estimate"); setOpen(true); }} style={styles.smallOutline}>
            Get Free Estimate
          </button>
        </div>
      </header>

      <section style={styles.hero}>
        <p style={styles.badge}>Weekend Support Only</p>

        <h1 style={styles.title}>
          Fast & Reliable Home Repair Services in Austin, TX
        </h1>

        <p style={styles.subtitle}>
          Professional handyman, plumbing, electrical, painting, drywall, trash bin cleaning,
          and property maintenance services.
        </p>

        <div style={styles.trustRow}>
          <span>✓ Austin</span>
          <span>✓ Buda</span>
          <span>✓ Kyle</span>
          <span>✓ San Marcos</span>
        </div>

        <div style={styles.heroButtons}>
          <button onClick={() => { setMode("book"); setOpen(true); }} style={styles.bigOrange}>
            Book Now
          </button>
          <button onClick={() => { setMode("estimate"); setOpen(true); }} style={styles.bigOutline}>
            Get Free Estimate
          </button>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <p style={styles.sectionText}>
          Simple, professional, and organized property services for homeowners, landlords,
          and property managers.
        </p>

        <div style={styles.grid}>
          {[
            "Handyman Services",
            "Plumbing Repairs",
            "Electrical Repairs",
            "Painting & Drywall",
            "Property Maintenance",
            "Trash Bin Cleaning",
          ].map((service) => (
            <div key={service} style={styles.card}>
              <h3>{service}</h3>
              <p style={styles.cardText}>
                Fast response, clean work, and reliable service.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.graySection}>
        <h2 style={styles.sectionTitle}>Why Choose ForFix?</h2>

        <div style={styles.grid3}>
          <div style={styles.card}>
            <h3>Easy Booking</h3>
            <p style={styles.cardText}>Customers can request service online in seconds.</p>
          </div>
          <div style={styles.card}>
            <h3>Organized System</h3>
            <p style={styles.cardText}>Every request is saved and tracked in the admin dashboard.</p>
          </div>
          <div style={styles.card}>
            <h3>Local Service</h3>
            <p style={styles.cardText}>Serving Austin, Buda, Kyle, and San Marcos.</p>
          </div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>Customer Reviews</h2>

        <div style={styles.grid3}>
          <div style={styles.review}>★★★★★<br />“Fast and professional service.”</div>
          <div style={styles.review}>★★★★★<br />“Easy booking and reliable work.”</div>
          <div style={styles.review}>★★★★★<br />“Highly recommended.”</div>
        </div>
      </section>

      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Need a repair or estimate?</h2>
        <p style={styles.ctaText}>Send your request now and ForFix will follow up quickly.</p>

        <button onClick={() => { setMode("book"); setOpen(true); }} style={styles.bigOrange}>
          Start Request
        </button>
      </section>

      <footer style={styles.footer}>
        <b>The ForFix Property Solutions LLC</b>
        <p>Austin • Buda • Kyle • San Marcos</p>
        <p>theforfix.com</p>
      </footer>

      {open && (
        <div style={styles.modalBg}>
          <div style={styles.modalBox}>
            <h2>{mode === "book" ? "Book Service" : "Get Free Estimate"}</h2>

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
              placeholder="Address"
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
              <option>Painting & Drywall</option>
              <option>Property Maintenance</option>
              <option>Trash Bin Cleaning</option>
              <option>Other</option>
            </select>

            <textarea
              style={styles.textarea}
              placeholder="Describe the issue"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
            />

            <button onClick={submitRequest} disabled={loading} style={styles.fullButton}>
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

const styles: any = {
  page: {
    fontFamily: "Arial, sans-serif",
    background: "#ffffff",
    color: "#111827",
  },
  header: {
    padding: "22px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #e5e7eb",
    background: "#ffffff",
    position: "sticky",
    top: 0,
    zIndex: 20,
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
  },
  headerButtons: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
  },
  smallOrange: {
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 800,
    cursor: "pointer",
  },
  smallOutline: {
    background: "white",
    color: "#ff6a00",
    border: "2px solid #ff6a00",
    padding: "10px 20px",
    borderRadius: 10,
    fontWeight: 800,
    cursor: "pointer",
  },
  hero: {
    padding: "95px 20px",
    textAlign: "center",
    background: "linear-gradient(180deg, #ffffff 0%, #f3f4f6 100%)",
  },
  badge: {
    color: "#ff6a00",
    fontWeight: 900,
    letterSpacing: 1,
  },
  title: {
    fontSize: 46,
    lineHeight: 1.1,
    maxWidth: 950,
    margin: "16px auto",
    fontWeight: 900,
  },
  subtitle: {
    fontSize: 20,
    color: "#4b5563",
    maxWidth: 780,
    margin: "0 auto",
    lineHeight: 1.6,
  },
  trustRow: {
    marginTop: 26,
    display: "flex",
    justifyContent: "center",
    gap: 18,
    flexWrap: "wrap",
    color: "#374151",
    fontWeight: 700,
  },
  heroButtons: {
    marginTop: 34,
    display: "flex",
    justifyContent: "center",
    gap: 16,
    flexWrap: "wrap",
  },
  bigOrange: {
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: "16px 30px",
    borderRadius: 14,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  bigOutline: {
    background: "white",
    color: "#ff6a00",
    border: "2px solid #ff6a00",
    padding: "14px 30px",
    borderRadius: 14,
    fontWeight: 900,
    fontSize: 16,
    cursor: "pointer",
  },
  section: {
    padding: "70px 22px",
    maxWidth: 1150,
    margin: "0 auto",
    textAlign: "center",
  },
  graySection: {
    padding: "70px 22px",
    background: "#f3f4f6",
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 36,
    margin: "0 0 14px",
  },
  sectionText: {
    color: "#6b7280",
    maxWidth: 760,
    margin: "0 auto 36px",
    fontSize: 18,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
    marginTop: 35,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
    maxWidth: 1050,
    margin: "35px auto 0",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 26,
    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
  },
  cardText: {
    color: "#6b7280",
    lineHeight: 1.6,
  },
  review: {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 18,
    padding: 28,
    boxShadow: "0 10px 30px rgba(0,0,0,.06)",
    color: "#374151",
    fontWeight: 700,
    lineHeight: 1.8,
  },
  cta: {
    background: "#ff6a00",
    color: "white",
    textAlign: "center",
    padding: "70px 20px",
  },
  ctaTitle: {
    fontSize: 36,
    margin: 0,
  },
  ctaText: {
    fontSize: 18,
    marginBottom: 28,
  },
  footer: {
    background: "#111827",
    color: "white",
    textAlign: "center",
    padding: 34,
  },
  modalBg: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 99,
    padding: 20,
  },
  modalBox: {
    background: "white",
    padding: 28,
    borderRadius: 20,
    width: "100%",
    maxWidth: 480,
    boxShadow: "0 20px 60px rgba(0,0,0,.25)",
  },
  input: {
    width: "100%",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    border: "1px solid #d1d5db",
    fontSize: 15,
    boxSizing: "border-box",
  },
  fullButton: {
    width: "100%",
    background: "#ff6a00",
    color: "white",
    border: "none",
    padding: 15,
    borderRadius: 12,
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