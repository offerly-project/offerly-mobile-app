import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecStore from 'expo-secure-store';

export class SecureStorage {
	public static async setItem(key: string, value: string): Promise<void> {
		await SecStore.setItemAsync(key, value);
	}
	public static async getItem(key: string): Promise<string | null> {
		return await SecStore.getItemAsync(key);
	}
	public static async deleteItem(key: string): Promise<void> {
		await SecStore.deleteItemAsync(key);
	}
}

export class PlainStorage {
	public static async setItem(key: string, value: string): Promise<void> {
		await AsyncStorage.setItem(key, value);
	}
	public static async getItem(key: string): Promise<string | null> {
		return await AsyncStorage.getItem(key);
	}
	public static async deleteItem(key: string): Promise<void> {
		await AsyncStorage.removeItem(key);
	}
}
