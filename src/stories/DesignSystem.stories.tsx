import type { Meta, StoryObj } from '@storybook/react';

// Design System showcase component
const DesignSystemShowcase = () => {
  return (
    <div className="p-8 space-y-12">
      {/* Colors */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-24 h-24 bg-primaryBlue rounded-xl mb-2"></div>
            <p className="text-sm font-medium">Primary Blue</p>
            <p className="text-xs text-gray-500">#2A4D7F</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-accentRed rounded-xl mb-2"></div>
            <p className="text-sm font-medium">Accent Red</p>
            <p className="text-xs text-gray-500">#E63946</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-neutralBlack rounded-xl mb-2"></div>
            <p className="text-sm font-medium">Neutral Black</p>
            <p className="text-xs text-gray-500">#000000</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-lightGrey rounded-xl mb-2 border"></div>
            <p className="text-sm font-medium">Light Grey</p>
            <p className="text-xs text-gray-500">#F5F6F7</p>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Typography</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Headings (Playfair Display)</h3>
            <h1 className="text-6xl font-serif font-bold">Hero Headline</h1>
            <h2 className="text-4xl font-serif font-bold">Section Title</h2>
            <h3 className="text-2xl font-serif font-semibold">Subsection</h3>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Body Text (Inter)</h3>
            <p className="text-lg font-sans">Large body text for hero descriptions</p>
            <p className="text-base font-sans">Regular body text for content</p>
            <p className="text-sm font-sans">Small text for captions and labels</p>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Button Styles</h2>
        <div className="flex flex-wrap gap-4">
          <button className="btn-primary">Primary Button</button>
          <button className="btn-secondary">Secondary Button</button>
          <button className="btn-outline">Outline Button</button>
        </div>
      </section>

      {/* Shadows & Elevation */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Shadows & Elevation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow-elevation">
            <h3 className="font-serif font-semibold mb-2">Soft Shadow</h3>
            <p className="text-sm text-gray-600">Default card elevation</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-card-hover">
            <h3 className="font-serif font-semibold mb-2">Medium Shadow</h3>
            <p className="text-sm text-gray-600">Hover state elevation</p>
          </div>
          <div className="p-6 bg-white rounded-xl" style={{ boxShadow: 'var(--shadow-strong)' }}>
            <h3 className="font-serif font-semibold mb-2">Strong Shadow</h3>
            <p className="text-sm text-gray-600">Focus state elevation</p>
          </div>
        </div>
      </section>

      {/* Spacing Scale */}
      <section>
        <h2 className="text-2xl font-serif font-bold mb-6">Spacing Scale</h2>
        <div className="space-y-2">
          {[1, 2, 3, 4, 6, 8, 12, 16, 24, 32].map((space) => (
            <div key={space} className="flex items-center gap-4">
              <div className={`bg-primaryBlue h-4 w-${space}`}></div>
              <span className="text-sm font-mono">space-{space}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const meta = {
  title: 'Design System/Tokens',
  component: DesignSystemShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Choice Fine Foods design system tokens and base styles',
      },
    },
  },
} satisfies Meta<typeof DesignSystemShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Design System Overview',
};

export const Colors: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-serif font-bold mb-6">Color Palette</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-primaryBlue rounded-xl mb-2"></div>
          <p className="text-sm font-medium">Primary Blue</p>
          <p className="text-xs text-gray-500">#2A4D7F</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 bg-accentRed rounded-xl mb-2"></div>
          <p className="text-sm font-medium">Accent Red</p>
          <p className="text-xs text-gray-500">#E63946</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 bg-neutralBlack rounded-xl mb-2"></div>
          <p className="text-sm font-medium">Neutral Black</p>
          <p className="text-xs text-gray-500">#000000</p>
        </div>
        <div className="text-center">
          <div className="w-24 h-24 bg-lightGrey rounded-xl mb-2 border"></div>
          <p className="text-sm font-medium">Light Grey</p>
          <p className="text-xs text-gray-500">#F5F6F7</p>
        </div>
      </div>
    </div>
  ),
};

export const Typography: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">Headings (Playfair Display)</h3>
        <h1 className="text-6xl font-serif font-bold mb-2">Hero Headline</h1>
        <h2 className="text-4xl font-serif font-bold mb-2">Section Title</h2>
        <h3 className="text-2xl font-serif font-semibold">Subsection</h3>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">Body Text (Inter)</h3>
        <p className="text-lg font-sans mb-2">Large body text for hero descriptions</p>
        <p className="text-base font-sans mb-2">Regular body text for content</p>
        <p className="text-sm font-sans">Small text for captions and labels</p>
      </div>
    </div>
  ),
};

export const Buttons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="text-2xl font-serif font-bold mb-6">Button Styles</h2>
      <div className="flex flex-wrap gap-4">
        <button className="btn-primary">Primary Button</button>
        <button className="btn-secondary">Secondary Button</button>
        <button className="btn-outline">Outline Button</button>
      </div>
    </div>
  ),
}; 