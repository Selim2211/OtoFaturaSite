/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Zemin katmanları — çok koyu lacivert-siyah
        void: {
          DEFAULT: '#050B18',
          panel: '#0A1526',
          elevated: '#0D1B36',
        },
        // Yapısal mavi (buton/gradient iskeleti)
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
        },
        // Tek imza ışık rengi — elektrik camgöbeği
        signal: {
          DEFAULT: '#38E1FF',
          soft: '#8EEBFF',
          dim: '#1B9FC2',
        },
        ink: {
          50:  '#F3F7FF',
          300: '#B7C6E6',
          400: '#8FA3C7',
          500: '#6B7FA3',
        },
      },
      fontFamily: {
        display: ['"Exo 2"', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(56,225,255,0.16), 0 20px 60px -20px rgba(56,225,255,0.35)',
        'glow-sm': '0 0 24px -6px rgba(56,225,255,0.5)',
        panel: '0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.6)',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'aurora-1': 'aurora1 18s ease-in-out infinite',
        'aurora-2': 'aurora2 22s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3.4s ease-in-out infinite',
        'grid-pan': 'gridPan 30s linear infinite',
        'holo-spin': 'holoSpin 6s linear infinite',
        scanline: 'scanline 2.2s ease-in-out infinite',
        'scan-sweep': 'scanSweep 3.4s ease-in-out infinite',
        'row-scan': 'rowScan 3.4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        aurora1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate(6%, -8%) scale(1.25)', opacity: '0.8' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1.1)', opacity: '0.4' },
          '50%': { transform: 'translate(-8%, 6%) scale(0.9)', opacity: '0.7' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '60px 60px' },
        },
        holoSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        scanline: {
          '0%, 100%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        scanSweep: {
          '0%, 100%': { top: '8%' },
          '50%': { top: '86%' },
        },
        rowScan: {
          '0%, 100%': { opacity: '0.25' },
          '46%, 54%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
