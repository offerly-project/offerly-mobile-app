/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{js,jsx,ts,tsx}', '!./node_modules', '!./dist', '!./ios', '!./android'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				'primary-1': 'var(--primary-1)',
				'primary-2': 'var(--primary-2)',
				'primary-3': 'var(--primary-3)',
				'secondary-1': 'var(--secondary-1)',
				'secondary-2': 'var(--secondary-2)',
			},
		},
	},
	plugins: [],
};
