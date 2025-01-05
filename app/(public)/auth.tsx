import BrandLogoDark from '@/assets/images/offerly-logo-dark.svg';
import BrandLogoLight from '@/assets/images/offerly-logo-light.svg';
import Button from '@/components/Button/Buttton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { router } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

export default function index() {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const themeName = useThemeContext().theme;
	const Logo = themeName === 'dark' ? BrandLogoDark : BrandLogoLight;
	return (
		<SafeAreaView className='flex-1 bg-background'>
			<View className='flex-1 px-8 justify-center items-center'>
				<View className='gap-5 w-full'>
					<Logo
						height={200}
						width={200}
						style={{ margin: 'auto', transform: [{ scale: 1.5 }] }}
					/>
					<Button onPress={() => router.push('/login')}>
						<Typography color={theme['--primary']}>
							{translations.buttons.login}
						</Typography>
					</Button>
					<Button onPress={() => router.push('/signup')} borderStyle='filled'>
						<Typography color={theme['--background']}>
							{translations.buttons.signup}
						</Typography>
					</Button>
				</View>
				<View className='absolute bottom-0'>
					<Link color={theme['--primary']} to='./login.tsx'>
						{translations.auth.guest}
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}
