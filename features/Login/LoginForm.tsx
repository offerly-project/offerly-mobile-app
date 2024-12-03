import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { userStore } from '@/stores';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import z from 'zod';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
});

type FormValues = z.infer<typeof schema>;

type Props = {};

const LoginForm = (props: Props) => {
	const theme = useThemeStyles();
	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: 'jadhamwi4@gmail.com',
				password: '1234',
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
		handleSubmit();
	}, []);

	return (
		<View className='gap-4 flex flex-col'>
			<View>
				<Typography variant='label' color={theme['--primary-3']}>
					Email
				</Typography>
				<Input
					variant='secondary'
					value={values.email}
					onChangeText={onInputChange('email')}
					error={errors.email}
				/>
			</View>
			<View>
				<Typography variant='label' color={theme['--primary-3']}>
					Password
				</Typography>
				<PasswordInput
					value={values.password}
					variant='secondary'
					onChangeText={onInputChange('password')}
					error={errors.password}
				/>
				<Link to={'/forgot-password'} variant='label' color={theme['--primary-3']}>
					Forgot your password?
				</Link>
			</View>
			<Button
				disabled={!submittable}
				loading={loading}
				variant='secondary'
				loadingComponent={<ActivityIndicator color={theme['--background']} />}
				onPress={handleSubmit}
			>
				<Typography color={theme['--primary-2']}>Login</Typography>
			</Button>
			<Link to={'/signup'} variant='label' color={theme['--primary-3']} className='m-auto'>
				Dont have an account?
			</Link>
			{serverError && (
				<Typography variant='caption' color='red'>
					{serverError}
				</Typography>
			)}
		</View>
	);
};

export default LoginForm;

const styles = StyleSheet.create({});
