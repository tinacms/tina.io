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
      md: [
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
          lineHeight: '1',
        },
      ],
      '6xl': [
        '60px',
        {
          lineHeight: '1',
        },
      ],
      '7xl': [
        '72px',
        {
          lineHeight: '1',
        },
      ],
      '8xl': [
        '96px',
        {
          lineHeight: '1',
        },
      ],
      '9xl': [
        '128px',
        {
          lineHeight: '1',
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
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
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
      },
      animation: {
        jelly: 'jelly 0.6s ease',
        jump: 'jump 0.6s ease',
        'slide-in': 'slideIn 200ms ease-out 1',
        'pop-in': 'popIn 0.5s ease-out forwards',
        marquee: 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(20, 70, 150, 0.05)',
        DEFAULT:
          '0 1px 3px 0 rgb(20 70 150 / 0.07), 0 2px 6px -1px rgb(20 70 150 / 0.07)',
        lg: '0 10px 15px -3px rgb(20 70 150 / 0.1), 0 4px 6px -4px rgb(20 70 150 / 0.1)',
        panel:
          '6px 4px 16px rgba(0,132,255, 0.07), 10px 8px 32px rgba(0,132,255, 0.07), 18px 16px 64px rgba(0,132,255, 0.1)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      },
      dropShadow: {
        sm: '0 1px 1px rgb(20 70 150 / 0.05)',
      },
      colors: {
        seafoam: {
          50: '#EEFDF9',
          100: '#E9FBF4',
          150: '#C1F5EB',
          200: '#CFF5E6',
          300: '#B4EFD9',
          400: '#99E9CB',
          500: '#93E9BE',
          600: '#72C39B',
          700: '#529C7B',
          800: '#39745C',
          900: '#214C3D',
          950: '#122A21',
        },
        blue: {
          50: '#DCEEFF',
          100: '#B4DBFF',
          200: '#85C5FE',
          300: '#4EABFE',
          400: '#2296FE',
          500: '#0084FF',
          600: '#0574E4',
          700: '#0D5DBD',
          800: '#144696',
          900: '#1D2C6C',
          950: '#241748',
          1000: '#0D5DBD',
        },
        orange: {
          50: '#FFF8F3',
          100: '#FFEDE4',
          200: '#FFD3C1',
          300: '#FFAB8B',
          400: '#FF724B',
          500: '#EC4815',
          600: '#D13F13',
          700: '#A5310F',
          800: '#7A230B',
          900: '#4C1507',
          950: '#2F0D04',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        tuner: ['tuner-medium', ...defaultTheme.fontFamily.sans],
        'tuner-regular': ['tuner-regular', ...defaultTheme.fontFamily.sans],
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
        'blob-bg':
          "url(\"data:image/svg+xml,%3Csvg preserveAspectRatio='none' viewBox='0 0 194 109' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_566_318)'%3E%3Crect width='194' height='109' fill='white' /%3E%3Cmask id='mask0_566_318' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='194' height='109'%3E%3Crect width='194' height='109' fill='url(%23paint0_linear_566_318)' /%3E%3C/mask%3E%3Cg mask='url(%23mask0_566_318)'%3E%3Crect width='194' height='109' fill='url(%23paint1_linear_566_318)' /%3E%3C/g%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_566_318' x1='97' y1='0' x2='97' y2='109' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%23D9D9D9' stop-opacity='0.45' /%3E%3Cstop offset='0.229052' stop-color='%23D9D9D9' stop-opacity='0.1678' /%3E%3Cstop offset='0.677779' stop-color='%23D9D9D9' stop-opacity='0.0513' /%3E%3Cstop offset='1' stop-color='%23D9D9D9' stop-opacity='0' /%3E%3C/linearGradient%3E%3ClinearGradient id='paint1_linear_566_318' x1='0' y1='54.5' x2='194' y2='54.5' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='%2353E9DD' /%3E%3Cstop offset='0.34375' stop-color='%2368D7E4' /%3E%3Cstop offset='0.59375' stop-color='%2359BFF2' /%3E%3Cstop offset='1' stop-color='%234BA8FF' /%3E%3C/linearGradient%3E%3CclipPath id='clip0_566_318'%3E%3Crect width='194' height='109' fill='white' /%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E\")",
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
  safelist: ['font-tuner'],
};
