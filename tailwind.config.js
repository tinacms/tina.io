/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  theme: {
    spacing: {
      0: '0px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      14: '56px',
      16: '64px',
      18: '72px',
      20: '80px',
      24: '96px',
      28: '114px',
      32: '128px',
      36: '144px',
      40: '160px',
      44: '176px',
      48: '192px',
      52: '208px',
      56: '224px',
      60: '240px',
      64: '256px',
      72: '288px',
      80: '320px',
      96: '384px',
      px: '1px',
      0.5: '2px',
      1.5: '6px',
      2.5: '10px',
      3.5: '14px',
    },
    borderRadius: {
      none: '0px',
      sm: '2px',
      DEFAULT: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px',
      '2xl': '16px',
      '3xl': '24px',
      full: '9999px',
    },
    borderWidth: {
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
      DEFAULT: '1px',
    },
    fontSize: {
      xxs: [
        '10px',
        {
          lineHeight: '1.2',
        },
      ],
      xs: [
        '13px',
        {
          lineHeight: '1.33',
        },
      ],
      sm: [
        '14px',
        {
          lineHeight: '1.43',
        },
      ],
      base: [
        '16px',
        {
          lineHeight: '1.5',
        },
      ],
      lg: [
        '18px',
        {
          lineHeight: '1.55',
        },
      ],
      xl: [
        '20px',
        {
          lineHeight: '1.4',
        },
      ],
      '2xl': [
        '24px',
        {
          lineHeight: '1.33',
        },
      ],
      '3xl': [
        '30px',
        {
          lineHeight: '1.2',
        },
      ],
      '4xl': [
        '36px',
        {
          lineHeight: '1.1',
        },
      ],
      '5xl': [
        '48px',
        {
          lineHeight: 'normal',
        },
      ],
      '6xl': [
        '60px',
        {
          lineHeight: 'normal',
        },
      ],
      '7xl': [
        '72px',
        {
          lineHeight: 'normal',
        },
      ],
      '8xl': [
        '96px',
        {
          lineHeight: 'normal',
        },
      ],
      '9xl': [
        '128px',
        {
          lineHeight: 'normal',
        },
      ],
    },
    opacity: {
      0: '0',
      5: '.05',
      7: '.07',
      10: '.1',
      15: '.15',
      20: '.2',
      25: '.25',
      30: '.3',
      40: '.4',
      50: '.5',
      60: '.6',
      70: '.7',
      75: '.75',
      80: '.8',
      90: '.9',
      100: '1',
    },
    extend: {
      keyframes: {
        jelly: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '25%': { transform: 'scale(1.1, 0.9)' },
          '50%': { transform: 'scale(0.9, 1.1)' },
          '75%': { transform: 'scale(1.05, 0.95)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '5%': { transform: 'translateY(-15px)' },
          '15%': { transform: 'translateY(-25px)' },
          '20%': { transform: 'translateY(-30px)' },
          '30%': { transform: 'translateY(-23px)' },
          '40%': { transform: 'translateY(-15px)' },
          '50%': { transform: 'translateY(-0px)' },
          '60%': { transform: 'translateY(0px) scale(1.1, 0.9)' },
          '65%': { transform: 'translateY(0px) scale(1.3, 0.7)' },
          '70%': { transform: 'translateY(-4px) scale(1, 1.2)' },
          '80%': { transform: 'translateY(-3px) scale(1.1, 1)' },
          '90%': { transform: 'translateY(-1px) scale(1.05, 0.95)' },
          '100%': { transform: 'translateY(0px)' },
        },
        slideIn: {
          '0%': {
            transform: 'translate3d(0,-100%,0)',
          },
          '100%': {
            transform: 'translate3d(0,0,0)',
          },
        },
        popIn: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.75)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          from: {
            transform: 'translateY(0)',
          },
          to: {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
        slideDown: {
          '0%': {
            maxHeight: '0',
            opacity: '0',
          },
          '100%': {
            maxHeight: '500px',
            opacity: '1',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'row-in': {
          from: { opacity: '0', transform: 'translateY(0.125rem)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-0.75rem)' },
        },
      },
      animation: {
        jelly: 'jelly 0.6s ease',
        bounce: 'bounce 0.5s ease-in-out',
        'slide-in': 'slideIn 200ms ease-out 1',
        'pop-in': 'popIn 0.5s ease-out forwards',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'slide-down': 'slideDown 500ms ease-out',
        shimmer: 'shimmer 1.6s ease-in-out infinite',
        'row-in': 'row-in 240ms ease-out both',
        bob: 'bob 5s ease-in-out infinite',
      },
      backgroundSize: {
        skeleton: '200% 100%',
      },
      // Elevation shadows point at --elevation-* in app/global.css, so dark
      // mode can turn them off (shadows don't read on dark). xs and outline are edges and focus
      // states, not elevation, and stay as they are; the input rings read
      // the field tokens.
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        sm: 'var(--elevation-sm)',
        DEFAULT: 'var(--elevation)',
        md: 'var(--elevation-md)',
        lg: 'var(--elevation-lg)',
        xl: 'var(--elevation-xl)',
        '2xl': 'var(--elevation-2xl)',
        panel: 'var(--elevation-panel)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        input: 'var(--field-shadow)',
        'input-hover': 'var(--field-shadow-hover)',
        'input-focus': 'var(--field-shadow-focus)',
      },
      dropShadow: {
        sm: '0 1px 1px rgb(20 70 150 / 0.05)',
      },
      colors: {
        'brand-primary': 'var(--brand-primary)',
        'brand-primary-hover': 'var(--brand-primary-hover)',
        'brand-primary-light': 'var(--brand-primary-light)',
        'brand-primary-text': 'var(--brand-primary-text)',
        'brand-primary-contrast': 'var(--brand-primary-contrast)',

        'brand-secondary': 'var(--brand-secondary)',
        'brand-secondary-hover': 'var(--brand-secondary-hover)',
        'brand-secondary-light': 'var(--brand-secondary-light)',
        'brand-secondary-text': 'var(--brand-secondary-text)',
        'brand-secondary-contrast': 'var(--brand-secondary-contrast)',

        'brand-secondary-gradient-start':
          'var(--brand-secondary-gradient-start)',
        'brand-secondary-gradient-end': 'var(--brand-secondary-gradient-end)',

        // Background gradients and glass
        'glass-gradient-start': 'var(--glass-gradient-start)',
        'glass-gradient-end': 'var(--glass-gradient-end)',
        'background-color': 'var(--background-color)',
        'glass-hover-gradient-start': 'var(--glass-hover-gradient-start)',
        'glass-hover-gradient-end': 'var(--glass-hover-gradient-end)',

        // Neutral system
        'neutral-background': 'var(--neutral-background)',
        'neutral-surface': 'var(--neutral-surface)',
        'neutral-background-secondary': 'var(--neutral-background-secondary)',
        'neutral-background-tertiary': 'var(--neutral-background-tertiary)',
        'neutral-background-quaternary': 'var(--neutral-background-quaternary)',
        'neutral-background-quinary': 'var(--neutral-background-quinary)',

        // Semantic type colours — what the type roles in
        // components/styles/typography.ts are allowed to name.
        // `heading` is a gradient, so it is a utility in styles/tailwind.css
        // rather than a flat colour here.
        strong: 'var(--text-strong)',
        body: 'var(--text-body)',
        subtle: 'var(--text-subtle)',
        label: 'var(--text-label)',
        link: 'var(--text-link)',
        'link-hover': 'var(--text-link-hover)',
        'neutral-border': 'var(--neutral-border)',
        'neutral-border-subtle': 'var(--neutral-border-subtle)',
        selected: 'var(--border-selected)',

        // Code Block Background
        'background-brand-code': 'var(--background-brand-code)',
        seafoam: {
          50: 'var(--seafoam-50)',
          100: 'var(--seafoam-100)',
          150: 'var(--seafoam-150)',
          200: 'var(--seafoam-200)',
          300: 'var(--seafoam-300)',
          400: 'var(--seafoam-400)',
          500: 'var(--seafoam-500)',
          700: 'var(--seafoam-700)',
        },
        blue: {
          50: 'var(--blue-50)',
          100: 'var(--blue-100)',
          200: 'var(--blue-200)',
          300: 'var(--blue-300)',
          400: 'var(--blue-400)',
          500: 'var(--blue-500)',
          600: 'var(--blue-600)',
          700: 'var(--blue-700)',
          800: 'var(--blue-800)',
          900: 'var(--blue-900)',
        },
        orange: {
          50: 'var(--orange-50)',
          100: 'var(--orange-100)',
          200: 'var(--orange-200)',
          300: 'var(--orange-300)',
          400: 'var(--orange-400)',
          500: 'var(--orange-500)',
          600: 'var(--orange-600)',
          700: 'var(--orange-700)',
          800: 'var(--orange-800)',
          900: 'var(--orange-900)',
        },
        success: 'var(--green-500)',
        warning: 'var(--amber-500)',
        error: 'var(--red-500)',
        background: 'var(--background)',
        // Default text colour follows the body token rather than shadcn's own
        // --foreground, so unstyled text reads as body copy, not heading ink.
        foreground: 'var(--text-body)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        'ibm-plex': ['IBMPlexSans-SemiBold', ...defaultTheme.fontFamily.sans],
        'ibm-plex-medium': [
          'IBMPlexSans-Medium',
          ...defaultTheme.fontFamily.sans,
        ],
        // Code and technical labels. Matches --font-mono in app/global.css.
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      gridTemplateColumns: {
        'auto-sm': 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-lg': 'repeat(auto-fit, minmax(400px, 1fr))',
      },
      zIndex: {
        '-1': '-1',
      },
      maxHeight: {
        '50vh': '50vh',
      },
      backgroundImage: {
        'skeleton-shimmer':
          'linear-gradient(90deg, rgba(17,24,39,0.06) 0%, rgba(17,24,39,0.12) 50%, rgba(17,24,39,0.06) 100%)',
        'blob-bg': 'var(--surface-page-wash)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animated'),
    require('tailwindcss-animate'),
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Legacy Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // All reusable components
    './app/**/*.{js,ts,jsx,tsx}', // App Router files
    './app/**/**/*.{js,ts,jsx,tsx}', // Nested components in app/
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['font-ibm-plex-semibold'],
};
