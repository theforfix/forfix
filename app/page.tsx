export default function Home() {
  return (
    <main style={styles.page}>

      {/* HERO */}
      <section style={styles.hero}>
        <h1>The ForFix Property Solutions LLC</h1>
        <p>Fast, Reliable Home Repair Services You Can Trust</p>

        <div style={styles.heroButtons}>
          <a href="#book" style={styles.primaryBtn}>Book Now</a>
          <a href="#estimate" style={styles.secondaryBtn}>Get Free Estimate</a>
        </div>
      </section>

      {/* ABOUT */}
      <section style={styles.section}>
        <h2>About Us</h2>
        <p>
          The ForFix Property Solutions LLC is a trusted home repair company providing
          plumbing, electrical, handyman, painting, and HVAC services. We focus on
          quality work, fast response, and customer satisfaction. Support available
          on weekends only.
        </p>
      </section>

      {/* SERVICES */}
      <section style={styles.section}>
        <h2>Our Services</h2>

        <div style={styles.grid}>
          <div style={styles.card}>Plumbing</div>
          <div style={styles.card}>Electrical</div>
          <div style={styles.card}>Handyman</div>
          <div style={styles.card}>Painting</div>
          <div style={styles.card}>HVAC</div>
          <div style={styles.card}>General Repair</div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section style={styles.section}>
        <h2>Before & After Work</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>Bathroom Repair</h3>
            <div style={styles.imgRow}>
              <img src="/before1.jpg" style={styles.img} />
              <img src="/after1.jpg" style={styles.img} />
            </div>
          </div>

          <div style={styles.card}>
            <h3>Kitchen Plumbing</h3>
            <div style={styles.imgRow}>
              <img src="/before2.jpg" style={styles.img} />
              <img src="/after2.jpg" style={styles.img} />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section style={styles.section}>
        <h2>Customer Reviews</h2>

        <div style={styles.grid}>
          <div style={styles.card}>
            ⭐⭐⭐⭐⭐
            <p>"Fast and professional service."</p>
            <b>John M.</b>
          </div>

          <div style={styles.card}>
            ⭐⭐⭐⭐⭐
            <p>"Very reliable and affordable."</p>
            <b>Sarah K.</b>
          </div>

          <div style={styles.card}>
            ⭐⭐⭐⭐⭐
            <p>"Great quality work!"</p>
            <b>Michael R.</b>
          </div>
        </div>
      </section>

      {/* BOOK NOW */}
      <section id="book" style={styles.section}>
        <h2>Book a Service</h2>

        <form style={styles.form}>
          <input placeholder="Full Name" style={styles.input} />
          <input placeholder="Phone Number" style={styles.input} />

          <select style={styles.input}>
            <option>Select Service</option>
            <option>Plumbing</option>
            <option>Electrical</option>
            <option>Handyman</option>
            <option>Painting</option>
          </select>

          <textarea placeholder="Describe your issue" style={styles.textarea}></textarea>

          <button style={styles.primaryBtn}>Submit Request</button>
        </form>
      </section>

      {/* ESTIMATE */}
      <section id="estimate" style={styles.section}>
        <h2>Get Free Estimate</h2>

        <form style={styles.form}>
          <input placeholder="Full Name" style={styles.input} />
          <input placeholder="Phone Number" style={styles.input} />
          <input placeholder="Address" style={styles.input} />

          <textarea placeholder="Project details" style={styles.textarea}></textarea>

          <button style={styles.secondaryBtn}>Request Estimate</button>
        </form>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>© {new Date().getFullYear()} The ForFix Property Solutions LLC</p>
        <p>Weekend Support Only</p>
      </footer>

    </main>
  );
}

const styles: any = {
  page: {
    fontFamily: "Arial",
    background: "#f6f6f6",
  },

  hero: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "90px 20px",
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  section: {
    padding: "60px 20px",
    textAlign: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },

  imgRow: {
    display: "flex",
    gap: "10px",
  },

  img: {
    width: "100%",
    borderRadius: "8px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "0 auto",
  },

  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  textarea: {
    padding: "10px",
    height: "100px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  primaryBtn: {
    background: "#ff6600",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },

  secondaryBtn: {
    background: "white",
    color: "#111",
    padding: "12px",
    borderRadius: "8px",
    border: "2px solid #ff6600",
    cursor: "pointer",
    textDecoration: "none",
  },

  footer: {
    background: "#111",
    color: "white",
    textAlign: "center",
    padding: "30px",
  },
};