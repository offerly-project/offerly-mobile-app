import { NotificationToken } from '@/entities/user.entity';
import { userStore } from '@/stores';
import messaging from '@react-native-firebase/messaging';
import EventEmitter from 'eventemitter3';
import * as Notifications from 'expo-notifications';
import { router, usePathname } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export enum NotificationActions {
	SHOW_SORTED_BY_NEW_ORDERS = 'SHOW_SORTED_BY_NEW_ORDERS',
	EXPIRING_FAVOURITES = 'EXPIRING_FAVOURITES',
}

export const readyEvent = (action: NotificationActions) => action + '-ready';

export type NewOffersNotificationData = {
	action: NotificationActions.SHOW_SORTED_BY_NEW_ORDERS;
};

export type ExpiringOffersNotificationData = {
	action: NotificationActions.EXPIRING_FAVOURITES;
	offers: string;
};

export type NotificationPayload = NewOffersNotificationData | ExpiringOffersNotificationData;

export const notificationsEventsEmitter = new EventEmitter();

export const useNotifications = () => {
	const getUserPermission = async () => {
		const authStatus = await messaging().requestPermission();
		return authStatus;
	};

	const pathname = usePathname();
	const notificationPressHandler = async (data: NotificationPayload) => {
		if (data.action === NotificationActions.SHOW_SORTED_BY_NEW_ORDERS) {
			const isInOffers = pathname === '/tabs/offers';

			if (!isInOffers) {
				router.push('/tabs/offers');
			}
			if (!isInOffers) {
				notificationsEventsEmitter.on(
					readyEvent(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS),
					() => {
						notificationsEventsEmitter.emit(
							NotificationActions.SHOW_SORTED_BY_NEW_ORDERS,
						);
					},
				);
			} else {
				notificationsEventsEmitter.emit(NotificationActions.SHOW_SORTED_BY_NEW_ORDERS);
			}
		}
		if (data.action === NotificationActions.EXPIRING_FAVOURITES) {
			const isInFavorites = pathname === '/tabs/favorites';

			if (!isInFavorites) {
				router.push('/tabs/favorites');
			}

			if (!isInFavorites) {
				notificationsEventsEmitter.on(
					readyEvent(NotificationActions.EXPIRING_FAVOURITES),

					() => {
						notificationsEventsEmitter.emit(
							NotificationActions.EXPIRING_FAVOURITES,
							data.offers,
						);
					},
				);
			} else {
				notificationsEventsEmitter.emit(
					NotificationActions.EXPIRING_FAVOURITES,
					data.offers,
				);
			}
		}
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
