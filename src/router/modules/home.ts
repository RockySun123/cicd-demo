export default {
	path: '/',
	name: 'layout',
	component: () => import('@/layout/index.vue'),
	meta: {},
	children: [
		{
			path: '/',
			name: 'HomePage',
			component: () => import('@/views/home/index.vue'),
			meta: { title: '默认首页', isShow: true, parentRouter: 'layout' },
			children: [],
		},
		{
			path: '/project',
			name: 'Project',
			meta: { title: '项目管理', isShow: true, parentRouter: 'layout' },
			children: [
				{
					path: '/project',
					name: 'ProjectContent',
					component: () => import('@/views/project/index.vue'),
					meta: { title: '项目列表', isShow: true, parentRouter: 'Project' }
				},
				{
					path: '/project/child1',
					name: 'Child1',
					component: () => import('@/views/project/child1.vue'),
					meta: { title: '子页面1', isShow: true, parentRouter: 'Project' },
				},
				{
					path: '/project/child2',
					name: 'Child2',
					component: () => import('@/views/project/child2.vue'),
					meta: { title: '子页面2', isShow: true, parentRouter: 'Project' },
				},
				{
					path: '/project/child3',
					name: 'Child3',
					component: () => import('@/views/project/child3.vue'),
					meta: { title: '子页面3', isShow: true, parentRouter: 'Project' },
				}
			],
		},
		{
			path: '/user',
			name: 'UserPage',
			component: () => import('@/views/user/index.vue'),
			meta: { title: '用户列表', isShow: true, parentRouter: 'layout' },
			children: [],
		},
		{
			path: '/role',
			name: 'RolePage',
			component: () => import('@/views/role/index.vue'),
			meta: { title: '角色列表', isShow: true, parentRouter: 'layout' },
			children: [],
		},
		{
			path: '/auth',
			name: 'AuthPage',
			component: () => import('@/views/auth/index.vue'),
			meta: { title: '权限列表', isShow: true, parentRouter: 'layout' },
			children: [],
		},
	],
};
