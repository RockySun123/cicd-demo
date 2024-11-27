<template>
	<div class="login-box">
		<div class="login-form">
			<h1>企业中后台管理系统</h1>
			<el-form :model="userInfo" :rules="rules" center class="login-info">
				<el-form-item prop="username">
					<el-input v-model="userInfo.username" placeholder="请输入用户名" :prefix-icon="User"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="userInfo.password" placeholder="请输入密码" :prefix-icon="Lock"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" style="width: 100%" @click="userLogin">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { useUserStore } from '@/store/user';
import { User, Lock } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
const userInfo = reactive({
	username: '',
	password: '',
});
const rules = reactive({
	username: {
		required: true,
		message: '请输入您的用户名',
		trigger: 'blur',
	},
	password: [
		{
			required: true,
			message: '请输入您的密码',
			trigger: 'blur',
		},
	],
});
const userLogin = () => {
	userStore.storeUserLogin(userInfo).then(() => {
		router.push('/');
	});
};
</script>
<style lang="less" scoped>
.login-box {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	height: 100vh;
	background-color: var(--background-color);
	.login-form {
		display: flex;
		width: 300px;
		text-align: center;
		flex-direction: column;
		.login-info {
			height: max-content;
		}
	}
}
</style>
