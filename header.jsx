import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import './header.css';
import logo from './assets/images/MonRangsit_logo.png';
import {
  FaHome,
  FaInfoCircle,
  FaPhoneAlt,
  FaSignInAlt,
  FaUserPlus,
  FaTachometerAlt,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Header() {
  const { isLoggedIn, user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <div className="brand">
        <img className="brandLogo" src={logo} alt="MonRangsit_Logo" />
        <div className="brandText">
          <h1 className="brandTitle">Mon Rangsit</h1>
          <p className="brandTagline">Where ride meet style</p>
        </div>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <Link className="navLink" to="/">
          <FaHome /> <span>HOME</span>
        </Link>
        <Link className="navLink" to="/contact">
          <FaPhoneAlt /> <span>CONTACT</span>
        </Link>
        <Link className="navLink" to="/about">
          <FaInfoCircle /> <span>ABOUT&nbsp;US</span>
        </Link>

        <span className="navDivider" aria-hidden="true" />

        {isLoggedIn ? (
          <>
            <Link className="navLink" to="/dashboard">
              <FaTachometerAlt /> <span>DASHBOARD</span>
            </Link>
            <Link className="navLink" to="/cart">
              <FaShoppingCart /> <span>CART</span>
            </Link>
            <Link className="navLink navProfile" to="/profile">
              <FaUserCircle /> <span>{user?.name || "PROFILE"}</span>
            </Link>
            <button className="navButton" type="button" onClick={handleLogout}>
              <FaSignOutAlt /> <span>LOGOUT</span>
            </button>
          </>
        ) : (
          <>
            <Link className="navLink-login" to="/login">
              <FaSignInAlt /> <span>LOG IN</span>
            </Link>
          
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
