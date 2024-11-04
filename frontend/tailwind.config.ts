import type { Config } from "tailwindcss"
import landingImg from './public/icons/landingImage.png'
const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    "./constants/**/*.{ts,tsx}",
	],
  prefix: "",
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		backgroundImage: {
  			'custom-gradient': 'linear-gradient(90deg, rgba(253, 251, 251, 0.325) 0%, rgba(235, 237, 238, 0.52) 100%)',
  			'custom-radial': 'linear-gradient(to right, #FDFBFB 32.5%, #EBEDEE 52%);',
  			"hero-image": "url('/icons/new-hero-image.png')",
  			"about-us": "url('/icons/development-opportunity-strategy-improvement-word.png')",
  			"hero-image-bitsi-coin": "url('/icons/image_hero_coin.png')",
  			"custom-radial-gradient": "radial-gradient(#D7C7A4 100%, #FFE340 100%)",
  			"bitsi-nft": "url('/icons/nft-bg.png')",
  			"temp-img": "url('/icons/nft-img-3.png')",
  			"gen-nft": "url('/icons/generate-nft-bg.png')",
  			"nft-head": "url('/icons/nft-img-bits-nft.png')",
  			"hero-insurance": "url('/icons/Hero-Insurance.png')",
  			"hero-bitsi-coin": "url('/icons/hero-bitsi-coin.jpg')",
  			'nft-text-gradient': 'linear-gradient(26deg, #FFE259 0%, #FFA751 100%)',
  			'AI-gradient': 'linear-gradient(to right, #9796F0, #FBC7D4)',
  			"kyc-auth": "url('/icons/kyc-auth1.png')"
  		},
  		screens: {
  			'custom-md': '730px',
  			'custom-lg': '1035px',
  			'custom-md1': '780px',
  			'custom-sm': '360px',
  			'custom-xsxl': '2500px',
  			'custom-2xl': '1770px'
  		},
  		opacity: {
  			'66': '0.66'
  		},
  		fontFamily: {
  			inter: 'var(--font-inter)',
  			'moon-dance': 'var(--font-moon-dance)',
  			'montserrat': 'var(--font-montserrat)',
  			'manrope': 'var(--font-manrope)',
  			'poppins': 'var(--font-poppins)',
  			'mulish': 'var(--font-mulish)',
  			'poller-one': 'var(--font-poller-one)'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			success: {
  				'500': '#083538',
  				'501': '#FDFBFB',
  				'502': '#EBEDEE',
  				'503': '#083538',
  				'504': '#D7C7A4',
  				'505': '#FFE340',
  				'506': '#FBE04C',
  				'507': '#1d4649',
  				'508': '#F6AB24',
  				'509': '#6C8688',
  				'510': '#083538',
  				'511': '#FFB622',
  				'512': '#1D4649',
  				'513': '#E8AC25',
  				'514': '#FFFFFF',
  				'515': ' #EED76C',
  				'516': '#F8F7F4',
  				'517': '#F63162',
  				'518': '#1D4649',
  				'519': '#F8F7F4',
  				'520': '#D9EEFF',
  				'521': '#D9D9D9',
  				'522': '#894DC5',
  				'523': '#121921',
  				'524': '#262d34',
  				'525': '#FE5C01',
  				'526': '#7C7C7C',
  				'527': '#B1B1B1',
  				'528': '#355D96',
  				'529': '#8C8C8C',
  				'530': '#FF0000',
  				'531': '#00F260',
  				'532': '#5B5B5B',
  				'533': '#D63B30',
  				'534': '#0D0D2B',
          '535': '#172765',
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			// 'accordion-down': {
  			// 	from: {
  			// 		height: '0'
  			// 	},
  			// 	to: {
  			// 		height: 'var(--radix-accordion-content-height)'
  			// 	}
  			// },
  			// 'accordion-up': {
  			// 	from: {
  			// 		height: 'var(--radix-accordion-content-height)'
  			// 	},
  			// 	to: {
  			// 		height: '0'
  			// 	}
  			// },
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			// 'accordion-down': 'accordion-down 0.2s ease-out',
  			// 'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate") , require('tailwind-scrollbar'),],
} satisfies Config

export default config