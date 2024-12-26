import Typography from '@/components/Typography/Typography';
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
	return (
		<Pressable
			className={`flex-row p-3.5 items-center bg-background-1 gap-3 ${className}`}
			disabled={disabled}
			onPress={onPress}
			{...rest}
		>
			{leading}
			<Typography className='flex-1' weight='medium' variant='label'>
				{label}
			</Typography>
			{trailing}
		</Pressable>
	);
};
