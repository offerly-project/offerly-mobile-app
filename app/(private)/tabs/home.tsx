import Input from '@/components/Input/Input';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, staticDataStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type Props = {};

const Home = observer((props: Props) => {
	const { userCardsList } = cardsStore();
	const [selectedCard, setSelectedCard] = useState<string>(userCardsList[0].id);
	const categories = staticDataStore().categories;
	const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
	const theme = useThemeStyles();

	return (
		<SafeAreaView className='gap-10'>
			<View className='p-4'>
				<Select
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
									color={theme['--primary-2']}
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
									color={theme['--primary-1']}
								/>
							)}
						</View>
					)}
					className='h-[45px] w-[80%] m-auto'
				/>
			</View>
			<ScrollView
				horizontal
				style={{ width: '95%', margin: 'auto' }}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					gap: 10,
					paddingHorizontal: 10,
					margin: 'auto',
				}}
			>
				{categories.map((category) => (
					<Pressable
						onPress={() => {
							setSelectedCategory(category);
						}}
						style={{ opacity: category === selectedCategory ? 0.4 : 1 }}
						key={category}
						className='h-[50px] border border-primary-1 items-center justify-center px-10 rounded-lg'
					>
						<Typography variant='body' color={theme['--primary-1']}>
							{category}
						</Typography>
					</Pressable>
				))}
			</ScrollView>
			<View className='w-[95%] m-auto'>
				<Input placeholder='Search...' variant='primary' />
			</View>
		</SafeAreaView>
	);
});

export default Home;

const styles = StyleSheet.create({});
