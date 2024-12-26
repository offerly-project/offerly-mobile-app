export const themes = {
	dark: {
		'--primary-1': '#6633cc',
		'--primary-2': '#4c1e9e',
		'--primary-3': '#fb8610',
		'--secondary-1': '#8188d9',
		'--secondary-2': '#fedebe',
		'--background': '#121212',
		'--background-1': '#2A2A2A',
		'--text-1': '#ffffff',
		'--text-2': '#b0b0b0',
		'--text-3': '#8a8a8a',
	},
	light: {
		'--primary-1': '#6633cc',
		'--primary-2': '#312165',
		'--primary-3': '#fb8610',
		'--secondary-1': '#8188d9',
		'--secondary-2': '#fedebe',
		'--background': '#ffffff',
		'--background-1': '#F6F6F6',
		'--text-1': '#212121',
		'--text-2': '#555555',
		'--text-3': '#999999',
	},
};

export type ThemeStyle = (typeof themes)['dark'] | (typeof themes)['light'];
