import CloseButton from '@/components/Button/CloseButton';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { ThemeStyle } from '@/constants/themes';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/AntDesign';
import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import moment from 'moment';
import { useMemo } from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import CardCard from '../Cards/CardCard';
import { OfferModalFooterBuildElement } from './OfferCard';

type Props = {
	offer: IOffer;
	toggleFavorite: () => void;
	favorite: boolean;
	closeHandler: () => void;
};

const OfferModalContent = ({ offer, toggleFavorite, favorite, closeHandler }: Props) => {
	const theme = useThemeStyles();
	const { language: langKey, translations } = languageStore();

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

	const footerBuildElements: OfferModalFooterBuildElement[] = (function () {
		const elements: OfferModalFooterBuildElement[] = [];

		if (offer.discount_code) {
			elements.push({
				key: translations.tabs.offers.offerDetails.discountCode,
				value: offer.discount_code,
				styles: {
					borderBottomWidth: 1,
					borderBottomColor: theme['--primary'],
					paddingBottom: 0,
					lineHeight: 0,
					color: theme['--primary'],
				},
				onPress: async () => {
					await Clipboard.setStringAsync(offer.discount_code);

					Toast.show({
						type: 'success',
						text1: translations.toast.discountCopied,
					});
				},
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
				channels.push(translations.tabs.offers.types['In-Store']);
			}
			if (offer.channels.includes('online')) {
				channels.push(translations.tabs.offers.types.Online);
			}
			elements.push({
				key: translations.tabs.offers.offerDetails.offerType,
				value: channels.join(' & '),
			});
		}

		return elements;
	})();

	const styles = getStyles(theme);

	return (
		<>
			<View className='flex-1 px-10 py-4 bg-background'>
				<View className='flex-row items-end justify-between py-6'>
					<Pressable
						onPress={toggleFavorite}
						className='flex-[0.2] items-center'
						hitSlop={20}
					>
						<Ionicons
							size={25}
							name={favorite ? 'heart' : 'hearto'}
							color={theme['--primary']}
						/>
					</Pressable>
					<CloseButton onTouchEnd={closeHandler} />
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
							<Typography variant='title' color={theme['--primary']} weight='bold'>
								{offer.title[langKey].trim()}
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
										{
											translations.tabs.offers.categories[
												category as keyof typeof translations.tabs.offers.categories
											]
										}
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
								<Typography color={theme['--primary']} variant='body' weight='bold'>
									{offerDateRangeFormat}
								</Typography>
							)}
							<Typography variant='body' weight='light' color={theme['--text']}>
								{offer.description[langKey].trim()}
							</Typography>
						</View>

						<View style={[styles.section]}>
							<Typography color={theme['--primary']} variant='body' weight='bold'>
								{translations.tabs.account.terms_and_conditions.title}
							</Typography>

							<Typography variant='body' weight='light' color={theme['--text']}>
								{offer.terms_and_conditions[langKey].trim()}
							</Typography>
						</View>

						<View style={[styles.section]}>
							{footerBuildElements.map((element) => (
								<View key={element.key} className='flex flex-row justify-between'>
									<Typography
										color={theme['--primary']}
										variant='body'
										weight='bold'
									>
										{element.key}:
									</Typography>
									<Pressable onPress={element.onPress}>
										<Typography
											variant='body'
											style={element.styles}
											weight='bold'
											color={theme['--text']}
										>
											{element.value}
										</Typography>
									</Pressable>
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
		</>
	);
};

export default OfferModalContent;

const getStyles = (theme: ThemeStyle) =>
	StyleSheet.create({
		section: {
			borderRadius: 10,
			padding: 10,
			width: '100%',
			backgroundColor: theme['--light-background'],
		},
	});
