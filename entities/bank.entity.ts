import { EntityStatus } from "@/ts/entity.types";

export type BankType = "regular" | "digital-card" | "digital-wallet";

export interface IBank {
	country: string;
	status: EntityStatus;
	name: string;
	logo: string;
	id: string;
	type: BankType;
}