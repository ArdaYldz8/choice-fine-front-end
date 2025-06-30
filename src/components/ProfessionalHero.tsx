import React from 'react';

export default function ProfessionalHero() {
  return (
    <div className="relative bg-gradient-to-br from-primaryBlue via-neutralBlack to-primaryBlue text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accentRed rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primaryBlue rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative container-custom py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Our Premium <span className="text-accentRed">Products</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            Discover our extensive collection of authentic Mediterranean and Middle Eastern products, 
            carefully selected for quality and taste.
          </p>
        </div>
      </div>
    </div>
  );
} 