import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Input from '@/components/Input/Input';
import { Ionicons } from '@expo/vector-icons';
import BanksList from '@/features/Home/BanksList';
import LastChanceList from '@/features/Home/LastChanceList';
import RecenetlyAddedList from '@/features/Home/RecenetlyAddedList';
import { useEffect, useState } from 'react';
import { OffersApi } from '@/api/offers.api';
import { IOffer } from '@/entities/offer.entity';
import { languageStore } from '@/stores';

type Props = {};

const Home = () => {
	const theme = useThemeStyles();
	const [search, setSearch] = useState('');
	const [offers, setOffers] = useState<IOffer[]>([]);
	const { translations } = languageStore();

	useEffect(() => {
		(async () => {
			const offerList = await OffersApi.searchOffers(search);
			setOffers(offerList);
		})();
	}, [search]);

	return (
		<TabLayout title='Home'>
			<View className='px-4 py-2'>
				<Input
					trailingIcon={() => (
						<Ionicons size={22} color={theme['--primary']} name='search' />
					)}
					value={search}
					onChangeText={setSearch}
					placeholder={translations.placeholders.homePagePlaceholder}
					variant='primary'
				/>
			</View>
			<ScrollView className='px-3 py-5 mb-5' contentContainerClassName='gap-4'>
				<BanksList />
				<LastChanceList />
				<RecenetlyAddedList />
			</ScrollView>
		</TabLayout>
	);
};

export default Home;
