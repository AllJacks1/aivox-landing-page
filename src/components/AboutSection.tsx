import React from "react";
import { Target, Eye, Users, GraduationCap } from "lucide-react";
import "../styles/AboutSection.css";

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="about-header">
          <span className="section-label">About Us</span>
          <h2 className="section-title">
            Built for Small Businesses, Powered by Fresh Talent
          </h2>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Mission */}
          <div className="about-card">
            <div className="about-icon-wrapper">
              <Target className="about-icon" strokeWidth={1.5} />
            </div>
            <div className="about-content">
              <h3 className="about-card-title">Our Mission</h3>
              <p className="about-card-text">
                To empower small businesses and startups in the Philippines with
                affordable, high-quality IT solutions that improve efficiency,
                foster innovation, and drive growth.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="about-card">
            <div className="about-icon-wrapper">
              <Eye className="about-icon" strokeWidth={1.5} />
            </div>
            <div className="about-content">
              <h3 className="about-card-title">Our Vision</h3>
              <p className="about-card-text">
                To become the leading technology partner for small and growing
                businesses in the Philippines — giving them access to the same
                powerful tools used by larger enterprises.
              </p>
            </div>
          </div>

          {/* Small Business Focus */}
          <div className="about-card">
            <div className="about-icon-wrapper">
              <Users className="about-icon" strokeWidth={1.5} />
            </div>
            <div className="about-content">
              <h3 className="about-card-title">Why Small Businesses?</h3>
              <p className="about-card-text">
                We bridge the gap between expensive enterprise IT and limited
                startup budgets. Every solution is tailored, scalable, and
                designed to help you compete in the digital economy.
              </p>
            </div>
          </div>

          {/* Fresh Talent */}
          <div className="about-card">
            <div className="about-icon-wrapper">
              <GraduationCap className="about-icon" strokeWidth={1.5} />
            </div>
            <div className="about-content">
              <h3 className="about-card-title">Fresh Talent Advantage</h3>
              <p className="about-card-text">
                Our team of recent graduates brings cutting-edge skills, modern
                frameworks, and innovative thinking — all while receiving
                mentorship to deliver professional-grade results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
