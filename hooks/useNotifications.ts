import { NotificationToken } from '@/entities/user.entity';
import { userStore } from '@/stores';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

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

			messaging().onMessage((message) => {
				Notifications.scheduleNotificationAsync({
					content: {
						title: message.notification?.title,
						body: message.notification?.body,
					},
					trigger: null,
				});
			});

			messaging()
				.getToken()
				.then(async (token) => {
					const tokenPayload: NotificationToken = {
						token,
						timestamp: Date.now(),
						platform: Platform.OS,
					};
					userStore().updateUser({
						notification_token: tokenPayload,
					});
				});
		})();
	}, []);
};
