import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { translateInvalidError, translateRequiredError } from '@/utils/utils';
import { router } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import z from 'zod';

export default function SignupForm() {
	const { translations } = languageStore();

	const schema = z.object({
		full_name: z.string().min(1, { message: translateRequiredError('fullName', translations) }),
		email: z
			.string()
			.email({ message: translateInvalidError('email', translations) })
			.min(1, { message: translateRequiredError('email', translations) }),
		password: z.string().min(1, { message: translateRequiredError('password', translations) }),
	});
	type FormValues = z.infer<typeof schema>;
	const theme = useThemeStyles();

	const toast = useToast();

	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: '',
				password: '',
				full_name: '',
			},
			schema,
			onSubmit: async (values) => {
				const { full_name, email, password } = values;
				const response = await userStore().signup(email, password, full_name);
				if (response) {
					toast.show('Signup successful', { type: 'success' });
					router.replace('/login');
				}
			},
		});
	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
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
							{translations.auth.signup.createAccount}
						</Typography>
					</View>
					<View className='gap-5'>
						<Input
							value={values.full_name}
							onChangeText={onInputChange('full_name')}
							error={errors.full_name}
							placeholder={translations.placeholders.fullName}
						/>
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
							onPress={handleSubmit}
							loadingComponent={<ActivityIndicator color={theme['--background']} />}
						>
							<Typography color={theme['--background']}>
								{translations.buttons.signup}
							</Typography>
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
						{translations.auth.signup.footer}
					</Typography>
					<Link color={theme['--primary']} replace to='/login' variant='label'>
						{translations.buttons.login}
					</Link>
				</View>
			</KeyboardAvoidingLayout>
		</>
	);
}
