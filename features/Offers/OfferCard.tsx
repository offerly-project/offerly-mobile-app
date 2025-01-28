import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { favoritesStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import Ionicons from '@expo/vector-icons/AntDesign';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { useState } from 'react';
import { Modal, Pressable, StyleProp, TextStyle, View } from 'react-native';

import Toast from 'react-native-toast-message';
import OfferModalContent from './OfferModalContent';

type Props = {
	offer: IOffer;
	closeOnUnfavorite?: boolean;
};

export type OfferModalFooterBuildElement = {
	key: string;
	value: string | number;
	styles?: StyleProp<TextStyle>;
	onPress?: () => void;
};

const OfferCard = observer(({ offer, closeOnUnfavorite = false }: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
	const { addFavorite, removeFavorite, isFavorite } = favoritesStore();
	const [modalVisible, setModalVisible] = useState(false);
	const favorite = isFavorite(offer.id);

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

	return (
		<>
			<Pressable
				onPress={() => setModalVisible(true)}
				className='flex-row items-center justify-between rounded-2xl py-4 gap-5 bg-card px-5'
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
						<Pressable
							onPress={() => {
								toggleFavorite({ modal: false });
							}}
							hitSlop={20}
						>
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
						{offer.description[langKey].trim()}
					</Typography>
					<Typography variant='label' color={theme['--primary']}>
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
