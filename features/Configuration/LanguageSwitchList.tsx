import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { LanguageType } from '@/stores/language.store';
import { Ionicons } from '@expo/vector-icons';
import * as Updates from 'expo-updates';
import { Alert, Pressable, StyleSheet, View } from 'react-native';

const LanguageOption = ({
	label,
	language,
	onSelect,
	isSelected,
	color,
}: {
	label: string;
	language: LanguageType;
	onSelect: (language: LanguageType) => void;
	isSelected: boolean;
	color: string;
}) => (
	<Pressable style={styles.option} onPress={() => onSelect(language)}>
		<Typography variant='body' weight='regular' color={color}>
			{label}
		</Typography>
		{isSelected && <Ionicons name='checkmark-circle' size={20} color={color} />}
	</Pressable>
);

type Props = {
	onSelect: () => void;
};

const LanguageSwitchList = ({ onSelect }: Props) => {
	const theme = useThemeStyles();
	const themeName = useThemeContext().theme;
	const { translations, language, setLanguage } = languageStore();
	const selectHandler = (language: LanguageType) => {
		setLanguage(language);
		onSelect();
		Alert.alert(
			'Reload Required',
			'Please reload the app to apply the changes.',
			[
				{
					text: 'Reload',
					onPress: () => {
						Updates.reloadAsync();
					},
				},
			],
			{
				userInterfaceStyle: themeName,
			},
		);
	};
	return (
		<View>
			<LanguageOption
				label={translations.tabs.account.languages.en}
				language='en'
				onSelect={selectHandler}
				isSelected={language === 'en'}
				color={theme['--text']}
			/>
			<LanguageOption
				label={translations.tabs.account.languages.ar}
				language='ar'
				onSelect={selectHandler}
				isSelected={language === 'ar'}
				color={theme['--text']}
			/>
		</View>
	);
};

export default LanguageSwitchList;

const styles = StyleSheet.create({
	option: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 8,
	},
});
