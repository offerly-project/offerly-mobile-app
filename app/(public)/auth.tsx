import BrandLogo from '@/assets/images/BrandLogo.svg';
import Button from '@/components/Button/Buttton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { router } from 'expo-router';
import { SafeAreaView, View } from 'react-native';

export default function index() {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='flex-1 px-8 justify-center items-center'>
				<View className='gap-5 w-full'>
					<BrandLogo height={200} width={200} style={{ margin: 'auto' }} />
					<Button onPress={() => router.push('/login')}>
						<Typography color='black'>{translations.buttons.login}</Typography>
					</Button>
					<Button onPress={() => router.push('/signup')} borderStyle='filled'>
						<Typography color='white'>{translations.buttons.signup}</Typography>
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
