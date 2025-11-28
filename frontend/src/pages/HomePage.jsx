import React from "react";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Build Your Future Career With Confidence</h1>
          <p>
            Discover top hiring companies, apply for jobs, and grow your skills.
            Your dream job is waiting!
          </p>

          <a href="/jobs">Explore Jobs</a>
          <a href="/register">Join Now</a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
          alt="coding setup"
        />
      </section>

      <section className="companies">
        <h2>Trusted by Leading Companies</h2>
      </section>
    </>
  );
};

export default HomePage;
