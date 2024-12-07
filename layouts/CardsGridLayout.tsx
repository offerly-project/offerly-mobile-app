import { ICard } from '@/entities/card.entity';
import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type Props = ComponentProps<typeof FlatList<ICard>>;

const GAP = 10;

const CardsGridLayout = (props: Props) => {
	return (
		<FlatList
			{...props}
			numColumns={3}
			contentContainerStyle={{ gap: GAP }}
			columnWrapperStyle={{ gap: GAP, justifyContent: 'flex-start' }}
			style={{ margin: 'auto', width: '100%' }}
		/>
	);
};

export default CardsGridLayout;

const styles = StyleSheet.create({});
