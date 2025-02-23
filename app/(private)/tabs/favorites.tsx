import NoData from '@/components/Fallback/NoData';
import OfferSkeleton from '@/components/Skeletons/OfferSkeleton';
import { CARDS_GAP } from '@/constants/layout';
import { FLATLIST_TRANSITION } from '@/constants/transitions';
import OfferCard from '@/features/Offers/OfferCard';
import { DeepLinkHandler, useDeepLinkHandler } from '@/hooks/useDeepLinkHandler';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, userStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {};

const Favorites = observer((props: Props) => {
	const offers = favoritesStore().offers;
	const theme = useThemeStyles();

	const { isGuest } = userStore();
	const [loading, setLoading] = useState(!isGuest);

	useEffect(() => {
		if (!isGuest) {
			favoritesStore()
				.getFavorites()
				.finally(() => {
					setLoading(false);
				});
		}
	}, []);

	const [highlighted, setHighlighted] = useState<string[] | null>(null);

	const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		// Reset highlighted state after 15 seconds
		if (highlighted !== null) {
			if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);

			resetTimeoutRef.current = setTimeout(() => {
				setHighlighted(null);
			}, 15 * 1000); // 15 seconds
		}
	}, [highlighted]);

	const deepLinkHandler: DeepLinkHandler = ({ queryParams }) => {
		if (!queryParams) return;

		const { highlighted_offers } = queryParams;

		if (typeof highlighted_offers === 'string') {
			setHighlighted(highlighted_offers.split(','));
		}
	};

	useDeepLinkHandler({ handler: deepLinkHandler });

	return (
		<>
			{loading ? (
				<Skeleton.Group show={true}>
					{new Array(4).fill(0).map((_, i) => (
						<View className='my-4' key={i}>
							<OfferSkeleton />
						</View>
					))}
				</Skeleton.Group>
			) : offers.length === 0 ? (
				<NoData message='No Favorites' />
			) : (
				<View className='flex-1'>
					<Animated.FlatList
						data={offers}
						itemLayoutAnimation={FLATLIST_TRANSITION}
						keyExtractor={(item) => item.id}
						contentContainerStyle={{ gap: CARDS_GAP, paddingBottom: 20 }}
						renderItem={({ item }) => (
							<OfferCard
								offer={item}
								closeOnUnfavorite={true}
								highlighted={highlighted !== null && highlighted.includes(item.id)}
							/>
						)}
					/>
				</View>
			)}
		</>
	);
});

export default Favorites;

const styles = StyleSheet.create({});
