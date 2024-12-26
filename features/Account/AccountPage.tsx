import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { cardsStore, favoritesStore, userStore } from '@/stores';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';

import { ScrollView, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import ThemeSwitchList from './components/ThemeSwitchList';

// type Props = {};

const AccountPage = observer(() => {
	const { theme, switchTheme } = useThemeContext();

	const getCardsAndFavCount = () => {
		return [favoritesStore().favorites.length, cardsStore().userCardsList.length];
	};
	return (
		<ScrollView showsVerticalScrollIndicator={false} className='px-6'>
			<View className='mt-3 items-center justify-center'>
				<View className='flex-row'>
					<Typography variant='h2'>
						{userStore().user != null && userStore().user.full_name}
					</Typography>
				</View>
				<View className='flex-row mt-2'>
					<Typography variant='label'>{getCardsAndFavCount()[0]}</Typography>
					<Ionicons className='mr-1' size={21} name='heart-outline' color={'#6633cc'} />
					<Typography variant='label'>favorites</Typography>
					<View className='border-r border-gray-400 h-full mx-4' />
					<Typography variant='label'>{getCardsAndFavCount()[1]} </Typography>
					<Ionicons className='mr-1 ' size={21} color={'#6633cc'} name='card-outline' />
					<Typography variant='label'>cards</Typography>
				</View>

				{/* Grouped Items */}
				<View className='mt-6 w-full shadow-sm shadow-gray-300 '>
					<Typography variant='label' className='ml-2 ' color='gray'>
						General
					</Typography>
					<View className='overflow-hidden rounded-2xl mb-8 mt-2'>
						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='Profile Details'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='person'
									size={18}
								/>
							}
						/>

						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='About Us'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='information'
									size={18}
								/>
							}
						/>

						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='Contact Us'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='text'
									size={18}
								/>
							}
						/>
					</View>

					<Typography variant='label' className='ml-2' color='gray'>
						Settings
					</Typography>
					<View className='rounded-2xl overflow-hidden mt-2'>
						<BottomSheetWrapper
							sheet={(closeHandler) => (
								<ThemeSwitchList
									onSelect={(theme) => {
										switchTheme(theme);
										closeHandler();
									}}
									selectedTheme={theme}
								/>
							)}
						>
							{(openHandler) => (
								<ProfileListItem
									onPress={openHandler}
									label='Theme'
									leadingIcon={
										<Ionicons
											className='bg-primary-1 p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='color-fill'
											size={18}
										/>
									}
								/>
							)}
						</BottomSheetWrapper>
						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='Settings'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='settings'
									size={18}
								/>
							}
						/>
						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='Delete Account'
							leadingIcon={
								<AntDesign
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='delete'
									size={18}
								/>
							}
						/>
						<ProfileListItem
							className='border-none'
							label='Logout'
							onPress={userStore().logout}
							leadingIcon={
								<Ionicons
									className='bg-primary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name={theme == 'dark' ? 'bulb' : 'moon'}
									size={18}
								/>
							}
						/>
					</View>
				</View>
			</View>
		</ScrollView>
	);
});

export default AccountPage;

interface ProfileListItemProps extends TouchableOpacityProps {
	leadingIcon?: React.ReactNode;
	trailingIcon?: React.ReactNode | 'chevron';
	label: string;
	onPress?: () => void;
}

const ProfileListItem = ({
	leadingIcon,
	trailingIcon,
	label,
	className,
	disabled = false,
	onPress,
	...rest
}: ProfileListItemProps) => {
	return (
		<TouchableOpacity
			className={`flex-row p-3.5 items-center  bg-background-1 gap-3 ${className}`}
			disabled={disabled}
			onPress={onPress}
			{...rest}
		>
			{leadingIcon}
			<Typography className='flex-1' weight='medium' variant='label'>
				{label}
			</Typography>
			{trailingIcon == 'chevron' ? (
				<Feather color='#bcbcbc' name='chevron-right' size={19} />
			) : (
				trailingIcon
			)}
		</TouchableOpacity>
	);
};
