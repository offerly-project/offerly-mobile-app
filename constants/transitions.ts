import { MotiTransitionProp } from 'moti/build/core';
import { LinearTransition } from 'react-native-reanimated';

export const FLATLIST_TRANSITION = LinearTransition.duration(250);

export const SKELETON_TRANSITIONS: MotiTransitionProp = {
	translateX: {
		loop: true,
		repeatReverse: false,
		type: 'timing',
		duration: 1000,
	},
};
