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
import {
	FlatList,
	NativeScrollEvent,
	NativeSyntheticEvent,
	RefreshControl,
	View,
} from 'react-native';
import Animated, {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
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
		sortKey: 'created_at',
		sortDirection: 'desc',
	});

	const [search, setSearch] = useState<string>('');

	useLayoutEffect(() => {
		const handler = () => {
			setOffersFilter({
				...offersFilter,
				sortKey: 'created_at',
				sortDirection: 'desc',
			});
		};
		notificationsEventsEmitter.on(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS, handler);
		notificationsEventsEmitter.emit(readyEvent(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS));
		return () => {
			notificationsEventsEmitter.off(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS, handler);
		};
	}, []);

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

	const lastScrollY = useSharedValue(0);
	const toolbarVisible = useSharedValue(1);

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

	const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
		const currentY = contentOffset.y;
		const isAtBottom = currentY + layoutMeasurement.height >= contentSize.height - 10;
		const isAtTop = currentY <= 0;

		if (data.length === 0) return;

		if (isAtTop) {
			return;
		}

		if (currentY > lastScrollY.value + 5) {
			if (toolbarVisible.value !== 0) {
				runOnJS(() => {
					toolbarVisible.value = 0;
				})();
			}
		} else if (currentY < lastScrollY.value - 10 && !isAtBottom) {
			if (toolbarVisible.value !== 1) {
				runOnJS(() => {
					toolbarVisible.value = 1;
				})();
			}
		}

		lastScrollY.value = currentY;
	};

	const toolbarAnimation = useAnimatedStyle(() => {
		const isShowing = toolbarVisible.value === 1;
		return {
			transform: [
				{
					translateY: withTiming(isShowing ? 0 : -500, {
						duration: isShowing ? 600 : 150,
						easing: isShowing ? Easing.out(Easing.exp) : Easing.linear,
					}),
				},
			],
			opacity: withTiming(toolbarVisible.value, {
				duration: isShowing ? 400 : 100,
				easing: isShowing ? Easing.out(Easing.exp) : Easing.linear,
			}),
		};
	});

	const viewAnimation = useAnimatedStyle(() => {
		const isShowing = toolbarVisible.value === 1;
		return {
			paddingTop: withTiming(isShowing ? 150 : 0, {
				duration: isShowing ? 600 : 150,
				easing: isShowing ? Easing.out(Easing.exp) : Easing.linear,
			}),
		};
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
				<View className='relative flex-1'>
					{/* Floating Toolbar (Now fully animating in and out) */}
					<Animated.View
						className='absolute top-0 left-0 w-full z-20'
						style={toolbarAnimation}
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
					<Animated.View className='flex-1 relative' style={[viewAnimation]}>
						{initialLoader && renderSkeleton(4)}

						<FlatList
							data={data}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => <OfferCard offer={item} />}
							refreshControl={
								<RefreshControl
									tintColor={theme['--selected']}
									refreshing={refreshing}
									onRefresh={handleRefresh}
								/>
							}
							onScroll={handleScroll}
							scrollEventThrottle={16}
							ref={flatlistRef}
							ListFooterComponent={renderFooter}
							contentContainerStyle={{ gap: CARDS_GAP }}
							onEndReached={loadMore}
							onEndReachedThreshold={0.1}
						/>

						<GoTopLayout
							scrollY={lastScrollY}
							onPress={() => flatlistRef.current?.scrollToOffset({ offset: 0 })}
						/>
					</Animated.View>
				</View>
			)}
		</View>
	);
});

export default Offers;
