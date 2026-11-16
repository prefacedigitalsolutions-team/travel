import './Footer.css';

export default function Footer() {
  return (
    <footer className="vt-footer">
      <div className="vt-footer-container">
        
        {/* Top Editorial CTA Banner */}
        <div className="vt-footer-cta">
          <div className="vt-cta-text">
            <span className="vt-cta-eyebrow">Private Travel Desk • New Delhi & Mumbai</span>
            <h3 className="vt-cta-heading">
              Ready to script your next <span>extraordinary expedition?</span>
            </h3>
          </div>
          <div className="vt-cta-actions">
            <a href="#enquiry" className="vt-btn-primary">
              Plan Bespoke Journey →
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
              VERDANT <span>TRAILS</span>
            </a>
            <p className="vt-brand-desc">
              India’s premier bespoke travel & private aviation house. Curating royal heritage palaces, high-altitude Himalayan sanctuaries, and private island charters across the subcontinent and beyond.
            </p>
            <div className="vt-trust-badges">
              <div className="vt-badge">
                <span className="vt-badge-dot"></span>
                Ministry of Tourism Approved
              </div>
              <div className="vt-badge">
                <span className="vt-badge-dot"></span>
                IATA & IATO Member
              </div>
            </div>
          </div>

          {/* Column 2: Curated Indian & Global Trails */}
          <div className="vt-col-links">
            <h4 className="vt-col-heading">Curated Circuits</h4>
            <ul>
              <li><a href="#packages">Leh, Ladakh & Nubra Heli-Trail</a></li>
              <li><a href="#packages">Udaipur & Jodhpur Royal Palaces</a></li>
              <li><a href="#packages">Kerala Backwaters Private Yacht</a></li>
              <li><a href="#packages">Andaman Emerald Archipelago</a></li>
              <li><a href="#packages">Kashmir & Gulmarg Alpine Chalets</a></li>
            </ul>
          </div>

          {/* Column 3: Company & Desk */}
          <div className="vt-col-links">
            <h4 className="vt-col-heading">The House</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">Heritage & Philosophy</a></li>
              <li><a href="#services">Aviation & Chauffeur Fleet</a></li>
              <li><a href="#packages">Signature Expeditions</a></li>
              <li><a href="#enquiry">Corporate & HNI Desk</a></li>
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
              <strong>Mumbai Salon</strong>
              <p>Level 14, One BKC, Bandra Kurla Complex, Mumbai 400051</p>
            </div>

            <div className="vt-direct-contact">
              <a href="tel:+911140897720">+91 (11) 4089-7720</a>
              <a href="mailto:concierge@verdanttrails.in">concierge@verdanttrails.in</a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & GST Strip */}
        <div className="vt-footer-bottom">
          <div className="vt-copyright">
            <span>© {new Date().getFullYear()} Verdant Trails Expeditions Pvt. Ltd. (CIN: U63040DL2018PTC334912)</span>
          </div>
          <div className="vt-legal-nav">
            <a href="#enquiry">Privacy Policy</a>
            <a href="#enquiry">Cancellation & Refund</a>
            <a href="#enquiry">Guest Charter Terms</a>
            <a href="#home" className="vt-top-link">Top ↑</a>
          </div>
        </div>

        {/* Oversized Modern Brand Watermark */}
        <div className="vt-watermark" aria-hidden="true">
          VERDANT TRAILS
        </div>

      </div>
    </footer>
  );
}