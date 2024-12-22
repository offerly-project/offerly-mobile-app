import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore } from '@/stores';
import { formatOfferChannels, formatUploadPath, wait } from '@/utils/utils';
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
	const { top } = useSafeAreaInsets();
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();
	const [modalVisible, setModalVisible] = useState(false);
	const favorite = isFavorite(offer.id);

	const toggleFavorite = async () => {
		if (closeOnUnfavorite) {
			setModalVisible(false);
			await wait(500);
		}
		if (favorite) {
			removeFavorite(offer);
		} else {
			addFavorite(offer);
		}
	};

	const formatValidityPeriod = () => {
		const start = offer.starting_date ? moment(offer.starting_date).format('DD/MM/YYYY') : '';
		const end = offer.expiry_date ? moment(offer.expiry_date).format('DD/MM/YYYY') : '';
		return start || end ? `Valid From: ${start} - ${end}` : '';
	};

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				className='flex-row items-center justify-between rounded-lg border border-[rgba(0,0,0,0.1)] h-[150px] px-4 gap-10'
			>
				<Image
					source={formatUploadPath(offer.logo)}
					style={{ height: 50, width: 50, resizeMode: 'contain' }}
				/>
				<View className='flex-1 flex-col gap-2'>
					<Typography variant='h3' color={theme['--primary-1']} numberOfLines={1}>
						{offer.title.en}
					</Typography>
					<Typography numberOfLines={2} style={{ fontSize: 10, height: 50 }}>
						{offer.description.en}
					</Typography>
					<Typography style={{ fontSize: 12 }} color={theme['--primary-3']}>
						{moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}
					</Typography>
				</View>
				<Pressable onPress={toggleFavorite} className='flex-[0.2] items-center'>
					<Ionicons
						size={20}
						name={favorite ? 'heart' : 'hearto'}
						color={theme['--primary-1']}
					/>
				</Pressable>
			</Pressable>

			<Modal visible={modalVisible} animationType='slide'>
				<View style={{ paddingTop: top }} className='flex-1 p-10'>
					<View className='flex-row items-end justify-between h-[50]'>
						<Pressable onPress={toggleFavorite} className='flex-[0.2] items-center'>
							<Ionicons
								size={25}
								name={favorite ? 'heart' : 'hearto'}
								color={theme['--primary-1']}
							/>
						</Pressable>
						<Pressable onPress={() => setModalVisible(false)}>
							<Ionicons size={25} name='close' color={theme['--primary-1']} />
						</Pressable>
					</View>

					<View className='flex-1 gap-4'>
						<Image
							source={formatUploadPath(offer.logo)}
							style={{
								height: 150,
								width: 150,
								resizeMode: 'contain',
								alignSelf: 'center',
							}}
						/>
						<Typography variant='h2' color={theme['--text-1']}>
							{offer.title.en}
						</Typography>

						<ScrollView contentContainerClassName='gap-4'>
							<Typography color={theme['--text-2']}>
								{offer.description.en}
							</Typography>
							{formatValidityPeriod() && (
								<Typography color={theme['--text-3']}>
									{formatValidityPeriod()}
								</Typography>
							)}
							{offer.discount_code && (
								<Typography color={theme['--text-1']}>
									Code: {offer.discount_code}
								</Typography>
							)}
							{offer.minimum_amount && (
								<Typography color={theme['--text-3']}>
									Minimum Amount: {offer.minimum_amount}
								</Typography>
							)}
							{offer.cap && (
								<Typography color={theme['--text-3']}>Cap: {offer.cap}</Typography>
							)}
							{offer.offer_source_link && (
								<Link
									onPress={() => Linking.openURL(offer.offer_source_link)}
									style={{
										borderColor: theme['--primary-1'],
										alignSelf: 'flex-start',
									}}
									color={theme['--primary-1']}
								>
									Offer Link
								</Link>
							)}
							{offer.channels?.length > 0 && (
								<Typography color={theme['--text-3']}>
									Channels: {formatOfferChannels(offer.channels).join(', ')}
								</Typography>
							)}
							{offer.categories?.length > 0 && (
								<Typography color={theme['--text-2']}>
									Categories: {offer.categories.join(', ')}
								</Typography>
							)}
							{offer.terms_and_conditions?.en && (
								<>
									<Typography color={theme['--text-3']}>
										Terms and Conditions:
									</Typography>
									<Typography color={theme['--text-2']}>
										{offer.terms_and_conditions.en}
									</Typography>
								</>
							)}
						</ScrollView>
					</View>
				</View>
			</Modal>
		</>
	);
});

export default OfferCard;

const styles = StyleSheet.create({});
