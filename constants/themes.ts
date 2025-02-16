const constructSkeletonColor = (start: string, middle: string, end: string) => [
	start,
	start,
	middle,
	middle,
	end,
	end,
];

export const themes = {
	dark: {
		'--primary': '#7C4DFF', // Lightened primary color
		'--secondary': '#7F5ACC',
		'--background': '#121212',
		'--light-background': '#3A3A3A', // Lightened light background color
		'--text': '#E0E0E0',
		'--selected': '#fb8610',
		'--card': '#262626',
		'--card-highlighted': '#33304A',
		'--static': '#ffffff',
		'--danger': '#E53935',
		'--shade': 'rgba(255, 255, 255, 0.5)',
		'--toast-bg': '#181818',
		'--toast-success': '#388E3C',
		'--toast-error': '#B71C1C',
		'--toast-info': '#ffffff',
		skeleton: constructSkeletonColor('#353535', '#7F5ACC', '#353535'),
	},
	light: {
		'--primary': '#5A3FBC',
		'--secondary': '#7F5ACC',
		'--background': '#FFFFFF',
		'--light-background': '#F6F6F6',
		'--selected': '#fb8610',
		'--text': '#212121',
		'--card': '#F0F0F5',
		'--card-highlighted': '#D6CFFA',
		'--static': '#ffffff',
		'--danger': '#D32F2F',
		'--shade': 'rgba(0, 0, 0, 0.4)',
		'--toast-bg': '#E0E0E0',
		'--toast-success': '#4CAF50',
		'--toast-error': '#E53935',
		'--toast-info': '#000000',
		skeleton: constructSkeletonColor('#E0E0E0', '#7F5ACC', '#E0E0E0'),
	},
};
export type ThemeStyle = (typeof themes)['dark'] | (typeof themes)['light'];
