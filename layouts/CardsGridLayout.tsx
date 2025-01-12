import { ICard } from '@/entities/card.entity';
import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

type Props = ComponentProps<typeof FlatList<ICard>>;

const CardsGridLayout = (props: Props) => {
	return <FlatList {...props} />;
};

export default CardsGridLayout;

const styles = StyleSheet.create({});
