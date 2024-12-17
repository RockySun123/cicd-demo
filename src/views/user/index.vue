<template>
	<div>
		<el-form :inline="true" :model="searchData" class="search-form">
			<el-form-item label="姓名">
				<el-input v-model="searchData.nickName" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="角色">
				<el-select v-model="searchData.role" placeholder="请选择角色" style="width: 150px">
					<el-option label="全部" :value="0"></el-option>
					<el-option
						v-for="item in roleWithAuthList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					>
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearch">查询</el-button>
				<el-button @click="onReset">重置</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="searchList.length ? searchList : userList" border style="width: 100%">
			<el-table-column prop="id" label="编号" width="180"></el-table-column>
			<el-table-column prop="nickName" label="姓名"></el-table-column>
			<el-table-column prop="rolt" label="角色">
				<template #default="scope">
					<el-button v-for="item in scope.row.role" :key="item.role" type="primary" size="small">{{
						item.roleName
					}}</el-button>
				</template>
			</el-table-column>
			<el-table-column prop="status" label="操作">
				<template #default="scope">
					<el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<el-dialog title="角色权限" v-model="editShow">
		<el-form :model="editUser">
			<el-form-item label="姓名" label-width="120">
				<el-input v-model="editUser.nickName" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="用户角色" label-width="120">
				<el-select v-model="editUser.role" multiple placeholder="请选择角色">
					<el-option
						v-for="item in roleWithAuthList"
						:key="item.roleId"
						:label="item.roleName"
						:value="item.roleId"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="editShow = false">取 消</el-button>
				<el-button type="primary" @click="ensureEditUser">确 定</el-button>
			</span>
		</template>
	</el-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { getUserList } from '@/api/user';
import { getRoleList } from '@/api/role';

import type { IUser, IEditUser, IRoleWithAuth, IUserWithRole } from '@/types/common';

const userList = ref<IUser[]>([]);
const searchList = ref<IUser[]>([]);
const editShow = ref<boolean>(false);
const editUser = reactive<IEditUser>({
	id: 0,
	nickName: '',
	role: [],
});

const roleWithAuthList = ref<IRoleWithAuth[]>([]);

const searchData = reactive<IUserWithRole>({
	nickName: '',
	role: 0,
});

const fetchUserList = () => {
	getUserList()
		.then((res) => {
			userList.value = res;
		})
		.catch((err) => {
			console.log(err);
		});
};

const fetchRoleList = () => {
	getRoleList()
		.then((res) => {
			roleWithAuthList.value = res;
		})
		.catch((err) => {
			console.log(err);
		});
};
onMounted(async () => {
	fetchUserList();
	fetchRoleList();
});

const onSearch = () => {
	let res: IUser[] = userList.value;
	if (searchData.nickName || searchData.role) {
		if (searchData.nickName) {
			res = res.filter((item) => item.nickName.includes(searchData.nickName));
		}
		if (searchData.role) {
			console.log(res);
			res = res.filter((item) => item.role.some((i) => i.roleId === searchData.role));
		}
	} else {
		res = userList.value;
	}
	searchList.value = res;
};
const onReset = () => {
	searchData.nickName = '';
	searchData.role = 0;
	searchList.value = [];
};

const handleEdit = (row: IUser) => {
	editShow.value = true;
	Object.assign(editUser, {
		...row,
		role: row.role.map((item) => item.roleId),
	});
};
const ensureEditUser = () => {
	editShow.value = false;
	let obj: IUser = userList.value.find((item) => item.id === editUser.id) as IUser;
	obj.nickName = editUser.nickName;
	obj.role = []; //清空角色

	roleWithAuthList.value.forEach((item) => {
		if (editUser.role.find((value) => value === item.roleId)) {
			obj.role.push({
				roleName: item.roleName,
				roleId: item.roleId,
			});
		}
	});
};
</script>
<style scoped lang="less">
// .search-form{
//     margin-top: 20px;
//     .el-form-item{
//         display: inline-block;
//         vertical-align: middle;
//     }

// }
</style>
