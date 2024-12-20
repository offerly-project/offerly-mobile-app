import { AuthApi } from '@/api/auth.api';
import { AxiosAuthInterceptorManager } from '@/configs/axios';
import { User } from '@/entities/user.entity';
import _ from 'lodash';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';
import { UserApi } from '@/api/user.api';

export class UserStore {
	private rootStore: RootStore;
	@observable user!: User;
	@observable authenticated: boolean = false;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	@action
	login = async (email: string, password: string) => {
		const { user, token } = await AuthApi.login(email, password);
		runInAction(() => {
			this.authenticated = true;
			this.user = new User(_.omit(user, ['favorites']), token);
			this.rootStore.favoritesStore.setFavorites(user.favorites);
		});
		AxiosAuthInterceptorManager.addInterceptor(token);
	};

	@action
	signup = async (email: string, password: string, full_name: string) => {
		return await UserApi.signup(email, password, full_name);
	};

	@action
	forgetPassword = async (email: string) => {
		return await AuthApi.forgotPassword(email);
	};
}
