import React, { Suspense, useState, useEffect } from 'react';
import FadeSlide from './animations/FadeSlide';
import MagneticButton from './animations/MagneticButton';

interface CTAButton {
  label: string;
  href: string;
}

interface HeroProps {
  videoSrc: string;
  headline: string;
  subcopy: string;
  primaryCta: CTAButton;
  secondaryCta: CTAButton;
  poster?: string;
  className?: string;
}

// Lazy loaded video component
const LazyVideo: React.FC<{ src: string; poster?: string }> = ({ src, poster }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleCanPlay = () => {
    setIsLoaded(true);
  };

  // Show poster image only if reduced motion is preferred
  if (prefersReducedMotion) {
    return (
      <img
        src={poster || '/placeholder.svg'}
        alt="Hero background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <>
      {!isLoaded && poster && (
        <img
          src={poster}
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        onCanPlay={handleCanPlay}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ contain: 'paint layout' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export const Hero: React.FC<HeroProps> = ({
  videoSrc,
  headline,
  subcopy,
  primaryCta,
  secondaryCta,
  poster,
  className = '',
}) => {
  return (
    <section 
      className={`relative w-full h-[60vh] md:h-[75vh] overflow-hidden ${className}`}
      style={{ contain: 'paint layout' }}
    >
      {/* Background Video */}
      <div className="absolute inset-0">
        <Suspense 
          fallback={
            <img
              src={poster || '/placeholder.svg'}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          }
        >
          <LazyVideo src={videoSrc} poster={poster} />
        </Suspense>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70" />

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom text-center">
          <FadeSlide offset={25} duration={400} delay={0}>
            <div className="max-w-xl mx-auto space-y-6">
              {/* Headline */}
              <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {headline}
              </h1>
              
              {/* Subcopy */}
              <p className="text-white/90 font-sans text-lg md:text-xl leading-relaxed">
                {subcopy}
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <MagneticButton
                  href={primaryCta.href}
                  className="btn-primary"
                  strength={15}
                >
                  {primaryCta.label}
                </MagneticButton>
                
                <MagneticButton
                  href={secondaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white text-white bg-transparent px-8 py-4 font-medium text-lg transition-all duration-200 hover:bg-white hover:text-neutralBlack focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                  strength={15}
                >
                  {secondaryCta.label}
                </MagneticButton>
              </div>
            </div>
          </FadeSlide>
        </div>
      </div>

      {/* Accessibility: Screen reader description */}
      <div className="sr-only">
        Hero section with background video showing {headline}. {subcopy}
      </div>
    </section>
  );
};

export default Hero; 