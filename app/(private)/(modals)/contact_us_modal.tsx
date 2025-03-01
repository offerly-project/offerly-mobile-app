import { UserApi } from '@/api/user.api';
import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { languageStore, userStore } from '@/stores';
import { translateInvalidError, translateRequiredError } from '@/utils/utils';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { z } from 'zod';

type Props = {};

const INPUT_CLASS = 'h-[45]';

const ContactUsModal = (props: Props) => {
	const { user, isGuest } = userStore();

	const { translations } = languageStore();
	const theme = useThemeStyles();
	const schema = z.object({
		subject: z.string().min(1, translateRequiredError('subject', translations)),
		message: z.string().min(1, translateRequiredError('message', translations)),
		email: isGuest
			? z
					.string()
					.email(translateInvalidError('email', translations))
					.min(1, translateRequiredError('email', translations))
			: z.string(),
	});
	const { values, setValues, handleSubmit, errors, loading, serverError } = useForm({
		schema,
		initialValues: {
			subject: '',
			message: '',
			email: '',
		},
		onSubmit: async (values) => {
			if (isGuest) {
				await UserApi.guestContact(values.email, values.subject, values.message);
			} else {
				await UserApi.userContact(values.subject, values.message);
			}
			router.back();
			Toast.show({
				type: 'success',
				text1: translations.toast.contactMessageSent,
			});
		},
	});

	const onSubjectChange = (subject: string) => {
		setValues((prev) => ({ ...prev, subject }));
	};

	const onMessageChange = (message: string) => {
		setValues((prev) => ({ ...prev, message }));
	};

	const onEmailChange = (email: string) => {
		setValues((prev) => ({ ...prev, email }));
	};

	return (
		<ModalLayout title={translations.tabs.account.contact_us.title}>
			<View className='gap-5 px-4'>
				<Input
					value={user.full_name}
					className={INPUT_CLASS}
					disabled
					placeholder={translations.placeholders.fullName}
				/>
				<Input
					value={isGuest ? values.email : user.email}
					placeholder={translations.placeholders.email}
					disabled={!isGuest}
					className={INPUT_CLASS}
					onChangeText={onEmailChange}
					error={errors.email}
				/>
				<Input
					value={values.subject}
					onChangeText={onSubjectChange}
					placeholder={translations.tabs.account.contact_us.subjectPlaceholder}
					className={INPUT_CLASS}
					error={errors.subject}
				/>
				<Input
					value={values.message}
					onChangeText={onMessageChange}
					placeholder={translations.tabs.account.contact_us.messagePlaceholder}
					className={'h-[150]'}
					multiline
					error={errors.message}
				/>
				<Button
					loading={loading}
					loadingComponent={<ActivityIndicator color={theme['--text']} />}
					className='h-[55]'
					borderStyle='filled'
					onPress={handleSubmit}
				>
					<Typography color={'white'} weight='bold'>
						{translations.tabs.account.contact_us.sendFormButton}
					</Typography>
				</Button>
				{serverError && (
					<Typography color={theme['--danger']} align='center'>
						{serverError}
					</Typography>
				)}
			</View>
		</ModalLayout>
	);
};

export default ContactUsModal;

const styles = StyleSheet.create({});
