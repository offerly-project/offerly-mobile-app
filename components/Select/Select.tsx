import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import BottomSheet from '../BottomSheet/BottomSheet';
import Typography from '../Typography/Typography';

type ItemType<T> = {
	name: string;
	value: string;
	extra: T;
};

type Props<T> = {
	value?: string;
	onChange?: (value: string) => void;
	placeHolder?: string;
	items: ItemType<T>[];
	itemRenderer?: (item: ItemType<T>, index: number, selected: boolean) => JSX.Element;
};

const Select = <T = unknown,>({ value, onChange, items, placeHolder, itemRenderer }: Props<T>) => {
	const theme = useThemeStyles();
	const [open, setOpen] = useState(false);
	const boxContent = items.find((item) => item.value === value)?.name;
	return (
		<>
			<Pressable
				className='rounded-full bg-primary-1 p-4 flex flex-row justify-between items-center'
				onPress={() => {
					setOpen(true);
				}}
			>
				<Typography color={theme['--secondary-2']}>
					{boxContent ? boxContent : placeHolder}
				</Typography>
				<Ionicons name='caret-down' size={14} color={theme['--secondary-2']} />
			</Pressable>
			<BottomSheet
				snapPoints={['50%']}
				enableDynamicSizing={false}
				open={open}
				onClose={() => setOpen(false)}
			>
				{(closeHandler) => (
					<FlatList
						data={items}
						renderItem={({ item, index }) => (
							<View key={item.value}>
								{itemRenderer ? (
									itemRenderer(item, index, item.value === value)
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
												color={theme['--primary-1']}
											/>
										)}
									</Pressable>
								)}
							</View>
						)}
					/>
				)}
			</BottomSheet>
		</>
	);
};

export default Select;
