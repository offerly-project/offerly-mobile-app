import { EntityStatus } from "@/ts/entity.types";
import { formatUploadPath } from "@/utils/utils";
import { computed, makeAutoObservable, observable } from "mobx";

export interface ICard {
	name: string;
	logo: string;
	scheme: string;
	id: string;
	status: EntityStatus;
	grade: string;
}

export class Card {
	@observable name: string;
	@observable private _logo: string;
	@observable scheme: string;
	@observable id: string;
	@observable status: EntityStatus;
	@observable grade: string;

	constructor(card: ICard) {
		this.name = card.name;
		this._logo = card.logo;
		this.scheme = card.scheme;
		this.id = card.id;
		this.status = card.status;
		this.grade = card.grade;
		makeAutoObservable(this);
	}

	@computed
	get image() {
		return formatUploadPath(this._logo);
	}
}
