import { SCREEN_WIDTH } from '@/constants/screens';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import TabLayout from '@/layouts/TabLayout';
import { languageStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import { StyleSheet } from 'react-native';
import CardsGuestMessage from './CardsGuestMessage';

const Cards = observer(() => {
	// Hooks and theme
	const theme = useThemeStyles();
	const { translations } = languageStore();

	return (
		<TabLayout title={translations.tabs.cards.tabName}>
			<CardsGuestMessage />
		</TabLayout>
	);
});

export default Cards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 8,
		paddingVertical: 16,
	},
	addButtonContainer: {
		width: '100%',
		alignItems: 'flex-end',
	},
	addButton: {
		height: 45,
		width: 45,
		padding: 0,
		borderRadius: 45 / 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardList: {
		flex: 1,
	},
	cardRow: {
		flexDirection: 'row',
		gap: 8,
		paddingBottom: 16,
		paddingEnd: 10,
	},
	cardStyle: {
		width: SCREEN_WIDTH / 3,
		paddingTop: 10,
	},
	groupSeparator: {},
	hapticPressContainer: {
		width: '100%',
		height: 60,
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionButtons: {
		flexDirection: 'row',
		gap: 40,
	},
	actionButton: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
});
