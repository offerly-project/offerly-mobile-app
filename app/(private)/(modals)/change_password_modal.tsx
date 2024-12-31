import { AuthApi } from '@/api/auth.api';
import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { z } from 'zod';

type Props = {};

type StateType = {
	old_password: string;
	new_password: string;
	confirm_password: string;
};

const schema = z
	.object({
		old_password: z.string().min(1, { message: 'Old password is required' }),
		new_password: z.string().min(1, { message: 'New password is required' }),
		confirm_password: z.string().min(1, { message: 'Confirm password is required' }),
	})
	.refine((data) => data.new_password === data.confirm_password, {
		message: 'Confirm password must match the new password',
		path: ['confirm_password'],
	});
const ChangePasswordModal = (props: Props) => {
	const theme = useThemeStyles();
	const { values, setValues, errors, handleSubmit, serverError, loading } = useForm<StateType>({
		initialValues: {
			old_password: '',
			new_password: '',
			confirm_password: '',
		},
		schema,
		onSubmit: async (values) => {
			await AuthApi.resetPasswordByOldPassword(values.old_password, values.new_password);
			router.back();
		},
	});

	const onOldPasswordChange = (value: string) => {
		setValues((prev) => ({ ...prev, old_password: value }));
	};
	const onNewPasswordChange = (value: string) => {
		setValues((prev) => ({ ...prev, new_password: value }));
	};

	const onConfirmPasswordChange = (value: string) => {
		setValues((prev) => ({ ...prev, confirm_password: value }));
	};

	return (
		<ModalLayout title='Change Password'>
			<View className='gap-10 p-6'>
				<Input
					placeholder='Type your old password'
					value={values.old_password}
					onChangeText={onOldPasswordChange}
					error={errors.old_password}
				/>
				<View className='gap-5'>
					<Input
						placeholder='Type New Password'
						value={values.new_password}
						onChangeText={onNewPasswordChange}
						error={errors.new_password}
					/>
					<Input
						placeholder='Retype a New Password'
						value={values.confirm_password}
						onChangeText={onConfirmPasswordChange}
						error={errors.confirm_password}
					/>
				</View>
			</View>
			<Button
				loading={loading}
				loadingComponent={<ActivityIndicator color={theme['--background']} />}
				className='w-[50%] mx-auto'
				borderStyle='filled'
				onPress={handleSubmit}
			>
				<Typography color={theme['--background']}>Change Password</Typography>
			</Button>
			{serverError && (
				<Typography color={'red'} className='mx-auto my-4'>
					{serverError}
				</Typography>
			)}
		</ModalLayout>
	);
};

export default ChangePasswordModal;

const styles = StyleSheet.create({});
