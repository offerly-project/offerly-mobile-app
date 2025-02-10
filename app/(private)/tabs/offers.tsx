import GuestOffers from '@/features/Offers/GuestOffers';
import UserOffers from '@/features/Offers/UserOffers';
import { userStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { StyleSheet } from 'react-native';

type Props = {};

const Offers = observer((props: Props) => {
	const { isGuest } = userStore();

	return isGuest ? <GuestOffers /> : <UserOffers />;
});

export default Offers;

const styles = StyleSheet.create({});
