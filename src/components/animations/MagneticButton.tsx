import React, { useRef, useEffect, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 20,
  disabled = false,
  onClick,
  href,
  type = 'button',
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHoverEnabled, setIsHoverEnabled] = useState(false);

  useEffect(() => {
    // Detect if device supports hover (desktop)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    setIsHoverEnabled(supportsHover);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isHoverEnabled || disabled) return;

    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(rect.width * rect.width + rect.height * rect.height) / 2;
    
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    const magneticStrength = strength * (1 - normalizedDistance);
    
    const moveX = (deltaX / maxDistance) * magneticStrength;
    const moveY = (deltaY / maxDistance) * magneticStrength;
    
    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
  };

  const handleMouseLeave = () => {
    if (!isHoverEnabled || disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    button.style.transform = 'translate(0px, 0px)';
  };

  const handleTouchStart = () => {
    if (isHoverEnabled || disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    button.style.transform = 'scale(0.98)';
  };

  const handleTouchEnd = () => {
    if (isHoverEnabled || disabled) return;
    
    const button = buttonRef.current;
    if (!button) return;
    
    button.style.transform = 'scale(1)';
  };

  const commonProps = {
    ref: buttonRef as any,
    className: `transition-transform duration-300 ease-out will-change-transform ${
      !isHoverEnabled ? 'active:scale-98' : ''
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    disabled,
  };

  if (href && !disabled) {
    return (
      <a
        {...commonProps}
        href={href}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default MagneticButton; 