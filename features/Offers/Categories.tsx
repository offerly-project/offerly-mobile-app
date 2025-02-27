import Typography from '@/components/Typography/Typography';
import { FLATLIST_SHIFT_TRANSITION } from '@/constants/transitions';
import { IOfferFilter } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, staticDataStore } from '@/stores';
import { Translations } from '@/stores/language.store';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';
import Animated from 'react-native-reanimated';

const categoriesList = (translations: Translations, categories: Record<string, string>) => [
	{
		name: translations.tabs.offers.categories.Shopping,
		component: <MaterialCommunityIcons size={18} name='shopping-outline' />,
		id: categories.Shopping,
	},
	{
		name: translations.tabs.offers.categories.Travel,
		component: <SimpleLineIcons size={18} name='plane' />,
		id: categories.Travel,
	},
	{
		name: translations.tabs.offers.categories['Restaurants & Cafes'],
		component: <Ionicons size={18} name='fast-food-outline' />,
		id: categories['Restaurants & Cafes'],
	},
	{
		name: translations.tabs.offers.categories.Entertainment,
		component: <MaterialCommunityIcons size={18} name='gamepad-variant-outline' />,
		id: categories.Entertainment,
	},
	{
		name: translations.tabs.offers.categories['Car Services'],
		component: <MaterialCommunityIcons size={18} name='car-outline' />,
		id: categories['Car Services'],
	},
	{
		name: translations.tabs.offers.categories['Health & Wellness'],
		component: <MaterialCommunityIcons size={18} name='medical-bag' />,
		id: categories['Health & Wellness'],
	},
	{
		name: translations.tabs.offers.categories.Groceries,
		component: <MaterialCommunityIcons size={18} name='food-apple-outline' />,
		id: categories.Groceries,
	},
	{
		name: translations.tabs.offers.categories.Others,
		component: <Octicons size={18} name='stack' />,
		id: categories.Others,
	},
];

type Props = {
	setFilter: (filter: IOfferFilter) => void;
	filter: IOfferFilter;
	sheeted?: boolean;
};

const Categories = ({ filter, setFilter }: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const categoriesData = staticDataStore().categories;
	const flatListRef = useRef<FlatList>(null);

	// Sort categories based on the selected filter
	const sortedCategories = categoriesList(translations, categoriesData).sort((a, b) => {
		const isASelected = filter.category.includes(a.id);
		const isBSelected = filter.category.includes(b.id);

		// Selected categories come first
		if (isASelected && !isBSelected) return -1;
		if (!isASelected && isBSelected) return 1;
		return 0; // Maintain original order for unselected categories
	});

	const toggleCategory = (categoryId: string) => {
		const updatedCategories = filter.category.includes(categoryId)
			? filter.category.filter((name) => name !== categoryId)
			: [...filter.category, categoryId];
		setFilter({ ...filter, category: updatedCategories });
	};

	const renderItem = ({ item }: { item: (typeof sortedCategories)[0] }) => {
		const isSelected = filter.category.includes(item.id);
		return (
			<Pressable
				onPress={() => toggleCategory(item.id)}
				key={item.id}
				className={`rounded-full ${Platform.OS == 'ios' && 'justify-center px-2 pt-1'}  ${isSelected ? 'border-none bg-selected' : 'border border-primary'}`}
			>
				<View
					className={`flex-row  gap-1 ${Platform.OS == 'android' && 'items-center pt-1 px-2'}`}
				>
					{React.cloneElement(item.component, {
						color: isSelected ? 'white' : theme['--primary'],
					})}
					<Typography
						variant='body'
						weight='bold'
						color={isSelected ? 'white' : theme['--primary']}
					>
						{item.name}
					</Typography>
				</View>
				{isSelected && (
					<View
						style={{
							position: 'absolute',
							right: -5,
							top: -5,
							width: 18,
							height: 18,
							borderRadius: 9,
							backgroundColor: theme['--primary'],
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Ionicons size={12} color='white' name='close' />
					</View>
				)}
			</Pressable>
		);
	};

	return (
		<Animated.FlatList
			itemLayoutAnimation={FLATLIST_SHIFT_TRANSITION}
			ref={flatListRef}
			data={sortedCategories}
			renderItem={renderItem}
			keyExtractor={(item) => item.id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingVertical: 6, gap: 10, paddingHorizontal: 16 }}
			style={{ maxHeight: 50, minHeight: 50 }}
		/>
	);
};

export default Categories;
