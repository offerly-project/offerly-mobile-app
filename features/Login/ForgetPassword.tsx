import { ActivityIndicator, View } from 'react-native';
import Typography from '@/components/Typography/Typography';
import Input from '@/components/Input/Input';
import Button from '@/components/Button/Buttton';
import Link from '@/components/Typography/Link';
import z from 'zod/lib';
import { userStore } from '@/stores';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function ForgetPassword() {
	const theme = useThemeStyles();

	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: '',
			},
			schema,
			onSubmit: async (values) => {
				const { email } = values;
				return await userStore().login(email, '');
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};
	return (
		<>
			<View className='flex-1 justify-center items-center'>
				<View className='gap-7 m-auto w-full'>
					<View className='gap-2.5'>
						<Typography
							className='tracking-wider'
							color={theme['--primary-2']}
							weight='light'
							variant='h3'
						>
							Forgot Password
						</Typography>
						<Typography className='tracking-wider' weight='light' variant='label'>
							We will share a password reset link on your email address.
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.email}
							onChangeText={onInputChange('email')}
							error={errors.email}
							placeholder='Email Address'
						/>
						<Button
							disabled={!submittable}
							loading={loading}
							borderStyle='filled'
							loadingComponent={<ActivityIndicator />}
							onPress={handleSubmit}
						>
							<Typography color='white'>Send confirmation link</Typography>
						</Button>
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography weight='light' variant='label'>
						Try logging in?
					</Typography>
					<Link to={'/login'} variant='label'>
						Login now
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
