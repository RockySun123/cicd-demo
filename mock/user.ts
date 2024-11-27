import { MockMethod } from 'vite-plugin-mock';

export default [
	{
		url: '/mock/api/login',
		method: 'post',
		//body 可以获取请求体
		response: ({ body }: any) => {
			if (body.username === body.password) {
				return {
					code: 1,
					message: '用户名或密码错误',
					data: {
						username: '',
						roles: [],
						accessToken: '',
					},
				};
			}
			//构建数据
			if (body.username === 'admin') {
				return {
					code: 0,
					message: '登录成功',
					data: {
						username: 'admin',
						roles: ['common'],
						accessToken: 'admin',
					},
				};
			} else {
				return {
					code: 0,
					message: 'Token实效',
					data: {
						username: '',
						roles: [],
						accessToken: '',
					},
				};
			}
		},
	},
] as MockMethod[];
