import { EntityStatus } from "@/ts/entity.types";
import { formatUploadPath } from "@/utils/utils";
import { computed, makeAutoObservable, observable } from "mobx";

export type BankType = "regular" | "digital-card" | "digital-wallet";

export interface IBank {
	country: string;
	status: EntityStatus;
	name: string;
	logo: string;
	id: string;
	type: BankType;
}

export class Bank {
	@observable country: string;
	@observable status: EntityStatus;
	@observable name: string;
	@observable private _logo: string;
	@observable id: string;
	@observable type: BankType;
	constructor(bank: IBank) {
		this.country = bank.country;
		this.status = bank.status;
		this.name = bank.name;
		this.id = bank.id;
		this.type = bank.type;
		this._logo = bank.logo;
		makeAutoObservable(this);
	}

	@computed
	get image() {
		return formatUploadPath(this._logo);
	}
}
