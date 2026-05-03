import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Send,
  User,
  Mail,
  MessageSquare,
  Building2,
  Phone,
} from "lucide-react";
import "../styles/ContactModal.css";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      });
      onClose();
    }, 2500);
  };

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div
        className="contact-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        {/* Close button */}
        <button
          className="contact-modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X strokeWidth={2} />
        </button>

        {/* Header */}
        <div className="contact-modal-header">
          <h2 id="contact-modal-title" className="contact-modal-title">
            Book Free Consultation
          </h2>
          <p className="contact-modal-subtitle">
            Tell us about your project and we'll get back to you within 24
            hours.
          </p>
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="contact-modal-success">
            <div className="contact-modal-success-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="32" fill="rgba(34, 197, 94, 0.15)" />
                <path
                  d="M20 32L28 40L44 24"
                  stroke="#22C55E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="contact-modal-success-title">Message Sent!</h3>
            <p className="contact-modal-success-text">
              We'll reach out to you shortly to schedule your consultation.
            </p>
          </div>
        ) : (
          /* Form */
          <form className="contact-modal-form" onSubmit={handleSubmit}>
            <div className="contact-modal-grid">
              {/* Name */}
              <div className="contact-modal-field">
                <label htmlFor="name" className="contact-modal-label">
                  Full Name <span className="contact-modal-required">*</span>
                </label>
                <div className="contact-modal-input-wrapper">
                  <User className="contact-modal-input-icon" strokeWidth={2} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Juan Dela Cruz"
                    required
                    className="contact-modal-input"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="contact-modal-field">
                <label htmlFor="email" className="contact-modal-label">
                  Email Address{" "}
                  <span className="contact-modal-required">*</span>
                </label>
                <div className="contact-modal-input-wrapper">
                  <Mail className="contact-modal-input-icon" strokeWidth={2} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="juan@company.com"
                    required
                    className="contact-modal-input"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="contact-modal-field">
                <label htmlFor="company" className="contact-modal-label">
                  Company / Business
                </label>
                <div className="contact-modal-input-wrapper">
                  <Building2
                    className="contact-modal-input-icon"
                    strokeWidth={2}
                  />
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Business Name"
                    className="contact-modal-input"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="contact-modal-field">
                <label htmlFor="phone" className="contact-modal-label">
                  Phone Number
                </label>
                <div className="contact-modal-input-wrapper">
                  <Phone className="contact-modal-input-icon" strokeWidth={2} />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    className="contact-modal-input"
                  />
                </div>
              </div>
            </div>

            {/* Service Select */}
            <div className="contact-modal-field">
              <label htmlFor="service" className="contact-modal-label">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="contact-modal-select"
              >
                <option value="">Select a service...</option>
                <option value="starter">Starter Website</option>
                <option value="growth">Growth Package</option>
                <option value="advanced">Advanced / Enterprise</option>
                <option value="custom">Custom Project</option>
                <option value="other">Not sure yet</option>
              </select>
            </div>

            {/* Message */}
            <div className="contact-modal-field">
              <label htmlFor="message" className="contact-modal-label">
                Project Details{" "}
                <span className="contact-modal-required">*</span>
              </label>
              <div className="contact-modal-textarea-wrapper">
                <MessageSquare
                  className="contact-modal-textarea-icon"
                  strokeWidth={2}
                />
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, and timeline..."
                  required
                  rows={4}
                  className="contact-modal-textarea"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="contact-modal-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="contact-modal-spinner" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="contact-modal-submit-icon" strokeWidth={2} />
                  <span>Send Message</span>
                </>
              )}
            </button>

            <p className="contact-modal-privacy">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;
