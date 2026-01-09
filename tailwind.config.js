import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background scale - "Graphite"
        bg: {
          base: '#0D0D0F',
          raised: '#141417',
          elevated: '#1C1C21',
          hover: '#252529',
        },
        // Accent colors - "Amber Glow" & "Soft Teal"
        accent: {
          primary: '#E5A84B',
          'primary-hover': '#F0B85A',
          'primary-muted': 'rgba(229, 168, 75, 0.15)',
          secondary: '#4ECDC4',
          'secondary-hover': '#5FD9D1',
          'secondary-muted': 'rgba(78, 205, 196, 0.15)',
        },
        // Text scale
        text: {
          primary: '#F5F5F7',
          secondary: '#A1A1A6',
          tertiary: '#6B6B70',
          inverse: '#0D0D0F',
        },
        // Semantic colors
        success: '#34D399',
        warning: '#FBBF24',
        error: '#F87171',
        info: '#60A5FA',
        // Priority colors (temperature scale, not stoplight)
        priority: {
          high: '#E5A84B',
          medium: '#C9986A',
          low: '#78716C',
        },
        // Border colors
        border: {
          subtle: 'rgba(255, 255, 255, 0.06)',
          DEFAULT: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['Sora', ...defaultTheme.fontFamily.sans],
        mono: ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        timer: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.04em' }],
        'timer-mini': ['1.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      spacing: {
        sidebar: '260px',
        'sidebar-collapsed': '60px',
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
      },
      boxShadow: {
        'glow-amber': '0 0 24px rgba(229, 168, 75, 0.3)',
        'glow-teal': '0 0 24px rgba(78, 205, 196, 0.3)',
        elevated: '0 8px 32px rgba(0, 0, 0, 0.4)',
        modal: '0 24px 48px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'timer-pulse': 'timer-pulse 2s ease-in-out infinite',
        'check-draw': 'check-draw 0.3s ease-out forwards',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
      },
      keyframes: {
        'timer-pulse': {
          '0%, 100%': { boxShadow: '0 0 24px rgba(229, 168, 75, 0.3)' },
          '50%': { boxShadow: '0 0 36px rgba(229, 168, 75, 0.5)' },
        },
        'check-draw': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
