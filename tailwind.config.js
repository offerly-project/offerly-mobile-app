/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./**/*.{js,jsx,ts,tsx}', '!./node_modules', '!./dist', '!./ios', '!./android'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				background: 'var(--background)',
				'light-background': 'var(--light-background)',
				text: 'var(--text)',
				card: 'var(--card)',
				static: 'var(--static)',
				danger: 'var(--danger)',
				selected: 'var(--selected)',
				shade: 'var(--shade)',
			},
		},
	},
	plugins: [],
};
