import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { banksStore, favoritesStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useState } from 'react';
import { Modal, Pressable, StyleProp, StyleSheet, TextStyle, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import OfferModalContent from './OfferModalContent';

type Props = {
	offer: IOffer;
	closeOnUnfavorite?: boolean;
	highlighted?: boolean;
};

export type OfferModalFooterBuildElement = {
	key: string;
	value: string | number;
	styles?: StyleProp<TextStyle>;
	onPress?: () => void;
};

const OfferCard = observer(({ offer, closeOnUnfavorite = false, highlighted }: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();
	const [modalVisible, setModalVisible] = useState(false);
	const favorite = isFavorite(offer.id);
	const { getBankById } = banksStore();
	const toggleFavorite = async ({ modal }: { modal: boolean }) => {
		if (favorite) {
			if (closeOnUnfavorite && modal) {
				setModalVisible(false);
			}
			removeFavorite(offer);
		} else {
			addFavorite(offer);
			if (!modal)
				Toast.show({
					type: 'success',
					text1: translations.toast.addFavorite,
				});
		}
	};

	const langKey = language == 'ar' ? 'ar' : 'en';

	const hasExpired = moment().isAfter(offer.expiry_date);

	const cardBg = highlighted ? 'bg-card-highlighted' : 'bg-card';

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				className={`flex-row justify-between rounded-2xl py-4 gap-5 ${cardBg} px-5`}
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
							{offer.title[langKey]}
						</Typography>
					</View>
					<Typography
						numberOfLines={2}
						variant='label'
						className='leading-1'
						color={theme['--text']}
					>
						{offer.description[langKey].trim()}
					</Typography>

					<Typography variant='label' color={theme['--primary']} weight='bold'>
						{translations.tabs.offers.valid}{' '}
						{moment(offer.expiry_date.toString()).format('DD/MM/YYYY')}
					</Typography>

					{hasExpired && (
						<View className='flex flex-row justify-end items-center'>
							<Typography
								variant='body'
								weight='bold'
								color={theme['--danger']}
								numberOfLines={1}
								className='flex-shrink pr-1'
							>
								{translations.expired}
							</Typography>
						</View>
					)}
				</View>
				<View className='flex-col justify-between items-center'>
					<Pressable
						onPress={() => {
							toggleFavorite({ modal: false });
						}}
						hitSlop={20}
					>
						<AntDesign
							size={22}
							name={favorite ? 'heart' : 'hearto'}
							color={theme['--primary']}
						/>
					</Pressable>
					<Image
						source={formatUploadPath(getBankById(offer.bankId)?.logo)}
						style={styles.bankLogo}
					/>
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
				<OfferModalContent
					offer={offer}
					toggleFavorite={() => toggleFavorite({ modal: true })}
					favorite={favorite}
					closeHandler={() => setModalVisible(false)}
				/>
			</Modal>
		</>
	);
});

export default OfferCard;

const styles = StyleSheet.create({
	bankLogo: {
		width: 30,
		height: 30,
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
