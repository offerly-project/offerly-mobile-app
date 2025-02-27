import { MotiTransitionProp } from 'moti/build/core';
import { FadeIn, LinearTransition } from 'react-native-reanimated';

export const FLATLIST_SHIFT_TRANSITION = LinearTransition.duration(250);

export const FLATLIST_FADE_TRANSITION = FadeIn.duration(250);

export const SKELETON_TRANSITIONS: MotiTransitionProp = {
	translateX: {
		loop: true,
		repeatReverse: false,
		type: 'timing',
		duration: 1500,
	},
};
