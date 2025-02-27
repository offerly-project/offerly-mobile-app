import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import BackButton from '@/components/Button/BackButton';
import EditButton from '@/components/Button/EditButton';
import Typography from '@/components/Typography/Typography';
import FullNameEditSheet from '@/features/Profile/FullNameEditSheet';
import PhoneNumberEditSheet from '@/features/Profile/PhoneNumberEditSheet';
import TabLayout from '@/layouts/TabLayout';
import { languageStore, rootStore } from '@/stores';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { observer } from 'mobx-react-lite';
import { View } from 'react-native';
import { ConfigurationItem } from '../../features/Configuration/components/ConfigurationItem';
import { ACCOUNT_ICON_SIZE } from './tabs/account';

export const EditProfile = observer(() => {
	const { translations } = languageStore();
	const phoneNumber = rootStore.userStore.user.phone_number || '';

	return (
		<TabLayout
			title={translations.tabs.account.profile.title}
			leading={<BackButton variant='header' />}
		>
			<View className='flex-1'>
				<View className='w-full gap-2 flex-1'>
					<View className='overflow-hidden rounded-2xl'>
						<ConfigurationItem
							disabled
							className='border-gray-300'
							label={translations.tabs.account.profile.email}
							trailing={
								<Typography color='gray'>
									{rootStore.userStore.user.email}
								</Typography>
							}
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
					</View>

					{/* Full Name */}
					<BottomSheetWrapper
						sheet={(closeHandler) => (
							<FullNameEditSheet
								initialFullName={rootStore.userStore.user.full_name}
								closeHandler={closeHandler}
							/>
						)}
					>
						{(openHandler) => (
							<ConfigurationItem
								className='border-gray-300 rounded-2xl'
								label={translations.tabs.account.profile.fullName}
								trailing={
									<View className='flex-row gap-4'>
										<Typography color='gray'>
											{rootStore.userStore.user.full_name}
										</Typography>
										<EditButton onPress={openHandler} />
									</View>
								}
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
						)}
					</BottomSheetWrapper>

					{/* Phone Number */}
					<BottomSheetWrapper
						sheet={(closeHandler) => (
							<PhoneNumberEditSheet
								initialPhoneNumber={phoneNumber}
								closeHandler={closeHandler}
							/>
						)}
					>
						{(openHandler) => (
							<ConfigurationItem
								className='border-gray-300 rounded-2xl'
								label={translations.tabs.account.profile.phoneNumber}
								trailing={
									<View className='flex-row gap-4'>
										<Typography color='gray'>{phoneNumber}</Typography>
										<EditButton onPress={openHandler} />
									</View>
								}
								leading={
									<Ionicons
										className='bg-primary p-1.5'
										color='white'
										style={{ borderRadius: 12 }}
										name='phone-portrait'
										size={ACCOUNT_ICON_SIZE}
									/>
								}
							/>
						)}
					</BottomSheetWrapper>
				</View>
			</View>
		</TabLayout>
	);
});

export default EditProfile;
