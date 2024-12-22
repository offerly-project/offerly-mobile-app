import Typography from '@/components/Typography/Typography';
import TabLayout from '@/layouts/TabLayout';
import { StyleSheet } from 'react-native';

type Props = {};

const Accounts = (props: Props) => {
	return (
		<TabLayout title='Account'>
			<Typography>Account</Typography>
		</TabLayout>
	);
};

export default Accounts;

const styles = StyleSheet.create({});
