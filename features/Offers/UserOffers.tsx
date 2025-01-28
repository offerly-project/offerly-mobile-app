import { OffersApi } from '@/api/offers.api';
import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { IOffer, IOfferFilter, sortDirection, SortKey } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import OffersFilter from '@/features/Offers/OffersFilter';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore, languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	const theme = useThemeStyles();
	const { getCardById } = cardsStore();
	const { translations, language } = languageStore();
	const [offersHeader, setOffersHeader] = useState<string>('');
	const [appliedFilterCount, setAppliedFilterCount] = useState<number>(0);

	const [offersFilter, setOffersFilter] = useState<IOfferFilter>({
		card: [],
		category: [],
		sortKey: `expiry_date` as SortKey,
		sortDirection: 'asc' as sortDirection,
	});

	const [search, setSearch] = useState<string>('');

	const { data, refreshing, loadingMore, handleRefresh, loadMore, initialLoader } =
		usePagination<IOffer>({
			url: '/user/offers',
			getQuery: (page, limit) =>
				OffersApi.buildGetOffersQuery({
					card: offersFilter.card.join(','),
					category: offersFilter.category.join(','),
					page,
					limit,
					q: search,
					sort_by: offersFilter.sortKey,
					sort_direction: offersFilter.sortDirection,
				}),
			queryDependencies: [search, offersFilter],
		});

	const renderFooter = () => {
		if (!loadingMore || data.length < 8) return null;
		return <ActivityIndicator color={theme['--primary']} animating size='small' />;
	};

	useEffect(() => {
		if (offersFilter.card.length === 0) return setOffersHeader(translations.tabs.offers.header);
		if (offersFilter.card.length === 1)
			return setOffersHeader(
				translations.tabs.offers.headerForSelectedCard.segement1 +
					' ' +
					getCardById(offersFilter.card[0]).name[language],
			);
		else
			return setOffersHeader(
				translations.tabs.offers.headerForSelectedCard.segement1 +
					' ' +
					offersFilter.card.length +
					' ' +
					translations.tabs.offers.headerForSelectedCard.segement2,
			);
	}, [offersFilter.card]);

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

	return (
		<TabLayout title={translations.tabs.offers.tabName}>
			<View className='gap-4 flex-1 pt-3'>
				<Categories filter={offersFilter} setFilter={setOffersFilter} />
				<View className='w-[95%] flex-row gap-2 items-center m-auto'>
					<BottomSheetWrapper
						sheet={(closeHandler) => (
							<OffersFilter
								closeHandler={closeHandler}
								filter={offersFilter}
								setFilter={setOffersFilter}
							/>
						)}
					>
						{(openHandler) => (
							<TouchableOpacity onPress={openHandler}>
								{appliedFilterCount !== 0 && (
									<View className='absolute -top-1 opacity-80 z-10 -right-1 w-[20px] h-[20px] bg-selected rounded-full'>
										<Typography align='center' weight='bold' variant='label'>
											{appliedFilterCount}
										</Typography>
									</View>
								)}
								<Ionicons
									name='options-outline'
									color={theme['--primary']}
									size={36}
								/>
							</TouchableOpacity>
						)}
					</BottomSheetWrapper>

					<View className='flex-1'>
						<Input
							trailingIcon={() => (
								<Ionicons size={22} color={theme['--primary']} name='search' />
							)}
							value={search}
							onChangeText={setSearch}
							placeholder={translations.placeholders.search}
							variant='primary'
						/>
					</View>
				</View>
				<Typography
					numberOfLines={1}
					align='center'
					variant='body'
					// color={theme['--primary']}
					className='m-auto border-b-2 border-selected'
					weight='bold'
				>
					{offersHeader}
				</Typography>

				{initialLoader ? (
					<ActivityIndicator
						className='flex-1'
						size='small'
						animating
						color={theme['--primary']}
					/>
				) : (
					<FlatList
						data={data}
						contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <OfferCard offer={item} />}
						refreshControl={
							<RefreshControl
								tintColor={theme['--primary']}
								refreshing={refreshing}
								onRefresh={handleRefresh}
							/>
						}
						ListFooterComponent={renderFooter}
						onEndReached={loadMore}
						onEndReachedThreshold={0.1}
					/>
				)}
			</View>
		</TabLayout>
	);
});

export default Offers;

const styles = StyleSheet.create({});
