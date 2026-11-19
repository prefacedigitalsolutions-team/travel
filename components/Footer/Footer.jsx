import './Footer.css';

export default function Footer() {
  return (
    <footer className="vt-footer">
      <div className="vt-footer-container">
        
        {/* Top Editorial CTA Banner */}
        <div className="vt-footer-cta">
          <div className="vt-cta-text">
            <span className="vt-cta-eyebrow">VayuYatra India Desk • New Delhi &amp; Mumbai</span>
            <h3 className="vt-cta-heading">
              Ready to plan your next <span>Bharatiya royal yatra?</span>
            </h3>
          </div>
          <div className="vt-cta-actions">
            <a href="#enquiry" className="vt-btn-primary">
              Plan Custom Yatra →
            </a>
            <a href="https://wa.me/919811044720" target="_blank" rel="noopener noreferrer" className="vt-btn-ghost">
              WhatsApp Concierge
            </a>
          </div>
        </div>

        {/* Main 4-Column Architectural Grid */}
        <div className="vt-footer-grid">
          
          {/* Column 1: Brand & Indian Credentials */}
          <div className="vt-col-brand">
            <a href="#home" className="vt-logo">
              VAYU<span>YATRA</span>
            </a>
            <p className="vt-brand-desc">
              India’s premier bespoke travel &amp; aviation house. Curating royal heritage palaces, high-altitude Himalayan sanctuaries, Char Dham heli-yatras, and luxury Volvo/SUV tours across Bharat and beyond.
            </p>
            <div className="vt-trust-badges">
              <div className="vt-badge">
                <span className="vt-badge-dot"></span>
                Ministry of Tourism Approved
              </div>
              <div className="vt-badge">
                <span className="vt-badge-dot"></span>
                IATA &amp; IATO Accredited
              </div>
            </div>
          </div>

          {/* Column 2: Curated Indian Circuits */}
          <div className="vt-col-links">
            <h4 className="vt-col-heading">Signature Yatra Circuits</h4>
            <ul>
              <li><a href="#packages">Leh–Ladakh &amp; Spiti Grand Circuit</a></li>
              <li><a href="#packages">Kashmir Gulmarg &amp; Pahalgam Retreat</a></li>
              <li><a href="#packages">Rajasthan Heritage Palace &amp; Desert Trail</a></li>
              <li><a href="#packages">Kerala Backwaters &amp; Munnar Escape</a></li>
              <li><a href="#packages">Char Dham Heli-Yatra VIP Package</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Desk */}
          <div className="vt-col-links">
            <h4 className="vt-col-heading">VayuYatra House</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Heritage &amp; Philosophy</a></li>
              <li><a href="#services">Aviation &amp; Volvo Fleet</a></li>
              <li><a href="#packages">Yatra Packages</a></li>
              <li><a href="#enquiry">Family, Group &amp; Corporate Desk</a></li>
            </ul>
          </div>

          {/* Column 4: Indian Regional Lounges */}
          <div className="vt-col-offices">
            <h4 className="vt-col-heading">India Lounges</h4>
            
            <div className="vt-office-block">
              <strong>New Delhi (Flagship)</strong>
              <p>Suite 402, Diplomatic Enclave, Chanakyapuri, New Delhi 110021</p>
            </div>

            <div className="vt-office-block">
              <strong>Mumbai Lounge</strong>
              <p>Level 14, One BKC, Bandra Kurla Complex, Mumbai 400051</p>
            </div>

            <div className="vt-direct-contact">
              <a href="tel:+911140897720">+91-8826113256</a>
              <a href="mailto:concierge@vayuyatra.in">concierge@vayuyatra.in</a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & GST Strip */}
        <div className="vt-footer-bottom">
          <div className="vt-copyright">
            <span>© {new Date().getFullYear()} VayuYatra India Expeditions Pvt. Ltd. (CIN: U63040DL2018PTC334912)</span>
          </div>
          <div className="vt-legal-nav">
            <a href="#enquiry">Privacy Policy</a>
            <a href="#enquiry">Cancellation &amp; Refund Policy</a>
            <a href="#enquiry">Yatri Terms &amp; GST Info</a>
            <a href="#home" className="vt-top-link">Top ↑</a>
          </div>
        </div>

        {/* Oversized Modern Brand Watermark */}
        <div className="vt-watermark" aria-hidden="true">
          VAYUYATRA INDIA
        </div>

      </div>
    </footer>
  );
}