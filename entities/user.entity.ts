import { makeAutoObservable, observable } from 'mobx';

export interface IUser {
	email: string;
	full_name: string;
	favorites: string[];
	cards: string[];
	phone_number?: string;
	notification_token?: string | null;
}

export type PatchUserData = Partial<
	Pick<IUser, 'full_name' | 'phone_number' | 'notification_token'>
>;

export class User {
	email: string;
	@observable full_name: string;
	@observable phone_number: string;
	token: string;
	notification_token: string | null;
	constructor(user: Omit<IUser, 'favorites' | 'cards'>, token: string) {
		this.email = user.email;
		this.full_name = user.full_name;
		this.phone_number = user?.phone_number || '';
		this.token = token;
		this.notification_token = user.notification_token || null;
		console.log(this.notification_token);

		makeAutoObservable(this);
	}

	update = (user: Partial<PatchUserData>) => {
		if (user.full_name) this.full_name = user.full_name;
		if (user.phone_number !== undefined) this.phone_number = user.phone_number;
		if (user.notification_token) this.notification_token = user.notification_token;
	};
}
