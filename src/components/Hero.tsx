import { useEffect, useRef } from "react";
import {
  ArrowRight,
  Play,
  BadgeCheck,
  Zap,
  Clock,
  Settings,
  TrendingUp,
  Shield,
  Users,
  Code2,
  Smartphone,
  ShoppingCart,
  LayoutDashboard,
} from "lucide-react";
import "../styles/Hero.css";

// ─── Types ─────────────────────────────────────────────

interface HeroProps {
  headline?: string;
  subheadline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

// ─── Badge Data ────────────────────────────────────────

const badges = [
  { icon: Zap, label: "Affordable Pricing" },
  { icon: Settings, label: "Custom Solutions" },
  { icon: Clock, label: "Fast Delivery" },
];

// ─── Dashboard Mockup Data ─────────────────────────────

const mockStats = [
  { label: "Revenue", value: "₱128,450", change: "+12.5%", up: true },
  { label: "Orders", value: "1,847", change: "+8.2%", up: true },
  { label: "Customers", value: "3,291", change: "+15.3%", up: true },
];

const mockActivities = [
  {
    icon: ShoppingCart,
    text: "New order #2847",
    time: "2m ago",
    color: "#22c55e",
  },
  {
    icon: Users,
    text: "New signup: Juan Dela Cruz",
    time: "5m ago",
    color: "#2563eb",
  },
  {
    icon: TrendingUp,
    text: "Sales up 24% this week",
    time: "12m ago",
    color: "#f59e0b",
  },
];

// ─── Component ─────────────────────────────────────────

export default function Hero({
  headline = "Affordable IT Solutions for Growing Businesses",
  subheadline = "Websites, POS Systems, Apps & Custom Software — built for startups and SMEs in the Philippines.",
  primaryCta = "Get Started",
  secondaryCta = "View Services",
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!mockupRef.current) return;
      const scrolled = window.scrollY;
      const rate = scrolled * 0.15;
      mockupRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero__animate-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = heroRef.current?.querySelectorAll(".hero__reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={heroRef} className="hero" id="home">
      {/* Background Effects */}
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="hero__bg-grid" aria-hidden="true" />

      {/* Floating decorative elements */}
      <div className="hero__float hero__float--1" aria-hidden="true">
        <Code2 size={32} />
      </div>
      <div className="hero__float hero__float--2" aria-hidden="true">
        <Smartphone size={28} />
      </div>
      <div className="hero__float hero__float--3" aria-hidden="true">
        <ShoppingCart size={24} />
      </div>

      <div className="hero__container">
        {/* ─── Left Content ────────────────────────────── */}
        <div className="hero__content">
          {/* Badges */}
          <div className="hero__badges hero__reveal">
            {badges.map((badge) => (
              <span key={badge.label} className="hero__badge">
                <badge.icon
                  size={14}
                  className="hero__badge-icon"
                  aria-hidden="true"
                />
                {badge.label}
              </span>
            ))}
          </div>

          {/* Headline */}
          <h1 className="hero__headline hero__reveal">
            {headline.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  word === "Affordable" || word === "Growing"
                    ? "hero__highlight"
                    : ""
                }
              >
                {word}{" "}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p className="hero__subheadline hero__reveal">{subheadline}</p>

          {/* CTA Buttons */}
          <div className="hero__ctas hero__reveal">
            <a
              href="#get-started"
              className="hero__cta hero__cta--primary"
              onClick={(e) => {
                e.preventDefault();
                onPrimaryClick?.();
              }}
            >
              {primaryCta}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#services"
              className="hero__cta hero__cta--secondary"
              onClick={(e) => {
                e.preventDefault();
                onSecondaryClick?.();
              }}
            >
              <Play size={16} aria-hidden="true" />
              {secondaryCta}
            </a>
          </div>

          {/* Trust Indicators */}
          {/* <div className="hero__trust hero__reveal">
            <div className="hero__avatars">
              <div className="hero__avatar hero__avatar--1">JD</div>
              <div className="hero__avatar hero__avatar--2">MK</div>
              <div className="hero__avatar hero__avatar--3">AR</div>
              <div className="hero__avatar hero__avatar--4">+</div>
            </div>
            <div className="hero__trust-text">
              <span className="hero__trust-stars">★★★★★</span>
              <span>
                Trusted by <strong>150+</strong> Philippine businesses
              </span>
            </div>
          </div> */}
        </div>

        {/* ─── Right Visual ────────────────────────────── */}
        <div className="hero__visual hero__reveal" ref={mockupRef}>
          {/* Dashboard Mockup */}
          <div className="hero__mockup">
            {/* Mockup Header */}
            <div className="hero__mockup-header">
              <div className="hero__mockup-dots">
                <span className="hero__mockup-dot hero__mockup-dot--red" />
                <span className="hero__mockup-dot hero__mockup-dot--yellow" />
                <span className="hero__mockup-dot hero__mockup-dot--green" />
              </div>
              <span className="hero__mockup-title">
                <LayoutDashboard size={14} aria-hidden="true" />
                Aivox Dashboard
              </span>
            </div>

            {/* Mockup Body */}
            <div className="hero__mockup-body">
              {/* Stats Row */}
              <div className="hero__mockup-stats">
                {mockStats.map((stat) => (
                  <div key={stat.label} className="hero__mockup-stat">
                    <span className="hero__mockup-stat-label">
                      {stat.label}
                    </span>
                    <span className="hero__mockup-stat-value">
                      {stat.value}
                    </span>
                    <span
                      className={`hero__mockup-stat-change ${stat.up ? "hero__mockup-stat-change--up" : ""}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart Area */}
              <div className="hero__mockup-chart">
                <div className="hero__mockup-chart-header">
                  <span>Sales Overview</span>
                  <span className="hero__mockup-chart-period">This Month</span>
                </div>
                <div className="hero__mockup-chart-bars">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 50, 88].map(
                    (height, i) => (
                      <div
                        key={i}
                        className="hero__mockup-chart-bar"
                        style={{
                          height: `${height}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="hero__mockup-activity">
                <span className="hero__mockup-activity-title">
                  Recent Activity
                </span>
                {mockActivities.map((activity, i) => (
                  <div key={i} className="hero__mockup-activity-item">
                    <div
                      className="hero__mockup-activity-icon"
                      style={{
                        background: `${activity.color}15`,
                        color: activity.color,
                      }}
                    >
                      <activity.icon size={14} />
                    </div>
                    <div className="hero__mockup-activity-text">
                      <span>{activity.text}</span>
                      <span className="hero__mockup-activity-time">
                        {activity.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="hero__floating-card hero__floating-card--1">
            <Shield size={20} className="hero__floating-card-icon" />
            <div>
              <span className="hero__floating-card-title">SSL Secured</span>
              <span className="hero__floating-card-sub">Enterprise Grade</span>
            </div>
          </div>

          <div className="hero__floating-card hero__floating-card--2">
            <BadgeCheck
              size={20}
              className="hero__floating-card-icon hero__floating-card-icon--green"
            />
            <div>
              <span className="hero__floating-card-title">99.9% Uptime</span>
              <span className="hero__floating-card-sub">Cloud Hosted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="hero__wave" aria-hidden="true">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
