import Button from '@/components/Button/Buttton';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore, userStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet } from 'react-native';
import TabLayout from './TabLayout';

const getTitle = (name: string) => {
	const translations = languageStore().translations;
	switch (name) {
		case 'home':
			return translations.tabs.home.tabName;
		case 'cards':
			return translations.tabs.cards.tabName;
		case 'offers':
			return translations.tabs.offers.tabName;
		case 'account':
			return userStore().user.full_name;
		case 'favorites':
			return translations.tabs.favorites.tabName;
		default:
			return '';
	}
};

const getTrailing = (name: string) => {
	const theme = useThemeStyles();
	const guest = userStore().isGuest;
	switch (name) {
		case 'cards':
			return (
				<Button
					disabled={guest}
					className='aspect-square '
					hapticFeedback
					style={{
						backgroundColor: theme['--primary'],
						height: 30,
						borderWidth: 0,
					}}
					onPress={() => router.push('/(private)/select_cards')}
				>
					<Ionicons name='add' size={28} color={theme['--static']} />
				</Button>
			);
	}
};

type Props = {
	name: string;
	children: React.ReactNode;
};

const ScreensLayout = ({ children, name }: Props) => {
	const title = getTitle(name);

	const trailing = getTrailing(name);

	return (
		<TabLayout title={title} trailing={trailing} childrenStyles={{ padding: 0 }}>
			{children}
		</TabLayout>
	);
};

export default ScreensLayout;

const styles = StyleSheet.create({});
