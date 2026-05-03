import React, { useState } from "react";
import { Calendar, ArrowRight, Zap } from "lucide-react";
import "../styles/FinalCTA.css";
import ContactModal from "./ContactModal";

const FinalCTA: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="final-cta-section">
      <div className="final-cta-container">
        {/* Decorative background glow */}
        <div className="final-cta-glow" />

        <div className="final-cta-content">
          {/* Urgency badge */}
          <div className="final-cta-urgency">
            <Zap className="final-cta-urgency-icon" strokeWidth={2.5} />
            <span>Limited slots this month</span>
          </div>

          {/* Headline */}
          <h2 className="final-cta-headline">
            Ready to Build Your Business System?
          </h2>

          {/* Subheadline */}
          <p className="final-cta-sub">
            Let's turn your idea into a working solution.
          </p>

          {/* CTA Button */}
          <button
            className="final-cta-button"
            onClick={() => setIsModalOpen(true)}
          >
            <Calendar className="final-cta-button-icon" strokeWidth={2} />
            <span>Book Free Consultation</span>
            <ArrowRight className="final-cta-button-arrow" strokeWidth={2} />
          </button>

          {/* Trust micro-copy */}
          <p className="final-cta-trust">
            No commitment required • 30-minute call
          </p>
        </div>
      </div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FinalCTA;
