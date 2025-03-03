import { AuthApi } from '@/api/auth.api';
import { OtpApi } from '@/api/otp.api';
import { UserApi } from '@/api/user.api';
import { AxiosAuthInterceptorManager } from '@/configs/axios';
import { IUser, PatchUserData, User } from '@/entities/user.entity';
import { PlainStorage, SecureStorage } from '@/services/storage.services';
import messaging from '@react-native-firebase/messaging';
import EventEmitter from 'eventemitter3';
import _ from 'lodash';
import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { RootStore } from '.';

export const authEmitter = new EventEmitter();

export class UserStore {
	private rootStore: RootStore;
	@observable user!: User;
	@observable isGuest: boolean = false;

	@observable authenticated: boolean = false;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
		makeAutoObservable(this);
	}

	deleteAccount = async () => {
		try {
			await UserApi.deleteAccount();
			this.logout();
		} catch (e) {
			console.log(e);
		}
	};

	guestLogin = async () => {
		const { token } = await AuthApi.guestToken();
		console.log(token);

		AxiosAuthInterceptorManager.addInterceptor(token);
		SecureStorage.setItem('token', token);
		PlainStorage.setItem('guest', 'true');

		runInAction(() => {
			this.authenticated = true;
			this.user = new User({ email: '', full_name: 'Guest' }, token);
			this.isGuest = true;
		});
	};

	@action
	setup = async () => {
		try {
			const token = await SecureStorage.getItem('token');
			const isGuest = (await PlainStorage.getItem('guest')) === 'true';
			if (token && !isGuest) {
				AxiosAuthInterceptorManager.addInterceptor(token);
				const user = await UserApi.me();
				await this.rootStore.banksStore.fetchBanks();
				runInAction(() => {
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

	applyLogin = (user: IUser, token: string) => {
		this.authenticated = true;
		this.user = new User(_.omit(user, ['favorites', 'cards']), token);
		this.rootStore.favoritesStore.setFavorites(user.favorites);
	};

	applyLogout = () => {
		this.authenticated = false;
		this.user = null as unknown as User;
		this.isGuest = false;
	};

	@action
	login = async (email: string, password: string) => {
		const { user, token } = await AuthApi.login(email, password);
		SecureStorage.setItem('token', token);
		PlainStorage.deleteItem('guest');
		AxiosAuthInterceptorManager.addInterceptor(token);
		await this.rootStore.banksStore.fetchBanks();
		return { user, token };
	};

	@action
	signup = async (email: string, password: string, full_name: string) => {
		return await UserApi.signup(email, password, full_name);
	};

	@action
	forgetPassword = async (email: string) => {
		return await AuthApi.forgotPassword(email);
	};

	@action
	verifyOTP = async (code: string, email: string) => {
		return await OtpApi.verifyOtp(code, email);
	};

	@action
	resetPasswordAndPerformLogin = async (tempToken: string, password: string) => {
		const res = await AuthApi.resetPasswordByOtp(tempToken, password);
		const newToken = res.token;
		AxiosAuthInterceptorManager.addInterceptor(newToken);
		SecureStorage.setItem('token', newToken);
		const user = await UserApi.me();
		runInAction(() => {
			this.authenticated = true;
			this.user = new User(_.omit(user, ['favorites', 'cards']), newToken);
			this.rootStore.favoritesStore.setFavorites(user.favorites);
		});
	};

	@action
	updateUser = async (data: Partial<PatchUserData>) => {
		await UserApi.patchUser(data);
		this.user.update(data);
	};

	@action
	logout = async () => {
		if (!this.isGuest) {
			try {
				messaging().deleteToken();
			} catch (e) {
				console.error('Error deleting token:', e);
			}
		}
		AxiosAuthInterceptorManager.removeInterceptor();
		await SecureStorage.deleteItem('token');
	};
}
