import { OffersApi } from '@/api/offers.api';
import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
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
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
	const [selectedCard, setSelectedCard] = useState<string>('');
	const [offersHeader, setOffersHeader] = useState<string>('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [search, setSearch] = useState<string>('');

	const { data, refreshing, loadingMore, handleRefresh, loadMore, initialLoader } =
		usePagination<IOffer>({
			url: '/user/offers',
			getQuery: (page, limit) =>
				OffersApi.buildGetOffersQuery({
					card: selectedCard,
					category: selectedCategory,
					page,
					limit,
					q: search,
				}),
			queryDependencies: [search, selectedCategory, selectedCard],
		});

	const renderFooter = () => {
		if (!loadingMore || data.length < 8) return null;
		return <ActivityIndicator color={theme['--primary']} animating size='small' />;
	};

	useEffect(() => {
		if (selectedCard == '') return setOffersHeader(translations.tabs.offers.header);
		return setOffersHeader(
			translations.tabs.offers.headerForSelectedCard +
				' ' +
				cardsStore().getCardById(selectedCard).name[language],
		);
	}, [selectedCard]);

	return (
		<TabLayout title={translations.tabs.offers.tabName}>
			<View className='gap-4 flex-1 pt-3'>
				<Categories
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
				/>
				<View className='w-[95%] flex-row gap-2 items-center m-auto'>
					<BottomSheetWrapper
						sheet={(closeHandler) => (
							<OffersFilter
								closeHandler={closeHandler}
								selectedCategory={selectedCategory}
								setSelectedCategory={setSelectedCategory}
								selectedCard={selectedCard}
								setSelectedCard={setSelectedCard}
							/>
						)}
					>
						{(openHandler) => (
							<Ionicons
								name='options-outline'
								onPress={openHandler}
								color={theme['--primary']}
								size={36}
							/>
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
					variant='h3'
					className='m-auto'
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
