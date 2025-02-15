import { OffersApi } from '@/api/offers.api';
import GoTopLayout from '@/components/Button/GoTopButton';
import NoCards from '@/components/Messages/NoCards';
import Typography from '@/components/Typography/Typography';
import { CARDS_GAP } from '@/constants/layout';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { IOffer, IOfferFilter } from '@/entities/offer.entity';
import {
	NotificationActions,
	notificationsEventsEmitter,
	readyEvent,
} from '@/hooks/useNotifications';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, languageStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import OfferCard from './OfferCard';
import OffersToolbar from './OffersToolbar';

const Offers = observer(() => {
	const theme = useThemeStyles();
	const { getCardById } = cardsStore();
	const { translations, language } = languageStore();

	const [offersHeader, setOffersHeader] = useState<string>('');
	const [appliedFilterCount, setAppliedFilterCount] = useState<number>(0);
	const [offersFilter, setOffersFilter] = useState<IOfferFilter>({
		card: [],
		category: [],
		sortKey: 'expiry_date',
		sortDirection: 'desc',
	});

	useLayoutEffect(() => {
		const handler = () => {
			setOffersFilter({
				...offersFilter,
				sortKey: 'expiry_date',
				sortDirection: 'desc',
			});
		};
		notificationsEventsEmitter.on(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS, handler);
		notificationsEventsEmitter.emit(readyEvent(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS));
		return () => {
			notificationsEventsEmitter.off(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS, handler);
		};
	}, []);

	const [search, setSearch] = useState<string>('');

	const { data, refreshing, loadingMore, handleRefresh, loadMore, initialLoader } =
		usePagination<IOffer>({
			url: '/user/offers',
			getQuery: (page, limit) =>
				OffersApi.buildGetOffersQuery({
					card: offersFilter.card.join(','),
					bank: '',
					category: offersFilter.category.join(','),
					page,
					limit,
					q: search,
					sort_by: offersFilter.sortKey,
					sort_direction: offersFilter.sortDirection,
				}),
			queryDependencies: [search, offersFilter],
		});

	const userCards = cardsStore().userCardsList;
	const flatlistRef = useRef<FlatList<IOffer> | null>(null);
	const scrollY = useSharedValue(0);

	const { top } = useSafeAreaInsets();

	useEffect(() => {
		handleRefresh();
	}, [userCards]);

	useEffect(() => {
		const countAppliedFilters = () => {
			let count = 0;
			if (
				offersFilter.card.length > 1 ||
				(offersFilter.card.length === 1 && offersFilter.card[0] !== '')
			)
				count++;
			if (offersFilter.category.length > 0) count++;
			if (offersFilter.sortKey) count++;
			if (offersFilter.sortDirection !== 'asc') count++;
			return count;
		};
		setAppliedFilterCount(countAppliedFilters());
	}, [offersFilter]);

	useEffect(() => {
		const setHeaderText = () => {
			if (userCards.length === 0) return setOffersHeader('');
			if (offersFilter.card.length === 0)
				return setOffersHeader(translations.tabs.offers.header);
			if (offersFilter.card.length === 1) {
				return setOffersHeader(
					translations.tabs.offers.headerForSelectedCard.segement1 +
						' ' +
						getCardById(offersFilter.card[0]).name[language],
				);
			}
			return setOffersHeader(
				translations.tabs.offers.headerForSelectedCard.segement1 +
					' ' +
					offersFilter.card.length +
					' ' +
					translations.tabs.offers.headerForSelectedCard.segement2,
			);
		};
		setHeaderText();
	}, [offersFilter.card, userCards]);

	const toolbarAnimation = useAnimatedStyle(() => {
		const translateY = interpolate(scrollY.value, [0, 150], [0, -top - 50], 'clamp');
		return { transform: [{ translateY }] };
	});

	const animatedPaddingStyle = useAnimatedStyle(() => {
		const paddingTop = interpolate(scrollY.value, [0, 150], [130, 25], 'clamp');
		return { paddingTop };
	});

	const renderSkeleton = (count: number) => (
		<Skeleton.Group show={true}>
			{new Array(count).fill(0).map((_, i) => (
				<View className='my-4' key={i}>
					<Skeleton
						colors={theme.skeleton}
						height={110}
						width='100%'
						disableExitAnimation
						transition={SKELETON_TRANSITIONS}
					/>
				</View>
			))}
		</Skeleton.Group>
	);

	const renderFooter = () =>
		loadingMore ? <View className='flex-1 px-4'>{renderSkeleton(2)}</View> : null;

	return (
		<View className='flex-1'>
			{userCards.length === 0 ? (
				<NoCards />
			) : (
				<View className='relative flex-1 pt-3'>
					<Animated.View
						className='absolute top-0 left-0 w-full z-20'
						style={[toolbarAnimation]}
					>
						<OffersToolbar
							offersFilter={offersFilter}
							setOffersFilter={setOffersFilter}
							appliedFilterCount={appliedFilterCount}
							search={search}
							setSearch={setSearch}
						/>
						{offersHeader && (
							<View className='bg-background pb-2'>
								<Typography
									numberOfLines={1}
									align='center'
									variant='body'
									className='m-auto border-b-2 border-selected'
									weight='bold'
								>
									{offersHeader}
								</Typography>
							</View>
						)}
					</Animated.View>

					<Animated.View style={[animatedPaddingStyle, { flex: 1 }]}>
						{initialLoader && <View className='flex-1 px-4'>{renderSkeleton(4)}</View>}
						<FlatList
							data={data}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <OfferCard offer={item} />}
							refreshControl={
								<RefreshControl
									tintColor={theme['--primary']}
									refreshing={refreshing}
									onRefresh={handleRefresh}
								/>
							}
							onScroll={(event) => {
								scrollY.value = event.nativeEvent.contentOffset.y;
							}}
							scrollEventThrottle={16}
							ref={flatlistRef}
							contentContainerStyle={{ gap: CARDS_GAP }}
							ListFooterComponent={renderFooter}
							onEndReached={loadMore}
							onEndReachedThreshold={0.1}
						/>

						<GoTopLayout
							onPress={() => {
								flatlistRef.current?.scrollToOffset({ offset: 0 });
							}}
							scrollY={scrollY}
						/>
					</Animated.View>
				</View>
			)}
		</View>
	);
});

export default Offers;
