import Typography from '@/components/Typography/Typography';
import { useThemeContext } from '@/contexts/ThemeContext';
import EditProfile from '@/features/Login/EditProfile';
import { rootStore } from '@/stores';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import { useState } from 'react';
import { ScrollView, Switch, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

// type Props = {};

const accounts = () => {
	const { theme, switchTheme } = useThemeContext();

	const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState(theme == 'dark');
	const [isEditProfileEnabled, setIsEditProfileEnabled] = useState(false);

	const toggleSwitch = () => {
		setIsDarkThemeEnabled((previousState) => !previousState);
		return isDarkThemeEnabled ? switchTheme('light') : switchTheme('dark');
	};
	if (isEditProfileEnabled) {
		return <EditProfile />;
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false} className='px-6'>
			<View className='mt-3 items-center justify-center'>
				<View className='flex-row'>
					<Typography variant='h2'>
						{rootStore.userStore.user != null && rootStore.userStore.user.full_name}
					</Typography>
				</View>
				<View className='flex-row mt-2'>
					<Typography variant='label'>2 </Typography>
					<Ionicons className='mr-1' size={21} name='heart-outline' color={'#6633cc'} />
					<Typography variant='label'>favorites</Typography>
					<View className='border-r border-gray-400 h-full mx-4' />
					<Typography variant='label'>3 </Typography>
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
							onPress={() => setIsEditProfileEnabled(true)}
							className='border-b-hairline border-gray-300'
							label='Profile Details'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-secondary-1 p-1.5'
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
									className='bg-secondary-1 p-1.5'
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
									className='bg-secondary-1 p-1.5'
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
					<View className='rounded-2xl overflow-hidden mt-2 '>
						<ProfileListItem
							disabled
							label='Dark Mode'
							leadingIcon={
								<Ionicons
									className='bg-secondary-1 p-1.5'
									color='white'
									style={{ borderRadius: 12 }}
									name='exit'
									size={18}
								/>
							}
							trailingIcon={
								<Switch value={isDarkThemeEnabled} onValueChange={toggleSwitch} />
							}
						/>
						<ProfileListItem
							className='border-b-hairline border-gray-300'
							label='Settings'
							trailingIcon='chevron'
							leadingIcon={
								<Ionicons
									className='bg-secondary-1 p-1.5'
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
									className='bg-secondary-1 p-1.5'
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
							leadingIcon={
								<Ionicons
									className='bg-secondary-1 p-1.5'
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
};

export default accounts;

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
			className={`flex-row p-3.5 items-center  bg-white gap-3 ${className}`}
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
