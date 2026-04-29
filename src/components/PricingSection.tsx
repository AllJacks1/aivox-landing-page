import React from "react";
import {
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
} from "lucide-react";
import "../styles/PricingSection.css";

interface PricingTier {
  name: string;
  description: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  ctaIcon: React.ElementType;
  highlighted: boolean;
  highlightLabel?: string;
}

const tiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting online",
    price: "₱7,999",
    priceNote: "one-time",
    features: [
      "1-page responsive website",
      "1-year website hosting",
      "1-year domain registration",
      "Basic SEO setup",
      "Mobile-optimized design",
      "Contact form integration",
    ],
    cta: "Get Started",
    ctaIcon: ArrowRight,
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For businesses ready to scale their presence",
    price: "Custom",
    priceNote: "tailored quote",
    features: [
      "Multi-page website (up to 10 pages)",
      "CMS integration",
      "Advanced SEO & analytics",
      "3 months support included",
    ],
    cta: "Contact Us",
    ctaIcon: MessageCircle,
    highlighted: true,
    highlightLabel: "Most Popular",
  },
  {
    name: "Advanced",
    description: "Full-scale systems for growing enterprises",
    price: "Subscription",
    priceNote: "monthly billing",
    features: [
      "Web Application System or Android App Development",
      "Multi-page website (up to 10 pages)",
      "SaaS platform development",
      "Advanced SEO & analytics",
      "Network setup & security",
      "Dedicated account manager",
      "24/7 priority support",
      "Monthly performance reports",
    ],
    cta: "Book Consultation",
    ctaIcon: Calendar,
    highlighted: false,
  },
];

const PricingSection: React.FC = () => {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {/* Section Header */}
        <div className="pricing-header">
          <span className="section-label">Pricing</span>
          <h2 className="section-title">Transparent & Affordable Pricing</h2>
          <p className="section-description">
            Flexible plans designed for startups and small businesses. No hidden
            fees — just results.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`pricing-card ${tier.highlighted ? "pricing-card-highlighted" : ""}`}
            >
              {tier.highlightLabel && (
                <div className="pricing-badge">
                  <Sparkles className="pricing-badge-icon" strokeWidth={2} />
                  {tier.highlightLabel}
                </div>
              )}

              <div className="pricing-card-header">
                <h3 className="pricing-name">{tier.name}</h3>
                <p className="pricing-tier-description">{tier.description}</p>
              </div>

              <div className="pricing-price-wrapper">
                <span className="pricing-price">{tier.price}</span>
                <span className="pricing-price-note">{tier.priceNote}</span>
              </div>

              <ul className="pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    {/* <Check className="pricing-check" strokeWidth={2.5} /> */}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-cta ${tier.highlighted ? "pricing-cta-primary" : "pricing-cta-secondary"}`}
              >
                <tier.ctaIcon className="pricing-cta-icon" strokeWidth={2} />
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Footer */}
        <div className="pricing-trust">
          <div className="pricing-trust-item">
            <Check className="pricing-trust-check" strokeWidth={3} />
            <span>No hidden fees</span>
          </div>
          <div className="pricing-trust-divider" />
          <div className="pricing-trust-item">
            <Check className="pricing-trust-check" strokeWidth={3} />
            <span>Cancel anytime</span>
          </div>
          <div className="pricing-trust-divider" />
          <div className="pricing-trust-item">
            <Check className="pricing-trust-check" strokeWidth={3} />
            <span>Flexible for startups</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
