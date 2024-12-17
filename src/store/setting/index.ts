import { defineStore } from 'pinia'
import pinia from '@/store';
import { ref } from 'vue'
const useSettingStoreHook = defineStore('settingStore', () => {
    const titles = ref<string[]>([])

    const setTitles = (tls: string[]) => {
        titles.value = tls
    }

    return {
        titles,
        setTitles,
    }
})

export const useSettingStore = () => useSettingStoreHook(pinia)