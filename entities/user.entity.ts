export interface IUser {
	email: string;
	full_name: string;
	favorites: string[];
	cards: string[];
}

export type PatchUserData = Partial<Pick<IUser, 'full_name'>>;

export class User {
	email: string;
	full_name: string;
	token: string;
	constructor(user: Omit<IUser, 'favorites' | 'cards'>, token: string) {
		this.email = user.email;
		this.full_name = user.full_name;
		this.token = token;
	}

	update(user: Partial<PatchUserData>) {
		if (user.full_name) this.full_name = user.full_name;
	}
}
