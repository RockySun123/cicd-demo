<template>
	<el-container>
		<el-header><Header /></el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-active="route.path" router>
					<template v-for="item in menuList" :key="item.path">
						<el-menu-item v-if="!item.children?.length" :index="item.path">{{
							item.meta!.title
						}}</el-menu-item>
						<el-sub-menu v-else :index="item.path" :key="item.path">
							<template #title>{{ item.meta!.title }}</template>
							<el-menu-item v-for="itx in item.children" :key="itx.path" :index="itx.path">
								{{ itx.meta!.title }}
							</el-menu-item>
						</el-sub-menu>
					</template>
				</el-menu>
			</el-aside>
			<el-main>
				<el-breadcrumb :separator-icon="ArrowRight">
					<el-breadcrumb-item v-for="title in titles" :to="{ name: title }" :index="title" :key="title">{{
						title
					}}</el-breadcrumb-item>
				</el-breadcrumb>
				<RouterView></RouterView>
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { toRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from './components/Header.vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { useSettingStore } from '@/store/setting';
const settingStore = useSettingStore();

const titles = toRef(settingStore, 'titles');

const router = useRouter();
const route = useRoute();

const menuList = router.options.routes[1].children!.filter((route) => {
	return route.meta!.isShow;
});

// const menuList = router.getRoutes().filter((route) => {
// 	return route.meta.isShow;
// });
</script>
<style lang="less" scoped>
.el-header {
	padding: 0;
	margin-bottom: 5px;
}
.el-container {
	height: 100%;
	overflow: hidden;
	.el-menu {
		height: 100%;
	}
}
.el-breadcrumb {
	margin-bottom: 15px;
}
</style>
