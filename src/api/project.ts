import service from '@/http/request';

export const getProjectList = (params: any) => {
	return service({
		url: '/projects',
		method: 'get',
		params,
	}).then((res) => {
		return res.data;
	});
};
