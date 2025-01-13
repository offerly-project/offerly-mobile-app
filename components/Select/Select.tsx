import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet from '../BottomSheet/BottomSheet';
import Input from '../Input/Input';
import Typography from '../Typography/Typography';

type ItemType<T> = {
	name: string;
	value: string;
	data: T;
};

type Props<T> = {
	value?: string | null;
	snapPoints?: string[];
	onChange?: (value: string) => void;
	placeHolder?: string;
	items: ItemType<T>[];
	itemRenderer?: (item: ItemType<T>, index: number, closeHandler: () => void) => JSX.Element;
	className?: string;
	styles?: StyleProp<ViewStyle>;
	searchResolver?: (item: ItemType<T>, search: string) => boolean;
	children?: (content?: string) => React.ReactNode;
	renderChooseAllItem?: boolean;
};

const Select = <T = unknown,>({
	className = '',
	styles,
	value,
	snapPoints = ['85%'],
	onChange,
	items,
	placeHolder,
	itemRenderer,
	searchResolver,
	children,
	renderChooseAllItem = false,
}: Props<T>) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const [open, setOpen] = useState(false);
	const boxContent = items.find((item) => item.value === value)?.name;
	const [search, setSearch] = useState('');

	const listItems = searchResolver
		? items.filter((item) => searchResolver?.(item, search))
		: items;

	if (renderChooseAllItem) {
		listItems.unshift({
			name: translations.tabs.offers.offersFilter.myCardsOffers,
			value: '',
			data: {} as T,
		});
	}

	return (
		<>
			<Pressable
				className={`rounded-full bg-transparent border-primary border px-4 flex flex-row justify-between items-center ${className}`}
				style={styles}
				onPress={() => {
					setOpen(true);
				}}
			>
				<Typography color={theme['--text']}>
					{children ? children(boxContent) : boxContent ? boxContent : placeHolder}
				</Typography>
				<Ionicons name='caret-down' size={14} color={theme['--text']} />
			</Pressable>
			<BottomSheet
				snapPoints={snapPoints}
				enableDynamicSizing={false}
				open={open}
				onDismiss={() => {
					setOpen(false);
					setSearch('');
				}}
			>
				{(closeHandler) => (
					<View className='gap-8 h-full'>
						{searchResolver && (
							<Input
								placeholder={translations.placeholders.search}
								borderStyle='underlined'
								value={search}
								onChangeText={setSearch}
								sheeted
							/>
						)}
						<FlatList
							data={listItems}
							showsVerticalScrollIndicator={false}
							keyboardShouldPersistTaps='always'
							keyboardDismissMode='on-drag'
							renderItem={({ item, index }) => (
								<View key={item.value}>
									{itemRenderer ? (
										itemRenderer(item, index, closeHandler)
									) : (
										<Pressable
											className='p-4 flex flex-row justify-between'
											onPress={() => {
												closeHandler();
												if (onChange) {
													onChange(item.value);
												}
											}}
										>
											<Typography>{item.name}</Typography>
											{item.value === value && (
												<Ionicons
													name='checkmark'
													size={16}
													color={theme['--primary']}
												/>
											)}
										</Pressable>
									)}
								</View>
							)}
						/>
					</View>
				)}
			</BottomSheet>
		</>
	);
};

export default Select;
