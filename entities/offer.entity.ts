import { EntityStatus } from '@/ts/entity.types';
import { ITranslation } from '@/ts/translation.types';
import { ICard } from './card.entity';

export interface IOfferMetadata {
	total: number;
	page: number;
	limit: number;
}

export type OfferChannel = 'online' | 'in-store';

export type SortKey = 'expiry_date' | 'alphabet_ar' | 'alphabet_en' | 'created_at' | '';

export type sortDirection = 'asc' | 'desc' | '';

export interface IOffer {
	id: string;
	description: ITranslation;
	terms_and_conditions: ITranslation;
	offer_source_link: string;
	expiry_date: Date;
	minimum_amount: number;
	channels: OfferChannel[];
	categories: string[];
	bankId: string;
	applicable_cards: ICard[];
	logo: string;
	discount_code: string;
	starting_date: Date;
	cap: number;
	status: EntityStatus;
	title: ITranslation;
}

export interface IOfferFilter {
	card: string[];
	category: string[];
	sortKey: SortKey;
	sortDirection: sortDirection;
}
