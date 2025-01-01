import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { userStore } from '@/stores';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import z from 'zod';

const schema = z.object({
	full_name: z.string().min(1, { message: 'Full name is required' }),
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function SignupForm() {
	const theme = useThemeStyles();
	const [showModal, setShowModal] = useState(false);

	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: 'jadhamwi4@gmail.com',
				password: '1234',
				full_name: '',
			},
			schema,
			onSubmit: async (values) => {
				const { full_name, email, password } = values;
				const response = await userStore().signup(email, password, full_name);
				if (response) {
					setShowModal(true);
				}
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	const closeModalAndNavigate = () => {
		setShowModal(false);
		router.replace('/login');
	};

	return (
		<>
			<KeyboardAvoidingLayout className='flex-1 justify-center items-center'>
				<View className='gap-10 m-auto w-full'>
					<View>
						<Typography
							color={theme['--primary']}
							className='tracking-wider'
							weight='light'
							variant='h3'
						>
							Create your account
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.full_name}
							onChangeText={onInputChange('full_name')}
							error={errors.full_name}
							placeholder='Full name'
						/>
						<Input
							value={values.email}
							onChangeText={onInputChange('email')}
							error={errors.email}
							placeholder='Email Address'
						/>
						<PasswordInput
							value={values.password}
							onChangeText={onInputChange('password')}
							error={errors.password}
							placeholder='Password'
						/>
						<Button
							disabled={!submittable}
							loading={loading}
							borderStyle='filled'
							onPress={handleSubmit}
							loadingComponent={<ActivityIndicator color={theme['--background']} />}
						>
							<Typography color='white'>Sign up</Typography>
						</Button>
						{serverError && (
							<Typography align='center' variant='caption' color='red'>
								{serverError}
							</Typography>
						)}
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography color={theme['--primary']} weight='light' variant='label'>
						Already have an account?
					</Typography>
					<Link color={theme['--primary']} replace to='/login' variant='label'>
						Sign in
					</Link>
				</View>
			</KeyboardAvoidingLayout>
			<Modal
				visible={showModal}
				transparent={true}
				animationType='fade'
				onRequestClose={() => setShowModal(false)}
			>
				<View className='items-center justify-center flex-1 bg-[rgba(0,0,0,0.4)]'>
					<View className='bg-white rounded-2xl p-10 w-[80%] gap-5'>
						<Typography weight='medium' variant='h3' align='center'>
							Signup Successful!
						</Typography>
						<Typography align='center' variant='body'>
							Your account has been created. Click &quot;OK&quot; to log in.
						</Typography>
						<Button
							className='rounded-lg py-2'
							borderStyle='filled'
							onPress={closeModalAndNavigate}
						>
							<Typography color='white' align='center'>
								OK
							</Typography>
						</Button>
					</View>
				</View>
			</Modal>
		</>
	);
}
