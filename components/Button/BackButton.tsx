import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Pressable>;

const BackButton = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<Pressable {...props} className='p-4' onPress={router.back}>
			<Ionicons name='chevron-back' size={24} color={theme['--background-1']} />
		</Pressable>
	);
};

export default BackButton;

const styles = StyleSheet.create({});
