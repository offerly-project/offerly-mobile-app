import * as SecStore from 'expo-secure-store';

export class SecureStore {
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
