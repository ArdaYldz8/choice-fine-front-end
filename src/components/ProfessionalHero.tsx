import React from 'react';
import { Award, Clock, Globe, Shield } from 'lucide-react';

export default function ProfessionalHero() {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-yellow-400" />
              <span className="text-yellow-400 font-medium">Est. 2010 • Premium Quality</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Mediterranean Excellence
              <span className="text-yellow-400"> Delivered</span>
            </h1>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Your trusted source for authentic Mediterranean & Middle Eastern products. 
              From traditional spices to artisanal delicacies, we bring the finest flavors 
              from across the Mediterranean directly to your business.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Globe className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm text-blue-200">Countries</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-blue-200">Products</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold">24h</div>
                <div className="text-sm text-blue-200">Delivery</div>
              </div>
              
              <div className="text-center">
                <div className="bg-white/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-8 w-8 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm text-blue-200">Authentic</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-serif font-bold mb-6">Why Choose Choice Foods?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-100">Direct partnerships with Mediterranean producers</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-100">Temperature-controlled logistics & storage</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-100">Competitive wholesale pricing for businesses</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-blue-100">Expert culinary consultation & support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 