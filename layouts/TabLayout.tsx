import Typography from '@/components/Typography/Typography';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	children: React.ReactNode;
	title: string;
	trailing?: React.ReactNode;
	leading?: React.ReactNode;
};

const TabLayout = ({ children, title, trailing, leading }: Props) => {
	const { top } = useSafeAreaInsets();

	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={['rgba(32,19,75,1)', 'rgba(90,46,182,1)', 'rgba(32,19,75,1)']}
				style={{ paddingTop: top }}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				locations={[0, 0.5, 1]}
			>
				<View className='flex flex-row justify-between items-center h-[50]'>
					<View style={{ flex: 1 }}>{leading}</View>
					<Typography
						color={'#FFFFFF'}
						weight='bold'
						variant='h3'
						style={{ textAlign: 'center' }}
					>
						{title}
					</Typography>
					<View style={{ flex: 1 }}>{trailing}</View>
				</View>
			</LinearGradient>
			{children}
		</View>
	);
};

export default TabLayout;

const styles = StyleSheet.create({});
