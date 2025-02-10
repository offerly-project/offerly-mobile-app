import UserOffers from '@/features/Offers/UserOffers';
import { observer } from 'mobx-react-lite';
import { StyleSheet } from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	return <UserOffers />;
});

export default Offers;

const styles = StyleSheet.create({});
