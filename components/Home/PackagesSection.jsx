'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './PackagesSection.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PACKAGES = [
  {
    id: 'himalayan-crown',
    badge: 'Signature Expedition',
    duration: '7 Days • 6 Nights',
    title: 'Himalayan Crown Sanctuary',
    route: 'New Delhi → Leh → Nubra Valley',
    desc: 'Private chartered flight into Leh, glass-ceiling mountain lodges, and curated high-altitude monastery access.',
    price: '₹1,85,000',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'emerald-atoll',
    badge: 'Private Island',
    duration: '5 Days • 4 Nights',
    title: 'Baa Atoll Emerald Overwater',
    route: 'Mumbai → Malé → Private Seaplane',
    desc: 'Secluded overwater pool villa with private seaplane transfer, sunset yacht charter, and underwater dining.',
    price: '₹2,60,000',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'alpine-express',
    badge: 'First-Class Rail',
    duration: '8 Days • 7 Nights',
    title: 'Swiss Glacier & Alpine Retreat',
    route: 'Zurich → St. Moritz → Zermatt',
    desc: 'Panoramic Excellence Class rail journeys through the Alps paired with 5-star thermal spa chalets.',
    price: '₹3,40,000',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=900&q=85',
  },
];

export default function PackagesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.package-reveal', {
        y: 35,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
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
    <section id="packages" className="luxury-packages" ref={sectionRef}>
      <div className="luxury-packages-container">
        
        {/* Section Header */}
        <div className="packages-header package-reveal">
          <div>
            <div className="packages-tag">
              <span>Curated Expeditions</span>
            </div>
            <h2 className="packages-title">
              Signature <span className="packages-italic">Journeys.</span>
            </h2>
          </div>
          <p className="packages-subtitle">
            All-inclusive private itineraries engineered for effortless luxury, customizable to your dates.
          </p>
        </div>

        {/* 3-Card Package Grid */}
        <div className="packages-grid">
          {PACKAGES.map((pkg) => (
            <article key={pkg.id} className="package-card package-reveal">
              <div className="package-img-wrap">
                <img src={pkg.image} alt={pkg.title} className="package-img" />
                <div className="package-img-gradient"></div>
                <span className="package-badge">{pkg.badge}</span>
                <span className="package-duration">{pkg.duration}</span>
              </div>

              <div className="package-body">
                <span className="package-route">{pkg.route}</span>
                <h3 className="package-card-title">{pkg.title}</h3>
                <p className="package-card-desc">{pkg.desc}</p>

                <div className="package-footer">
                  <div className="package-price-box">
                    <span className="price-label">Starting From</span>
                    <strong className="price-amount">{pkg.price}</strong>
                  </div>
                  <a href="#enquiry" className="package-btn">
                    Reserve →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}