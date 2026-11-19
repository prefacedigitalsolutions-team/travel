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
    tag: 'VayuYatra Aviation',
    title: 'Domestic & Global Flights + Heli Charters',
    desc: 'Direct IATA-accredited flight bookings from major Indian hubs alongside private jet and helicopter charters for high-altitude and remote destinations.',
    highlight: 'Airport Lounge & Priority Check-In',
  },
  {
    number: '02',
    tag: 'Heritage & Retreats',
    title: 'Palaces, Houseboats & Himalayan Sanctuaries',
    desc: 'Handpicked heritage havelis, Dal Lake houseboats, luxury camps, and eco-resorts across India vetted for comfort, safety, and warm hospitality.',
    highlight: 'Complimentary Room & Meal Upgrades',
  },
  {
    number: '03',
    tag: 'Pan-India Transit',
    title: 'Luxury Volvo Coaches & All-Terrain SUVs',
    desc: 'Well-maintained luxury Volvo coaches, tempo travellers, and mountain-ready SUVs driven by experienced local drivers across highways and ghat roads.',
    highlight: 'Door-to-Door Pickup & Luggage Care',
  },
  {
    number: '04',
    tag: 'End-to-End Yatra Design',
    title: 'Custom Itineraries, Permits & Satvik Dining',
    desc: 'Complete planning including Inner Line / mountain permits, temple darshan & sightseeing coordination, Pure Veg/Jain meal options, and 24/7 India support.',
    highlight: 'Dedicated Indian Yatra Specialist',
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
              <span>VayuYatra India Capabilities</span>
            </div>
            <h2 className="services-title">
              Curated Pillars Of <br />
              <span className="services-italic">Effortless Bharat Travel.</span>
            </h2>
          </div>
          <p className="services-subtitle">
            From flight tickets and mountain permits to luxury coaches and family-friendly stays, every detail is handled seamlessly under one roof.
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