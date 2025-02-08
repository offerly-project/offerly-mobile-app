import GuestCards from '@/features/Cards/GuestCards';
import UserCards from '@/features/Cards/UserCards';
import { userStore } from '@/stores';
import { observer } from 'mobx-react-lite';

const Cards = observer(() => {
	const { isGuest } = userStore();

	return isGuest ? <GuestCards /> : <UserCards />;
});

export default Cards;
