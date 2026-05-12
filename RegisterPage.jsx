import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword || !name) {
      setError("Lahat ng fields ay required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Ang passwords ay hindi magkatugma");
      return;
    }

    if (password.length < 6) {
      setError("Ang password ay dapat ng minimum 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(email, password, name);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.formSection}>
          <h1 style={styles.title}>Mag-Register</h1>
          <p style={styles.subtitle}>Lumikha ng account para magsimula ng pamimili</p>

          {error && <div style={styles.errorMessage}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ang iyong pangalan"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Walang bababa sa 6 characters"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="I-confirm ang password"
                style={styles.input}
              />
            </div>

            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? "Nag-register..." : "Mag-Register"}
            </button>
          </form>

          <p style={styles.linkText}>
            Mayroon na kang account? <Link to="/login" style={styles.link}>Mag-Log In</Link>
          </p>
        </div>

        <div style={styles.imageSection}>
          <div style={styles.imagePlaceholder}>
            <div style={styles.brandText}>BiliKo</div>
            <p style={styles.tagline}>Bumili ng Mags, Mufflers, at Accessories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "26px",
    padding: "40px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
    maxWidth: "500px",
    width: "100%",
  },
  formSection: {
    background: "transparent",
    borderRadius: "0",
    padding: "0",
    boxShadow: "none",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "32px",
    color: "#fff",
    fontWeight: "800",
  },
  subtitle: {
    margin: "0 0 24px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "16px",
  },
  errorMessage: {
    background: "rgba(239, 68, 68, 0.2)",
    color: "#ff6b6b",
    padding: "12px 16px",
    borderRadius: "12px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid rgba(239, 68, 68, 0.3)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.14)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
  },
  submitButton: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#ffd700",
    color: "#000",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
  },
  linkText: {
    marginTop: "20px",
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
  },
  link: {
    color: "#ffd700",
    textDecoration: "none",
    fontWeight: "700",
  },
  imageSection: {
    display: "none",
  },
  imagePlaceholder: {
    background: "#fff",
    borderRadius: "28px",
    padding: "60px 40px",
    textAlign: "center",
    boxShadow: "0 18px 40px rgba(15, 23, 42, 0.08)",
  },
  brandText: {
    fontSize: "48px",
    fontWeight: "800",
    color: "#c2410c",
    margin: "0 0 16px",
  },
  tagline: {
    margin: 0,
    color: "#475569",
    fontSize: "16px",
    lineHeight: "1.6",
  },
};

export default RegisterPage;
