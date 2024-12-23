import { AuthApi } from '@/api/auth.api';
import { UserApi } from '@/api/user.api';
import { AxiosAuthInterceptorManager } from '@/configs/axios';
import { User } from '@/entities/user.entity';
import { SecureStore } from '@/services/secure-store.service';
import _ from 'lodash';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';

export class UserStore {
	private rootStore: RootStore;
	@observable user!: User;
	@observable authenticated: boolean = false;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	@action
	setup = async () => {
		try {
			const token = await SecureStore.getItem('token');
			if (token) {
				AxiosAuthInterceptorManager.addInterceptor(token);
				const user = await UserApi.me();
				runInAction(async () => {
					this.authenticated = true;
					this.user = new User(_.omit(user, ['favorites', 'cards']), token);
					this.rootStore.favoritesStore.setFavorites(user.favorites);
				});
			}
		} catch (e) {
			AxiosAuthInterceptorManager.removeInterceptor();
			console.log(e);
		}
	};

	@action
	login = async (email: string, password: string) => {
		const { user, token } = await AuthApi.login(email, password);
		runInAction(() => {
			this.authenticated = true;
			this.user = new User(_.omit(user, ['favorites', 'cards']), token);
			this.rootStore.favoritesStore.setFavorites(user.favorites);
		});
		SecureStore.setItem('token', token);
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
