import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import ConfigurationRouteChevronIcon from '@/features/Configuration/components/ConfigurationRouteChevronIcon';
import DeleteAccount from '@/features/Configuration/DeleteAccount';
import LanguageSwitchList from '@/features/Configuration/LanguageSwitchList';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { version as AppVersion } from '@/package.json';
import { cardsStore, favoritesStore, userStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { ConfigurationItem } from '../../../features/Configuration/components/ConfigurationItem';
import ThemeSwitchList from '../../../features/Configuration/ThemeSwitchList';

// type Props = {};

const AccountPage = observer(() => {
	const { theme, switchTheme } = useThemeContext();
	const styles = useThemeStyles();
	const getCardsAndFavCount = () => {
		return [favoritesStore().favorites.length, cardsStore().userCardsList.length];
	};

	const { user } = userStore();

	return (
		<TabLayout title={user.full_name}>
			<View className='px-6'>
				<View className='mt-3 items-center justify-center'>
					<View className='mt-6 w-full'>
						<ConfigurationItem
							label='Profile'
							trailing={<ConfigurationRouteChevronIcon />}
							onPress={() => {
								router.push('/(private)/edit_profile');
							}}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='person'
									size={18}
								/>
							}
						/>

						<ConfigurationItem
							label='Change Password'
							onPress={() => {
								router.push('/(private)/(modals)/change_password_modal');
							}}
							trailing={<ConfigurationRouteChevronIcon />}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='lock-closed'
									size={18}
								/>
							}
						/>

						<ConfigurationItem
							label='Terms & Conditions'
							onPress={() => {
								router.push('/(private)/(modals)/terms_and_conditions_modal');
							}}
							trailing={<ConfigurationRouteChevronIcon />}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='document'
									size={18}
								/>
							}
						/>

						<ConfigurationItem
							label='About Us'
							onPress={() => {
								router.push('/(private)/(modals)/about_modal');
							}}
							trailing={<ConfigurationRouteChevronIcon />}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='information'
									size={18}
								/>
							}
						/>

						<ConfigurationItem
							label='Contact us'
							onPress={() => {
								router.push('/(private)/(modals)/contact_us_modal');
							}}
							trailing={<ConfigurationRouteChevronIcon />}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='send'
									size={18}
								/>
							}
						/>

						<BottomSheetWrapper
							sheet={(closeHandler) => <LanguageSwitchList onSelect={closeHandler} />}
						>
							{(openHandler) => (
								<ConfigurationItem
									label='Languages'
									onPress={openHandler}
									trailing={<ConfigurationRouteChevronIcon />}
									leading={
										<Ionicons
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='language'
											size={18}
										/>
									}
								/>
							)}
						</BottomSheetWrapper>

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
									trailing={<ConfigurationRouteChevronIcon />}
									leading={
										<Ionicons
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='color-fill'
											size={18}
										/>
									}
								/>
							)}
						</BottomSheetWrapper>

						<BottomSheetWrapper
							sheet={(closeHandler) => (
								<DeleteAccount
									onConfirm={() => {
										closeHandler();
										userStore().deleteAccount();
									}}
									onCancel={closeHandler}
								/>
							)}
						>
							{(openHandler) => (
								<ConfigurationItem
									label='Delete Account'
									onPress={openHandler}
									leading={
										<AntDesign
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='deleteuser'
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
									className='bg-primary p-1.5'
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
			<View className='flex-row items-center justify-center py-4'>
				<Typography variant={'body'} color={styles['--text']}>
					Version: {AppVersion}
				</Typography>
			</View>
			<View className='flex-row mt-2 items-center gap-4 w-full justify-center py-6 flex-1 absolute bottom-0'>
				<View className='flex flex-row gap-1 items-center'>
					<Typography variant='label' color={styles['--text']}>
						{getCardsAndFavCount()[0]}
					</Typography>
					<Ionicons size={21} className='h-[25]' name='heart-outline' color={'#6633cc'} />
					<Typography variant='label' color={styles['--text']}>
						Favorites
					</Typography>
				</View>

				<View className='w-[1] h-[18] bg-text' />

				<View className='flex flex-row gap-1 items-center'>
					<View className='items-center gap-4' />
					<Typography variant='label' color={styles['--text']}>
						{getCardsAndFavCount()[1]}{' '}
					</Typography>
					<Ionicons size={21} className='h-[25]' color={'#6633cc'} name='card-outline' />
					<Typography variant='label' color={styles['--text']}>
						Cards
					</Typography>
				</View>
			</View>
		</TabLayout>
	);
});

export default AccountPage;
