<template>
	<div class="wrap-about">
		<tag :color="color" :theme="theme"> rocky </tag>
		<tag :theme="theme">sun</tag>
		<tag :theme="theme">ke</tag>
		<tag :theme="theme">lin</tag>
	</div>
	<ElForm ref="formRef"></ElForm>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const color = ref<string>('red');
const theme = ref<string>('#999');

//ref类型
import { ElForm } from 'element-plus';
import { useComRef } from '@/hooks/useComRef';

// typeof ElForm 获取到类
// InstanceType<typeof ElForm> 获取到实例
// const formRef = ref<InstanceType<typeof ElForm>>();
const formRef = useComRef<typeof ElForm>();
formRef.value?.validate((valid) => {
	console.log(valid);
});
</script>
<style lang="less" scoped>
.wrap-about {
	width: 100%;
	height: 100vh;
}
</style>
