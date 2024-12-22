import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	children: React.ReactNode;
	title: string;
};

const TabLayout = ({ children, title }: Props) => {
	const { top } = useSafeAreaInsets();
	const theme = useThemeStyles();
	return (
		<View style={{ flex: 1 }}>
			<LinearGradient
				colors={['rgba(32,19,75,1)', 'rgba(90,46,182,1)', 'rgba(32,19,75,1)']}
				style={{ paddingTop: top, height: 110 }}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 0 }}
				locations={[0, 0.5, 1]}
			>
				<Typography
					color={theme['--text-1']}
					weight='bold'
					variant='h3'
					style={{ margin: 'auto' }}
				>
					{title}
				</Typography>
			</LinearGradient>
			{children}
		</View>
	);
};

export default TabLayout;

const styles = StyleSheet.create({});
