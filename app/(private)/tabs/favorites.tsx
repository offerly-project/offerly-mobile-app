import NoData from '@/components/Fallback/NoData';
import { CARDS_GAP } from '@/constants/layout';
import { FLATLIST_TRANSITION, SKELETON_TRANSITIONS } from '@/constants/transitions';
import OfferCard from '@/features/Offers/OfferCard';
import {
	NotificationActions,
	notificationsEventsEmitter,
	readyEvent,
} from '@/hooks/useNotifications';
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

	useEffect(() => {
		console.log(offers);

		if (!offers) return;
		const handler = (offersData: string) => {
			if (offersData.length === 0) return;

			const offersArr = offersData.split(',');
			if (!offers.some((offer) => offersArr.includes(offer.id))) {
				return;
			}
			setHighlighted(offersArr);
		};
		notificationsEventsEmitter.on(NotificationActions.EXPIRING_FAVOURITES, handler);
		notificationsEventsEmitter.emit(readyEvent(NotificationActions.EXPIRING_FAVOURITES));
		return () => {
			notificationsEventsEmitter.off(NotificationActions.EXPIRING_FAVOURITES, handler);
		};
	}, [offers]);

	return (
		<>
			{loading ? (
				new Array(Math.floor(3)).fill(0).map((_, i) => (
					<View className='m-6' key={i}>
						<Skeleton
							radius={20}
							transition={SKELETON_TRANSITIONS}
							colors={theme.skeleton}
							show={true}
							height={125}
							width={'100%'}
						/>
					</View>
				))
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
