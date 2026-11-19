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
    destination: 'Leh–Ladakh & Spiti Grand Circuit',
    guests: '2 Guests (Couple)',
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
      // Automatically generate unique ID and accurate current Indian Standard Time (IST) date
      const now = new Date();
      const formattedDate = now.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'Asia/Kolkata',
      });

      const payload = {
        ...formData,
        id: `VY-LEAD-${Math.floor(1000 + Math.random() * 9000)}`,
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
      alert('Something went wrong. Please check your internet connection.');
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
            <span>VayuYatra India • Private Aviation &amp; Yatra Desk</span>
          </div>

          <h2 className="enquiry-title">
            Begin Your <br />
            <span className="enquiry-italic">Royal Bharatiya Yatra.</span>
          </h2>

          <p className="enquiry-desc">
            Share your preferred travel dates, departure city, and destination. Our senior Indian travel specialist will prepare a customized itinerary, flight schedule, and fare quote within 4 hours.
          </p>

          <div className="concierge-details">
            <div className="concierge-item">
              <span className="concierge-label">24/7 India Priority Helpline</span>
              <strong className="concierge-value">+91 (11) 4089-7720</strong>
            </div>
            <div className="concierge-item">
              <span className="concierge-label">Direct Yatra Concierge Email</span>
              <strong className="concierge-value">concierge@vayuyatra.in</strong>
            </div>
            <div className="concierge-item">
              <span className="concierge-label">Flagship Lounge &amp; Head Office</span>
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
                    placeholder="Aarav Sharma"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Mobile / WhatsApp Number</label>
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
                    placeholder="aarav@vayuyatra.in"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="guests">Travellers / Group Size</label>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    <option value="Solo Traveller">Solo Traveller</option>
                    <option value="2 Guests (Couple)">2 Guests (Couple / Honeymoon)</option>
                    <option value="4-6 Guests (Family)">4–6 Guests (Joint Family)</option>
                    <option value="Corporate / Charter Group (8+)">Corporate / Private Charter Group (8+)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="destination">Select Yatra Package or Service</label>
                <select
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                >
                  <option value="Leh–Ladakh & Spiti Grand Circuit">Leh–Ladakh &amp; Spiti Grand Circuit (7 Days / 6 Nights)</option>
                  <option value="Kashmir Gulmarg & Pahalgam Royal Retreat">Kashmir Gulmarg &amp; Pahalgam Royal Retreat (6 Days / 5 Nights)</option>
                  <option value="Rajasthan Heritage Palace & Desert Trail">Rajasthan Heritage Palace &amp; Desert Trail (6 Days / 5 Nights)</option>
                  <option value="Kerala Backwaters & Munnar Luxury Escape">Kerala Backwaters &amp; Munnar Luxury Escape (5 Days / 4 Nights)</option>
                  <option value="Char Dham Heli-Yatra VIP Package">Char Dham Heli-Yatra VIP Package (5 Days / 4 Nights)</option>
                  <option value="Private Jet / Helicopter Charter India">Private Jet / Helicopter Charter (Pan-India)</option>
                  <option value="Custom Domestic / International Itinerary">Custom Domestic / International Itinerary</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notes">Departure City, Dates &amp; Special Preferences</label>
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  placeholder="e.g. Departure from Mumbai/Delhi in December, Pure Veg / Jain meals, senior citizen assistance..."
                  value={formData.notes}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="luxury-submit-btn" disabled={loading}>
                {loading ? 'Submitting Enquiry...' : 'Request Custom Yatra Quote →'}
              </button>
            </form>
          ) : (
            <div className="enquiry-success">
              <div className="success-icon">✓</div>
              <h3>Enquiry Registered</h3>
              <p>
                Dhanyavaad, <strong>{formData.name}</strong>. Our VayuYatra travel specialist is reviewing your request for <strong>{formData.destination}</strong> and will reach out on WhatsApp/call shortly.
              </p>
              <button
                type="button"
                className="reset-form-btn"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Enquiry
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}