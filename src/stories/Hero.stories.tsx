import type { Meta, StoryObj } from '@storybook/react';
import Hero from '../components/Hero';

const meta = {
  title: 'Components/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-screen hero section with video background, gradient overlay, and CTA buttons. Includes FadeSlide animation and MagneticButton interactions.',
      },
    },
  },
  argTypes: {
    videoSrc: {
      control: 'text',
      description: 'URL to the background video file (MP4)',
    },
    headline: {
      control: 'text',
      description: 'Main headline text',
    },
    subcopy: {
      control: 'text',
      description: 'Supporting text below the headline',
    },
    poster: {
      control: 'text',
      description: 'Poster image URL for video fallback',
    },
    primaryCta: {
      control: 'object',
      description: 'Primary call-to-action button',
    },
    secondaryCta: {
      control: 'object',
      description: 'Secondary call-to-action button',
    },
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with sample content
export const Default: Story = {
  args: {
    videoSrc: '/sample-hero-video.mp4',
    poster: '/hero-poster.jpg',
    headline: 'Authentic Mediterranean Flavors',
    subcopy: 'Discover our premium selection of olives, oils, and gourmet ingredients sourced directly from the Mediterranean coast.',
    primaryCta: {
      label: 'Explore Products',
      href: '/products',
    },
    secondaryCta: {
      label: 'Learn More',
      href: '/about',
    },
  },
};

// Business-focused messaging
export const BusinessFocused: Story = {
  args: {
    videoSrc: '/business-hero-video.mp4',
    poster: '/business-hero-poster.jpg',
    headline: 'Wholesale Solutions for Your Business',
    subcopy: 'Partner with Choice Fine Foods for premium Mediterranean ingredients that elevate your culinary offerings.',
    primaryCta: {
      label: 'View Catalog',
      href: '/products',
    },
    secondaryCta: {
      label: 'Become a Supplier',
      href: '/supplier',
    },
  },
};

// Quality-focused messaging
export const QualityFocused: Story = {
  args: {
    videoSrc: '/quality-hero-video.mp4',
    poster: '/quality-hero-poster.jpg',
    headline: 'Exceptional Quality, Trusted Tradition',
    subcopy: 'Three generations of expertise in sourcing the finest Mediterranean products for discerning chefs and retailers.',
    primaryCta: {
      label: 'Our Story',
      href: '/about',
    },
    secondaryCta: {
      label: 'Product Quality',
      href: '/resources',
    },
  },
};

// Without video (poster only) - reduced motion fallback
export const PosterOnly: Story = {
  args: {
    videoSrc: '/sample-hero-video.mp4',
    poster: '/hero-poster-large.jpg',
    headline: 'Premium Mediterranean Ingredients',
    subcopy: 'Experience the authentic taste of the Mediterranean with our carefully curated selection of gourmet products.',
    primaryCta: {
      label: 'Shop Now',
      href: '/products',
    },
    secondaryCta: {
      label: 'Contact Us',
      href: '/contact',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This variant shows how the component appears when video is disabled or reduced motion is preferred.',
      },
    },
  },
};

// Short content variant
export const ShortContent: Story = {
  args: {
    videoSrc: '/sample-hero-video.mp4',
    poster: '/hero-poster.jpg',
    headline: 'Choice Fine Foods',
    subcopy: 'Premium Mediterranean imports',
    primaryCta: {
      label: 'Products',
      href: '/products',
    },
    secondaryCta: {
      label: 'About',
      href: '/about',
    },
  },
};

// Long content variant
export const LongContent: Story = {
  args: {
    videoSrc: '/sample-hero-video.mp4',
    poster: '/hero-poster.jpg',
    headline: 'Authentic Mediterranean Culinary Excellence for the Modern Kitchen',
    subcopy: 'From the sun-drenched groves of Greece to the historic markets of Italy, we bring you the finest selection of Mediterranean ingredients. Our commitment to quality and authenticity ensures that every product meets the highest standards expected by professional chefs and discerning food enthusiasts.',
    primaryCta: {
      label: 'Explore Our Full Collection',
      href: '/products',
    },
    secondaryCta: {
      label: 'Learn About Our Process',
      href: '/about',
    },
  },
};

// Mobile preview
export const Mobile: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Mobile view showing 60vh height and stacked CTA buttons.',
      },
    },
  },
};

// Tablet preview
export const Tablet: Story = {
  ...Default,
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Tablet view showing responsive design adjustments.',
      },
    },
  },
}; 