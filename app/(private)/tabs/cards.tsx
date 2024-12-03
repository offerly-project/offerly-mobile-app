import Button from '@/components/Button/Buttton';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

type Props = {};

const Cards = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<View className='px-6 py-4'>
			<View className='w-full flex-row justify-end'>
				<Button
					className='h-[45] w-[45] p-0 rounded-full items-center'
					onPress={() => {
						router.push('/(modals)/select_cards_modal');
					}}
				>
					<Ionicons name='add' size={18} color={theme['--background']} />
				</Button>
			</View>
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({});
