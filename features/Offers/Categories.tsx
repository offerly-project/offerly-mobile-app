import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

type Props = {
	setSelectedCategory: (cat: string) => void;
	selectedCategory: string;
};

const Categories = ({ selectedCategory, setSelectedCategory }: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const CategoriesIcons = [
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

	const [categories, setCategories] = useState(CategoriesIcons);
	const categoriesScrollViewRef = useRef<ScrollView>(null);

	const scrollToSelectedCategory = () => {
		return languageStore().isRtl
			? categoriesScrollViewRef.current?.scrollToEnd({
					animated: true,
				})
			: categoriesScrollViewRef.current?.scrollTo({
					x: 0,
					y: 0,
					animated: true,
				});
	};

	useEffect(() => {
		if (selectedCategory) {
			setCategories((prevCategories) => {
				const updatedCategories = [...prevCategories];
				const selectedIndex = updatedCategories.findIndex(
					(category) => category.name === selectedCategory,
				);
				if (selectedIndex > -1) {
					const [selectedCategoryItem] = updatedCategories.splice(selectedIndex, 1);
					updatedCategories.unshift(selectedCategoryItem);
				}
				return updatedCategories;
			});
			scrollToSelectedCategory();
		}
	}, [selectedCategory]);

	return (
		<ScrollView
			horizontal
			ref={categoriesScrollViewRef}
			style={{
				width: '95%',
				margin: 'auto',
				minHeight: 35,
				maxHeight: 35,
			}}
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
						if (category.name === selectedCategory) {
							setSelectedCategory('');
							return;
						}
						setCategories((prevCategories) => {
							const updatedCategories = prevCategories.filter(
								(cat) => cat != category,
							);
							updatedCategories.unshift(category);
							scrollToSelectedCategory();
							return updatedCategories;
						});
						setSelectedCategory(category.name);
					}}
					key={category.name}
					className={`flex-row px-2.5 pt-1.5 mt-1 gap-2 rounded-full ${category.name === selectedCategory ? 'bg-selected' : 'border border-secondary'}`}
				>
					{React.cloneElement(category.component, {
						color: category.name === selectedCategory ? 'white' : theme['--primary'],
					})}
					<Typography
						variant='body'
						weight='bold'
						color={category.name === selectedCategory ? 'white' : theme['--secondary']}
					>
						{category.displayName}
					</Typography>
					{category.name === selectedCategory && (
						<View className='absolute -right-1 -top-1 rounded-full bg-primary'>
							<Ionicons size={14} color='white' name='close' />
						</View>
					)}
				</Pressable>
			))}
		</ScrollView>
	);
};

export default Categories;
