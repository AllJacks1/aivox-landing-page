import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
import "../styles/Navbar.css";
import ContactModal from "./ContactModal";
import { HashLink } from "react-router-hash-link";

// ─── Types ─────────────────────────────────────────────

interface NavLinkItem {
  label: string;
  href: string;
  children?: NavLinkItem[];
}

interface NavbarProps {
  logoText?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// ─── Navigation Data ───────────────────────────────────

const navLinks: NavLinkItem[] = [
  { label: "Home", href: "/#home" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Web Development", href: "/services/website-development" },
      { label: "POS Systems", href: "/services/pos-systems" },
      { label: "Android App Development", href: "/services/android-app-development" },
      { label: "Network Setup and Security", href: "/services/network-setup-and-security" },
      { label: "Custom Software", href: "/services/custom-software" },
    ],
  },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#footer" },
];

// ─── Component ─────────────────────────────────────────

export default function Navbar({
  logoText = "Aivox",
  ctaText = "Get Free Consultation",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [cartCount] = useState(2);

  //const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when opened
  // useEffect(() => {
  //   if (isSearchOpen && searchInputRef.current) {
  //     searchInputRef.current.focus();
  //   }
  // }, [isSearchOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const toggleDropdown = (label: string) => {
    setActiveDropdown((prev) => (prev === label ? null : label));
  };

  const handleLinkClick = () => {
    closeMenu();
    setActiveDropdown(null);
  };

  return (
    <>
      <header
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        role="banner"
      >
        <div className="navbar__inner">
          {/* ─── Logo ────────────────────────────────────── */}
          <a href="#home" className="navbar__brand" aria-label="AivoxTech Home">
            <Zap className="navbar__brand-icon" aria-hidden="true" />
            <span className="navbar__brand-text">{logoText}</span>
            <span className="navbar__brand-tech">Tech</span>
          </a>

          {/* ─── Desktop Navigation ──────────────────────── */}
          <nav
            className="navbar__nav"
            role="navigation"
            aria-label="Main navigation"
          >
            <ul className="navbar__links">
              {navLinks.map((link) => (
                <li
                  key={link.label}
                  className={`navbar__item ${link.children ? "navbar__item--dropdown" : ""}`}
                >
                  {link.children ? (
                    <div className="navbar__dropdown" ref={dropdownRef}>
                      <button
                        className="navbar__link navbar__link--dropdown"
                        onClick={() => toggleDropdown(link.label)}
                        aria-expanded={activeDropdown === link.label}
                        aria-haspopup="true"
                      >
                        {link.label}
                        <ChevronDown
                          className={`navbar__chevron ${activeDropdown === link.label ? "navbar__chevron--open" : ""}`}
                          size={14}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <div
                        className={`navbar__dropdown-menu ${activeDropdown === link.label ? "navbar__dropdown-menu--open" : ""}`}
                        role="menu"
                      >
                        {link.children.map((child) => (
                          <HashLink
                            smooth
                            to={`/${child.href}`}
                            className="back-link"
                          >
                            <a
                              key={child.label}
                              href={child.href}
                              className="navbar__dropdown-item"
                              role="menuitem"
                              onClick={handleLinkClick}
                            >
                              {child.label}
                            </a>
                          </HashLink>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="navbar__link"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ─── Right Actions ───────────────────────────── */}
          <div className="navbar__actions">
            {/* Search Toggle */}
            {/* <button
              className="navbar__icon-btn"
              onClick={() => setIsSearchOpen((prev) => !prev)}
              aria-label="Toggle search"
              aria-expanded={isSearchOpen}
            >
              <Search size={20} />
            </button> */}

            {/* Cart Icon */}
            {/* <a
            href="#cart"
            className="navbar__icon-btn navbar__cart"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="navbar__cart-badge">{cartCount}</span>
            )}
          </a> */}

            {/* CTA Button */}
            <a className="navbar__cta" onClick={() => setIsModalOpen(true)}>
              {ctaText}
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="navbar__menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ─── Search Bar ────────────────────────────────── */}
        {/* <div
          className={`navbar__search ${isSearchOpen ? "navbar__search--open" : ""}`}
        >
          <div className="navbar__search-inner">
            <Search size={18} className="navbar__search-icon" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search services, articles..."
              className="navbar__search-input"
              aria-label="Search"
            />
            <button
              className="navbar__search-close"
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div> */}

        {/* ─── Mobile Menu ───────────────────────────────── */}
        <div
          id="mobile-menu"
          className={`navbar__mobile ${isMenuOpen ? "navbar__mobile--open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <nav
            className="navbar__mobile-nav"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="navbar__mobile-links">
              {navLinks.map((link) => (
                <li key={link.label} className="navbar__mobile-item">
                  {link.children ? (
                    <div className="navbar__mobile-dropdown">
                      <button
                        className="navbar__mobile-link navbar__mobile-link--dropdown"
                        onClick={() => toggleDropdown(link.label)}
                        aria-expanded={activeDropdown === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          className={`navbar__mobile-chevron ${activeDropdown === link.label ? "navbar__mobile-chevron--open" : ""}`}
                          size={16}
                        />
                      </button>
                      <div
                        className={`navbar__mobile-submenu ${activeDropdown === link.label ? "navbar__mobile-submenu--open" : ""}`}
                      >
                        {link.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="navbar__mobile-sublink"
                            onClick={handleLinkClick}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      className="navbar__mobile-link"
                      onClick={handleLinkClick}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <a
              className="navbar__mobile-cta"
              onClick={() => setIsModalOpen(true)}
            >
              {ctaText}
            </a>
          </nav>
        </div>
      </header>
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
