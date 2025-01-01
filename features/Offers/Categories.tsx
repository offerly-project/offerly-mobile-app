import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

type Props = {
	setSelectedCategory: (cat: string) => void;
	selectedCategory: string;
};

const Categories = ({ selectedCategory, setSelectedCategory }: Props) => {
	const theme = useThemeStyles();
	console.log(setSelectedCategory);
	const CategoriesIcons = [
		{
			name: 'Shopping',
			component: <MaterialCommunityIcons size={18} name='shopping-outline' />,
		},
		{
			name: 'Travel',
			component: <SimpleLineIcons size={18} name='plane' />,
		},
		{
			name: 'Restaurants & Cafes',
			component: <Ionicons size={18} name='fast-food-outline' />,
		},
		{
			name: 'Entertainment',
			component: <MaterialCommunityIcons size={18} name='gamepad-variant-outline' />,
		},
		{
			name: 'Car Services',
			component: <MaterialCommunityIcons size={18} name='car-outline' />,
		},
		{
			name: 'Health & Wellness',
			component: <MaterialCommunityIcons size={18} name='medical-bag' />,
		},
		{
			name: 'Others',
			component: <Octicons size={18} name='stack' />,
		},
		{
			name: 'Groceries',
			component: <MaterialCommunityIcons size={18} name='food-apple-outline' />,
		},
	];
	// const staticCategories = staticDataStore().categories;
	// const categoriesWithIcons: { catName: string; icon: React.ReactNode }[] = staticCategories.map(
	// 	(cat) => {
	// 		return { catName: cat, icon: CategoriesIcons.find((x) => x.name == cat)?.component };
	// 	},
	// );
	const [categories, setCategories] = useState(CategoriesIcons);
	const categoriesScrollViewRef = useRef<ScrollView>(null);
	return (
		<ScrollView
			horizontal
			ref={categoriesScrollViewRef}
			style={{
				width: '95%',
				margin: 'auto',
				minHeight: 35,
				maxHeight: 35,
				overflow: 'visible',
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
							categoriesScrollViewRef.current?.scrollTo({
								x: 0,
								y: 0,
								animated: true,
							});
							return updatedCategories;
						});
						setSelectedCategory(category.name);
					}}
					key={category.name}
					className={`flex-row px-2.5 pt-1.5 gap-2 rounded-full ${category.name === selectedCategory ? 'bg-selected' : 'border border-secondary'}`}
				>
					{React.cloneElement(category.component, {
						color: category.name === selectedCategory ? 'white' : theme['--primary'],
					})}
					<Typography
						variant='body'
						weight='bold'
						color={category.name === selectedCategory ? 'white' : theme['--secondary']}
					>
						{category.name}
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
