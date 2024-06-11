import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-Bai-Jamjuree)',
      },
      colors: {
        yellow: {
          50: '#fff7e0', // muito claro
          100: '#ffecb3', // mais claro
          200: '#ffdf80', // claro
          300: '#ffd34d', // um pouco mais claro que a base
          400: '#facf20', // cor base
          500: '#e6be1c', // um pouco mais escuro
          600: '#ccaa17', // escuro
          700: '#b38f12', // mais escuro
          800: '#99730e', // muito escuro
          900: '#806009', // mais escuro ainda
        },
      },
    },
  },
  plugins: [],
}
export default config
