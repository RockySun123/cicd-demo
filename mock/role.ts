import { MockMethod } from 'vite-plugin-mock';

export const roles = [
	{ roleId: 1, roleName: '管理员', authority: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 14, 15, 16] },
	{ roleId: 2, roleName: '普通用户', authority: [1, 3, 4, 6, 7, 8, 9, 11, 12, 13] },
];

export default [
	{
		url: '/mock/api/roles',
		method: 'get',
		response: () => {
			return {
				code: 0,
				message: 'success',
				data: roles,
			};
		},
	},
] as MockMethod[];
