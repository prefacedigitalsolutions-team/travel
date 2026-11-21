'use client';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Top announcement bar slide down
      gsap.from('.top-announcement', {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Logo entrance
      gsap.from('.brand-logo', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out',
      });

      // Nav links staggered reveal
      gsap.from('.nav-item', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.25,
        ease: 'power2.out',
      });

      // Search box & CTA button reveal
      gsap.from('.nav-actions', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const enquirySection = document.getElementById('enquiry');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="nav-header" ref={navRef}>
      {/* Top Emerald Strip */}
      <div className="top-announcement">
        <span className="promo-badge">YATRA SEASON</span>
        <p>Himalayan expeditions &amp; royal Bharatiya tours — Save up to 25%</p>
        <div className="contact-mini">
          <span>+91-8826113256</span>
        </div>
      </div>

      {/* Main Forest Green Glass Navbar */}
      <nav className="navbar">
        {/* Custom SVG Travel & Compass Logo */}
        <a href="#home" className="brand-logo">
          <div className="svg-icon-box">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="#34d399" fillOpacity="0.25" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">
              VAYU<span className="brand-highlight">YATRA</span>
            </span>
            <span className="brand-sub">India Expeditions &amp; Aviation</span>
          </div>
        </a>

        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li className="nav-item"><a href="#home" onClick={() => setMenuOpen(false)}>Home</a></li>
          <li className="nav-item"><a href="#packages" onClick={() => setMenuOpen(false)}>Yatra Packages</a></li>
          <li className="nav-item"><a href="#destinations" onClick={() => setMenuOpen(false)}>Destinations</a></li>
          <li className="nav-item"><a href="#reviews" onClick={() => setMenuOpen(false)}>Traveller Stories</a></li>
        </ul>

        {/* Advanced Quick-Search & CTA */}
        <div className="nav-actions">
          <form onSubmit={handleSearch} className="quick-search">
            <input
              type="text"
              placeholder="Where to? (e.g. Leh, Kashmir, Kerala)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search Destination">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>

          <a href="#enquiry" className="cta-button">
            Plan Yatra
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  );
}