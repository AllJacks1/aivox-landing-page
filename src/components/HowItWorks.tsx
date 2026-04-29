import React from "react";
import { MessageSquare, PenTool, Code, Rocket, Headphones } from "lucide-react";
import "../styles/HowItWorks.css";

interface Step {
  number: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consultation",
    description:
      "We start by understanding your business goals, challenges, and vision through a detailed discovery session.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Planning & Design",
    description:
      "Our team crafts a strategic roadmap and creates wireframes and prototypes tailored to your requirements.",
  },
  {
    number: "03",
    icon: Code,
    title: "Development (Agile)",
    description:
      "We build your solution using agile sprints, delivering incremental value with continuous feedback loops.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Testing & Deployment",
    description:
      "Rigorous QA testing ensures quality before we launch your product to production with zero downtime.",
  },
  {
    number: "05",
    icon: Headphones,
    title: "Support & Maintenance",
    description:
      "Post-launch, we provide ongoing monitoring, updates, and dedicated support to keep everything running smoothly.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        {/* Section Header */}
        <div className="how-it-works-header">
          <span className="section-label">Our Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            A proven 5-step methodology that delivers results — from first
            conversation to long-term success.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline">
          {steps.map((step) => (
            <div key={step.number} className="timeline-step">
              <div className="timeline-card">
                <span className="timeline-number">{step.number}</span>
                <div className="timeline-icon-wrapper">
                  <step.icon className="timeline-icon" strokeWidth={1.5} />
                </div>
                <h3 className="timeline-title">{step.title}</h3>
                <p className="timeline-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
