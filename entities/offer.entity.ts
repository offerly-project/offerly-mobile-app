import { EntityStatus } from "@/ts/entity.types";
import { ITranslation } from "@/ts/translation.types";

export interface IOfferMetadata {
	total: number;
	page: number;
	limit: number;
}

export interface IOffer {
	_id: string;
	description: ITranslation;
	terms_and_conditions: ITranslation;
	offer_source_link: string;
	expiry_date: Date;
	minimum_amount: number;
	channels: string[];
	categories: string[];
	applicable_cards: string[];
	logo: string;
	discount_code: string;
	starting_date: Date;
	cap: number;
	status: EntityStatus;
	title: string;
}
