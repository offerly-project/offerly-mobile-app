import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore } from '@/stores';
import { formatOfferChannels, formatUploadPath, truncateLongText, wait } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	offer: IOffer;
	closeOnUnfavorite?: boolean;
};

const OfferCard = observer(({ offer, closeOnUnfavorite = false }: Props) => {
	const theme = useThemeStyles();
	const [modalVisible, setModalVisible] = useState(false);
	const isFavorite = favoritesStore().isFavorite(offer.id);
	const { addFavorite, removeFavorite } = favoritesStore();
	const { top } = useSafeAreaInsets();
	return (
		<>
			<Pressable
				onPress={() => {
					setModalVisible(true);
				}}
				className='flex-row items-center justify-between rounded-lg border border-[rgba(0,0,0,0.1)] h-[150px] px-4 gap-10'
			>
				<View>
					<Image
						source={formatUploadPath(offer.logo)}
						style={{
							height: 50,
							width: 50,
							resizeMode: 'contain',
						}}
					/>
				</View>
				<View className='flex flex-col gap-2 flex-1'>
					<Typography variant='h3' color={theme['--primary-1']}>
						{truncateLongText(offer.title.en, 10)}
					</Typography>
					<Typography style={{ fontSize: 10, height: 50 }}>
						{truncateLongText(offer.description.en, 60)}
					</Typography>
					<Typography style={{ fontSize: 12 }} color={theme['--primary-3']}>
						{moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}
					</Typography>
				</View>
				<Pressable
					onPress={() => {
						if (isFavorite) {
							removeFavorite(offer);
						} else {
							addFavorite(offer);
						}
					}}
					className='flex-[0.2] items-center'
				>
					<Ionicons
						size={20}
						name={isFavorite ? 'heart' : 'hearto'}
						color={theme['--primary-1']}
					/>
				</Pressable>
			</Pressable>
			<Modal visible={modalVisible} animationType='slide'>
				<View style={{ paddingTop: top }} className='flex-1 p-10 justify-start'>
					<View className='flex flex-row items-end justify-between h-[50]'>
						<Pressable
							onPress={async () => {
								if (closeOnUnfavorite) {
									setModalVisible(false);
									await wait(500);
								}
								if (isFavorite) {
									removeFavorite(offer);
								} else {
									addFavorite(offer);
								}
							}}
							className='flex-[0.2] items-center'
						>
							<Ionicons
								size={25}
								name={isFavorite ? 'heart' : 'hearto'}
								color={theme['--primary-1']}
							/>
						</Pressable>

						<Pressable
							onPress={() => {
								setModalVisible(false);
							}}
						>
							<Ionicons size={25} name='close' color={theme['--primary-1']} />
						</Pressable>
					</View>
					<View className='flex-1 gap-4'>
						<View className='mx-auto h-[150]'>
							<Image
								source={formatUploadPath(offer.logo)}
								style={{
									height: 150,
									width: 150,
									resizeMode: 'contain',
								}}
							/>
						</View>
						<Typography variant='h2' color={theme['--text-1']}>
							{offer.title.en}
						</Typography>
						<View style={{ flex: 1 }}>
							<ScrollView contentContainerClassName='gap-4'>
								{/* Description */}
								<Typography color={theme['--text-2']}>
									{offer.description.en}
								</Typography>

								{/* Validity Period */}
								<Typography color={theme['--text-3']}>
									{offer.starting_date
										? `Valid From: ${moment(offer.starting_date).format('DD/MM/YYYY')}`
										: ''}
									{offer.expiry_date
										? ` - ${moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}`
										: ''}
								</Typography>

								{/* Discount Code */}
								{offer.discount_code && (
									<Typography color={theme['--text-1']}>
										Code: {offer.discount_code}
									</Typography>
								)}

								{/* Minimum Amount */}
								{offer.minimum_amount && (
									<Typography color={theme['--text-3']}>
										Minimum Amount: {offer.minimum_amount}
									</Typography>
								)}

								{/* Cap */}
								{offer.cap && (
									<Typography color={theme['--text-3']}>
										Cap: {offer.cap}
									</Typography>
								)}

								{/* Offer Link */}
								<View>
									<Link
										style={{
											marginRight: 'auto',
											borderColor: theme['--primary-1'],
										}}
										onPress={() => {
											Linking.openURL(offer.offer_source_link);
										}}
										color={theme['--primary-1']}
									>
										Offer Link
									</Link>
								</View>

								{/* Channels */}
								{offer.channels?.length > 0 && (
									<View>
										<Typography color={theme['--text-3']}>
											Channels:{' '}
											{formatOfferChannels(offer.channels).join(', ')}
										</Typography>
									</View>
								)}

								{/* Categories */}
								{offer.categories?.length > 0 && (
									<View>
										<Typography color={theme['--text-2']}>
											Categories: {offer.categories.join(', ')}
										</Typography>
									</View>
								)}

								{/* Terms and Conditions */}
								<View>
									<Typography color={theme['--text-3']}>
										Terms and Conditions:
									</Typography>
									<Typography color={theme['--text-2']}>
										{offer.terms_and_conditions.en}
									</Typography>
								</View>
							</ScrollView>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
});

export default OfferCard;

const styles = StyleSheet.create({});
