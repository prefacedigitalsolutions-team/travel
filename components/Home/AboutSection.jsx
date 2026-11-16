'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const aboutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="luxury-about" ref={aboutRef}>
      <div className="luxury-about-container">
        
        {/* Left Side: Cinematic Visual Frame with Interactive Play Trigger */}
        <div className="about-visual-col about-reveal">
          <div className="about-image-frame">
            {!isPlaying ? (
              <>
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1000&q=85"
                  alt="Forest Emerald Luxury Travel Experience"
                  className="about-main-img"
                />
                <div className="about-img-overlay"></div>
                {/* Interactive Cinematic Play Button */}
                <button 
                  className="about-play-btn"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play Expedition Preview"
                >
                  <span className="play-icon">▶</span>
                  <span className="play-text">Explore Reel</span>
                </button>
              </>
            ) : (
              <div className="about-embedded-video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/7ifhTIBM80E?autoplay=1&controls=1"
                  title="Travel Agency Cinematic Reel"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="about-inline-video"
                ></iframe>
                <button 
                  className="close-video-btn" 
                  onClick={() => setIsPlaying(false)}
                >
                  ✕ Close
                </button>
              </div>
            )}
          </div>

          {/* Floating Experience Badge */}
          <div className="about-floating-stat">
            <span className="stat-number">14+</span>
            <span className="stat-label">Years Curating Rare Global Expeditions</span>
          </div>
        </div>

        {/* Right Side: Editorial Narrative & Pillars */}
        <div className="about-content-col">
          <div className="about-tag about-reveal">
            <span>Our Heritage & Philosophy</span>
          </div>

          <h2 className="about-title about-reveal">
            Crafting Journeys Beyond <br />
            <span className="about-italic">The Ordinary Horizon.</span>
          </h2>

          <p className="about-lead about-reveal">
            We believe true luxury travel lies in effortless discovery—where private aviation, bespoke itineraries, and secluded mountain sanctuaries converge.
          </p>

          <p className="about-body about-reveal">
            From high-altitude Himalayan retreats to private coastal charters in pristine ecosystems, our travel architects handle every logistical nuance with discretion and precision.
          </p>

          {/* Editorial Key Pillars */}
          <div className="about-pillars about-reveal">
            <div className="pillar-item">
              <h4>Bespoke Itineraries</h4>
              <p>Tailor-made routes built around your personal pace and absolute privacy.</p>
            </div>
            <div className="pillar-item">
              <h4>24/7 Aviation Concierge</h4>
              <p>Direct IATA-accredited flight ticketing & private jet charter access.</p>
            </div>
          </div>

          {/* Signature Metrics Row */}
          <div className="about-metrics about-reveal">
            <div className="metric-box">
              <strong>45+</strong>
              <span>Private Sanctuaries</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>99.4%</strong>
              <span>Client Retention</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>24/7</strong>
              <span>Dedicated Concierge</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}