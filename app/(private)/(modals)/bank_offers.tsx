import { OffersApi } from '@/api/offers.api';
import CloseButton from '@/components/Button/CloseButton';
import Typography from '@/components/Typography/Typography';
import { IBank } from '@/entities/bank.entity';
import { IOffer, IOfferFilter, sortDirection, SortKey } from '@/entities/offer.entity';
import Categories from '@/features/Offers/Categories';
import OfferCard from '@/features/Offers/OfferCard';
import { languageStore } from '@/stores';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type Props = {
	bank: IBank;
	closeHandler: () => void;
};

const BankOffers = ({ bank, closeHandler }: Props) => {
	const [bankOffers, setBankOffers] = useState<IOffer[]>([]);
	const { translations, language } = languageStore();

	const [offersFilter, setOffersFilter] = useState<IOfferFilter>({
		card: [],
		category: [],
		sortKey: '' as SortKey,
		sortDirection: 'asc' as sortDirection,
	});

	useEffect(() => {
		OffersApi.getOffers({
			bank: bank.id,
			card: '',
			category: offersFilter.category.join(','),
			page: 0,
			limit: 50,
			q: '',
			sort_by: '',
			sort_direction: 'asc',
		}).then((res) => {
			setBankOffers(res);
		});
	}, [offersFilter]);

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
				<CloseButton onPress={closeHandler} />
			</View>
			<Categories filter={offersFilter} setFilter={setOffersFilter} />
			<FlatList
				data={bankOffers}
				contentContainerStyle={{ gap: 10 }}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <OfferCard key={item.id} offer={item} />}
			/>
		</View>
	);
};

export default BankOffers;
