import { CardsApi } from '@/api/cards.api';
import { ICard } from '@/entities/card.entity';
import { action, computed, observable, runInAction } from 'mobx';
import { RootStore } from '.';

export class CardsStore {
	@observable private _cards: Record<string, ICard> = {};
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	fetchUserCards = async () => {
		const cards = await CardsApi.getUserCards();
		runInAction(() => {
			cards.forEach((card) => {
				this._cards[card.id] = card;
			});
		});
	};

	@computed
	get userCardsList() {
		return Object.values(this._cards);
	}

	@action
	removeUserCards = async (cards: string[]) => {
		await CardsApi.deleteUserCards(cards);
		runInAction(() => {
			cards.forEach((cardId) => {
				delete this._cards[cardId];
			});
		});
	};

	@action
	updateUserCards = async (cards: ICard[]) => {
		await CardsApi.patchUserCards(cards.map((card) => card.id));
		runInAction(() => {
			cards.forEach((card) => {
				this._cards[card.id] = card;
			});
		});
	};
}
