import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

import NoData from '@/components/Fallback/NoData';
import Input from '@/components/Input/Input';
import OfferSkeleton from '@/components/Skeletons/OfferSkeleton';
import { CARDS_GAP } from '@/constants/layout';
import { FLATLIST_FADE_TRANSITION } from '@/constants/transitions';
import OfferCard from '@/features/Offers/OfferCard';
import { DeepLinkHandler, useDeepLinkHandler } from '@/hooks/useDeepLinkHandler';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabTransitionLayout from '@/layouts/TabTransitionLayout';
import { favoritesStore, languageStore, userStore } from '@/stores';

const Favorites = observer(() => {
	const offers = favoritesStore().offers;
	const theme = useThemeStyles();
	const { isGuest } = userStore();
	const { translations } = languageStore();

	const [loading, setLoading] = useState(!isGuest);
	const [search, setSearch] = useState('');
	const [highlighted, setHighlighted] = useState<string[] | null>(null);

	const scrollY = useSharedValue(0);
	const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const flatlistRef = useRef<Animated.FlatList<any>>(null);

	useEffect(() => {
		if (!isGuest) {
			favoritesStore()
				.getFavorites()
				.finally(() => setLoading(false));
		}
	}, []);

	useEffect(() => {
		if (highlighted !== null) {
			if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
			resetTimeoutRef.current = setTimeout(() => setHighlighted(null), 15 * 1000);
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

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const offsetY = event.nativeEvent.contentOffset.y;
		scrollY.value = withTiming(offsetY, { duration: 200, easing: Easing.out(Easing.quad) });
	};

	// Header animation (search bar)
	const headerAnimation = useAnimatedStyle(() => {
		const translateY = interpolate(scrollY.value, [0, 100], [0, -80], 'clamp');
		const opacity = interpolate(scrollY.value, [0, 100], [1, 0], 'clamp');
		return { transform: [{ translateY }], opacity };
	});

	const offersList = useMemo(() => {
		if (!search) return favoritesStore().offers;
		return favoritesStore().offers.filter(
			(offer) =>
				offer.title.en.toLowerCase().includes(search.toLowerCase()) ||
				offer.title.ar.toLowerCase().includes(search.toLowerCase()),
		);
	}, [favoritesStore().offers, search]);

	return (
		<TabTransitionLayout>
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
				<Animated.FlatList
					ref={flatlistRef}
					data={offersList}
					itemLayoutAnimation={FLATLIST_FADE_TRANSITION}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{ gap: CARDS_GAP, paddingBottom: 40 }}
					renderItem={({ item }) => (
						<OfferCard
							offer={item}
							closeOnUnfavorite
							highlighted={highlighted?.includes(item.id)}
						/>
					)}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					ListHeaderComponent={
						<Animated.View className='px-4 pb-2' style={headerAnimation}>
							<Input
								trailingIcon={() => (
									<Ionicons size={22} color={theme['--primary']} name='search' />
								)}
								value={search}
								onChangeText={setSearch}
								placeholder={translations.placeholders.search}
								variant='primary'
							/>
						</Animated.View>
					}
				/>
			)}
		</TabTransitionLayout>
	);
});

export default Favorites;
