import Button from '@/components/Button/Buttton';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, View } from 'react-native';
import Categories from './Categories';

type Props = {
	setSelectedCard: (card: string) => void;
	selectedCard: string;
	setSelectedCategory?: (cat: string) => void;
	selectedCategory?: string;
	closeHandler: () => void;
};
const OffersFilter = ({
	selectedCard,
	setSelectedCard,
	selectedCategory,
	setSelectedCategory,
	closeHandler,
}: Props) => {
	const theme = useThemeStyles();
	const { userCardsList } = cardsStore();

	return (
		<View className='gap-5 py-3'>
			<Categories
				selectedCategory={selectedCategory!}
				setSelectedCategory={setSelectedCategory!}
			/>
			<Select
				placeHolder='Select a card'
				value={selectedCard}
				onChange={(value) => setSelectedCard(value)}
				items={userCardsList
					.sort((a, b) => a.bank.name.en.localeCompare(b.bank.name.en))
					.map((card) => ({
						name: card.name.en,
						value: card.id,
						data: card,
					}))}
				searchResolver={(item, search) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				}
				itemRenderer={(item, _, closeHandler) => (
					<View className='flex flex-row items-center h-[75px] gap-6 w-full justify-between'>
						<Pressable
							onPress={() => {
								setSelectedCard(item.value);
								closeHandler();
							}}
							className='flex flex-row items-center gap-4'
						>
							<Image
								source={formatUploadPath(item.data.logo)}
								style={{ height: 25, width: 50 }}
							/>
							<Typography
								color={theme['--text']}
								className='w-[150px]'
								variant='label'
							>
								{item.name}
							</Typography>
						</Pressable>
						{item.value === selectedCard && (
							<Ionicons
								name='checkmark-circle'
								size={25}
								color={theme['--primary']}
							/>
						)}
					</View>
				)}
				className='mx-2 p-2'
			/>
			<Button
				onPress={() => {
					setSelectedCard('');
					closeHandler();
				}}
				borderStyle='filled'
			>
				<Typography color='white'>Show me all offers</Typography>
			</Button>
		</View>
	);
};

export default OffersFilter;
