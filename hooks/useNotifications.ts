import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

const requestUserPermission = async () => {
	const authStatus = await messaging().requestPermission();
	const enabled =
		authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
		authStatus === messaging.AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log('Authorization status:', authStatus);
	}
};

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

export const useNotifications = () => {
	useEffect(() => {
		requestUserPermission().then(() => {
			messaging()
				.getToken()
				.then((token) => {
					console.log('Token:', token);
				})
				.catch((e) => {
					console.error(e);
				});
		});
	}, []);
};
