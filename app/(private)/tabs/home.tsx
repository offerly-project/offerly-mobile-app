import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { SCREEN_HEIGHT } from '@/constants/screens';
import { IOffer } from '@/entities/offer.entity';
import OfferCard from '@/features/Offers/OfferCard';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, staticDataStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';

type Props = {};

const Home = observer((props: Props) => {
	const { userCardsList } = cardsStore();
	const [selectedCard, setSelectedCard] = useState<string>('674967958654b446fb613c74');
	const categories = staticDataStore().categories;
	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
	const [search, setSearch] = useState<string>('');
	const theme = useThemeStyles();

	const { data, refreshing, loadingMore, handleRefresh, loadMore, initialLoader } =
		usePagination<IOffer>({
			url: '/user/offers',
			getQuery: (page, limit) =>
				`page=${page}&limit=${limit}&q=${search}&category=${selectedCategory}&card=${selectedCard}`,
			queryDependencies: [search, selectedCategory, selectedCard],
		});

	const renderFooter = () => {
		if (!loadingMore || data.length < 8) return null;
		return <ActivityIndicator animating size='small' />;
	};

	return (
		<SafeAreaView className='gap-10'>
			<View className='p-4'>
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
					className='h-[45px] w-[80%] m-auto'
				/>
			</View>
			<ScrollView
				horizontal
				style={{ width: '95%', margin: 'auto' }}
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
							if (category === selectedCategory) {
								setSelectedCategory('');
								return;
							}
							setSelectedCategory(category);
						}}
						style={{ opacity: category === selectedCategory ? 0.4 : 1 }}
						key={category}
						className='h-[50px] border border-primary-1 items-center justify-center px-10 rounded-lg'
					>
						<Typography variant='body' color={theme['--primary-1']}>
							{category}
						</Typography>
					</Pressable>
				))}
			</ScrollView>
			<View className='w-[95%] m-auto'>
				<Input
					value={search}
					onChangeText={setSearch}
					placeholder='Search...'
					variant='primary'
				/>
			</View>
			{initialLoader ? (
				<ActivityIndicator size='small' />
			) : (
				<FlatList
					data={data}
					style={{ height: SCREEN_HEIGHT / 2 }}
					contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <OfferCard offer={item} />}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
					}
					ListFooterComponent={renderFooter}
					onEndReached={loadMore}
					onEndReachedThreshold={0.1}
				/>
			)}
		</SafeAreaView>
	);
});

export default Home;

const styles = StyleSheet.create({});
