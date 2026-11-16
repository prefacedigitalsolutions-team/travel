'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './HeroBanner.css';

export default function HeroBanner() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.clean-reveal', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="luxury-hero" ref={heroRef}>
      {/* Cinematic YouTube Background Video */}
      <div
        className="hero-video-container"
        style={{ overflow: 'hidden', pointerEvents: 'none' }}
      >
        <iframe
          src="https://www.youtube.com/embed/7ifhTIBM80E?autoplay=1&mute=1&loop=1&playlist=7ifhTIBM80E&controls=0&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1&playsinline=1"
          title="Cinematic Background Travel Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100vw',
            height: '56.25vw',
            minHeight: '100vh',
            minWidth: '177.77vh',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            zIndex: 1,
          }}
        ></iframe>
        <div className="hero-video-overlay" style={{ zIndex: 2 }}></div>
      </div>

      <div className="luxury-hero-container">
        {/* Left Side: Editorial Typography */}
        <div className="luxury-content">
          <div className="luxury-tag clean-reveal">
            <span>Global Aviation • Luxury Expeditions • Private Tours</span>
          </div>

          <h1 className="luxury-title clean-reveal">
            The Art Of <br />
            <span className="luxury-italic">Rare Travel.</span>
          </h1>

          <p className="luxury-desc clean-reveal">
            Seamless flight bookings, luxury coach transit, and immersive mountain sanctuaries designed for the modern explorer.
          </p>

          <div className="luxury-actions clean-reveal">
            <a href="#packages" className="luxury-btn-primary">
              Explore Expeditions
            </a>
            <a href="#enquiry" className="luxury-btn-outline">
              Request Concierge
            </a>
          </div>
        </div>

        {/* Right Side: Clean Minimalist Floating Card */}
        <div className="luxury-visual clean-reveal">
          <div className="editorial-card">
            <div className="editorial-badge">✈️ Featured Route</div>
            <div className="editorial-info">
              <h3>Himalayan Crown Route</h3>
              <p>Direct Express Flight + Luxury Lodge • 7 Days</p>
              <div className="editorial-footer">
                <span>Verified IATA Partner</span>
                <strong>Inquire Now</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}