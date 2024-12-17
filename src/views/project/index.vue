<template>
	<div class="wrap-content">
		<el-form :inline="true" :model="searchData" class="search-form">
			<el-form-item label="项目名称">
				<el-input v-model="searchData.title" placeholder="请输入项目名称"></el-input>
			</el-form-item>
			<el-form-item label="项目详情">
				<el-input v-model="searchData.introduce" placeholder="请输入项目详情"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">查询</el-button>
				<el-button @click="onReset">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="180"></el-table-column>
			<el-table-column prop="title" label="名称" width="180"></el-table-column>
			<el-table-column prop="introduce" label="详情"></el-table-column>
		</el-table>
		<div style="padding: 15px 0" class="my-pagination">
			<el-pagination
				v-model:current-page="searchData.current_page"
				v-model:page-size="searchData.pageSize"
				:page-sizes="[5, 10, 15, 20]"
				layout="prev, pager, next, sizes"
				:total="projectList.length"
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive, computed } from 'vue';
import { getProjectList } from '@/api/project';
interface IProject {
	id: number;
	userId: number;
	title: string;
	introduce: string;
}
const projectList = ref<IProject[]>([]);
const searchData = reactive({
	title: '',
	introduce: '',
	current_page: 1,
	dataCount: projectList.value.length,
	pageSize: 5,
});

const dataList = computed(() => {
	return projectList.value.slice(
		(searchData.current_page - 1) * searchData.pageSize,
		searchData.current_page * searchData.pageSize,
	);
});

const fetchData = () => {
	getProjectList({}).then((res) => {
		projectList.value = res;
	});
};

onMounted(() => {
	fetchData();
});

const handleSizeChange = (pageSize: number) => {
	searchData.pageSize = pageSize;
};
const handleCurrentChange = (page: number) => {
	searchData.current_page = page;
};

const onSearch = () => {
	let res: IProject[] = projectList.value;
	if (searchData.title || searchData.introduce) {
		if (searchData.title) {
			res = res.filter((item) => item.title.includes(searchData.title));
		}
		if (searchData.introduce) {
			res = res.filter((item) => item.introduce.includes(searchData.introduce));
		}
		projectList.value = res;
	} else {
		res = projectList.value;
	}
	projectList.value = res;
	searchData.current_page = 1;
	searchData.dataCount = projectList.value.length;
};

const onReset = () => {
	fetchData();
	searchData.current_page = 1;
};
</script>
<style lang="less" scoped>
.my-pagination {
	display: flex;
	justify-content: end;
}
</style>
