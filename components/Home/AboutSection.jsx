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
                  alt="VayuYatra India Luxury Travel Experience"
                  className="about-main-img"
                />
                <div className="about-img-overlay"></div>
                {/* Interactive Cinematic Play Button */}
                <button
                  className="about-play-btn"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play Yatra Preview Reel"
                >
                  <span className="play-icon">▶</span>
                  <span className="play-text">Watch Yatra Reel</span>
                </button>
              </>
            ) : (
              <div className="about-embedded-video-wrapper">
                <iframe
                  src="https://www.youtube.com/embed/7ifhTIBM80E?autoplay=1&controls=1"
                  title="VayuYatra India Cinematic Reel"
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
            <span className="stat-label">Years Curating Bharatiya Yatras &amp; Expeditions</span>
          </div>
        </div>

        {/* Right Side: Editorial Narrative & Pillars */}
        <div className="about-content-col">
          <div className="about-tag about-reveal">
            <span>VayuYatra Heritage &amp; Philosophy</span>
          </div>

          <h2 className="about-title about-reveal">
            Crafting Journeys Beyond <br />
            <span className="about-italic">The Ordinary Horizon.</span>
          </h2>

          <p className="about-lead about-reveal">
            With VayuYatra India, discerning travellers experience effortless discovery—where domestic and global aviation, bespoke itineraries, and serene Himalayan or heritage sanctuaries come together.
          </p>

          <p className="about-body about-reveal">
            From high-altitude Ladakh and Spiti retreats to royal palaces, backwaters, and private charters across India, our travel specialists manage every detail—from flight transfers to meal and family preferences—with care and precision.
          </p>

          {/* Editorial Key Pillars */}
          <div className="about-pillars about-reveal">
            <div className="pillar-item">
              <h4>Bespoke Yatra Itineraries</h4>
              <p>Tailor-made Indian and global routes paced for families, couples, and solo explorers.</p>
            </div>
            <div className="pillar-item">
              <h4>24/7 Aviation &amp; Yatra Desk</h4>
              <p>Direct IATA-accredited flight bookings, luxury Volvo transfers, and charter support.</p>
            </div>
          </div>

          {/* Signature Metrics Row */}
          <div className="about-metrics about-reveal">
            <div className="metric-box">
              <strong>45+</strong>
              <span>Heritage &amp; Eco Retreats</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>99.4%</strong>
              <span>Yatri Satisfaction</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-box">
              <strong>24/7</strong>
              <span>India Concierge</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}