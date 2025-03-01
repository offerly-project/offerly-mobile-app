import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

type Props = {
	children: React.ReactNode;
};

const DURATION = 500;

const TabTransitionLayout = ({ children }: Props) => {
	const [fadeAnim] = useState(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: DURATION,
			useNativeDriver: true,
		}).start();
	}, []);

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
