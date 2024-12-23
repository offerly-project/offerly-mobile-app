import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { userStore } from '@/stores';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import z from 'zod';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

type FormValues = z.infer<typeof schema>;

const LoginForm = () => {
	const theme = useThemeStyles();
	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: '',
				password: '',
			},
			schema,
			onSubmit: async (values) => {
				const { email, password } = values;
				return await userStore().login(email, password);
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};
	useEffect(() => {
		// handleSubmit();
	}, []);

	return (
		<>
			<KeyboardAvoidingLayout className='flex-1 justify-center items-center'>
				<View className='gap-10 m-auto w-full'>
					<View>
						<Typography
							color={theme['--primary-2']}
							weight='bold'
							className='tracking-widest'
							variant='h1'
						>
							Welcome!
						</Typography>
						<Typography
							color={theme['--primary-2']}
							className='tracking-wider'
							variant='body'
						>
							We are glad to see you
						</Typography>
					</View>
					<View className='gap-5'>
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
							loadingComponent={<ActivityIndicator color={theme['--background']} />}
							onPress={handleSubmit}
						>
							<Typography color='white'>Login</Typography>
						</Button>
						{serverError && (
							<Typography variant='caption' color='red' align='center'>
								{serverError}
							</Typography>
						)}
					</View>

					<View className='m-auto'>
						<Link color={theme['--primary-2']} to='/forgetPassword' variant='label'>
							Forgot your password?
						</Link>
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography color={theme['--primary-2']} weight='light' variant='label'>
						Dont have an account?
					</Typography>
					<Link replace to={'/signup'} color={theme['--primary-2']} variant='label'>
						Sign up
					</Link>
				</View>
			</KeyboardAvoidingLayout>
		</>
	);
};

export default LoginForm;
