import React, { useEffect, useRef, useState } from 'react';

interface FadeSlideProps {
  children: React.ReactNode;
  offset?: number;
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeSlide: React.FC<FadeSlideProps> = ({
  children,
  offset = 25,
  duration = 400,
  delay = 0,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create intersection observer with grouped observers optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
            // Unobserve after animation to improve performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasAnimated]);

  const animationStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${offset}px)`,
    transition: `opacity ${duration}ms var(--ease-out), transform ${duration}ms var(--ease-out)`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default FadeSlide; 