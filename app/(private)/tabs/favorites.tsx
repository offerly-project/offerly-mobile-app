import Typography from '@/components/Typography/Typography';
import OfferCard from '@/features/Offers/OfferCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type Props = {};

const favorites = observer((props: Props) => {
	const offers = favoritesStore().offers;
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		favoritesStore()
			.getFavorites()
			.then(() => {
				setLoading(false);
			});
	}, []);
	return loading ? (
		<View className='flex-1 justify-center items-center'>
			<ActivityIndicator size='small' color={theme['--primary-1']} />
		</View>
	) : (
		<View className='p-6 flex-1'>
			<Typography variant='h3' color={theme['--text-1']} style={{ padding: 10 }}>
				Favorites
			</Typography>
			<FlatList
				data={offers}
				renderItem={({ item }) => <OfferCard offer={item} closeOnUnfavorite={true} />}
			/>
		</View>
	);
});

export default favorites;

const styles = StyleSheet.create({});
