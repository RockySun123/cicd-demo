import { ref } from 'vue';
export function useComRef<T extends abstract new (..._args: any) => any>() {
	return ref<InstanceType<T>>();
}
