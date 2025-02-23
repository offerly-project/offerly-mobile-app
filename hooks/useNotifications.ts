import { NotificationToken } from '@/entities/user.entity';
import { userStore } from '@/stores';
import messaging from '@react-native-firebase/messaging';
import EventEmitter from 'eventemitter3';
import * as Notifications from 'expo-notifications';
import { router, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export type NotificationBasePayload<T extends object = {}> = {
	link: string;
} & T;

export type NewOffersNotificationData = NotificationBasePayload;

export type ExpiringOffersNotificationData = NotificationBasePayload;

export type NotificationPayload = NewOffersNotificationData | ExpiringOffersNotificationData;

export const notificationsEventsEmitter = new EventEmitter();

export const useNotifications = () => {
	const getUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		return authStatus;
	};

	const pathname = usePathname();
	const notificationPressHandler = async (data: NotificationPayload) => {
		router.push(data.link as any);
	};

	const unsubRef = React.useRef<() => void>();
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
				messaging().deleteToken();
				return;
			}

			unsubRef.current = messaging().onMessage((message) => {
				const data = message.data as NotificationPayload;
				console.log(data);
				Toast.show({
					text1: message.notification?.title,
					text2: message.notification?.body,
					type: 'info',
					onPress: () => {
						notificationPressHandler(data);
					},
				});
			});

			messaging()
				.getInitialNotification()
				.then((message) => {
					if (!message) return;

					const data = message.data as NotificationPayload;

					notificationPressHandler(data);
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

		return () => {
			unsubRef.current?.();
		};
	}, [pathname]);
};
