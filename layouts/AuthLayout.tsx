import BackButton from '@/components/Button/BackButton';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
	children: React.ReactNode;
	hideBackButton?: boolean;
};

const AuthLayout = observer(({ children, hideBackButton }: Props) => {
	const { theme, switchTheme } = useThemeContext();
	const styles = useThemeStyles();
	const { language, setLanguage } = languageStore();

	return (
		<SafeAreaView className='px-10 flex-1 w-full h-full justify-center bg-background'>
			<View className={`flex flex-row justify-between items-center h-[50]`}>
				<View>{!hideBackButton && <BackButton />}</View>

				<View className='flex-row gap-8'>
					<Typography
						weight='bold'
						onPress={() => {
							setLanguage(language == 'en' ? 'ar' : 'en');
						}}
						variant='body'
						color={styles['--primary']}
					>
						{language == 'en' ? 'AR' : 'EN'}
					</Typography>
					<MaterialIcons
						onPress={() => switchTheme(theme == 'dark' ? 'light' : 'dark')}
						name={theme === 'dark' ? 'light-mode' : 'dark-mode'}
						size={24}
						color={styles['--primary']}
					/>
				</View>
			</View>
			{children}
		</SafeAreaView>
	);
});

export default AuthLayout;

const styles = StyleSheet.create({});
