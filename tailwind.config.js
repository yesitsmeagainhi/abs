// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}" // optional if you're using markdown/mdx
  ],
  theme: {
    extend: {
      // Add responsive breakpoints
      screens: {
        'xs': '475px', // Extra small devices (large phones)
        // sm: '640px', // Small devices (default)
        // md: '768px', // Medium devices (default)
        // lg: '1024px', // Large devices (default)
        // xl: '1280px', // Extra large devices (default)
        // 2xl: '1536px', // 2X Extra large devices (default)
      },
      
      // Add touch-friendly sizing
      minHeight: {
        'touch': '44px', // Minimum touch target size for mobile
        'touch-lg': '48px', // Larger touch target for better accessibility
      },
      
      // Add safe area utilities for notched devices
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      
      // Add responsive font sizes
      fontSize: {
        'xs-mobile': ['0.75rem', { lineHeight: '1rem' }],
        'sm-mobile': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-mobile': ['1rem', { lineHeight: '1.5rem' }],
        'lg-mobile': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      
      // Add container max widths for better responsive design
      maxWidth: {
        'container-xs': '20rem',    // 320px
        'container-sm': '24rem',    // 384px
        'container-md': '28rem',    // 448px
        'container-lg': '32rem',    // 512px
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 👈 THIS LINE IS REQUIRED
    
    // Add custom utilities for responsive design
    function({ addUtilities, addComponents }) {
      const newUtilities = {
        // Safe area utilities for devices with notches
        '.safe-area-inset-bottom': {
          'padding-bottom': 'max(0.75rem, env(safe-area-inset-bottom))',
        },
        '.safe-area-inset-top': {
          'padding-top': 'max(1rem, env(safe-area-inset-top))',
        },
        '.safe-area-inset': {
          'padding-top': 'max(1rem, env(safe-area-inset-top))',
          'padding-bottom': 'max(0.75rem, env(safe-area-inset-bottom))',
          'padding-left': 'max(1rem, env(safe-area-inset-left))',
          'padding-right': 'max(1rem, env(safe-area-inset-right))',
        },
        
        // Touch-friendly utilities
        '.touch-target': {
          'min-height': '44px',
          'min-width': '44px',
        },
        '.touch-target-lg': {
          'min-height': '48px',
          'min-width': '48px',
        },
        
        // Prevent horizontal scroll utilities
        '.no-scroll-x': {
          'overflow-x': 'hidden',
          'width': '100%',
          'position': 'relative',
        },
        
        // Mobile-optimized text rendering
        '.text-rendering-optimized': {
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
          'text-rendering': 'optimizeLegibility',
        },
        
        // Remove tap highlights on touch devices
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
        },
      }
      
      const newComponents = {
        // Responsive container component
        '.container-responsive': {
          'width': '100%',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-left': '1rem',
          'padding-right': '1rem',
          '@screen sm': {
            'max-width': '640px',
            'padding-left': '1.5rem',
            'padding-right': '1.5rem',
          },
          '@screen md': {
            'max-width': '768px',
            'padding-left': '2rem',
            'padding-right': '2rem',
          },
          '@screen lg': {
            'max-width': '1024px',
          },
          '@screen xl': {
            'max-width': '1280px',
          },
          '@screen 2xl': {
            'max-width': '1536px',
          },
        },
        
        // Mobile-first button component
        '.btn-responsive': {
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': '0.5rem',
          'padding': '0.75rem 1rem',
          'font-weight': '500',
          'border-radius': '0.5rem',
          'transition': 'all 150ms ease',
          'min-height': '44px',
          'min-width': '44px',
          '@screen sm': {
            'padding': '0.75rem 1.5rem',
            'gap': '0.75rem',
          },
        },
        
        // Responsive modal component
        '.modal-responsive': {
          'width': '100%',
          'max-width': '28rem',
          'margin': '1rem',
          'max-height': 'calc(100vh - 2rem)',
          'overflow-y': 'auto',
          '@screen xs': {
            'margin': '0.5rem',
            'max-height': 'calc(100vh - 1rem)',
            'max-width': 'calc(100vw - 1rem)',
          },
        },
      }
      
      addUtilities(newUtilities)
      addComponents(newComponents)
    }
  ],
}