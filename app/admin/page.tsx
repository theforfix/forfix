"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

type RequestItem = {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  service?: string;
  issue?: string;
  type?: string;
  status?: string;
  source?: string;
};

export default function AdminPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      })) as RequestItem[];

      setRequests(data);
    });

    return () => unsub();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "requests", id), { status });
  };

  const removeRequest = async (id: string) => {
    const ok = confirm("Delete this request?");
    if (!ok) return;
    await deleteDoc(doc(db, "requests", id));
  };

  const getRequestTypeLabel = (type?: string) => {
    if (type === "book") return "Booking Request";
    if (type === "estimate") return "Free Estimate";
    return "Old Request";
  };

  const getRequestTypeBadge = (type?: string): React.CSSProperties => {
    if (type === "book") {
      return {
        ...styles.typeBadge,
        background: "#ffedd5",
        color: "#c2410c",
      };
    }

    if (type === "estimate") {
      return {
        ...styles.typeBadge,
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    return {
      ...styles.typeBadge,
      background: "#f3f4f6",
      color: "#374151",
    };
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r) => (r.status || "new") === filter);

  const total = requests.length;
  const newCount = requests.filter((r) => (r.status || "new") === "new").length;
  const progressCount = requests.filter((r) => r.status === "in-progress").length;
  const completedCount = requests.filter((r) => r.status === "completed").length;

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>ForFix Admin Dashboard</h1>
          <p style={styles.subtitle}>
            Manage website service requests in real time.
          </p>
        </div>

        <a href="/" style={styles.homeBtn}>
          View Website
        </a>
      </header>

      <section style={styles.statsGrid}>
        <div style={styles.statCard}>
          <p style={styles.statLabel}>Total Requests</p>
          <h2 style={styles.statNumber}>{total}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>New</p>
          <h2 style={styles.statNumber}>{newCount}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>In Progress</p>
          <h2 style={styles.statNumber}>{progressCount}</h2>
        </div>

        <div style={styles.statCard}>
          <p style={styles.statLabel}>Completed</p>
          <h2 style={styles.statNumber}>{completedCount}</h2>
        </div>
      </section>

      <section style={styles.toolbar}>
        <button
          onClick={() => setFilter("all")}
          style={filter === "all" ? styles.activeFilter : styles.filterBtn}
        >
          All
        </button>

        <button
          onClick={() => setFilter("new")}
          style={filter === "new" ? styles.activeFilter : styles.filterBtn}
        >
          New
        </button>

        <button
          onClick={() => setFilter("in-progress")}
          style={filter === "in-progress" ? styles.activeFilter : styles.filterBtn}
        >
          In Progress
        </button>

        <button
          onClick={() => setFilter("completed")}
          style={filter === "completed" ? styles.activeFilter : styles.filterBtn}
        >
          Completed
        </button>
      </section>

      <section style={styles.requests}>
        {filteredRequests.length === 0 ? (
          <div style={styles.emptyBox}>No requests found.</div>
        ) : (
          filteredRequests.map((r) => (
            <div key={r.id} style={styles.requestCard}>
              <div style={styles.requestTop}>
                <div>
                  <h3 style={styles.serviceTitle}>
                    {r.service || "Service Request"}
                  </h3>

                  <div style={styles.badgeRow}>
                    <span style={getRequestTypeBadge(r.type)}>
                      {getRequestTypeLabel(r.type)}
                    </span>

                    <span style={styles.sourceBadge}>
                      {r.source || "website"}
                    </span>
                  </div>
                </div>

                <span style={getStatusStyle(r.status || "new")}>
                  {r.status || "new"}
                </span>
              </div>

              <div style={styles.infoGrid}>
                <p>
                  <b>Name:</b> {r.name || "-"}
                </p>
                <p>
                  <b>Phone:</b> {r.phone || "-"}
                </p>
                <p>
                  <b>Email:</b> {r.email || "-"}
                </p>
                <p>
                  <b>Address:</b> {r.address || "-"}
                </p>
              </div>

              <div style={styles.issueBox}>
                <b>Issue:</b>
                <p>{r.issue || "-"}</p>
              </div>

              <div style={styles.actions}>
                {r.phone && (
                  <a href={`tel:${r.phone}`} style={styles.callBtn}>
                    Call
                  </a>
                )}

                <button
                  onClick={() => updateStatus(r.id, "in-progress")}
                  style={styles.progressBtn}
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateStatus(r.id, "completed")}
                  style={styles.completeBtn}
                >
                  Complete
                </button>

                <button
                  onClick={() => removeRequest(r.id)}
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}

function getStatusStyle(status: string): React.CSSProperties {
  if (status === "completed") {
    return {
      ...styles.status,
      background: "#dcfce7",
      color: "#166534",
    };
  }

  if (status === "in-progress") {
    return {
      ...styles.status,
      background: "#fef3c7",
      color: "#92400e",
    };
  }

  return {
    ...styles.status,
    background: "#ffedd5",
    color: "#c2410c",
  };
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    color: "#111827",
    padding: 28,
  },
  header: {
    background: "#ffffff",
    padding: 28,
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: 38,
    fontWeight: 900,
    color: "#ff6a00",
  },
  subtitle: {
    margin: "8px 0 0",
    color: "#6b7280",
    fontSize: 16,
  },
  homeBtn: {
    background: "#ff6a00",
    color: "#ffffff",
    textDecoration: "none",
    padding: "12px 20px",
    borderRadius: 10,
    fontWeight: 800,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginTop: 22,
  },
  statCard: {
    background: "#ffffff",
    padding: 22,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  statLabel: {
    margin: 0,
    color: "#6b7280",
    fontWeight: 700,
  },
  statNumber: {
    margin: "10px 0 0",
    fontSize: 34,
    color: "#111827",
  },
  toolbar: {
    background: "#ffffff",
    padding: 16,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    marginTop: 22,
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
  },
  filterBtn: {
    background: "#ffffff",
    border: "1px solid #d1d5db",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
    color: "#374151",
  },
  activeFilter: {
    background: "#ff6a00",
    border: "1px solid #ff6a00",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
    color: "#ffffff",
  },
  requests: {
    marginTop: 22,
    display: "grid",
    gap: 16,
  },
  emptyBox: {
    background: "#ffffff",
    padding: 30,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    color: "#6b7280",
    textAlign: "center",
  },
  requestCard: {
    background: "#ffffff",
    padding: 22,
    borderRadius: 18,
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 24px rgba(0,0,0,0.04)",
  },
  requestTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  serviceTitle: {
    margin: 0,
    fontSize: 22,
    fontWeight: 900,
  },
  badgeRow: {
    display: "flex",
    gap: 8,
    marginTop: 8,
    flexWrap: "wrap",
  },
  typeBadge: {
    padding: "5px 11px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 900,
  },
  sourceBadge: {
    background: "#f3f4f6",
    color: "#374151",
    padding: "5px 11px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
  },
  status: {
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 900,
    textTransform: "capitalize",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 8,
    marginTop: 18,
    color: "#374151",
  },
  issueBox: {
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 14,
    marginTop: 14,
    color: "#374151",
  },
  actions: {
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    marginTop: 16,
  },
  callBtn: {
    background: "#111827",
    color: "#ffffff",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 800,
  },
  progressBtn: {
    background: "#f59e0b",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },
  completeBtn: {
    background: "#16a34a",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },
  deleteBtn: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 800,
  },
};