import { BankType } from '@/entities/bank.entity';
import { OfferChannel } from '@/entities/offer.entity';

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

export const truncateLongText = (text: string, length: number) => {
	if (text.length > length) {
		return text.slice(0, length) + '...';
	}
	return text;
};

export const formatOfferChannels = (channels: OfferChannel[]) => {
	return channels.map((channel) => {
		switch (channel) {
			case 'online':
				return 'Online';
			case 'in-store':
				return 'In Store';
		}
	});
};
