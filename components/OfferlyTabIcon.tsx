import Logo from '@/assets/icons/logo.svg';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { View } from 'react-native';

type Props = {
	focused: boolean;
};

export const OfferlyTabIcon = ({ focused }: Props) => {
	const theme = useThemeStyles();

	const iconColor = !focused ? theme['--primary'] : theme['--static'];
	const bgColor = !focused ? 'bg-background' : 'bg-primary';
	return (
		<View
			className={`rounded-full items-center justify-center mb-8 border border-primary ${bgColor}`}
			style={{
				height: 50,
				width: 50,
			}}
		>
			<Logo
				fill={iconColor}
				style={{
					transform: [{ scale: 0.7 }],
				}}
			/>
		</View>
	);
};
