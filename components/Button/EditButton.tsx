import { useThemeStyles } from '@/hooks/useThemeStyles';
import { AntDesign } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

type Props = ComponentProps<typeof Pressable>;

const EditButton = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<Pressable {...props}>
			<AntDesign name='edit' color={theme['--primary']} size={20} />
		</Pressable>
	);
};

export default EditButton;

const styles = StyleSheet.create({});
