import BottomSheetWrapper from '@/components/BottomSheet/BottomSheetWrapper';
import BackButton from '@/components/Button/BackButton';
import EditButton from '@/components/Button/EditButton';
import Typography from '@/components/Typography/Typography';
import FullNameEditSheet from '@/features/Profile/FullNameEditSheet';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { rootStore } from '@/stores';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConfigurationItem } from '../../features/Configuration/components/ConfigurationItem';

export default function EditProfile() {
	const { bottom } = useSafeAreaInsets();
	const theme = useThemeStyles();
	return (
		<TabLayout title='Profile' leading={<BackButton />}>
			<View style={{ paddingBottom: bottom }} className='p-4 flex-1'>
				<View className='w-full gap-6 flex-1'>
					<View className='overflow-hidden rounded-2xl'>
						<ConfigurationItem
							disabled
							className='border-gray-300'
							label='Email Address'
							trailing={
								<Typography color='gray'>
									{rootStore.userStore.user.email}
								</Typography>
							}
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
								label='Full name'
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
										className='bg-primary-1 p-1.5'
										color='white'
										style={{ borderRadius: 12 }}
										name='person'
										size={18}
									/>
								}
							/>
						)}
					</BottomSheetWrapper>
				</View>
			</View>
		</TabLayout>
	);
}
