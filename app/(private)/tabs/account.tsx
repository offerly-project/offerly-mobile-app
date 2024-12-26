import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import { cardsStore, favoritesStore, userStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';

import ConfigurationRouteChevronIcon from '@/features/Configuration/components/ConfigurationRouteChevronIcon';
import TabLayout from '@/layouts/TabLayout';
import { router } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { ConfigurationItem } from '../../../features/Configuration/components/ConfigurationItem';
import ThemeSwitchList from '../../../features/Configuration/components/ThemeSwitchList';

// type Props = {};

const AccountPage = observer(() => {
	const { theme, switchTheme } = useThemeContext();

	const getCardsAndFavCount = () => {
		return [favoritesStore().favorites.length, cardsStore().userCardsList.length];
	};
	return (
		<TabLayout title='Account'>
			<ScrollView showsVerticalScrollIndicator={false} className='px-6'>
				<View className='mt-3 items-center justify-center'>
					<View className='flex-row'>
						<Typography variant='h2'>
							{userStore().user != null && userStore().user.full_name}
						</Typography>
					</View>
					<View className='flex-row mt-2 items-center gap-8'>
						<View className='flex flex-row gap-1 items-center'>
							<Typography variant='label'>{getCardsAndFavCount()[0]}</Typography>
							<Ionicons
								className='mr-1'
								size={21}
								name='heart-outline'
								color={'#6633cc'}
							/>
							<Typography variant='label'>Favorites</Typography>
						</View>

						<View className='flex flex-row gap-1 items-center'>
							<View className='items-center gap-4' />
							<Typography variant='label'>{getCardsAndFavCount()[1]} </Typography>
							<Ionicons
								className='mr-1 '
								size={21}
								color={'#6633cc'}
								name='card-outline'
							/>
							<Typography variant='label'>Cards</Typography>
						</View>
					</View>

					{/* Grouped Items */}
					<View className='mt-6 w-full shadow-sm shadow-gray-300 '>
						<Typography variant='label' className='ml-2 ' color='gray'>
							General
						</Typography>
						<View className='overflow-hidden rounded-2xl mb-8 mt-2'>
							<ConfigurationItem
								className='border-gray-300'
								label='Profile'
								trailing={<ConfigurationRouteChevronIcon />}
								onPress={() => {
									router.push('/(private)/edit_profile');
								}}
								leading={
									<Ionicons
										className='bg-primary-1 p-1.5'
										color='white'
										style={{ borderRadius: 12 }}
										name='person'
										size={18}
									/>
								}
							/>

							<ConfigurationItem
								className='border-gray-300'
								label='About Us'
								trailing={<ConfigurationRouteChevronIcon />}
								leading={
									<Ionicons
										className='bg-primary-1 p-1.5'
										color='white'
										style={{ borderRadius: 12 }}
										name='information'
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
									<ConfigurationItem
										onPress={openHandler}
										label='Theme'
										leading={
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

							<ConfigurationItem
								className='border-none'
								label='Logout'
								onPress={userStore().logout}
								leading={
									<Ionicons
										className='bg-primary-1 p-1.5'
										color='white'
										style={{ borderRadius: 12 }}
										name={'exit'}
										size={18}
									/>
								}
							/>
						</View>
					</View>
				</View>
			</ScrollView>
		</TabLayout>
	);
});

export default AccountPage;
