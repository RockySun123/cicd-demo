<template>
	<div>
		<!--:check-strictly="true" 父子节点是否关联	-->
		<el-tree
			ref="treeRef"
			default-expand-all
			:data="authList"
			:check-strictly="true"
			show-checkbox
			node-key="roleId"
			:default-checked-keys="checkedNodes"
			:props="{
				label: 'name',
				children: 'roleList',
			}"
		></el-tree>
		<el-button type="primary" @click="handleChangeAuth">修改权限</el-button>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getAuthList } from '@/api/auth';
import { useRoute } from 'vue-router';

interface IAuth {
	name: string;
	roleId: number;
	roleList?: IAuth[];
}
const authList = ref<IAuth[]>([]);
const checkedNodes = ref<number[]>([]);
const treeRef = ref<any>(null);

const { query } = useRoute();
if (query.auth) {
	checkedNodes.value = query.auth as any;
}

onMounted(() => {
	getAuthList().then((res) => {
		authList.value = res;
	});
});
const handleChangeAuth = () => {
	const selectedTreeNodes = treeRef.value.getCheckedNodes();
	console.log(treeRef.value.getCheckedKeys(), selectedTreeNodes);
};
</script>
