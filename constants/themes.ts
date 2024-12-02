export const themes = {
	dark: {
		'--primary-1': '#6633cc',
		'--primary-2': '#312165',
		'--primary-3': '#fb8610',
		'--secondary-1': '#8188d9',
		'--secondary-2': '#fedebe',
	},
	light: {
		'--primary-1': '#d3bfff',
		'--primary-2': '#cdb8eb',
		'--primary-3': '#fff1d4',
		'--secondary-1': '#e0e3f5',
		'--secondary-2': '#fffbf5',
	},
};

export type ThemeStyle = (typeof themes)['dark'] | (typeof themes)['light'];
