import { createRouter, createWebHashHistory } from 'vue-router';
//进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import type { RouteRecordRaw } from 'vue-router';
import { useSettingStore } from '@/store/setting/index'
import { getTitles } from '@/utils/index';

const settingStore = useSettingStore()

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



const handleRoutes = (currentName: string) => {
	// console.log(currentName, router.getRoutes())
	const titles = getTitles(currentName, router.getRoutes())
	settingStore.setTitles(titles)
}

const noStatusPage = ['/login', '/about']; //不需要守卫的路由
//路由守卫
router.beforeEach(async (_to, _from, next) => {
	//开始进度条
	NProgress.start();

	//获取token
	const token = sessionStorage.getItem('userInfo');
	const userIsLogin = token ? true : false;
	if (userIsLogin || noStatusPage.includes(_to.path)) {
		next();
	} else {
		next('/login');
	}

	// console.log(_to)
	//面包屑，获取路由信息
	handleRoutes(_to.name as string)
});

router.afterEach(async () => {
	NProgress.done();
});

export default router;
