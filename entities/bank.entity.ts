import { EntityStatus } from '@/ts/entity.types';
import { ITranslation } from '@/ts/translation.types';

export type BankType = 'regular' | 'digital' | 'digital-wallet';

export interface IBank {
	country: string;
	status: EntityStatus;
	name: ITranslation;
	logo: string;
	id: string;
	type: BankType;
}
