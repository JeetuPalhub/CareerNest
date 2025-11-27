import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Find Your <span className="highlight">Dream Job</span> Today
          </h1>
          <p className="subtitle">
            Explore thousands of jobs and kickstart your career with top companies.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
            <Link to="/register" className="btn-secondary">Get Started</Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/new-job-5527085-4608613.png"
            alt="Job Search"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Why Choose Our Platform?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/briefcase.png" alt="" />
            <h3>Verified Jobs</h3>
            <p>Every job is fully verified before publishing on our portal.</p>
          </div>

          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/career-ladder.png" alt="" />
            <h3>Career Growth</h3>
            <p>We help you get placed in the best companies in your field.</p>
          </div>

          <div className="feature-card">
            <img src="https://img.icons8.com/color/96/teamwork.png" alt="" />
            <h3>Top Recruiters</h3>
            <p>Thousands of recruiters are actively hiring right now.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} CareerNest — All rights reserved.</p>
      </footer>
    </div>
  );
}
