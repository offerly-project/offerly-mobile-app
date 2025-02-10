import Logo from '@/assets/icons/logo.svg';
import Button from '@/components/Button/Buttton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import AuthLayout from '@/layouts/AuthLayout';
import { languageStore, userStore } from '@/stores';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function index() {
	const theme = useThemeStyles();
	const { translations } = languageStore();

	return (
		<AuthLayout hideBackButton>
			<View className='flex-1 justify-center items-center'>
				<View className='gap-5 w-full'>
					<Logo
						height={200}
						width={200}
						fill={theme['--primary']}
						style={{
							margin: 'auto',

							transform: [{ scale: 0.75 }],
						}}
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
				<View className='absolute bottom-4'>
					<Link
						color={theme['--primary']}
						onPress={async () => {
							await userStore().guestLogin();
							router.push('/tabs/offers');
						}}
					>
						{translations.auth.guest}
					</Link>
				</View>
			</View>
		</AuthLayout>
	);
}
