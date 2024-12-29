import CloseButton from '@/components/Button/CloseButton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { ThemeStyle } from '@/constants/themes';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore } from '@/stores';
import { formatUploadPath, wait } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	offer: IOffer;
	closeOnUnfavorite?: boolean;
};

type FooterBuildElement = {
	key: string;
	value: string | number;
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

	const offerDateRangeFormat = useMemo(() => {
		const expFmt = moment(offer?.expiry_date?.toString()).format('DD/MM/YYYY');
		const startFmt = moment(offer?.starting_date?.toString()).format('DD/MM/YYYY');
		if (offer.starting_date && offer.expiry_date) {
			return `Start: ${startFmt} - Expiry: ${expFmt}`;
		}
		if (offer.starting_date && !offer.expiry_date) {
			return `Start: ${startFmt}`;
		}
		if (offer.expiry_date && !offer.starting_date) {
			return `Expiry: ${expFmt}`;
		}
		return null;
	}, [offer.expiry_date, offer.starting_date]);
	const styles = getStyles(theme);

	const footerBuildElements: FooterBuildElement[] = (function () {
		const elements: FooterBuildElement[] = [];
		if (offer.discount_code) {
			elements.push({ key: 'Discount Code', value: offer.discount_code });
		}
		if (offer.cap) {
			elements.push({ key: 'Discount Amount', value: `Up to ${offer.cap}` });
		}
		if (offer.minimum_amount) {
			elements.push({ key: 'Min. Spending', value: offer.minimum_amount });
		}
		if (offer.channels.length > 0) {
			const channels = [];
			if (offer.channels.includes('in-store')) {
				channels.push('In Store');
			}
			if (offer.channels.includes('online')) {
				channels.push('Online');
			}
			elements.push({ key: 'Offer Type', value: channels.join(' & ') });
		}

		return elements;
	})();

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				className='flex-row items-center justify-between rounded-2xl py-4 px-2 gap-5 bg-background-1 '
			>
				<View className='border-2 border-secondary-1 rounded-2xl overflow-hidden'>
					<Image
						source={formatUploadPath(offer.logo)}
						style={{ height: 100, width: 100, resizeMode: 'contain' }}
					/>
				</View>
				<View className='flex-1 justify-between'>
					<View className='flex-row justify-between'>
						<Typography
							variant='h3'
							weight='bold'
							color={theme['--primary-1']}
							numberOfLines={1}
							className='flex-shrink'
						>
							{offer.title.en}
						</Typography>
						<Pressable onPress={toggleFavorite}>
							<Ionicons
								size={22}
								name={favorite ? 'heart' : 'hearto'}
								color={theme['--primary-1']}
							/>
						</Pressable>
					</View>
					<Typography numberOfLines={2} variant='label' className='leading-1'>
						{offer.description.en.trim()}
					</Typography>
					<Typography variant='label' color={theme['--primary-3']}>
						{moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}
					</Typography>
				</View>
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
						<CloseButton onPress={() => setModalVisible(false)} />
					</View>

					<View className='flex-1 gap-4'>
						<Image
							source={formatUploadPath(offer.logo)}
							style={{
								height: 200,
								width: 200,
								resizeMode: 'contain',
								alignSelf: 'center',
								borderWidth: 1,
								borderColor: theme['--primary-1'],
								borderRadius: 40,
							}}
						/>
						<View className='flex flex-row m-auto items-center justify-center'>
							<Typography variant='title' color={theme['--primary-1']} weight='bold'>
								{offer.title.en}
							</Typography>
						</View>
						{offer.categories?.length > 0 &&
							offer.categories.map((category) => (
								<View
									key={category}
									className='rounded-full px-4 py-1 bg-primary-3'
									style={{ margin: 'auto' }}
								>
									<Typography color={theme['--background']}>
										{category}
									</Typography>
								</View>
							))}

						<ScrollView contentContainerClassName='gap-4'>
							<View style={[styles.section]}>
								{offerDateRangeFormat && (
									<Typography
										color={theme['--primary-1']}
										variant='body'
										weight='bold'
									>
										{offerDateRangeFormat}
									</Typography>
								)}
								<Typography
									variant='body'
									weight='light'
									color={theme['--primary-2']}
								>
									{offer.description.en.trim()}
								</Typography>
							</View>
							<View style={[styles.section]}>
								<Typography
									color={theme['--primary-1']}
									variant='body'
									weight='bold'
								>
									Terms & Conditions
								</Typography>

								<Typography
									variant='body'
									weight='light'
									color={theme['--primary-2']}
								>
									{offer.terms_and_conditions.en}
								</Typography>
							</View>
							<View style={[styles.section]}>
								{footerBuildElements.map((element) => (
									<View
										key={element.key}
										className='flex flex-row justify-between'
									>
										<Typography
											color={theme['--primary-1']}
											variant='body'
											weight='bold'
										>
											{element.key}:
										</Typography>
										<Typography
											variant='body'
											weight='bold'
											color={theme['--primary-2']}
										>
											{element.value}
										</Typography>
									</View>
								))}
								<Link
									color={theme['--primary-1']}
									style={{
										borderBottomColor: theme['--primary-1'],
										margin: 'auto',
										marginTop: 6,
									}}
									onPress={() => {
										Linking.openURL(offer.offer_source_link);
									}}
								>
									Offer Link
								</Link>
							</View>
						</ScrollView>
					</View>
				</View>
			</Modal>
		</>
	);
});

export default OfferCard;

const getStyles = (theme: ThemeStyle) =>
	StyleSheet.create({
		section: {
			borderRadius: 10,
			padding: 10,
			width: '100%',
			backgroundColor: theme['--background-1'],
		},
	});
