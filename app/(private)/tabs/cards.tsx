import GuestCards from '@/features/Cards/GuestCards';
import UserCards from '@/features/Cards/UserCards';
import TabTransitionLayout from '@/layouts/TabTransitionLayout';
import { userStore } from '@/stores';
import { observer } from 'mobx-react-lite';

const Cards = observer(() => {
	const { isGuest } = userStore();

	return <TabTransitionLayout>{isGuest ? <GuestCards /> : <UserCards />}</TabTransitionLayout>;
});

export default Cards;
