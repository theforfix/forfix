export default function HomePage() {
  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO */}
      <section style={styles.hero}>
        <h1>The ForFix Property Solutions LLC</h1>
        <p>Fast, Reliable Home Repair Services You Can Trust</p>

        <a href="#services" style={styles.button}>
          Request a Service
        </a>
      </section>

      {/* ABOUT */}
      <section style={styles.section}>
        <h2>Why Choose Us?</h2>
        <p>
          We provide professional home repair and handyman services with a focus on quality, speed, and customer satisfaction.
          Our support is available on weekends only to ensure faster response times and dedicated service.
        </p>
      </section>

      {/* SERVICES */}
      <section id="services" style={styles.section}>
        <h2>Our Services</h2>

        <div style={styles.grid}>
          <div style={styles.card}>Plumbing</div>
          <div style={styles.card}>Electrical</div>
          <div style={styles.card}>Handyman Work</div>
          <div style={styles.card}>Painting</div>
          <div style={styles.card}>HVAC Repair</div>
          <div style={styles.card}>General Maintenance</div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={styles.section}>
        <h2>How It Works</h2>
        <ol>
          <li>Submit a request</li>
          <li>We contact you</li>
          <li>We fix the issue fast</li>
        </ol>
      </section>

      {/* CTA */}
      <section style={styles.cta}>
        <h2>Need Help Now?</h2>
        <p>Request a service and get fast support on weekends.</p>

        <a href="#contact" style={styles.button}>
          Contact Us
        </a>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer} id="contact">
        <p>© {new Date().getFullYear()} The ForFix Property Solutions LLC</p>
        <p>Email: support@theforfix.com</p>
        <p>Weekend Support Only</p>
      </footer>

    </main>
  );
}

const styles: any = {
  hero: {
    background: "#111",
    color: "white",
    padding: "100px 20px",
    textAlign: "center",
  },

  section: {
    padding: "60px 20px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 20px",
    background: "#ff6600",
    color: "white",
  export default function Home() {
  return (
    <div style={{ padding: "50px", fontSize: "30px", color: "red" }}>
      🚀 FORFIX UPDATED SUCCESSFULLY
    </div>
  );
}
  textDecoration: "none",
    borderRadius: "6px",
  },

  cta: {
    background: "#f5f5f5",
    padding: "60px 20px",
    textAlign: "center",
  },

  footer: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "30px 20px",
  },
};export default function Home() {
  return <h1 style={{ color: "red" }}>SITE UPDATED SUCCESS</h1>;
}export default function Home() {
  return <h1>HELLO FORFIX TEST</h1>;
}