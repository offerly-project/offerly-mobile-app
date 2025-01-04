import Button from '@/components/Button/Buttton';
import PasswordInput from '@/components/Input/PasswordInput';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { ActivityIndicator, View } from 'react-native';
import { z } from 'zod';

interface NewPasswordFormProps {
	tempToken: string;
}

export const schema = z
	.object({
		password: z.string().min(1, 'New password must be chosen.'),
		confirmPassword: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Passwords must match',
	});

type FormValues = z.infer<typeof schema>;

export default function NewPasswordForm({ tempToken }: NewPasswordFormProps) {
	const theme = useThemeStyles();
	const { translations } = languageStore();

	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				password: '',
				confirmPassword: '',
			},
			schema,
			onSubmit: async (values) => {
				await userStore().resetPasswordAndPerformLogin(tempToken, values.password);
			},
		});

	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<KeyboardAvoidingLayout className='flex-1 justify-center'>
			<View className='gap-5'>
				<Typography variant='h3' color={theme['--primary']}>
					{translations.auth.forgetPassword.setNewPassword}
				</Typography>
				<PasswordInput
					value={values.password}
					onChangeText={onInputChange('password')}
					error={errors.password}
					placeholder={translations.placeholders.newPasswordPlaceholder}
					className={`${languageStore().isRtl ? 'text-right' : 'text-left'}`}
				/>
				<PasswordInput
					value={values.confirmPassword}
					onChangeText={onInputChange('confirmPassword')}
					error={errors.confirmPassword}
					placeholder={translations.placeholders.retypeNewPasswordPlaceholder}
					className={`${languageStore().isRtl ? 'text-right' : 'text-left'}`}
				/>
				<Button
					onPress={handleSubmit}
					borderStyle='filled'
					loadingComponent={<ActivityIndicator color={theme['--background']} />}
					loading={loading}
					disabled={!submittable}
				>
					<Typography color='white'>{translations.buttons.saveAndLogin}</Typography>
				</Button>
				{serverError && (
					<Typography variant='caption' color='red' align='center'>
						{serverError}
					</Typography>
				)}
			</View>
		</KeyboardAvoidingLayout>
	);
}
