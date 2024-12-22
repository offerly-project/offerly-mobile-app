import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import HapticPress from '@/components/HapticPress/HapticPress';
import Typography from '@/components/Typography/Typography';
import { SCREEN_WIDTH } from '@/constants/screens';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Cards = observer(() => {
	// Hooks and theme
	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	// State and animations
	const [selectedCards, setSelectedCards] = useState<string[]>([]);
	const [removing, setRemoving] = useState(false);
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withSpring(selectedCards.length > 0 ? 1 : 0, {
			damping: 15,
			stiffness: 120,
		});
	}, [selectedCards, opacity]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
	}));

	// Handlers
	const handleCardSelect = (cardId: string) => {
		setSelectedCards((prev) =>
			prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId],
		);
	};

	const handleRemove = () => {
		Alert.alert('Delete Cards', 'Are you sure you want to delete the selected cards?', [
			{ text: 'Cancel' },
			{
				text: 'Confirm',
				onPress: async () => {
					setRemoving(true);
					try {
						await CardsApi.deleteUserCards(selectedCards);
						await cardsStore().fetchUserCards();
						setSelectedCards([]);
					} finally {
						setRemoving(false);
					}
				},
			},
		]);
	};

	// Utility functions
	const groupedCards = useMemo(() => {
		const groups: Record<string, ICard[]> = {};
		userCardsList.forEach((card) => {
			const { en: bankName } = card.bank.name;
			if (!groups[bankName]) {
				groups[bankName] = [];
			}
			groups[bankName].push(card);
		});
		return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
	}, [userCardsList]);

	// Render grouped cards
	const renderGroupedCards = () =>
		groupedCards.map(([bankName, cards], index) => (
			<View key={bankName} style={index > 0 ? styles.groupSeparator : undefined}>
				<Typography variant='body' color='rgba(0,0,0,0.5)' className='pb-2'>
					{bankName}
				</Typography>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.cardRow}
				>
					{cards.map((card) => (
						<CardCard
							key={card.id}
							card={card}
							style={styles.cardStyle}
							selected={selectedCards.includes(card.id)}
							onPress={() => handleCardSelect(card.id)}
						/>
					))}
				</ScrollView>
			</View>
		));

	return (
		<TabLayout title='Cards'>
			<View style={styles.container}>
				{/* Add Card Button */}
				<View style={styles.addButtonContainer}>
					<Button
						style={styles.addButton}
						borderStyle='filled'
						onPress={() => router.push('/(modals)/select_cards_modal')}
					>
						<Ionicons name='add' size={18} color={theme['--background']} />
					</Button>
				</View>

				{/* Cards List */}
				<ScrollView style={styles.cardList}>{renderGroupedCards()}</ScrollView>

				{/* Action Buttons */}
				{selectedCards.length > 0 && (
					<Animated.View style={[styles.hapticPressContainer, animatedStyle]}>
						{removing ? (
							<ActivityIndicator color={theme['--primary-1']} />
						) : (
							<View style={styles.actionButtons}>
								<HapticPress style={styles.actionButton} onPress={handleRemove}>
									<Ionicons
										name='trash-bin'
										size={30}
										color={theme['--primary-1']}
									/>
								</HapticPress>
								<HapticPress
									style={styles.actionButton}
									onPress={() => setSelectedCards([])}
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
		</TabLayout>
	);
});

export default Cards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 16,
	},
	addButtonContainer: {
		width: '100%',
		alignItems: 'flex-end',
		paddingBottom: 16,
	},
	addButton: {
		height: 45,
		width: 45,
		padding: 0,
		borderRadius: 45 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardList: {
		flex: 1,
	},
	cardRow: {
		flexDirection: 'row',
		gap: 20,
		paddingBottom: 16,
	},
	cardStyle: {
		width: SCREEN_WIDTH / 3,
		paddingTop: 10,
	},
	groupSeparator: {
		borderTopWidth: 1,
		borderColor: 'rgba(0,0,0,0.1)',
		paddingTop: 16,
	},
	hapticPressContainer: {
		width: '100%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtons: {
		flexDirection: 'row',
		gap: 40,
	},
	actionButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
});
