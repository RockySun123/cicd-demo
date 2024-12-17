<template>
	<div class="wrap-tag">
		<span v-bind="props" ref="tag" class="tag">
			<slot></slot>
		</span>
	</div>
</template>
<script lang="ts" setup>
import { defineProps, ref, onMounted } from 'vue';
const tag = ref<HTMLElement>();
const props = defineProps({
	color: {
		type: String,
		default: '#333',
	},
	theme: {
		type: String,
		default: '#eee',
		required: false,
	},
});
onMounted(() => {
	setColor();
	setTheme();
});
const setColor = () => {
	tag.value!.style.color = props.color;
};
const setTheme = () => {
	tag.value!.style.backgroundColor = props.theme;
};
</script>
<style lang="less" scoped>
.tag {
	display: inline-block;
	background-color: #eee;
	color: #333;
	font-size: 16px;
	padding: 10px;
	border-radius: 5px;
}
.wrap-tag {
	margin: 10px;
	display: inline-block;
}
</style>
