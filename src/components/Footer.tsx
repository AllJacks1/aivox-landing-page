import React from "react";
import { MapPin, Mail, Phone, Shield, Cloud, Zap } from "lucide-react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  const solutions = [
    "Website Development",
    "POS Systems",
    "Custom Software",
    "Android Apps",
    "Network & Security",
  ];

  const company = [
    { label: "About Us", href: "#about" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        {/* Main Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div className="footer-brand">
              Aivox<span>Tech</span>
            </div>
            <p className="footer-description">
              Affordable IT & SaaS solutions for startups and SMEs in the
              Philippines.
            </p>
          </div>

          {/* Solutions */}
          <div className="footer-links-col">
            <h4 className="footer-links-title">Solutions</h4>
            <ul className="footer-links-list">
              {solutions.map((item) => (
                <li key={item}>
                  <span className="footer-link-static">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="footer-links-col">
            <h4 className="footer-links-title">Company</h4>
            <ul className="footer-links-list">
              {company.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="footer-link">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-contact-col">
            <h4 className="footer-links-title">Contact</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin className="footer-contact-icon" strokeWidth={2} />
                <span>Davao City, Philippines</span>
              </li>
              <li className="footer-contact-item">
                <Mail className="footer-contact-icon" strokeWidth={2} />
                <a
                  href="mailto:aivoxtech@astragroupph.com"
                  className="footer-link"
                >
                  aivoxtech@astragroupph.com
                </a>
              </li>
              <li className="footer-contact-item">
                <Phone className="footer-contact-icon" strokeWidth={2} />
                <a href="tel:+639608308762X" className="footer-link">
                  +63 960 830 8762
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          {/* Trust Badges */}
          <div className="footer-trust">
            <div className="footer-trust-item">
              <Shield className="footer-trust-icon" strokeWidth={2} />
              <span>SSL Secured</span>
            </div>
            <div className="footer-trust-divider" />
            <div className="footer-trust-item">
              <Zap className="footer-trust-icon" strokeWidth={2} />
              <span>99.9% Uptime</span>
            </div>
            <div className="footer-trust-divider" />
            <div className="footer-trust-item">
              <Cloud className="footer-trust-icon" strokeWidth={2} />
              <span>Cloud Hosted</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="footer-copyright">
            © 2026 AivoxTech Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
