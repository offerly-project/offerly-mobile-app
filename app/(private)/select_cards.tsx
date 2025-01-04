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
import { IBank } from '@/entities/bank.entity';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/components/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { useUIState } from '@/hooks/useUIState';
import CardsGridLayout from '@/layouts/CardsGridLayout';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useToast } from 'react-native-toast-notifications';

const SelectCards = observer(() => {
	const [loading, setLoading] = useState({ banks: true, cards: false, adding: false });
	const [banks, setBanks] = useState<IBank[]>([]);
	const [bankCards, setBankCards] = useState<ICard[]>([]);
	const [selectedBank, setSelectedBank] = useUIState<string>('cards-select:bank');
	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value =
			selectedCards.length > 0
				? withSpring(1, { damping: 15, stiffness: 120 })
				: withSpring(0, { damping: 15, stiffness: 120 });
	}, [selectedCards, opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	useEffect(() => {
		if (selectedBank) {
			fetchBankCards(selectedBank);
		}
	}, [selectedBank]);

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

	const handleBankSelection = (bankId: string, closeHandler: () => void) => {
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

	const toast = useToast();
	const onAdd = async () => {
		setLoading((prev) => ({ ...prev, adding: true }));
		try {
			await CardsApi.patchUserCards(selectedCards);
			await cardsStore().fetchUserCards();
			router.back();
			toast.show('Cards added successfully', { type: 'success' });
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

	const { isRtl } = languageStore();

	const layoutProps = isRtl ? { trailing: <BackButton /> } : { leading: <BackButton /> };

	return (
		<TabLayout title='Card Selection' {...layoutProps}>
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
				{loading.banks || loading.cards ? (
					<View className='h-[65%] items-center justify-center'>
						<ActivityIndicator color={theme['--primary']} />
					</View>
				) : (
					<View style={{ height: '70%' }}>
						<CardsGridLayout
							className='pt-3'
							data={bankCards.sort((a, b) => {
								const isAUserCard = userCardsList.some((card) => card.id === a.id);
								const isBUserCard = userCardsList.some((card) => card.id === b.id);

								if (isAUserCard && !isBUserCard) return -1;
								if (!isAUserCard && isBUserCard) return 1;
								return 0;
							})}
							renderItem={({ item }) => (
								<CardCard
									userCard={
										userCardsList.find((card) => card.id === item.id) !==
										undefined
									}
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
				)}
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
});

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
