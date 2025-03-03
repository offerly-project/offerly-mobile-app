import Typography from '@/components/Typography/Typography';
import { BankType } from '@/entities/bank.entity';
import { OfferChannel } from '@/entities/offer.entity';
import { userStore } from '@/stores';
import { Translations } from '@/stores/language.store';
import { ErrorResponse } from '@/ts/errors.types';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import moment from 'moment';

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

export const processTranslationWithStyles = (text: string, style: object): JSX.Element => {
	const parts = text.split(/\[([^\]]+)\]/);
	return (
		<>
			{parts.map((part, index) =>
				index % 2 === 1 ? ( // Odd are the highlighted text
					<Typography key={index} {...style}>
						{part}
					</Typography>
				) : (
					part
				),
			)}
		</>
	);
};

export const translateRequiredError = (
	field: keyof Translations['forms'],
	translations: Translations,
) => {
	const requiredTemplate = translations.error_templates.required;
	const fieldTranslation = translations.forms[field];

	return requiredTemplate.replace('[field]', fieldTranslation);
};

export const translateInvalidError = (
	field: keyof Translations['forms'],
	translations: Translations,
) => {
	const invalidTemplate = translations.error_templates.invalid;
	const fieldTranslation = translations.forms[field];

	return invalidTemplate.replace('[field]', fieldTranslation);
};

export const guestSignup = () => {
	userStore()
		.logout()
		.then(() => {
			router.push('/signup');
		});
};

export const fillArrayWithPlaceholders = (arr: any[], multipleOf: number) => {
	const remainder = arr.length % multipleOf;
	if (remainder === 0) {
		return arr;
	}
	return [...arr, ...new Array(multipleOf - remainder).fill(null)];
};

export const extractApiError = (err: AxiosError) => {
	const _err = err.response?.data as ErrorResponse;
	return _err;
};

export const formatExpiryMessage = (expiryDate: Date, translations: Translations) => {
	const now = new Date();
	const expireDate = new Date(expiryDate);
	const diffDays = moment(expireDate).diff(moment(now), 'days');
	switch (diffDays) {
		case 0:
			return (
				translations.tabs.home.headers.expires + ' ' + translations.tabs.home.headers.today
			);
		case 1:
			return (
				translations.tabs.home.headers.expires +
				' ' +
				translations.tabs.home.headers.tomorrow
			);
		default:
			return (
				translations.tabs.home.headers.expiresIn +
				' ' +
				diffDays +
				' ' +
				translations.tabs.home.headers.days
			);
	}
};

export const openLoadingModal = async (cb: () => Promise<void>) => {
	return new Promise<void>((resolve) => {
		router.push('/loading_modal');
		cb().finally(() => {
			router.back();
			resolve();
		});
	});
};
