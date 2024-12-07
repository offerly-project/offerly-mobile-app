import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import HapticPress from '@/components/HapticPress/HapticPress';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import CardsGridLayout from '@/layouts/CardsGridLayout';
import { cardsStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
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

	return (
		<View className='px-6 py-4 h-full'>
			{/* Add Card Button */}
			<View className='w-full flex-row justify-end pb-4'>
				<Button
					className='h-[45] w-[45] p-0 rounded-full items-center'
					onPress={() => {
						router.push('/(modals)/select_cards_modal');
					}}
				>
					<Ionicons name='add' size={18} color={theme['--background']} />
				</Button>
			</View>

			{/* Cards List */}
			<View style={{ flex: 1 }}>
				<CardsGridLayout
					data={userCardsList}
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
							selected={selectedCards.includes(item.id)}
						/>
					)}
					keyExtractor={(item, index) => item.id + index}
				/>
			</View>

			{selectedCards.length > 0 && (
				<Animated.View style={[styles.hapticPressContainer, animatedStyle]}>
					{removing ? (
						<ActivityIndicator color={theme['--primary-1']} />
					) : (
						<HapticPress
							onPress={onRemove}
							className='align-center justify-center flex-row px-4 py-4'
						>
							<Ionicons name='trash-bin' size={30} color={theme['--primary-1']} />
						</HapticPress>
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
