import { makeAutoObservable, observable } from 'mobx';

export interface IUser {
	email: string;
	full_name: string;
	favorites: string[];
	cards: string[];
	phone_number?: string;
}

export type PatchUserData = Partial<Pick<IUser, 'full_name' | 'phone_number'>>;

export class User {
	email: string;
	@observable full_name: string;
	@observable phone_number: string;
	token: string;
	constructor(user: Omit<IUser, 'favorites' | 'cards'>, token: string) {
		this.email = user.email;
		this.full_name = user.full_name;
		this.phone_number = user?.phone_number || '';
		this.token = token;
		makeAutoObservable(this);
	}

	update = (user: Partial<PatchUserData>) => {
		if (user.full_name) this.full_name = user.full_name;
		if (user.phone_number !== undefined) this.phone_number = user.phone_number;
	};
}
