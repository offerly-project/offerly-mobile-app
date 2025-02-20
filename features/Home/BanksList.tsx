import { BanksApi } from '@/api/banks.api';
import BankOffers from '@/app/(private)/(modals)/bank_offers';
import Typography from '@/components/Typography/Typography';
import { SKELETON_TRANSITIONS } from '@/constants/transitions';
import { IBank } from '@/entities/bank.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const BanksList = () => {
	const [banks, setBanks] = useState<IBank[]>([]);
	const [bankOffersModalVisible, setBankOffersModalVisible] = useState(false);
	const [selectedBank, setSelectedBank] = useState<IBank | null>(null);
	const theme = useThemeStyles();
	const [loading, setLoading] = useState(true);
	const { translations, language } = languageStore();

	useEffect(() => {
		const fetchBanks = async () => {
			setLoading(true);
			try {
				const bankList = await BanksApi.fetchBanks();
				setBanks(bankList);
			} finally {
				setLoading(false);
			}
		};
		fetchBanks();
	}, []);

	const handleBankPress = (bank: IBank) => {
		setBankOffersModalVisible(true);
		setSelectedBank(bank);
	};

	return (
		<View className='gap-2'>
			<View className='flex-row gap-2 ml-3 items-baseline'>
				<MaterialCommunityIcons size={24} name='bank' color={theme['--text']} />

				<Typography variant='h3' weight='bold'>
					{translations.tabs.home.headers.banks}
				</Typography>
			</View>

			<ScrollView className='shadow-md pt-2' horizontal>
				{loading ? (
					<View className='flex-row gap-4 mx-2'>
						<Skeleton.Group show={true}>
							{new Array(5).fill(0).map((_, i) => (
								<View className='my-4' key={`banks-skeleton-${i}`}>
									<Skeleton
										colors={theme.skeleton}
										height={styles.bankLogo.height}
										width={styles.bankLogo.width}
										radius={styles.bankLogo.borderRadius}
										transition={SKELETON_TRANSITIONS}
									/>
								</View>
							))}
						</Skeleton.Group>
					</View>
				) : (
					banks.map((item: IBank) => (
						<React.Fragment key={item.id}>
							<TouchableOpacity
								className='w-[85px] flex flex-col items-center gap-3 rounded-2xl p-1.5'
								onPress={() => handleBankPress(item)}
							>
								<Image
									source={formatUploadPath(item.logo)}
									style={styles.bankLogo}
								/>
								<Typography
									style={{ lineHeight: 22 }}
									weight='medium'
									numberOfLines={2}
									align='center'
									variant='label'
									color={theme['--text']}
								>
									{item.name[language]}
								</Typography>
							</TouchableOpacity>
						</React.Fragment>
					))
				)}
			</ScrollView>
			<Modal
				presentationStyle='pageSheet'
				onRequestClose={() => {
					setBankOffersModalVisible(false);
				}}
				visible={bankOffersModalVisible}
				animationType='slide'
			>
				<BankOffers
					bank={selectedBank!}
					closeHandler={() => setBankOffersModalVisible(false)}
				/>
			</Modal>
		</View>
	);
};

export default BanksList;

const styles = StyleSheet.create({
	bankLogo: {
		width: 60,
		height: 60,
		borderRadius: 50,
	},
});
