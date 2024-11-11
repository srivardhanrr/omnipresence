import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        'purple-deep': '#30186f',
        'pink-bright': '#e55bac',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(45deg, #30186f 0%, #e55bac 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #30186f 0%, #e55bac 100%)',
      },
      animation: {
        'gradient-shift': 'gradient-shift 3s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      }
    }
  },

  plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
