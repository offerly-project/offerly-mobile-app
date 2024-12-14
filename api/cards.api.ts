import { axiosInstance } from '@/configs/axios';
import { IBank } from '@/entities/bank.entity';
import { ICard } from '@/entities/card.entity';
import { AxiosResponse } from 'axios';

export class CardsApi {
	static getCardsByBankId = async (bankId: string) => {
		const data = await axiosInstance.get(`/user/banks/${bankId}/cards`).then(
			(
				res: AxiosResponse<{
					cards: ICard[];
					bank: IBank;
				}>,
			) => res.data,
		);

		return data;
	};

	static getUserCards = async () => {
		const data = await axiosInstance
			.get('/user/cards')
			.then((res: AxiosResponse<ICard[]>) => res.data);
		return data;
	};

	static deleteUserCards = async (cardsIds: string[]) => {
		return await axiosInstance.delete(`/user/cards?cards=${cardsIds.join(',')}`);
	};

	static patchUserCards = async (cardsIds: string[]) => {
		return await axiosInstance.patch(`/user/cards`, { cards: cardsIds });
	};
}
