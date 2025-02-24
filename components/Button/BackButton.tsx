import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Pressable>;

const BackButton = (props: Props) => {
	const theme = useThemeStyles();
	const { isRtl } = languageStore();
	const iconName = isRtl ? 'chevron-forward' : 'chevron-back';
	return (
		<Pressable {...props} className='p-4 w-[50]' onPress={router.back}>
			<Ionicons name={iconName} size={24} color={theme['--static']} />
		</Pressable>
	);
};

export default BackButton;

const styles = StyleSheet.create({});
