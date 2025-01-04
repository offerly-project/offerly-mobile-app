import { uiStore } from '@/stores';
import { UIStoreStateKey } from '@/stores/ui.store';

export const useUIState = <T = any>(key: UIStoreStateKey) => {
	const { setValue, getValue } = uiStore();

	const value = getValue(key) as T;

	return [value, (value: T) => setValue(key, value)] as const;
};
