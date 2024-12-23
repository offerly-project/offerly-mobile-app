import AccountPage from '@/features/Profile/AccountPage';
import TabLayout from '@/layouts/TabLayout';
import { StyleSheet, Text, View } from 'react-native';

type Props = {};

const Accounts = (props: Props) => {
	return (
		<TabLayout title='Account'>
			<AccountPage />
		</TabLayout>
	);
};

export default Accounts;

const styles = StyleSheet.create({});
