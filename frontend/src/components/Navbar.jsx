import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "15px", background: "#222", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
      <Link to="/jobs" style={{ marginRight: "15px" }}>Jobs</Link>

      {!user && (
        <>
          <Link to="/login" style={{ marginRight: "15px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && (
        <>
          <span style={{ marginRight: "15px" }}>Hi, {user.fullname}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </nav>
  );
}
