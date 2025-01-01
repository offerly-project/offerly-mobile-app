import { UserApi } from '@/api/user.api';
import Button from '@/components/Button/Buttton';
import Input from '@/components/Input/Input';
import Typography from '@/components/Typography/Typography';
import { useForm } from '@/hooks/useForm';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { userStore } from '@/stores';
import { router } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { z } from 'zod';

type Props = {};

const INPUT_CLASS = 'h-[45]';

const schema = z.object({
	subject: z.string().min(1, 'Subject is required'),
	message: z.string().min(1, 'Message is required'),
});

const ContactUsModal = (props: Props) => {
	const { user } = userStore();
	const toast = useToast();
	const { values, setValues, handleSubmit, errors, loading } = useForm({
		schema,
		initialValues: {
			subject: '',
			message: '',
		},
		onSubmit: async (values) => {
			await UserApi.contactUs(values.subject, values.message);
			router.back();
			toast.show('Message sent successfully', { type: 'success' });
		},
	});

	const onSubjectChange = (subject: string) => {
		setValues((prev) => ({ ...prev, subject }));
	};

	const onMessageChange = (message: string) => {
		setValues((prev) => ({ ...prev, message }));
	};

	const theme = useThemeStyles();

	return (
		<ModalLayout title='Contact us'>
			<View className='gap-5 p-6'>
				<Input value={user.full_name} className={INPUT_CLASS} disabled />
				<Input value={user.email} disabled className={INPUT_CLASS} />
				<Input
					value={values.subject}
					onChangeText={onSubjectChange}
					placeholder='Subject'
					className={INPUT_CLASS}
					error={errors.subject}
				/>
				<Input
					value={values.message}
					onChangeText={onMessageChange}
					placeholder='Message'
					className={'h-[150]'}
					multiline
					error={errors.message}
				/>
				<Button
					loading={loading}
					loadingComponent={<ActivityIndicator />}
					className='h-[55]'
					borderStyle='filled'
					onPress={handleSubmit}
				>
					<Typography color={theme['--text']} weight='bold'>
						Send
					</Typography>
				</Button>
			</View>
		</ModalLayout>
	);
};

export default ContactUsModal;

const styles = StyleSheet.create({});
