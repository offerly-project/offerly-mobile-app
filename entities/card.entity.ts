import { EntityStatus } from '@/ts/entity.types';
import { ITranslation } from '@/ts/translation.types';
import { IBank } from './bank.entity';

export interface ICard {
	name: ITranslation;
	logo: string;
	scheme: ITranslation;
	id: string;
	status: EntityStatus;
	grade: ITranslation;
	bank: IBank;
}
