import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { rootStore, userStore } from '@/stores';
import Feather from '@expo/vector-icons/build/Feather';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { useState } from 'react';
import { Modal, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function EditProfile() {
	const [textInput, setTextInput] = useState('');
	const [isModalVisible, setModalVisible] = useState(false);
	const [isMale, setIsMale] = useState(true);

	return (
		<View className='px-6 mt-6 w-full shadow-sm shadow-gray-300 '>
			<Typography variant='label' className='ml-2 ' color='gray'>
				General
			</Typography>
			<View className='overflow-hidden rounded-2xl mb-8 mt-2'>
				<ProfileListItem
					disabled
					className='border-b-hairline border-gray-300'
					label='Email Address'
					trailingIcon={
						<Typography color='gray'>{rootStore.userStore.user.email}</Typography>
					}
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

				{/* <ProfileListItem
					className='border-b-hairline border-gray-300'
					label='Contact Us'
					trailingIcon={<Typography color='gray'>Hello</Typography>}
					leadingIcon={
						<Ionicons
							className='bg-secondary-1 p-1.5'
							color='white'
							style={{ borderRadius: 12 }}
							name='text'
							size={18}
						/>
					}
				/> */}
			</View>
			<ProfileListItem
				className='border-b-hairline border-gray-300 rounded-2xl'
				label='Full name'
				onPress={() => setModalVisible(!isModalVisible)}
				trailingIcon={
					<Typography color='gray'>{rootStore.userStore.user.full_name}</Typography>
				}
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
				className='border-b-hairline border-gray-300 rounded-2xl mt-2'
				label='Gender'
				onPress={() => setIsMale(!isMale)}
				trailingIcon={
					isMale ? (
						<>
							<FontAwesome name='male' size={20} color={'gray'} />
							<Typography color='gray'>Male</Typography>
						</>
					) : (
						<>
							<FontAwesome name='female' size={20} color={'gray'} />
							<Typography color='gray'>Female</Typography>
						</>
					)
				}
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
			<Modal
				transparent={true}
				animationType='fade'
				visible={isModalVisible}
				onRequestClose={() => setModalVisible(!isModalVisible)}
			>
				<View className='flex-1 items-center justify-center bg-[rgba(0,0,0,0.4)]'>
					<View className='w-80 bg-white p-6 rounded-2xl shadow-lg'>
						<Typography className='text-lg font-bold text-center mb-4'>
							Enter your text
						</Typography>
						<Input
							value={rootStore.userStore.user.full_name}
							onChangeText={(text) => setTextInput(text)}
							placeholder='Type something...'
							className='rounded-lg'
						/>
						<View className='flex-row justify-between mt-5'>
							<Button
								onPress={() => setModalVisible(!isModalVisible)}
								className='px-4 py-2 rounded-lg'
							>
								<Typography color='white'>Cancel</Typography>
							</Button>
							<Button
								onPress={() => {
									setModalVisible(!isModalVisible);
								}}
								className='px-4 py-2 rounded-lg'
							>
								<Typography color='white'>Submit</Typography>
							</Button>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}
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
			className={`flex-row p-3.5 items-center  bg-white gap-3 ${className} ${disabled && 'opacity-50'}`}
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
