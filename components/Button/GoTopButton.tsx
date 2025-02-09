import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
	onPress: () => void;
};

const GoTopButton = ({ onPress }: Props) => {
	const theme = useThemeStyles();
	return (
		<TouchableOpacity hitSlop={25} onPress={onPress}>
			<Ionicons size={25} color={theme['--background']} name='arrow-up' />
		</TouchableOpacity>
	);
};

export default GoTopButton;

const styles = StyleSheet.create({});
