import Typography from '@/components/Typography/Typography';
import { IOfferFilter } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, View } from 'react-native';
import { ScrollView as NScrollView } from 'react-native-gesture-handler';

type Props = {
	setFilter: (filter: IOfferFilter) => void;
	filter: IOfferFilter;
	sheeted?: boolean;
};

const Categories = ({ filter, setFilter, sheeted }: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const isRtl = languageStore().isRtl;

	const categoriesList = [
		{
			name: 'Shopping',
			displayName: translations.tabs.offers.categories.Shopping,
			component: <MaterialCommunityIcons size={18} name='shopping-outline' />,
		},
		{
			name: 'Travel',
			displayName: translations.tabs.offers.categories.Travel,
			component: <SimpleLineIcons size={18} name='plane' />,
		},
		{
			name: 'Restaurants & Cafes',
			displayName: translations.tabs.offers.categories['Restaurants & Cafes'],
			component: <Ionicons size={18} name='fast-food-outline' />,
		},
		{
			name: 'Entertainment',
			displayName: translations.tabs.offers.categories.Entertainment,
			component: <MaterialCommunityIcons size={18} name='gamepad-variant-outline' />,
		},
		{
			name: 'Car Services',
			displayName: translations.tabs.offers.categories['Car Services'],
			component: <MaterialCommunityIcons size={18} name='car-outline' />,
		},
		{
			name: 'Health & Wellness',
			displayName: translations.tabs.offers.categories['Health & Wellness'],
			component: <MaterialCommunityIcons size={18} name='medical-bag' />,
		},
		{
			name: 'Others',
			displayName: translations.tabs.offers.categories.Others,
			component: <Octicons size={18} name='stack' />,
		},
		{
			name: 'Groceries',
			displayName: translations.tabs.offers.categories.Groceries,
			component: <MaterialCommunityIcons size={18} name='food-apple-outline' />,
		},
	];

	const [categories, setCategories] = useState(categoriesList);
	const categoriesScrollViewRef = useRef<ScrollView>(null);

	const scrollToSelectedCategory = () => {
		return isRtl
			? categoriesScrollViewRef.current?.scrollToEnd({ animated: true })
			: categoriesScrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
	};

	useEffect(() => {
		if (filter.category.length) {
			setCategories((prevCategories) => {
				const updatedCategories = [...prevCategories];
				filter.category.forEach((selectedCategory) => {
					const selectedIndex = updatedCategories.findIndex(
						(category) => category.name === selectedCategory,
					);
					if (selectedIndex > -1) {
						const [selectedCategoryItem] = updatedCategories.splice(selectedIndex, 1);
						updatedCategories.unshift(selectedCategoryItem);
					}
				});
				return updatedCategories;
			});
			// scrollToSelectedCategory();
		}
	}, [filter.category]);

	const Wrapper = sheeted ? NScrollView : ScrollView;

	const toggleCategory = (categoryName: string) => {
		const updatedCategories = filter.category.includes(categoryName)
			? filter.category.filter((name) => name !== categoryName)
			: [...filter.category, categoryName];
		setFilter({ ...filter, category: updatedCategories });
	};

	return (
		<Wrapper
			horizontal
			ref={categoriesScrollViewRef}
			style={{ paddingVertical: 6, maxHeight: 50, minHeight: 50 }}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ gap: 10, paddingHorizontal: 16 }}
		>
			{categories.map((category) => {
				const isSelected = filter.category.includes(category.name);
				return (
					<Pressable
						onPress={() => toggleCategory(category.name)}
						key={category.name}
						className={`rounded-full ${Platform.OS == 'ios' && 'justify-center px-2 pt-1'}  ${isSelected ? 'border-none bg-selected' : 'border border-secondary'}`}
					>
						<View
							className={`flex-row  gap-1 ${Platform.OS == 'android' && 'items-center pt-1 px-2'}`}
						>
							{React.cloneElement(category.component, {
								color: isSelected ? 'white' : theme['--primary'],
							})}
							<Typography
								variant='body'
								weight='bold'
								color={isSelected ? 'white' : theme['--secondary']}
							>
								{category.displayName}
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
			})}
		</Wrapper>
	);
};

export default Categories;
