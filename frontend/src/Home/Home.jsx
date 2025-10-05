// src/components/HomePage.jsx
import React from 'react';
import './HomePage.css';

const Home = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Find Your Dream Job at 
            <span className="brand"> CareerNest</span>
          </h1>
          <p className="hero-subtitle">
            Connect with top companies and discover opportunities that match your skills and aspirations. 
            Your next career move starts here.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Find Jobs</button>
            <button className="btn btn-secondary">Post a Job</button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <h3>10K+</h3>
              <p>Jobs Posted</p>
            </div>
            <div className="stat">
              <h3>5K+</h3>
              <p>Companies</p>
            </div>
            <div className="stat">
              <h3>50K+</h3>
              <p>Successful Hires</p>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="floating-card card-1">
            <div className="card-header">
              <div className="company-logo"></div>
              <div>
                <h4>Senior Developer</h4>
                <p>TechCorp • $120k • Remote</p>
              </div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-header">
              <div className="company-logo"></div>
              <div>
                <h4>Product Manager</h4>
                <p>StartUpXYZ • $95k • Hybrid</p>
              </div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-header">
              <div className="company-logo"></div>
              <div>
                <h4>UX Designer</h4>
                <p>DesignHub • $85k • On-site</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose CareerNest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Quick Hiring</h3>
              <p>Connect with employers directly and speed up your hiring process</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Smart Matching</h3>
              <p>AI-powered job matching based on your skills and preferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Top Companies</h3>
              <p>Access opportunities from startups to Fortune 500 companies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Verified Jobs</h3>
              <p>All job postings are verified to ensure authenticity and quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Profile</h3>
              <p>Sign up and build your professional profile</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Find Opportunities</h3>
              <p>Browse jobs or let employers find you</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Apply & Connect</h3>
              <p>Apply directly and connect with hiring managers</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Get Hired</h3>
              <p>Start your new career journey</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Transform Your Career?</h2>
          <p>Join thousands of professionals who found their dream jobs through CareerNest</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Join Now - It's Free</button>
            <button className="btn btn-outline">Learn More</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;