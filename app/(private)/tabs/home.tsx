import Typography from '@/components/Typography/Typography';
import TabLayout from '@/layouts/TabLayout';
import { StyleSheet } from 'react-native';

type Props = {};

const Home = (props: Props) => {
	return (
		<TabLayout title='Home'>
			<Typography>home</Typography>
		</TabLayout>
	);
};

export default Home;

const styles = StyleSheet.create({});
