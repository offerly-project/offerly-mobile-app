import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import Typography from '@/components/Typography/Typography';
import { SCREEN_WIDTH } from '@/constants/screens';
import { useThemeContext } from '@/contexts/ThemeContext';
import { ICard } from '@/entities/card.entity';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { cardsStore, languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';

const Cards = observer(() => {
	// Hooks and theme
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
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
	const themeName = useThemeContext().theme;
	const toast = useToast();
	const handleRemove = () => {
		Alert.alert(
			translations.warning.deleteCards.title,
			translations.warning.deleteCards.message,
			[
				{ text: translations.buttons.cancel, style: 'cancel' },
				{
					style: 'destructive',
					text: translations.buttons.confirm,
					onPress: async () => {
						setRemoving(true);
						try {
							await CardsApi.deleteUserCards(selectedCards);
							await cardsStore().fetchUserCards();
							setSelectedCards([]);
							toast.show(translations.toast.deleteCards, { type: 'success' });
						} finally {
							setRemoving(false);
						}
					},
				},
			],
			{
				userInterfaceStyle: themeName,
			},
		);
	};

	// Utility functions
	const groupedCards = useMemo(() => {
		const groups: Record<string, ICard[]> = {};
		userCardsList.forEach((card) => {
			const bankName = language == 'ar' ? card.bank.name.ar : card.bank.name.en;
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
				<Typography variant='body' weight='bold' color={theme['--text']} className='pb-2'>
					{bankName}
				</Typography>
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.cardRow}
					className='overflow-visible'
				>
					{cards.map((card) => (
						<CardCard
							key={card.id}
							card={card}
							selected={selectedCards.includes(card.id)}
							onPress={() => handleCardSelect(card.id)}
						/>
					))}
				</ScrollView>
			</View>
		));

	return (
		<TabLayout
			title={translations.tabs.cards.tabName}
			trailing={
				<View style={styles.addButtonContainer}>
					<Button
						hapticFeedback
						style={{ borderWidth: 0 }}
						onPress={() => router.push('/(private)/select_cards')}
					>
						<Ionicons name='add' size={24} color={theme['--static']} />
					</Button>
				</View>
			}
		>
			<View style={styles.container}>
				{/* Cards List */}
				<ScrollView style={styles.cardList}>{renderGroupedCards()}</ScrollView>

				{/* Action Buttons */}
				{selectedCards.length > 0 && (
					<Animated.View style={[styles.hapticPressContainer, animatedStyle]}>
						{removing ? (
							<ActivityIndicator color={theme['--primary']} />
						) : (
							<View style={styles.actionButtons}>
								<Pressable style={styles.actionButton} onPress={handleRemove}>
									<Ionicons
										name='trash-bin'
										size={30}
										color={theme['--danger']}
									/>
								</Pressable>
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
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
	addButtonContainer: {
		width: '100%',
		alignItems: 'flex-end',
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
		gap: 8,
		paddingBottom: 16,
		paddingEnd: 10,
	},
	cardStyle: {
		width: SCREEN_WIDTH / 3,
		paddingTop: 10,
	},
	groupSeparator: {},
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
