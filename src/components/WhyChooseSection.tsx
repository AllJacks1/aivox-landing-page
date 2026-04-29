import React from "react";
import { Wallet, Layers, Zap, Lightbulb, Headphones } from "lucide-react";
import "../styles/WhyChooseSection.css";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: Wallet,
    title: "Affordable Solutions for SMEs",
    description:
      "Enterprise-grade technology without the enterprise price tag. We build solutions that fit startup and small business budgets.",
  },
  {
    icon: Layers,
    title: "All-in-One IT Services",
    description:
      "From websites to POS systems to custom apps — everything under one roof.",
  },
  {
    icon: Zap,
    title: "Agile Development Process",
    description:
      "Fast, iterative delivery with continuous feedback. See progress weekly.",
  },
  {
    icon: Lightbulb,
    title: "Fresh & Innovative Talent",
    description:
      "Modern frameworks and creative problem-solving from a forward-thinking team.",
  },
  {
    icon: Headphones,
    title: "Ongoing Support & Maintenance",
    description:
      "Reliable support, updates, and monitoring to keep things running smoothly.",
  },
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="why-choose">
      <div className="why-choose-container">
        {/* Header */}
        <div className="why-choose-header">
          <span className="section-label">Why AIVOXTECH</span>
          <h2 className="section-title">Your Competitive Edge</h2>
          <p className="section-description">
            What sets us apart and why businesses trust us.
          </p>
        </div>

        {/* Clean List */}
        <div className="benefits-list">
          {benefits.map((benefit, i) => (
            <div key={benefit.title} className="benefit-row">
              <benefit.icon className="benefit-icon" strokeWidth={1.5} />

              <div className="benefit-content">
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>

              <span className="benefit-index">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
