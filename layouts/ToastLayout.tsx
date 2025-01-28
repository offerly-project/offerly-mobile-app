import { CustomToastProps } from '@/components/Toasts/constants';
import ErrorToast from '@/components/Toasts/ErrorToast';
import InfoToast from '@/components/Toasts/InfoToast';
import SuccessToast from '@/components/Toasts/SuccessToast';
import { StyleSheet } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';
import { TOAST_OFFSET } from './TabLayout';

const configs: ToastConfig = {
	success: (props: CustomToastProps) => <SuccessToast {...props} />,
	error: (props: CustomToastProps) => <ErrorToast {...props} />,
	info: (props: CustomToastProps) => <InfoToast {...props} />,
};

type Props = {
	children: React.ReactNode;
	offset?: number;
};

const ToastLayout = ({ children, offset = TOAST_OFFSET }: Props) => {
	return (
		<>
			{children}
			<Toast position='top' topOffset={offset} config={configs} />
		</>
	);
};

export default ToastLayout;

const styles = StyleSheet.create({});
