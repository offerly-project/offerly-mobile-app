import { userStore } from '@/stores';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export const useNotifications = () => {
	const getUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		return authStatus;
	};
	useEffect(() => {
		(async function () {
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: true,
					shouldSetBadge: true,
				}),
			});

			const permissions = await getUserPermission();
			if (
				permissions !== messaging.AuthorizationStatus.AUTHORIZED &&
				permissions !== messaging.AuthorizationStatus.PROVISIONAL
			) {
				userStore().updateUser({
					notification_token: null,
				});
				return;
			}

			messaging()
				.getToken()
				.then((token) => {
					userStore().updateUser({
						notification_token: token,
					});
				})
				.catch((e) => {
					console.error(e);
				});
		})();
	}, []);
};
