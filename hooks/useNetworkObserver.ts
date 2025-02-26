import { useThemeContext } from '@/contexts/ThemeContext';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';

export const useNetworkObserver = () => {
	const theme = useThemeContext().theme;
	useEffect(() => {
		const unsub = NetInfo.addEventListener((state) => {
			if (!state.isConnected) {
				Alert.alert(
					'No Internet Connection',
					'Please check your internet connection',
					[
						{
							text: 'Settings',
							onPress: () => {
								if (Platform.OS === 'ios') {
									Linking.openURL('App-Prefs:WIFI');
								} else if (Platform.OS === 'android') {
									Linking.sendIntent('android.settings.WIFI_SETTINGS');
								}
							},
						},
						{ text: 'OK' },
					],
					{
						userInterfaceStyle: theme,
					},
				);
			}
		});
		return () => {
			unsub();
		};
	}, []);
};
