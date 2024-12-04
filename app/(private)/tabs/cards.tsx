import { CardsApi } from '@/api/cards.api';
import Button from '@/components/Button/Buttton';
import Typography from '@/components/Typography/Typography';
import CardCard from '@/features/Cards/CardCard';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

type Props = {};

const Cards = observer((props: Props) => {
	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const disabledRemove = selectedCards.length === 0;

	const [removing, setRemoving] = useState(false);
	const onRemove = () => {
		setRemoving(true);
		CardsApi.deleteUserCards(selectedCards)
			.then(async () => {
				await cardsStore().fetchUserCards();
				setSelectedCards([]);
			})
			.finally(async () => {
				setRemoving(false);
			});
	};

	return (
		<View className='px-6 py-4'>
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
			<FlatList
				data={userCardsList}
				indicatorStyle='black'
				style={{ height: '82%' }}
				contentContainerStyle={{ gap: 40, padding: 8 }}
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
				keyExtractor={(item) => item.id}
			/>
			<View className='pt-6'>
				<Button
					variant='secondary'
					loading={removing}
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					disabled={disabledRemove}
					onPress={onRemove}
				>
					<Typography>Remove</Typography>
				</Button>
			</View>
		</View>
	);
});

export default Cards;

const styles = StyleSheet.create({});
