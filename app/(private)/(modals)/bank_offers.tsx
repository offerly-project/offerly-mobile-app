import { OffersApi } from '@/api/offers.api';
import CloseButton from '@/components/Button/CloseButton';
import GoTopLayout from '@/components/Button/GoTopButton';
import Typography from '@/components/Typography/Typography';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { IBank } from '@/entities/bank.entity';
import { IOffer, IOfferFilter, sortDirection, SortKey } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';

type Props = {
	bank: IBank;
	closeHandler: () => void;
};

const BankOffers = ({ bank, closeHandler }: Props) => {
	// const [bankOffers, setBankOffers] = useState<IOffer[]>([]);
	const { translations, language } = languageStore();
	const [offersFilter, setOffersFilter] = useState<IOfferFilter>({
		card: [],
		category: [],
		sortKey: '' as SortKey,
		sortDirection: 'asc' as sortDirection,
	});

	const { data, loadingMore, handleRefresh, loadMore, initialLoader } = usePagination<IOffer>({
		url: '/user/offers',
		getQuery: (page, limit) =>
			OffersApi.buildGetOffersQuery({
				card: '',
				bank: bank.id,
				category: offersFilter.category.join(','),
				page,
				limit,
				q: '',
				sort_by: offersFilter.sortKey,
				sort_direction: offersFilter.sortDirection,
			}),
		queryDependencies: [offersFilter],
	});

	useEffect(() => {
		handleRefresh();
	}, [offersFilter]);

	const flatlistRef = useRef<FlatList<IOffer>>(null);
	const theme = useThemeStyles();

	const scrollY = useSharedValue(0);

	// const goTopAnimation = useAnimatedStyle(() => {
	// 	const opacity = withTiming(scrollY.value > 150 ? 1 : 0, { duration: 250 });
	// 	return {
	// 		opacity,
	// 	};
	// });
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
		<View className='flex-1 gap-4 px-4 bg-background pb-10'>
			<View className='flex-row items-center justify-between pt-4'>
				<Typography
					numberOfLines={1}
					align='center'
					variant='body'
					className='m-auto border-b-2 border-selected'
					weight='bold'
				>
					{translations.tabs.offers.headerForSelectedCard.segement1 +
						' ' +
						bank.name[language]}
				</Typography>
				<CloseButton onTouchEnd={closeHandler} />
			</View>
			<Categories filter={offersFilter} setFilter={setOffersFilter} />
			{initialLoader ? (
				renderSkeleton(5)
			) : (
				<FlatList
					data={data}
					contentContainerStyle={{ gap: 10 }}
					keyExtractor={(item) => item.id}
					scrollEventThrottle={16}
					onEndReached={loadMore}
					onEndReachedThreshold={0.1}
					ListFooterComponent={renderFooter}
					renderItem={({ item }) => <OfferCard key={item.id} offer={item} />}
					ref={flatlistRef}
					onScroll={(e) => {
						scrollY.value = e.nativeEvent.contentOffset.y;
					}}
				/>
			)}

			<GoTopLayout
				style={{ bottom: 50 }}
				onPress={() => {
					flatlistRef.current?.scrollToOffset({ offset: 0 });
				}}
				scrollY={scrollY}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	goTop: {
		position: 'absolute',
		bottom: 45,
		right: 20,
		borderRadius: 100,
		padding: 10,
	},
});

export default BankOffers;
