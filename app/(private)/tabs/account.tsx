import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import ConfigurationRouteChevronIcon from '@/features/Configuration/components/ConfigurationRouteChevronIcon';
import DeleteAccount from '@/features/Configuration/DeleteAccount';
import LanguageSwitchList from '@/features/Configuration/LanguageSwitchList';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabTransitionLayout from '@/layouts/TabTransitionLayout';
import { version as AppVersion } from '@/package.json';
import { cardsStore, favoritesStore, languageStore, userStore } from '@/stores';
import { authEmitter } from '@/stores/user.store';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import Toast from 'react-native-toast-message';
import { ConfigurationItem } from '../../../features/Configuration/components/ConfigurationItem';
import ThemeSwitchList from '../../../features/Configuration/ThemeSwitchList';

export const ACCOUNT_ICON_SIZE = 18;

const AccountPage = observer(() => {
	const { theme, switchTheme } = useThemeContext();
	const styles = useThemeStyles();
	const { translations } = languageStore();
	const getCardsAndFavCount = () => {
		return [favoritesStore().favorites.length, cardsStore().userCardsList.length];
	};

	const { isGuest } = userStore();

	return (
		<TabTransitionLayout>
			<View>
				<View className='items-center justify-center'>
					<View className='w-full'>
						<ConfigurationItem
							label={translations.tabs.account.profile.title}
							trailing={<ConfigurationRouteChevronIcon />}
							onPress={() => {
								router.push('/(private)/edit_profile');
							}}
							disabled={isGuest}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='person'
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>

						<ConfigurationItem
							disabled={isGuest}
							label={translations.tabs.account.change_password.title}
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
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>

						<ConfigurationItem
							label={translations.tabs.account.terms_and_conditions.title}
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
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>

						<ConfigurationItem
							label={translations.tabs.account.about_modal.title}
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
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>

						<ConfigurationItem
							label={translations.tabs.account.contact_us.title}
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
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>

						<BottomSheetWrapper
							sheet={(closeHandler) => <LanguageSwitchList onSelect={closeHandler} />}
						>
							{(openHandler) => (
								<ConfigurationItem
									label={translations.tabs.account.languages.title}
									onPress={openHandler}
									trailing={<ConfigurationRouteChevronIcon />}
									leading={
										<Ionicons
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='language'
											size={ACCOUNT_ICON_SIZE}
										/>
									}
								/>
							)}
						</BottomSheetWrapper>

						<BottomSheetWrapper
							sheet={(closeHandler) => (
								<ThemeSwitchList
									onSelect={(selected) => {
										if (selected === theme) return;
										switchTheme(selected);
										closeHandler();
									}}
									selectedTheme={theme}
								/>
							)}
						>
							{(openHandler) => (
								<ConfigurationItem
									onPress={openHandler}
									label={translations.tabs.account.theme.title}
									trailing={<ConfigurationRouteChevronIcon />}
									leading={
										<Ionicons
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='color-fill'
											size={ACCOUNT_ICON_SIZE}
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
										router.push('/loading_modal');
										userStore()
											.deleteAccount()
											.then(() => {
												userStore().applyLogout();
											})
											.catch(() => {
												Toast.show({
													type: 'error',
													text1: translations.errors.error,
												});
												router.back();
											});
									}}
									onCancel={closeHandler}
								/>
							)}
						>
							{(openHandler) => (
								<ConfigurationItem
									disabled={isGuest}
									label={translations.tabs.account.deleteAccount.title}
									onPress={openHandler}
									leading={
										<AntDesign
											className='bg-primary p-1.5'
											color='white'
											style={{ borderRadius: 12 }}
											name='deleteuser'
											size={ACCOUNT_ICON_SIZE}
										/>
									}
								/>
							)}
						</BottomSheetWrapper>

						<ConfigurationItem
							className='border-none'
							label={translations.tabs.account.logout}
							onPress={() => {
								router.push('/(private)/(fullscreen_modals)/loading_modal');
								userStore()
									.logout()
									.then(() => {
										authEmitter.emit('logout');
									})
									.catch(() => {
										Toast.show({
											type: 'error',
											text1: translations.errors.error,
										});
										router.back();
									});
							}}
							leading={
								<Ionicons
									className='bg-primary p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name={'exit'}
									size={ACCOUNT_ICON_SIZE}
								/>
							}
						/>
					</View>
				</View>
			</View>
			<View className='flex-col items-center justify-center py-4 gap-2'>
				<Typography variant={'body'} color={styles['--text']}>
					{translations.tabs.account.version} : {AppVersion}
				</Typography>

				<View className='flex flex-row gap-2 items-center justify-start w-[100px]'>
					<Typography variant='label' color={styles['--text']} numeric>
						{getCardsAndFavCount()[0]}
					</Typography>
					<Ionicons
						size={21}
						className='h-[25]'
						name='heart'
						color={styles['--primary']}
					/>
					<Typography variant='label' color={styles['--text']}>
						{translations.tabs.account.favorites}
					</Typography>
				</View>

				<View className='flex flex-row gap-2 flex-start justify-start w-[100px]'>
					<Typography variant='label' color={styles['--text']} numeric>
						{getCardsAndFavCount()[1]}
					</Typography>
					<Ionicons
						size={21}
						className='h-[25]'
						color={styles['--primary']}
						name='card-outline'
					/>
					<Typography variant='label' color={styles['--text']}>
						{translations.tabs.account.cards}
					</Typography>
				</View>
			</View>
		</TabTransitionLayout>
	);
});

export default AccountPage;
