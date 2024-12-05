import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BanksApi } from '@/api/banks.api';
import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { IBank } from '@/entities/bank.entity';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore } from '@/stores';
import { formatBankType, formatUploadPath, wait } from '@/utils/utils';
import { router } from 'expo-router';
import { FlatList } from 'react-native-gesture-handler';

const SelectCardsModal = () => {
	const [loading, setLoading] = useState({ banks: true, cards: false });
	const [banks, setBanks] = useState<IBank[]>([]);
	const [bankCards, setBankCards] = useState<ICard[]>([]);
	const [selectedBank, setSelectedBank] = useState<string | null>(null);
	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const { userCardsList } = cardsStore();

	const theme = useThemeStyles();

	useEffect(() => {
		const fetchBanks = async () => {
			setLoading((prev) => ({ ...prev, banks: true }));
			try {
				const bankList = await BanksApi.fetchBanks();
				setBanks(bankList);
			} finally {
				wait(2000).then(() => {
					setLoading((prev) => ({ ...prev, banks: false }));
				});
			}
		};
		fetchBanks();
	}, []);

	const fetchBankCards = async (bankId: string) => {
		setLoading((prev) => ({ ...prev, cards: true }));
		try {
			const cards = await CardsApi.getCardsByBankId(bankId);
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
					<Typography variant='body' color={theme['--primary-2']}>
						{item.data.name.en}
					</Typography>
					<Typography variant='body' color={theme['--primary-3']}>
						{formatBankType(item.data.type)}
					</Typography>
				</View>
			</View>
			{item.value === selectedBank && (
				<Ionicons name='checkmark' size={16} color={theme['--primary-1']} />
			)}
		</Pressable>
	);

	const disabled = !selectedBank || selectedCards.length === 0;

	const onAdd = () => {
		CardsApi.patchUserCards(selectedCards)
			.then(() => {
				cardsStore().fetchUserCards();
				router.back();
			})
			.catch((e) => {
				console.log(e);
			});
	};

	if (loading.banks)
		return (
			<View className='h-full w-full flex flex-col items-center justify-center'>
				<ActivityIndicator color={theme['--primary-1']} />
			</View>
		);

	return (
		<SafeAreaView style={styles.container}>
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
			<FlatList
				data={bankCards.filter(
					(card) => !userCardsList.some((userCard) => userCard.id === card.id),
				)}
				contentContainerStyle={{ gap: 40, padding: 8 }}
				indicatorStyle='black'
				renderItem={({ item }) => (
					<CardCard
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
			<View className='pt-10'>
				<Button disabled={disabled} onPress={onAdd} hapticFeedback>
					<Typography>Add</Typography>
				</Button>
			</View>
		</SafeAreaView>
	);
};

export default SelectCardsModal;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
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
});
