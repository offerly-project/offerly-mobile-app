import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
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
	const { translations } = languageStore();
	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: 'testuser.offerly@gmail.com',
				password: 'fares',
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
							color={theme['--primary']}
							weight='bold'
							className='tracking-widest'
							variant='h1'
						>
							{translations.auth.login.welcome}
						</Typography>
						<Typography
							color={theme['--primary']}
							className='tracking-wider'
							variant='body'
						>
							{translations.auth.login.welcomeText}
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.email}
							onChangeText={onInputChange('email')}
							error={errors.email}
							placeholder={translations.placeholders.email}
						/>
						<PasswordInput
							value={values.password}
							onChangeText={onInputChange('password')}
							error={errors.password}
							placeholder={translations.placeholders.password}
						/>
						<Button
							disabled={!submittable}
							loading={loading}
							borderStyle='filled'
							loadingComponent={<ActivityIndicator color={theme['--background']} />}
							onPress={handleSubmit}
						>
							<Typography color='white'>{translations.buttons.login}</Typography>
						</Button>
						{serverError && (
							<Typography variant='caption' color='red' align='center'>
								{serverError}
							</Typography>
						)}
					</View>

					<View className='m-auto'>
						<Link color={theme['--primary']} to='/forgetPassword' variant='label'>
							{translations.auth.login.forgotYourPassword}
						</Link>
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography color={theme['--primary']} weight='light' variant='label'>
						{translations.auth.login.footer}
					</Typography>
					<Link replace to={'/signup'} color={theme['--primary']} variant='label'>
						{translations.buttons.signup}
					</Link>
				</View>
			</KeyboardAvoidingLayout>
		</>
	);
};

export default LoginForm;
