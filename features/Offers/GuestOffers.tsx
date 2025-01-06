import { OffersApi } from '@/api/offers.api';
import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Input from '@/components/Input/Input';
import { IOffer } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import OffersFilter from '@/features/Offers/OffersFilter';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { languageStore, userStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import GuestOffersMessage from './GuestOffersMessage';

type Props = {};

const GuestOffers = observer((props: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
	const [selectedCard, setSelectedCard] = useState<string>('');

	const [selectedCategory, setSelectedCategory] = useState<string>('');

	const [search, setSearch] = useState<string>('');

	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<IOffer[]>([]);

	useEffect(() => {
		OffersApi.getGuestOffers()
			.then((res) => {
				setData(res);
			})
			.finally(() => setLoading(false));
	}, []);

	const offersList = useMemo(() => {
		let list = data;
		if (search) {
			list = list.filter((offer) =>
				offer.title[language].toLowerCase().includes(search.toLowerCase()),
			);
		}
		if (selectedCategory) {
			list = list.filter((offer) => offer.categories.includes(selectedCategory));
		}
		return list;
	}, [data, selectedCategory, search]);

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
								disabled={userStore().isGuest}
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
		</TabLayout>
	);
});

export default GuestOffers;

const styles = StyleSheet.create({});
