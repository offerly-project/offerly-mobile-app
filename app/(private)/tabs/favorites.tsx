import NoData from '@/components/Fallback/NoData';
import { FLATLIST_TRANSITION, SKELETON_TRANSITIONS } from '@/constants/transitions';
import OfferCard from '@/features/Offers/OfferCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, languageStore, userStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {};

const Favorites = observer((props: Props) => {
	const offers = favoritesStore().offers;
	const theme = useThemeStyles();
	const { translations } = languageStore();
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
				<View className='p-4 pb-0 flex-1'>
					<Animated.FlatList
						data={offers}
						itemLayoutAnimation={FLATLIST_TRANSITION}
						keyExtractor={(item) => item.id}
						contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
						renderItem={({ item }) => (
							<OfferCard offer={item} closeOnUnfavorite={true} />
						)}
					/>
				</View>
			)}
		</>
	);
});

export default Favorites;

const styles = StyleSheet.create({});
