import tailwindForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'kumbh-sans': ['var(--font-kumbh-sans)'],
			},
			transitionProperty: {
				height: 'height',
			},
			container: {
				center: true,
				padding: '1rem',
			},
			colors: {
				dark: '#181818',
			},
		},
	},
	plugins: [tailwindForms],
} satisfies Config;
