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
		'--primary': '#5A3FBC',
		'--secondary': '#4A3792',
		'--background': '#121212',
		'--light-background': '#2A2A2A',
		'--text': '#E4E4E4',
		'--selected': '#fb8610',
		'--card': '#262626',
		'--card-highlighted': '#33304A', // Added highlight color
		'--static': '#ffffff',
		'--danger': '#E53935',
		'--shade': 'rgba(255, 255, 255, 0.4)',
		'--toast-bg': '#181818',
		'--toast-success': '#388E3C',
		'--toast-error': '#B71C1C',
		'--toast-info': '#ffffff',
		skeleton: constructSkeletonColor('#2A2A2A', '#5A3FBC', '#2A2A2A'),
	},
	light: {
		'--primary': '#5A3FBC',
		'--secondary': '#7F5ACC',
		'--background': '#FFFFFF',
		'--light-background': '#F6F6F6',
		'--selected': '#fb8610',
		'--text': '#212121',
		'--card': '#F0F0F5',
		'--card-highlighted': '#D6CFFA', // Added highlight color
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
