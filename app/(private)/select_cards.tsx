import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { BanksApi } from '@/api/banks.api';
import { CardsApi } from '@/api/cards.api';
import BackButton from '@/components/Button/BackButton';
import Button from '@/components/Button/Buttton';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { SCREEN_WIDTH } from '@/constants/screens';
import { IBank } from '@/entities/bank.entity';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/components/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import CardsGridLayout from '@/layouts/CardsGridLayout';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { router } from 'expo-router';

const SelectCards = () => {
	const [loading, setLoading] = useState({ banks: true, cards: false, adding: false });
	const [banks, setBanks] = useState<IBank[]>([]);
	const [bankCards, setBankCards] = useState<ICard[]>([]);
	const [selectedBank, setSelectedBank] = useState<string | null>(null);
	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	// Shared value for opacity animation
	const opacity = useSharedValue(0);

	// Fade-in animation for the "Add" button
	useEffect(() => {
		opacity.value =
			selectedCards.length > 0
				? withSpring(1, { damping: 15, stiffness: 120 })
				: withSpring(0, { damping: 15, stiffness: 120 });
	}, [selectedCards, opacity]);

	// Animated style for the "Add" button
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	useEffect(() => {
		const fetchBanks = async () => {
			setLoading((prev) => ({ ...prev, banks: true }));
			try {
				const bankList = await BanksApi.fetchBanks();
				setBanks(bankList);
			} finally {
				setLoading((prev) => ({ ...prev, banks: false }));
			}
		};
		fetchBanks();
	}, []);

	const fetchBankCards = async (bankId: string) => {
		setLoading((prev) => ({ ...prev, cards: true }));
		try {
			const { cards } = await CardsApi.getCardsByBankId(bankId);
			setBankCards(cards);
		} finally {
			setLoading((prev) => ({ ...prev, cards: false }));
		}
	};

	const handleBankSelection = (bankId: string | null, closeHandler: () => void) => {
		if (bankId && bankId !== selectedBank) {
			fetchBankCards(bankId);
		}
		setSelectedBank(bankId);
		closeHandler();
	};

	const renderBankItem = (
		item: { name: string; value: string; data: IBank },
		closeHandler: () => void,
	) => (
		<Pressable
			style={styles.itemContainer}
			onPress={() => handleBankSelection(item.value, closeHandler)}
		>
			<View style={styles.itemContent}>
				<Image source={formatUploadPath(item.data.logo)} style={styles.bankLogo} />
				<View>
					<Typography variant='body' color={theme['--text']}>
						{item.data.name.en}
					</Typography>
				</View>
			</View>
			{item.value === selectedBank && (
				<Ionicons name='checkmark' size={16} color={theme['--text']} />
			)}
		</Pressable>
	);

	const disabled = !selectedBank || selectedCards.length === 0;

	const onAdd = async () => {
		setLoading((prev) => ({ ...prev, adding: true }));
		try {
			await CardsApi.patchUserCards(selectedCards);
			await cardsStore().fetchUserCards();
			router.back();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading((prev) => ({ ...prev, adding: false }));
		}
	};

	if (loading.banks)
		return (
			<View className='h-full w-full flex flex-col items-center justify-center'>
				<ActivityIndicator color={theme['--primary']} />
			</View>
		);

	return (
		<TabLayout title='Card Selection' leading={<BackButton />}>
			<>
				<Select
					items={banks.map((bank) => ({
						name: bank.name.en,
						value: bank.id,
						data: bank,
					}))}
					onChange={setSelectedBank}
					value={selectedBank}
					placeHolder='Select Bank'
					className='h-[40] w-[80%] m-auto my-4'
					itemRenderer={(item, _, closeHandler) => renderBankItem(item, closeHandler)}
					searchResolver={(item, search) =>
						item.data.name.en.toLowerCase().includes(search.toLowerCase())
					}
				/>
				<View style={{ height: '70%' }}>
					<CardsGridLayout
						data={bankCards.filter(
							(card) => !userCardsList.some((userCard) => userCard.id === card.id),
						)}
						renderItem={({ item }) => (
							<CardCard
								height={100}
								width={SCREEN_WIDTH * 0.28}
								logoHeight={50}
								logoWidth={100}
								card={item}
								onPress={() => {
									setSelectedCards((prev) => {
										if (prev.includes(item.id)) {
											return prev.filter((cardId) => cardId !== item.id);
										}
										return [...prev, item.id];
									});
								}}
								selected={
									selectedCards.includes(item.id) ||
									userCardsList.some((card) => card.id === item.id)
								}
							/>
						)}
						keyExtractor={(item) => item.id}
					/>
				</View>
				{selectedCards.length > 0 && (
					<Animated.View style={[styles.hapticPressContainer, animatedStyle]}>
						<Button
							borderStyle='filled'
							style={{ borderRadius: 20 }}
							loading={loading.adding}
							className='px-10'
							loadingComponent={<ActivityIndicator color={theme['--text']} />}
							onPress={onAdd}
							hapticFeedback
						>
							<Typography color={theme['--background']}>Add</Typography>
						</Button>
					</Animated.View>
				)}
			</>
		</TabLayout>
	);
};

export default SelectCards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		height: '100%',
	},
	itemContainer: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	itemContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	bankLogo: {
		width: 45,
		height: 45,
		borderRadius: 50,
	},
	hapticPressContainer: {
		width: '100%',
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 10,
	},
});
