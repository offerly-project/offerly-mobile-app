import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Typography from '@/components/Typography/Typography';
import Link from '@/components/Typography/Link';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { ActivityIndicator, View } from 'react-native';
import z from 'zod/lib';
import { UserApi } from '@/api/user.api';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
	password: z.string().min(1, { message: 'Password is required' }),
	fullName: z.string().min(1, { message: 'Full name is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function SignupForm() {
	const theme = useThemeStyles();
	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: 'jadhamwi4@gmail.com',
				password: '1234',
				fullName: '',
			},
			schema,
			onSubmit: async (values) => {
				const { email, password, fullName } = values;
				const response = await UserApi.signup(email, password, fullName);
				console.log(response.data);
				return;
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};
	return (
		<>
			<View className='flex-1 justify-center items-center'>
				<View className='gap-10 m-auto w-full'>
					<View>
						<Typography
							color={theme['--primary-2']}
							className='tracking-wider'
							weight='light'
							variant='h3'
						>
							Create your account
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.fullName}
							onChangeText={onInputChange('fullName')}
							error={errors.fullName}
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
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography weight='light' variant='label'>
						Already have an account?
					</Typography>
					<Link to='./login' variant='label'>
						Sign in
					</Link>
				</View>
				{serverError && (
					<Typography variant='caption' color='red'>
						{serverError}
					</Typography>
				)}
			</View>
		</>
	);
}
