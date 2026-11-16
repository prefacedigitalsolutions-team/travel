'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './EnquirySection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EnquirySection() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: 'Himalayan Crown Sanctuary',
    guests: '2 Guests',
    notes: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.enquiry-reveal', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Automatically generate unique ID and accurate current date/time
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });

      const payload = {
        ...formData,
        id: `LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
        date: formattedDate,
        status: 'Pending Review',
      };

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitted(true);
      } else {
        alert('Error submitting form: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="luxury-enquiry" ref={sectionRef}>
      <div className="luxury-enquiry-container">
        
        {/* Left Column: Direct Concierge Info */}
        <div className="enquiry-info-col enquiry-reveal">
          <div className="enquiry-tag">
            <span>Private Aviation & Travel Desk</span>
          </div>

          <h2 className="enquiry-title">
            Begin Your <br />
            <span className="enquiry-italic">Bespoke Journey.</span>
          </h2>

          <p className="enquiry-desc">
            Share your preferred dates and destination. A dedicated senior travel architect will craft a tailored itinerary and flight manifest within 4 hours.
          </p>

          <div className="concierge-details">
            <div className="concierge-item">
              <span className="concierge-label">24/7 Priority Aviation Line</span>
              <strong className="concierge-value">+91 (11) 4089-7720</strong>
            </div>
            <div className="concierge-item">
              <span className="concierge-label">Direct Concierge Desk</span>
              <strong className="concierge-value">concierge@raretravel.in</strong>
            </div>
            <div className="concierge-item">
              <span className="concierge-label">Private Lounge & Office</span>
              <strong className="concierge-value">Chanakyapuri Diplomatic Enclave, New Delhi</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Minimalist Booking Form */}
        <div className="enquiry-form-card enquiry-reveal">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="luxury-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Aarav Mehta"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone / WhatsApp</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98110 XXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="aarav@domain.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Party Size</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="Solo Explorer">Solo Explorer</option>
                    <option value="2 Guests">2 Guests (Couple)</option>
                    <option value="4-6 Guests">4–6 Guests (Family)</option>
                    <option value="Private Charter Group">Private Charter Group (8+)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="destination">Expedition or Service</label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                >
                  <option value="Himalayan Crown Sanctuary">Himalayan Crown Sanctuary (7 Days)</option>
                  <option value="Baa Atoll Emerald Overwater">Baa Atoll Emerald Overwater (5 Days)</option>
                  <option value="Swiss Glacier & Alpine Retreat">Swiss Glacier & Alpine Retreat (8 Days)</option>
                  <option value="Private Jet / Helicopter Charter">Private Jet / Helicopter Charter</option>
                  <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Preferred Dates & Special Requests</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  placeholder="e.g. Mid-December departure from Delhi, direct charter preferred..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="luxury-submit-btn" disabled={loading}>
                {loading ? 'Submitting...' : 'Request Bespoke Proposal →'}
              </button>
            </form>
          ) : (
            <div className="enquiry-success">
              <div className="success-icon">✓</div>
              <h3>Dossier Received</h3>
              <p>
                Thank you, <strong>{formData.name}</strong>. Your travel architect is reviewing your request for <strong>{formData.destination}</strong> and will connect shortly.
              </p>
              <button
                type="button"
                className="reset-form-btn"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}