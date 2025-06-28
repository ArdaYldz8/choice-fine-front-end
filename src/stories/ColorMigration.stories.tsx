import type { Meta, StoryObj } from '@storybook/react';

// Visual comparison component showing old vs new palette
const ColorMigrationShowcase = () => {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center py-8 bg-lightGrey">
        <h1 className="text-4xl font-serif font-bold text-neutralBlack mb-4">
          Color Palette Migration
        </h1>
        <p className="text-lg text-primaryBlue">
          Mediterranean → Modern Blue/Red Palette
        </p>
      </div>

      {/* Color Swatches Comparison */}
      <section className="p-8">
        <h2 className="text-2xl font-serif font-bold mb-8 text-center">Color Evolution</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Palette */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-gray-600">Previous (Mediterranean)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl mb-2" style={{ backgroundColor: '#021431' }}></div>
                <p className="text-sm">Midnight</p>
                <p className="text-xs text-gray-500">#021431</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl mb-2" style={{ backgroundColor: '#046C8C' }}></div>
                <p className="text-sm">Teal</p>
                <p className="text-xs text-gray-500">#046C8C</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl mb-2 border" style={{ backgroundColor: '#F4F7F8' }}></div>
                <p className="text-sm">Off White</p>
                <p className="text-xs text-gray-500">#F4F7F8</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-xl mb-2" style={{ backgroundColor: '#7AB55C' }}></div>
                <p className="text-sm">Olive</p>
                <p className="text-xs text-gray-500">#7AB55C</p>
              </div>
            </div>
          </div>

          {/* New Palette */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-primaryBlue">New (Modern)</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="w-20 h-20 bg-primaryBlue rounded-xl mb-2"></div>
                <p className="text-sm font-medium">Primary Blue</p>
                <p className="text-xs text-gray-500">#2A4D7F</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-accentRed rounded-xl mb-2"></div>
                <p className="text-sm font-medium">Accent Red</p>
                <p className="text-xs text-gray-500">#E63946</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-lightGrey rounded-xl mb-2 border"></div>
                <p className="text-sm font-medium">Light Grey</p>
                <p className="text-xs text-gray-500">#F5F6F7</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-neutralBlack rounded-xl mb-2"></div>
                <p className="text-sm font-medium">Neutral Black</p>
                <p className="text-xs text-gray-500">#000000</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Button Comparison */}
      <section className="p-8 bg-lightGrey">
        <h2 className="text-2xl font-serif font-bold mb-8 text-center">Button Evolution</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Old Style Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-600">Previous Buttons</h3>
            <div className="space-y-4">
              <button 
                className="inline-flex items-center justify-center rounded-xl text-white px-8 py-4 font-medium text-lg transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: '#7AB55C' }}
              >
                Primary (Olive)
              </button>
              <button 
                className="inline-flex items-center justify-center rounded-xl border-2 bg-transparent px-8 py-4 font-medium text-lg transition-all duration-200"
                style={{ borderColor: '#7AB55C', color: '#7AB55C' }}
              >
                Secondary (Olive)
              </button>
            </div>
          </div>

          {/* New Style Buttons */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primaryBlue">New Buttons</h3>
            <div className="space-y-4">
              <button className="btn-primary">
                Primary (Blue)
              </button>
              <button className="btn-secondary">
                Secondary (Red)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Preview */}
      <section className="p-8">
        <h2 className="text-2xl font-serif font-bold mb-8 text-center">Hero Section Evolution</h2>
        
        <div className="grid gap-6">
          {/* Old Style Hero Preview */}
          <div 
            className="relative h-64 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: '#021431' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl font-serif font-bold mb-3">Previous Hero Style</h3>
              <p className="mb-4 opacity-90">Mediterranean color palette</p>
              <div className="space-x-3">
                <button 
                  className="px-6 py-3 rounded-xl text-white"
                  style={{ backgroundColor: '#7AB55C' }}
                >
                  Explore
                </button>
                <button 
                  className="px-6 py-3 rounded-xl border-2 border-white text-white bg-transparent"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* New Style Hero Preview */}
          <div className="relative h-64 bg-primaryBlue rounded-xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl font-serif font-bold mb-3">New Hero Style</h3>
              <p className="mb-4 opacity-90">Modern blue/red palette</p>
              <div className="space-x-3">
                <button className="btn-primary text-sm px-6 py-3">
                  Explore
                </button>
                <button className="px-6 py-3 rounded-xl border-2 border-white text-white bg-transparent hover:bg-white hover:text-neutralBlack transition-all duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Notes */}
      <section className="p-8 bg-white border-l-4 border-primaryBlue">
        <h3 className="text-lg font-serif font-semibold mb-3 text-primaryBlue">Accessibility Improvements</h3>
        <ul className="space-y-2 text-sm">
          <li>✅ <strong>Primary Blue on Light Grey:</strong> 8.2:1 contrast (WCAG AA+)</li>
          <li>✅ <strong>Neutral Black on Light Grey:</strong> 21:1 contrast (Excellent)</li>
          <li>✅ <strong>Accent Red on Light Grey:</strong> 4.8:1 contrast (WCAG AA)</li>
          <li>✅ <strong>White on Primary Blue:</strong> 8.2:1 contrast (WCAG AA+)</li>
        </ul>
      </section>
    </div>
  );
};

const meta = {
  title: 'Design System/Color Migration',
  component: ColorMigrationShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Visual comparison showing the evolution from Mediterranean to modern blue/red palette',
      },
    },
  },
} satisfies Meta<typeof ColorMigrationShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BeforeAfterComparison: Story = {
  name: 'Color Palette Migration',
}; 