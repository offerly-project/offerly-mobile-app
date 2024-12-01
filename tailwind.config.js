/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./templates/*.{js,jsx,ts,tsx}","./components/ui/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary)",
				secondary: "var(--secondary)",
				background: "var(--background)",
				text: "var(--text)",
				"text-muted": "var(--text-muted)",
			},
		},
	},
	plugins: [],
};
