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
    id: 'ladakh-spiti-circuit',
    badge: 'Signature Yatra',
    duration: '7 Days • 6 Nights',
    title: 'Leh–Ladakh & Spiti Grand Circuit',
    route: 'New Delhi → Leh → Nubra → Pangong',
    desc: 'Direct morning flight into Leh, heated luxury camps, private SUV transfers, and curated monastery & Khardung La access.',
    price: '₹64,999',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'kashmir-royal-retreat',
    badge: 'Heritage Luxury',
    duration: '6 Days • 5 Nights',
    title: 'Kashmir Gulmarg & Pahalgam Royal Retreat',
    route: 'New Delhi / Mumbai → Srinagar → Gulmarg',
    desc: 'Stay in heritage cedar houseboats on Dal Lake, Gondola Phase-II priority passes, and private valley chauffeur tours.',
    price: '₹48,500',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'rajasthan-palace-trail',
    badge: 'Royal Circuit',
    duration: '6 Days • 5 Nights',
    title: 'Rajasthan Heritage Palace & Desert Trail',
    route: 'Jaipur → Jodhpur → Udaipur',
    desc: 'Royal palace stays, private desert dune dining, Lake Pichola sunset boat cruise, and luxury Volvo/SUV transfers.',
    price: '₹54,999',
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
              <span>VayuYatra Signature Packages</span>
            </div>
            <h2 className="packages-title">
              Curated <span className="packages-italic">Bharatiya Yatras.</span>
            </h2>
          </div>
          <p className="packages-subtitle">
            All-inclusive Indian itineraries with flights, luxury Volvo/SUV transfers, and veg/Jain dining options—customizable from your city.
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
                    <span className="price-label">Per Person • All-Inclusive</span>
                    <strong className="price-amount">{pkg.price}</strong>
                  </div>
                  <a href="#enquiry" className="package-btn">
                    Book Yatra →
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