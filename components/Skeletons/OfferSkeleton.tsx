import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Skeleton } from 'moti/skeleton';
import { DimensionValue, StyleSheet } from 'react-native';

type Props = {
	width?: DimensionValue;
	height?: DimensionValue;
};

const OfferSkeleton = ({ height = 120, width = '100%' }: Props) => {
	const theme = useThemeStyles();
	return (
		<Skeleton
			colors={theme.skeleton}
			height={height}
			width={width}
			disableExitAnimation
			transition={SKELETON_TRANSITIONS}
		/>
	);
};

export default OfferSkeleton;

const styles = StyleSheet.create({});
