import CloseButton from '@/components/Button/CloseButton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { ThemeStyle } from '@/constants/themes';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, languageStore } from '@/stores';
import { formatUploadPath, wait } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { Linking, Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import CardCard from '../Cards/components/CardCard';

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
	const { translations, language } = languageStore();
	const { top } = useSafeAreaInsets();
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();
	const [modalVisible, setModalVisible] = useState(false);
	const favorite = isFavorite(offer.id);
	const toast = useToast();
	const toggleFavorite = async () => {
		if (closeOnUnfavorite) {
			setModalVisible(false);
			await wait(500);
		}
		if (favorite) {
			removeFavorite(offer);
		} else {
			addFavorite(offer);
			toast.show(translations.toast.addFavorite, { type: 'success' });
		}
	};

	const offerDateRangeFormat = useMemo(() => {
		const expFmt = moment(offer?.expiry_date?.toString()).format('DD/MM/YYYY');
		const startFmt = moment(offer?.starting_date?.toString()).format('DD/MM/YYYY');
		if (offer.starting_date && offer.expiry_date) {
			return `${translations.tabs.offers.offerDetails.expiryDate.from}: ${startFmt} - ${translations.tabs.offers.offerDetails.expiryDate.to}: ${expFmt}`;
		}
		if (offer.starting_date && !offer.expiry_date) {
			return `${translations.tabs.offers.offerDetails.expiryDate.from}: ${startFmt}`;
		}
		if (offer.expiry_date && !offer.starting_date) {
			return `${translations.tabs.offers.offerDetails.expiryDate.to}: ${expFmt}`;
		}
		return null;
	}, [offer.expiry_date, offer.starting_date]);
	const styles = getStyles(theme);

	const footerBuildElements: FooterBuildElement[] = (function () {
		const elements: FooterBuildElement[] = [];
		if (offer.discount_code) {
			elements.push({
				key: translations.tabs.offers.offerDetails.discountCode,
				value: offer.discount_code,
			});
		}
		if (offer.cap) {
			elements.push({
				key: translations.tabs.offers.offerDetails.discountAmount,
				value: `Up to ${offer.cap}`,
			});
		}
		if (offer.minimum_amount) {
			elements.push({
				key: translations.tabs.offers.offerDetails.minSpending,
				value: offer.minimum_amount,
			});
		}
		if (offer.channels.length > 0) {
			const channels = [];
			if (offer.channels.includes('in-store')) {
				channels.push('In Store');
			}
			if (offer.channels.includes('online')) {
				channels.push('Online');
			}
			elements.push({
				key: translations.tabs.offers.offerDetails.offerType,
				value: channels.join(' & '),
			});
		}

		return elements;
	})();

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				className='flex-row items-center justify-between rounded-2xl py-4 px-2 gap-5 bg-card'
			>
				<View className='border-2 border-secondary rounded-2xl overflow-hidden'>
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
							color={theme['--primary']}
							numberOfLines={1}
							className='flex-shrink pr-1'
						>
							{language == 'ar' ? offer.title.ar : offer.title.en}
						</Typography>
						<Pressable onPress={toggleFavorite}>
							<Ionicons
								size={22}
								name={favorite ? 'heart' : 'hearto'}
								color={theme['--primary']}
							/>
						</Pressable>
					</View>
					<Typography
						numberOfLines={2}
						variant='label'
						className='leading-1'
						color={theme['--text']}
					>
						{language == 'ar'
							? offer.description.ar.trim()
							: offer.description.en.trim()}
					</Typography>
					<Typography variant='label' color={theme['--primary']}>
						{moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}
					</Typography>
				</View>
			</Pressable>

			<Modal
				presentationStyle='pageSheet'
				onRequestClose={() => {
					setModalVisible(false);
				}}
				visible={modalVisible}
				animationType='slide'
			>
				<View style={{ paddingTop: top }} className='flex-1 p-10 bg-background'>
					<View className='flex-row items-end justify-between h-[50]'>
						<Pressable onPress={toggleFavorite} className='flex-[0.2] items-center'>
							<Ionicons
								size={25}
								name={favorite ? 'heart' : 'hearto'}
								color={theme['--primary']}
							/>
						</Pressable>
						<CloseButton onPress={() => setModalVisible(false)} />
					</View>

					<View className='flex-1 gap-4'>
						<ScrollView contentContainerClassName='gap-4'>
							<Image
								source={formatUploadPath(offer.logo)}
								style={{
									height: 200,
									width: 200,
									resizeMode: 'contain',
									alignSelf: 'center',
									borderWidth: 1,
									borderColor: theme['--primary'],
									borderRadius: 40,
								}}
							/>
							<View className='flex flex-row m-auto items-center justify-center'>
								<Typography
									variant='title'
									color={theme['--primary']}
									weight='bold'
								>
									{language == 'ar' ? offer.title.ar : offer.title.en}
								</Typography>
							</View>
							{offer?.categories?.length > 0 &&
								offer?.categories?.map((category) => (
									<View
										key={category}
										className='flex-row px-3.5 pt-1.5 gap-2 rounded-full bg-primary'
										style={{ margin: 'auto' }}
									>
										<Typography color={theme['--static']}>
											{category}
										</Typography>
									</View>
								))}
							<View>
								<Typography weight='bold' align='center'>
									{translations.tabs.offers.offerDetails.applicableCards}
								</Typography>
								<ScrollView
									horizontal
									style={styles.section}
									contentContainerStyle={
										offer.applicable_cards.length < 4 && {
											flex: 1,
											justifyContent: 'center',
										}
									}
								>
									{offer?.applicable_cards?.map((card) => (
										<CardCard small card={card} key={card.id} />
									))}
								</ScrollView>
							</View>
							<View style={[styles.section]}>
								{offerDateRangeFormat && (
									<Typography
										color={theme['--primary']}
										variant='body'
										weight='bold'
									>
										{offerDateRangeFormat}
									</Typography>
								)}
								<Typography variant='body' weight='light' color={theme['--text']}>
									{language == 'ar'
										? offer.description.ar.trim()
										: offer.description.en.trim()}
								</Typography>
							</View>
							<View style={[styles.section]}>
								<Typography color={theme['--primary']} variant='body' weight='bold'>
									{translations.tabs.account.terms_and_conditions.title}
								</Typography>

								<Typography variant='body' weight='light' color={theme['--text']}>
									{language == 'ar'
										? offer.terms_and_conditions.ar
										: offer.terms_and_conditions.en}
								</Typography>
							</View>
							<View style={[styles.section]}>
								{footerBuildElements.map((element) => (
									<View
										key={element.key}
										className='flex flex-row justify-between'
									>
										<Typography
											color={theme['--primary']}
											variant='body'
											weight='bold'
										>
											{element.key}:
										</Typography>
										<Typography
											variant='body'
											weight='bold'
											color={theme['--text']}
										>
											{element.value}
										</Typography>
									</View>
								))}
								<Link
									color={theme['--primary']}
									style={{
										borderBottomColor: theme['--primary'],
										margin: 'auto',
										marginTop: 6,
									}}
									onPress={() => {
										Linking.openURL(offer.offer_source_link);
									}}
								>
									{translations.tabs.offers.offerDetails.offerLink}
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
			backgroundColor: theme['--light-background'],
		},
	});
