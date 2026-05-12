import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

function ProfilePage() {
  const { user, updateProfile, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [contact, setContact] = useState(user?.contact || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("Image too large. Please use a file under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name) {
      setError("Name is required");
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword && !currentPassword) {
      setError("Current password is required to change password");
      return;
    }

    setLoading(true);
    try {
      await updateProfile(
        name,
        contact,
        profilePicture,
        currentPassword || undefined,
        newPassword || undefined
      );
      setSuccess("Profile updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <div style={styles.badge}>PROFILE</div>
            <h1 style={styles.title}>Edit Profile</h1>
            <p style={styles.subtitle}>
              Update your details and profile picture. Changes apply to your account immediately.
            </p>
          </div>
          <button style={styles.logoutButton} onClick={handleLogout}>
            Mag-Logout
          </button>
        </header>

        <div style={styles.contentGrid}>
          <div style={styles.profileSection}>
            <div style={styles.profileCard}>
              <h2 style={styles.sectionTitle}>Profile Picture</h2>
              
              <div style={styles.profilePictureContainer}>
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" style={styles.profileImage} />
                ) : (
                  <div style={styles.profileImagePlaceholder}>
                    <div style={styles.placeholderText}>Walang picture</div>
                  </div>
                )}
              </div>

              <label style={styles.fileInputLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={styles.fileInput}
                />
                <span style={styles.fileInputSpan}>Upload Picture</span>
              </label>

              <button
                type="button"
                style={styles.secondaryButton}
                onClick={() => setProfilePicture("")}
                disabled={!profilePicture}
              >
                Remove Picture
              </button>
            </div>
          </div>

          <div style={styles.formSection}>
            <form onSubmit={handleSubmit} style={styles.form}>
              {error && <div style={styles.errorMessage}>{error}</div>}
              {success && <div style={styles.successMessage}>{success}</div>}

              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Contact Details</label>
                <input
                  type="tel"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="09XX-XXX-XXXX or email"
                  style={styles.input}
                />
              </div>

              <div style={styles.divider} />

              <h3 style={styles.subTitle}>Change Password (Optional)</h3>

              <div style={styles.formGroup}>
                <label style={styles.label}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Your current password"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Your new password"
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  style={styles.input}
                />
              </div>

              <button type="submit" disabled={loading} style={styles.submitButton}>
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "#1a1a1a",
    fontFamily: "Arial, sans-serif",
    padding: "28px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "28px",
    gap: 18,
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: 999,
    background: "#ffd700",
    color: "#000",
    fontWeight: 900,
    fontSize: 12,
    letterSpacing: 0.6,
    marginBottom: 14,
    textTransform: "uppercase",
  },
  title: {
    margin: 0,
    fontSize: 44,
    lineHeight: 1.05,
    color: "#ffffff",
    fontWeight: 900,
  },
  subtitle: {
    margin: "10px 0 0",
    color: "rgba(255,255,255,0.7)",
    maxWidth: 720,
    lineHeight: 1.55,
  },
  logoutButton: {
    padding: "10px 18px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffd700",
    cursor: "pointer",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    whiteSpace: "nowrap",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "28px",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  profileCard: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    borderRadius: 26,
    padding: "28px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  sectionTitle: {
    margin: "0 0 20px",
    fontSize: "20px",
    color: "#ffffff",
    fontWeight: 900,
  },
  profilePictureContainer: {
    marginBottom: "20px",
  },
  profileImage: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    borderRadius: "16px",
  },
  profileImagePlaceholder: {
    width: "100%",
    height: "280px",
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "rgba(255,255,255,0.7)",
  },
  placeholderText: {
    fontSize: "16px",
    fontWeight: "600",
  },
  fileInputLabel: {
    display: "block",
    cursor: "pointer",
  },
  fileInput: {
    display: "none",
  },
  fileInputSpan: {
    display: "block",
    padding: "12px 16px",
    borderRadius: 999,
    background: "#ffd700",
    color: "#000",
    fontWeight: 900,
    textAlign: "center",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  secondaryButton: {
    width: "100%",
    marginTop: 12,
    padding: "12px 16px",
    borderRadius: 999,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(255,255,255,0.06)",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: 900,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    opacity: 1,
  },
  formSection: {
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
    borderRadius: 26,
    padding: "28px",
    boxShadow: "0 18px 60px rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  errorMessage: {
    background: "rgba(255, 68, 68, 0.18)",
    color: "#ffd1d1",
    padding: "12px 16px",
    borderRadius: 14,
    fontSize: 13,
    fontWeight: 700,
    border: "1px solid rgba(255, 68, 68, 0.35)",
  },
  successMessage: {
    background: "rgba(34, 197, 94, 0.18)",
    color: "#bbf7d0",
    padding: "12px 16px",
    borderRadius: 14,
    fontSize: 13,
    fontWeight: 700,
    border: "1px solid rgba(34, 197, 94, 0.35)",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: 12,
    fontWeight: 800,
    color: "#ffd700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  input: {
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.45)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    transition: "border-color 0.2s",
  },
  subTitle: {
    margin: "12px 0 0",
    fontSize: "16px",
    color: "#ffffff",
    fontWeight: 900,
  },
  divider: {
    height: "1px",
    background: "rgba(255,255,255,0.12)",
    margin: "16px 0",
  },
  submitButton: {
    padding: "12px 20px",
    borderRadius: 999,
    border: "none",
    background: "#ffd700",
    color: "#000",
    fontSize: 14,
    fontWeight: 900,
    cursor: "pointer",
    marginTop: "8px",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
};

export default ProfilePage;
