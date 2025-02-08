import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome5 } from '@expo/vector-icons';
import Typography from '@/components/Typography/Typography';
import { Skeleton } from 'moti/skeleton';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { Image } from 'expo-image';
import { formatUploadPath } from '@/utils/utils';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, languageStore } from '@/stores';
import { IOffer } from '@/entities/offer.entity';
import { OffersApi } from '@/api/offers.api';
import OfferModalContent from '../Offers/OfferModalContent';
import { observer } from 'mobx-react-lite';

const RecenetlyAddedList = observer(() => {
	const [recentlyAddedOffers, setRecentlyAddedOffers] = useState<IOffer[]>([]);
	const [recentlyAddedOffersModalVisible, setRecentlyAddedModalVisible] = useState(false);
	const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	const { translations, language } = languageStore();

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

	const toggleFavorite = () => {
		if (isFavorite(selectedOffer!.id)) {
			removeFavorite(selectedOffer!);
		} else {
			addFavorite(selectedOffer!);
		}
	};

	const handleOfferPress = (offer: IOffer) => {
		setRecentlyAddedModalVisible(true);
		setSelectedOffer(offer);
	};

	return (
		<View className='gap-2 p-2 shadow-sm bg-secondary rounded-lg '>
			<View className='flex-row gap-2 ml-3 items-baseline'>
				<FontAwesome5 size={24} name='fire' color='white' />

				<Typography variant='h3' weight='bold' color='white'>
					{translations.tabs.home.headers.recentlyAdded}
				</Typography>
			</View>

			<ScrollView
				className='pb-5'
				horizontal
				persistentScrollbar
				showsHorizontalScrollIndicator
			>
				{loading ? (
					<View className='flex-row gap-4 mx-2'>
						<Skeleton.Group show={true}>
							{new Array(5).fill(0).map((_, i) => (
								<View className='my-4' key={`recently-added-skeleton-${i}`}>
									<Skeleton
										colors={theme.skeleton}
										height={styles.logo.height}
										width={styles.logo.width}
										radius={styles.logo.borderRadius}
										transition={SKELETON_TRANSITIONS}
									/>
								</View>
							))}
						</Skeleton.Group>
					</View>
				) : (
					recentlyAddedOffers.map((item: IOffer) => (
						<React.Fragment key={item.id}>
							<TouchableOpacity
								key={item.id}
								className='mx-2 w-[155px] flex flex-col items-center gap-3 shadow-sm bg-card rounded-2xl p-1.5'
								onPress={() => handleOfferPress(item)}
							>
								<Image source={formatUploadPath(item.logo)} style={styles.logo} />
								<View className='gap-2'>
									<Typography
										style={{ lineHeight: 22 }}
										weight='bold'
										numberOfLines={1}
										align='center'
										variant='body'
										color={theme['--text']}
									>
										{item.title[language]}
									</Typography>
									<Typography
										style={{ lineHeight: 18 }}
										weight='medium'
										numberOfLines={2}
										align='center'
										variant='label'
										color={theme['--text']}
									>
										{item.terms_and_conditions[language]}
									</Typography>
								</View>
							</TouchableOpacity>
						</React.Fragment>
					))
				)}
			</ScrollView>
			{selectedOffer && (
				<Modal
					presentationStyle='pageSheet'
					onRequestClose={() => {
						setRecentlyAddedModalVisible(false);
					}}
					visible={recentlyAddedOffersModalVisible}
					animationType='slide'
				>
					<OfferModalContent
						offer={selectedOffer!}
						toggleFavorite={() => toggleFavorite()}
						favorite={isFavorite(selectedOffer.id)}
						closeHandler={() => setRecentlyAddedModalVisible(false)}
					/>
				</Modal>
			)}
		</View>
	);
});

export default RecenetlyAddedList;

const styles = StyleSheet.create({
	logo: {
		width: 140,
		height: 140,
		borderRadius: 8,
	},
});
