import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function LoginPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirm, setRegisterConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, register } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginEmail || !loginPassword) {
      setError("Email at password ay required");
      return;
    }

    setLoading(true);
    try {
      await login(loginEmail, loginPassword);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!registerName || !registerEmail || !registerPassword || !registerConfirm) {
      setError("Lahat ng fields ay required");
      return;
    }

    if (registerPassword !== registerConfirm) {
      setError("Ang passwords ay hindi magkatugma");
      return;
    }

    if (registerPassword.length < 6) {
      setError("Ang password ay dapat ng minimum 6 characters");
      return;
    }

    setLoading(true);
    try {
      await register(registerEmail, registerPassword, registerName);
      setError("");
      alert("Registration successful! Please log in now.");
      setActiveTab("login");
      setLoginEmail(registerEmail);
      setRegisterName("");
      setRegisterEmail("");
      setRegisterPassword("");
      setRegisterConfirm("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.tabButtons}>
          <button
            style={activeTab === "login" ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
            onClick={() => setActiveTab("login")}
          >
            Mag-Log In
          </button>
          <button
            style={activeTab === "register" ? { ...styles.tabButton, ...styles.tabButtonActive } : styles.tabButton}
            onClick={() => setActiveTab("register")}
          >
            Mag-Register
          </button>
        </div>

        {error && <div style={styles.errorMessage}>{error}</div>}

        {activeTab === "login" && (
          <div style={styles.formSection}>
            <h1 style={styles.title}>Mag-Log In</h1>
            <p style={styles.subtitle}>Mag-log in sa iyong account para magsimulang mamili</p>

            <form onSubmit={handleLogin} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Ang iyong password"
                  style={styles.input}
                />
              </div>

              <button type="submit" disabled={loading} style={styles.submitButton}>
                {loading ? "Nag-log in..." : "Mag-Log In"}
              </button>
            </form>

            <p style={styles.linkText}>Walang account pa? Mag-register sa tab above</p>
          </div>
        )}

        {activeTab === "register" && (
          <div style={styles.formSection}>
            <h1 style={styles.title}>Mag-Register</h1>
            <p style={styles.subtitle}>Lumikha ng account para magsimula ng pamimili</p>

            <form onSubmit={handleRegister} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Ang iyong pangalan"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  type="email"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="email@example.com"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Walang bababa sa 6 characters"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type="password"
                  value={registerConfirm}
                  onChange={(e) => setRegisterConfirm(e.target.value)}
                  placeholder="I-confirm ang password"
                  style={styles.input}
                />
              </div>

              <button type="submit" disabled={loading} style={styles.submitButton}>
                {loading ? "Nag-register..." : "Mag-Register"}
              </button>
            </form>

            <p style={styles.linkText}>Mayroon na kang account? Mag-log in sa tab above</p>
          </div>
        )}
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
  tabButtons: {
    display: "flex",
    gap: "12px",
    marginBottom: "28px",
  },
  tabButton: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  tabButtonActive: {
    background: "#ffd700",
    color: "#000",
    border: "1px solid #ffd700",
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  title: {
    margin: "0 0 8px",
    fontSize: "28px",
    color: "#fff",
    fontWeight: "800",
  },
  subtitle: {
    margin: "0 0 20px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
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
    gap: "18px",
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
    textAlign: "center",
    color: "rgba(255,255,255,0.7)",
    fontSize: "14px",
    margin: 0,
  },
};

export default LoginPage;
