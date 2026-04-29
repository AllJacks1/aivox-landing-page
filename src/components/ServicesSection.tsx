import React from "react";
import {
  Globe,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Code2,
  ArrowRight,
} from "lucide-react";
import "../styles/ServicesSection.css";

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom, responsive websites built for performance and conversion. From landing pages to full-scale web applications.",
  },
  {
    icon: CreditCard,
    title: "POS Systems",
    description:
      "Integrated point-of-sale solutions that streamline transactions, inventory, and customer management in real time.",
  },
  {
    icon: Smartphone,
    title: "Android App Development",
    description:
      "Native Android applications designed for speed, reliability, and seamless user experiences across all devices.",
  },
  {
    icon: ShieldCheck,
    title: "Network Setup & Security",
    description:
      "Enterprise-grade network architecture, monitoring, and cybersecurity to protect your business infrastructure.",
  },
  {
    icon: Code2,
    title: "Custom Software",
    description:
      "Bespoke SaaS platforms and internal tools built to solve your unique business challenges at scale.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <div className="services-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Core Services</h2>
          <p className="section-description">
            End-to-end technology solutions designed to accelerate your business
            growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.title} className="service-card">
              <div className="service-card-inner">
                <div className="service-icon-wrapper">
                  <service.icon className="service-icon" strokeWidth={1.5} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-cta">
                  <span className="service-cta-text">Learn More</span>
                  <ArrowRight className="service-cta-arrow" strokeWidth={2} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
