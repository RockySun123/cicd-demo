<template>
	<div>
		<el-form>
			<el-form-item>
				<el-button type="primary" @click="handleAddUser">添加角色</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="roleList" border style="width: 100%">
			<el-table-column prop="roleId" label="角色ID"></el-table-column>
			<el-table-column prop="roleName" label="角色名称"></el-table-column>
			<el-table-column label="操作">
				<template #default="scope">
					<el-button type="primary" size="small" @click="handleChangeRole(scope.row)">修改权限</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRoleList } from '@/api/role';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import type { IRole } from '@/types/common';
const router = useRouter();
const roleList = ref<IRole[]>([]);

onMounted(() => {
	getRoleList().then((res: any) => {
		roleList.value = res;
	});
});

const handleAddUser = () => {
	ElMessageBox.prompt('请输入用户角色', '添加角色', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
	})
		.then(({ value }) => {
			if (value) {
				roleList.value.push({
					roleId: roleList.value.length + 1,
					roleName: value,
					authority: [],
				});
				ElMessage({ message: value + '添加成功', type: 'success' });
			}
		})
		.catch(() => {
			ElMessage({ message: '取消添加', type: 'info' });
		});
};

const handleChangeRole = (row: IRole) => {
	router.push({
		path: '/auth',
		query: {
			id: row.roleId,
			auth: row.authority,
		},
	});
};
</script>
