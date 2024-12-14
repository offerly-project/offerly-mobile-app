import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import HapticPress from '@/components/HapticPress/HapticPress';
import Typography from '@/components/Typography/Typography';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Cards = observer(() => {
	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	const [selectedCards, setSelectedCards] = useState<string[]>([]);
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

	const [removing, setRemoving] = useState(false);

	const onRemove = () => {
		Alert.alert('Delete Cards', 'Are you sure you want to delete the selected cards?', [
			{ text: 'Cancel' },
			{
				text: 'Confirm',
				onPress: () => {
					setRemoving(true);
					CardsApi.deleteUserCards(selectedCards)
						.then(async () => {
							await cardsStore().fetchUserCards();
							setSelectedCards([]);
						})
						.finally(() => {
							setRemoving(false);
						});
				},
			},
		]);
	};

	const clearAllSelections = () => {
		setSelectedCards([]);
	};

	const groupedCards = useMemo(() => {
		const groups: Record<string, ICard[]> = {};
		userCardsList.forEach((card) => {
			if (!groups[card.bank.name.en]) {
				groups[card.bank.name.en] = [];
			}
			groups[card.bank.name.en].push(card);
		});
		return groups;
	}, [userCardsList]);

	console.log(groupedCards);

	return (
		<View className='px-6 py-4 h-full'>
			{/* Add Card Button */}
			<View className='w-full flex-row justify-end pb-4'>
				<Button
					className='h-[45] w-[45] p-0 rounded-full items-center'
					borderStyle='filled'
					onPress={() => {
						router.push('/(modals)/select_cards_modal');
					}}
				>
					<Ionicons name='add' size={18} color={theme['--background']} />
				</Button>
			</View>

			{/* Cards List */}
			<ScrollView className='flex-1 flex-col gap-2'>
				{Object.entries(groupedCards).map(([bankName, cards]) => (
					<View key={bankName}>
						<Typography>{bankName}</Typography>
						<ScrollView
							showsHorizontalScrollIndicator={false}
							showsVerticalScrollIndicator={false}
							horizontal
							contentContainerStyle={{ gap: 20 }}
							className='flex-row w-full'
						>
							{cards.map((item) => (
								<CardCard
									style={{ width: 'auto' }}
									key={item.id}
									card={item}
									onPress={() => {
										setSelectedCards((prev) => {
											if (prev.includes(item.id)) {
												return prev.filter((cardId) => cardId !== item.id);
											}
											return [...prev, item.id];
										});
									}}
									selected={selectedCards.includes(item.id)}
								/>
							))}
						</ScrollView>
					</View>
				))}
			</ScrollView>

			{selectedCards.length > 0 && (
				<Animated.View style={[styles.hapticPressContainer, animatedStyle]}>
					{removing ? (
						<ActivityIndicator color={theme['--primary-1']} />
					) : (
						<View className='flex flex-row gap-10'>
							<HapticPress
								onPress={onRemove}
								className='align-center justify-center flex-row px-4 py-4'
							>
								<Ionicons name='trash-bin' size={30} color={theme['--primary-1']} />
							</HapticPress>
							<HapticPress
								onPress={clearAllSelections}
								className='align-center justify-center flex-row px-4 py-4'
							>
								<Ionicons
									name='refresh-outline'
									size={30}
									color={theme['--primary-1']}
								/>
							</HapticPress>
						</View>
					)}
				</Animated.View>
			)}
		</View>
	);
});

export default Cards;

const styles = StyleSheet.create({
	hapticPressContainer: {
		width: '100%',
		height: 60,
		backgroundColor: 'transparent',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
