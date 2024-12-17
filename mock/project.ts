import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

const mockData = Mock.mock({
	'list|100': [
		{
			userId: 1,
			'id|+1': 1, //从1开始递增
			title: '@cname', // 随机中文名字
			introduce: '@ctitle(20, 100)', //自定义中文字符长度为 20 到 50
		},
	],
});

export default [
	{
		url: '/mock/api/projects',
		method: 'get',

		response: () => {
			return {
				code: 0,
				message: 'success',
				data: mockData.list,
			};
		},
	},
] as MockMethod[];
