import service from '@/http/request';

export type LoginRequest = {
	username: string;
	password: string;
};

//刷新登录信息需要的参数
export type reLoginRequest = {
	accessToken: string;
};

export type LoginResponse = {
	username: string;
	roles: string[];
	accessToken: string;
};

export const userLogin = async (data?: LoginRequest) => {
	return service<LoginResponse>({
		url: '/login',
		method: 'post',
		data,
	}).then((res) => res.data);
};

export const refreshUserInfo = async (data?: reLoginRequest) => {
	return service<LoginResponse>({
		url: '/getUserInfo',
		method: 'post',
		data,
	}).then((res) => res.data);
};

export const getUserList = async () => {
	return service({
		url: '/users',
		method: 'get',
	}).then((res) => res.data);
};
