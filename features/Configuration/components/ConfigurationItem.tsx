import Typography from '@/components/Typography/Typography';
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
	return (
		<Pressable
			className={`flex-row py-2 px-1 border-b border-[rgba(0,0,0,0.1)] items-center gap-3 ${className}`}
			disabled={disabled}
			onPress={onPress}
			{...rest}
		>
			{leading}
			<Typography
				className='flex-1'
				color={theme['--text-1']}
				weight='medium'
				variant='label'
			>
				{label}
			</Typography>
			{trailing}
		</Pressable>
	);
};
