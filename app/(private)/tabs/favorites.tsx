import NoData from '@/components/Fallback/NoData';
import OfferCard from '@/features/Offers/OfferCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { favoritesStore, languageStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type Props = {};

const Favorites = observer((props: Props) => {
	const offers = favoritesStore().offers;
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		favoritesStore()
			.getFavorites()
			.then(() => {
				setLoading(false);
			});
	}, []);

	return (
		<TabLayout title={translations.tabs.favorites.tabName}>
			{loading ? (
				<View className='flex-1 justify-center items-center'>
					<ActivityIndicator size='small' color={theme['--primary']} />
				</View>
			) : offers.length === 0 ? (
				<NoData message='No Favorites' />
			) : (
				<View className='p-6 flex-1'>
					<FlatList
						data={offers}
						contentContainerStyle={{ gap: 14 }}
						renderItem={({ item }) => (
							<OfferCard offer={item} closeOnUnfavorite={true} />
						)}
					/>
				</View>
			)}
		</TabLayout>
	);
});

export default Favorites;

const styles = StyleSheet.create({});
