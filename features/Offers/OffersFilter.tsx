import Button from '@/components/Button/Buttton';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Categories from './Categories';
import RadioButton from '@/components/Button/RadioButton';
import { IOfferFilter, SortKey } from '@/entities/offer.entity';

type Props = {
	filter: IOfferFilter;
	setFilter: (filter: IOfferFilter) => void;
	closeHandler: () => void;
	disabled?: boolean;
};
const OffersFilter = ({ filter, setFilter, closeHandler }: Props) => {
	const theme = useThemeStyles();
	const { translations, language } = languageStore();
	const { userCardsList } = cardsStore();
	const langKey = language == 'ar' ? 'ar' : 'en';

	return (
		<View className='gap-5 py-3'>
			<Categories filter={filter} setFilter={setFilter!} />
			<Select
				snapPoints={['65%']}
				renderChooseAllItem={true}
				placeHolder={
					filter.card.length > 1
						? translations.placeholders.multipleCardsSelected
						: translations.placeholders.selectCard
				}
				value={filter.card.length == 1 ? filter.card[0] : ''}
				items={userCardsList
					.sort((a, b) => a.bank.name[langKey].localeCompare(b.bank.name[langKey]))
					.map((card) => ({
						name: card.name[langKey],
						value: card.id,
						data: card,
					}))}
				searchResolver={(item, search) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				}
				itemRenderer={(item, index, closeHandler) => (
					<View className='flex flex-row items-center h-[65px] gap-6 w-full justify-between'>
						<Pressable
							onPress={() => {
								if (index == 0) {
									setFilter({ ...filter, card: [''] });
									return closeHandler();
								}
								filter.card = filter.card.filter((card) => card != '');
								if (filter.card.includes(item.value)) {
									const index = filter.card.indexOf(item.value);
									filter.card.splice(index, 1);
									if (filter.card.length == 0)
										return setFilter({ ...filter, card: [''] });
									return setFilter({ ...filter, card: [...filter.card] });
								}
								setFilter({ ...filter, card: [...filter.card, item.value] });
							}}
							className='flex-1 flex flex-row items-center gap-4'
						>
							{item.data.logo ? (
								<Image
									source={formatUploadPath(item.data.logo)}
									style={{ height: 25, width: 50 }}
								/>
							) : (
								<MaterialCommunityIcons
									name='cards'
									size={28}
									color={theme['--primary']}
								/>
							)}
							<Typography
								color={theme['--text']}
								className='w-[150px]'
								variant='label'
							>
								{item.name}
							</Typography>
						</Pressable>
						{filter.card.includes(item.value) && (
							<Ionicons
								name='checkmark-circle'
								size={25}
								color={theme['--primary']}
							/>
						)}
					</View>
				)}
				className='mx-2 p-2'
			/>
			<View>
				<View className='flex-row justify-between items-center'>
					<Typography className='border-b-hairline' weight='bold'>
						{translations.tabs.offers.offersFilter.sort.title}
					</Typography>
					<TouchableOpacity
						onPress={() =>
							setFilter({
								...filter,
								sortDirection: filter.sortDirection == 'asc' ? 'desc' : 'asc',
							})
						}
						className='rounded-2xl flex-row gap-2 px-3 py-2 bg-card'
					>
						<Typography weight='bold' color={theme['--primary']} variant='label'>
							{
								translations.tabs.offers.offersFilter.sort[
									filter.sortDirection as keyof typeof translations.tabs.offers.offersFilter.sort
								]
							}
						</Typography>
						<FontAwesome
							color={theme['--primary']}
							name={
								filter.sortDirection == 'asc'
									? 'sort-amount-asc'
									: 'sort-amount-desc'
							}
							size={16}
						/>
					</TouchableOpacity>
				</View>
				<RadioButton
					label={translations.tabs.offers.offersFilter.sort.expiryDate}
					value='expiry_date'
					selectedValue={filter.sortKey}
					onPress={(value) => setFilter({ ...filter, sortKey: value as SortKey })}
				/>
				<RadioButton
					label={translations.tabs.offers.offersFilter.sort.alphabet}
					value={language == 'ar' ? 'alphabet_ar' : 'alphabet_en'}
					selectedValue={filter.sortKey}
					onPress={(value) => setFilter({ ...filter, sortKey: value as SortKey })}
				/>
			</View>

			<View className='flex-row gap-4 justify-center'>
				<Button
					variant='primary'
					className='flex-1'
					onPress={() => {
						closeHandler();
					}}
					borderStyle='filled'
				>
					<Typography color='white'>{translations.buttons.apply}</Typography>
				</Button>

				<Button
					variant='primary'
					className='flex-1'
					onPress={() => {
						setFilter({ card: [''], category: '', sortKey: '', sortDirection: 'asc' });
						closeHandler();
					}}
					borderStyle='outlined'
				>
					<Typography color={theme['--primary']}>
						{translations.buttons.default}
					</Typography>
				</Button>
			</View>
		</View>
	);
};

export default OffersFilter;
