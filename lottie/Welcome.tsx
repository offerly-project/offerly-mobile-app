import { themes } from '@/constants/themes';
import { useIsFocused } from '@react-navigation/native';
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
		<LottieView
			ref={ref}
			onAnimationFinish={onFinish}
			source={require('./animations/welcome-animation.json')}
			autoPlay
			loop={false}
			speed={2.5}
			style={{
				width: '100%',
				height: '100%',
				padding: '10%',
				backgroundColor: themes.light['--primary'],
			}}
		/>
	);
};

export default Welcome;

const styles = StyleSheet.create({});
