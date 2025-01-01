import { OffersApi } from '@/api/offers.api';
import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Input from '@/components/Input/Input';
import { IOffer } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import OffersFilter from '@/features/Offers/OffersFilter';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	const theme = useThemeStyles();
	const [selectedCard, setSelectedCard] = useState<string>('');
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
	return (
		<TabLayout title='Offers'>
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
							placeholder='Search...'
							variant='primary'
						/>
					</View>
				</View>
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
