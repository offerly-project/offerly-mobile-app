/**
 * Variables
 * - primary
 * - secondary
 * - background
 * - light-background
 * - text
 * - card
 * - static
 * - danger
 */

export const themes = {
	dark: {
		'--primary': '#8188d9',
		'--secondary': '#8188d9',
		'--background': '#121212',
		'--light-background': '#2A2A2A',
		'--text': '#ffffff',
		'--selected': '#fb8610',
		'--card': '#262626',
		'--static': '#ffffff',
		'--danger': '#E53935',
		'--shade': 'rgba(255,255,255,0.2)',
	},
	light: {
		'--primary': '#6633cc',
		'--secondary': '#8188d9',
		'--background': '#ffffff',
		'--light-background': '#F6F6F6',
		'--selected': '#fb8610',
		'--text': '#212121',
		'--card': '#F0F0F5',
		'--static': '#ffffff',
		'--danger': '#D32F2F',
		'--shade': 'rgba(0,0,0,0.1)',
	},
};

export type ThemeStyle = (typeof themes)['dark'] | (typeof themes)['light'];
