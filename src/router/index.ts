import { createRouter, createWebHashHistory } from 'vue-router';
//进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { RouteRecordRaw } from 'vue-router';
//配置路由
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'home',
//     component: () => import('../views/home/index.vue'),
//     meta: {
//       title: '首页',
//     },
//     children: [],
//   },
// ]

const aboutRouter = {
	path: '/about',
	name: 'about',
	component: () => import('@/views/about/index.vue'),
	meta: {},
	children: [],
};

//组合路由信息
//import.meta.glob 为 vite 提供的特殊导入方式
//他可以将模块中全部内容导入并返回一个Record 对象
//默认为懒加载，加入配置 eager 取消懒加载 -- eager:true -- 启用懒加载，eager:false 不启用懒加载
const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], {
	eager: true,
});

//配置路由
const routes: Array<RouteRecordRaw> = [aboutRouter];
Object.keys(modules).forEach((key) => {
	const module = modules[key].default;
	routes.push(module);
});

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

//路由守卫
router.beforeEach(async (_to, _from, next) => {
	//开始进度条
	NProgress.start();
	next();
});

router.afterEach(async () => {
	NProgress.done();
});

export default router;
