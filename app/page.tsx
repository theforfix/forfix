export default function Home() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>
      {/* HEADER */}
      <header
        style={{
          width: "100%",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0b0b0b",
          color: "white",
          borderBottom: "1px solid #222",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/logo.png"
            alt="ForFix Logo"
            style={{ width: "52px", height: "52px", objectFit: "contain" }}
          />
          <div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: 800 }}>
              The ForFix
            </h2>
            <p style={{ margin: 0, color: "#ff6a00", fontSize: "12px" }}>
              Property Solutions LLC
            </p>
          </div>
        </div>

        <nav style={{ display: "flex", gap: "24px", fontSize: "14px" }}>
          <a href="#services" style={{ color: "white", textDecoration: "none" }}>
            Services
          </a>
          <a href="#booking" style={{ color: "white", textDecoration: "none" }}>
            Booking
          </a>
          <a href="tel:5126090528" style={{ color: "white", textDecoration: "none" }}>
            Call
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section
        style={{
          minHeight: "82vh",
          background:
            "linear-gradient(135deg, #050505 0%, #111111 55%, #1f1f1f 100%)",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 20px",
        }}
      >
        <div style={{ maxWidth: "900px" }}>
          <img
            src="/logo.png"
            alt="ForFix Logo"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "contain",
              marginBottom: "24px",
            }}
          />

          <h1
            style={{
              fontSize: "56px",
              lineHeight: "1.05",
              margin: "0 0 20px",
              fontWeight: 900,
            }}
          >
            Fast & Reliable Home Repair Services in Austin, TX
          </h1>

          <p
            style={{
              fontSize: "20px",
              color: "#d1d5db",
              maxWidth: "700px",
              margin: "0 auto 12px",
            }}
          >
            Professional handyman, plumbing, electrical, painting, and property
            maintenance services.
          </p>

          <p
            style={{
              color: "#ff6a00",
              fontWeight: 700,
              marginBottom: "34px",
            }}
          >
            Weekend Support Only
          </p>

          <div
            id="booking"
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="tel:5126090528"
              style={{
                background: "#ff6a00",
                color: "white",
                padding: "16px 30px",
                borderRadius: "12px",
                fontWeight: 800,
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(255,106,0,.35)",
              }}
            >
              Book Now
            </a>

            <a
              href="mailto:support@theforfix.com?subject=Free Estimate Request"
              style={{
                background: "transparent",
                color: "white",
                padding: "16px 30px",
                borderRadius: "12px",
                fontWeight: 800,
                textDecoration: "none",
                border: "2px solid #ff6a00",
              }}
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}