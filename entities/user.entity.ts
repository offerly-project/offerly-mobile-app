export interface IUser {
	email: string;
	full_name: string;
	favorites: string[];
}

export class User {
	email: string;
	full_name: string;
	token: string;
	constructor(user: Omit<IUser, 'favorites'>, token: string) {
		this.email = user.email;
		this.full_name = user.full_name;
		this.token = token;
	}
}
