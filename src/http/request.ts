import axios, {
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
	// AxiosRequestConfig
} from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

//接口返回数据最外层类型
// interface BaseResponse<T = any> {
// 	code: number | string;
// 	message: string;
// 	data: T;
// 	status?: number;
// }

const service = axios.create({
	// baseURL: import.meta.env.VITE_APP_API_BASEURL,
	//.env.development 中配置
	baseURL: import.meta.env.VITE_APP_USE_MOCK
		? import.meta.env.VITE_APP_MOCK_BASEURL
		: import.meta.env.VITE_APP_API_BASEURL,
	timeout: 15000,
});

//实例拦截请求
service.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		return config;
	},
	(error: AxiosError) => {
		//错误的请求
		return Promise.reject(error);
	},
);

//axios 响应拦截
service.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.status === 200) {
			const data = response.data; //as BaseResponse;
			if (data.code != 0) {
				ElMessage({
					message: data.message,
					type: 'error',
				});
				return;
			} else {
				return data;
			}
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error',
		});
		return response;
	},
	//请求失败
	(error: any) => {
		const { response } = error;
		if (response) {
			ElMessage({
				message: getMessageInfo(response.status),
				type: 'error',
			});
			return Promise.reject(response.data);
		}
		ElMessage({
			message: '网络连接异常,请稍后再试！',
			type: 'error',
		});
	},
);

export default service;
