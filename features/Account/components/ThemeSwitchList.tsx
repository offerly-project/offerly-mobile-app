import Typography from '@/components/Typography/Typography';
import { ThemeNameType } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
	onSelect: (theme: ThemeNameType) => void;
	selectedTheme: ThemeNameType;
};

const ThemeOption = ({
	label,
	themeKey,
	onSelect,
	isSelected,
	color,
}: {
	label: string;
	themeKey: ThemeNameType;
	onSelect: (theme: ThemeNameType) => void;
	isSelected: boolean;
	color: string;
}) => (
	<Pressable style={styles.option} onPress={() => onSelect(themeKey)}>
		<Typography variant='body' weight='regular'>
			{label}
		</Typography>
		{isSelected && <Ionicons name='checkmark-circle' size={20} color={color} />}
	</Pressable>
);

const ThemeSwitchList = ({ onSelect, selectedTheme }: Props) => {
	const theme = useThemeStyles();
	return (
		<View>
			<ThemeOption
				label='Light'
				themeKey='light'
				onSelect={onSelect}
				isSelected={selectedTheme === 'light'}
				color={theme['--primary-1']}
			/>
			<ThemeOption
				label='Dark'
				themeKey='dark'
				onSelect={onSelect}
				isSelected={selectedTheme === 'dark'}
				color={theme['--primary-1']}
			/>
		</View>
	);
};

export default ThemeSwitchList;

const styles = StyleSheet.create({
	option: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 16,
	},
});
