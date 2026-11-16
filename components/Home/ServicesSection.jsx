'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ServicesSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    number: '01',
    tag: 'Global Aviation',
    title: 'Private Charters & First-Class Ticketing',
    desc: 'Direct IATA-accredited commercial flight desk alongside private jet and helicopter charters for seamless access to remote airfields.',
    highlight: 'Priority Lounge & Fast-Track',
  },
  {
    number: '02',
    tag: 'Curated Stays',
    title: 'Mountain & Coastal Sanctuaries',
    desc: 'Handpicked heritage estates, glass-walled Himalayan lodges, and private island villas vetted for absolute seclusion and service.',
    highlight: 'Complimentary Suite Upgrades',
  },
  {
    number: '03',
    tag: 'Ground Mobility',
    title: 'Executive Coach & Chauffeur Transit',
    desc: 'Custom-configured luxury sprinter coaches and all-terrain SUVs driven by route-certified local expedition specialists.',
    highlight: 'Door-to-Door Luggage Handling',
  },
  {
    number: '04',
    tag: 'Bespoke Design',
    title: 'Tailor-Made Expedition Architecture',
    desc: 'End-to-end itinerary engineering including permits, private museum access, culinary experiences, and 24/7 on-ground concierge.',
    highlight: 'Dedicated Travel Architect',
  },
];

export default function ServicesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-reveal', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="luxury-services" ref={sectionRef}>
      <div className="luxury-services-container">
        
        {/* Editorial Section Header */}
        <div className="services-header service-reveal">
          <div className="services-header-left">
            <div className="services-tag">
              <span>Bespoke Capabilities</span>
            </div>
            <h2 className="services-title">
              Curated Pillars Of <br />
              <span className="services-italic">Seamless Transit.</span>
            </h2>
          </div>
          <p className="services-subtitle">
            Every element of your journey—from tarmac to mountain ridge—is orchestrated under one roof with zero friction.
          </p>
        </div>

        {/* 4-Card Luxury Editorial Grid */}
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div key={service.number} className="service-card service-reveal">
              <div className="service-card-top">
                <span className="service-num">{service.number}</span>
                <span className="service-category">{service.tag}</span>
              </div>

              <h3 className="service-card-title">{service.title}</h3>
              <p className="service-card-desc">{service.desc}</p>

              <div className="service-card-footer">
                <span className="service-perk">{service.highlight}</span>
                <a href="#enquiry" className="service-link" aria-label={`Inquire about ${service.title}`}>
                  Inquire →
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}