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
      fontFamily: {
        default: [...DEFAULT_FONTS],
      },
      backgroundImage: {
        'ts-logo': 'url("/img/logo.png")',
        'notice': 'url("/img/notice_bg.png")',
        'chat-layout': 'linear-gradient(to top right, #ddebfe,#fefeff)',
        'siderbar': 'linear-gradient(to top, #f2f7ff,#f6f8ff)',
        'navitem-actived': 'linear-gradient(to right, #e2e6ff,#f2f6ff)',
      },
    },
  },
  plugins: [],
}
