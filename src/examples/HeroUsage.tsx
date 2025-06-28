import React from 'react';
import Hero from '../components/Hero';

// Example of how to use the Hero component in your pages
const HomePage: React.FC = () => {
  return (
    <div>
      <Hero
        videoSrc="/videos/mediterranean-landscape.mp4"
        poster="/images/hero-poster.jpg"
        headline="Authentic Mediterranean Flavors"
        subcopy="Discover our premium selection of olives, oils, and gourmet ingredients sourced directly from the Mediterranean coast."
        primaryCta={{
          label: 'Explore Products',
          href: '/products',
        }}
        secondaryCta={{
          label: 'Learn More',
          href: '/about',
        }}
      />
      
      {/* Rest of your page content */}
      <main className="section-padding">
        {/* Other sections go here */}
      </main>
    </div>
  );
};

// Alternative example with different messaging
const BusinessPage: React.FC = () => {
  return (
    <div>
      <Hero
        videoSrc="/videos/business-kitchen.mp4"
        poster="/images/business-hero-poster.jpg"
        headline="Wholesale Solutions for Your Business"
        subcopy="Partner with Choice Fine Foods for premium Mediterranean ingredients that elevate your culinary offerings."
        primaryCta={{
          label: 'View Catalog',
          href: '/products',
        }}
        secondaryCta={{
          label: 'Become a Supplier',
          href: '/supplier',
        }}
      />
      
      <main className="section-padding">
        {/* Business-specific content */}
      </main>
    </div>
  );
};

export { HomePage, BusinessPage }; 