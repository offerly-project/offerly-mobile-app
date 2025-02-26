import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import Link from '@/components/Typography/Link';
import Typography from '@/components/Typography/Typography';
import { IUser } from '@/entities/user.entity';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import KeyboardAvoidingLayout from '@/layouts/KeyboardAvoidingLayout';
import { languageStore, userStore } from '@/stores';
import { translateInvalidError, translateRequiredError } from '@/utils/utils';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, View } from 'react-native';
import z from 'zod';

const LoginForm = () => {
	const { translations } = languageStore();
	const schema = z.object({
		email: z
			.string()
			.email({ message: translateInvalidError('email', translations) })
			.min(1, { message: translateRequiredError('email', translations) }),
		password: z.string().min(1, { message: translateRequiredError('password', translations) }),
	});

	type FormValues = z.infer<typeof schema>;
	const theme = useThemeStyles();
	const navigation = useNavigation();

	const [loginAnimation] = useState(new Animated.Value(0));
	const [footerAnimation] = useState(new Animated.Value(0));

	const [userData, setUserData] = useState<{
		user: IUser;
		token: string;
	} | null>(null);

	const { handleSubmit, setValues, loading, errors, submittable, values, serverError } =
		useForm<FormValues>({
			initialValues: {
				email: __DEV__ ? 'jadhamwi4@gmail.com' : '',
				password: __DEV__ ? '1234' : '',
			},
			schema,
			onSubmit: async (values) => {
				const { email, password } = values;

				const { user, token } = await userStore().login(email, password);
				setUserData({ user, token });
			},
		});

	useEffect(() => {
		if (userData) {
			animateLogin().then(() => {
				userStore().switchToAuthenticated(userData.user, userData.token);
			});
		}
	}, [userData]);

	const onInputChange = (key: keyof FormValues) => (value: string) => {
		setValues((prev) => ({ ...prev, [key]: value }));
	};

	const animateLogin = (): Promise<void> => {
		return new Promise((resolve) => {
			Animated.parallel([
				Animated.spring(loginAnimation, {
					toValue: 1,
					friction: 10,
					tension: 50,
					useNativeDriver: true,
				}),
				Animated.spring(footerAnimation, {
					toValue: 1,
					friction: 10,
					tension: 50,
					useNativeDriver: true,
				}),
			]).start(() => {
				resolve();
			});
		});
	};

	const containerStyle = {
		opacity: loginAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [1, 0],
		}),
		transform: [
			{
				scale: loginAnimation.interpolate({
					inputRange: [0, 1],
					outputRange: [1, 0.95],
				}),
			},
		],
	};

	const footerStyle = {
		transform: [
			{
				translateY: footerAnimation.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 70],
				}),
			},
		],
	};

	return (
		<KeyboardAvoidingLayout className='flex-1 justify-center items-center'>
			<Animated.View style={[{ gap: 10, margin: 'auto', width: '100%' }, containerStyle]}>
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
						<Typography color={theme['--background']}>
							{translations.buttons.login}
						</Typography>
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
			</Animated.View>

			<Animated.View
				className='flex-row gap-1 items-center absolute bottom-0'
				style={footerStyle}
			>
				<Typography color={theme['--primary']} weight='light' variant='label'>
					{translations.auth.login.footer}
				</Typography>
				<Link replace to={'/signup'} color={theme['--primary']} variant='label'>
					{translations.buttons.signup}
				</Link>
			</Animated.View>
		</KeyboardAvoidingLayout>
	);
};

export default LoginForm;
