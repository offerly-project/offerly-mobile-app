import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
type Props = {
	onFinish: () => void;
};

const Welcome = ({ onFinish }: Props) => {
	const ref = useRef<LottieView>(null);
	const focused = useIsFocused();
	useEffect(() => {
		if (!focused) {
			ref.current?.reset();
		}
	}, [focused]);
	return (
		<LinearGradient
			colors={['#6633cc', '#000000']}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.gradient}
		>
			<LottieView
				ref={ref}
				onAnimationFinish={onFinish}
				source={require('./animations/welcome-animation.json')}
				autoPlay
				loop={false}
				speed={1.6}
				style={{
					width: '100%',
					height: '100%',
					padding: '10%',
				}}
			/>
		</LinearGradient>
	);
};

export default Welcome;

const styles = StyleSheet.create({
	gradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
