import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

//接口返回数据最外层类型
interface BaseResponse<T = any> {
	code: number | string;
	message: string;
	data: T;
	status?: number;
}

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
			return response.data;
		}
		ElMessage({
			message: getMessageInfo(response.status),
			type: 'error',
		});
		return response.data;
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

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
	const conf = config;
	return new Promise((resolve, reject) => {
		service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
			const data = res.data; //如果data.code 为错误代码返回message信息
			if (data.code != 0) {
				ElMessage({
					message: data.message,
					type: 'error',
				});
				reject(data.message);
			} else {
				ElMessage({
					message: data.message,
					type: 'success',
				});
				//此处返回data信息，也就是api中配置好的 Response 类型
				resolve(data.data as T);
			}
		});
	});
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'GET', params: params });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'POST', params: params });
}
export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'PUT', data: data });
}
export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
	return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

export default service;
