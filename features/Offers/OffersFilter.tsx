import Button from '@/components/Button/Buttton';
import RadioButton from '@/components/Button/RadioButton';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { IOfferFilter, SortKey } from '@/entities/offer.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { cardsStore, languageStore } from '@/stores';
import { formatUploadPath } from '@/utils/utils';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Pressable, TouchableOpacity, View } from 'react-native';
import Categories from './Categories';

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

	const handleRadioSelection = (value: string) => {
		if (filter.sortKey == value) return setFilter({ ...filter, sortKey: '' as SortKey });
		setFilter({ ...filter, sortKey: value as SortKey });
	};

	const placeHolder = (function () {
		if (filter.card.length === 1) {
			return userCardsList.find((card) => card.id === filter.card[0])?.name[langKey];
		}
		if (filter.card.length > 1) {
			return translations.placeholders.multipleCardsSelected;
		}
		return translations.placeholders.selectCard;
	})();

	return (
		<View className='gap-5 py-3'>
			<Categories filter={filter} setFilter={setFilter!} />
			<Select
				snapPoints={['65%']}
				placeHolder={placeHolder}
				items={[
					{
						name: translations.tabs.offers.offersFilter.myCardsOffers,
						value: '',
						data: {} as any,
					},
					...userCardsList
						.sort((a, b) => a.bank.name[langKey].localeCompare(b.bank.name[langKey]))
						.map((card) => ({
							name: card.name[langKey],
							value: card.id,
							data: card,
						})),
				]}
				searchResolver={(item, search) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				}
				itemRenderer={(item, index, closeHandler) => {
					const selected =
						(filter.card.length === 0 && index === 0) ||
						filter.card.includes(item.data.id);
					return (
						<View className='flex flex-row items-center h-[65px] gap-6 w-full'>
							<Pressable
								onPress={() => {
									if (index === 0) {
										// All cards
										setFilter({ ...filter, card: [] });
										closeHandler();
										return;
									}
									const updatedCards = filter.card.includes(item.data.id)
										? filter.card.filter((id) => id !== item.data.id)
										: [...filter.card, item.data.id];
									setFilter({ ...filter, card: updatedCards });
								}}
								className='flex-1 flex flex-row items-center gap-4 '
							>
								{item.data?.logo ? (
									<Image
										source={formatUploadPath(item.data?.logo)}
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
								{selected && (
									<Ionicons
										className='ml-auto'
										name='checkmark-circle'
										size={25}
										color={theme['--primary']}
									/>
								)}
							</Pressable>
						</View>
					);
				}}
				className='mx-2 p-2'
			/>
			<View>
				<View className='flex-row justify-between items-center'>
					<Typography
						color={theme['--text']}
						className='border-b-hairline border-text'
						weight='bold'
					>
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
					onPress={(value) => handleRadioSelection(value)}
				/>
				<RadioButton
					label={translations.tabs.offers.offersFilter.sort.alphabet}
					value={`alphabet_${langKey}`}
					selectedValue={filter.sortKey}
					onPress={(value) => handleRadioSelection(value)}
				/>
				<RadioButton
					label={translations.tabs.offers.offersFilter.sort.creationDate}
					value={`created_at`}
					selectedValue={filter.sortKey}
					onPress={(value) => handleRadioSelection(value)}
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
					<Typography color={theme['--background']}>
						{translations.buttons.apply}
					</Typography>
				</Button>

				<Button
					variant='primary'
					className='flex-1'
					onPress={() => {
						setFilter({
							card: [],
							category: [],
							sortKey: '',
							sortDirection: 'asc',
						});
						closeHandler();
					}}
					borderStyle='outlined'
				>
					<Typography>{translations.buttons.default}</Typography>
				</Button>
			</View>
		</View>
	);
};

export default OffersFilter;
