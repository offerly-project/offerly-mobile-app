import { useNotifications } from '@/hooks/useNotifications';
import { StyleSheet } from 'react-native';

type Props = {
	children: React.ReactNode;
};

const NotificationsWrapper = ({ children }: Props) => {
	useNotifications();
	return children;
};

export default NotificationsWrapper;

const styles = StyleSheet.create({});
