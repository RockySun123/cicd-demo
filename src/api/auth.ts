import service from '@/http/request';

export const getAuthList = () => {
	return service({
		url: '/auths',
		method: 'get',
	}).then((res) => res.data);
};
