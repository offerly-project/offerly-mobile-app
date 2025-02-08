import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '@/assets/icons/logo-white.png';
import { Image } from 'expo-image';

type Props = {
	children: React.ReactNode;
	title: string;
	trailing?: React.ReactNode;
	leading?: React.ReactNode;
};

export const TOAST_OFFSET = 60;

const TabLayout = ({ children, title, trailing, leading }: Props) => {
	const { top } = useSafeAreaInsets();
	const theme = useThemeStyles();
	return (
		<View style={{ flex: 1, backgroundColor: theme['--background'] }}>
			<LinearGradient
				colors={['rgba(32,19,75,1)', 'rgba(90,46,182,1)', 'rgba(32,19,75,1)']}
				style={{ paddingTop: top }}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				locations={[0, 0.5, 1]}
			>
				<Image
					source={Logo}
					style={{
						transform: [{ scale: 1.5 }],
						height: 100,
						width: 300,
						opacity: 0.05,
						position: 'absolute',
						left: 0,
					}}
				/>
				<View className='flex flex-row justify-between items-center h-[50] px-4'>
					<View className='flex-row flex-1 justify-start items-center'>{leading}</View>
					<Typography
						color={theme['--static']}
						weight='bold'
						variant='h3'
						style={{ textAlign: 'center' }}
					>
						{title}
					</Typography>
					<View className='flex-row flex-1 justify-end items-center'>{trailing}</View>
				</View>
			</LinearGradient>
			{children}
		</View>
	);
};

export default TabLayout;

const styles = StyleSheet.create({});
