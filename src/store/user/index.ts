import { defineStore } from 'pinia';

import pinia from '@/store';
import { refreshUserInfo, userLogin } from '@/api/user';
import { IUserState } from './types';

export const useUserStoreHook = defineStore('userInfo', {
	state: (): IUserState => ({
		username: 'rocky',
		accessToken: '',
		roles: ['common'],
	}),
	getters: {},
	actions: {
		storeUserLogin(data: any) {
			return userLogin(data).then((res) => {
				this.username = res.username;
				this.roles = res.roles;
				this.accessToken = res.accessToken;
				return res;
			});
		},
		storeRefreshUserInfo() {
			if (this.username === 'rocky' && this.accessToken !== '') {
				refreshUserInfo({ accessToken: this.accessToken })
					.then((res) => {
						this.username = res.username;
						this.roles = res.roles;
						this.accessToken = res.accessToken;
					})
					.catch(() => {
						this.accessToken = '';
					});
			}
		},
	},
	//数据持久化
	persist: {
		key: 'userInfo',
		storage: sessionStorage,
		pick: ['accessToken'],
	},
});

export function useUserStore() {
	return useUserStoreHook(pinia);
}
