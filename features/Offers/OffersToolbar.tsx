import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Categories from './Categories';
import OffersFilter from './OffersFilter';

interface OffersToolbarProps {
	offersFilter: any;
	setOffersFilter: (filter: any) => void;
	appliedFilterCount: number;
	search: string;
	setSearch: (text: string) => void;
}

const OffersToolbar: React.FC<OffersToolbarProps> = ({
	offersFilter,
	setOffersFilter,
	appliedFilterCount,
	search,
	setSearch,
}) => {
	const theme = useThemeStyles();
	const translations = languageStore().translations;
	return (
		<View
			style={[styles.container, { backgroundColor: theme['--background'] }]}
			className='pb-4'
		>
			<Categories filter={offersFilter} setFilter={setOffersFilter} />
			<View className='w-[95%] flex-row gap-2 items-center m-auto'>
				<BottomSheetWrapper
					sheet={(closeHandler) => (
						<OffersFilter
							closeHandler={closeHandler}
							filter={offersFilter}
							setFilter={setOffersFilter}
						/>
					)}
				>
					{(openHandler) => (
						<TouchableOpacity onPress={openHandler}>
							{appliedFilterCount !== 0 && (
								<View className='absolute -top-1 opacity-80 z-10 -right-1 w-[20px] h-[20px] bg-selected rounded-full'>
									<Typography align='center' weight='bold' variant='label'>
										{appliedFilterCount}
									</Typography>
								</View>
							)}
							<Ionicons name='options-outline' color={theme['--primary']} size={36} />
						</TouchableOpacity>
					)}
				</BottomSheetWrapper>

				<View className='flex-1'>
					<Input
						trailingIcon={() => (
							<Ionicons size={22} color={theme['--primary']} name='search' />
						)}
						value={search}
						onChangeText={setSearch}
						placeholder={translations.placeholders.search}
						variant='primary'
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
});

export default OffersToolbar;
