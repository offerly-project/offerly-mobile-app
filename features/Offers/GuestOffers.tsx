import { OffersApi } from '@/api/offers.api';
import Input from '@/components/Input/Input';
import { IOffer, IOfferFilter, sortDirection, SortKey } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, staticDataStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import GuestOffersMessage from './GuestOffersMessage';

type Props = {};

const GuestOffers = observer((props: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();

	const [search, setSearch] = useState<string>('');

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IOffer[]>([]);

	const [offersFilter, setOffersFilter] = useState<IOfferFilter>({
		card: [''],
		category: [],
		sortKey: '' as SortKey,
		sortDirection: 'asc' as sortDirection,
	});

	useEffect(() => {
		OffersApi.getGuestOffers()
			.then((res) => {
				setData(res);
			})
			.finally(() => setLoading(false));
	}, []);
	const categoriesData = staticDataStore().categories;

	const offersList = useMemo(() => {
		let list = data;
		if (search) {
			list = list.filter((offer) =>
				offer.title[language].toLowerCase().includes(search.toLowerCase()),
			);
		}
		if (offersFilter.category.length !== 0) {
			list = list.filter((offer) =>
				offer.categories.some((cat) => offersFilter.category.includes(categoriesData[cat])),
			);
		}
		return list;
	}, [data, offersFilter.category, search]);

	return (
		<>
			<View className='gap-4 flex-1 pt-3'>
				<Categories filter={offersFilter} setFilter={setOffersFilter} />
				<View className='w-[95%] flex-row gap-2 items-center m-auto'>
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

				{loading ? (
					<ActivityIndicator
						className='flex-1'
						size='small'
						animating
						color={theme['--primary']}
					/>
				) : (
					<FlatList
						data={offersList}
						contentContainerStyle={{ gap: 10, paddingHorizontal: 12 }}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <OfferCard offer={item} />}
						onEndReachedThreshold={0.1}
					/>
				)}
				<GuestOffersMessage />
			</View>
		</>
	);
});

export default GuestOffers;

const styles = StyleSheet.create({});
