import { OffersApi } from '@/api/offers.api';
import { IOffer } from '@/entities/offer.entity';
import { languageStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import HomeOffersSlider from './HomeOffersSlider';

const RecentlyAddedList = observer(() => {
	const [recentlyAddedOffers, setRecentlyAddedOffers] = useState<IOffer[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchRecentlyAddedOffers = async () => {
			setLoading(true);
			try {
				const recentlyAddedList = await OffersApi.getNewlyAddedOffers();
				setRecentlyAddedOffers(recentlyAddedList);
			} finally {
				setLoading(false);
			}
		};
		fetchRecentlyAddedOffers();
	}, []);

	const translation = languageStore().translations;
	const gradient: [string, string, string] = ['#6A4CBB', '#6C5CE7', '#A29BFE'];

	return (
		<HomeOffersSlider
			gradient={gradient}
			title={translation.tabs.home.headers.recentlyAdded}
			loading={loading}
			offers={recentlyAddedOffers}
		/>
	);
});

export default RecentlyAddedList;
