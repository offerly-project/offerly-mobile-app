import Typography from '@/components/Typography/Typography';
import { IOfferFilter } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons, MaterialCommunityIcons, Octicons, SimpleLineIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ScrollView as NScrollview } from 'react-native-gesture-handler';

type Props = {
	setFilter: (filter: IOfferFilter) => void;
	filter: IOfferFilter;
	sheeted?: boolean;
};

const Categories = ({ filter, setFilter, sheeted }: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
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
		if (filter.category) {
			setCategories((prevCategories) => {
				const updatedCategories = [...prevCategories];
				const selectedIndex = updatedCategories.findIndex(
					(category) => category.name === filter.category,
				);
				if (selectedIndex > -1) {
					const [selectedCategoryItem] = updatedCategories.splice(selectedIndex, 1);
					updatedCategories.unshift(selectedCategoryItem);
				}
				return updatedCategories;
			});
			scrollToSelectedCategory();
		}
	}, [filter.category]);

	const Wrapper = sheeted ? NScrollview : ScrollView;

	return (
		<Wrapper
			horizontal
			ref={categoriesScrollViewRef}
			style={{
				minHeight: 40,
				maxHeight: 40,
			}}
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{
				gap: 10,
			}}
			contentContainerClassName={'px-5'}
		>
			{categories.map((category) => (
				<Pressable
					onPress={() => {
						if (category.name === filter.category) {
							setFilter({ ...filter, category: '' });
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
						setFilter({ ...filter, category: category.name });
					}}
					key={category.name}
				>
					<View
						className={`flex-row gap-2 rounded-full ${category.name === filter.category ? 'bg-selected' : 'border border-secondary'} items-center justify-center h-10 px-2 mt-1`}
					>
						{React.cloneElement(category.component, {
							color: category.name === filter.category ? 'white' : theme['--primary'],
						})}
						<Typography
							variant='body'
							weight='bold'
							color={
								category.name === filter.category ? 'white' : theme['--secondary']
							}
						>
							{category.displayName}
						</Typography>
						{category.name === filter.category && (
							<View className='absolute -right-1 -top-1 rounded-full bg-primary'>
								<Ionicons size={14} color='white' name='close' />
							</View>
						)}
					</View>
				</Pressable>
			))}
		</Wrapper>
	);
};

export default Categories;
