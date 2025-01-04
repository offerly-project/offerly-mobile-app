import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import z from 'zod';

const schema = z.object({
	email: z
		.string()
		.email({ message: 'Invalid Email Address' })
		.min(1, { message: 'Email is required' }),
});

type FormValues = z.infer<typeof schema>;

export default function ForgetPassword() {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: 'testuser.offerly@gmail.com',
			},
			schema,
			onSubmit: async (values) => {
				const { email } = values;
				const res = await userStore().forgetPassword(email);
				if (res) {
					router.push({
						pathname: '/(public)/otp',
						params: {
							email,
						},
					});
				}
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<>
			<KeyboardAvoidingLayout className='flex-1 justify-center items-center'>
				<View className='gap-7 m-auto w-full'>
					<View className='gap-2.5'>
						<Typography
							className='tracking-wider'
							color={theme['--primary']}
							weight='light'
							variant='h3'
						>
							{translations.auth.forgetPassword.forgetPassword}
						</Typography>
						<Typography className='tracking-wider' weight='light' variant='label'>
							{translations.auth.forgetPassword.forgetPasswordText}
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.email}
							onChangeText={onInputChange('email')}
							error={errors.email}
							placeholder={translations.placeholders.email}
						/>
						<Button
							disabled={!submittable}
							loading={loading}
							borderStyle='filled'
							loadingComponent={<ActivityIndicator />}
							onPress={handleSubmit}
						>
							<Typography color='white'>{translations.buttons.sendLink}</Typography>
						</Button>
						{serverError && (
							<Typography variant='caption' color='red' align='center'>
								{serverError}
							</Typography>
						)}
					</View>
				</View>
				<View className='flex-row gap-1 items-center absolute bottom-0'>
					<Typography color={theme['--primary']} weight='light' variant='label'>
						{translations.auth.forgetPassword.footer}{' '}
					</Typography>
					<Link color={theme['--primary']} goBack variant='label'>
						{translations.buttons.login}
					</Link>
				</View>
			</KeyboardAvoidingLayout>
		</>
	);
}
