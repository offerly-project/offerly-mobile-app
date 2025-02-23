import { OffersApi } from '@/api/offers.api';
import { IOffer } from '@/entities/offer.entity';
import { languageStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import HomeOffersSlider from './HomeOffersSlider';

const TrendingOffersList = observer(() => {
	const [trendingOffers, setTrendingOffers] = useState<IOffer[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTrendingOffers = async () => {
			setLoading(true);
			try {
				const trendingOffersList = await OffersApi.getTrendingOffers();
				setTrendingOffers(trendingOffersList);
			} finally {
				setLoading(false);
			}
		};
		fetchTrendingOffers();
	}, []);

	const translation = languageStore().translations;

	const gradient: [string, string, string] = ['#E64A19', '#FF7043', '#FFAB91'];
	return (
		<HomeOffersSlider
			gradient={gradient}
			title={translation.tabs.home.headers.trendingOffers}
			loading={loading}
			offers={trendingOffers}
		/>
	);
});

export default TrendingOffersList;
