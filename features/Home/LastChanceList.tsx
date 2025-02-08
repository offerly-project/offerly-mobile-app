import { OffersApi } from '@/api/offers.api';
import Typography from '@/components/Typography/Typography';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { Skeleton } from 'moti/skeleton';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OfferModalContent from '../Offers/OfferModalContent';

const LastChanceList = observer(() => {
	const [lastChanceOffers, setLastChanceOffers] = useState<IOffer[]>([]);

	const [lastChanceOffersModalVisible, setLastChanceModalVisible] = useState(false);
	const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();

	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	const { translations, language } = languageStore();

	useEffect(() => {
		const fetchLastChanceOffers = async () => {
			setLoading(true);
			try {
				const lastOffersList = await OffersApi.getLastChanceOffers();
				setLastChanceOffers(lastOffersList);
			} finally {
				setLoading(false);
			}
		};
		fetchLastChanceOffers();
	}, []);

	const toggleFavorite = () => {
		if (isFavorite(selectedOffer!.id)) {
			removeFavorite(selectedOffer!);
		} else {
			addFavorite(selectedOffer!);
		}
	};

	const handleOfferPress = (offer: IOffer) => {
		setLastChanceModalVisible(true);
		setSelectedOffer(offer);
	};
	const calculateReminingTime = (offer: IOffer) => {
		const now = new Date();
		const expireDate = new Date(offer.expiry_date);
		const diffDays = moment(expireDate).diff(moment(now), 'days');
		return diffDays + ' ' + translations.tabs.home.headers.days;
	};

	const gradient: [string, string, string] = ['#6633CC', '#4A3792', '#222222'];
	return (
		<LinearGradient
			colors={gradient}
			style={{
				flex: 1,
				padding: 20,
				borderRadius: 10,
				position: 'relative',
			}}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
		>
			<>
				<View className='z-10 absolute'>
					<Image
						source={require('../../assets/icons/logo-white.png')}
						style={{ width: 400, height: 600, opacity: 0.04 }}
					/>
				</View>
				<View className='z-20'>
					<View className='flex-row gap-2 ml-3 items-baseline'>
						<Octicons size={24} name='stopwatch' color='white' />

						<Typography variant='h3' weight='bold' color='white'>
							{translations.tabs.home.headers.lastChance}
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
										<View className='my-4' key={`last-chance-skeleton-${i}`}>
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
							lastChanceOffers.map((item: IOffer) => (
								<React.Fragment key={item.id}>
									<TouchableOpacity
										className='mx-2 w-[155px] flex flex-col items-center gap-3 shadow-sm bg-card  rounded-2xl p-1.5'
										onPress={() => handleOfferPress(item)}
									>
										<Image
											source={formatUploadPath(item.logo)}
											style={styles.logo}
											contentFit='cover'
										/>
										<View className='gap-1'>
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
												variant='caption'
												weight='bold'
												color={theme['--danger']}
											>
												{translations.tabs.home.headers.expiresIn +
													' ' +
													calculateReminingTime(item)}
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
								setLastChanceModalVisible(false);
							}}
							visible={lastChanceOffersModalVisible}
							animationType='slide'
						>
							<OfferModalContent
								offer={selectedOffer!}
								toggleFavorite={() => toggleFavorite()}
								favorite={isFavorite(selectedOffer!.id)}
								closeHandler={() => setLastChanceModalVisible(false)}
							/>
						</Modal>
					)}
				</View>
			</>
		</LinearGradient>
	);
});

export default LastChanceList;

const styles = StyleSheet.create({
	logo: {
		width: 140,
		height: 140,
		borderRadius: 8,
	},
});
