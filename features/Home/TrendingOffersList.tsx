import { OffersApi } from '@/api/offers.api';
import Typography from '@/components/Typography/Typography';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { banksStore, favoritesStore, languageStore } from '@/stores';
import { formatExpiryMessage, formatUploadPath } from '@/utils/utils';
import { Octicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import { Skeleton } from 'moti/skeleton';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import OfferModalContent from '../Offers/OfferModalContent';

const TrendingOffersList = observer(() => {
	const [trendingOffers, setTrendingOffers] = useState<IOffer[]>([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [selectedOffer, setSelectedOffer] = useState<IOffer | null>(null);
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();

	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	const { translations, language } = languageStore();
	const { getBankById } = banksStore();
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

	const toggleFavorite = () => {
		if (isFavorite(selectedOffer!.id)) {
			removeFavorite(selectedOffer!);
		} else {
			addFavorite(selectedOffer!);
		}
	};

	const handleOfferPress = (offer: IOffer) => {
		setModalVisible(true);
		setSelectedOffer(offer);
	};

	const gradient: [string, string, string] = ['#E64A19', '#FF7043', '#FFAB91'];
	return (
		<LinearGradient
			colors={gradient}
			style={{
				flex: 1,
				padding: 10,
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
						style={{ width: 300, height: 300, opacity: 0.15 }}
					/>
				</View>
				<View className='z-20 gap-3'>
					<View className='flex-row gap-2 ml-3 items-baseline'>
						<Octicons size={24} name='stopwatch' color='white' />

						<Typography variant='h3' weight='bold' color='white'>
							{translations.tabs.home.headers.trendingOffers}
						</Typography>
					</View>

					<ScrollView
						className='pb-5'
						horizontal
						persistentScrollbar
						showsHorizontalScrollIndicator={false}
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
							trendingOffers.map((item: IOffer) => (
								<React.Fragment key={item.id}>
									<TouchableOpacity
										className='mx-2 w-[140px] flex flex-col items-center gap-3 shadow-sm bg-card  rounded-2xl p-1.5'
										onPress={() => handleOfferPress(item)}
									>
										<Image
											source={formatUploadPath(item.logo)}
											style={styles.logo}
											contentFit='cover'
										/>
										<View className='gap-2 w-full'>
											<View className='flex-row  gap-2'>
												<Typography
													style={{ lineHeight: 22 }}
													weight='bold'
													numberOfLines={1}
													variant='body'
													className='flex-1'
													color={theme['--primary']}
												>
													{item.title[language]}
												</Typography>

												<View style={styles.customShadow}>
													<Image
														source={formatUploadPath(
															getBankById(item.bankId).logo,
														)}
														style={styles.bankLogo}
													/>
												</View>
											</View>
											{/* <Typography
												variant='caption'
												weight='bold'
												color={theme['--danger']}
											>
												{formatExpiryMessage(
													item.expiry_date,
													translations,
												)}
											</Typography> */}
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
								setModalVisible(false);
							}}
							visible={modalVisible}
							animationType='slide'
						>
							<OfferModalContent
								offer={selectedOffer!}
								toggleFavorite={() => toggleFavorite()}
								favorite={isFavorite(selectedOffer!.id)}
								closeHandler={() => setModalVisible(false)}
							/>
						</Modal>
					)}
				</View>
			</>
		</LinearGradient>
	);
});

export default TrendingOffersList;

const styles = StyleSheet.create({
	logo: {
		width: 125,
		height: 125,
		borderRadius: 8,
	},
	bankLogo: {
		width: 18,
		height: 18,
		borderRadius: 50,
	},
	customShadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
	},
});
