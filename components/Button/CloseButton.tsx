import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Pressable>;

const CloseButton = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<Pressable {...props}>
			<Ionicons size={25} name='close' color={theme['--primary']} />
		</Pressable>
	);
};

export default CloseButton;

const styles = StyleSheet.create({});
