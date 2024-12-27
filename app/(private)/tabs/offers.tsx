import { OffersApi } from '@/api/offers.api';
import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { SCREEN_HEIGHT } from '@/constants/screens';
import { IOffer } from '@/entities/offer.entity';
import OfferCard from '@/features/Offers/OfferCard';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore, staticDataStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	RefreshControl,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	const theme = useThemeStyles();
	const CategoriesIcons = [
		{
			name: 'Shopping',
			component: (
				<MaterialCommunityIcons
					color={theme['--primary-1']}
					size={18}
					name='shopping-outline'
				/>
			),
		},
		{
			name: 'Travel',
			component: <SimpleLineIcons color={theme['--primary-1']} size={18} name='plane' />,
		},
		{
			name: 'Restaurants & Cafes',
			component: <Ionicons color={theme['--primary-1']} size={18} name='fast-food-outline' />,
		},
		{
			name: 'Entertainment',
			component: (
				<MaterialCommunityIcons
					color={theme['--primary-1']}
					size={18}
					name='gamepad-variant-outline'
				/>
			),
		},
		{
			name: 'Car Services',
			component: (
				<MaterialCommunityIcons color={theme['--primary-1']} size={18} name='car-outline' />
			),
		},
		{
			name: 'Health & Wellness',
			component: (
				<MaterialCommunityIcons color={theme['--primary-1']} size={18} name='medical-bag' />
			),
		},
		{
			name: 'Others',
			component: <Octicons color={theme['--primary-1']} size={18} name='stack' />,
		},
		{
			name: 'Groceries',
			component: (
				<MaterialCommunityIcons
					color={theme['--primary-1']}
					size={18}
					name='food-apple-outline'
				/>
			),
		},
	];
	const staticCategories = staticDataStore().categories;
	const categoriesWithIcons: { catName: string; icon: React.ReactNode }[] = staticCategories.map(
		(cat) => {
			return { catName: cat, icon: CategoriesIcons.find((x) => x.name == cat)?.component };
		},
	);
	const [categories, setCategories] = useState(categoriesWithIcons);
	const categoriesScrollViewRef = useRef<ScrollView>(null);
	const { userCardsList } = cardsStore();
	const [selectedCard, setSelectedCard] = useState<string>('674967958654b446fb613c74');
	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].catName);
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
		return <ActivityIndicator color={theme['--primary-1']} animating size='small' />;
	};
	return (
		<TabLayout title='Offers'>
			<View className='gap-5 flex-1 pt-3'>
				<View>
					<Select
						value={selectedCard}
						onChange={(value) => setSelectedCard(value)}
						items={userCardsList
							.sort((a, b) => a.bank.name.en.localeCompare(b.bank.name.en))
							.map((card) => ({
								name: card.name.en,
								value: card.id,
								data: card,
							}))}
						searchResolver={(item, search) =>
							item.name.toLowerCase().includes(search.toLowerCase())
						}
						itemRenderer={(item, _, closeHandler) => (
							<View className='flex flex-row items-center h-[75px] gap-6 w-full justify-between'>
								<Pressable
									onPress={() => {
										setSelectedCard(item.value);
										closeHandler();
									}}
									className='flex flex-row items-center gap-4'
								>
									<Image
										source={formatUploadPath(item.data.logo)}
										style={{ height: 25, width: 50 }}
									/>
									<Typography
										color={theme['--primary-2']}
										className='w-[150px]'
										variant='label'
									>
										{item.name}
									</Typography>
								</Pressable>
								{item.value === selectedCard && (
									<Ionicons
										name='checkmark-circle'
										size={25}
										color={theme['--primary-1']}
									/>
								)}
							</View>
						)}
						className='mx-2 p-2'
					/>
				</View>
				<ScrollView
					horizontal
					ref={categoriesScrollViewRef}
					style={{ width: '95%', margin: 'auto', minHeight: 35, maxHeight: 35 }}
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						gap: 10,
						paddingHorizontal: 10,
						margin: 'auto',
					}}
				>
					{categories.map((category) => (
						<Pressable
							onPress={() => {
								if (category.catName === selectedCategory) {
									setSelectedCategory('');
									return;
								}
								setCategories((prevCategories) => {
									const updatedCategories = prevCategories.filter(
										(cat) => cat != category,
									);
									updatedCategories.unshift(category);
									categoriesScrollViewRef.current?.scrollTo({
										x: 0,
										y: 0,
										animated: true,
									});
									return updatedCategories;
								});
								setSelectedCategory(category.catName);
							}}
							key={category.catName}
							className={`flex-row px-2.5 pt-1.5 gap-2 rounded-full ${category.catName === selectedCategory ? 'border-2 border-primary-3' : 'border border-secondary-1'}`}
						>
							{category.icon}
							<Typography
								variant='body'
								weight='bold'
								color={
									category.catName === selectedCategory
										? theme['--primary-1']
										: theme['--secondary-1']
								}
							>
								{category.catName}
							</Typography>
						</Pressable>
					))}
				</ScrollView>
				<View className='w-[95%] flex-row gap-2 items-center m-auto'>
					<Ionicons name='options-outline' color={theme['--primary-1']} size={36} />
					<View className='flex-1'>
						<Input
							trailingIcon={() => (
								<Ionicons size={22} color={theme['--primary-1']} name='search' />
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
						color={theme['--primary-1']}
					/>
				) : (
					<FlatList
						data={data}
						contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <OfferCard offer={item} />}
						refreshControl={
							<RefreshControl
								tintColor={theme['--primary-1']}
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
