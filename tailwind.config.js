/** @type {import('tailwindcss').Config} */
const DEFAULT_FONTS = [
  'system-ui',
  '-apple-system',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
]

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        muted: '#D9D8D6',
        silver: '#C2C2C2',
        slate: '#767A8A',
        main: '#432fff',
        navbg: '#e7ecfa',
      },

      fontFamily: {
        default: [...DEFAULT_FONTS],
      },
      backgroundImage: {
        'ts-logo': 'url("/img/logo.png")',
        'notice': 'url("/img/notice_bg.png")',
        'chat-layout': 'linear-gradient(to top right, #ddebfe,#fefeff)',
        'siderbar': 'linear-gradient(to top, #f2f7ff,#f6f8ff)',
        'navitem-actived': 'linear-gradient(to right, #e2e6ff,#f2f6ff)',
        'ai-draw': 'url("/img/ai_draw_bg.png")',
        'login': 'url("/img/login_bg.jpg")',
      },
    },
  },
  plugins: [],
}
