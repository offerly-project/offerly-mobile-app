import { BankType } from '@/entities/bank.entity';

export const formatUploadPath = (path: string) => {
	return `${process.env.EXPO_PUBLIC_BASE_API_URL}/uploads${path}`;
};

export const wait = (timeout: number) => {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
};

export const formatBankType = (type: BankType) => {
	switch (type) {
		case 'digital':
			return 'Digital';
		case 'digital-wallet':
			return 'Digital Wallet';
		case 'regular':
			return 'Regular';
	}
};
