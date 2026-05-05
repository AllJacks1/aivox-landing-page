import React, { useState } from "react";
import {
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
} from "lucide-react";
import "../styles/PricingSection.css";
import ContactModal from "./ContactModal";

/* ============================================================
   Types & Interfaces
   ============================================================ */

type Currency = "EUR" | "PHP";

interface PricingTier {
  name: string;
  description: string;
  price: string; // Raw display string (fallback)
  priceMin: number; // Numeric min for conversion
  priceMax: number; // Numeric max for conversion
  priceNote: string;
  features: string[];
  cta: string;
  ctaIcon: React.ElementType;
  highlighted: boolean;
  highlightLabel?: string;
  isCustom?: boolean; // For "Custom" / "Subscription" tiers
}

/* ============================================================
   Pricing Data — Updated with numeric values for conversion
   ============================================================ */

const tiers: PricingTier[] = [
  {
    name: "Starter",
    description:
      "Perfect for small businesses & personal brands needing a professional presence quickly",
    price: "€1,180 – €1,390",
    priceMin: 1180,
    priceMax: 1390,
    priceNote: "Design & Development",
    features: [
      "Basic SEO setup",
      "Mobile-responsive design",
      "Basic contact form integration",
      "Social media integration",
      "1-year hosting & domain",
      "Professional, quick turnaround",
    ],
    cta: "Get Started",
    ctaIcon: ArrowRight,
    highlighted: false,
  },
  {
    name: "Growth",
    description: "For businesses ready to scale their presence",
    price: "Custom",
    priceMin: 0,
    priceMax: 0,
    priceNote: "Tailored Quote",
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
    isCustom: true,
  },
  {
    name: "Advanced",
    description: "Full-scale systems for growing enterprises",
    price: "Subscription",
    priceMin: 0,
    priceMax: 0,
    priceNote: "Monthly Billing",
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
    isCustom: true,
  },
];

/* ============================================================
   Currency Converter Hook (same as PackagesSection)
   ============================================================ */

const useCurrencyConverter = () => {
  const [currency, setCurrency] = useState<Currency>("EUR");
  const [rate, setRate] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleCurrency = async () => {
    const nextCurrency = currency === "EUR" ? "PHP" : "EUR";

    if (nextCurrency === "EUR") {
      setCurrency("EUR");
      setRate(1);
      setError(null);
      return;
    }

    // ✅ Already fetched → reuse
    if (rate !== 1) {
      setCurrency("PHP");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=EUR&to=PHP&amount=1`,
        {
          headers: {
            "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
            "x-rapidapi-host":
              "currency-conversion-and-exchange-rates.p.rapidapi.com",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const rate = data?.result ?? data?.info?.rate ?? data?.rates?.PHP;

      if (!rate) throw new Error("Invalid API response");

      setRate(rate);
      setCurrency("PHP");
    } catch (error) {
      console.log("Currency conversion error:", error);
      setError("Conversion unavailable. Showing EUR.");
      setCurrency("EUR");
      setRate(1);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number): string => {
    if (currency === "PHP") {
      return `₱${Math.round(amount * rate).toLocaleString()}`;
    }
    return `€${amount.toLocaleString()}`;
  };

  return { currency, toggleCurrency, formatPrice, loading, error };
};

/* ============================================================
   Subcomponents
   ============================================================ */

const CurrencyToggle: React.FC<{
  currency: Currency;
  onToggle: () => void;
  loading: boolean;
}> = ({ currency, onToggle, loading }) => (
  <div className="currency-toggle-wrapper">
    <button
      className={`currency-toggle ${loading ? "loading" : ""}`}
      onClick={onToggle}
      disabled={loading}
      aria-label={`Currency: ${currency}`}
    >
      <div className={`toggle-slider ${currency === "PHP" ? "right" : ""}`} />
      <span className={`toggle-option ${currency === "EUR" ? "active" : ""}`}>
        {loading && currency === "PHP" ? <span className="spinner" /> : null}
        EUR
      </span>
      <span className={`toggle-option ${currency === "PHP" ? "active" : ""}`}>
        {loading && currency === "EUR" ? <span className="spinner" /> : null}
        PHP
      </span>
    </button>
  </div>
);

/* ============================================================
   Main Component
   ============================================================ */

const PricingSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currency, toggleCurrency, formatPrice, loading, error } =
    useCurrencyConverter();

  // Helper to render price based on tier type and currency
  const renderPrice = (tier: PricingTier): string => {
    if (tier.isCustom) return tier.price;

    if (currency === "EUR") {
      return `${formatPrice(tier.priceMin)} – ${formatPrice(tier.priceMax)}`;
    }

    return `${formatPrice(tier.priceMin)} – ${formatPrice(tier.priceMax)}`;
  };

  return (
    <section id="pricing" className="pricing-section">
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

        {/* Currency Toggle */}
        <CurrencyToggle
          currency={currency}
          onToggle={toggleCurrency}
          loading={loading}
        />
        {error && <div className="currency-error">{error}</div>}

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
                <span className="pricing-price">{renderPrice(tier)}</span>
                <span className="pricing-price-note">{tier.priceNote}</span>
              </div>

              <ul className="pricing-features">
                {tier.features.map((feature) => (
                  <li key={feature}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`pricing-cta ${tier.highlighted ? "pricing-cta-primary" : "pricing-cta-secondary"}`}
                onClick={() => setIsModalOpen(true)}
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
            <Check className="pricing-check" strokeWidth={3} />
            <span>Flexible for startups</span>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default PricingSection;
