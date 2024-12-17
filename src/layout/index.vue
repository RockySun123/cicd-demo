<template>
	<el-container>
		<el-header><Header /></el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-active="route.path" router>
					<el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">{{
						item.meta.title
					}}</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<RouterView></RouterView>
			</el-main>
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Header from './components/Header.vue';

const router = useRouter();
const route = useRoute();

const menuList = router.getRoutes().filter((route) => {
	return route.meta.isShow;
});
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
</style>
