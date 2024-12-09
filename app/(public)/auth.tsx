import { SafeAreaView, View } from 'react-native';
import BrandLogo from '@/assets/images/BrandLogo.svg';
import Button from '@/components/Button/Buttton';
import Typography from '@/components/Typography/Typography';
import Link from '@/components/Typography/Link';
import { router } from 'expo-router';
export default function index() {
	return (
		<SafeAreaView className='flex-1 bg-white'>
			<View className='flex-1 px-8 justify-center items-center'>
				<View className='gap-5 w-full'>
					<BrandLogo height={200} width={200} style={{ margin: 'auto' }} />
					<Button onPress={() => router.replace('/login')}>
						<Typography color='black'>Login</Typography>
					</Button>
					<Button onPress={() => router.replace('/signup')} borderStyle='filled'>
						<Typography color='white'>Sign up</Typography>
					</Button>
				</View>
				<View className='absolute bottom-0'>
					<Link to='./login.tsx'>Continue as a guest</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}
