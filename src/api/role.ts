// import { get } from '@/http/request';

// export const getRoleList = () => {
// 	return get({}, '/roles');
// };

import service from '@/http/request';

export const getRoleList = () => {
	return service({
		url: '/roles',
		method: 'get',
	}).then((res) => res.data);
};
