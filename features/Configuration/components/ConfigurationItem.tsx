import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Pressable, TouchableOpacityProps } from 'react-native';

interface ProfileListItemProps extends TouchableOpacityProps {
	leading?: React.ReactNode;
	trailing?: React.ReactNode;
	label: string;
	onPress?: () => void;
}

export const ConfigurationItem = ({
	leading,
	trailing,
	label,
	className,
	disabled = false,
	onPress,
	...rest
}: ProfileListItemProps) => {
	const theme = useThemeStyles();
	const { theme: themeName } = useThemeContext();
	const border = themeName === 'dark' ? 'border-gray-600' : 'border-gray-300';
	return (
		<Pressable
			className={`flex-row py-2 px-1 border-b ${border} items-center gap-3 ${className}`}
			disabled={disabled}
			style={{ opacity: disabled ? 0.5 : 1 }}
			onPress={onPress}
			{...rest}
		>
			{leading}
			<Typography className='flex-1' color={theme['--text']} weight='medium' variant='label'>
				{label}
			</Typography>
			{trailing}
		</Pressable>
	);
};
