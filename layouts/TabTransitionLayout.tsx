import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = {
	children: React.ReactNode;
};

const DURATION = 500;

const TabTransitionLayout = ({ children }: Props) => {
	const isFocused = useIsFocused();
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		if (isFocused) {
			Animated.timing(fadeAnim, {
				toValue: 1,
				duration: DURATION,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(fadeAnim, {
				toValue: 0,
				duration: DURATION,
				useNativeDriver: true,
			}).start();
		}
	}, [isFocused]);

	return (
		<Animated.View style={[styles.wrapper, { opacity: fadeAnim }]}>{children}</Animated.View>
	);
};

export default TabTransitionLayout;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
	},
});
